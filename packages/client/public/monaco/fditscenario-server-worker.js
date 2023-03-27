"use strict";(()=>{var ic=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var f=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var pi=f(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});var pm;function mm(){if(pm===void 0)throw new Error("No runtime abstraction layer installed");return pm}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");pm=r}t.install=e})(mm||(mm={}));hm.default=mm});var ym=f(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.Disposable=void 0;var E1;(function(t){function e(r){return{dispose:r}}t.create=e})(E1=gu.Disposable||(gu.Disposable={}))});var Ia=f(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.Emitter=Oa.Event=void 0;var w1=pi(),N1;(function(t){let e={dispose(){}};t.None=function(){return e}})(N1=Oa.Event||(Oa.Event={}));var gm=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,w1.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},bo=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new gm),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=bo._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Oa.Emitter=bo;bo._noop=function(){}});var yR=f(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.AbstractMessageBuffer=void 0;var $1=13,O1=10,I1=`\r
`,vm=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case $1:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case O1:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(I1);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let d=l.substr(0,c),h=l.substr(c+1).trim();o.set(d,h)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};ac.AbstractMessageBuffer=vm});var TR=f(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});var gR=pi(),Co=ym(),D1=Ia(),x1=yR(),ko=class extends x1.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return ko.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};ko.emptyBuffer=new Uint8Array(0);var Tm=class{constructor(e){this.socket=e,this._onData=new D1.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,gR.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Co.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Co.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Co.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},_m=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Co.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Co.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Co.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},L1=new TextEncoder,vR=Object.freeze({messageBuffer:Object.freeze({create:t=>new ko(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(L1.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Tm(t),asWritableStream:t=>new _m(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Rm(){return vR}(function(t){function e(){gR.default.install(vR)}t.install=e})(Rm||(Rm={}));Am.default=Rm});var Eo=f(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.stringArray=Zt.array=Zt.func=Zt.error=Zt.number=Zt.string=Zt.boolean=void 0;function q1(t){return t===!0||t===!1}Zt.boolean=q1;function _R(t){return typeof t=="string"||t instanceof String}Zt.string=_R;function M1(t){return typeof t=="number"||t instanceof Number}Zt.number=M1;function F1(t){return t instanceof Error}Zt.error=F1;function j1(t){return typeof t=="function"}Zt.func=j1;function RR(t){return Array.isArray(t)}Zt.array=RR;function G1(t){return RR(t)&&t.every(e=>_R(e))}Zt.stringArray=G1});var Wm=f(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Message=X.NotificationType9=X.NotificationType8=X.NotificationType7=X.NotificationType6=X.NotificationType5=X.NotificationType4=X.NotificationType3=X.NotificationType2=X.NotificationType1=X.NotificationType0=X.NotificationType=X.RequestType9=X.RequestType8=X.RequestType7=X.RequestType6=X.RequestType5=X.RequestType4=X.RequestType3=X.RequestType2=X.RequestType1=X.RequestType=X.RequestType0=X.AbstractMessageSignature=X.ParameterStructures=X.ResponseError=X.ErrorCodes=void 0;var Da=Eo(),AR;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(AR=X.ErrorCodes||(X.ErrorCodes={}));var vu=class extends Error{constructor(e,r,n){super(r),this.code=Da.number(e)?e:AR.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,vu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};X.ResponseError=vu;var Lt=class{constructor(e){this.kind=e}static is(e){return e===Lt.auto||e===Lt.byName||e===Lt.byPosition}toString(){return this.kind}};X.ParameterStructures=Lt;Lt.auto=new Lt("auto");Lt.byPosition=new Lt("byPosition");Lt.byName=new Lt("byName");var Je=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Lt.auto}};X.AbstractMessageSignature=Je;var Sm=class extends Je{constructor(e){super(e,0)}};X.RequestType0=Sm;var Pm=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType=Pm;var bm=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType1=bm;var Cm=class extends Je{constructor(e){super(e,2)}};X.RequestType2=Cm;var km=class extends Je{constructor(e){super(e,3)}};X.RequestType3=km;var Em=class extends Je{constructor(e){super(e,4)}};X.RequestType4=Em;var wm=class extends Je{constructor(e){super(e,5)}};X.RequestType5=wm;var Nm=class extends Je{constructor(e){super(e,6)}};X.RequestType6=Nm;var $m=class extends Je{constructor(e){super(e,7)}};X.RequestType7=$m;var Om=class extends Je{constructor(e){super(e,8)}};X.RequestType8=Om;var Im=class extends Je{constructor(e){super(e,9)}};X.RequestType9=Im;var Dm=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType=Dm;var xm=class extends Je{constructor(e){super(e,0)}};X.NotificationType0=xm;var Lm=class extends Je{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType1=Lm;var qm=class extends Je{constructor(e){super(e,2)}};X.NotificationType2=qm;var Mm=class extends Je{constructor(e){super(e,3)}};X.NotificationType3=Mm;var Fm=class extends Je{constructor(e){super(e,4)}};X.NotificationType4=Fm;var jm=class extends Je{constructor(e){super(e,5)}};X.NotificationType5=jm;var Gm=class extends Je{constructor(e){super(e,6)}};X.NotificationType6=Gm;var Um=class extends Je{constructor(e){super(e,7)}};X.NotificationType7=Um;var Hm=class extends Je{constructor(e){super(e,8)}};X.NotificationType8=Hm;var Km=class extends Je{constructor(e){super(e,9)}};X.NotificationType9=Km;var U1;(function(t){function e(i){let a=i;return a&&Da.string(a.method)&&(Da.string(a.id)||Da.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Da.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Da.string(a.id)||Da.number(a.id)||a.id===null)}t.isResponse=n})(U1=X.Message||(X.Message={}))});var Vm=f(mi=>{"use strict";var SR;Object.defineProperty(mi,"__esModule",{value:!0});mi.LRUCache=mi.LinkedMap=mi.Touch=void 0;var lr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(lr=mi.Touch||(mi.Touch={}));var oc=class{constructor(){this[SR]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=lr.None){let n=this._map.get(e);if(n)return r!==lr.None&&this.touch(n,r),n.value}set(e,r,n=lr.None){let i=this._map.get(e);if(i)i.value=r,n!==lr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case lr.None:this.addItemLast(i);break;case lr.First:this.addItemFirst(i);break;case lr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(SR=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==lr.First&&r!==lr.Last)){if(r===lr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===lr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};mi.LinkedMap=oc;var Bm=class extends oc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=lr.AsNew){return super.get(e,r)}peek(e){return super.get(e,lr.None)}set(e,r){return super.set(e,r,lr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};mi.LRUCache=Bm});var Jm=f(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.CancellationTokenSource=xa.CancellationToken=void 0;var H1=pi(),K1=Eo(),zm=Ia(),Ym;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:zm.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:zm.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||K1.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Ym=xa.CancellationToken||(xa.CancellationToken={}));var W1=Object.freeze(function(t,e){let r=(0,H1.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),sc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?W1:(this._emitter||(this._emitter=new zm.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Xm=class{get token(){return this._token||(this._token=new sc),this._token}cancel(){this._token?this._token.cancel():this._token=Ym.Cancelled}dispose(){this._token?this._token instanceof sc&&this._token.dispose():this._token=Ym.None}};xa.CancellationTokenSource=Xm});var PR=f(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.ReadableStreamMessageReader=hi.AbstractMessageReader=hi.MessageReader=void 0;var Zm=pi(),wo=Eo(),Qm=Ia(),B1;(function(t){function e(r){let n=r;return n&&wo.func(n.listen)&&wo.func(n.dispose)&&wo.func(n.onError)&&wo.func(n.onClose)&&wo.func(n.onPartialMessage)}t.is=e})(B1=hi.MessageReader||(hi.MessageReader={}));var uc=class{constructor(){this.errorEmitter=new Qm.Emitter,this.closeEmitter=new Qm.Emitter,this.partialMessageEmitter=new Qm.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${wo.string(e.message)?e.message:"unknown"}`)}};hi.AbstractMessageReader=uc;var eh;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,Zm.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(eh||(eh={}));var th=class extends uc{constructor(e,r){super(),this.readable=e,this.options=eh.fromOptions(r),this.buffer=(0,Zm.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Zm.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};hi.ReadableStreamMessageReader=th});var bR=f(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.Semaphore=void 0;var V1=pi(),rh=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,V1.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};lc.Semaphore=rh});var wR=f(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.WriteableStreamMessageWriter=yi.AbstractMessageWriter=yi.MessageWriter=void 0;var CR=pi(),Tu=Eo(),z1=bR(),kR=Ia(),Y1="Content-Length: ",ER=`\r
`,X1;(function(t){function e(r){let n=r;return n&&Tu.func(n.dispose)&&Tu.func(n.onClose)&&Tu.func(n.onError)&&Tu.func(n.write)}t.is=e})(X1=yi.MessageWriter||(yi.MessageWriter={}));var cc=class{constructor(){this.errorEmitter=new kR.Emitter,this.closeEmitter=new kR.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Tu.string(e.message)?e.message:"unknown"}`)}};yi.AbstractMessageWriter=cc;var nh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,CR.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,CR.default)().applicationJson.encoder}}t.fromOptions=e})(nh||(nh={}));var ih=class extends cc{constructor(e,r){super(),this.writable=e,this.options=nh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new z1.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Y1,n.byteLength.toString(),ER),i.push(ER),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};yi.WriteableStreamMessageWriter=ih});var xR=f(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.createMessageConnection=Z.ConnectionOptions=Z.CancellationStrategy=Z.CancellationSenderStrategy=Z.CancellationReceiverStrategy=Z.ConnectionStrategy=Z.ConnectionError=Z.ConnectionErrors=Z.LogTraceNotification=Z.SetTraceNotification=Z.TraceFormat=Z.TraceValues=Z.Trace=Z.NullLogger=Z.ProgressType=Z.ProgressToken=void 0;var NR=pi(),It=Eo(),te=Wm(),$R=Vm(),_u=Ia(),ah=Jm(),Au;(function(t){t.type=new te.NotificationType("$/cancelRequest")})(Au||(Au={}));var OR;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(OR=Z.ProgressToken||(Z.ProgressToken={}));var Ru;(function(t){t.type=new te.NotificationType("$/progress")})(Ru||(Ru={}));var oh=class{constructor(){}};Z.ProgressType=oh;var sh;(function(t){function e(r){return It.func(r)}t.is=e})(sh||(sh={}));Z.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ie;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ie=Z.Trace||(Z.Trace={}));var J1;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(J1=Z.TraceValues||(Z.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ie=Z.Trace||(Z.Trace={}));var cn;(function(t){t.Text="text",t.JSON="json"})(cn=Z.TraceFormat||(Z.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(cn=Z.TraceFormat||(Z.TraceFormat={}));var IR;(function(t){t.type=new te.NotificationType("$/setTrace")})(IR=Z.SetTraceNotification||(Z.SetTraceNotification={}));var uh;(function(t){t.type=new te.NotificationType("$/logTrace")})(uh=Z.LogTraceNotification||(Z.LogTraceNotification={}));var fc;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(fc=Z.ConnectionErrors||(Z.ConnectionErrors={}));var Hi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Hi.prototype)}};Z.ConnectionError=Hi;var DR;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(DR=Z.ConnectionStrategy||(Z.ConnectionStrategy={}));var lh;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new ah.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(lh=Z.CancellationReceiverStrategy||(Z.CancellationReceiverStrategy={}));var ch;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Au.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(ch=Z.CancellationSenderStrategy||(Z.CancellationSenderStrategy={}));var fh;(function(t){t.Message=Object.freeze({receiver:lh.Message,sender:ch.Message});function e(r){let n=r;return n&&lh.is(n.receiver)&&ch.is(n.sender)}t.is=e})(fh=Z.CancellationStrategy||(Z.CancellationStrategy={}));var Q1;(function(t){function e(r){let n=r;return n&&(fh.is(n.cancellationStrategy)||DR.is(n.connectionStrategy))}t.is=e})(Q1=Z.ConnectionOptions||(Z.ConnectionOptions={}));var fn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(fn||(fn={}));function Z1(t,e,r,n){let i=r!==void 0?r:Z.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,d,h=new Map,v=new Map,y,A=new $R.LinkedMap,E=new Map,C=new Set,P=new Map,S=Ie.Off,O=cn.Text,F,W=fn.New,ee=new _u.Emitter,ke=new _u.Emitter,Ee=new _u.Emitter,Xe=new _u.Emitter,V=new _u.Emitter,ce=n&&n.cancellationStrategy?n.cancellationStrategy:fh.Message;function q(b){if(b===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+b.toString()}function L(b){return b===null?"res-unknown-"+(++s).toString():"res-"+b.toString()}function j(){return"not-"+(++o).toString()}function B(b,x){te.Message.isRequest(x)?b.set(q(x.id),x):te.Message.isResponse(x)?b.set(L(x.id),x):b.set(j(),x)}function ie(b){}function ae(){return W===fn.Listening}function Q(){return W===fn.Closed}function ct(){return W===fn.Disposed}function Ze(){(W===fn.New||W===fn.Listening)&&(W=fn.Closed,ke.fire(void 0))}function Ot(b){ee.fire([b,void 0,void 0])}function nn(b){ee.fire(b)}t.onClose(Ze),t.onError(Ot),e.onClose(Ze),e.onError(nn);function wr(){y||A.size===0||(y=(0,NR.default)().timer.setImmediate(()=>{y=void 0,vo()}))}function vo(){if(A.size===0)return;let b=A.shift();try{te.Message.isRequest(b)?To(b):te.Message.isNotification(b)?Ro(b):te.Message.isResponse(b)?_o(b):hu(b)}finally{wr()}}let ur=b=>{try{if(te.Message.isNotification(b)&&b.method===Au.type.method){let x=b.params.id,G=q(x),z=A.get(G);if(te.Message.isRequest(z)){let je=n?.connectionStrategy,et=je&&je.cancelUndispatched?je.cancelUndispatched(z,ie):void 0;if(et&&(et.error!==void 0||et.result!==void 0)){A.delete(G),P.delete(x),et.id=z.id,$n(et,b.method,Date.now()),e.write(et).catch(()=>i.error("Sending response for canceled message failed."));return}}let Fe=P.get(x);if(Fe!==void 0){Fe.cancel(),On(b);return}else C.add(x)}B(A,b)}finally{wr()}};function To(b){if(ct())return;function x(ye,Ke,Te){let yt={jsonrpc:u,id:b.id};ye instanceof te.ResponseError?yt.error=ye.toJson():yt.result=ye===void 0?null:ye,$n(yt,Ke,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function G(ye,Ke,Te){let yt={jsonrpc:u,id:b.id,error:ye.toJson()};$n(yt,Ke,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function z(ye,Ke,Te){ye===void 0&&(ye=null);let yt={jsonrpc:u,id:b.id,result:ye};$n(yt,Ke,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}Na(b);let Fe=c.get(b.method),je,et;Fe&&(je=Fe.type,et=Fe.handler);let Tt=Date.now();if(et||l){let ye=b.id??String(Date.now()),Ke=ce.receiver.createCancellationTokenSource(ye);b.id!==null&&C.has(b.id)&&Ke.cancel(),b.id!==null&&P.set(ye,Ke);try{let Te;if(et)if(b.params===void 0){if(je!==void 0&&je.numberOfParams!==0){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${b.method} defines ${je.numberOfParams} params but received none.`),b.method,Tt);return}Te=et(Ke.token)}else if(Array.isArray(b.params)){if(je!==void 0&&je.parameterStructures===te.ParameterStructures.byName){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${b.method} defines parameters by name but received parameters by position`),b.method,Tt);return}Te=et(...b.params,Ke.token)}else{if(je!==void 0&&je.parameterStructures===te.ParameterStructures.byPosition){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${b.method} defines parameters by position but received parameters by name`),b.method,Tt);return}Te=et(b.params,Ke.token)}else l&&(Te=l(b.method,b.params,Ke.token));let yt=Te;Te?yt.then?yt.then(Qt=>{P.delete(ye),x(Qt,b.method,Tt)},Qt=>{P.delete(ye),Qt instanceof te.ResponseError?G(Qt,b.method,Tt):Qt&&It.string(Qt.message)?G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${b.method} failed with message: ${Qt.message}`),b.method,Tt):G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${b.method} failed unexpectedly without providing any details.`),b.method,Tt)}):(P.delete(ye),x(Te,b.method,Tt)):(P.delete(ye),z(Te,b.method,Tt))}catch(Te){P.delete(ye),Te instanceof te.ResponseError?x(Te,b.method,Tt):Te&&It.string(Te.message)?G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${b.method} failed with message: ${Te.message}`),b.method,Tt):G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${b.method} failed unexpectedly without providing any details.`),b.method,Tt)}}else G(new te.ResponseError(te.ErrorCodes.MethodNotFound,`Unhandled method ${b.method}`),b.method,Tt)}function _o(b){if(!ct())if(b.id===null)b.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(b.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=b.id,G=E.get(x);if($a(b,G),G!==void 0){E.delete(x);try{if(b.error){let z=b.error;G.reject(new te.ResponseError(z.code,z.message,z.data))}else if(b.result!==void 0)G.resolve(b.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function Ro(b){if(ct())return;let x,G;if(b.method===Au.type.method){let z=b.params.id;C.delete(z),On(b);return}else{let z=h.get(b.method);z&&(G=z.handler,x=z.type)}if(G||d)try{if(On(b),G)if(b.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==te.ParameterStructures.byName&&i.error(`Notification ${b.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(b.params)){let z=b.params;b.method===Ru.type.method&&z.length===2&&OR.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===te.ParameterStructures.byName&&i.error(`Notification ${b.method} defines parameters by name but received parameters by position`),x.numberOfParams!==b.params.length&&i.error(`Notification ${b.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===te.ParameterStructures.byPosition&&i.error(`Notification ${b.method} defines parameters by position but received parameters by name`),G(b.params);else d&&d(b.method,b.params)}catch(z){z.message?i.error(`Notification handler '${b.method}' failed with message: ${z.message}`):i.error(`Notification handler '${b.method}' failed unexpectedly.`)}else Ee.fire(b)}function hu(b){if(!b){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(b,null,4)}`);let x=b;if(It.string(x.id)||It.number(x.id)){let G=x.id,z=E.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ht(b){if(b!=null)switch(S){case Ie.Verbose:return JSON.stringify(b,null,4);case Ie.Compact:return JSON.stringify(b);default:return}}function ci(b){if(!(S===Ie.Off||!F))if(O===cn.Text){let x;(S===Ie.Verbose||S===Ie.Compact)&&b.params&&(x=`Params: ${ht(b.params)}

`),F.log(`Sending request '${b.method} - (${b.id})'.`,x)}else Mr("send-request",b)}function yu(b){if(!(S===Ie.Off||!F))if(O===cn.Text){let x;(S===Ie.Verbose||S===Ie.Compact)&&(b.params?x=`Params: ${ht(b.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${b.method}'.`,x)}else Mr("send-notification",b)}function $n(b,x,G){if(!(S===Ie.Off||!F))if(O===cn.Text){let z;(S===Ie.Verbose||S===Ie.Compact)&&(b.error&&b.error.data?z=`Error data: ${ht(b.error.data)}

`:b.result?z=`Result: ${ht(b.result)}

`:b.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${b.id})'. Processing request took ${Date.now()-G}ms`,z)}else Mr("send-response",b)}function Na(b){if(!(S===Ie.Off||!F))if(O===cn.Text){let x;(S===Ie.Verbose||S===Ie.Compact)&&b.params&&(x=`Params: ${ht(b.params)}

`),F.log(`Received request '${b.method} - (${b.id})'.`,x)}else Mr("receive-request",b)}function On(b){if(!(S===Ie.Off||!F||b.method===uh.type.method))if(O===cn.Text){let x;(S===Ie.Verbose||S===Ie.Compact)&&(b.params?x=`Params: ${ht(b.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${b.method}'.`,x)}else Mr("receive-notification",b)}function $a(b,x){if(!(S===Ie.Off||!F))if(O===cn.Text){let G;if((S===Ie.Verbose||S===Ie.Compact)&&(b.error&&b.error.data?G=`Error data: ${ht(b.error.data)}

`:b.result?G=`Result: ${ht(b.result)}

`:b.error===void 0&&(G=`No result returned.

`)),x){let z=b.error?` Request failed: ${b.error.message} (${b.error.code}).`:"";F.log(`Received response '${x.method} - (${b.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${b.id} without active response promise.`,G)}else Mr("receive-response",b)}function Mr(b,x){if(!F||S===Ie.Off)return;let G={isLSPMessage:!0,type:b,message:x,timestamp:Date.now()};F.log(G)}function an(){if(Q())throw new Hi(fc.Closed,"Connection is closed.");if(ct())throw new Hi(fc.Disposed,"Connection is disposed.")}function Ao(){if(ae())throw new Hi(fc.AlreadyListening,"Connection is already listening")}function So(){if(!ae())throw new Error("Call listen() first.")}function Nr(b){return b===void 0?null:b}function In(b){if(b!==null)return b}function xt(b){return b!=null&&!Array.isArray(b)&&typeof b=="object"}function on(b,x){switch(b){case te.ParameterStructures.auto:return xt(x)?In(x):[Nr(x)];case te.ParameterStructures.byName:if(!xt(x))throw new Error("Received parameters by name but param is not an object literal.");return In(x);case te.ParameterStructures.byPosition:return[Nr(x)];default:throw new Error(`Unknown parameter structure ${b.toString()}`)}}function sn(b,x){let G,z=b.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=on(b.parameterStructures,x[0]);break;default:G=[];for(let Fe=0;Fe<x.length&&Fe<z;Fe++)G.push(Nr(x[Fe]));if(x.length<z)for(let Fe=x.length;Fe<z;Fe++)G.push(null);break}return G}let Dn={sendNotification:(b,...x)=>{an();let G,z;if(It.string(b)){G=b;let je=x[0],et=0,Tt=te.ParameterStructures.auto;te.ParameterStructures.is(je)&&(et=1,Tt=je);let ye=x.length,Ke=ye-et;switch(Ke){case 0:z=void 0;break;case 1:z=on(Tt,x[et]);break;default:if(Tt===te.ParameterStructures.byName)throw new Error(`Received ${Ke} parameters for 'by Name' notification parameter structure.`);z=x.slice(et,ye).map(Te=>Nr(Te));break}}else{let je=x;G=b.method,z=sn(b,je)}let Fe={jsonrpc:u,method:G,params:z};return yu(Fe),e.write(Fe).catch(()=>i.error("Sending notification failed."))},onNotification:(b,x)=>{an();let G;return It.func(b)?d=b:x&&(It.string(b)?(G=b,h.set(b,{type:void 0,handler:x})):(G=b.method,h.set(b.method,{type:b,handler:x}))),{dispose:()=>{G!==void 0?h.delete(G):d=void 0}}},onProgress:(b,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(b,x,G)=>Dn.sendNotification(Ru.type,{token:x,value:G}),onUnhandledProgress:Xe.event,sendRequest:(b,...x)=>{an(),So();let G,z,Fe;if(It.string(b)){G=b;let ye=x[0],Ke=x[x.length-1],Te=0,yt=te.ParameterStructures.auto;te.ParameterStructures.is(ye)&&(Te=1,yt=ye);let Qt=x.length;ah.CancellationToken.is(Ke)&&(Qt=Qt-1,Fe=Ke);let fi=Qt-Te;switch(fi){case 0:z=void 0;break;case 1:z=on(yt,x[Te]);break;default:if(yt===te.ParameterStructures.byName)throw new Error(`Received ${fi} parameters for 'by Name' request parameter structure.`);z=x.slice(Te,Qt).map(xn=>Nr(xn));break}}else{let ye=x;G=b.method,z=sn(b,ye);let Ke=b.numberOfParams;Fe=ah.CancellationToken.is(ye[Ke])?ye[Ke]:void 0}let je=a++,et;return Fe&&(et=Fe.onCancellationRequested(()=>{let ye=ce.sender.sendCancellation(Dn,je);return ye===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${je}`),Promise.resolve()):ye.catch(()=>{i.log(`Sending cancellation messages for id ${je} failed`)})})),new Promise((ye,Ke)=>{let Te={jsonrpc:u,id:je,method:G,params:z},yt=xn=>{ye(xn),ce.sender.cleanup(je),et?.dispose()},Qt=xn=>{Ke(xn),ce.sender.cleanup(je),et?.dispose()},fi={method:G,timerStart:Date.now(),resolve:yt,reject:Qt};ci(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(xn){fi.reject(new te.ResponseError(te.ErrorCodes.MessageWriteError,xn.message?xn.message:"Unknown reason")),fi=null}fi&&E.set(je,fi)})},onRequest:(b,x)=>{an();let G=null;return sh.is(b)?(G=void 0,l=b):It.string(b)?(G=null,x!==void 0&&(G=b,c.set(b,{handler:x,type:void 0}))):x!==void 0&&(G=b.method,c.set(b.method,{type:b,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>E.size>0,trace:async(b,x,G)=>{let z=!1,Fe=cn.Text;G!==void 0&&(It.boolean(G)?z=G:(z=G.sendNotification||!1,Fe=G.traceFormat||cn.Text)),S=b,O=Fe,S===Ie.Off?F=void 0:F=x,z&&!Q()&&!ct()&&await Dn.sendNotification(IR.type,{value:Ie.toString(b)})},onError:ee.event,onClose:ke.event,onUnhandledNotification:Ee.event,onDispose:V.event,end:()=>{e.end()},dispose:()=>{if(ct())return;W=fn.Disposed,V.fire(void 0);let b=new te.ResponseError(te.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of E.values())x.reject(b);E=new Map,P=new Map,C=new Set,A=new $R.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{an(),Ao(),W=fn.Listening,t.listen(ur)},inspect:()=>{(0,NR.default)().console.log("inspect")}};return Dn.onNotification(uh.type,b=>{if(S===Ie.Off||!F)return;let x=S===Ie.Verbose||S===Ie.Compact;F.log(b.message,x?b.verbose:void 0)}),Dn.onNotification(Ru.type,b=>{let x=v.get(b.token);x?x(b.value):Xe.fire(b)}),Dn}Z.createMessageConnection=Z1});var hh=f(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var Be=Wm();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return Be.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return Be.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return Be.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return Be.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return Be.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return Be.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return Be.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return Be.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return Be.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return Be.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return Be.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return Be.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return Be.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return Be.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return Be.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return Be.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return Be.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return Be.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return Be.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return Be.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return Be.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return Be.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return Be.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return Be.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return Be.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return Be.ParameterStructures}});var dh=Vm();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return dh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return dh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return dh.Touch}});var eM=ym();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return eM.Disposable}});var LR=Ia();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return LR.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return LR.Emitter}});var qR=Jm();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return qR.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return qR.CancellationToken}});var ph=PR();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return ph.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return ph.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return ph.ReadableStreamMessageReader}});var mh=wR();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return mh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return mh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return mh.WriteableStreamMessageWriter}});var er=xR();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return er.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return er.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return er.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return er.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return er.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return er.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return er.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return er.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return er.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return er.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return er.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return er.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return er.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return er.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return er.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return er.CancellationStrategy}});var tM=pi();I.RAL=tM.default});var gi=f($r=>{"use strict";var rM=$r&&$r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),nM=$r&&$r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&rM(e,t,r)};Object.defineProperty($r,"__esModule",{value:!0});$r.createMessageConnection=$r.BrowserMessageWriter=$r.BrowserMessageReader=void 0;var iM=TR();iM.default.install();var No=hh();nM(hh(),$r);var yh=class extends No.AbstractMessageReader{constructor(e){super(),this._onData=new No.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};$r.BrowserMessageReader=yh;var gh=class extends No.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};$r.BrowserMessageWriter=gh;function aM(t,e,r,n){return r===void 0&&(r=No.NullLogger),No.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,No.createMessageConnection)(t,e,r,n)}$r.createMessageConnection=aM});var vh=f((wfe,MR)=>{"use strict";MR.exports=gi()});var $o=f((FR,dc)=>{(function(t){if(typeof dc=="object"&&typeof dc.exports=="object"){var e=t(ic,FR);e!==void 0&&(dc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(w){return typeof w=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(w){return typeof w=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(w){return typeof w=="number"&&g.MIN_VALUE<=w&&w<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(w){return typeof w=="number"&&g.MIN_VALUE<=w&&w<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(R,m){return R===Number.MAX_VALUE&&(R=a.MAX_VALUE),m===Number.MAX_VALUE&&(m=a.MAX_VALUE),{line:R,character:m}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.line)&&N.uinteger(m.character)}g.is=w})(o=e.Position||(e.Position={}));var s;(function(g){function k(R,m,$,D){if(N.uinteger(R)&&N.uinteger(m)&&N.uinteger($)&&N.uinteger(D))return{start:o.create(R,m),end:o.create($,D)};if(o.is(R)&&o.is(m))return{start:R,end:m};throw new Error("Range#create called with invalid arguments[".concat(R,", ").concat(m,", ").concat($,", ").concat(D,"]"))}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&o.is(m.start)&&o.is(m.end)}g.is=w})(s=e.Range||(e.Range={}));var u;(function(g){function k(R,m){return{uri:R,range:m}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(N.string(m.uri)||N.undefined(m.uri))}g.is=w})(u=e.Location||(e.Location={}));var l;(function(g){function k(R,m,$,D){return{targetUri:R,targetRange:m,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&s.is(m.targetRange)&&N.string(m.targetUri)&&s.is(m.targetSelectionRange)&&(s.is(m.originSelectionRange)||N.undefined(m.originSelectionRange))}g.is=w})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(R,m,$,D){return{red:R,green:m,blue:$,alpha:D}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&N.numberRange(m.red,0,1)&&N.numberRange(m.green,0,1)&&N.numberRange(m.blue,0,1)&&N.numberRange(m.alpha,0,1)}g.is=w})(c=e.Color||(e.Color={}));var d;(function(g){function k(R,m){return{range:R,color:m}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&c.is(m.color)}g.is=w})(d=e.ColorInformation||(e.ColorInformation={}));var h;(function(g){function k(R,m,$){return{label:R,textEdit:m,additionalTextEdits:$}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.undefined(m.textEdit)||F.is(m))&&(N.undefined(m.additionalTextEdits)||N.typedArray(m.additionalTextEdits,F.is))}g.is=w})(h=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(R,m,$,D,ne,ft){var We={startLine:R,endLine:m};return N.defined($)&&(We.startCharacter=$),N.defined(D)&&(We.endCharacter=D),N.defined(ne)&&(We.kind=ne),N.defined(ft)&&(We.collapsedText=ft),We}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.startLine)&&N.uinteger(m.startLine)&&(N.undefined(m.startCharacter)||N.uinteger(m.startCharacter))&&(N.undefined(m.endCharacter)||N.uinteger(m.endCharacter))&&(N.undefined(m.kind)||N.string(m.kind))}g.is=w})(y=e.FoldingRange||(e.FoldingRange={}));var A;(function(g){function k(R,m){return{location:R,message:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&u.is(m.location)&&N.string(m.message)}g.is=w})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var E;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(E=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(g){g.Unnecessary=1,g.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var P;(function(g){function k(w){var R=w;return N.objectLiteral(R)&&N.string(R.href)}g.is=k})(P=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(R,m,$,D,ne,ft){var We={range:R,message:m};return N.defined($)&&(We.severity=$),N.defined(D)&&(We.code=D),N.defined(ne)&&(We.source=ne),N.defined(ft)&&(We.relatedInformation=ft),We}g.create=k;function w(R){var m,$=R;return N.defined($)&&s.is($.range)&&N.string($.message)&&(N.number($.severity)||N.undefined($.severity))&&(N.integer($.code)||N.string($.code)||N.undefined($.code))&&(N.undefined($.codeDescription)||N.string((m=$.codeDescription)===null||m===void 0?void 0:m.href))&&(N.string($.source)||N.undefined($.source))&&(N.undefined($.relatedInformation)||N.typedArray($.relatedInformation,A.is))}g.is=w})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(R,m){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ne={title:R,command:m};return N.defined($)&&$.length>0&&(ne.arguments=$),ne}g.create=k;function w(R){var m=R;return N.defined(m)&&N.string(m.title)&&N.string(m.command)}g.is=w})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function w($,D){return{range:{start:$,end:$},newText:D}}g.insert=w;function R($){return{range:$,newText:""}}g.del=R;function m($){var D=$;return N.objectLiteral(D)&&N.string(D.newText)&&s.is(D.range)}g.is=m})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(R,m,$){var D={label:R};return m!==void 0&&(D.needsConfirmation=m),$!==void 0&&(D.description=$),D}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.boolean(m.needsConfirmation)||m.needsConfirmation===void 0)&&(N.string(m.description)||m.description===void 0)}g.is=w})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ee;(function(g){function k(w){var R=w;return N.string(R)}g.is=k})(ee=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var ke;(function(g){function k($,D,ne){return{range:$,newText:D,annotationId:ne}}g.replace=k;function w($,D,ne){return{range:{start:$,end:$},newText:D,annotationId:ne}}g.insert=w;function R($,D){return{range:$,newText:"",annotationId:D}}g.del=R;function m($){var D=$;return F.is(D)&&(W.is(D.annotationId)||ee.is(D.annotationId))}g.is=m})(ke=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ee;(function(g){function k(R,m){return{textDocument:R,edits:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&Q.is(m.textDocument)&&Array.isArray(m.edits)}g.is=w})(Ee=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Xe;(function(g){function k(R,m,$){var D={kind:"create",uri:R};return m!==void 0&&(m.overwrite!==void 0||m.ignoreIfExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function w(R){var m=R;return m&&m.kind==="create"&&N.string(m.uri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||ee.is(m.annotationId))}g.is=w})(Xe=e.CreateFile||(e.CreateFile={}));var V;(function(g){function k(R,m,$,D){var ne={kind:"rename",oldUri:R,newUri:m};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ne.options=$),D!==void 0&&(ne.annotationId=D),ne}g.create=k;function w(R){var m=R;return m&&m.kind==="rename"&&N.string(m.oldUri)&&N.string(m.newUri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||ee.is(m.annotationId))}g.is=w})(V=e.RenameFile||(e.RenameFile={}));var ce;(function(g){function k(R,m,$){var D={kind:"delete",uri:R};return m!==void 0&&(m.recursive!==void 0||m.ignoreIfNotExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function w(R){var m=R;return m&&m.kind==="delete"&&N.string(m.uri)&&(m.options===void 0||(m.options.recursive===void 0||N.boolean(m.options.recursive))&&(m.options.ignoreIfNotExists===void 0||N.boolean(m.options.ignoreIfNotExists)))&&(m.annotationId===void 0||ee.is(m.annotationId))}g.is=w})(ce=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(w){var R=w;return R&&(R.changes!==void 0||R.documentChanges!==void 0)&&(R.documentChanges===void 0||R.documentChanges.every(function(m){return N.string(m.kind)?Xe.is(m)||V.is(m)||ce.is(m):Ee.is(m)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,w){this.edits=k,this.changeAnnotations=w}return g.prototype.insert=function(k,w,R){var m,$;if(R===void 0?m=F.insert(k,w):ee.is(R)?($=R,m=ke.insert(k,w,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=ke.insert(k,w,$)),this.edits.push(m),$!==void 0)return $},g.prototype.replace=function(k,w,R){var m,$;if(R===void 0?m=F.replace(k,w):ee.is(R)?($=R,m=ke.replace(k,w,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=ke.replace(k,w,$)),this.edits.push(m),$!==void 0)return $},g.prototype.delete=function(k,w){var R,m;if(w===void 0?R=F.del(k):ee.is(w)?(m=w,R=ke.del(k,w)):(this.assertChangeAnnotations(this.changeAnnotations),m=this.changeAnnotations.manage(w),R=ke.del(k,m)),this.edits.push(R),m!==void 0)return m},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,w){var R;if(ee.is(k)?R=k:(R=this.nextId(),w=k),this._annotations[R]!==void 0)throw new Error("Id ".concat(R," is already in use."));if(w===void 0)throw new Error("No annotation provided for id ".concat(R));return this._annotations[R]=w,this._size++,R},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var w=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(R){if(Ee.is(R)){var m=new L(R.edits,w._changeAnnotations);w._textEditChanges[R.textDocument.uri]=m}})):k.changes&&Object.keys(k.changes).forEach(function(R){var m=new L(k.changes[R]);w._textEditChanges[R]=m})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(Q.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var w={uri:k.uri,version:k.version},R=this._textEditChanges[w.uri];if(!R){var m=[],$={textDocument:w,edits:m};this._workspaceEdit.documentChanges.push($),R=new L(m,this._changeAnnotations),this._textEditChanges[w.uri]=R}return R}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var R=this._textEditChanges[k];if(!R){var m=[];this._workspaceEdit.changes[k]=m,R=new L(m),this._textEditChanges[k]=R}return R}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,w,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(w)||ee.is(w)?m=w:R=w;var $,D;if(m===void 0?$=Xe.create(k,R):(D=ee.is(m)?m:this._changeAnnotations.manage(m),$=Xe.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,w,R,m){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(R)||ee.is(R)?$=R:m=R;var D,ne;if($===void 0?D=V.create(k,w,m):(ne=ee.is($)?$:this._changeAnnotations.manage($),D=V.create(k,w,m,ne)),this._workspaceEdit.documentChanges.push(D),ne!==void 0)return ne},g.prototype.deleteFile=function(k,w,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(w)||ee.is(w)?m=w:R=w;var $,D;if(m===void 0?$=ce.create(k,R):(D=ee.is(m)?m:this._changeAnnotations.manage(m),$=ce.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var ie;(function(g){function k(R){return{uri:R}}g.create=k;function w(R){var m=R;return N.defined(m)&&N.string(m.uri)}g.is=w})(ie=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var ae;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.integer(m.version)}g.is=w})(ae=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var Q;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&N.string(m.uri)&&(m.version===null||N.integer(m.version))}g.is=w})(Q=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var ct;(function(g){function k(R,m,$,D){return{uri:R,languageId:m,version:$,text:D}}g.create=k;function w(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.string(m.languageId)&&N.integer(m.version)&&N.string(m.text)}g.is=w})(ct=e.TextDocumentItem||(e.TextDocumentItem={}));var Ze;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(w){var R=w;return R===g.PlainText||R===g.Markdown}g.is=k})(Ze=e.MarkupKind||(e.MarkupKind={}));var Ot;(function(g){function k(w){var R=w;return N.objectLiteral(w)&&Ze.is(R.kind)&&N.string(R.value)}g.is=k})(Ot=e.MarkupContent||(e.MarkupContent={}));var nn;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(nn=e.CompletionItemKind||(e.CompletionItemKind={}));var wr;(function(g){g.PlainText=1,g.Snippet=2})(wr=e.InsertTextFormat||(e.InsertTextFormat={}));var vo;(function(g){g.Deprecated=1})(vo=e.CompletionItemTag||(e.CompletionItemTag={}));var ur;(function(g){function k(R,m,$){return{newText:R,insert:m,replace:$}}g.create=k;function w(R){var m=R;return m&&N.string(m.newText)&&s.is(m.insert)&&s.is(m.replace)}g.is=w})(ur=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var To;(function(g){g.asIs=1,g.adjustIndentation=2})(To=e.InsertTextMode||(e.InsertTextMode={}));var _o;(function(g){function k(w){var R=w;return R&&(N.string(R.detail)||R.detail===void 0)&&(N.string(R.description)||R.description===void 0)}g.is=k})(_o=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Ro;(function(g){function k(w){return{label:w}}g.create=k})(Ro=e.CompletionItem||(e.CompletionItem={}));var hu;(function(g){function k(w,R){return{items:w||[],isIncomplete:!!R}}g.create=k})(hu=e.CompletionList||(e.CompletionList={}));var ht;(function(g){function k(R){return R.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function w(R){var m=R;return N.string(m)||N.objectLiteral(m)&&N.string(m.language)&&N.string(m.value)}g.is=w})(ht=e.MarkedString||(e.MarkedString={}));var ci;(function(g){function k(w){var R=w;return!!R&&N.objectLiteral(R)&&(Ot.is(R.contents)||ht.is(R.contents)||N.typedArray(R.contents,ht.is))&&(w.range===void 0||s.is(w.range))}g.is=k})(ci=e.Hover||(e.Hover={}));var yu;(function(g){function k(w,R){return R?{label:w,documentation:R}:{label:w}}g.create=k})(yu=e.ParameterInformation||(e.ParameterInformation={}));var $n;(function(g){function k(w,R){for(var m=[],$=2;$<arguments.length;$++)m[$-2]=arguments[$];var D={label:w};return N.defined(R)&&(D.documentation=R),N.defined(m)?D.parameters=m:D.parameters=[],D}g.create=k})($n=e.SignatureInformation||(e.SignatureInformation={}));var Na;(function(g){g.Text=1,g.Read=2,g.Write=3})(Na=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var On;(function(g){function k(w,R){var m={range:w};return N.number(R)&&(m.kind=R),m}g.create=k})(On=e.DocumentHighlight||(e.DocumentHighlight={}));var $a;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})($a=e.SymbolKind||(e.SymbolKind={}));var Mr;(function(g){g.Deprecated=1})(Mr=e.SymbolTag||(e.SymbolTag={}));var an;(function(g){function k(w,R,m,$,D){var ne={name:w,kind:R,location:{uri:$,range:m}};return D&&(ne.containerName=D),ne}g.create=k})(an=e.SymbolInformation||(e.SymbolInformation={}));var Ao;(function(g){function k(w,R,m,$){return $!==void 0?{name:w,kind:R,location:{uri:m,range:$}}:{name:w,kind:R,location:{uri:m}}}g.create=k})(Ao=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var So;(function(g){function k(R,m,$,D,ne,ft){var We={name:R,detail:m,kind:$,range:D,selectionRange:ne};return ft!==void 0&&(We.children=ft),We}g.create=k;function w(R){var m=R;return m&&N.string(m.name)&&N.number(m.kind)&&s.is(m.range)&&s.is(m.selectionRange)&&(m.detail===void 0||N.string(m.detail))&&(m.deprecated===void 0||N.boolean(m.deprecated))&&(m.children===void 0||Array.isArray(m.children))&&(m.tags===void 0||Array.isArray(m.tags))}g.is=w})(So=e.DocumentSymbol||(e.DocumentSymbol={}));var Nr;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(Nr=e.CodeActionKind||(e.CodeActionKind={}));var In;(function(g){g.Invoked=1,g.Automatic=2})(In=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var xt;(function(g){function k(R,m,$){var D={diagnostics:R};return m!=null&&(D.only=m),$!=null&&(D.triggerKind=$),D}g.create=k;function w(R){var m=R;return N.defined(m)&&N.typedArray(m.diagnostics,S.is)&&(m.only===void 0||N.typedArray(m.only,N.string))&&(m.triggerKind===void 0||m.triggerKind===In.Invoked||m.triggerKind===In.Automatic)}g.is=w})(xt=e.CodeActionContext||(e.CodeActionContext={}));var on;(function(g){function k(R,m,$){var D={title:R},ne=!0;return typeof m=="string"?(ne=!1,D.kind=m):O.is(m)?D.command=m:D.edit=m,ne&&$!==void 0&&(D.kind=$),D}g.create=k;function w(R){var m=R;return m&&N.string(m.title)&&(m.diagnostics===void 0||N.typedArray(m.diagnostics,S.is))&&(m.kind===void 0||N.string(m.kind))&&(m.edit!==void 0||m.command!==void 0)&&(m.command===void 0||O.is(m.command))&&(m.isPreferred===void 0||N.boolean(m.isPreferred))&&(m.edit===void 0||q.is(m.edit))}g.is=w})(on=e.CodeAction||(e.CodeAction={}));var sn;(function(g){function k(R,m){var $={range:R};return N.defined(m)&&($.data=m),$}g.create=k;function w(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.command)||O.is(m.command))}g.is=w})(sn=e.CodeLens||(e.CodeLens={}));var Dn;(function(g){function k(R,m){return{tabSize:R,insertSpaces:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&N.uinteger(m.tabSize)&&N.boolean(m.insertSpaces)}g.is=w})(Dn=e.FormattingOptions||(e.FormattingOptions={}));var b;(function(g){function k(R,m,$){return{range:R,target:m,data:$}}g.create=k;function w(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.target)||N.string(m.target))}g.is=w})(b=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(R,m){return{range:R,parent:m}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(m.parent===void 0||g.is(m.parent))}g.is=w})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Fe;(function(g){function k(w){var R=w;return N.objectLiteral(R)&&(R.resultId===void 0||typeof R.resultId=="string")&&Array.isArray(R.data)&&(R.data.length===0||typeof R.data[0]=="number")}g.is=k})(Fe=e.SemanticTokens||(e.SemanticTokens={}));var je;(function(g){function k(R,m){return{range:R,text:m}}g.create=k;function w(R){var m=R;return m!=null&&s.is(m.range)&&N.string(m.text)}g.is=w})(je=e.InlineValueText||(e.InlineValueText={}));var et;(function(g){function k(R,m,$){return{range:R,variableName:m,caseSensitiveLookup:$}}g.create=k;function w(R){var m=R;return m!=null&&s.is(m.range)&&N.boolean(m.caseSensitiveLookup)&&(N.string(m.variableName)||m.variableName===void 0)}g.is=w})(et=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var Tt;(function(g){function k(R,m){return{range:R,expression:m}}g.create=k;function w(R){var m=R;return m!=null&&s.is(m.range)&&(N.string(m.expression)||m.expression===void 0)}g.is=w})(Tt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ye;(function(g){function k(R,m){return{frameId:R,stoppedLocation:m}}g.create=k;function w(R){var m=R;return N.defined(m)&&s.is(R.stoppedLocation)}g.is=w})(ye=e.InlineValueContext||(e.InlineValueContext={}));var Ke;(function(g){g.Type=1,g.Parameter=2;function k(w){return w===1||w===2}g.is=k})(Ke=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(g){function k(R){return{value:R}}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&(m.tooltip===void 0||N.string(m.tooltip)||Ot.is(m.tooltip))&&(m.location===void 0||u.is(m.location))&&(m.command===void 0||O.is(m.command))}g.is=w})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var yt;(function(g){function k(R,m,$){var D={position:R,label:m};return $!==void 0&&(D.kind=$),D}g.create=k;function w(R){var m=R;return N.objectLiteral(m)&&o.is(m.position)&&(N.string(m.label)||N.typedArray(m.label,Te.is))&&(m.kind===void 0||Ke.is(m.kind))&&m.textEdits===void 0||N.typedArray(m.textEdits,F.is)&&(m.tooltip===void 0||N.string(m.tooltip)||Ot.is(m.tooltip))&&(m.paddingLeft===void 0||N.boolean(m.paddingLeft))&&(m.paddingRight===void 0||N.boolean(m.paddingRight))}g.is=w})(yt=e.InlayHint||(e.InlayHint={}));var Qt;(function(g){function k(w){var R=w;return N.objectLiteral(R)&&n.is(R.uri)&&N.string(R.name)}g.is=k})(Qt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var fi;(function(g){function k($,D,ne,ft){return new xn($,D,ne,ft)}g.create=k;function w($){var D=$;return!!(N.defined(D)&&N.string(D.uri)&&(N.undefined(D.languageId)||N.string(D.languageId))&&N.uinteger(D.lineCount)&&N.func(D.getText)&&N.func(D.positionAt)&&N.func(D.offsetAt))}g.is=w;function R($,D){for(var ne=$.getText(),ft=m(D,function(Po,nc){var hR=Po.range.start.line-nc.range.start.line;return hR===0?Po.range.start.character-nc.range.start.character:hR}),We=ne.length,un=ft.length-1;un>=0;un--){var ln=ft[un],di=$.offsetAt(ln.range.start),ge=$.offsetAt(ln.range.end);if(ge<=We)ne=ne.substring(0,di)+ln.newText+ne.substring(ge,ne.length);else throw new Error("Overlapping edit");We=di}return ne}g.applyEdits=R;function m($,D){if($.length<=1)return $;var ne=$.length/2|0,ft=$.slice(0,ne),We=$.slice(ne);m(ft,D),m(We,D);for(var un=0,ln=0,di=0;un<ft.length&&ln<We.length;){var ge=D(ft[un],We[ln]);ge<=0?$[di++]=ft[un++]:$[di++]=We[ln++]}for(;un<ft.length;)$[di++]=ft[un++];for(;ln<We.length;)$[di++]=We[ln++];return $}})(fi=e.TextDocument||(e.TextDocument={}));var xn=function(){function g(k,w,R,m){this._uri=k,this._languageId=w,this._version=R,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var w=this.offsetAt(k.start),R=this.offsetAt(k.end);return this._content.substring(w,R)}return this._content},g.prototype.update=function(k,w){this._content=k.text,this._version=w,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],w=this._content,R=!0,m=0;m<w.length;m++){R&&(k.push(m),R=!1);var $=w.charAt(m);R=$==="\r"||$===`
`,$==="\r"&&m+1<w.length&&w.charAt(m+1)===`
`&&m++}R&&w.length>0&&k.push(w.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var w=this.getLineOffsets(),R=0,m=w.length;if(m===0)return o.create(0,k);for(;R<m;){var $=Math.floor((R+m)/2);w[$]>k?m=$:R=$+1}var D=R-1;return o.create(D,k-w[D])},g.prototype.offsetAt=function(k){var w=this.getLineOffsets();if(k.line>=w.length)return this._content.length;if(k.line<0)return 0;var R=w[k.line],m=k.line+1<w.length?w[k.line+1]:this._content.length;return Math.max(Math.min(R+k.character,m),R)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),N;(function(g){var k=Object.prototype.toString;function w(ge){return typeof ge<"u"}g.defined=w;function R(ge){return typeof ge>"u"}g.undefined=R;function m(ge){return ge===!0||ge===!1}g.boolean=m;function $(ge){return k.call(ge)==="[object String]"}g.string=$;function D(ge){return k.call(ge)==="[object Number]"}g.number=D;function ne(ge,Po,nc){return k.call(ge)==="[object Number]"&&Po<=ge&&ge<=nc}g.numberRange=ne;function ft(ge){return k.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ft;function We(ge){return k.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=We;function un(ge){return k.call(ge)==="[object Function]"}g.func=un;function ln(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=ln;function di(ge,Po){return Array.isArray(ge)&&ge.every(Po)}g.typedArray=di})(N||(N={}))})});var ut=f(cr=>{"use strict";Object.defineProperty(cr,"__esModule",{value:!0});cr.ProtocolNotificationType=cr.ProtocolNotificationType0=cr.ProtocolRequestType=cr.ProtocolRequestType0=cr.RegistrationType=cr.MessageDirection=void 0;var Oo=gi(),oM;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(oM=cr.MessageDirection||(cr.MessageDirection={}));var Th=class{constructor(e){this.method=e}};cr.RegistrationType=Th;var _h=class extends Oo.RequestType0{constructor(e){super(e)}};cr.ProtocolRequestType0=_h;var Rh=class extends Oo.RequestType{constructor(e){super(e,Oo.ParameterStructures.byName)}};cr.ProtocolRequestType=Rh;var Ah=class extends Oo.NotificationType0{constructor(e){super(e)}};cr.ProtocolNotificationType0=Ah;var Sh=class extends Oo.NotificationType{constructor(e){super(e,Oo.ParameterStructures.byName)}};cr.ProtocolNotificationType=Sh});var pc=f(_t=>{"use strict";Object.defineProperty(_t,"__esModule",{value:!0});_t.objectLiteral=_t.typedArray=_t.stringArray=_t.array=_t.func=_t.error=_t.number=_t.string=_t.boolean=void 0;function sM(t){return t===!0||t===!1}_t.boolean=sM;function jR(t){return typeof t=="string"||t instanceof String}_t.string=jR;function uM(t){return typeof t=="number"||t instanceof Number}_t.number=uM;function lM(t){return t instanceof Error}_t.error=lM;function cM(t){return typeof t=="function"}_t.func=cM;function GR(t){return Array.isArray(t)}_t.array=GR;function fM(t){return GR(t)&&t.every(e=>jR(e))}_t.stringArray=fM;function dM(t,e){return Array.isArray(t)&&t.every(e)}_t.typedArray=dM;function pM(t){return t!==null&&typeof t=="object"}_t.objectLiteral=pM});var HR=f(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.ImplementationRequest=void 0;var UR=ut(),mM;(function(t){t.method="textDocument/implementation",t.messageDirection=UR.MessageDirection.clientToServer,t.type=new UR.ProtocolRequestType(t.method)})(mM=Su.ImplementationRequest||(Su.ImplementationRequest={}))});var WR=f(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.TypeDefinitionRequest=void 0;var KR=ut(),hM;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=KR.MessageDirection.clientToServer,t.type=new KR.ProtocolRequestType(t.method)})(hM=Pu.TypeDefinitionRequest||(Pu.TypeDefinitionRequest={}))});var BR=f(Ki=>{"use strict";Object.defineProperty(Ki,"__esModule",{value:!0});Ki.DidChangeWorkspaceFoldersNotification=Ki.WorkspaceFoldersRequest=void 0;var mc=ut(),yM;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=mc.MessageDirection.serverToClient,t.type=new mc.ProtocolRequestType0(t.method)})(yM=Ki.WorkspaceFoldersRequest||(Ki.WorkspaceFoldersRequest={}));var gM;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=mc.MessageDirection.clientToServer,t.type=new mc.ProtocolNotificationType(t.method)})(gM=Ki.DidChangeWorkspaceFoldersNotification||(Ki.DidChangeWorkspaceFoldersNotification={}))});var zR=f(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.ConfigurationRequest=void 0;var VR=ut(),vM;(function(t){t.method="workspace/configuration",t.messageDirection=VR.MessageDirection.serverToClient,t.type=new VR.ProtocolRequestType(t.method)})(vM=bu.ConfigurationRequest||(bu.ConfigurationRequest={}))});var YR=f(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.ColorPresentationRequest=Wi.DocumentColorRequest=void 0;var hc=ut(),TM;(function(t){t.method="textDocument/documentColor",t.messageDirection=hc.MessageDirection.clientToServer,t.type=new hc.ProtocolRequestType(t.method)})(TM=Wi.DocumentColorRequest||(Wi.DocumentColorRequest={}));var _M;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=hc.MessageDirection.clientToServer,t.type=new hc.ProtocolRequestType(t.method)})(_M=Wi.ColorPresentationRequest||(Wi.ColorPresentationRequest={}))});var JR=f(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.FoldingRangeRequest=void 0;var XR=ut(),RM;(function(t){t.method="textDocument/foldingRange",t.messageDirection=XR.MessageDirection.clientToServer,t.type=new XR.ProtocolRequestType(t.method)})(RM=Cu.FoldingRangeRequest||(Cu.FoldingRangeRequest={}))});var ZR=f(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.DeclarationRequest=void 0;var QR=ut(),AM;(function(t){t.method="textDocument/declaration",t.messageDirection=QR.MessageDirection.clientToServer,t.type=new QR.ProtocolRequestType(t.method)})(AM=ku.DeclarationRequest||(ku.DeclarationRequest={}))});var tA=f(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.SelectionRangeRequest=void 0;var eA=ut(),SM;(function(t){t.method="textDocument/selectionRange",t.messageDirection=eA.MessageDirection.clientToServer,t.type=new eA.ProtocolRequestType(t.method)})(SM=Eu.SelectionRangeRequest||(Eu.SelectionRangeRequest={}))});var rA=f(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.WorkDoneProgressCancelNotification=dn.WorkDoneProgressCreateRequest=dn.WorkDoneProgress=void 0;var PM=gi(),yc=ut(),bM;(function(t){t.type=new PM.ProgressType;function e(r){return r===t.type}t.is=e})(bM=dn.WorkDoneProgress||(dn.WorkDoneProgress={}));var CM;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=yc.MessageDirection.serverToClient,t.type=new yc.ProtocolRequestType(t.method)})(CM=dn.WorkDoneProgressCreateRequest||(dn.WorkDoneProgressCreateRequest={}));var kM;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=yc.MessageDirection.clientToServer,t.type=new yc.ProtocolNotificationType(t.method)})(kM=dn.WorkDoneProgressCancelNotification||(dn.WorkDoneProgressCancelNotification={}))});var nA=f(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.CallHierarchyOutgoingCallsRequest=pn.CallHierarchyIncomingCallsRequest=pn.CallHierarchyPrepareRequest=void 0;var Io=ut(),EM;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Io.MessageDirection.clientToServer,t.type=new Io.ProtocolRequestType(t.method)})(EM=pn.CallHierarchyPrepareRequest||(pn.CallHierarchyPrepareRequest={}));var wM;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Io.MessageDirection.clientToServer,t.type=new Io.ProtocolRequestType(t.method)})(wM=pn.CallHierarchyIncomingCallsRequest||(pn.CallHierarchyIncomingCallsRequest={}));var NM;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Io.MessageDirection.clientToServer,t.type=new Io.ProtocolRequestType(t.method)})(NM=pn.CallHierarchyOutgoingCallsRequest||(pn.CallHierarchyOutgoingCallsRequest={}))});var iA=f(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.SemanticTokensRefreshRequest=Rt.SemanticTokensRangeRequest=Rt.SemanticTokensDeltaRequest=Rt.SemanticTokensRequest=Rt.SemanticTokensRegistrationType=Rt.TokenFormat=void 0;var vi=ut(),$M;(function(t){t.Relative="relative"})($M=Rt.TokenFormat||(Rt.TokenFormat={}));var gc;(function(t){t.method="textDocument/semanticTokens",t.type=new vi.RegistrationType(t.method)})(gc=Rt.SemanticTokensRegistrationType||(Rt.SemanticTokensRegistrationType={}));var OM;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=vi.MessageDirection.clientToServer,t.type=new vi.ProtocolRequestType(t.method),t.registrationMethod=gc.method})(OM=Rt.SemanticTokensRequest||(Rt.SemanticTokensRequest={}));var IM;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=vi.MessageDirection.clientToServer,t.type=new vi.ProtocolRequestType(t.method),t.registrationMethod=gc.method})(IM=Rt.SemanticTokensDeltaRequest||(Rt.SemanticTokensDeltaRequest={}));var DM;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=vi.MessageDirection.clientToServer,t.type=new vi.ProtocolRequestType(t.method),t.registrationMethod=gc.method})(DM=Rt.SemanticTokensRangeRequest||(Rt.SemanticTokensRangeRequest={}));var xM;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=vi.MessageDirection.clientToServer,t.type=new vi.ProtocolRequestType0(t.method)})(xM=Rt.SemanticTokensRefreshRequest||(Rt.SemanticTokensRefreshRequest={}))});var oA=f(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.ShowDocumentRequest=void 0;var aA=ut(),LM;(function(t){t.method="window/showDocument",t.messageDirection=aA.MessageDirection.serverToClient,t.type=new aA.ProtocolRequestType(t.method)})(LM=wu.ShowDocumentRequest||(wu.ShowDocumentRequest={}))});var uA=f(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.LinkedEditingRangeRequest=void 0;var sA=ut(),qM;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=sA.MessageDirection.clientToServer,t.type=new sA.ProtocolRequestType(t.method)})(qM=Nu.LinkedEditingRangeRequest||(Nu.LinkedEditingRangeRequest={}))});var lA=f(lt=>{"use strict";Object.defineProperty(lt,"__esModule",{value:!0});lt.WillDeleteFilesRequest=lt.DidDeleteFilesNotification=lt.DidRenameFilesNotification=lt.WillRenameFilesRequest=lt.DidCreateFilesNotification=lt.WillCreateFilesRequest=lt.FileOperationPatternKind=void 0;var Fr=ut(),MM;(function(t){t.file="file",t.folder="folder"})(MM=lt.FileOperationPatternKind||(lt.FileOperationPatternKind={}));var FM;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolRequestType(t.method)})(FM=lt.WillCreateFilesRequest||(lt.WillCreateFilesRequest={}));var jM;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolNotificationType(t.method)})(jM=lt.DidCreateFilesNotification||(lt.DidCreateFilesNotification={}));var GM;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolRequestType(t.method)})(GM=lt.WillRenameFilesRequest||(lt.WillRenameFilesRequest={}));var UM;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolNotificationType(t.method)})(UM=lt.DidRenameFilesNotification||(lt.DidRenameFilesNotification={}));var HM;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolNotificationType(t.method)})(HM=lt.DidDeleteFilesNotification||(lt.DidDeleteFilesNotification={}));var KM;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Fr.MessageDirection.clientToServer,t.type=new Fr.ProtocolRequestType(t.method)})(KM=lt.WillDeleteFilesRequest||(lt.WillDeleteFilesRequest={}))});var fA=f(mn=>{"use strict";Object.defineProperty(mn,"__esModule",{value:!0});mn.MonikerRequest=mn.MonikerKind=mn.UniquenessLevel=void 0;var cA=ut(),WM;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(WM=mn.UniquenessLevel||(mn.UniquenessLevel={}));var BM;(function(t){t.$import="import",t.$export="export",t.local="local"})(BM=mn.MonikerKind||(mn.MonikerKind={}));var VM;(function(t){t.method="textDocument/moniker",t.messageDirection=cA.MessageDirection.clientToServer,t.type=new cA.ProtocolRequestType(t.method)})(VM=mn.MonikerRequest||(mn.MonikerRequest={}))});var dA=f(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.TypeHierarchySubtypesRequest=hn.TypeHierarchySupertypesRequest=hn.TypeHierarchyPrepareRequest=void 0;var Do=ut(),zM;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Do.MessageDirection.clientToServer,t.type=new Do.ProtocolRequestType(t.method)})(zM=hn.TypeHierarchyPrepareRequest||(hn.TypeHierarchyPrepareRequest={}));var YM;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Do.MessageDirection.clientToServer,t.type=new Do.ProtocolRequestType(t.method)})(YM=hn.TypeHierarchySupertypesRequest||(hn.TypeHierarchySupertypesRequest={}));var XM;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Do.MessageDirection.clientToServer,t.type=new Do.ProtocolRequestType(t.method)})(XM=hn.TypeHierarchySubtypesRequest||(hn.TypeHierarchySubtypesRequest={}))});var pA=f(Bi=>{"use strict";Object.defineProperty(Bi,"__esModule",{value:!0});Bi.InlineValueRefreshRequest=Bi.InlineValueRequest=void 0;var vc=ut(),JM;(function(t){t.method="textDocument/inlineValue",t.messageDirection=vc.MessageDirection.clientToServer,t.type=new vc.ProtocolRequestType(t.method)})(JM=Bi.InlineValueRequest||(Bi.InlineValueRequest={}));var QM;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=vc.MessageDirection.clientToServer,t.type=new vc.ProtocolRequestType0(t.method)})(QM=Bi.InlineValueRefreshRequest||(Bi.InlineValueRefreshRequest={}))});var mA=f(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.InlayHintRefreshRequest=yn.InlayHintResolveRequest=yn.InlayHintRequest=void 0;var xo=ut(),ZM;(function(t){t.method="textDocument/inlayHint",t.messageDirection=xo.MessageDirection.clientToServer,t.type=new xo.ProtocolRequestType(t.method)})(ZM=yn.InlayHintRequest||(yn.InlayHintRequest={}));var eF;(function(t){t.method="inlayHint/resolve",t.messageDirection=xo.MessageDirection.clientToServer,t.type=new xo.ProtocolRequestType(t.method)})(eF=yn.InlayHintResolveRequest||(yn.InlayHintResolveRequest={}));var tF;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=xo.MessageDirection.clientToServer,t.type=new xo.ProtocolRequestType0(t.method)})(tF=yn.InlayHintRefreshRequest||(yn.InlayHintRefreshRequest={}))});var yA=f(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var hA=gi(),rF=pc(),Lo=ut(),nF;(function(t){function e(r){let n=r;return n&&rF.boolean(n.retriggerRequest)}t.is=e})(nF=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var iF;(function(t){t.Full="full",t.Unchanged="unchanged"})(iF=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var aF;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType(t.method),t.partialResult=new hA.ProgressType})(aF=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var oF;(function(t){t.method="workspace/diagnostic",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType(t.method),t.partialResult=new hA.ProgressType})(oF=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var sF;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType0(t.method)})(sF=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var TA=f(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var $u=$o(),gn=pc(),Ln=ut(),gA;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(gA=Re.NotebookCellKind||(Re.NotebookCellKind={}));var vA;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return gn.objectLiteral(a)&&$u.uinteger.is(a.executionOrder)&&(a.success===void 0||gn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(vA=Re.ExecutionSummary||(Re.ExecutionSummary={}));var Ph;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return gn.objectLiteral(o)&&gA.is(o.kind)&&$u.DocumentUri.is(o.document)&&(o.metadata===void 0||gn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!vA.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(gn.objectLiteral(a)&&gn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let d=0;d<l.length;d++){let h=l[d];if(!i(a[h],o[h]))return!1}}return!0}})(Ph=Re.NotebookCell||(Re.NotebookCell={}));var uF;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return gn.objectLiteral(i)&&gn.string(i.uri)&&$u.integer.is(i.version)&&gn.typedArray(i.cells,Ph.is)}t.is=r})(uF=Re.NotebookDocument||(Re.NotebookDocument={}));var Ou;(function(t){t.method="notebookDocument/sync",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.RegistrationType(t.method)})(Ou=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var lF;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=Ou.method})(lF=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var cF;(function(t){function e(n){let i=n;return gn.objectLiteral(i)&&$u.uinteger.is(i.start)&&$u.uinteger.is(i.deleteCount)&&(i.cells===void 0||gn.typedArray(i.cells,Ph.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(cF=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var fF;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=Ou.method})(fF=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var dF;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=Ou.method})(dF=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var pF;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=Ou.method})(pF=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var EA=f(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=ut(),_A=$o(),Bt=pc(),mF=HR();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return mF.ImplementationRequest}});var hF=WR();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return hF.TypeDefinitionRequest}});var RA=BR();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return RA.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return RA.DidChangeWorkspaceFoldersNotification}});var yF=zR();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return yF.ConfigurationRequest}});var AA=YR();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return AA.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return AA.ColorPresentationRequest}});var gF=JR();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return gF.FoldingRangeRequest}});var vF=ZR();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return vF.DeclarationRequest}});var TF=tA();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return TF.SelectionRangeRequest}});var bh=rA();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return bh.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return bh.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return bh.WorkDoneProgressCancelNotification}});var Ch=nA();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Ch.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Ch.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Ch.CallHierarchyPrepareRequest}});var qo=iA();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return qo.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return qo.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return qo.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return qo.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return qo.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return qo.SemanticTokensRegistrationType}});var _F=oA();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return _F.ShowDocumentRequest}});var RF=uA();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return RF.LinkedEditingRangeRequest}});var La=lA();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return La.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return La.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return La.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return La.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return La.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return La.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return La.WillDeleteFilesRequest}});var kh=fA();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return kh.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return kh.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return kh.MonikerRequest}});var Eh=dA();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Eh.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Eh.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Eh.TypeHierarchySupertypesRequest}});var SA=pA();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return SA.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return SA.InlineValueRefreshRequest}});var wh=mA();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return wh.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return wh.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return wh.InlayHintRefreshRequest}});var Iu=yA();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Iu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Iu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Iu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Iu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Iu.DiagnosticRefreshRequest}});var qn=TA();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return qn.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return qn.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return qn.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return qn.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return qn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return qn.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return qn.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return qn.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return qn.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return qn.DidCloseNotebookDocumentNotification}});var PA;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})(PA=T.TextDocumentFilter||(T.TextDocumentFilter={}));var bA;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(bA=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var CA;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||bA.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(CA=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var kA;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!PA.is(n)&&!CA.is(n))return!1;return!0}t.is=e})(kA=T.DocumentSelector||(T.DocumentSelector={}));var AF;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(AF=T.RegistrationRequest||(T.RegistrationRequest={}));var SF;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(SF=T.UnregistrationRequest||(T.UnregistrationRequest={}));var PF;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(PF=T.ResourceOperationKind||(T.ResourceOperationKind={}));var bF;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(bF=T.FailureHandlingKind||(T.FailureHandlingKind={}));var CF;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(CF=T.PositionEncodingKind||(T.PositionEncodingKind={}));var kF;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(kF=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var EF;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||kA.is(n.documentSelector))}t.is=e})(EF=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var wF;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(wF=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var NF;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NF=T.InitializeRequest||(T.InitializeRequest={}));var $F;(function(t){t.unknownProtocolVersion=1})($F=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var OF;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(OF=T.InitializedNotification||(T.InitializedNotification={}));var IF;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(IF=T.ShutdownRequest||(T.ShutdownRequest={}));var DF;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(DF=T.ExitNotification||(T.ExitNotification={}));var xF;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(xF=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var LF;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(LF=T.MessageType||(T.MessageType={}));var qF;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(qF=T.ShowMessageNotification||(T.ShowMessageNotification={}));var MF;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(MF=T.ShowMessageRequest||(T.ShowMessageRequest={}));var FF;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(FF=T.LogMessageNotification||(T.LogMessageNotification={}));var jF;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(jF=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var GF;(function(t){t.None=0,t.Full=1,t.Incremental=2})(GF=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var UF;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(UF=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var HF;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(HF=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var KF;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(KF=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var WF;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(WF=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var BF;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(BF=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var VF;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(VF=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var zF;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(zF=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var YF;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(YF=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var XF;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(XF=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var JF;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(JF=T.FileChangeType||(T.FileChangeType={}));var QF;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(_A.URI.is(n.baseUri)||_A.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})(QF=T.RelativePattern||(T.RelativePattern={}));var ZF;(function(t){t.Create=1,t.Change=2,t.Delete=4})(ZF=T.WatchKind||(T.WatchKind={}));var ej;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(ej=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var tj;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(tj=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var rj;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(rj=T.CompletionRequest||(T.CompletionRequest={}));var nj;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(nj=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var ij;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(ij=T.HoverRequest||(T.HoverRequest={}));var aj;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(aj=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var oj;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(oj=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var sj;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(sj=T.DefinitionRequest||(T.DefinitionRequest={}));var uj;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(uj=T.ReferencesRequest||(T.ReferencesRequest={}));var lj;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(lj=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var cj;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(cj=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var fj;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(fj=T.CodeActionRequest||(T.CodeActionRequest={}));var dj;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(dj=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var pj;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(pj=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var mj;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(mj=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var hj;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(hj=T.CodeLensRequest||(T.CodeLensRequest={}));var yj;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(yj=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var gj;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(gj=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var vj;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(vj=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var Tj;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Tj=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var _j;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(_j=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var Rj;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Rj=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var Aj;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Aj=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var Sj;(function(t){t.Identifier=1})(Sj=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var Pj;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Pj=T.RenameRequest||(T.RenameRequest={}));var bj;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(bj=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var Cj;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(Cj=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var kj;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(kj=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var NA=f(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.createProtocolConnection=void 0;var wA=gi();function Ej(t,e,r,n){return wA.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,wA.createMessageConnection)(t,e,r,n)}Tc.createProtocolConnection=Ej});var $A=f(fr=>{"use strict";var wj=fr&&fr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_c=fr&&fr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&wj(e,t,r)};Object.defineProperty(fr,"__esModule",{value:!0});fr.LSPErrorCodes=fr.createProtocolConnection=void 0;_c(gi(),fr);_c($o(),fr);_c(ut(),fr);_c(EA(),fr);var Nj=NA();Object.defineProperty(fr,"createProtocolConnection",{enumerable:!0,get:function(){return Nj.createProtocolConnection}});var $j;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})($j=fr.LSPErrorCodes||(fr.LSPErrorCodes={}))});var At=f(Mn=>{"use strict";var Oj=Mn&&Mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),OA=Mn&&Mn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Oj(e,t,r)};Object.defineProperty(Mn,"__esModule",{value:!0});Mn.createProtocolConnection=void 0;var Ij=vh();OA(vh(),Mn);OA($A(),Mn);function Dj(t,e,r,n){return(0,Ij.createMessageConnection)(t,e,r,n)}Mn.createProtocolConnection=Dj});var $h=f(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.SemanticTokensBuilder=Vi.SemanticTokensDiff=Vi.SemanticTokensFeature=void 0;var Rc=At(),xj=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Rc.SemanticTokensRefreshRequest.type),on:e=>{let r=Rc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Rc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Rc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Vi.SemanticTokensFeature=xj;var Ac=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Vi.SemanticTokensDiff=Ac;var Nh=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Ac(this._prevData,this._data).computeDiff()}:this.build()}};Vi.SemanticTokensBuilder=Nh});var Ih=f(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.TextDocuments=void 0;var qa=At(),Oh=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new qa.Emitter,this._onDidOpen=new qa.Emitter,this._onDidClose=new qa.Emitter,this._onDidSave=new qa.Emitter,this._onWillSave=new qa.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=qa.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),qa.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Sc.TextDocuments=Oh});var xh=f(Mo=>{"use strict";Object.defineProperty(Mo,"__esModule",{value:!0});Mo.NotebookDocuments=Mo.NotebookSyncFeature=void 0;var jr=At(),IA=Ih(),Lj=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(jr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(jr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(jr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(jr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Mo.NotebookSyncFeature=Lj;var zi=class{onDidOpenTextDocument(e){return this.openHandler=e,jr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,jr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,jr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return zi.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return zi.NULL_DISPOSE}onDidSaveTextDocument(){return zi.NULL_DISPOSE}};zi.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Dh=class{constructor(e){e instanceof IA.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new IA.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new jr.Emitter,this._onDidChange=new jr.Emitter,this._onDidSave=new jr.Emitter,this._onDidClose=new jr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new zi,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],d=[],h=[];if(u.cells!==void 0){let C=u.cells;if(C.structure!==void 0){let P=C.structure.array;if(a.cells.splice(P.start,P.deleteCount,...P.cells!==void 0?P.cells:[]),C.structure.didOpen!==void 0)for(let S of C.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(C.structure.didClose)for(let S of C.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(C.data!==void 0){let P=new Map(C.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=P.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(d.push({old:F[0],new:O}),P.delete(O.document),P.size===0)break}}}if(C.textContent!==void 0)for(let P of C.textContent)r.changeTextDocument({textDocument:P.document,contentChanges:P.changes}),h.push(P.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let C of l)y.push(this.getNotebookCell(C));let A=[];for(let C of c)A.push(this.getNotebookCell(C));let E=[];for(let C of h)E.push(this.getNotebookCell(C));(y.length>0||A.length>0||d.length>0||E.length>0)&&(v.cells={added:y,removed:A,changed:{data:d,textContent:E}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),jr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Mo.NotebookDocuments=Dh});var Lh=f(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.thenable=St.typedArray=St.stringArray=St.array=St.func=St.error=St.number=St.string=St.boolean=void 0;function qj(t){return t===!0||t===!1}St.boolean=qj;function DA(t){return typeof t=="string"||t instanceof String}St.string=DA;function Mj(t){return typeof t=="number"||t instanceof Number}St.number=Mj;function Fj(t){return t instanceof Error}St.error=Fj;function xA(t){return typeof t=="function"}St.func=xA;function LA(t){return Array.isArray(t)}St.array=LA;function jj(t){return LA(t)&&t.every(e=>DA(e))}St.stringArray=jj;function Gj(t,e){return Array.isArray(t)&&t.every(e)}St.typedArray=Gj;function Uj(t){return t&&xA(t.then)}St.thenable=Uj});var qh=f(Gr=>{"use strict";Object.defineProperty(Gr,"__esModule",{value:!0});Gr.generateUuid=Gr.parse=Gr.isUUID=Gr.v4=Gr.empty=void 0;var Du=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},oe=class extends Du{constructor(){super([oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-","4",oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._oneOf(oe._timeHighBits),oe._randomHex(),oe._randomHex(),oe._randomHex(),"-",oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex(),oe._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return oe._oneOf(oe._chars)}};oe._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];oe._timeHighBits=["8","9","a","b"];Gr.empty=new Du("00000000-0000-0000-0000-000000000000");function qA(){return new oe}Gr.v4=qA;var Hj=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function MA(t){return Hj.test(t)}Gr.isUUID=MA;function Kj(t){if(!MA(t))throw new Error("invalid uuid");return new Du(t)}Gr.parse=Kj;function Wj(){return qA().asHex()}Gr.generateUuid=Wj});var FA=f(Xi=>{"use strict";Object.defineProperty(Xi,"__esModule",{value:!0});Xi.attachPartialResult=Xi.ProgressFeature=Xi.attachWorkDone=void 0;var Yi=At(),Bj=qh(),Fn=class{constructor(e,r){this._connection=e,this._token=r,Fn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,n)}done(){Fn.Instances.delete(this._token),this._connection.sendProgress(Yi.WorkDoneProgress.type,this._token,{kind:"end"})}};Fn.Instances=new Map;var Pc=class extends Fn{constructor(e,r){super(e,r),this._source=new Yi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},xu=class{constructor(){}begin(){}report(){}done(){}},bc=class extends xu{constructor(){super(),this._source=new Yi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function Vj(t,e){if(e===void 0||e.workDoneToken===void 0)return new xu;let r=e.workDoneToken;return delete e.workDoneToken,new Fn(t,r)}Xi.attachWorkDone=Vj;var zj=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Yi.WorkDoneProgressCancelNotification.type,r=>{let n=Fn.Instances.get(r.token);(n instanceof Pc||n instanceof bc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new xu:new Fn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,Bj.generateUuid)();return this.connection.sendRequest(Yi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Pc(this.connection,e))}else return Promise.resolve(new bc)}};Xi.ProgressFeature=zj;var Mh;(function(t){t.type=new Yi.ProgressType})(Mh||(Mh={}));var Fh=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Mh.type,this._token,e)}};function Yj(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Fh(t,r)}Xi.attachPartialResult=Yj});var jA=f(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.ConfigurationFeature=void 0;var Xj=At(),Jj=Lh(),Qj=t=>class extends t{getConfiguration(e){return e?Jj.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(Xj.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Cc.ConfigurationFeature=Qj});var GA=f(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.WorkspaceFoldersFeature=void 0;var kc=At(),Zj=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new kc.Emitter,this.connection.onNotification(kc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(kc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(kc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Ec.WorkspaceFoldersFeature=Zj});var UA=f(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.CallHierarchyFeature=void 0;var jh=At(),eG=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(jh.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=jh.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=jh.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wc.CallHierarchyFeature=eG});var HA=f(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.ShowDocumentFeature=void 0;var tG=At(),rG=t=>class extends t{showDocument(e){return this.connection.sendRequest(tG.ShowDocumentRequest.type,e)}};Nc.ShowDocumentFeature=rG});var KA=f($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.FileOperationsFeature=void 0;var Fo=At(),nG=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Fo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Fo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Fo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Fo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Fo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Fo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};$c.FileOperationsFeature=nG});var WA=f(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.LinkedEditingRangeFeature=void 0;var iG=At(),aG=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(iG.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Oc.LinkedEditingRangeFeature=aG});var BA=f(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.TypeHierarchyFeature=void 0;var Gh=At(),oG=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Gh.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Gh.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Gh.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ic.TypeHierarchyFeature=oG});var zA=f(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.InlineValueFeature=void 0;var VA=At(),sG=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(VA.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(VA.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Dc.InlineValueFeature=sG});var YA=f(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.InlayHintFeature=void 0;var Uh=At(),uG=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Uh.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Uh.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Uh.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};xc.InlayHintFeature=uG});var XA=f(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.DiagnosticFeature=void 0;var Lu=At(),lG=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Lu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Lu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Lu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Lu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Lu.WorkspaceDiagnosticRequest.partialResult,r)))}}};Lc.DiagnosticFeature=lG});var JA=f(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.MonikerFeature=void 0;var cG=At(),fG=t=>class extends t{get moniker(){return{on:e=>{let r=cG.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};qc.MonikerFeature=fG});var cS=f(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.createConnection=ve.combineFeatures=ve.combineNotebooksFeatures=ve.combineLanguagesFeatures=ve.combineWorkspaceFeatures=ve.combineWindowFeatures=ve.combineClientFeatures=ve.combineTracerFeatures=ve.combineTelemetryFeatures=ve.combineConsoleFeatures=ve._NotebooksImpl=ve._LanguagesImpl=ve.BulkUnregistration=ve.BulkRegistration=ve.ErrorMessageTracker=void 0;var H=At(),Ur=Lh(),Kh=qh(),re=FA(),dG=jA(),pG=GA(),mG=UA(),hG=$h(),yG=HA(),gG=KA(),vG=WA(),TG=BA(),_G=zA(),RG=YA(),AG=XA(),SG=xh(),PG=JA();function Hh(t){if(t!==null)return t}var Wh=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ve.ErrorMessageTracker=Wh;var Mc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Bh=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Hh)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Hh)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Hh)}},QA=(0,yG.ShowDocumentFeature)((0,re.ProgressFeature)(Bh)),bG;(function(t){function e(){return new Fc}t.create=e})(bG=ve.BulkRegistration||(ve.BulkRegistration={}));var Fc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Ur.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Kh.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},CG;(function(t){function e(){return new qu(void 0,[])}t.create=e})(CG=ve.BulkUnregistration||(ve.BulkUnregistration={}));var qu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Ur.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},jc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Fc?this.registerMany(e):e instanceof qu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Ur.string(r)?r:r.method,a=Kh.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Ur.string(e)?e:e.method,i=Kh.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new qu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Vh=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},ZA=(0,gG.FileOperationsFeature)((0,pG.WorkspaceFoldersFeature)((0,dG.ConfigurationFeature)(Vh))),Gc=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},Uc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Hc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ve._LanguagesImpl=Hc;var eS=(0,PG.MonikerFeature)((0,AG.DiagnosticFeature)((0,RG.InlayHintFeature)((0,_G.InlineValueFeature)((0,TG.TypeHierarchyFeature)((0,vG.LinkedEditingRangeFeature)((0,hG.SemanticTokensFeature)((0,mG.CallHierarchyFeature)(Hc)))))))),Kc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ve._NotebooksImpl=Kc;var tS=(0,SG.NotebookSyncFeature)(Kc);function rS(t,e){return function(r){return e(t(r))}}ve.combineConsoleFeatures=rS;function nS(t,e){return function(r){return e(t(r))}}ve.combineTelemetryFeatures=nS;function iS(t,e){return function(r){return e(t(r))}}ve.combineTracerFeatures=iS;function aS(t,e){return function(r){return e(t(r))}}ve.combineClientFeatures=aS;function oS(t,e){return function(r){return e(t(r))}}ve.combineWindowFeatures=oS;function sS(t,e){return function(r){return e(t(r))}}ve.combineWorkspaceFeatures=sS;function uS(t,e){return function(r){return e(t(r))}}ve.combineLanguagesFeatures=uS;function lS(t,e){return function(r){return e(t(r))}}ve.combineNotebooksFeatures=lS;function kG(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,rS),tracer:r(t.tracer,e.tracer,iS),telemetry:r(t.telemetry,e.telemetry,nS),client:r(t.client,e.client,aS),window:r(t.window,e.window,oS),workspace:r(t.workspace,e.workspace,sS),languages:r(t.languages,e.languages,uS),notebooks:r(t.notebooks,e.notebooks,lS)}}ve.combineFeatures=kG;function EG(t,e,r){let n=r&&r.console?new(r.console(Mc)):new Mc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(Gc)):new Gc,o=r&&r.telemetry?new(r.telemetry(Uc)):new Uc,s=r&&r.client?new(r.client(jc)):new jc,u=r&&r.window?new(r.window(QA)):new QA,l=r&&r.workspace?new(r.workspace(ZA)):new ZA,c=r&&r.languages?new(r.languages(eS)):new eS,d=r&&r.notebooks?new(r.notebooks(tS)):new tS,h=[n,a,o,s,u,l,c,d];function v(P){return P instanceof Promise?P:Ur.thenable(P)?new Promise((S,O)=>{P.then(F=>S(F),F=>O(F))}):Promise.resolve(P)}let y,A,E,C={listen:()=>i.listen(),sendRequest:(P,...S)=>i.sendRequest(Ur.string(P)?P:P.method,...S),onRequest:(P,S)=>i.onRequest(P,S),sendNotification:(P,S)=>{let O=Ur.string(P)?P:P.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(P,S)=>i.onNotification(P,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:P=>(A=P,{dispose:()=>{A=void 0}}),onInitialized:P=>i.onNotification(H.InitializedNotification.type,P),onShutdown:P=>(y=P,{dispose:()=>{y=void 0}}),onExit:P=>(E=P,{dispose:()=>{E=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return d},onDidChangeConfiguration:P=>i.onNotification(H.DidChangeConfigurationNotification.type,P),onDidChangeWatchedFiles:P=>i.onNotification(H.DidChangeWatchedFilesNotification.type,P),__textDocumentSync:void 0,onDidOpenTextDocument:P=>i.onNotification(H.DidOpenTextDocumentNotification.type,P),onDidChangeTextDocument:P=>i.onNotification(H.DidChangeTextDocumentNotification.type,P),onDidCloseTextDocument:P=>i.onNotification(H.DidCloseTextDocumentNotification.type,P),onWillSaveTextDocument:P=>i.onNotification(H.WillSaveTextDocumentNotification.type,P),onWillSaveTextDocumentWaitUntil:P=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,P),onDidSaveTextDocument:P=>i.onNotification(H.DidSaveTextDocumentNotification.type,P),sendDiagnostics:P=>i.sendNotification(H.PublishDiagnosticsNotification.type,P),onHover:P=>i.onRequest(H.HoverRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),onCompletion:P=>i.onRequest(H.CompletionRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onCompletionResolve:P=>i.onRequest(H.CompletionResolveRequest.type,P),onSignatureHelp:P=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),onDeclaration:P=>i.onRequest(H.DeclarationRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onDefinition:P=>i.onRequest(H.DefinitionRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onTypeDefinition:P=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onImplementation:P=>i.onRequest(H.ImplementationRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onReferences:P=>i.onRequest(H.ReferencesRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onDocumentHighlight:P=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onDocumentSymbol:P=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onWorkspaceSymbol:P=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:P=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,P),onCodeAction:P=>i.onRequest(H.CodeActionRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onCodeActionResolve:P=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>P(S,O)),onCodeLens:P=>i.onRequest(H.CodeLensRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onCodeLensResolve:P=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>P(S,O)),onDocumentFormatting:P=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:P=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:P=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>P(S,O)),onRenameRequest:P=>i.onRequest(H.RenameRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),onPrepareRename:P=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>P(S,O)),onDocumentLinks:P=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onDocumentLinkResolve:P=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>P(S,O)),onDocumentColor:P=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onColorPresentation:P=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onFoldingRanges:P=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onSelectionRanges:P=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),(0,re.attachPartialResult)(i,S))),onExecuteCommand:P=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>P(S,O,(0,re.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let P of h)P.attach(C);return i.onRequest(H.InitializeRequest.type,P=>{e.initialize(P),Ur.string(P.trace)&&(a.trace=H.Trace.fromString(P.trace));for(let S of h)S.initialize(P.capabilities);if(A){let S=A(P,new H.CancellationTokenSource().token,(0,re.attachWorkDone)(i,P),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Ur.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None:!Ur.number(W.textDocumentSync)&&!Ur.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Ur.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None);for(let ee of h)ee.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of h)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{E&&E()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,P=>{a.trace=H.Trace.fromString(P.value)}),C}ve.createConnection=EG});var zh=f(Vt=>{"use strict";var wG=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),fS=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&wG(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var NG=$h();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return NG.SemanticTokensBuilder}});fS(At(),Vt);var $G=Ih();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return $G.TextDocuments}});var OG=xh();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return OG.NotebookDocuments}});fS(cS(),Vt);var IG;(function(t){t.all={__brand:"features"}})(IG=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var pS=f((Lde,dS)=>{"use strict";dS.exports=At()});var De=f(jn=>{"use strict";var DG=jn&&jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),hS=jn&&jn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&DG(e,t,r)};Object.defineProperty(jn,"__esModule",{value:!0});jn.createConnection=void 0;var Wc=zh();hS(pS(),jn);hS(zh(),jn);var mS=!1,xG={initialize:t=>{},get shutdownReceived(){return mS},set shutdownReceived(t){mS=t},exit:t=>{}};function LG(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Wc.ConnectionStrategy.is(t)||Wc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,Wc.createProtocolConnection)(a,o,l,s);return(0,Wc.createConnection)(u,xG,i)}jn.createConnection=LG});var Yh=f((Vc,Bc)=>{var qG=Vc&&Vc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Bc=="object"&&typeof Bc.exports=="object"){var e=t(ic,Vc);e!==void 0&&(Bc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,d,h){this._uri=l,this._languageId=c,this._version=d,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),d=this.offsetAt(l.end);return this._content.substring(c,d)}return this._content},u.prototype.update=function(l,c){for(var d=0,h=l;d<h.length;d++){var v=h[d];if(u.isIncremental(v)){var y=o(v.range),A=this.offsetAt(y.start),E=this.offsetAt(y.end);this._content=this._content.substring(0,A)+v.text+this._content.substring(E,this._content.length);var C=Math.max(y.start.line,0),P=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,A);if(P-C===O.length)for(var F=0,W=O.length;F<W;F++)S[F+C+1]=O[F];else O.length<1e4?S.splice.apply(S,qG([C+1,P-C],O,!1)):this._lineOffsets=S=S.slice(0,C+1).concat(O,S.slice(P+1));var ee=v.text.length-(E-A);if(ee!==0)for(var F=C+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+ee}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),d=0,h=c.length;if(h===0)return{line:0,character:l};for(;d<h;){var v=Math.floor((d+h)/2);c[v]>l?h=v:d=v+1}var y=d-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var d=c[l.line],h=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(d+l.character,h),d)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(h,v,y,A){return new r(h,v,y,A)}u.create=l;function c(h,v,y){if(h instanceof r)return h.update(v,y),h;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function d(h,v){for(var y=h.getText(),A=i(v.map(s),function(W,ee){var ke=W.range.start.line-ee.range.start.line;return ke===0?W.range.start.character-ee.range.start.character:ke}),E=0,C=[],P=0,S=A;P<S.length;P++){var O=S[P],F=h.offsetAt(O.range.start);if(F<E)throw new Error("Overlapping edit");F>E&&C.push(y.substring(E,F)),O.newText.length&&C.push(O.newText),E=h.offsetAt(O.range.end)}return C.push(y.substr(E)),C.join("")}u.applyEdits=d})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,d=u.slice(0,c),h=u.slice(c);i(d,l),i(h,l);for(var v=0,y=0,A=0;v<d.length&&y<h.length;){var E=l(d[v],h[y]);E<=0?u[A++]=d[v++]:u[A++]=h[y++]}for(;v<d.length;)u[A++]=d[v++];for(;y<h.length;)u[A++]=h[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var d=l?[c]:[],h=0;h<u.length;h++){var v=u.charCodeAt(h);(v===13||v===10)&&(v===13&&h+1<u.length&&u.charCodeAt(h+1)===10&&h++,d.push(c+h+1))}return d}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var tr=f(qt=>{"use strict";Object.defineProperty(qt,"__esModule",{value:!0});qt.isRootCstNode=qt.isLeafCstNode=qt.isCompositeCstNode=qt.AbstractAstReflection=qt.isLinkingError=qt.isAstNodeDescription=qt.isReference=qt.isAstNode=void 0;function Jh(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}qt.isAstNode=Jh;function yS(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}qt.isReference=yS;function MG(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}qt.isAstNodeDescription=MG;function FG(t){return typeof t=="object"&&t!==null&&Jh(t.container)&&yS(t.reference)&&typeof t.message=="string"}qt.isLinkingError=FG;var Xh=class{constructor(){this.subtypes={}}isInstance(e,r){return Jh(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};qt.AbstractAstReflection=Xh;function gS(t){return typeof t=="object"&&t!==null&&"children"in t}qt.isCompositeCstNode=gS;function jG(t){return typeof t=="object"&&t!==null&&"tokenType"in t}qt.isLeafCstNode=jG;function GG(t){return gS(t)&&"fullText"in t}qt.isRootCstNode=GG});var Mt=f(Ve=>{"use strict";Object.defineProperty(Ve,"__esModule",{value:!0});Ve.Reduction=Ve.TreeStreamImpl=Ve.stream=Ve.DONE_RESULT=Ve.EMPTY_STREAM=Ve.StreamImpl=void 0;var zt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new zt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return Ve.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=UG(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new zt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?Ve.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new zt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return Ve.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new zt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(zc(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return Ve.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new zt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(zc(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return Ve.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new zt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new zt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?Ve.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};Ve.StreamImpl=zt;function UG(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function zc(t){return!!t&&typeof t[Symbol.iterator]=="function"}Ve.EMPTY_STREAM=new zt(()=>{},()=>Ve.DONE_RESULT);Ve.DONE_RESULT=Object.freeze({done:!0,value:void 0});function HG(...t){if(t.length===1){let e=t[0];if(e instanceof zt)return e;if(zc(e))return new zt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new zt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:Ve.DONE_RESULT)}return t.length>1?new zt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];zc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return Ve.DONE_RESULT}):Ve.EMPTY_STREAM}Ve.stream=HG;var Qh=class extends zt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return Ve.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};Ve.TreeStreamImpl=Qh;var KG;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(KG=Ve.Reduction||(Ve.Reduction={}))});var Le=f(ue=>{"use strict";Object.defineProperty(ue,"__esModule",{value:!0});ue.getInteriorNodes=ue.getStartlineNode=ue.getNextNode=ue.getPreviousNode=ue.findLeafNodeAtOffset=ue.isCommentNode=ue.findCommentNode=ue.findDeclarationNodeAtOffset=ue.DefaultNameRegexp=ue.inRange=ue.compareRange=ue.RangeComparison=ue.toDocumentSegment=ue.tokenToRange=ue.isCstChildNode=ue.flattenCst=ue.streamCst=void 0;var jo=tr(),WG=Mt();function TS(t){return new WG.TreeStreamImpl(t,e=>(0,jo.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}ue.streamCst=TS;function BG(t){return TS(t).filter(jo.isLeafCstNode)}ue.flattenCst=BG;function VG(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}ue.isCstChildNode=VG;function zG(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}ue.tokenToRange=zG;function YG(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}ue.toDocumentSegment=YG;var Ma;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Ma=ue.RangeComparison||(ue.RangeComparison={}));function _S(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Ma.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Ma.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Ma.Inside:r?Ma.OverlapBack:Ma.OverlapFront}ue.compareRange=_S;function XG(t,e){return _S(t,e)>Ma.After}ue.inRange=XG;ue.DefaultNameRegexp=/^[\w\p{L}]$/u;function JG(t,e,r=ue.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Yc(t,e)}}ue.findDeclarationNodeAtOffset=JG;function QG(t,e){if(t){let r=RS(t,!0);if(r&&Zh(r,e))return r;if((0,jo.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(Zh(a,e))return a}}}}ue.findCommentNode=QG;function Zh(t,e){return(0,jo.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}ue.isCommentNode=Zh;function Yc(t,e){if((0,jo.isLeafCstNode)(t))return t;if((0,jo.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return Yc(a,e)}if(r===n)return Yc(t.children[r],e)}}ue.findLeafNodeAtOffset=Yc;function RS(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}ue.getPreviousNode=RS;function ZG(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}ue.getNextNode=ZG;function eU(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}ue.getStartlineNode=eU;function tU(t,e){let r=rU(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}ue.getInteriorNodes=tU;function rU(t,e){let r=vS(t),n=vS(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function vS(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Gn=f((Mu,ey)=>{(function(t,e){if(typeof Mu=="object"&&typeof ey=="object")ey.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof Mu=="object"?Mu:t)[n]=r[n]}})(Mu,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,d="",h=0,v=-1,y=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(v===A-1||y===1))if(v!==A-1&&y===2){if(d.length<2||h!==2||d.charCodeAt(d.length-1)!==46||d.charCodeAt(d.length-2)!==46){if(d.length>2){var E=d.lastIndexOf("/");if(E!==d.length-1){E===-1?(d="",h=0):h=(d=d.slice(0,E)).length-1-d.lastIndexOf("/"),v=A,y=0;continue}}else if(d.length===2||d.length===1){d="",h=0,v=A,y=0;continue}}l&&(d.length>0?d+="/..":d="..",h=2)}else d.length>0?d+="/"+u.slice(v+1,A):d=u.slice(v+1,A),h=A-v-1;v=A,y=0}else c===46&&y!==-1?++y:y=-1}return d}var s={resolve:function(){for(var u,l="",c=!1,d=arguments.length-1;d>=-1&&!c;d--){var h;d>=0?h=arguments[d]:(u===void 0&&(u=process.cwd()),h=u),a(h),h.length!==0&&(l=h+"/"+l,c=h.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var d=u.length,h=d-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,A=h<y?h:y,E=-1,C=0;C<=A;++C){if(C===A){if(y>A){if(l.charCodeAt(v+C)===47)return l.slice(v+C+1);if(C===0)return l.slice(v+C)}else h>A&&(u.charCodeAt(c+C)===47?E=C:C===0&&(E=0));break}var P=u.charCodeAt(c+C);if(P!==l.charCodeAt(v+C))break;P===47&&(E=C)}var S="";for(C=c+E+1;C<=d;++C)C!==d&&u.charCodeAt(C)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+E):(v+=E,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,d=-1,h=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!h){d=v;break}}else h=!1;return d===-1?c?"/":".":c&&d===1?"//":u.slice(0,d)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,d=0,h=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var E=u.charCodeAt(c);if(E===47){if(!v){d=c+1;break}}else A===-1&&(v=!1,A=c+1),y>=0&&(E===l.charCodeAt(y)?--y==-1&&(h=c):(y=-1,h=A))}return d===h?h=A:h===-1&&(h=u.length),u.slice(d,h)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){d=c+1;break}}else h===-1&&(v=!1,h=c+1);return h===-1?"":u.slice(d,h)},extname:function(u){a(u);for(var l=-1,c=0,d=-1,h=!0,v=0,y=u.length-1;y>=0;--y){var A=u.charCodeAt(y);if(A!==47)d===-1&&(h=!1,d=y+1),A===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!h){c=y+1;break}}return l===-1||d===-1||v===0||v===1&&l===d-1&&l===c+1?"":u.slice(l,d)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var d=c.dir||c.root,h=c.base||(c.name||"")+(c.ext||"");return d?d===c.root?d+h:d+"/"+h:h}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,d=u.charCodeAt(0),h=d===47;h?(l.root="/",c=1):c=0;for(var v=-1,y=0,A=-1,E=!0,C=u.length-1,P=0;C>=c;--C)if((d=u.charCodeAt(C))!==47)A===-1&&(E=!1,A=C+1),d===46?v===-1?v=C:P!==1&&(P=1):v!==-1&&(P=-1);else if(!E){y=C+1;break}return v===-1||A===-1||P===0||P===1&&v===A-1&&v===y+1?A!==-1&&(l.base=l.name=y===0&&h?u.slice(1,A):u.slice(y,A)):(y===0&&h?(l.name=u.slice(1,v),l.base=u.slice(1,A)):(l.name=u.slice(y,v),l.base=u.slice(y,A)),l.ext=u.slice(v,A)),y>0?l.dir=u.slice(0,y-1):h&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var ie in B)Object.prototype.hasOwnProperty.call(B,ie)&&(j[ie]=B[ie])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),d=/^\w[\w\d+.-]*$/,h=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!d.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!h.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var A="",E="/",C=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,P=function(){function q(L,j,B,ie,ae,Q){Q===void 0&&(Q=!1),typeof L=="object"?(this.scheme=L.scheme||A,this.authority=L.authority||A,this.path=L.path||A,this.query=L.query||A,this.fragment=L.fragment||A):(this.scheme=function(ct,Ze){return ct||Ze?ct:"file"}(L,Q),this.authority=j||A,this.path=function(ct,Ze){switch(ct){case"https":case"http":case"file":Ze?Ze[0]!==E&&(Ze=E+Ze):Ze=E}return Ze}(this.scheme,B||A),this.query=ie||A,this.fragment=ae||A,y(this,Q))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return ke(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,ie=L.path,ae=L.query,Q=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=A),B===void 0?B=this.authority:B===null&&(B=A),ie===void 0?ie=this.path:ie===null&&(ie=A),ae===void 0?ae=this.query:ae===null&&(ae=A),Q===void 0?Q=this.fragment:Q===null&&(Q=A),j===this.scheme&&B===this.authority&&ie===this.path&&ae===this.query&&Q===this.fragment?this:new O(j,B,ie,ae,Q)},q.parse=function(L,j){j===void 0&&(j=!1);var B=C.exec(L);return B?new O(B[2]||A,ce(B[4]||A),ce(B[5]||A),ce(B[7]||A),ce(B[9]||A),j):new O(A,A,A,A,A)},q.file=function(L){var j=A;if(c.isWindows&&(L=L.replace(/\\/g,E)),L[0]===E&&L[1]===E){var B=L.indexOf(E,2);B===-1?(j=L.substring(2),L=E):(j=L.substring(2,B),L=L.substring(B)||E)}return new O("file",j,L,A,A)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),Ee(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=P;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=ke(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?Ee(this,!0):(this._formatted||(this._formatted=Ee(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(P),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,ie=-1,ae=0;ae<q.length;ae++){var Q=q.charCodeAt(ae);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||L&&Q===47||j&&Q===91||j&&Q===93||j&&Q===58)ie!==-1&&(B+=encodeURIComponent(q.substring(ie,ae)),ie=-1),B!==void 0&&(B+=q.charAt(ae));else{B===void 0&&(B=q.substr(0,ae));var ct=F[Q];ct!==void 0?(ie!==-1&&(B+=encodeURIComponent(q.substring(ie,ae)),ie=-1),B+=ct):ie===-1&&(ie=ae)}}return ie!==-1&&(B+=encodeURIComponent(q.substring(ie))),B!==void 0?B:q}function ee(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function ke(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function Ee(q,L){var j=L?ee:W,B="",ie=q.scheme,ae=q.authority,Q=q.path,ct=q.query,Ze=q.fragment;if(ie&&(B+=ie,B+=":"),(ae||ie==="file")&&(B+=E,B+=E),ae){var Ot=ae.indexOf("@");if(Ot!==-1){var nn=ae.substr(0,Ot);ae=ae.substr(Ot+1),(Ot=nn.lastIndexOf(":"))===-1?B+=j(nn,!1,!1):(B+=j(nn.substr(0,Ot),!1,!1),B+=":",B+=j(nn.substr(Ot+1),!1,!0)),B+="@"}(Ot=(ae=ae.toLowerCase()).lastIndexOf(":"))===-1?B+=j(ae,!1,!0):(B+=j(ae.substr(0,Ot),!1,!0),B+=ae.substr(Ot))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58)(wr=Q.charCodeAt(1))>=65&&wr<=90&&(Q="/".concat(String.fromCharCode(wr+32),":").concat(Q.substr(3)));else if(Q.length>=2&&Q.charCodeAt(1)===58){var wr;(wr=Q.charCodeAt(0))>=65&&wr<=90&&(Q="".concat(String.fromCharCode(wr+32),":").concat(Q.substr(2)))}B+=j(Q,!0,!1)}return ct&&(B+="?",B+=j(ct,!1,!1)),Ze&&(B+="#",B+=L?Ze:W(Ze,!1,!1)),B}function Xe(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Xe(q.substr(3)):q}}a.uriToFsPath=ke;var V=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function ce(q){return q.match(V)?q.replace(V,function(L){return Xe(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(h,v,y){if(y||arguments.length===2)for(var A,E=0,C=v.length;E<C;E++)!A&&E in v||(A||(A=Array.prototype.slice.call(v,0,E)),A[E]=v[E]);return h.concat(A||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,d="/";(u=a.Utils||(a.Utils={})).joinPath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return h.with({path:c.join.apply(c,s([h.path],v,!1))})},u.resolvePath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var A=h.path,E=!1;A[0]!==d&&(A=d+A,E=!0);var C=c.resolve.apply(c,s([A],v,!1));return E&&C[0]===d&&!h.authority&&(C=C.substring(1)),h.with({path:C})},u.dirname=function(h){if(h.path.length===0||h.path===d)return h;var v=c.dirname(h.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),h.with({path:v})},u.basename=function(h){return c.basename(h.path)},u.extname=function(h){return c.extname(h.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Fu=f(Go=>{"use strict";Object.defineProperty(Go,"__esModule",{value:!0});Go.eagerLoad=Go.inject=void 0;function nU(t,e,r,n){let i=[t,e,r,n].reduce(CS,{});return bS(i)}Go.inject=nU;var ty=Symbol("isProxy");function PS(t){if(t&&t[ty])for(let e of Object.values(t))PS(e);return t}Go.eagerLoad=PS;function bS(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>SS(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(SS(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),ty]});return r[ty]=!0,r}var AS=Symbol();function SS(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===AS)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=AS;try{t[e]=typeof i=="function"?i(n):bS(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function CS(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=CS(i,n):t[r]=n}}return t}});var vn=f(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.MultiMap=void 0;var Uo=Mt(),ry=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Uo.Reduction.sum((0,Uo.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,Uo.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,Uo.stream)(this.map.keys())}values(){return(0,Uo.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,Uo.stream)(this.map.entries())}};Xc.MultiMap=ry});var we=f(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isUnionType=_.UnionType=_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=void 0;var iU=tr();_.AbstractRule="AbstractRule";function aU(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=aU;_.AbstractType="AbstractType";function oU(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=oU;_.Condition="Condition";function sU(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=sU;_.TypeDefinition="TypeDefinition";function uU(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=uU;_.AbstractElement="AbstractElement";function lU(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=lU;_.ArrayType="ArrayType";function cU(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=cU;_.Conjunction="Conjunction";function fU(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=fU;_.Disjunction="Disjunction";function dU(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=dU;_.Grammar="Grammar";function pU(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=pU;_.GrammarImport="GrammarImport";function mU(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=mU;_.InferredType="InferredType";function hU(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=hU;_.Interface="Interface";function yU(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=yU;_.LiteralCondition="LiteralCondition";function gU(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=gU;_.NamedArgument="NamedArgument";function vU(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=vU;_.Negation="Negation";function TU(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=TU;_.Parameter="Parameter";function _U(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=_U;_.ParameterReference="ParameterReference";function RU(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=RU;_.ParserRule="ParserRule";function AU(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=AU;_.ReferenceType="ReferenceType";function SU(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=SU;_.ReturnType="ReturnType";function PU(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=PU;_.SimpleType="SimpleType";function bU(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=bU;_.TerminalRule="TerminalRule";function CU(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=CU;_.Type="Type";function kU(t){return _.reflection.isInstance(t,_.Type)}_.isType=kU;_.TypeAttribute="TypeAttribute";function EU(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=EU;_.UnionType="UnionType";function wU(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=wU;_.Action="Action";function NU(t){return _.reflection.isInstance(t,_.Action)}_.isAction=NU;_.Alternatives="Alternatives";function $U(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=$U;_.Assignment="Assignment";function OU(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=OU;_.CharacterRange="CharacterRange";function IU(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=IU;_.CrossReference="CrossReference";function DU(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=DU;_.Group="Group";function xU(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=xU;_.Keyword="Keyword";function LU(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=LU;_.NegatedToken="NegatedToken";function qU(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=qU;_.RegexToken="RegexToken";function MU(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=MU;_.RuleCall="RuleCall";function FU(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=FU;_.TerminalAlternatives="TerminalAlternatives";function jU(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=jU;_.TerminalGroup="TerminalGroup";function GU(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=GU;_.TerminalRuleCall="TerminalRuleCall";function UU(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=UU;_.UnorderedGroup="UnorderedGroup";function HU(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=HU;_.UntilToken="UntilToken";function KU(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=KU;_.Wildcard="Wildcard";function WU(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=WU;var Jc=class extends iU.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=Jc;_.reflection=new Jc});var Ae=f(tt=>{"use strict";Object.defineProperty(tt,"__esModule",{value:!0});tt.copyAstNode=tt.findLocalReferences=tt.streamReferences=tt.streamAst=tt.streamAllContents=tt.streamContents=tt.findRootNode=tt.getDocument=tt.hasContainerOfType=tt.getContainerOfType=tt.linkContentToContainer=void 0;var Un=tr(),Ji=Mt(),BU=Le();function kS(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,Un.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,Un.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}tt.linkContentToContainer=kS;function VU(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}tt.getContainerOfType=VU;function zU(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}tt.hasContainerOfType=zU;function ES(t){let r=wS(t).$document;if(!r)throw new Error("AST node has no document.");return r}tt.getDocument=ES;function wS(t){for(;t.$container;)t=t.$container;return t}tt.findRootNode=wS;function ay(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Ji.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let a=t[i];if((0,Un.isAstNode)(a)){if(n.keyIndex++,ny(a,r))return{done:!1,value:a}}else if(Array.isArray(a)){for(;n.arrayIndex<a.length;){let o=n.arrayIndex++,s=a[o];if((0,Un.isAstNode)(s)&&ny(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return Ji.DONE_RESULT})}tt.streamContents=ay;function YU(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Ji.TreeStreamImpl(t,r=>ay(r,e))}tt.streamAllContents=YU;function NS(t,e){if(t){if(e?.range&&!ny(t,e.range))return new Ji.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Ji.TreeStreamImpl(t,r=>ay(r,e),{includeRoot:!0})}tt.streamAst=NS;function ny(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,BU.inRange)(n,e):!1}function $S(t){return new Ji.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Un.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,Un.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return Ji.DONE_RESULT})}tt.streamReferences=$S;function XU(t,e=ES(t).parseResult.value){let r=[];return NS(e).forEach(n=>{$S(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,Ji.stream)(r)}tt.findLocalReferences=XU;function iy(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,Un.isAstNode)(i))r[n]=iy(i,e);else if((0,Un.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,Un.isAstNode)(o)?a.push(iy(o,e)):(0,Un.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return kS(r),r}tt.copyAstNode=iy});var DS=f(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.getSourceRegion=void 0;var OS=Ae(),JU=gt(),QU=Mt();function ZU(t){var e,r;if(t){if("astNode"in t)return rH(t);if(Array.isArray(t))return t.reduce(IS,void 0);{let n=t,i=eH(n)?tH((r=(e=n?.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n?.element):void 0;return Ho(n,i)}}else return}Qc.getSourceRegion=ZU;function eH(t){return typeof t<"u"&&"element"in t&&"text"in t}function tH(t){try{return(0,OS.getDocument)(t).uri.toString()}catch{return}}function rH(t){var e,r;let{astNode:n,property:i,index:a}=t??{},o=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||o===void 0)){if(i===void 0)return Ho(o,oy(n));{let s=u=>a!==void 0&&a>-1&&Array.isArray(n[i])?a<u.length?u[a]:void 0:u.reduce(IS,void 0);if(!((r=o.assignments)===null||r===void 0)&&r[i]){let u=s(o.assignments[i]);return u&&Ho(u,oy(n))}else if(n.$cstNode){let u=s((0,JU.findNodesForProperty)(n.$cstNode,i));return u&&Ho(u,oy(n))}else return}}}function oy(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,OS.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new QU.TreeStreamImpl(t,a=>a.$container?[a.$container]:[]).find(a=>{var o;return(o=a.$textRegion)===null||o===void 0?void 0:o.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function Ho(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function IS(t,e){var r,n;if(t){if(!e)return t&&Ho(t)}else return e&&Ho(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,a=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,o=Math.min(t.offset,e.offset),s=Math.max(i,a),u=s-o,l={offset:o,end:s,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,d=e.fileURI,h=c&&d&&c!==d?`<unmergable text regions of ${c}, ${d}>`:c??d;l.fileURI=h}return l}});var FS=f(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.processGeneratorNode=void 0;var ju=Fa(),nH=DS(),sy=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=iH(e,this.currentPosition,n=>{var i,a;return(a=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||a===void 0?void 0:a.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function iH(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var a,o;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((a=n.children)===null||a===void 0?void 0:a.length)===0&&delete n.children,!((o=n.targetRegion)===null||o===void 0)&&o.length&&r(n),delete n.complete,n}};return n}function aH(t,e){let r=new sy(e),n=r.pushTraceRegion(void 0);xS(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,a=i?.targetRegion,o=n.targetRegion;return a&&i.sourceRegion&&a.offset===o.offset&&a.length===o.length?{text:r.content,trace:i}:{text:r.content,trace:n}}Zc.processGeneratorNode=aH;function xS(t,e){typeof t=="string"?oH(t,e):t instanceof ju.IndentNode?sH(t,e):t instanceof ju.CompositeGeneratorNode?MS(t,e):t instanceof ju.NewLineNode&&uH(t,e)}function LS(t,e){return typeof t=="string"?t.length!==0:t instanceof ju.CompositeGeneratorNode?t.contents.some(r=>LS(r,e)):t instanceof ju.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function oH(t,e){t&&(e.pendingIndent&&qS(e,!1),e.append(t))}function qS(t,e){var r;let n="";for(let i of t.relevantIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function MS(t,e){let r,n=(0,nH.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)xS(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function sH(t,e){var r;if(LS(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),MS(t,e)}finally{e.decreaseIndent()}}}function uH(t,e){t.ifNotEmpty&&!lH(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&qS(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function lH(t){return t.trimStart()!==""}});var ef=f(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.normalizeEOL=Pt.findIndentation=Pt.NEWLINE_REGEXP=Pt.SNLE=Pt.expandToString=Pt.expandToStringWithNL=void 0;var Gu=Fa();function cH(t,...e){return jS(t,...e)+Gu.EOL}Pt.expandToStringWithNL=cH;function jS(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Pt.SNLE:dH((0,Gu.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(Pt.NEWLINE_REGEXP).filter(o=>o.trim()!==Pt.SNLE).map(o=>o.replace(Pt.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=GS(r);return r.map(o=>o.slice(a).trimRight()).join(Gu.EOL)}Pt.expandToString=jS;Pt.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");Pt.NEWLINE_REGEXP=/\r?\n/g;var fH=/\S|$/;function dH(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Pt.NEWLINE_REGEXP,Gu.EOL+n)}function GS(t){let e=t.filter(n=>n.length>0).map(n=>n.search(fH)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Pt.findIndentation=GS;function pH(t){return t.replace(Pt.NEWLINE_REGEXP,Gu.EOL)}Pt.normalizeEOL=pH});var cy=f(Qi=>{"use strict";Object.defineProperty(Qi,"__esModule",{value:!0});Qi.expandTracedToNodeIf=Qi.expandTracedToNode=Qi.expandToNode=void 0;var rf=Fa(),ly=ef();function US(t,...e){let r=hH(t),n=yH(t,e,r);return vH(n)}Qi.expandToNode=US;function HS(t,e,r){return(n,...i)=>(0,rf.traceToNode)(t,e,r)(US(n,...i))}Qi.expandTracedToNode=HS;function mH(t,e,r,n){return t?HS(typeof e=="function"?e():e,r,n):()=>{}}Qi.expandTracedToNodeIf=mH;function hH(t){let e=t.join("_").split(ly.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,ly.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function yH(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(ly.NEWLINE_REGEXP).map((d,h)=>h===0||d.length<r?d:d.substring(r)).reduce(c===0?(d,h,v)=>v===0?n?[]:[h]:v===1&&d.length===0?[h]:d.concat(tf,h):(d,h,v)=>v===0?[h]:d.concat(tf,h),[]).filter(d=>!(typeof d=="string"&&d.length===0)).concat((0,rf.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new rf.CompositeGeneratorNode(String(e[c])):c<e.length?KS:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===tf?o.slice(0,s-2):o.slice(0,s-1):o}var tf={isNewLine:!0},KS={isUndefinedSegment:!0},uy=t=>t===tf,gH=t=>t===KS;function vH(t){return t.reduce((r,n,i)=>gH(n)?r:uy(n)?{node:i===0||uy(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var a;let o=(i===0||uy(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:o.length!==0?r.node.indent({indentation:o,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s??((a=r.indented)===null||a===void 0?void 0:a.append(n))}})(),{node:new rf.CompositeGeneratorNode}).node}});var Fa=f(Ne=>{"use strict";Object.defineProperty(Ne,"__esModule",{value:!0});Ne.NLEmpty=Ne.NL=Ne.NewLineNode=Ne.IndentNode=Ne.traceToNodeIf=Ne.traceToNode=Ne.CompositeGeneratorNode=Ne.toStringAndTrace=Ne.toString=Ne.isNewLineNode=Ne.isGeneratorNode=Ne.EOL=void 0;var TH=tr(),BS=FS(),WS=cy();Ne.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function VS(t){return t instanceof Ti||t instanceof Uu||t instanceof ja}Ne.isGeneratorNode=VS;function _H(t){return t instanceof ja}Ne.isNewLineNode=_H;function RH(t,e){return VS(t)?(0,BS.processGeneratorNode)(t,e).text:String(t)}Ne.toString=RH;function AH(t,e){return(0,BS.processGeneratorNode)(t,e)}Ne.toStringAndTrace=AH;var Ti=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,TH.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(Ne.NL)}appendNewLineIf(e){return e?this.append(Ne.NL):this}appendNewLineIfNotEmpty(){return this.append(Ne.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,WS.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:a}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},o=new Uu(n,a,i);return this.contents.push(o),Array.isArray(r)?o.append(...r):r&&o.append(r),this}appendTraced(e,r,n){return i=>this.append(new Ti().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...a)=>this.append((0,WS.expandTracedToNode)(e,r,n)(i,...a))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};Ne.CompositeGeneratorNode=Ti;function zS(t,e,r){return n=>n instanceof Ti&&n.tracedSource===void 0?n.trace(t,e,r):new Ti().trace(t,e,r).append(n)}Ne.traceToNode=zS;function SH(t,e,r,n){return t?zS(typeof e=="function"?e():e,r,n):()=>{}}Ne.traceToNodeIf=SH;var Uu=class extends Ti{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ne.IndentNode=Uu;var ja=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ne.EOL,this.ifNotEmpty=r}};Ne.NewLineNode=ja;Ne.NL=new ja;Ne.NLEmpty=new ja(void 0,!0)});var Bo=f($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.propertyTypeToString=$e.isTypeAssignable=$e.TypeResolutionError=$e.InterfaceType=$e.UnionType=$e.isInterfaceType=$e.isUnionType=$e.isStringType=$e.isPrimitiveType=$e.isValueType=$e.flattenPropertyUnion=$e.isPropertyUnion=$e.isArrayType=$e.isReferenceType=void 0;var rt=Fa(),Ko=Vo();function Ku(t){return"referenceType"in t}$e.isReferenceType=Ku;function Wu(t){return"elementType"in t}$e.isArrayType=Wu;function Ha(t){return"types"in t}$e.isPropertyUnion=Ha;function XS(t){if(Ha(t)){let e=[];for(let r of t.types)e.push(...XS(r));return e}else return[t]}$e.flattenPropertyUnion=XS;function Hu(t){return"value"in t}$e.isValueType=Hu;function Wo(t){return"primitive"in t}$e.isPrimitiveType=Wo;function nf(t){return"string"in t}$e.isStringType=nf;function dy(t){return t&&"type"in t}$e.isUnionType=dy;function hy(t){return t&&"properties"in t}$e.isInterfaceType=hy;var py=class{constructor(e,r){var n,i;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.reflection=(n=r?.reflection)!==null&&n!==void 0?n:!1,this.declared=(i=r?.declared)!==null&&i!==void 0?i:!1}toAstTypesString(e){let r=new rt.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Ua(this.type,"AstType")};`,rt.NL),this.reflection&&e&&(r.append(rt.NL),ZS(r,this.name)),(0,rt.toString)(r)}toDeclaredTypesString(e){let r=new rt.CompositeGeneratorNode;return r.append(`type ${yy(this.name,e)} = ${Ua(this.type,"DeclaredType")};`,rt.NL),(0,rt.toString)(r)}};$e.UnionType=py;var Bu=class{get superProperties(){let e=new Map;for(let r of this.properties)e.set(r.name,r);for(let r of this.interfaceSuperTypes){let n=r.superProperties;for(let i of n)e.has(i.name)||e.set(i.name,i)}return Array.from(e.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e);return Array.from(e.values())}getSubTypeProperties(e,r){let n=hy(e)?e.properties:[];for(let i of n)r.has(i.name)||r.set(i.name,i);for(let i of e.subTypes)this.getSubTypeProperties(i,r)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof Bu)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new rt.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(a=>a.name),i=n.length>0?(0,Ko.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,rt.NL),r.indent(a=>{this.containerTypes.size>0&&a.append(`readonly $container: ${(0,Ko.distinctAndSorted)([...this.containerTypes].map(o=>o.name)).join(" | ")};`,rt.NL),this.typeNames.size>0&&a.append(`readonly $type: ${(0,Ko.distinctAndSorted)([...this.typeNames]).map(o=>`'${o}'`).join(" | ")};`,rt.NL),YS(a,this.properties,"AstType")}),r.append("}",rt.NL),e&&(r.append(rt.NL),ZS(r,this.name)),(0,rt.toString)(r)}toDeclaredTypesString(e){let r=new rt.CompositeGeneratorNode,n=yy(this.name,e),i=(0,Ko.distinctAndSorted)(this.interfaceSuperTypes.map(a=>a.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,rt.NL),r.indent(a=>YS(a,this.properties,"DeclaredType",e)),r.append("}",rt.NL),(0,rt.toString)(r)}};$e.InterfaceType=Bu;var my=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};$e.TypeResolutionError=my;function Ga(t,e){return Ha(t)?t.types.every(r=>Ga(r,e)):Ha(e)?e.types.some(r=>Ga(t,r)):Ku(t)?Ku(e)&&Ga(t.referenceType,e.referenceType):Wu(t)?Wu(e)&&Ga(t.elementType,e.elementType):Hu(t)?dy(t.value)?Hu(e)&&e.value.name===t.value.name?!0:Ga(t.value.type,e):Hu(e)?dy(e.value)?Ga(t,e.value.type):JS(t.value,e.value,new Set):!1:Wo(t)?Wo(e)&&t.primitive===e.primitive:nf(t)?Wo(e)&&e.primitive==="string"||nf(e)&&e.string===t.string:!1}$e.isTypeAssignable=Ga;function JS(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(hy(n)&&JS(n,e,r))return!0;return!1}function Ua(t,e="AstType"){if(Ku(t)){let r=Ua(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${fy(t.referenceType,r)}`}else if(Wu(t)){let r=Ua(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${fy(t.elementType,r)}[]`}else if(Ha(t)){let r=t.types.map(n=>fy(n,Ua(n,e)));return(0,Ko.distinctAndSorted)(r).join(" | ")}else{if(Hu(t))return t.value.name;if(Wo(t))return t.primitive;if(nf(t))return`'${t.string}'`}throw new Error("Invalid type")}$e.propertyTypeToString=Ua;function fy(t,e){return Ha(t)&&(e=`(${e})`),e}function YS(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:yy(a.name,n),s=a.optional&&!QS(a.type),u=Ua(a.type,r);return`${o}${s?"?":""}: ${u}`}(0,Ko.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),rt.NL))}function QS(t){return Wu(t)?!0:Ku(t)?!1:Ha(t)?t.types.every(e=>QS(e)):Wo(t)?t.primitive==="boolean":!1}function ZS(t,e){t.append(`export const ${e} = '${e}';`,rt.NL),t.append(rt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,rt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,rt.NL)),t.append("}",rt.NL)}function yy(t,e){return e.has(t)?`^${t}`:t}});var Vo=f(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.findReferenceTypes=nt.hasBooleanType=nt.hasArrayType=nt.sortInterfacesTopologically=nt.mergeTypesAndInterfaces=nt.mergeInterfaces=nt.collectSuperTypes=nt.collectTypeHierarchy=nt.collectChildrenTypes=nt.distinctAndSorted=nt.collectAllPlainProperties=void 0;var Vu=vn(),_i=we(),Zi=Bo();function PH(t){let e=new Vu.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}nt.collectAllPlainProperties=PH;function bH(t,e){return Array.from(new Set(t)).sort(e)}nt.distinctAndSorted=bH;function eP(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,_i.isInterface)(u)?(i.add(u),eP(u,e,r,n).forEach(c=>i.add(c))):u&&(0,_i.isType)(u.$container)&&i.add(u.$container)}),i}nt.collectChildrenTypes=eP;function CH(t){let e=new Vu.MultiMap,r=new Vu.MultiMap;for(let a of t){for(let o of a.superTypes)e.add(a.name,o.name),r.add(o.name,a.name);for(let o of a.subTypes)e.add(o.name,a.name),r.add(a.name,o.name)}let n=new Vu.MultiMap,i=new Vu.MultiMap;for(let[a,o]of Array.from(e.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))n.addAll(a,Array.from(new Set(o)));for(let[a,o]of Array.from(r.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))i.addAll(a,Array.from(new Set(o)));return{superTypes:n,subTypes:i}}nt.collectTypeHierarchy=CH;function gy(t){let e=new Set;if((0,_i.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,_i.isInterface)(r.ref)){e.add(r.ref);let n=gy(r.ref);for(let i of n)e.add(i)}});else if((0,_i.isType)(t)){let r=tP(t.type);for(let n of r){let i=gy(n);for(let a of i)e.add(a)}}return e}nt.collectSuperTypes=gy;function tP(t){var e;if((0,_i.isUnionType)(t))return t.types.flatMap(r=>tP(r));if((0,_i.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,_i.isType)(r)||(0,_i.isInterface)(r))return[r]}return[]}function kH(t,e){return t.interfaces.concat(e.interfaces)}nt.mergeInterfaces=kH;function EH(t){return t.interfaces.concat(t.unions)}nt.mergeTypesAndInterfaces=EH;function wH(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.superTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}nt.sortInterfacesTopologically=wH;function rP(t){return(0,Zi.isPropertyUnion)(t)?t.types.some(e=>rP(e)):!!(0,Zi.isArrayType)(t)}nt.hasArrayType=rP;function nP(t){return(0,Zi.isPropertyUnion)(t)?t.types.some(e=>nP(e)):(0,Zi.isPrimitiveType)(t)?t.primitive==="boolean":!1}nt.hasBooleanType=nP;function vy(t){if((0,Zi.isPropertyUnion)(t))return t.types.flatMap(e=>vy(e));if((0,Zi.isReferenceType)(t)){let e=t.referenceType;if((0,Zi.isValueType)(e))return[e.value.name]}else if((0,Zi.isArrayType)(t))return vy(t.elementType);return[]}nt.findReferenceTypes=vy});var Yo=f(zo=>{"use strict";Object.defineProperty(zo,"__esModule",{value:!0});zo.DefaultNameProvider=zo.isNamed=void 0;var NH=gt();function iP(t){return typeof t.name=="string"}zo.isNamed=iP;var Ty=class{getName(e){if(iP(e))return e.name}getNameNode(e){return(0,NH.findNodeForProperty)(e.$cstNode,"name")}};zo.DefaultNameProvider=Ty});var zu=f((aP,af)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof af=="object"&&af.exports?af.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:aP,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var A=this.disjunction();this.consumeChar("/");for(var E={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(E,"global");break;case"i":o(E,"ignoreCase");break;case"m":o(E,"multiLine");break;case"u":o(E,"unicode");break;case"y":o(E,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:E,value:A,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],A=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(A)}},t.prototype.alternative=function(){for(var y=[],A=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(A)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var A;switch(this.popChar()){case"=":A="Lookahead";break;case"!":A="NegativeLookahead";break}s(A);var E=this.disjunction();return this.consumeChar(")"),{type:A,value:E,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var A,E=this.idx;switch(this.popChar()){case"*":A={atLeast:0,atMost:1/0};break;case"+":A={atLeast:1,atMost:1/0};break;case"?":A={atLeast:0,atMost:1};break;case"{":var C=this.integerIncludingZero();switch(this.popChar()){case"}":A={atLeast:C,atMost:C};break;case",":var P;this.isDigit()?(P=this.integerIncludingZero(),A={atLeast:C,atMost:P}):A={atLeast:C,atMost:1/0},this.consumeChar("}");break}if(y===!0&&A===void 0)return;s(A);break}if(!(y===!0&&A===void 0))return s(A),this.peekChar(0)==="?"?(this.consumeChar("?"),A.greedy=!1):A.greedy=!0,A.type="Quantifier",A.loc=this.loc(E),A},t.prototype.atom=function(){var y,A=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(A),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,A=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,A=!0;break;case"s":y=h;break;case"S":y=h,A=!0;break;case"w":y=d;break;case"W":y=d,A=!0;break}return s(y),{type:"Set",value:y,complement:A}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var A=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:A}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],A=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),A=!0);this.isClassAtom();){var E=this.classAtom(),C=E.type==="Character";if(C&&this.isRangeDash()){this.consumeChar("-");var P=this.classAtom(),S=P.type==="Character";if(S){if(P.value<E.value)throw Error("Range out of order in character class");y.push({from:E.value,to:P.value})}else a(E.value,y),y.push(i("-")),a(P.value,y)}else a(E.value,y)}return this.consumeChar("]"),{type:"Set",complement:A,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var A=this.disjunction();this.consumeChar(")");var E={type:"Group",capturing:y,value:A};return y&&(E.idx=this.groupIdx),E},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var A="",E=0;E<y;E++){var C=this.popChar();if(e.test(C)===!1)throw Error("Expecting a HexDecimal digits");A+=C}var P=parseInt(A,16);return{type:"Character",value:P}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,A){y.length!==void 0?y.forEach(function(E){A.push(E)}):A.push(y)}function o(y,A){if(y[A]===!0)throw"duplicate flag "+A;y[A]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var d=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)d.push(l);for(l=i("A");l<=i("Z");l++)d.push(l);var h=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var A in y){var E=y[A];y.hasOwnProperty(A)&&(E.type!==void 0?this.visit(E):Array.isArray(E)&&E.forEach(function(C){this.visit(C)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var Wa=f(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.partialRegex=rr.partialMatches=rr.getCaseInsensitivePattern=rr.escapeRegExp=rr.isWhitespaceRegExp=rr.isMultilineComment=rr.getTerminalParts=void 0;var oP=zu(),sP=new oP.RegExpParser,_y=class extends oP.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Ry(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Ka=new _y;function $H(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=sP.pattern(t),r=[];for(let n of e.value.value)Ka.reset(t),Ka.visit(n),r.push({start:Ka.startRegex,end:Ka.endRegex});return r}catch{return[]}}rr.getTerminalParts=$H;function OH(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Ka.reset(t),Ka.visit(sP.pattern(t)),Ka.multiline}catch{return!1}}rr.isMultilineComment=OH;function IH(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}rr.isWhitespaceRegExp=IH;function Ry(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}rr.escapeRegExp=Ry;function DH(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Ry(e)).join("")}rr.getCaseInsensitivePattern=DH;function xH(t,e){let r=uP(t),n=e.match(r);return!!n&&n[0].length>0}rr.partialMatches=xH;function uP(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}rr.partialRegex=uP});var Ft=f(se=>{"use strict";var LH=se&&se.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),qH=se&&se.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),MH=se&&se.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&LH(e,t,r);return qH(e,t),e};Object.defineProperty(se,"__esModule",{value:!0});se.isPrimitiveType=se.extractAssignments=se.resolveTransitiveImports=se.resolveImport=se.resolveImportUri=se.terminalRegex=se.getRuleType=se.getActionType=se.getExplicitRuleType=se.getTypeNameWithoutError=se.getTypeName=se.getActionAtElement=se.isDataTypeRule=se.isArrayOperator=se.isArrayCardinality=se.isOptionalCardinality=void 0;var Se=MH(we()),lP=Gn(),of=Ae(),FH=Bo(),jH=Wa();function GH(t){return t==="?"||t==="*"}se.isOptionalCardinality=GH;function UH(t){return t==="*"||t==="+"}se.isArrayCardinality=UH;function HH(t){return t==="+="}se.isArrayOperator=HH;function Py(t){return cP(t,new Set)}se.isDataTypeRule=Py;function cP(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,of.streamAllContents)(t))if(Se.isRuleCall(r)){if(!r.rule.ref||Se.isParserRule(r.rule.ref)&&!cP(r.rule.ref,e))return!1}else{if(Se.isAssignment(r))return!1;if(Se.isAction(r))return!1}return Boolean(t.definition)}function fP(t){let e=t.$container;if(Se.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(Se.isAction(a))return a;{let o=(0,of.streamAllContents)(r[i]).find(Se.isAction);if(o)return o}}}if(Se.isAbstractElement(e))return fP(e)}se.getActionAtElement=fP;function by(t){var e;if(Se.isParserRule(t))return Py(t)?t.name:(e=Cy(t))!==null&&e!==void 0?e:t.name;if(Se.isInterface(t)||Se.isType(t)||Se.isReturnType(t))return t.name;if(Se.isAction(t)){let r=dP(t);if(r)return r}else if(Se.isInferredType(t))return t.name;throw new FH.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}se.getTypeName=by;function KH(t){if(t)try{return by(t)}catch{return}}se.getTypeNameWithoutError=KH;function Cy(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(Se.isParserRule(e))return e.name;if(Se.isInterface(e)||Se.isType(e))return e.name}}}se.getExplicitRuleType=Cy;function dP(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return by(t.type.ref)}se.getActionType=dP;function WH(t){var e,r,n;return Se.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Py(t)?t.name:(n=Cy(t))!==null&&n!==void 0?n:t.name}se.getRuleType=WH;function pP(t){return Yu(t.definition)}se.terminalRegex=pP;var ky=/[\s\S]/.source;function Yu(t){if(Se.isTerminalAlternatives(t))return BH(t);if(Se.isTerminalGroup(t))return VH(t);if(Se.isCharacterRange(t))return XH(t);if(Se.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return Ri(pP(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Se.isNegatedToken(t))return YH(t);if(Se.isUntilToken(t))return zH(t);if(Se.isRegexToken(t))return Ri(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(Se.isWildcard(t))return Ri(ky,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}function BH(t){return Ri(t.elements.map(Yu).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function VH(t){return Ri(t.elements.map(Yu).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function zH(t){return Ri(`${ky}*?${Yu(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function YH(t){return Ri(`(?!${Yu(t.terminal)})${ky}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function XH(t){return t.right?Ri(`[${Ay(t.left)}-${Ay(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):Ri(Ay(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Ay(t){return(0,jH.escapeRegExp)(t.value)}function Ri(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function mP(t){if(t.path===void 0||t.path.length===0)return;let e=lP.Utils.dirname((0,of.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),lP.Utils.resolvePath(e,r)}se.resolveImportUri=mP;function Ey(t,e){let r=mP(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(Se.isGrammar(i))return i}}catch{}}se.resolveImport=Ey;function JH(t,e){if(Se.isGrammarImport(e)){let r=Ey(t,e);if(r){let n=Sy(t,r);return n.push(r),n}return[]}else return Sy(t,e)}se.resolveTransitiveImports=JH;function Sy(t,e,r=e,n=new Set,i=new Set){let a=(0,of.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=Ey(t,o);s&&Sy(t,s,r,n,i)}}return Array.from(i)}function hP(t){return Se.isAssignment(t)?[t]:Se.isAlternatives(t)||Se.isGroup(t)||Se.isUnorderedGroup(t)?t.elements.flatMap(e=>hP(e)):[]}se.extractAssignments=hP;var QH=["string","number","boolean","Date","bigint"];function ZH(t){return QH.includes(t)}se.isPrimitiveType=ZH});var ff=f(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.flattenPlainType=it.mergePropertyTypes=it.plainToTypes=it.isPlainStringType=it.isPlainPrimitiveType=it.isPlainValueType=it.isPlainPropertyUnion=it.isPlainArrayType=it.isPlainReferenceType=it.isPlainUnion=it.isPlainInterface=void 0;var yP=Bo();function eK(t){return!gP(t)}it.isPlainInterface=eK;function gP(t){return"type"in t}it.isPlainUnion=gP;function sf(t){return"referenceType"in t}it.isPlainReferenceType=sf;function uf(t){return"elementType"in t}it.isPlainArrayType=uf;function Ny(t){return"types"in t}it.isPlainPropertyUnion=Ny;function lf(t){return"value"in t}it.isPlainValueType=lf;function vP(t){return"primitive"in t}it.isPlainPrimitiveType=vP;function TP(t){return"string"in t}it.isPlainStringType=TP;function tK(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new yP.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new yP.UnionType(n.name,{reflection:n.reflection,declared:n.declared});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let a of n.superTypes){let o=e.get(a)||r.get(a);o&&i.superTypes.add(o)}for(let a of n.subTypes){let o=e.get(a)||r.get(a);o&&i.subTypes.add(o)}for(let a of n.properties){let o=rK(a,e,r);i.properties.push(o)}}for(let n of t.unions){let i=r.get(n.name);i.type=Xu(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}it.plainToTypes=tK;function rK(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:Xu(t.type,void 0,e,r)}}function Xu(t,e,r,n){if(uf(t))return{elementType:Xu(t.elementType,e,r,n)};if(sf(t))return{referenceType:Xu(t.referenceType,void 0,r,n)};if(Ny(t))return{types:t.types.map(i=>Xu(i,e,r,n))};if(TP(t))return{string:t.string};if(vP(t))return{primitive:t.primitive};if(lf(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function nK(t,e){let r=cf(t),n=cf(e);for(let i of n)iK(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}it.mergePropertyTypes=nK;function iK(t,e){return t.some(r=>wy(r,e))}function wy(t,e){return uf(t)&&uf(e)?wy(t.elementType,e.elementType):sf(t)&&sf(e)?wy(t.referenceType,e.referenceType):lf(t)&&lf(e)?t.value===e.value:!1}function cf(t){return Ny(t)?t.types.flatMap(e=>cf(e)):[t]}it.flattenPlainType=cf});var CP=f(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.collectInferredTypes=void 0;var aK=Yo(),Dy=vn(),dt=we(),Ai=Ft(),RP=ff(),$y=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:_P(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return bP(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(_P(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ba();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function oK(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(AP)}}function _P(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>AP(e))}}function AP(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function sK(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...SP(i,u));let a=pK(n),o=mK(a),s=hK(a,o,r);for(let u of e){let l=uK(u);s.unions.push({name:u.name,reflection:!1,declared:!1,type:l,subTypes:new Set,superTypes:new Set})}return s}df.collectInferredTypes=sK;function uK(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Oy(t.definition,r);return e?{primitive:"string"}:n}function Oy(t,e){var r,n,i;if(t.cardinality)return e();if((0,dt.isAlternatives)(t))return{types:t.elements.map(a=>Oy(a,e))};if((0,dt.isGroup)(t)||(0,dt.isUnorderedGroup)(t))return t.elements.length!==1?e():Oy(t.elements[0],e);if((0,dt.isRuleCall)(t)){let a=(r=t.rule)===null||r===void 0?void 0:r.ref;return a?(0,dt.isTerminalRule)(a)?{primitive:(i=(n=a.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string"}:{value:a.name}:e()}else if((0,dt.isKeyword)(t))return{string:t.value};return e()}function SP(t,e){let r=Ba(e),n=new $y(t,r);return e.definition&&Iy(n,n.root,e.definition),n.getTypes()}function Ba(t){return{name:(0,dt.isParserRule)(t)||(0,dt.isAction)(t)?(0,Ai.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Iy(t,e,r){let n=(0,Ai.isOptionalCardinality)(r.cardinality);if((0,dt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,Ba()));for(let a of r.elements){let o=t.connect(e,Ba());i.push(Iy(t,o,a))}return t.merge(...i)}else if((0,dt.isGroup)(r)||(0,dt.isUnorderedGroup)(r)){let i=t.connect(e,Ba()),a;n&&(a=t.connect(e,Ba()));for(let o of r.elements)i=Iy(t,i,o);return a?t.merge(a,i):i}else{if((0,dt.isAction)(r))return lK(t,e,r);(0,dt.isAssignment)(r)?cK(e,r):(0,dt.isRuleCall)(r)&&fK(t,e,r)}return e}function lK(t,e,r){var n;if(!t.hasLeafNode(e)){let a=oK(e);t.connect(e,a)}let i=t.connect(e,Ba(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,aK.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:Va(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function cK(t,e){let r={types:new Set,reference:!1};PP(e.terminal,r);let n=Va(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Ai.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function PP(t,e){if((0,dt.isAlternatives)(t)||(0,dt.isUnorderedGroup)(t)||(0,dt.isGroup)(t))for(let r of t.elements)PP(r,e);else if((0,dt.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,dt.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Ai.getRuleType)(t.rule.ref));else if((0,dt.isCrossReference)(t)&&t.type.ref){let r=(0,Ai.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function fK(t,e,r){let n=r.rule.ref;if((0,dt.isParserRule)(n)&&n.fragment){let i=dK(n,t.context);(0,Ai.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,dt.isParserRule)(n)&&e.ruleCalls.push((0,Ai.getRuleType)(n))}function dK(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Ai.getTypeNameWithoutError)(t),a=SP(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function pK(t){let e=new Map,r=[],n=bP(t).map(i=>i.alt);for(let i of n){let a={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.superTypes.add(i.name)}return Array.from(e.values())}function bP(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Dy.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let d of c){let h=a.find(v=>v.name===d.name);h?(h.type=(0,RP.mergePropertyTypes)(h.type,d.type),d.astNodes.forEach(v=>h.astNodes.add(v))):a.push(Object.assign({},d))}l.ruleCalls.forEach(d=>o.add(d))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(d=>d.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function mK(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Dy.MultiMap;for(let i of t)for(let a of i.superTypes)n.add(a,i.name);for(let[i,a]of n.entriesGroupedByKey())if(!e.has(i)){let o={declared:!1,name:i,reflection:!0,subTypes:new Set,superTypes:new Set,type:Va(!1,!1,a)};r.push(o)}return r}function hK(t,e,r){let n=new Dy.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),a={interfaces:[],unions:e},o=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,a.interfaces.push(s);else{let l=Va(!1,!1,Array.from(u)),c=o.get(s.name);if(c)c.type=(0,RP.mergePropertyTypes)(c.type,l);else{let d={name:s.name,declared:!1,reflection:!0,subTypes:u,superTypes:s.superTypes,type:l};a.unions.push(d),o.set(s.name,d)}}else a.interfaces.push(s)}for(let s of a.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!o.has(u)));return a}function Va(t,e,r){if(t)return{elementType:Va(!1,e,r)};if(e)return{referenceType:Va(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Ai.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>Va(!1,!1,[n]))}}});var Ly=f(Jo=>{"use strict";Object.defineProperty(Jo,"__esModule",{value:!0});Jo.typeDefinitionToPropertyType=Jo.collectDeclaredTypes=void 0;var pf=we(),xy=Ft();function yK(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:Xo(s.type)});let a=new Set;for(let s of n.superTypes)s.ref&&a.add((0,xy.getTypeName)(s.ref));let o={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:a,subTypes:new Set};r.interfaces.push(o)}for(let n of e){let i={name:n.name,declared:!0,reflection:!0,type:Xo(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}Jo.collectDeclaredTypes=yK;function Xo(t){if((0,pf.isArrayType)(t))return{elementType:Xo(t.elementType)};if((0,pf.isReferenceType)(t))return{referenceType:Xo(t.referenceType)};if((0,pf.isUnionType)(t))return{types:t.types.map(Xo)};if((0,pf.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,xy.getTypeNameWithoutError)(r);if(n)return(0,xy.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}Jo.typeDefinitionToPropertyType=Xo});var EP=f(Qo=>{"use strict";Object.defineProperty(Qo,"__esModule",{value:!0});Qo.collectAllAstResources=Qo.collectTypeResources=void 0;var gK=CP(),vK=Ly(),TK=Ae(),_K=we(),kP=Ft();function RK(t,e){let r=qy(t,e),n=(0,vK.collectDeclaredTypes)(r.interfaces,r.types),i=(0,gK.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}Qo.collectTypeResources=RK;function qy(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,TK.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,_K.isParserRule)(o)&&!o.fragment&&((0,kP.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,kP.resolveImport)(e,s)).filter(s=>s!==void 0);qy(o,e,r,n)}}}return n}Qo.collectAllAstResources=qy});var jy=f(Hn=>{"use strict";Object.defineProperty(Hn,"__esModule",{value:!0});Hn.specifyAstNodeProperties=Hn.createAstTypes=Hn.collectValidationAst=Hn.collectAst=void 0;var NP=Vo(),Si=Bo(),$P=EP(),AK=ff();function SK(t,e){let{inferred:r,declared:n}=(0,$P.collectTypeResources)(t,e);return mf(r,n)}Hn.collectAst=SK;function PK(t,e){let{inferred:r,declared:n,astResources:i}=(0,$P.collectTypeResources)(t,e);return{astResources:i,inferred:mf(n,r),declared:mf(r,n)}}Hn.collectValidationAst=PK;function mf(t,e){var r,n;let i={interfaces:(0,NP.sortInterfacesTopologically)(wP(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:wP(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},a=(0,AK.plainToTypes)(i);return OP(a),a}Hn.createAstTypes=mf;function wP(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function OP(t){let e=CK(t),r=Array.from(e.values());kK(r),EK(r),bK(e)}Hn.specifyAstNodeProperties=OP;function bK(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeNames.add(n.name);let i=Array.from(n.superTypes).map(a=>t.get(a.name)).filter(a=>a!==void 0);for(let a of i)n.typeNames.forEach(o=>a.typeNames.add(o));e.push(...i.filter(a=>!r.has(a)))}}function CK({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,a)=>(i.set(a.name,a),i),new Map),n=new Map;for(let i of e)n.set(i,My(i.type,new Set));for(let[i,a]of n)a&&r.delete(i.name);return r}function My(t,e){if(e.has(t))return!0;if(e.add(t),(0,Si.isPropertyUnion)(t))return t.types.every(r=>My(r,e));if((0,Si.isValueType)(t)){let r=t.value;return(0,Si.isUnionType)(r)?My(r.type,e):!1}else return(0,Si.isPrimitiveType)(t)||(0,Si.isStringType)(t)}function kK(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function EK(t){let e=t.filter(Si.isInterfaceType);for(let n of e){let i=n.properties.flatMap(a=>Fy(a.type,new Set));for(let a of i)a.containerTypes.add(n)}let r=wK(t);NK(r)}function Fy(t,e){return(0,Si.isPropertyUnion)(t)?t.types.flatMap(r=>Fy(r,e)):(0,Si.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Si.isArrayType)(t)?Fy(t.elementType,e):[]}function wK(t){function e(o){let s=[o];a.add(o);let u=[...i.subTypes.get(o.name),...i.superTypes.get(o.name)];for(let l of u){let c=r.get(l);c&&!a.has(c)&&s.push(...e(c))}return s}let r=new Map(t.map(o=>[o.name,o])),n=[],i=(0,NP.collectTypeHierarchy)(t),a=new Set;for(let o of t)a.has(o)||n.push(e(o));return n}function NK(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var Uy=f(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.interpretAstReflection=void 0;var $K=tr(),OK=vn(),IK=we(),DK=jy(),Zo=Vo();function xK(t,e){let r;(0,IK.isGrammar)(t)?r=(0,DK.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=LK(r),a=qK(r),o=(0,Zo.collectTypeHierarchy)((0,Zo.mergeTypesAndInterfaces)(r)).superTypes;return new Gy({allTypes:n,references:i,metaData:a,superTypes:o})}hf.interpretAstReflection=xK;var Gy=class extends $K.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function LK(t){let e=new OK.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of(0,Zo.findReferenceTypes)(i.type))e.add(n.name,[i.name,a]);for(let i of n.interfaceSuperTypes){let a=e.get(i.name);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function qK(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(o=>(0,Zo.hasArrayType)(o.type)),a=n.filter(o=>!(0,Zo.hasArrayType)(o.type)&&(0,Zo.hasBooleanType)(o.type));(i.length>0||a.length>0)&&e.set(r.name,{name:r.name,mandatory:MK(i,a)})}return e}function MK(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}});var IP=f(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.LangiumGrammarGrammar=void 0;var FK=gt(),yf,jK=()=>yf??(yf=(0,FK.loadGrammarFromJson)(`{
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
                    "$ref": "#/rules@59"
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
                          "$ref": "#/rules@59"
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
                              "$ref": "#/rules@59"
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
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
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
                                "$ref": "#/rules@11"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@59"
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
                "$ref": "#/rules@12"
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
                    "$ref": "#/rules@11"
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
                    "$ref": "#/rules@10"
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
                "$ref": "#/rules@59"
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
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
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
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
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
                "$ref": "#/rules@58"
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
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
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
      "name": "TypeDefinition",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@5"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnionType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
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
                  "name": "UnionType"
                },
                "feature": "types",
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
                    "feature": "types",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
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
      "name": "ArrayType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
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
                  "name": "ArrayType"
                },
                "feature": "elementType",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "["
              },
              {
                "$type": "Keyword",
                "value": "]"
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
      "name": "ReferenceType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ReferenceType"
                }
              },
              {
                "$type": "Keyword",
                "value": "@"
              },
              {
                "$type": "Assignment",
                "feature": "referenceType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
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
      "name": "SimpleType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
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
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SimpleType"
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "typeRef",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stringType",
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
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
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
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
              "$ref": "#/rules@46"
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
                "$ref": "#/rules@60"
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
              "$ref": "#/rules@15"
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
                              "$ref": "#/rules@59"
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
                            "$ref": "#/rules@9"
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
                    "$ref": "#/rules@14"
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
                        "$ref": "#/rules@11"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
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
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
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
                "$ref": "#/rules@17"
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
                    "$ref": "#/rules@14/parameters@0"
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
                      "$ref": "#/rules@14/parameters@0"
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
                "$ref": "#/rules@59"
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
                "$ref": "#/rules@59"
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
                        "$ref": "#/rules@16"
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
                            "$ref": "#/rules@16"
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
            "$ref": "#/rules@59"
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
                        "$ref": "#/rules@18"
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
              "$ref": "#/rules@19"
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
                    "$ref": "#/rules@29"
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
                    "$ref": "#/rules@21"
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
              "$ref": "#/rules@20"
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
                        "$ref": "#/rules@20"
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
              "$ref": "#/rules@21"
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
                    "$ref": "#/rules@21"
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
                  "$ref": "#/rules@37"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
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
                      "$ref": "#/rules@59"
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
                    "$ref": "#/rules@14"
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
                    "$ref": "#/rules@58"
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
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
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
              "$ref": "#/rules@44"
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
            "$ref": "#/rules@60"
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
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
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
                    "$ref": "#/rules@27"
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
                        "$ref": "#/rules@27"
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
                    "$ref": "#/rules@16"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
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
                "$ref": "#/rules@29"
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
              "$ref": "#/rules@30"
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
                    "$ref": "#/rules@30"
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
              "$ref": "#/rules@31"
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
                    "$ref": "#/rules@31"
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
              "$ref": "#/rules@32"
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
                    "$ref": "#/rules@31"
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
              "$ref": "#/rules@34"
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
              "$ref": "#/rules@29"
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
            "$ref": "#/rules@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
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
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
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
                    "$ref": "#/rules@27"
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
                        "$ref": "#/rules@27"
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
                "$ref": "#/rules@58"
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
                "$ref": "#/rules@38"
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
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
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
              "$ref": "#/rules@40"
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
              "$ref": "#/rules@38"
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
                        "$ref": "#/rules@38"
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
                    "$ref": "#/rules@42"
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
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
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
              "$ref": "#/rules@17"
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
                "$ref": "#/rules@17"
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
                "$ref": "#/rules@9"
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
                        "$ref": "#/rules@59"
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
                        "$ref": "#/rules@59"
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
                            "$ref": "#/rules@45"
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
                "$ref": "#/rules@47"
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
              "$ref": "#/rules@48"
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
                    "$ref": "#/rules@48"
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
              "$ref": "#/rules@49"
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
                    "$ref": "#/rules@49"
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
              "$ref": "#/rules@50"
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
              "$ref": "#/rules@57"
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
              "$ref": "#/rules@51"
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
          },
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
              "$ref": "#/rules@56"
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
            "$type": "Assignment",
            "feature": "lookahead",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?="
                },
                {
                  "$type": "Keyword",
                  "value": "?!"
                }
              ]
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
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
                "$ref": "#/rules@46"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
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
                "$ref": "#/rules@50"
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
                "$ref": "#/rules@50"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@25"
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
                    "$ref": "#/rules@25"
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
              "$ref": "#/rules@9"
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
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
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
      "name": "AbstractType",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23/definition/elements@0"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@13"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`));gf.LangiumGrammarGrammar=jK});var DP=f(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.LangiumGrammarGeneratedModule=Hr.LangiumGrammarGeneratedSharedModule=Hr.LangiumGrammarParserConfig=Hr.LangiumGrammarLanguageMetaData=void 0;var GK=we(),UK=IP();Hr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Hr.LangiumGrammarParserConfig={maxLookahead:3};Hr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new GK.LangiumGrammarAstReflection};Hr.LangiumGrammarGeneratedModule={Grammar:()=>(0,UK.LangiumGrammarGrammar)(),LanguageMetaData:()=>Hr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Hr.LangiumGrammarParserConfig}}});var Rr=f(bt=>{"use strict";Object.defineProperty(bt,"__esModule",{value:!0});bt.Deferred=bt.MutexLock=bt.interruptAndCheck=bt.isOperationCancelled=bt.OperationCancelled=bt.setInterruptionPeriod=bt.startCancelableOperation=bt.delayNextTick=void 0;var vf=gi();function xP(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}bt.delayNextTick=xP;var Hy=0,LP=10;function HK(){return Hy=Date.now(),new vf.CancellationTokenSource}bt.startCancelableOperation=HK;function KK(t){LP=t}bt.setInterruptionPeriod=KK;bt.OperationCancelled=Symbol("OperationCancelled");function qP(t){return t===bt.OperationCancelled}bt.isOperationCancelled=qP;async function WK(t){if(t===vf.CancellationToken.None)return;let e=Date.now();if(e-Hy>=LP&&(Hy=e,await xP()),t.isCancellationRequested)throw bt.OperationCancelled}bt.interruptAndCheck=WK;var Ky=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new vf.CancellationTokenSource}lock(e){this.cancel();let r=new vf.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{qP(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};bt.MutexLock=Ky;var Wy=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};bt.Deferred=Wy});var _f=f(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.DefaultScopeComputation=void 0;var By=gi(),MP=Ae(),BK=vn(),FP=Rr(),Vy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=By.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=MP.streamContents,i=By.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,FP.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=By.CancellationToken.None){let n=e.parseResult.value,i=new BK.MultiMap;for(let a of(0,MP.streamAllContents)(n))await(0,FP.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Tf.DefaultScopeComputation=Vy});var Af=f(ea=>{"use strict";Object.defineProperty(ea,"__esModule",{value:!0});ea.DefaultScopeProvider=ea.EMPTY_SCOPE=ea.StreamScope=void 0;var VK=Ae(),Rf=Mt(),es=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};ea.StreamScope=es;ea.EMPTY_SCOPE={getElement(){},getAllElements(){return Rf.EMPTY_STREAM}};var zy=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,VK.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Rf.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new es((0,Rf.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Rf.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new es(i,r,n)}getGlobalScope(e,r){return new es(this.indexManager.allElements(e))}};ea.DefaultScopeProvider=zy});var Pi=f(ts=>{"use strict";Object.defineProperty(ts,"__esModule",{value:!0});ts.relativeURI=ts.equalURI=void 0;function zK(t,e){return t?.toString()===e?.toString()}ts.equalURI=zK;function YK(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}ts.relativeURI=YK});var UP=f(ns=>{"use strict";Object.defineProperty(ns,"__esModule",{value:!0});ns.LangiumGrammarScopeComputation=ns.LangiumGrammarScopeProvider=void 0;var XK=_f(),Yy=Af(),rs=Ae(),jP=Le(),GP=Mt(),JK=Pi(),Kr=we(),Xy=Ft(),Jy=class extends Yy.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Kr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,rs.getDocument)(r.container).precomputedScopes,a=(0,rs.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,GP.stream)(s).filter(u=>u.type===Kr.Interface||u.type===Kr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,rs.getContainerOfType)(r.container,Kr.isGrammar);if(!n)return Yy.EMPTY_SCOPE;let i=(0,GP.stream)(n.imports).map(Xy.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,JK.equalURI)(o.documentUri,s)));return e===Kr.AbstractType&&(a=a.filter(o=>o.type===Kr.Interface||o.type===Kr.Type)),new Yy.StreamScope(a)}};ns.LangiumGrammarScopeProvider=Jy;var Qy=class extends XK.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Kr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(a,a.name,n))}(0,rs.streamAllContents)(e).forEach(a=>{if((0,Kr.isAction)(a)&&a.inferredType){let o=(0,Xy.getActionType)(a);o&&r.push(this.createInterfaceDescription(a,o,n))}})}}processNode(e,r,n){(0,Kr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Kr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,this.createInterfaceDescription(o,o.name,r))}}processActionNode(e,r,n){let i=(0,rs.findRootNode)(e);if(i&&(0,Kr.isAction)(e)&&e.inferredType){let a=(0,Xy.getActionType)(e);a&&n.add(i,this.createInterfaceDescription(e,a,r))}}createInterfaceDescription(e,r,n=(0,rs.getDocument)(e)){var i;let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,jP.toDocumentSegment)(a),selectionSegment:(0,jP.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};ns.LangiumGrammarScopeComputation=Qy});var ag=f(pr=>{"use strict";var QK=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ZK=pr&&pr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),eW=pr&&pr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&QK(e,t,r);return ZK(e,t),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.LangiumGrammarValidator=pr.IssueCodes=pr.registerValidationChecks=void 0;var Zy=$o(),ta=Ae(),ra=vn(),eg=Le(),na=gt(),tg=Mt(),ze=eW(we()),rg=we(),jt=Ft(),tW=Ly(),ng=ff();function rW(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}pr.registerValidationChecks=rW;var dr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(dr=pr.IssueCodes||(pr.IssueCodes={}));var ig=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:dr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>ze.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>ze.isParserRule(a)&&!(0,jt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:dr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,jt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,tg.stream)(i.rules).filter(a=>!Ju(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,tg.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new ra.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,jt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new ra.MultiMap;for(let i of e.imports){let a=(0,jt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[Zy.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,jt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new ra.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,tg.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,jt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(ze.isParserRule)){if(Ju(u))continue;let l=(0,jt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,d=(0,jt.getTypeNameWithoutError)(u);if(!l&&d&&o.has(d)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(d,c),{node:u,property:"name",code:dr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let h=(0,na.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(d,c),{node:u.inferredType,property:"name",code:dr.InvalidInfers,data:(0,eg.toDocumentSegment)(h)})}}else if(l&&c){let h=(0,na.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:dr.InvalidInfers,data:(0,eg.toDocumentSegment)(h)})}}for(let u of(0,ta.streamAllContents)(e).filter(ze.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),d=(0,jt.getTypeNameWithoutError)(u);if(u.type&&d&&o.has(d)===c){let h=c?(0,na.findNodeForKeyword)(u.$cstNode,"infer"):(0,na.findNodeForKeyword)(u.$cstNode,"{");r("error",s(d,c),{node:u,property:"type",code:c?dr.SuperfluousInfer:dr.MissingInfer,data:(0,eg.toDocumentSegment)(h)})}else if(l&&d&&o.has(d)&&c&&u.$cstNode){let h=(0,na.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,na.findNodeForKeyword)(u.$cstNode,"{");h&&v&&r("error",`${d} is a declared type and cannot be redefined.`,{node:u,property:"type",code:dr.SuperfluousInfer,data:{start:v.range.end,end:h.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:dr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,jt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,ta.getContainerOfType)(e,i=>ze.isTerminalRule(i)||ze.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;ze.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;ze.isTerminalRule(n)&&n.fragment&&(0,ta.getContainerOfType)(e,ze.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:dr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,jt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:dr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:dr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,na.getAllReachableRules)(e,!0);for(let i of e.rules)ze.isTerminalRule(i)&&i.hidden||Ju(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Zy.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new ra.MultiMap,i=new Set;for(let l of e.rules)ze.isTerminalRule(l)&&l.name&&n.add(l.name,l),ze.isParserRule(l)&&(0,ta.streamAllContents)(l).filter(ze.isKeyword).forEach(d=>i.add(d.value));let a=new ra.MultiMap,o=new ra.MultiMap;for(let l of e.imports){let c=(0,jt.resolveTransitiveImports)(this.documents,l);for(let d of c)for(let h of d.rules)ze.isTerminalRule(h)&&h.name?a.add(h.name,l):ze.isParserRule(h)&&h.name&&(0,ta.streamAllContents)(h).filter(ze.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new ra.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new ra.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let d=o.get(l);d.length>0&&c.filter(h=>!d.includes(h)).forEach(h=>u.add(h,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!Ju(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:dr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&nW.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,ta.getContainerOfType)(e,rg.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,jt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:dr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,ta.streamAllContents)(e).filter(ze.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[Zy.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(Ju(e))return;let n=e.dataType,i=(0,jt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,rg.isRuleCall)(e.terminal)&&(0,rg.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,ta.streamAllContents)(e.terminal).map(a=>ze.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,tW.typeDefinitionToPropertyType)(n.type),a=(0,ng.flattenPlainType)(i),o=!1,s=!1;for(let u of a)(0,ng.isPlainReferenceType)(u)?o=!0:(0,ng.isPlainReferenceType)(u)||(s=!0);o&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,jt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(ze.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else ze.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,na.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){ze.isRuleCall(e.terminal)&&ze.isParserRule(e.terminal.rule.ref)&&!(0,jt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkFragmentsInTypes(e,r){var n,i;ze.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){ze.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&ze.isParserRule(e.ref)&&!(0,jt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,jt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&ze.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};pr.LangiumGrammarValidator=ig;function Ju(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var nW=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var bf=f(Tn=>{"use strict";Object.defineProperty(Tn,"__esModule",{value:!0});Tn.DocumentValidator=Tn.toDiagnosticSeverity=Tn.getDiagnosticRange=Tn.DefaultDocumentValidator=void 0;var Wr=De(),HP=gt(),iW=Ae(),aW=Le(),Sf=Rr(),og=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Wr.CancellationToken.None){let n=e.parseResult,i=[];await(0,Sf.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Wr.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Pf.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Wr.Range.create(0,0,0,0);else{let u=Wr.Position.create(s.endLine-1,s.endColumn);o=Wr.Range.create(u,u)}}}else o=(0,aW.tokenToRange)(a.token);if(o){let s={severity:Wr.DiagnosticSeverity.Error,range:o,message:a.message,code:Pf.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Pf.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Sf.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Sf.interruptAndCheck)(r),i}async validateAst(e,r,n=Wr.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,iW.streamAst)(e).map(async o=>{await(0,Sf.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:KP(n),severity:WP(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};Tn.DefaultDocumentValidator=og;function KP(t){if(Wr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,HP.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,HP.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}Tn.getDiagnosticRange=KP;function WP(t){switch(t){case"error":return Wr.DiagnosticSeverity.Error;case"warning":return Wr.DiagnosticSeverity.Warning;case"info":return Wr.DiagnosticSeverity.Information;case"hint":return Wr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}Tn.toDiagnosticSeverity=WP;var Pf;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Pf=Tn.DocumentValidator||(Tn.DocumentValidator={}))});var XP=f(Kn=>{"use strict";var oW=Kn&&Kn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),sW=Kn&&Kn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),uW=Kn&&Kn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&oW(e,t,r);return sW(e,t),e};Object.defineProperty(Kn,"__esModule",{value:!0});Kn.LangiumGrammarCodeActionProvider=void 0;var Br=De(),lW=Gn(),BP=Ae(),VP=Le(),cW=gt(),zP=Wa(),YP=Pi(),fW=bf(),sg=uW(we()),Vr=ag(),ug=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Vr.IssueCodes.GrammarNameUppercase:case Vr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Vr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Vr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Vr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Vr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Vr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Vr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Vr.IssueCodes.InvalidInfers:case Vr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Vr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Vr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case fW.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Br.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Br.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,VP.findLeafNodeAtOffset)(i,n),o=(0,BP.getContainerOfType)(a?.element,sg.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,zP.escapeRegExp)(s)}-${(0,zP.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,cW.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&sg.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,VP.findLeafNodeAtOffset)(a,i),s=(0,BP.getContainerOfType)(o?.element,sg.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(h=>h.name===r.refText),l=[],c=-1,d=-1;for(let h of u){if((0,YP.equalURI)(h.documentUri,n.uri))continue;let v=dW(n.uri,h.documentUri),y,A="",E=n.parseResult.value,C=E.imports.find(P=>P.path&&v<P.path);if(C)y=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(E.imports.length>0){let P=E.imports[E.imports.length-1].$cstNode.range.end;P&&(y={line:P.line+1,character:0})}else E.rules.length>0&&(y=(a=E.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,A=`
`);y&&((c<0||v.length<d)&&(c=l.length,d=v.length),l.push({title:`Add import to '${v}'`,kind:Br.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Kn.LangiumGrammarCodeActionProvider=ug;function dW(t,e){let r=lW.Utils.dirname(t),n=(0,YP.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var kf=f(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.DefaultFoldingRangeProvider=void 0;var lg=De(),pW=Ae(),mW=Le(),cg=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,pW.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,mW.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,lg.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),lg.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===lg.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Cf.DefaultFoldingRangeProvider=cg});var JP=f(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.LangiumGrammarFoldingRangeProvider=void 0;var hW=kf(),yW=we(),fg=class extends hW.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,yW.isParserRule)(e)}};Ef.LangiumGrammarFoldingRangeProvider=fg});var mg=f(_n=>{"use strict";Object.defineProperty(_n,"__esModule",{value:!0});_n.Formatting=_n.FormattingRegion=_n.DefaultNodeFormatter=_n.AbstractFormatter=void 0;var wf=gt(),dg=tr(),gW=Ae(),QP=Le(),Qu=Mt(),pg=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Nf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,d;let h=this.nodeModeToKey(s,u),v=i.get(h),y=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(d=v?.options.priority)!==null&&d!==void 0?d:0;(!v||A<=y)&&i.set(h,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,gW.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let d=c.value,h=(0,dg.isLeafCstNode)(d),v=this.nodeModeToKey(d,"prepend"),y=r.get(v);if(r.delete(v),y){let C=this.createTextEdit(l,d,y,a);for(let P of C)P&&this.insideRange(P.range,i)&&this.isNecessary(P,e.textDocument)&&o.push(P)}let A=this.nodeModeToKey(d,"append"),E=r.get(A);if(r.delete(A),E){let C=(0,QP.getNextNode)(d);if(C){let P=this.createTextEdit(d,C,E,a);for(let S of P)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&d.hidden){let C=this.createHiddenTextEdits(l,d,void 0,a);for(let P of C)P&&this.insideRange(P.range,i)&&this.isNecessary(P,e.textDocument)&&o.push(P)}h&&(l=d)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),d=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-d;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let A=r.text.split(`
`);A[0]=l+A[0];for(let E=0;E<A.length;E++){let C=o+E,P={character:0,line:C};if(v>0)s.push({newText:y,range:{start:P,end:P}});else{let S=A[E],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:P,end:{line:C,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,d=i.indentation;i.indentation+=c??0;let h=[];return u!==void 0?h.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?h.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&h.push(this.createTabTextEdit(o,Boolean(e),i)),(0,dg.isLeafCstNode)(r)&&(i.indentation=d),h}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Qu.TreeStreamImpl(i,a=>this.iterateCst(a,r)):Qu.EMPTY_STREAM}iterateCst(e,r){if(!(0,dg.isCompositeCstNode)(e))return Qu.EMPTY_STREAM;let n=r.indentation;return new Qu.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,Qu.DONE_RESULT))}};_n.AbstractFormatter=pg;var Nf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new Ar(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new Ar(r,this.collector)}property(e,r){let n=(0,wf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new Ar(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,wf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new Ar(r,this.collector)}keyword(e,r){let n=(0,wf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new Ar(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,wf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new Ar(r,this.collector)}cst(e){return new Ar([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new Ar([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new Ar((0,QP.getInteriorNodes)(a,o),this.collector)}};_n.DefaultNodeFormatter=Nf;var Ar=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new Ar(this.nodes.slice(e,r),this.collector)}};_n.FormattingRegion=Ar;var vW;(function(t){function e(...c){return{options:{},moves:c.flatMap(d=>d.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,d){return{options:d??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,d){return{options:d??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,d){var h,v,y,A,E,C;let P=(h=c.lines)!==null&&h!==void 0?h:0,S=(v=d.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(A=d.tabs)!==null&&A!==void 0?A:0,W=(E=c.characters)!==null&&E!==void 0?E:0,ee=(C=d.characters)!==null&&C!==void 0?C:0;return P<S?-1:P>S?1:O<F?-1:O>F?1:W<ee?-1:W>ee?1:0}})(vW=_n.Formatting||(_n.Formatting={}))});var ZP=f(Wn=>{"use strict";var TW=Wn&&Wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_W=Wn&&Wn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),RW=Wn&&Wn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&TW(e,t,r);return _W(e,t),e};Object.defineProperty(Wn,"__esModule",{value:!0});Wn.LangiumGrammarFormatter=void 0;var be=mg(),ia=RW(we()),hg=class extends be.AbstractFormatter{format(e){if(ia.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(be.Formatting.noSpace());else if(ia.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(be.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(be.Formatting.oneSpace()):r.property("name").append(be.Formatting.noSpace()),r.properties("parameters").append(be.Formatting.noSpace()),r.keywords(",").append(be.Formatting.oneSpace()),r.keywords("<").append(be.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(be.Formatting.noSpace()),r.interior(i,n).prepend(be.Formatting.indent()),n.prepend(be.Formatting.fit(be.Formatting.noSpace(),be.Formatting.newLine())),r.node(e).prepend(be.Formatting.noIndent())}else if(ia.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(be.Formatting.oneSpace()),r.keyword("returns").append(be.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(be.Formatting.oneSpace()),r.keyword(":").prepend(be.Formatting.noSpace()),r.keyword(";").prepend(be.Formatting.fit(be.Formatting.noSpace(),be.Formatting.newLine())),r.node(e).prepend(be.Formatting.noIndent())}else if(ia.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(be.Formatting.noSpace()),r.keywords(".","+=","=").surround(be.Formatting.noSpace()),r.keyword("}").prepend(be.Formatting.noSpace())}else if(ia.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(be.Formatting.oneSpace());else if(ia.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(be.Formatting.noSpace());else if(ia.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(be.Formatting.noSpace()),r.keyword(",").append(be.Formatting.oneSpace()),r.properties("arguments").append(be.Formatting.noSpace())}ia.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(be.Formatting.noSpace())}};Wn.LangiumGrammarFormatter=hg});var If=f(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.SemanticTokensDecoder=Ct.AbstractSemanticTokenProvider=Ct.SemanticTokensBuilder=Ct.DefaultSemanticTokenOptions=Ct.AllSemanticTokenModifiers=Ct.AllSemanticTokenTypes=void 0;var de=De(),$f=gt(),AW=Ae(),SW=Rr(),PW=Le();Ct.AllSemanticTokenTypes={[de.SemanticTokenTypes.class]:0,[de.SemanticTokenTypes.comment]:1,[de.SemanticTokenTypes.enum]:2,[de.SemanticTokenTypes.enumMember]:3,[de.SemanticTokenTypes.event]:4,[de.SemanticTokenTypes.function]:5,[de.SemanticTokenTypes.interface]:6,[de.SemanticTokenTypes.keyword]:7,[de.SemanticTokenTypes.macro]:8,[de.SemanticTokenTypes.method]:9,[de.SemanticTokenTypes.modifier]:10,[de.SemanticTokenTypes.namespace]:11,[de.SemanticTokenTypes.number]:12,[de.SemanticTokenTypes.operator]:13,[de.SemanticTokenTypes.parameter]:14,[de.SemanticTokenTypes.property]:15,[de.SemanticTokenTypes.regexp]:16,[de.SemanticTokenTypes.string]:17,[de.SemanticTokenTypes.struct]:18,[de.SemanticTokenTypes.type]:19,[de.SemanticTokenTypes.typeParameter]:20,[de.SemanticTokenTypes.variable]:21};Ct.AllSemanticTokenModifiers={[de.SemanticTokenModifiers.abstract]:1<<0,[de.SemanticTokenModifiers.async]:1<<1,[de.SemanticTokenModifiers.declaration]:1<<2,[de.SemanticTokenModifiers.defaultLibrary]:1<<3,[de.SemanticTokenModifiers.definition]:1<<4,[de.SemanticTokenModifiers.deprecated]:1<<5,[de.SemanticTokenModifiers.documentation]:1<<6,[de.SemanticTokenModifiers.modification]:1<<7,[de.SemanticTokenModifiers.readonly]:1<<8,[de.SemanticTokenModifiers.static]:1<<9};Ct.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Ct.AllSemanticTokenTypes),tokenModifiers:Object.keys(Ct.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Of=class extends de.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Ct.SemanticTokensBuilder=Of;var yg=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=de.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=de.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=de.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Of;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,a=(0,AW.streamAst)(i,{range:this.currentRange}).iterator(),o;do if(o=a.next(),!o.done){await(0,SW.interruptAndCheck)(n);let s=o.value;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.currentRange&&!(0,PW.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let o=Ct.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let d=Ct.AllSemanticTokenModifiers[c];s|=d}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,d=n.end.character-c;this.currentTokensBuilder.push(u,c,d,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,d=this.currentDocument.textDocument.offsetAt(n.start),h=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,h-d,o,s)}else{let c=n.start,d=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,d-c.character-1,o,s);for(let h=u+1;h<l;h++){let v=d;d=this.currentDocument.textDocument.offsetAt({line:h+1,character:0}),this.currentTokensBuilder.push(h,0,d-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,$f.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,$f.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,$f.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,$f.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Ct.AbstractSemanticTokenProvider=yg;var bW;(function(t){function e(n,i){let a=new Map;Object.entries(Ct.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(bW=Ct.SemanticTokensDecoder||(Ct.SemanticTokensDecoder={}))});var e0=f(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.LangiumGrammarSemanticTokenProvider=void 0;var aa=De(),CW=If(),oa=we(),gg=class extends CW.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,oa.isAssignment)(e)?r({node:e,property:"feature",type:aa.SemanticTokenTypes.property}):(0,oa.isAction)(e)?e.feature&&r({node:e,property:"feature",type:aa.SemanticTokenTypes.property}):(0,oa.isReturnType)(e)?r({node:e,property:"name",type:aa.SemanticTokenTypes.type}):(0,oa.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:aa.SemanticTokenTypes.type}):(0,oa.isParameter)(e)?r({node:e,property:"name",type:aa.SemanticTokenTypes.parameter}):(0,oa.isParameterReference)(e)?r({node:e,property:"parameter",type:aa.SemanticTokenTypes.parameter}):(0,oa.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:aa.SemanticTokenTypes.type}):(0,oa.isTypeAttribute)(e)&&r({node:e,property:"name",type:aa.SemanticTokenTypes.property})}};Df.LangiumGrammarSemanticTokenProvider=gg});var r0=f(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.LangiumGrammarNameProvider=void 0;var kW=Yo(),EW=gt(),t0=we(),vg=class extends kW.DefaultNameProvider{getName(e){return(0,t0.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,t0.isAssignment)(e)?(0,EW.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};xf.LangiumGrammarNameProvider=vg});var qf=f(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.DefaultReferences=void 0;var wW=gt(),n0=tr(),sa=Ae(),Tg=Le(),i0=Mt(),NW=Pi(),_g=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,wW.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,n0.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,n0.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Tg.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,i0.stream)(n)}findLocalReferences(e,r=!1){let i=(0,sa.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,sa.streamAst)(i).forEach(o=>{(0,sa.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,sa.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,sa.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Tg.toDocumentSegment)(u),local:(0,NW.equalURI)((0,sa.getDocument)(u.element).uri,(0,sa.getDocument)(e).uri)})}})}),(0,i0.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,sa.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Tg.toDocumentSegment)(r),local:!0}}}};Lf.DefaultReferences=_g});var l0=f(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.LangiumGrammarReferences=void 0;var $W=qf(),nr=Ae(),a0=Le(),o0=gt(),s0=Mt(),Rg=Pi(),Yt=we(),u0=Ft(),Mf=Vo(),Ag=class extends $W.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,o0.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Yt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Yt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Yt.isTypeAttribute)(e)){let i=(0,nr.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Yt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,nr.getContainerOfType)(e,Yt.isInterface);if(a){let o=(0,Mf.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,Rg.equalURI)((0,nr.getDocument)(e).uri,(0,nr.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,s0.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,nr.getContainerOfType)(e,Yt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,Mf.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,s0.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Yt.isParserRule)(e)){let i=(0,u0.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,nr.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,nr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,a0.toDocumentSegment)(a),local:(0,Rg.equalURI)((0,nr.getDocument)(i).uri,(0,nr.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,o0.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,nr.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,nr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,a0.toDocumentSegment)(a),local:(0,Rg.equalURI)((0,nr.getDocument)(e).uri,(0,nr.getDocument)(r).uri)})}let i=(0,nr.getContainerOfType)(e,Yt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,nr.getContainerOfType)(e,Yt.isParserRule),i=(0,u0.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Yt.isInterface)(n.returnType.ref)||(0,Yt.isType)(n.returnType.ref))){let a=(0,Mf.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,Mf.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Yt.isParserRule)(o)||(0,Yt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,nr.streamAst)(r).filter(a=>{var o,s;return(0,Yt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Yt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Yt.isParserRule)(a)||(0,Yt.isAction)(a))&&n.push(a)}),n}};Ff.LangiumGrammarReferences=Ag});var bg=f(zr=>{"use strict";var OW=zr&&zr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),IW=zr&&zr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),DW=zr&&zr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&OW(e,t,r);return IW(e,t),e};Object.defineProperty(zr,"__esModule",{value:!0});zr.findFirstFeatures=zr.findNextFeatures=void 0;var ir=DW(we()),bi=Ft(),xW=tr(),LW=Ae(),qW=gt();function MW(t,e){let r={stacks:t,tokens:e};return FW(r),r.stacks.flat().forEach(i=>{i.property=void 0}),d0(r.stacks).map(i=>i[i.length-1])}zr.findNextFeatures=MW;function Sg(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(ir.isGroup(u.$container)){s=u.$container;break}else if(ir.isAbstractElement(u.$container))u=u.$container;else break;if((0,bi.isArrayCardinality)(u.cardinality)){let l=is({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...f0({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,bi.isOptionalCardinality)(c.feature.cardinality)||(0,bi.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Sg({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function c0(t){return(0,xW.isAstNode)(t)&&(t={feature:t}),is({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}zr.findFirstFeatures=c0;function is(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(ir.isGroup(u)){if(o.has(u))return[];o.add(u)}if(ir.isGroup(u))return f0(i,0,a,o,s).map(c=>jf(c,u.cardinality,a));if(ir.isAlternatives(u)||ir.isUnorderedGroup(u))return u.elements.flatMap(c=>is({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>jf(c,u.cardinality,a));if(ir.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return is({next:c,cardinalities:a,visited:o,plus:s}).map(d=>jf(d,u.cardinality,a))}else{if(ir.isAction(u))return Sg({next:{feature:u,new:!0,type:(0,bi.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(ir.isRuleCall(u)&&ir.isParserRule(u.rule.ref)){let c=u.rule.ref,d={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,bi.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return is({next:d,cardinalities:a,visited:o,plus:s}).map(h=>jf(h,u.cardinality,a))}else return[i]}}function jf(t,e,r){return r.set(t.feature,e),t}function f0(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...is({next:s,cardinalities:r,visited:n,plus:i})),!!(0,bi.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function FW(t){for(let e of t.tokens){let r=d0(t.stacks,e);t.stacks=r}}function d0(t,e){let r=[];for(let n of t)r.push(...jW(n,e));return r}function jW(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(GW)),i=[];for(;t.length>0;){let a=t.pop(),o=Sg({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?Pg(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,bi.isOptionalCardinality)(s.feature.cardinality)||(0,bi.isOptionalCardinality)(r.get(s.feature))))break}return i}function GW(t){if(t.cardinality==="+")return!0;let e=(0,LW.getContainerOfType)(t,ir.isAssignment);return!!(e&&e.cardinality==="+")}function Pg(t,e){if(ir.isKeyword(t))return t.value===e.image;if(ir.isRuleCall(t))return UW(t.rule.ref,e);if(ir.isCrossReference(t)){let r=(0,qW.getCrossReferenceTerminal)(t);if(r)return Pg(r,e)}return!1}function UW(t,e){return ir.isParserRule(t)?c0(t.definition).some(n=>Pg(n.feature,e)):ir.isTerminalRule(t)?new RegExp((0,bi.terminalRegex)(t)).test(e.image):!1}});var Uf=f(Yr=>{"use strict";var HW=Yr&&Yr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),KW=Yr&&Yr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),WW=Yr&&Yr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&HW(e,t,r);return KW(e,t),e};Object.defineProperty(Yr,"__esModule",{value:!0});Yr.DefaultCompletionProvider=Yr.mergeCompletionProviderOptions=void 0;var Zu=De(),el=WW(we()),BW=Ft(),VW=Ae(),zW=Le(),p0=gt(),m0=Mt(),Gf=bg();function YW(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}Yr.mergeCompletionProviderOptions=YW;var Cg=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=C=>{let P=this.fillCompletionItem(o,u,C);P&&a.push(P)},c=(0,zW.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),d={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let C=(0,p0.getEntryRule)(this.grammar);return await this.completionForRule(d,C,l),Zu.CompletionList.create(a,!0)}let h=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,h),y=[],A=this.canReparse()&&u!==h;A&&(y=this.findFeaturesAt(o,u));let E=C=>el.isKeyword(C.feature)?C.feature.value:C.feature;return await Promise.all((0,m0.stream)(v).distinct(E).map(C=>this.completionFor(d,C,l))),A&&await Promise.all((0,m0.stream)(y).exclude(v,E).distinct(E).map(C=>this.completionFor(d,C,l))),Zu.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:Zu.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,p0.getEntryRule)(this.grammar),l=(0,Gf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,BW.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,Gf.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,Gf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(el.isParserRule(r)){let i=(0,Gf.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(el.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(el.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,VW.getContainerOfType)(r.feature,el.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:Zu.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:Zu.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return h0<=e&&e<=y0&&XW<=r&&r<=JW||e===g0&&r!==g0}toUpperCharCode(e){return h0<=e&&e<=y0?e-32:e}};Yr.DefaultCompletionProvider=Cg;var h0="a".charCodeAt(0),y0="z".charCodeAt(0),XW="A".charCodeAt(0),JW="Z".charCodeAt(0),g0="_".charCodeAt(0)});var wg=f(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.AbstractCallHierarchyProvider=void 0;var QW=De(),v0=Gn(),kg=Le(),Eg=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,kg.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:QW.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(v0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,kg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(v0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,kg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};Hf.AbstractCallHierarchyProvider=Eg});var _0=f(T0=>{"use strict";Object.defineProperty(T0,"__esModule",{value:!0})});var A0=f(R0=>{"use strict";Object.defineProperty(R0,"__esModule",{value:!0})});var P0=f(S0=>{"use strict";Object.defineProperty(S0,"__esModule",{value:!0})});var $g=f(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.DefaultDefinitionProvider=void 0;var ZW=De(),eB=Ae(),tB=Le(),Ng=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,tB.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[ZW.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,eB.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};Kf.DefaultDefinitionProvider=Ng});var Ig=f(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.DefaultDocumentHighlightProvider=void 0;var rB=De(),nB=Ae(),iB=Le(),aB=Pi(),Og=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,iB.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,aB.equalURI)((0,nB.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return rB.DocumentHighlight.create(e.segment.range)}};Wf.DefaultDocumentHighlightProvider=Og});var C0=f(b0=>{"use strict";Object.defineProperty(b0,"__esModule",{value:!0})});var xg=f(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.DefaultDocumentSymbolProvider=void 0;var oB=De(),sB=Ae(),Dg=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,sB.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return oB.SymbolKind.Field}};Bf.DefaultDocumentSymbolProvider=Dg});var k0=f(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.AbstractExecuteCommandHandler=void 0;var uB=De(),Lg=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=uB.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};Vf.AbstractExecuteCommandHandler=Lg});var Mg=f(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.MultilineCommentHoverProvider=as.AstNodeHoverProvider=void 0;var lB=Le(),zf=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,lB.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};as.AstNodeHoverProvider=zf;var qg=class extends zf{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};as.MultilineCommentHoverProvider=qg});var E0=f(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.AbstractGoToImplementationProvider=void 0;var cB=De(),fB=Le(),Fg=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=cB.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,fB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};Yf.AbstractGoToImplementationProvider=Fg});var w0=f(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.AbstractInlayHintProvider=void 0;var dB=De(),pB=Ae(),mB=Rr(),jg=class{async getInlayHints(e,r,n=dB.CancellationToken.None){let i=e.parseResult.value,a=[],o=s=>a.push(s);for(let s of(0,pB.streamAst)(i,{range:r.range}))await(0,mB.interruptAndCheck)(n),this.computeInlayHint(s,o);return a}};Xf.AbstractInlayHintProvider=jg});var ua=f(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.DefaultLangiumDocuments=Ci.DefaultLangiumDocumentFactory=Ci.DocumentState=void 0;var hB=Yh(),yB=Gn(),gB=Mt(),os;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(os=Ci.DocumentState||(Ci.DocumentState={}));var Gg=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??yB.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:os.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:os.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=os.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=hB.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ci.DefaultLangiumDocumentFactory=Gg;var Ug=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,gB.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=os.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=os.Changed,this.documentMap.delete(r)),n}};Ci.DefaultLangiumDocuments=Ug});var Kg=f(ss=>{"use strict";Object.defineProperty(ss,"__esModule",{value:!0});ss.mergeSignatureHelpOptions=ss.AbstractSignatureHelpProvider=void 0;var vB=De(),TB=Le(),Hg=class{provideSignatureHelp(e,r,n=vB.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,TB.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};ss.AbstractSignatureHelpProvider=Hg;function _B(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}ss.mergeSignatureHelpOptions=_B});var Vg=f(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.createRequestHandler=J.createServerRequestHandler=J.createCallHierarchyRequestHandler=J.addCallHierarchyHandler=J.addCodeLensHandler=J.addSignatureHelpHandler=J.addDocumentLinkHandler=J.addExecuteCommandHandler=J.addConfigurationChangeHandler=J.addSemanticTokenHandler=J.addInlayHintHandler=J.addRenameHandler=J.addFormattingHandler=J.addFoldingRangeHandler=J.addHoverHandler=J.addDocumentHighlightsHandler=J.addGoToDeclarationHandler=J.addGoToImplementationHandler=J.addGoToTypeDefinitionHandler=J.addGotoDefinitionHandler=J.addDocumentSymbolHandler=J.addCodeActionHandler=J.addFindReferencesHandler=J.addCompletionHandler=J.addDiagnosticsHandler=J.addDocumentsHandler=J.startLanguageServer=J.DefaultLanguageServer=void 0;var za=De(),tl=Gn(),N0=Fu(),RB=Rr(),AB=ua(),SB=Uf(),PB=If(),bB=Kg(),Wg=class{constructor(e){this.onInitializeEmitter=new za.Emitter,this.onInitializedEmitter=new za.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,N0.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,N0.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var ce;return(ce=V.lsp.Formatter)===null||ce===void 0?void 0:ce.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,bB.mergeSignatureHelpOptions)(n.map(V=>{var ce;return(ce=V.lsp.SignatureHelp)===null||ce===void 0?void 0:ce.signatureHelpOptions})),d=this.hasService(V=>V.lsp.TypeProvider),h=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=(0,SB.mergeCompletionProviderOptions)(n.map(V=>{var ce;return(ce=V.lsp.CompletionProvider)===null||ce===void 0?void 0:ce.completionOptions})),A=this.hasService(V=>V.lsp.ReferencesProvider),E=this.hasService(V=>V.lsp.DocumentSymbolProvider),C=this.hasService(V=>V.lsp.DefinitionProvider),P=this.hasService(V=>V.lsp.DocumentHighlightProvider),S=this.hasService(V=>V.lsp.FoldingRangeProvider),O=this.hasService(V=>V.lsp.HoverProvider),F=this.hasService(V=>V.lsp.RenameProvider),W=this.hasService(V=>V.lsp.CallHierarchyProvider),ee=this.services.lsp.CodeLensProvider,ke=this.hasService(V=>V.lsp.DeclarationProvider),Ee=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:za.TextDocumentSyncKind.Incremental,completionProvider:v?y:void 0,referencesProvider:A,documentSymbolProvider:E,definitionProvider:C,typeDefinitionProvider:d,documentHighlightProvider:P,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:S,hoverProvider:O,renameProvider:F?{prepareProvider:!0}:void 0,semanticTokensProvider:s?PB.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:h,callHierarchyProvider:W?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:ee?{resolveProvider:Boolean(ee.resolveCodeLens)}:void 0,declarationProvider:ke,inlayHintProvider:Ee?{resolveProvider:Boolean(Ee.resolveInlayHint)}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};J.DefaultLanguageServer=Wg;function CB(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");$0(e,t),O0(e,t),I0(e,t),D0(e,t),L0(e,t),q0(e,t),M0(e,t),F0(e,t),G0(e,t),H0(e,t),K0(e,t),x0(e,t),W0(e,t),U0(e,t),B0(e,t),V0(e,t),Y0(e,t),J0(e,t),Z0(e,t),Q0(e,t),X0(e,t),z0(e,t),j0(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}J.startLanguageServer=CB;function $0(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([tl.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=[],u=[];for(let l of o.changes){let c=tl.URI.parse(l.uri);l.type===za.FileChangeType.Deleted?u.push(c):s.push(c)}i(s,u)})}J.addDocumentsHandler=$0;function O0(t,e){e.workspace.DocumentBuilder.onBuildPhase(AB.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}J.addDiagnosticsHandler=O0;function I0(t,e){t.onCompletion(Xt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}J.addCompletionHandler=I0;function D0(t,e){t.onReferences(Xt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}J.addFindReferencesHandler=D0;function x0(t,e){t.onCodeAction(Xt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}J.addCodeActionHandler=x0;function L0(t,e){t.onDocumentSymbol(Xt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}J.addDocumentSymbolHandler=L0;function q0(t,e){t.onDefinition(Xt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}J.addGotoDefinitionHandler=q0;function M0(t,e){t.onTypeDefinition(Xt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}J.addGoToTypeDefinitionHandler=M0;function F0(t,e){t.onImplementation(Xt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}J.addGoToImplementationHandler=F0;function j0(t,e){t.onDeclaration(Xt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}J.addGoToDeclarationHandler=j0;function G0(t,e){t.onDocumentHighlight(Xt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}J.addDocumentHighlightsHandler=G0;function U0(t,e){t.onHover(Xt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}J.addHoverHandler=U0;function H0(t,e){t.onFoldingRanges(Xt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}J.addFoldingRangeHandler=H0;function K0(t,e){t.onDocumentFormatting(Xt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Xt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Xt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}J.addFormattingHandler=K0;function W0(t,e){t.onRenameRequest(Xt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Xt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}J.addRenameHandler=W0;function B0(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(ki((a,o,s,u)=>n.getInlayHints(o,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Ya(s)}})}}J.addInlayHintHandler=B0;function V0(t,e){let r={data:[]};t.languages.semanticTokens.on(ki((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):r,e)),t.languages.semanticTokens.onDelta(ki((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):r,e)),t.languages.semanticTokens.onRange(ki((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):r,e))}J.addSemanticTokenHandler=V0;function z0(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}J.addConfigurationChangeHandler=z0;function Y0(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Ya(o)}})}J.addExecuteCommandHandler=Y0;function X0(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(ki((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Ya(s)}})}}J.addDocumentLinkHandler=X0;function J0(t,e){t.onSignatureHelp(ki((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}J.addSignatureHelpHandler=J0;function Q0(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(ki((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Ya(s)}})}}J.addCodeLensHandler=Q0;function Z0(t,e){t.languages.callHierarchy.onPrepare(ki((r,n,i,a)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,a))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onIncomingCalls(Bg((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onOutgoingCalls(Bg((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&a!==void 0?a:null},e))}J.addCallHierarchyHandler=Z0;function Bg(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=tl.URI.parse(n.item.uri),o=r.getServices(a);if(!o){let s=`Could not find service instance for uri: '${a.toString()}'`;throw console.error(s),new Error(s)}try{return await t(o,n,i)}catch(s){return Ya(s)}}}J.createCallHierarchyRequestHandler=Bg;function ki(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=tl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Ya(l)}}}J.createServerRequestHandler=ki;function Xt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=tl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Ya(l)}}}J.createRequestHandler=Xt;function Ya(t){if((0,RB.isOperationCancelled)(t))return new za.ResponseError(za.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof za.ResponseError)return t;throw t}});var Yg=f(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.DefaultReferencesProvider=void 0;var kB=De(),EB=Le(),zg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,EB.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(kB.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};Jf.DefaultReferencesProvider=zg});var Jg=f(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.DefaultRenameProvider=void 0;var wB=De(),NB=Yo(),eb=Le(),Xg=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,eb.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let d=wB.TextEdit.replace(c.segment.range,r.newName),h=c.sourceUri.toString();n[h]?n[h].push(d):n[h]=[d]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,eb.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,NB.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};Qf.DefaultRenameProvider=Xg});var tb=f(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.AbstractTypeDefinitionProvider=void 0;var $B=De(),OB=Le(),Qg=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=$B.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,OB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Zf.AbstractTypeDefinitionProvider=Qg});var Zg=f(qe=>{"use strict";var IB=qe&&qe.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pt=qe&&qe.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&IB(e,t,r)};Object.defineProperty(qe,"__esModule",{value:!0});pt(Uf(),qe);pt(bg(),qe);pt(wg(),qe);pt(_0(),qe);pt(A0(),qe);pt(P0(),qe);pt($g(),qe);pt(Ig(),qe);pt(C0(),qe);pt(xg(),qe);pt(k0(),qe);pt(kf(),qe);pt(mg(),qe);pt(Mg(),qe);pt(E0(),qe);pt(w0(),qe);pt(Vg(),qe);pt(Yg(),qe);pt(Jg(),qe);pt(If(),qe);pt(Kg(),qe);pt(tb(),qe)});var rb=f(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.LangiumGrammarDefinitionProvider=void 0;var ev=De(),DB=Zg(),xB=Ae(),LB=gt(),qB=we(),MB=Ft(),tv=class extends DB.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,qB.isGrammarImport)(e.element)&&((n=(0,LB.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,MB.resolveImport)(this.documents,e.element);if(c?.$document){let d=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,h=(o=(a=this.nameProvider.getNameNode(d))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:ev.Range.create(0,0,0,0),v=(u=(s=d.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:ev.Range.create(0,0,0,0);return[ev.LocationLink.create(c.$document.uri.toString(),v,h,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,xB.streamContents)(e).head()}};ed.LangiumGrammarDefinitionProvider=tv});var ib=f(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.LangiumGrammarCallHierarchyProvider=void 0;var nb=De(),FB=wg(),rv=Ae(),jB=Le(),td=we(),nv=class extends FB.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,td.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,jB.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,rv.getContainerOfType)(s.element,td.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),d=c+"@"+l.text;n.has(d)?n.set(d,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(d).targetNodes,s],docUri:c}):n.set(d,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:nb.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,td.isParserRule)(e))return;let r=(0,rv.streamAllContents)(e).filter(td.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,rv.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:nb.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};rd.LangiumGrammarCallHierarchyProvider=nv});var sb=f(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.LangiumGrammarValidationResourcesCollector=void 0;var GB=vn(),ob=Mt(),nd=we(),ab=Ft(),id=Vo(),UB=jy(),iv=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,UB.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=HB(e);for(let s of(0,id.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,ob.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,id.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},l??{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,id.mergeInterfaces)(e,r),a=new Map(i.map(o=>[o.name,o]));for(let o of(0,id.mergeInterfaces)(e,r))n.set(o.name,this.addSuperProperties(o,a,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let a of e.superTypes){let o=r.get(a.name);o&&i.push(...this.addSuperProperties(o,r,n))}return i}};ad.LangiumGrammarValidationResourcesCollector=iv;function HB({parserRules:t,datatypeRules:e}){let r=new GB.MultiMap;(0,ob.stream)(t).concat(e).forEach(i=>r.add((0,ab.getRuleType)(i),i));function n(i){if((0,nd.isAction)(i)){let a=(0,ab.getActionType)(i);a&&r.add(a,i)}((0,nd.isAlternatives)(i)||(0,nd.isGroup)(i)||(0,nd.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var ub=f(la=>{"use strict";Object.defineProperty(la,"__esModule",{value:!0});la.isInferredAndDeclared=la.isInferred=la.isDeclared=void 0;function KB(t){return t&&"declared"in t}la.isDeclared=KB;function WB(t){return t&&"inferred"in t}la.isInferred=WB;function BB(t){return t&&"inferred"in t&&"declared"in t}la.isInferredAndDeclared=BB});var lb=f(Xr=>{"use strict";var VB=Xr&&Xr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),zB=Xr&&Xr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),YB=Xr&&Xr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&VB(e,t,r);return zB(e,t),e};Object.defineProperty(Xr,"__esModule",{value:!0});Xr.LangiumGrammarTypesValidator=Xr.registerTypeValidationChecks=void 0;var us=YB(we()),XB=vn(),JB=Ft(),kt=Bo(),av=ub();function QB(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Xr.registerTypeValidationChecks=QB;var ov=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,av.isDeclared)(a)&&(0,kt.isInterfaceType)(a.declared)&&us.isInterface(a.declaredNode)){let o=a;eV(o,r),tV(o,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,av.isInferred)(a)&&a.inferred instanceof kt.InterfaceType&&ZB(a.inferred,r),(0,av.isInferredAndDeclared)(a)&&iV(a,r)}checkActionIsNotUnionType(e,r){us.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Xr.LangiumGrammarTypesValidator=ov;function ZB(t,e){t.properties.forEach(r=>{var n;let i=(0,kt.flattenPropertyUnion)(r.type);if(i.length>1){let a=s=>(0,kt.isReferenceType)(s)?"ref":"other",o=a(i[0]);if(i.slice(1).some(s=>a(s)!==o)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function eV({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,kt.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function tV({declared:t,declaredNode:e},r){let n=t.properties.reduce((o,s)=>o.add(s.name,s),new XB.MultiMap);for(let[o,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${o}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let o=0;o<i.length;o++)for(let s=o+1;s<i.length;s++){let u=i[o],l=i[s],c=(0,kt.isInterfaceType)(u)?u.superProperties:[],d=(0,kt.isInterfaceType)(l)?l.superProperties:[],h=rV(c,d);h.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${h.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let a=new Set;for(let o of i){let s=(0,kt.isInterfaceType)(o)?o.superProperties:[];for(let u of s)a.add(u.name)}for(let o of t.properties)if(a.has(o.name)){let s=e.attributes.find(u=>u.name===o.name);s&&r("error",`Cannot redeclare property '${o.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function rV(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!nV(n,i)&&r.push(n.name)}return r}function nV(t,e){return(0,kt.isTypeAssignable)(t.type,e.type)&&(0,kt.isTypeAssignable)(e.type,t.type)}function iV(t,e){let{inferred:r,declared:n,declaredNode:i,inferredNodes:a}=t,o=n.name,s=c=>d=>a.forEach(h=>e("error",`${d}${c?` ${c}`:""}.`,h?.inferredType?{node:h?.inferredType,property:"name"}:{node:h,property:us.isAction(h)?"type":"name"})),u=(c,d)=>c.forEach(h=>e("error",d,{node:h,property:us.isAssignment(h)||us.isAction(h)?"feature":"name"})),l=c=>{a.forEach(d=>{us.isParserRule(d)&&(0,JB.extractAssignments)(d.definition).find(v=>v.feature===c)===void 0&&e("error",`Property '${c}' is missing in a rule '${d.name}', but is required in type '${o}'.`,{node:d,property:"parameters"})})};if((0,kt.isUnionType)(r)&&(0,kt.isUnionType)(n))aV(r.type,n.type,s(`in a rule that returns type '${o}'`));else if((0,kt.isInterfaceType)(r)&&(0,kt.isInterfaceType)(n))oV(r,n,s(`in a rule that returns type '${o}'`),u,l);else{let c=`Inferred and declared versions of type '${o}' both have to be interfaces or unions.`;s()(c),e("error",c,{node:i,property:"name"})}}function aV(t,e,r){(0,kt.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,kt.propertyTypeToString)(t,"DeclaredType")}' to '${(0,kt.propertyTypeToString)(e,"DeclaredType")}'`)}function oV(t,e,r,n,i){let a=new Set(t.properties.map(l=>l.name)),o=new Map(t.allProperties.map(l=>[l.name,l])),s=new Map(e.superProperties.map(l=>[l.name,l]));for(let[l,c]of o.entries()){let d=s.get(l);if(d){let h=(0,kt.propertyTypeToString)(c.type,"DeclaredType"),v=(0,kt.propertyTypeToString)(d.type,"DeclaredType");if(!(0,kt.isTypeAssignable)(c.type,d.type)){let A=`The assigned type '${h}' is not compatible with the declared property '${l}' of type '${v}'.`;n(c.astNodes,A)}!d.optional&&c.optional&&i(l)}else a.has(l)&&n(c.astNodes,`A property '${l}' is not expected.`)}let u=new Set;for(let[l,c]of s.entries())!o.get(l)&&!c.optional&&u.add(l);if(u.size>0){let l=u.size>1?"Properties":"A property",c=u.size>1?"are expected":"is expected",d=Array.from(u).map(h=>`'${h}'`).sort().join(", ");r(`${l} ${d} ${c}.`)}}});var sv=f(Xa=>{"use strict";Object.defineProperty(Xa,"__esModule",{value:!0});Xa.createLangiumGrammarServices=Xa.LangiumGrammarModule=void 0;var cb=od(),fb=Fu(),db=DP(),pb=UP(),mb=ag(),sV=XP(),uV=JP(),lV=ZP(),cV=e0(),fV=r0(),dV=l0(),pV=rb(),mV=ib(),hV=sb(),hb=lb(),yV=Rr(),gV=ua();Xa.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new mb.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new hV.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new hb.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new uV.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new sV.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new cV.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new lV.LangiumGrammarFormatter,DefinitionProvider:t=>new pV.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new mV.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new pb.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new pb.LangiumGrammarScopeProvider(t),References:t=>new dV.LangiumGrammarReferences(t),NameProvider:()=>new fV.LangiumGrammarNameProvider}};function vV(t,e){let r=(0,fb.inject)((0,cb.createDefaultSharedModule)(t),db.LangiumGrammarGeneratedSharedModule,e),n=(0,fb.inject)((0,cb.createDefaultModule)({shared:r}),db.LangiumGrammarGeneratedModule,Xa.LangiumGrammarModule);return TV(r,n),r.ServiceRegistry.register(n),(0,mb.registerValidationChecks)(n),(0,hb.registerTypeValidationChecks)(n),{shared:r,grammar:n}}Xa.createLangiumGrammarServices=vV;function TV(t,e){t.workspace.DocumentBuilder.onBuildPhase(gV.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,yV.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var uv=f(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.EmptyFileSystem=ls.EmptyFileSystemProvider=void 0;var sd=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};ls.EmptyFileSystemProvider=sd;ls.EmptyFileSystem={fileSystemProvider:()=>new sd}});var gt=f(pe=>{"use strict";var _V=pe&&pe.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),RV=pe&&pe.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),AV=pe&&pe.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&_V(e,t,r);return RV(e,t),e};Object.defineProperty(pe,"__esModule",{value:!0});pe.createServicesForGrammar=pe.loadGrammarFromJson=pe.findNameAssignment=pe.findAssignment=pe.findNodesForKeywordInternal=pe.findNodeForKeyword=pe.findNodesForKeyword=pe.findNodeForProperty=pe.findNodesForProperty=pe.isCommentTerminal=pe.getCrossReferenceTerminal=pe.getAllReachableRules=pe.getHiddenRules=pe.getEntryRule=void 0;var vb=Gn(),yb=od(),gb=Fu(),SV=Uy(),mr=AV(we()),PV=Ft(),Tb=sv(),bV=tr(),cs=Ae(),CV=Le(),lv=uv();function _b(t){return t.rules.find(e=>mr.isParserRule(e)&&e.entry)}pe.getEntryRule=_b;function Rb(t){return t.rules.filter(e=>mr.isTerminalRule(e)&&e.hidden)}pe.getHiddenRules=Rb;function kV(t,e){let r=new Set,n=_b(t);if(!n)return new Set(t.rules);let i=[n].concat(Rb(t));for(let o of i)Ab(o,r,e);let a=new Set;for(let o of t.rules)(r.has(o.name)||mr.isTerminalRule(o)&&o.hidden)&&a.add(o);return a}pe.getAllReachableRules=kV;function Ab(t,e,r){e.add(t.name),(0,cs.streamAllContents)(t).forEach(n=>{if(mr.isRuleCall(n)||r&&mr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&Ab(i,e,r)}})}function EV(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=Sb(t.type.ref);return e?.terminal}}pe.getCrossReferenceTerminal=EV;function wV(t){return t.hidden&&!" ".match((0,PV.terminalRegex)(t))}pe.isCommentTerminal=wV;function NV(t,e){return!t||!e?[]:cv(t,e,t.element,!0)}pe.findNodesForProperty=NV;function $V(t,e,r){if(!t||!e)return;let n=cv(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}pe.findNodeForProperty=$V;function cv(t,e,r,n){if(!n){let i=(0,cs.getContainerOfType)(t.feature,mr.isAssignment);if(i&&i.feature===e)return[t]}return(0,bV.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>cv(i,e,r,!1)):[]}function OV(t,e){return t?fv(t,e,t?.element):[]}pe.findNodesForKeyword=OV;function IV(t,e,r){if(!t)return;let n=fv(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}pe.findNodeForKeyword=IV;function fv(t,e,r){if(t.element!==r)return[];if(mr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,CV.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?mr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}pe.findNodesForKeywordInternal=fv;function DV(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,cs.getContainerOfType)(t.feature,mr.isAssignment);if(n)return n;t=t.parent}}pe.findAssignment=DV;function Sb(t){return mr.isInferredType(t)&&(t=t.$container),Pb(t,new Map)}pe.findNameAssignment=Sb;function Pb(t,e){var r;function n(i,a){let o;return(0,cs.getContainerOfType)(i,mr.isAssignment)||(o=Pb(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,cs.streamAllContents)(t)){if(mr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(mr.isRuleCall(i)&&mr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(mr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function xV(t){var e;let r=(0,Tb.createLangiumGrammarServices)(lv.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,vb.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}pe.loadGrammarFromJson=xV;async function LV(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,Tb.createLangiumGrammarServices)(lv.EmptyFileSystem).grammar,u=vb.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,cs.getDocument)(t.grammar),d=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=d.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=d.name)!==null&&o!==void 0?o:"UNKNOWN"},A={AstReflection:()=>(0,SV.interpretAstReflection)(d)},E={Grammar:()=>d,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},C=(0,gb.inject)((0,yb.createDefaultSharedModule)(lv.EmptyFileSystem),A,t.sharedModule),P=(0,gb.inject)((0,yb.createDefaultModule)({shared:C}),E,t.module);return C.ServiceRegistry.register(P),P}pe.createServicesForGrammar=LV});var dv=f(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.createGrammarConfig=void 0;var qV=Le(),MV=gt(),FV=Wa(),jV=we(),GV=Ft();function UV(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,jV.isTerminalRule)(n)&&(0,MV.isCommentTerminal)(n)&&(0,FV.isMultilineComment)((0,GV.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:qV.DefaultNameRegexp}}ud.createGrammarConfig=UV});var pv=f(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.VERSION=void 0;ld.VERSION="10.4.2"});var fs=f((ime,bb)=>{var HV=Object.prototype;function KV(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||HV;return t===r}bb.exports=KV});var mv=f((ame,Cb)=>{function WV(t,e){return function(r){return t(e(r))}}Cb.exports=WV});var Eb=f((ome,kb)=>{var BV=mv(),VV=BV(Object.keys,Object);kb.exports=VV});var hv=f((sme,wb)=>{var zV=fs(),YV=Eb(),XV=Object.prototype,JV=XV.hasOwnProperty;function QV(t){if(!zV(t))return YV(t);var e=[];for(var r in Object(t))JV.call(t,r)&&r!="constructor"&&e.push(r);return e}wb.exports=QV});var yv=f((ume,Nb)=>{var ZV=typeof global=="object"&&global&&global.Object===Object&&global;Nb.exports=ZV});var Rn=f((lme,$b)=>{var ez=yv(),tz=typeof self=="object"&&self&&self.Object===Object&&self,rz=ez||tz||Function("return this")();$b.exports=rz});var Ja=f((cme,Ob)=>{var nz=Rn(),iz=nz.Symbol;Ob.exports=iz});var Lb=f((fme,xb)=>{var Ib=Ja(),Db=Object.prototype,az=Db.hasOwnProperty,oz=Db.toString,rl=Ib?Ib.toStringTag:void 0;function sz(t){var e=az.call(t,rl),r=t[rl];try{t[rl]=void 0;var n=!0}catch{}var i=oz.call(t);return n&&(e?t[rl]=r:delete t[rl]),i}xb.exports=sz});var Mb=f((dme,qb)=>{var uz=Object.prototype,lz=uz.toString;function cz(t){return lz.call(t)}qb.exports=cz});var ca=f((pme,Gb)=>{var Fb=Ja(),fz=Lb(),dz=Mb(),pz="[object Null]",mz="[object Undefined]",jb=Fb?Fb.toStringTag:void 0;function hz(t){return t==null?t===void 0?mz:pz:jb&&jb in Object(t)?fz(t):dz(t)}Gb.exports=hz});var An=f((mme,Ub)=>{function yz(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Ub.exports=yz});var ds=f((hme,Hb)=>{var gz=ca(),vz=An(),Tz="[object AsyncFunction]",_z="[object Function]",Rz="[object GeneratorFunction]",Az="[object Proxy]";function Sz(t){if(!vz(t))return!1;var e=gz(t);return e==_z||e==Rz||e==Tz||e==Az}Hb.exports=Sz});var Wb=f((yme,Kb)=>{var Pz=Rn(),bz=Pz["__core-js_shared__"];Kb.exports=bz});var zb=f((gme,Vb)=>{var gv=Wb(),Bb=function(){var t=/[^.]+$/.exec(gv&&gv.keys&&gv.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Cz(t){return!!Bb&&Bb in t}Vb.exports=Cz});var vv=f((vme,Yb)=>{var kz=Function.prototype,Ez=kz.toString;function wz(t){if(t!=null){try{return Ez.call(t)}catch{}try{return t+""}catch{}}return""}Yb.exports=wz});var Jb=f((Tme,Xb)=>{var Nz=ds(),$z=zb(),Oz=An(),Iz=vv(),Dz=/[\\^$.*+?()[\]{}|]/g,xz=/^\[object .+?Constructor\]$/,Lz=Function.prototype,qz=Object.prototype,Mz=Lz.toString,Fz=qz.hasOwnProperty,jz=RegExp("^"+Mz.call(Fz).replace(Dz,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Gz(t){if(!Oz(t)||$z(t))return!1;var e=Nz(t)?jz:xz;return e.test(Iz(t))}Xb.exports=Gz});var Zb=f((_me,Qb)=>{function Uz(t,e){return t?.[e]}Qb.exports=Uz});var fa=f((Rme,eC)=>{var Hz=Jb(),Kz=Zb();function Wz(t,e){var r=Kz(t,e);return Hz(r)?r:void 0}eC.exports=Wz});var rC=f((Ame,tC)=>{var Bz=fa(),Vz=Rn(),zz=Bz(Vz,"DataView");tC.exports=zz});var cd=f((Sme,nC)=>{var Yz=fa(),Xz=Rn(),Jz=Yz(Xz,"Map");nC.exports=Jz});var aC=f((Pme,iC)=>{var Qz=fa(),Zz=Rn(),e2=Qz(Zz,"Promise");iC.exports=e2});var Tv=f((bme,oC)=>{var t2=fa(),r2=Rn(),n2=t2(r2,"Set");oC.exports=n2});var uC=f((Cme,sC)=>{var i2=fa(),a2=Rn(),o2=i2(a2,"WeakMap");sC.exports=o2});var ms=f((kme,hC)=>{var _v=rC(),Rv=cd(),Av=aC(),Sv=Tv(),Pv=uC(),mC=ca(),ps=vv(),lC="[object Map]",s2="[object Object]",cC="[object Promise]",fC="[object Set]",dC="[object WeakMap]",pC="[object DataView]",u2=ps(_v),l2=ps(Rv),c2=ps(Av),f2=ps(Sv),d2=ps(Pv),Qa=mC;(_v&&Qa(new _v(new ArrayBuffer(1)))!=pC||Rv&&Qa(new Rv)!=lC||Av&&Qa(Av.resolve())!=cC||Sv&&Qa(new Sv)!=fC||Pv&&Qa(new Pv)!=dC)&&(Qa=function(t){var e=mC(t),r=e==s2?t.constructor:void 0,n=r?ps(r):"";if(n)switch(n){case u2:return pC;case l2:return lC;case c2:return cC;case f2:return fC;case d2:return dC}return e});hC.exports=Qa});var Sn=f((Eme,yC)=>{function p2(t){return t!=null&&typeof t=="object"}yC.exports=p2});var vC=f((wme,gC)=>{var m2=ca(),h2=Sn(),y2="[object Arguments]";function g2(t){return h2(t)&&m2(t)==y2}gC.exports=g2});var nl=f((Nme,RC)=>{var TC=vC(),v2=Sn(),_C=Object.prototype,T2=_C.hasOwnProperty,_2=_C.propertyIsEnumerable,R2=TC(function(){return arguments}())?TC:function(t){return v2(t)&&T2.call(t,"callee")&&!_2.call(t,"callee")};RC.exports=R2});var xe=f(($me,AC)=>{var A2=Array.isArray;AC.exports=A2});var fd=f((Ome,SC)=>{var S2=9007199254740991;function P2(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=S2}SC.exports=P2});var Pn=f((Ime,PC)=>{var b2=ds(),C2=fd();function k2(t){return t!=null&&C2(t.length)&&!b2(t)}PC.exports=k2});var CC=f((Dme,bC)=>{function E2(){return!1}bC.exports=E2});var al=f((il,hs)=>{var w2=Rn(),N2=CC(),wC=typeof il=="object"&&il&&!il.nodeType&&il,kC=wC&&typeof hs=="object"&&hs&&!hs.nodeType&&hs,$2=kC&&kC.exports===wC,EC=$2?w2.Buffer:void 0,O2=EC?EC.isBuffer:void 0,I2=O2||N2;hs.exports=I2});var $C=f((xme,NC)=>{var D2=ca(),x2=fd(),L2=Sn(),q2="[object Arguments]",M2="[object Array]",F2="[object Boolean]",j2="[object Date]",G2="[object Error]",U2="[object Function]",H2="[object Map]",K2="[object Number]",W2="[object Object]",B2="[object RegExp]",V2="[object Set]",z2="[object String]",Y2="[object WeakMap]",X2="[object ArrayBuffer]",J2="[object DataView]",Q2="[object Float32Array]",Z2="[object Float64Array]",e3="[object Int8Array]",t3="[object Int16Array]",r3="[object Int32Array]",n3="[object Uint8Array]",i3="[object Uint8ClampedArray]",a3="[object Uint16Array]",o3="[object Uint32Array]",Qe={};Qe[Q2]=Qe[Z2]=Qe[e3]=Qe[t3]=Qe[r3]=Qe[n3]=Qe[i3]=Qe[a3]=Qe[o3]=!0;Qe[q2]=Qe[M2]=Qe[X2]=Qe[F2]=Qe[J2]=Qe[j2]=Qe[G2]=Qe[U2]=Qe[H2]=Qe[K2]=Qe[W2]=Qe[B2]=Qe[V2]=Qe[z2]=Qe[Y2]=!1;function s3(t){return L2(t)&&x2(t.length)&&!!Qe[D2(t)]}NC.exports=s3});var ys=f((Lme,OC)=>{function u3(t){return function(e){return t(e)}}OC.exports=u3});var ul=f((ol,gs)=>{var l3=yv(),IC=typeof ol=="object"&&ol&&!ol.nodeType&&ol,sl=IC&&typeof gs=="object"&&gs&&!gs.nodeType&&gs,c3=sl&&sl.exports===IC,bv=c3&&l3.process,f3=function(){try{var t=sl&&sl.require&&sl.require("util").types;return t||bv&&bv.binding&&bv.binding("util")}catch{}}();gs.exports=f3});var dd=f((qme,LC)=>{var d3=$C(),p3=ys(),DC=ul(),xC=DC&&DC.isTypedArray,m3=xC?p3(xC):d3;LC.exports=m3});var Or=f((Mme,qC)=>{var h3=hv(),y3=ms(),g3=nl(),v3=xe(),T3=Pn(),_3=al(),R3=fs(),A3=dd(),S3="[object Map]",P3="[object Set]",b3=Object.prototype,C3=b3.hasOwnProperty;function k3(t){if(t==null)return!0;if(T3(t)&&(v3(t)||typeof t=="string"||typeof t.splice=="function"||_3(t)||A3(t)||g3(t)))return!t.length;var e=y3(t);if(e==S3||e==P3)return!t.size;if(R3(t))return!h3(t).length;for(var r in t)if(C3.call(t,r))return!1;return!0}qC.exports=k3});var vs=f((Fme,MC)=>{function E3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}MC.exports=E3});var jC=f((jme,FC)=>{function w3(){this.__data__=[],this.size=0}FC.exports=w3});var Ts=f((Gme,GC)=>{function N3(t,e){return t===e||t!==t&&e!==e}GC.exports=N3});var ll=f((Ume,UC)=>{var $3=Ts();function O3(t,e){for(var r=t.length;r--;)if($3(t[r][0],e))return r;return-1}UC.exports=O3});var KC=f((Hme,HC)=>{var I3=ll(),D3=Array.prototype,x3=D3.splice;function L3(t){var e=this.__data__,r=I3(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():x3.call(e,r,1),--this.size,!0}HC.exports=L3});var BC=f((Kme,WC)=>{var q3=ll();function M3(t){var e=this.__data__,r=q3(e,t);return r<0?void 0:e[r][1]}WC.exports=M3});var zC=f((Wme,VC)=>{var F3=ll();function j3(t){return F3(this.__data__,t)>-1}VC.exports=j3});var XC=f((Bme,YC)=>{var G3=ll();function U3(t,e){var r=this.__data__,n=G3(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}YC.exports=U3});var cl=f((Vme,JC)=>{var H3=jC(),K3=KC(),W3=BC(),B3=zC(),V3=XC();function _s(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}_s.prototype.clear=H3;_s.prototype.delete=K3;_s.prototype.get=W3;_s.prototype.has=B3;_s.prototype.set=V3;JC.exports=_s});var ZC=f((zme,QC)=>{var z3=cl();function Y3(){this.__data__=new z3,this.size=0}QC.exports=Y3});var tk=f((Yme,ek)=>{function X3(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}ek.exports=X3});var nk=f((Xme,rk)=>{function J3(t){return this.__data__.get(t)}rk.exports=J3});var ak=f((Jme,ik)=>{function Q3(t){return this.__data__.has(t)}ik.exports=Q3});var fl=f((Qme,ok)=>{var Z3=fa(),e4=Z3(Object,"create");ok.exports=e4});var lk=f((Zme,uk)=>{var sk=fl();function t4(){this.__data__=sk?sk(null):{},this.size=0}uk.exports=t4});var fk=f((ehe,ck)=>{function r4(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}ck.exports=r4});var pk=f((the,dk)=>{var n4=fl(),i4="__lodash_hash_undefined__",a4=Object.prototype,o4=a4.hasOwnProperty;function s4(t){var e=this.__data__;if(n4){var r=e[t];return r===i4?void 0:r}return o4.call(e,t)?e[t]:void 0}dk.exports=s4});var hk=f((rhe,mk)=>{var u4=fl(),l4=Object.prototype,c4=l4.hasOwnProperty;function f4(t){var e=this.__data__;return u4?e[t]!==void 0:c4.call(e,t)}mk.exports=f4});var gk=f((nhe,yk)=>{var d4=fl(),p4="__lodash_hash_undefined__";function m4(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=d4&&e===void 0?p4:e,this}yk.exports=m4});var Tk=f((ihe,vk)=>{var h4=lk(),y4=fk(),g4=pk(),v4=hk(),T4=gk();function Rs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Rs.prototype.clear=h4;Rs.prototype.delete=y4;Rs.prototype.get=g4;Rs.prototype.has=v4;Rs.prototype.set=T4;vk.exports=Rs});var Ak=f((ahe,Rk)=>{var _k=Tk(),_4=cl(),R4=cd();function A4(){this.size=0,this.__data__={hash:new _k,map:new(R4||_4),string:new _k}}Rk.exports=A4});var Pk=f((ohe,Sk)=>{function S4(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}Sk.exports=S4});var dl=f((she,bk)=>{var P4=Pk();function b4(t,e){var r=t.__data__;return P4(e)?r[typeof e=="string"?"string":"hash"]:r.map}bk.exports=b4});var kk=f((uhe,Ck)=>{var C4=dl();function k4(t){var e=C4(this,t).delete(t);return this.size-=e?1:0,e}Ck.exports=k4});var wk=f((lhe,Ek)=>{var E4=dl();function w4(t){return E4(this,t).get(t)}Ek.exports=w4});var $k=f((che,Nk)=>{var N4=dl();function $4(t){return N4(this,t).has(t)}Nk.exports=$4});var Ik=f((fhe,Ok)=>{var O4=dl();function I4(t,e){var r=O4(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}Ok.exports=I4});var pd=f((dhe,Dk)=>{var D4=Ak(),x4=kk(),L4=wk(),q4=$k(),M4=Ik();function As(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}As.prototype.clear=D4;As.prototype.delete=x4;As.prototype.get=L4;As.prototype.has=q4;As.prototype.set=M4;Dk.exports=As});var Lk=f((phe,xk)=>{var F4=cl(),j4=cd(),G4=pd(),U4=200;function H4(t,e){var r=this.__data__;if(r instanceof F4){var n=r.__data__;if(!j4||n.length<U4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new G4(n)}return r.set(t,e),this.size=r.size,this}xk.exports=H4});var md=f((mhe,qk)=>{var K4=cl(),W4=ZC(),B4=tk(),V4=nk(),z4=ak(),Y4=Lk();function Ss(t){var e=this.__data__=new K4(t);this.size=e.size}Ss.prototype.clear=W4;Ss.prototype.delete=B4;Ss.prototype.get=V4;Ss.prototype.has=z4;Ss.prototype.set=Y4;qk.exports=Ss});var Fk=f((hhe,Mk)=>{var X4="__lodash_hash_undefined__";function J4(t){return this.__data__.set(t,X4),this}Mk.exports=J4});var Gk=f((yhe,jk)=>{function Q4(t){return this.__data__.has(t)}jk.exports=Q4});var yd=f((ghe,Uk)=>{var Z4=pd(),e6=Fk(),t6=Gk();function hd(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Z4;++e<r;)this.add(t[e])}hd.prototype.add=hd.prototype.push=e6;hd.prototype.has=t6;Uk.exports=hd});var Cv=f((vhe,Hk)=>{function r6(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}Hk.exports=r6});var gd=f((The,Kk)=>{function n6(t,e){return t.has(e)}Kk.exports=n6});var kv=f((_he,Wk)=>{var i6=yd(),a6=Cv(),o6=gd(),s6=1,u6=2;function l6(t,e,r,n,i,a){var o=r&s6,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var d=-1,h=!0,v=r&u6?new i6:void 0;for(a.set(t,e),a.set(e,t);++d<s;){var y=t[d],A=e[d];if(n)var E=o?n(A,y,d,e,t,a):n(y,A,d,t,e,a);if(E!==void 0){if(E)continue;h=!1;break}if(v){if(!a6(e,function(C,P){if(!o6(v,P)&&(y===C||i(y,C,r,n,a)))return v.push(P)})){h=!1;break}}else if(!(y===A||i(y,A,r,n,a))){h=!1;break}}return a.delete(t),a.delete(e),h}Wk.exports=l6});var Ev=f((Rhe,Bk)=>{var c6=Rn(),f6=c6.Uint8Array;Bk.exports=f6});var zk=f((Ahe,Vk)=>{function d6(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}Vk.exports=d6});var vd=f((She,Yk)=>{function p6(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}Yk.exports=p6});var eE=f((Phe,Zk)=>{var Xk=Ja(),Jk=Ev(),m6=Ts(),h6=kv(),y6=zk(),g6=vd(),v6=1,T6=2,_6="[object Boolean]",R6="[object Date]",A6="[object Error]",S6="[object Map]",P6="[object Number]",b6="[object RegExp]",C6="[object Set]",k6="[object String]",E6="[object Symbol]",w6="[object ArrayBuffer]",N6="[object DataView]",Qk=Xk?Xk.prototype:void 0,wv=Qk?Qk.valueOf:void 0;function $6(t,e,r,n,i,a,o){switch(r){case N6:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case w6:return!(t.byteLength!=e.byteLength||!a(new Jk(t),new Jk(e)));case _6:case R6:case P6:return m6(+t,+e);case A6:return t.name==e.name&&t.message==e.message;case b6:case k6:return t==e+"";case S6:var s=y6;case C6:var u=n&v6;if(s||(s=g6),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=T6,o.set(t,e);var c=h6(s(t),s(e),n,i,a,o);return o.delete(t),c;case E6:if(wv)return wv.call(t)==wv.call(e)}return!1}Zk.exports=$6});var Td=f((bhe,tE)=>{function O6(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}tE.exports=O6});var Nv=f((Che,rE)=>{var I6=Td(),D6=xe();function x6(t,e,r){var n=e(t);return D6(t)?n:I6(n,r(t))}rE.exports=x6});var _d=f((khe,nE)=>{function L6(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}nE.exports=L6});var $v=f((Ehe,iE)=>{function q6(){return[]}iE.exports=q6});var Rd=f((whe,oE)=>{var M6=_d(),F6=$v(),j6=Object.prototype,G6=j6.propertyIsEnumerable,aE=Object.getOwnPropertySymbols,U6=aE?function(t){return t==null?[]:(t=Object(t),M6(aE(t),function(e){return G6.call(t,e)}))}:F6;oE.exports=U6});var uE=f((Nhe,sE)=>{function H6(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}sE.exports=H6});var pl=f(($he,lE)=>{var K6=9007199254740991,W6=/^(?:0|[1-9]\d*)$/;function B6(t,e){var r=typeof t;return e=e??K6,!!e&&(r=="number"||r!="symbol"&&W6.test(t))&&t>-1&&t%1==0&&t<e}lE.exports=B6});var Ov=f((Ohe,cE)=>{var V6=uE(),z6=nl(),Y6=xe(),X6=al(),J6=pl(),Q6=dd(),Z6=Object.prototype,e5=Z6.hasOwnProperty;function t5(t,e){var r=Y6(t),n=!r&&z6(t),i=!r&&!n&&X6(t),a=!r&&!n&&!i&&Q6(t),o=r||n||i||a,s=o?V6(t.length,String):[],u=s.length;for(var l in t)(e||e5.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||J6(l,u)))&&s.push(l);return s}cE.exports=t5});var Ir=f((Ihe,fE)=>{var r5=Ov(),n5=hv(),i5=Pn();function a5(t){return i5(t)?r5(t):n5(t)}fE.exports=a5});var Iv=f((Dhe,dE)=>{var o5=Nv(),s5=Rd(),u5=Ir();function l5(t){return o5(t,u5,s5)}dE.exports=l5});var hE=f((xhe,mE)=>{var pE=Iv(),c5=1,f5=Object.prototype,d5=f5.hasOwnProperty;function p5(t,e,r,n,i,a){var o=r&c5,s=pE(t),u=s.length,l=pE(e),c=l.length;if(u!=c&&!o)return!1;for(var d=u;d--;){var h=s[d];if(!(o?h in e:d5.call(e,h)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var A=!0;a.set(t,e),a.set(e,t);for(var E=o;++d<u;){h=s[d];var C=t[h],P=e[h];if(n)var S=o?n(P,C,h,e,t,a):n(C,P,h,t,e,a);if(!(S===void 0?C===P||i(C,P,r,n,a):S)){A=!1;break}E||(E=h=="constructor")}if(A&&!E){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(A=!1)}return a.delete(t),a.delete(e),A}mE.exports=p5});var SE=f((Lhe,AE)=>{var Dv=md(),m5=kv(),h5=eE(),y5=hE(),yE=ms(),gE=xe(),vE=al(),g5=dd(),v5=1,TE="[object Arguments]",_E="[object Array]",Ad="[object Object]",T5=Object.prototype,RE=T5.hasOwnProperty;function _5(t,e,r,n,i,a){var o=gE(t),s=gE(e),u=o?_E:yE(t),l=s?_E:yE(e);u=u==TE?Ad:u,l=l==TE?Ad:l;var c=u==Ad,d=l==Ad,h=u==l;if(h&&vE(t)){if(!vE(e))return!1;o=!0,c=!1}if(h&&!c)return a||(a=new Dv),o||g5(t)?m5(t,e,r,n,i,a):h5(t,e,u,r,n,i,a);if(!(r&v5)){var v=c&&RE.call(t,"__wrapped__"),y=d&&RE.call(e,"__wrapped__");if(v||y){var A=v?t.value():t,E=y?e.value():e;return a||(a=new Dv),i(A,E,r,n,a)}}return h?(a||(a=new Dv),y5(t,e,r,n,i,a)):!1}AE.exports=_5});var xv=f((qhe,CE)=>{var R5=SE(),PE=Sn();function bE(t,e,r,n,i){return t===e?!0:t==null||e==null||!PE(t)&&!PE(e)?t!==t&&e!==e:R5(t,e,r,n,bE,i)}CE.exports=bE});var EE=f((Mhe,kE)=>{var A5=md(),S5=xv(),P5=1,b5=2;function C5(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var d=new A5;if(n)var h=n(l,c,u,t,e,d);if(!(h===void 0?S5(c,l,P5|b5,n,d):h))return!1}}return!0}kE.exports=C5});var Lv=f((Fhe,wE)=>{var k5=An();function E5(t){return t===t&&!k5(t)}wE.exports=E5});var $E=f((jhe,NE)=>{var w5=Lv(),N5=Ir();function $5(t){for(var e=N5(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,w5(i)]}return e}NE.exports=$5});var qv=f((Ghe,OE)=>{function O5(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}OE.exports=O5});var DE=f((Uhe,IE)=>{var I5=EE(),D5=$E(),x5=qv();function L5(t){var e=D5(t);return e.length==1&&e[0][2]?x5(e[0][0],e[0][1]):function(r){return r===t||I5(r,t,e)}}IE.exports=L5});var Ps=f((Hhe,xE)=>{var q5=ca(),M5=Sn(),F5="[object Symbol]";function j5(t){return typeof t=="symbol"||M5(t)&&q5(t)==F5}xE.exports=j5});var Sd=f((Khe,LE)=>{var G5=xe(),U5=Ps(),H5=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,K5=/^\w*$/;function W5(t,e){if(G5(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||U5(t)?!0:K5.test(t)||!H5.test(t)||e!=null&&t in Object(e)}LE.exports=W5});var FE=f((Whe,ME)=>{var qE=pd(),B5="Expected a function";function Mv(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(B5);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(Mv.Cache||qE),r}Mv.Cache=qE;ME.exports=Mv});var GE=f((Bhe,jE)=>{var V5=FE(),z5=500;function Y5(t){var e=V5(t,function(n){return r.size===z5&&r.clear(),n}),r=e.cache;return e}jE.exports=Y5});var HE=f((Vhe,UE)=>{var X5=GE(),J5=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Q5=/\\(\\)?/g,Z5=X5(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(J5,function(r,n,i,a){e.push(i?a.replace(Q5,"$1"):n||r)}),e});UE.exports=Z5});var YE=f((zhe,zE)=>{var KE=Ja(),e8=vs(),t8=xe(),r8=Ps(),n8=1/0,WE=KE?KE.prototype:void 0,BE=WE?WE.toString:void 0;function VE(t){if(typeof t=="string")return t;if(t8(t))return e8(t,VE)+"";if(r8(t))return BE?BE.call(t):"";var e=t+"";return e=="0"&&1/t==-n8?"-0":e}zE.exports=VE});var Fv=f((Yhe,XE)=>{var i8=YE();function a8(t){return t==null?"":i8(t)}XE.exports=a8});var ml=f((Xhe,JE)=>{var o8=xe(),s8=Sd(),u8=HE(),l8=Fv();function c8(t,e){return o8(t)?t:s8(t,e)?[t]:u8(l8(t))}JE.exports=c8});var bs=f((Jhe,QE)=>{var f8=Ps(),d8=1/0;function p8(t){if(typeof t=="string"||f8(t))return t;var e=t+"";return e=="0"&&1/t==-d8?"-0":e}QE.exports=p8});var Pd=f((Qhe,ZE)=>{var m8=ml(),h8=bs();function y8(t,e){e=m8(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[h8(e[r++])];return r&&r==n?t:void 0}ZE.exports=y8});var tw=f((Zhe,ew)=>{var g8=Pd();function v8(t,e,r){var n=t==null?void 0:g8(t,e);return n===void 0?r:n}ew.exports=v8});var nw=f((eye,rw)=>{function T8(t,e){return t!=null&&e in Object(t)}rw.exports=T8});var jv=f((tye,iw)=>{var _8=ml(),R8=nl(),A8=xe(),S8=pl(),P8=fd(),b8=bs();function C8(t,e,r){e=_8(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=b8(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&P8(i)&&S8(o,i)&&(A8(t)||R8(t)))}iw.exports=C8});var ow=f((rye,aw)=>{var k8=nw(),E8=jv();function w8(t,e){return t!=null&&E8(t,e,k8)}aw.exports=w8});var uw=f((nye,sw)=>{var N8=xv(),$8=tw(),O8=ow(),I8=Sd(),D8=Lv(),x8=qv(),L8=bs(),q8=1,M8=2;function F8(t,e){return I8(t)&&D8(e)?x8(L8(t),e):function(r){var n=$8(r,t);return n===void 0&&n===e?O8(r,t):N8(e,n,q8|M8)}}sw.exports=F8});var Za=f((iye,lw)=>{function j8(t){return t}lw.exports=j8});var fw=f((aye,cw)=>{function G8(t){return function(e){return e?.[t]}}cw.exports=G8});var pw=f((oye,dw)=>{var U8=Pd();function H8(t){return function(e){return U8(e,t)}}dw.exports=H8});var hw=f((sye,mw)=>{var K8=fw(),W8=pw(),B8=Sd(),V8=bs();function z8(t){return B8(t)?K8(V8(t)):W8(t)}mw.exports=z8});var Jr=f((uye,yw)=>{var Y8=DE(),X8=uw(),J8=Za(),Q8=xe(),Z8=hw();function e9(t){return typeof t=="function"?t:t==null?J8:typeof t=="object"?Q8(t)?X8(t[0],t[1]):Y8(t):Z8(t)}yw.exports=e9});var vw=f((lye,gw)=>{function t9(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}gw.exports=t9});var _w=f((cye,Tw)=>{var r9=vw(),n9=r9();Tw.exports=n9});var Aw=f((fye,Rw)=>{var i9=_w(),a9=Ir();function o9(t,e){return t&&i9(t,e,a9)}Rw.exports=o9});var Pw=f((dye,Sw)=>{var s9=Pn();function u9(t,e){return function(r,n){if(r==null)return r;if(!s9(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}Sw.exports=u9});var da=f((pye,bw)=>{var l9=Aw(),c9=Pw(),f9=c9(l9);bw.exports=f9});var kw=f((mye,Cw)=>{var d9=da(),p9=Pn();function m9(t,e){var r=-1,n=p9(t)?Array(t.length):[];return d9(t,function(i,a,o){n[++r]=e(i,a,o)}),n}Cw.exports=m9});var Gt=f((hye,Ew)=>{var h9=vs(),y9=Jr(),g9=kw(),v9=xe();function T9(t,e){var r=v9(t)?h9:g9;return r(t,y9(e,3))}Ew.exports=T9});var Gv=f((yye,ww)=>{function _9(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}ww.exports=_9});var $w=f((gye,Nw)=>{var R9=Za();function A9(t){return typeof t=="function"?t:R9}Nw.exports=A9});var Ut=f((vye,Ow)=>{var S9=Gv(),P9=da(),b9=$w(),C9=xe();function k9(t,e){var r=C9(t)?S9:P9;return r(t,b9(e))}Ow.exports=k9});var Dw=f((Tye,Iw)=>{var E9=vs();function w9(t,e){return E9(e,function(r){return t[r]})}Iw.exports=w9});var Bn=f((_ye,xw)=>{var N9=Dw(),$9=Ir();function O9(t){return t==null?[]:N9(t,$9(t))}xw.exports=O9});var qw=f((Rye,Lw)=>{var I9=Object.prototype,D9=I9.hasOwnProperty;function x9(t,e){return t!=null&&D9.call(t,e)}Lw.exports=x9});var Dr=f((Aye,Mw)=>{var L9=qw(),q9=jv();function M9(t,e){return t!=null&&q9(t,e,L9)}Mw.exports=M9});var Uv=f((Sye,Fw)=>{var F9=fa(),j9=function(){try{var t=F9(Object,"defineProperty");return t({},"",{}),t}catch{}}();Fw.exports=j9});var bd=f((Pye,Gw)=>{var jw=Uv();function G9(t,e,r){e=="__proto__"&&jw?jw(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}Gw.exports=G9});var hl=f((bye,Uw)=>{var U9=bd(),H9=Ts(),K9=Object.prototype,W9=K9.hasOwnProperty;function B9(t,e,r){var n=t[e];(!(W9.call(t,e)&&H9(n,r))||r===void 0&&!(e in t))&&U9(t,e,r)}Uw.exports=B9});var Cs=f((Cye,Hw)=>{var V9=hl(),z9=bd();function Y9(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?z9(r,s,u):V9(r,s,u)}return r}Hw.exports=Y9});var Ww=f((kye,Kw)=>{var X9=Cs(),J9=Ir();function Q9(t,e){return t&&X9(e,J9(e),t)}Kw.exports=Q9});var Vw=f((Eye,Bw)=>{function Z9(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}Bw.exports=Z9});var Yw=f((wye,zw)=>{var e7=An(),t7=fs(),r7=Vw(),n7=Object.prototype,i7=n7.hasOwnProperty;function a7(t){if(!e7(t))return r7(t);var e=t7(t),r=[];for(var n in t)n=="constructor"&&(e||!i7.call(t,n))||r.push(n);return r}zw.exports=a7});var yl=f((Nye,Xw)=>{var o7=Ov(),s7=Yw(),u7=Pn();function l7(t){return u7(t)?o7(t,!0):s7(t)}Xw.exports=l7});var Qw=f(($ye,Jw)=>{var c7=Cs(),f7=yl();function d7(t,e){return t&&c7(e,f7(e),t)}Jw.exports=d7});var nN=f((gl,ks)=>{var p7=Rn(),rN=typeof gl=="object"&&gl&&!gl.nodeType&&gl,Zw=rN&&typeof ks=="object"&&ks&&!ks.nodeType&&ks,m7=Zw&&Zw.exports===rN,eN=m7?p7.Buffer:void 0,tN=eN?eN.allocUnsafe:void 0;function h7(t,e){if(e)return t.slice();var r=t.length,n=tN?tN(r):new t.constructor(r);return t.copy(n),n}ks.exports=h7});var aN=f((Oye,iN)=>{function y7(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}iN.exports=y7});var sN=f((Iye,oN)=>{var g7=Cs(),v7=Rd();function T7(t,e){return g7(t,v7(t),e)}oN.exports=T7});var Hv=f((Dye,uN)=>{var _7=mv(),R7=_7(Object.getPrototypeOf,Object);uN.exports=R7});var Kv=f((xye,lN)=>{var A7=Td(),S7=Hv(),P7=Rd(),b7=$v(),C7=Object.getOwnPropertySymbols,k7=C7?function(t){for(var e=[];t;)A7(e,P7(t)),t=S7(t);return e}:b7;lN.exports=k7});var fN=f((Lye,cN)=>{var E7=Cs(),w7=Kv();function N7(t,e){return E7(t,w7(t),e)}cN.exports=N7});var Wv=f((qye,dN)=>{var $7=Nv(),O7=Kv(),I7=yl();function D7(t){return $7(t,I7,O7)}dN.exports=D7});var mN=f((Mye,pN)=>{var x7=Object.prototype,L7=x7.hasOwnProperty;function q7(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&L7.call(t,"index")&&(r.index=t.index,r.input=t.input),r}pN.exports=q7});var Cd=f((Fye,yN)=>{var hN=Ev();function M7(t){var e=new t.constructor(t.byteLength);return new hN(e).set(new hN(t)),e}yN.exports=M7});var vN=f((jye,gN)=>{var F7=Cd();function j7(t,e){var r=e?F7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}gN.exports=j7});var _N=f((Gye,TN)=>{var G7=/\w*$/;function U7(t){var e=new t.constructor(t.source,G7.exec(t));return e.lastIndex=t.lastIndex,e}TN.exports=U7});var bN=f((Uye,PN)=>{var RN=Ja(),AN=RN?RN.prototype:void 0,SN=AN?AN.valueOf:void 0;function H7(t){return SN?Object(SN.call(t)):{}}PN.exports=H7});var kN=f((Hye,CN)=>{var K7=Cd();function W7(t,e){var r=e?K7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}CN.exports=W7});var wN=f((Kye,EN)=>{var B7=Cd(),V7=vN(),z7=_N(),Y7=bN(),X7=kN(),J7="[object Boolean]",Q7="[object Date]",Z7="[object Map]",eY="[object Number]",tY="[object RegExp]",rY="[object Set]",nY="[object String]",iY="[object Symbol]",aY="[object ArrayBuffer]",oY="[object DataView]",sY="[object Float32Array]",uY="[object Float64Array]",lY="[object Int8Array]",cY="[object Int16Array]",fY="[object Int32Array]",dY="[object Uint8Array]",pY="[object Uint8ClampedArray]",mY="[object Uint16Array]",hY="[object Uint32Array]";function yY(t,e,r){var n=t.constructor;switch(e){case aY:return B7(t);case J7:case Q7:return new n(+t);case oY:return V7(t,r);case sY:case uY:case lY:case cY:case fY:case dY:case pY:case mY:case hY:return X7(t,r);case Z7:return new n;case eY:case nY:return new n(t);case tY:return z7(t);case rY:return new n;case iY:return Y7(t)}}EN.exports=yY});var ON=f((Wye,$N)=>{var gY=An(),NN=Object.create,vY=function(){function t(){}return function(e){if(!gY(e))return{};if(NN)return NN(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();$N.exports=vY});var DN=f((Bye,IN)=>{var TY=ON(),_Y=Hv(),RY=fs();function AY(t){return typeof t.constructor=="function"&&!RY(t)?TY(_Y(t)):{}}IN.exports=AY});var LN=f((Vye,xN)=>{var SY=ms(),PY=Sn(),bY="[object Map]";function CY(t){return PY(t)&&SY(t)==bY}xN.exports=CY});var jN=f((zye,FN)=>{var kY=LN(),EY=ys(),qN=ul(),MN=qN&&qN.isMap,wY=MN?EY(MN):kY;FN.exports=wY});var UN=f((Yye,GN)=>{var NY=ms(),$Y=Sn(),OY="[object Set]";function IY(t){return $Y(t)&&NY(t)==OY}GN.exports=IY});var BN=f((Xye,WN)=>{var DY=UN(),xY=ys(),HN=ul(),KN=HN&&HN.isSet,LY=KN?xY(KN):DY;WN.exports=LY});var JN=f((Jye,XN)=>{var qY=md(),MY=Gv(),FY=hl(),jY=Ww(),GY=Qw(),UY=nN(),HY=aN(),KY=sN(),WY=fN(),BY=Iv(),VY=Wv(),zY=ms(),YY=mN(),XY=wN(),JY=DN(),QY=xe(),ZY=al(),eX=jN(),tX=An(),rX=BN(),nX=Ir(),iX=yl(),aX=1,oX=2,sX=4,VN="[object Arguments]",uX="[object Array]",lX="[object Boolean]",cX="[object Date]",fX="[object Error]",zN="[object Function]",dX="[object GeneratorFunction]",pX="[object Map]",mX="[object Number]",YN="[object Object]",hX="[object RegExp]",yX="[object Set]",gX="[object String]",vX="[object Symbol]",TX="[object WeakMap]",_X="[object ArrayBuffer]",RX="[object DataView]",AX="[object Float32Array]",SX="[object Float64Array]",PX="[object Int8Array]",bX="[object Int16Array]",CX="[object Int32Array]",kX="[object Uint8Array]",EX="[object Uint8ClampedArray]",wX="[object Uint16Array]",NX="[object Uint32Array]",Ye={};Ye[VN]=Ye[uX]=Ye[_X]=Ye[RX]=Ye[lX]=Ye[cX]=Ye[AX]=Ye[SX]=Ye[PX]=Ye[bX]=Ye[CX]=Ye[pX]=Ye[mX]=Ye[YN]=Ye[hX]=Ye[yX]=Ye[gX]=Ye[vX]=Ye[kX]=Ye[EX]=Ye[wX]=Ye[NX]=!0;Ye[fX]=Ye[zN]=Ye[TX]=!1;function kd(t,e,r,n,i,a){var o,s=e&aX,u=e&oX,l=e&sX;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!tX(t))return t;var c=QY(t);if(c){if(o=YY(t),!s)return HY(t,o)}else{var d=zY(t),h=d==zN||d==dX;if(ZY(t))return UY(t,s);if(d==YN||d==VN||h&&!i){if(o=u||h?{}:JY(t),!s)return u?WY(t,GY(o,t)):KY(t,jY(o,t))}else{if(!Ye[d])return i?t:{};o=XY(t,d,s)}}a||(a=new qY);var v=a.get(t);if(v)return v;a.set(t,o),rX(t)?t.forEach(function(E){o.add(kd(E,e,r,E,t,a))}):eX(t)&&t.forEach(function(E,C){o.set(C,kd(E,e,r,C,t,a))});var y=l?u?VY:BY:u?iX:nX,A=c?void 0:y(t);return MY(A||t,function(E,C){A&&(C=E,E=t[C]),FY(o,C,kd(E,e,r,C,t,a))}),o}XN.exports=kd});var Ei=f((Qye,QN)=>{var $X=JN(),OX=4;function IX(t){return $X(t,OX)}QN.exports=IX});var ZN=f(Es=>{"use strict";Object.defineProperty(Es,"__esModule",{value:!0});Es.PRINT_WARNING=Es.PRINT_ERROR=void 0;function DX(t){console&&console.error&&console.error("Error: ".concat(t))}Es.PRINT_ERROR=DX;function xX(t){console&&console.warn&&console.warn("Warning: ".concat(t))}Es.PRINT_WARNING=xX});var e$=f(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.timer=void 0;function LX(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Ed.timer=LX});var t$=f((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var ws=f(Vn=>{"use strict";Object.defineProperty(Vn,"__esModule",{value:!0});Vn.toFastProperties=Vn.timer=Vn.PRINT_ERROR=Vn.PRINT_WARNING=void 0;var r$=ZN();Object.defineProperty(Vn,"PRINT_WARNING",{enumerable:!0,get:function(){return r$.PRINT_WARNING}});Object.defineProperty(Vn,"PRINT_ERROR",{enumerable:!0,get:function(){return r$.PRINT_ERROR}});var qX=e$();Object.defineProperty(Vn,"timer",{enumerable:!0,get:function(){return qX.timer}});var MX=t$();Object.defineProperty(Vn,"toFastProperties",{enumerable:!0,get:function(){return MX.toFastProperties}})});var wd=f((rge,n$)=>{function FX(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}n$.exports=FX});var a$=f((nge,i$)=>{var jX=/\s/;function GX(t){for(var e=t.length;e--&&jX.test(t.charAt(e)););return e}i$.exports=GX});var s$=f((ige,o$)=>{var UX=a$(),HX=/^\s+/;function KX(t){return t&&t.slice(0,UX(t)+1).replace(HX,"")}o$.exports=KX});var f$=f((age,c$)=>{var WX=s$(),u$=An(),BX=Ps(),l$=0/0,VX=/^[-+]0x[0-9a-f]+$/i,zX=/^0b[01]+$/i,YX=/^0o[0-7]+$/i,XX=parseInt;function JX(t){if(typeof t=="number")return t;if(BX(t))return l$;if(u$(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=u$(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=WX(t);var r=zX.test(t);return r||YX.test(t)?XX(t.slice(2),r?2:8):VX.test(t)?l$:+t}c$.exports=JX});var m$=f((oge,p$)=>{var QX=f$(),d$=1/0,ZX=17976931348623157e292;function eJ(t){if(!t)return t===0?t:0;if(t=QX(t),t===d$||t===-d$){var e=t<0?-1:1;return e*ZX}return t===t?t:0}p$.exports=eJ});var Ns=f((sge,h$)=>{var tJ=m$();function rJ(t){var e=tJ(t),r=e%1;return e===e?r?e-r:e:0}h$.exports=rJ});var Nd=f((uge,y$)=>{var nJ=wd(),iJ=Ns();function aJ(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:iJ(e),nJ(t,e<0?0:e,n)):[]}y$.exports=aJ});var vl=f((lge,g$)=>{var oJ=ca(),sJ=xe(),uJ=Sn(),lJ="[object String]";function cJ(t){return typeof t=="string"||!sJ(t)&&uJ(t)&&oJ(t)==lJ}g$.exports=cJ});var T$=f((cge,v$)=>{var fJ=ca(),dJ=Sn(),pJ="[object RegExp]";function mJ(t){return dJ(t)&&fJ(t)==pJ}v$.exports=mJ});var Bv=f((fge,A$)=>{var hJ=T$(),yJ=ys(),_$=ul(),R$=_$&&_$.isRegExp,gJ=R$?yJ(R$):hJ;A$.exports=gJ});var b$=f((dge,P$)=>{var vJ=hl(),TJ=ml(),_J=pl(),S$=An(),RJ=bs();function AJ(t,e,r,n){if(!S$(t))return t;e=TJ(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=RJ(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=S$(c)?c:_J(e[i+1])?[]:{})}vJ(s,u,l),s=s[u]}return t}P$.exports=AJ});var k$=f((pge,C$)=>{var SJ=Pd(),PJ=b$(),bJ=ml();function CJ(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=SJ(t,o);r(s,o)&&PJ(a,bJ(o,t),s)}return a}C$.exports=CJ});var Vv=f((mge,E$)=>{var kJ=vs(),EJ=Jr(),wJ=k$(),NJ=Wv();function $J(t,e){if(t==null)return{};var r=kJ(NJ(t),function(n){return[n]});return e=EJ(e),wJ(t,r,function(n,i){return e(n,i[0])})}E$.exports=$J});var N$=f((hge,w$)=>{function OJ(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}w$.exports=OJ});var I$=f((yge,O$)=>{var IJ=N$(),$$=Math.max;function DJ(t,e,r){return e=$$(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=$$(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),IJ(t,this,s)}}O$.exports=DJ});var x$=f((gge,D$)=>{function xJ(t){return function(){return t}}D$.exports=xJ});var M$=f((vge,q$)=>{var LJ=x$(),L$=Uv(),qJ=Za(),MJ=L$?function(t,e){return L$(t,"toString",{configurable:!0,enumerable:!1,value:LJ(e),writable:!0})}:qJ;q$.exports=MJ});var j$=f((Tge,F$)=>{var FJ=800,jJ=16,GJ=Date.now;function UJ(t){var e=0,r=0;return function(){var n=GJ(),i=jJ-(n-r);if(r=n,i>0){if(++e>=FJ)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}F$.exports=UJ});var U$=f((_ge,G$)=>{var HJ=M$(),KJ=j$(),WJ=KJ(HJ);G$.exports=WJ});var $d=f((Rge,H$)=>{var BJ=Za(),VJ=I$(),zJ=U$();function YJ(t,e){return zJ(VJ(t,e,BJ),t+"")}H$.exports=YJ});var Tl=f((Age,K$)=>{var XJ=Ts(),JJ=Pn(),QJ=pl(),ZJ=An();function eQ(t,e,r){if(!ZJ(r))return!1;var n=typeof e;return(n=="number"?JJ(r)&&QJ(e,r.length):n=="string"&&e in r)?XJ(r[e],t):!1}K$.exports=eQ});var B$=f((Sge,W$)=>{var tQ=$d(),rQ=Tl();function nQ(t){return tQ(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&rQ(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}W$.exports=nQ});var _l=f((Pge,V$)=>{var iQ=hl(),aQ=Cs(),oQ=B$(),sQ=Pn(),uQ=fs(),lQ=Ir(),cQ=Object.prototype,fQ=cQ.hasOwnProperty,dQ=oQ(function(t,e){if(uQ(e)||sQ(e)){aQ(e,lQ(e),t);return}for(var r in e)fQ.call(e,r)&&iQ(t,r,e[r])});V$.exports=dQ});var Id=f(Pe=>{"use strict";var wi=Pe&&Pe.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),$s=Pe&&Pe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.serializeProduction=Pe.serializeGrammar=Pe.Terminal=Pe.Alternation=Pe.RepetitionWithSeparator=Pe.Repetition=Pe.RepetitionMandatoryWithSeparator=Pe.RepetitionMandatory=Pe.Option=Pe.Alternative=Pe.Rule=Pe.NonTerminal=Pe.AbstractProduction=void 0;var z$=$s(Gt()),pQ=$s(Ut()),zv=$s(vl()),mQ=$s(Bv()),zn=$s(Vv()),Yn=$s(_l());function hQ(t){return yQ(t)?t.LABEL:t.name}function yQ(t){return(0,zv.default)(t.LABEL)&&t.LABEL!==""}var Xn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,pQ.default)(this.definition,function(r){r.accept(e)})},t}();Pe.AbstractProduction=Xn;var Y$=function(t){wi(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Xn);Pe.NonTerminal=Y$;var X$=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.Rule=X$;var J$=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.Alternative=J$;var Q$=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.Option=Q$;var Z$=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.RepetitionMandatory=Z$;var eO=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.RepetitionMandatoryWithSeparator=eO;var tO=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.Repetition=tO;var rO=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return e}(Xn);Pe.RepetitionWithSeparator=rO;var nO=function(t){wi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Yn.default)(n,(0,zn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Xn);Pe.Alternation=nO;var Od=function(){function t(e){this.idx=1,(0,Yn.default)(this,(0,zn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Pe.Terminal=Od;function gQ(t){return(0,z$.default)(t,Rl)}Pe.serializeGrammar=gQ;function Rl(t){function e(a){return(0,z$.default)(a,Rl)}if(t instanceof Y$){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,zv.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof J$)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Q$)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Z$)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof eO)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Rl(new Od({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof rO)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Rl(new Od({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof tO)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof nO)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Od){var n={type:"Terminal",name:t.terminalType.name,label:hQ(t.terminalType),idx:t.idx};(0,zv.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,mQ.default)(i)?i.source:i),n}else{if(t instanceof X$)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Pe.serializeProduction=Rl});var iO=f(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.GAstVisitor=void 0;var Jn=Id(),vQ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Jn.NonTerminal:return this.visitNonTerminal(r);case Jn.Alternative:return this.visitAlternative(r);case Jn.Option:return this.visitOption(r);case Jn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Jn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Jn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Jn.Repetition:return this.visitRepetition(r);case Jn.Alternation:return this.visitAlternation(r);case Jn.Terminal:return this.visitTerminal(r);case Jn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Dd.GAstVisitor=vQ});var oO=f((kge,aO)=>{var TQ=da();function _Q(t,e){var r;return TQ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}aO.exports=_Q});var xd=f((Ege,sO)=>{var RQ=Cv(),AQ=Jr(),SQ=oO(),PQ=xe(),bQ=Tl();function CQ(t,e,r){var n=PQ(t)?RQ:SQ;return r&&bQ(t,e,r)&&(e=void 0),n(t,AQ(e,3))}sO.exports=CQ});var lO=f((wge,uO)=>{function kQ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}uO.exports=kQ});var fO=f((Nge,cO)=>{var EQ=da();function wQ(t,e){var r=!0;return EQ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}cO.exports=wQ});var Al=f(($ge,dO)=>{var NQ=lO(),$Q=fO(),OQ=Jr(),IQ=xe(),DQ=Tl();function xQ(t,e,r){var n=IQ(t)?NQ:$Q;return r&&DQ(t,e,r)&&(e=void 0),n(t,OQ(e,3))}dO.exports=xQ});var Yv=f((Oge,pO)=>{function LQ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}pO.exports=LQ});var hO=f((Ige,mO)=>{function qQ(t){return t!==t}mO.exports=qQ});var gO=f((Dge,yO)=>{function MQ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}yO.exports=MQ});var Ld=f((xge,vO)=>{var FQ=Yv(),jQ=hO(),GQ=gO();function UQ(t,e,r){return e===e?GQ(t,e,r):FQ(t,jQ,r)}vO.exports=UQ});var Ni=f((Lge,TO)=>{var HQ=Ld(),KQ=Pn(),WQ=vl(),BQ=Ns(),VQ=Bn(),zQ=Math.max;function YQ(t,e,r,n){t=KQ(t)?t:VQ(t),r=r&&!n?BQ(r):0;var i=t.length;return r<0&&(r=zQ(i+r,0)),WQ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&HQ(t,e,r)>-1}TO.exports=YQ});var _O=f(Qr=>{"use strict";var Jv=Qr&&Qr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Qr,"__esModule",{value:!0});Qr.getProductionDslName=Qr.isBranchingProd=Qr.isOptionalProd=Qr.isSequenceProd=void 0;var XQ=Jv(xd()),JQ=Jv(Al()),QQ=Jv(Ni()),at=Id();function ZQ(t){return t instanceof at.Alternative||t instanceof at.Option||t instanceof at.Repetition||t instanceof at.RepetitionMandatory||t instanceof at.RepetitionMandatoryWithSeparator||t instanceof at.RepetitionWithSeparator||t instanceof at.Terminal||t instanceof at.Rule}Qr.isSequenceProd=ZQ;function Xv(t,e){e===void 0&&(e=[]);var r=t instanceof at.Option||t instanceof at.Repetition||t instanceof at.RepetitionWithSeparator;return r?!0:t instanceof at.Alternation?(0,XQ.default)(t.definition,function(n){return Xv(n,e)}):t instanceof at.NonTerminal&&(0,QQ.default)(e,t)?!1:t instanceof at.AbstractProduction?(t instanceof at.NonTerminal&&e.push(t),(0,JQ.default)(t.definition,function(n){return Xv(n,e)})):!1}Qr.isOptionalProd=Xv;function eZ(t){return t instanceof at.Alternation}Qr.isBranchingProd=eZ;function tZ(t){if(t instanceof at.NonTerminal)return"SUBRULE";if(t instanceof at.Option)return"OPTION";if(t instanceof at.Alternation)return"OR";if(t instanceof at.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof at.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof at.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof at.Repetition)return"MANY";if(t instanceof at.Terminal)return"CONSUME";throw Error("non exhaustive match")}Qr.getProductionDslName=tZ});var vt=f(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.isSequenceProd=me.isBranchingProd=me.isOptionalProd=me.getProductionDslName=me.GAstVisitor=me.serializeProduction=me.serializeGrammar=me.Alternative=me.Alternation=me.RepetitionWithSeparator=me.RepetitionMandatoryWithSeparator=me.RepetitionMandatory=me.Repetition=me.Option=me.NonTerminal=me.Terminal=me.Rule=void 0;var Zr=Id();Object.defineProperty(me,"Rule",{enumerable:!0,get:function(){return Zr.Rule}});Object.defineProperty(me,"Terminal",{enumerable:!0,get:function(){return Zr.Terminal}});Object.defineProperty(me,"NonTerminal",{enumerable:!0,get:function(){return Zr.NonTerminal}});Object.defineProperty(me,"Option",{enumerable:!0,get:function(){return Zr.Option}});Object.defineProperty(me,"Repetition",{enumerable:!0,get:function(){return Zr.Repetition}});Object.defineProperty(me,"RepetitionMandatory",{enumerable:!0,get:function(){return Zr.RepetitionMandatory}});Object.defineProperty(me,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Zr.RepetitionMandatoryWithSeparator}});Object.defineProperty(me,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Zr.RepetitionWithSeparator}});Object.defineProperty(me,"Alternation",{enumerable:!0,get:function(){return Zr.Alternation}});Object.defineProperty(me,"Alternative",{enumerable:!0,get:function(){return Zr.Alternative}});Object.defineProperty(me,"serializeGrammar",{enumerable:!0,get:function(){return Zr.serializeGrammar}});Object.defineProperty(me,"serializeProduction",{enumerable:!0,get:function(){return Zr.serializeProduction}});var rZ=iO();Object.defineProperty(me,"GAstVisitor",{enumerable:!0,get:function(){return rZ.GAstVisitor}});var qd=_O();Object.defineProperty(me,"getProductionDslName",{enumerable:!0,get:function(){return qd.getProductionDslName}});Object.defineProperty(me,"isOptionalProd",{enumerable:!0,get:function(){return qd.isOptionalProd}});Object.defineProperty(me,"isBranchingProd",{enumerable:!0,get:function(){return qd.isBranchingProd}});Object.defineProperty(me,"isSequenceProd",{enumerable:!0,get:function(){return qd.isSequenceProd}})});var Md=f(Os=>{"use strict";var SO=Os&&Os.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Os,"__esModule",{value:!0});Os.RestWalker=void 0;var nZ=SO(Nd()),RO=SO(Ut()),Sr=vt(),iZ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,RO.default)(e.definition,function(i,a){var o=(0,nZ.default)(e.definition,a+1);if(i instanceof Sr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Sr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Sr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Sr.Option)n.walkOption(i,o,r);else if(i instanceof Sr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Sr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Sr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Sr.Repetition)n.walkMany(i,o,r);else if(i instanceof Sr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Sr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=AO(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Sr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=AO(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,RO.default)(e.definition,function(o){var s=new Sr.Alternative({definition:[o]});i.walk(s,a)})},t}();Os.RestWalker=iZ;function AO(t,e,r){var n=[new Sr.Option({definition:[new Sr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var kO=f((jge,CO)=>{var PO=Ja(),aZ=nl(),oZ=xe(),bO=PO?PO.isConcatSpreadable:void 0;function sZ(t){return oZ(t)||aZ(t)||!!(bO&&t&&t[bO])}CO.exports=sZ});var Fd=f((Gge,wO)=>{var uZ=Td(),lZ=kO();function EO(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=lZ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?EO(s,e-1,r,n,i):uZ(i,s):n||(i[i.length]=s)}return i}wO.exports=EO});var bn=f((Uge,NO)=>{var cZ=Fd();function fZ(t){var e=t==null?0:t.length;return e?cZ(t,1):[]}NO.exports=fZ});var Qv=f((Hge,$O)=>{var dZ=Ld();function pZ(t,e){var r=t==null?0:t.length;return!!r&&dZ(t,e,0)>-1}$O.exports=pZ});var Zv=f((Kge,OO)=>{function mZ(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}OO.exports=mZ});var jd=f((Wge,IO)=>{function hZ(){}IO.exports=hZ});var xO=f((Bge,DO)=>{var eT=Tv(),yZ=jd(),gZ=vd(),vZ=1/0,TZ=eT&&1/gZ(new eT([,-0]))[1]==vZ?function(t){return new eT(t)}:yZ;DO.exports=TZ});var tT=f((Vge,LO)=>{var _Z=yd(),RZ=Qv(),AZ=Zv(),SZ=gd(),PZ=xO(),bZ=vd(),CZ=200;function kZ(t,e,r){var n=-1,i=RZ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=AZ;else if(a>=CZ){var l=e?null:PZ(t);if(l)return bZ(l);o=!1,i=SZ,u=new _Z}else u=e?[]:s;e:for(;++n<a;){var c=t[n],d=e?e(c):c;if(c=r||c!==0?c:0,o&&d===d){for(var h=u.length;h--;)if(u[h]===d)continue e;e&&u.push(d),s.push(c)}else i(u,d,r)||(u!==s&&u.push(d),s.push(c))}return s}LO.exports=kZ});var Gd=f((zge,qO)=>{var EZ=tT();function wZ(t){return t&&t.length?EZ(t):[]}qO.exports=wZ});var iT=f(en=>{"use strict";var nT=en&&en.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(en,"__esModule",{value:!0});en.firstForTerminal=en.firstForBranching=en.firstForSequence=en.first=void 0;var NZ=nT(bn()),FO=nT(Gd()),$Z=nT(Gt()),MO=vt(),rT=vt();function Ud(t){if(t instanceof MO.NonTerminal)return Ud(t.referencedRule);if(t instanceof MO.Terminal)return UO(t);if((0,rT.isSequenceProd)(t))return jO(t);if((0,rT.isBranchingProd)(t))return GO(t);throw Error("non exhaustive match")}en.first=Ud;function jO(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,rT.isOptionalProd)(a),e=e.concat(Ud(a)),n=n+1,i=r.length>n;return(0,FO.default)(e)}en.firstForSequence=jO;function GO(t){var e=(0,$Z.default)(t.definition,function(r){return Ud(r)});return(0,FO.default)((0,NZ.default)(e))}en.firstForBranching=GO;function UO(t){return[t.terminalType]}en.firstForTerminal=UO});var aT=f(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.IN=void 0;Hd.IN="_~IN~_"});var VO=f(Pr=>{"use strict";var OZ=Pr&&Pr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),HO=Pr&&Pr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.buildInProdFollowPrefix=Pr.buildBetweenProdsFollowPrefix=Pr.computeAllProdsFollows=Pr.ResyncFollowsWalker=void 0;var IZ=Md(),DZ=iT(),xZ=HO(Ut()),LZ=HO(_l()),KO=aT(),qZ=vt(),WO=function(t){OZ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=BO(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new qZ.Alternative({definition:o}),u=(0,DZ.first)(s);this.follows[a]=u},e}(IZ.RestWalker);Pr.ResyncFollowsWalker=WO;function MZ(t){var e={};return(0,xZ.default)(t,function(r){var n=new WO(r).startWalking();(0,LZ.default)(e,n)}),e}Pr.computeAllProdsFollows=MZ;function BO(t,e){return t.name+e+KO.IN}Pr.buildBetweenProdsFollowPrefix=BO;function FZ(t){var e=t.terminalType.name;return e+t.idx+KO.IN}Pr.buildInProdFollowPrefix=FZ});var eo=f((Qge,zO)=>{function jZ(t){return t===void 0}zO.exports=jZ});var XO=f((Zge,YO)=>{function GZ(t){return t&&t.length?t[0]:void 0}YO.exports=GZ});var Is=f((eve,JO)=>{JO.exports=XO()});var Sl=f((tve,QO)=>{function UZ(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}QO.exports=UZ});var oT=f((rve,ZO)=>{var HZ=da();function KZ(t,e){var r=[];return HZ(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}ZO.exports=KZ});var tI=f((nve,eI)=>{var WZ="Expected a function";function BZ(t){if(typeof t!="function")throw new TypeError(WZ);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}eI.exports=BZ});var Kd=f((ive,rI)=>{var VZ=_d(),zZ=oT(),YZ=Jr(),XZ=xe(),JZ=tI();function QZ(t,e){var r=XZ(t)?VZ:zZ;return r(t,JZ(YZ(e,3)))}rI.exports=QZ});var iI=f((ave,nI)=>{var ZZ=yd(),eee=Qv(),tee=Zv(),ree=vs(),nee=ys(),iee=gd(),aee=200;function oee(t,e,r,n){var i=-1,a=eee,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=ree(e,nee(r))),n?(a=tee,o=!1):e.length>=aee&&(a=iee,o=!1,e=new ZZ(e));e:for(;++i<s;){var c=t[i],d=r==null?c:r(c);if(c=n||c!==0?c:0,o&&d===d){for(var h=l;h--;)if(e[h]===d)continue e;u.push(c)}else a(e,d,n)||u.push(c)}return u}nI.exports=oee});var oI=f((ove,aI)=>{var see=Pn(),uee=Sn();function lee(t){return uee(t)&&see(t)}aI.exports=lee});var Wd=f((sve,uI)=>{var cee=iI(),fee=Fd(),dee=$d(),sI=oI(),pee=dee(function(t,e){return sI(t)?cee(t,fee(e,1,sI,!0)):[]});uI.exports=pee});var cI=f((uve,lI)=>{var mee=Ld(),hee=Ns(),yee=Math.max;function gee(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:hee(r);return i<0&&(i=yee(n+i,0)),mee(t,e,i)}lI.exports=gee});var dI=f((lve,fI)=>{var vee=Jr(),Tee=Pn(),_ee=Ir();function Ree(t){return function(e,r,n){var i=Object(e);if(!Tee(e)){var a=vee(r,3);e=_ee(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}fI.exports=Ree});var mI=f((cve,pI)=>{var Aee=Yv(),See=Jr(),Pee=Ns(),bee=Math.max;function Cee(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Pee(r);return i<0&&(i=bee(n+i,0)),Aee(t,See(e,3),i)}pI.exports=Cee});var Bd=f((fve,hI)=>{var kee=dI(),Eee=mI(),wee=kee(Eee);hI.exports=wee});var Pl=f((dve,yI)=>{var Nee=_d(),$ee=oT(),Oee=Jr(),Iee=xe();function Dee(t,e){var r=Iee(t)?Nee:$ee;return r(t,Oee(e,3))}yI.exports=Dee});var sT=f((pve,vI)=>{var xee=$d(),Lee=Ts(),qee=Tl(),Mee=yl(),gI=Object.prototype,Fee=gI.hasOwnProperty,jee=xee(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&qee(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=Mee(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||Lee(c,gI[l])&&!Fee.call(t,l))&&(t[l]=a[l])}return t});vI.exports=jee});var _I=f((mve,TI)=>{function Gee(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}TI.exports=Gee});var AI=f((hve,RI)=>{function Uee(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}RI.exports=Uee});var $i=f((yve,SI)=>{var Hee=_I(),Kee=da(),Wee=Jr(),Bee=AI(),Vee=xe();function zee(t,e,r){var n=Vee(t)?Hee:Bee,i=arguments.length<3;return n(t,Wee(e,4),r,i,Kee)}SI.exports=zee});var zd=f(Ds=>{"use strict";Object.defineProperty(Ds,"__esModule",{value:!0});Ds.clearRegExpParserCache=Ds.getRegExpAst=void 0;var Yee=zu(),Vd={},Xee=new Yee.RegExpParser;function Jee(t){var e=t.toString();if(Vd.hasOwnProperty(e))return Vd[e];var r=Xee.pattern(e);return Vd[e]=r,r}Ds.getRegExpAst=Jee;function Qee(){Vd={}}Ds.clearRegExpParserCache=Qee});var wI=f(ar=>{"use strict";var Zee=ar&&ar.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),xs=ar&&ar.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ar,"__esModule",{value:!0});ar.canMatchCharCode=ar.firstCharOptimizedIndices=ar.getOptimizedStartCodesIndices=ar.failedOptimizationPrefixMsg=void 0;var CI=zu(),ete=xs(xe()),tte=xs(Al()),rte=xs(Ut()),uT=xs(Bd()),nte=xs(Bn()),cT=xs(Ni()),PI=ws(),kI=zd(),Oi=fT(),EI="Complement Sets are not supported for first char optimization";ar.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function ite(t,e){e===void 0&&(e=!1);try{var r=(0,kI.getRegExpAst)(t),n=Xd(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===EI)e&&(0,PI.PRINT_WARNING)("".concat(ar.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,PI.PRINT_ERROR)("".concat(ar.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(CI.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}ar.getOptimizedStartCodesIndices=ite;function Xd(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)Xd(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":Yd(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(EI);(0,rte.default)(o.value,function(l){if(typeof l=="number")Yd(l,e,r);else{var c=l;if(r===!0)for(var d=c.from;d<=c.to;d++)Yd(d,e,r);else{for(var d=c.from;d<=c.to&&d<Oi.minOptimizationVal;d++)Yd(d,e,r);if(c.to>=Oi.minOptimizationVal)for(var h=c.from>=Oi.minOptimizationVal?c.from:Oi.minOptimizationVal,v=c.to,y=(0,Oi.charCodeToOptimizedIndex)(h),A=(0,Oi.charCodeToOptimizedIndex)(v),E=y;E<=A;E++)e[E]=E}}});break;case"Group":Xd(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&lT(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,nte.default)(e)}ar.firstCharOptimizedIndices=Xd;function Yd(t,e,r){var n=(0,Oi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&ate(t,e)}function ate(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Oi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Oi.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function bI(t,e){return(0,uT.default)(t.value,function(r){if(typeof r=="number")return(0,cT.default)(e,r);var n=r;return(0,uT.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function lT(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,ete.default)(t.value)?(0,tte.default)(t.value,lT):lT(t.value):!1}var ote=function(t){Zee(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,cT.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?bI(r,this.targetCharCodes)===void 0&&(this.found=!0):bI(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(CI.BaseRegExpVisitor);function ste(t,e){if(e instanceof RegExp){var r=(0,kI.getRegExpAst)(e),n=new ote(t);return n.visit(r),n.found}else return(0,uT.default)(e,function(i){return(0,cT.default)(t,i.charCodeAt(0))})!==void 0}ar.canMatchCharCode=ste});var fT=f(K=>{"use strict";var OI=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),mt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var II=zu(),Me=bl(),ute=mt(Is()),DI=mt(Or()),xI=mt(Sl()),Qd=mt(xe()),lte=mt(Bn()),cte=mt(bn()),LI=mt(Kd()),qI=mt(Wd()),NI=mt(cI()),ot=mt(Gt()),Ii=mt(Ut()),Di=mt(vl()),ep=mt(ds()),pT=mt(eo()),fte=mt(Bd()),or=mt(Dr()),dte=mt(Ir()),pa=mt(Bv()),Qn=mt(Pl()),pte=mt(sT()),Zd=mt($i()),tp=mt(Ni()),$I=ws(),Ls=wI(),MI=zd(),to="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function mte(){K.SUPPORT_STICKY=!1}K.disableSticky=mte;function hte(){K.SUPPORT_STICKY=!0}K.enableSticky=hte;function yte(t,e){e=(0,pte.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(P,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){Cte()});var n;r("Reject Lexer.NA",function(){n=(0,LI.default)(t,function(P){return P[to]===Me.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,ot.default)(n,function(P){var S=P[to];if((0,pa.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,tp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?hT(S):mT(S)}else{if((0,ep.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?hT(W):mT(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,ot.default)(n,function(P){return P.tokenTypeIdx}),s=(0,ot.default)(n,function(P){var S=P.GROUP;if(S!==Me.Lexer.SKIPPED){if((0,Di.default)(S))return S;if((0,pT.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,ot.default)(n,function(P){var S=P.LONGER_ALT;if(S){var O=(0,Qd.default)(S)?(0,ot.default)(S,function(F){return(0,NI.default)(n,F)}):[(0,NI.default)(n,S)];return O}}),l=(0,ot.default)(n,function(P){return P.PUSH_MODE}),c=(0,ot.default)(n,function(P){return(0,or.default)(P,"POP_MODE")})});var d;r("Line Terminator Handling",function(){var P=QI(e.lineTerminatorCharacters);d=(0,ot.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(d=(0,ot.default)(n,function(S){return(0,or.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:XI(S,P)===!1&&(0,Ls.canMatchCharCode)(P,S.PATTERN)}))});var h,v,y,A;r("Misc Mapping #2",function(){h=(0,ot.default)(n,gT),v=(0,ot.default)(a,YI),y=(0,Zd.default)(n,function(P,S){var O=S.GROUP;return(0,Di.default)(O)&&O!==Me.Lexer.SKIPPED&&(P[O]=[]),P},{}),A=(0,ot.default)(a,function(P,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:d[S],isCustom:h[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var E=!0,C=[];return e.safeMode||r("First Char Optimization",function(){C=(0,Zd.default)(n,function(P,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=yT(F);dT(P,W,A[O])}else if((0,Qd.default)(S.START_CHARS_HINT)){var ee;(0,Ii.default)(S.START_CHARS_HINT,function(Ee){var Xe=typeof Ee=="string"?Ee.charCodeAt(0):Ee,V=yT(Xe);ee!==V&&(ee=V,dT(P,V,A[O]))})}else if((0,pa.default)(S.PATTERN))if(S.PATTERN.unicode)E=!1,e.ensureOptimizations&&(0,$I.PRINT_ERROR)("".concat(Ls.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var ke=(0,Ls.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,DI.default)(ke)&&(E=!1),(0,Ii.default)(ke,function(Ee){dT(P,Ee,A[O])})}else e.ensureOptimizations&&(0,$I.PRINT_ERROR)("".concat(Ls.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),E=!1;return P},[])}),{emptyGroups:y,patternIdxToConfig:A,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:E}}K.analyzeTokenTypes=yte;function gte(t,e){var r=[],n=FI(t);r=r.concat(n.errors);var i=jI(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(vte(a)),r=r.concat(BI(a)),r=r.concat(VI(a,e)),r=r.concat(zI(a)),r}K.validatePatterns=gte;function vte(t){var e=[],r=(0,Qn.default)(t,function(n){return(0,pa.default)(n[to])});return e=e.concat(GI(r)),e=e.concat(HI(r)),e=e.concat(KI(r)),e=e.concat(WI(r)),e=e.concat(UI(r)),e}function FI(t){var e=(0,Qn.default)(t,function(i){return!(0,or.default)(i,to)}),r=(0,ot.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:Me.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,qI.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=FI;function jI(t){var e=(0,Qn.default)(t,function(i){var a=i[to];return!(0,pa.default)(a)&&!(0,ep.default)(a)&&!(0,or.default)(a,"exec")&&!(0,Di.default)(a)}),r=(0,ot.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:Me.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,qI.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=jI;var Tte=/[^\\][$]/;function GI(t){var e=function(i){OI(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(II.BaseRegExpVisitor),r=(0,Qn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,MI.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Tte.test(a.source)}}),n=(0,ot.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Me.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=GI;function UI(t){var e=(0,Qn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,ot.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:Me.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=UI;var _te=/[^\\[][\^]|^\^/;function HI(t){var e=function(i){OI(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(II.BaseRegExpVisitor),r=(0,Qn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,MI.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return _te.test(a.source)}}),n=(0,ot.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Me.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=HI;function KI(t){var e=(0,Qn.default)(t,function(n){var i=n[to];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,ot.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:Me.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=KI;function WI(t){var e=[],r=(0,ot.default)(t,function(a){return(0,Zd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,tp.default)(e,s)&&s.PATTERN!==Me.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,xI.default)(r);var n=(0,Qn.default)(r,function(a){return a.length>1}),i=(0,ot.default)(n,function(a){var o=(0,ot.default)(a,function(u){return u.name}),s=(0,ute.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:Me.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=WI;function BI(t){var e=(0,Qn.default)(t,function(n){if(!(0,or.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==Me.Lexer.SKIPPED&&i!==Me.Lexer.NA&&!(0,Di.default)(i)}),r=(0,ot.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:Me.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=BI;function VI(t,e){var r=(0,Qn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,tp.default)(e,i.PUSH_MODE)}),n=(0,ot.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:Me.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=VI;function zI(t){var e=[],r=(0,Zd.default)(t,function(n,i,a){var o=i.PATTERN;return o===Me.Lexer.NA||((0,Di.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,pa.default)(o)&&Ate(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,Ii.default)(t,function(n,i){(0,Ii.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Rte(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:Me.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=zI;function Rte(t,e){if((0,pa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,ep.default)(e))return e(t,0,[],{});if((0,or.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Ate(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,fte.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function mT(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=mT;function hT(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=hT;function Ste(t,e,r){var n=[];return(0,or.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:Me.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,or.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:Me.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,or.default)(t,K.MODES)&&(0,or.default)(t,K.DEFAULT_MODE)&&!(0,or.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:Me.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,or.default)(t,K.MODES)&&(0,Ii.default)(t.modes,function(i,a){(0,Ii.default)(i,function(o,s){if((0,pT.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:Me.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,or.default)(o,"LONGER_ALT")){var u=(0,Qd.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,Ii.default)(u,function(l){!(0,pT.default)(l)&&!(0,tp.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:Me.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=Ste;function Pte(t,e,r){var n=[],i=!1,a=(0,xI.default)((0,cte.default)((0,lte.default)(t.modes))),o=(0,LI.default)(a,function(u){return u[to]===Me.Lexer.NA}),s=QI(r);return e&&(0,Ii.default)(o,function(u){var l=XI(u,s);if(l!==!1){var c=JI(u,l),d={message:c,type:l.issue,tokenType:u};n.push(d)}else(0,or.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,Ls.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:Me.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=Pte;function bte(t){var e={},r=(0,dte.default)(t);return(0,Ii.default)(r,function(n){var i=t[n];if((0,Qd.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=bte;function gT(t){var e=t.PATTERN;if((0,pa.default)(e))return!1;if((0,ep.default)(e))return!0;if((0,or.default)(e,"exec"))return!0;if((0,Di.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=gT;function YI(t){return(0,Di.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=YI;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function XI(t,e){if((0,or.default)(t,"LINE_BREAKS"))return!1;if((0,pa.default)(t.PATTERN)){try{(0,Ls.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:Me.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Di.default)(t.PATTERN))return!1;if(gT(t))return{issue:Me.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function JI(t,e){if(e.issue===Me.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===Me.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=JI;function QI(t){var e=(0,ot.default)(t,function(r){return(0,Di.default)(r)?r.charCodeAt(0):r});return e}function dT(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var Jd=[];function yT(t){return t<K.minOptimizationVal?t:Jd[t]}K.charCodeToOptimizedIndex=yT;function Cte(){if((0,DI.default)(Jd)){Jd=new Array(65536);for(var t=0;t<65536;t++)Jd[t]=t>255?255+~~(t/255):t}}});var rp=f((_ve,ZI)=>{function kte(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}ZI.exports=kte});var no=f(le=>{"use strict";var Zn=le&&le.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(le,"__esModule",{value:!0});le.isTokenType=le.hasExtendingTokensTypesMapProperty=le.hasExtendingTokensTypesProperty=le.hasCategoriesProperty=le.hasShortKeyProperty=le.singleAssignCategoriesToksMap=le.assignCategoriesMapProp=le.assignCategoriesTokensProp=le.assignTokenDefaultProps=le.expandCategories=le.augmentTokenTypes=le.tokenIdxToClass=le.tokenShortNameIdx=le.tokenStructuredMatcherNoCategories=le.tokenStructuredMatcher=void 0;var Ete=Zn(Or()),wte=Zn(Sl()),Nte=Zn(xe()),$te=Zn(bn()),Ote=Zn(Wd()),Ite=Zn(Gt()),ro=Zn(Ut()),Cl=Zn(Dr()),Dte=Zn(Ni()),xte=Zn(Ei());function Lte(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}le.tokenStructuredMatcher=Lte;function qte(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}le.tokenStructuredMatcherNoCategories=qte;le.tokenShortNameIdx=1;le.tokenIdxToClass={};function Mte(t){var e=eD(t);tD(e),nD(e),rD(e),(0,ro.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}le.augmentTokenTypes=Mte;function eD(t){for(var e=(0,xte.default)(t),r=t,n=!0;n;){r=(0,wte.default)((0,$te.default)((0,Ite.default)(r,function(a){return a.CATEGORIES})));var i=(0,Ote.default)(r,e);e=e.concat(i),(0,Ete.default)(i)?n=!1:r=i}return e}le.expandCategories=eD;function tD(t){(0,ro.default)(t,function(e){iD(e)||(le.tokenIdxToClass[le.tokenShortNameIdx]=e,e.tokenTypeIdx=le.tokenShortNameIdx++),vT(e)&&!(0,Nte.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),vT(e)||(e.CATEGORIES=[]),aD(e)||(e.categoryMatches=[]),oD(e)||(e.categoryMatchesMap={})})}le.assignTokenDefaultProps=tD;function rD(t){(0,ro.default)(t,function(e){e.categoryMatches=[],(0,ro.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(le.tokenIdxToClass[n].tokenTypeIdx)})})}le.assignCategoriesTokensProp=rD;function nD(t){(0,ro.default)(t,function(e){TT([],e)})}le.assignCategoriesMapProp=nD;function TT(t,e){(0,ro.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,ro.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Dte.default)(n,r)||TT(n,r)})}le.singleAssignCategoriesToksMap=TT;function iD(t){return(0,Cl.default)(t,"tokenTypeIdx")}le.hasShortKeyProperty=iD;function vT(t){return(0,Cl.default)(t,"CATEGORIES")}le.hasCategoriesProperty=vT;function aD(t){return(0,Cl.default)(t,"categoryMatches")}le.hasExtendingTokensTypesProperty=aD;function oD(t){return(0,Cl.default)(t,"categoryMatchesMap")}le.hasExtendingTokensTypesMapProperty=oD;function Fte(t){return(0,Cl.default)(t,"tokenTypeIdx")}le.isTokenType=Fte});var _T=f(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.defaultLexerErrorProvider=void 0;np.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var bl=f(Li=>{"use strict";var xr=Li&&Li.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Li,"__esModule",{value:!0});Li.Lexer=Li.LexerDefinitionErrorType=void 0;var xi=fT(),RT=xr(jd()),ip=xr(Or()),jte=xr(xe()),Gte=xr(rp()),Ute=xr(Kd()),sD=xr(Gt()),AT=xr(Ut()),Hte=xr(Ir()),Kte=xr(eo()),uD=xr(Za()),lD=xr(_l()),Wte=xr($i()),cD=xr(Ei()),ST=ws(),Bte=no(),Vte=_T(),zte=zd(),Yte;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Yte=Li.LexerDefinitionErrorType||(Li.LexerDefinitionErrorType={}));var kl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Vte.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(kl);var Xte=function(){function t(e,r){r===void 0&&(r=kl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,ST.timer)(o),l=u.time,c=u.value,d=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&d("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,lD.default)({},kl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===kl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=xi.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===kl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,jte.default)(e)?a={modes:{defaultMode:(0,cD.default)(e)},defaultMode:xi.DEFAULT_MODE}:(o=!1,a=(0,cD.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,xi.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,xi.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,AT.default)(a.modes,function(c,d){a.modes[d]=(0,Ute.default)(c,function(h){return(0,Kte.default)(h)})});var s=(0,Hte.default)(a.modes);if((0,AT.default)(a.modes,function(c,d){n.TRACE_INIT("Mode: <".concat(d,"> processing"),function(){if(n.modes.push(d),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,xi.validatePatterns)(c,s))}),(0,ip.default)(n.lexerDefinitionErrors)){(0,Bte.augmentTokenTypes)(c);var h;n.TRACE_INIT("analyzeTokenTypes",function(){h=(0,xi.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[d]=h.patternIdxToConfig,n.charCodeToPatternIdxToConfig[d]=h.charCodeToPatternIdxToConfig,n.emptyGroups=(0,lD.default)({},n.emptyGroups,h.emptyGroups),n.hasCustom=h.hasCustom||n.hasCustom,n.canModeBeOptimized[d]=h.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,ip.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,sD.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,AT.default)(n.lexerDefinitionWarning,function(c){(0,ST.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(xi.SUPPORT_STICKY?(n.chopInput=uD.default,n.match=n.matchWithTest):(n.updateLastIndex=RT.default,n.match=n.matchWithExec),o&&(n.handleModes=RT.default),n.trackStartLines===!1&&(n.computeNewColumn=uD.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=RT.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Wte.default)(n.canModeBeOptimized,function(d,h,v){return h===!1&&d.push(v),d},[]);if(r.ensureOptimizations&&!(0,ip.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,zte.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,ST.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,ip.default)(this.lexerDefinitionErrors)){var n=(0,sD.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,d,h,v,y,A,E,C,P,S,O=e,F=O.length,W=0,ee=0,ke=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ke),Xe=[],V=this.trackStartLines?1:void 0,ce=this.trackStartLines?1:void 0,q=(0,xi.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,ie=[],ae=[],Q=[],ct=[];Object.freeze(ct);var Ze;function Ot(){return ie}function nn(xt){var on=(0,xi.charCodeToOptimizedIndex)(xt),sn=ae[on];return sn===void 0?ct:sn}var wr=function(xt){if(Q.length===1&&xt.tokenType.PUSH_MODE===void 0){var on=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(xt);Xe.push({offset:xt.startOffset,line:xt.startLine,column:xt.startColumn,length:xt.image.length,message:on})}else{Q.pop();var sn=(0,Gte.default)(Q);ie=n.patternIdxToConfig[sn],ae=n.charCodeToPatternIdxToConfig[sn],B=ie.length;var Dn=n.canModeBeOptimized[sn]&&n.config.safeMode===!1;ae&&Dn?Ze=nn:Ze=Ot}};function vo(xt){Q.push(xt),ae=this.charCodeToPatternIdxToConfig[xt],ie=this.patternIdxToConfig[xt],B=ie.length,B=ie.length;var on=this.canModeBeOptimized[xt]&&this.config.safeMode===!1;ae&&on?Ze=nn:Ze=Ot}vo.call(this,r);for(var ur,To=this.config.recoveryEnabled;W<F;){l=null;var _o=O.charCodeAt(W),Ro=Ze(_o),hu=Ro.length;for(i=0;i<hu;i++){ur=Ro[i];var ht=ur.pattern;c=null;var ci=ur.short;if(ci!==!1?_o===ci&&(l=ht):ur.isCustom===!0?(S=ht.exec(O,W,Ee,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(ht,W),l=this.match(ht,e,W)),l!==null){if(u=ur.longerAlt,u!==void 0){var yu=u.length;for(o=0;o<yu;o++){var $n=ie[u[o]],Na=$n.pattern;if(d=null,$n.isCustom===!0?(S=Na.exec(O,W,Ee,q),S!==null?(s=S[0],S.payload!==void 0&&(d=S.payload)):s=null):(this.updateLastIndex(Na,W),s=this.match(Na,e,W)),s&&s.length>l.length){l=s,c=d,ur=$n;break}}}break}}if(l!==null){if(h=l.length,v=ur.group,v!==void 0&&(y=ur.tokenTypeIdx,A=this.createTokenInstance(l,W,y,ur.tokenType,V,ce,h),this.handlePayload(A,c),v===!1?ee=this.addToken(Ee,ee,A):q[v].push(A)),e=this.chopInput(e,h),W=W+h,ce=this.computeNewColumn(ce,h),L===!0&&ur.canLineTerminator===!0){var On=0,$a=void 0,Mr=void 0;j.lastIndex=0;do $a=j.test(l),$a===!0&&(Mr=j.lastIndex-1,On++);while($a===!0);On!==0&&(V=V+On,ce=h-Mr,this.updateTokenEndLineColumnLocation(A,v,Mr,On,V,ce,h))}this.handleModes(ur,wr,vo,A)}else{for(var an=W,Ao=V,So=ce,Nr=To===!1;Nr===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var In=ie[a],ht=In.pattern,ci=In.short;if(ci!==!1?O.charCodeAt(W)===ci&&(Nr=!0):In.isCustom===!0?Nr=ht.exec(O,W,Ee,q)!==null:(this.updateLastIndex(ht,W),Nr=ht.exec(e)!==null),Nr===!0)break}if(E=W-an,P=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,an,E,Ao,So),Xe.push({offset:an,line:Ao,column:So,length:E,message:P}),To===!1)break}}return this.hasCustom||(Ee.length=ee),{tokens:Ee,groups:q,errors:Xe}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Li.Lexer=Xte});var io=f(Dt=>{"use strict";var PT=Dt&&Dt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Dt,"__esModule",{value:!0});Dt.tokenMatcher=Dt.createTokenInstance=Dt.EOF=Dt.createToken=Dt.hasTokenLabel=Dt.tokenName=Dt.tokenLabel=void 0;var Jte=PT(vl()),qi=PT(Dr()),Qte=PT(eo()),Zte=bl(),bT=no();function ere(t){return TD(t)?t.LABEL:t.name}Dt.tokenLabel=ere;function tre(t){return t.name}Dt.tokenName=tre;function TD(t){return(0,Jte.default)(t.LABEL)&&t.LABEL!==""}Dt.hasTokenLabel=TD;var rre="parent",fD="categories",dD="label",pD="group",mD="push_mode",hD="pop_mode",yD="longer_alt",gD="line_breaks",vD="start_chars_hint";function _D(t){return nre(t)}Dt.createToken=_D;function nre(t){var e=t.pattern,r={};if(r.name=t.name,(0,Qte.default)(e)||(r.PATTERN=e),(0,qi.default)(t,rre))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,qi.default)(t,fD)&&(r.CATEGORIES=t[fD]),(0,bT.augmentTokenTypes)([r]),(0,qi.default)(t,dD)&&(r.LABEL=t[dD]),(0,qi.default)(t,pD)&&(r.GROUP=t[pD]),(0,qi.default)(t,hD)&&(r.POP_MODE=t[hD]),(0,qi.default)(t,mD)&&(r.PUSH_MODE=t[mD]),(0,qi.default)(t,yD)&&(r.LONGER_ALT=t[yD]),(0,qi.default)(t,gD)&&(r.LINE_BREAKS=t[gD]),(0,qi.default)(t,vD)&&(r.START_CHARS_HINT=t[vD]),r}Dt.EOF=_D({name:"EOF",pattern:Zte.Lexer.NA});(0,bT.augmentTokenTypes)([Dt.EOF]);function ire(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}Dt.createTokenInstance=ire;function are(t,e){return(0,bT.tokenStructuredMatcher)(t,e)}Dt.tokenMatcher=are});var Ms=f(Cn=>{"use strict";var ET=Cn&&Cn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.defaultGrammarValidatorErrorProvider=Cn.defaultGrammarResolverErrorProvider=Cn.defaultParserErrorProvider=void 0;var qs=io(),kT=ET(Is()),ma=ET(Gt()),ore=ET($i()),CT=vt(),RD=vt();Cn.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,qs.hasTokenLabel)(e),o=a?"--> ".concat((0,qs.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,kT.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,ore.default)(e,function(v,y){return v.concat(y)},[]),c=(0,ma.default)(l,function(v){return"[".concat((0,ma.default)(v,function(y){return(0,qs.tokenLabel)(y)}).join(", "),"]")}),d=(0,ma.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),h=`one of these possible Token sequences:
`.concat(d.join(`
`));return o+h+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,kT.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,ma.default)(e,function(c){return"[".concat((0,ma.default)(c,function(d){return(0,qs.tokenLabel)(d)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(Cn.defaultParserErrorProvider);Cn.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};Cn.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof CT.Terminal?c.terminalType.name:c instanceof CT.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,kT.default)(e),a=i.idx,o=(0,RD.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,ma.default)(t.prefixPath,function(i){return(0,qs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,ma.default)(t.prefixPath,function(i){return(0,qs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,RD.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,ma.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof CT.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var PD=f(ei=>{"use strict";var sre=ei&&ei.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),AD=ei&&ei.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ei,"__esModule",{value:!0});ei.GastRefResolverVisitor=ei.resolveGrammar=void 0;var ure=br(),lre=AD(Ut()),cre=AD(Bn()),fre=vt();function dre(t,e){var r=new SD(t,e);return r.resolveRefs(),r.errors}ei.resolveGrammar=dre;var SD=function(t){sre(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,lre.default)((0,cre.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:ure.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(fre.GAstVisitor);ei.GastRefResolverVisitor=SD});var CD=f((kve,bD)=>{function pre(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}bD.exports=pre});var ED=f((Eve,kD)=>{var mre=da();function hre(t,e,r,n){return mre(t,function(i,a,o){e(n,i,r(i),o)}),n}kD.exports=hre});var ND=f((wve,wD)=>{var yre=CD(),gre=ED(),vre=Jr(),Tre=xe();function _re(t,e){return function(r,n){var i=Tre(r)?yre:gre,a=e?e():{};return i(r,t,vre(n,2),a)}}wD.exports=_re});var wT=f((Nve,$D)=>{var Rre=bd(),Are=ND(),Sre=Object.prototype,Pre=Sre.hasOwnProperty,bre=Are(function(t,e,r){Pre.call(t,r)?t[r].push(e):Rre(t,r,[e])});$D.exports=bre});var ap=f(($ve,OD)=>{var Cre=Fd(),kre=Gt();function Ere(t,e){return Cre(kre(t,e),1)}OD.exports=Ere});var op=f((Ove,ID)=>{var wre=wd(),Nre=Ns();function $re(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nre(e),e=n-e,wre(t,0,e<0?0:e)):[]}ID.exports=$re});var wl=f(st=>{"use strict";var oo=st&&st.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),so=st&&st.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(st,"__esModule",{value:!0});st.nextPossibleTokensAfter=st.possiblePathsFrom=st.NextTerminalAfterAtLeastOneSepWalker=st.NextTerminalAfterAtLeastOneWalker=st.NextTerminalAfterManySepWalker=st.NextTerminalAfterManyWalker=st.AbstractNextTerminalAfterProductionWalker=st.NextAfterTokenWalker=st.AbstractNextPossibleTokensWalker=void 0;var xD=Md(),up=so(Is()),sp=so(Or()),DD=so(op()),hr=so(Nd()),Ore=so(rp()),Ire=so(Ut()),ao=so(Ei()),Dre=iT(),fe=vt(),LD=function(t){oo(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,ao.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,ao.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,sp.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(xD.RestWalker);st.AbstractNextPossibleTokensWalker=LD;var xre=function(t){oo(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new fe.Alternative({definition:a});this.possibleTokTypes=(0,Dre.first)(o),this.found=!0}},e}(LD);st.NextAfterTokenWalker=xre;var El=function(t){oo(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(xD.RestWalker);st.AbstractNextTerminalAfterProductionWalker=El;var Lre=function(t){oo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof fe.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(El);st.NextTerminalAfterManyWalker=Lre;var qre=function(t){oo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof fe.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(El);st.NextTerminalAfterManySepWalker=qre;var Mre=function(t){oo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof fe.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(El);st.NextTerminalAfterAtLeastOneWalker=Mre;var Fre=function(t){oo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof fe.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(El);st.NextTerminalAfterAtLeastOneSepWalker=Fre;function qD(t,e,r){r===void 0&&(r=[]),r=(0,ao.default)(r);var n=[],i=0;function a(l){return l.concat((0,hr.default)(t,i+1))}function o(l){var c=qD(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof fe.Alternative)return o(s.definition);if(s instanceof fe.NonTerminal)return o(s.definition);if(s instanceof fe.Option)n=o(s.definition);else if(s instanceof fe.RepetitionMandatory){var u=s.definition.concat([new fe.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof fe.RepetitionMandatoryWithSeparator){var u=[new fe.Alternative({definition:s.definition}),new fe.Repetition({definition:[new fe.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof fe.RepetitionWithSeparator){var u=s.definition.concat([new fe.Repetition({definition:[new fe.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof fe.Repetition){var u=s.definition.concat([new fe.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof fe.Alternation)return(0,Ire.default)(s.definition,function(l){(0,sp.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof fe.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,hr.default)(t,i)}),n}st.possiblePathsFrom=qD;function jre(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],d=[];for(d.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,sp.default)(d);){var h=d.pop();if(h===o){s&&(0,Ore.default)(d).idx<=l&&d.pop();continue}var v=h.def,y=h.idx,A=h.ruleStack,E=h.occurrenceStack;if(!(0,sp.default)(v)){var C=v[0];if(C===i){var P={idx:y,def:(0,hr.default)(v),ruleStack:(0,DD.default)(A),occurrenceStack:(0,DD.default)(E)};d.push(P)}else if(C instanceof fe.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,C.terminalType)){var P={idx:S,def:(0,hr.default)(v),ruleStack:A,occurrenceStack:E};d.push(P)}}else if(y===u-1)c.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:A,occurrenceStack:E}),s=!0;else throw Error("non exhaustive match");else if(C instanceof fe.NonTerminal){var F=(0,ao.default)(A);F.push(C.nonTerminalName);var W=(0,ao.default)(E);W.push(C.idx);var P={idx:y,def:C.definition.concat(a,(0,hr.default)(v)),ruleStack:F,occurrenceStack:W};d.push(P)}else if(C instanceof fe.Option){var ee={idx:y,def:(0,hr.default)(v),ruleStack:A,occurrenceStack:E};d.push(ee),d.push(o);var ke={idx:y,def:C.definition.concat((0,hr.default)(v)),ruleStack:A,occurrenceStack:E};d.push(ke)}else if(C instanceof fe.RepetitionMandatory){var Ee=new fe.Repetition({definition:C.definition,idx:C.idx}),Xe=C.definition.concat([Ee],(0,hr.default)(v)),P={idx:y,def:Xe,ruleStack:A,occurrenceStack:E};d.push(P)}else if(C instanceof fe.RepetitionMandatoryWithSeparator){var V=new fe.Terminal({terminalType:C.separator}),Ee=new fe.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Xe=C.definition.concat([Ee],(0,hr.default)(v)),P={idx:y,def:Xe,ruleStack:A,occurrenceStack:E};d.push(P)}else if(C instanceof fe.RepetitionWithSeparator){var ee={idx:y,def:(0,hr.default)(v),ruleStack:A,occurrenceStack:E};d.push(ee),d.push(o);var V=new fe.Terminal({terminalType:C.separator}),ce=new fe.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Xe=C.definition.concat([ce],(0,hr.default)(v)),ke={idx:y,def:Xe,ruleStack:A,occurrenceStack:E};d.push(ke)}else if(C instanceof fe.Repetition){var ee={idx:y,def:(0,hr.default)(v),ruleStack:A,occurrenceStack:E};d.push(ee),d.push(o);var ce=new fe.Repetition({definition:C.definition,idx:C.idx}),Xe=C.definition.concat([ce],(0,hr.default)(v)),ke={idx:y,def:Xe,ruleStack:A,occurrenceStack:E};d.push(ke)}else if(C instanceof fe.Alternation)for(var q=C.definition.length-1;q>=0;q--){var L=C.definition[q],j={idx:y,def:L.definition.concat((0,hr.default)(v)),ruleStack:A,occurrenceStack:E};d.push(j),d.push(o)}else if(C instanceof fe.Alternative)d.push({idx:y,def:C.definition.concat((0,hr.default)(v)),ruleStack:A,occurrenceStack:E});else if(C instanceof fe.Rule)d.push(Gre(C,y,A,E));else throw Error("non exhaustive match")}}return c}st.nextPossibleTokensAfter=jre;function Gre(t,e,r,n){var i=(0,ao.default)(r);i.push(t.name);var a=(0,ao.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Fs=f(_e=>{"use strict";var GD=_e&&_e.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),co=_e&&_e.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_e,"__esModule",{value:!0});_e.areTokenCategoriesNotUsed=_e.isStrictPrefixOfPath=_e.containsPath=_e.getLookaheadPathsForOptionalProd=_e.getLookaheadPathsForOr=_e.lookAheadSequenceFromAlternatives=_e.buildSingleAlternativeLookaheadFunction=_e.buildAlternativesLookAheadFunc=_e.buildLookaheadFuncForOptionalProd=_e.buildLookaheadFuncForOr=_e.getLookaheadPaths=_e.getProdType=_e.PROD_TYPE=void 0;var $T=co(Or()),UD=co(bn()),lo=co(Al()),lp=co(Gt()),uo=co(Ut()),MD=co(Dr()),HD=co($i()),FD=wl(),Ure=Md(),cp=no(),ha=vt(),Hre=vt(),Et;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(Et=_e.PROD_TYPE||(_e.PROD_TYPE={}));function KD(t){if(t instanceof ha.Option||t==="Option")return Et.OPTION;if(t instanceof ha.Repetition||t==="Repetition")return Et.REPETITION;if(t instanceof ha.RepetitionMandatory||t==="RepetitionMandatory")return Et.REPETITION_MANDATORY;if(t instanceof ha.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return Et.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof ha.RepetitionWithSeparator||t==="RepetitionWithSeparator")return Et.REPETITION_WITH_SEPARATOR;if(t instanceof ha.Alternation||t==="Alternation")return Et.ALTERNATION;throw Error("non exhaustive match")}_e.getProdType=KD;function Kre(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=KD(n);return a===Et.ALTERNATION?IT(e,r,i):DT(e,r,a,i)}_e.getLookaheadPaths=Kre;function Wre(t,e,r,n,i,a){var o=IT(t,e,r),s=xT(o)?cp.tokenStructuredMatcherNoCategories:cp.tokenStructuredMatcher;return a(o,n,s,i)}_e.buildLookaheadFuncForOr=Wre;function Bre(t,e,r,n,i,a){var o=DT(t,e,i,r),s=xT(o)?cp.tokenStructuredMatcherNoCategories:cp.tokenStructuredMatcher;return a(o[0],s,n)}_e.buildLookaheadFuncForOptionalProd=Bre;function Vre(t,e,r,n){var i=t.length,a=(0,lo.default)(t,function(u){return(0,lo.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,lp.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var d=t[c],h=d.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<h;y++){for(var A=d[y],E=A.length,C=0;C<E;C++){var P=this.LA(C+1);if(r(P,A[C])===!1)continue e}return c}}};if(a&&!n){var o=(0,lp.default)(t,function(u){return(0,UD.default)(u)}),s=(0,HD.default)(o,function(u,l,c){return(0,uo.default)(l,function(d){(0,MD.default)(u,d.tokenTypeIdx)||(u[d.tokenTypeIdx]=c),(0,uo.default)(d.categoryMatches,function(h){(0,MD.default)(u,h)||(u[h]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var d=0;d<c;d++){for(var h=l[d],v=h.length,y=0;y<v;y++){var A=this.LA(y+1);if(r(A,h[y])===!1)continue e}return u}}}}_e.buildAlternativesLookAheadFunc=Vre;function zre(t,e,r){var n=(0,lo.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,UD.default)(t);if(a.length===1&&(0,$T.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,HD.default)(a,function(l,c,d){return l[c.tokenTypeIdx]=!0,(0,uo.default)(c.categoryMatches,function(h){l[h]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],d=c.length,h=0;h<d;h++){var v=this.LA(h+1);if(e(v,c[h])===!1)continue e}return!0}return!1}}_e.buildSingleAlternativeLookaheadFunction=zre;var Yre=function(t){GD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,Et.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,Et.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,Et.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,Et.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,Et.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(Ure.RestWalker),WD=function(t){GD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,Et.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,Et.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,Et.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,Et.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,Et.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,Et.ALTERNATION)},e}(Hre.GAstVisitor);function jD(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function NT(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function Xre(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function OT(t,e){for(var r=(0,lp.default)(t,function(c){return(0,FD.possiblePathsFrom)([c],1)}),n=jD(r.length),i=(0,lp.default)(r,function(c){var d={};return(0,uo.default)(c,function(h){var v=NT(h.partialPath);(0,uo.default)(v,function(y){d[y]=!0})}),d}),a=r,o=1;o<=e;o++){var s=a;a=jD(s.length);for(var u=function(c){for(var d=s[c],h=0;h<d.length;h++){var v=d[h].partialPath,y=d[h].suffixDef,A=NT(v),E=Xre(i,A,c);if(E||(0,$T.default)(y)||v.length===e){var C=n[c];if(BD(C,v)===!1){C.push(v);for(var P=0;P<A.length;P++){var S=A[P];i[c][S]=!0}}}else{var O=(0,FD.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,uo.default)(O,function(F){var W=NT(F.partialPath);(0,uo.default)(W,function(ee){i[c][ee]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}_e.lookAheadSequenceFromAlternatives=OT;function IT(t,e,r,n){var i=new WD(t,Et.ALTERNATION,n);return e.accept(i),OT(i.result,r)}_e.getLookaheadPathsForOr=IT;function DT(t,e,r,n){var i=new WD(t,r);e.accept(i);var a=i.result,o=new Yre(e,t,r),s=o.startWalking(),u=new ha.Alternative({definition:a}),l=new ha.Alternative({definition:s});return OT([u,l],n)}_e.getLookaheadPathsForOptionalProd=DT;function BD(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}_e.containsPath=BD;function Jre(t,e){return t.length<e.length&&(0,lo.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}_e.isStrictPrefixOfPath=Jre;function xT(t){return(0,lo.default)(t,function(e){return(0,lo.default)(e,function(r){return(0,lo.default)(r,function(n){return(0,$T.default)(n.categoryMatches)})})})}_e.areTokenCategoriesNotUsed=xT});var Ol=f(he=>{"use strict";var qT=he&&he.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),LT=he&&he.__assign||function(){return LT=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},LT.apply(this,arguments)},Ht=he&&he.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(he,"__esModule",{value:!0});he.checkPrefixAlternativesAmbiguities=he.validateSomeNonEmptyLookaheadPath=he.validateTooManyAlts=he.RepetitionCollector=he.validateAmbiguousAlternationAlternatives=he.validateEmptyOrAlternative=he.getFirstNoneTerminal=he.validateNoLeftRecursion=he.validateRuleIsOverridden=he.validateRuleDoesNotAlreadyExist=he.OccurrenceValidationCollector=he.identifyProductionForDuplicates=he.validateGrammar=he.validateLookahead=void 0;var VD=Ht(Is()),fp=Ht(Or()),Qre=Ht(Nd()),zD=Ht(bn()),Zre=Ht(Pl()),ene=Ht(Kd()),tne=Ht(Wd()),ya=Ht(Gt()),$l=Ht(Ut()),rne=Ht(wT()),MT=Ht($i()),nne=Ht(Vv()),ine=Ht(Bn()),FT=Ht(Ni()),Mi=Ht(ap()),ane=Ht(Ei()),En=br(),jT=vt(),js=Fs(),one=wl(),kn=vt(),GT=vt(),sne=Ht(op()),une=Ht(Sl()),lne=no();function cne(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,ya.default)(e,function(r){return LT({type:En.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}he.validateLookahead=cne;function fne(t,e,r,n){var i=(0,Mi.default)(t,function(u){return dne(u,r)}),a=vne(t,e,r),o=(0,Mi.default)(t,function(u){return tx(u,r)}),s=(0,Mi.default)(t,function(u){return QD(u,t,n,r)});return i.concat(a,o,s)}he.validateGrammar=fne;function dne(t,e){var r=new JD;t.accept(r);var n=r.allProductions,i=(0,rne.default)(n,YD),a=(0,nne.default)(i,function(s){return s.length>1}),o=(0,ya.default)((0,ine.default)(a),function(s){var u=(0,VD.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,jT.getProductionDslName)(u),d={message:l,type:En.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},h=XD(u);return h&&(d.parameter=h),d});return o}function YD(t){return"".concat((0,jT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(XD(t))}he.identifyProductionForDuplicates=YD;function XD(t){return t instanceof kn.Terminal?t.terminalType.name:t instanceof kn.NonTerminal?t.nonTerminalName:""}var JD=function(t){qT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(GT.GAstVisitor);he.OccurrenceValidationCollector=JD;function QD(t,e,r,n){var i=[],a=(0,MT.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:En.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}he.validateRuleDoesNotAlreadyExist=QD;function pne(t,e,r){var n=[],i;return(0,FT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:En.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}he.validateRuleIsOverridden=pne;function ZD(t,e,r,n){n===void 0&&(n=[]);var i=[],a=Nl(e.definition);if((0,fp.default)(a))return[];var o=t.name,s=(0,FT.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:En.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,tne.default)(a,n.concat([t])),l=(0,Mi.default)(u,function(c){var d=(0,ane.default)(n);return d.push(c),ZD(t,c,r,d)});return i.concat(l)}he.validateNoLeftRecursion=ZD;function Nl(t){var e=[];if((0,fp.default)(t))return e;var r=(0,VD.default)(t);if(r instanceof kn.NonTerminal)e.push(r.referencedRule);else if(r instanceof kn.Alternative||r instanceof kn.Option||r instanceof kn.RepetitionMandatory||r instanceof kn.RepetitionMandatoryWithSeparator||r instanceof kn.RepetitionWithSeparator||r instanceof kn.Repetition)e=e.concat(Nl(r.definition));else if(r instanceof kn.Alternation)e=(0,zD.default)((0,ya.default)(r.definition,function(o){return Nl(o.definition)}));else if(!(r instanceof kn.Terminal))throw Error("non exhaustive match");var n=(0,jT.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Qre.default)(t);return e.concat(Nl(a))}else return e}he.getFirstNoneTerminal=Nl;var UT=function(t){qT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(GT.GAstVisitor);function mne(t,e){var r=new UT;t.accept(r);var n=r.alternations,i=(0,Mi.default)(n,function(a){var o=(0,sne.default)(a.definition);return(0,Mi.default)(o,function(s,u){var l=(0,one.nextPossibleTokensAfter)([s],[],lne.tokenStructuredMatcher,1);return(0,fp.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:En.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}he.validateEmptyOrAlternative=mne;function hne(t,e,r){var n=new UT;t.accept(n);var i=n.alternations;i=(0,ene.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Mi.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,js.getLookaheadPathsForOr)(s,t,u,o),c=gne(l,o,t,r),d=rx(l,o,t,r);return c.concat(d)});return a}he.validateAmbiguousAlternationAlternatives=hne;var ex=function(t){qT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(GT.GAstVisitor);he.RepetitionCollector=ex;function tx(t,e){var r=new UT;t.accept(r);var n=r.alternations,i=(0,Mi.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:En.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}he.validateTooManyAlts=tx;function yne(t,e,r){var n=[];return(0,$l.default)(t,function(i){var a=new ex;i.accept(a);var o=a.allProductions;(0,$l.default)(o,function(s){var u=(0,js.getProdType)(s),l=s.maxLookahead||e,c=s.idx,d=(0,js.getLookaheadPathsForOptionalProd)(c,i,u,l),h=d[0];if((0,fp.default)((0,zD.default)(h))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:En.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}he.validateSomeNonEmptyLookaheadPath=yne;function gne(t,e,r,n){var i=[],a=(0,MT.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,$l.default)(u,function(c){var d=[l];(0,$l.default)(t,function(h,v){l!==v&&(0,js.containsPath)(h,c)&&e.definition[v].ignoreAmbiguities!==!0&&d.push(v)}),d.length>1&&!(0,js.containsPath)(i,c)&&(i.push(c),s.push({alts:d,path:c}))}),s},[]),o=(0,ya.default)(a,function(s){var u=(0,ya.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:En.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function rx(t,e,r,n){var i=(0,MT.default)(t,function(o,s,u){var l=(0,ya.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,une.default)((0,Mi.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,Zre.default)(i,function(h){return e.definition[h.idx].ignoreAmbiguities!==!0&&h.idx<u&&(0,js.isStrictPrefixOfPath)(h.path,l)}),d=(0,ya.default)(c,function(h){var v=[h.idx+1,u+1],y=e.idx===0?"":e.idx,A=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:h.path});return{message:A,type:En.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return d}));return a}he.checkPrefixAlternativesAmbiguities=rx;function vne(t,e,r){var n=[],i=(0,ya.default)(e,function(a){return a.name});return(0,$l.default)(t,function(a){var o=a.name;if((0,FT.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:En.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var ox=f(ga=>{"use strict";var nx=ga&&ga.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ga,"__esModule",{value:!0});ga.validateGrammar=ga.resolveGrammar=void 0;var Tne=nx(Ut()),ix=nx(sT()),_ne=PD(),Rne=Ol(),ax=Ms();function Ane(t){var e=(0,ix.default)(t,{errMsgProvider:ax.defaultGrammarResolverErrorProvider}),r={};return(0,Tne.default)(t.rules,function(n){r[n.name]=n}),(0,_ne.resolveGrammar)(r,e.errMsgProvider)}ga.resolveGrammar=Ane;function Sne(t){return t=(0,ix.default)(t,{errMsgProvider:ax.defaultGrammarValidatorErrorProvider}),(0,Rne.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}ga.validateGrammar=Sne});var Gs=f(sr=>{"use strict";var Il=sr&&sr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pne=sr&&sr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(sr,"__esModule",{value:!0});sr.EarlyExitException=sr.NotAllInputParsedException=sr.NoViableAltException=sr.MismatchedTokenException=sr.isRecognitionException=void 0;var bne=Pne(Ni()),sx="MismatchedTokenException",ux="NoViableAltException",lx="EarlyExitException",cx="NotAllInputParsedException",fx=[sx,ux,lx,cx];Object.freeze(fx);function Cne(t){return(0,bne.default)(fx,t.name)}sr.isRecognitionException=Cne;var dp=function(t){Il(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),kne=function(t){Il(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=sx,a}return e}(dp);sr.MismatchedTokenException=kne;var Ene=function(t){Il(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=ux,a}return e}(dp);sr.NoViableAltException=Ene;var wne=function(t){Il(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=cx,i}return e}(dp);sr.NotAllInputParsedException=wne;var Nne=function(t){Il(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=lx,a}return e}(dp);sr.EarlyExitException=Nne});var KT=f(wt=>{"use strict";var $ne=wt&&wt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),va=wt&&wt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wt,"__esModule",{value:!0});wt.attemptInRepetitionRecovery=wt.Recoverable=wt.InRuleRecoveryException=wt.IN_RULE_RECOVERY_EXCEPTION=wt.EOF_FOLLOW_KEY=void 0;var Dl=io(),One=va(Or()),dx=va(op()),Ine=va(bn()),HT=va(Gt()),px=va(Bd()),Dne=va(Dr()),xne=va(Ni()),Lne=va(Ei()),qne=Gs(),Mne=aT(),Fne=br();wt.EOF_FOLLOW_KEY={};wt.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var mx=function(t){$ne(e,t);function e(r){var n=t.call(this,r)||this;return n.name=wt.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);wt.InRuleRecoveryException=mx;var jne=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Dne.default)(e,"recoveryEnabled")?e.recoveryEnabled:Fne.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=hx)},t.prototype.getTokenToInsert=function(e){var r=(0,Dl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),d=this.LA(1),h=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),A=new qne.MismatchedTokenException(y,c,a.LA(0));A.resyncedTokens=(0,dx.default)(u),a.SAVE_ERROR(A)};!l;)if(this.tokenMatcher(d,i)){h();return}else if(n.call(this)){h(),e.apply(this,r);return}else this.tokenMatcher(d,o)?l=!0:(d=this.SKIP_TOKEN(),this.addToResyncTokens(d,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new mx("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,One.default)(r))return!1;var i=this.LA(1),a=(0,px.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,xne.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,px.default)(e,function(a){var o=(0,Dl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return wt.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,HT.default)(r,function(i,a){return a===0?wt.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,HT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,Ine.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===wt.EOF_FOLLOW_KEY)return[Dl.EOF];var r=e.ruleName+e.idxInCallingRule+Mne.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,Dl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,dx.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Lne.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,HT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();wt.Recoverable=jne;function hx(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],d=new a(c,i);u=d.startWalking(),this.firstAfterRepMap[s]=u}var h=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&h===void 0&&(h=Dl.EOF,v=1),!(h===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(h,v,o)&&this.tryInRepetitionRecovery(t,e,r,h)}wt.attemptInRepetitionRecovery=hx});var pp=f(Ce=>{"use strict";Object.defineProperty(Ce,"__esModule",{value:!0});Ce.getKeyForAutomaticLookahead=Ce.AT_LEAST_ONE_SEP_IDX=Ce.MANY_SEP_IDX=Ce.AT_LEAST_ONE_IDX=Ce.MANY_IDX=Ce.OPTION_IDX=Ce.OR_IDX=Ce.BITS_FOR_ALT_IDX=Ce.BITS_FOR_RULE_IDX=Ce.BITS_FOR_OCCURRENCE_IDX=Ce.BITS_FOR_METHOD_TYPE=void 0;Ce.BITS_FOR_METHOD_TYPE=4;Ce.BITS_FOR_OCCURRENCE_IDX=8;Ce.BITS_FOR_RULE_IDX=12;Ce.BITS_FOR_ALT_IDX=8;Ce.OR_IDX=1<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.OPTION_IDX=2<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.MANY_IDX=3<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.AT_LEAST_ONE_IDX=4<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.MANY_SEP_IDX=5<<Ce.BITS_FOR_OCCURRENCE_IDX;Ce.AT_LEAST_ONE_SEP_IDX=6<<Ce.BITS_FOR_OCCURRENCE_IDX;function Gne(t,e,r){return r|e|t}Ce.getKeyForAutomaticLookahead=Gne;var Fve=32-Ce.BITS_FOR_ALT_IDX});var BT=f(Ta=>{"use strict";var mp=Ta&&Ta.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},yx=Ta&&Ta.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ta,"__esModule",{value:!0});Ta.LLkLookaheadStrategy=void 0;var WT=yx(ap()),Une=yx(Or()),hp=Ms(),Hne=br(),yp=Ol(),xl=Fs(),Kne=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Hne.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,Une.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=mp(mp(mp(mp([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,WT.default)(e,function(r){return(0,yp.validateNoLeftRecursion)(r,r,hp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,WT.default)(e,function(r){return(0,yp.validateEmptyOrAlternative)(r,hp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,WT.default)(e,function(n){return(0,yp.validateAmbiguousAlternationAlternatives)(n,r,hp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,yp.validateSomeNonEmptyLookaheadPath)(e,r,hp.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,xl.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,xl.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,xl.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,xl.getProdType)(e.prodType),xl.buildSingleAlternativeLookaheadFunction)},t}();Ta.LLkLookaheadStrategy=Kne});var _x=f(ti=>{"use strict";var Wne=ti&&ti.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),vx=ti&&ti.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ti,"__esModule",{value:!0});ti.collectMethods=ti.LooksAhead=void 0;var fo=vx(Ut()),VT=vx(Dr()),gx=br(),Fi=pp(),Bne=vt(),Us=vt(),Vne=BT(),zne=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,VT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:gx.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,VT.default)(e,"maxLookahead")?e.maxLookahead:gx.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,VT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new Vne.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,fo.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=Tx(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,fo.default)(a,function(d){var h=d.idx===0?"":d.idx;r.TRACE_INIT("".concat((0,Us.getProductionDslName)(d)).concat(h),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:d.idx,rule:n,maxLookahead:d.maxLookahead||r.maxLookahead,hasPredicates:d.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Fi.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Fi.OR_IDX,d.idx);r.setLaFuncCache(y,v)})}),(0,fo.default)(o,function(d){r.computeLookaheadFunc(n,d.idx,Fi.MANY_IDX,"Repetition",d.maxLookahead,(0,Us.getProductionDslName)(d))}),(0,fo.default)(s,function(d){r.computeLookaheadFunc(n,d.idx,Fi.OPTION_IDX,"Option",d.maxLookahead,(0,Us.getProductionDslName)(d))}),(0,fo.default)(u,function(d){r.computeLookaheadFunc(n,d.idx,Fi.AT_LEAST_ONE_IDX,"RepetitionMandatory",d.maxLookahead,(0,Us.getProductionDslName)(d))}),(0,fo.default)(l,function(d){r.computeLookaheadFunc(n,d.idx,Fi.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",d.maxLookahead,(0,Us.getProductionDslName)(d))}),(0,fo.default)(c,function(d){r.computeLookaheadFunc(n,d.idx,Fi.MANY_SEP_IDX,"RepetitionWithSeparator",d.maxLookahead,(0,Us.getProductionDslName)(d))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Fi.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Fi.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();ti.LooksAhead=zne;var Yne=function(t){Wne(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(Bne.GAstVisitor),gp=new Yne;function Tx(t){gp.reset(),t.accept(gp);var e=gp.dslMethods;return gp.reset(),e}ti.collectMethods=Tx});var Rx=f(ri=>{"use strict";Object.defineProperty(ri,"__esModule",{value:!0});ri.addNoneTerminalToCst=ri.addTerminalToCst=ri.setNodeLocationFull=ri.setNodeLocationOnlyOffset=void 0;function Xne(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}ri.setNodeLocationOnlyOffset=Xne;function Jne(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}ri.setNodeLocationFull=Jne;function Qne(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}ri.addTerminalToCst=Qne;function Zne(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}ri.addNoneTerminalToCst=Zne});var Ax=f(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.defineNameProp=void 0;var eie="name";function tie(t,e){Object.defineProperty(t,eie,{enumerable:!1,configurable:!0,writable:!1,value:e})}vp.defineNameProp=tie});var wx=f(Jt=>{"use strict";var ji=Jt&&Jt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jt,"__esModule",{value:!0});Jt.validateMissingCstMethods=Jt.validateVisitor=Jt.CstVisitorDefinitionError=Jt.createBaseVisitorConstructorWithDefaults=Jt.createBaseSemanticVisitorConstructor=Jt.defaultVisit=void 0;var rie=ji(Or()),nie=ji(Sl()),iie=ji(xe()),Sx=ji(Gt()),aie=ji(Ut()),oie=ji(Pl()),sie=ji(Ir()),uie=ji(ds()),lie=ji(eo()),Px=Ax();function bx(t,e){for(var r=(0,sie.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}Jt.defaultVisit=bx;function cie(t,e){var r=function(){};(0,Px.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,iie.default)(i)&&(i=i[0]),!(0,lie.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=kx(this,e);if(!(0,rie.default)(i)){var a=(0,Sx.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Jt.createBaseSemanticVisitorConstructor=cie;function fie(t,e,r){var n=function(){};(0,Px.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,aie.default)(e,function(a){i[a]=bx}),n.prototype=i,n.prototype.constructor=n,n}Jt.createBaseVisitorConstructorWithDefaults=fie;var Cx;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Cx=Jt.CstVisitorDefinitionError||(Jt.CstVisitorDefinitionError={}));function kx(t,e){var r=Ex(t,e);return r}Jt.validateVisitor=kx;function Ex(t,e){var r=(0,oie.default)(e,function(i){return(0,uie.default)(t[i])===!1}),n=(0,Sx.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:Cx.MISSING_METHOD,methodName:i}});return(0,nie.default)(n)}Jt.validateMissingCstMethods=Ex});var Ix=f(Ks=>{"use strict";var Tp=Ks&&Ks.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ks,"__esModule",{value:!0});Ks.TreeBuilder=void 0;var Hs=Rx(),yr=Tp(jd()),die=Tp(Dr()),Nx=Tp(Ir()),$x=Tp(eo()),Ox=wx(),pie=br(),mie=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,die.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:pie.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=yr.default,this.cstFinallyStateUpdate=yr.default,this.cstPostTerminal=yr.default,this.cstPostNonTerminal=yr.default,this.cstPostRule=yr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Hs.setNodeLocationFull,this.setNodeLocationFromNode=Hs.setNodeLocationFull,this.cstPostRule=yr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Hs.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Hs.setNodeLocationOnlyOffset,this.cstPostRule=yr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=yr.default,this.setNodeLocationFromNode=yr.default,this.cstPostRule=yr.default,this.setInitialNodeLocation=yr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Hs.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Hs.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,$x.default)(this.baseCstVisitorConstructor)){var e=(0,Ox.createBaseSemanticVisitorConstructor)(this.className,(0,Nx.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,$x.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,Ox.createBaseVisitorConstructorWithDefaults)(this.className,(0,Nx.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();Ks.TreeBuilder=mie});var xx=f(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.LexerAdapter=void 0;var Dx=br(),hie=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Dx.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Dx.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();_p.LexerAdapter=hie});var qx=f(Ws=>{"use strict";var Lx=Ws&&Ws.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ws,"__esModule",{value:!0});Ws.RecognizerApi=void 0;var yie=Lx(Bn()),gie=Lx(Ni()),vie=Gs(),zT=br(),Tie=Ms(),_ie=Ol(),Rie=vt(),Aie=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=zT.DEFAULT_RULE_CONFIG),(0,gie.default)(this.definedRulesNames,e)){var i=Tie.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:zT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=zT.DEFAULT_RULE_CONFIG);var i=(0,_ie.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,vie.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Rie.serializeGrammar)((0,yie.default)(this.gastProductionsCache))},t}();Ws.RecognizerApi=Aie});var Wx=f(Vs=>{"use strict";var ni=Vs&&Vs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Vs,"__esModule",{value:!0});Vs.RecognizerEngine=void 0;var Mx=ni(Or()),YT=ni(xe()),XT=ni(bn()),Fx=ni(Al()),Sie=ni(Gd()),Pie=ni(An()),Ll=ni(Dr()),ql=ni(Bn()),jx=ni($i()),Gx=ni(Ei()),Lr=pp(),Rp=Gs(),Ux=Fs(),Bs=wl(),Hx=br(),bie=KT(),Kx=io(),Ml=no(),Cie=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Ml.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Ll.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,YT.default)(e)){if((0,Mx.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,YT.default)(e))this.tokensMap=(0,jx.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Ll.default)(e,"modes")&&(0,Fx.default)((0,XT.default)((0,ql.default)(e.modes)),Ml.isTokenType)){var n=(0,XT.default)((0,ql.default)(e.modes)),i=(0,Sie.default)(n);this.tokensMap=(0,jx.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,Pie.default)(e))this.tokensMap=(0,Gx.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Kx.EOF;var a=(0,Ll.default)(e,"modes")?(0,XT.default)((0,ql.default)(e.modes)):(0,ql.default)(e),o=(0,Fx.default)(a,function(s){return(0,Mx.default)(s.categoryMatches)});this.tokenMatcher=o?Ml.tokenStructuredMatcherNoCategories:Ml.tokenStructuredMatcher,(0,Ml.augmentTokenTypes)((0,ql.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Ll.default)(n,"resyncEnabled")?n.resyncEnabled:Hx.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Ll.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:Hx.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<Lr.BITS_FOR_METHOD_TYPE+Lr.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],d=0;d<arguments.length;d++)c[d]=arguments[d];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var h=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(h),h}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],d=0;d<arguments.length;d++)c[d]=arguments[d];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(h){return this.invokeRuleCatch(h,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Rp.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,Ux.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,Lr.AT_LEAST_ONE_IDX,e,Bs.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Bs.NextTerminalAfterAtLeastOneSepWalker],u,Lr.AT_LEAST_ONE_SEP_IDX,e,Bs.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,Ux.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,Lr.MANY_IDX,e,Bs.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Bs.NextTerminalAfterManySepWalker],u,Lr.MANY_SEP_IDX,e,Bs.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,Lr.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Lr.OR_IDX,r),i=(0,YT.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Rp.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Rp.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Rp.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===bie.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,Gx.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),Kx.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();Vs.RecognizerEngine=Cie});var Yx=f(zs=>{"use strict";var zx=zs&&zs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zs,"__esModule",{value:!0});zs.ErrorHandler=void 0;var JT=Gs(),kie=zx(Dr()),Bx=zx(Ei()),Vx=Fs(),Eie=br(),wie=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,kie.default)(e,"errorMessageProvider")?e.errorMessageProvider:Eie.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,JT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,Bx.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,Bx.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,Vx.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new JT.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,Vx.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new JT.NoViableAltException(l,this.LA(1),u))},t}();zs.ErrorHandler=wie});var Qx=f(Ys=>{"use strict";var Jx=Ys&&Ys.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ys,"__esModule",{value:!0});Ys.ContentAssist=void 0;var Xx=wl(),Nie=Jx(Is()),$ie=Jx(eo()),Oie=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,$ie.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,Xx.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,Nie.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new Xx.NextAfterTokenWalker(i,e).startWalking();return a},t}();Ys.ContentAssist=Oie});var sL=f(Xs=>{"use strict";var Js=Xs&&Xs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xs,"__esModule",{value:!0});Xs.GastRecorder=void 0;var Ap=Js(rp()),Iie=Js(xe()),Die=Js(xd()),xie=Js(Ut()),rL=Js(ds()),jl=Js(Dr()),ii=vt(),Lie=bl(),nL=no(),iL=io(),qie=br(),Mie=pp(),Pp={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Pp);var Zx=!0,eL=Math.pow(2,Mie.BITS_FOR_OCCURRENCE_IDX)-1,aL=(0,iL.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Lie.Lexer.NA});(0,nL.augmentTokenTypes)([aL]);var oL=(0,iL.createTokenInstance)(aL,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(oL);var Fie={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},jie=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return qie.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new ii.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return Fl.call(this,ii.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){Fl.call(this,ii.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){Fl.call(this,ii.RepetitionMandatoryWithSeparator,r,e,Zx)},t.prototype.manyInternalRecord=function(e,r){Fl.call(this,ii.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){Fl.call(this,ii.RepetitionWithSeparator,r,e,Zx)},t.prototype.orInternalRecord=function(e,r){return Gie.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Sp(r),!e||(0,jl.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(tL(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Ap.default)(this.recordingProdStack),o=e.ruleName,s=new ii.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?Fie:Pp},t.prototype.consumeInternalRecord=function(e,r,n){if(Sp(r),!(0,nL.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(tL(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Ap.default)(this.recordingProdStack),o=new ii.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),oL},t}();Xs.GastRecorder=jie;function Fl(t,e,r,n){n===void 0&&(n=!1),Sp(r);var i=(0,Ap.default)(this.recordingProdStack),a=(0,rL.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,jl.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Pp}function Gie(t,e){var r=this;Sp(e);var n=(0,Ap.default)(this.recordingProdStack),i=(0,Iie.default)(t)===!1,a=i===!1?t:t.DEF,o=new ii.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,jl.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,Die.default)(a,function(u){return(0,rL.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,xie.default)(a,function(u){var l=new ii.Alternative({definition:[]});o.definition.push(l),(0,jl.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,jl.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Pp}function tL(t){return t===0?"":"".concat(t)}function Sp(t){if(t<0||t>eL){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(eL+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var uL=f(Qs=>{"use strict";var Uie=Qs&&Qs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Qs,"__esModule",{value:!0});Qs.PerformanceTracer=void 0;var Hie=Uie(Dr()),Kie=ws(),Wie=br(),Bie=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Hie.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Wie.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,Kie.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();Qs.PerformanceTracer=Bie});var lL=f(bp=>{"use strict";Object.defineProperty(bp,"__esModule",{value:!0});bp.applyMixins=void 0;function Vie(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}bp.applyMixins=Vie});var br=f(Ge=>{"use strict";var pL=Ge&&Ge.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Zs=Ge&&Ge.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ge,"__esModule",{value:!0});Ge.EmbeddedActionsParser=Ge.CstParser=Ge.Parser=Ge.EMPTY_ALT=Ge.ParserDefinitionErrorType=Ge.DEFAULT_RULE_CONFIG=Ge.DEFAULT_PARSER_CONFIG=Ge.END_OF_FILE=void 0;var QT=Zs(Or()),zie=Zs(Gt()),Yie=Zs(Ut()),_a=Zs(Bn()),cL=Zs(Dr()),mL=Zs(Ei()),Xie=ws(),Jie=VO(),fL=io(),hL=Ms(),dL=ox(),Qie=KT(),Zie=_x(),eae=Ix(),tae=xx(),rae=qx(),nae=Wx(),iae=Yx(),aae=Qx(),oae=sL(),sae=uL(),uae=lL(),lae=Ol();Ge.END_OF_FILE=(0,fL.createTokenInstance)(fL.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Ge.END_OF_FILE);Ge.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:hL.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Ge.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var cae;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(cae=Ge.ParserDefinitionErrorType||(Ge.ParserDefinitionErrorType={}));function fae(t){return t===void 0&&(t=void 0),function(){return t}}Ge.EMPTY_ALT=fae;var Cp=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,cL.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,cL.default)(r,"skipValidations")?r.skipValidations:Ge.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,Xie.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Yie.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,dL.resolveGrammar)({rules:(0,_a.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,QT.default)(i)&&e.skipValidations===!1){var a=(0,dL.validateGrammar)({rules:(0,_a.default)(e.gastProductionsCache),tokenTypes:(0,_a.default)(e.tokensMap),errMsgProvider:hL.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,lae.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,_a.default)(e.gastProductionsCache),tokenTypes:(0,_a.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,QT.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Jie.computeAllProdsFollows)((0,_a.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,_a.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,_a.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,QT.default)(e.definitionErrors))throw r=(0,zie.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Ge.Parser=Cp;(0,uae.applyMixins)(Cp,[Qie.Recoverable,Zie.LooksAhead,eae.TreeBuilder,tae.LexerAdapter,nae.RecognizerEngine,rae.RecognizerApi,iae.ErrorHandler,aae.ContentAssist,oae.GastRecorder,sae.PerformanceTracer]);var dae=function(t){pL(e,t);function e(r,n){n===void 0&&(n=Ge.DEFAULT_PARSER_CONFIG);var i=(0,mL.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Cp);Ge.CstParser=dae;var pae=function(t){pL(e,t);function e(r,n){n===void 0&&(n=Ge.DEFAULT_PARSER_CONFIG);var i=(0,mL.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Cp);Ge.EmbeddedActionsParser=pae});var gL=f(Ra=>{"use strict";var mae=Ra&&Ra.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),eu=Ra&&Ra.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ra,"__esModule",{value:!0});Ra.buildModel=void 0;var yL=vt(),Gl=eu(Gt()),hae=eu(bn()),yae=eu(Bn()),gae=eu(xd()),vae=eu(wT()),Tae=eu(_l());function _ae(t){var e=new Rae,r=(0,yae.default)(t);return(0,Gl.default)(r,function(n){return e.visitRule(n)})}Ra.buildModel=_ae;var Rae=function(t){mae(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,vae.default)(n,function(o){return o.propertyName}),a=(0,Gl.default)(i,function(o,s){var u=!(0,gae.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,Gl.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:kp(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:kp(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:kp(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:kp(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Gl.default)(this.visitEach(r),function(i){return(0,Tae.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,hae.default)((0,Gl.default)(r,function(i){return n.visit(i)}))},e}(yL.GAstVisitor);function kp(t){return t instanceof yL.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var TL=f((nTe,vL)=>{var Aae=wd();function Sae(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:Aae(t,e,r)}vL.exports=Sae});var ZT=f((iTe,_L)=>{var Pae="\\ud800-\\udfff",bae="\\u0300-\\u036f",Cae="\\ufe20-\\ufe2f",kae="\\u20d0-\\u20ff",Eae=bae+Cae+kae,wae="\\ufe0e\\ufe0f",Nae="\\u200d",$ae=RegExp("["+Nae+Pae+Eae+wae+"]");function Oae(t){return $ae.test(t)}_L.exports=Oae});var AL=f((aTe,RL)=>{function Iae(t){return t.split("")}RL.exports=Iae});var NL=f((oTe,wL)=>{var SL="\\ud800-\\udfff",Dae="\\u0300-\\u036f",xae="\\ufe20-\\ufe2f",Lae="\\u20d0-\\u20ff",qae=Dae+xae+Lae,Mae="\\ufe0e\\ufe0f",Fae="["+SL+"]",e_="["+qae+"]",t_="\\ud83c[\\udffb-\\udfff]",jae="(?:"+e_+"|"+t_+")",PL="[^"+SL+"]",bL="(?:\\ud83c[\\udde6-\\uddff]){2}",CL="[\\ud800-\\udbff][\\udc00-\\udfff]",Gae="\\u200d",kL=jae+"?",EL="["+Mae+"]?",Uae="(?:"+Gae+"(?:"+[PL,bL,CL].join("|")+")"+EL+kL+")*",Hae=EL+kL+Uae,Kae="(?:"+[PL+e_+"?",e_,bL,CL,Fae].join("|")+")",Wae=RegExp(t_+"(?="+t_+")|"+Kae+Hae,"g");function Bae(t){return t.match(Wae)||[]}wL.exports=Bae});var OL=f((sTe,$L)=>{var Vae=AL(),zae=ZT(),Yae=NL();function Xae(t){return zae(t)?Yae(t):Vae(t)}$L.exports=Xae});var DL=f((uTe,IL)=>{var Jae=TL(),Qae=ZT(),Zae=OL(),eoe=Fv();function toe(t){return function(e){e=eoe(e);var r=Qae(e)?Zae(e):void 0,n=r?r[0]:e.charAt(0),i=r?Jae(r,1).join(""):e.slice(1);return n[t]()+i}}IL.exports=toe});var LL=f((lTe,xL)=>{var roe=DL(),noe=roe("toUpperCase");xL.exports=noe});var jL=f(tu=>{"use strict";var ru=tu&&tu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(tu,"__esModule",{value:!0});tu.genDts=void 0;var ioe=ru(bn()),aoe=ru(xe()),Ep=ru(Gt()),ooe=ru($i()),soe=ru(Gd()),ML=ru(LL());function uoe(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,ioe.default)((0,Ep.default)(t,function(n){return loe(n)}))),e.includeVisitorInterface&&(r=r.concat(poe(e.visitorInterfaceName,t))),r.join(`

`)+`
`}tu.genDts=uoe;function loe(t){var e=coe(t),r=foe(t);return[e,r]}function coe(t){var e=FL(t.name),r=r_(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function foe(t){var e=r_(t.name);return"export type ".concat(e,` = {
  `).concat((0,Ep.default)(t.properties,function(r){return doe(r)}).join(`
  `),`
};`)}function doe(t){var e=hoe(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function poe(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Ep.default)(e,function(r){return moe(r)}).join(`
  `),`
}`)}function moe(t){var e=r_(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function hoe(t){if((0,aoe.default)(t)){var e=(0,soe.default)((0,Ep.default)(t,function(n){return qL(n)})),r=(0,ooe.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return qL(t)}function qL(t){return t.kind==="token"?"IToken":FL(t.name)}function FL(t){return(0,ML.default)(t)+"CstNode"}function r_(t){return(0,ML.default)(t)+"CstChildren"}});var GL=f(nu=>{"use strict";var wp=nu&&nu.__assign||function(){return wp=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},wp.apply(this,arguments)};Object.defineProperty(nu,"__esModule",{value:!0});nu.generateCstDts=void 0;var yoe=gL(),goe=jL(),voe={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function Toe(t,e){var r=wp(wp({},voe),e),n=(0,yoe.buildModel)(t);return(0,goe.genDts)(n,r)}nu.generateCstDts=Toe});var HL=f(Np=>{"use strict";Object.defineProperty(Np,"__esModule",{value:!0});Np.createSyntaxDiagramsCode=void 0;var UL=pv();function _oe(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(UL.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(UL.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`,d=`
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t,null,"  "),`;
<\/script>
`),h=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+d+h}Np.createSyntaxDiagramsCode=_oe});var po=f(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var Roe=pv();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return Roe.VERSION}});var $p=br();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return $p.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return $p.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return $p.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return $p.EMPTY_ALT}});var KL=bl();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return KL.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return KL.LexerDefinitionErrorType}});var iu=io();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return iu.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return iu.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return iu.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return iu.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return iu.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return iu.tokenName}});var Aoe=Fs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return Aoe.getLookaheadPaths}});var Soe=BT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Soe.LLkLookaheadStrategy}});var Poe=Ms();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return Poe.defaultParserErrorProvider}});var Ul=Gs();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Ul.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Ul.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Ul.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Ul.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Ul.NoViableAltException}});var boe=_T();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return boe.defaultLexerErrorProvider}});var ai=vt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ai.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ai.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ai.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ai.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ai.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ai.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ai.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ai.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ai.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ai.Terminal}});var n_=vt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return n_.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return n_.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return n_.GAstVisitor}});var Coe=GL();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return Coe.generateCstDts}});function koe(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=koe;var Eoe=HL();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Eoe.createSyntaxDiagramsCode}});var woe=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=woe});var XL=f(Y=>{"use strict";var WL=Y&&Y.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Y,"__esModule",{value:!0});Y.createATN=Y.RuleTransition=Y.EpsilonTransition=Y.AtomTransition=Y.AbstractTransition=Y.ATN_LOOP_END=Y.ATN_PLUS_LOOP_BACK=Y.ATN_STAR_LOOP_ENTRY=Y.ATN_STAR_LOOP_BACK=Y.ATN_BLOCK_END=Y.ATN_RULE_STOP=Y.ATN_TOKEN_START=Y.ATN_STAR_BLOCK_START=Y.ATN_PLUS_BLOCK_START=Y.ATN_RULE_START=Y.ATN_BASIC=Y.ATN_INVALID_TYPE=Y.buildATNKey=void 0;var BL=WL(Gt()),Noe=WL(Pl()),Cr=po();function Kl(t,e,r){return`${t.name}_${e}_${r}`}Y.buildATNKey=Kl;Y.ATN_INVALID_TYPE=0;Y.ATN_BASIC=1;Y.ATN_RULE_START=2;Y.ATN_PLUS_BLOCK_START=4;Y.ATN_STAR_BLOCK_START=5;Y.ATN_TOKEN_START=6;Y.ATN_RULE_STOP=7;Y.ATN_BLOCK_END=8;Y.ATN_STAR_LOOP_BACK=9;Y.ATN_STAR_LOOP_ENTRY=10;Y.ATN_PLUS_LOOP_BACK=11;Y.ATN_LOOP_END=12;var au=class{constructor(e){this.target=e}isEpsilon(){return!1}};Y.AbstractTransition=au;var Op=class extends au{constructor(e,r){super(e),this.tokenType=r}};Y.AtomTransition=Op;var Ip=class extends au{constructor(e){super(e)}isEpsilon(){return!0}};Y.EpsilonTransition=Ip;var Hl=class extends au{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};Y.RuleTransition=Hl;function $oe(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Ooe(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=mo(e,i,i);a!==void 0&&Hoe(e,i,a)}return e}Y.createATN=$oe;function Ooe(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=Kt(t,i,void 0,{type:Y.ATN_RULE_START}),o=Kt(t,i,void 0,{type:Y.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function VL(t,e,r){return r instanceof Cr.Terminal?i_(t,e,r.terminalType,r):r instanceof Cr.NonTerminal?Uoe(t,e,r):r instanceof Cr.Alternation?qoe(t,e,r):r instanceof Cr.Option?Moe(t,e,r):r instanceof Cr.Repetition?Ioe(t,e,r):r instanceof Cr.RepetitionWithSeparator?Doe(t,e,r):r instanceof Cr.RepetitionMandatory?xoe(t,e,r):r instanceof Cr.RepetitionMandatoryWithSeparator?Loe(t,e,r):mo(t,e,r)}function Ioe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_STAR_BLOCK_START});Aa(t,n);let i=ou(t,e,n,r,mo(t,e,r));return YL(t,e,r,i)}function Doe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_STAR_BLOCK_START});Aa(t,n);let i=ou(t,e,n,r,mo(t,e,r)),a=i_(t,e,r.separator,r);return YL(t,e,r,i,a)}function xoe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_PLUS_BLOCK_START});Aa(t,n);let i=ou(t,e,n,r,mo(t,e,r));return zL(t,e,r,i)}function Loe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_PLUS_BLOCK_START});Aa(t,n);let i=ou(t,e,n,r,mo(t,e,r)),a=i_(t,e,r.separator,r);return zL(t,e,r,i,a)}function qoe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_BASIC});Aa(t,n);let i=(0,BL.default)(r.definition,o=>VL(t,e,o));return ou(t,e,n,r,...i)}function Moe(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_BASIC});Aa(t,n);let i=ou(t,e,n,r,mo(t,e,r));return Foe(t,e,r,i)}function mo(t,e,r){let n=(0,Noe.default)((0,BL.default)(r.definition,i=>VL(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Goe(t,n)}function zL(t,e,r,n,i){let a=n.left,o=n.right,s=Kt(t,e,r,{type:Y.ATN_PLUS_LOOP_BACK});Aa(t,s);let u=Kt(t,e,r,{type:Y.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Kl(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,Nt(o,s),i===void 0?(Nt(s,a),Nt(s,u)):(Nt(s,u),Nt(s,i.left),Nt(i.right,a)),{left:a,right:u}}function YL(t,e,r,n,i){let a=n.left,o=n.right,s=Kt(t,e,r,{type:Y.ATN_STAR_LOOP_ENTRY});Aa(t,s);let u=Kt(t,e,r,{type:Y.ATN_LOOP_END}),l=Kt(t,e,r,{type:Y.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,Nt(s,a),Nt(s,u),Nt(o,l),i!==void 0?(Nt(l,u),Nt(l,i.left),Nt(i.right,a)):Nt(l,s),t.decisionMap[Kl(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function Foe(t,e,r,n){let i=n.left,a=n.right;return Nt(i,a),t.decisionMap[Kl(e,"Option",r.idx)]=i,n}function Aa(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function ou(t,e,r,n,...i){let a=Kt(t,e,n,{type:Y.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(Nt(r,s.left),Nt(s.right,a)):Nt(r,a);let o={left:r,right:a};return t.decisionMap[Kl(e,joe(n),n.idx)]=r,o}function joe(t){if(t instanceof Cr.Alternation)return"Alternation";if(t instanceof Cr.Option)return"Option";if(t instanceof Cr.Repetition)return"Repetition";if(t instanceof Cr.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Cr.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Cr.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Goe(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof Hl,l=s,c=e[a+1].left;o.left.type===Y.ATN_BASIC&&o.right.type===Y.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,Koe(t,o.right)):Nt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function i_(t,e,r,n){let i=Kt(t,e,n,{type:Y.ATN_BASIC}),a=Kt(t,e,n,{type:Y.ATN_BASIC});return a_(i,new Op(a,r)),{left:i,right:a}}function Uoe(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=Kt(t,e,r,{type:Y.ATN_BASIC}),o=Kt(t,e,r,{type:Y.ATN_BASIC}),s=new Hl(i,n,o);return a_(a,s),{left:a,right:o}}function Hoe(t,e,r){let n=t.ruleToStartState.get(e);Nt(n,r.left);let i=t.ruleToStopState.get(e);return Nt(r.right,i),{left:n,right:i}}function Nt(t,e){let r=new Ip(e);a_(t,r)}function Kt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function a_(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Koe(t,e){t.states.splice(t.states.indexOf(e),1)}});var QL=f(oi=>{"use strict";var Woe=oi&&oi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(oi,"__esModule",{value:!0});oi.getATNConfigKey=oi.ATNConfigSet=oi.DFA_ERROR=void 0;var Boe=Woe(Gt());oi.DFA_ERROR={};var o_=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=JL(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,Boe.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};oi.ATNConfigSet=o_;function JL(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}oi.getATNConfigKey=JL});var eq=f((yTe,ZL)=>{var Voe=Ps();function zoe(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!Voe(o):r(o,s)))var s=o,u=a}return u}ZL.exports=zoe});var rq=f((gTe,tq)=>{function Yoe(t,e){return t<e}tq.exports=Yoe});var iq=f((vTe,nq)=>{var Xoe=eq(),Joe=rq(),Qoe=Za();function Zoe(t){return t&&t.length?Xoe(t,Qoe,Joe):void 0}nq.exports=Zoe});var oq=f((TTe,aq)=>{var ese=Jr(),tse=tT();function rse(t,e){return t&&t.length?tse(t,ese(e,2)):[]}aq.exports=rse});var pq=f(su=>{"use strict";var Pa=su&&su.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(su,"__esModule",{value:!0});su.LLStarLookaheadStrategy=void 0;var qr=po(),wn=XL(),Sa=QL(),nse=Pa(iq()),ise=Pa(ap()),ase=Pa(oq()),Wl=Pa(Gt()),ose=Pa(bn()),s_=Pa(Ut()),sse=Pa(Or()),sq=Pa($i());function use(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var Dp=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},uq=new Dp,l_=class extends qr.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,wn.createATN)(e.rules),this.dfas=lse(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,wn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,d=(0,Wl.default)((0,qr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),h=>(0,Wl.default)(h,v=>v[0]));if(lq(d,!1)&&!a){let h=(0,sq.default)(d,(v,y,A)=>((0,s_.default)(y,E=>{E&&(v[E.tokenTypeIdx]=A,(0,s_.default)(E.categoryMatches,C=>{v[C]=A}))}),v),{});return i?function(v){var y;let A=this.LA(1),E=h[A.tokenTypeIdx];if(v!==void 0&&E!==void 0){let C=(y=v[E])===null||y===void 0?void 0:y.GATE;if(C!==void 0&&C.call(this)===!1)return}return E}:function(){let v=this.LA(1);return h[v.tokenTypeIdx]}}else return i?function(h){let v=new Dp,y=h===void 0?0:h.length;for(let E=0;E<y;E++){let C=h?.[E].GATE;v.set(E,C===void 0||C.call(this))}let A=u_.call(this,o,c,v,s);return typeof A=="number"?A:void 0}:function(){let h=u_.call(this,o,c,uq,s);return typeof h=="number"?h:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,wn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,d=(0,Wl.default)((0,qr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),h=>(0,Wl.default)(h,v=>v[0]));if(lq(d)&&d[0][0]&&!a){let h=d[0],v=(0,ose.default)(h);if(v.length===1&&(0,sse.default)(v[0].categoryMatches)){let A=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let y=(0,sq.default)(v,(A,E)=>(E!==void 0&&(A[E.tokenTypeIdx]=!0,(0,s_.default)(E.categoryMatches,C=>{A[C]=!0})),A),{});return function(){let A=this.LA(1);return y[A.tokenTypeIdx]===!0}}}return function(){let h=u_.call(this,o,c,uq,s);return typeof h=="object"?!1:h===0}}};su.LLStarLookaheadStrategy=l_;function lq(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function lse(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=use(t.decisionStates[n],n);return r}function u_(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=_se(i.atnStartState);a=dq(i,fq(s)),i.start=a}return cse.apply(this,[i,a,r,n])}function cse(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=yse(i,s);if(u===void 0&&(u=fse.apply(this,[t,i,s,a,r,n])),u===Sa.DFA_ERROR)return hse(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function fse(t,e,r,n,i,a){let o=gse(e.configs,r,i);if(o.size===0)return cq(t,e,r,Sa.DFA_ERROR),Sa.DFA_ERROR;let s=fq(o),u=Tse(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(Pse(o)){let l=(0,nse.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,dse.apply(this,[t,n,o.alts,a])}return s=cq(t,e,r,s),s}function dse(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=pse({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function pse(t){let e=(0,Wl.default)(t.prefixPath,i=>(0,qr.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${mse(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function mse(t){if(t instanceof qr.NonTerminal)return"SUBRULE";if(t instanceof qr.Option)return"OPTION";if(t instanceof qr.Alternation)return"OR";if(t instanceof qr.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof qr.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof qr.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof qr.Repetition)return"MANY";if(t instanceof qr.Terminal)return"CONSUME";throw Error("non exhaustive match")}function hse(t,e,r){let n=(0,ise.default)(e.configs.elements,a=>a.state.transitions),i=(0,ase.default)(n.filter(a=>a instanceof wn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function yse(t,e){return t.edges[e.tokenTypeIdx]}function gse(t,e,r){let n=new Sa.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===wn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=vse(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new Sa.ATNConfigSet;for(let o of n.elements)xp(o,a)}if(i.length>0&&!Ase(a))for(let o of i)a.add(o);return a}function vse(t,e){if(t instanceof wn.AtomTransition&&(0,qr.tokenMatcher)(e,t.tokenType))return t.target}function Tse(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function fq(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function cq(t,e,r,n){return n=dq(t,n),e.edges[r.tokenTypeIdx]=n,n}function dq(t,e){if(e===Sa.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function _se(t){let e=new Sa.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};xp(a,e)}return e}function xp(t,e){let r=t.state;if(r.type===wn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};xp(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Rse(t,a);o!==void 0&&xp(o,e)}}function Rse(t,e){if(e instanceof wn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof wn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Ase(t){for(let e of t.elements)if(e.state.type===wn.ATN_RULE_STOP)return!0;return!1}function Sse(t){for(let e of t.elements)if(e.state.type!==wn.ATN_RULE_STOP)return!1;return!0}function Pse(t){if(Sse(t))return!0;let e=bse(t.elements);return Cse(e)&&!kse(e)}function bse(t){let e=new Map;for(let r of t){let n=(0,Sa.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function Cse(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function kse(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var mq=f(Lp=>{"use strict";Object.defineProperty(Lp,"__esModule",{value:!0});Lp.LLStarLookaheadStrategy=void 0;var Ese=pq();Object.defineProperty(Lp,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Ese.LLStarLookaheadStrategy}})});var f_=f(tn=>{"use strict";Object.defineProperty(tn,"__esModule",{value:!0});tn.RootCstNodeImpl=tn.CompositeCstNodeImpl=tn.LeafCstNodeImpl=tn.AbstractCstNode=tn.CstNodeBuilder=void 0;var hq=$o(),wse=tr(),yq=Le(),c_=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new qp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new zl;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Vl(e.startOffset,e.image.length,(0,yq.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Vl(r.startOffset,r.image.length,(0,yq.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,wse.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};tn.CstNodeBuilder=c_;var Bl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};tn.AbstractCstNode=Bl;var Vl=class extends Bl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};tn.LeafCstNodeImpl=Vl;var zl=class extends Bl{constructor(){super(...arguments),this.children=new Yl(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:hq.Position.create(0,0),end:hq.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};tn.CompositeCstNodeImpl=zl;var Yl=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Yl.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},qp=class extends zl{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};tn.RootCstNodeImpl=qp});var Gp=f(gr=>{"use strict";Object.defineProperty(gr,"__esModule",{value:!0});gr.LangiumCompletionParser=gr.LangiumParserErrorMessageProvider=gr.LangiumParser=gr.AbstractLangiumParser=gr.DatatypeSymbol=void 0;var Fp=po(),Nse=mq(),Mp=we(),gq=Ft(),vq=Ae(),$se=f_();gr.DatatypeSymbol=Symbol("Datatype");function d_(t){return t.$type===gr.DatatypeSymbol}var Tq="\u200B",_q=t=>t.endsWith(Tq)?t:t+Tq,Xl=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new h_(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};gr.AbstractLangiumParser=Xl;var p_=class extends Xl{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new $se.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,gq.isDataTypeRule)(e)?gr.DatatypeSymbol:(0,gq.getTypeName)(e),i=this.wrapper.DEFINE_RULE(_q(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===gr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,Mp.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(d_(u)){let l=i.image;(0,Mp.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(d_(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,vq.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),d_(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,vq.getContainerOfType)(e,Mp.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,Mp.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let a=e[n];a===void 0?e[n]=i:Array.isArray(a)&&Array.isArray(i)&&(i.push(...a),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};gr.LangiumParser=p_;var jp=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return Fp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Fp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};gr.LangiumParserErrorMessageProvider=jp;var m_=class extends Xl{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(_q(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};gr.LangiumCompletionParser=m_;var Ose={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new jp},h_=class extends Fp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Ose),{lookaheadStrategy:n?new Fp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new Nse.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var g_=f(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.assertUnreachable=uu.ErrorWithLocation=void 0;var y_=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};uu.ErrorWithLocation=y_;function Ise(t){throw new Error("Error! The input value was not handled.")}uu.assertUnreachable=Ise});var T_=f(Hp=>{"use strict";Object.defineProperty(Hp,"__esModule",{value:!0});Hp.createParser=void 0;var Rq=po(),Ue=we(),Jl=g_(),Dse=Mt(),Aq=Ft(),Sq=gt();function xse(t,e,r){return Lse({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}Hp.createParser=xse;function Lse(t,e){let r=(0,Sq.getAllReachableRules)(e,!1),n=(0,Dse.stream)(e.rules).filter(Ue.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,ho(a,i.definition)))}}function ho(t,e,r=!1){let n;if((0,Ue.isKeyword)(e))n=Hse(t,e);else if((0,Ue.isAction)(e))n=qse(t,e);else if((0,Ue.isAssignment)(e))n=ho(t,e.terminal);else if((0,Ue.isCrossReference)(e))n=Pq(t,e);else if((0,Ue.isRuleCall)(e))n=Mse(t,e);else if((0,Ue.isAlternatives)(e))n=jse(t,e);else if((0,Ue.isUnorderedGroup)(e))n=Gse(t,e);else if((0,Ue.isGroup)(e))n=Use(t,e);else throw new Jl.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return bq(t,r?void 0:Up(e),n,e.cardinality)}function qse(t,e){let r=(0,Aq.getTypeName)(e);return()=>t.parser.action(r,e)}function Mse(t,e){let r=e.rule.ref;if((0,Ue.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?Fse(r,e.arguments):()=>({});return a=>t.parser.subrule(n,Cq(t,r),e,i(a))}else if((0,Ue.isTerminalRule)(r)){let n=t.consume++,i=v_(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Jl.assertUnreachable)(r);else throw new Jl.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Fse(t,e){let r=e.map(n=>Gi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function Gi(t){if((0,Ue.isDisjunction)(t)){let e=Gi(t.left),r=Gi(t.right);return n=>e(n)||r(n)}else if((0,Ue.isConjunction)(t)){let e=Gi(t.left),r=Gi(t.right);return n=>e(n)&&r(n)}else if((0,Ue.isNegation)(t)){let e=Gi(t.value);return r=>!e(r)}else if((0,Ue.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Ue.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,Jl.assertUnreachable)(t)}function jse(t,e){if(e.elements.length===1)return ho(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:ho(t,i,!0)},o=Up(i);o&&(a.GATE=Gi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Gse(t,e){if(e.elements.length===1)return ho(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:ho(t,s,!0)},l=Up(s);l&&(u.GATE=Gi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},d=t.parser;c.ALT=()=>{if(u.ALT(s),!d.isRecording()){let v=i(n,d);d.unorderedGroups.get(v)||d.unorderedGroups.set(v,[]);let y=d.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let h=u.GATE;return h?c.GATE=()=>h(s):c.GATE=()=>{let v=d.unorderedGroups.get(i(n,d));return!v?.[l]},c})),o=bq(t,Up(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Use(t,e){let r=e.elements.map(n=>ho(t,n));return n=>r.forEach(i=>i(n))}function Up(t){if((0,Ue.isGroup)(t))return t.guardCondition}function Pq(t,e,r=e.terminal){if(r)if((0,Ue.isRuleCall)(r)&&(0,Ue.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Cq(t,r.rule.ref),e,i)}else if((0,Ue.isRuleCall)(r)&&(0,Ue.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=v_(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Ue.isKeyword)(r)){let n=t.consume++,i=v_(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,Sq.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,Aq.getTypeName)(e.type.ref));return Pq(t,e,i)}}function Hse(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function bq(t,e,r,n){let i=e&&Gi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,Rq.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,Rq.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Jl.assertUnreachable)(n)}function Cq(t,e){let r=Kse(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Kse(t,e){if((0,Ue.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Ue.isParserRule)(n);)((0,Ue.isGroup)(n)||(0,Ue.isAlternatives)(n)||(0,Ue.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function v_(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var __=f(Kp=>{"use strict";Object.defineProperty(Kp,"__esModule",{value:!0});Kp.createCompletionParser=void 0;var Wse=Gp(),Bse=T_();function Vse(t){let e=t.Grammar,r=t.parser.Lexer,n=new Wse.LangiumCompletionParser(t);return(0,Bse.createParser)(e,n,r.definition),n.finalize(),n}Kp.createCompletionParser=Vse});var R_=f(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.prepareLangiumParser=lu.createLangiumParser=void 0;var zse=Gp(),Yse=T_();function Xse(t){let e=kq(t);return e.finalize(),e}lu.createLangiumParser=Xse;function kq(t){let e=t.Grammar,r=t.parser.Lexer,n=new zse.LangiumParser(t);return(0,Yse.createParser)(e,n,r.definition)}lu.prepareLangiumParser=kq});var P_=f(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});Bp.DefaultTokenBuilder=void 0;var Jse=po(),A_=we(),Qse=Ft(),Zse=Ae(),eue=gt(),Wp=Wa(),tue=Mt(),S_=class{buildTokens(e,r){let n=(0,tue.stream)((0,eue.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,Wp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(A_.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Qse.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,Wp.isWhitespaceRegExp)(r)?Jse.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(A_.isParserRule).flatMap(i=>(0,Zse.streamAllContents)(i).filter(A_.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,Wp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,Wp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};Bp.DefaultTokenBuilder=S_});var C_=f($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});$t.convertBoolean=$t.convertNumber=$t.convertDate=$t.convertBigint=$t.convertInt=$t.convertID=$t.convertRegexLiteral=$t.convertString=$t.DefaultValueConverter=void 0;var Eq=we(),rue=Ft(),nue=gt(),b_=class{convert(e,r){let n=r.feature;if((0,Eq.isCrossReference)(n)&&(n=(0,nue.getCrossReferenceTerminal)(n)),(0,Eq.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Oq(r);case"STRING":return wq(r);case"ID":return $q(r);case"REGEXLITERAL":return Nq(r)}switch((i=(0,rue.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return xq(r);case"boolean":return Lq(r);case"bigint":return Iq(r);case"date":return Dq(r);default:return r}}};$t.DefaultValueConverter=b_;function wq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=iue(i)}else e+=n}return e}$t.convertString=wq;function iue(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function Nq(t){return t.substring(1,t.length-1)}$t.convertRegexLiteral=Nq;function $q(t){return t.charAt(0)==="^"?t.substring(1):t}$t.convertID=$q;function Oq(t){return parseInt(t)}$t.convertInt=Oq;function Iq(t){return BigInt(t)}$t.convertBigint=Iq;function Dq(t){return new Date(t)}$t.convertDate=Dq;function xq(t){return Number(t)}$t.convertNumber=xq;function Lq(t){return t.toLowerCase()==="true"}$t.convertBoolean=Lq});var w_=f(zp=>{"use strict";Object.defineProperty(zp,"__esModule",{value:!0});zp.DefaultLinker=void 0;var aue=De(),cu=tr(),Vp=Ae(),oue=Rr(),k_=ua(),E_=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=aue.CancellationToken.None){for(let n of(0,Vp.streamAst)(e.parseResult.value))await(0,oue.interruptAndCheck)(r),(0,Vp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=k_.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,cu.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,cu.isAstNode)(this._ref))return this._ref;if((0,cu.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,Vp.getDocument)(e).state<k_.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,cu.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,cu.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,cu.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,Vp.getDocument)(e.container);n.state<k_.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};zp.DefaultLinker=E_});var $_=f(Yp=>{"use strict";Object.defineProperty(Yp,"__esModule",{value:!0});Yp.DefaultJsonSerializer=void 0;var Ql=tr(),sue=Ae(),uue=gt();function qq(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var N_=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r?.replacer,i=(o,s)=>this.replacer(o,s,r),a=n?(o,s)=>n(o,s,i):i;return JSON.stringify(e,a,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:a}={}){var o,s,u;if(!this.ignoreProperties.has(e))if((0,Ql.isReference)(r)){let l=r.ref,c=n?r.$refText:void 0;return l?{$refText:c,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:c,$error:(s=(o=r.error)===null||o===void 0?void 0:o.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let l;if(a&&(0,Ql.isAstNode)(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=(0,sue.getDocument)(r).uri.toString()}catch{}return i&&!e&&(0,Ql.isAstNode)(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(a=>!a.startsWith("$")).forEach(a=>{let o=(0,uue.findNodesForProperty)(e.$cstNode,a).map(r);o.length!==0&&(i[a]=o)}),e}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];qq(c)?u[l]=this.reviveReference(e,s,r,c):(0,Ql.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else qq(u)?e[s]=this.reviveReference(e,s,r,u):(0,Ql.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};Yp.DefaultJsonSerializer=N_});var I_=f(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.DefaultServiceRegistry=void 0;var lue=Gn(),O_=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=lue.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};Xp.DefaultServiceRegistry=O_});var x_=f(Jp=>{"use strict";Object.defineProperty(Jp,"__esModule",{value:!0});Jp.ValidationRegistry=void 0;var cue=vn(),fue=Rr(),D_=class{constructor(e){this.validationChecks=new cue.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,fue.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};Jp.ValidationRegistry=D_});var F_=f(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.DefaultReferenceDescriptionProvider=fu.DefaultAstNodeDescriptionProvider=void 0;var due=De(),pue=tr(),Qp=Ae(),L_=Le(),mue=Rr(),hue=Pi(),q_=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,Qp.getDocument)(e)){var i;r??(r=this.nameProvider.getName(e));let a=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${a} has no name.`);let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,L_.toDocumentSegment)(o),selectionSegment:(0,L_.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:a}}};fu.DefaultAstNodeDescriptionProvider=q_;var M_=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=due.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,Qp.streamAst)(i))await(0,mue.interruptAndCheck)(r),(0,Qp.streamReferences)(a).filter(o=>!(0,pue.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,Qp.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,L_.toDocumentSegment)(n),local:(0,hue.equalURI)(r.documentUri,i)}}};fu.DefaultReferenceDescriptionProvider=M_});var G_=f(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});Zp.DefaultAstNodeLocator=void 0;var j_=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Zp.DefaultAstNodeLocator=j_});var H_=f(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.DefaultConfigurationProvider=void 0;var yue=At(),U_=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(yue.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};em.DefaultConfigurationProvider=U_});var B_=f(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.DefaultDocumentBuilder=void 0;var tm=De(),gue=vn(),K_=Rr(),si=ua(),W_=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new gue.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=tm.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=tm.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,K_.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),tm.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,si.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<si.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,si.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,si.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,si.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,si.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,si.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,si.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,K_.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),tm.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,K_.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=si.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=si.DocumentState.Validated}};rm.DefaultDocumentBuilder=W_});var X_=f(nm=>{"use strict";Object.defineProperty(nm,"__esModule",{value:!0});nm.DefaultIndexManager=void 0;var Mq=De(),vue=Ae(),V_=Mt(),z_=Pi(),Fq=ua(),Y_=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,vue.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,z_.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,V_.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,V_.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,V_.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Mq.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Fq.DocumentState.IndexedContent}async updateReferences(e,r=Mq.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Fq.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,z_.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,z_.equalURI)(o.targetUri,n)):!1}};nm.DefaultIndexManager=Y_});var Z_=f(im=>{"use strict";Object.defineProperty(im,"__esModule",{value:!0});im.DefaultWorkspaceManager=void 0;var Tue=De(),J_=Gn(),_ue=Rr(),Q_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Tue.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,_ue.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return J_.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=J_.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=J_.Utils.extname(r.uri);return n.includes(a)}return!1}};im.DefaultWorkspaceManager=Q_});var nR=f(ui=>{"use strict";Object.defineProperty(ui,"__esModule",{value:!0});ui.isTokenTypeDictionary=ui.isIMultiModeLexerDefinition=ui.isTokenTypeArray=ui.DefaultLexer=void 0;var Rue=po(),eR=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=tR(r)?Object.values(r):r;this.chevrotainLexer=new Rue.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(tR(e))return e;let r=rR(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ui.DefaultLexer=eR;function jq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ui.isTokenTypeArray=jq;function rR(t){return t&&"modes"in t&&"defaultMode"in t}ui.isIMultiModeLexerDefinition=rR;function tR(t){return!jq(t)&&!rR(t)}ui.isTokenTypeDictionary=tR});var sR=f(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isJSDoc=du.parseJSDoc=void 0;var Oe=De(),Aue=Gn(),Sue=ef(),Pue=Wa();function bue(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Oe.Position.create(0,0));let a=Hq(t),o=oR(n),s=Eue({lines:a,position:i,options:o});return Iue({index:0,tokens:s,position:i})}du.parseJSDoc=bue;function Cue(t,e){let r=oR(e),n=Hq(t);if(n.length===0)return!1;let i=n[0],a=n[n.length-1],o=r.start,s=r.end;return Boolean(o?.exec(i))&&Boolean(s?.exec(a))}du.isJSDoc=Cue;function Hq(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Sue.NEWLINE_REGEXP)}var Gq=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,kue=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Eue(t){var e,r,n;let i=[],a=t.position.line,o=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,l=s===t.lines.length-1,c=t.lines[s],d=0;if(u&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);v&&(d=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);v&&(d=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);v&&(c=c.substring(0,v.index))}if(c=c.substring(0,Oue(c)),aR(c,0)>=c.length){if(i.length>0){let v=Oe.Position.create(a,o);i.push({type:"break",content:"",range:Oe.Range.create(v,v)})}}else{Gq.lastIndex=d;let v=Gq.exec(c);if(v){let y=v[0],A=v[1],E=Oe.Position.create(a,o+d),C=Oe.Position.create(a,o+d+y.length);i.push({type:"tag",content:A,range:Oe.Range.create(E,C)}),d+=y.length,d=aR(c,d)}if(d<c.length){let y=c.substring(d),A=Array.from(y.matchAll(kue));i.push(...wue(A,y,a,o+d))}}a++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function wue(t,e,r,n){let i=[];if(t.length===0){let a=Oe.Position.create(r,n),o=Oe.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Oe.Range.create(a,o)})}else{let a=0;for(let s of t){let u=s.index,l=e.substring(a,u);l.length>0&&i.push({type:"text",content:e.substring(a,u),range:Oe.Range.create(Oe.Position.create(r,a+n),Oe.Position.create(r,u+n))});let c=l.length+1,d=s[1];if(i.push({type:"inline-tag",content:d,range:Oe.Range.create(Oe.Position.create(r,a+c+n),Oe.Position.create(r,a+c+d.length+n))}),c+=d.length,s.length===4){c+=s[2].length;let h=s[3];i.push({type:"text",content:h,range:Oe.Range.create(Oe.Position.create(r,a+c+n),Oe.Position.create(r,a+c+h.length+n))})}else i.push({type:"text",content:"",range:Oe.Range.create(Oe.Position.create(r,a+c+n),Oe.Position.create(r,a+c+n))});a=u+s[0].length}let o=e.substring(a);o.length>0&&i.push({type:"text",content:o,range:Oe.Range.create(Oe.Position.create(r,a+n),Oe.Position.create(r,a+n+o.length))})}return i}var Nue=/\S/,$ue=/\s*$/;function aR(t,e){let r=t.substring(e).match(Nue);return r?e+r.index:t.length}function Oue(t){let e=t.match($ue);if(e&&typeof e.index=="number")return e.index}function Iue(t){var e,r,n,i;let a=Oe.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new am([],Oe.Range.create(a,a));let o=[];for(;t.index<t.tokens.length;){let l=Due(t,o[o.length-1]);l&&o.push(l)}let s=(r=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:a,u=(i=(n=o[o.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:a;return new am(o,Oe.Range.create(s,u))}function Due(t,e){let r=t.tokens[t.index];if(r.type==="tag")return Wq(t,!1);if(r.type==="text"||r.type==="inline-tag")return Kq(t);xue(r,e),t.index++}function xue(t,e){if(e){let r=new om("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function Kq(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Lue(t)),n=e,e=t.tokens[t.index];return new ec(i,Oe.Range.create(r.range.start,n.range.end))}function Lue(t){return t.tokens[t.index].type==="inline-tag"?Wq(t,!0):Bq(t)}function Wq(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let a=Bq(t);return new Zl(n,new ec([a],a.range),e,Oe.Range.create(r.range.start,a.range.end))}else{let a=Kq(t);return new Zl(n,a,e,Oe.Range.create(r.range.start,a.range.end))}else{let a=r.range;return new Zl(n,new ec([],a),e,a)}}function Bq(t){let e=t.tokens[t.index++];return new om(e.content,e.range)}function oR(t){if(!t)return oR({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:iR(e,!0),end:iR(r,!1),line:iR(n,!0)}}function iR(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,Pue.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var am=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=Uq(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=Uq(r)+i}return r.trim()}},Zl=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let a=que(this.name,r,e??{});if(typeof a=="string")return a}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function que(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let a=e.indexOf(" "),o=e;if(a>0){let u=aR(e,a);o=e.substring(u),e=e.substring(0,a)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(o=`\`${o}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,o))!==null&&i!==void 0?i:Mue(e,o)}}function Mue(t,e){try{return Aue.URI.parse(t,!0),`[${e}](${t})`}catch{return t}}var ec=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],a=this.inlines[n+1];r+=i.toMarkdown(e),a&&a.range.start.line>i.range.start.line&&(r+=`
`)}return r}},om=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function Uq(t){return t.endsWith(`
`)?`
`:`

`}});var zq=f(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.JSDocDocumentationProvider=void 0;var Fue=tr(),jue=Ae(),Gue=Le(),Vq=sR(),uR=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,Gue.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,Fue.isLeafCstNode)(r)&&(0,Vq.isJSDoc)(r))return(0,Vq.parseJSDoc)(r).toMarkdown({renderLink:(i,a)=>this.documentationLinkRenderer(e,i,a)})}documentationLinkRenderer(e,r,n){var i;let a=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(a&&a.nameSegment){let o=a.nameSegment.range.start.line+1,s=a.nameSegment.range.start.character+1,u=a.documentUri.with({fragment:`L${o},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,jue.getDocument)(e).precomputedScopes;if(!i)return;let a=e;do{let s=i.get(a).find(u=>u.name===r);if(s)return s;a=a.$container}while(a)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};sm.JSDocDocumentationProvider=uR});var lR=f(ba=>{"use strict";var Uue=ba&&ba.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Yq=ba&&ba.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Uue(e,t,r)};Object.defineProperty(ba,"__esModule",{value:!0});Yq(zq(),ba);Yq(sR(),ba)});var od=f(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.createDefaultSharedModule=pu.createDefaultModule=void 0;var Hue=De(),Kue=Yh(),Wue=dv(),Bue=__(),Vue=Uf(),zue=Ig(),Yue=xg(),Xue=kf(),Jue=$g(),Que=Mg(),Zue=Vg(),ele=Yg(),tle=Jg(),rle=R_(),nle=P_(),ile=C_(),ale=w_(),ole=Yo(),sle=qf(),ule=_f(),lle=Af(),cle=$_(),fle=I_(),dle=Rr(),ple=bf(),mle=x_(),Xq=F_(),hle=G_(),yle=H_(),gle=B_(),Jq=ua(),vle=X_(),Tle=Z_(),_le=nR(),Rle=lR();function Ale(t){return{documentation:{DocumentationProvider:e=>new Rle.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,Wue.createGrammarConfig)(e),LangiumParser:e=>(0,rle.createLangiumParser)(e),CompletionParser:e=>(0,Bue.createCompletionParser)(e),ValueConverter:()=>new ile.DefaultValueConverter,TokenBuilder:()=>new nle.DefaultTokenBuilder,Lexer:e=>new _le.DefaultLexer(e)},lsp:{CompletionProvider:e=>new Vue.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new Yue.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Que.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new Xue.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new ele.DefaultReferencesProvider(e),DefinitionProvider:e=>new Jue.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new zue.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new tle.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new hle.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new Xq.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new Xq.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new ale.DefaultLinker(e),NameProvider:()=>new ole.DefaultNameProvider,ScopeProvider:e=>new lle.DefaultScopeProvider(e),ScopeComputation:e=>new ule.DefaultScopeComputation(e),References:e=>new sle.DefaultReferences(e)},serializer:{JsonSerializer:e=>new cle.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new ple.DefaultDocumentValidator(e),ValidationRegistry:e=>new mle.ValidationRegistry(e)},shared:()=>t.shared}}pu.createDefaultModule=Ale;function Sle(t){return{ServiceRegistry:()=>new fle.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Zue.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new Jq.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new Jq.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new gle.DefaultDocumentBuilder(e),TextDocuments:()=>new Hue.TextDocuments(Kue.TextDocument),IndexManager:e=>new vle.DefaultIndexManager(e),WorkspaceManager:e=>new Tle.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new dle.MutexLock,ConfigurationProvider:e=>new yle.DefaultConfigurationProvider(e)}}}pu.createDefaultSharedModule=Sle});var Zq=f(Qq=>{"use strict";Object.defineProperty(Qq,"__esModule",{value:!0})});var r1=f(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.joinTracedToNodeIf=Ca.joinTracedToNode=Ca.joinToNode=void 0;var cR=Fa();function e1(t,e=String,{filter:r,prefix:n,suffix:i,separator:a,appendNewLineIfNotEmpty:o}={}){return ble(t,(s,u,l,c)=>{if(r&&!r(u,l,c))return s;let d=e(u,l,c);return(s??(s=new cR.CompositeGeneratorNode)).append(n&&n(u,l,c)).append(d).append(i&&i(u,l,c)).appendIf(!c&&d!==void 0,a).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!o)})}Ca.joinToNode=e1;function t1(t,e){return(r,n=String,i)=>(0,cR.traceToNode)(t,e)(e1(r,t&&e?(a,o,s)=>(0,cR.traceToNode)(t,e,o)(n(a,o,s)):n,i))}Ca.joinTracedToNode=t1;function Ple(t,e,r){return t?t1(typeof e=="function"?e():e,r):()=>{}}Ca.joinTracedToNodeIf=Ple;function ble(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var n1=f(vr=>{"use strict";var Cle=vr&&vr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),fR=vr&&vr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Cle(e,t,r)};Object.defineProperty(vr,"__esModule",{value:!0});vr.normalizeEOL=vr.expandToStringWithNL=vr.expandToString=void 0;fR(Fa(),vr);fR(r1(),vr);fR(cy(),vr);var dR=ef();Object.defineProperty(vr,"expandToString",{enumerable:!0,get:function(){return dR.expandToString}});Object.defineProperty(vr,"expandToStringWithNL",{enumerable:!0,get:function(){return dR.expandToStringWithNL}});Object.defineProperty(vr,"normalizeEOL",{enumerable:!0,get:function(){return dR.normalizeEOL}})});var a1=f(i1=>{"use strict";Object.defineProperty(i1,"__esModule",{value:!0})});var o1=f(li=>{"use strict";var kle=li&&li.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),um=li&&li.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&kle(e,t,r)};Object.defineProperty(li,"__esModule",{value:!0});um(Uy(),li);um(dv(),li);um(sv(),li);um(a1(),li)});var u1=f(s1=>{"use strict";Object.defineProperty(s1,"__esModule",{value:!0})});var l1=f(kr=>{"use strict";var Ele=kr&&kr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ka=kr&&kr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ele(e,t,r)};Object.defineProperty(kr,"__esModule",{value:!0});ka(__(),kr);ka(f_(),kr);ka(R_(),kr);ka(Gp(),kr);ka(nR(),kr);ka(u1(),kr);ka(P_(),kr);ka(C_(),kr)});var c1=f(Nn=>{"use strict";var wle=Nn&&Nn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tc=Nn&&Nn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&wle(e,t,r)};Object.defineProperty(Nn,"__esModule",{value:!0});tc(w_(),Nn);tc(Yo(),Nn);tc(qf(),Nn);tc(_f(),Nn);tc(Af(),Nn)});var f1=f(yo=>{"use strict";var Nle=yo&&yo.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),$le=yo&&yo.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Nle(e,t,r)};Object.defineProperty(yo,"__esModule",{value:!0});$le($_(),yo)});var d1=f(Tr=>{"use strict";var Ole=Tr&&Tr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ui=Tr&&Tr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ole(e,t,r)};Object.defineProperty(Tr,"__esModule",{value:!0});Ui(Ae(),Tr);Ui(vn(),Tr);Ui(Le(),Tr);Ui(g_(),Tr);Ui(gt(),Tr);Ui(Rr(),Tr);Ui(Wa(),Tr);Ui(Mt(),Tr);Ui(Pi(),Tr)});var m1=f(Ea=>{"use strict";var Ile=Ea&&Ea.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),p1=Ea&&Ea.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ile(e,t,r)};Object.defineProperty(Ea,"__esModule",{value:!0});p1(bf(),Ea);p1(x_(),Ea)});var h1=f(Er=>{"use strict";var Dle=Er&&Er.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),wa=Er&&Er.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Dle(e,t,r)};Object.defineProperty(Er,"__esModule",{value:!0});wa(F_(),Er);wa(G_(),Er);wa(H_(),Er);wa(B_(),Er);wa(ua(),Er);wa(uv(),Er);wa(X_(),Er);wa(Z_(),Er)});var rc=f(He=>{"use strict";var y1=He&&He.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),xle=He&&He.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),_r=He&&He.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&y1(e,t,r)},Lle=He&&He.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&y1(e,t,r);return xle(e,t),e};Object.defineProperty(He,"__esModule",{value:!0});He.GrammarAST=void 0;_r(od(),He);_r(Fu(),He);_r(I_(),He);_r(Zq(),He);_r(tr(),He);_r(lR(),He);_r(n1(),He);_r(o1(),He);_r(Zg(),He);_r(l1(),He);_r(c1(),He);_r(f1(),He);_r(d1(),He);_r(m1(),He);_r(h1(),He);var qle=Lle(we());He.GrammarAST=qle});var v1=f((i_e,g1)=>{"use strict";g1.exports=De()});var T1=f(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=p.isASTDeclaration=p.ASTDeclaration=p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlterAndTrajectory=p.ASTAlterAndTrajectory=p.isASTAlter=p.ASTAlter=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTInstruction=p.ASTInstruction=void 0;p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRange=p.ASTRange=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParameter=p.ASTParameter=p.isASTOffsetList=p.ASTOffsetList=p.isASTList=p.ASTList=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDoubleRange=p.ASTDoubleRange=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTrajectory=p.ASTTrajectory=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=void 0;var Mle=rc();p.ASTInstruction="ASTInstruction";function Fle(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=Fle;p.ASTNumber="ASTNumber";function jle(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=jle;p.ASTNumberOffset="ASTNumberOffset";function Gle(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=Gle;p.ASTReplayTarget="ASTReplayTarget";function Ule(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=Ule;p.ASTTarget="ASTTarget";function Hle(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=Hle;p.ASTTimeScope="ASTTimeScope";function Kle(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=Kle;p.ASTValue="ASTValue";function Wle(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=Wle;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function Ble(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=Ble;p.ASTAllPlanes="ASTAllPlanes";function Vle(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=Vle;p.ASTAlter="ASTAlter";function zle(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=zle;p.ASTAlterAndTrajectory="ASTAlterAndTrajectory";function Yle(t){return p.reflection.isInstance(t,p.ASTAlterAndTrajectory)}p.isASTAlterAndTrajectory=Yle;p.ASTAlterSpeed="ASTAlterSpeed";function Xle(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=Xle;p.ASTAssertion="ASTAssertion";function Jle(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=Jle;p.ASTAssertions="ASTAssertions";function Qle(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=Qle;p.ASTAt="ASTAt";function Zle(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=Zle;p.ASTAtFor="ASTAtFor";function ece(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=ece;p.ASTConstantValue="ASTConstantValue";function tce(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=tce;p.ASTCreate="ASTCreate";function rce(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=rce;p.ASTCreationParameter="ASTCreationParameter";function nce(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=nce;p.ASTCreationParameters="ASTCreationParameters";function ice(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=ice;p.ASTCreationParameterType="ASTCreationParameterType";function ace(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=ace;p.ASTCut="ASTCut";function oce(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=oce;p.ASTDeclaration="ASTDeclaration";function sce(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=sce;p.ASTDelay="ASTDelay";function uce(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=uce;p.ASTDelayParameter="ASTDelayParameter";function lce(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=lce;p.ASTDoubleRange="ASTDoubleRange";function cce(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=cce;p.ASTDoubleValue="ASTDoubleValue";function fce(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=fce;p.ASTFilters="ASTFilters";function dce(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=dce;p.ASTHide="ASTHide";function pce(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=pce;p.ASTHideParameter="ASTHideParameter";function mce(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=mce;p.ASTIntegerRange="ASTIntegerRange";function hce(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=hce;p.ASTIntegerValue="ASTIntegerValue";function yce(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=yce;p.ASTLeftShift="ASTLeftShift";function gce(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=gce;p.ASTList="ASTList";function vce(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=vce;p.ASTOffsetList="ASTOffsetList";function Tce(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=Tce;p.ASTParameter="ASTParameter";function _ce(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=_ce;p.ASTParameters="ASTParameters";function Rce(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=Rce;p.ASTParameterType="ASTParameterType";function Ace(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Ace;p.ASTPlane="ASTPlane";function Sce(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=Sce;p.ASTPlaneFrom="ASTPlaneFrom";function Pce(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=Pce;p.ASTRange="ASTRange";function bce(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=bce;p.ASTRecordingParameterType="ASTRecordingParameterType";function Cce(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=Cce;p.ASTRecordingValue="ASTRecordingValue";function kce(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=kce;p.ASTReplay="ASTReplay";function Ece(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=Ece;p.ASTRightShift="ASTRightShift";function wce(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=wce;p.ASTRotate="ASTRotate";function Nce(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=Nce;p.ASTRotateParameter="ASTRotateParameter";function $ce(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=$ce;p.ASTSaturate="ASTSaturate";function Oce(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=Oce;p.ASTSaturationParameter="ASTSaturationParameter";function Ice(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=Ice;p.ASTSaturationParameters="ASTSaturationParameters";function Dce(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=Dce;p.ASTSaturationParameterType="ASTSaturationParameterType";function xce(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=xce;p.ASTScenario="ASTScenario";function Lce(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=Lce;p.ASTSpeedParameter="ASTSpeedParameter";function qce(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=qce;p.ASTSpeedParameters="ASTSpeedParameters";function Mce(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=Mce;p.ASTSpeedParameterType="ASTSpeedParameterType";function Fce(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=Fce;p.ASTStringList="ASTStringList";function jce(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=jce;p.ASTStringValue="ASTStringValue";function Gce(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=Gce;p.ASTTime="ASTTime";function Uce(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=Uce;p.ASTTrajectory="ASTTrajectory";function Hce(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=Hce;p.ASTTrigger="ASTTrigger";function Kce(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=Kce;p.ASTVariableValue="ASTVariableValue";function Wce(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=Wce;p.ASTWayPoint="ASTWayPoint";function Bce(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=Bce;p.ASTWayPoints="ASTWayPoints";function Vce(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=Vce;p.ASTWindow="ASTWindow";function zce(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=zce;p.ASTListDeclaration="ASTListDeclaration";function Yce(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=Yce;p.ASTRangeDeclaration="ASTRangeDeclaration";function Xce(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=Xce;p.ASTParamDrift="ASTParamDrift";function Jce(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Jce;p.ASTParamEdit="ASTParamEdit";function Qce(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Qce;p.ASTParamNoise="ASTParamNoise";function Zce(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=Zce;p.ASTParamOffset="ASTParamOffset";function efe(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=efe;var lm=class extends Mle.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterAndTrajectory","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlterAndTrajectory:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTNumberOffset:case p.ASTStringValue:case p.ASTVariableValue:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleValue:case p.ASTIntegerValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTNumber:case p.ASTRightShift:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=lm;p.reflection=new lm});var _1=f(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.AttackScenarioGrammarGrammar=void 0;var tfe=rc(),cm,rfe=()=>cm!=null?cm:cm=(0,tfe.loadGrammarFromJson)(`{
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
        "$type": "Group",
        "elements": [
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
          },
          {
            "$type": "Assignment",
            "feature": "list",
            "operator": "=",
            "terminal": {
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
      "name": "ASTStringList",
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
                "$ref": "#/rules@142"
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
                    "$ref": "#/rules@85"
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
                    "$ref": "#/rules@142"
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
                "$ref": "#/rules@104"
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
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@54"
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
                    "$ref": "#/rules@85"
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
                    "$ref": "#/rules@54"
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
                "$ref": "#/rules@104"
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
        "$type": "Group",
        "elements": [
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
          },
          {
            "$type": "Assignment",
            "feature": "range",
            "operator": "=",
            "terminal": {
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
      "name": "ASTIntegerRange",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "start",
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
            "feature": "end",
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
          }
        ]
      },
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
                "$ref": "#/rules@85"
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
                "$ref": "#/rules@106"
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@107"
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
                "$ref": "#/rules@138"
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
                "$ref": "#/rules@85"
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
      },
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
      },
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
              "$ref": "#/rules@13"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
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
                "$ref": "#/rules@34"
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
                "$ref": "#/rules@22"
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
      "name": "ASTAlterAndTrajectory",
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
                "$ref": "#/rules@74"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "mode",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
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
                }
              ]
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
                "$ref": "#/rules@86"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@30"
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
                "$ref": "#/rules@45"
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
                "$ref": "#/rules@22"
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
            "feature": "parameters",
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
                "$ref": "#/rules@22"
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
            "feature": "trajectory",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
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
                "$ref": "#/rules@41"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@123"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
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
                "$ref": "#/rules@43"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@27"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@32"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@33"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@117"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
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
                "$ref": "#/rules@35"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@80"
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
                "$ref": "#/rules@24"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@47"
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
                "$ref": "#/rules@22"
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
                "$ref": "#/rules@23"
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
                    "$ref": "#/rules@76"
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
                    "$ref": "#/rules@23"
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
                "$ref": "#/rules@77"
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
                "$ref": "#/rules@48"
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
                "$ref": "#/rules@134"
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
                "$ref": "#/rules@142"
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
                    "$ref": "#/rules@135"
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
                    "$ref": "#/rules@142"
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
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
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
                "$ref": "#/rules@121"
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
                "$ref": "#/rules@53"
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
                "$ref": "#/rules@71"
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
                "$ref": "#/rules@53"
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
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
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
                "$ref": "#/rules@121"
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
                "$ref": "#/rules@53"
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
                "$ref": "#/rules@98"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@71"
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
                "$ref": "#/rules@53"
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
                "$ref": "#/rules@98"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@133"
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
          },
          {
            "$type": "Assignment",
            "feature": "waypoints",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
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
                    "$ref": "#/rules@85"
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
                    "$ref": "#/rules@31"
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
                "$ref": "#/rules@106"
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
                "$ref": "#/rules@101"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@85"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@102"
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
                "$ref": "#/rules@132"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@78"
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
                "$ref": "#/rules@131"
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
                "$ref": "#/rules@36"
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
                    "$ref": "#/rules@76"
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
                    "$ref": "#/rules@36"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@120"
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
                "$ref": "#/rules@61"
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
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@68"
              },
              "arguments": []
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
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
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@40"
                },
                "arguments": []
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
                "$ref": "#/rules@61"
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
      "name": "ASTParamEdit",
      "definition": {
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
        "$type": "Assignment",
        "feature": "offset_op",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@91"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@92"
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
      "name": "ASTParamNoise",
      "definition": {
        "$type": "Assignment",
        "feature": "keyword",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@90"
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
      "name": "ASTParamDrift",
      "definition": {
        "$type": "Assignment",
        "feature": "drift_op",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@93"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@94"
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
                "$ref": "#/rules@131"
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
                "$ref": "#/rules@42"
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
                    "$ref": "#/rules@76"
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
                    "$ref": "#/rules@42"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@131"
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
                "$ref": "#/rules@44"
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
                    "$ref": "#/rules@76"
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
                    "$ref": "#/rules@44"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@131"
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
                "$ref": "#/rules@46"
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
                    "$ref": "#/rules@76"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@125"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@78"
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
                "$ref": "#/rules@52"
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
                "$ref": "#/rules@99"
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
                "$ref": "#/rules@128"
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
                "$ref": "#/rules@97"
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
                "$ref": "#/rules@61"
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
                "$ref": "#/rules@126"
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
                "$ref": "#/rules@124"
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
                "$ref": "#/rules@61"
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
                    "$ref": "#/rules@76"
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
                    "$ref": "#/rules@61"
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
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
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
              "$ref": "#/rules@56"
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
                "$ref": "#/rules@96"
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
      "name": "ASTDoubleValue",
      "definition": {
        "$type": "Group",
        "elements": [
          {
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
          {
            "$type": "Assignment",
            "feature": "record",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
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
      "name": "ASTRecordingValue",
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
                "$ref": "#/rules@112"
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
                "$ref": "#/rules@69"
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
              "$ref": "#/rules@62"
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
              "$ref": "#/rules@63"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@64"
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
            "$ref": "#/rules@142"
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
      "name": "ASTConstantValue",
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
              "$ref": "#/rules@136"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@146"
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
              "$ref": "#/rules@137"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@146"
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
                  "$ref": "#/rules@148"
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
                        "value": "\\\\"
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
                          "$ref": "#/rules@143"
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
              "$ref": "#/rules@144"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@145"
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
                      "value": "\\\\"
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
                                  "value": "\\""
                                }
                              }
                            ]
                          },
                          {
                            "$type": "CharacterRange",
                            "left": {
                              "$type": "Keyword",
                              "value": "'"
                            }
                          }
                        ]
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "TerminalRuleCall",
                "rule": {
                  "$ref": "#/rules@150"
                }
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
                      "value": "\\\\"
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
                      "value": "\\\\"
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
                  "value": "\\\\"
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
              "value": "\\\\"
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
              "$ref": "#/rules@151"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@151"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@151"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@151"
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
}`);fm.AttackScenarioGrammarGrammar=rfe});var R1=f(rn=>{"use strict";Object.defineProperty(rn,"__esModule",{value:!0});rn.AttackScenarioGrammarGeneratedModule=rn.FditscenarioGeneratedSharedModule=rn.AttackScenarioGrammarParserConfig=rn.AttackScenarioGrammarLanguageMetaData=void 0;var nfe=T1(),ife=_1();rn.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};rn.AttackScenarioGrammarParserConfig={maxLookahead:1,recoveryEnabled:!0,nodeLocationTracking:"full"};rn.FditscenarioGeneratedSharedModule={AstReflection:()=>new nfe.FditscenarioAstReflection};rn.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,ife.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>rn.AttackScenarioGrammarLanguageMetaData,parser:{ParserConfig:()=>rn.AttackScenarioGrammarParserConfig}}});var A1=f(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.FditscenarioValidator=mu.registerValidationChecks=void 0;function afe(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}mu.registerValidationChecks=afe;var pR=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};mu.FditscenarioValidator=pR});var b1=f(go=>{"use strict";Object.defineProperty(go,"__esModule",{value:!0});go.createFditscenarioServices=go.FditscenarioModule=void 0;var dm=rc(),S1=R1(),P1=A1();go.FditscenarioModule={validation:{FditscenarioValidator:()=>new P1.FditscenarioValidator}};function ofe(t){let e=(0,dm.inject)((0,dm.createDefaultSharedModule)(t),S1.FditscenarioGeneratedSharedModule),r=(0,dm.inject)((0,dm.createDefaultModule)({shared:e}),S1.AttackScenarioGrammarGeneratedModule,go.FditscenarioModule);return e.ServiceRegistry.register(r),(0,P1.registerValidationChecks)(r),{shared:e,Fditscenario:r}}go.createFditscenarioServices=ofe});var dfe=f(k1=>{Object.defineProperty(k1,"__esModule",{value:!0});var C1=rc(),mR=v1(),sfe=b1(),ufe=new mR.BrowserMessageReader(self),lfe=new mR.BrowserMessageWriter(self),cfe=(0,mR.createConnection)(ufe,lfe),{shared:ffe}=(0,sfe.createFditscenarioServices)(Object.assign({connection:cfe},C1.EmptyFileSystem));(0,C1.startLanguageServer)(ffe)});dfe();})();

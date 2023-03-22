"use strict";(()=>{var bc=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var _i=d(Vm=>{"use strict";Object.defineProperty(Vm,"__esModule",{value:!0});var Wm;function Bm(){if(Wm===void 0)throw new Error("No runtime abstraction layer installed");return Wm}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Wm=r}t.install=e})(Bm||(Bm={}));Vm.default=Bm});var zm=d(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.Disposable=void 0;var oF;(function(t){function e(r){return{dispose:r}}t.create=e})(oF=Du.Disposable||(Du.Disposable={}))});var Ha=d(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.Emitter=Ua.Event=void 0;var sF=_i(),uF;(function(t){let e={dispose(){}};t.None=function(){return e}})(uF=Ua.Event||(Ua.Event={}));var Ym=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,sF.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},qo=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Ym),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=qo._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Ua.Emitter=qo;qo._noop=function(){}});var fA=d(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.AbstractMessageBuffer=void 0;var lF=13,cF=10,fF=`\r
`,Xm=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case lF:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case cF:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(fF);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),y=l.substr(c+1).trim();o.set(f,y)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};Pc.AbstractMessageBuffer=Xm});var mA=d(eh=>{"use strict";Object.defineProperty(eh,"__esModule",{value:!0});var dA=_i(),Mo=zm(),dF=Ha(),pF=fA(),Fo=class extends pF.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return Fo.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Fo.emptyBuffer=new Uint8Array(0);var Jm=class{constructor(e){this.socket=e,this._onData=new dF.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,dA.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Mo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Mo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Mo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Qm=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Mo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Mo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Mo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},mF=new TextEncoder,pA=Object.freeze({messageBuffer:Object.freeze({create:t=>new Fo(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(mF.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Jm(t),asWritableStream:t=>new Qm(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Zm(){return pA}(function(t){function e(){dA.default.install(pA)}t.install=e})(Zm||(Zm={}));eh.default=Zm});var jo=d(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function hF(t){return t===!0||t===!1}rr.boolean=hF;function hA(t){return typeof t=="string"||t instanceof String}rr.string=hA;function yF(t){return typeof t=="number"||t instanceof Number}rr.number=yF;function gF(t){return t instanceof Error}rr.error=gF;function vF(t){return typeof t=="function"}rr.func=vF;function yA(t){return Array.isArray(t)}rr.array=yA;function TF(t){return yA(t)&&t.every(e=>hA(e))}rr.stringArray=TF});var Sh=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var Ka=jo(),gA;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(gA=J.ErrorCodes||(J.ErrorCodes={}));var xu=class extends Error{constructor(e,r,n){super(r),this.code=Ka.number(e)?e:gA.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,xu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=xu;var Mt=class{constructor(e){this.kind=e}static is(e){return e===Mt.auto||e===Mt.byName||e===Mt.byPosition}toString(){return this.kind}};J.ParameterStructures=Mt;Mt.auto=new Mt("auto");Mt.byPosition=new Mt("byPosition");Mt.byName=new Mt("byName");var Ze=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Mt.auto}};J.AbstractMessageSignature=Ze;var th=class extends Ze{constructor(e){super(e,0)}};J.RequestType0=th;var rh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=rh;var nh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=nh;var ih=class extends Ze{constructor(e){super(e,2)}};J.RequestType2=ih;var ah=class extends Ze{constructor(e){super(e,3)}};J.RequestType3=ah;var oh=class extends Ze{constructor(e){super(e,4)}};J.RequestType4=oh;var sh=class extends Ze{constructor(e){super(e,5)}};J.RequestType5=sh;var uh=class extends Ze{constructor(e){super(e,6)}};J.RequestType6=uh;var lh=class extends Ze{constructor(e){super(e,7)}};J.RequestType7=lh;var ch=class extends Ze{constructor(e){super(e,8)}};J.RequestType8=ch;var fh=class extends Ze{constructor(e){super(e,9)}};J.RequestType9=fh;var dh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=dh;var ph=class extends Ze{constructor(e){super(e,0)}};J.NotificationType0=ph;var mh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=mh;var hh=class extends Ze{constructor(e){super(e,2)}};J.NotificationType2=hh;var yh=class extends Ze{constructor(e){super(e,3)}};J.NotificationType3=yh;var gh=class extends Ze{constructor(e){super(e,4)}};J.NotificationType4=gh;var vh=class extends Ze{constructor(e){super(e,5)}};J.NotificationType5=vh;var Th=class extends Ze{constructor(e){super(e,6)}};J.NotificationType6=Th;var _h=class extends Ze{constructor(e){super(e,7)}};J.NotificationType7=_h;var Rh=class extends Ze{constructor(e){super(e,8)}};J.NotificationType8=Rh;var Ah=class extends Ze{constructor(e){super(e,9)}};J.NotificationType9=Ah;var _F;(function(t){function e(i){let a=i;return a&&Ka.string(a.method)&&(Ka.string(a.id)||Ka.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ka.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ka.string(a.id)||Ka.number(a.id)||a.id===null)}t.isResponse=n})(_F=J.Message||(J.Message={}))});var Ph=d(Ri=>{"use strict";var vA;Object.defineProperty(Ri,"__esModule",{value:!0});Ri.LRUCache=Ri.LinkedMap=Ri.Touch=void 0;var pr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(pr=Ri.Touch||(Ri.Touch={}));var Cc=class{constructor(){this[vA]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=pr.None){let n=this._map.get(e);if(n)return r!==pr.None&&this.touch(n,r),n.value}set(e,r,n=pr.None){let i=this._map.get(e);if(i)i.value=r,n!==pr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case pr.None:this.addItemLast(i);break;case pr.First:this.addItemFirst(i);break;case pr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(vA=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==pr.First&&r!==pr.Last)){if(r===pr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===pr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Ri.LinkedMap=Cc;var bh=class extends Cc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=pr.AsNew){return super.get(e,r)}peek(e){return super.get(e,pr.None)}set(e,r){return super.set(e,r,pr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Ri.LRUCache=bh});var Eh=d(Wa=>{"use strict";Object.defineProperty(Wa,"__esModule",{value:!0});Wa.CancellationTokenSource=Wa.CancellationToken=void 0;var RF=_i(),AF=jo(),Ch=Ha(),kh;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Ch.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Ch.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||AF.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(kh=Wa.CancellationToken||(Wa.CancellationToken={}));var SF=Object.freeze(function(t,e){let r=(0,RF.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),kc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?SF:(this._emitter||(this._emitter=new Ch.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},wh=class{get token(){return this._token||(this._token=new kc),this._token}cancel(){this._token?this._token.cancel():this._token=kh.Cancelled}dispose(){this._token?this._token instanceof kc&&this._token.dispose():this._token=kh.None}};Wa.CancellationTokenSource=wh});var TA=d(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.ReadableStreamMessageReader=Ai.AbstractMessageReader=Ai.MessageReader=void 0;var $h=_i(),Go=jo(),Nh=Ha(),bF;(function(t){function e(r){let n=r;return n&&Go.func(n.listen)&&Go.func(n.dispose)&&Go.func(n.onError)&&Go.func(n.onClose)&&Go.func(n.onPartialMessage)}t.is=e})(bF=Ai.MessageReader||(Ai.MessageReader={}));var wc=class{constructor(){this.errorEmitter=new Nh.Emitter,this.closeEmitter=new Nh.Emitter,this.partialMessageEmitter=new Nh.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Go.string(e.message)?e.message:"unknown"}`)}};Ai.AbstractMessageReader=wc;var Oh;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,$h.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(Oh||(Oh={}));var Ih=class extends wc{constructor(e,r){super(),this.readable=e,this.options=Oh.fromOptions(r),this.buffer=(0,$h.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,$h.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Ai.ReadableStreamMessageReader=Ih});var _A=d(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.Semaphore=void 0;var PF=_i(),Dh=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,PF.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Ec.Semaphore=Dh});var bA=d(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.WriteableStreamMessageWriter=Si.AbstractMessageWriter=Si.MessageWriter=void 0;var RA=_i(),Lu=jo(),CF=_A(),AA=Ha(),kF="Content-Length: ",SA=`\r
`,wF;(function(t){function e(r){let n=r;return n&&Lu.func(n.dispose)&&Lu.func(n.onClose)&&Lu.func(n.onError)&&Lu.func(n.write)}t.is=e})(wF=Si.MessageWriter||(Si.MessageWriter={}));var Nc=class{constructor(){this.errorEmitter=new AA.Emitter,this.closeEmitter=new AA.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Lu.string(e.message)?e.message:"unknown"}`)}};Si.AbstractMessageWriter=Nc;var xh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,RA.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,RA.default)().applicationJson.encoder}}t.fromOptions=e})(xh||(xh={}));var Lh=class extends Nc{constructor(e,r){super(),this.writable=e,this.options=xh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new CF.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(kF,n.byteLength.toString(),SA),i.push(SA),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Si.WriteableStreamMessageWriter=Lh});var NA=d(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.createMessageConnection=ee.ConnectionOptions=ee.CancellationStrategy=ee.CancellationSenderStrategy=ee.CancellationReceiverStrategy=ee.ConnectionStrategy=ee.ConnectionError=ee.ConnectionErrors=ee.LogTraceNotification=ee.SetTraceNotification=ee.TraceFormat=ee.TraceValues=ee.Trace=ee.NullLogger=ee.ProgressType=ee.ProgressToken=void 0;var PA=_i(),xt=jo(),re=Sh(),CA=Ph(),qu=Ha(),qh=Eh(),Fu;(function(t){t.type=new re.NotificationType("$/cancelRequest")})(Fu||(Fu={}));var kA;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(kA=ee.ProgressToken||(ee.ProgressToken={}));var Mu;(function(t){t.type=new re.NotificationType("$/progress")})(Mu||(Mu={}));var Mh=class{constructor(){}};ee.ProgressType=Mh;var Fh;(function(t){function e(r){return xt.func(r)}t.is=e})(Fh||(Fh={}));ee.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var De;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(De=ee.Trace||(ee.Trace={}));var EF;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(EF=ee.TraceValues||(ee.TraceValues={}));(function(t){function e(n){if(!xt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(De=ee.Trace||(ee.Trace={}));var gn;(function(t){t.Text="text",t.JSON="json"})(gn=ee.TraceFormat||(ee.TraceFormat={}));(function(t){function e(r){return xt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(gn=ee.TraceFormat||(ee.TraceFormat={}));var wA;(function(t){t.type=new re.NotificationType("$/setTrace")})(wA=ee.SetTraceNotification||(ee.SetTraceNotification={}));var jh;(function(t){t.type=new re.NotificationType("$/logTrace")})(jh=ee.LogTraceNotification||(ee.LogTraceNotification={}));var $c;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})($c=ee.ConnectionErrors||(ee.ConnectionErrors={}));var Qi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Qi.prototype)}};ee.ConnectionError=Qi;var EA;(function(t){function e(r){let n=r;return n&&xt.func(n.cancelUndispatched)}t.is=e})(EA=ee.ConnectionStrategy||(ee.ConnectionStrategy={}));var Gh;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new qh.CancellationTokenSource}});function e(r){let n=r;return n&&xt.func(n.createCancellationTokenSource)}t.is=e})(Gh=ee.CancellationReceiverStrategy||(ee.CancellationReceiverStrategy={}));var Uh;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Fu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&xt.func(n.sendCancellation)&&xt.func(n.cleanup)}t.is=e})(Uh=ee.CancellationSenderStrategy||(ee.CancellationSenderStrategy={}));var Hh;(function(t){t.Message=Object.freeze({receiver:Gh.Message,sender:Uh.Message});function e(r){let n=r;return n&&Gh.is(n.receiver)&&Uh.is(n.sender)}t.is=e})(Hh=ee.CancellationStrategy||(ee.CancellationStrategy={}));var NF;(function(t){function e(r){let n=r;return n&&(Hh.is(n.cancellationStrategy)||EA.is(n.connectionStrategy))}t.is=e})(NF=ee.ConnectionOptions||(ee.ConnectionOptions={}));var vn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(vn||(vn={}));function $F(t,e,r,n){let i=r!==void 0?r:ee.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,y=new Map,v=new Map,h,A=new CA.LinkedMap,w=new Map,C=new Set,b=new Map,S=De.Off,O=gn.Text,F,W=vn.New,te=new qu.Emitter,we=new qu.Emitter,Ee=new qu.Emitter,Qe=new qu.Emitter,V=new qu.Emitter,fe=n&&n.cancellationStrategy?n.cancellationStrategy:Hh.Message;function q(P){if(P===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+P.toString()}function L(P){return P===null?"res-unknown-"+(++s).toString():"res-"+P.toString()}function j(){return"not-"+(++o).toString()}function B(P,x){re.Message.isRequest(x)?P.set(q(x.id),x):re.Message.isResponse(x)?P.set(L(x.id),x):P.set(j(),x)}function ae(P){}function oe(){return W===vn.Listening}function Z(){return W===vn.Closed}function dt(){return W===vn.Disposed}function tt(){(W===vn.New||W===vn.Listening)&&(W=vn.Closed,we.fire(void 0))}function Dt(P){te.fire([P,void 0,void 0])}function fn(P){te.fire(P)}t.onClose(tt),t.onError(Dt),e.onClose(tt),e.onError(fn);function Dr(){h||A.size===0||(h=(0,PA.default)().timer.setImmediate(()=>{h=void 0,No()}))}function No(){if(A.size===0)return;let P=A.shift();try{re.Message.isRequest(P)?$o(P):re.Message.isNotification(P)?Io(P):re.Message.isResponse(P)?Oo(P):Ou(P)}finally{Dr()}}let dr=P=>{try{if(re.Message.isNotification(P)&&P.method===Fu.type.method){let x=P.params.id,G=q(x),z=A.get(G);if(re.Message.isRequest(z)){let Ge=n?.connectionStrategy,rt=Ge&&Ge.cancelUndispatched?Ge.cancelUndispatched(z,ae):void 0;if(rt&&(rt.error!==void 0||rt.result!==void 0)){A.delete(G),b.delete(x),rt.id=z.id,Fn(rt,P.method,Date.now()),e.write(rt).catch(()=>i.error("Sending response for canceled message failed."));return}}let je=b.get(x);if(je!==void 0){je.cancel(),jn(P);return}else C.add(x)}B(A,P)}finally{Dr()}};function $o(P){if(dt())return;function x(ge,Be,_e){let vt={jsonrpc:u,id:P.id};ge instanceof re.ResponseError?vt.error=ge.toJson():vt.result=ge===void 0?null:ge,Fn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}function G(ge,Be,_e){let vt={jsonrpc:u,id:P.id,error:ge.toJson()};Fn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}function z(ge,Be,_e){ge===void 0&&(ge=null);let vt={jsonrpc:u,id:P.id,result:ge};Fn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}ja(P);let je=c.get(P.method),Ge,rt;je&&(Ge=je.type,rt=je.handler);let Rt=Date.now();if(rt||l){let ge=P.id??String(Date.now()),Be=fe.receiver.createCancellationTokenSource(ge);P.id!==null&&C.has(P.id)&&Be.cancel(),P.id!==null&&b.set(ge,Be);try{let _e;if(rt)if(P.params===void 0){if(Ge!==void 0&&Ge.numberOfParams!==0){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines ${Ge.numberOfParams} params but received none.`),P.method,Rt);return}_e=rt(Be.token)}else if(Array.isArray(P.params)){if(Ge!==void 0&&Ge.parameterStructures===re.ParameterStructures.byName){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by name but received parameters by position`),P.method,Rt);return}_e=rt(...P.params,Be.token)}else{if(Ge!==void 0&&Ge.parameterStructures===re.ParameterStructures.byPosition){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by position but received parameters by name`),P.method,Rt);return}_e=rt(P.params,Be.token)}else l&&(_e=l(P.method,P.params,Be.token));let vt=_e;_e?vt.then?vt.then(tr=>{b.delete(ge),x(tr,P.method,Rt)},tr=>{b.delete(ge),tr instanceof re.ResponseError?G(tr,P.method,Rt):tr&&xt.string(tr.message)?G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${tr.message}`),P.method,Rt):G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Rt)}):(b.delete(ge),x(_e,P.method,Rt)):(b.delete(ge),z(_e,P.method,Rt))}catch(_e){b.delete(ge),_e instanceof re.ResponseError?x(_e,P.method,Rt):_e&&xt.string(_e.message)?G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${_e.message}`),P.method,Rt):G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Rt)}}else G(new re.ResponseError(re.ErrorCodes.MethodNotFound,`Unhandled method ${P.method}`),P.method,Rt)}function Oo(P){if(!dt())if(P.id===null)P.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(P.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=P.id,G=w.get(x);if(Ga(P,G),G!==void 0){w.delete(x);try{if(P.error){let z=P.error;G.reject(new re.ResponseError(z.code,z.message,z.data))}else if(P.result!==void 0)G.resolve(P.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function Io(P){if(dt())return;let x,G;if(P.method===Fu.type.method){let z=P.params.id;C.delete(z),jn(P);return}else{let z=y.get(P.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(jn(P),G)if(P.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==re.ParameterStructures.byName&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(P.params)){let z=P.params;P.method===Mu.type.method&&z.length===2&&kA.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===re.ParameterStructures.byName&&i.error(`Notification ${P.method} defines parameters by name but received parameters by position`),x.numberOfParams!==P.params.length&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===re.ParameterStructures.byPosition&&i.error(`Notification ${P.method} defines parameters by position but received parameters by name`),G(P.params);else f&&f(P.method,P.params)}catch(z){z.message?i.error(`Notification handler '${P.method}' failed with message: ${z.message}`):i.error(`Notification handler '${P.method}' failed unexpectedly.`)}else Ee.fire(P)}function Ou(P){if(!P){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(P,null,4)}`);let x=P;if(xt.string(x.id)||xt.number(x.id)){let G=x.id,z=w.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function gt(P){if(P!=null)switch(S){case De.Verbose:return JSON.stringify(P,null,4);case De.Compact:return JSON.stringify(P);default:return}}function gi(P){if(!(S===De.Off||!F))if(O===gn.Text){let x;(S===De.Verbose||S===De.Compact)&&P.params&&(x=`Params: ${gt(P.params)}

`),F.log(`Sending request '${P.method} - (${P.id})'.`,x)}else Kr("send-request",P)}function Iu(P){if(!(S===De.Off||!F))if(O===gn.Text){let x;(S===De.Verbose||S===De.Compact)&&(P.params?x=`Params: ${gt(P.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${P.method}'.`,x)}else Kr("send-notification",P)}function Fn(P,x,G){if(!(S===De.Off||!F))if(O===gn.Text){let z;(S===De.Verbose||S===De.Compact)&&(P.error&&P.error.data?z=`Error data: ${gt(P.error.data)}

`:P.result?z=`Result: ${gt(P.result)}

`:P.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${P.id})'. Processing request took ${Date.now()-G}ms`,z)}else Kr("send-response",P)}function ja(P){if(!(S===De.Off||!F))if(O===gn.Text){let x;(S===De.Verbose||S===De.Compact)&&P.params&&(x=`Params: ${gt(P.params)}

`),F.log(`Received request '${P.method} - (${P.id})'.`,x)}else Kr("receive-request",P)}function jn(P){if(!(S===De.Off||!F||P.method===jh.type.method))if(O===gn.Text){let x;(S===De.Verbose||S===De.Compact)&&(P.params?x=`Params: ${gt(P.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${P.method}'.`,x)}else Kr("receive-notification",P)}function Ga(P,x){if(!(S===De.Off||!F))if(O===gn.Text){let G;if((S===De.Verbose||S===De.Compact)&&(P.error&&P.error.data?G=`Error data: ${gt(P.error.data)}

`:P.result?G=`Result: ${gt(P.result)}

`:P.error===void 0&&(G=`No result returned.

`)),x){let z=P.error?` Request failed: ${P.error.message} (${P.error.code}).`:"";F.log(`Received response '${x.method} - (${P.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${P.id} without active response promise.`,G)}else Kr("receive-response",P)}function Kr(P,x){if(!F||S===De.Off)return;let G={isLSPMessage:!0,type:P,message:x,timestamp:Date.now()};F.log(G)}function dn(){if(Z())throw new Qi($c.Closed,"Connection is closed.");if(dt())throw new Qi($c.Disposed,"Connection is disposed.")}function Do(){if(oe())throw new Qi($c.AlreadyListening,"Connection is already listening")}function xo(){if(!oe())throw new Error("Call listen() first.")}function xr(P){return P===void 0?null:P}function Gn(P){if(P!==null)return P}function qt(P){return P!=null&&!Array.isArray(P)&&typeof P=="object"}function pn(P,x){switch(P){case re.ParameterStructures.auto:return qt(x)?Gn(x):[xr(x)];case re.ParameterStructures.byName:if(!qt(x))throw new Error("Received parameters by name but param is not an object literal.");return Gn(x);case re.ParameterStructures.byPosition:return[xr(x)];default:throw new Error(`Unknown parameter structure ${P.toString()}`)}}function mn(P,x){let G,z=P.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=pn(P.parameterStructures,x[0]);break;default:G=[];for(let je=0;je<x.length&&je<z;je++)G.push(xr(x[je]));if(x.length<z)for(let je=x.length;je<z;je++)G.push(null);break}return G}let Un={sendNotification:(P,...x)=>{dn();let G,z;if(xt.string(P)){G=P;let Ge=x[0],rt=0,Rt=re.ParameterStructures.auto;re.ParameterStructures.is(Ge)&&(rt=1,Rt=Ge);let ge=x.length,Be=ge-rt;switch(Be){case 0:z=void 0;break;case 1:z=pn(Rt,x[rt]);break;default:if(Rt===re.ParameterStructures.byName)throw new Error(`Received ${Be} parameters for 'by Name' notification parameter structure.`);z=x.slice(rt,ge).map(_e=>xr(_e));break}}else{let Ge=x;G=P.method,z=mn(P,Ge)}let je={jsonrpc:u,method:G,params:z};return Iu(je),e.write(je).catch(()=>i.error("Sending notification failed."))},onNotification:(P,x)=>{dn();let G;return xt.func(P)?f=P:x&&(xt.string(P)?(G=P,y.set(P,{type:void 0,handler:x})):(G=P.method,y.set(P.method,{type:P,handler:x}))),{dispose:()=>{G!==void 0?y.delete(G):f=void 0}}},onProgress:(P,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(P,x,G)=>Un.sendNotification(Mu.type,{token:x,value:G}),onUnhandledProgress:Qe.event,sendRequest:(P,...x)=>{dn(),xo();let G,z,je;if(xt.string(P)){G=P;let ge=x[0],Be=x[x.length-1],_e=0,vt=re.ParameterStructures.auto;re.ParameterStructures.is(ge)&&(_e=1,vt=ge);let tr=x.length;qh.CancellationToken.is(Be)&&(tr=tr-1,je=Be);let vi=tr-_e;switch(vi){case 0:z=void 0;break;case 1:z=pn(vt,x[_e]);break;default:if(vt===re.ParameterStructures.byName)throw new Error(`Received ${vi} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,tr).map(Hn=>xr(Hn));break}}else{let ge=x;G=P.method,z=mn(P,ge);let Be=P.numberOfParams;je=qh.CancellationToken.is(ge[Be])?ge[Be]:void 0}let Ge=a++,rt;return je&&(rt=je.onCancellationRequested(()=>{let ge=fe.sender.sendCancellation(Un,Ge);return ge===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Ge}`),Promise.resolve()):ge.catch(()=>{i.log(`Sending cancellation messages for id ${Ge} failed`)})})),new Promise((ge,Be)=>{let _e={jsonrpc:u,id:Ge,method:G,params:z},vt=Hn=>{ge(Hn),fe.sender.cleanup(Ge),rt?.dispose()},tr=Hn=>{Be(Hn),fe.sender.cleanup(Ge),rt?.dispose()},vi={method:G,timerStart:Date.now(),resolve:vt,reject:tr};gi(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(Hn){vi.reject(new re.ResponseError(re.ErrorCodes.MessageWriteError,Hn.message?Hn.message:"Unknown reason")),vi=null}vi&&w.set(Ge,vi)})},onRequest:(P,x)=>{dn();let G=null;return Fh.is(P)?(G=void 0,l=P):xt.string(P)?(G=null,x!==void 0&&(G=P,c.set(P,{handler:x,type:void 0}))):x!==void 0&&(G=P.method,c.set(P.method,{type:P,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>w.size>0,trace:async(P,x,G)=>{let z=!1,je=gn.Text;G!==void 0&&(xt.boolean(G)?z=G:(z=G.sendNotification||!1,je=G.traceFormat||gn.Text)),S=P,O=je,S===De.Off?F=void 0:F=x,z&&!Z()&&!dt()&&await Un.sendNotification(wA.type,{value:De.toString(P)})},onError:te.event,onClose:we.event,onUnhandledNotification:Ee.event,onDispose:V.event,end:()=>{e.end()},dispose:()=>{if(dt())return;W=vn.Disposed,V.fire(void 0);let P=new re.ResponseError(re.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of w.values())x.reject(P);w=new Map,b=new Map,C=new Set,A=new CA.LinkedMap,xt.func(e.dispose)&&e.dispose(),xt.func(t.dispose)&&t.dispose()},listen:()=>{dn(),Do(),W=vn.Listening,t.listen(dr)},inspect:()=>{(0,PA.default)().console.log("inspect")}};return Un.onNotification(jh.type,P=>{if(S===De.Off||!F)return;let x=S===De.Verbose||S===De.Compact;F.log(P.message,x?P.verbose:void 0)}),Un.onNotification(Mu.type,P=>{let x=v.get(P.token);x?x(P.value):Qe.fire(P)}),Un}ee.createMessageConnection=$F});var Vh=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var ze=Sh();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return ze.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return ze.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return ze.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return ze.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return ze.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return ze.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return ze.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return ze.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return ze.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return ze.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return ze.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return ze.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return ze.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return ze.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return ze.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return ze.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return ze.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return ze.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return ze.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return ze.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return ze.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return ze.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return ze.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return ze.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return ze.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return ze.ParameterStructures}});var Kh=Ph();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Kh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Kh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Kh.Touch}});var OF=zm();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return OF.Disposable}});var $A=Ha();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return $A.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return $A.Emitter}});var OA=Eh();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return OA.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return OA.CancellationToken}});var Wh=TA();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return Wh.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return Wh.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Wh.ReadableStreamMessageReader}});var Bh=bA();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Bh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Bh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Bh.WriteableStreamMessageWriter}});var nr=NA();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var IF=_i();I.RAL=IF.default});var bi=d(Lr=>{"use strict";var DF=Lr&&Lr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),xF=Lr&&Lr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&DF(e,t,r)};Object.defineProperty(Lr,"__esModule",{value:!0});Lr.createMessageConnection=Lr.BrowserMessageWriter=Lr.BrowserMessageReader=void 0;var LF=mA();LF.default.install();var Uo=Vh();xF(Vh(),Lr);var zh=class extends Uo.AbstractMessageReader{constructor(e){super(),this._onData=new Uo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Lr.BrowserMessageReader=zh;var Yh=class extends Uo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Lr.BrowserMessageWriter=Yh;function qF(t,e,r,n){return r===void 0&&(r=Uo.NullLogger),Uo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Uo.createMessageConnection)(t,e,r,n)}Lr.createMessageConnection=qF});var Xh=d((Eme,IA)=>{"use strict";IA.exports=bi()});var Ho=d((DA,Oc)=>{(function(t){if(typeof Oc=="object"&&typeof Oc.exports=="object"){var e=t(bc,DA);e!==void 0&&(Oc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(E){return typeof E=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(E){return typeof E=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(E){return typeof E=="number"&&g.MIN_VALUE<=E&&E<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(E){return typeof E=="number"&&g.MIN_VALUE<=E&&E<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(R,m){return R===Number.MAX_VALUE&&(R=a.MAX_VALUE),m===Number.MAX_VALUE&&(m=a.MAX_VALUE),{line:R,character:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.line)&&N.uinteger(m.character)}g.is=E})(o=e.Position||(e.Position={}));var s;(function(g){function k(R,m,$,D){if(N.uinteger(R)&&N.uinteger(m)&&N.uinteger($)&&N.uinteger(D))return{start:o.create(R,m),end:o.create($,D)};if(o.is(R)&&o.is(m))return{start:R,end:m};throw new Error("Range#create called with invalid arguments[".concat(R,", ").concat(m,", ").concat($,", ").concat(D,"]"))}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&o.is(m.start)&&o.is(m.end)}g.is=E})(s=e.Range||(e.Range={}));var u;(function(g){function k(R,m){return{uri:R,range:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(N.string(m.uri)||N.undefined(m.uri))}g.is=E})(u=e.Location||(e.Location={}));var l;(function(g){function k(R,m,$,D){return{targetUri:R,targetRange:m,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.targetRange)&&N.string(m.targetUri)&&s.is(m.targetSelectionRange)&&(s.is(m.originSelectionRange)||N.undefined(m.originSelectionRange))}g.is=E})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(R,m,$,D){return{red:R,green:m,blue:$,alpha:D}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.numberRange(m.red,0,1)&&N.numberRange(m.green,0,1)&&N.numberRange(m.blue,0,1)&&N.numberRange(m.alpha,0,1)}g.is=E})(c=e.Color||(e.Color={}));var f;(function(g){function k(R,m){return{range:R,color:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&c.is(m.color)}g.is=E})(f=e.ColorInformation||(e.ColorInformation={}));var y;(function(g){function k(R,m,$){return{label:R,textEdit:m,additionalTextEdits:$}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.undefined(m.textEdit)||F.is(m))&&(N.undefined(m.additionalTextEdits)||N.typedArray(m.additionalTextEdits,F.is))}g.is=E})(y=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var h;(function(g){function k(R,m,$,D,ie,pt){var Ve={startLine:R,endLine:m};return N.defined($)&&(Ve.startCharacter=$),N.defined(D)&&(Ve.endCharacter=D),N.defined(ie)&&(Ve.kind=ie),N.defined(pt)&&(Ve.collapsedText=pt),Ve}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.startLine)&&N.uinteger(m.startLine)&&(N.undefined(m.startCharacter)||N.uinteger(m.startCharacter))&&(N.undefined(m.endCharacter)||N.uinteger(m.endCharacter))&&(N.undefined(m.kind)||N.string(m.kind))}g.is=E})(h=e.FoldingRange||(e.FoldingRange={}));var A;(function(g){function k(R,m){return{location:R,message:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&u.is(m.location)&&N.string(m.message)}g.is=E})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var w;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(w=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(g){g.Unnecessary=1,g.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&N.string(R.href)}g.is=k})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(R,m,$,D,ie,pt){var Ve={range:R,message:m};return N.defined($)&&(Ve.severity=$),N.defined(D)&&(Ve.code=D),N.defined(ie)&&(Ve.source=ie),N.defined(pt)&&(Ve.relatedInformation=pt),Ve}g.create=k;function E(R){var m,$=R;return N.defined($)&&s.is($.range)&&N.string($.message)&&(N.number($.severity)||N.undefined($.severity))&&(N.integer($.code)||N.string($.code)||N.undefined($.code))&&(N.undefined($.codeDescription)||N.string((m=$.codeDescription)===null||m===void 0?void 0:m.href))&&(N.string($.source)||N.undefined($.source))&&(N.undefined($.relatedInformation)||N.typedArray($.relatedInformation,A.is))}g.is=E})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(R,m){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ie={title:R,command:m};return N.defined($)&&$.length>0&&(ie.arguments=$),ie}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.title)&&N.string(m.command)}g.is=E})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function E($,D){return{range:{start:$,end:$},newText:D}}g.insert=E;function R($){return{range:$,newText:""}}g.del=R;function m($){var D=$;return N.objectLiteral(D)&&N.string(D.newText)&&s.is(D.range)}g.is=m})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(R,m,$){var D={label:R};return m!==void 0&&(D.needsConfirmation=m),$!==void 0&&(D.description=$),D}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.boolean(m.needsConfirmation)||m.needsConfirmation===void 0)&&(N.string(m.description)||m.description===void 0)}g.is=E})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var te;(function(g){function k(E){var R=E;return N.string(R)}g.is=k})(te=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var we;(function(g){function k($,D,ie){return{range:$,newText:D,annotationId:ie}}g.replace=k;function E($,D,ie){return{range:{start:$,end:$},newText:D,annotationId:ie}}g.insert=E;function R($,D){return{range:$,newText:"",annotationId:D}}g.del=R;function m($){var D=$;return F.is(D)&&(W.is(D.annotationId)||te.is(D.annotationId))}g.is=m})(we=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ee;(function(g){function k(R,m){return{textDocument:R,edits:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&Z.is(m.textDocument)&&Array.isArray(m.edits)}g.is=E})(Ee=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Qe;(function(g){function k(R,m,$){var D={kind:"create",uri:R};return m!==void 0&&(m.overwrite!==void 0||m.ignoreIfExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function E(R){var m=R;return m&&m.kind==="create"&&N.string(m.uri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(Qe=e.CreateFile||(e.CreateFile={}));var V;(function(g){function k(R,m,$,D){var ie={kind:"rename",oldUri:R,newUri:m};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ie.options=$),D!==void 0&&(ie.annotationId=D),ie}g.create=k;function E(R){var m=R;return m&&m.kind==="rename"&&N.string(m.oldUri)&&N.string(m.newUri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(V=e.RenameFile||(e.RenameFile={}));var fe;(function(g){function k(R,m,$){var D={kind:"delete",uri:R};return m!==void 0&&(m.recursive!==void 0||m.ignoreIfNotExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function E(R){var m=R;return m&&m.kind==="delete"&&N.string(m.uri)&&(m.options===void 0||(m.options.recursive===void 0||N.boolean(m.options.recursive))&&(m.options.ignoreIfNotExists===void 0||N.boolean(m.options.ignoreIfNotExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(fe=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(E){var R=E;return R&&(R.changes!==void 0||R.documentChanges!==void 0)&&(R.documentChanges===void 0||R.documentChanges.every(function(m){return N.string(m.kind)?Qe.is(m)||V.is(m)||fe.is(m):Ee.is(m)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,E){this.edits=k,this.changeAnnotations=E}return g.prototype.insert=function(k,E,R){var m,$;if(R===void 0?m=F.insert(k,E):te.is(R)?($=R,m=we.insert(k,E,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=we.insert(k,E,$)),this.edits.push(m),$!==void 0)return $},g.prototype.replace=function(k,E,R){var m,$;if(R===void 0?m=F.replace(k,E):te.is(R)?($=R,m=we.replace(k,E,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=we.replace(k,E,$)),this.edits.push(m),$!==void 0)return $},g.prototype.delete=function(k,E){var R,m;if(E===void 0?R=F.del(k):te.is(E)?(m=E,R=we.del(k,E)):(this.assertChangeAnnotations(this.changeAnnotations),m=this.changeAnnotations.manage(E),R=we.del(k,m)),this.edits.push(R),m!==void 0)return m},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,E){var R;if(te.is(k)?R=k:(R=this.nextId(),E=k),this._annotations[R]!==void 0)throw new Error("Id ".concat(R," is already in use."));if(E===void 0)throw new Error("No annotation provided for id ".concat(R));return this._annotations[R]=E,this._size++,R},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var E=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(R){if(Ee.is(R)){var m=new L(R.edits,E._changeAnnotations);E._textEditChanges[R.textDocument.uri]=m}})):k.changes&&Object.keys(k.changes).forEach(function(R){var m=new L(k.changes[R]);E._textEditChanges[R]=m})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(Z.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E={uri:k.uri,version:k.version},R=this._textEditChanges[E.uri];if(!R){var m=[],$={textDocument:E,edits:m};this._workspaceEdit.documentChanges.push($),R=new L(m,this._changeAnnotations),this._textEditChanges[E.uri]=R}return R}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var R=this._textEditChanges[k];if(!R){var m=[];this._workspaceEdit.changes[k]=m,R=new L(m),this._textEditChanges[k]=R}return R}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,E,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(E)||te.is(E)?m=E:R=E;var $,D;if(m===void 0?$=Qe.create(k,R):(D=te.is(m)?m:this._changeAnnotations.manage(m),$=Qe.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,E,R,m){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(R)||te.is(R)?$=R:m=R;var D,ie;if($===void 0?D=V.create(k,E,m):(ie=te.is($)?$:this._changeAnnotations.manage($),D=V.create(k,E,m,ie)),this._workspaceEdit.documentChanges.push(D),ie!==void 0)return ie},g.prototype.deleteFile=function(k,E,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(E)||te.is(E)?m=E:R=E;var $,D;if(m===void 0?$=fe.create(k,R):(D=te.is(m)?m:this._changeAnnotations.manage(m),$=fe.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var ae;(function(g){function k(R){return{uri:R}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)}g.is=E})(ae=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var oe;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.integer(m.version)}g.is=E})(oe=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var Z;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&(m.version===null||N.integer(m.version))}g.is=E})(Z=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var dt;(function(g){function k(R,m,$,D){return{uri:R,languageId:m,version:$,text:D}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.string(m.languageId)&&N.integer(m.version)&&N.string(m.text)}g.is=E})(dt=e.TextDocumentItem||(e.TextDocumentItem={}));var tt;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(E){var R=E;return R===g.PlainText||R===g.Markdown}g.is=k})(tt=e.MarkupKind||(e.MarkupKind={}));var Dt;(function(g){function k(E){var R=E;return N.objectLiteral(E)&&tt.is(R.kind)&&N.string(R.value)}g.is=k})(Dt=e.MarkupContent||(e.MarkupContent={}));var fn;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(fn=e.CompletionItemKind||(e.CompletionItemKind={}));var Dr;(function(g){g.PlainText=1,g.Snippet=2})(Dr=e.InsertTextFormat||(e.InsertTextFormat={}));var No;(function(g){g.Deprecated=1})(No=e.CompletionItemTag||(e.CompletionItemTag={}));var dr;(function(g){function k(R,m,$){return{newText:R,insert:m,replace:$}}g.create=k;function E(R){var m=R;return m&&N.string(m.newText)&&s.is(m.insert)&&s.is(m.replace)}g.is=E})(dr=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var $o;(function(g){g.asIs=1,g.adjustIndentation=2})($o=e.InsertTextMode||(e.InsertTextMode={}));var Oo;(function(g){function k(E){var R=E;return R&&(N.string(R.detail)||R.detail===void 0)&&(N.string(R.description)||R.description===void 0)}g.is=k})(Oo=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Io;(function(g){function k(E){return{label:E}}g.create=k})(Io=e.CompletionItem||(e.CompletionItem={}));var Ou;(function(g){function k(E,R){return{items:E||[],isIncomplete:!!R}}g.create=k})(Ou=e.CompletionList||(e.CompletionList={}));var gt;(function(g){function k(R){return R.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function E(R){var m=R;return N.string(m)||N.objectLiteral(m)&&N.string(m.language)&&N.string(m.value)}g.is=E})(gt=e.MarkedString||(e.MarkedString={}));var gi;(function(g){function k(E){var R=E;return!!R&&N.objectLiteral(R)&&(Dt.is(R.contents)||gt.is(R.contents)||N.typedArray(R.contents,gt.is))&&(E.range===void 0||s.is(E.range))}g.is=k})(gi=e.Hover||(e.Hover={}));var Iu;(function(g){function k(E,R){return R?{label:E,documentation:R}:{label:E}}g.create=k})(Iu=e.ParameterInformation||(e.ParameterInformation={}));var Fn;(function(g){function k(E,R){for(var m=[],$=2;$<arguments.length;$++)m[$-2]=arguments[$];var D={label:E};return N.defined(R)&&(D.documentation=R),N.defined(m)?D.parameters=m:D.parameters=[],D}g.create=k})(Fn=e.SignatureInformation||(e.SignatureInformation={}));var ja;(function(g){g.Text=1,g.Read=2,g.Write=3})(ja=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var jn;(function(g){function k(E,R){var m={range:E};return N.number(R)&&(m.kind=R),m}g.create=k})(jn=e.DocumentHighlight||(e.DocumentHighlight={}));var Ga;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(Ga=e.SymbolKind||(e.SymbolKind={}));var Kr;(function(g){g.Deprecated=1})(Kr=e.SymbolTag||(e.SymbolTag={}));var dn;(function(g){function k(E,R,m,$,D){var ie={name:E,kind:R,location:{uri:$,range:m}};return D&&(ie.containerName=D),ie}g.create=k})(dn=e.SymbolInformation||(e.SymbolInformation={}));var Do;(function(g){function k(E,R,m,$){return $!==void 0?{name:E,kind:R,location:{uri:m,range:$}}:{name:E,kind:R,location:{uri:m}}}g.create=k})(Do=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var xo;(function(g){function k(R,m,$,D,ie,pt){var Ve={name:R,detail:m,kind:$,range:D,selectionRange:ie};return pt!==void 0&&(Ve.children=pt),Ve}g.create=k;function E(R){var m=R;return m&&N.string(m.name)&&N.number(m.kind)&&s.is(m.range)&&s.is(m.selectionRange)&&(m.detail===void 0||N.string(m.detail))&&(m.deprecated===void 0||N.boolean(m.deprecated))&&(m.children===void 0||Array.isArray(m.children))&&(m.tags===void 0||Array.isArray(m.tags))}g.is=E})(xo=e.DocumentSymbol||(e.DocumentSymbol={}));var xr;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(xr=e.CodeActionKind||(e.CodeActionKind={}));var Gn;(function(g){g.Invoked=1,g.Automatic=2})(Gn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var qt;(function(g){function k(R,m,$){var D={diagnostics:R};return m!=null&&(D.only=m),$!=null&&(D.triggerKind=$),D}g.create=k;function E(R){var m=R;return N.defined(m)&&N.typedArray(m.diagnostics,S.is)&&(m.only===void 0||N.typedArray(m.only,N.string))&&(m.triggerKind===void 0||m.triggerKind===Gn.Invoked||m.triggerKind===Gn.Automatic)}g.is=E})(qt=e.CodeActionContext||(e.CodeActionContext={}));var pn;(function(g){function k(R,m,$){var D={title:R},ie=!0;return typeof m=="string"?(ie=!1,D.kind=m):O.is(m)?D.command=m:D.edit=m,ie&&$!==void 0&&(D.kind=$),D}g.create=k;function E(R){var m=R;return m&&N.string(m.title)&&(m.diagnostics===void 0||N.typedArray(m.diagnostics,S.is))&&(m.kind===void 0||N.string(m.kind))&&(m.edit!==void 0||m.command!==void 0)&&(m.command===void 0||O.is(m.command))&&(m.isPreferred===void 0||N.boolean(m.isPreferred))&&(m.edit===void 0||q.is(m.edit))}g.is=E})(pn=e.CodeAction||(e.CodeAction={}));var mn;(function(g){function k(R,m){var $={range:R};return N.defined(m)&&($.data=m),$}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.command)||O.is(m.command))}g.is=E})(mn=e.CodeLens||(e.CodeLens={}));var Un;(function(g){function k(R,m){return{tabSize:R,insertSpaces:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.uinteger(m.tabSize)&&N.boolean(m.insertSpaces)}g.is=E})(Un=e.FormattingOptions||(e.FormattingOptions={}));var P;(function(g){function k(R,m,$){return{range:R,target:m,data:$}}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.target)||N.string(m.target))}g.is=E})(P=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(R,m){return{range:R,parent:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(m.parent===void 0||g.is(m.parent))}g.is=E})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var je;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&(R.resultId===void 0||typeof R.resultId=="string")&&Array.isArray(R.data)&&(R.data.length===0||typeof R.data[0]=="number")}g.is=k})(je=e.SemanticTokens||(e.SemanticTokens={}));var Ge;(function(g){function k(R,m){return{range:R,text:m}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&N.string(m.text)}g.is=E})(Ge=e.InlineValueText||(e.InlineValueText={}));var rt;(function(g){function k(R,m,$){return{range:R,variableName:m,caseSensitiveLookup:$}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&N.boolean(m.caseSensitiveLookup)&&(N.string(m.variableName)||m.variableName===void 0)}g.is=E})(rt=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var Rt;(function(g){function k(R,m){return{range:R,expression:m}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&(N.string(m.expression)||m.expression===void 0)}g.is=E})(Rt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ge;(function(g){function k(R,m){return{frameId:R,stoppedLocation:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(R.stoppedLocation)}g.is=E})(ge=e.InlineValueContext||(e.InlineValueContext={}));var Be;(function(g){g.Type=1,g.Parameter=2;function k(E){return E===1||E===2}g.is=k})(Be=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function k(R){return{value:R}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&(m.tooltip===void 0||N.string(m.tooltip)||Dt.is(m.tooltip))&&(m.location===void 0||u.is(m.location))&&(m.command===void 0||O.is(m.command))}g.is=E})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var vt;(function(g){function k(R,m,$){var D={position:R,label:m};return $!==void 0&&(D.kind=$),D}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&o.is(m.position)&&(N.string(m.label)||N.typedArray(m.label,_e.is))&&(m.kind===void 0||Be.is(m.kind))&&m.textEdits===void 0||N.typedArray(m.textEdits,F.is)&&(m.tooltip===void 0||N.string(m.tooltip)||Dt.is(m.tooltip))&&(m.paddingLeft===void 0||N.boolean(m.paddingLeft))&&(m.paddingRight===void 0||N.boolean(m.paddingRight))}g.is=E})(vt=e.InlayHint||(e.InlayHint={}));var tr;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&n.is(R.uri)&&N.string(R.name)}g.is=k})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var vi;(function(g){function k($,D,ie,pt){return new Hn($,D,ie,pt)}g.create=k;function E($){var D=$;return!!(N.defined(D)&&N.string(D.uri)&&(N.undefined(D.languageId)||N.string(D.languageId))&&N.uinteger(D.lineCount)&&N.func(D.getText)&&N.func(D.positionAt)&&N.func(D.offsetAt))}g.is=E;function R($,D){for(var ie=$.getText(),pt=m(D,function(Lo,Sc){var cA=Lo.range.start.line-Sc.range.start.line;return cA===0?Lo.range.start.character-Sc.range.start.character:cA}),Ve=ie.length,hn=pt.length-1;hn>=0;hn--){var yn=pt[hn],Ti=$.offsetAt(yn.range.start),ve=$.offsetAt(yn.range.end);if(ve<=Ve)ie=ie.substring(0,Ti)+yn.newText+ie.substring(ve,ie.length);else throw new Error("Overlapping edit");Ve=Ti}return ie}g.applyEdits=R;function m($,D){if($.length<=1)return $;var ie=$.length/2|0,pt=$.slice(0,ie),Ve=$.slice(ie);m(pt,D),m(Ve,D);for(var hn=0,yn=0,Ti=0;hn<pt.length&&yn<Ve.length;){var ve=D(pt[hn],Ve[yn]);ve<=0?$[Ti++]=pt[hn++]:$[Ti++]=Ve[yn++]}for(;hn<pt.length;)$[Ti++]=pt[hn++];for(;yn<Ve.length;)$[Ti++]=Ve[yn++];return $}})(vi=e.TextDocument||(e.TextDocument={}));var Hn=function(){function g(k,E,R,m){this._uri=k,this._languageId=E,this._version=R,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var E=this.offsetAt(k.start),R=this.offsetAt(k.end);return this._content.substring(E,R)}return this._content},g.prototype.update=function(k,E){this._content=k.text,this._version=E,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],E=this._content,R=!0,m=0;m<E.length;m++){R&&(k.push(m),R=!1);var $=E.charAt(m);R=$==="\r"||$===`
`,$==="\r"&&m+1<E.length&&E.charAt(m+1)===`
`&&m++}R&&E.length>0&&k.push(E.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var E=this.getLineOffsets(),R=0,m=E.length;if(m===0)return o.create(0,k);for(;R<m;){var $=Math.floor((R+m)/2);E[$]>k?m=$:R=$+1}var D=R-1;return o.create(D,k-E[D])},g.prototype.offsetAt=function(k){var E=this.getLineOffsets();if(k.line>=E.length)return this._content.length;if(k.line<0)return 0;var R=E[k.line],m=k.line+1<E.length?E[k.line+1]:this._content.length;return Math.max(Math.min(R+k.character,m),R)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),N;(function(g){var k=Object.prototype.toString;function E(ve){return typeof ve<"u"}g.defined=E;function R(ve){return typeof ve>"u"}g.undefined=R;function m(ve){return ve===!0||ve===!1}g.boolean=m;function $(ve){return k.call(ve)==="[object String]"}g.string=$;function D(ve){return k.call(ve)==="[object Number]"}g.number=D;function ie(ve,Lo,Sc){return k.call(ve)==="[object Number]"&&Lo<=ve&&ve<=Sc}g.numberRange=ie;function pt(ve){return k.call(ve)==="[object Number]"&&-2147483648<=ve&&ve<=2147483647}g.integer=pt;function Ve(ve){return k.call(ve)==="[object Number]"&&0<=ve&&ve<=2147483647}g.uinteger=Ve;function hn(ve){return k.call(ve)==="[object Function]"}g.func=hn;function yn(ve){return ve!==null&&typeof ve=="object"}g.objectLiteral=yn;function Ti(ve,Lo){return Array.isArray(ve)&&ve.every(Lo)}g.typedArray=Ti})(N||(N={}))})});var ct=d(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.ProtocolNotificationType=mr.ProtocolNotificationType0=mr.ProtocolRequestType=mr.ProtocolRequestType0=mr.RegistrationType=mr.MessageDirection=void 0;var Ko=bi(),MF;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(MF=mr.MessageDirection||(mr.MessageDirection={}));var Jh=class{constructor(e){this.method=e}};mr.RegistrationType=Jh;var Qh=class extends Ko.RequestType0{constructor(e){super(e)}};mr.ProtocolRequestType0=Qh;var Zh=class extends Ko.RequestType{constructor(e){super(e,Ko.ParameterStructures.byName)}};mr.ProtocolRequestType=Zh;var ey=class extends Ko.NotificationType0{constructor(e){super(e)}};mr.ProtocolNotificationType0=ey;var ty=class extends Ko.NotificationType{constructor(e){super(e,Ko.ParameterStructures.byName)}};mr.ProtocolNotificationType=ty});var Ic=d(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.objectLiteral=At.typedArray=At.stringArray=At.array=At.func=At.error=At.number=At.string=At.boolean=void 0;function FF(t){return t===!0||t===!1}At.boolean=FF;function xA(t){return typeof t=="string"||t instanceof String}At.string=xA;function jF(t){return typeof t=="number"||t instanceof Number}At.number=jF;function GF(t){return t instanceof Error}At.error=GF;function UF(t){return typeof t=="function"}At.func=UF;function LA(t){return Array.isArray(t)}At.array=LA;function HF(t){return LA(t)&&t.every(e=>xA(e))}At.stringArray=HF;function KF(t,e){return Array.isArray(t)&&t.every(e)}At.typedArray=KF;function WF(t){return t!==null&&typeof t=="object"}At.objectLiteral=WF});var MA=d(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.ImplementationRequest=void 0;var qA=ct(),BF;(function(t){t.method="textDocument/implementation",t.messageDirection=qA.MessageDirection.clientToServer,t.type=new qA.ProtocolRequestType(t.method)})(BF=ju.ImplementationRequest||(ju.ImplementationRequest={}))});var jA=d(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.TypeDefinitionRequest=void 0;var FA=ct(),VF;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=FA.MessageDirection.clientToServer,t.type=new FA.ProtocolRequestType(t.method)})(VF=Gu.TypeDefinitionRequest||(Gu.TypeDefinitionRequest={}))});var GA=d(Zi=>{"use strict";Object.defineProperty(Zi,"__esModule",{value:!0});Zi.DidChangeWorkspaceFoldersNotification=Zi.WorkspaceFoldersRequest=void 0;var Dc=ct(),zF;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Dc.MessageDirection.serverToClient,t.type=new Dc.ProtocolRequestType0(t.method)})(zF=Zi.WorkspaceFoldersRequest||(Zi.WorkspaceFoldersRequest={}));var YF;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Dc.MessageDirection.clientToServer,t.type=new Dc.ProtocolNotificationType(t.method)})(YF=Zi.DidChangeWorkspaceFoldersNotification||(Zi.DidChangeWorkspaceFoldersNotification={}))});var HA=d(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.ConfigurationRequest=void 0;var UA=ct(),XF;(function(t){t.method="workspace/configuration",t.messageDirection=UA.MessageDirection.serverToClient,t.type=new UA.ProtocolRequestType(t.method)})(XF=Uu.ConfigurationRequest||(Uu.ConfigurationRequest={}))});var KA=d(ea=>{"use strict";Object.defineProperty(ea,"__esModule",{value:!0});ea.ColorPresentationRequest=ea.DocumentColorRequest=void 0;var xc=ct(),JF;(function(t){t.method="textDocument/documentColor",t.messageDirection=xc.MessageDirection.clientToServer,t.type=new xc.ProtocolRequestType(t.method)})(JF=ea.DocumentColorRequest||(ea.DocumentColorRequest={}));var QF;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=xc.MessageDirection.clientToServer,t.type=new xc.ProtocolRequestType(t.method)})(QF=ea.ColorPresentationRequest||(ea.ColorPresentationRequest={}))});var BA=d(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.FoldingRangeRequest=void 0;var WA=ct(),ZF;(function(t){t.method="textDocument/foldingRange",t.messageDirection=WA.MessageDirection.clientToServer,t.type=new WA.ProtocolRequestType(t.method)})(ZF=Hu.FoldingRangeRequest||(Hu.FoldingRangeRequest={}))});var zA=d(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.DeclarationRequest=void 0;var VA=ct(),ej;(function(t){t.method="textDocument/declaration",t.messageDirection=VA.MessageDirection.clientToServer,t.type=new VA.ProtocolRequestType(t.method)})(ej=Ku.DeclarationRequest||(Ku.DeclarationRequest={}))});var XA=d(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.SelectionRangeRequest=void 0;var YA=ct(),tj;(function(t){t.method="textDocument/selectionRange",t.messageDirection=YA.MessageDirection.clientToServer,t.type=new YA.ProtocolRequestType(t.method)})(tj=Wu.SelectionRangeRequest||(Wu.SelectionRangeRequest={}))});var JA=d(Tn=>{"use strict";Object.defineProperty(Tn,"__esModule",{value:!0});Tn.WorkDoneProgressCancelNotification=Tn.WorkDoneProgressCreateRequest=Tn.WorkDoneProgress=void 0;var rj=bi(),Lc=ct(),nj;(function(t){t.type=new rj.ProgressType;function e(r){return r===t.type}t.is=e})(nj=Tn.WorkDoneProgress||(Tn.WorkDoneProgress={}));var ij;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Lc.MessageDirection.serverToClient,t.type=new Lc.ProtocolRequestType(t.method)})(ij=Tn.WorkDoneProgressCreateRequest||(Tn.WorkDoneProgressCreateRequest={}));var aj;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Lc.MessageDirection.clientToServer,t.type=new Lc.ProtocolNotificationType(t.method)})(aj=Tn.WorkDoneProgressCancelNotification||(Tn.WorkDoneProgressCancelNotification={}))});var QA=d(_n=>{"use strict";Object.defineProperty(_n,"__esModule",{value:!0});_n.CallHierarchyOutgoingCallsRequest=_n.CallHierarchyIncomingCallsRequest=_n.CallHierarchyPrepareRequest=void 0;var Wo=ct(),oj;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(oj=_n.CallHierarchyPrepareRequest||(_n.CallHierarchyPrepareRequest={}));var sj;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(sj=_n.CallHierarchyIncomingCallsRequest||(_n.CallHierarchyIncomingCallsRequest={}));var uj;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(uj=_n.CallHierarchyOutgoingCallsRequest||(_n.CallHierarchyOutgoingCallsRequest={}))});var ZA=d(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Pi=ct(),lj;(function(t){t.Relative="relative"})(lj=St.TokenFormat||(St.TokenFormat={}));var qc;(function(t){t.method="textDocument/semanticTokens",t.type=new Pi.RegistrationType(t.method)})(qc=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var cj;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=qc.method})(cj=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var fj;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=qc.method})(fj=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var dj;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=qc.method})(dj=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var pj;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType0(t.method)})(pj=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var t0=d(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.ShowDocumentRequest=void 0;var e0=ct(),mj;(function(t){t.method="window/showDocument",t.messageDirection=e0.MessageDirection.serverToClient,t.type=new e0.ProtocolRequestType(t.method)})(mj=Bu.ShowDocumentRequest||(Bu.ShowDocumentRequest={}))});var n0=d(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.LinkedEditingRangeRequest=void 0;var r0=ct(),hj;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=r0.MessageDirection.clientToServer,t.type=new r0.ProtocolRequestType(t.method)})(hj=Vu.LinkedEditingRangeRequest||(Vu.LinkedEditingRangeRequest={}))});var i0=d(ft=>{"use strict";Object.defineProperty(ft,"__esModule",{value:!0});ft.WillDeleteFilesRequest=ft.DidDeleteFilesNotification=ft.DidRenameFilesNotification=ft.WillRenameFilesRequest=ft.DidCreateFilesNotification=ft.WillCreateFilesRequest=ft.FileOperationPatternKind=void 0;var Wr=ct(),yj;(function(t){t.file="file",t.folder="folder"})(yj=ft.FileOperationPatternKind||(ft.FileOperationPatternKind={}));var gj;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolRequestType(t.method)})(gj=ft.WillCreateFilesRequest||(ft.WillCreateFilesRequest={}));var vj;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolNotificationType(t.method)})(vj=ft.DidCreateFilesNotification||(ft.DidCreateFilesNotification={}));var Tj;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolRequestType(t.method)})(Tj=ft.WillRenameFilesRequest||(ft.WillRenameFilesRequest={}));var _j;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolNotificationType(t.method)})(_j=ft.DidRenameFilesNotification||(ft.DidRenameFilesNotification={}));var Rj;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolNotificationType(t.method)})(Rj=ft.DidDeleteFilesNotification||(ft.DidDeleteFilesNotification={}));var Aj;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Wr.MessageDirection.clientToServer,t.type=new Wr.ProtocolRequestType(t.method)})(Aj=ft.WillDeleteFilesRequest||(ft.WillDeleteFilesRequest={}))});var o0=d(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.MonikerRequest=Rn.MonikerKind=Rn.UniquenessLevel=void 0;var a0=ct(),Sj;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Sj=Rn.UniquenessLevel||(Rn.UniquenessLevel={}));var bj;(function(t){t.$import="import",t.$export="export",t.local="local"})(bj=Rn.MonikerKind||(Rn.MonikerKind={}));var Pj;(function(t){t.method="textDocument/moniker",t.messageDirection=a0.MessageDirection.clientToServer,t.type=new a0.ProtocolRequestType(t.method)})(Pj=Rn.MonikerRequest||(Rn.MonikerRequest={}))});var s0=d(An=>{"use strict";Object.defineProperty(An,"__esModule",{value:!0});An.TypeHierarchySubtypesRequest=An.TypeHierarchySupertypesRequest=An.TypeHierarchyPrepareRequest=void 0;var Bo=ct(),Cj;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(Cj=An.TypeHierarchyPrepareRequest||(An.TypeHierarchyPrepareRequest={}));var kj;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(kj=An.TypeHierarchySupertypesRequest||(An.TypeHierarchySupertypesRequest={}));var wj;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(wj=An.TypeHierarchySubtypesRequest||(An.TypeHierarchySubtypesRequest={}))});var u0=d(ta=>{"use strict";Object.defineProperty(ta,"__esModule",{value:!0});ta.InlineValueRefreshRequest=ta.InlineValueRequest=void 0;var Mc=ct(),Ej;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Mc.MessageDirection.clientToServer,t.type=new Mc.ProtocolRequestType(t.method)})(Ej=ta.InlineValueRequest||(ta.InlineValueRequest={}));var Nj;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Mc.MessageDirection.clientToServer,t.type=new Mc.ProtocolRequestType0(t.method)})(Nj=ta.InlineValueRefreshRequest||(ta.InlineValueRefreshRequest={}))});var l0=d(Sn=>{"use strict";Object.defineProperty(Sn,"__esModule",{value:!0});Sn.InlayHintRefreshRequest=Sn.InlayHintResolveRequest=Sn.InlayHintRequest=void 0;var Vo=ct(),$j;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})($j=Sn.InlayHintRequest||(Sn.InlayHintRequest={}));var Oj;(function(t){t.method="inlayHint/resolve",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(Oj=Sn.InlayHintResolveRequest||(Sn.InlayHintResolveRequest={}));var Ij;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType0(t.method)})(Ij=Sn.InlayHintRefreshRequest||(Sn.InlayHintRefreshRequest={}))});var f0=d(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});Vt.DiagnosticRefreshRequest=Vt.WorkspaceDiagnosticRequest=Vt.DocumentDiagnosticRequest=Vt.DocumentDiagnosticReportKind=Vt.DiagnosticServerCancellationData=void 0;var c0=bi(),Dj=Ic(),zo=ct(),xj;(function(t){function e(r){let n=r;return n&&Dj.boolean(n.retriggerRequest)}t.is=e})(xj=Vt.DiagnosticServerCancellationData||(Vt.DiagnosticServerCancellationData={}));var Lj;(function(t){t.Full="full",t.Unchanged="unchanged"})(Lj=Vt.DocumentDiagnosticReportKind||(Vt.DocumentDiagnosticReportKind={}));var qj;(function(t){t.method="textDocument/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new c0.ProgressType})(qj=Vt.DocumentDiagnosticRequest||(Vt.DocumentDiagnosticRequest={}));var Mj;(function(t){t.method="workspace/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new c0.ProgressType})(Mj=Vt.WorkspaceDiagnosticRequest||(Vt.WorkspaceDiagnosticRequest={}));var Fj;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType0(t.method)})(Fj=Vt.DiagnosticRefreshRequest||(Vt.DiagnosticRefreshRequest={}))});var m0=d(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.DidCloseNotebookDocumentNotification=Ae.DidSaveNotebookDocumentNotification=Ae.DidChangeNotebookDocumentNotification=Ae.NotebookCellArrayChange=Ae.DidOpenNotebookDocumentNotification=Ae.NotebookDocumentSyncRegistrationType=Ae.NotebookDocument=Ae.NotebookCell=Ae.ExecutionSummary=Ae.NotebookCellKind=void 0;var zu=Ho(),bn=Ic(),Kn=ct(),d0;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(d0=Ae.NotebookCellKind||(Ae.NotebookCellKind={}));var p0;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return bn.objectLiteral(a)&&zu.uinteger.is(a.executionOrder)&&(a.success===void 0||bn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(p0=Ae.ExecutionSummary||(Ae.ExecutionSummary={}));var ry;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return bn.objectLiteral(o)&&d0.is(o.kind)&&zu.DocumentUri.is(o.document)&&(o.metadata===void 0||bn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!p0.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(bn.objectLiteral(a)&&bn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let y=l[f];if(!i(a[y],o[y]))return!1}}return!0}})(ry=Ae.NotebookCell||(Ae.NotebookCell={}));var jj;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return bn.objectLiteral(i)&&bn.string(i.uri)&&zu.integer.is(i.version)&&bn.typedArray(i.cells,ry.is)}t.is=r})(jj=Ae.NotebookDocument||(Ae.NotebookDocument={}));var Yu;(function(t){t.method="notebookDocument/sync",t.messageDirection=Kn.MessageDirection.clientToServer,t.type=new Kn.RegistrationType(t.method)})(Yu=Ae.NotebookDocumentSyncRegistrationType||(Ae.NotebookDocumentSyncRegistrationType={}));var Gj;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Kn.MessageDirection.clientToServer,t.type=new Kn.ProtocolNotificationType(t.method),t.registrationMethod=Yu.method})(Gj=Ae.DidOpenNotebookDocumentNotification||(Ae.DidOpenNotebookDocumentNotification={}));var Uj;(function(t){function e(n){let i=n;return bn.objectLiteral(i)&&zu.uinteger.is(i.start)&&zu.uinteger.is(i.deleteCount)&&(i.cells===void 0||bn.typedArray(i.cells,ry.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(Uj=Ae.NotebookCellArrayChange||(Ae.NotebookCellArrayChange={}));var Hj;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Kn.MessageDirection.clientToServer,t.type=new Kn.ProtocolNotificationType(t.method),t.registrationMethod=Yu.method})(Hj=Ae.DidChangeNotebookDocumentNotification||(Ae.DidChangeNotebookDocumentNotification={}));var Kj;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Kn.MessageDirection.clientToServer,t.type=new Kn.ProtocolNotificationType(t.method),t.registrationMethod=Yu.method})(Kj=Ae.DidSaveNotebookDocumentNotification||(Ae.DidSaveNotebookDocumentNotification={}));var Wj;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Kn.MessageDirection.clientToServer,t.type=new Kn.ProtocolNotificationType(t.method),t.registrationMethod=Yu.method})(Wj=Ae.DidCloseNotebookDocumentNotification||(Ae.DidCloseNotebookDocumentNotification={}))});var S0=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=ct(),h0=Ho(),zt=Ic(),Bj=MA();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return Bj.ImplementationRequest}});var Vj=jA();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return Vj.TypeDefinitionRequest}});var y0=GA();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return y0.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return y0.DidChangeWorkspaceFoldersNotification}});var zj=HA();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return zj.ConfigurationRequest}});var g0=KA();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return g0.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return g0.ColorPresentationRequest}});var Yj=BA();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return Yj.FoldingRangeRequest}});var Xj=zA();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return Xj.DeclarationRequest}});var Jj=XA();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return Jj.SelectionRangeRequest}});var ny=JA();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return ny.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return ny.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return ny.WorkDoneProgressCancelNotification}});var iy=QA();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return iy.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return iy.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return iy.CallHierarchyPrepareRequest}});var Yo=ZA();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return Yo.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Yo.SemanticTokensRegistrationType}});var Qj=t0();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return Qj.ShowDocumentRequest}});var Zj=n0();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return Zj.LinkedEditingRangeRequest}});var Ba=i0();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return Ba.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Ba.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Ba.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Ba.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Ba.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Ba.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Ba.WillDeleteFilesRequest}});var ay=o0();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return ay.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return ay.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return ay.MonikerRequest}});var oy=s0();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return oy.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return oy.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return oy.TypeHierarchySupertypesRequest}});var v0=u0();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return v0.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return v0.InlineValueRefreshRequest}});var sy=l0();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return sy.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return sy.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return sy.InlayHintRefreshRequest}});var Xu=f0();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Xu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Xu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Xu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Xu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Xu.DiagnosticRefreshRequest}});var Wn=m0();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return Wn.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return Wn.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return Wn.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return Wn.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Wn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Wn.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Wn.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Wn.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Wn.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Wn.DidCloseNotebookDocumentNotification}});var T0;(function(t){function e(r){let n=r;return zt.string(n.language)||zt.string(n.scheme)||zt.string(n.pattern)}t.is=e})(T0=T.TextDocumentFilter||(T.TextDocumentFilter={}));var _0;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebookType)||zt.string(n.scheme)||zt.string(n.pattern))}t.is=e})(_0=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var R0;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebook)||_0.is(n.notebook))&&(n.language===void 0||zt.string(n.language))}t.is=e})(R0=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var A0;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!zt.string(n)&&!T0.is(n)&&!R0.is(n))return!1;return!0}t.is=e})(A0=T.DocumentSelector||(T.DocumentSelector={}));var eG;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(eG=T.RegistrationRequest||(T.RegistrationRequest={}));var tG;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(tG=T.UnregistrationRequest||(T.UnregistrationRequest={}));var rG;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(rG=T.ResourceOperationKind||(T.ResourceOperationKind={}));var nG;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(nG=T.FailureHandlingKind||(T.FailureHandlingKind={}));var iG;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(iG=T.PositionEncodingKind||(T.PositionEncodingKind={}));var aG;(function(t){function e(r){let n=r;return n&&zt.string(n.id)&&n.id.length>0}t.hasId=e})(aG=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var oG;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||A0.is(n.documentSelector))}t.is=e})(oG=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var sG;(function(t){function e(n){let i=n;return zt.objectLiteral(i)&&(i.workDoneProgress===void 0||zt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&zt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(sG=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var uG;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(uG=T.InitializeRequest||(T.InitializeRequest={}));var lG;(function(t){t.unknownProtocolVersion=1})(lG=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var cG;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(cG=T.InitializedNotification||(T.InitializedNotification={}));var fG;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(fG=T.ShutdownRequest||(T.ShutdownRequest={}));var dG;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(dG=T.ExitNotification||(T.ExitNotification={}));var pG;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(pG=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var mG;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(mG=T.MessageType||(T.MessageType={}));var hG;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(hG=T.ShowMessageNotification||(T.ShowMessageNotification={}));var yG;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(yG=T.ShowMessageRequest||(T.ShowMessageRequest={}));var gG;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(gG=T.LogMessageNotification||(T.LogMessageNotification={}));var vG;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(vG=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var TG;(function(t){t.None=0,t.Full=1,t.Incremental=2})(TG=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var _G;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(_G=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var RG;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(RG=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var AG;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(AG=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var SG;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(SG=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var bG;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(bG=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var PG;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(PG=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var CG;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(CG=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var kG;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(kG=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var wG;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(wG=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var EG;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(EG=T.FileChangeType||(T.FileChangeType={}));var NG;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(h0.URI.is(n.baseUri)||h0.WorkspaceFolder.is(n.baseUri))&&zt.string(n.pattern)}t.is=e})(NG=T.RelativePattern||(T.RelativePattern={}));var $G;(function(t){t.Create=1,t.Change=2,t.Delete=4})($G=T.WatchKind||(T.WatchKind={}));var OG;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(OG=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var IG;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(IG=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var DG;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DG=T.CompletionRequest||(T.CompletionRequest={}));var xG;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(xG=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var LG;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LG=T.HoverRequest||(T.HoverRequest={}));var qG;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(qG=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var MG;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MG=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var FG;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(FG=T.DefinitionRequest||(T.DefinitionRequest={}));var jG;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(jG=T.ReferencesRequest||(T.ReferencesRequest={}));var GG;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(GG=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var UG;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(UG=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var HG;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(HG=T.CodeActionRequest||(T.CodeActionRequest={}));var KG;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(KG=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var WG;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(WG=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var BG;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(BG=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var VG;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(VG=T.CodeLensRequest||(T.CodeLensRequest={}));var zG;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(zG=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var YG;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(YG=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var XG;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(XG=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var JG;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(JG=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var QG;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(QG=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var ZG;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(ZG=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var eU;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(eU=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var tU;(function(t){t.Identifier=1})(tU=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var rU;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(rU=T.RenameRequest||(T.RenameRequest={}));var nU;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(nU=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var iU;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(iU=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var aU;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(aU=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var P0=d(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.createProtocolConnection=void 0;var b0=bi();function oU(t,e,r,n){return b0.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,b0.createMessageConnection)(t,e,r,n)}Fc.createProtocolConnection=oU});var C0=d(hr=>{"use strict";var sU=hr&&hr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),jc=hr&&hr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&sU(e,t,r)};Object.defineProperty(hr,"__esModule",{value:!0});hr.LSPErrorCodes=hr.createProtocolConnection=void 0;jc(bi(),hr);jc(Ho(),hr);jc(ct(),hr);jc(S0(),hr);var uU=P0();Object.defineProperty(hr,"createProtocolConnection",{enumerable:!0,get:function(){return uU.createProtocolConnection}});var lU;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(lU=hr.LSPErrorCodes||(hr.LSPErrorCodes={}))});var bt=d(Bn=>{"use strict";var cU=Bn&&Bn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),k0=Bn&&Bn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&cU(e,t,r)};Object.defineProperty(Bn,"__esModule",{value:!0});Bn.createProtocolConnection=void 0;var fU=Xh();k0(Xh(),Bn);k0(C0(),Bn);function dU(t,e,r,n){return(0,fU.createMessageConnection)(t,e,r,n)}Bn.createProtocolConnection=dU});var ly=d(ra=>{"use strict";Object.defineProperty(ra,"__esModule",{value:!0});ra.SemanticTokensBuilder=ra.SemanticTokensDiff=ra.SemanticTokensFeature=void 0;var Gc=bt(),pU=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Gc.SemanticTokensRefreshRequest.type),on:e=>{let r=Gc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Gc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Gc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};ra.SemanticTokensFeature=pU;var Uc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};ra.SemanticTokensDiff=Uc;var uy=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Uc(this._prevData,this._data).computeDiff()}:this.build()}};ra.SemanticTokensBuilder=uy});var fy=d(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.TextDocuments=void 0;var Va=bt(),cy=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Va.Emitter,this._onDidOpen=new Va.Emitter,this._onDidClose=new Va.Emitter,this._onDidSave=new Va.Emitter,this._onWillSave=new Va.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Va.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Va.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Hc.TextDocuments=cy});var py=d(Xo=>{"use strict";Object.defineProperty(Xo,"__esModule",{value:!0});Xo.NotebookDocuments=Xo.NotebookSyncFeature=void 0;var Br=bt(),w0=fy(),mU=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Br.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Br.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Br.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Br.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Xo.NotebookSyncFeature=mU;var na=class{onDidOpenTextDocument(e){return this.openHandler=e,Br.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Br.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Br.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return na.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return na.NULL_DISPOSE}onDidSaveTextDocument(){return na.NULL_DISPOSE}};na.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var dy=class{constructor(e){e instanceof w0.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new w0.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Br.Emitter,this._onDidChange=new Br.Emitter,this._onDidSave=new Br.Emitter,this._onDidClose=new Br.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new na,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],y=[];if(u.cells!==void 0){let C=u.cells;if(C.structure!==void 0){let b=C.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),C.structure.didOpen!==void 0)for(let S of C.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(C.structure.didClose)for(let S of C.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(C.data!==void 0){let b=new Map(C.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(C.textContent!==void 0)for(let b of C.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),y.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let h=[];for(let C of l)h.push(this.getNotebookCell(C));let A=[];for(let C of c)A.push(this.getNotebookCell(C));let w=[];for(let C of y)w.push(this.getNotebookCell(C));(h.length>0||A.length>0||f.length>0||w.length>0)&&(v.cells={added:h,removed:A,changed:{data:f,textContent:w}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Br.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Xo.NotebookDocuments=dy});var my=d(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.thenable=Pt.typedArray=Pt.stringArray=Pt.array=Pt.func=Pt.error=Pt.number=Pt.string=Pt.boolean=void 0;function hU(t){return t===!0||t===!1}Pt.boolean=hU;function E0(t){return typeof t=="string"||t instanceof String}Pt.string=E0;function yU(t){return typeof t=="number"||t instanceof Number}Pt.number=yU;function gU(t){return t instanceof Error}Pt.error=gU;function N0(t){return typeof t=="function"}Pt.func=N0;function $0(t){return Array.isArray(t)}Pt.array=$0;function vU(t){return $0(t)&&t.every(e=>E0(e))}Pt.stringArray=vU;function TU(t,e){return Array.isArray(t)&&t.every(e)}Pt.typedArray=TU;function _U(t){return t&&N0(t.then)}Pt.thenable=_U});var hy=d(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.generateUuid=Vr.parse=Vr.isUUID=Vr.v4=Vr.empty=void 0;var Ju=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},se=class extends Ju{constructor(){super([se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-","4",se._randomHex(),se._randomHex(),se._randomHex(),"-",se._oneOf(se._timeHighBits),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return se._oneOf(se._chars)}};se._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];se._timeHighBits=["8","9","a","b"];Vr.empty=new Ju("00000000-0000-0000-0000-000000000000");function O0(){return new se}Vr.v4=O0;var RU=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function I0(t){return RU.test(t)}Vr.isUUID=I0;function AU(t){if(!I0(t))throw new Error("invalid uuid");return new Ju(t)}Vr.parse=AU;function SU(){return O0().asHex()}Vr.generateUuid=SU});var D0=d(aa=>{"use strict";Object.defineProperty(aa,"__esModule",{value:!0});aa.attachPartialResult=aa.ProgressFeature=aa.attachWorkDone=void 0;var ia=bt(),bU=hy(),Vn=class{constructor(e,r){this._connection=e,this._token=r,Vn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,n)}done(){Vn.Instances.delete(this._token),this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,{kind:"end"})}};Vn.Instances=new Map;var Kc=class extends Vn{constructor(e,r){super(e,r),this._source=new ia.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Qu=class{constructor(){}begin(){}report(){}done(){}},Wc=class extends Qu{constructor(){super(),this._source=new ia.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function PU(t,e){if(e===void 0||e.workDoneToken===void 0)return new Qu;let r=e.workDoneToken;return delete e.workDoneToken,new Vn(t,r)}aa.attachWorkDone=PU;var CU=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(ia.WorkDoneProgressCancelNotification.type,r=>{let n=Vn.Instances.get(r.token);(n instanceof Kc||n instanceof Wc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Qu:new Vn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,bU.generateUuid)();return this.connection.sendRequest(ia.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Kc(this.connection,e))}else return Promise.resolve(new Wc)}};aa.ProgressFeature=CU;var yy;(function(t){t.type=new ia.ProgressType})(yy||(yy={}));var gy=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(yy.type,this._token,e)}};function kU(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new gy(t,r)}aa.attachPartialResult=kU});var x0=d(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.ConfigurationFeature=void 0;var wU=bt(),EU=my(),NU=t=>class extends t{getConfiguration(e){return e?EU.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(wU.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Bc.ConfigurationFeature=NU});var L0=d(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.WorkspaceFoldersFeature=void 0;var Vc=bt(),$U=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Vc.Emitter,this.connection.onNotification(Vc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Vc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Vc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};zc.WorkspaceFoldersFeature=$U});var q0=d(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.CallHierarchyFeature=void 0;var vy=bt(),OU=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(vy.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=vy.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=vy.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Yc.CallHierarchyFeature=OU});var M0=d(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.ShowDocumentFeature=void 0;var IU=bt(),DU=t=>class extends t{showDocument(e){return this.connection.sendRequest(IU.ShowDocumentRequest.type,e)}};Xc.ShowDocumentFeature=DU});var F0=d(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.FileOperationsFeature=void 0;var Jo=bt(),xU=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Jo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Jo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Jo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Jo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Jo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Jo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Jc.FileOperationsFeature=xU});var j0=d(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.LinkedEditingRangeFeature=void 0;var LU=bt(),qU=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(LU.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Qc.LinkedEditingRangeFeature=qU});var G0=d(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.TypeHierarchyFeature=void 0;var Ty=bt(),MU=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Ty.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Ty.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Ty.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Zc.TypeHierarchyFeature=MU});var H0=d(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.InlineValueFeature=void 0;var U0=bt(),FU=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(U0.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(U0.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};ef.InlineValueFeature=FU});var K0=d(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.InlayHintFeature=void 0;var _y=bt(),jU=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(_y.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(_y.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(_y.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};tf.InlayHintFeature=jU});var W0=d(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.DiagnosticFeature=void 0;var Zu=bt(),GU=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Zu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Zu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Zu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Zu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Zu.WorkspaceDiagnosticRequest.partialResult,r)))}}};rf.DiagnosticFeature=GU});var B0=d(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.MonikerFeature=void 0;var UU=bt(),HU=t=>class extends t{get moniker(){return{on:e=>{let r=UU.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};nf.MonikerFeature=HU});var aS=d(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.createConnection=Te.combineFeatures=Te.combineNotebooksFeatures=Te.combineLanguagesFeatures=Te.combineWorkspaceFeatures=Te.combineWindowFeatures=Te.combineClientFeatures=Te.combineTracerFeatures=Te.combineTelemetryFeatures=Te.combineConsoleFeatures=Te._NotebooksImpl=Te._LanguagesImpl=Te.BulkUnregistration=Te.BulkRegistration=Te.ErrorMessageTracker=void 0;var H=bt(),zr=my(),Ay=hy(),ne=D0(),KU=x0(),WU=L0(),BU=q0(),VU=ly(),zU=M0(),YU=F0(),XU=j0(),JU=G0(),QU=H0(),ZU=K0(),e2=W0(),t2=py(),r2=B0();function Ry(t){if(t!==null)return t}var Sy=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};Te.ErrorMessageTracker=Sy;var af=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},by=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Ry)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Ry)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Ry)}},V0=(0,zU.ShowDocumentFeature)((0,ne.ProgressFeature)(by)),n2;(function(t){function e(){return new of}t.create=e})(n2=Te.BulkRegistration||(Te.BulkRegistration={}));var of=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=zr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Ay.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},i2;(function(t){function e(){return new el(void 0,[])}t.create=e})(i2=Te.BulkUnregistration||(Te.BulkUnregistration={}));var el=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=zr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},sf=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof of?this.registerMany(e):e instanceof el?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=zr.string(r)?r:r.method,a=Ay.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=zr.string(e)?e:e.method,i=Ay.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new el(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Py=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},z0=(0,YU.FileOperationsFeature)((0,WU.WorkspaceFoldersFeature)((0,KU.ConfigurationFeature)(Py))),uf=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},lf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},cf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ne.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ne.attachPartialResult)(this.connection,r)}};Te._LanguagesImpl=cf;var Y0=(0,r2.MonikerFeature)((0,e2.DiagnosticFeature)((0,ZU.InlayHintFeature)((0,QU.InlineValueFeature)((0,JU.TypeHierarchyFeature)((0,XU.LinkedEditingRangeFeature)((0,VU.SemanticTokensFeature)((0,BU.CallHierarchyFeature)(cf)))))))),ff=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ne.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ne.attachPartialResult)(this.connection,r)}};Te._NotebooksImpl=ff;var X0=(0,t2.NotebookSyncFeature)(ff);function J0(t,e){return function(r){return e(t(r))}}Te.combineConsoleFeatures=J0;function Q0(t,e){return function(r){return e(t(r))}}Te.combineTelemetryFeatures=Q0;function Z0(t,e){return function(r){return e(t(r))}}Te.combineTracerFeatures=Z0;function eS(t,e){return function(r){return e(t(r))}}Te.combineClientFeatures=eS;function tS(t,e){return function(r){return e(t(r))}}Te.combineWindowFeatures=tS;function rS(t,e){return function(r){return e(t(r))}}Te.combineWorkspaceFeatures=rS;function nS(t,e){return function(r){return e(t(r))}}Te.combineLanguagesFeatures=nS;function iS(t,e){return function(r){return e(t(r))}}Te.combineNotebooksFeatures=iS;function a2(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,J0),tracer:r(t.tracer,e.tracer,Z0),telemetry:r(t.telemetry,e.telemetry,Q0),client:r(t.client,e.client,eS),window:r(t.window,e.window,tS),workspace:r(t.workspace,e.workspace,rS),languages:r(t.languages,e.languages,nS),notebooks:r(t.notebooks,e.notebooks,iS)}}Te.combineFeatures=a2;function o2(t,e,r){let n=r&&r.console?new(r.console(af)):new af,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(uf)):new uf,o=r&&r.telemetry?new(r.telemetry(lf)):new lf,s=r&&r.client?new(r.client(sf)):new sf,u=r&&r.window?new(r.window(V0)):new V0,l=r&&r.workspace?new(r.workspace(z0)):new z0,c=r&&r.languages?new(r.languages(Y0)):new Y0,f=r&&r.notebooks?new(r.notebooks(X0)):new X0,y=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:zr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let h,A,w,C={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(zr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=zr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(A=b,{dispose:()=>{A=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(h=b,{dispose:()=>{h=void 0}}),onExit:b=>(w=b,{dispose:()=>{w=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of y)b.attach(C);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),zr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of y)S.initialize(b.capabilities);if(A){let S=A(b,new H.CancellationTokenSource().token,(0,ne.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=zr.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None:!zr.number(W.textDocumentSync)&&!zr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=zr.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None);for(let te of y)te.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of y)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,h)return h(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{w&&w()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),C}Te.createConnection=o2});var Cy=d(Yt=>{"use strict";var s2=Yt&&Yt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),oS=Yt&&Yt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&s2(e,t,r)};Object.defineProperty(Yt,"__esModule",{value:!0});Yt.ProposedFeatures=Yt.NotebookDocuments=Yt.TextDocuments=Yt.SemanticTokensBuilder=void 0;var u2=ly();Object.defineProperty(Yt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return u2.SemanticTokensBuilder}});oS(bt(),Yt);var l2=fy();Object.defineProperty(Yt,"TextDocuments",{enumerable:!0,get:function(){return l2.TextDocuments}});var c2=py();Object.defineProperty(Yt,"NotebookDocuments",{enumerable:!0,get:function(){return c2.NotebookDocuments}});oS(aS(),Yt);var f2;(function(t){t.all={__brand:"features"}})(f2=Yt.ProposedFeatures||(Yt.ProposedFeatures={}))});var uS=d((Lhe,sS)=>{"use strict";sS.exports=bt()});var xe=d(zn=>{"use strict";var d2=zn&&zn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),cS=zn&&zn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&d2(e,t,r)};Object.defineProperty(zn,"__esModule",{value:!0});zn.createConnection=void 0;var df=Cy();cS(uS(),zn);cS(Cy(),zn);var lS=!1,p2={initialize:t=>{},get shutdownReceived(){return lS},set shutdownReceived(t){lS=t},exit:t=>{}};function m2(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),df.ConnectionStrategy.is(t)||df.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,df.createProtocolConnection)(a,o,l,s);return(0,df.createConnection)(u,p2,i)}zn.createConnection=m2});var ky=d((mf,pf)=>{var h2=mf&&mf.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof pf=="object"&&typeof pf.exports=="object"){var e=t(bc,mf);e!==void 0&&(pf.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,y){this._uri=l,this._languageId=c,this._version=f,this._content=y,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,y=l;f<y.length;f++){var v=y[f];if(u.isIncremental(v)){var h=o(v.range),A=this.offsetAt(h.start),w=this.offsetAt(h.end);this._content=this._content.substring(0,A)+v.text+this._content.substring(w,this._content.length);var C=Math.max(h.start.line,0),b=Math.max(h.end.line,0),S=this._lineOffsets,O=a(v.text,!1,A);if(b-C===O.length)for(var F=0,W=O.length;F<W;F++)S[F+C+1]=O[F];else O.length<1e4?S.splice.apply(S,h2([C+1,b-C],O,!1)):this._lineOffsets=S=S.slice(0,C+1).concat(O,S.slice(b+1));var te=v.text.length-(w-A);if(te!==0)for(var F=C+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+te}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,y=c.length;if(y===0)return{line:0,character:l};for(;f<y;){var v=Math.floor((f+y)/2);c[v]>l?y=v:f=v+1}var h=f-1;return{line:h,character:l-c[h]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],y=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,y),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(y,v,h,A){return new r(y,v,h,A)}u.create=l;function c(y,v,h){if(y instanceof r)return y.update(v,h),y;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(y,v){for(var h=y.getText(),A=i(v.map(s),function(W,te){var we=W.range.start.line-te.range.start.line;return we===0?W.range.start.character-te.range.start.character:we}),w=0,C=[],b=0,S=A;b<S.length;b++){var O=S[b],F=y.offsetAt(O.range.start);if(F<w)throw new Error("Overlapping edit");F>w&&C.push(h.substring(w,F)),O.newText.length&&C.push(O.newText),w=y.offsetAt(O.range.end)}return C.push(h.substr(w)),C.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),y=u.slice(c);i(f,l),i(y,l);for(var v=0,h=0,A=0;v<f.length&&h<y.length;){var w=l(f[v],y[h]);w<=0?u[A++]=f[v++]:u[A++]=y[h++]}for(;v<f.length;)u[A++]=f[v++];for(;h<y.length;)u[A++]=y[h++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],y=0;y<u.length;y++){var v=u.charCodeAt(y);(v===13||v===10)&&(v===13&&y+1<u.length&&u.charCodeAt(y+1)===10&&y++,f.push(c+y+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var ir=d(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});Ft.isRootCstNode=Ft.isLeafCstNode=Ft.isCompositeCstNode=Ft.AbstractAstReflection=Ft.isLinkingError=Ft.isAstNodeDescription=Ft.isReference=Ft.isAstNode=void 0;function Ey(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Ft.isAstNode=Ey;function fS(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Ft.isReference=fS;function y2(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Ft.isAstNodeDescription=y2;function g2(t){return typeof t=="object"&&t!==null&&Ey(t.container)&&fS(t.reference)&&typeof t.message=="string"}Ft.isLinkingError=g2;var wy=class{constructor(){this.subtypes={}}isInstance(e,r){return Ey(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};Ft.AbstractAstReflection=wy;function dS(t){return typeof t=="object"&&t!==null&&"children"in t}Ft.isCompositeCstNode=dS;function v2(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Ft.isLeafCstNode=v2;function T2(t){return dS(t)&&"fullText"in t}Ft.isRootCstNode=T2});var jt=d(Ye=>{"use strict";Object.defineProperty(Ye,"__esModule",{value:!0});Ye.Reduction=Ye.TreeStreamImpl=Ye.stream=Ye.DONE_RESULT=Ye.EMPTY_STREAM=Ye.StreamImpl=void 0;var Xt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Xt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return Ye.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=_2(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Xt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?Ye.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Xt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return Ye.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Xt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(hf(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return Ye.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Xt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(hf(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return Ye.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Xt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Xt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?Ye.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};Ye.StreamImpl=Xt;function _2(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function hf(t){return!!t&&typeof t[Symbol.iterator]=="function"}Ye.EMPTY_STREAM=new Xt(()=>{},()=>Ye.DONE_RESULT);Ye.DONE_RESULT=Object.freeze({done:!0,value:void 0});function R2(...t){if(t.length===1){let e=t[0];if(e instanceof Xt)return e;if(hf(e))return new Xt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Xt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:Ye.DONE_RESULT)}return t.length>1?new Xt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];hf(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return Ye.DONE_RESULT}):Ye.EMPTY_STREAM}Ye.stream=R2;var Ny=class extends Xt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return Ye.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};Ye.TreeStreamImpl=Ny;var A2;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(A2=Ye.Reduction||(Ye.Reduction={}))});var qe=d(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.getInteriorNodes=le.getStartlineNode=le.getNextNode=le.getPreviousNode=le.findLeafNodeAtOffset=le.isCommentNode=le.findCommentNode=le.findDeclarationNodeAtOffset=le.DefaultNameRegexp=le.inRange=le.compareRange=le.RangeComparison=le.toDocumentSegment=le.tokenToRange=le.isCstChildNode=le.flattenCst=le.streamCst=void 0;var Qo=ir(),S2=jt();function mS(t){return new S2.TreeStreamImpl(t,e=>(0,Qo.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}le.streamCst=mS;function b2(t){return mS(t).filter(Qo.isLeafCstNode)}le.flattenCst=b2;function P2(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}le.isCstChildNode=P2;function C2(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}le.tokenToRange=C2;function k2(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}le.toDocumentSegment=k2;var za;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(za=le.RangeComparison||(le.RangeComparison={}));function hS(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return za.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return za.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?za.Inside:r?za.OverlapBack:za.OverlapFront}le.compareRange=hS;function w2(t,e){return hS(t,e)>za.After}le.inRange=w2;le.DefaultNameRegexp=/^[\w\p{L}]$/u;function E2(t,e,r=le.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return yf(t,e)}}le.findDeclarationNodeAtOffset=E2;function N2(t,e){if(t){let r=yS(t,!0);if(r&&$y(r,e))return r;if((0,Qo.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if($y(a,e))return a}}}}le.findCommentNode=N2;function $y(t,e){return(0,Qo.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}le.isCommentNode=$y;function yf(t,e){if((0,Qo.isLeafCstNode)(t))return t;if((0,Qo.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return yf(a,e)}if(r===n)return yf(t.children[r],e)}}le.findLeafNodeAtOffset=yf;function yS(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}le.getPreviousNode=yS;function $2(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}le.getNextNode=$2;function O2(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}le.getStartlineNode=O2;function I2(t,e){let r=D2(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}le.getInteriorNodes=I2;function D2(t,e){let r=pS(t),n=pS(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function pS(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Pn=d((tl,Oy)=>{(function(t,e){if(typeof tl=="object"&&typeof Oy=="object")Oy.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof tl=="object"?tl:t)[n]=r[n]}})(tl,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",y=0,v=-1,h=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(v===A-1||h===1))if(v!==A-1&&h===2){if(f.length<2||y!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var w=f.lastIndexOf("/");if(w!==f.length-1){w===-1?(f="",y=0):y=(f=f.slice(0,w)).length-1-f.lastIndexOf("/"),v=A,h=0;continue}}else if(f.length===2||f.length===1){f="",y=0,v=A,h=0;continue}}l&&(f.length>0?f+="/..":f="..",y=2)}else f.length>0?f+="/"+u.slice(v+1,A):f=u.slice(v+1,A),y=A-v-1;v=A,h=0}else c===46&&h!==-1?++h:h=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var y;f>=0?y=arguments[f]:(u===void 0&&(u=process.cwd()),y=u),a(y),y.length!==0&&(l=y+"/"+l,c=y.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,y=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var h=l.length-v,A=y<h?y:h,w=-1,C=0;C<=A;++C){if(C===A){if(h>A){if(l.charCodeAt(v+C)===47)return l.slice(v+C+1);if(C===0)return l.slice(v+C)}else y>A&&(u.charCodeAt(c+C)===47?w=C:C===0&&(w=0));break}var b=u.charCodeAt(c+C);if(b!==l.charCodeAt(v+C))break;b===47&&(w=C)}var S="";for(C=c+w+1;C<=f;++C)C!==f&&u.charCodeAt(C)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+w):(v+=w,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,y=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!y){f=v;break}}else y=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,y=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var h=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var w=u.charCodeAt(c);if(w===47){if(!v){f=c+1;break}}else A===-1&&(v=!1,A=c+1),h>=0&&(w===l.charCodeAt(h)?--h==-1&&(y=c):(h=-1,y=A))}return f===y?y=A:y===-1&&(y=u.length),u.slice(f,y)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else y===-1&&(v=!1,y=c+1);return y===-1?"":u.slice(f,y)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,y=!0,v=0,h=u.length-1;h>=0;--h){var A=u.charCodeAt(h);if(A!==47)f===-1&&(y=!1,f=h+1),A===46?l===-1?l=h:v!==1&&(v=1):l!==-1&&(v=-1);else if(!y){c=h+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,y=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+y:f+"/"+y:y}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),y=f===47;y?(l.root="/",c=1):c=0;for(var v=-1,h=0,A=-1,w=!0,C=u.length-1,b=0;C>=c;--C)if((f=u.charCodeAt(C))!==47)A===-1&&(w=!1,A=C+1),f===46?v===-1?v=C:b!==1&&(b=1):v!==-1&&(b=-1);else if(!w){h=C+1;break}return v===-1||A===-1||b===0||b===1&&v===A-1&&v===h+1?A!==-1&&(l.base=l.name=h===0&&y?u.slice(1,A):u.slice(h,A)):(h===0&&y?(l.name=u.slice(1,v),l.base=u.slice(1,A)):(l.name=u.slice(h,v),l.base=u.slice(h,A)),l.ext=u.slice(v,A)),h>0?l.dir=u.slice(0,h-1):y&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var ae in B)Object.prototype.hasOwnProperty.call(B,ae)&&(j[ae]=B[ae])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,y=/^\//,v=/^\/\//;function h(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!y.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var A="",w="/",C=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,ae,oe,Z){Z===void 0&&(Z=!1),typeof L=="object"?(this.scheme=L.scheme||A,this.authority=L.authority||A,this.path=L.path||A,this.query=L.query||A,this.fragment=L.fragment||A):(this.scheme=function(dt,tt){return dt||tt?dt:"file"}(L,Z),this.authority=j||A,this.path=function(dt,tt){switch(dt){case"https":case"http":case"file":tt?tt[0]!==w&&(tt=w+tt):tt=w}return tt}(this.scheme,B||A),this.query=ae||A,this.fragment=oe||A,h(this,Z))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return we(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,ae=L.path,oe=L.query,Z=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=A),B===void 0?B=this.authority:B===null&&(B=A),ae===void 0?ae=this.path:ae===null&&(ae=A),oe===void 0?oe=this.query:oe===null&&(oe=A),Z===void 0?Z=this.fragment:Z===null&&(Z=A),j===this.scheme&&B===this.authority&&ae===this.path&&oe===this.query&&Z===this.fragment?this:new O(j,B,ae,oe,Z)},q.parse=function(L,j){j===void 0&&(j=!1);var B=C.exec(L);return B?new O(B[2]||A,fe(B[4]||A),fe(B[5]||A),fe(B[7]||A),fe(B[9]||A),j):new O(A,A,A,A,A)},q.file=function(L){var j=A;if(c.isWindows&&(L=L.replace(/\\/g,w)),L[0]===w&&L[1]===w){var B=L.indexOf(w,2);B===-1?(j=L.substring(2),L=w):(j=L.substring(2,B),L=L.substring(B)||w)}return new O("file",j,L,A,A)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return h(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),Ee(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=we(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?Ee(this,!0):(this._formatted||(this._formatted=Ee(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,ae=-1,oe=0;oe<q.length;oe++){var Z=q.charCodeAt(oe);if(Z>=97&&Z<=122||Z>=65&&Z<=90||Z>=48&&Z<=57||Z===45||Z===46||Z===95||Z===126||L&&Z===47||j&&Z===91||j&&Z===93||j&&Z===58)ae!==-1&&(B+=encodeURIComponent(q.substring(ae,oe)),ae=-1),B!==void 0&&(B+=q.charAt(oe));else{B===void 0&&(B=q.substr(0,oe));var dt=F[Z];dt!==void 0?(ae!==-1&&(B+=encodeURIComponent(q.substring(ae,oe)),ae=-1),B+=dt):ae===-1&&(ae=oe)}}return ae!==-1&&(B+=encodeURIComponent(q.substring(ae))),B!==void 0?B:q}function te(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function we(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function Ee(q,L){var j=L?te:W,B="",ae=q.scheme,oe=q.authority,Z=q.path,dt=q.query,tt=q.fragment;if(ae&&(B+=ae,B+=":"),(oe||ae==="file")&&(B+=w,B+=w),oe){var Dt=oe.indexOf("@");if(Dt!==-1){var fn=oe.substr(0,Dt);oe=oe.substr(Dt+1),(Dt=fn.lastIndexOf(":"))===-1?B+=j(fn,!1,!1):(B+=j(fn.substr(0,Dt),!1,!1),B+=":",B+=j(fn.substr(Dt+1),!1,!0)),B+="@"}(Dt=(oe=oe.toLowerCase()).lastIndexOf(":"))===-1?B+=j(oe,!1,!0):(B+=j(oe.substr(0,Dt),!1,!0),B+=oe.substr(Dt))}if(Z){if(Z.length>=3&&Z.charCodeAt(0)===47&&Z.charCodeAt(2)===58)(Dr=Z.charCodeAt(1))>=65&&Dr<=90&&(Z="/".concat(String.fromCharCode(Dr+32),":").concat(Z.substr(3)));else if(Z.length>=2&&Z.charCodeAt(1)===58){var Dr;(Dr=Z.charCodeAt(0))>=65&&Dr<=90&&(Z="".concat(String.fromCharCode(Dr+32),":").concat(Z.substr(2)))}B+=j(Z,!0,!1)}return dt&&(B+="?",B+=j(dt,!1,!1)),tt&&(B+="#",B+=L?tt:W(tt,!1,!1)),B}function Qe(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Qe(q.substr(3)):q}}a.uriToFsPath=we;var V=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function fe(q){return q.match(V)?q.replace(V,function(L){return Qe(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(y,v,h){if(h||arguments.length===2)for(var A,w=0,C=v.length;w<C;w++)!A&&w in v||(A||(A=Array.prototype.slice.call(v,0,w)),A[w]=v[w]);return y.concat(A||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(y){for(var v=[],h=1;h<arguments.length;h++)v[h-1]=arguments[h];return y.with({path:c.join.apply(c,s([y.path],v,!1))})},u.resolvePath=function(y){for(var v=[],h=1;h<arguments.length;h++)v[h-1]=arguments[h];var A=y.path,w=!1;A[0]!==f&&(A=f+A,w=!0);var C=c.resolve.apply(c,s([A],v,!1));return w&&C[0]===f&&!y.authority&&(C=C.substring(1)),y.with({path:C})},u.dirname=function(y){if(y.path.length===0||y.path===f)return y;var v=c.dirname(y.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),y.with({path:v})},u.basename=function(y){return c.basename(y.path)},u.extname=function(y){return c.extname(y.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var rl=d(Zo=>{"use strict";Object.defineProperty(Zo,"__esModule",{value:!0});Zo.eagerLoad=Zo.inject=void 0;function x2(t,e,r,n){let i=[t,e,r,n].reduce(RS,{});return _S(i)}Zo.inject=x2;var Iy=Symbol("isProxy");function TS(t){if(t&&t[Iy])for(let e of Object.values(t))TS(e);return t}Zo.eagerLoad=TS;function _S(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>vS(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(vS(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Iy]});return r[Iy]=!0,r}var gS=Symbol();function vS(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===gS)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=gS;try{t[e]=typeof i=="function"?i(n):_S(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function RS(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=RS(i,n):t[r]=n}}return t}});var Cn=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.MultiMap=void 0;var es=jt(),Dy=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return es.Reduction.sum((0,es.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,es.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,es.stream)(this.map.keys())}values(){return(0,es.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,es.stream)(this.map.entries())}};gf.MultiMap=Dy});var Ne=d(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isUnionType=_.UnionType=_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=void 0;var L2=ir();_.AbstractRule="AbstractRule";function q2(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=q2;_.AbstractType="AbstractType";function M2(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=M2;_.Condition="Condition";function F2(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=F2;_.TypeDefinition="TypeDefinition";function j2(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=j2;_.AbstractElement="AbstractElement";function G2(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=G2;_.ArrayType="ArrayType";function U2(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=U2;_.Conjunction="Conjunction";function H2(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=H2;_.Disjunction="Disjunction";function K2(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=K2;_.Grammar="Grammar";function W2(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=W2;_.GrammarImport="GrammarImport";function B2(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=B2;_.InferredType="InferredType";function V2(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=V2;_.Interface="Interface";function z2(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=z2;_.LiteralCondition="LiteralCondition";function Y2(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=Y2;_.NamedArgument="NamedArgument";function X2(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=X2;_.Negation="Negation";function J2(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=J2;_.Parameter="Parameter";function Q2(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=Q2;_.ParameterReference="ParameterReference";function Z2(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=Z2;_.ParserRule="ParserRule";function eH(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=eH;_.ReferenceType="ReferenceType";function tH(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=tH;_.ReturnType="ReturnType";function rH(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=rH;_.SimpleType="SimpleType";function nH(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=nH;_.TerminalRule="TerminalRule";function iH(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=iH;_.Type="Type";function aH(t){return _.reflection.isInstance(t,_.Type)}_.isType=aH;_.TypeAttribute="TypeAttribute";function oH(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=oH;_.UnionType="UnionType";function sH(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=sH;_.Action="Action";function uH(t){return _.reflection.isInstance(t,_.Action)}_.isAction=uH;_.Alternatives="Alternatives";function lH(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=lH;_.Assignment="Assignment";function cH(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=cH;_.CharacterRange="CharacterRange";function fH(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=fH;_.CrossReference="CrossReference";function dH(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=dH;_.Group="Group";function pH(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=pH;_.Keyword="Keyword";function mH(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=mH;_.NegatedToken="NegatedToken";function hH(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=hH;_.RegexToken="RegexToken";function yH(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=yH;_.RuleCall="RuleCall";function gH(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=gH;_.TerminalAlternatives="TerminalAlternatives";function vH(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=vH;_.TerminalGroup="TerminalGroup";function TH(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=TH;_.TerminalRuleCall="TerminalRuleCall";function _H(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=_H;_.UnorderedGroup="UnorderedGroup";function RH(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=RH;_.UntilToken="UntilToken";function AH(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=AH;_.Wildcard="Wildcard";function SH(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=SH;var vf=class extends L2.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=vf;_.reflection=new vf});var Se=d(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.copyAstNode=nt.findLocalReferences=nt.streamReferences=nt.streamAst=nt.streamAllContents=nt.streamContents=nt.findRootNode=nt.getDocument=nt.hasContainerOfType=nt.getContainerOfType=nt.linkContentToContainer=void 0;var Yn=ir(),oa=jt(),bH=qe();function AS(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,Yn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,Yn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}nt.linkContentToContainer=AS;function PH(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}nt.getContainerOfType=PH;function CH(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}nt.hasContainerOfType=CH;function SS(t){let r=bS(t).$document;if(!r)throw new Error("AST node has no document.");return r}nt.getDocument=SS;function bS(t){for(;t.$container;)t=t.$container;return t}nt.findRootNode=bS;function qy(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new oa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let a=t[i];if((0,Yn.isAstNode)(a)){if(n.keyIndex++,xy(a,r))return{done:!1,value:a}}else if(Array.isArray(a)){for(;n.arrayIndex<a.length;){let o=n.arrayIndex++,s=a[o];if((0,Yn.isAstNode)(s)&&xy(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return oa.DONE_RESULT})}nt.streamContents=qy;function kH(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new oa.TreeStreamImpl(t,r=>qy(r,e))}nt.streamAllContents=kH;function PS(t,e){if(t){if(e?.range&&!xy(t,e.range))return new oa.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new oa.TreeStreamImpl(t,r=>qy(r,e),{includeRoot:!0})}nt.streamAst=PS;function xy(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,bH.inRange)(n,e):!1}function CS(t){return new oa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Yn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,Yn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return oa.DONE_RESULT})}nt.streamReferences=CS;function wH(t,e=SS(t).parseResult.value){let r=[];return PS(e).forEach(n=>{CS(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,oa.stream)(r)}nt.findLocalReferences=wH;function Ly(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,Yn.isAstNode)(i))r[n]=Ly(i,e);else if((0,Yn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,Yn.isAstNode)(o)?a.push(Ly(o,e)):(0,Yn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return AS(r),r}nt.copyAstNode=Ly});var ES=d(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.getSourceRegion=void 0;var kS=Se(),EH=Tt(),NH=jt();function $H(t){var e,r;if(t){if("astNode"in t)return DH(t);if(Array.isArray(t))return t.reduce(wS,void 0);{let n=t,i=OH(n)?IH((r=(e=n?.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n?.element):void 0;return ts(n,i)}}else return}Tf.getSourceRegion=$H;function OH(t){return typeof t<"u"&&"element"in t&&"text"in t}function IH(t){try{return(0,kS.getDocument)(t).uri.toString()}catch{return}}function DH(t){var e,r;let{astNode:n,property:i,index:a}=t??{},o=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||o===void 0)){if(i===void 0)return ts(o,My(n));{let s=u=>a!==void 0&&a>-1&&Array.isArray(n[i])?a<u.length?u[a]:void 0:u.reduce(wS,void 0);if(!((r=o.assignments)===null||r===void 0)&&r[i]){let u=s(o.assignments[i]);return u&&ts(u,My(n))}else if(n.$cstNode){let u=s((0,EH.findNodesForProperty)(n.$cstNode,i));return u&&ts(u,My(n))}else return}}}function My(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,kS.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new NH.TreeStreamImpl(t,a=>a.$container?[a.$container]:[]).find(a=>{var o;return(o=a.$textRegion)===null||o===void 0?void 0:o.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ts(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function wS(t,e){var r,n;if(t){if(!e)return t&&ts(t)}else return e&&ts(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,a=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,o=Math.min(t.offset,e.offset),s=Math.max(i,a),u=s-o,l={offset:o,end:s,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,y=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;l.fileURI=y}return l}});var DS=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.processGeneratorNode=void 0;var nl=Ya(),xH=ES(),Fy=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=LH(e,this.currentPosition,n=>{var i,a;return(a=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||a===void 0?void 0:a.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function LH(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var a,o;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((a=n.children)===null||a===void 0?void 0:a.length)===0&&delete n.children,!((o=n.targetRegion)===null||o===void 0)&&o.length&&r(n),delete n.complete,n}};return n}function qH(t,e){let r=new Fy(e),n=r.pushTraceRegion(void 0);NS(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,a=i?.targetRegion,o=n.targetRegion;return a&&i.sourceRegion&&a.offset===o.offset&&a.length===o.length?{text:r.content,trace:i}:{text:r.content,trace:n}}_f.processGeneratorNode=qH;function NS(t,e){typeof t=="string"?MH(t,e):t instanceof nl.IndentNode?FH(t,e):t instanceof nl.CompositeGeneratorNode?IS(t,e):t instanceof nl.NewLineNode&&jH(t,e)}function $S(t,e){return typeof t=="string"?t.length!==0:t instanceof nl.CompositeGeneratorNode?t.contents.some(r=>$S(r,e)):t instanceof nl.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function MH(t,e){t&&(e.pendingIndent&&OS(e,!1),e.append(t))}function OS(t,e){var r;let n="";for(let i of t.relevantIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function IS(t,e){let r,n=(0,xH.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)NS(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function FH(t,e){var r;if($S(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),IS(t,e)}finally{e.decreaseIndent()}}}function jH(t,e){t.ifNotEmpty&&!GH(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&OS(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function GH(t){return t.trimStart()!==""}});var Rf=d(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.normalizeEOL=Ct.findIndentation=Ct.NEWLINE_REGEXP=Ct.SNLE=Ct.expandToString=Ct.expandToStringWithNL=void 0;var il=Ya();function UH(t,...e){return xS(t,...e)+il.EOL}Ct.expandToStringWithNL=UH;function xS(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Ct.SNLE:KH((0,il.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(Ct.NEWLINE_REGEXP).filter(o=>o.trim()!==Ct.SNLE).map(o=>o.replace(Ct.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=LS(r);return r.map(o=>o.slice(a).trimRight()).join(il.EOL)}Ct.expandToString=xS;Ct.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");Ct.NEWLINE_REGEXP=/\r?\n/g;var HH=/\S|$/;function KH(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Ct.NEWLINE_REGEXP,il.EOL+n)}function LS(t){let e=t.filter(n=>n.length>0).map(n=>n.search(HH)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Ct.findIndentation=LS;function WH(t){return t.replace(Ct.NEWLINE_REGEXP,il.EOL)}Ct.normalizeEOL=WH});var Uy=d(sa=>{"use strict";Object.defineProperty(sa,"__esModule",{value:!0});sa.expandTracedToNodeIf=sa.expandTracedToNode=sa.expandToNode=void 0;var Sf=Ya(),Gy=Rf();function qS(t,...e){let r=VH(t),n=zH(t,e,r);return XH(n)}sa.expandToNode=qS;function MS(t,e,r){return(n,...i)=>(0,Sf.traceToNode)(t,e,r)(qS(n,...i))}sa.expandTracedToNode=MS;function BH(t,e,r,n){return t?MS(typeof e=="function"?e():e,r,n):()=>{}}sa.expandTracedToNodeIf=BH;function VH(t){let e=t.join("_").split(Gy.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Gy.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function zH(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Gy.NEWLINE_REGEXP).map((f,y)=>y===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,y,v)=>v===0?n?[]:[y]:v===1&&f.length===0?[y]:f.concat(Af,y):(f,y,v)=>v===0?[y]:f.concat(Af,y),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,Sf.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Sf.CompositeGeneratorNode(String(e[c])):c<e.length?FS:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===Af?o.slice(0,s-2):o.slice(0,s-1):o}var Af={isNewLine:!0},FS={isUndefinedSegment:!0},jy=t=>t===Af,YH=t=>t===FS;function XH(t){return t.reduce((r,n,i)=>YH(n)?r:jy(n)?{node:i===0||jy(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var a;let o=(i===0||jy(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:o.length!==0?r.node.indent({indentation:o,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s??((a=r.indented)===null||a===void 0?void 0:a.append(n))}})(),{node:new Sf.CompositeGeneratorNode}).node}});var Ya=d($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.NLEmpty=$e.NL=$e.NewLineNode=$e.IndentNode=$e.traceToNodeIf=$e.traceToNode=$e.CompositeGeneratorNode=$e.toStringAndTrace=$e.toString=$e.isNewLineNode=$e.isGeneratorNode=$e.EOL=void 0;var JH=ir(),GS=DS(),jS=Uy();$e.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function US(t){return t instanceof Ci||t instanceof al||t instanceof Xa}$e.isGeneratorNode=US;function QH(t){return t instanceof Xa}$e.isNewLineNode=QH;function ZH(t,e){return US(t)?(0,GS.processGeneratorNode)(t,e).text:String(t)}$e.toString=ZH;function eK(t,e){return(0,GS.processGeneratorNode)(t,e)}$e.toStringAndTrace=eK;var Ci=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,JH.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append($e.NL)}appendNewLineIf(e){return e?this.append($e.NL):this}appendNewLineIfNotEmpty(){return this.append($e.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,jS.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:a}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},o=new al(n,a,i);return this.contents.push(o),Array.isArray(r)?o.append(...r):r&&o.append(r),this}appendTraced(e,r,n){return i=>this.append(new Ci().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...a)=>this.append((0,jS.expandTracedToNode)(e,r,n)(i,...a))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};$e.CompositeGeneratorNode=Ci;function HS(t,e,r){return n=>n instanceof Ci&&n.tracedSource===void 0?n.trace(t,e,r):new Ci().trace(t,e,r).append(n)}$e.traceToNode=HS;function tK(t,e,r,n){return t?HS(typeof e=="function"?e():e,r,n):()=>{}}$e.traceToNodeIf=tK;var al=class extends Ci{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};$e.IndentNode=al;var Xa=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??$e.EOL,this.ifNotEmpty=r}};$e.NewLineNode=Xa;$e.NL=new Xa;$e.NLEmpty=new Xa(void 0,!0)});var is=d(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.propertyTypeToString=Oe.isTypeAssignable=Oe.TypeResolutionError=Oe.InterfaceType=Oe.UnionType=Oe.isInterfaceType=Oe.isUnionType=Oe.isStringType=Oe.isPrimitiveType=Oe.isValueType=Oe.flattenPropertyUnion=Oe.isPropertyUnion=Oe.isArrayType=Oe.isReferenceType=void 0;var it=Ya(),rs=as();function sl(t){return"referenceType"in t}Oe.isReferenceType=sl;function ul(t){return"elementType"in t}Oe.isArrayType=ul;function Za(t){return"types"in t}Oe.isPropertyUnion=Za;function WS(t){if(Za(t)){let e=[];for(let r of t.types)e.push(...WS(r));return e}else return[t]}Oe.flattenPropertyUnion=WS;function ol(t){return"value"in t}Oe.isValueType=ol;function ns(t){return"primitive"in t}Oe.isPrimitiveType=ns;function bf(t){return"string"in t}Oe.isStringType=bf;function Ky(t){return t&&"type"in t}Oe.isUnionType=Ky;function Vy(t){return t&&"properties"in t}Oe.isInterfaceType=Vy;var Wy=class{constructor(e,r){var n,i;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.reflection=(n=r?.reflection)!==null&&n!==void 0?n:!1,this.declared=(i=r?.declared)!==null&&i!==void 0?i:!1}toAstTypesString(e){let r=new it.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Qa(this.type,"AstType")};`,it.NL),this.reflection&&e&&(r.append(it.NL),zS(r,this.name)),(0,it.toString)(r)}toDeclaredTypesString(e){let r=new it.CompositeGeneratorNode;return r.append(`type ${zy(this.name,e)} = ${Qa(this.type,"DeclaredType")};`,it.NL),(0,it.toString)(r)}};Oe.UnionType=Wy;var ll=class{get superProperties(){let e=new Map;for(let r of this.properties)e.set(r.name,r);for(let r of this.interfaceSuperTypes){let n=r.superProperties;for(let i of n)e.has(i.name)||e.set(i.name,i)}return Array.from(e.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e);return Array.from(e.values())}getSubTypeProperties(e,r){let n=Vy(e)?e.properties:[];for(let i of n)r.has(i.name)||r.set(i.name,i);for(let i of e.subTypes)this.getSubTypeProperties(i,r)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof ll)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new it.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(a=>a.name),i=n.length>0?(0,rs.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,it.NL),r.indent(a=>{this.containerTypes.size>0&&a.append(`readonly $container: ${(0,rs.distinctAndSorted)([...this.containerTypes].map(o=>o.name)).join(" | ")};`,it.NL),this.typeNames.size>0&&a.append(`readonly $type: ${(0,rs.distinctAndSorted)([...this.typeNames]).map(o=>`'${o}'`).join(" | ")};`,it.NL),KS(a,this.properties,"AstType")}),r.append("}",it.NL),e&&(r.append(it.NL),zS(r,this.name)),(0,it.toString)(r)}toDeclaredTypesString(e){let r=new it.CompositeGeneratorNode,n=zy(this.name,e),i=(0,rs.distinctAndSorted)(this.interfaceSuperTypes.map(a=>a.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,it.NL),r.indent(a=>KS(a,this.properties,"DeclaredType",e)),r.append("}",it.NL),(0,it.toString)(r)}};Oe.InterfaceType=ll;var By=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};Oe.TypeResolutionError=By;function Ja(t,e){return Za(t)?t.types.every(r=>Ja(r,e)):Za(e)?e.types.some(r=>Ja(t,r)):sl(t)?sl(e)&&Ja(t.referenceType,e.referenceType):ul(t)?ul(e)&&Ja(t.elementType,e.elementType):ol(t)?Ky(t.value)?ol(e)&&e.value.name===t.value.name?!0:Ja(t.value.type,e):ol(e)?Ky(e.value)?Ja(t,e.value.type):BS(t.value,e.value,new Set):!1:ns(t)?ns(e)&&t.primitive===e.primitive:bf(t)?ns(e)&&e.primitive==="string"||bf(e)&&e.string===t.string:!1}Oe.isTypeAssignable=Ja;function BS(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(Vy(n)&&BS(n,e,r))return!0;return!1}function Qa(t,e="AstType"){if(sl(t)){let r=Qa(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Hy(t.referenceType,r)}`}else if(ul(t)){let r=Qa(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Hy(t.elementType,r)}[]`}else if(Za(t)){let r=t.types.map(n=>Hy(n,Qa(n,e)));return(0,rs.distinctAndSorted)(r).join(" | ")}else{if(ol(t))return t.value.name;if(ns(t))return t.primitive;if(bf(t))return`'${t.string}'`}throw new Error("Invalid type")}Oe.propertyTypeToString=Qa;function Hy(t,e){return Za(t)&&(e=`(${e})`),e}function KS(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:zy(a.name,n),s=a.optional&&!VS(a.type),u=Qa(a.type,r);return`${o}${s?"?":""}: ${u}`}(0,rs.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),it.NL))}function VS(t){return ul(t)?!0:sl(t)?!1:Za(t)?t.types.every(e=>VS(e)):ns(t)?t.primitive==="boolean":!1}function zS(t,e){t.append(`export const ${e} = '${e}';`,it.NL),t.append(it.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,it.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,it.NL)),t.append("}",it.NL)}function zy(t,e){return e.has(t)?`^${t}`:t}});var as=d(at=>{"use strict";Object.defineProperty(at,"__esModule",{value:!0});at.findReferenceTypes=at.hasBooleanType=at.hasArrayType=at.sortInterfacesTopologically=at.mergeTypesAndInterfaces=at.mergeInterfaces=at.collectSuperTypes=at.collectTypeHierarchy=at.collectChildrenTypes=at.distinctAndSorted=at.collectAllPlainProperties=void 0;var cl=Cn(),ki=Ne(),ua=is();function rK(t){let e=new cl.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}at.collectAllPlainProperties=rK;function nK(t,e){return Array.from(new Set(t)).sort(e)}at.distinctAndSorted=nK;function YS(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,ki.isInterface)(u)?(i.add(u),YS(u,e,r,n).forEach(c=>i.add(c))):u&&(0,ki.isType)(u.$container)&&i.add(u.$container)}),i}at.collectChildrenTypes=YS;function iK(t){let e=new cl.MultiMap,r=new cl.MultiMap;for(let a of t){for(let o of a.superTypes)e.add(a.name,o.name),r.add(o.name,a.name);for(let o of a.subTypes)e.add(o.name,a.name),r.add(a.name,o.name)}let n=new cl.MultiMap,i=new cl.MultiMap;for(let[a,o]of Array.from(e.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))n.addAll(a,Array.from(new Set(o)));for(let[a,o]of Array.from(r.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))i.addAll(a,Array.from(new Set(o)));return{superTypes:n,subTypes:i}}at.collectTypeHierarchy=iK;function Yy(t){let e=new Set;if((0,ki.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,ki.isInterface)(r.ref)){e.add(r.ref);let n=Yy(r.ref);for(let i of n)e.add(i)}});else if((0,ki.isType)(t)){let r=XS(t.type);for(let n of r){let i=Yy(n);for(let a of i)e.add(a)}}return e}at.collectSuperTypes=Yy;function XS(t){var e;if((0,ki.isUnionType)(t))return t.types.flatMap(r=>XS(r));if((0,ki.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,ki.isType)(r)||(0,ki.isInterface)(r))return[r]}return[]}function aK(t,e){return t.interfaces.concat(e.interfaces)}at.mergeInterfaces=aK;function oK(t){return t.interfaces.concat(t.unions)}at.mergeTypesAndInterfaces=oK;function sK(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.superTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}at.sortInterfacesTopologically=sK;function JS(t){return(0,ua.isPropertyUnion)(t)?t.types.some(e=>JS(e)):!!(0,ua.isArrayType)(t)}at.hasArrayType=JS;function QS(t){return(0,ua.isPropertyUnion)(t)?t.types.some(e=>QS(e)):(0,ua.isPrimitiveType)(t)?t.primitive==="boolean":!1}at.hasBooleanType=QS;function Xy(t){if((0,ua.isPropertyUnion)(t))return t.types.flatMap(e=>Xy(e));if((0,ua.isReferenceType)(t)){let e=t.referenceType;if((0,ua.isValueType)(e))return[e.value.name]}else if((0,ua.isArrayType)(t))return Xy(t.elementType);return[]}at.findReferenceTypes=Xy});var ss=d(os=>{"use strict";Object.defineProperty(os,"__esModule",{value:!0});os.DefaultNameProvider=os.isNamed=void 0;var uK=Tt();function ZS(t){return typeof t.name=="string"}os.isNamed=ZS;var Jy=class{getName(e){if(ZS(e))return e.name}getNameNode(e){return(0,uK.findNodeForProperty)(e.$cstNode,"name")}};os.DefaultNameProvider=Jy});var fl=d((eb,Pf)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof Pf=="object"&&Pf.exports?Pf.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:eb,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(h){this.idx=h.idx,this.input=h.input,this.groupIdx=h.groupIdx},t.prototype.pattern=function(h){this.idx=0,this.input=h,this.groupIdx=0,this.consumeChar("/");var A=this.disjunction();this.consumeChar("/");for(var w={type:"Flags",loc:{begin:this.idx,end:h.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(w,"global");break;case"i":o(w,"ignoreCase");break;case"m":o(w,"multiLine");break;case"u":o(w,"unicode");break;case"y":o(w,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:w,value:A,loc:this.loc(0)}},t.prototype.disjunction=function(){var h=[],A=this.idx;for(h.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),h.push(this.alternative());return{type:"Disjunction",value:h,loc:this.loc(A)}},t.prototype.alternative=function(){for(var h=[],A=this.idx;this.isTerm();)h.push(this.term());return{type:"Alternative",value:h,loc:this.loc(A)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var h=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(h)};case"$":return{type:"EndAnchor",loc:this.loc(h)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(h)};case"B":return{type:"NonWordBoundary",loc:this.loc(h)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var A;switch(this.popChar()){case"=":A="Lookahead";break;case"!":A="NegativeLookahead";break}s(A);var w=this.disjunction();return this.consumeChar(")"),{type:A,value:w,loc:this.loc(h)}}u()},t.prototype.quantifier=function(h){var A,w=this.idx;switch(this.popChar()){case"*":A={atLeast:0,atMost:1/0};break;case"+":A={atLeast:1,atMost:1/0};break;case"?":A={atLeast:0,atMost:1};break;case"{":var C=this.integerIncludingZero();switch(this.popChar()){case"}":A={atLeast:C,atMost:C};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),A={atLeast:C,atMost:b}):A={atLeast:C,atMost:1/0},this.consumeChar("}");break}if(h===!0&&A===void 0)return;s(A);break}if(!(h===!0&&A===void 0))return s(A),this.peekChar(0)==="?"?(this.consumeChar("?"),A.greedy=!1):A.greedy=!0,A.type="Quantifier",A.loc=this.loc(w),A},t.prototype.atom=function(){var h,A=this.idx;switch(this.peekChar()){case".":h=this.dotAll();break;case"\\":h=this.atomEscape();break;case"[":h=this.characterClass();break;case"(":h=this.group();break}return h===void 0&&this.isPatternCharacter()&&(h=this.patternCharacter()),s(h),h.loc=this.loc(A),this.isQuantifier()&&(h.quantifier=this.quantifier()),h},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var h=this.positiveInteger();return{type:"GroupBackReference",value:h}},t.prototype.characterClassEscape=function(){var h,A=!1;switch(this.popChar()){case"d":h=c;break;case"D":h=c,A=!0;break;case"s":h=y;break;case"S":h=y,A=!0;break;case"w":h=f;break;case"W":h=f,A=!0;break}return s(h),{type:"Set",value:h,complement:A}},t.prototype.controlEscapeAtom=function(){var h;switch(this.popChar()){case"f":h=i("\f");break;case"n":h=i(`
`);break;case"r":h=i("\r");break;case"t":h=i("	");break;case"v":h=i("\v");break}return s(h),{type:"Character",value:h}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var h=this.popChar();if(/[a-zA-Z]/.test(h)===!1)throw Error("Invalid ");var A=h.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:A}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var h=this.popChar();return{type:"Character",value:i(h)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var h=this.popChar();return{type:"Character",value:i(h)}}},t.prototype.characterClass=function(){var h=[],A=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),A=!0);this.isClassAtom();){var w=this.classAtom(),C=w.type==="Character";if(C&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<w.value)throw Error("Range out of order in character class");h.push({from:w.value,to:b.value})}else a(w.value,h),h.push(i("-")),a(b.value,h)}else a(w.value,h)}return this.consumeChar("]"),{type:"Set",complement:A,value:h}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var h=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),h=!1;break;default:this.groupIdx++;break}var A=this.disjunction();this.consumeChar(")");var w={type:"Group",capturing:h,value:A};return h&&(w.idx=this.groupIdx),w},t.prototype.positiveInteger=function(){var h=this.popChar();if(n.test(h)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)h+=this.popChar();return parseInt(h,10)},t.prototype.integerIncludingZero=function(){var h=this.popChar();if(r.test(h)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)h+=this.popChar();return parseInt(h,10)},t.prototype.patternCharacter=function(){var h=this.popChar();switch(h){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(h)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(h){switch(h===void 0&&(h=0),this.peekChar(h)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var h=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(h)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(h){for(var A="",w=0;w<h;w++){var C=this.popChar();if(e.test(C)===!1)throw Error("Expecting a HexDecimal digits");A+=C}var b=parseInt(A,16);return{type:"Character",value:b}},t.prototype.peekChar=function(h){return h===void 0&&(h=0),this.input[this.idx+h]},t.prototype.popChar=function(){var h=this.peekChar(0);return this.consumeChar(),h},t.prototype.consumeChar=function(h){if(h!==void 0&&this.input[this.idx]!==h)throw Error("Expected: '"+h+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(h){return{begin:h,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(h){return h.charCodeAt(0)}function a(h,A){h.length!==void 0?h.forEach(function(w){A.push(w)}):A.push(h)}function o(h,A){if(h[A]===!0)throw"duplicate flag "+A;h[A]=!0}function s(h){if(h===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var y=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(h){for(var A in h){var w=h[A];h.hasOwnProperty(A)&&(w.type!==void 0?this.visit(w):Array.isArray(w)&&w.forEach(function(C){this.visit(C)},this))}},v.prototype.visit=function(h){switch(h.type){case"Pattern":this.visitPattern(h);break;case"Flags":this.visitFlags(h);break;case"Disjunction":this.visitDisjunction(h);break;case"Alternative":this.visitAlternative(h);break;case"StartAnchor":this.visitStartAnchor(h);break;case"EndAnchor":this.visitEndAnchor(h);break;case"WordBoundary":this.visitWordBoundary(h);break;case"NonWordBoundary":this.visitNonWordBoundary(h);break;case"Lookahead":this.visitLookahead(h);break;case"NegativeLookahead":this.visitNegativeLookahead(h);break;case"Character":this.visitCharacter(h);break;case"Set":this.visitSet(h);break;case"Group":this.visitGroup(h);break;case"GroupBackReference":this.visitGroupBackReference(h);break;case"Quantifier":this.visitQuantifier(h);break}this.visitChildren(h)},v.prototype.visitPattern=function(h){},v.prototype.visitFlags=function(h){},v.prototype.visitDisjunction=function(h){},v.prototype.visitAlternative=function(h){},v.prototype.visitStartAnchor=function(h){},v.prototype.visitEndAnchor=function(h){},v.prototype.visitWordBoundary=function(h){},v.prototype.visitNonWordBoundary=function(h){},v.prototype.visitLookahead=function(h){},v.prototype.visitNegativeLookahead=function(h){},v.prototype.visitCharacter=function(h){},v.prototype.visitSet=function(h){},v.prototype.visitGroup=function(h){},v.prototype.visitGroupBackReference=function(h){},v.prototype.visitQuantifier=function(h){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var to=d(ar=>{"use strict";Object.defineProperty(ar,"__esModule",{value:!0});ar.partialRegex=ar.partialMatches=ar.getCaseInsensitivePattern=ar.escapeRegExp=ar.isWhitespaceRegExp=ar.isMultilineComment=ar.getTerminalParts=void 0;var tb=fl(),rb=new tb.RegExpParser,Qy=class extends tb.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Zy(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},eo=new Qy;function lK(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=rb.pattern(t),r=[];for(let n of e.value.value)eo.reset(t),eo.visit(n),r.push({start:eo.startRegex,end:eo.endRegex});return r}catch{return[]}}ar.getTerminalParts=lK;function cK(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,eo.reset(t),eo.visit(rb.pattern(t)),eo.multiline}catch{return!1}}ar.isMultilineComment=cK;function fK(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}ar.isWhitespaceRegExp=fK;function Zy(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}ar.escapeRegExp=Zy;function dK(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Zy(e)).join("")}ar.getCaseInsensitivePattern=dK;function pK(t,e){let r=nb(t),n=e.match(r);return!!n&&n[0].length>0}ar.partialMatches=pK;function nb(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}ar.partialRegex=nb});var Gt=d(ue=>{"use strict";var mK=ue&&ue.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),hK=ue&&ue.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),yK=ue&&ue.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&mK(e,t,r);return hK(e,t),e};Object.defineProperty(ue,"__esModule",{value:!0});ue.isPrimitiveType=ue.extractAssignments=ue.resolveTransitiveImports=ue.resolveImport=ue.resolveImportUri=ue.terminalRegex=ue.getRuleType=ue.getActionType=ue.getExplicitRuleType=ue.getTypeNameWithoutError=ue.getTypeName=ue.getActionAtElement=ue.isDataTypeRule=ue.isArrayOperator=ue.isArrayCardinality=ue.isOptionalCardinality=void 0;var be=yK(Ne()),ib=Pn(),Cf=Se(),gK=is(),vK=to();function TK(t){return t==="?"||t==="*"}ue.isOptionalCardinality=TK;function _K(t){return t==="*"||t==="+"}ue.isArrayCardinality=_K;function RK(t){return t==="+="}ue.isArrayOperator=RK;function rg(t){return ab(t,new Set)}ue.isDataTypeRule=rg;function ab(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,Cf.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!ab(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function ob(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,Cf.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return ob(e)}ue.getActionAtElement=ob;function ng(t){var e;if(be.isParserRule(t))return rg(t)?t.name:(e=ig(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=sb(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new gK.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}ue.getTypeName=ng;function AK(t){if(t)try{return ng(t)}catch{return}}ue.getTypeNameWithoutError=AK;function ig(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}ue.getExplicitRuleType=ig;function sb(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return ng(t.type.ref)}ue.getActionType=sb;function SK(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":rg(t)?t.name:(n=ig(t))!==null&&n!==void 0?n:t.name}ue.getRuleType=SK;function ub(t){return dl(t.definition)}ue.terminalRegex=ub;var ag=/[\s\S]/.source;function dl(t){if(be.isTerminalAlternatives(t))return bK(t);if(be.isTerminalGroup(t))return PK(t);if(be.isCharacterRange(t))return wK(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return wi(ub(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(be.isNegatedToken(t))return kK(t);if(be.isUntilToken(t))return CK(t);if(be.isRegexToken(t))return wi(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(be.isWildcard(t))return wi(ag,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}function bK(t){return wi(t.elements.map(dl).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function PK(t){return wi(t.elements.map(dl).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function CK(t){return wi(`${ag}*?${dl(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function kK(t){return wi(`(?!${dl(t.terminal)})${ag}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function wK(t){return t.right?wi(`[${eg(t.left)}-${eg(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):wi(eg(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function eg(t){return(0,vK.escapeRegExp)(t.value)}function wi(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function lb(t){if(t.path===void 0||t.path.length===0)return;let e=ib.Utils.dirname((0,Cf.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ib.Utils.resolvePath(e,r)}ue.resolveImportUri=lb;function og(t,e){let r=lb(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}ue.resolveImport=og;function EK(t,e){if(be.isGrammarImport(e)){let r=og(t,e);if(r){let n=tg(t,r);return n.push(r),n}return[]}else return tg(t,e)}ue.resolveTransitiveImports=EK;function tg(t,e,r=e,n=new Set,i=new Set){let a=(0,Cf.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=og(t,o);s&&tg(t,s,r,n,i)}}return Array.from(i)}function cb(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>cb(e)):[]}ue.extractAssignments=cb;var NK=["string","number","boolean","Date","bigint"];function $K(t){return NK.includes(t)}ue.isPrimitiveType=$K});var $f=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.flattenPlainType=ot.mergePropertyTypes=ot.plainToTypes=ot.isPlainStringType=ot.isPlainPrimitiveType=ot.isPlainValueType=ot.isPlainPropertyUnion=ot.isPlainArrayType=ot.isPlainReferenceType=ot.isPlainUnion=ot.isPlainInterface=void 0;var fb=is();function OK(t){return!db(t)}ot.isPlainInterface=OK;function db(t){return"type"in t}ot.isPlainUnion=db;function kf(t){return"referenceType"in t}ot.isPlainReferenceType=kf;function wf(t){return"elementType"in t}ot.isPlainArrayType=wf;function ug(t){return"types"in t}ot.isPlainPropertyUnion=ug;function Ef(t){return"value"in t}ot.isPlainValueType=Ef;function pb(t){return"primitive"in t}ot.isPlainPrimitiveType=pb;function mb(t){return"string"in t}ot.isPlainStringType=mb;function IK(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new fb.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new fb.UnionType(n.name,{reflection:n.reflection,declared:n.declared});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let a of n.superTypes){let o=e.get(a)||r.get(a);o&&i.superTypes.add(o)}for(let a of n.subTypes){let o=e.get(a)||r.get(a);o&&i.subTypes.add(o)}for(let a of n.properties){let o=DK(a,e,r);i.properties.push(o)}}for(let n of t.unions){let i=r.get(n.name);i.type=pl(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}ot.plainToTypes=IK;function DK(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:pl(t.type,void 0,e,r)}}function pl(t,e,r,n){if(wf(t))return{elementType:pl(t.elementType,e,r,n)};if(kf(t))return{referenceType:pl(t.referenceType,void 0,r,n)};if(ug(t))return{types:t.types.map(i=>pl(i,e,r,n))};if(mb(t))return{string:t.string};if(pb(t))return{primitive:t.primitive};if(Ef(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function xK(t,e){let r=Nf(t),n=Nf(e);for(let i of n)LK(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}ot.mergePropertyTypes=xK;function LK(t,e){return t.some(r=>sg(r,e))}function sg(t,e){return wf(t)&&wf(e)?sg(t.elementType,e.elementType):kf(t)&&kf(e)?sg(t.referenceType,e.referenceType):Ef(t)&&Ef(e)?t.value===e.value:!1}function Nf(t){return ug(t)?t.types.flatMap(e=>Nf(e)):[t]}ot.flattenPlainType=Nf});var Rb=d(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.collectInferredTypes=void 0;var qK=ss(),dg=Cn(),mt=Ne(),Ei=Gt(),yb=$f(),lg=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:hb(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return _b(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(hb(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=ro();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function MK(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(gb)}}function hb(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>gb(e))}}function gb(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function FK(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...vb(i,u));let a=WK(n),o=BK(a),s=VK(a,o,r);for(let u of e){let l=jK(u);s.unions.push({name:u.name,reflection:!1,declared:!1,type:l,subTypes:new Set,superTypes:new Set})}return s}Of.collectInferredTypes=FK;function jK(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=cg(t.definition,r);return e?{primitive:"string"}:n}function cg(t,e){var r,n,i;if(t.cardinality)return e();if((0,mt.isAlternatives)(t))return{types:t.elements.map(a=>cg(a,e))};if((0,mt.isGroup)(t)||(0,mt.isUnorderedGroup)(t))return t.elements.length!==1?e():cg(t.elements[0],e);if((0,mt.isRuleCall)(t)){let a=(r=t.rule)===null||r===void 0?void 0:r.ref;return a?(0,mt.isTerminalRule)(a)?{primitive:(i=(n=a.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string"}:{value:a.name}:e()}else if((0,mt.isKeyword)(t))return{string:t.value};return e()}function vb(t,e){let r=ro(e),n=new lg(t,r);return e.definition&&fg(n,n.root,e.definition),n.getTypes()}function ro(t){return{name:(0,mt.isParserRule)(t)||(0,mt.isAction)(t)?(0,Ei.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function fg(t,e,r){let n=(0,Ei.isOptionalCardinality)(r.cardinality);if((0,mt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,ro()));for(let a of r.elements){let o=t.connect(e,ro());i.push(fg(t,o,a))}return t.merge(...i)}else if((0,mt.isGroup)(r)||(0,mt.isUnorderedGroup)(r)){let i=t.connect(e,ro()),a;n&&(a=t.connect(e,ro()));for(let o of r.elements)i=fg(t,i,o);return a?t.merge(a,i):i}else{if((0,mt.isAction)(r))return GK(t,e,r);(0,mt.isAssignment)(r)?UK(e,r):(0,mt.isRuleCall)(r)&&HK(t,e,r)}return e}function GK(t,e,r){var n;if(!t.hasLeafNode(e)){let a=MK(e);t.connect(e,a)}let i=t.connect(e,ro(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,qK.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:no(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function UK(t,e){let r={types:new Set,reference:!1};Tb(e.terminal,r);let n=no(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Ei.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function Tb(t,e){if((0,mt.isAlternatives)(t)||(0,mt.isUnorderedGroup)(t)||(0,mt.isGroup)(t))for(let r of t.elements)Tb(r,e);else if((0,mt.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,mt.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Ei.getRuleType)(t.rule.ref));else if((0,mt.isCrossReference)(t)&&t.type.ref){let r=(0,Ei.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function HK(t,e,r){let n=r.rule.ref;if((0,mt.isParserRule)(n)&&n.fragment){let i=KK(n,t.context);(0,Ei.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,mt.isParserRule)(n)&&e.ruleCalls.push((0,Ei.getRuleType)(n))}function KK(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Ei.getTypeNameWithoutError)(t),a=vb(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function WK(t){let e=new Map,r=[],n=_b(t).map(i=>i.alt);for(let i of n){let a={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.superTypes.add(i.name)}return Array.from(e.values())}function _b(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new dg.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let y=a.find(v=>v.name===f.name);y?(y.type=(0,yb.mergePropertyTypes)(y.type,f.type),f.astNodes.forEach(v=>y.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function BK(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new dg.MultiMap;for(let i of t)for(let a of i.superTypes)n.add(a,i.name);for(let[i,a]of n.entriesGroupedByKey())if(!e.has(i)){let o={declared:!1,name:i,reflection:!0,subTypes:new Set,superTypes:new Set,type:no(!1,!1,a)};r.push(o)}return r}function VK(t,e,r){let n=new dg.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),a={interfaces:[],unions:e},o=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,a.interfaces.push(s);else{let l=no(!1,!1,Array.from(u)),c=o.get(s.name);if(c)c.type=(0,yb.mergePropertyTypes)(c.type,l);else{let f={name:s.name,declared:!1,reflection:!0,subTypes:u,superTypes:s.superTypes,type:l};a.unions.push(f),o.set(s.name,f)}}else a.interfaces.push(s)}for(let s of a.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!o.has(u)));return a}function no(t,e,r){if(t)return{elementType:no(!1,e,r)};if(e)return{referenceType:no(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Ei.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>no(!1,!1,[n]))}}});var mg=d(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.typeDefinitionToPropertyType=ls.collectDeclaredTypes=void 0;var If=Ne(),pg=Gt();function zK(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:us(s.type)});let a=new Set;for(let s of n.superTypes)s.ref&&a.add((0,pg.getTypeName)(s.ref));let o={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:a,subTypes:new Set};r.interfaces.push(o)}for(let n of e){let i={name:n.name,declared:!0,reflection:!0,type:us(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}ls.collectDeclaredTypes=zK;function us(t){if((0,If.isArrayType)(t))return{elementType:us(t.elementType)};if((0,If.isReferenceType)(t))return{referenceType:us(t.referenceType)};if((0,If.isUnionType)(t))return{types:t.types.map(us)};if((0,If.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,pg.getTypeNameWithoutError)(r);if(n)return(0,pg.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}ls.typeDefinitionToPropertyType=us});var Sb=d(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.collectAllAstResources=cs.collectTypeResources=void 0;var YK=Rb(),XK=mg(),JK=Se(),QK=Ne(),Ab=Gt();function ZK(t,e){let r=hg(t,e),n=(0,XK.collectDeclaredTypes)(r.interfaces,r.types),i=(0,YK.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}cs.collectTypeResources=ZK;function hg(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,JK.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,QK.isParserRule)(o)&&!o.fragment&&((0,Ab.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,Ab.resolveImport)(e,s)).filter(s=>s!==void 0);hg(o,e,r,n)}}}return n}cs.collectAllAstResources=hg});var vg=d(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.specifyAstNodeProperties=Xn.createAstTypes=Xn.collectValidationAst=Xn.collectAst=void 0;var Pb=as(),Ni=is(),Cb=Sb(),eW=$f();function tW(t,e){let{inferred:r,declared:n}=(0,Cb.collectTypeResources)(t,e);return Df(r,n)}Xn.collectAst=tW;function rW(t,e){let{inferred:r,declared:n,astResources:i}=(0,Cb.collectTypeResources)(t,e);return{astResources:i,inferred:Df(n,r),declared:Df(r,n)}}Xn.collectValidationAst=rW;function Df(t,e){var r,n;let i={interfaces:(0,Pb.sortInterfacesTopologically)(bb(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:bb(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},a=(0,eW.plainToTypes)(i);return kb(a),a}Xn.createAstTypes=Df;function bb(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function kb(t){let e=iW(t),r=Array.from(e.values());aW(r),oW(r),nW(e)}Xn.specifyAstNodeProperties=kb;function nW(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeNames.add(n.name);let i=Array.from(n.superTypes).map(a=>t.get(a.name)).filter(a=>a!==void 0);for(let a of i)n.typeNames.forEach(o=>a.typeNames.add(o));e.push(...i.filter(a=>!r.has(a)))}}function iW({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,a)=>(i.set(a.name,a),i),new Map),n=new Map;for(let i of e)n.set(i,yg(i.type,new Set));for(let[i,a]of n)a&&r.delete(i.name);return r}function yg(t,e){if(e.has(t))return!0;if(e.add(t),(0,Ni.isPropertyUnion)(t))return t.types.every(r=>yg(r,e));if((0,Ni.isValueType)(t)){let r=t.value;return(0,Ni.isUnionType)(r)?yg(r.type,e):!1}else return(0,Ni.isPrimitiveType)(t)||(0,Ni.isStringType)(t)}function aW(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function oW(t){let e=t.filter(Ni.isInterfaceType);for(let n of e){let i=n.properties.flatMap(a=>gg(a.type,new Set));for(let a of i)a.containerTypes.add(n)}let r=sW(t);uW(r)}function gg(t,e){return(0,Ni.isPropertyUnion)(t)?t.types.flatMap(r=>gg(r,e)):(0,Ni.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Ni.isArrayType)(t)?gg(t.elementType,e):[]}function sW(t){function e(o){let s=[o];a.add(o);let u=[...i.subTypes.get(o.name),...i.superTypes.get(o.name)];for(let l of u){let c=r.get(l);c&&!a.has(c)&&s.push(...e(c))}return s}let r=new Map(t.map(o=>[o.name,o])),n=[],i=(0,Pb.collectTypeHierarchy)(t),a=new Set;for(let o of t)a.has(o)||n.push(e(o));return n}function uW(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var _g=d(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.interpretAstReflection=void 0;var lW=ir(),cW=Cn(),fW=Ne(),dW=vg(),fs=as();function pW(t,e){let r;(0,fW.isGrammar)(t)?r=(0,dW.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=mW(r),a=hW(r),o=(0,fs.collectTypeHierarchy)((0,fs.mergeTypesAndInterfaces)(r)).superTypes;return new Tg({allTypes:n,references:i,metaData:a,superTypes:o})}xf.interpretAstReflection=pW;var Tg=class extends lW.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function mW(t){let e=new cW.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of(0,fs.findReferenceTypes)(i.type))e.add(n.name,[i.name,a]);for(let i of n.interfaceSuperTypes){let a=e.get(i.name);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function hW(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(o=>(0,fs.hasArrayType)(o.type)),a=n.filter(o=>!(0,fs.hasArrayType)(o.type)&&(0,fs.hasBooleanType)(o.type));(i.length>0||a.length>0)&&e.set(r.name,{name:r.name,mandatory:yW(i,a)})}return e}function yW(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}});var wb=d(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.LangiumGrammarGrammar=void 0;var gW=Tt(),Lf,vW=()=>Lf??(Lf=(0,gW.loadGrammarFromJson)(`{
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
}`));qf.LangiumGrammarGrammar=vW});var Eb=d(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.LangiumGrammarGeneratedModule=Yr.LangiumGrammarGeneratedSharedModule=Yr.LangiumGrammarParserConfig=Yr.LangiumGrammarLanguageMetaData=void 0;var TW=Ne(),_W=wb();Yr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Yr.LangiumGrammarParserConfig={maxLookahead:3};Yr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new TW.LangiumGrammarAstReflection};Yr.LangiumGrammarGeneratedModule={Grammar:()=>(0,_W.LangiumGrammarGrammar)(),LanguageMetaData:()=>Yr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Yr.LangiumGrammarParserConfig}}});var Cr=d(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.Deferred=kt.MutexLock=kt.interruptAndCheck=kt.isOperationCancelled=kt.OperationCancelled=kt.setInterruptionPeriod=kt.startCancelableOperation=kt.delayNextTick=void 0;var Mf=bi();function Nb(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}kt.delayNextTick=Nb;var Rg=0,$b=10;function RW(){return Rg=Date.now(),new Mf.CancellationTokenSource}kt.startCancelableOperation=RW;function AW(t){$b=t}kt.setInterruptionPeriod=AW;kt.OperationCancelled=Symbol("OperationCancelled");function Ob(t){return t===kt.OperationCancelled}kt.isOperationCancelled=Ob;async function SW(t){if(t===Mf.CancellationToken.None)return;let e=Date.now();if(e-Rg>=$b&&(Rg=e,await Nb()),t.isCancellationRequested)throw kt.OperationCancelled}kt.interruptAndCheck=SW;var Ag=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Mf.CancellationTokenSource}lock(e){this.cancel();let r=new Mf.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{Ob(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};kt.MutexLock=Ag;var Sg=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};kt.Deferred=Sg});var jf=d(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.DefaultScopeComputation=void 0;var bg=bi(),Ib=Se(),bW=Cn(),Db=Cr(),Pg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=bg.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Ib.streamContents,i=bg.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,Db.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=bg.CancellationToken.None){let n=e.parseResult.value,i=new bW.MultiMap;for(let a of(0,Ib.streamAllContents)(n))await(0,Db.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Ff.DefaultScopeComputation=Pg});var Uf=d(la=>{"use strict";Object.defineProperty(la,"__esModule",{value:!0});la.DefaultScopeProvider=la.EMPTY_SCOPE=la.StreamScope=void 0;var PW=Se(),Gf=jt(),ds=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};la.StreamScope=ds;la.EMPTY_SCOPE={getElement(){},getAllElements(){return Gf.EMPTY_STREAM}};var Cg=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,PW.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Gf.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new ds((0,Gf.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Gf.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new ds(i,r,n)}getGlobalScope(e,r){return new ds(this.indexManager.allElements(e))}};la.DefaultScopeProvider=Cg});var $i=d(ps=>{"use strict";Object.defineProperty(ps,"__esModule",{value:!0});ps.relativeURI=ps.equalURI=void 0;function CW(t,e){return t?.toString()===e?.toString()}ps.equalURI=CW;function kW(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}ps.relativeURI=kW});var qb=d(hs=>{"use strict";Object.defineProperty(hs,"__esModule",{value:!0});hs.LangiumGrammarScopeComputation=hs.LangiumGrammarScopeProvider=void 0;var wW=jf(),kg=Uf(),ms=Se(),xb=qe(),Lb=jt(),EW=$i(),Xr=Ne(),wg=Gt(),Eg=class extends kg.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Xr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,ms.getDocument)(r.container).precomputedScopes,a=(0,ms.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,Lb.stream)(s).filter(u=>u.type===Xr.Interface||u.type===Xr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,ms.getContainerOfType)(r.container,Xr.isGrammar);if(!n)return kg.EMPTY_SCOPE;let i=(0,Lb.stream)(n.imports).map(wg.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,EW.equalURI)(o.documentUri,s)));return e===Xr.AbstractType&&(a=a.filter(o=>o.type===Xr.Interface||o.type===Xr.Type)),new kg.StreamScope(a)}};hs.LangiumGrammarScopeProvider=Eg;var Ng=class extends wW.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Xr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(a,a.name,n))}(0,ms.streamAllContents)(e).forEach(a=>{if((0,Xr.isAction)(a)&&a.inferredType){let o=(0,wg.getActionType)(a);o&&r.push(this.createInterfaceDescription(a,o,n))}})}}processNode(e,r,n){(0,Xr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Xr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,this.createInterfaceDescription(o,o.name,r))}}processActionNode(e,r,n){let i=(0,ms.findRootNode)(e);if(i&&(0,Xr.isAction)(e)&&e.inferredType){let a=(0,wg.getActionType)(e);a&&n.add(i,this.createInterfaceDescription(e,a,r))}}createInterfaceDescription(e,r,n=(0,ms.getDocument)(e)){var i;let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,xb.toDocumentSegment)(a),selectionSegment:(0,xb.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};hs.LangiumGrammarScopeComputation=Ng});var qg=d(gr=>{"use strict";var NW=gr&&gr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),$W=gr&&gr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),OW=gr&&gr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&NW(e,t,r);return $W(e,t),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.LangiumGrammarValidator=gr.IssueCodes=gr.registerValidationChecks=void 0;var $g=Ho(),ca=Se(),fa=Cn(),Og=qe(),da=Tt(),Ig=jt(),Xe=OW(Ne()),Dg=Ne(),Ut=Gt(),IW=mg(),xg=$f();function DW(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}gr.registerValidationChecks=DW;var yr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(yr=gr.IssueCodes||(gr.IssueCodes={}));var Lg=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:yr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Xe.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Xe.isParserRule(a)&&!(0,Ut.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:yr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,Ut.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,Ig.stream)(i.rules).filter(a=>!ml(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,Ig.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new fa.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,Ut.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new fa.MultiMap;for(let i of e.imports){let a=(0,Ut.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[$g.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,Ut.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new fa.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,Ig.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,Ut.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Xe.isParserRule)){if(ml(u))continue;let l=(0,Ut.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,Ut.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:yr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let y=(0,da.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:yr.InvalidInfers,data:(0,Og.toDocumentSegment)(y)})}}else if(l&&c){let y=(0,da.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:yr.InvalidInfers,data:(0,Og.toDocumentSegment)(y)})}}for(let u of(0,ca.streamAllContents)(e).filter(Xe.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,Ut.getTypeNameWithoutError)(u);if(u.type&&f&&o.has(f)===c){let y=c?(0,da.findNodeForKeyword)(u.$cstNode,"infer"):(0,da.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?yr.SuperfluousInfer:yr.MissingInfer,data:(0,Og.toDocumentSegment)(y)})}else if(l&&f&&o.has(f)&&c&&u.$cstNode){let y=(0,da.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,da.findNodeForKeyword)(u.$cstNode,"{");y&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:yr.SuperfluousInfer,data:{start:v.range.end,end:y.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:yr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,Ut.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,ca.getContainerOfType)(e,i=>Xe.isTerminalRule(i)||Xe.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Xe.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Xe.isTerminalRule(n)&&n.fragment&&(0,ca.getContainerOfType)(e,Xe.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:yr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,Ut.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:yr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:yr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,da.getAllReachableRules)(e,!0);for(let i of e.rules)Xe.isTerminalRule(i)&&i.hidden||ml(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[$g.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new fa.MultiMap,i=new Set;for(let l of e.rules)Xe.isTerminalRule(l)&&l.name&&n.add(l.name,l),Xe.isParserRule(l)&&(0,ca.streamAllContents)(l).filter(Xe.isKeyword).forEach(f=>i.add(f.value));let a=new fa.MultiMap,o=new fa.MultiMap;for(let l of e.imports){let c=(0,Ut.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let y of f.rules)Xe.isTerminalRule(y)&&y.name?a.add(y.name,l):Xe.isParserRule(y)&&y.name&&(0,ca.streamAllContents)(y).filter(Xe.isKeyword).forEach(h=>o.add(h.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new fa.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new fa.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(y=>!f.includes(y)).forEach(y=>u.add(y,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!ml(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:yr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&xW.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,ca.getContainerOfType)(e,Dg.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,Ut.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:yr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,ca.streamAllContents)(e).filter(Xe.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[$g.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ml(e))return;let n=e.dataType,i=(0,Ut.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,Dg.isRuleCall)(e.terminal)&&(0,Dg.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,ca.streamAllContents)(e.terminal).map(a=>Xe.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,IW.typeDefinitionToPropertyType)(n.type),a=(0,xg.flattenPlainType)(i),o=!1,s=!1;for(let u of a)(0,xg.isPlainReferenceType)(u)?o=!0:(0,xg.isPlainReferenceType)(u)||(s=!0);o&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,Ut.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Xe.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Xe.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,da.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Xe.isRuleCall(e.terminal)&&Xe.isParserRule(e.terminal.rule.ref)&&!(0,Ut.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkFragmentsInTypes(e,r){var n,i;Xe.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){Xe.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&Xe.isParserRule(e.ref)&&!(0,Ut.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,Ut.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Xe.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};gr.LangiumGrammarValidator=Lg;function ml(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var xW=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Wf=d(kn=>{"use strict";Object.defineProperty(kn,"__esModule",{value:!0});kn.DocumentValidator=kn.toDiagnosticSeverity=kn.getDiagnosticRange=kn.DefaultDocumentValidator=void 0;var Jr=xe(),Mb=Tt(),LW=Se(),qW=qe(),Hf=Cr(),Mg=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Jr.CancellationToken.None){let n=e.parseResult,i=[];await(0,Hf.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Jr.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Kf.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Jr.Range.create(0,0,0,0);else{let u=Jr.Position.create(s.endLine-1,s.endColumn);o=Jr.Range.create(u,u)}}}else o=(0,qW.tokenToRange)(a.token);if(o){let s={severity:Jr.DiagnosticSeverity.Error,range:o,message:a.message,code:Kf.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Kf.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Hf.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Hf.interruptAndCheck)(r),i}async validateAst(e,r,n=Jr.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,LW.streamAst)(e).map(async o=>{await(0,Hf.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:Fb(n),severity:jb(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};kn.DefaultDocumentValidator=Mg;function Fb(t){if(Jr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,Mb.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,Mb.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}kn.getDiagnosticRange=Fb;function jb(t){switch(t){case"error":return Jr.DiagnosticSeverity.Error;case"warning":return Jr.DiagnosticSeverity.Warning;case"info":return Jr.DiagnosticSeverity.Information;case"hint":return Jr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}kn.toDiagnosticSeverity=jb;var Kf;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Kf=kn.DocumentValidator||(kn.DocumentValidator={}))});var Wb=d(Jn=>{"use strict";var MW=Jn&&Jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FW=Jn&&Jn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),jW=Jn&&Jn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&MW(e,t,r);return FW(e,t),e};Object.defineProperty(Jn,"__esModule",{value:!0});Jn.LangiumGrammarCodeActionProvider=void 0;var Qr=xe(),GW=Pn(),Gb=Se(),Ub=qe(),UW=Tt(),Hb=to(),Kb=$i(),HW=Wf(),Fg=jW(Ne()),Zr=qg(),jg=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Zr.IssueCodes.GrammarNameUppercase:case Zr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Zr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Zr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Zr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Zr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Zr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Zr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Zr.IssueCodes.InvalidInfers:case Zr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Zr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Zr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case HW.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,Ub.findLeafNodeAtOffset)(i,n),o=(0,Gb.getContainerOfType)(a?.element,Fg.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,Hb.escapeRegExp)(s)}-${(0,Hb.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,UW.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&Fg.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,Ub.findLeafNodeAtOffset)(a,i),s=(0,Gb.getContainerOfType)(o?.element,Fg.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(y=>y.name===r.refText),l=[],c=-1,f=-1;for(let y of u){if((0,Kb.equalURI)(y.documentUri,n.uri))continue;let v=KW(n.uri,y.documentUri),h,A="",w=n.parseResult.value,C=w.imports.find(b=>b.path&&v<b.path);if(C)h=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(w.imports.length>0){let b=w.imports[w.imports.length-1].$cstNode.range.end;b&&(h={line:b.line+1,character:0})}else w.rules.length>0&&(h=(a=w.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,A=`
`);h&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:h,end:h},newText:`import '${v}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Jn.LangiumGrammarCodeActionProvider=jg;function KW(t,e){let r=GW.Utils.dirname(t),n=(0,Kb.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Vf=d(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.DefaultFoldingRangeProvider=void 0;var Gg=xe(),WW=Se(),BW=qe(),Ug=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,WW.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,BW.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,Gg.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),Gg.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===Gg.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Bf.DefaultFoldingRangeProvider=Ug});var Bb=d(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.LangiumGrammarFoldingRangeProvider=void 0;var VW=Vf(),zW=Ne(),Hg=class extends VW.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,zW.isParserRule)(e)}};zf.LangiumGrammarFoldingRangeProvider=Hg});var Bg=d(wn=>{"use strict";Object.defineProperty(wn,"__esModule",{value:!0});wn.Formatting=wn.FormattingRegion=wn.DefaultNodeFormatter=wn.AbstractFormatter=void 0;var Yf=Tt(),Kg=ir(),YW=Se(),Vb=qe(),hl=jt(),Wg=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Xf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let y=this.nodeModeToKey(s,u),v=i.get(y),h=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||A<=h)&&i.set(y,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,YW.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,y=(0,Kg.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),h=r.get(v);if(r.delete(v),h){let C=this.createTextEdit(l,f,h,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let A=this.nodeModeToKey(f,"append"),w=r.get(A);if(r.delete(A),w){let C=(0,Vb.getNextNode)(f);if(C){let b=this.createTextEdit(f,C,w,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!h&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}y&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let h="";v>0&&(h=(i.options.insertSpaces?" ":"	").repeat(v));let A=r.text.split(`
`);A[0]=l+A[0];for(let w=0;w<A.length;w++){let C=o+w,b={character:0,line:C};if(v>0)s.push({newText:h,range:{start:b,end:b}});else{let S=A[w],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:C,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let y=[];return u!==void 0?y.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?y.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&y.push(this.createTabTextEdit(o,Boolean(e),i)),(0,Kg.isLeafCstNode)(r)&&(i.indentation=f),y}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new hl.TreeStreamImpl(i,a=>this.iterateCst(a,r)):hl.EMPTY_STREAM}iterateCst(e,r){if(!(0,Kg.isCompositeCstNode)(e))return hl.EMPTY_STREAM;let n=r.indentation;return new hl.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,hl.DONE_RESULT))}};wn.AbstractFormatter=Wg;var Xf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new kr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new kr(r,this.collector)}property(e,r){let n=(0,Yf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new kr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Yf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new kr(r,this.collector)}keyword(e,r){let n=(0,Yf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new kr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Yf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new kr(r,this.collector)}cst(e){return new kr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new kr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new kr((0,Vb.getInteriorNodes)(a,o),this.collector)}};wn.DefaultNodeFormatter=Xf;var kr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new kr(this.nodes.slice(e,r),this.collector)}};wn.FormattingRegion=kr;var XW;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var y,v,h,A,w,C;let b=(y=c.lines)!==null&&y!==void 0?y:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(h=c.tabs)!==null&&h!==void 0?h:0,F=(A=f.tabs)!==null&&A!==void 0?A:0,W=(w=c.characters)!==null&&w!==void 0?w:0,te=(C=f.characters)!==null&&C!==void 0?C:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<te?-1:W>te?1:0}})(XW=wn.Formatting||(wn.Formatting={}))});var zb=d(Qn=>{"use strict";var JW=Qn&&Qn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),QW=Qn&&Qn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ZW=Qn&&Qn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&JW(e,t,r);return QW(e,t),e};Object.defineProperty(Qn,"__esModule",{value:!0});Qn.LangiumGrammarFormatter=void 0;var Ce=Bg(),pa=ZW(Ne()),Vg=class extends Ce.AbstractFormatter{format(e){if(pa.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Ce.Formatting.noSpace());else if(pa.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Ce.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Ce.Formatting.oneSpace()):r.property("name").append(Ce.Formatting.noSpace()),r.properties("parameters").append(Ce.Formatting.noSpace()),r.keywords(",").append(Ce.Formatting.oneSpace()),r.keywords("<").append(Ce.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Ce.Formatting.noSpace()),r.interior(i,n).prepend(Ce.Formatting.indent()),n.prepend(Ce.Formatting.fit(Ce.Formatting.noSpace(),Ce.Formatting.newLine())),r.node(e).prepend(Ce.Formatting.noIndent())}else if(pa.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Ce.Formatting.oneSpace()),r.keyword("returns").append(Ce.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Ce.Formatting.oneSpace()),r.keyword(":").prepend(Ce.Formatting.noSpace()),r.keyword(";").prepend(Ce.Formatting.fit(Ce.Formatting.noSpace(),Ce.Formatting.newLine())),r.node(e).prepend(Ce.Formatting.noIndent())}else if(pa.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Ce.Formatting.noSpace()),r.keywords(".","+=","=").surround(Ce.Formatting.noSpace()),r.keyword("}").prepend(Ce.Formatting.noSpace())}else if(pa.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Ce.Formatting.oneSpace());else if(pa.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Ce.Formatting.noSpace());else if(pa.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Ce.Formatting.noSpace()),r.keyword(",").append(Ce.Formatting.oneSpace()),r.properties("arguments").append(Ce.Formatting.noSpace())}pa.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Ce.Formatting.noSpace())}};Qn.LangiumGrammarFormatter=Vg});var Zf=d(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.SemanticTokensDecoder=wt.AbstractSemanticTokenProvider=wt.SemanticTokensBuilder=wt.DefaultSemanticTokenOptions=wt.AllSemanticTokenModifiers=wt.AllSemanticTokenTypes=void 0;var pe=xe(),Jf=Tt(),e5=Se(),t5=Cr(),r5=qe();wt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};wt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};wt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(wt.AllSemanticTokenTypes),tokenModifiers:Object.keys(wt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Qf=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};wt.SemanticTokensBuilder=Qf;var zg=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Qf;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,a=(0,e5.streamAst)(i,{range:this.currentRange}).iterator(),o;do if(o=a.next(),!o.done){await(0,t5.interruptAndCheck)(n);let s=o.value;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.currentRange&&!(0,r5.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let o=wt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=wt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),y=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,y-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let y=u+1;y<l;y++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:y+1,character:0}),this.currentTokensBuilder.push(y,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,Jf.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,Jf.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,Jf.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,Jf.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};wt.AbstractSemanticTokenProvider=zg;var n5;(function(t){function e(n,i){let a=new Map;Object.entries(wt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(n5=wt.SemanticTokensDecoder||(wt.SemanticTokensDecoder={}))});var Yb=d(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.LangiumGrammarSemanticTokenProvider=void 0;var ma=xe(),i5=Zf(),ha=Ne(),Yg=class extends i5.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,ha.isAssignment)(e)?r({node:e,property:"feature",type:ma.SemanticTokenTypes.property}):(0,ha.isAction)(e)?e.feature&&r({node:e,property:"feature",type:ma.SemanticTokenTypes.property}):(0,ha.isReturnType)(e)?r({node:e,property:"name",type:ma.SemanticTokenTypes.type}):(0,ha.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ma.SemanticTokenTypes.type}):(0,ha.isParameter)(e)?r({node:e,property:"name",type:ma.SemanticTokenTypes.parameter}):(0,ha.isParameterReference)(e)?r({node:e,property:"parameter",type:ma.SemanticTokenTypes.parameter}):(0,ha.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ma.SemanticTokenTypes.type}):(0,ha.isTypeAttribute)(e)&&r({node:e,property:"name",type:ma.SemanticTokenTypes.property})}};ed.LangiumGrammarSemanticTokenProvider=Yg});var Jb=d(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.LangiumGrammarNameProvider=void 0;var a5=ss(),o5=Tt(),Xb=Ne(),Xg=class extends a5.DefaultNameProvider{getName(e){return(0,Xb.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,Xb.isAssignment)(e)?(0,o5.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};td.LangiumGrammarNameProvider=Xg});var nd=d(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.DefaultReferences=void 0;var s5=Tt(),Qb=ir(),ya=Se(),Jg=qe(),Zb=jt(),u5=$i(),Qg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,s5.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,Qb.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,Qb.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Jg.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,Zb.stream)(n)}findLocalReferences(e,r=!1){let i=(0,ya.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,ya.streamAst)(i).forEach(o=>{(0,ya.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,ya.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,ya.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Jg.toDocumentSegment)(u),local:(0,u5.equalURI)((0,ya.getDocument)(u.element).uri,(0,ya.getDocument)(e).uri)})}})}),(0,Zb.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,ya.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Jg.toDocumentSegment)(r),local:!0}}}};rd.DefaultReferences=Qg});var iP=d(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.LangiumGrammarReferences=void 0;var l5=nd(),or=Se(),eP=qe(),tP=Tt(),rP=jt(),Zg=$i(),Jt=Ne(),nP=Gt(),id=as(),ev=class extends l5.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,tP.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Jt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Jt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Jt.isTypeAttribute)(e)){let i=(0,or.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Jt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,or.getContainerOfType)(e,Jt.isInterface);if(a){let o=(0,id.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,Zg.equalURI)((0,or.getDocument)(e).uri,(0,or.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,rP.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,or.getContainerOfType)(e,Jt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,id.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,rP.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Jt.isParserRule)(e)){let i=(0,nP.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,or.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,or.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,eP.toDocumentSegment)(a),local:(0,Zg.equalURI)((0,or.getDocument)(i).uri,(0,or.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,tP.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,or.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,or.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,eP.toDocumentSegment)(a),local:(0,Zg.equalURI)((0,or.getDocument)(e).uri,(0,or.getDocument)(r).uri)})}let i=(0,or.getContainerOfType)(e,Jt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,or.getContainerOfType)(e,Jt.isParserRule),i=(0,nP.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Jt.isInterface)(n.returnType.ref)||(0,Jt.isType)(n.returnType.ref))){let a=(0,id.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,id.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Jt.isParserRule)(o)||(0,Jt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,or.streamAst)(r).filter(a=>{var o,s;return(0,Jt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Jt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Jt.isParserRule)(a)||(0,Jt.isAction)(a))&&n.push(a)}),n}};ad.LangiumGrammarReferences=ev});var nv=d(en=>{"use strict";var c5=en&&en.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),f5=en&&en.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),d5=en&&en.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&c5(e,t,r);return f5(e,t),e};Object.defineProperty(en,"__esModule",{value:!0});en.findFirstFeatures=en.findNextFeatures=void 0;var sr=d5(Ne()),Oi=Gt(),p5=ir(),m5=Se(),h5=Tt();function y5(t,e){let r={stacks:t,tokens:e};return g5(r),r.stacks.flat().forEach(i=>{i.property=void 0}),sP(r.stacks).map(i=>i[i.length-1])}en.findNextFeatures=y5;function tv(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(sr.isGroup(u.$container)){s=u.$container;break}else if(sr.isAbstractElement(u.$container))u=u.$container;else break;if((0,Oi.isArrayCardinality)(u.cardinality)){let l=ys({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...oP({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,Oi.isOptionalCardinality)(c.feature.cardinality)||(0,Oi.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...tv({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function aP(t){return(0,p5.isAstNode)(t)&&(t={feature:t}),ys({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}en.findFirstFeatures=aP;function ys(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(sr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(sr.isGroup(u))return oP(i,0,a,o,s).map(c=>od(c,u.cardinality,a));if(sr.isAlternatives(u)||sr.isUnorderedGroup(u))return u.elements.flatMap(c=>ys({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>od(c,u.cardinality,a));if(sr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return ys({next:c,cardinalities:a,visited:o,plus:s}).map(f=>od(f,u.cardinality,a))}else{if(sr.isAction(u))return tv({next:{feature:u,new:!0,type:(0,Oi.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(sr.isRuleCall(u)&&sr.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,Oi.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return ys({next:f,cardinalities:a,visited:o,plus:s}).map(y=>od(y,u.cardinality,a))}else return[i]}}function od(t,e,r){return r.set(t.feature,e),t}function oP(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...ys({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Oi.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function g5(t){for(let e of t.tokens){let r=sP(t.stacks,e);t.stacks=r}}function sP(t,e){let r=[];for(let n of t)r.push(...v5(n,e));return r}function v5(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(T5)),i=[];for(;t.length>0;){let a=t.pop(),o=tv({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?rv(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,Oi.isOptionalCardinality)(s.feature.cardinality)||(0,Oi.isOptionalCardinality)(r.get(s.feature))))break}return i}function T5(t){if(t.cardinality==="+")return!0;let e=(0,m5.getContainerOfType)(t,sr.isAssignment);return!!(e&&e.cardinality==="+")}function rv(t,e){if(sr.isKeyword(t))return t.value===e.image;if(sr.isRuleCall(t))return _5(t.rule.ref,e);if(sr.isCrossReference(t)){let r=(0,h5.getCrossReferenceTerminal)(t);if(r)return rv(r,e)}return!1}function _5(t,e){return sr.isParserRule(t)?aP(t.definition).some(n=>rv(n.feature,e)):sr.isTerminalRule(t)?new RegExp((0,Oi.terminalRegex)(t)).test(e.image):!1}});var ud=d(tn=>{"use strict";var R5=tn&&tn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),A5=tn&&tn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),S5=tn&&tn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&R5(e,t,r);return A5(e,t),e};Object.defineProperty(tn,"__esModule",{value:!0});tn.DefaultCompletionProvider=tn.mergeCompletionProviderOptions=void 0;var yl=xe(),gl=S5(Ne()),b5=Gt(),P5=Se(),C5=qe(),uP=Tt(),lP=jt(),sd=nv();function k5(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}tn.mergeCompletionProviderOptions=k5;var iv=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=C=>{let b=this.fillCompletionItem(o,u,C);b&&a.push(b)},c=(0,C5.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let C=(0,uP.getEntryRule)(this.grammar);return await this.completionForRule(f,C,l),yl.CompletionList.create(a,!0)}let y=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,y),h=[],A=this.canReparse()&&u!==y;A&&(h=this.findFeaturesAt(o,u));let w=C=>gl.isKeyword(C.feature)?C.feature.value:C.feature;return await Promise.all((0,lP.stream)(v).distinct(w).map(C=>this.completionFor(f,C,l))),A&&await Promise.all((0,lP.stream)(h).exclude(v,w).distinct(w).map(C=>this.completionFor(f,C,l))),yl.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:yl.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,uP.getEntryRule)(this.grammar),l=(0,sd.findFirstFeatures)({feature:u.definition,new:!0,type:(0,b5.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,sd.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,sd.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(gl.isParserRule(r)){let i=(0,sd.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(gl.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(gl.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,P5.getContainerOfType)(r.feature,gl.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:yl.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:yl.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return cP<=e&&e<=fP&&w5<=r&&r<=E5||e===dP&&r!==dP}toUpperCharCode(e){return cP<=e&&e<=fP?e-32:e}};tn.DefaultCompletionProvider=iv;var cP="a".charCodeAt(0),fP="z".charCodeAt(0),w5="A".charCodeAt(0),E5="Z".charCodeAt(0),dP="_".charCodeAt(0)});var sv=d(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.AbstractCallHierarchyProvider=void 0;var N5=xe(),pP=Pn(),av=qe(),ov=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,av.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:N5.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(pP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,av.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(pP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,av.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};ld.AbstractCallHierarchyProvider=ov});var hP=d(mP=>{"use strict";Object.defineProperty(mP,"__esModule",{value:!0})});var gP=d(yP=>{"use strict";Object.defineProperty(yP,"__esModule",{value:!0})});var TP=d(vP=>{"use strict";Object.defineProperty(vP,"__esModule",{value:!0})});var lv=d(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.DefaultDefinitionProvider=void 0;var $5=xe(),O5=Se(),I5=qe(),uv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,I5.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[$5.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,O5.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};cd.DefaultDefinitionProvider=uv});var fv=d(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.DefaultDocumentHighlightProvider=void 0;var D5=xe(),x5=Se(),L5=qe(),q5=$i(),cv=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,L5.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,q5.equalURI)((0,x5.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return D5.DocumentHighlight.create(e.segment.range)}};fd.DefaultDocumentHighlightProvider=cv});var RP=d(_P=>{"use strict";Object.defineProperty(_P,"__esModule",{value:!0})});var pv=d(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.DefaultDocumentSymbolProvider=void 0;var M5=xe(),F5=Se(),dv=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,F5.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return M5.SymbolKind.Field}};dd.DefaultDocumentSymbolProvider=dv});var AP=d(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.AbstractExecuteCommandHandler=void 0;var j5=xe(),mv=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=j5.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};pd.AbstractExecuteCommandHandler=mv});var yv=d(gs=>{"use strict";Object.defineProperty(gs,"__esModule",{value:!0});gs.MultilineCommentHoverProvider=gs.AstNodeHoverProvider=void 0;var G5=qe(),md=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,G5.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};gs.AstNodeHoverProvider=md;var hv=class extends md{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};gs.MultilineCommentHoverProvider=hv});var SP=d(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.AbstractGoToImplementationProvider=void 0;var U5=xe(),H5=qe(),gv=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=U5.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,H5.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};hd.AbstractGoToImplementationProvider=gv});var bP=d(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.AbstractInlayHintProvider=void 0;var K5=xe(),W5=Se(),B5=Cr(),vv=class{async getInlayHints(e,r,n=K5.CancellationToken.None){let i=e.parseResult.value,a=[],o=s=>a.push(s);for(let s of(0,W5.streamAst)(i,{range:r.range}))await(0,B5.interruptAndCheck)(n),this.computeInlayHint(s,o);return a}};yd.AbstractInlayHintProvider=vv});var ga=d(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.DefaultLangiumDocuments=Ii.DefaultLangiumDocumentFactory=Ii.DocumentState=void 0;var V5=ky(),z5=Pn(),Y5=jt(),vs;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(vs=Ii.DocumentState||(Ii.DocumentState={}));var Tv=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??z5.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:vs.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:vs.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=vs.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=V5.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ii.DefaultLangiumDocumentFactory=Tv;var _v=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,Y5.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=vs.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=vs.Changed,this.documentMap.delete(r)),n}};Ii.DefaultLangiumDocuments=_v});var Av=d(Ts=>{"use strict";Object.defineProperty(Ts,"__esModule",{value:!0});Ts.mergeSignatureHelpOptions=Ts.AbstractSignatureHelpProvider=void 0;var X5=xe(),J5=qe(),Rv=class{provideSignatureHelp(e,r,n=X5.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,J5.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};Ts.AbstractSignatureHelpProvider=Rv;function Q5(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}Ts.mergeSignatureHelpOptions=Q5});var Pv=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addInlayHintHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var io=xe(),vl=Pn(),PP=rl(),Z5=Cr(),eB=ga(),tB=ud(),rB=Zf(),nB=Av(),Sv=class{constructor(e){this.onInitializeEmitter=new io.Emitter,this.onInitializedEmitter=new io.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,PP.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,PP.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var fe;return(fe=V.lsp.Formatter)===null||fe===void 0?void 0:fe.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,nB.mergeSignatureHelpOptions)(n.map(V=>{var fe;return(fe=V.lsp.SignatureHelp)===null||fe===void 0?void 0:fe.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),y=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),h=(0,tB.mergeCompletionProviderOptions)(n.map(V=>{var fe;return(fe=V.lsp.CompletionProvider)===null||fe===void 0?void 0:fe.completionOptions})),A=this.hasService(V=>V.lsp.ReferencesProvider),w=this.hasService(V=>V.lsp.DocumentSymbolProvider),C=this.hasService(V=>V.lsp.DefinitionProvider),b=this.hasService(V=>V.lsp.DocumentHighlightProvider),S=this.hasService(V=>V.lsp.FoldingRangeProvider),O=this.hasService(V=>V.lsp.HoverProvider),F=this.hasService(V=>V.lsp.RenameProvider),W=this.hasService(V=>V.lsp.CallHierarchyProvider),te=this.services.lsp.CodeLensProvider,we=this.hasService(V=>V.lsp.DeclarationProvider),Ee=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:io.TextDocumentSyncKind.Incremental,completionProvider:v?h:void 0,referencesProvider:A,documentSymbolProvider:w,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:b,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:S,hoverProvider:O,renameProvider:F?{prepareProvider:!0}:void 0,semanticTokensProvider:s?rB.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:y,callHierarchyProvider:W?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:te?{resolveProvider:Boolean(te.resolveCodeLens)}:void 0,declarationProvider:we,inlayHintProvider:Ee?{resolveProvider:Boolean(Ee.resolveInlayHint)}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=Sv;function iB(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");CP(e,t),kP(e,t),wP(e,t),EP(e,t),$P(e,t),OP(e,t),IP(e,t),DP(e,t),LP(e,t),MP(e,t),FP(e,t),NP(e,t),jP(e,t),qP(e,t),GP(e,t),UP(e,t),KP(e,t),BP(e,t),zP(e,t),VP(e,t),WP(e,t),HP(e,t),xP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=iB;function CP(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([vl.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=[],u=[];for(let l of o.changes){let c=vl.URI.parse(l.uri);l.type===io.FileChangeType.Deleted?u.push(c):s.push(c)}i(s,u)})}Q.addDocumentsHandler=CP;function kP(t,e){e.workspace.DocumentBuilder.onBuildPhase(eB.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=kP;function wP(t,e){t.onCompletion(Qt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=wP;function EP(t,e){t.onReferences(Qt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=EP;function NP(t,e){t.onCodeAction(Qt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=NP;function $P(t,e){t.onDocumentSymbol(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=$P;function OP(t,e){t.onDefinition(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=OP;function IP(t,e){t.onTypeDefinition(Qt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=IP;function DP(t,e){t.onImplementation(Qt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=DP;function xP(t,e){t.onDeclaration(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=xP;function LP(t,e){t.onDocumentHighlight(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=LP;function qP(t,e){t.onHover(Qt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=qP;function MP(t,e){t.onFoldingRanges(Qt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=MP;function FP(t,e){t.onDocumentFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=FP;function jP(t,e){t.onRenameRequest(Qt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Qt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=jP;function GP(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(Di((a,o,s,u)=>n.getInlayHints(o,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addInlayHintHandler=GP;function UP(t,e){let r={data:[]};t.languages.semanticTokens.on(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):r,e)),t.languages.semanticTokens.onDelta(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):r,e)),t.languages.semanticTokens.onRange(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):r,e))}Q.addSemanticTokenHandler=UP;function HP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=HP;function KP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return ao(o)}})}Q.addExecuteCommandHandler=KP;function WP(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(Di((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addDocumentLinkHandler=WP;function BP(t,e){t.onSignatureHelp(Di((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=BP;function VP(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(Di((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addCodeLensHandler=VP;function zP(t,e){t.languages.callHierarchy.onPrepare(Di((r,n,i,a)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,a))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onIncomingCalls(bv((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onOutgoingCalls(bv((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&a!==void 0?a:null},e))}Q.addCallHierarchyHandler=zP;function bv(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=vl.URI.parse(n.item.uri),o=r.getServices(a);if(!o){let s=`Could not find service instance for uri: '${a.toString()}'`;throw console.error(s),new Error(s)}try{return await t(o,n,i)}catch(s){return ao(s)}}}Q.createCallHierarchyRequestHandler=bv;function Di(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=vl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return ao(l)}}}Q.createServerRequestHandler=Di;function Qt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=vl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return ao(l)}}}Q.createRequestHandler=Qt;function ao(t){if((0,Z5.isOperationCancelled)(t))return new io.ResponseError(io.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof io.ResponseError)return t;throw t}});var kv=d(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.DefaultReferencesProvider=void 0;var aB=xe(),oB=qe(),Cv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,oB.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(aB.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};gd.DefaultReferencesProvider=Cv});var Ev=d(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.DefaultRenameProvider=void 0;var sB=xe(),uB=ss(),YP=qe(),wv=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,YP.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=sB.TextEdit.replace(c.segment.range,r.newName),y=c.sourceUri.toString();n[y]?n[y].push(f):n[y]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,YP.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,uB.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};vd.DefaultRenameProvider=wv});var XP=d(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.AbstractTypeDefinitionProvider=void 0;var lB=xe(),cB=qe(),Nv=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=lB.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,cB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Td.AbstractTypeDefinitionProvider=Nv});var $v=d(Me=>{"use strict";var fB=Me&&Me.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ht=Me&&Me.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&fB(e,t,r)};Object.defineProperty(Me,"__esModule",{value:!0});ht(ud(),Me);ht(nv(),Me);ht(sv(),Me);ht(hP(),Me);ht(gP(),Me);ht(TP(),Me);ht(lv(),Me);ht(fv(),Me);ht(RP(),Me);ht(pv(),Me);ht(AP(),Me);ht(Vf(),Me);ht(Bg(),Me);ht(yv(),Me);ht(SP(),Me);ht(bP(),Me);ht(Pv(),Me);ht(kv(),Me);ht(Ev(),Me);ht(Zf(),Me);ht(Av(),Me);ht(XP(),Me)});var JP=d(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.LangiumGrammarDefinitionProvider=void 0;var Ov=xe(),dB=$v(),pB=Se(),mB=Tt(),hB=Ne(),yB=Gt(),Iv=class extends dB.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,hB.isGrammarImport)(e.element)&&((n=(0,mB.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,yB.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,y=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:Ov.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:Ov.Range.create(0,0,0,0);return[Ov.LocationLink.create(c.$document.uri.toString(),v,y,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,pB.streamContents)(e).head()}};_d.LangiumGrammarDefinitionProvider=Iv});var ZP=d(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.LangiumGrammarCallHierarchyProvider=void 0;var QP=xe(),gB=sv(),Dv=Se(),vB=qe(),Rd=Ne(),xv=class extends gB.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Rd.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,vB.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,Dv.getContainerOfType)(s.element,Rd.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:QP.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Rd.isParserRule)(e))return;let r=(0,Dv.streamAllContents)(e).filter(Rd.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,Dv.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:QP.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};Ad.LangiumGrammarCallHierarchyProvider=xv});var rC=d(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.LangiumGrammarValidationResourcesCollector=void 0;var TB=Cn(),tC=jt(),Sd=Ne(),eC=Gt(),bd=as(),_B=vg(),Lv=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,_B.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=RB(e);for(let s of(0,bd.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,tC.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,bd.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},l??{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,bd.mergeInterfaces)(e,r),a=new Map(i.map(o=>[o.name,o]));for(let o of(0,bd.mergeInterfaces)(e,r))n.set(o.name,this.addSuperProperties(o,a,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let a of e.superTypes){let o=r.get(a.name);o&&i.push(...this.addSuperProperties(o,r,n))}return i}};Pd.LangiumGrammarValidationResourcesCollector=Lv;function RB({parserRules:t,datatypeRules:e}){let r=new TB.MultiMap;(0,tC.stream)(t).concat(e).forEach(i=>r.add((0,eC.getRuleType)(i),i));function n(i){if((0,Sd.isAction)(i)){let a=(0,eC.getActionType)(i);a&&r.add(a,i)}((0,Sd.isAlternatives)(i)||(0,Sd.isGroup)(i)||(0,Sd.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var nC=d(va=>{"use strict";Object.defineProperty(va,"__esModule",{value:!0});va.isInferredAndDeclared=va.isInferred=va.isDeclared=void 0;function AB(t){return t&&"declared"in t}va.isDeclared=AB;function SB(t){return t&&"inferred"in t}va.isInferred=SB;function bB(t){return t&&"inferred"in t&&"declared"in t}va.isInferredAndDeclared=bB});var iC=d(rn=>{"use strict";var PB=rn&&rn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),CB=rn&&rn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),kB=rn&&rn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&PB(e,t,r);return CB(e,t),e};Object.defineProperty(rn,"__esModule",{value:!0});rn.LangiumGrammarTypesValidator=rn.registerTypeValidationChecks=void 0;var _s=kB(Ne()),wB=Cn(),EB=Gt(),Et=is(),qv=nC();function NB(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}rn.registerTypeValidationChecks=NB;var Mv=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,qv.isDeclared)(a)&&(0,Et.isInterfaceType)(a.declared)&&_s.isInterface(a.declaredNode)){let o=a;OB(o,r),IB(o,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,qv.isInferred)(a)&&a.inferred instanceof Et.InterfaceType&&$B(a.inferred,r),(0,qv.isInferredAndDeclared)(a)&&LB(a,r)}checkActionIsNotUnionType(e,r){_s.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};rn.LangiumGrammarTypesValidator=Mv;function $B(t,e){t.properties.forEach(r=>{var n;let i=(0,Et.flattenPropertyUnion)(r.type);if(i.length>1){let a=s=>(0,Et.isReferenceType)(s)?"ref":"other",o=a(i[0]);if(i.slice(1).some(s=>a(s)!==o)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function OB({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,Et.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function IB({declared:t,declaredNode:e},r){let n=t.properties.reduce((o,s)=>o.add(s.name,s),new wB.MultiMap);for(let[o,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${o}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let o=0;o<i.length;o++)for(let s=o+1;s<i.length;s++){let u=i[o],l=i[s],c=(0,Et.isInterfaceType)(u)?u.superProperties:[],f=(0,Et.isInterfaceType)(l)?l.superProperties:[],y=DB(c,f);y.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${y.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let a=new Set;for(let o of i){let s=(0,Et.isInterfaceType)(o)?o.superProperties:[];for(let u of s)a.add(u.name)}for(let o of t.properties)if(a.has(o.name)){let s=e.attributes.find(u=>u.name===o.name);s&&r("error",`Cannot redeclare property '${o.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function DB(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!xB(n,i)&&r.push(n.name)}return r}function xB(t,e){return(0,Et.isTypeAssignable)(t.type,e.type)&&(0,Et.isTypeAssignable)(e.type,t.type)}function LB(t,e){let{inferred:r,declared:n,declaredNode:i,inferredNodes:a}=t,o=n.name,s=c=>f=>a.forEach(y=>e("error",`${f}${c?` ${c}`:""}.`,y?.inferredType?{node:y?.inferredType,property:"name"}:{node:y,property:_s.isAction(y)?"type":"name"})),u=(c,f)=>c.forEach(y=>e("error",f,{node:y,property:_s.isAssignment(y)||_s.isAction(y)?"feature":"name"})),l=c=>{a.forEach(f=>{_s.isParserRule(f)&&(0,EB.extractAssignments)(f.definition).find(v=>v.feature===c)===void 0&&e("error",`Property '${c}' is missing in a rule '${f.name}', but is required in type '${o}'.`,{node:f,property:"parameters"})})};if((0,Et.isUnionType)(r)&&(0,Et.isUnionType)(n))qB(r.type,n.type,s(`in a rule that returns type '${o}'`));else if((0,Et.isInterfaceType)(r)&&(0,Et.isInterfaceType)(n))MB(r,n,s(`in a rule that returns type '${o}'`),u,l);else{let c=`Inferred and declared versions of type '${o}' both have to be interfaces or unions.`;s()(c),e("error",c,{node:i,property:"name"})}}function qB(t,e,r){(0,Et.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,Et.propertyTypeToString)(t,"DeclaredType")}' to '${(0,Et.propertyTypeToString)(e,"DeclaredType")}'`)}function MB(t,e,r,n,i){let a=new Set(t.properties.map(l=>l.name)),o=new Map(t.allProperties.map(l=>[l.name,l])),s=new Map(e.superProperties.map(l=>[l.name,l]));for(let[l,c]of o.entries()){let f=s.get(l);if(f){let y=(0,Et.propertyTypeToString)(c.type,"DeclaredType"),v=(0,Et.propertyTypeToString)(f.type,"DeclaredType");if(!(0,Et.isTypeAssignable)(c.type,f.type)){let A=`The assigned type '${y}' is not compatible with the declared property '${l}' of type '${v}'.`;n(c.astNodes,A)}!f.optional&&c.optional&&i(l)}else a.has(l)&&n(c.astNodes,`A property '${l}' is not expected.`)}let u=new Set;for(let[l,c]of s.entries())!o.get(l)&&!c.optional&&u.add(l);if(u.size>0){let l=u.size>1?"Properties":"A property",c=u.size>1?"are expected":"is expected",f=Array.from(u).map(y=>`'${y}'`).sort().join(", ");r(`${l} ${f} ${c}.`)}}});var Fv=d(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.createLangiumGrammarServices=oo.LangiumGrammarModule=void 0;var aC=Cd(),oC=rl(),sC=Eb(),uC=qb(),lC=qg(),FB=Wb(),jB=Bb(),GB=zb(),UB=Yb(),HB=Jb(),KB=iP(),WB=JP(),BB=ZP(),VB=rC(),cC=iC(),zB=Cr(),YB=ga();oo.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new lC.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new VB.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new cC.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new jB.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new FB.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new UB.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new GB.LangiumGrammarFormatter,DefinitionProvider:t=>new WB.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new BB.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new uC.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new uC.LangiumGrammarScopeProvider(t),References:t=>new KB.LangiumGrammarReferences(t),NameProvider:()=>new HB.LangiumGrammarNameProvider}};function XB(t,e){let r=(0,oC.inject)((0,aC.createDefaultSharedModule)(t),sC.LangiumGrammarGeneratedSharedModule,e),n=(0,oC.inject)((0,aC.createDefaultModule)({shared:r}),sC.LangiumGrammarGeneratedModule,oo.LangiumGrammarModule);return JB(r,n),r.ServiceRegistry.register(n),(0,lC.registerValidationChecks)(n),(0,cC.registerTypeValidationChecks)(n),{shared:r,grammar:n}}oo.createLangiumGrammarServices=XB;function JB(t,e){t.workspace.DocumentBuilder.onBuildPhase(YB.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,zB.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var jv=d(Rs=>{"use strict";Object.defineProperty(Rs,"__esModule",{value:!0});Rs.EmptyFileSystem=Rs.EmptyFileSystemProvider=void 0;var kd=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Rs.EmptyFileSystemProvider=kd;Rs.EmptyFileSystem={fileSystemProvider:()=>new kd}});var Tt=d(me=>{"use strict";var QB=me&&me.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ZB=me&&me.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),e3=me&&me.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&QB(e,t,r);return ZB(e,t),e};Object.defineProperty(me,"__esModule",{value:!0});me.createServicesForGrammar=me.loadGrammarFromJson=me.findNameAssignment=me.findAssignment=me.findNodesForKeywordInternal=me.findNodeForKeyword=me.findNodesForKeyword=me.findNodeForProperty=me.findNodesForProperty=me.isCommentTerminal=me.getCrossReferenceTerminal=me.getAllReachableRules=me.getHiddenRules=me.getEntryRule=void 0;var pC=Pn(),fC=Cd(),dC=rl(),t3=_g(),vr=e3(Ne()),r3=Gt(),mC=Fv(),n3=ir(),As=Se(),i3=qe(),Gv=jv();function hC(t){return t.rules.find(e=>vr.isParserRule(e)&&e.entry)}me.getEntryRule=hC;function yC(t){return t.rules.filter(e=>vr.isTerminalRule(e)&&e.hidden)}me.getHiddenRules=yC;function a3(t,e){let r=new Set,n=hC(t);if(!n)return new Set(t.rules);let i=[n].concat(yC(t));for(let o of i)gC(o,r,e);let a=new Set;for(let o of t.rules)(r.has(o.name)||vr.isTerminalRule(o)&&o.hidden)&&a.add(o);return a}me.getAllReachableRules=a3;function gC(t,e,r){e.add(t.name),(0,As.streamAllContents)(t).forEach(n=>{if(vr.isRuleCall(n)||r&&vr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&gC(i,e,r)}})}function o3(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=vC(t.type.ref);return e?.terminal}}me.getCrossReferenceTerminal=o3;function s3(t){return t.hidden&&!" ".match((0,r3.terminalRegex)(t))}me.isCommentTerminal=s3;function u3(t,e){return!t||!e?[]:Uv(t,e,t.element,!0)}me.findNodesForProperty=u3;function l3(t,e,r){if(!t||!e)return;let n=Uv(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}me.findNodeForProperty=l3;function Uv(t,e,r,n){if(!n){let i=(0,As.getContainerOfType)(t.feature,vr.isAssignment);if(i&&i.feature===e)return[t]}return(0,n3.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>Uv(i,e,r,!1)):[]}function c3(t,e){return t?Hv(t,e,t?.element):[]}me.findNodesForKeyword=c3;function f3(t,e,r){if(!t)return;let n=Hv(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}me.findNodeForKeyword=f3;function Hv(t,e,r){if(t.element!==r)return[];if(vr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,i3.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?vr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}me.findNodesForKeywordInternal=Hv;function d3(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,As.getContainerOfType)(t.feature,vr.isAssignment);if(n)return n;t=t.parent}}me.findAssignment=d3;function vC(t){return vr.isInferredType(t)&&(t=t.$container),TC(t,new Map)}me.findNameAssignment=vC;function TC(t,e){var r;function n(i,a){let o;return(0,As.getContainerOfType)(i,vr.isAssignment)||(o=TC(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,As.streamAllContents)(t)){if(vr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(vr.isRuleCall(i)&&vr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(vr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function p3(t){var e;let r=(0,mC.createLangiumGrammarServices)(Gv.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,pC.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}me.loadGrammarFromJson=p3;async function m3(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,mC.createLangiumGrammarServices)(Gv.EmptyFileSystem).grammar,u=pC.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,As.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},h=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},A={AstReflection:()=>(0,t3.interpretAstReflection)(f)},w={Grammar:()=>f,LanguageMetaData:()=>h,parser:{ParserConfig:()=>v}},C=(0,dC.inject)((0,fC.createDefaultSharedModule)(Gv.EmptyFileSystem),A,t.sharedModule),b=(0,dC.inject)((0,fC.createDefaultModule)({shared:C}),w,t.module);return C.ServiceRegistry.register(b),b}me.createServicesForGrammar=m3});var Kv=d(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.createGrammarConfig=void 0;var h3=qe(),y3=Tt(),g3=to(),v3=Ne(),T3=Gt();function _3(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,v3.isTerminalRule)(n)&&(0,y3.isCommentTerminal)(n)&&(0,g3.isMultilineComment)((0,T3.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:h3.DefaultNameRegexp}}wd.createGrammarConfig=_3});var Wv=d(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.VERSION=void 0;Ed.VERSION="10.4.2"});var Ss=d((ige,_C)=>{var R3=Object.prototype;function A3(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||R3;return t===r}_C.exports=A3});var Bv=d((age,RC)=>{function S3(t,e){return function(r){return t(e(r))}}RC.exports=S3});var SC=d((oge,AC)=>{var b3=Bv(),P3=b3(Object.keys,Object);AC.exports=P3});var Vv=d((sge,bC)=>{var C3=Ss(),k3=SC(),w3=Object.prototype,E3=w3.hasOwnProperty;function N3(t){if(!C3(t))return k3(t);var e=[];for(var r in Object(t))E3.call(t,r)&&r!="constructor"&&e.push(r);return e}bC.exports=N3});var zv=d((uge,PC)=>{var $3=typeof global=="object"&&global&&global.Object===Object&&global;PC.exports=$3});var En=d((lge,CC)=>{var O3=zv(),I3=typeof self=="object"&&self&&self.Object===Object&&self,D3=O3||I3||Function("return this")();CC.exports=D3});var so=d((cge,kC)=>{var x3=En(),L3=x3.Symbol;kC.exports=L3});var $C=d((fge,NC)=>{var wC=so(),EC=Object.prototype,q3=EC.hasOwnProperty,M3=EC.toString,Tl=wC?wC.toStringTag:void 0;function F3(t){var e=q3.call(t,Tl),r=t[Tl];try{t[Tl]=void 0;var n=!0}catch{}var i=M3.call(t);return n&&(e?t[Tl]=r:delete t[Tl]),i}NC.exports=F3});var IC=d((dge,OC)=>{var j3=Object.prototype,G3=j3.toString;function U3(t){return G3.call(t)}OC.exports=U3});var Ta=d((pge,LC)=>{var DC=so(),H3=$C(),K3=IC(),W3="[object Null]",B3="[object Undefined]",xC=DC?DC.toStringTag:void 0;function V3(t){return t==null?t===void 0?B3:W3:xC&&xC in Object(t)?H3(t):K3(t)}LC.exports=V3});var Nn=d((mge,qC)=>{function z3(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}qC.exports=z3});var bs=d((hge,MC)=>{var Y3=Ta(),X3=Nn(),J3="[object AsyncFunction]",Q3="[object Function]",Z3="[object GeneratorFunction]",eV="[object Proxy]";function tV(t){if(!X3(t))return!1;var e=Y3(t);return e==Q3||e==Z3||e==J3||e==eV}MC.exports=tV});var jC=d((yge,FC)=>{var rV=En(),nV=rV["__core-js_shared__"];FC.exports=nV});var HC=d((gge,UC)=>{var Yv=jC(),GC=function(){var t=/[^.]+$/.exec(Yv&&Yv.keys&&Yv.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function iV(t){return!!GC&&GC in t}UC.exports=iV});var Xv=d((vge,KC)=>{var aV=Function.prototype,oV=aV.toString;function sV(t){if(t!=null){try{return oV.call(t)}catch{}try{return t+""}catch{}}return""}KC.exports=sV});var BC=d((Tge,WC)=>{var uV=bs(),lV=HC(),cV=Nn(),fV=Xv(),dV=/[\\^$.*+?()[\]{}|]/g,pV=/^\[object .+?Constructor\]$/,mV=Function.prototype,hV=Object.prototype,yV=mV.toString,gV=hV.hasOwnProperty,vV=RegExp("^"+yV.call(gV).replace(dV,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function TV(t){if(!cV(t)||lV(t))return!1;var e=uV(t)?vV:pV;return e.test(fV(t))}WC.exports=TV});var zC=d((_ge,VC)=>{function _V(t,e){return t?.[e]}VC.exports=_V});var _a=d((Rge,YC)=>{var RV=BC(),AV=zC();function SV(t,e){var r=AV(t,e);return RV(r)?r:void 0}YC.exports=SV});var JC=d((Age,XC)=>{var bV=_a(),PV=En(),CV=bV(PV,"DataView");XC.exports=CV});var Nd=d((Sge,QC)=>{var kV=_a(),wV=En(),EV=kV(wV,"Map");QC.exports=EV});var ek=d((bge,ZC)=>{var NV=_a(),$V=En(),OV=NV($V,"Promise");ZC.exports=OV});var Jv=d((Pge,tk)=>{var IV=_a(),DV=En(),xV=IV(DV,"Set");tk.exports=xV});var nk=d((Cge,rk)=>{var LV=_a(),qV=En(),MV=LV(qV,"WeakMap");rk.exports=MV});var Cs=d((kge,ck)=>{var Qv=JC(),Zv=Nd(),eT=ek(),tT=Jv(),rT=nk(),lk=Ta(),Ps=Xv(),ik="[object Map]",FV="[object Object]",ak="[object Promise]",ok="[object Set]",sk="[object WeakMap]",uk="[object DataView]",jV=Ps(Qv),GV=Ps(Zv),UV=Ps(eT),HV=Ps(tT),KV=Ps(rT),uo=lk;(Qv&&uo(new Qv(new ArrayBuffer(1)))!=uk||Zv&&uo(new Zv)!=ik||eT&&uo(eT.resolve())!=ak||tT&&uo(new tT)!=ok||rT&&uo(new rT)!=sk)&&(uo=function(t){var e=lk(t),r=e==FV?t.constructor:void 0,n=r?Ps(r):"";if(n)switch(n){case jV:return uk;case GV:return ik;case UV:return ak;case HV:return ok;case KV:return sk}return e});ck.exports=uo});var $n=d((wge,fk)=>{function WV(t){return t!=null&&typeof t=="object"}fk.exports=WV});var pk=d((Ege,dk)=>{var BV=Ta(),VV=$n(),zV="[object Arguments]";function YV(t){return VV(t)&&BV(t)==zV}dk.exports=YV});var _l=d((Nge,yk)=>{var mk=pk(),XV=$n(),hk=Object.prototype,JV=hk.hasOwnProperty,QV=hk.propertyIsEnumerable,ZV=mk(function(){return arguments}())?mk:function(t){return XV(t)&&JV.call(t,"callee")&&!QV.call(t,"callee")};yk.exports=ZV});var Le=d(($ge,gk)=>{var e4=Array.isArray;gk.exports=e4});var $d=d((Oge,vk)=>{var t4=9007199254740991;function r4(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=t4}vk.exports=r4});var On=d((Ige,Tk)=>{var n4=bs(),i4=$d();function a4(t){return t!=null&&i4(t.length)&&!n4(t)}Tk.exports=a4});var Rk=d((Dge,_k)=>{function o4(){return!1}_k.exports=o4});var Al=d((Rl,ks)=>{var s4=En(),u4=Rk(),bk=typeof Rl=="object"&&Rl&&!Rl.nodeType&&Rl,Ak=bk&&typeof ks=="object"&&ks&&!ks.nodeType&&ks,l4=Ak&&Ak.exports===bk,Sk=l4?s4.Buffer:void 0,c4=Sk?Sk.isBuffer:void 0,f4=c4||u4;ks.exports=f4});var Ck=d((xge,Pk)=>{var d4=Ta(),p4=$d(),m4=$n(),h4="[object Arguments]",y4="[object Array]",g4="[object Boolean]",v4="[object Date]",T4="[object Error]",_4="[object Function]",R4="[object Map]",A4="[object Number]",S4="[object Object]",b4="[object RegExp]",P4="[object Set]",C4="[object String]",k4="[object WeakMap]",w4="[object ArrayBuffer]",E4="[object DataView]",N4="[object Float32Array]",$4="[object Float64Array]",O4="[object Int8Array]",I4="[object Int16Array]",D4="[object Int32Array]",x4="[object Uint8Array]",L4="[object Uint8ClampedArray]",q4="[object Uint16Array]",M4="[object Uint32Array]",et={};et[N4]=et[$4]=et[O4]=et[I4]=et[D4]=et[x4]=et[L4]=et[q4]=et[M4]=!0;et[h4]=et[y4]=et[w4]=et[g4]=et[E4]=et[v4]=et[T4]=et[_4]=et[R4]=et[A4]=et[S4]=et[b4]=et[P4]=et[C4]=et[k4]=!1;function F4(t){return m4(t)&&p4(t.length)&&!!et[d4(t)]}Pk.exports=F4});var ws=d((Lge,kk)=>{function j4(t){return function(e){return t(e)}}kk.exports=j4});var Pl=d((Sl,Es)=>{var G4=zv(),wk=typeof Sl=="object"&&Sl&&!Sl.nodeType&&Sl,bl=wk&&typeof Es=="object"&&Es&&!Es.nodeType&&Es,U4=bl&&bl.exports===wk,nT=U4&&G4.process,H4=function(){try{var t=bl&&bl.require&&bl.require("util").types;return t||nT&&nT.binding&&nT.binding("util")}catch{}}();Es.exports=H4});var Od=d((qge,$k)=>{var K4=Ck(),W4=ws(),Ek=Pl(),Nk=Ek&&Ek.isTypedArray,B4=Nk?W4(Nk):K4;$k.exports=B4});var qr=d((Mge,Ok)=>{var V4=Vv(),z4=Cs(),Y4=_l(),X4=Le(),J4=On(),Q4=Al(),Z4=Ss(),e6=Od(),t6="[object Map]",r6="[object Set]",n6=Object.prototype,i6=n6.hasOwnProperty;function a6(t){if(t==null)return!0;if(J4(t)&&(X4(t)||typeof t=="string"||typeof t.splice=="function"||Q4(t)||e6(t)||Y4(t)))return!t.length;var e=z4(t);if(e==t6||e==r6)return!t.size;if(Z4(t))return!V4(t).length;for(var r in t)if(i6.call(t,r))return!1;return!0}Ok.exports=a6});var Ns=d((Fge,Ik)=>{function o6(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}Ik.exports=o6});var xk=d((jge,Dk)=>{function s6(){this.__data__=[],this.size=0}Dk.exports=s6});var $s=d((Gge,Lk)=>{function u6(t,e){return t===e||t!==t&&e!==e}Lk.exports=u6});var Cl=d((Uge,qk)=>{var l6=$s();function c6(t,e){for(var r=t.length;r--;)if(l6(t[r][0],e))return r;return-1}qk.exports=c6});var Fk=d((Hge,Mk)=>{var f6=Cl(),d6=Array.prototype,p6=d6.splice;function m6(t){var e=this.__data__,r=f6(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():p6.call(e,r,1),--this.size,!0}Mk.exports=m6});var Gk=d((Kge,jk)=>{var h6=Cl();function y6(t){var e=this.__data__,r=h6(e,t);return r<0?void 0:e[r][1]}jk.exports=y6});var Hk=d((Wge,Uk)=>{var g6=Cl();function v6(t){return g6(this.__data__,t)>-1}Uk.exports=v6});var Wk=d((Bge,Kk)=>{var T6=Cl();function _6(t,e){var r=this.__data__,n=T6(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}Kk.exports=_6});var kl=d((Vge,Bk)=>{var R6=xk(),A6=Fk(),S6=Gk(),b6=Hk(),P6=Wk();function Os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Os.prototype.clear=R6;Os.prototype.delete=A6;Os.prototype.get=S6;Os.prototype.has=b6;Os.prototype.set=P6;Bk.exports=Os});var zk=d((zge,Vk)=>{var C6=kl();function k6(){this.__data__=new C6,this.size=0}Vk.exports=k6});var Xk=d((Yge,Yk)=>{function w6(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}Yk.exports=w6});var Qk=d((Xge,Jk)=>{function E6(t){return this.__data__.get(t)}Jk.exports=E6});var ew=d((Jge,Zk)=>{function N6(t){return this.__data__.has(t)}Zk.exports=N6});var wl=d((Qge,tw)=>{var $6=_a(),O6=$6(Object,"create");tw.exports=O6});var iw=d((Zge,nw)=>{var rw=wl();function I6(){this.__data__=rw?rw(null):{},this.size=0}nw.exports=I6});var ow=d((eve,aw)=>{function D6(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}aw.exports=D6});var uw=d((tve,sw)=>{var x6=wl(),L6="__lodash_hash_undefined__",q6=Object.prototype,M6=q6.hasOwnProperty;function F6(t){var e=this.__data__;if(x6){var r=e[t];return r===L6?void 0:r}return M6.call(e,t)?e[t]:void 0}sw.exports=F6});var cw=d((rve,lw)=>{var j6=wl(),G6=Object.prototype,U6=G6.hasOwnProperty;function H6(t){var e=this.__data__;return j6?e[t]!==void 0:U6.call(e,t)}lw.exports=H6});var dw=d((nve,fw)=>{var K6=wl(),W6="__lodash_hash_undefined__";function B6(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=K6&&e===void 0?W6:e,this}fw.exports=B6});var mw=d((ive,pw)=>{var V6=iw(),z6=ow(),Y6=uw(),X6=cw(),J6=dw();function Is(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Is.prototype.clear=V6;Is.prototype.delete=z6;Is.prototype.get=Y6;Is.prototype.has=X6;Is.prototype.set=J6;pw.exports=Is});var gw=d((ave,yw)=>{var hw=mw(),Q6=kl(),Z6=Nd();function ez(){this.size=0,this.__data__={hash:new hw,map:new(Z6||Q6),string:new hw}}yw.exports=ez});var Tw=d((ove,vw)=>{function tz(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}vw.exports=tz});var El=d((sve,_w)=>{var rz=Tw();function nz(t,e){var r=t.__data__;return rz(e)?r[typeof e=="string"?"string":"hash"]:r.map}_w.exports=nz});var Aw=d((uve,Rw)=>{var iz=El();function az(t){var e=iz(this,t).delete(t);return this.size-=e?1:0,e}Rw.exports=az});var bw=d((lve,Sw)=>{var oz=El();function sz(t){return oz(this,t).get(t)}Sw.exports=sz});var Cw=d((cve,Pw)=>{var uz=El();function lz(t){return uz(this,t).has(t)}Pw.exports=lz});var ww=d((fve,kw)=>{var cz=El();function fz(t,e){var r=cz(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}kw.exports=fz});var Id=d((dve,Ew)=>{var dz=gw(),pz=Aw(),mz=bw(),hz=Cw(),yz=ww();function Ds(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ds.prototype.clear=dz;Ds.prototype.delete=pz;Ds.prototype.get=mz;Ds.prototype.has=hz;Ds.prototype.set=yz;Ew.exports=Ds});var $w=d((pve,Nw)=>{var gz=kl(),vz=Nd(),Tz=Id(),_z=200;function Rz(t,e){var r=this.__data__;if(r instanceof gz){var n=r.__data__;if(!vz||n.length<_z-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Tz(n)}return r.set(t,e),this.size=r.size,this}Nw.exports=Rz});var Dd=d((mve,Ow)=>{var Az=kl(),Sz=zk(),bz=Xk(),Pz=Qk(),Cz=ew(),kz=$w();function xs(t){var e=this.__data__=new Az(t);this.size=e.size}xs.prototype.clear=Sz;xs.prototype.delete=bz;xs.prototype.get=Pz;xs.prototype.has=Cz;xs.prototype.set=kz;Ow.exports=xs});var Dw=d((hve,Iw)=>{var wz="__lodash_hash_undefined__";function Ez(t){return this.__data__.set(t,wz),this}Iw.exports=Ez});var Lw=d((yve,xw)=>{function Nz(t){return this.__data__.has(t)}xw.exports=Nz});var Ld=d((gve,qw)=>{var $z=Id(),Oz=Dw(),Iz=Lw();function xd(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new $z;++e<r;)this.add(t[e])}xd.prototype.add=xd.prototype.push=Oz;xd.prototype.has=Iz;qw.exports=xd});var iT=d((vve,Mw)=>{function Dz(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}Mw.exports=Dz});var qd=d((Tve,Fw)=>{function xz(t,e){return t.has(e)}Fw.exports=xz});var aT=d((_ve,jw)=>{var Lz=Ld(),qz=iT(),Mz=qd(),Fz=1,jz=2;function Gz(t,e,r,n,i,a){var o=r&Fz,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,y=!0,v=r&jz?new Lz:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var h=t[f],A=e[f];if(n)var w=o?n(A,h,f,e,t,a):n(h,A,f,t,e,a);if(w!==void 0){if(w)continue;y=!1;break}if(v){if(!qz(e,function(C,b){if(!Mz(v,b)&&(h===C||i(h,C,r,n,a)))return v.push(b)})){y=!1;break}}else if(!(h===A||i(h,A,r,n,a))){y=!1;break}}return a.delete(t),a.delete(e),y}jw.exports=Gz});var oT=d((Rve,Gw)=>{var Uz=En(),Hz=Uz.Uint8Array;Gw.exports=Hz});var Hw=d((Ave,Uw)=>{function Kz(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}Uw.exports=Kz});var Md=d((Sve,Kw)=>{function Wz(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}Kw.exports=Wz});var Yw=d((bve,zw)=>{var Ww=so(),Bw=oT(),Bz=$s(),Vz=aT(),zz=Hw(),Yz=Md(),Xz=1,Jz=2,Qz="[object Boolean]",Zz="[object Date]",e8="[object Error]",t8="[object Map]",r8="[object Number]",n8="[object RegExp]",i8="[object Set]",a8="[object String]",o8="[object Symbol]",s8="[object ArrayBuffer]",u8="[object DataView]",Vw=Ww?Ww.prototype:void 0,sT=Vw?Vw.valueOf:void 0;function l8(t,e,r,n,i,a,o){switch(r){case u8:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case s8:return!(t.byteLength!=e.byteLength||!a(new Bw(t),new Bw(e)));case Qz:case Zz:case r8:return Bz(+t,+e);case e8:return t.name==e.name&&t.message==e.message;case n8:case a8:return t==e+"";case t8:var s=zz;case i8:var u=n&Xz;if(s||(s=Yz),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=Jz,o.set(t,e);var c=Vz(s(t),s(e),n,i,a,o);return o.delete(t),c;case o8:if(sT)return sT.call(t)==sT.call(e)}return!1}zw.exports=l8});var Fd=d((Pve,Xw)=>{function c8(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}Xw.exports=c8});var uT=d((Cve,Jw)=>{var f8=Fd(),d8=Le();function p8(t,e,r){var n=e(t);return d8(t)?n:f8(n,r(t))}Jw.exports=p8});var jd=d((kve,Qw)=>{function m8(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}Qw.exports=m8});var lT=d((wve,Zw)=>{function h8(){return[]}Zw.exports=h8});var Gd=d((Eve,tE)=>{var y8=jd(),g8=lT(),v8=Object.prototype,T8=v8.propertyIsEnumerable,eE=Object.getOwnPropertySymbols,_8=eE?function(t){return t==null?[]:(t=Object(t),y8(eE(t),function(e){return T8.call(t,e)}))}:g8;tE.exports=_8});var nE=d((Nve,rE)=>{function R8(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}rE.exports=R8});var Nl=d(($ve,iE)=>{var A8=9007199254740991,S8=/^(?:0|[1-9]\d*)$/;function b8(t,e){var r=typeof t;return e=e??A8,!!e&&(r=="number"||r!="symbol"&&S8.test(t))&&t>-1&&t%1==0&&t<e}iE.exports=b8});var cT=d((Ove,aE)=>{var P8=nE(),C8=_l(),k8=Le(),w8=Al(),E8=Nl(),N8=Od(),$8=Object.prototype,O8=$8.hasOwnProperty;function I8(t,e){var r=k8(t),n=!r&&C8(t),i=!r&&!n&&w8(t),a=!r&&!n&&!i&&N8(t),o=r||n||i||a,s=o?P8(t.length,String):[],u=s.length;for(var l in t)(e||O8.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||E8(l,u)))&&s.push(l);return s}aE.exports=I8});var Mr=d((Ive,oE)=>{var D8=cT(),x8=Vv(),L8=On();function q8(t){return L8(t)?D8(t):x8(t)}oE.exports=q8});var fT=d((Dve,sE)=>{var M8=uT(),F8=Gd(),j8=Mr();function G8(t){return M8(t,j8,F8)}sE.exports=G8});var cE=d((xve,lE)=>{var uE=fT(),U8=1,H8=Object.prototype,K8=H8.hasOwnProperty;function W8(t,e,r,n,i,a){var o=r&U8,s=uE(t),u=s.length,l=uE(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var y=s[f];if(!(o?y in e:K8.call(e,y)))return!1}var v=a.get(t),h=a.get(e);if(v&&h)return v==e&&h==t;var A=!0;a.set(t,e),a.set(e,t);for(var w=o;++f<u;){y=s[f];var C=t[y],b=e[y];if(n)var S=o?n(b,C,y,e,t,a):n(C,b,y,t,e,a);if(!(S===void 0?C===b||i(C,b,r,n,a):S)){A=!1;break}w||(w=y=="constructor")}if(A&&!w){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(A=!1)}return a.delete(t),a.delete(e),A}lE.exports=W8});var vE=d((Lve,gE)=>{var dT=Dd(),B8=aT(),V8=Yw(),z8=cE(),fE=Cs(),dE=Le(),pE=Al(),Y8=Od(),X8=1,mE="[object Arguments]",hE="[object Array]",Ud="[object Object]",J8=Object.prototype,yE=J8.hasOwnProperty;function Q8(t,e,r,n,i,a){var o=dE(t),s=dE(e),u=o?hE:fE(t),l=s?hE:fE(e);u=u==mE?Ud:u,l=l==mE?Ud:l;var c=u==Ud,f=l==Ud,y=u==l;if(y&&pE(t)){if(!pE(e))return!1;o=!0,c=!1}if(y&&!c)return a||(a=new dT),o||Y8(t)?B8(t,e,r,n,i,a):V8(t,e,u,r,n,i,a);if(!(r&X8)){var v=c&&yE.call(t,"__wrapped__"),h=f&&yE.call(e,"__wrapped__");if(v||h){var A=v?t.value():t,w=h?e.value():e;return a||(a=new dT),i(A,w,r,n,a)}}return y?(a||(a=new dT),z8(t,e,r,n,i,a)):!1}gE.exports=Q8});var pT=d((qve,RE)=>{var Z8=vE(),TE=$n();function _E(t,e,r,n,i){return t===e?!0:t==null||e==null||!TE(t)&&!TE(e)?t!==t&&e!==e:Z8(t,e,r,n,_E,i)}RE.exports=_E});var SE=d((Mve,AE)=>{var e9=Dd(),t9=pT(),r9=1,n9=2;function i9(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new e9;if(n)var y=n(l,c,u,t,e,f);if(!(y===void 0?t9(c,l,r9|n9,n,f):y))return!1}}return!0}AE.exports=i9});var mT=d((Fve,bE)=>{var a9=Nn();function o9(t){return t===t&&!a9(t)}bE.exports=o9});var CE=d((jve,PE)=>{var s9=mT(),u9=Mr();function l9(t){for(var e=u9(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,s9(i)]}return e}PE.exports=l9});var hT=d((Gve,kE)=>{function c9(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}kE.exports=c9});var EE=d((Uve,wE)=>{var f9=SE(),d9=CE(),p9=hT();function m9(t){var e=d9(t);return e.length==1&&e[0][2]?p9(e[0][0],e[0][1]):function(r){return r===t||f9(r,t,e)}}wE.exports=m9});var Ls=d((Hve,NE)=>{var h9=Ta(),y9=$n(),g9="[object Symbol]";function v9(t){return typeof t=="symbol"||y9(t)&&h9(t)==g9}NE.exports=v9});var Hd=d((Kve,$E)=>{var T9=Le(),_9=Ls(),R9=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,A9=/^\w*$/;function S9(t,e){if(T9(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||_9(t)?!0:A9.test(t)||!R9.test(t)||e!=null&&t in Object(e)}$E.exports=S9});var DE=d((Wve,IE)=>{var OE=Id(),b9="Expected a function";function yT(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(b9);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(yT.Cache||OE),r}yT.Cache=OE;IE.exports=yT});var LE=d((Bve,xE)=>{var P9=DE(),C9=500;function k9(t){var e=P9(t,function(n){return r.size===C9&&r.clear(),n}),r=e.cache;return e}xE.exports=k9});var ME=d((Vve,qE)=>{var w9=LE(),E9=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,N9=/\\(\\)?/g,$9=w9(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(E9,function(r,n,i,a){e.push(i?a.replace(N9,"$1"):n||r)}),e});qE.exports=$9});var KE=d((zve,HE)=>{var FE=so(),O9=Ns(),I9=Le(),D9=Ls(),x9=1/0,jE=FE?FE.prototype:void 0,GE=jE?jE.toString:void 0;function UE(t){if(typeof t=="string")return t;if(I9(t))return O9(t,UE)+"";if(D9(t))return GE?GE.call(t):"";var e=t+"";return e=="0"&&1/t==-x9?"-0":e}HE.exports=UE});var gT=d((Yve,WE)=>{var L9=KE();function q9(t){return t==null?"":L9(t)}WE.exports=q9});var $l=d((Xve,BE)=>{var M9=Le(),F9=Hd(),j9=ME(),G9=gT();function U9(t,e){return M9(t)?t:F9(t,e)?[t]:j9(G9(t))}BE.exports=U9});var qs=d((Jve,VE)=>{var H9=Ls(),K9=1/0;function W9(t){if(typeof t=="string"||H9(t))return t;var e=t+"";return e=="0"&&1/t==-K9?"-0":e}VE.exports=W9});var Kd=d((Qve,zE)=>{var B9=$l(),V9=qs();function z9(t,e){e=B9(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[V9(e[r++])];return r&&r==n?t:void 0}zE.exports=z9});var XE=d((Zve,YE)=>{var Y9=Kd();function X9(t,e,r){var n=t==null?void 0:Y9(t,e);return n===void 0?r:n}YE.exports=X9});var QE=d((eTe,JE)=>{function J9(t,e){return t!=null&&e in Object(t)}JE.exports=J9});var vT=d((tTe,ZE)=>{var Q9=$l(),Z9=_l(),e7=Le(),t7=Nl(),r7=$d(),n7=qs();function i7(t,e,r){e=Q9(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=n7(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&r7(i)&&t7(o,i)&&(e7(t)||Z9(t)))}ZE.exports=i7});var tN=d((rTe,eN)=>{var a7=QE(),o7=vT();function s7(t,e){return t!=null&&o7(t,e,a7)}eN.exports=s7});var nN=d((nTe,rN)=>{var u7=pT(),l7=XE(),c7=tN(),f7=Hd(),d7=mT(),p7=hT(),m7=qs(),h7=1,y7=2;function g7(t,e){return f7(t)&&d7(e)?p7(m7(t),e):function(r){var n=l7(r,t);return n===void 0&&n===e?c7(r,t):u7(e,n,h7|y7)}}rN.exports=g7});var lo=d((iTe,iN)=>{function v7(t){return t}iN.exports=v7});var oN=d((aTe,aN)=>{function T7(t){return function(e){return e?.[t]}}aN.exports=T7});var uN=d((oTe,sN)=>{var _7=Kd();function R7(t){return function(e){return _7(e,t)}}sN.exports=R7});var cN=d((sTe,lN)=>{var A7=oN(),S7=uN(),b7=Hd(),P7=qs();function C7(t){return b7(t)?A7(P7(t)):S7(t)}lN.exports=C7});var nn=d((uTe,fN)=>{var k7=EE(),w7=nN(),E7=lo(),N7=Le(),$7=cN();function O7(t){return typeof t=="function"?t:t==null?E7:typeof t=="object"?N7(t)?w7(t[0],t[1]):k7(t):$7(t)}fN.exports=O7});var pN=d((lTe,dN)=>{function I7(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}dN.exports=I7});var hN=d((cTe,mN)=>{var D7=pN(),x7=D7();mN.exports=x7});var gN=d((fTe,yN)=>{var L7=hN(),q7=Mr();function M7(t,e){return t&&L7(t,e,q7)}yN.exports=M7});var TN=d((dTe,vN)=>{var F7=On();function j7(t,e){return function(r,n){if(r==null)return r;if(!F7(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}vN.exports=j7});var Ra=d((pTe,_N)=>{var G7=gN(),U7=TN(),H7=U7(G7);_N.exports=H7});var AN=d((mTe,RN)=>{var K7=Ra(),W7=On();function B7(t,e){var r=-1,n=W7(t)?Array(t.length):[];return K7(t,function(i,a,o){n[++r]=e(i,a,o)}),n}RN.exports=B7});var Ht=d((hTe,SN)=>{var V7=Ns(),z7=nn(),Y7=AN(),X7=Le();function J7(t,e){var r=X7(t)?V7:Y7;return r(t,z7(e,3))}SN.exports=J7});var TT=d((yTe,bN)=>{function Q7(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}bN.exports=Q7});var CN=d((gTe,PN)=>{var Z7=lo();function eY(t){return typeof t=="function"?t:Z7}PN.exports=eY});var Kt=d((vTe,kN)=>{var tY=TT(),rY=Ra(),nY=CN(),iY=Le();function aY(t,e){var r=iY(t)?tY:rY;return r(t,nY(e))}kN.exports=aY});var EN=d((TTe,wN)=>{var oY=Ns();function sY(t,e){return oY(e,function(r){return t[r]})}wN.exports=sY});var Zn=d((_Te,NN)=>{var uY=EN(),lY=Mr();function cY(t){return t==null?[]:uY(t,lY(t))}NN.exports=cY});var ON=d((RTe,$N)=>{var fY=Object.prototype,dY=fY.hasOwnProperty;function pY(t,e){return t!=null&&dY.call(t,e)}$N.exports=pY});var Fr=d((ATe,IN)=>{var mY=ON(),hY=vT();function yY(t,e){return t!=null&&hY(t,e,mY)}IN.exports=yY});var _T=d((STe,DN)=>{var gY=_a(),vY=function(){try{var t=gY(Object,"defineProperty");return t({},"",{}),t}catch{}}();DN.exports=vY});var Wd=d((bTe,LN)=>{var xN=_T();function TY(t,e,r){e=="__proto__"&&xN?xN(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}LN.exports=TY});var Ol=d((PTe,qN)=>{var _Y=Wd(),RY=$s(),AY=Object.prototype,SY=AY.hasOwnProperty;function bY(t,e,r){var n=t[e];(!(SY.call(t,e)&&RY(n,r))||r===void 0&&!(e in t))&&_Y(t,e,r)}qN.exports=bY});var Ms=d((CTe,MN)=>{var PY=Ol(),CY=Wd();function kY(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?CY(r,s,u):PY(r,s,u)}return r}MN.exports=kY});var jN=d((kTe,FN)=>{var wY=Ms(),EY=Mr();function NY(t,e){return t&&wY(e,EY(e),t)}FN.exports=NY});var UN=d((wTe,GN)=>{function $Y(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}GN.exports=$Y});var KN=d((ETe,HN)=>{var OY=Nn(),IY=Ss(),DY=UN(),xY=Object.prototype,LY=xY.hasOwnProperty;function qY(t){if(!OY(t))return DY(t);var e=IY(t),r=[];for(var n in t)n=="constructor"&&(e||!LY.call(t,n))||r.push(n);return r}HN.exports=qY});var Il=d((NTe,WN)=>{var MY=cT(),FY=KN(),jY=On();function GY(t){return jY(t)?MY(t,!0):FY(t)}WN.exports=GY});var VN=d(($Te,BN)=>{var UY=Ms(),HY=Il();function KY(t,e){return t&&UY(e,HY(e),t)}BN.exports=KY});var QN=d((Dl,Fs)=>{var WY=En(),JN=typeof Dl=="object"&&Dl&&!Dl.nodeType&&Dl,zN=JN&&typeof Fs=="object"&&Fs&&!Fs.nodeType&&Fs,BY=zN&&zN.exports===JN,YN=BY?WY.Buffer:void 0,XN=YN?YN.allocUnsafe:void 0;function VY(t,e){if(e)return t.slice();var r=t.length,n=XN?XN(r):new t.constructor(r);return t.copy(n),n}Fs.exports=VY});var e$=d((OTe,ZN)=>{function zY(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}ZN.exports=zY});var r$=d((ITe,t$)=>{var YY=Ms(),XY=Gd();function JY(t,e){return YY(t,XY(t),e)}t$.exports=JY});var RT=d((DTe,n$)=>{var QY=Bv(),ZY=QY(Object.getPrototypeOf,Object);n$.exports=ZY});var AT=d((xTe,i$)=>{var eX=Fd(),tX=RT(),rX=Gd(),nX=lT(),iX=Object.getOwnPropertySymbols,aX=iX?function(t){for(var e=[];t;)eX(e,rX(t)),t=tX(t);return e}:nX;i$.exports=aX});var o$=d((LTe,a$)=>{var oX=Ms(),sX=AT();function uX(t,e){return oX(t,sX(t),e)}a$.exports=uX});var ST=d((qTe,s$)=>{var lX=uT(),cX=AT(),fX=Il();function dX(t){return lX(t,fX,cX)}s$.exports=dX});var l$=d((MTe,u$)=>{var pX=Object.prototype,mX=pX.hasOwnProperty;function hX(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&mX.call(t,"index")&&(r.index=t.index,r.input=t.input),r}u$.exports=hX});var Bd=d((FTe,f$)=>{var c$=oT();function yX(t){var e=new t.constructor(t.byteLength);return new c$(e).set(new c$(t)),e}f$.exports=yX});var p$=d((jTe,d$)=>{var gX=Bd();function vX(t,e){var r=e?gX(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}d$.exports=vX});var h$=d((GTe,m$)=>{var TX=/\w*$/;function _X(t){var e=new t.constructor(t.source,TX.exec(t));return e.lastIndex=t.lastIndex,e}m$.exports=_X});var _$=d((UTe,T$)=>{var y$=so(),g$=y$?y$.prototype:void 0,v$=g$?g$.valueOf:void 0;function RX(t){return v$?Object(v$.call(t)):{}}T$.exports=RX});var A$=d((HTe,R$)=>{var AX=Bd();function SX(t,e){var r=e?AX(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}R$.exports=SX});var b$=d((KTe,S$)=>{var bX=Bd(),PX=p$(),CX=h$(),kX=_$(),wX=A$(),EX="[object Boolean]",NX="[object Date]",$X="[object Map]",OX="[object Number]",IX="[object RegExp]",DX="[object Set]",xX="[object String]",LX="[object Symbol]",qX="[object ArrayBuffer]",MX="[object DataView]",FX="[object Float32Array]",jX="[object Float64Array]",GX="[object Int8Array]",UX="[object Int16Array]",HX="[object Int32Array]",KX="[object Uint8Array]",WX="[object Uint8ClampedArray]",BX="[object Uint16Array]",VX="[object Uint32Array]";function zX(t,e,r){var n=t.constructor;switch(e){case qX:return bX(t);case EX:case NX:return new n(+t);case MX:return PX(t,r);case FX:case jX:case GX:case UX:case HX:case KX:case WX:case BX:case VX:return wX(t,r);case $X:return new n;case OX:case xX:return new n(t);case IX:return CX(t);case DX:return new n;case LX:return kX(t)}}S$.exports=zX});var k$=d((WTe,C$)=>{var YX=Nn(),P$=Object.create,XX=function(){function t(){}return function(e){if(!YX(e))return{};if(P$)return P$(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();C$.exports=XX});var E$=d((BTe,w$)=>{var JX=k$(),QX=RT(),ZX=Ss();function eJ(t){return typeof t.constructor=="function"&&!ZX(t)?JX(QX(t)):{}}w$.exports=eJ});var $$=d((VTe,N$)=>{var tJ=Cs(),rJ=$n(),nJ="[object Map]";function iJ(t){return rJ(t)&&tJ(t)==nJ}N$.exports=iJ});var x$=d((zTe,D$)=>{var aJ=$$(),oJ=ws(),O$=Pl(),I$=O$&&O$.isMap,sJ=I$?oJ(I$):aJ;D$.exports=sJ});var q$=d((YTe,L$)=>{var uJ=Cs(),lJ=$n(),cJ="[object Set]";function fJ(t){return lJ(t)&&uJ(t)==cJ}L$.exports=fJ});var G$=d((XTe,j$)=>{var dJ=q$(),pJ=ws(),M$=Pl(),F$=M$&&M$.isSet,mJ=F$?pJ(F$):dJ;j$.exports=mJ});var B$=d((JTe,W$)=>{var hJ=Dd(),yJ=TT(),gJ=Ol(),vJ=jN(),TJ=VN(),_J=QN(),RJ=e$(),AJ=r$(),SJ=o$(),bJ=fT(),PJ=ST(),CJ=Cs(),kJ=l$(),wJ=b$(),EJ=E$(),NJ=Le(),$J=Al(),OJ=x$(),IJ=Nn(),DJ=G$(),xJ=Mr(),LJ=Il(),qJ=1,MJ=2,FJ=4,U$="[object Arguments]",jJ="[object Array]",GJ="[object Boolean]",UJ="[object Date]",HJ="[object Error]",H$="[object Function]",KJ="[object GeneratorFunction]",WJ="[object Map]",BJ="[object Number]",K$="[object Object]",VJ="[object RegExp]",zJ="[object Set]",YJ="[object String]",XJ="[object Symbol]",JJ="[object WeakMap]",QJ="[object ArrayBuffer]",ZJ="[object DataView]",eQ="[object Float32Array]",tQ="[object Float64Array]",rQ="[object Int8Array]",nQ="[object Int16Array]",iQ="[object Int32Array]",aQ="[object Uint8Array]",oQ="[object Uint8ClampedArray]",sQ="[object Uint16Array]",uQ="[object Uint32Array]",Je={};Je[U$]=Je[jJ]=Je[QJ]=Je[ZJ]=Je[GJ]=Je[UJ]=Je[eQ]=Je[tQ]=Je[rQ]=Je[nQ]=Je[iQ]=Je[WJ]=Je[BJ]=Je[K$]=Je[VJ]=Je[zJ]=Je[YJ]=Je[XJ]=Je[aQ]=Je[oQ]=Je[sQ]=Je[uQ]=!0;Je[HJ]=Je[H$]=Je[JJ]=!1;function Vd(t,e,r,n,i,a){var o,s=e&qJ,u=e&MJ,l=e&FJ;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!IJ(t))return t;var c=NJ(t);if(c){if(o=kJ(t),!s)return RJ(t,o)}else{var f=CJ(t),y=f==H$||f==KJ;if($J(t))return _J(t,s);if(f==K$||f==U$||y&&!i){if(o=u||y?{}:EJ(t),!s)return u?SJ(t,TJ(o,t)):AJ(t,vJ(o,t))}else{if(!Je[f])return i?t:{};o=wJ(t,f,s)}}a||(a=new hJ);var v=a.get(t);if(v)return v;a.set(t,o),DJ(t)?t.forEach(function(w){o.add(Vd(w,e,r,w,t,a))}):OJ(t)&&t.forEach(function(w,C){o.set(C,Vd(w,e,r,C,t,a))});var h=l?u?PJ:bJ:u?LJ:xJ,A=c?void 0:h(t);return yJ(A||t,function(w,C){A&&(C=w,w=t[C]),gJ(o,C,Vd(w,e,r,C,t,a))}),o}W$.exports=Vd});var xi=d((QTe,V$)=>{var lQ=B$(),cQ=4;function fQ(t){return lQ(t,cQ)}V$.exports=fQ});var z$=d(js=>{"use strict";Object.defineProperty(js,"__esModule",{value:!0});js.PRINT_WARNING=js.PRINT_ERROR=void 0;function dQ(t){console&&console.error&&console.error("Error: ".concat(t))}js.PRINT_ERROR=dQ;function pQ(t){console&&console.warn&&console.warn("Warning: ".concat(t))}js.PRINT_WARNING=pQ});var Y$=d(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.timer=void 0;function mQ(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}zd.timer=mQ});var X$=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var Gs=d(ei=>{"use strict";Object.defineProperty(ei,"__esModule",{value:!0});ei.toFastProperties=ei.timer=ei.PRINT_ERROR=ei.PRINT_WARNING=void 0;var J$=z$();Object.defineProperty(ei,"PRINT_WARNING",{enumerable:!0,get:function(){return J$.PRINT_WARNING}});Object.defineProperty(ei,"PRINT_ERROR",{enumerable:!0,get:function(){return J$.PRINT_ERROR}});var hQ=Y$();Object.defineProperty(ei,"timer",{enumerable:!0,get:function(){return hQ.timer}});var yQ=X$();Object.defineProperty(ei,"toFastProperties",{enumerable:!0,get:function(){return yQ.toFastProperties}})});var Yd=d((r_e,Q$)=>{function gQ(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}Q$.exports=gQ});var eO=d((n_e,Z$)=>{var vQ=/\s/;function TQ(t){for(var e=t.length;e--&&vQ.test(t.charAt(e)););return e}Z$.exports=TQ});var rO=d((i_e,tO)=>{var _Q=eO(),RQ=/^\s+/;function AQ(t){return t&&t.slice(0,_Q(t)+1).replace(RQ,"")}tO.exports=AQ});var oO=d((a_e,aO)=>{var SQ=rO(),nO=Nn(),bQ=Ls(),iO=0/0,PQ=/^[-+]0x[0-9a-f]+$/i,CQ=/^0b[01]+$/i,kQ=/^0o[0-7]+$/i,wQ=parseInt;function EQ(t){if(typeof t=="number")return t;if(bQ(t))return iO;if(nO(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=nO(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=SQ(t);var r=CQ.test(t);return r||kQ.test(t)?wQ(t.slice(2),r?2:8):PQ.test(t)?iO:+t}aO.exports=EQ});var lO=d((o_e,uO)=>{var NQ=oO(),sO=1/0,$Q=17976931348623157e292;function OQ(t){if(!t)return t===0?t:0;if(t=NQ(t),t===sO||t===-sO){var e=t<0?-1:1;return e*$Q}return t===t?t:0}uO.exports=OQ});var Us=d((s_e,cO)=>{var IQ=lO();function DQ(t){var e=IQ(t),r=e%1;return e===e?r?e-r:e:0}cO.exports=DQ});var Xd=d((u_e,fO)=>{var xQ=Yd(),LQ=Us();function qQ(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:LQ(e),xQ(t,e<0?0:e,n)):[]}fO.exports=qQ});var xl=d((l_e,dO)=>{var MQ=Ta(),FQ=Le(),jQ=$n(),GQ="[object String]";function UQ(t){return typeof t=="string"||!FQ(t)&&jQ(t)&&MQ(t)==GQ}dO.exports=UQ});var mO=d((c_e,pO)=>{var HQ=Ta(),KQ=$n(),WQ="[object RegExp]";function BQ(t){return KQ(t)&&HQ(t)==WQ}pO.exports=BQ});var bT=d((f_e,gO)=>{var VQ=mO(),zQ=ws(),hO=Pl(),yO=hO&&hO.isRegExp,YQ=yO?zQ(yO):VQ;gO.exports=YQ});var _O=d((d_e,TO)=>{var XQ=Ol(),JQ=$l(),QQ=Nl(),vO=Nn(),ZQ=qs();function eZ(t,e,r,n){if(!vO(t))return t;e=JQ(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=ZQ(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=vO(c)?c:QQ(e[i+1])?[]:{})}XQ(s,u,l),s=s[u]}return t}TO.exports=eZ});var AO=d((p_e,RO)=>{var tZ=Kd(),rZ=_O(),nZ=$l();function iZ(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=tZ(t,o);r(s,o)&&rZ(a,nZ(o,t),s)}return a}RO.exports=iZ});var PT=d((m_e,SO)=>{var aZ=Ns(),oZ=nn(),sZ=AO(),uZ=ST();function lZ(t,e){if(t==null)return{};var r=aZ(uZ(t),function(n){return[n]});return e=oZ(e),sZ(t,r,function(n,i){return e(n,i[0])})}SO.exports=lZ});var PO=d((h_e,bO)=>{function cZ(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}bO.exports=cZ});var wO=d((y_e,kO)=>{var fZ=PO(),CO=Math.max;function dZ(t,e,r){return e=CO(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=CO(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),fZ(t,this,s)}}kO.exports=dZ});var NO=d((g_e,EO)=>{function pZ(t){return function(){return t}}EO.exports=pZ});var IO=d((v_e,OO)=>{var mZ=NO(),$O=_T(),hZ=lo(),yZ=$O?function(t,e){return $O(t,"toString",{configurable:!0,enumerable:!1,value:mZ(e),writable:!0})}:hZ;OO.exports=yZ});var xO=d((T_e,DO)=>{var gZ=800,vZ=16,TZ=Date.now;function _Z(t){var e=0,r=0;return function(){var n=TZ(),i=vZ-(n-r);if(r=n,i>0){if(++e>=gZ)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}DO.exports=_Z});var qO=d((__e,LO)=>{var RZ=IO(),AZ=xO(),SZ=AZ(RZ);LO.exports=SZ});var Jd=d((R_e,MO)=>{var bZ=lo(),PZ=wO(),CZ=qO();function kZ(t,e){return CZ(PZ(t,e,bZ),t+"")}MO.exports=kZ});var Ll=d((A_e,FO)=>{var wZ=$s(),EZ=On(),NZ=Nl(),$Z=Nn();function OZ(t,e,r){if(!$Z(r))return!1;var n=typeof e;return(n=="number"?EZ(r)&&NZ(e,r.length):n=="string"&&e in r)?wZ(r[e],t):!1}FO.exports=OZ});var GO=d((S_e,jO)=>{var IZ=Jd(),DZ=Ll();function xZ(t){return IZ(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&DZ(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}jO.exports=xZ});var ql=d((b_e,UO)=>{var LZ=Ol(),qZ=Ms(),MZ=GO(),FZ=On(),jZ=Ss(),GZ=Mr(),UZ=Object.prototype,HZ=UZ.hasOwnProperty,KZ=MZ(function(t,e){if(jZ(e)||FZ(e)){qZ(e,GZ(e),t);return}for(var r in e)HZ.call(e,r)&&LZ(t,r,e[r])});UO.exports=KZ});var Zd=d(Pe=>{"use strict";var Li=Pe&&Pe.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Hs=Pe&&Pe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.serializeProduction=Pe.serializeGrammar=Pe.Terminal=Pe.Alternation=Pe.RepetitionWithSeparator=Pe.Repetition=Pe.RepetitionMandatoryWithSeparator=Pe.RepetitionMandatory=Pe.Option=Pe.Alternative=Pe.Rule=Pe.NonTerminal=Pe.AbstractProduction=void 0;var HO=Hs(Ht()),WZ=Hs(Kt()),CT=Hs(xl()),BZ=Hs(bT()),ti=Hs(PT()),ri=Hs(ql());function VZ(t){return zZ(t)?t.LABEL:t.name}function zZ(t){return(0,CT.default)(t.LABEL)&&t.LABEL!==""}var ni=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,WZ.default)(this.definition,function(r){r.accept(e)})},t}();Pe.AbstractProduction=ni;var KO=function(t){Li(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(ni);Pe.NonTerminal=KO;var WO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.Rule=WO;var BO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.Alternative=BO;var VO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.Option=VO;var zO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.RepetitionMandatory=zO;var YO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.RepetitionMandatoryWithSeparator=YO;var XO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.Repetition=XO;var JO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return e}(ni);Pe.RepetitionWithSeparator=JO;var QO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,ri.default)(n,(0,ti.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(ni);Pe.Alternation=QO;var Qd=function(){function t(e){this.idx=1,(0,ri.default)(this,(0,ti.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Pe.Terminal=Qd;function YZ(t){return(0,HO.default)(t,Ml)}Pe.serializeGrammar=YZ;function Ml(t){function e(a){return(0,HO.default)(a,Ml)}if(t instanceof KO){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,CT.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof BO)return{type:"Alternative",definition:e(t.definition)};if(t instanceof VO)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof zO)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof YO)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Ml(new Qd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof JO)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Ml(new Qd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof XO)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof QO)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Qd){var n={type:"Terminal",name:t.terminalType.name,label:VZ(t.terminalType),idx:t.idx};(0,CT.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,BZ.default)(i)?i.source:i),n}else{if(t instanceof WO)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Pe.serializeProduction=Ml});var ZO=d(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.GAstVisitor=void 0;var ii=Zd(),XZ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case ii.NonTerminal:return this.visitNonTerminal(r);case ii.Alternative:return this.visitAlternative(r);case ii.Option:return this.visitOption(r);case ii.RepetitionMandatory:return this.visitRepetitionMandatory(r);case ii.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case ii.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case ii.Repetition:return this.visitRepetition(r);case ii.Alternation:return this.visitAlternation(r);case ii.Terminal:return this.visitTerminal(r);case ii.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();ep.GAstVisitor=XZ});var tI=d((k_e,eI)=>{var JZ=Ra();function QZ(t,e){var r;return JZ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}eI.exports=QZ});var tp=d((w_e,rI)=>{var ZZ=iT(),eee=nn(),tee=tI(),ree=Le(),nee=Ll();function iee(t,e,r){var n=ree(t)?ZZ:tee;return r&&nee(t,e,r)&&(e=void 0),n(t,eee(e,3))}rI.exports=iee});var iI=d((E_e,nI)=>{function aee(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}nI.exports=aee});var oI=d((N_e,aI)=>{var oee=Ra();function see(t,e){var r=!0;return oee(t,function(n,i,a){return r=!!e(n,i,a),r}),r}aI.exports=see});var Fl=d(($_e,sI)=>{var uee=iI(),lee=oI(),cee=nn(),fee=Le(),dee=Ll();function pee(t,e,r){var n=fee(t)?uee:lee;return r&&dee(t,e,r)&&(e=void 0),n(t,cee(e,3))}sI.exports=pee});var kT=d((O_e,uI)=>{function mee(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}uI.exports=mee});var cI=d((I_e,lI)=>{function hee(t){return t!==t}lI.exports=hee});var dI=d((D_e,fI)=>{function yee(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}fI.exports=yee});var rp=d((x_e,pI)=>{var gee=kT(),vee=cI(),Tee=dI();function _ee(t,e,r){return e===e?Tee(t,e,r):gee(t,vee,r)}pI.exports=_ee});var qi=d((L_e,mI)=>{var Ree=rp(),Aee=On(),See=xl(),bee=Us(),Pee=Zn(),Cee=Math.max;function kee(t,e,r,n){t=Aee(t)?t:Pee(t),r=r&&!n?bee(r):0;var i=t.length;return r<0&&(r=Cee(i+r,0)),See(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ree(t,e,r)>-1}mI.exports=kee});var hI=d(an=>{"use strict";var ET=an&&an.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(an,"__esModule",{value:!0});an.getProductionDslName=an.isBranchingProd=an.isOptionalProd=an.isSequenceProd=void 0;var wee=ET(tp()),Eee=ET(Fl()),Nee=ET(qi()),st=Zd();function $ee(t){return t instanceof st.Alternative||t instanceof st.Option||t instanceof st.Repetition||t instanceof st.RepetitionMandatory||t instanceof st.RepetitionMandatoryWithSeparator||t instanceof st.RepetitionWithSeparator||t instanceof st.Terminal||t instanceof st.Rule}an.isSequenceProd=$ee;function wT(t,e){e===void 0&&(e=[]);var r=t instanceof st.Option||t instanceof st.Repetition||t instanceof st.RepetitionWithSeparator;return r?!0:t instanceof st.Alternation?(0,wee.default)(t.definition,function(n){return wT(n,e)}):t instanceof st.NonTerminal&&(0,Nee.default)(e,t)?!1:t instanceof st.AbstractProduction?(t instanceof st.NonTerminal&&e.push(t),(0,Eee.default)(t.definition,function(n){return wT(n,e)})):!1}an.isOptionalProd=wT;function Oee(t){return t instanceof st.Alternation}an.isBranchingProd=Oee;function Iee(t){if(t instanceof st.NonTerminal)return"SUBRULE";if(t instanceof st.Option)return"OPTION";if(t instanceof st.Alternation)return"OR";if(t instanceof st.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof st.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof st.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof st.Repetition)return"MANY";if(t instanceof st.Terminal)return"CONSUME";throw Error("non exhaustive match")}an.getProductionDslName=Iee});var _t=d(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.isSequenceProd=he.isBranchingProd=he.isOptionalProd=he.getProductionDslName=he.GAstVisitor=he.serializeProduction=he.serializeGrammar=he.Alternative=he.Alternation=he.RepetitionWithSeparator=he.RepetitionMandatoryWithSeparator=he.RepetitionMandatory=he.Repetition=he.Option=he.NonTerminal=he.Terminal=he.Rule=void 0;var on=Zd();Object.defineProperty(he,"Rule",{enumerable:!0,get:function(){return on.Rule}});Object.defineProperty(he,"Terminal",{enumerable:!0,get:function(){return on.Terminal}});Object.defineProperty(he,"NonTerminal",{enumerable:!0,get:function(){return on.NonTerminal}});Object.defineProperty(he,"Option",{enumerable:!0,get:function(){return on.Option}});Object.defineProperty(he,"Repetition",{enumerable:!0,get:function(){return on.Repetition}});Object.defineProperty(he,"RepetitionMandatory",{enumerable:!0,get:function(){return on.RepetitionMandatory}});Object.defineProperty(he,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return on.RepetitionMandatoryWithSeparator}});Object.defineProperty(he,"RepetitionWithSeparator",{enumerable:!0,get:function(){return on.RepetitionWithSeparator}});Object.defineProperty(he,"Alternation",{enumerable:!0,get:function(){return on.Alternation}});Object.defineProperty(he,"Alternative",{enumerable:!0,get:function(){return on.Alternative}});Object.defineProperty(he,"serializeGrammar",{enumerable:!0,get:function(){return on.serializeGrammar}});Object.defineProperty(he,"serializeProduction",{enumerable:!0,get:function(){return on.serializeProduction}});var Dee=ZO();Object.defineProperty(he,"GAstVisitor",{enumerable:!0,get:function(){return Dee.GAstVisitor}});var np=hI();Object.defineProperty(he,"getProductionDslName",{enumerable:!0,get:function(){return np.getProductionDslName}});Object.defineProperty(he,"isOptionalProd",{enumerable:!0,get:function(){return np.isOptionalProd}});Object.defineProperty(he,"isBranchingProd",{enumerable:!0,get:function(){return np.isBranchingProd}});Object.defineProperty(he,"isSequenceProd",{enumerable:!0,get:function(){return np.isSequenceProd}})});var ip=d(Ks=>{"use strict";var vI=Ks&&Ks.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ks,"__esModule",{value:!0});Ks.RestWalker=void 0;var xee=vI(Xd()),yI=vI(Kt()),wr=_t(),Lee=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,yI.default)(e.definition,function(i,a){var o=(0,xee.default)(e.definition,a+1);if(i instanceof wr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof wr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof wr.Alternative)n.walkFlat(i,o,r);else if(i instanceof wr.Option)n.walkOption(i,o,r);else if(i instanceof wr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof wr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof wr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof wr.Repetition)n.walkMany(i,o,r);else if(i instanceof wr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new wr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=gI(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new wr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=gI(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,yI.default)(e.definition,function(o){var s=new wr.Alternative({definition:[o]});i.walk(s,a)})},t}();Ks.RestWalker=Lee;function gI(t,e,r){var n=[new wr.Option({definition:[new wr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var AI=d((j_e,RI)=>{var TI=so(),qee=_l(),Mee=Le(),_I=TI?TI.isConcatSpreadable:void 0;function Fee(t){return Mee(t)||qee(t)||!!(_I&&t&&t[_I])}RI.exports=Fee});var ap=d((G_e,bI)=>{var jee=Fd(),Gee=AI();function SI(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=Gee),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?SI(s,e-1,r,n,i):jee(i,s):n||(i[i.length]=s)}return i}bI.exports=SI});var In=d((U_e,PI)=>{var Uee=ap();function Hee(t){var e=t==null?0:t.length;return e?Uee(t,1):[]}PI.exports=Hee});var NT=d((H_e,CI)=>{var Kee=rp();function Wee(t,e){var r=t==null?0:t.length;return!!r&&Kee(t,e,0)>-1}CI.exports=Wee});var $T=d((K_e,kI)=>{function Bee(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}kI.exports=Bee});var op=d((W_e,wI)=>{function Vee(){}wI.exports=Vee});var NI=d((B_e,EI)=>{var OT=Jv(),zee=op(),Yee=Md(),Xee=1/0,Jee=OT&&1/Yee(new OT([,-0]))[1]==Xee?function(t){return new OT(t)}:zee;EI.exports=Jee});var IT=d((V_e,$I)=>{var Qee=Ld(),Zee=NT(),ete=$T(),tte=qd(),rte=NI(),nte=Md(),ite=200;function ate(t,e,r){var n=-1,i=Zee,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=ete;else if(a>=ite){var l=e?null:rte(t);if(l)return nte(l);o=!1,i=tte,u=new Qee}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var y=u.length;y--;)if(u[y]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}$I.exports=ate});var sp=d((z_e,OI)=>{var ote=IT();function ste(t){return t&&t.length?ote(t):[]}OI.exports=ste});var LT=d(sn=>{"use strict";var xT=sn&&sn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(sn,"__esModule",{value:!0});sn.firstForTerminal=sn.firstForBranching=sn.firstForSequence=sn.first=void 0;var ute=xT(In()),DI=xT(sp()),lte=xT(Ht()),II=_t(),DT=_t();function up(t){if(t instanceof II.NonTerminal)return up(t.referencedRule);if(t instanceof II.Terminal)return qI(t);if((0,DT.isSequenceProd)(t))return xI(t);if((0,DT.isBranchingProd)(t))return LI(t);throw Error("non exhaustive match")}sn.first=up;function xI(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,DT.isOptionalProd)(a),e=e.concat(up(a)),n=n+1,i=r.length>n;return(0,DI.default)(e)}sn.firstForSequence=xI;function LI(t){var e=(0,lte.default)(t.definition,function(r){return up(r)});return(0,DI.default)((0,ute.default)(e))}sn.firstForBranching=LI;function qI(t){return[t.terminalType]}sn.firstForTerminal=qI});var qT=d(lp=>{"use strict";Object.defineProperty(lp,"__esModule",{value:!0});lp.IN=void 0;lp.IN="_~IN~_"});var UI=d(Er=>{"use strict";var cte=Er&&Er.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),MI=Er&&Er.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Er,"__esModule",{value:!0});Er.buildInProdFollowPrefix=Er.buildBetweenProdsFollowPrefix=Er.computeAllProdsFollows=Er.ResyncFollowsWalker=void 0;var fte=ip(),dte=LT(),pte=MI(Kt()),mte=MI(ql()),FI=qT(),hte=_t(),jI=function(t){cte(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=GI(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new hte.Alternative({definition:o}),u=(0,dte.first)(s);this.follows[a]=u},e}(fte.RestWalker);Er.ResyncFollowsWalker=jI;function yte(t){var e={};return(0,pte.default)(t,function(r){var n=new jI(r).startWalking();(0,mte.default)(e,n)}),e}Er.computeAllProdsFollows=yte;function GI(t,e){return t.name+e+FI.IN}Er.buildBetweenProdsFollowPrefix=GI;function gte(t){var e=t.terminalType.name;return e+t.idx+FI.IN}Er.buildInProdFollowPrefix=gte});var co=d((Q_e,HI)=>{function vte(t){return t===void 0}HI.exports=vte});var WI=d((Z_e,KI)=>{function Tte(t){return t&&t.length?t[0]:void 0}KI.exports=Tte});var Ws=d((eRe,BI)=>{BI.exports=WI()});var jl=d((tRe,VI)=>{function _te(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}VI.exports=_te});var MT=d((rRe,zI)=>{var Rte=Ra();function Ate(t,e){var r=[];return Rte(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}zI.exports=Ate});var XI=d((nRe,YI)=>{var Ste="Expected a function";function bte(t){if(typeof t!="function")throw new TypeError(Ste);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}YI.exports=bte});var cp=d((iRe,JI)=>{var Pte=jd(),Cte=MT(),kte=nn(),wte=Le(),Ete=XI();function Nte(t,e){var r=wte(t)?Pte:Cte;return r(t,Ete(kte(e,3)))}JI.exports=Nte});var ZI=d((aRe,QI)=>{var $te=Ld(),Ote=NT(),Ite=$T(),Dte=Ns(),xte=ws(),Lte=qd(),qte=200;function Mte(t,e,r,n){var i=-1,a=Ote,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=Dte(e,xte(r))),n?(a=Ite,o=!1):e.length>=qte&&(a=Lte,o=!1,e=new $te(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var y=l;y--;)if(e[y]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}QI.exports=Mte});var t1=d((oRe,e1)=>{var Fte=On(),jte=$n();function Gte(t){return jte(t)&&Fte(t)}e1.exports=Gte});var fp=d((sRe,n1)=>{var Ute=ZI(),Hte=ap(),Kte=Jd(),r1=t1(),Wte=Kte(function(t,e){return r1(t)?Ute(t,Hte(e,1,r1,!0)):[]});n1.exports=Wte});var a1=d((uRe,i1)=>{var Bte=rp(),Vte=Us(),zte=Math.max;function Yte(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Vte(r);return i<0&&(i=zte(n+i,0)),Bte(t,e,i)}i1.exports=Yte});var s1=d((lRe,o1)=>{var Xte=nn(),Jte=On(),Qte=Mr();function Zte(t){return function(e,r,n){var i=Object(e);if(!Jte(e)){var a=Xte(r,3);e=Qte(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}o1.exports=Zte});var l1=d((cRe,u1)=>{var ere=kT(),tre=nn(),rre=Us(),nre=Math.max;function ire(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:rre(r);return i<0&&(i=nre(n+i,0)),ere(t,tre(e,3),i)}u1.exports=ire});var dp=d((fRe,c1)=>{var are=s1(),ore=l1(),sre=are(ore);c1.exports=sre});var Gl=d((dRe,f1)=>{var ure=jd(),lre=MT(),cre=nn(),fre=Le();function dre(t,e){var r=fre(t)?ure:lre;return r(t,cre(e,3))}f1.exports=dre});var FT=d((pRe,p1)=>{var pre=Jd(),mre=$s(),hre=Ll(),yre=Il(),d1=Object.prototype,gre=d1.hasOwnProperty,vre=pre(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&hre(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=yre(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||mre(c,d1[l])&&!gre.call(t,l))&&(t[l]=a[l])}return t});p1.exports=vre});var h1=d((mRe,m1)=>{function Tre(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}m1.exports=Tre});var g1=d((hRe,y1)=>{function _re(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}y1.exports=_re});var Mi=d((yRe,v1)=>{var Rre=h1(),Are=Ra(),Sre=nn(),bre=g1(),Pre=Le();function Cre(t,e,r){var n=Pre(t)?Rre:bre,i=arguments.length<3;return n(t,Sre(e,4),r,i,Are)}v1.exports=Cre});var mp=d(Bs=>{"use strict";Object.defineProperty(Bs,"__esModule",{value:!0});Bs.clearRegExpParserCache=Bs.getRegExpAst=void 0;var kre=fl(),pp={},wre=new kre.RegExpParser;function Ere(t){var e=t.toString();if(pp.hasOwnProperty(e))return pp[e];var r=wre.pattern(e);return pp[e]=r,r}Bs.getRegExpAst=Ere;function Nre(){pp={}}Bs.clearRegExpParserCache=Nre});var b1=d(ur=>{"use strict";var $re=ur&&ur.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Vs=ur&&ur.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ur,"__esModule",{value:!0});ur.canMatchCharCode=ur.firstCharOptimizedIndices=ur.getOptimizedStartCodesIndices=ur.failedOptimizationPrefixMsg=void 0;var R1=fl(),Ore=Vs(Le()),Ire=Vs(Fl()),Dre=Vs(Kt()),jT=Vs(dp()),xre=Vs(Zn()),UT=Vs(qi()),T1=Gs(),A1=mp(),Fi=HT(),S1="Complement Sets are not supported for first char optimization";ur.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function Lre(t,e){e===void 0&&(e=!1);try{var r=(0,A1.getRegExpAst)(t),n=yp(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===S1)e&&(0,T1.PRINT_WARNING)("".concat(ur.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,T1.PRINT_ERROR)("".concat(ur.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(R1.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}ur.getOptimizedStartCodesIndices=Lre;function yp(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)yp(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":hp(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(S1);(0,Dre.default)(o.value,function(l){if(typeof l=="number")hp(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)hp(f,e,r);else{for(var f=c.from;f<=c.to&&f<Fi.minOptimizationVal;f++)hp(f,e,r);if(c.to>=Fi.minOptimizationVal)for(var y=c.from>=Fi.minOptimizationVal?c.from:Fi.minOptimizationVal,v=c.to,h=(0,Fi.charCodeToOptimizedIndex)(y),A=(0,Fi.charCodeToOptimizedIndex)(v),w=h;w<=A;w++)e[w]=w}}});break;case"Group":yp(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&GT(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,xre.default)(e)}ur.firstCharOptimizedIndices=yp;function hp(t,e,r){var n=(0,Fi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&qre(t,e)}function qre(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Fi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Fi.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function _1(t,e){return(0,jT.default)(t.value,function(r){if(typeof r=="number")return(0,UT.default)(e,r);var n=r;return(0,jT.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function GT(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,Ore.default)(t.value)?(0,Ire.default)(t.value,GT):GT(t.value):!1}var Mre=function(t){$re(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,UT.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?_1(r,this.targetCharCodes)===void 0&&(this.found=!0):_1(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(R1.BaseRegExpVisitor);function Fre(t,e){if(e instanceof RegExp){var r=(0,A1.getRegExpAst)(e),n=new Mre(t);return n.visit(r),n.found}else return(0,jT.default)(e,function(i){return(0,UT.default)(t,i.charCodeAt(0))})!==void 0}ur.canMatchCharCode=Fre});var HT=d(K=>{"use strict";var k1=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),yt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var w1=fl(),Fe=Ul(),jre=yt(Ws()),E1=yt(qr()),N1=yt(jl()),vp=yt(Le()),Gre=yt(Zn()),Ure=yt(In()),$1=yt(cp()),O1=yt(fp()),P1=yt(a1()),ut=yt(Ht()),ji=yt(Kt()),Gi=yt(xl()),_p=yt(bs()),WT=yt(co()),Hre=yt(dp()),lr=yt(Fr()),Kre=yt(Mr()),Aa=yt(bT()),ai=yt(Gl()),Wre=yt(FT()),Tp=yt(Mi()),Rp=yt(qi()),C1=Gs(),zs=b1(),I1=mp(),fo="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function Bre(){K.SUPPORT_STICKY=!1}K.disableSticky=Bre;function Vre(){K.SUPPORT_STICKY=!0}K.enableSticky=Vre;function zre(t,e){e=(0,Wre.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){ine()});var n;r("Reject Lexer.NA",function(){n=(0,$1.default)(t,function(b){return b[fo]===Fe.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,ut.default)(n,function(b){var S=b[fo];if((0,Aa.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,Rp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?VT(S):BT(S)}else{if((0,_p.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?VT(W):BT(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,ut.default)(n,function(b){return b.tokenTypeIdx}),s=(0,ut.default)(n,function(b){var S=b.GROUP;if(S!==Fe.Lexer.SKIPPED){if((0,Gi.default)(S))return S;if((0,WT.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,ut.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,vp.default)(S)?(0,ut.default)(S,function(F){return(0,P1.default)(n,F)}):[(0,P1.default)(n,S)];return O}}),l=(0,ut.default)(n,function(b){return b.PUSH_MODE}),c=(0,ut.default)(n,function(b){return(0,lr.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=V1(e.lineTerminatorCharacters);f=(0,ut.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,ut.default)(n,function(S){return(0,lr.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:W1(S,b)===!1&&(0,zs.canMatchCharCode)(b,S.PATTERN)}))});var y,v,h,A;r("Misc Mapping #2",function(){y=(0,ut.default)(n,YT),v=(0,ut.default)(a,K1),h=(0,Tp.default)(n,function(b,S){var O=S.GROUP;return(0,Gi.default)(O)&&O!==Fe.Lexer.SKIPPED&&(b[O]=[]),b},{}),A=(0,ut.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:y[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var w=!0,C=[];return e.safeMode||r("First Char Optimization",function(){C=(0,Tp.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=zT(F);KT(b,W,A[O])}else if((0,vp.default)(S.START_CHARS_HINT)){var te;(0,ji.default)(S.START_CHARS_HINT,function(Ee){var Qe=typeof Ee=="string"?Ee.charCodeAt(0):Ee,V=zT(Qe);te!==V&&(te=V,KT(b,V,A[O]))})}else if((0,Aa.default)(S.PATTERN))if(S.PATTERN.unicode)w=!1,e.ensureOptimizations&&(0,C1.PRINT_ERROR)("".concat(zs.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var we=(0,zs.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,E1.default)(we)&&(w=!1),(0,ji.default)(we,function(Ee){KT(b,Ee,A[O])})}else e.ensureOptimizations&&(0,C1.PRINT_ERROR)("".concat(zs.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),w=!1;return b},[])}),{emptyGroups:h,patternIdxToConfig:A,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:w}}K.analyzeTokenTypes=zre;function Yre(t,e){var r=[],n=D1(t);r=r.concat(n.errors);var i=x1(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(Xre(a)),r=r.concat(G1(a)),r=r.concat(U1(a,e)),r=r.concat(H1(a)),r}K.validatePatterns=Yre;function Xre(t){var e=[],r=(0,ai.default)(t,function(n){return(0,Aa.default)(n[fo])});return e=e.concat(L1(r)),e=e.concat(M1(r)),e=e.concat(F1(r)),e=e.concat(j1(r)),e=e.concat(q1(r)),e}function D1(t){var e=(0,ai.default)(t,function(i){return!(0,lr.default)(i,fo)}),r=(0,ut.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:Fe.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,O1.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=D1;function x1(t){var e=(0,ai.default)(t,function(i){var a=i[fo];return!(0,Aa.default)(a)&&!(0,_p.default)(a)&&!(0,lr.default)(a,"exec")&&!(0,Gi.default)(a)}),r=(0,ut.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:Fe.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,O1.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=x1;var Jre=/[^\\][$]/;function L1(t){var e=function(i){k1(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(w1.BaseRegExpVisitor),r=(0,ai.default)(t,function(i){var a=i.PATTERN;try{var o=(0,I1.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Jre.test(a.source)}}),n=(0,ut.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Fe.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=L1;function q1(t){var e=(0,ai.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:Fe.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=q1;var Qre=/[^\\[][\^]|^\^/;function M1(t){var e=function(i){k1(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(w1.BaseRegExpVisitor),r=(0,ai.default)(t,function(i){var a=i.PATTERN;try{var o=(0,I1.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Qre.test(a.source)}}),n=(0,ut.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Fe.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=M1;function F1(t){var e=(0,ai.default)(t,function(n){var i=n[fo];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:Fe.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=F1;function j1(t){var e=[],r=(0,ut.default)(t,function(a){return(0,Tp.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Rp.default)(e,s)&&s.PATTERN!==Fe.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,N1.default)(r);var n=(0,ai.default)(r,function(a){return a.length>1}),i=(0,ut.default)(n,function(a){var o=(0,ut.default)(a,function(u){return u.name}),s=(0,jre.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:Fe.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=j1;function G1(t){var e=(0,ai.default)(t,function(n){if(!(0,lr.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==Fe.Lexer.SKIPPED&&i!==Fe.Lexer.NA&&!(0,Gi.default)(i)}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:Fe.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=G1;function U1(t,e){var r=(0,ai.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Rp.default)(e,i.PUSH_MODE)}),n=(0,ut.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:Fe.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=U1;function H1(t){var e=[],r=(0,Tp.default)(t,function(n,i,a){var o=i.PATTERN;return o===Fe.Lexer.NA||((0,Gi.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,Aa.default)(o)&&ene(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,ji.default)(t,function(n,i){(0,ji.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Zre(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:Fe.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=H1;function Zre(t,e){if((0,Aa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,_p.default)(e))return e(t,0,[],{});if((0,lr.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function ene(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,Hre.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function BT(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=BT;function VT(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=VT;function tne(t,e,r){var n=[];return(0,lr.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,lr.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,lr.default)(t,K.MODES)&&(0,lr.default)(t,K.DEFAULT_MODE)&&!(0,lr.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,lr.default)(t,K.MODES)&&(0,ji.default)(t.modes,function(i,a){(0,ji.default)(i,function(o,s){if((0,WT.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:Fe.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,lr.default)(o,"LONGER_ALT")){var u=(0,vp.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,ji.default)(u,function(l){!(0,WT.default)(l)&&!(0,Rp.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=tne;function rne(t,e,r){var n=[],i=!1,a=(0,N1.default)((0,Ure.default)((0,Gre.default)(t.modes))),o=(0,$1.default)(a,function(u){return u[fo]===Fe.Lexer.NA}),s=V1(r);return e&&(0,ji.default)(o,function(u){var l=W1(u,s);if(l!==!1){var c=B1(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,lr.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,zs.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:Fe.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=rne;function nne(t){var e={},r=(0,Kre.default)(t);return(0,ji.default)(r,function(n){var i=t[n];if((0,vp.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=nne;function YT(t){var e=t.PATTERN;if((0,Aa.default)(e))return!1;if((0,_p.default)(e))return!0;if((0,lr.default)(e,"exec"))return!0;if((0,Gi.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=YT;function K1(t){return(0,Gi.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=K1;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function W1(t,e){if((0,lr.default)(t,"LINE_BREAKS"))return!1;if((0,Aa.default)(t.PATTERN)){try{(0,zs.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Gi.default)(t.PATTERN))return!1;if(YT(t))return{issue:Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function B1(t,e){if(e.issue===Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=B1;function V1(t){var e=(0,ut.default)(t,function(r){return(0,Gi.default)(r)?r.charCodeAt(0):r});return e}function KT(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var gp=[];function zT(t){return t<K.minOptimizationVal?t:gp[t]}K.charCodeToOptimizedIndex=zT;function ine(){if((0,E1.default)(gp)){gp=new Array(65536);for(var t=0;t<65536;t++)gp[t]=t>255?255+~~(t/255):t}}});var Ap=d((_Re,z1)=>{function ane(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}z1.exports=ane});var mo=d(ce=>{"use strict";var oi=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});ce.isTokenType=ce.hasExtendingTokensTypesMapProperty=ce.hasExtendingTokensTypesProperty=ce.hasCategoriesProperty=ce.hasShortKeyProperty=ce.singleAssignCategoriesToksMap=ce.assignCategoriesMapProp=ce.assignCategoriesTokensProp=ce.assignTokenDefaultProps=ce.expandCategories=ce.augmentTokenTypes=ce.tokenIdxToClass=ce.tokenShortNameIdx=ce.tokenStructuredMatcherNoCategories=ce.tokenStructuredMatcher=void 0;var one=oi(qr()),sne=oi(jl()),une=oi(Le()),lne=oi(In()),cne=oi(fp()),fne=oi(Ht()),po=oi(Kt()),Hl=oi(Fr()),dne=oi(qi()),pne=oi(xi());function mne(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}ce.tokenStructuredMatcher=mne;function hne(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}ce.tokenStructuredMatcherNoCategories=hne;ce.tokenShortNameIdx=1;ce.tokenIdxToClass={};function yne(t){var e=Y1(t);X1(e),Q1(e),J1(e),(0,po.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}ce.augmentTokenTypes=yne;function Y1(t){for(var e=(0,pne.default)(t),r=t,n=!0;n;){r=(0,sne.default)((0,lne.default)((0,fne.default)(r,function(a){return a.CATEGORIES})));var i=(0,cne.default)(r,e);e=e.concat(i),(0,one.default)(i)?n=!1:r=i}return e}ce.expandCategories=Y1;function X1(t){(0,po.default)(t,function(e){Z1(e)||(ce.tokenIdxToClass[ce.tokenShortNameIdx]=e,e.tokenTypeIdx=ce.tokenShortNameIdx++),XT(e)&&!(0,une.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),XT(e)||(e.CATEGORIES=[]),eD(e)||(e.categoryMatches=[]),tD(e)||(e.categoryMatchesMap={})})}ce.assignTokenDefaultProps=X1;function J1(t){(0,po.default)(t,function(e){e.categoryMatches=[],(0,po.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(ce.tokenIdxToClass[n].tokenTypeIdx)})})}ce.assignCategoriesTokensProp=J1;function Q1(t){(0,po.default)(t,function(e){JT([],e)})}ce.assignCategoriesMapProp=Q1;function JT(t,e){(0,po.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,po.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,dne.default)(n,r)||JT(n,r)})}ce.singleAssignCategoriesToksMap=JT;function Z1(t){return(0,Hl.default)(t,"tokenTypeIdx")}ce.hasShortKeyProperty=Z1;function XT(t){return(0,Hl.default)(t,"CATEGORIES")}ce.hasCategoriesProperty=XT;function eD(t){return(0,Hl.default)(t,"categoryMatches")}ce.hasExtendingTokensTypesProperty=eD;function tD(t){return(0,Hl.default)(t,"categoryMatchesMap")}ce.hasExtendingTokensTypesMapProperty=tD;function gne(t){return(0,Hl.default)(t,"tokenTypeIdx")}ce.isTokenType=gne});var QT=d(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.defaultLexerErrorProvider=void 0;Sp.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var Ul=d(Hi=>{"use strict";var jr=Hi&&Hi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Hi,"__esModule",{value:!0});Hi.Lexer=Hi.LexerDefinitionErrorType=void 0;var Ui=HT(),ZT=jr(op()),bp=jr(qr()),vne=jr(Le()),Tne=jr(Ap()),_ne=jr(cp()),rD=jr(Ht()),e_=jr(Kt()),Rne=jr(Mr()),Ane=jr(co()),nD=jr(lo()),iD=jr(ql()),Sne=jr(Mi()),aD=jr(xi()),t_=Gs(),bne=mo(),Pne=QT(),Cne=mp(),kne;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(kne=Hi.LexerDefinitionErrorType||(Hi.LexerDefinitionErrorType={}));var Kl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Pne.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Kl);var wne=function(){function t(e,r){r===void 0&&(r=Kl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,t_.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,iD.default)({},Kl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===Kl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Ui.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===Kl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,vne.default)(e)?a={modes:{defaultMode:(0,aD.default)(e)},defaultMode:Ui.DEFAULT_MODE}:(o=!1,a=(0,aD.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ui.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Ui.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,e_.default)(a.modes,function(c,f){a.modes[f]=(0,_ne.default)(c,function(y){return(0,Ane.default)(y)})});var s=(0,Rne.default)(a.modes);if((0,e_.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ui.validatePatterns)(c,s))}),(0,bp.default)(n.lexerDefinitionErrors)){(0,bne.augmentTokenTypes)(c);var y;n.TRACE_INIT("analyzeTokenTypes",function(){y=(0,Ui.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=y.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=y.charCodeToPatternIdxToConfig,n.emptyGroups=(0,iD.default)({},n.emptyGroups,y.emptyGroups),n.hasCustom=y.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=y.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,bp.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,rD.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,e_.default)(n.lexerDefinitionWarning,function(c){(0,t_.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Ui.SUPPORT_STICKY?(n.chopInput=nD.default,n.match=n.matchWithTest):(n.updateLastIndex=ZT.default,n.match=n.matchWithExec),o&&(n.handleModes=ZT.default),n.trackStartLines===!1&&(n.computeNewColumn=nD.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=ZT.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Sne.default)(n.canModeBeOptimized,function(f,y,v){return y===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,bp.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,Cne.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,t_.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,bp.default)(this.lexerDefinitionErrors)){var n=(0,rD.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,y,v,h,A,w,C,b,S,O=e,F=O.length,W=0,te=0,we=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(we),Qe=[],V=this.trackStartLines?1:void 0,fe=this.trackStartLines?1:void 0,q=(0,Ui.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,ae=[],oe=[],Z=[],dt=[];Object.freeze(dt);var tt;function Dt(){return ae}function fn(qt){var pn=(0,Ui.charCodeToOptimizedIndex)(qt),mn=oe[pn];return mn===void 0?dt:mn}var Dr=function(qt){if(Z.length===1&&qt.tokenType.PUSH_MODE===void 0){var pn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(qt);Qe.push({offset:qt.startOffset,line:qt.startLine,column:qt.startColumn,length:qt.image.length,message:pn})}else{Z.pop();var mn=(0,Tne.default)(Z);ae=n.patternIdxToConfig[mn],oe=n.charCodeToPatternIdxToConfig[mn],B=ae.length;var Un=n.canModeBeOptimized[mn]&&n.config.safeMode===!1;oe&&Un?tt=fn:tt=Dt}};function No(qt){Z.push(qt),oe=this.charCodeToPatternIdxToConfig[qt],ae=this.patternIdxToConfig[qt],B=ae.length,B=ae.length;var pn=this.canModeBeOptimized[qt]&&this.config.safeMode===!1;oe&&pn?tt=fn:tt=Dt}No.call(this,r);for(var dr,$o=this.config.recoveryEnabled;W<F;){l=null;var Oo=O.charCodeAt(W),Io=tt(Oo),Ou=Io.length;for(i=0;i<Ou;i++){dr=Io[i];var gt=dr.pattern;c=null;var gi=dr.short;if(gi!==!1?Oo===gi&&(l=gt):dr.isCustom===!0?(S=gt.exec(O,W,Ee,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(gt,W),l=this.match(gt,e,W)),l!==null){if(u=dr.longerAlt,u!==void 0){var Iu=u.length;for(o=0;o<Iu;o++){var Fn=ae[u[o]],ja=Fn.pattern;if(f=null,Fn.isCustom===!0?(S=ja.exec(O,W,Ee,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(ja,W),s=this.match(ja,e,W)),s&&s.length>l.length){l=s,c=f,dr=Fn;break}}}break}}if(l!==null){if(y=l.length,v=dr.group,v!==void 0&&(h=dr.tokenTypeIdx,A=this.createTokenInstance(l,W,h,dr.tokenType,V,fe,y),this.handlePayload(A,c),v===!1?te=this.addToken(Ee,te,A):q[v].push(A)),e=this.chopInput(e,y),W=W+y,fe=this.computeNewColumn(fe,y),L===!0&&dr.canLineTerminator===!0){var jn=0,Ga=void 0,Kr=void 0;j.lastIndex=0;do Ga=j.test(l),Ga===!0&&(Kr=j.lastIndex-1,jn++);while(Ga===!0);jn!==0&&(V=V+jn,fe=y-Kr,this.updateTokenEndLineColumnLocation(A,v,Kr,jn,V,fe,y))}this.handleModes(dr,Dr,No,A)}else{for(var dn=W,Do=V,xo=fe,xr=$o===!1;xr===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var Gn=ae[a],gt=Gn.pattern,gi=Gn.short;if(gi!==!1?O.charCodeAt(W)===gi&&(xr=!0):Gn.isCustom===!0?xr=gt.exec(O,W,Ee,q)!==null:(this.updateLastIndex(gt,W),xr=gt.exec(e)!==null),xr===!0)break}if(w=W-dn,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,dn,w,Do,xo),Qe.push({offset:dn,line:Do,column:xo,length:w,message:b}),$o===!1)break}}return this.hasCustom||(Ee.length=te),{tokens:Ee,groups:q,errors:Qe}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Hi.Lexer=wne});var ho=d(Lt=>{"use strict";var r_=Lt&&Lt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Lt,"__esModule",{value:!0});Lt.tokenMatcher=Lt.createTokenInstance=Lt.EOF=Lt.createToken=Lt.hasTokenLabel=Lt.tokenName=Lt.tokenLabel=void 0;var Ene=r_(xl()),Ki=r_(Fr()),Nne=r_(co()),$ne=Ul(),n_=mo();function One(t){return mD(t)?t.LABEL:t.name}Lt.tokenLabel=One;function Ine(t){return t.name}Lt.tokenName=Ine;function mD(t){return(0,Ene.default)(t.LABEL)&&t.LABEL!==""}Lt.hasTokenLabel=mD;var Dne="parent",oD="categories",sD="label",uD="group",lD="push_mode",cD="pop_mode",fD="longer_alt",dD="line_breaks",pD="start_chars_hint";function hD(t){return xne(t)}Lt.createToken=hD;function xne(t){var e=t.pattern,r={};if(r.name=t.name,(0,Nne.default)(e)||(r.PATTERN=e),(0,Ki.default)(t,Dne))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,Ki.default)(t,oD)&&(r.CATEGORIES=t[oD]),(0,n_.augmentTokenTypes)([r]),(0,Ki.default)(t,sD)&&(r.LABEL=t[sD]),(0,Ki.default)(t,uD)&&(r.GROUP=t[uD]),(0,Ki.default)(t,cD)&&(r.POP_MODE=t[cD]),(0,Ki.default)(t,lD)&&(r.PUSH_MODE=t[lD]),(0,Ki.default)(t,fD)&&(r.LONGER_ALT=t[fD]),(0,Ki.default)(t,dD)&&(r.LINE_BREAKS=t[dD]),(0,Ki.default)(t,pD)&&(r.START_CHARS_HINT=t[pD]),r}Lt.EOF=hD({name:"EOF",pattern:$ne.Lexer.NA});(0,n_.augmentTokenTypes)([Lt.EOF]);function Lne(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}Lt.createTokenInstance=Lne;function qne(t,e){return(0,n_.tokenStructuredMatcher)(t,e)}Lt.tokenMatcher=qne});var Xs=d(Dn=>{"use strict";var o_=Dn&&Dn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Dn,"__esModule",{value:!0});Dn.defaultGrammarValidatorErrorProvider=Dn.defaultGrammarResolverErrorProvider=Dn.defaultParserErrorProvider=void 0;var Ys=ho(),a_=o_(Ws()),Sa=o_(Ht()),Mne=o_(Mi()),i_=_t(),yD=_t();Dn.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,Ys.hasTokenLabel)(e),o=a?"--> ".concat((0,Ys.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,a_.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Mne.default)(e,function(v,h){return v.concat(h)},[]),c=(0,Sa.default)(l,function(v){return"[".concat((0,Sa.default)(v,function(h){return(0,Ys.tokenLabel)(h)}).join(", "),"]")}),f=(0,Sa.default)(c,function(v,h){return"  ".concat(h+1,". ").concat(v)}),y=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+y+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,a_.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,Sa.default)(e,function(c){return"[".concat((0,Sa.default)(c,function(f){return(0,Ys.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(Dn.defaultParserErrorProvider);Dn.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};Dn.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof i_.Terminal?c.terminalType.name:c instanceof i_.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,a_.default)(e),a=i.idx,o=(0,yD.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,Sa.default)(t.prefixPath,function(i){return(0,Ys.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,Sa.default)(t.prefixPath,function(i){return(0,Ys.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,yD.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,Sa.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof i_.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var TD=d(si=>{"use strict";var Fne=si&&si.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),gD=si&&si.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(si,"__esModule",{value:!0});si.GastRefResolverVisitor=si.resolveGrammar=void 0;var jne=Nr(),Gne=gD(Kt()),Une=gD(Zn()),Hne=_t();function Kne(t,e){var r=new vD(t,e);return r.resolveRefs(),r.errors}si.resolveGrammar=Kne;var vD=function(t){Fne(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,Gne.default)((0,Une.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:jne.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(Hne.GAstVisitor);si.GastRefResolverVisitor=vD});var RD=d((kRe,_D)=>{function Wne(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}_D.exports=Wne});var SD=d((wRe,AD)=>{var Bne=Ra();function Vne(t,e,r,n){return Bne(t,function(i,a,o){e(n,i,r(i),o)}),n}AD.exports=Vne});var PD=d((ERe,bD)=>{var zne=RD(),Yne=SD(),Xne=nn(),Jne=Le();function Qne(t,e){return function(r,n){var i=Jne(r)?zne:Yne,a=e?e():{};return i(r,t,Xne(n,2),a)}}bD.exports=Qne});var s_=d((NRe,CD)=>{var Zne=Wd(),eie=PD(),tie=Object.prototype,rie=tie.hasOwnProperty,nie=eie(function(t,e,r){rie.call(t,r)?t[r].push(e):Zne(t,r,[e])});CD.exports=nie});var Pp=d(($Re,kD)=>{var iie=ap(),aie=Ht();function oie(t,e){return iie(aie(t,e),1)}kD.exports=oie});var Cp=d((ORe,wD)=>{var sie=Yd(),uie=Us();function lie(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:uie(e),e=n-e,sie(t,0,e<0?0:e)):[]}wD.exports=lie});var Bl=d(lt=>{"use strict";var go=lt&&lt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),vo=lt&&lt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(lt,"__esModule",{value:!0});lt.nextPossibleTokensAfter=lt.possiblePathsFrom=lt.NextTerminalAfterAtLeastOneSepWalker=lt.NextTerminalAfterAtLeastOneWalker=lt.NextTerminalAfterManySepWalker=lt.NextTerminalAfterManyWalker=lt.AbstractNextTerminalAfterProductionWalker=lt.NextAfterTokenWalker=lt.AbstractNextPossibleTokensWalker=void 0;var ND=ip(),wp=vo(Ws()),kp=vo(qr()),ED=vo(Cp()),Tr=vo(Xd()),cie=vo(Ap()),fie=vo(Kt()),yo=vo(xi()),die=LT(),de=_t(),$D=function(t){go(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,yo.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,yo.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,kp.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(ND.RestWalker);lt.AbstractNextPossibleTokensWalker=$D;var pie=function(t){go(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,die.first)(o),this.found=!0}},e}($D);lt.NextAfterTokenWalker=pie;var Wl=function(t){go(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(ND.RestWalker);lt.AbstractNextTerminalAfterProductionWalker=Wl;var mie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,wp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(Wl);lt.NextTerminalAfterManyWalker=mie;var hie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,wp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(Wl);lt.NextTerminalAfterManySepWalker=hie;var yie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,wp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(Wl);lt.NextTerminalAfterAtLeastOneWalker=yie;var gie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,wp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(Wl);lt.NextTerminalAfterAtLeastOneSepWalker=gie;function OD(t,e,r){r===void 0&&(r=[]),r=(0,yo.default)(r);var n=[],i=0;function a(l){return l.concat((0,Tr.default)(t,i+1))}function o(l){var c=OD(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,fie.default)(s.definition,function(l){(0,kp.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,Tr.default)(t,i)}),n}lt.possiblePathsFrom=OD;function vie(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,kp.default)(f);){var y=f.pop();if(y===o){s&&(0,cie.default)(f).idx<=l&&f.pop();continue}var v=y.def,h=y.idx,A=y.ruleStack,w=y.occurrenceStack;if(!(0,kp.default)(v)){var C=v[0];if(C===i){var b={idx:h,def:(0,Tr.default)(v),ruleStack:(0,ED.default)(A),occurrenceStack:(0,ED.default)(w)};f.push(b)}else if(C instanceof de.Terminal)if(h<u-1){var S=h+1,O=e[S];if(r(O,C.terminalType)){var b={idx:S,def:(0,Tr.default)(v),ruleStack:A,occurrenceStack:w};f.push(b)}}else if(h===u-1)c.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:A,occurrenceStack:w}),s=!0;else throw Error("non exhaustive match");else if(C instanceof de.NonTerminal){var F=(0,yo.default)(A);F.push(C.nonTerminalName);var W=(0,yo.default)(w);W.push(C.idx);var b={idx:h,def:C.definition.concat(a,(0,Tr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(C instanceof de.Option){var te={idx:h,def:(0,Tr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var we={idx:h,def:C.definition.concat((0,Tr.default)(v)),ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.RepetitionMandatory){var Ee=new de.Repetition({definition:C.definition,idx:C.idx}),Qe=C.definition.concat([Ee],(0,Tr.default)(v)),b={idx:h,def:Qe,ruleStack:A,occurrenceStack:w};f.push(b)}else if(C instanceof de.RepetitionMandatoryWithSeparator){var V=new de.Terminal({terminalType:C.separator}),Ee=new de.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Qe=C.definition.concat([Ee],(0,Tr.default)(v)),b={idx:h,def:Qe,ruleStack:A,occurrenceStack:w};f.push(b)}else if(C instanceof de.RepetitionWithSeparator){var te={idx:h,def:(0,Tr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var V=new de.Terminal({terminalType:C.separator}),fe=new de.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Qe=C.definition.concat([fe],(0,Tr.default)(v)),we={idx:h,def:Qe,ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.Repetition){var te={idx:h,def:(0,Tr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var fe=new de.Repetition({definition:C.definition,idx:C.idx}),Qe=C.definition.concat([fe],(0,Tr.default)(v)),we={idx:h,def:Qe,ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.Alternation)for(var q=C.definition.length-1;q>=0;q--){var L=C.definition[q],j={idx:h,def:L.definition.concat((0,Tr.default)(v)),ruleStack:A,occurrenceStack:w};f.push(j),f.push(o)}else if(C instanceof de.Alternative)f.push({idx:h,def:C.definition.concat((0,Tr.default)(v)),ruleStack:A,occurrenceStack:w});else if(C instanceof de.Rule)f.push(Tie(C,h,A,w));else throw Error("non exhaustive match")}}return c}lt.nextPossibleTokensAfter=vie;function Tie(t,e,r,n){var i=(0,yo.default)(r);i.push(t.name);var a=(0,yo.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Js=d(Re=>{"use strict";var LD=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ro=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var l_=Ro(qr()),qD=Ro(In()),_o=Ro(Fl()),Ep=Ro(Ht()),To=Ro(Kt()),ID=Ro(Fr()),MD=Ro(Mi()),DD=Bl(),_ie=ip(),Np=mo(),ba=_t(),Rie=_t(),Nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(Nt=Re.PROD_TYPE||(Re.PROD_TYPE={}));function FD(t){if(t instanceof ba.Option||t==="Option")return Nt.OPTION;if(t instanceof ba.Repetition||t==="Repetition")return Nt.REPETITION;if(t instanceof ba.RepetitionMandatory||t==="RepetitionMandatory")return Nt.REPETITION_MANDATORY;if(t instanceof ba.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return Nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof ba.RepetitionWithSeparator||t==="RepetitionWithSeparator")return Nt.REPETITION_WITH_SEPARATOR;if(t instanceof ba.Alternation||t==="Alternation")return Nt.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=FD;function Aie(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=FD(n);return a===Nt.ALTERNATION?f_(e,r,i):d_(e,r,a,i)}Re.getLookaheadPaths=Aie;function Sie(t,e,r,n,i,a){var o=f_(t,e,r),s=p_(o)?Np.tokenStructuredMatcherNoCategories:Np.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=Sie;function bie(t,e,r,n,i,a){var o=d_(t,e,i,r),s=p_(o)?Np.tokenStructuredMatcherNoCategories:Np.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=bie;function Pie(t,e,r,n){var i=t.length,a=(0,_o.default)(t,function(u){return(0,_o.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,Ep.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],y=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var h=0;h<y;h++){for(var A=f[h],w=A.length,C=0;C<w;C++){var b=this.LA(C+1);if(r(b,A[C])===!1)continue e}return c}}};if(a&&!n){var o=(0,Ep.default)(t,function(u){return(0,qD.default)(u)}),s=(0,MD.default)(o,function(u,l,c){return(0,To.default)(l,function(f){(0,ID.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,To.default)(f.categoryMatches,function(y){(0,ID.default)(u,y)||(u[y]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var y=l[f],v=y.length,h=0;h<v;h++){var A=this.LA(h+1);if(r(A,y[h])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=Pie;function Cie(t,e,r){var n=(0,_o.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,qD.default)(t);if(a.length===1&&(0,l_.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,MD.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,To.default)(c.categoryMatches,function(y){l[y]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,y=0;y<f;y++){var v=this.LA(y+1);if(e(v,c[y])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=Cie;var kie=function(t){LD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,Nt.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(_ie.RestWalker),jD=function(t){LD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,Nt.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,Nt.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,Nt.ALTERNATION)},e}(Rie.GAstVisitor);function xD(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function u_(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function wie(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function c_(t,e){for(var r=(0,Ep.default)(t,function(c){return(0,DD.possiblePathsFrom)([c],1)}),n=xD(r.length),i=(0,Ep.default)(r,function(c){var f={};return(0,To.default)(c,function(y){var v=u_(y.partialPath);(0,To.default)(v,function(h){f[h]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=xD(s.length);for(var u=function(c){for(var f=s[c],y=0;y<f.length;y++){var v=f[y].partialPath,h=f[y].suffixDef,A=u_(v),w=wie(i,A,c);if(w||(0,l_.default)(h)||v.length===e){var C=n[c];if(GD(C,v)===!1){C.push(v);for(var b=0;b<A.length;b++){var S=A[b];i[c][S]=!0}}}else{var O=(0,DD.possiblePathsFrom)(h,o+1,v);a[c]=a[c].concat(O),(0,To.default)(O,function(F){var W=u_(F.partialPath);(0,To.default)(W,function(te){i[c][te]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=c_;function f_(t,e,r,n){var i=new jD(t,Nt.ALTERNATION,n);return e.accept(i),c_(i.result,r)}Re.getLookaheadPathsForOr=f_;function d_(t,e,r,n){var i=new jD(t,r);e.accept(i);var a=i.result,o=new kie(e,t,r),s=o.startWalking(),u=new ba.Alternative({definition:a}),l=new ba.Alternative({definition:s});return c_([u,l],n)}Re.getLookaheadPathsForOptionalProd=d_;function GD(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=GD;function Eie(t,e){return t.length<e.length&&(0,_o.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Eie;function p_(t){return(0,_o.default)(t,function(e){return(0,_o.default)(e,function(r){return(0,_o.default)(r,function(n){return(0,l_.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=p_});var Yl=d(ye=>{"use strict";var h_=ye&&ye.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),m_=ye&&ye.__assign||function(){return m_=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},m_.apply(this,arguments)},Wt=ye&&ye.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ye,"__esModule",{value:!0});ye.checkPrefixAlternativesAmbiguities=ye.validateSomeNonEmptyLookaheadPath=ye.validateTooManyAlts=ye.RepetitionCollector=ye.validateAmbiguousAlternationAlternatives=ye.validateEmptyOrAlternative=ye.getFirstNoneTerminal=ye.validateNoLeftRecursion=ye.validateRuleIsOverridden=ye.validateRuleDoesNotAlreadyExist=ye.OccurrenceValidationCollector=ye.identifyProductionForDuplicates=ye.validateGrammar=ye.validateLookahead=void 0;var UD=Wt(Ws()),$p=Wt(qr()),Nie=Wt(Xd()),HD=Wt(In()),$ie=Wt(Gl()),Oie=Wt(cp()),Iie=Wt(fp()),Pa=Wt(Ht()),zl=Wt(Kt()),Die=Wt(s_()),y_=Wt(Mi()),xie=Wt(PT()),Lie=Wt(Zn()),g_=Wt(qi()),Wi=Wt(Pp()),qie=Wt(xi()),Ln=Nr(),v_=_t(),Qs=Js(),Mie=Bl(),xn=_t(),T_=_t(),Fie=Wt(Cp()),jie=Wt(jl()),Gie=mo();function Uie(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,Pa.default)(e,function(r){return m_({type:Ln.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}ye.validateLookahead=Uie;function Hie(t,e,r,n){var i=(0,Wi.default)(t,function(u){return Kie(u,r)}),a=Xie(t,e,r),o=(0,Wi.default)(t,function(u){return XD(u,r)}),s=(0,Wi.default)(t,function(u){return VD(u,t,n,r)});return i.concat(a,o,s)}ye.validateGrammar=Hie;function Kie(t,e){var r=new BD;t.accept(r);var n=r.allProductions,i=(0,Die.default)(n,KD),a=(0,xie.default)(i,function(s){return s.length>1}),o=(0,Pa.default)((0,Lie.default)(a),function(s){var u=(0,UD.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,v_.getProductionDslName)(u),f={message:l,type:Ln.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},y=WD(u);return y&&(f.parameter=y),f});return o}function KD(t){return"".concat((0,v_.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(WD(t))}ye.identifyProductionForDuplicates=KD;function WD(t){return t instanceof xn.Terminal?t.terminalType.name:t instanceof xn.NonTerminal?t.nonTerminalName:""}var BD=function(t){h_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(T_.GAstVisitor);ye.OccurrenceValidationCollector=BD;function VD(t,e,r,n){var i=[],a=(0,y_.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:Ln.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}ye.validateRuleDoesNotAlreadyExist=VD;function Wie(t,e,r){var n=[],i;return(0,g_.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:Ln.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}ye.validateRuleIsOverridden=Wie;function zD(t,e,r,n){n===void 0&&(n=[]);var i=[],a=Vl(e.definition);if((0,$p.default)(a))return[];var o=t.name,s=(0,g_.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Ln.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Iie.default)(a,n.concat([t])),l=(0,Wi.default)(u,function(c){var f=(0,qie.default)(n);return f.push(c),zD(t,c,r,f)});return i.concat(l)}ye.validateNoLeftRecursion=zD;function Vl(t){var e=[];if((0,$p.default)(t))return e;var r=(0,UD.default)(t);if(r instanceof xn.NonTerminal)e.push(r.referencedRule);else if(r instanceof xn.Alternative||r instanceof xn.Option||r instanceof xn.RepetitionMandatory||r instanceof xn.RepetitionMandatoryWithSeparator||r instanceof xn.RepetitionWithSeparator||r instanceof xn.Repetition)e=e.concat(Vl(r.definition));else if(r instanceof xn.Alternation)e=(0,HD.default)((0,Pa.default)(r.definition,function(o){return Vl(o.definition)}));else if(!(r instanceof xn.Terminal))throw Error("non exhaustive match");var n=(0,v_.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Nie.default)(t);return e.concat(Vl(a))}else return e}ye.getFirstNoneTerminal=Vl;var __=function(t){h_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(T_.GAstVisitor);function Bie(t,e){var r=new __;t.accept(r);var n=r.alternations,i=(0,Wi.default)(n,function(a){var o=(0,Fie.default)(a.definition);return(0,Wi.default)(o,function(s,u){var l=(0,Mie.nextPossibleTokensAfter)([s],[],Gie.tokenStructuredMatcher,1);return(0,$p.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:Ln.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}ye.validateEmptyOrAlternative=Bie;function Vie(t,e,r){var n=new __;t.accept(n);var i=n.alternations;i=(0,Oie.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Wi.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,Qs.getLookaheadPathsForOr)(s,t,u,o),c=Yie(l,o,t,r),f=JD(l,o,t,r);return c.concat(f)});return a}ye.validateAmbiguousAlternationAlternatives=Vie;var YD=function(t){h_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(T_.GAstVisitor);ye.RepetitionCollector=YD;function XD(t,e){var r=new __;t.accept(r);var n=r.alternations,i=(0,Wi.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:Ln.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}ye.validateTooManyAlts=XD;function zie(t,e,r){var n=[];return(0,zl.default)(t,function(i){var a=new YD;i.accept(a);var o=a.allProductions;(0,zl.default)(o,function(s){var u=(0,Qs.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,Qs.getLookaheadPathsForOptionalProd)(c,i,u,l),y=f[0];if((0,$p.default)((0,HD.default)(y))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:Ln.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}ye.validateSomeNonEmptyLookaheadPath=zie;function Yie(t,e,r,n){var i=[],a=(0,y_.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,zl.default)(u,function(c){var f=[l];(0,zl.default)(t,function(y,v){l!==v&&(0,Qs.containsPath)(y,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,Qs.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,Pa.default)(a,function(s){var u=(0,Pa.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:Ln.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function JD(t,e,r,n){var i=(0,y_.default)(t,function(o,s,u){var l=(0,Pa.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,jie.default)((0,Wi.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,$ie.default)(i,function(y){return e.definition[y.idx].ignoreAmbiguities!==!0&&y.idx<u&&(0,Qs.isStrictPrefixOfPath)(y.path,l)}),f=(0,Pa.default)(c,function(y){var v=[y.idx+1,u+1],h=e.idx===0?"":e.idx,A=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:y.path});return{message:A,type:Ln.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:h,alternatives:v}});return f}));return a}ye.checkPrefixAlternativesAmbiguities=JD;function Xie(t,e,r){var n=[],i=(0,Pa.default)(e,function(a){return a.name});return(0,zl.default)(t,function(a){var o=a.name;if((0,g_.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:Ln.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var tx=d(Ca=>{"use strict";var QD=Ca&&Ca.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ca,"__esModule",{value:!0});Ca.validateGrammar=Ca.resolveGrammar=void 0;var Jie=QD(Kt()),ZD=QD(FT()),Qie=TD(),Zie=Yl(),ex=Xs();function eae(t){var e=(0,ZD.default)(t,{errMsgProvider:ex.defaultGrammarResolverErrorProvider}),r={};return(0,Jie.default)(t.rules,function(n){r[n.name]=n}),(0,Qie.resolveGrammar)(r,e.errMsgProvider)}Ca.resolveGrammar=eae;function tae(t){return t=(0,ZD.default)(t,{errMsgProvider:ex.defaultGrammarValidatorErrorProvider}),(0,Zie.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}Ca.validateGrammar=tae});var Zs=d(cr=>{"use strict";var Xl=cr&&cr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),rae=cr&&cr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cr,"__esModule",{value:!0});cr.EarlyExitException=cr.NotAllInputParsedException=cr.NoViableAltException=cr.MismatchedTokenException=cr.isRecognitionException=void 0;var nae=rae(qi()),rx="MismatchedTokenException",nx="NoViableAltException",ix="EarlyExitException",ax="NotAllInputParsedException",ox=[rx,nx,ix,ax];Object.freeze(ox);function iae(t){return(0,nae.default)(ox,t.name)}cr.isRecognitionException=iae;var Op=function(t){Xl(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),aae=function(t){Xl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=rx,a}return e}(Op);cr.MismatchedTokenException=aae;var oae=function(t){Xl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=nx,a}return e}(Op);cr.NoViableAltException=oae;var sae=function(t){Xl(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=ax,i}return e}(Op);cr.NotAllInputParsedException=sae;var uae=function(t){Xl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=ix,a}return e}(Op);cr.EarlyExitException=uae});var A_=d($t=>{"use strict";var lae=$t&&$t.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ka=$t&&$t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($t,"__esModule",{value:!0});$t.attemptInRepetitionRecovery=$t.Recoverable=$t.InRuleRecoveryException=$t.IN_RULE_RECOVERY_EXCEPTION=$t.EOF_FOLLOW_KEY=void 0;var Jl=ho(),cae=ka(qr()),sx=ka(Cp()),fae=ka(In()),R_=ka(Ht()),ux=ka(dp()),dae=ka(Fr()),pae=ka(qi()),mae=ka(xi()),hae=Zs(),yae=qT(),gae=Nr();$t.EOF_FOLLOW_KEY={};$t.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var lx=function(t){lae(e,t);function e(r){var n=t.call(this,r)||this;return n.name=$t.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);$t.InRuleRecoveryException=lx;var vae=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,dae.default)(e,"recoveryEnabled")?e.recoveryEnabled:gae.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=cx)},t.prototype.getTokenToInsert=function(e){var r=(0,Jl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),y=function(){var v=a.LA(0),h=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),A=new hae.MismatchedTokenException(h,c,a.LA(0));A.resyncedTokens=(0,sx.default)(u),a.SAVE_ERROR(A)};!l;)if(this.tokenMatcher(f,i)){y();return}else if(n.call(this)){y(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new lx("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,cae.default)(r))return!1;var i=this.LA(1),a=(0,ux.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,pae.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,ux.default)(e,function(a){var o=(0,Jl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return $t.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,R_.default)(r,function(i,a){return a===0?$t.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,R_.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,fae.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===$t.EOF_FOLLOW_KEY)return[Jl.EOF];var r=e.ruleName+e.idxInCallingRule+yae.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,Jl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,sx.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,mae.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,R_.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();$t.Recoverable=vae;function cx(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var y=u.token,v=u.occurrence,h=u.isEndOfRule;this.RULE_STACK.length===1&&h&&y===void 0&&(y=Jl.EOF,v=1),!(y===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(y,v,o)&&this.tryInRepetitionRecovery(t,e,r,y)}$t.attemptInRepetitionRecovery=cx});var Ip=d(ke=>{"use strict";Object.defineProperty(ke,"__esModule",{value:!0});ke.getKeyForAutomaticLookahead=ke.AT_LEAST_ONE_SEP_IDX=ke.MANY_SEP_IDX=ke.AT_LEAST_ONE_IDX=ke.MANY_IDX=ke.OPTION_IDX=ke.OR_IDX=ke.BITS_FOR_ALT_IDX=ke.BITS_FOR_RULE_IDX=ke.BITS_FOR_OCCURRENCE_IDX=ke.BITS_FOR_METHOD_TYPE=void 0;ke.BITS_FOR_METHOD_TYPE=4;ke.BITS_FOR_OCCURRENCE_IDX=8;ke.BITS_FOR_RULE_IDX=12;ke.BITS_FOR_ALT_IDX=8;ke.OR_IDX=1<<ke.BITS_FOR_OCCURRENCE_IDX;ke.OPTION_IDX=2<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_IDX=3<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_IDX=4<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_SEP_IDX=5<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_SEP_IDX=6<<ke.BITS_FOR_OCCURRENCE_IDX;function Tae(t,e,r){return r|e|t}ke.getKeyForAutomaticLookahead=Tae;var FRe=32-ke.BITS_FOR_ALT_IDX});var b_=d(wa=>{"use strict";var Dp=wa&&wa.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},fx=wa&&wa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wa,"__esModule",{value:!0});wa.LLkLookaheadStrategy=void 0;var S_=fx(Pp()),_ae=fx(qr()),xp=Xs(),Rae=Nr(),Lp=Yl(),Ql=Js(),Aae=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Rae.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,_ae.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=Dp(Dp(Dp(Dp([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,S_.default)(e,function(r){return(0,Lp.validateNoLeftRecursion)(r,r,xp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,S_.default)(e,function(r){return(0,Lp.validateEmptyOrAlternative)(r,xp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,S_.default)(e,function(n){return(0,Lp.validateAmbiguousAlternationAlternatives)(n,r,xp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,Lp.validateSomeNonEmptyLookaheadPath)(e,r,xp.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,Ql.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Ql.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,Ql.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,Ql.getProdType)(e.prodType),Ql.buildSingleAlternativeLookaheadFunction)},t}();wa.LLkLookaheadStrategy=Aae});var hx=d(ui=>{"use strict";var Sae=ui&&ui.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),px=ui&&ui.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ui,"__esModule",{value:!0});ui.collectMethods=ui.LooksAhead=void 0;var Ao=px(Kt()),P_=px(Fr()),dx=Nr(),Bi=Ip(),bae=_t(),eu=_t(),Pae=b_(),Cae=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,P_.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:dx.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,P_.default)(e,"maxLookahead")?e.maxLookahead:dx.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,P_.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new Pae.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Ao.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=mx(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Ao.default)(a,function(f){var y=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,eu.getProductionDslName)(f)).concat(y),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),h=(0,Bi.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Bi.OR_IDX,f.idx);r.setLaFuncCache(h,v)})}),(0,Ao.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Bi.MANY_IDX,"Repetition",f.maxLookahead,(0,eu.getProductionDslName)(f))}),(0,Ao.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Bi.OPTION_IDX,"Option",f.maxLookahead,(0,eu.getProductionDslName)(f))}),(0,Ao.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Bi.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,eu.getProductionDslName)(f))}),(0,Ao.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Bi.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,eu.getProductionDslName)(f))}),(0,Ao.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Bi.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,eu.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Bi.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Bi.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();ui.LooksAhead=Cae;var kae=function(t){Sae(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(bae.GAstVisitor),qp=new kae;function mx(t){qp.reset(),t.accept(qp);var e=qp.dslMethods;return qp.reset(),e}ui.collectMethods=mx});var yx=d(li=>{"use strict";Object.defineProperty(li,"__esModule",{value:!0});li.addNoneTerminalToCst=li.addTerminalToCst=li.setNodeLocationFull=li.setNodeLocationOnlyOffset=void 0;function wae(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}li.setNodeLocationOnlyOffset=wae;function Eae(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}li.setNodeLocationFull=Eae;function Nae(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}li.addTerminalToCst=Nae;function $ae(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}li.addNoneTerminalToCst=$ae});var gx=d(Mp=>{"use strict";Object.defineProperty(Mp,"__esModule",{value:!0});Mp.defineNameProp=void 0;var Oae="name";function Iae(t,e){Object.defineProperty(t,Oae,{enumerable:!1,configurable:!0,writable:!1,value:e})}Mp.defineNameProp=Iae});var bx=d(Zt=>{"use strict";var Vi=Zt&&Zt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zt,"__esModule",{value:!0});Zt.validateMissingCstMethods=Zt.validateVisitor=Zt.CstVisitorDefinitionError=Zt.createBaseVisitorConstructorWithDefaults=Zt.createBaseSemanticVisitorConstructor=Zt.defaultVisit=void 0;var Dae=Vi(qr()),xae=Vi(jl()),Lae=Vi(Le()),vx=Vi(Ht()),qae=Vi(Kt()),Mae=Vi(Gl()),Fae=Vi(Mr()),jae=Vi(bs()),Gae=Vi(co()),Tx=gx();function _x(t,e){for(var r=(0,Fae.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}Zt.defaultVisit=_x;function Uae(t,e){var r=function(){};(0,Tx.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,Lae.default)(i)&&(i=i[0]),!(0,Gae.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=Ax(this,e);if(!(0,Dae.default)(i)){var a=(0,vx.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Zt.createBaseSemanticVisitorConstructor=Uae;function Hae(t,e,r){var n=function(){};(0,Tx.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,qae.default)(e,function(a){i[a]=_x}),n.prototype=i,n.prototype.constructor=n,n}Zt.createBaseVisitorConstructorWithDefaults=Hae;var Rx;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Rx=Zt.CstVisitorDefinitionError||(Zt.CstVisitorDefinitionError={}));function Ax(t,e){var r=Sx(t,e);return r}Zt.validateVisitor=Ax;function Sx(t,e){var r=(0,Mae.default)(e,function(i){return(0,jae.default)(t[i])===!1}),n=(0,vx.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:Rx.MISSING_METHOD,methodName:i}});return(0,xae.default)(n)}Zt.validateMissingCstMethods=Sx});var wx=d(ru=>{"use strict";var Fp=ru&&ru.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ru,"__esModule",{value:!0});ru.TreeBuilder=void 0;var tu=yx(),_r=Fp(op()),Kae=Fp(Fr()),Px=Fp(Mr()),Cx=Fp(co()),kx=bx(),Wae=Nr(),Bae=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Kae.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:Wae.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=_r.default,this.cstFinallyStateUpdate=_r.default,this.cstPostTerminal=_r.default,this.cstPostNonTerminal=_r.default,this.cstPostRule=_r.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=tu.setNodeLocationFull,this.setNodeLocationFromNode=tu.setNodeLocationFull,this.cstPostRule=_r.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=_r.default,this.setNodeLocationFromNode=_r.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=tu.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=tu.setNodeLocationOnlyOffset,this.cstPostRule=_r.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=_r.default,this.setNodeLocationFromNode=_r.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=_r.default,this.setNodeLocationFromNode=_r.default,this.cstPostRule=_r.default,this.setInitialNodeLocation=_r.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,tu.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,tu.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,Cx.default)(this.baseCstVisitorConstructor)){var e=(0,kx.createBaseSemanticVisitorConstructor)(this.className,(0,Px.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,Cx.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,kx.createBaseVisitorConstructorWithDefaults)(this.className,(0,Px.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();ru.TreeBuilder=Bae});var Nx=d(jp=>{"use strict";Object.defineProperty(jp,"__esModule",{value:!0});jp.LexerAdapter=void 0;var Ex=Nr(),Vae=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Ex.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Ex.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();jp.LexerAdapter=Vae});var Ox=d(nu=>{"use strict";var $x=nu&&nu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(nu,"__esModule",{value:!0});nu.RecognizerApi=void 0;var zae=$x(Zn()),Yae=$x(qi()),Xae=Zs(),C_=Nr(),Jae=Xs(),Qae=Yl(),Zae=_t(),eoe=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=C_.DEFAULT_RULE_CONFIG),(0,Yae.default)(this.definedRulesNames,e)){var i=Jae.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:C_.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=C_.DEFAULT_RULE_CONFIG);var i=(0,Qae.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,Xae.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Zae.serializeGrammar)((0,zae.default)(this.gastProductionsCache))},t}();nu.RecognizerApi=eoe});var jx=d(au=>{"use strict";var ci=au&&au.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(au,"__esModule",{value:!0});au.RecognizerEngine=void 0;var Ix=ci(qr()),k_=ci(Le()),w_=ci(In()),Dx=ci(Fl()),toe=ci(sp()),roe=ci(Nn()),Zl=ci(Fr()),ec=ci(Zn()),xx=ci(Mi()),Lx=ci(xi()),Gr=Ip(),Gp=Zs(),qx=Js(),iu=Bl(),Mx=Nr(),noe=A_(),Fx=ho(),tc=mo(),ioe=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=tc.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Zl.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,k_.default)(e)){if((0,Ix.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,k_.default)(e))this.tokensMap=(0,xx.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Zl.default)(e,"modes")&&(0,Dx.default)((0,w_.default)((0,ec.default)(e.modes)),tc.isTokenType)){var n=(0,w_.default)((0,ec.default)(e.modes)),i=(0,toe.default)(n);this.tokensMap=(0,xx.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,roe.default)(e))this.tokensMap=(0,Lx.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Fx.EOF;var a=(0,Zl.default)(e,"modes")?(0,w_.default)((0,ec.default)(e.modes)):(0,ec.default)(e),o=(0,Dx.default)(a,function(s){return(0,Ix.default)(s.categoryMatches)});this.tokenMatcher=o?tc.tokenStructuredMatcherNoCategories:tc.tokenStructuredMatcher,(0,tc.augmentTokenTypes)((0,ec.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Zl.default)(n,"resyncEnabled")?n.resyncEnabled:Mx.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Zl.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:Mx.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<Gr.BITS_FOR_METHOD_TYPE+Gr.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var y=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(y),y}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(y){return this.invokeRuleCatch(y,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Gp.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,qx.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,Gr.AT_LEAST_ONE_IDX,e,iu.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,iu.NextTerminalAfterAtLeastOneSepWalker],u,Gr.AT_LEAST_ONE_SEP_IDX,e,iu.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,qx.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,Gr.MANY_IDX,e,iu.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,iu.NextTerminalAfterManySepWalker],u,Gr.MANY_SEP_IDX,e,iu.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,Gr.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(Gr.OR_IDX,r),i=(0,k_.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Gp.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Gp.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Gp.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===noe.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,Lx.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),Fx.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();au.RecognizerEngine=ioe});var Kx=d(ou=>{"use strict";var Hx=ou&&ou.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ou,"__esModule",{value:!0});ou.ErrorHandler=void 0;var E_=Zs(),aoe=Hx(Fr()),Gx=Hx(xi()),Ux=Js(),ooe=Nr(),soe=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,aoe.default)(e,"errorMessageProvider")?e.errorMessageProvider:ooe.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,E_.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,Gx.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,Gx.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,Ux.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new E_.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,Ux.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new E_.NoViableAltException(l,this.LA(1),u))},t}();ou.ErrorHandler=soe});var Vx=d(su=>{"use strict";var Bx=su&&su.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(su,"__esModule",{value:!0});su.ContentAssist=void 0;var Wx=Bl(),uoe=Bx(Ws()),loe=Bx(co()),coe=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,loe.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,Wx.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,uoe.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new Wx.NextAfterTokenWalker(i,e).startWalking();return a},t}();su.ContentAssist=coe});var rL=d(uu=>{"use strict";var lu=uu&&uu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(uu,"__esModule",{value:!0});uu.GastRecorder=void 0;var Up=lu(Ap()),foe=lu(Le()),doe=lu(tp()),poe=lu(Kt()),Jx=lu(bs()),nc=lu(Fr()),fi=_t(),moe=Ul(),Qx=mo(),Zx=ho(),hoe=Nr(),yoe=Ip(),Kp={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Kp);var zx=!0,Yx=Math.pow(2,yoe.BITS_FOR_OCCURRENCE_IDX)-1,eL=(0,Zx.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:moe.Lexer.NA});(0,Qx.augmentTokenTypes)([eL]);var tL=(0,Zx.createTokenInstance)(eL,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(tL);var goe={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},voe=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return hoe.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new fi.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return rc.call(this,fi.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){rc.call(this,fi.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){rc.call(this,fi.RepetitionMandatoryWithSeparator,r,e,zx)},t.prototype.manyInternalRecord=function(e,r){rc.call(this,fi.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){rc.call(this,fi.RepetitionWithSeparator,r,e,zx)},t.prototype.orInternalRecord=function(e,r){return Toe.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Hp(r),!e||(0,nc.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(Xx(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Up.default)(this.recordingProdStack),o=e.ruleName,s=new fi.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?goe:Kp},t.prototype.consumeInternalRecord=function(e,r,n){if(Hp(r),!(0,Qx.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(Xx(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Up.default)(this.recordingProdStack),o=new fi.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),tL},t}();uu.GastRecorder=voe;function rc(t,e,r,n){n===void 0&&(n=!1),Hp(r);var i=(0,Up.default)(this.recordingProdStack),a=(0,Jx.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,nc.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Kp}function Toe(t,e){var r=this;Hp(e);var n=(0,Up.default)(this.recordingProdStack),i=(0,foe.default)(t)===!1,a=i===!1?t:t.DEF,o=new fi.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,nc.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,doe.default)(a,function(u){return(0,Jx.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,poe.default)(a,function(u){var l=new fi.Alternative({definition:[]});o.definition.push(l),(0,nc.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,nc.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Kp}function Xx(t){return t===0?"":"".concat(t)}function Hp(t){if(t<0||t>Yx){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(Yx+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var nL=d(cu=>{"use strict";var _oe=cu&&cu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cu,"__esModule",{value:!0});cu.PerformanceTracer=void 0;var Roe=_oe(Fr()),Aoe=Gs(),Soe=Nr(),boe=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Roe.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Soe.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,Aoe.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();cu.PerformanceTracer=boe});var iL=d(Wp=>{"use strict";Object.defineProperty(Wp,"__esModule",{value:!0});Wp.applyMixins=void 0;function Poe(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Wp.applyMixins=Poe});var Nr=d(Ue=>{"use strict";var uL=Ue&&Ue.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),fu=Ue&&Ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ue,"__esModule",{value:!0});Ue.EmbeddedActionsParser=Ue.CstParser=Ue.Parser=Ue.EMPTY_ALT=Ue.ParserDefinitionErrorType=Ue.DEFAULT_RULE_CONFIG=Ue.DEFAULT_PARSER_CONFIG=Ue.END_OF_FILE=void 0;var N_=fu(qr()),Coe=fu(Ht()),koe=fu(Kt()),Ea=fu(Zn()),aL=fu(Fr()),lL=fu(xi()),woe=Gs(),Eoe=UI(),oL=ho(),cL=Xs(),sL=tx(),Noe=A_(),$oe=hx(),Ooe=wx(),Ioe=Nx(),Doe=Ox(),xoe=jx(),Loe=Kx(),qoe=Vx(),Moe=rL(),Foe=nL(),joe=iL(),Goe=Yl();Ue.END_OF_FILE=(0,oL.createTokenInstance)(oL.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Ue.END_OF_FILE);Ue.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:cL.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Ue.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var Uoe;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Uoe=Ue.ParserDefinitionErrorType||(Ue.ParserDefinitionErrorType={}));function Hoe(t){return t===void 0&&(t=void 0),function(){return t}}Ue.EMPTY_ALT=Hoe;var Bp=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,aL.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,aL.default)(r,"skipValidations")?r.skipValidations:Ue.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,woe.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,koe.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,sL.resolveGrammar)({rules:(0,Ea.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,N_.default)(i)&&e.skipValidations===!1){var a=(0,sL.validateGrammar)({rules:(0,Ea.default)(e.gastProductionsCache),tokenTypes:(0,Ea.default)(e.tokensMap),errMsgProvider:cL.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,Goe.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,Ea.default)(e.gastProductionsCache),tokenTypes:(0,Ea.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,N_.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Eoe.computeAllProdsFollows)((0,Ea.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,Ea.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,Ea.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,N_.default)(e.definitionErrors))throw r=(0,Coe.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Ue.Parser=Bp;(0,joe.applyMixins)(Bp,[Noe.Recoverable,$oe.LooksAhead,Ooe.TreeBuilder,Ioe.LexerAdapter,xoe.RecognizerEngine,Doe.RecognizerApi,Loe.ErrorHandler,qoe.ContentAssist,Moe.GastRecorder,Foe.PerformanceTracer]);var Koe=function(t){uL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,lL.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Bp);Ue.CstParser=Koe;var Woe=function(t){uL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,lL.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Bp);Ue.EmbeddedActionsParser=Woe});var dL=d(Na=>{"use strict";var Boe=Na&&Na.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),du=Na&&Na.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Na,"__esModule",{value:!0});Na.buildModel=void 0;var fL=_t(),ic=du(Ht()),Voe=du(In()),zoe=du(Zn()),Yoe=du(tp()),Xoe=du(s_()),Joe=du(ql());function Qoe(t){var e=new Zoe,r=(0,zoe.default)(t);return(0,ic.default)(r,function(n){return e.visitRule(n)})}Na.buildModel=Qoe;var Zoe=function(t){Boe(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,Xoe.default)(n,function(o){return o.propertyName}),a=(0,ic.default)(i,function(o,s){var u=!(0,Yoe.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,ic.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Vp(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Vp(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Vp(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Vp(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,ic.default)(this.visitEach(r),function(i){return(0,Joe.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,Voe.default)((0,ic.default)(r,function(i){return n.visit(i)}))},e}(fL.GAstVisitor);function Vp(t){return t instanceof fL.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var mL=d((nAe,pL)=>{var ese=Yd();function tse(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:ese(t,e,r)}pL.exports=tse});var $_=d((iAe,hL)=>{var rse="\\ud800-\\udfff",nse="\\u0300-\\u036f",ise="\\ufe20-\\ufe2f",ase="\\u20d0-\\u20ff",ose=nse+ise+ase,sse="\\ufe0e\\ufe0f",use="\\u200d",lse=RegExp("["+use+rse+ose+sse+"]");function cse(t){return lse.test(t)}hL.exports=cse});var gL=d((aAe,yL)=>{function fse(t){return t.split("")}yL.exports=fse});var PL=d((oAe,bL)=>{var vL="\\ud800-\\udfff",dse="\\u0300-\\u036f",pse="\\ufe20-\\ufe2f",mse="\\u20d0-\\u20ff",hse=dse+pse+mse,yse="\\ufe0e\\ufe0f",gse="["+vL+"]",O_="["+hse+"]",I_="\\ud83c[\\udffb-\\udfff]",vse="(?:"+O_+"|"+I_+")",TL="[^"+vL+"]",_L="(?:\\ud83c[\\udde6-\\uddff]){2}",RL="[\\ud800-\\udbff][\\udc00-\\udfff]",Tse="\\u200d",AL=vse+"?",SL="["+yse+"]?",_se="(?:"+Tse+"(?:"+[TL,_L,RL].join("|")+")"+SL+AL+")*",Rse=SL+AL+_se,Ase="(?:"+[TL+O_+"?",O_,_L,RL,gse].join("|")+")",Sse=RegExp(I_+"(?="+I_+")|"+Ase+Rse,"g");function bse(t){return t.match(Sse)||[]}bL.exports=bse});var kL=d((sAe,CL)=>{var Pse=gL(),Cse=$_(),kse=PL();function wse(t){return Cse(t)?kse(t):Pse(t)}CL.exports=wse});var EL=d((uAe,wL)=>{var Ese=mL(),Nse=$_(),$se=kL(),Ose=gT();function Ise(t){return function(e){e=Ose(e);var r=Nse(e)?$se(e):void 0,n=r?r[0]:e.charAt(0),i=r?Ese(r,1).join(""):e.slice(1);return n[t]()+i}}wL.exports=Ise});var $L=d((lAe,NL)=>{var Dse=EL(),xse=Dse("toUpperCase");NL.exports=xse});var xL=d(pu=>{"use strict";var mu=pu&&pu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pu,"__esModule",{value:!0});pu.genDts=void 0;var Lse=mu(In()),qse=mu(Le()),zp=mu(Ht()),Mse=mu(Mi()),Fse=mu(sp()),IL=mu($L());function jse(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,Lse.default)((0,zp.default)(t,function(n){return Gse(n)}))),e.includeVisitorInterface&&(r=r.concat(Wse(e.visitorInterfaceName,t))),r.join(`

`)+`
`}pu.genDts=jse;function Gse(t){var e=Use(t),r=Hse(t);return[e,r]}function Use(t){var e=DL(t.name),r=D_(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function Hse(t){var e=D_(t.name);return"export type ".concat(e,` = {
  `).concat((0,zp.default)(t.properties,function(r){return Kse(r)}).join(`
  `),`
};`)}function Kse(t){var e=Vse(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function Wse(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,zp.default)(e,function(r){return Bse(r)}).join(`
  `),`
}`)}function Bse(t){var e=D_(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function Vse(t){if((0,qse.default)(t)){var e=(0,Fse.default)((0,zp.default)(t,function(n){return OL(n)})),r=(0,Mse.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return OL(t)}function OL(t){return t.kind==="token"?"IToken":DL(t.name)}function DL(t){return(0,IL.default)(t)+"CstNode"}function D_(t){return(0,IL.default)(t)+"CstChildren"}});var LL=d(hu=>{"use strict";var Yp=hu&&hu.__assign||function(){return Yp=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Yp.apply(this,arguments)};Object.defineProperty(hu,"__esModule",{value:!0});hu.generateCstDts=void 0;var zse=dL(),Yse=xL(),Xse={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function Jse(t,e){var r=Yp(Yp({},Xse),e),n=(0,zse.buildModel)(t);return(0,Yse.genDts)(n,r)}hu.generateCstDts=Jse});var ML=d(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.createSyntaxDiagramsCode=void 0;var qL=Wv();function Qse(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(qL.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(qL.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`),y=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+f+y}Xp.createSyntaxDiagramsCode=Qse});var So=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var Zse=Wv();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return Zse.VERSION}});var Jp=Nr();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return Jp.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return Jp.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return Jp.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return Jp.EMPTY_ALT}});var FL=Ul();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return FL.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return FL.LexerDefinitionErrorType}});var yu=ho();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return yu.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return yu.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return yu.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return yu.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return yu.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return yu.tokenName}});var eue=Js();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return eue.getLookaheadPaths}});var tue=b_();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return tue.LLkLookaheadStrategy}});var rue=Xs();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return rue.defaultParserErrorProvider}});var ac=Zs();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return ac.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return ac.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return ac.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return ac.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return ac.NoViableAltException}});var nue=QT();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return nue.defaultLexerErrorProvider}});var di=_t();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return di.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return di.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return di.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return di.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return di.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return di.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return di.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return di.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return di.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return di.Terminal}});var x_=_t();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return x_.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return x_.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return x_.GAstVisitor}});var iue=LL();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return iue.generateCstDts}});function aue(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=aue;var oue=ML();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return oue.createSyntaxDiagramsCode}});var sue=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=sue});var WL=d(X=>{"use strict";var jL=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var GL=jL(Ht()),uue=jL(Gl()),$r=So();function sc(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=sc;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var gu=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=gu;var Qp=class extends gu{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=Qp;var Zp=class extends gu{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=Zp;var oc=class extends gu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=oc;function lue(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};cue(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=bo(e,i,i);a!==void 0&&Rue(e,i,a)}return e}X.createATN=lue;function cue(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=Bt(t,i,void 0,{type:X.ATN_RULE_START}),o=Bt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function UL(t,e,r){return r instanceof $r.Terminal?L_(t,e,r.terminalType,r):r instanceof $r.NonTerminal?_ue(t,e,r):r instanceof $r.Alternation?hue(t,e,r):r instanceof $r.Option?yue(t,e,r):r instanceof $r.Repetition?fue(t,e,r):r instanceof $r.RepetitionWithSeparator?due(t,e,r):r instanceof $r.RepetitionMandatory?pue(t,e,r):r instanceof $r.RepetitionMandatoryWithSeparator?mue(t,e,r):bo(t,e,r)}function fue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_STAR_BLOCK_START});$a(t,n);let i=vu(t,e,n,r,bo(t,e,r));return KL(t,e,r,i)}function due(t,e,r){let n=Bt(t,e,r,{type:X.ATN_STAR_BLOCK_START});$a(t,n);let i=vu(t,e,n,r,bo(t,e,r)),a=L_(t,e,r.separator,r);return KL(t,e,r,i,a)}function pue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});$a(t,n);let i=vu(t,e,n,r,bo(t,e,r));return HL(t,e,r,i)}function mue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});$a(t,n);let i=vu(t,e,n,r,bo(t,e,r)),a=L_(t,e,r.separator,r);return HL(t,e,r,i,a)}function hue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_BASIC});$a(t,n);let i=(0,GL.default)(r.definition,o=>UL(t,e,o));return vu(t,e,n,r,...i)}function yue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_BASIC});$a(t,n);let i=vu(t,e,n,r,bo(t,e,r));return gue(t,e,r,i)}function bo(t,e,r){let n=(0,uue.default)((0,GL.default)(r.definition,i=>UL(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Tue(t,n)}function HL(t,e,r,n,i){let a=n.left,o=n.right,s=Bt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});$a(t,s);let u=Bt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[sc(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,Ot(o,s),i===void 0?(Ot(s,a),Ot(s,u)):(Ot(s,u),Ot(s,i.left),Ot(i.right,a)),{left:a,right:u}}function KL(t,e,r,n,i){let a=n.left,o=n.right,s=Bt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});$a(t,s);let u=Bt(t,e,r,{type:X.ATN_LOOP_END}),l=Bt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,Ot(s,a),Ot(s,u),Ot(o,l),i!==void 0?(Ot(l,u),Ot(l,i.left),Ot(i.right,a)):Ot(l,s),t.decisionMap[sc(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function gue(t,e,r,n){let i=n.left,a=n.right;return Ot(i,a),t.decisionMap[sc(e,"Option",r.idx)]=i,n}function $a(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function vu(t,e,r,n,...i){let a=Bt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(Ot(r,s.left),Ot(s.right,a)):Ot(r,a);let o={left:r,right:a};return t.decisionMap[sc(e,vue(n),n.idx)]=r,o}function vue(t){if(t instanceof $r.Alternation)return"Alternation";if(t instanceof $r.Option)return"Option";if(t instanceof $r.Repetition)return"Repetition";if(t instanceof $r.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof $r.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof $r.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Tue(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof oc,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,Aue(t,o.right)):Ot(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function L_(t,e,r,n){let i=Bt(t,e,n,{type:X.ATN_BASIC}),a=Bt(t,e,n,{type:X.ATN_BASIC});return q_(i,new Qp(a,r)),{left:i,right:a}}function _ue(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=Bt(t,e,r,{type:X.ATN_BASIC}),o=Bt(t,e,r,{type:X.ATN_BASIC}),s=new oc(i,n,o);return q_(a,s),{left:a,right:o}}function Rue(t,e,r){let n=t.ruleToStartState.get(e);Ot(n,r.left);let i=t.ruleToStopState.get(e);return Ot(r.right,i),{left:n,right:i}}function Ot(t,e){let r=new Zp(e);q_(t,r)}function Bt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function q_(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Aue(t,e){t.states.splice(t.states.indexOf(e),1)}});var VL=d(pi=>{"use strict";var Sue=pi&&pi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pi,"__esModule",{value:!0});pi.getATNConfigKey=pi.ATNConfigSet=pi.DFA_ERROR=void 0;var bue=Sue(Ht());pi.DFA_ERROR={};var M_=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=BL(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,bue.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};pi.ATNConfigSet=M_;function BL(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}pi.getATNConfigKey=BL});var YL=d((yAe,zL)=>{var Pue=Ls();function Cue(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!Pue(o):r(o,s)))var s=o,u=a}return u}zL.exports=Cue});var JL=d((gAe,XL)=>{function kue(t,e){return t<e}XL.exports=kue});var ZL=d((vAe,QL)=>{var wue=YL(),Eue=JL(),Nue=lo();function $ue(t){return t&&t.length?wue(t,Nue,Eue):void 0}QL.exports=$ue});var tq=d((TAe,eq)=>{var Oue=nn(),Iue=IT();function Due(t,e){return t&&t.length?Iue(t,Oue(e,2)):[]}eq.exports=Due});var uq=d(Tu=>{"use strict";var Ia=Tu&&Tu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Tu,"__esModule",{value:!0});Tu.LLStarLookaheadStrategy=void 0;var Ur=So(),qn=WL(),Oa=VL(),xue=Ia(ZL()),Lue=Ia(Pp()),que=Ia(tq()),uc=Ia(Ht()),Mue=Ia(In()),F_=Ia(Kt()),Fue=Ia(qr()),rq=Ia(Mi());function jue(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var em=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},nq=new em,G_=class extends Ur.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,qn.createATN)(e.rules),this.dfas=Gue(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,qn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,uc.default)((0,Ur.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),y=>(0,uc.default)(y,v=>v[0]));if(iq(f,!1)&&!a){let y=(0,rq.default)(f,(v,h,A)=>((0,F_.default)(h,w=>{w&&(v[w.tokenTypeIdx]=A,(0,F_.default)(w.categoryMatches,C=>{v[C]=A}))}),v),{});return i?function(v){var h;let A=this.LA(1),w=y[A.tokenTypeIdx];if(v!==void 0&&w!==void 0){let C=(h=v[w])===null||h===void 0?void 0:h.GATE;if(C!==void 0&&C.call(this)===!1)return}return w}:function(){let v=this.LA(1);return y[v.tokenTypeIdx]}}else return i?function(y){let v=new em,h=y===void 0?0:y.length;for(let w=0;w<h;w++){let C=y?.[w].GATE;v.set(w,C===void 0||C.call(this))}let A=j_.call(this,o,c,v,s);return typeof A=="number"?A:void 0}:function(){let y=j_.call(this,o,c,nq,s);return typeof y=="number"?y:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,qn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,uc.default)((0,Ur.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),y=>(0,uc.default)(y,v=>v[0]));if(iq(f)&&f[0][0]&&!a){let y=f[0],v=(0,Mue.default)(y);if(v.length===1&&(0,Fue.default)(v[0].categoryMatches)){let A=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let h=(0,rq.default)(v,(A,w)=>(w!==void 0&&(A[w.tokenTypeIdx]=!0,(0,F_.default)(w.categoryMatches,C=>{A[C]=!0})),A),{});return function(){let A=this.LA(1);return h[A.tokenTypeIdx]===!0}}}return function(){let y=j_.call(this,o,c,nq,s);return typeof y=="object"?!1:y===0}}};Tu.LLStarLookaheadStrategy=G_;function iq(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function Gue(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=jue(t.decisionStates[n],n);return r}function j_(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=Que(i.atnStartState);a=sq(i,oq(s)),i.start=a}return Uue.apply(this,[i,a,r,n])}function Uue(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=zue(i,s);if(u===void 0&&(u=Hue.apply(this,[t,i,s,a,r,n])),u===Oa.DFA_ERROR)return Vue(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function Hue(t,e,r,n,i,a){let o=Yue(e.configs,r,i);if(o.size===0)return aq(t,e,r,Oa.DFA_ERROR),Oa.DFA_ERROR;let s=oq(o),u=Jue(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(rle(o)){let l=(0,xue.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,Kue.apply(this,[t,n,o.alts,a])}return s=aq(t,e,r,s),s}function Kue(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=Wue({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function Wue(t){let e=(0,uc.default)(t.prefixPath,i=>(0,Ur.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${Bue(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function Bue(t){if(t instanceof Ur.NonTerminal)return"SUBRULE";if(t instanceof Ur.Option)return"OPTION";if(t instanceof Ur.Alternation)return"OR";if(t instanceof Ur.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof Ur.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof Ur.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof Ur.Repetition)return"MANY";if(t instanceof Ur.Terminal)return"CONSUME";throw Error("non exhaustive match")}function Vue(t,e,r){let n=(0,Lue.default)(e.configs.elements,a=>a.state.transitions),i=(0,que.default)(n.filter(a=>a instanceof qn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function zue(t,e){return t.edges[e.tokenTypeIdx]}function Yue(t,e,r){let n=new Oa.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===qn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=Xue(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new Oa.ATNConfigSet;for(let o of n.elements)tm(o,a)}if(i.length>0&&!ele(a))for(let o of i)a.add(o);return a}function Xue(t,e){if(t instanceof qn.AtomTransition&&(0,Ur.tokenMatcher)(e,t.tokenType))return t.target}function Jue(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function oq(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function aq(t,e,r,n){return n=sq(t,n),e.edges[r.tokenTypeIdx]=n,n}function sq(t,e){if(e===Oa.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function Que(t){let e=new Oa.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};tm(a,e)}return e}function tm(t,e){let r=t.state;if(r.type===qn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};tm(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Zue(t,a);o!==void 0&&tm(o,e)}}function Zue(t,e){if(e instanceof qn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof qn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function ele(t){for(let e of t.elements)if(e.state.type===qn.ATN_RULE_STOP)return!0;return!1}function tle(t){for(let e of t.elements)if(e.state.type!==qn.ATN_RULE_STOP)return!1;return!0}function rle(t){if(tle(t))return!0;let e=nle(t.elements);return ile(e)&&!ale(e)}function nle(t){let e=new Map;for(let r of t){let n=(0,Oa.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function ile(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function ale(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var lq=d(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.LLStarLookaheadStrategy=void 0;var ole=uq();Object.defineProperty(rm,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return ole.LLStarLookaheadStrategy}})});var H_=d(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.RootCstNodeImpl=un.CompositeCstNodeImpl=un.LeafCstNodeImpl=un.AbstractCstNode=un.CstNodeBuilder=void 0;var cq=Ho(),sle=ir(),fq=qe(),U_=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new nm(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new fc;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new cc(e.startOffset,e.image.length,(0,fq.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new cc(r.startOffset,r.image.length,(0,fq.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,sle.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};un.CstNodeBuilder=U_;var lc=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};un.AbstractCstNode=lc;var cc=class extends lc{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};un.LeafCstNodeImpl=cc;var fc=class extends lc{constructor(){super(...arguments),this.children=new dc(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:cq.Position.create(0,0),end:cq.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};un.CompositeCstNodeImpl=fc;var dc=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,dc.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},nm=class extends fc{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};un.RootCstNodeImpl=nm});var sm=d(Rr=>{"use strict";Object.defineProperty(Rr,"__esModule",{value:!0});Rr.LangiumCompletionParser=Rr.LangiumParserErrorMessageProvider=Rr.LangiumParser=Rr.AbstractLangiumParser=Rr.DatatypeSymbol=void 0;var am=So(),ule=lq(),im=Ne(),dq=Gt(),pq=Se(),lle=H_();Rr.DatatypeSymbol=Symbol("Datatype");function K_(t){return t.$type===Rr.DatatypeSymbol}var mq="\u200B",hq=t=>t.endsWith(mq)?t:t+mq,pc=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new V_(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};Rr.AbstractLangiumParser=pc;var W_=class extends pc{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new lle.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,dq.isDataTypeRule)(e)?Rr.DatatypeSymbol:(0,dq.getTypeName)(e),i=this.wrapper.DEFINE_RULE(hq(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===Rr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,im.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(K_(u)){let l=i.image;(0,im.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(K_(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,pq.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),K_(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,pq.getContainerOfType)(e,im.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,im.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let a=e[n];a===void 0?e[n]=i:Array.isArray(a)&&Array.isArray(i)&&(i.push(...a),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};Rr.LangiumParser=W_;var om=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return am.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return am.defaultParserErrorProvider.buildEarlyExitMessage(e)}};Rr.LangiumParserErrorMessageProvider=om;var B_=class extends pc{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(hq(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};Rr.LangiumCompletionParser=B_;var cle={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new om},V_=class extends am.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},cle),{lookaheadStrategy:n?new am.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new ule.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var Y_=d(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.assertUnreachable=_u.ErrorWithLocation=void 0;var z_=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};_u.ErrorWithLocation=z_;function fle(t){throw new Error("Error! The input value was not handled.")}_u.assertUnreachable=fle});var J_=d(lm=>{"use strict";Object.defineProperty(lm,"__esModule",{value:!0});lm.createParser=void 0;var yq=So(),He=Ne(),mc=Y_(),dle=jt(),gq=Gt(),vq=Tt();function ple(t,e,r){return mle({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}lm.createParser=ple;function mle(t,e){let r=(0,vq.getAllReachableRules)(e,!1),n=(0,dle.stream)(e.rules).filter(He.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,Po(a,i.definition)))}}function Po(t,e,r=!1){let n;if((0,He.isKeyword)(e))n=Rle(t,e);else if((0,He.isAction)(e))n=hle(t,e);else if((0,He.isAssignment)(e))n=Po(t,e.terminal);else if((0,He.isCrossReference)(e))n=Tq(t,e);else if((0,He.isRuleCall)(e))n=yle(t,e);else if((0,He.isAlternatives)(e))n=vle(t,e);else if((0,He.isUnorderedGroup)(e))n=Tle(t,e);else if((0,He.isGroup)(e))n=_le(t,e);else throw new mc.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return _q(t,r?void 0:um(e),n,e.cardinality)}function hle(t,e){let r=(0,gq.getTypeName)(e);return()=>t.parser.action(r,e)}function yle(t,e){let r=e.rule.ref;if((0,He.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?gle(r,e.arguments):()=>({});return a=>t.parser.subrule(n,Rq(t,r),e,i(a))}else if((0,He.isTerminalRule)(r)){let n=t.consume++,i=X_(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,mc.assertUnreachable)(r);else throw new mc.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function gle(t,e){let r=e.map(n=>zi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function zi(t){if((0,He.isDisjunction)(t)){let e=zi(t.left),r=zi(t.right);return n=>e(n)||r(n)}else if((0,He.isConjunction)(t)){let e=zi(t.left),r=zi(t.right);return n=>e(n)&&r(n)}else if((0,He.isNegation)(t)){let e=zi(t.value);return r=>!e(r)}else if((0,He.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,He.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,mc.assertUnreachable)(t)}function vle(t,e){if(e.elements.length===1)return Po(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:Po(t,i,!0)},o=um(i);o&&(a.GATE=zi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Tle(t,e){if(e.elements.length===1)return Po(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:Po(t,s,!0)},l=um(s);l&&(u.GATE=zi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let h=f.unorderedGroups.get(v);typeof h?.[l]>"u"&&(h[l]=!0)}};let y=u.GATE;return y?c.GATE=()=>y(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=_q(t,um(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function _le(t,e){let r=e.elements.map(n=>Po(t,n));return n=>r.forEach(i=>i(n))}function um(t){if((0,He.isGroup)(t))return t.guardCondition}function Tq(t,e,r=e.terminal){if(r)if((0,He.isRuleCall)(r)&&(0,He.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Rq(t,r.rule.ref),e,i)}else if((0,He.isRuleCall)(r)&&(0,He.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=X_(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,He.isKeyword)(r)){let n=t.consume++,i=X_(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,vq.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,gq.getTypeName)(e.type.ref));return Tq(t,e,i)}}function Rle(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function _q(t,e,r,n){let i=e&&zi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,yq.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,yq.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,mc.assertUnreachable)(n)}function Rq(t,e){let r=Ale(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Ale(t,e){if((0,He.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,He.isParserRule)(n);)((0,He.isGroup)(n)||(0,He.isAlternatives)(n)||(0,He.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function X_(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var Q_=d(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.createCompletionParser=void 0;var Sle=sm(),ble=J_();function Ple(t){let e=t.Grammar,r=t.parser.Lexer,n=new Sle.LangiumCompletionParser(t);return(0,ble.createParser)(e,n,r.definition),n.finalize(),n}cm.createCompletionParser=Ple});var Z_=d(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.prepareLangiumParser=Ru.createLangiumParser=void 0;var Cle=sm(),kle=J_();function wle(t){let e=Aq(t);return e.finalize(),e}Ru.createLangiumParser=wle;function Aq(t){let e=t.Grammar,r=t.parser.Lexer,n=new Cle.LangiumParser(t);return(0,kle.createParser)(e,n,r.definition)}Ru.prepareLangiumParser=Aq});var rR=d(dm=>{"use strict";Object.defineProperty(dm,"__esModule",{value:!0});dm.DefaultTokenBuilder=void 0;var Ele=So(),eR=Ne(),Nle=Gt(),$le=Se(),Ole=Tt(),fm=to(),Ile=jt(),tR=class{buildTokens(e,r){let n=(0,Ile.stream)((0,Ole.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,fm.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(eR.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Nle.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,fm.isWhitespaceRegExp)(r)?Ele.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(eR.isParserRule).flatMap(i=>(0,$le.streamAllContents)(i).filter(eR.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,fm.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,fm.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};dm.DefaultTokenBuilder=tR});var iR=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.convertBoolean=It.convertNumber=It.convertDate=It.convertBigint=It.convertInt=It.convertID=It.convertRegexLiteral=It.convertString=It.DefaultValueConverter=void 0;var Sq=Ne(),Dle=Gt(),xle=Tt(),nR=class{convert(e,r){let n=r.feature;if((0,Sq.isCrossReference)(n)&&(n=(0,xle.getCrossReferenceTerminal)(n)),(0,Sq.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return kq(r);case"STRING":return bq(r);case"ID":return Cq(r);case"REGEXLITERAL":return Pq(r)}switch((i=(0,Dle.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Nq(r);case"boolean":return $q(r);case"bigint":return wq(r);case"date":return Eq(r);default:return r}}};It.DefaultValueConverter=nR;function bq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=Lle(i)}else e+=n}return e}It.convertString=bq;function Lle(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function Pq(t){return t.substring(1,t.length-1)}It.convertRegexLiteral=Pq;function Cq(t){return t.charAt(0)==="^"?t.substring(1):t}It.convertID=Cq;function kq(t){return parseInt(t)}It.convertInt=kq;function wq(t){return BigInt(t)}It.convertBigint=wq;function Eq(t){return new Date(t)}It.convertDate=Eq;function Nq(t){return Number(t)}It.convertNumber=Nq;function $q(t){return t.toLowerCase()==="true"}It.convertBoolean=$q});var sR=d(mm=>{"use strict";Object.defineProperty(mm,"__esModule",{value:!0});mm.DefaultLinker=void 0;var qle=xe(),Au=ir(),pm=Se(),Mle=Cr(),aR=ga(),oR=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=qle.CancellationToken.None){for(let n of(0,pm.streamAst)(e.parseResult.value))await(0,Mle.interruptAndCheck)(r),(0,pm.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=aR.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Au.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Au.isAstNode)(this._ref))return this._ref;if((0,Au.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,pm.getDocument)(e).state<aR.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Au.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Au.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Au.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,pm.getDocument)(e.container);n.state<aR.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};mm.DefaultLinker=oR});var lR=d(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.DefaultJsonSerializer=void 0;var hc=ir(),Fle=Se(),jle=Tt();function Oq(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var uR=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r?.replacer,i=(o,s)=>this.replacer(o,s,r),a=n?(o,s)=>n(o,s,i):i;return JSON.stringify(e,a,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:a}={}){var o,s,u;if(!this.ignoreProperties.has(e))if((0,hc.isReference)(r)){let l=r.ref,c=n?r.$refText:void 0;return l?{$refText:c,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:c,$error:(s=(o=r.error)===null||o===void 0?void 0:o.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let l;if(a&&(0,hc.isAstNode)(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=(0,Fle.getDocument)(r).uri.toString()}catch{}return i&&!e&&(0,hc.isAstNode)(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(a=>!a.startsWith("$")).forEach(a=>{let o=(0,jle.findNodesForProperty)(e.$cstNode,a).map(r);o.length!==0&&(i[a]=o)}),e}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];Oq(c)?u[l]=this.reviveReference(e,s,r,c):(0,hc.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else Oq(u)?e[s]=this.reviveReference(e,s,r,u):(0,hc.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};hm.DefaultJsonSerializer=uR});var fR=d(ym=>{"use strict";Object.defineProperty(ym,"__esModule",{value:!0});ym.DefaultServiceRegistry=void 0;var Gle=Pn(),cR=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Gle.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};ym.DefaultServiceRegistry=cR});var pR=d(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.ValidationRegistry=void 0;var Ule=Cn(),Hle=Cr(),dR=class{constructor(e){this.validationChecks=new Ule.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,Hle.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};gm.ValidationRegistry=dR});var gR=d(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.DefaultReferenceDescriptionProvider=Su.DefaultAstNodeDescriptionProvider=void 0;var Kle=xe(),Wle=ir(),vm=Se(),mR=qe(),Ble=Cr(),Vle=$i(),hR=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,vm.getDocument)(e)){var i;r??(r=this.nameProvider.getName(e));let a=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${a} has no name.`);let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,mR.toDocumentSegment)(o),selectionSegment:(0,mR.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:a}}};Su.DefaultAstNodeDescriptionProvider=hR;var yR=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Kle.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,vm.streamAst)(i))await(0,Ble.interruptAndCheck)(r),(0,vm.streamReferences)(a).filter(o=>!(0,Wle.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,vm.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,mR.toDocumentSegment)(n),local:(0,Vle.equalURI)(r.documentUri,i)}}};Su.DefaultReferenceDescriptionProvider=yR});var TR=d(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.DefaultAstNodeLocator=void 0;var vR=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Tm.DefaultAstNodeLocator=vR});var RR=d(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.DefaultConfigurationProvider=void 0;var zle=bt(),_R=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(zle.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};_m.DefaultConfigurationProvider=_R});var bR=d(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.DefaultDocumentBuilder=void 0;var Rm=xe(),Yle=Cn(),AR=Cr(),mi=ga(),SR=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Yle.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Rm.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Rm.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,AR.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Rm.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,mi.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<mi.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,mi.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,mi.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,mi.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,mi.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,mi.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,mi.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,AR.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Rm.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,AR.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=mi.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=mi.DocumentState.Validated}};Am.DefaultDocumentBuilder=SR});var wR=d(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.DefaultIndexManager=void 0;var Iq=xe(),Xle=Se(),PR=jt(),CR=$i(),Dq=ga(),kR=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,Xle.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,CR.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,PR.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,PR.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,PR.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Iq.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Dq.DocumentState.IndexedContent}async updateReferences(e,r=Iq.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Dq.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,CR.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,CR.equalURI)(o.targetUri,n)):!1}};Sm.DefaultIndexManager=kR});var $R=d(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.DefaultWorkspaceManager=void 0;var Jle=xe(),ER=Pn(),Qle=Cr(),NR=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Jle.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,Qle.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return ER.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=ER.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=ER.Utils.extname(r.uri);return n.includes(a)}return!1}};bm.DefaultWorkspaceManager=NR});var xR=d(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.isTokenTypeDictionary=hi.isIMultiModeLexerDefinition=hi.isTokenTypeArray=hi.DefaultLexer=void 0;var Zle=So(),OR=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=IR(r)?Object.values(r):r;this.chevrotainLexer=new Zle.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(IR(e))return e;let r=DR(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};hi.DefaultLexer=OR;function xq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}hi.isTokenTypeArray=xq;function DR(t){return t&&"modes"in t&&"defaultMode"in t}hi.isIMultiModeLexerDefinition=DR;function IR(t){return!xq(t)&&!DR(t)}hi.isTokenTypeDictionary=IR});var FR=d(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isJSDoc=bu.parseJSDoc=void 0;var Ie=xe(),ece=Pn(),tce=Rf(),rce=to();function nce(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Ie.Position.create(0,0));let a=Mq(t),o=MR(n),s=oce({lines:a,position:i,options:o});return fce({index:0,tokens:s,position:i})}bu.parseJSDoc=nce;function ice(t,e){let r=MR(e),n=Mq(t);if(n.length===0)return!1;let i=n[0],a=n[n.length-1],o=r.start,s=r.end;return Boolean(o?.exec(i))&&Boolean(s?.exec(a))}bu.isJSDoc=ice;function Mq(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(tce.NEWLINE_REGEXP)}var Lq=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,ace=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function oce(t){var e,r,n;let i=[],a=t.position.line,o=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,l=s===t.lines.length-1,c=t.lines[s],f=0;if(u&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);v&&(f=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);v&&(f=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);v&&(c=c.substring(0,v.index))}if(c=c.substring(0,cce(c)),qR(c,0)>=c.length){if(i.length>0){let v=Ie.Position.create(a,o);i.push({type:"break",content:"",range:Ie.Range.create(v,v)})}}else{Lq.lastIndex=f;let v=Lq.exec(c);if(v){let h=v[0],A=v[1],w=Ie.Position.create(a,o+f),C=Ie.Position.create(a,o+f+h.length);i.push({type:"tag",content:A,range:Ie.Range.create(w,C)}),f+=h.length,f=qR(c,f)}if(f<c.length){let h=c.substring(f),A=Array.from(h.matchAll(ace));i.push(...sce(A,h,a,o+f))}}a++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function sce(t,e,r,n){let i=[];if(t.length===0){let a=Ie.Position.create(r,n),o=Ie.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Ie.Range.create(a,o)})}else{let a=0;for(let s of t){let u=s.index,l=e.substring(a,u);l.length>0&&i.push({type:"text",content:e.substring(a,u),range:Ie.Range.create(Ie.Position.create(r,a+n),Ie.Position.create(r,u+n))});let c=l.length+1,f=s[1];if(i.push({type:"inline-tag",content:f,range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+f.length+n))}),c+=f.length,s.length===4){c+=s[2].length;let y=s[3];i.push({type:"text",content:y,range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+y.length+n))})}else i.push({type:"text",content:"",range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+n))});a=u+s[0].length}let o=e.substring(a);o.length>0&&i.push({type:"text",content:o,range:Ie.Range.create(Ie.Position.create(r,a+n),Ie.Position.create(r,a+n+o.length))})}return i}var uce=/\S/,lce=/\s*$/;function qR(t,e){let r=t.substring(e).match(uce);return r?e+r.index:t.length}function cce(t){let e=t.match(lce);if(e&&typeof e.index=="number")return e.index}function fce(t){var e,r,n,i;let a=Ie.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Pm([],Ie.Range.create(a,a));let o=[];for(;t.index<t.tokens.length;){let l=dce(t,o[o.length-1]);l&&o.push(l)}let s=(r=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:a,u=(i=(n=o[o.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:a;return new Pm(o,Ie.Range.create(s,u))}function dce(t,e){let r=t.tokens[t.index];if(r.type==="tag")return jq(t,!1);if(r.type==="text"||r.type==="inline-tag")return Fq(t);pce(r,e),t.index++}function pce(t,e){if(e){let r=new Cm("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function Fq(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(mce(t)),n=e,e=t.tokens[t.index];return new gc(i,Ie.Range.create(r.range.start,n.range.end))}function mce(t){return t.tokens[t.index].type==="inline-tag"?jq(t,!0):Gq(t)}function jq(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let a=Gq(t);return new yc(n,new gc([a],a.range),e,Ie.Range.create(r.range.start,a.range.end))}else{let a=Fq(t);return new yc(n,a,e,Ie.Range.create(r.range.start,a.range.end))}else{let a=r.range;return new yc(n,new gc([],a),e,a)}}function Gq(t){let e=t.tokens[t.index++];return new Cm(e.content,e.range)}function MR(t){if(!t)return MR({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:LR(e,!0),end:LR(r,!1),line:LR(n,!0)}}function LR(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,rce.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Pm=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=qq(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=qq(r)+i}return r.trim()}},yc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let a=hce(this.name,r,e??{});if(typeof a=="string")return a}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function hce(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let a=e.indexOf(" "),o=e;if(a>0){let u=qR(e,a);o=e.substring(u),e=e.substring(0,a)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(o=`\`${o}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,o))!==null&&i!==void 0?i:yce(e,o)}}function yce(t,e){try{return ece.URI.parse(t,!0),`[${e}](${t})`}catch{return t}}var gc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],a=this.inlines[n+1];r+=i.toMarkdown(e),a&&a.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Cm=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function qq(t){return t.endsWith(`
`)?`
`:`

`}});var Hq=d(km=>{"use strict";Object.defineProperty(km,"__esModule",{value:!0});km.JSDocDocumentationProvider=void 0;var gce=ir(),vce=Se(),Tce=qe(),Uq=FR(),jR=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,Tce.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,gce.isLeafCstNode)(r)&&(0,Uq.isJSDoc)(r))return(0,Uq.parseJSDoc)(r).toMarkdown({renderLink:(i,a)=>this.documentationLinkRenderer(e,i,a)})}documentationLinkRenderer(e,r,n){var i;let a=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(a&&a.nameSegment){let o=a.nameSegment.range.start.line+1,s=a.nameSegment.range.start.character+1,u=a.documentUri.with({fragment:`L${o},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,vce.getDocument)(e).precomputedScopes;if(!i)return;let a=e;do{let s=i.get(a).find(u=>u.name===r);if(s)return s;a=a.$container}while(a)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};km.JSDocDocumentationProvider=jR});var GR=d(Da=>{"use strict";var _ce=Da&&Da.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Kq=Da&&Da.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&_ce(e,t,r)};Object.defineProperty(Da,"__esModule",{value:!0});Kq(Hq(),Da);Kq(FR(),Da)});var Cd=d(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.createDefaultSharedModule=Pu.createDefaultModule=void 0;var Rce=xe(),Ace=ky(),Sce=Kv(),bce=Q_(),Pce=ud(),Cce=fv(),kce=pv(),wce=Vf(),Ece=lv(),Nce=yv(),$ce=Pv(),Oce=kv(),Ice=Ev(),Dce=Z_(),xce=rR(),Lce=iR(),qce=sR(),Mce=ss(),Fce=nd(),jce=jf(),Gce=Uf(),Uce=lR(),Hce=fR(),Kce=Cr(),Wce=Wf(),Bce=pR(),Wq=gR(),Vce=TR(),zce=RR(),Yce=bR(),Bq=ga(),Xce=wR(),Jce=$R(),Qce=xR(),Zce=GR();function efe(t){return{documentation:{DocumentationProvider:e=>new Zce.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,Sce.createGrammarConfig)(e),LangiumParser:e=>(0,Dce.createLangiumParser)(e),CompletionParser:e=>(0,bce.createCompletionParser)(e),ValueConverter:()=>new Lce.DefaultValueConverter,TokenBuilder:()=>new xce.DefaultTokenBuilder,Lexer:e=>new Qce.DefaultLexer(e)},lsp:{CompletionProvider:e=>new Pce.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new kce.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Nce.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new wce.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new Oce.DefaultReferencesProvider(e),DefinitionProvider:e=>new Ece.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new Cce.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new Ice.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Vce.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new Wq.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new Wq.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new qce.DefaultLinker(e),NameProvider:()=>new Mce.DefaultNameProvider,ScopeProvider:e=>new Gce.DefaultScopeProvider(e),ScopeComputation:e=>new jce.DefaultScopeComputation(e),References:e=>new Fce.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Uce.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new Wce.DefaultDocumentValidator(e),ValidationRegistry:e=>new Bce.ValidationRegistry(e)},shared:()=>t.shared}}Pu.createDefaultModule=efe;function tfe(t){return{ServiceRegistry:()=>new Hce.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new $ce.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new Bq.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new Bq.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Yce.DefaultDocumentBuilder(e),TextDocuments:()=>new Rce.TextDocuments(Ace.TextDocument),IndexManager:e=>new Xce.DefaultIndexManager(e),WorkspaceManager:e=>new Jce.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Kce.MutexLock,ConfigurationProvider:e=>new zce.DefaultConfigurationProvider(e)}}}Pu.createDefaultSharedModule=tfe});var zq=d(Vq=>{"use strict";Object.defineProperty(Vq,"__esModule",{value:!0})});var Jq=d(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.joinTracedToNodeIf=xa.joinTracedToNode=xa.joinToNode=void 0;var UR=Ya();function Yq(t,e=String,{filter:r,prefix:n,suffix:i,separator:a,appendNewLineIfNotEmpty:o}={}){return nfe(t,(s,u,l,c)=>{if(r&&!r(u,l,c))return s;let f=e(u,l,c);return(s??(s=new UR.CompositeGeneratorNode)).append(n&&n(u,l,c)).append(f).append(i&&i(u,l,c)).appendIf(!c&&f!==void 0,a).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!o)})}xa.joinToNode=Yq;function Xq(t,e){return(r,n=String,i)=>(0,UR.traceToNode)(t,e)(Yq(r,t&&e?(a,o,s)=>(0,UR.traceToNode)(t,e,o)(n(a,o,s)):n,i))}xa.joinTracedToNode=Xq;function rfe(t,e,r){return t?Xq(typeof e=="function"?e():e,r):()=>{}}xa.joinTracedToNodeIf=rfe;function nfe(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var Qq=d(Ar=>{"use strict";var ife=Ar&&Ar.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),HR=Ar&&Ar.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ife(e,t,r)};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.normalizeEOL=Ar.expandToStringWithNL=Ar.expandToString=void 0;HR(Ya(),Ar);HR(Jq(),Ar);HR(Uy(),Ar);var KR=Rf();Object.defineProperty(Ar,"expandToString",{enumerable:!0,get:function(){return KR.expandToString}});Object.defineProperty(Ar,"expandToStringWithNL",{enumerable:!0,get:function(){return KR.expandToStringWithNL}});Object.defineProperty(Ar,"normalizeEOL",{enumerable:!0,get:function(){return KR.normalizeEOL}})});var eM=d(Zq=>{"use strict";Object.defineProperty(Zq,"__esModule",{value:!0})});var tM=d(yi=>{"use strict";var afe=yi&&yi.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),wm=yi&&yi.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&afe(e,t,r)};Object.defineProperty(yi,"__esModule",{value:!0});wm(_g(),yi);wm(Kv(),yi);wm(Fv(),yi);wm(eM(),yi)});var nM=d(rM=>{"use strict";Object.defineProperty(rM,"__esModule",{value:!0})});var iM=d(Or=>{"use strict";var ofe=Or&&Or.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),La=Or&&Or.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ofe(e,t,r)};Object.defineProperty(Or,"__esModule",{value:!0});La(Q_(),Or);La(H_(),Or);La(Z_(),Or);La(sm(),Or);La(xR(),Or);La(nM(),Or);La(rR(),Or);La(iR(),Or)});var aM=d(Mn=>{"use strict";var sfe=Mn&&Mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),vc=Mn&&Mn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&sfe(e,t,r)};Object.defineProperty(Mn,"__esModule",{value:!0});vc(sR(),Mn);vc(ss(),Mn);vc(nd(),Mn);vc(jf(),Mn);vc(Uf(),Mn)});var oM=d(Co=>{"use strict";var ufe=Co&&Co.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),lfe=Co&&Co.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ufe(e,t,r)};Object.defineProperty(Co,"__esModule",{value:!0});lfe(lR(),Co)});var sM=d(Sr=>{"use strict";var cfe=Sr&&Sr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Yi=Sr&&Sr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&cfe(e,t,r)};Object.defineProperty(Sr,"__esModule",{value:!0});Yi(Se(),Sr);Yi(Cn(),Sr);Yi(qe(),Sr);Yi(Y_(),Sr);Yi(Tt(),Sr);Yi(Cr(),Sr);Yi(to(),Sr);Yi(jt(),Sr);Yi($i(),Sr)});var lM=d(qa=>{"use strict";var ffe=qa&&qa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),uM=qa&&qa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ffe(e,t,r)};Object.defineProperty(qa,"__esModule",{value:!0});uM(Wf(),qa);uM(pR(),qa)});var cM=d(Ir=>{"use strict";var dfe=Ir&&Ir.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ma=Ir&&Ir.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&dfe(e,t,r)};Object.defineProperty(Ir,"__esModule",{value:!0});Ma(gR(),Ir);Ma(TR(),Ir);Ma(RR(),Ir);Ma(bR(),Ir);Ma(ga(),Ir);Ma(jv(),Ir);Ma(wR(),Ir);Ma($R(),Ir)});var ko=d(Ke=>{"use strict";var fM=Ke&&Ke.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pfe=Ke&&Ke.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),br=Ke&&Ke.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&fM(e,t,r)},mfe=Ke&&Ke.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&fM(e,t,r);return pfe(e,t),e};Object.defineProperty(Ke,"__esModule",{value:!0});Ke.GrammarAST=void 0;br(Cd(),Ke);br(rl(),Ke);br(fR(),Ke);br(zq(),Ke);br(ir(),Ke);br(GR(),Ke);br(Qq(),Ke);br(tM(),Ke);br($v(),Ke);br(iM(),Ke);br(aM(),Ke);br(oM(),Ke);br(sM(),Ke);br(lM(),Ke);br(cM(),Ke);var hfe=mfe(Ne());Ke.GrammarAST=hfe});var pM=d((i0e,dM)=>{"use strict";dM.exports=xe()});var Nm=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTDoubleRange=p.ASTDoubleRange=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=p.isASTDeclaration=p.ASTDeclaration=p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlterAndTrajectory=p.ASTAlterAndTrajectory=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTInstruction=p.ASTInstruction=void 0;p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRange=p.ASTRange=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParameter=p.ASTParameter=p.isASTOffsetList=p.ASTOffsetList=p.isASTList=p.ASTList=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTTrajectory=p.ASTTrajectory=p.isASTAlter=p.ASTAlter=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=void 0;var yfe=ko();p.ASTInstruction="ASTInstruction";function gfe(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=gfe;p.ASTNumber="ASTNumber";function vfe(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=vfe;p.ASTNumberOffset="ASTNumberOffset";function Tfe(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=Tfe;p.ASTReplayTarget="ASTReplayTarget";function _fe(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=_fe;p.ASTTarget="ASTTarget";function Rfe(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=Rfe;p.ASTTimeScope="ASTTimeScope";function Afe(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=Afe;p.ASTValue="ASTValue";function Sfe(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=Sfe;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function bfe(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=bfe;p.ASTAllPlanes="ASTAllPlanes";function Pfe(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=Pfe;p.ASTAlterAndTrajectory="ASTAlterAndTrajectory";function Cfe(t){return p.reflection.isInstance(t,p.ASTAlterAndTrajectory)}p.isASTAlterAndTrajectory=Cfe;p.ASTAlterSpeed="ASTAlterSpeed";function kfe(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=kfe;p.ASTAssertion="ASTAssertion";function wfe(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=wfe;p.ASTAssertions="ASTAssertions";function Efe(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=Efe;p.ASTAt="ASTAt";function Nfe(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=Nfe;p.ASTAtFor="ASTAtFor";function $fe(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=$fe;p.ASTConstantValue="ASTConstantValue";function Ofe(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=Ofe;p.ASTCreate="ASTCreate";function Ife(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=Ife;p.ASTCreationParameter="ASTCreationParameter";function Dfe(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=Dfe;p.ASTCreationParameters="ASTCreationParameters";function xfe(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=xfe;p.ASTCreationParameterType="ASTCreationParameterType";function Lfe(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=Lfe;p.ASTCut="ASTCut";function qfe(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=qfe;p.ASTDeclaration="ASTDeclaration";function Mfe(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=Mfe;p.ASTDelay="ASTDelay";function Ffe(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=Ffe;p.ASTDelayParameter="ASTDelayParameter";function jfe(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=jfe;p.ASTDoubleRange="ASTDoubleRange";function Gfe(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=Gfe;p.ASTDoubleValue="ASTDoubleValue";function Ufe(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=Ufe;p.ASTFilters="ASTFilters";function Hfe(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=Hfe;p.ASTHide="ASTHide";function Kfe(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=Kfe;p.ASTHideParameter="ASTHideParameter";function Wfe(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Wfe;p.ASTIntegerRange="ASTIntegerRange";function Bfe(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=Bfe;p.ASTIntegerValue="ASTIntegerValue";function Vfe(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=Vfe;p.ASTLeftShift="ASTLeftShift";function zfe(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=zfe;p.ASTList="ASTList";function Yfe(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=Yfe;p.ASTOffsetList="ASTOffsetList";function Xfe(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=Xfe;p.ASTParameter="ASTParameter";function Jfe(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=Jfe;p.ASTParameters="ASTParameters";function Qfe(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=Qfe;p.ASTParameterType="ASTParameterType";function Zfe(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Zfe;p.ASTPlane="ASTPlane";function ede(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=ede;p.ASTPlaneFrom="ASTPlaneFrom";function tde(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=tde;p.ASTRange="ASTRange";function rde(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=rde;p.ASTRecordingParameterType="ASTRecordingParameterType";function nde(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=nde;p.ASTRecordingValue="ASTRecordingValue";function ide(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=ide;p.ASTReplay="ASTReplay";function ade(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=ade;p.ASTRightShift="ASTRightShift";function ode(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=ode;p.ASTRotate="ASTRotate";function sde(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=sde;p.ASTRotateParameter="ASTRotateParameter";function ude(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=ude;p.ASTSaturate="ASTSaturate";function lde(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=lde;p.ASTSaturationParameter="ASTSaturationParameter";function cde(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=cde;p.ASTSaturationParameters="ASTSaturationParameters";function fde(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=fde;p.ASTSaturationParameterType="ASTSaturationParameterType";function dde(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=dde;p.ASTScenario="ASTScenario";function pde(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=pde;p.ASTSpeedParameter="ASTSpeedParameter";function mde(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=mde;p.ASTSpeedParameters="ASTSpeedParameters";function hde(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=hde;p.ASTSpeedParameterType="ASTSpeedParameterType";function yde(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=yde;p.ASTStringList="ASTStringList";function gde(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=gde;p.ASTStringValue="ASTStringValue";function vde(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=vde;p.ASTTime="ASTTime";function Tde(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=Tde;p.ASTTrigger="ASTTrigger";function _de(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=_de;p.ASTVariableValue="ASTVariableValue";function Rde(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=Rde;p.ASTWayPoint="ASTWayPoint";function Ade(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=Ade;p.ASTWayPoints="ASTWayPoints";function Sde(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=Sde;p.ASTWindow="ASTWindow";function bde(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=bde;p.ASTAlter="ASTAlter";function Pde(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=Pde;p.ASTTrajectory="ASTTrajectory";function Cde(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=Cde;p.ASTListDeclaration="ASTListDeclaration";function kde(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=kde;p.ASTRangeDeclaration="ASTRangeDeclaration";function wde(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=wde;p.ASTParamDrift="ASTParamDrift";function Ede(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Ede;p.ASTParamEdit="ASTParamEdit";function Nde(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Nde;p.ASTParamNoise="ASTParamNoise";function $de(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=$de;p.ASTParamOffset="ASTParamOffset";function Ode(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=Ode;var Em=class extends yfe.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterAndTrajectory","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlter:case p.ASTTrajectory:return this.isSubtype(p.ASTAlterAndTrajectory,r);case p.ASTAlterAndTrajectory:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTNumberOffset:case p.ASTStringValue:case p.ASTVariableValue:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleValue:case p.ASTIntegerValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTNumber:case p.ASTRightShift:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=Em;p.reflection=new Em});var mM=d(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.AttackScenarioGrammarGrammar=void 0;var Ide=ko(),$m,Dde=()=>$m!=null?$m:$m=(0,Ide.loadGrammarFromJson)(`{
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
        ]
      },
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
}`);Om.AttackScenarioGrammarGrammar=Dde});var hM=d(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.AttackScenarioGrammarGeneratedModule=ln.FditscenarioGeneratedSharedModule=ln.AttackScenarioGrammarParserConfig=ln.AttackScenarioGrammarLanguageMetaData=void 0;var xde=Nm(),Lde=mM();ln.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};ln.AttackScenarioGrammarParserConfig={maxLookahead:1,recoveryEnabled:!0,nodeLocationTracking:"full"};ln.FditscenarioGeneratedSharedModule={AstReflection:()=>new xde.FditscenarioAstReflection};ln.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,Lde.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>ln.AttackScenarioGrammarLanguageMetaData,parser:{ParserConfig:()=>ln.AttackScenarioGrammarParserConfig}}});var yM=d(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.FditscenarioValidator=Cu.registerValidationChecks=void 0;function qde(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}Cu.registerValidationChecks=qde;var WR=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};Cu.FditscenarioValidator=WR});var _M=d(xm=>{"use strict";Object.defineProperty(xm,"__esModule",{value:!0});xm.generateCommands=void 0;var We=Nm();function Mde(t,e,r){return Fde(t,e,r)}xm.generateCommands=Mde;function Fde(t,e,r){return{sensors:jde(t,e,r)}}function jde(t,e,r){return{sensor:[{sensorType:"SBS",sID:"",record:e,firstDate:TM(r),filter:"",action:Gde(t.instructions,r)}]}}var Pr;(function(t){t.deletion="DELETION",t.creation="CREATION",t.alteration="ALTERATION",t.saturation="SATURATION",t.duplication="DUPLICATION",t.rotation="ROTATION",t.custom="CUSTOM",t.replay="REPLAY",t.timestamp="ALTERATIONTIMESTAMP",t.cut="CUT",t.speedAltaration="ALTERATIONSPEED",t.trajectory="TRAJECTORY"})(Pr||(Pr={}));var cn;(function(t){t.altitude="altitude",t.latitude="latitude",t.icao="hexIdent",t.track="track",t.callsign="callsign",t.emergency="emergency",t.groundspeed="groundSpeed",t.longitude="longitude",t.spi="SPI",t.squawk="squawk"})(cn||(cn={}));var Fa;(function(t){t.icao="hexIdent",t.callsign="callsign",t.emergency="emergency",t.spi="SPI",t.squawk="squawk",t.alert="alert"})(Fa||(Fa={}));var Im;(function(t){t.east_west_velocity="EAST_WEST_VELOCITY",t.north_south_velocity="NORTH_SOUTH_VELOCITY"})(Im||(Im={}));var Dm;(function(t){t.icao="ICAO",t.aircraft_number="AIRCRAFT_NUMBER"})(Dm||(Dm={}));var Tc;(function(t){t.rec_duration="REC_DURATION",t.alt_duration="ALT_DURATION",t.rec_nbr_aircraft="REC_NBR_AICRAFT"})(Tc||(Tc={}));function Gde(t,e){return t.flatMap(r=>Ude(r,e)).filter(r=>r!==void 0)}function Ude(t,e){return(0,We.isASTHide)(t)?(0,We.isASTHideParameter)(t.frequency)?{alterationType:Pr.deletion,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:[{mode:"simple",frequency:hpe(t.frequency)}]}}:{alterationType:Pr.deletion,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target)}}:(0,We.isASTAlter)(t)?{alterationType:Pr.alteration,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:vM(t.parameters)}}:(0,We.isASTCreate)(t)?(0,We.isASTCreationParameters)(t.parameters)?{alterationType:Pr.creation,scope:Hr(t.timeScope,e),parameters:{target:{identifier:"hexIdent",value:"ALL"},trajectory:BR(t.trajectory),parameter:epe(t.parameters)}}:{alterationType:Pr.creation,scope:Hr(t.timeScope,e),parameters:{target:{identifier:"hexIdent",value:"ALL"},trajectory:BR(t.trajectory)}}:(0,We.isASTTrajectory)(t)?{alterationType:Pr.trajectory,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),trajectory:BR(t.trajectory)}}:(0,We.isASTAlterSpeed)(t)?{alterationType:Pr.speedAltaration,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:ipe(t.parameters)}}:(0,We.isASTSaturate)(t)?{alterationType:Pr.saturation,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:upe(t.parameters)}}:(0,We.isASTReplay)(t)?(0,We.isASTParameters)(t.parameters)?{alterationType:Pr.replay,scope:Hr(t.timeScope,e),parameters:{target:gM(t.target),recordPath:"temp/"+er(t.target.recording),parameter:vM(t.parameters)}}:{alterationType:Pr.replay,scope:Hr(t.timeScope,e),parameters:{target:gM(t.target),recordPath:"temp/"+er(t.target.recording)}}:(0,We.isASTDelay)(t)?{alterationType:Pr.timestamp,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:fpe(t.delay)}}:(0,We.isASTRotate)(t)?{alterationType:Pr.rotation,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target),parameter:dpe(t.angle)}}:{alterationType:Pr.cut,scope:Hr(t.timeScope,e),parameters:{target:Xi(t.target)}}}function Hr(t,e){return(0,We.isASTAt)(t)?(0,We.isASTAtFor)(t.for)?{type:"timeWindow",lowerBound:(parseInt(Ji(t.time))*1e3).toString(),upperBound:((parseInt(Ji(t.time))+parseInt(Ji(t.for.for)))*1e3).toString()}:{type:"timeWindow",lowerBound:(parseInt(Ji(t.time))*1e3).toString(),upperBound:ype(parseInt(Ji(t.time)),e).toString()}:{type:"timeWindow",lowerBound:(parseInt(Ji(t.start))*1e3).toString(),upperBound:(parseInt(Ji(t.end))*1e3).toString()}}function Ji(t){return er(t.realTime)}function er(t){return(0,We.isASTNumberOffset)(t)?Hde(t).replace('"',"").replace('"',""):(0,We.isASTStringValue)(t)?Kde(t).replace('"',"").replace('"',""):(0,We.isASTVariableValue)(t)?Wde(t).replace('"',"").replace('"',""):Bde(t).replace('"',"").replace('"',"")}function Hde(t){return(0,We.isASTNumber)(t)?zR(t):(0,We.isASTLeftShift)(t)?Vde(t):zde(t)}function Kde(t){return t.content}function Wde(t){return t.content}function Bde(t){return t.content}function zR(t){return(0,We.isASTIntegerValue)(t)?t.content.toString():(0,We.isASTRecordingValue)(t.record)?Yde(t.record.content):t.content.toString()}function Vde(t){return zR(t.content)}function zde(t){return zR(t.content)}function Yde(t){return t.REC_DURATION!=null?Tc.rec_duration:t.ALT_DURATION!=null?Tc.alt_duration:Tc.rec_nbr_aircraft}function Xi(t){return(0,We.isASTAllPlanes)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"random"}}function gM(t){return(0,We.isASTAllPlaneFrom)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"random"}}function BR(t){return{waypoint:Xde(t.waypoints)}}function Xde(t){let e=[];for(let r=0;r<t.length;r++)e.push(Jde(t[r]));return e}function Jde(t){return{vertex:Qde(t.latitude,t.longitude),altitude:Zde(t.altitude),time:parseInt(Ji(t.time))*1e3}}function Qde(t,e){return{lat:{value:er(t),offset:!1},lon:{value:er(e),offset:!1}}}function Zde(t){return{value:t.content,offset:!1}}function epe(t){return tpe(t.items)}function tpe(t){let e=[];for(let r=0;r<t.length;r++)e.push(rpe(t[r]));return e}function rpe(t){return{mode:"simple",key:npe(t.name),value:er(t.value)}}function npe(t){return t.ICAO!=null?Fa.icao:t.CALLSIGN!=null?Fa.callsign:t.EMERGENCY!=null?Fa.emergency:t.ALERT!=null?Fa.alert:t.SPI!=null?Fa.spi:Fa.squawk}function ipe(t){return ape(t.items)}function ape(t){let e=[];for(let r=0;r<t.length;r++)e.push(ope(t[r]));return e}function ope(t){return{mode:"simple",key:spe(t.name),value:er(t.value)}}function spe(t){if(t.EAST_WEST_VELOCITY!=null)return Im.east_west_velocity;if(t.NORTH_SOUTH_VELOCITY!=null)return Im.north_south_velocity}function upe(t){return lpe(t.items)}function lpe(t){let e=[];for(let r=0;r<t.length;r++)e.push(cpe(t[r]));return e}function cpe(t){return VR(t.name)=="ICAO"?{mode:"simple",key:VR(t.name),value:er(t.value)}:{mode:"simple",key:VR(t.name),number:er(t.value)}}function VR(t){if(t.ICAO!=null)return Dm.icao;if(t.AIRCRAFT_NUMBER!=null)return Dm.aircraft_number}function fpe(t){return[{mode:"simple",key:"timestamp",value:(parseInt(Ji(t.value))*1e3).toString()}]}function dpe(t){return[{mode:"simple",key:"angle",angle:er(t.value)}]}function vM(t){return ppe(t.items)}function ppe(t){let e=[];for(let r=0;r<t.length;r++)e.push(mpe(t[r]));return e}function mpe(t){return(0,We.isASTParamEdit)(t)?{mode:"simple",key:ku(t.name),value:er(t.value)}:(0,We.isASTParamOffset)(t)?t.offset_op=="+="?{mode:"offset",key:ku(t.name),value:"+"+er(t.value)}:{mode:"offset",key:ku(t.name),value:"-"+er(t.value)}:(0,We.isASTParamNoise)(t)?{mode:"noise",key:ku(t.name),value:er(t.value)}:(0,We.isASTParamDrift)(t)&&t.drift_op=="++="?{mode:"drift",key:ku(t.name),value:"+"+er(t.value)}:{mode:"drift",key:ku(t.name),value:"-"+er(t.value)}}function ku(t){return t.ALTITUDE!=null?cn.altitude:t.CALLSIGN!=null?cn.callsign:t.EMERGENCY!=null?cn.emergency:t.GROUND_SPEED!=null?cn.groundspeed:t.ICAO!=null?cn.icao:t.LATITUDE!=null?cn.latitude:t.LONGITUDE!=null?cn.longitude:t.SPI!=null?cn.spi:t.SQUAWK!=null?cn.squawk:cn.track}function hpe(t){return er(t.value)}function TM(t){let n=t.split(`
`)[0].split(","),i=new Date(n[6].replaceAll("/","-")+"T"+n[7]);return Date.parse(n[6]+","+n[7]+" GMT")}function ype(t,e){let r=e.split(`
`),n=r[r.length-1];n==""&&(n=r[r.length-2]);let i=n.split(",");return Date.parse(i[6]+","+i[7]+" GMT")-TM(e)-t*1e3}});var AM=d((c0e,RM)=>{"use strict";RM.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var YR=d((f0e,bM)=>{var _c=AM(),SM={};for(let t of Object.keys(_c))SM[_c[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};bM.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(y){return(l-y)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function gpe(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=SM[t];if(e)return e;let r=1/0,n;for(let i of Object.keys(_c)){let a=_c[i],o=gpe(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return _c[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var CM=d((d0e,PM)=>{var Lm=YR();function vpe(){let t={},e=Object.keys(Lm);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function Tpe(t){let e=vpe(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(Lm[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function _pe(t,e){return function(r){return e(t(r))}}function Rpe(t,e){let r=[e[t].parent,t],n=Lm[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=_pe(Lm[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}PM.exports=function(t){let e=Tpe(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=Rpe(o,e))}return r}});var wM=d((p0e,kM)=>{var XR=YR(),Ape=CM(),wu={},Spe=Object.keys(XR);function bpe(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function Ppe(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}Spe.forEach(t=>{wu[t]={},Object.defineProperty(wu[t],"channels",{value:XR[t].channels}),Object.defineProperty(wu[t],"labels",{value:XR[t].labels});let e=Ape(t);Object.keys(e).forEach(n=>{let i=e[n];wu[t][n]=Ppe(i),wu[t][n].raw=bpe(i)})});kM.exports=wu});var DM=d((m0e,IM)=>{"use strict";var EM=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,NM=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},$M=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},qm=t=>t,OM=(t,e,r)=>[t,e,r],Eu=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},JR,Nu=(t,e,r,n)=>{JR===void 0&&(JR=wM());let i=n?10:0,a={};for(let[o,s]of Object.entries(JR)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function Cpe(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",Eu(e.color,"ansi",()=>Nu(EM,"ansi16",qm,!1)),Eu(e.color,"ansi256",()=>Nu(NM,"ansi256",qm,!1)),Eu(e.color,"ansi16m",()=>Nu($M,"rgb",OM,!1)),Eu(e.bgColor,"ansi",()=>Nu(EM,"ansi16",qm,!0)),Eu(e.bgColor,"ansi256",()=>Nu(NM,"ansi256",qm,!0)),Eu(e.bgColor,"ansi16m",()=>Nu($M,"rgb",OM,!0)),e}Object.defineProperty(IM,"exports",{enumerable:!0,get:Cpe})});var LM=d((h0e,xM)=>{"use strict";xM.exports={stdout:!1,stderr:!1}});var MM=d((y0e,qM)=>{"use strict";var kpe=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},wpe=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};qM.exports={stringReplaceAll:kpe,stringEncaseCRLFWithFirstIndex:wpe}});var HM=d((g0e,UM)=>{"use strict";var Epe=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,FM=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,Npe=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,$pe=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,Ope=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function GM(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):Ope.get(t)||t}function Ipe(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(Npe))r.push(i[2].replace($pe,(s,u,l)=>u?GM(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function Dpe(t){FM.lastIndex=0;let e=[],r;for(;(r=FM.exec(t))!==null;){let n=r[1];if(r[2]){let i=Ipe(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function jM(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}UM.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(Epe,(a,o,s,u,l,c)=>{if(o)i.push(GM(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:jM(t,r)(f)),r.push({inverse:s,styles:Dpe(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(jM(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var XM=d((v0e,YM)=>{"use strict";var Rc=DM(),{stdout:ZR,stderr:eA}=LM(),{stringReplaceAll:xpe,stringEncaseCRLFWithFirstIndex:Lpe}=MM(),{isArray:Mm}=Array,WM=["ansi","ansi","ansi256","ansi16m"],$u=Object.create(null),qpe=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=ZR?ZR.level:0;t.level=e.level===void 0?r:e.level},tA=class{constructor(e){return BM(e)}},BM=t=>{let e={};return qpe(e,t),e.template=(...r)=>zM(e.template,...r),Object.setPrototypeOf(e,Fm.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=tA,e.template};function Fm(t){return BM(t)}for(let[t,e]of Object.entries(Rc))$u[t]={get(){let r=jm(this,rA(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};$u.visible={get(){let t=jm(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var VM=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of VM)$u[t]={get(){let{level:e}=this;return function(...r){let n=rA(Rc.color[WM[e]][t](...r),Rc.color.close,this._styler);return jm(this,n,this._isEmpty)}}};for(let t of VM){let e="bg"+t[0].toUpperCase()+t.slice(1);$u[e]={get(){let{level:r}=this;return function(...n){let i=rA(Rc.bgColor[WM[r]][t](...n),Rc.bgColor.close,this._styler);return jm(this,i,this._isEmpty)}}}}var Mpe=Object.defineProperties(()=>{},{...$u,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),rA=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},jm=(t,e,r)=>{let n=(...i)=>Mm(i[0])&&Mm(i[0].raw)?KM(n,zM(n,...i)):KM(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,Mpe),n._generator=t,n._styler=e,n._isEmpty=r,n},KM=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=xpe(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=Lpe(e,i,n,a)),n+e+i},QR,zM=(t,...e)=>{let[r]=e;if(!Mm(r)||!Mm(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return QR===void 0&&(QR=HM()),QR(t,i.join(""))};Object.defineProperties(Fm.prototype,$u);var Gm=Fm();Gm.supportsColor=ZR;Gm.stderr=Fm({level:eA?eA.level:0});Gm.stderr.supportsColor=eA;YM.exports=Gm});var JM=d(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});Um.generateVariables=void 0;var wo=Nm(),Ac;(function(t){t.rec_duration="REC_DURATION",t.alt_duration="ALT_DURATION",t.rec_nbr_aircraft="REC_NBR_AICRAFT"})(Ac||(Ac={}));function Fpe(t){return jpe(t)}Um.generateVariables=Fpe;function jpe(t){return Gpe(t)}function Gpe(t){return{declarations:Upe(t.declarations)}}function Upe(t){return t.flatMap(e=>Hpe(e)).filter(e=>e!==void 0)}function Hpe(t){if((0,wo.isASTRangeDeclaration)(t))return{variable:t.constant,values_range:Kpe(t)};if((0,wo.isASTListDeclaration)(t))return{variable:t.constant,values_list:Wpe(t)}}function Kpe(t){return[t.range.range.start,t.range.range.end]}function Wpe(t){let e=[],r=t.list.list.items;for(let n=0;n<r.length;n++)e.push(Bpe(r[n]));return e}function Bpe(t){return(0,wo.isASTNumberOffset)(t)?Vpe(t):t}function Vpe(t){return(0,wo.isASTNumber)(t)?nA(t):(0,wo.isASTLeftShift)(t)?zpe(t):Ype(t)}function nA(t){return(0,wo.isASTIntegerValue)(t)?t.content:(0,wo.isASTRecordingValue)(t.record)?Xpe(t.record.content):t.content}function zpe(t){return nA(t.content)}function Ype(t){return nA(t.content)}function Xpe(t){return t.REC_DURATION!=null?Ac.rec_duration:t.ALT_DURATION!=null?Ac.alt_duration:Ac.rec_nbr_aircraft}});var tF=d(fr=>{"use strict";var iA=fr&&fr.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},Jpe=fr&&fr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fr,"__esModule",{value:!0});fr.createAllScenario=fr.countScenarioNumber=fr.get_variables=fr.parseAndGenerate=fr.extractAstNodeFromString=void 0;var aA=Pn(),QM=ko(),ZM=sA(),Qpe=_M(),Hm=Jpe(XM()),Zpe=JM();function oA(t,e){return iA(this,void 0,void 0,function*(){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,aA.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([r],{validationChecks:"all"}),r.parseResult.value})}fr.extractAstNodeFromString=oA;function eme(t,e,r){return iA(this,void 0,void 0,function*(){let n=(0,ZM.createFditscenarioServices)(QM.EmptyFileSystem).Fditscenario,i=yield oA(t,n),o=n.shared.workspace.LangiumDocumentFactory.fromString(t,aA.URI.parse("memory://fditscenario.document")).parseResult;if(o.lexerErrors.length===0&&o.parserErrors.length===0)console.log(Hm.default.green("Parsed and validated successfully!"));else{console.log(Hm.default.red("Failed to parse and validate !"));return}return(0,Qpe.generateCommands)(i,e,r)})}fr.parseAndGenerate=eme;function tme(t){return iA(this,void 0,void 0,function*(){let e=(0,ZM.createFditscenarioServices)(QM.EmptyFileSystem).Fditscenario,r=yield oA(t,e),i=e.shared.workspace.LangiumDocumentFactory.fromString(t,aA.URI.parse("memory://fditscenario.document")).parseResult;if(i.lexerErrors.length===0&&i.parserErrors.length===0)console.log(Hm.default.green("Parsed and validated successfully!"));else{console.log(Hm.default.red("Failed to parse and validate !"));return}let a=(0,Zpe.generateVariables)(r);if(a!=null)return a})}fr.get_variables=tme;function rme(t,e){let r=new RegExp(`${e.variable.toString().replace("$","\\$")}\\b`,"g"),n=t.match(r);return e.values_range!=null?n?Math.pow(2,n.length-1):0:e.values_list!=null&&n?Math.pow(e.values_list.length,n.length-1):0}fr.countScenarioNumber=rme;function nme(t,e,r){let n=[],i=new Map([]);for(let h=0;h<e.declarations.length;h++)e.declarations[h].values_range!=null?i.set(e.declarations[h].variable,e.declarations[h].values_range):e.declarations[h].values_list!=null&&i.set(e.declarations[h].variable,e.declarations[h].values_list);let a=t.replace(/^(let\s.*,\s*)*/,""),o="",s=0;for(let h of i.keys())s==0?(o=o+h,s++):o=o+"|"+h;let u=new RegExp(`${o.toString().replaceAll("$","\\$")}`,"g"),l=a.match(u),c=new Map([]);for(let h=0;h<l.length;h++)c.set(l[h]+"_"+h,i.get(l[h]));let f=[];for(let h of c.values())f.push(h);let y=eF(f),v="";for(let h=0;h<r;h++){v=a;for(let A=0;A<l.length;A++)v=v.replace(l[A],y[h][A].toString());n.push(v)}return n}fr.createAllScenario=nme;function eF(t){if(t.length===1)return t[0].map(r=>[r]);let e=eF(t.slice(1));return t[0].reduce((r,n)=>r.concat(e.map(i=>[n,...i])),[])}});var sA=d(Eo=>{"use strict";Object.defineProperty(Eo,"__esModule",{value:!0});Eo.createFditscenarioServices=Eo.FditscenarioModule=void 0;var Km=ko(),rF=hM(),nF=yM(),ime=ko(),ame=tF();Eo.FditscenarioModule={validation:{FditscenarioValidator:()=>new nF.FditscenarioValidator}};function ome(t){let e=(0,Km.inject)((0,Km.createDefaultSharedModule)(t),rF.FditscenarioGeneratedSharedModule),r=(0,Km.inject)((0,Km.createDefaultModule)({shared:e}),rF.AttackScenarioGrammarGeneratedModule,Eo.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new uA,e.ServiceRegistry.register(r),(0,nF.registerValidationChecks)(r),{shared:e,Fditscenario:r}}Eo.createFditscenarioServices=ome;var uA=class extends ime.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,ame.parseAndGenerate)(r[0],r[1],r[2]))}}});var dme=d(aF=>{Object.defineProperty(aF,"__esModule",{value:!0});var iF=ko(),lA=pM(),sme=sA(),ume=new lA.BrowserMessageReader(self),lme=new lA.BrowserMessageWriter(self),cme=(0,lA.createConnection)(ume,lme),{shared:fme}=(0,sme.createFditscenarioServices)(Object.assign({connection:cme},iF.EmptyFileSystem));(0,iF.startLanguageServer)(fme)});dme();})();

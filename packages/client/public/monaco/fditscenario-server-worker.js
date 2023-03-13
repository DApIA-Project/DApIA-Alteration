"use strict";(()=>{var Ac=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var _i=d(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});var jm;function Gm(){if(jm===void 0)throw new Error("No runtime abstraction layer installed");return jm}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");jm=r}t.install=e})(Gm||(Gm={}));Um.default=Gm});var Hm=d(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.Disposable=void 0;var QM;(function(t){function e(r){return{dispose:r}}t.create=e})(QM=Iu.Disposable||(Iu.Disposable={}))});var Ha=d(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.Emitter=Ua.Event=void 0;var ZM=_i(),eF;(function(t){let e={dispose(){}};t.None=function(){return e}})(eF=Ua.Event||(Ua.Event={}));var Km=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,ZM.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Lo=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Km),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=Lo._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Ua.Emitter=Lo;Lo._noop=function(){}});var nA=d(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.AbstractMessageBuffer=void 0;var tF=13,rF=10,nF=`\r
`,Wm=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case tF:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case rF:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(nF);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),h=l.substr(c+1).trim();o.set(f,h)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};Sc.AbstractMessageBuffer=Wm});var oA=d(Ym=>{"use strict";Object.defineProperty(Ym,"__esModule",{value:!0});var iA=_i(),qo=Hm(),iF=Ha(),aF=nA(),Mo=class extends aF.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return Mo.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Mo.emptyBuffer=new Uint8Array(0);var Bm=class{constructor(e){this.socket=e,this._onData=new iF.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,iA.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Vm=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},oF=new TextEncoder,aA=Object.freeze({messageBuffer:Object.freeze({create:t=>new Mo(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(oF.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Bm(t),asWritableStream:t=>new Vm(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function zm(){return aA}(function(t){function e(){iA.default.install(aA)}t.install=e})(zm||(zm={}));Ym.default=zm});var Fo=d(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.stringArray=tr.array=tr.func=tr.error=tr.number=tr.string=tr.boolean=void 0;function sF(t){return t===!0||t===!1}tr.boolean=sF;function sA(t){return typeof t=="string"||t instanceof String}tr.string=sA;function uF(t){return typeof t=="number"||t instanceof Number}tr.number=uF;function lF(t){return t instanceof Error}tr.error=lF;function cF(t){return typeof t=="function"}tr.func=cF;function uA(t){return Array.isArray(t)}tr.array=uA;function fF(t){return uA(t)&&t.every(e=>sA(e))}tr.stringArray=fF});var vh=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var Ka=Fo(),lA;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(lA=J.ErrorCodes||(J.ErrorCodes={}));var Du=class extends Error{constructor(e,r,n){super(r),this.code=Ka.number(e)?e:lA.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,Du.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=Du;var Mt=class{constructor(e){this.kind=e}static is(e){return e===Mt.auto||e===Mt.byName||e===Mt.byPosition}toString(){return this.kind}};J.ParameterStructures=Mt;Mt.auto=new Mt("auto");Mt.byPosition=new Mt("byPosition");Mt.byName=new Mt("byName");var Ze=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Mt.auto}};J.AbstractMessageSignature=Ze;var Xm=class extends Ze{constructor(e){super(e,0)}};J.RequestType0=Xm;var Jm=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=Jm;var Qm=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=Qm;var Zm=class extends Ze{constructor(e){super(e,2)}};J.RequestType2=Zm;var eh=class extends Ze{constructor(e){super(e,3)}};J.RequestType3=eh;var th=class extends Ze{constructor(e){super(e,4)}};J.RequestType4=th;var rh=class extends Ze{constructor(e){super(e,5)}};J.RequestType5=rh;var nh=class extends Ze{constructor(e){super(e,6)}};J.RequestType6=nh;var ih=class extends Ze{constructor(e){super(e,7)}};J.RequestType7=ih;var ah=class extends Ze{constructor(e){super(e,8)}};J.RequestType8=ah;var oh=class extends Ze{constructor(e){super(e,9)}};J.RequestType9=oh;var sh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=sh;var uh=class extends Ze{constructor(e){super(e,0)}};J.NotificationType0=uh;var lh=class extends Ze{constructor(e,r=Mt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=lh;var ch=class extends Ze{constructor(e){super(e,2)}};J.NotificationType2=ch;var fh=class extends Ze{constructor(e){super(e,3)}};J.NotificationType3=fh;var dh=class extends Ze{constructor(e){super(e,4)}};J.NotificationType4=dh;var ph=class extends Ze{constructor(e){super(e,5)}};J.NotificationType5=ph;var mh=class extends Ze{constructor(e){super(e,6)}};J.NotificationType6=mh;var hh=class extends Ze{constructor(e){super(e,7)}};J.NotificationType7=hh;var yh=class extends Ze{constructor(e){super(e,8)}};J.NotificationType8=yh;var gh=class extends Ze{constructor(e){super(e,9)}};J.NotificationType9=gh;var dF;(function(t){function e(i){let a=i;return a&&Ka.string(a.method)&&(Ka.string(a.id)||Ka.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ka.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ka.string(a.id)||Ka.number(a.id)||a.id===null)}t.isResponse=n})(dF=J.Message||(J.Message={}))});var _h=d(Ri=>{"use strict";var cA;Object.defineProperty(Ri,"__esModule",{value:!0});Ri.LRUCache=Ri.LinkedMap=Ri.Touch=void 0;var fr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(fr=Ri.Touch||(Ri.Touch={}));var bc=class{constructor(){this[cA]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=fr.None){let n=this._map.get(e);if(n)return r!==fr.None&&this.touch(n,r),n.value}set(e,r,n=fr.None){let i=this._map.get(e);if(i)i.value=r,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(cA=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==fr.First&&r!==fr.Last)){if(r===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Ri.LinkedMap=bc;var Th=class extends bc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=fr.AsNew){return super.get(e,r)}peek(e){return super.get(e,fr.None)}set(e,r){return super.set(e,r,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Ri.LRUCache=Th});var bh=d(Wa=>{"use strict";Object.defineProperty(Wa,"__esModule",{value:!0});Wa.CancellationTokenSource=Wa.CancellationToken=void 0;var pF=_i(),mF=Fo(),Rh=Ha(),Ah;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Rh.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Rh.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||mF.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Ah=Wa.CancellationToken||(Wa.CancellationToken={}));var hF=Object.freeze(function(t,e){let r=(0,pF.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Pc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?hF:(this._emitter||(this._emitter=new Rh.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Sh=class{get token(){return this._token||(this._token=new Pc),this._token}cancel(){this._token?this._token.cancel():this._token=Ah.Cancelled}dispose(){this._token?this._token instanceof Pc&&this._token.dispose():this._token=Ah.None}};Wa.CancellationTokenSource=Sh});var fA=d(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.ReadableStreamMessageReader=Ai.AbstractMessageReader=Ai.MessageReader=void 0;var Ch=_i(),jo=Fo(),Ph=Ha(),yF;(function(t){function e(r){let n=r;return n&&jo.func(n.listen)&&jo.func(n.dispose)&&jo.func(n.onError)&&jo.func(n.onClose)&&jo.func(n.onPartialMessage)}t.is=e})(yF=Ai.MessageReader||(Ai.MessageReader={}));var Cc=class{constructor(){this.errorEmitter=new Ph.Emitter,this.closeEmitter=new Ph.Emitter,this.partialMessageEmitter=new Ph.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${jo.string(e.message)?e.message:"unknown"}`)}};Ai.AbstractMessageReader=Cc;var kh;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,Ch.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(kh||(kh={}));var wh=class extends Cc{constructor(e,r){super(),this.readable=e,this.options=kh.fromOptions(r),this.buffer=(0,Ch.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Ch.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Ai.ReadableStreamMessageReader=wh});var dA=d(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.Semaphore=void 0;var gF=_i(),Eh=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,gF.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};kc.Semaphore=Eh});var yA=d(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.WriteableStreamMessageWriter=Si.AbstractMessageWriter=Si.MessageWriter=void 0;var pA=_i(),xu=Fo(),vF=dA(),mA=Ha(),TF="Content-Length: ",hA=`\r
`,_F;(function(t){function e(r){let n=r;return n&&xu.func(n.dispose)&&xu.func(n.onClose)&&xu.func(n.onError)&&xu.func(n.write)}t.is=e})(_F=Si.MessageWriter||(Si.MessageWriter={}));var wc=class{constructor(){this.errorEmitter=new mA.Emitter,this.closeEmitter=new mA.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${xu.string(e.message)?e.message:"unknown"}`)}};Si.AbstractMessageWriter=wc;var Nh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,pA.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,pA.default)().applicationJson.encoder}}t.fromOptions=e})(Nh||(Nh={}));var $h=class extends wc{constructor(e,r){super(),this.writable=e,this.options=Nh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new vF.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(TF,n.byteLength.toString(),hA),i.push(hA),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Si.WriteableStreamMessageWriter=$h});var AA=d(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.createMessageConnection=ee.ConnectionOptions=ee.CancellationStrategy=ee.CancellationSenderStrategy=ee.CancellationReceiverStrategy=ee.ConnectionStrategy=ee.ConnectionError=ee.ConnectionErrors=ee.LogTraceNotification=ee.SetTraceNotification=ee.TraceFormat=ee.TraceValues=ee.Trace=ee.NullLogger=ee.ProgressType=ee.ProgressToken=void 0;var gA=_i(),xt=Fo(),re=vh(),vA=_h(),Lu=Ha(),Oh=bh(),Mu;(function(t){t.type=new re.NotificationType("$/cancelRequest")})(Mu||(Mu={}));var TA;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(TA=ee.ProgressToken||(ee.ProgressToken={}));var qu;(function(t){t.type=new re.NotificationType("$/progress")})(qu||(qu={}));var Ih=class{constructor(){}};ee.ProgressType=Ih;var Dh;(function(t){function e(r){return xt.func(r)}t.is=e})(Dh||(Dh={}));ee.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var De;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(De=ee.Trace||(ee.Trace={}));var RF;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(RF=ee.TraceValues||(ee.TraceValues={}));(function(t){function e(n){if(!xt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(De=ee.Trace||(ee.Trace={}));var yn;(function(t){t.Text="text",t.JSON="json"})(yn=ee.TraceFormat||(ee.TraceFormat={}));(function(t){function e(r){return xt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(yn=ee.TraceFormat||(ee.TraceFormat={}));var _A;(function(t){t.type=new re.NotificationType("$/setTrace")})(_A=ee.SetTraceNotification||(ee.SetTraceNotification={}));var xh;(function(t){t.type=new re.NotificationType("$/logTrace")})(xh=ee.LogTraceNotification||(ee.LogTraceNotification={}));var Ec;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Ec=ee.ConnectionErrors||(ee.ConnectionErrors={}));var Qi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Qi.prototype)}};ee.ConnectionError=Qi;var RA;(function(t){function e(r){let n=r;return n&&xt.func(n.cancelUndispatched)}t.is=e})(RA=ee.ConnectionStrategy||(ee.ConnectionStrategy={}));var Lh;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Oh.CancellationTokenSource}});function e(r){let n=r;return n&&xt.func(n.createCancellationTokenSource)}t.is=e})(Lh=ee.CancellationReceiverStrategy||(ee.CancellationReceiverStrategy={}));var qh;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Mu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&xt.func(n.sendCancellation)&&xt.func(n.cleanup)}t.is=e})(qh=ee.CancellationSenderStrategy||(ee.CancellationSenderStrategy={}));var Mh;(function(t){t.Message=Object.freeze({receiver:Lh.Message,sender:qh.Message});function e(r){let n=r;return n&&Lh.is(n.receiver)&&qh.is(n.sender)}t.is=e})(Mh=ee.CancellationStrategy||(ee.CancellationStrategy={}));var AF;(function(t){function e(r){let n=r;return n&&(Mh.is(n.cancellationStrategy)||RA.is(n.connectionStrategy))}t.is=e})(AF=ee.ConnectionOptions||(ee.ConnectionOptions={}));var gn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(gn||(gn={}));function SF(t,e,r,n){let i=r!==void 0?r:ee.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,h=new Map,v=new Map,y,A=new vA.LinkedMap,w=new Map,C=new Set,b=new Map,S=De.Off,O=yn.Text,F,W=gn.New,te=new Lu.Emitter,we=new Lu.Emitter,Ee=new Lu.Emitter,Qe=new Lu.Emitter,V=new Lu.Emitter,fe=n&&n.cancellationStrategy?n.cancellationStrategy:Mh.Message;function q(P){if(P===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+P.toString()}function L(P){return P===null?"res-unknown-"+(++s).toString():"res-"+P.toString()}function j(){return"not-"+(++o).toString()}function B(P,x){re.Message.isRequest(x)?P.set(q(x.id),x):re.Message.isResponse(x)?P.set(L(x.id),x):P.set(j(),x)}function ae(P){}function oe(){return W===gn.Listening}function Z(){return W===gn.Closed}function dt(){return W===gn.Disposed}function tt(){(W===gn.New||W===gn.Listening)&&(W=gn.Closed,we.fire(void 0))}function Dt(P){te.fire([P,void 0,void 0])}function cn(P){te.fire(P)}t.onClose(tt),t.onError(Dt),e.onClose(tt),e.onError(cn);function Ir(){y||A.size===0||(y=(0,gA.default)().timer.setImmediate(()=>{y=void 0,Eo()}))}function Eo(){if(A.size===0)return;let P=A.shift();try{re.Message.isRequest(P)?No(P):re.Message.isNotification(P)?Oo(P):re.Message.isResponse(P)?$o(P):$u(P)}finally{Ir()}}let cr=P=>{try{if(re.Message.isNotification(P)&&P.method===Mu.type.method){let x=P.params.id,G=q(x),z=A.get(G);if(re.Message.isRequest(z)){let Ge=n?.connectionStrategy,rt=Ge&&Ge.cancelUndispatched?Ge.cancelUndispatched(z,ae):void 0;if(rt&&(rt.error!==void 0||rt.result!==void 0)){A.delete(G),b.delete(x),rt.id=z.id,Mn(rt,P.method,Date.now()),e.write(rt).catch(()=>i.error("Sending response for canceled message failed."));return}}let je=b.get(x);if(je!==void 0){je.cancel(),Fn(P);return}else C.add(x)}B(A,P)}finally{Ir()}};function No(P){if(dt())return;function x(ge,Be,_e){let vt={jsonrpc:u,id:P.id};ge instanceof re.ResponseError?vt.error=ge.toJson():vt.result=ge===void 0?null:ge,Mn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}function G(ge,Be,_e){let vt={jsonrpc:u,id:P.id,error:ge.toJson()};Mn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}function z(ge,Be,_e){ge===void 0&&(ge=null);let vt={jsonrpc:u,id:P.id,result:ge};Mn(vt,Be,_e),e.write(vt).catch(()=>i.error("Sending response failed."))}ja(P);let je=c.get(P.method),Ge,rt;je&&(Ge=je.type,rt=je.handler);let Rt=Date.now();if(rt||l){let ge=P.id??String(Date.now()),Be=fe.receiver.createCancellationTokenSource(ge);P.id!==null&&C.has(P.id)&&Be.cancel(),P.id!==null&&b.set(ge,Be);try{let _e;if(rt)if(P.params===void 0){if(Ge!==void 0&&Ge.numberOfParams!==0){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines ${Ge.numberOfParams} params but received none.`),P.method,Rt);return}_e=rt(Be.token)}else if(Array.isArray(P.params)){if(Ge!==void 0&&Ge.parameterStructures===re.ParameterStructures.byName){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by name but received parameters by position`),P.method,Rt);return}_e=rt(...P.params,Be.token)}else{if(Ge!==void 0&&Ge.parameterStructures===re.ParameterStructures.byPosition){G(new re.ResponseError(re.ErrorCodes.InvalidParams,`Request ${P.method} defines parameters by position but received parameters by name`),P.method,Rt);return}_e=rt(P.params,Be.token)}else l&&(_e=l(P.method,P.params,Be.token));let vt=_e;_e?vt.then?vt.then(er=>{b.delete(ge),x(er,P.method,Rt)},er=>{b.delete(ge),er instanceof re.ResponseError?G(er,P.method,Rt):er&&xt.string(er.message)?G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${er.message}`),P.method,Rt):G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Rt)}):(b.delete(ge),x(_e,P.method,Rt)):(b.delete(ge),z(_e,P.method,Rt))}catch(_e){b.delete(ge),_e instanceof re.ResponseError?x(_e,P.method,Rt):_e&&xt.string(_e.message)?G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed with message: ${_e.message}`),P.method,Rt):G(new re.ResponseError(re.ErrorCodes.InternalError,`Request ${P.method} failed unexpectedly without providing any details.`),P.method,Rt)}}else G(new re.ResponseError(re.ErrorCodes.MethodNotFound,`Unhandled method ${P.method}`),P.method,Rt)}function $o(P){if(!dt())if(P.id===null)P.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(P.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=P.id,G=w.get(x);if(Ga(P,G),G!==void 0){w.delete(x);try{if(P.error){let z=P.error;G.reject(new re.ResponseError(z.code,z.message,z.data))}else if(P.result!==void 0)G.resolve(P.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function Oo(P){if(dt())return;let x,G;if(P.method===Mu.type.method){let z=P.params.id;C.delete(z),Fn(P);return}else{let z=h.get(P.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(Fn(P),G)if(P.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==re.ParameterStructures.byName&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(P.params)){let z=P.params;P.method===qu.type.method&&z.length===2&&TA.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===re.ParameterStructures.byName&&i.error(`Notification ${P.method} defines parameters by name but received parameters by position`),x.numberOfParams!==P.params.length&&i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===re.ParameterStructures.byPosition&&i.error(`Notification ${P.method} defines parameters by position but received parameters by name`),G(P.params);else f&&f(P.method,P.params)}catch(z){z.message?i.error(`Notification handler '${P.method}' failed with message: ${z.message}`):i.error(`Notification handler '${P.method}' failed unexpectedly.`)}else Ee.fire(P)}function $u(P){if(!P){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(P,null,4)}`);let x=P;if(xt.string(x.id)||xt.number(x.id)){let G=x.id,z=w.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function gt(P){if(P!=null)switch(S){case De.Verbose:return JSON.stringify(P,null,4);case De.Compact:return JSON.stringify(P);default:return}}function gi(P){if(!(S===De.Off||!F))if(O===yn.Text){let x;(S===De.Verbose||S===De.Compact)&&P.params&&(x=`Params: ${gt(P.params)}

`),F.log(`Sending request '${P.method} - (${P.id})'.`,x)}else Hr("send-request",P)}function Ou(P){if(!(S===De.Off||!F))if(O===yn.Text){let x;(S===De.Verbose||S===De.Compact)&&(P.params?x=`Params: ${gt(P.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${P.method}'.`,x)}else Hr("send-notification",P)}function Mn(P,x,G){if(!(S===De.Off||!F))if(O===yn.Text){let z;(S===De.Verbose||S===De.Compact)&&(P.error&&P.error.data?z=`Error data: ${gt(P.error.data)}

`:P.result?z=`Result: ${gt(P.result)}

`:P.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${P.id})'. Processing request took ${Date.now()-G}ms`,z)}else Hr("send-response",P)}function ja(P){if(!(S===De.Off||!F))if(O===yn.Text){let x;(S===De.Verbose||S===De.Compact)&&P.params&&(x=`Params: ${gt(P.params)}

`),F.log(`Received request '${P.method} - (${P.id})'.`,x)}else Hr("receive-request",P)}function Fn(P){if(!(S===De.Off||!F||P.method===xh.type.method))if(O===yn.Text){let x;(S===De.Verbose||S===De.Compact)&&(P.params?x=`Params: ${gt(P.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${P.method}'.`,x)}else Hr("receive-notification",P)}function Ga(P,x){if(!(S===De.Off||!F))if(O===yn.Text){let G;if((S===De.Verbose||S===De.Compact)&&(P.error&&P.error.data?G=`Error data: ${gt(P.error.data)}

`:P.result?G=`Result: ${gt(P.result)}

`:P.error===void 0&&(G=`No result returned.

`)),x){let z=P.error?` Request failed: ${P.error.message} (${P.error.code}).`:"";F.log(`Received response '${x.method} - (${P.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${P.id} without active response promise.`,G)}else Hr("receive-response",P)}function Hr(P,x){if(!F||S===De.Off)return;let G={isLSPMessage:!0,type:P,message:x,timestamp:Date.now()};F.log(G)}function fn(){if(Z())throw new Qi(Ec.Closed,"Connection is closed.");if(dt())throw new Qi(Ec.Disposed,"Connection is disposed.")}function Io(){if(oe())throw new Qi(Ec.AlreadyListening,"Connection is already listening")}function Do(){if(!oe())throw new Error("Call listen() first.")}function Dr(P){return P===void 0?null:P}function jn(P){if(P!==null)return P}function qt(P){return P!=null&&!Array.isArray(P)&&typeof P=="object"}function dn(P,x){switch(P){case re.ParameterStructures.auto:return qt(x)?jn(x):[Dr(x)];case re.ParameterStructures.byName:if(!qt(x))throw new Error("Received parameters by name but param is not an object literal.");return jn(x);case re.ParameterStructures.byPosition:return[Dr(x)];default:throw new Error(`Unknown parameter structure ${P.toString()}`)}}function pn(P,x){let G,z=P.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=dn(P.parameterStructures,x[0]);break;default:G=[];for(let je=0;je<x.length&&je<z;je++)G.push(Dr(x[je]));if(x.length<z)for(let je=x.length;je<z;je++)G.push(null);break}return G}let Gn={sendNotification:(P,...x)=>{fn();let G,z;if(xt.string(P)){G=P;let Ge=x[0],rt=0,Rt=re.ParameterStructures.auto;re.ParameterStructures.is(Ge)&&(rt=1,Rt=Ge);let ge=x.length,Be=ge-rt;switch(Be){case 0:z=void 0;break;case 1:z=dn(Rt,x[rt]);break;default:if(Rt===re.ParameterStructures.byName)throw new Error(`Received ${Be} parameters for 'by Name' notification parameter structure.`);z=x.slice(rt,ge).map(_e=>Dr(_e));break}}else{let Ge=x;G=P.method,z=pn(P,Ge)}let je={jsonrpc:u,method:G,params:z};return Ou(je),e.write(je).catch(()=>i.error("Sending notification failed."))},onNotification:(P,x)=>{fn();let G;return xt.func(P)?f=P:x&&(xt.string(P)?(G=P,h.set(P,{type:void 0,handler:x})):(G=P.method,h.set(P.method,{type:P,handler:x}))),{dispose:()=>{G!==void 0?h.delete(G):f=void 0}}},onProgress:(P,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(P,x,G)=>Gn.sendNotification(qu.type,{token:x,value:G}),onUnhandledProgress:Qe.event,sendRequest:(P,...x)=>{fn(),Do();let G,z,je;if(xt.string(P)){G=P;let ge=x[0],Be=x[x.length-1],_e=0,vt=re.ParameterStructures.auto;re.ParameterStructures.is(ge)&&(_e=1,vt=ge);let er=x.length;Oh.CancellationToken.is(Be)&&(er=er-1,je=Be);let vi=er-_e;switch(vi){case 0:z=void 0;break;case 1:z=dn(vt,x[_e]);break;default:if(vt===re.ParameterStructures.byName)throw new Error(`Received ${vi} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,er).map(Un=>Dr(Un));break}}else{let ge=x;G=P.method,z=pn(P,ge);let Be=P.numberOfParams;je=Oh.CancellationToken.is(ge[Be])?ge[Be]:void 0}let Ge=a++,rt;return je&&(rt=je.onCancellationRequested(()=>{let ge=fe.sender.sendCancellation(Gn,Ge);return ge===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Ge}`),Promise.resolve()):ge.catch(()=>{i.log(`Sending cancellation messages for id ${Ge} failed`)})})),new Promise((ge,Be)=>{let _e={jsonrpc:u,id:Ge,method:G,params:z},vt=Un=>{ge(Un),fe.sender.cleanup(Ge),rt?.dispose()},er=Un=>{Be(Un),fe.sender.cleanup(Ge),rt?.dispose()},vi={method:G,timerStart:Date.now(),resolve:vt,reject:er};gi(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(Un){vi.reject(new re.ResponseError(re.ErrorCodes.MessageWriteError,Un.message?Un.message:"Unknown reason")),vi=null}vi&&w.set(Ge,vi)})},onRequest:(P,x)=>{fn();let G=null;return Dh.is(P)?(G=void 0,l=P):xt.string(P)?(G=null,x!==void 0&&(G=P,c.set(P,{handler:x,type:void 0}))):x!==void 0&&(G=P.method,c.set(P.method,{type:P,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>w.size>0,trace:async(P,x,G)=>{let z=!1,je=yn.Text;G!==void 0&&(xt.boolean(G)?z=G:(z=G.sendNotification||!1,je=G.traceFormat||yn.Text)),S=P,O=je,S===De.Off?F=void 0:F=x,z&&!Z()&&!dt()&&await Gn.sendNotification(_A.type,{value:De.toString(P)})},onError:te.event,onClose:we.event,onUnhandledNotification:Ee.event,onDispose:V.event,end:()=>{e.end()},dispose:()=>{if(dt())return;W=gn.Disposed,V.fire(void 0);let P=new re.ResponseError(re.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of w.values())x.reject(P);w=new Map,b=new Map,C=new Set,A=new vA.LinkedMap,xt.func(e.dispose)&&e.dispose(),xt.func(t.dispose)&&t.dispose()},listen:()=>{fn(),Io(),W=gn.Listening,t.listen(cr)},inspect:()=>{(0,gA.default)().console.log("inspect")}};return Gn.onNotification(xh.type,P=>{if(S===De.Off||!F)return;let x=S===De.Verbose||S===De.Compact;F.log(P.message,x?P.verbose:void 0)}),Gn.onNotification(qu.type,P=>{let x=v.get(P.token);x?x(P.value):Qe.fire(P)}),Gn}ee.createMessageConnection=SF});var Uh=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var ze=vh();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return ze.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return ze.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return ze.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return ze.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return ze.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return ze.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return ze.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return ze.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return ze.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return ze.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return ze.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return ze.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return ze.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return ze.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return ze.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return ze.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return ze.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return ze.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return ze.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return ze.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return ze.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return ze.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return ze.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return ze.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return ze.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return ze.ParameterStructures}});var Fh=_h();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Fh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Fh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Fh.Touch}});var bF=Hm();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return bF.Disposable}});var SA=Ha();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return SA.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return SA.Emitter}});var bA=bh();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return bA.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return bA.CancellationToken}});var jh=fA();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return jh.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return jh.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return jh.ReadableStreamMessageReader}});var Gh=yA();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Gh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Gh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Gh.WriteableStreamMessageWriter}});var rr=AA();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return rr.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return rr.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return rr.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return rr.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return rr.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return rr.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return rr.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return rr.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return rr.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return rr.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return rr.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return rr.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return rr.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return rr.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return rr.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return rr.CancellationStrategy}});var PF=_i();I.RAL=PF.default});var bi=d(xr=>{"use strict";var CF=xr&&xr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),kF=xr&&xr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&CF(e,t,r)};Object.defineProperty(xr,"__esModule",{value:!0});xr.createMessageConnection=xr.BrowserMessageWriter=xr.BrowserMessageReader=void 0;var wF=oA();wF.default.install();var Go=Uh();kF(Uh(),xr);var Hh=class extends Go.AbstractMessageReader{constructor(e){super(),this._onData=new Go.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};xr.BrowserMessageReader=Hh;var Kh=class extends Go.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};xr.BrowserMessageWriter=Kh;function EF(t,e,r,n){return r===void 0&&(r=Go.NullLogger),Go.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Go.createMessageConnection)(t,e,r,n)}xr.createMessageConnection=EF});var Wh=d((sme,PA)=>{"use strict";PA.exports=bi()});var Uo=d((CA,Nc)=>{(function(t){if(typeof Nc=="object"&&typeof Nc.exports=="object"){var e=t(Ac,CA);e!==void 0&&(Nc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(E){return typeof E=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(E){return typeof E=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(E){return typeof E=="number"&&g.MIN_VALUE<=E&&E<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(E){return typeof E=="number"&&g.MIN_VALUE<=E&&E<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(R,m){return R===Number.MAX_VALUE&&(R=a.MAX_VALUE),m===Number.MAX_VALUE&&(m=a.MAX_VALUE),{line:R,character:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.line)&&N.uinteger(m.character)}g.is=E})(o=e.Position||(e.Position={}));var s;(function(g){function k(R,m,$,D){if(N.uinteger(R)&&N.uinteger(m)&&N.uinteger($)&&N.uinteger(D))return{start:o.create(R,m),end:o.create($,D)};if(o.is(R)&&o.is(m))return{start:R,end:m};throw new Error("Range#create called with invalid arguments[".concat(R,", ").concat(m,", ").concat($,", ").concat(D,"]"))}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&o.is(m.start)&&o.is(m.end)}g.is=E})(s=e.Range||(e.Range={}));var u;(function(g){function k(R,m){return{uri:R,range:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(N.string(m.uri)||N.undefined(m.uri))}g.is=E})(u=e.Location||(e.Location={}));var l;(function(g){function k(R,m,$,D){return{targetUri:R,targetRange:m,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.targetRange)&&N.string(m.targetUri)&&s.is(m.targetSelectionRange)&&(s.is(m.originSelectionRange)||N.undefined(m.originSelectionRange))}g.is=E})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(R,m,$,D){return{red:R,green:m,blue:$,alpha:D}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.numberRange(m.red,0,1)&&N.numberRange(m.green,0,1)&&N.numberRange(m.blue,0,1)&&N.numberRange(m.alpha,0,1)}g.is=E})(c=e.Color||(e.Color={}));var f;(function(g){function k(R,m){return{range:R,color:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&c.is(m.color)}g.is=E})(f=e.ColorInformation||(e.ColorInformation={}));var h;(function(g){function k(R,m,$){return{label:R,textEdit:m,additionalTextEdits:$}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.undefined(m.textEdit)||F.is(m))&&(N.undefined(m.additionalTextEdits)||N.typedArray(m.additionalTextEdits,F.is))}g.is=E})(h=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(R,m,$,D,ie,pt){var Ve={startLine:R,endLine:m};return N.defined($)&&(Ve.startCharacter=$),N.defined(D)&&(Ve.endCharacter=D),N.defined(ie)&&(Ve.kind=ie),N.defined(pt)&&(Ve.collapsedText=pt),Ve}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.uinteger(m.startLine)&&N.uinteger(m.startLine)&&(N.undefined(m.startCharacter)||N.uinteger(m.startCharacter))&&(N.undefined(m.endCharacter)||N.uinteger(m.endCharacter))&&(N.undefined(m.kind)||N.string(m.kind))}g.is=E})(y=e.FoldingRange||(e.FoldingRange={}));var A;(function(g){function k(R,m){return{location:R,message:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&u.is(m.location)&&N.string(m.message)}g.is=E})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var w;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(w=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(g){g.Unnecessary=1,g.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&N.string(R.href)}g.is=k})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(R,m,$,D,ie,pt){var Ve={range:R,message:m};return N.defined($)&&(Ve.severity=$),N.defined(D)&&(Ve.code=D),N.defined(ie)&&(Ve.source=ie),N.defined(pt)&&(Ve.relatedInformation=pt),Ve}g.create=k;function E(R){var m,$=R;return N.defined($)&&s.is($.range)&&N.string($.message)&&(N.number($.severity)||N.undefined($.severity))&&(N.integer($.code)||N.string($.code)||N.undefined($.code))&&(N.undefined($.codeDescription)||N.string((m=$.codeDescription)===null||m===void 0?void 0:m.href))&&(N.string($.source)||N.undefined($.source))&&(N.undefined($.relatedInformation)||N.typedArray($.relatedInformation,A.is))}g.is=E})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(R,m){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ie={title:R,command:m};return N.defined($)&&$.length>0&&(ie.arguments=$),ie}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.title)&&N.string(m.command)}g.is=E})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function E($,D){return{range:{start:$,end:$},newText:D}}g.insert=E;function R($){return{range:$,newText:""}}g.del=R;function m($){var D=$;return N.objectLiteral(D)&&N.string(D.newText)&&s.is(D.range)}g.is=m})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(R,m,$){var D={label:R};return m!==void 0&&(D.needsConfirmation=m),$!==void 0&&(D.description=$),D}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&N.string(m.label)&&(N.boolean(m.needsConfirmation)||m.needsConfirmation===void 0)&&(N.string(m.description)||m.description===void 0)}g.is=E})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var te;(function(g){function k(E){var R=E;return N.string(R)}g.is=k})(te=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var we;(function(g){function k($,D,ie){return{range:$,newText:D,annotationId:ie}}g.replace=k;function E($,D,ie){return{range:{start:$,end:$},newText:D,annotationId:ie}}g.insert=E;function R($,D){return{range:$,newText:"",annotationId:D}}g.del=R;function m($){var D=$;return F.is(D)&&(W.is(D.annotationId)||te.is(D.annotationId))}g.is=m})(we=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ee;(function(g){function k(R,m){return{textDocument:R,edits:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&Z.is(m.textDocument)&&Array.isArray(m.edits)}g.is=E})(Ee=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Qe;(function(g){function k(R,m,$){var D={kind:"create",uri:R};return m!==void 0&&(m.overwrite!==void 0||m.ignoreIfExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function E(R){var m=R;return m&&m.kind==="create"&&N.string(m.uri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(Qe=e.CreateFile||(e.CreateFile={}));var V;(function(g){function k(R,m,$,D){var ie={kind:"rename",oldUri:R,newUri:m};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ie.options=$),D!==void 0&&(ie.annotationId=D),ie}g.create=k;function E(R){var m=R;return m&&m.kind==="rename"&&N.string(m.oldUri)&&N.string(m.newUri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(V=e.RenameFile||(e.RenameFile={}));var fe;(function(g){function k(R,m,$){var D={kind:"delete",uri:R};return m!==void 0&&(m.recursive!==void 0||m.ignoreIfNotExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=k;function E(R){var m=R;return m&&m.kind==="delete"&&N.string(m.uri)&&(m.options===void 0||(m.options.recursive===void 0||N.boolean(m.options.recursive))&&(m.options.ignoreIfNotExists===void 0||N.boolean(m.options.ignoreIfNotExists)))&&(m.annotationId===void 0||te.is(m.annotationId))}g.is=E})(fe=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(E){var R=E;return R&&(R.changes!==void 0||R.documentChanges!==void 0)&&(R.documentChanges===void 0||R.documentChanges.every(function(m){return N.string(m.kind)?Qe.is(m)||V.is(m)||fe.is(m):Ee.is(m)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,E){this.edits=k,this.changeAnnotations=E}return g.prototype.insert=function(k,E,R){var m,$;if(R===void 0?m=F.insert(k,E):te.is(R)?($=R,m=we.insert(k,E,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=we.insert(k,E,$)),this.edits.push(m),$!==void 0)return $},g.prototype.replace=function(k,E,R){var m,$;if(R===void 0?m=F.replace(k,E):te.is(R)?($=R,m=we.replace(k,E,R)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(R),m=we.replace(k,E,$)),this.edits.push(m),$!==void 0)return $},g.prototype.delete=function(k,E){var R,m;if(E===void 0?R=F.del(k):te.is(E)?(m=E,R=we.del(k,E)):(this.assertChangeAnnotations(this.changeAnnotations),m=this.changeAnnotations.manage(E),R=we.del(k,m)),this.edits.push(R),m!==void 0)return m},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,E){var R;if(te.is(k)?R=k:(R=this.nextId(),E=k),this._annotations[R]!==void 0)throw new Error("Id ".concat(R," is already in use."));if(E===void 0)throw new Error("No annotation provided for id ".concat(R));return this._annotations[R]=E,this._size++,R},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var E=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(R){if(Ee.is(R)){var m=new L(R.edits,E._changeAnnotations);E._textEditChanges[R.textDocument.uri]=m}})):k.changes&&Object.keys(k.changes).forEach(function(R){var m=new L(k.changes[R]);E._textEditChanges[R]=m})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(Z.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E={uri:k.uri,version:k.version},R=this._textEditChanges[E.uri];if(!R){var m=[],$={textDocument:E,edits:m};this._workspaceEdit.documentChanges.push($),R=new L(m,this._changeAnnotations),this._textEditChanges[E.uri]=R}return R}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var R=this._textEditChanges[k];if(!R){var m=[];this._workspaceEdit.changes[k]=m,R=new L(m),this._textEditChanges[k]=R}return R}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,E,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(E)||te.is(E)?m=E:R=E;var $,D;if(m===void 0?$=Qe.create(k,R):(D=te.is(m)?m:this._changeAnnotations.manage(m),$=Qe.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,E,R,m){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(R)||te.is(R)?$=R:m=R;var D,ie;if($===void 0?D=V.create(k,E,m):(ie=te.is($)?$:this._changeAnnotations.manage($),D=V.create(k,E,m,ie)),this._workspaceEdit.documentChanges.push(D),ie!==void 0)return ie},g.prototype.deleteFile=function(k,E,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(E)||te.is(E)?m=E:R=E;var $,D;if(m===void 0?$=fe.create(k,R):(D=te.is(m)?m:this._changeAnnotations.manage(m),$=fe.create(k,R,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var ae;(function(g){function k(R){return{uri:R}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)}g.is=E})(ae=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var oe;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.integer(m.version)}g.is=E})(oe=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var Z;(function(g){function k(R,m){return{uri:R,version:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&(m.version===null||N.integer(m.version))}g.is=E})(Z=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var dt;(function(g){function k(R,m,$,D){return{uri:R,languageId:m,version:$,text:D}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.string(m.uri)&&N.string(m.languageId)&&N.integer(m.version)&&N.string(m.text)}g.is=E})(dt=e.TextDocumentItem||(e.TextDocumentItem={}));var tt;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(E){var R=E;return R===g.PlainText||R===g.Markdown}g.is=k})(tt=e.MarkupKind||(e.MarkupKind={}));var Dt;(function(g){function k(E){var R=E;return N.objectLiteral(E)&&tt.is(R.kind)&&N.string(R.value)}g.is=k})(Dt=e.MarkupContent||(e.MarkupContent={}));var cn;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(cn=e.CompletionItemKind||(e.CompletionItemKind={}));var Ir;(function(g){g.PlainText=1,g.Snippet=2})(Ir=e.InsertTextFormat||(e.InsertTextFormat={}));var Eo;(function(g){g.Deprecated=1})(Eo=e.CompletionItemTag||(e.CompletionItemTag={}));var cr;(function(g){function k(R,m,$){return{newText:R,insert:m,replace:$}}g.create=k;function E(R){var m=R;return m&&N.string(m.newText)&&s.is(m.insert)&&s.is(m.replace)}g.is=E})(cr=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var No;(function(g){g.asIs=1,g.adjustIndentation=2})(No=e.InsertTextMode||(e.InsertTextMode={}));var $o;(function(g){function k(E){var R=E;return R&&(N.string(R.detail)||R.detail===void 0)&&(N.string(R.description)||R.description===void 0)}g.is=k})($o=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Oo;(function(g){function k(E){return{label:E}}g.create=k})(Oo=e.CompletionItem||(e.CompletionItem={}));var $u;(function(g){function k(E,R){return{items:E||[],isIncomplete:!!R}}g.create=k})($u=e.CompletionList||(e.CompletionList={}));var gt;(function(g){function k(R){return R.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function E(R){var m=R;return N.string(m)||N.objectLiteral(m)&&N.string(m.language)&&N.string(m.value)}g.is=E})(gt=e.MarkedString||(e.MarkedString={}));var gi;(function(g){function k(E){var R=E;return!!R&&N.objectLiteral(R)&&(Dt.is(R.contents)||gt.is(R.contents)||N.typedArray(R.contents,gt.is))&&(E.range===void 0||s.is(E.range))}g.is=k})(gi=e.Hover||(e.Hover={}));var Ou;(function(g){function k(E,R){return R?{label:E,documentation:R}:{label:E}}g.create=k})(Ou=e.ParameterInformation||(e.ParameterInformation={}));var Mn;(function(g){function k(E,R){for(var m=[],$=2;$<arguments.length;$++)m[$-2]=arguments[$];var D={label:E};return N.defined(R)&&(D.documentation=R),N.defined(m)?D.parameters=m:D.parameters=[],D}g.create=k})(Mn=e.SignatureInformation||(e.SignatureInformation={}));var ja;(function(g){g.Text=1,g.Read=2,g.Write=3})(ja=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Fn;(function(g){function k(E,R){var m={range:E};return N.number(R)&&(m.kind=R),m}g.create=k})(Fn=e.DocumentHighlight||(e.DocumentHighlight={}));var Ga;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(Ga=e.SymbolKind||(e.SymbolKind={}));var Hr;(function(g){g.Deprecated=1})(Hr=e.SymbolTag||(e.SymbolTag={}));var fn;(function(g){function k(E,R,m,$,D){var ie={name:E,kind:R,location:{uri:$,range:m}};return D&&(ie.containerName=D),ie}g.create=k})(fn=e.SymbolInformation||(e.SymbolInformation={}));var Io;(function(g){function k(E,R,m,$){return $!==void 0?{name:E,kind:R,location:{uri:m,range:$}}:{name:E,kind:R,location:{uri:m}}}g.create=k})(Io=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Do;(function(g){function k(R,m,$,D,ie,pt){var Ve={name:R,detail:m,kind:$,range:D,selectionRange:ie};return pt!==void 0&&(Ve.children=pt),Ve}g.create=k;function E(R){var m=R;return m&&N.string(m.name)&&N.number(m.kind)&&s.is(m.range)&&s.is(m.selectionRange)&&(m.detail===void 0||N.string(m.detail))&&(m.deprecated===void 0||N.boolean(m.deprecated))&&(m.children===void 0||Array.isArray(m.children))&&(m.tags===void 0||Array.isArray(m.tags))}g.is=E})(Do=e.DocumentSymbol||(e.DocumentSymbol={}));var Dr;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(Dr=e.CodeActionKind||(e.CodeActionKind={}));var jn;(function(g){g.Invoked=1,g.Automatic=2})(jn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var qt;(function(g){function k(R,m,$){var D={diagnostics:R};return m!=null&&(D.only=m),$!=null&&(D.triggerKind=$),D}g.create=k;function E(R){var m=R;return N.defined(m)&&N.typedArray(m.diagnostics,S.is)&&(m.only===void 0||N.typedArray(m.only,N.string))&&(m.triggerKind===void 0||m.triggerKind===jn.Invoked||m.triggerKind===jn.Automatic)}g.is=E})(qt=e.CodeActionContext||(e.CodeActionContext={}));var dn;(function(g){function k(R,m,$){var D={title:R},ie=!0;return typeof m=="string"?(ie=!1,D.kind=m):O.is(m)?D.command=m:D.edit=m,ie&&$!==void 0&&(D.kind=$),D}g.create=k;function E(R){var m=R;return m&&N.string(m.title)&&(m.diagnostics===void 0||N.typedArray(m.diagnostics,S.is))&&(m.kind===void 0||N.string(m.kind))&&(m.edit!==void 0||m.command!==void 0)&&(m.command===void 0||O.is(m.command))&&(m.isPreferred===void 0||N.boolean(m.isPreferred))&&(m.edit===void 0||q.is(m.edit))}g.is=E})(dn=e.CodeAction||(e.CodeAction={}));var pn;(function(g){function k(R,m){var $={range:R};return N.defined(m)&&($.data=m),$}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.command)||O.is(m.command))}g.is=E})(pn=e.CodeLens||(e.CodeLens={}));var Gn;(function(g){function k(R,m){return{tabSize:R,insertSpaces:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&N.uinteger(m.tabSize)&&N.boolean(m.insertSpaces)}g.is=E})(Gn=e.FormattingOptions||(e.FormattingOptions={}));var P;(function(g){function k(R,m,$){return{range:R,target:m,data:$}}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.target)||N.string(m.target))}g.is=E})(P=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(R,m){return{range:R,parent:m}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&s.is(m.range)&&(m.parent===void 0||g.is(m.parent))}g.is=E})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var je;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&(R.resultId===void 0||typeof R.resultId=="string")&&Array.isArray(R.data)&&(R.data.length===0||typeof R.data[0]=="number")}g.is=k})(je=e.SemanticTokens||(e.SemanticTokens={}));var Ge;(function(g){function k(R,m){return{range:R,text:m}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&N.string(m.text)}g.is=E})(Ge=e.InlineValueText||(e.InlineValueText={}));var rt;(function(g){function k(R,m,$){return{range:R,variableName:m,caseSensitiveLookup:$}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&N.boolean(m.caseSensitiveLookup)&&(N.string(m.variableName)||m.variableName===void 0)}g.is=E})(rt=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var Rt;(function(g){function k(R,m){return{range:R,expression:m}}g.create=k;function E(R){var m=R;return m!=null&&s.is(m.range)&&(N.string(m.expression)||m.expression===void 0)}g.is=E})(Rt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ge;(function(g){function k(R,m){return{frameId:R,stoppedLocation:m}}g.create=k;function E(R){var m=R;return N.defined(m)&&s.is(R.stoppedLocation)}g.is=E})(ge=e.InlineValueContext||(e.InlineValueContext={}));var Be;(function(g){g.Type=1,g.Parameter=2;function k(E){return E===1||E===2}g.is=k})(Be=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function k(R){return{value:R}}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&(m.tooltip===void 0||N.string(m.tooltip)||Dt.is(m.tooltip))&&(m.location===void 0||u.is(m.location))&&(m.command===void 0||O.is(m.command))}g.is=E})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var vt;(function(g){function k(R,m,$){var D={position:R,label:m};return $!==void 0&&(D.kind=$),D}g.create=k;function E(R){var m=R;return N.objectLiteral(m)&&o.is(m.position)&&(N.string(m.label)||N.typedArray(m.label,_e.is))&&(m.kind===void 0||Be.is(m.kind))&&m.textEdits===void 0||N.typedArray(m.textEdits,F.is)&&(m.tooltip===void 0||N.string(m.tooltip)||Dt.is(m.tooltip))&&(m.paddingLeft===void 0||N.boolean(m.paddingLeft))&&(m.paddingRight===void 0||N.boolean(m.paddingRight))}g.is=E})(vt=e.InlayHint||(e.InlayHint={}));var er;(function(g){function k(E){var R=E;return N.objectLiteral(R)&&n.is(R.uri)&&N.string(R.name)}g.is=k})(er=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var vi;(function(g){function k($,D,ie,pt){return new Un($,D,ie,pt)}g.create=k;function E($){var D=$;return!!(N.defined(D)&&N.string(D.uri)&&(N.undefined(D.languageId)||N.string(D.languageId))&&N.uinteger(D.lineCount)&&N.func(D.getText)&&N.func(D.positionAt)&&N.func(D.offsetAt))}g.is=E;function R($,D){for(var ie=$.getText(),pt=m(D,function(xo,Rc){var rA=xo.range.start.line-Rc.range.start.line;return rA===0?xo.range.start.character-Rc.range.start.character:rA}),Ve=ie.length,mn=pt.length-1;mn>=0;mn--){var hn=pt[mn],Ti=$.offsetAt(hn.range.start),ve=$.offsetAt(hn.range.end);if(ve<=Ve)ie=ie.substring(0,Ti)+hn.newText+ie.substring(ve,ie.length);else throw new Error("Overlapping edit");Ve=Ti}return ie}g.applyEdits=R;function m($,D){if($.length<=1)return $;var ie=$.length/2|0,pt=$.slice(0,ie),Ve=$.slice(ie);m(pt,D),m(Ve,D);for(var mn=0,hn=0,Ti=0;mn<pt.length&&hn<Ve.length;){var ve=D(pt[mn],Ve[hn]);ve<=0?$[Ti++]=pt[mn++]:$[Ti++]=Ve[hn++]}for(;mn<pt.length;)$[Ti++]=pt[mn++];for(;hn<Ve.length;)$[Ti++]=Ve[hn++];return $}})(vi=e.TextDocument||(e.TextDocument={}));var Un=function(){function g(k,E,R,m){this._uri=k,this._languageId=E,this._version=R,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var E=this.offsetAt(k.start),R=this.offsetAt(k.end);return this._content.substring(E,R)}return this._content},g.prototype.update=function(k,E){this._content=k.text,this._version=E,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],E=this._content,R=!0,m=0;m<E.length;m++){R&&(k.push(m),R=!1);var $=E.charAt(m);R=$==="\r"||$===`
`,$==="\r"&&m+1<E.length&&E.charAt(m+1)===`
`&&m++}R&&E.length>0&&k.push(E.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var E=this.getLineOffsets(),R=0,m=E.length;if(m===0)return o.create(0,k);for(;R<m;){var $=Math.floor((R+m)/2);E[$]>k?m=$:R=$+1}var D=R-1;return o.create(D,k-E[D])},g.prototype.offsetAt=function(k){var E=this.getLineOffsets();if(k.line>=E.length)return this._content.length;if(k.line<0)return 0;var R=E[k.line],m=k.line+1<E.length?E[k.line+1]:this._content.length;return Math.max(Math.min(R+k.character,m),R)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),N;(function(g){var k=Object.prototype.toString;function E(ve){return typeof ve<"u"}g.defined=E;function R(ve){return typeof ve>"u"}g.undefined=R;function m(ve){return ve===!0||ve===!1}g.boolean=m;function $(ve){return k.call(ve)==="[object String]"}g.string=$;function D(ve){return k.call(ve)==="[object Number]"}g.number=D;function ie(ve,xo,Rc){return k.call(ve)==="[object Number]"&&xo<=ve&&ve<=Rc}g.numberRange=ie;function pt(ve){return k.call(ve)==="[object Number]"&&-2147483648<=ve&&ve<=2147483647}g.integer=pt;function Ve(ve){return k.call(ve)==="[object Number]"&&0<=ve&&ve<=2147483647}g.uinteger=Ve;function mn(ve){return k.call(ve)==="[object Function]"}g.func=mn;function hn(ve){return ve!==null&&typeof ve=="object"}g.objectLiteral=hn;function Ti(ve,xo){return Array.isArray(ve)&&ve.every(xo)}g.typedArray=Ti})(N||(N={}))})});var ct=d(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Ho=bi(),NF;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(NF=dr.MessageDirection||(dr.MessageDirection={}));var Bh=class{constructor(e){this.method=e}};dr.RegistrationType=Bh;var Vh=class extends Ho.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=Vh;var zh=class extends Ho.RequestType{constructor(e){super(e,Ho.ParameterStructures.byName)}};dr.ProtocolRequestType=zh;var Yh=class extends Ho.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=Yh;var Xh=class extends Ho.NotificationType{constructor(e){super(e,Ho.ParameterStructures.byName)}};dr.ProtocolNotificationType=Xh});var $c=d(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.objectLiteral=At.typedArray=At.stringArray=At.array=At.func=At.error=At.number=At.string=At.boolean=void 0;function $F(t){return t===!0||t===!1}At.boolean=$F;function kA(t){return typeof t=="string"||t instanceof String}At.string=kA;function OF(t){return typeof t=="number"||t instanceof Number}At.number=OF;function IF(t){return t instanceof Error}At.error=IF;function DF(t){return typeof t=="function"}At.func=DF;function wA(t){return Array.isArray(t)}At.array=wA;function xF(t){return wA(t)&&t.every(e=>kA(e))}At.stringArray=xF;function LF(t,e){return Array.isArray(t)&&t.every(e)}At.typedArray=LF;function qF(t){return t!==null&&typeof t=="object"}At.objectLiteral=qF});var NA=d(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.ImplementationRequest=void 0;var EA=ct(),MF;(function(t){t.method="textDocument/implementation",t.messageDirection=EA.MessageDirection.clientToServer,t.type=new EA.ProtocolRequestType(t.method)})(MF=Fu.ImplementationRequest||(Fu.ImplementationRequest={}))});var OA=d(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.TypeDefinitionRequest=void 0;var $A=ct(),FF;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=$A.MessageDirection.clientToServer,t.type=new $A.ProtocolRequestType(t.method)})(FF=ju.TypeDefinitionRequest||(ju.TypeDefinitionRequest={}))});var IA=d(Zi=>{"use strict";Object.defineProperty(Zi,"__esModule",{value:!0});Zi.DidChangeWorkspaceFoldersNotification=Zi.WorkspaceFoldersRequest=void 0;var Oc=ct(),jF;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Oc.MessageDirection.serverToClient,t.type=new Oc.ProtocolRequestType0(t.method)})(jF=Zi.WorkspaceFoldersRequest||(Zi.WorkspaceFoldersRequest={}));var GF;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Oc.MessageDirection.clientToServer,t.type=new Oc.ProtocolNotificationType(t.method)})(GF=Zi.DidChangeWorkspaceFoldersNotification||(Zi.DidChangeWorkspaceFoldersNotification={}))});var xA=d(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.ConfigurationRequest=void 0;var DA=ct(),UF;(function(t){t.method="workspace/configuration",t.messageDirection=DA.MessageDirection.serverToClient,t.type=new DA.ProtocolRequestType(t.method)})(UF=Gu.ConfigurationRequest||(Gu.ConfigurationRequest={}))});var LA=d(ea=>{"use strict";Object.defineProperty(ea,"__esModule",{value:!0});ea.ColorPresentationRequest=ea.DocumentColorRequest=void 0;var Ic=ct(),HF;(function(t){t.method="textDocument/documentColor",t.messageDirection=Ic.MessageDirection.clientToServer,t.type=new Ic.ProtocolRequestType(t.method)})(HF=ea.DocumentColorRequest||(ea.DocumentColorRequest={}));var KF;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Ic.MessageDirection.clientToServer,t.type=new Ic.ProtocolRequestType(t.method)})(KF=ea.ColorPresentationRequest||(ea.ColorPresentationRequest={}))});var MA=d(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.FoldingRangeRequest=void 0;var qA=ct(),WF;(function(t){t.method="textDocument/foldingRange",t.messageDirection=qA.MessageDirection.clientToServer,t.type=new qA.ProtocolRequestType(t.method)})(WF=Uu.FoldingRangeRequest||(Uu.FoldingRangeRequest={}))});var jA=d(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.DeclarationRequest=void 0;var FA=ct(),BF;(function(t){t.method="textDocument/declaration",t.messageDirection=FA.MessageDirection.clientToServer,t.type=new FA.ProtocolRequestType(t.method)})(BF=Hu.DeclarationRequest||(Hu.DeclarationRequest={}))});var UA=d(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.SelectionRangeRequest=void 0;var GA=ct(),VF;(function(t){t.method="textDocument/selectionRange",t.messageDirection=GA.MessageDirection.clientToServer,t.type=new GA.ProtocolRequestType(t.method)})(VF=Ku.SelectionRangeRequest||(Ku.SelectionRangeRequest={}))});var HA=d(vn=>{"use strict";Object.defineProperty(vn,"__esModule",{value:!0});vn.WorkDoneProgressCancelNotification=vn.WorkDoneProgressCreateRequest=vn.WorkDoneProgress=void 0;var zF=bi(),Dc=ct(),YF;(function(t){t.type=new zF.ProgressType;function e(r){return r===t.type}t.is=e})(YF=vn.WorkDoneProgress||(vn.WorkDoneProgress={}));var XF;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Dc.MessageDirection.serverToClient,t.type=new Dc.ProtocolRequestType(t.method)})(XF=vn.WorkDoneProgressCreateRequest||(vn.WorkDoneProgressCreateRequest={}));var JF;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Dc.MessageDirection.clientToServer,t.type=new Dc.ProtocolNotificationType(t.method)})(JF=vn.WorkDoneProgressCancelNotification||(vn.WorkDoneProgressCancelNotification={}))});var KA=d(Tn=>{"use strict";Object.defineProperty(Tn,"__esModule",{value:!0});Tn.CallHierarchyOutgoingCallsRequest=Tn.CallHierarchyIncomingCallsRequest=Tn.CallHierarchyPrepareRequest=void 0;var Ko=ct(),QF;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(QF=Tn.CallHierarchyPrepareRequest||(Tn.CallHierarchyPrepareRequest={}));var ZF;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(ZF=Tn.CallHierarchyIncomingCallsRequest||(Tn.CallHierarchyIncomingCallsRequest={}));var ej;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(ej=Tn.CallHierarchyOutgoingCallsRequest||(Tn.CallHierarchyOutgoingCallsRequest={}))});var WA=d(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Pi=ct(),tj;(function(t){t.Relative="relative"})(tj=St.TokenFormat||(St.TokenFormat={}));var xc;(function(t){t.method="textDocument/semanticTokens",t.type=new Pi.RegistrationType(t.method)})(xc=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var rj;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=xc.method})(rj=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var nj;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=xc.method})(nj=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var ij;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType(t.method),t.registrationMethod=xc.method})(ij=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var aj;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Pi.MessageDirection.clientToServer,t.type=new Pi.ProtocolRequestType0(t.method)})(aj=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var VA=d(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.ShowDocumentRequest=void 0;var BA=ct(),oj;(function(t){t.method="window/showDocument",t.messageDirection=BA.MessageDirection.serverToClient,t.type=new BA.ProtocolRequestType(t.method)})(oj=Wu.ShowDocumentRequest||(Wu.ShowDocumentRequest={}))});var YA=d(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.LinkedEditingRangeRequest=void 0;var zA=ct(),sj;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=zA.MessageDirection.clientToServer,t.type=new zA.ProtocolRequestType(t.method)})(sj=Bu.LinkedEditingRangeRequest||(Bu.LinkedEditingRangeRequest={}))});var XA=d(ft=>{"use strict";Object.defineProperty(ft,"__esModule",{value:!0});ft.WillDeleteFilesRequest=ft.DidDeleteFilesNotification=ft.DidRenameFilesNotification=ft.WillRenameFilesRequest=ft.DidCreateFilesNotification=ft.WillCreateFilesRequest=ft.FileOperationPatternKind=void 0;var Kr=ct(),uj;(function(t){t.file="file",t.folder="folder"})(uj=ft.FileOperationPatternKind||(ft.FileOperationPatternKind={}));var lj;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(lj=ft.WillCreateFilesRequest||(ft.WillCreateFilesRequest={}));var cj;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(cj=ft.DidCreateFilesNotification||(ft.DidCreateFilesNotification={}));var fj;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(fj=ft.WillRenameFilesRequest||(ft.WillRenameFilesRequest={}));var dj;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(dj=ft.DidRenameFilesNotification||(ft.DidRenameFilesNotification={}));var pj;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(pj=ft.DidDeleteFilesNotification||(ft.DidDeleteFilesNotification={}));var mj;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(mj=ft.WillDeleteFilesRequest||(ft.WillDeleteFilesRequest={}))});var QA=d(_n=>{"use strict";Object.defineProperty(_n,"__esModule",{value:!0});_n.MonikerRequest=_n.MonikerKind=_n.UniquenessLevel=void 0;var JA=ct(),hj;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(hj=_n.UniquenessLevel||(_n.UniquenessLevel={}));var yj;(function(t){t.$import="import",t.$export="export",t.local="local"})(yj=_n.MonikerKind||(_n.MonikerKind={}));var gj;(function(t){t.method="textDocument/moniker",t.messageDirection=JA.MessageDirection.clientToServer,t.type=new JA.ProtocolRequestType(t.method)})(gj=_n.MonikerRequest||(_n.MonikerRequest={}))});var ZA=d(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.TypeHierarchySubtypesRequest=Rn.TypeHierarchySupertypesRequest=Rn.TypeHierarchyPrepareRequest=void 0;var Wo=ct(),vj;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(vj=Rn.TypeHierarchyPrepareRequest||(Rn.TypeHierarchyPrepareRequest={}));var Tj;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(Tj=Rn.TypeHierarchySupertypesRequest||(Rn.TypeHierarchySupertypesRequest={}));var _j;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(_j=Rn.TypeHierarchySubtypesRequest||(Rn.TypeHierarchySubtypesRequest={}))});var e0=d(ta=>{"use strict";Object.defineProperty(ta,"__esModule",{value:!0});ta.InlineValueRefreshRequest=ta.InlineValueRequest=void 0;var Lc=ct(),Rj;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Lc.MessageDirection.clientToServer,t.type=new Lc.ProtocolRequestType(t.method)})(Rj=ta.InlineValueRequest||(ta.InlineValueRequest={}));var Aj;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Lc.MessageDirection.clientToServer,t.type=new Lc.ProtocolRequestType0(t.method)})(Aj=ta.InlineValueRefreshRequest||(ta.InlineValueRefreshRequest={}))});var t0=d(An=>{"use strict";Object.defineProperty(An,"__esModule",{value:!0});An.InlayHintRefreshRequest=An.InlayHintResolveRequest=An.InlayHintRequest=void 0;var Bo=ct(),Sj;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(Sj=An.InlayHintRequest||(An.InlayHintRequest={}));var bj;(function(t){t.method="inlayHint/resolve",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(bj=An.InlayHintResolveRequest||(An.InlayHintResolveRequest={}));var Pj;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType0(t.method)})(Pj=An.InlayHintRefreshRequest||(An.InlayHintRefreshRequest={}))});var n0=d(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});Vt.DiagnosticRefreshRequest=Vt.WorkspaceDiagnosticRequest=Vt.DocumentDiagnosticRequest=Vt.DocumentDiagnosticReportKind=Vt.DiagnosticServerCancellationData=void 0;var r0=bi(),Cj=$c(),Vo=ct(),kj;(function(t){function e(r){let n=r;return n&&Cj.boolean(n.retriggerRequest)}t.is=e})(kj=Vt.DiagnosticServerCancellationData||(Vt.DiagnosticServerCancellationData={}));var wj;(function(t){t.Full="full",t.Unchanged="unchanged"})(wj=Vt.DocumentDiagnosticReportKind||(Vt.DocumentDiagnosticReportKind={}));var Ej;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method),t.partialResult=new r0.ProgressType})(Ej=Vt.DocumentDiagnosticRequest||(Vt.DocumentDiagnosticRequest={}));var Nj;(function(t){t.method="workspace/diagnostic",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method),t.partialResult=new r0.ProgressType})(Nj=Vt.WorkspaceDiagnosticRequest||(Vt.WorkspaceDiagnosticRequest={}));var $j;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType0(t.method)})($j=Vt.DiagnosticRefreshRequest||(Vt.DiagnosticRefreshRequest={}))});var o0=d(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.DidCloseNotebookDocumentNotification=Ae.DidSaveNotebookDocumentNotification=Ae.DidChangeNotebookDocumentNotification=Ae.NotebookCellArrayChange=Ae.DidOpenNotebookDocumentNotification=Ae.NotebookDocumentSyncRegistrationType=Ae.NotebookDocument=Ae.NotebookCell=Ae.ExecutionSummary=Ae.NotebookCellKind=void 0;var Vu=Uo(),Sn=$c(),Hn=ct(),i0;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(i0=Ae.NotebookCellKind||(Ae.NotebookCellKind={}));var a0;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return Sn.objectLiteral(a)&&Vu.uinteger.is(a.executionOrder)&&(a.success===void 0||Sn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(a0=Ae.ExecutionSummary||(Ae.ExecutionSummary={}));var Jh;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return Sn.objectLiteral(o)&&i0.is(o.kind)&&Vu.DocumentUri.is(o.document)&&(o.metadata===void 0||Sn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!a0.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(Sn.objectLiteral(a)&&Sn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let h=l[f];if(!i(a[h],o[h]))return!1}}return!0}})(Jh=Ae.NotebookCell||(Ae.NotebookCell={}));var Oj;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return Sn.objectLiteral(i)&&Sn.string(i.uri)&&Vu.integer.is(i.version)&&Sn.typedArray(i.cells,Jh.is)}t.is=r})(Oj=Ae.NotebookDocument||(Ae.NotebookDocument={}));var zu;(function(t){t.method="notebookDocument/sync",t.messageDirection=Hn.MessageDirection.clientToServer,t.type=new Hn.RegistrationType(t.method)})(zu=Ae.NotebookDocumentSyncRegistrationType||(Ae.NotebookDocumentSyncRegistrationType={}));var Ij;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Hn.MessageDirection.clientToServer,t.type=new Hn.ProtocolNotificationType(t.method),t.registrationMethod=zu.method})(Ij=Ae.DidOpenNotebookDocumentNotification||(Ae.DidOpenNotebookDocumentNotification={}));var Dj;(function(t){function e(n){let i=n;return Sn.objectLiteral(i)&&Vu.uinteger.is(i.start)&&Vu.uinteger.is(i.deleteCount)&&(i.cells===void 0||Sn.typedArray(i.cells,Jh.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(Dj=Ae.NotebookCellArrayChange||(Ae.NotebookCellArrayChange={}));var xj;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Hn.MessageDirection.clientToServer,t.type=new Hn.ProtocolNotificationType(t.method),t.registrationMethod=zu.method})(xj=Ae.DidChangeNotebookDocumentNotification||(Ae.DidChangeNotebookDocumentNotification={}));var Lj;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Hn.MessageDirection.clientToServer,t.type=new Hn.ProtocolNotificationType(t.method),t.registrationMethod=zu.method})(Lj=Ae.DidSaveNotebookDocumentNotification||(Ae.DidSaveNotebookDocumentNotification={}));var qj;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Hn.MessageDirection.clientToServer,t.type=new Hn.ProtocolNotificationType(t.method),t.registrationMethod=zu.method})(qj=Ae.DidCloseNotebookDocumentNotification||(Ae.DidCloseNotebookDocumentNotification={}))});var h0=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=ct(),s0=Uo(),zt=$c(),Mj=NA();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return Mj.ImplementationRequest}});var Fj=OA();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return Fj.TypeDefinitionRequest}});var u0=IA();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return u0.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return u0.DidChangeWorkspaceFoldersNotification}});var jj=xA();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return jj.ConfigurationRequest}});var l0=LA();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return l0.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return l0.ColorPresentationRequest}});var Gj=MA();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return Gj.FoldingRangeRequest}});var Uj=jA();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return Uj.DeclarationRequest}});var Hj=UA();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return Hj.SelectionRangeRequest}});var Qh=HA();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return Qh.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Qh.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Qh.WorkDoneProgressCancelNotification}});var Zh=KA();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Zh.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Zh.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Zh.CallHierarchyPrepareRequest}});var zo=WA();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return zo.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return zo.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return zo.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return zo.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return zo.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return zo.SemanticTokensRegistrationType}});var Kj=VA();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return Kj.ShowDocumentRequest}});var Wj=YA();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return Wj.LinkedEditingRangeRequest}});var Ba=XA();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return Ba.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Ba.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Ba.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Ba.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Ba.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Ba.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Ba.WillDeleteFilesRequest}});var ey=QA();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return ey.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return ey.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return ey.MonikerRequest}});var ty=ZA();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return ty.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return ty.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return ty.TypeHierarchySupertypesRequest}});var c0=e0();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return c0.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return c0.InlineValueRefreshRequest}});var ry=t0();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return ry.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return ry.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return ry.InlayHintRefreshRequest}});var Yu=n0();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Yu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Yu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Yu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Yu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Yu.DiagnosticRefreshRequest}});var Kn=o0();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return Kn.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return Kn.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return Kn.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return Kn.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Kn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Kn.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Kn.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Kn.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Kn.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Kn.DidCloseNotebookDocumentNotification}});var f0;(function(t){function e(r){let n=r;return zt.string(n.language)||zt.string(n.scheme)||zt.string(n.pattern)}t.is=e})(f0=T.TextDocumentFilter||(T.TextDocumentFilter={}));var d0;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebookType)||zt.string(n.scheme)||zt.string(n.pattern))}t.is=e})(d0=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var p0;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebook)||d0.is(n.notebook))&&(n.language===void 0||zt.string(n.language))}t.is=e})(p0=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var m0;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!zt.string(n)&&!f0.is(n)&&!p0.is(n))return!1;return!0}t.is=e})(m0=T.DocumentSelector||(T.DocumentSelector={}));var Bj;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(Bj=T.RegistrationRequest||(T.RegistrationRequest={}));var Vj;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(Vj=T.UnregistrationRequest||(T.UnregistrationRequest={}));var zj;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(zj=T.ResourceOperationKind||(T.ResourceOperationKind={}));var Yj;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(Yj=T.FailureHandlingKind||(T.FailureHandlingKind={}));var Xj;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(Xj=T.PositionEncodingKind||(T.PositionEncodingKind={}));var Jj;(function(t){function e(r){let n=r;return n&&zt.string(n.id)&&n.id.length>0}t.hasId=e})(Jj=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var Qj;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||m0.is(n.documentSelector))}t.is=e})(Qj=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var Zj;(function(t){function e(n){let i=n;return zt.objectLiteral(i)&&(i.workDoneProgress===void 0||zt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&zt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(Zj=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var eG;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(eG=T.InitializeRequest||(T.InitializeRequest={}));var tG;(function(t){t.unknownProtocolVersion=1})(tG=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var rG;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(rG=T.InitializedNotification||(T.InitializedNotification={}));var nG;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(nG=T.ShutdownRequest||(T.ShutdownRequest={}));var iG;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(iG=T.ExitNotification||(T.ExitNotification={}));var aG;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(aG=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var oG;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(oG=T.MessageType||(T.MessageType={}));var sG;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(sG=T.ShowMessageNotification||(T.ShowMessageNotification={}));var uG;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(uG=T.ShowMessageRequest||(T.ShowMessageRequest={}));var lG;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(lG=T.LogMessageNotification||(T.LogMessageNotification={}));var cG;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(cG=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var fG;(function(t){t.None=0,t.Full=1,t.Incremental=2})(fG=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var dG;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(dG=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var pG;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(pG=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var mG;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(mG=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var hG;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(hG=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var yG;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(yG=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var gG;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(gG=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var vG;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(vG=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var TG;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(TG=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var _G;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(_G=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var RG;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(RG=T.FileChangeType||(T.FileChangeType={}));var AG;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(s0.URI.is(n.baseUri)||s0.WorkspaceFolder.is(n.baseUri))&&zt.string(n.pattern)}t.is=e})(AG=T.RelativePattern||(T.RelativePattern={}));var SG;(function(t){t.Create=1,t.Change=2,t.Delete=4})(SG=T.WatchKind||(T.WatchKind={}));var bG;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(bG=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var PG;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(PG=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var CG;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CG=T.CompletionRequest||(T.CompletionRequest={}));var kG;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(kG=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var wG;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(wG=T.HoverRequest||(T.HoverRequest={}));var EG;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(EG=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var NG;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NG=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var $G;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($G=T.DefinitionRequest||(T.DefinitionRequest={}));var OG;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OG=T.ReferencesRequest||(T.ReferencesRequest={}));var IG;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(IG=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var DG;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DG=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var xG;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(xG=T.CodeActionRequest||(T.CodeActionRequest={}));var LG;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LG=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var qG;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(qG=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var MG;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MG=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var FG;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(FG=T.CodeLensRequest||(T.CodeLensRequest={}));var jG;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(jG=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var GG;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(GG=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var UG;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(UG=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var HG;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(HG=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var KG;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(KG=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var WG;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(WG=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var BG;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(BG=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var VG;(function(t){t.Identifier=1})(VG=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var zG;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(zG=T.RenameRequest||(T.RenameRequest={}));var YG;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(YG=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var XG;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(XG=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var JG;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(JG=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var g0=d(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.createProtocolConnection=void 0;var y0=bi();function QG(t,e,r,n){return y0.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,y0.createMessageConnection)(t,e,r,n)}qc.createProtocolConnection=QG});var v0=d(pr=>{"use strict";var ZG=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Mc=pr&&pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ZG(e,t,r)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;Mc(bi(),pr);Mc(Uo(),pr);Mc(ct(),pr);Mc(h0(),pr);var eU=g0();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return eU.createProtocolConnection}});var tU;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(tU=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var bt=d(Wn=>{"use strict";var rU=Wn&&Wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),T0=Wn&&Wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&rU(e,t,r)};Object.defineProperty(Wn,"__esModule",{value:!0});Wn.createProtocolConnection=void 0;var nU=Wh();T0(Wh(),Wn);T0(v0(),Wn);function iU(t,e,r,n){return(0,nU.createMessageConnection)(t,e,r,n)}Wn.createProtocolConnection=iU});var iy=d(ra=>{"use strict";Object.defineProperty(ra,"__esModule",{value:!0});ra.SemanticTokensBuilder=ra.SemanticTokensDiff=ra.SemanticTokensFeature=void 0;var Fc=bt(),aU=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Fc.SemanticTokensRefreshRequest.type),on:e=>{let r=Fc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Fc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Fc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};ra.SemanticTokensFeature=aU;var jc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};ra.SemanticTokensDiff=jc;var ny=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new jc(this._prevData,this._data).computeDiff()}:this.build()}};ra.SemanticTokensBuilder=ny});var oy=d(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.TextDocuments=void 0;var Va=bt(),ay=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Va.Emitter,this._onDidOpen=new Va.Emitter,this._onDidClose=new Va.Emitter,this._onDidSave=new Va.Emitter,this._onWillSave=new Va.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Va.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Va.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Gc.TextDocuments=ay});var uy=d(Yo=>{"use strict";Object.defineProperty(Yo,"__esModule",{value:!0});Yo.NotebookDocuments=Yo.NotebookSyncFeature=void 0;var Wr=bt(),_0=oy(),oU=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Wr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Wr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Wr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Wr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Yo.NotebookSyncFeature=oU;var na=class{onDidOpenTextDocument(e){return this.openHandler=e,Wr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Wr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Wr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return na.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return na.NULL_DISPOSE}onDidSaveTextDocument(){return na.NULL_DISPOSE}};na.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var sy=class{constructor(e){e instanceof _0.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new _0.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Wr.Emitter,this._onDidChange=new Wr.Emitter,this._onDidSave=new Wr.Emitter,this._onDidClose=new Wr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new na,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],h=[];if(u.cells!==void 0){let C=u.cells;if(C.structure!==void 0){let b=C.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),C.structure.didOpen!==void 0)for(let S of C.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(C.structure.didClose)for(let S of C.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(C.data!==void 0){let b=new Map(C.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(C.textContent!==void 0)for(let b of C.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),h.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let C of l)y.push(this.getNotebookCell(C));let A=[];for(let C of c)A.push(this.getNotebookCell(C));let w=[];for(let C of h)w.push(this.getNotebookCell(C));(y.length>0||A.length>0||f.length>0||w.length>0)&&(v.cells={added:y,removed:A,changed:{data:f,textContent:w}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Wr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Yo.NotebookDocuments=sy});var ly=d(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.thenable=Pt.typedArray=Pt.stringArray=Pt.array=Pt.func=Pt.error=Pt.number=Pt.string=Pt.boolean=void 0;function sU(t){return t===!0||t===!1}Pt.boolean=sU;function R0(t){return typeof t=="string"||t instanceof String}Pt.string=R0;function uU(t){return typeof t=="number"||t instanceof Number}Pt.number=uU;function lU(t){return t instanceof Error}Pt.error=lU;function A0(t){return typeof t=="function"}Pt.func=A0;function S0(t){return Array.isArray(t)}Pt.array=S0;function cU(t){return S0(t)&&t.every(e=>R0(e))}Pt.stringArray=cU;function fU(t,e){return Array.isArray(t)&&t.every(e)}Pt.typedArray=fU;function dU(t){return t&&A0(t.then)}Pt.thenable=dU});var cy=d(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var Xu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},se=class extends Xu{constructor(){super([se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-","4",se._randomHex(),se._randomHex(),se._randomHex(),"-",se._oneOf(se._timeHighBits),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return se._oneOf(se._chars)}};se._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];se._timeHighBits=["8","9","a","b"];Br.empty=new Xu("00000000-0000-0000-0000-000000000000");function b0(){return new se}Br.v4=b0;var pU=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function P0(t){return pU.test(t)}Br.isUUID=P0;function mU(t){if(!P0(t))throw new Error("invalid uuid");return new Xu(t)}Br.parse=mU;function hU(){return b0().asHex()}Br.generateUuid=hU});var C0=d(aa=>{"use strict";Object.defineProperty(aa,"__esModule",{value:!0});aa.attachPartialResult=aa.ProgressFeature=aa.attachWorkDone=void 0;var ia=bt(),yU=cy(),Bn=class{constructor(e,r){this._connection=e,this._token=r,Bn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,n)}done(){Bn.Instances.delete(this._token),this._connection.sendProgress(ia.WorkDoneProgress.type,this._token,{kind:"end"})}};Bn.Instances=new Map;var Uc=class extends Bn{constructor(e,r){super(e,r),this._source=new ia.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ju=class{constructor(){}begin(){}report(){}done(){}},Hc=class extends Ju{constructor(){super(),this._source=new ia.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function gU(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ju;let r=e.workDoneToken;return delete e.workDoneToken,new Bn(t,r)}aa.attachWorkDone=gU;var vU=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(ia.WorkDoneProgressCancelNotification.type,r=>{let n=Bn.Instances.get(r.token);(n instanceof Uc||n instanceof Hc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ju:new Bn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,yU.generateUuid)();return this.connection.sendRequest(ia.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Uc(this.connection,e))}else return Promise.resolve(new Hc)}};aa.ProgressFeature=vU;var fy;(function(t){t.type=new ia.ProgressType})(fy||(fy={}));var dy=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(fy.type,this._token,e)}};function TU(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new dy(t,r)}aa.attachPartialResult=TU});var k0=d(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.ConfigurationFeature=void 0;var _U=bt(),RU=ly(),AU=t=>class extends t{getConfiguration(e){return e?RU.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(_U.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Kc.ConfigurationFeature=AU});var w0=d(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.WorkspaceFoldersFeature=void 0;var Wc=bt(),SU=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Wc.Emitter,this.connection.onNotification(Wc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Wc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Wc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Bc.WorkspaceFoldersFeature=SU});var E0=d(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.CallHierarchyFeature=void 0;var py=bt(),bU=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(py.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=py.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=py.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Vc.CallHierarchyFeature=bU});var N0=d(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.ShowDocumentFeature=void 0;var PU=bt(),CU=t=>class extends t{showDocument(e){return this.connection.sendRequest(PU.ShowDocumentRequest.type,e)}};zc.ShowDocumentFeature=CU});var $0=d(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.FileOperationsFeature=void 0;var Xo=bt(),kU=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Xo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Xo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Xo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Xo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Xo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Xo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Yc.FileOperationsFeature=kU});var O0=d(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.LinkedEditingRangeFeature=void 0;var wU=bt(),EU=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(wU.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Xc.LinkedEditingRangeFeature=EU});var I0=d(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.TypeHierarchyFeature=void 0;var my=bt(),NU=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(my.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=my.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=my.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Jc.TypeHierarchyFeature=NU});var x0=d(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.InlineValueFeature=void 0;var D0=bt(),$U=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(D0.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(D0.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Qc.InlineValueFeature=$U});var L0=d(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.InlayHintFeature=void 0;var hy=bt(),OU=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(hy.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(hy.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(hy.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Zc.InlayHintFeature=OU});var q0=d(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.DiagnosticFeature=void 0;var Qu=bt(),IU=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Qu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Qu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Qu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Qu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Qu.WorkspaceDiagnosticRequest.partialResult,r)))}}};ef.DiagnosticFeature=IU});var M0=d(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.MonikerFeature=void 0;var DU=bt(),xU=t=>class extends t{get moniker(){return{on:e=>{let r=DU.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};tf.MonikerFeature=xU});var J0=d(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.createConnection=Te.combineFeatures=Te.combineNotebooksFeatures=Te.combineLanguagesFeatures=Te.combineWorkspaceFeatures=Te.combineWindowFeatures=Te.combineClientFeatures=Te.combineTracerFeatures=Te.combineTelemetryFeatures=Te.combineConsoleFeatures=Te._NotebooksImpl=Te._LanguagesImpl=Te.BulkUnregistration=Te.BulkRegistration=Te.ErrorMessageTracker=void 0;var H=bt(),Vr=ly(),gy=cy(),ne=C0(),LU=k0(),qU=w0(),MU=E0(),FU=iy(),jU=N0(),GU=$0(),UU=O0(),HU=I0(),KU=x0(),WU=L0(),BU=q0(),VU=uy(),zU=M0();function yy(t){if(t!==null)return t}var vy=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};Te.ErrorMessageTracker=vy;var rf=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Ty=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(yy)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(yy)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(yy)}},F0=(0,jU.ShowDocumentFeature)((0,ne.ProgressFeature)(Ty)),YU;(function(t){function e(){return new nf}t.create=e})(YU=Te.BulkRegistration||(Te.BulkRegistration={}));var nf=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Vr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=gy.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},XU;(function(t){function e(){return new Zu(void 0,[])}t.create=e})(XU=Te.BulkUnregistration||(Te.BulkUnregistration={}));var Zu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Vr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},af=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof nf?this.registerMany(e):e instanceof Zu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Vr.string(r)?r:r.method,a=gy.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Vr.string(e)?e:e.method,i=gy.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new Zu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},_y=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},j0=(0,GU.FileOperationsFeature)((0,qU.WorkspaceFoldersFeature)((0,LU.ConfigurationFeature)(_y))),of=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},sf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},uf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ne.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ne.attachPartialResult)(this.connection,r)}};Te._LanguagesImpl=uf;var G0=(0,zU.MonikerFeature)((0,BU.DiagnosticFeature)((0,WU.InlayHintFeature)((0,KU.InlineValueFeature)((0,HU.TypeHierarchyFeature)((0,UU.LinkedEditingRangeFeature)((0,FU.SemanticTokensFeature)((0,MU.CallHierarchyFeature)(uf)))))))),lf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ne.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ne.attachPartialResult)(this.connection,r)}};Te._NotebooksImpl=lf;var U0=(0,VU.NotebookSyncFeature)(lf);function H0(t,e){return function(r){return e(t(r))}}Te.combineConsoleFeatures=H0;function K0(t,e){return function(r){return e(t(r))}}Te.combineTelemetryFeatures=K0;function W0(t,e){return function(r){return e(t(r))}}Te.combineTracerFeatures=W0;function B0(t,e){return function(r){return e(t(r))}}Te.combineClientFeatures=B0;function V0(t,e){return function(r){return e(t(r))}}Te.combineWindowFeatures=V0;function z0(t,e){return function(r){return e(t(r))}}Te.combineWorkspaceFeatures=z0;function Y0(t,e){return function(r){return e(t(r))}}Te.combineLanguagesFeatures=Y0;function X0(t,e){return function(r){return e(t(r))}}Te.combineNotebooksFeatures=X0;function JU(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,H0),tracer:r(t.tracer,e.tracer,W0),telemetry:r(t.telemetry,e.telemetry,K0),client:r(t.client,e.client,B0),window:r(t.window,e.window,V0),workspace:r(t.workspace,e.workspace,z0),languages:r(t.languages,e.languages,Y0),notebooks:r(t.notebooks,e.notebooks,X0)}}Te.combineFeatures=JU;function QU(t,e,r){let n=r&&r.console?new(r.console(rf)):new rf,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(of)):new of,o=r&&r.telemetry?new(r.telemetry(sf)):new sf,s=r&&r.client?new(r.client(af)):new af,u=r&&r.window?new(r.window(F0)):new F0,l=r&&r.workspace?new(r.workspace(j0)):new j0,c=r&&r.languages?new(r.languages(G0)):new G0,f=r&&r.notebooks?new(r.notebooks(U0)):new U0,h=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:Vr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let y,A,w,C={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(Vr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=Vr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(A=b,{dispose:()=>{A=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(y=b,{dispose:()=>{y=void 0}}),onExit:b=>(w=b,{dispose:()=>{w=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),(0,ne.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ne.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of h)b.attach(C);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),Vr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of h)S.initialize(b.capabilities);if(A){let S=A(b,new H.CancellationTokenSource().token,(0,ne.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Vr.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None:!Vr.number(W.textDocumentSync)&&!Vr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Vr.number(C.__textDocumentSync)?C.__textDocumentSync:H.TextDocumentSyncKind.None);for(let te of h)te.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of h)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{w&&w()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),C}Te.createConnection=QU});var Ry=d(Yt=>{"use strict";var ZU=Yt&&Yt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Q0=Yt&&Yt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ZU(e,t,r)};Object.defineProperty(Yt,"__esModule",{value:!0});Yt.ProposedFeatures=Yt.NotebookDocuments=Yt.TextDocuments=Yt.SemanticTokensBuilder=void 0;var e2=iy();Object.defineProperty(Yt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return e2.SemanticTokensBuilder}});Q0(bt(),Yt);var t2=oy();Object.defineProperty(Yt,"TextDocuments",{enumerable:!0,get:function(){return t2.TextDocuments}});var r2=uy();Object.defineProperty(Yt,"NotebookDocuments",{enumerable:!0,get:function(){return r2.NotebookDocuments}});Q0(J0(),Yt);var n2;(function(t){t.all={__brand:"features"}})(n2=Yt.ProposedFeatures||(Yt.ProposedFeatures={}))});var eS=d((mhe,Z0)=>{"use strict";Z0.exports=bt()});var xe=d(Vn=>{"use strict";var i2=Vn&&Vn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),rS=Vn&&Vn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&i2(e,t,r)};Object.defineProperty(Vn,"__esModule",{value:!0});Vn.createConnection=void 0;var cf=Ry();rS(eS(),Vn);rS(Ry(),Vn);var tS=!1,a2={initialize:t=>{},get shutdownReceived(){return tS},set shutdownReceived(t){tS=t},exit:t=>{}};function o2(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),cf.ConnectionStrategy.is(t)||cf.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,cf.createProtocolConnection)(a,o,l,s);return(0,cf.createConnection)(u,a2,i)}Vn.createConnection=o2});var Ay=d((df,ff)=>{var s2=df&&df.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof ff=="object"&&typeof ff.exports=="object"){var e=t(Ac,df);e!==void 0&&(ff.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,h){this._uri=l,this._languageId=c,this._version=f,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,h=l;f<h.length;f++){var v=h[f];if(u.isIncremental(v)){var y=o(v.range),A=this.offsetAt(y.start),w=this.offsetAt(y.end);this._content=this._content.substring(0,A)+v.text+this._content.substring(w,this._content.length);var C=Math.max(y.start.line,0),b=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,A);if(b-C===O.length)for(var F=0,W=O.length;F<W;F++)S[F+C+1]=O[F];else O.length<1e4?S.splice.apply(S,s2([C+1,b-C],O,!1)):this._lineOffsets=S=S.slice(0,C+1).concat(O,S.slice(b+1));var te=v.text.length-(w-A);if(te!==0)for(var F=C+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+te}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,h=c.length;if(h===0)return{line:0,character:l};for(;f<h;){var v=Math.floor((f+h)/2);c[v]>l?h=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],h=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,h),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(h,v,y,A){return new r(h,v,y,A)}u.create=l;function c(h,v,y){if(h instanceof r)return h.update(v,y),h;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(h,v){for(var y=h.getText(),A=i(v.map(s),function(W,te){var we=W.range.start.line-te.range.start.line;return we===0?W.range.start.character-te.range.start.character:we}),w=0,C=[],b=0,S=A;b<S.length;b++){var O=S[b],F=h.offsetAt(O.range.start);if(F<w)throw new Error("Overlapping edit");F>w&&C.push(y.substring(w,F)),O.newText.length&&C.push(O.newText),w=h.offsetAt(O.range.end)}return C.push(y.substr(w)),C.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),h=u.slice(c);i(f,l),i(h,l);for(var v=0,y=0,A=0;v<f.length&&y<h.length;){var w=l(f[v],h[y]);w<=0?u[A++]=f[v++]:u[A++]=h[y++]}for(;v<f.length;)u[A++]=f[v++];for(;y<h.length;)u[A++]=h[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],h=0;h<u.length;h++){var v=u.charCodeAt(h);(v===13||v===10)&&(v===13&&h+1<u.length&&u.charCodeAt(h+1)===10&&h++,f.push(c+h+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var nr=d(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});Ft.isRootCstNode=Ft.isLeafCstNode=Ft.isCompositeCstNode=Ft.AbstractAstReflection=Ft.isLinkingError=Ft.isAstNodeDescription=Ft.isReference=Ft.isAstNode=void 0;function by(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Ft.isAstNode=by;function nS(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Ft.isReference=nS;function u2(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Ft.isAstNodeDescription=u2;function l2(t){return typeof t=="object"&&t!==null&&by(t.container)&&nS(t.reference)&&typeof t.message=="string"}Ft.isLinkingError=l2;var Sy=class{constructor(){this.subtypes={}}isInstance(e,r){return by(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};Ft.AbstractAstReflection=Sy;function iS(t){return typeof t=="object"&&t!==null&&"children"in t}Ft.isCompositeCstNode=iS;function c2(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Ft.isLeafCstNode=c2;function f2(t){return iS(t)&&"fullText"in t}Ft.isRootCstNode=f2});var jt=d(Ye=>{"use strict";Object.defineProperty(Ye,"__esModule",{value:!0});Ye.Reduction=Ye.TreeStreamImpl=Ye.stream=Ye.DONE_RESULT=Ye.EMPTY_STREAM=Ye.StreamImpl=void 0;var Xt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Xt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return Ye.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=d2(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Xt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?Ye.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Xt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return Ye.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Xt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(pf(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return Ye.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Xt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(pf(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return Ye.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Xt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Xt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?Ye.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};Ye.StreamImpl=Xt;function d2(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function pf(t){return!!t&&typeof t[Symbol.iterator]=="function"}Ye.EMPTY_STREAM=new Xt(()=>{},()=>Ye.DONE_RESULT);Ye.DONE_RESULT=Object.freeze({done:!0,value:void 0});function p2(...t){if(t.length===1){let e=t[0];if(e instanceof Xt)return e;if(pf(e))return new Xt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Xt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:Ye.DONE_RESULT)}return t.length>1?new Xt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];pf(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return Ye.DONE_RESULT}):Ye.EMPTY_STREAM}Ye.stream=p2;var Py=class extends Xt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return Ye.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};Ye.TreeStreamImpl=Py;var m2;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(m2=Ye.Reduction||(Ye.Reduction={}))});var qe=d(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.getInteriorNodes=le.getStartlineNode=le.getNextNode=le.getPreviousNode=le.findLeafNodeAtOffset=le.isCommentNode=le.findCommentNode=le.findDeclarationNodeAtOffset=le.DefaultNameRegexp=le.inRange=le.compareRange=le.RangeComparison=le.toDocumentSegment=le.tokenToRange=le.isCstChildNode=le.flattenCst=le.streamCst=void 0;var Jo=nr(),h2=jt();function oS(t){return new h2.TreeStreamImpl(t,e=>(0,Jo.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}le.streamCst=oS;function y2(t){return oS(t).filter(Jo.isLeafCstNode)}le.flattenCst=y2;function g2(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}le.isCstChildNode=g2;function v2(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}le.tokenToRange=v2;function T2(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}le.toDocumentSegment=T2;var za;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(za=le.RangeComparison||(le.RangeComparison={}));function sS(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return za.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return za.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?za.Inside:r?za.OverlapBack:za.OverlapFront}le.compareRange=sS;function _2(t,e){return sS(t,e)>za.After}le.inRange=_2;le.DefaultNameRegexp=/^[\w\p{L}]$/u;function R2(t,e,r=le.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return mf(t,e)}}le.findDeclarationNodeAtOffset=R2;function A2(t,e){if(t){let r=uS(t,!0);if(r&&Cy(r,e))return r;if((0,Jo.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(Cy(a,e))return a}}}}le.findCommentNode=A2;function Cy(t,e){return(0,Jo.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}le.isCommentNode=Cy;function mf(t,e){if((0,Jo.isLeafCstNode)(t))return t;if((0,Jo.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return mf(a,e)}if(r===n)return mf(t.children[r],e)}}le.findLeafNodeAtOffset=mf;function uS(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}le.getPreviousNode=uS;function S2(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}le.getNextNode=S2;function b2(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}le.getStartlineNode=b2;function P2(t,e){let r=C2(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}le.getInteriorNodes=P2;function C2(t,e){let r=aS(t),n=aS(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function aS(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var bn=d((el,ky)=>{(function(t,e){if(typeof el=="object"&&typeof ky=="object")ky.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof el=="object"?el:t)[n]=r[n]}})(el,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",h=0,v=-1,y=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(v===A-1||y===1))if(v!==A-1&&y===2){if(f.length<2||h!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var w=f.lastIndexOf("/");if(w!==f.length-1){w===-1?(f="",h=0):h=(f=f.slice(0,w)).length-1-f.lastIndexOf("/"),v=A,y=0;continue}}else if(f.length===2||f.length===1){f="",h=0,v=A,y=0;continue}}l&&(f.length>0?f+="/..":f="..",h=2)}else f.length>0?f+="/"+u.slice(v+1,A):f=u.slice(v+1,A),h=A-v-1;v=A,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var h;f>=0?h=arguments[f]:(u===void 0&&(u=process.cwd()),h=u),a(h),h.length!==0&&(l=h+"/"+l,c=h.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,h=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,A=h<y?h:y,w=-1,C=0;C<=A;++C){if(C===A){if(y>A){if(l.charCodeAt(v+C)===47)return l.slice(v+C+1);if(C===0)return l.slice(v+C)}else h>A&&(u.charCodeAt(c+C)===47?w=C:C===0&&(w=0));break}var b=u.charCodeAt(c+C);if(b!==l.charCodeAt(v+C))break;b===47&&(w=C)}var S="";for(C=c+w+1;C<=f;++C)C!==f&&u.charCodeAt(C)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+w):(v+=w,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,h=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!h){f=v;break}}else h=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,h=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var w=u.charCodeAt(c);if(w===47){if(!v){f=c+1;break}}else A===-1&&(v=!1,A=c+1),y>=0&&(w===l.charCodeAt(y)?--y==-1&&(h=c):(y=-1,h=A))}return f===h?h=A:h===-1&&(h=u.length),u.slice(f,h)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else h===-1&&(v=!1,h=c+1);return h===-1?"":u.slice(f,h)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,h=!0,v=0,y=u.length-1;y>=0;--y){var A=u.charCodeAt(y);if(A!==47)f===-1&&(h=!1,f=y+1),A===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!h){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,h=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+h:f+"/"+h:h}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),h=f===47;h?(l.root="/",c=1):c=0;for(var v=-1,y=0,A=-1,w=!0,C=u.length-1,b=0;C>=c;--C)if((f=u.charCodeAt(C))!==47)A===-1&&(w=!1,A=C+1),f===46?v===-1?v=C:b!==1&&(b=1):v!==-1&&(b=-1);else if(!w){y=C+1;break}return v===-1||A===-1||b===0||b===1&&v===A-1&&v===y+1?A!==-1&&(l.base=l.name=y===0&&h?u.slice(1,A):u.slice(y,A)):(y===0&&h?(l.name=u.slice(1,v),l.base=u.slice(1,A)):(l.name=u.slice(y,v),l.base=u.slice(y,A)),l.ext=u.slice(v,A)),y>0?l.dir=u.slice(0,y-1):h&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var ae in B)Object.prototype.hasOwnProperty.call(B,ae)&&(j[ae]=B[ae])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,h=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!h.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var A="",w="/",C=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,ae,oe,Z){Z===void 0&&(Z=!1),typeof L=="object"?(this.scheme=L.scheme||A,this.authority=L.authority||A,this.path=L.path||A,this.query=L.query||A,this.fragment=L.fragment||A):(this.scheme=function(dt,tt){return dt||tt?dt:"file"}(L,Z),this.authority=j||A,this.path=function(dt,tt){switch(dt){case"https":case"http":case"file":tt?tt[0]!==w&&(tt=w+tt):tt=w}return tt}(this.scheme,B||A),this.query=ae||A,this.fragment=oe||A,y(this,Z))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return we(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,ae=L.path,oe=L.query,Z=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=A),B===void 0?B=this.authority:B===null&&(B=A),ae===void 0?ae=this.path:ae===null&&(ae=A),oe===void 0?oe=this.query:oe===null&&(oe=A),Z===void 0?Z=this.fragment:Z===null&&(Z=A),j===this.scheme&&B===this.authority&&ae===this.path&&oe===this.query&&Z===this.fragment?this:new O(j,B,ae,oe,Z)},q.parse=function(L,j){j===void 0&&(j=!1);var B=C.exec(L);return B?new O(B[2]||A,fe(B[4]||A),fe(B[5]||A),fe(B[7]||A),fe(B[9]||A),j):new O(A,A,A,A,A)},q.file=function(L){var j=A;if(c.isWindows&&(L=L.replace(/\\/g,w)),L[0]===w&&L[1]===w){var B=L.indexOf(w,2);B===-1?(j=L.substring(2),L=w):(j=L.substring(2,B),L=L.substring(B)||w)}return new O("file",j,L,A,A)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),Ee(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=we(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?Ee(this,!0):(this._formatted||(this._formatted=Ee(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,ae=-1,oe=0;oe<q.length;oe++){var Z=q.charCodeAt(oe);if(Z>=97&&Z<=122||Z>=65&&Z<=90||Z>=48&&Z<=57||Z===45||Z===46||Z===95||Z===126||L&&Z===47||j&&Z===91||j&&Z===93||j&&Z===58)ae!==-1&&(B+=encodeURIComponent(q.substring(ae,oe)),ae=-1),B!==void 0&&(B+=q.charAt(oe));else{B===void 0&&(B=q.substr(0,oe));var dt=F[Z];dt!==void 0?(ae!==-1&&(B+=encodeURIComponent(q.substring(ae,oe)),ae=-1),B+=dt):ae===-1&&(ae=oe)}}return ae!==-1&&(B+=encodeURIComponent(q.substring(ae))),B!==void 0?B:q}function te(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function we(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function Ee(q,L){var j=L?te:W,B="",ae=q.scheme,oe=q.authority,Z=q.path,dt=q.query,tt=q.fragment;if(ae&&(B+=ae,B+=":"),(oe||ae==="file")&&(B+=w,B+=w),oe){var Dt=oe.indexOf("@");if(Dt!==-1){var cn=oe.substr(0,Dt);oe=oe.substr(Dt+1),(Dt=cn.lastIndexOf(":"))===-1?B+=j(cn,!1,!1):(B+=j(cn.substr(0,Dt),!1,!1),B+=":",B+=j(cn.substr(Dt+1),!1,!0)),B+="@"}(Dt=(oe=oe.toLowerCase()).lastIndexOf(":"))===-1?B+=j(oe,!1,!0):(B+=j(oe.substr(0,Dt),!1,!0),B+=oe.substr(Dt))}if(Z){if(Z.length>=3&&Z.charCodeAt(0)===47&&Z.charCodeAt(2)===58)(Ir=Z.charCodeAt(1))>=65&&Ir<=90&&(Z="/".concat(String.fromCharCode(Ir+32),":").concat(Z.substr(3)));else if(Z.length>=2&&Z.charCodeAt(1)===58){var Ir;(Ir=Z.charCodeAt(0))>=65&&Ir<=90&&(Z="".concat(String.fromCharCode(Ir+32),":").concat(Z.substr(2)))}B+=j(Z,!0,!1)}return dt&&(B+="?",B+=j(dt,!1,!1)),tt&&(B+="#",B+=L?tt:W(tt,!1,!1)),B}function Qe(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Qe(q.substr(3)):q}}a.uriToFsPath=we;var V=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function fe(q){return q.match(V)?q.replace(V,function(L){return Qe(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(h,v,y){if(y||arguments.length===2)for(var A,w=0,C=v.length;w<C;w++)!A&&w in v||(A||(A=Array.prototype.slice.call(v,0,w)),A[w]=v[w]);return h.concat(A||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return h.with({path:c.join.apply(c,s([h.path],v,!1))})},u.resolvePath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var A=h.path,w=!1;A[0]!==f&&(A=f+A,w=!0);var C=c.resolve.apply(c,s([A],v,!1));return w&&C[0]===f&&!h.authority&&(C=C.substring(1)),h.with({path:C})},u.dirname=function(h){if(h.path.length===0||h.path===f)return h;var v=c.dirname(h.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),h.with({path:v})},u.basename=function(h){return c.basename(h.path)},u.extname=function(h){return c.extname(h.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var tl=d(Qo=>{"use strict";Object.defineProperty(Qo,"__esModule",{value:!0});Qo.eagerLoad=Qo.inject=void 0;function k2(t,e,r,n){let i=[t,e,r,n].reduce(pS,{});return dS(i)}Qo.inject=k2;var wy=Symbol("isProxy");function fS(t){if(t&&t[wy])for(let e of Object.values(t))fS(e);return t}Qo.eagerLoad=fS;function dS(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>cS(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(cS(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),wy]});return r[wy]=!0,r}var lS=Symbol();function cS(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===lS)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=lS;try{t[e]=typeof i=="function"?i(n):dS(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function pS(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=pS(i,n):t[r]=n}}return t}});var Pn=d(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.MultiMap=void 0;var Zo=jt(),Ey=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Zo.Reduction.sum((0,Zo.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,Zo.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,Zo.stream)(this.map.keys())}values(){return(0,Zo.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,Zo.stream)(this.map.entries())}};hf.MultiMap=Ey});var Ne=d(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isUnionType=_.UnionType=_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=void 0;var w2=nr();_.AbstractRule="AbstractRule";function E2(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=E2;_.AbstractType="AbstractType";function N2(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=N2;_.Condition="Condition";function $2(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=$2;_.TypeDefinition="TypeDefinition";function O2(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=O2;_.AbstractElement="AbstractElement";function I2(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=I2;_.ArrayType="ArrayType";function D2(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=D2;_.Conjunction="Conjunction";function x2(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=x2;_.Disjunction="Disjunction";function L2(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=L2;_.Grammar="Grammar";function q2(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=q2;_.GrammarImport="GrammarImport";function M2(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=M2;_.InferredType="InferredType";function F2(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=F2;_.Interface="Interface";function j2(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=j2;_.LiteralCondition="LiteralCondition";function G2(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=G2;_.NamedArgument="NamedArgument";function U2(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=U2;_.Negation="Negation";function H2(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=H2;_.Parameter="Parameter";function K2(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=K2;_.ParameterReference="ParameterReference";function W2(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=W2;_.ParserRule="ParserRule";function B2(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=B2;_.ReferenceType="ReferenceType";function V2(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=V2;_.ReturnType="ReturnType";function z2(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=z2;_.SimpleType="SimpleType";function Y2(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=Y2;_.TerminalRule="TerminalRule";function X2(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=X2;_.Type="Type";function J2(t){return _.reflection.isInstance(t,_.Type)}_.isType=J2;_.TypeAttribute="TypeAttribute";function Q2(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=Q2;_.UnionType="UnionType";function Z2(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=Z2;_.Action="Action";function eH(t){return _.reflection.isInstance(t,_.Action)}_.isAction=eH;_.Alternatives="Alternatives";function tH(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=tH;_.Assignment="Assignment";function rH(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=rH;_.CharacterRange="CharacterRange";function nH(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=nH;_.CrossReference="CrossReference";function iH(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=iH;_.Group="Group";function aH(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=aH;_.Keyword="Keyword";function oH(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=oH;_.NegatedToken="NegatedToken";function sH(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=sH;_.RegexToken="RegexToken";function uH(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=uH;_.RuleCall="RuleCall";function lH(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=lH;_.TerminalAlternatives="TerminalAlternatives";function cH(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=cH;_.TerminalGroup="TerminalGroup";function fH(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=fH;_.TerminalRuleCall="TerminalRuleCall";function dH(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=dH;_.UnorderedGroup="UnorderedGroup";function pH(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=pH;_.UntilToken="UntilToken";function mH(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=mH;_.Wildcard="Wildcard";function hH(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=hH;var yf=class extends w2.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=yf;_.reflection=new yf});var Se=d(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.copyAstNode=nt.findLocalReferences=nt.streamReferences=nt.streamAst=nt.streamAllContents=nt.streamContents=nt.findRootNode=nt.getDocument=nt.hasContainerOfType=nt.getContainerOfType=nt.linkContentToContainer=void 0;var zn=nr(),oa=jt(),yH=qe();function mS(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,zn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,zn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}nt.linkContentToContainer=mS;function gH(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}nt.getContainerOfType=gH;function vH(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}nt.hasContainerOfType=vH;function hS(t){let r=yS(t).$document;if(!r)throw new Error("AST node has no document.");return r}nt.getDocument=hS;function yS(t){for(;t.$container;)t=t.$container;return t}nt.findRootNode=yS;function Oy(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new oa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let a=t[i];if((0,zn.isAstNode)(a)){if(n.keyIndex++,Ny(a,r))return{done:!1,value:a}}else if(Array.isArray(a)){for(;n.arrayIndex<a.length;){let o=n.arrayIndex++,s=a[o];if((0,zn.isAstNode)(s)&&Ny(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return oa.DONE_RESULT})}nt.streamContents=Oy;function TH(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new oa.TreeStreamImpl(t,r=>Oy(r,e))}nt.streamAllContents=TH;function gS(t,e){if(t){if(e?.range&&!Ny(t,e.range))return new oa.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new oa.TreeStreamImpl(t,r=>Oy(r,e),{includeRoot:!0})}nt.streamAst=gS;function Ny(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,yH.inRange)(n,e):!1}function vS(t){return new oa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,zn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,zn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return oa.DONE_RESULT})}nt.streamReferences=vS;function _H(t,e=hS(t).parseResult.value){let r=[];return gS(e).forEach(n=>{vS(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,oa.stream)(r)}nt.findLocalReferences=_H;function $y(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,zn.isAstNode)(i))r[n]=$y(i,e);else if((0,zn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,zn.isAstNode)(o)?a.push($y(o,e)):(0,zn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return mS(r),r}nt.copyAstNode=$y});var RS=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.getSourceRegion=void 0;var TS=Se(),RH=Tt(),AH=jt();function SH(t){var e,r;if(t){if("astNode"in t)return CH(t);if(Array.isArray(t))return t.reduce(_S,void 0);{let n=t,i=bH(n)?PH((r=(e=n?.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n?.element):void 0;return es(n,i)}}else return}gf.getSourceRegion=SH;function bH(t){return typeof t<"u"&&"element"in t&&"text"in t}function PH(t){try{return(0,TS.getDocument)(t).uri.toString()}catch{return}}function CH(t){var e,r;let{astNode:n,property:i,index:a}=t??{},o=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||o===void 0)){if(i===void 0)return es(o,Iy(n));{let s=u=>a!==void 0&&a>-1&&Array.isArray(n[i])?a<u.length?u[a]:void 0:u.reduce(_S,void 0);if(!((r=o.assignments)===null||r===void 0)&&r[i]){let u=s(o.assignments[i]);return u&&es(u,Iy(n))}else if(n.$cstNode){let u=s((0,RH.findNodesForProperty)(n.$cstNode,i));return u&&es(u,Iy(n))}else return}}}function Iy(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,TS.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new AH.TreeStreamImpl(t,a=>a.$container?[a.$container]:[]).find(a=>{var o;return(o=a.$textRegion)===null||o===void 0?void 0:o.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function es(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function _S(t,e){var r,n;if(t){if(!e)return t&&es(t)}else return e&&es(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,a=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,o=Math.min(t.offset,e.offset),s=Math.max(i,a),u=s-o,l={offset:o,end:s,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,h=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;l.fileURI=h}return l}});var CS=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.processGeneratorNode=void 0;var rl=Ya(),kH=RS(),Dy=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=wH(e,this.currentPosition,n=>{var i,a;return(a=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||a===void 0?void 0:a.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function wH(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var a,o;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((a=n.children)===null||a===void 0?void 0:a.length)===0&&delete n.children,!((o=n.targetRegion)===null||o===void 0)&&o.length&&r(n),delete n.complete,n}};return n}function EH(t,e){let r=new Dy(e),n=r.pushTraceRegion(void 0);AS(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,a=i?.targetRegion,o=n.targetRegion;return a&&i.sourceRegion&&a.offset===o.offset&&a.length===o.length?{text:r.content,trace:i}:{text:r.content,trace:n}}vf.processGeneratorNode=EH;function AS(t,e){typeof t=="string"?NH(t,e):t instanceof rl.IndentNode?$H(t,e):t instanceof rl.CompositeGeneratorNode?PS(t,e):t instanceof rl.NewLineNode&&OH(t,e)}function SS(t,e){return typeof t=="string"?t.length!==0:t instanceof rl.CompositeGeneratorNode?t.contents.some(r=>SS(r,e)):t instanceof rl.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function NH(t,e){t&&(e.pendingIndent&&bS(e,!1),e.append(t))}function bS(t,e){var r;let n="";for(let i of t.relevantIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function PS(t,e){let r,n=(0,kH.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)AS(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function $H(t,e){var r;if(SS(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),PS(t,e)}finally{e.decreaseIndent()}}}function OH(t,e){t.ifNotEmpty&&!IH(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&bS(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function IH(t){return t.trimStart()!==""}});var Tf=d(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.normalizeEOL=Ct.findIndentation=Ct.NEWLINE_REGEXP=Ct.SNLE=Ct.expandToString=Ct.expandToStringWithNL=void 0;var nl=Ya();function DH(t,...e){return kS(t,...e)+nl.EOL}Ct.expandToStringWithNL=DH;function kS(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Ct.SNLE:LH((0,nl.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(Ct.NEWLINE_REGEXP).filter(o=>o.trim()!==Ct.SNLE).map(o=>o.replace(Ct.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=wS(r);return r.map(o=>o.slice(a).trimRight()).join(nl.EOL)}Ct.expandToString=kS;Ct.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");Ct.NEWLINE_REGEXP=/\r?\n/g;var xH=/\S|$/;function LH(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Ct.NEWLINE_REGEXP,nl.EOL+n)}function wS(t){let e=t.filter(n=>n.length>0).map(n=>n.search(xH)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Ct.findIndentation=wS;function qH(t){return t.replace(Ct.NEWLINE_REGEXP,nl.EOL)}Ct.normalizeEOL=qH});var qy=d(sa=>{"use strict";Object.defineProperty(sa,"__esModule",{value:!0});sa.expandTracedToNodeIf=sa.expandTracedToNode=sa.expandToNode=void 0;var Rf=Ya(),Ly=Tf();function ES(t,...e){let r=FH(t),n=jH(t,e,r);return UH(n)}sa.expandToNode=ES;function NS(t,e,r){return(n,...i)=>(0,Rf.traceToNode)(t,e,r)(ES(n,...i))}sa.expandTracedToNode=NS;function MH(t,e,r,n){return t?NS(typeof e=="function"?e():e,r,n):()=>{}}sa.expandTracedToNodeIf=MH;function FH(t){let e=t.join("_").split(Ly.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Ly.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function jH(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Ly.NEWLINE_REGEXP).map((f,h)=>h===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,h,v)=>v===0?n?[]:[h]:v===1&&f.length===0?[h]:f.concat(_f,h):(f,h,v)=>v===0?[h]:f.concat(_f,h),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,Rf.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Rf.CompositeGeneratorNode(String(e[c])):c<e.length?$S:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===_f?o.slice(0,s-2):o.slice(0,s-1):o}var _f={isNewLine:!0},$S={isUndefinedSegment:!0},xy=t=>t===_f,GH=t=>t===$S;function UH(t){return t.reduce((r,n,i)=>GH(n)?r:xy(n)?{node:i===0||xy(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var a;let o=(i===0||xy(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:o.length!==0?r.node.indent({indentation:o,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s??((a=r.indented)===null||a===void 0?void 0:a.append(n))}})(),{node:new Rf.CompositeGeneratorNode}).node}});var Ya=d($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.NLEmpty=$e.NL=$e.NewLineNode=$e.IndentNode=$e.traceToNodeIf=$e.traceToNode=$e.CompositeGeneratorNode=$e.toStringAndTrace=$e.toString=$e.isNewLineNode=$e.isGeneratorNode=$e.EOL=void 0;var HH=nr(),IS=CS(),OS=qy();$e.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function DS(t){return t instanceof Ci||t instanceof il||t instanceof Xa}$e.isGeneratorNode=DS;function KH(t){return t instanceof Xa}$e.isNewLineNode=KH;function WH(t,e){return DS(t)?(0,IS.processGeneratorNode)(t,e).text:String(t)}$e.toString=WH;function BH(t,e){return(0,IS.processGeneratorNode)(t,e)}$e.toStringAndTrace=BH;var Ci=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,HH.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append($e.NL)}appendNewLineIf(e){return e?this.append($e.NL):this}appendNewLineIfNotEmpty(){return this.append($e.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,OS.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:a}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},o=new il(n,a,i);return this.contents.push(o),Array.isArray(r)?o.append(...r):r&&o.append(r),this}appendTraced(e,r,n){return i=>this.append(new Ci().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...a)=>this.append((0,OS.expandTracedToNode)(e,r,n)(i,...a))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};$e.CompositeGeneratorNode=Ci;function xS(t,e,r){return n=>n instanceof Ci&&n.tracedSource===void 0?n.trace(t,e,r):new Ci().trace(t,e,r).append(n)}$e.traceToNode=xS;function VH(t,e,r,n){return t?xS(typeof e=="function"?e():e,r,n):()=>{}}$e.traceToNodeIf=VH;var il=class extends Ci{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};$e.IndentNode=il;var Xa=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??$e.EOL,this.ifNotEmpty=r}};$e.NewLineNode=Xa;$e.NL=new Xa;$e.NLEmpty=new Xa(void 0,!0)});var ns=d(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.propertyTypeToString=Oe.isTypeAssignable=Oe.TypeResolutionError=Oe.InterfaceType=Oe.UnionType=Oe.isInterfaceType=Oe.isUnionType=Oe.isStringType=Oe.isPrimitiveType=Oe.isValueType=Oe.flattenPropertyUnion=Oe.isPropertyUnion=Oe.isArrayType=Oe.isReferenceType=void 0;var it=Ya(),ts=is();function ol(t){return"referenceType"in t}Oe.isReferenceType=ol;function sl(t){return"elementType"in t}Oe.isArrayType=sl;function Za(t){return"types"in t}Oe.isPropertyUnion=Za;function qS(t){if(Za(t)){let e=[];for(let r of t.types)e.push(...qS(r));return e}else return[t]}Oe.flattenPropertyUnion=qS;function al(t){return"value"in t}Oe.isValueType=al;function rs(t){return"primitive"in t}Oe.isPrimitiveType=rs;function Af(t){return"string"in t}Oe.isStringType=Af;function Fy(t){return t&&"type"in t}Oe.isUnionType=Fy;function Uy(t){return t&&"properties"in t}Oe.isInterfaceType=Uy;var jy=class{constructor(e,r){var n,i;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.reflection=(n=r?.reflection)!==null&&n!==void 0?n:!1,this.declared=(i=r?.declared)!==null&&i!==void 0?i:!1}toAstTypesString(e){let r=new it.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Qa(this.type,"AstType")};`,it.NL),this.reflection&&e&&(r.append(it.NL),jS(r,this.name)),(0,it.toString)(r)}toDeclaredTypesString(e){let r=new it.CompositeGeneratorNode;return r.append(`type ${Hy(this.name,e)} = ${Qa(this.type,"DeclaredType")};`,it.NL),(0,it.toString)(r)}};Oe.UnionType=jy;var ul=class{get superProperties(){let e=new Map;for(let r of this.properties)e.set(r.name,r);for(let r of this.interfaceSuperTypes){let n=r.superProperties;for(let i of n)e.has(i.name)||e.set(i.name,i)}return Array.from(e.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e);return Array.from(e.values())}getSubTypeProperties(e,r){let n=Uy(e)?e.properties:[];for(let i of n)r.has(i.name)||r.set(i.name,i);for(let i of e.subTypes)this.getSubTypeProperties(i,r)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof ul)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new it.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(a=>a.name),i=n.length>0?(0,ts.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,it.NL),r.indent(a=>{this.containerTypes.size>0&&a.append(`readonly $container: ${(0,ts.distinctAndSorted)([...this.containerTypes].map(o=>o.name)).join(" | ")};`,it.NL),this.typeNames.size>0&&a.append(`readonly $type: ${(0,ts.distinctAndSorted)([...this.typeNames]).map(o=>`'${o}'`).join(" | ")};`,it.NL),LS(a,this.properties,"AstType")}),r.append("}",it.NL),e&&(r.append(it.NL),jS(r,this.name)),(0,it.toString)(r)}toDeclaredTypesString(e){let r=new it.CompositeGeneratorNode,n=Hy(this.name,e),i=(0,ts.distinctAndSorted)(this.interfaceSuperTypes.map(a=>a.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,it.NL),r.indent(a=>LS(a,this.properties,"DeclaredType",e)),r.append("}",it.NL),(0,it.toString)(r)}};Oe.InterfaceType=ul;var Gy=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};Oe.TypeResolutionError=Gy;function Ja(t,e){return Za(t)?t.types.every(r=>Ja(r,e)):Za(e)?e.types.some(r=>Ja(t,r)):ol(t)?ol(e)&&Ja(t.referenceType,e.referenceType):sl(t)?sl(e)&&Ja(t.elementType,e.elementType):al(t)?Fy(t.value)?al(e)&&e.value.name===t.value.name?!0:Ja(t.value.type,e):al(e)?Fy(e.value)?Ja(t,e.value.type):MS(t.value,e.value,new Set):!1:rs(t)?rs(e)&&t.primitive===e.primitive:Af(t)?rs(e)&&e.primitive==="string"||Af(e)&&e.string===t.string:!1}Oe.isTypeAssignable=Ja;function MS(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(Uy(n)&&MS(n,e,r))return!0;return!1}function Qa(t,e="AstType"){if(ol(t)){let r=Qa(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${My(t.referenceType,r)}`}else if(sl(t)){let r=Qa(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${My(t.elementType,r)}[]`}else if(Za(t)){let r=t.types.map(n=>My(n,Qa(n,e)));return(0,ts.distinctAndSorted)(r).join(" | ")}else{if(al(t))return t.value.name;if(rs(t))return t.primitive;if(Af(t))return`'${t.string}'`}throw new Error("Invalid type")}Oe.propertyTypeToString=Qa;function My(t,e){return Za(t)&&(e=`(${e})`),e}function LS(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:Hy(a.name,n),s=a.optional&&!FS(a.type),u=Qa(a.type,r);return`${o}${s?"?":""}: ${u}`}(0,ts.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),it.NL))}function FS(t){return sl(t)?!0:ol(t)?!1:Za(t)?t.types.every(e=>FS(e)):rs(t)?t.primitive==="boolean":!1}function jS(t,e){t.append(`export const ${e} = '${e}';`,it.NL),t.append(it.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,it.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,it.NL)),t.append("}",it.NL)}function Hy(t,e){return e.has(t)?`^${t}`:t}});var is=d(at=>{"use strict";Object.defineProperty(at,"__esModule",{value:!0});at.findReferenceTypes=at.hasBooleanType=at.hasArrayType=at.sortInterfacesTopologically=at.mergeTypesAndInterfaces=at.mergeInterfaces=at.collectSuperTypes=at.collectTypeHierarchy=at.collectChildrenTypes=at.distinctAndSorted=at.collectAllPlainProperties=void 0;var ll=Pn(),ki=Ne(),ua=ns();function zH(t){let e=new ll.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}at.collectAllPlainProperties=zH;function YH(t,e){return Array.from(new Set(t)).sort(e)}at.distinctAndSorted=YH;function GS(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,ki.isInterface)(u)?(i.add(u),GS(u,e,r,n).forEach(c=>i.add(c))):u&&(0,ki.isType)(u.$container)&&i.add(u.$container)}),i}at.collectChildrenTypes=GS;function XH(t){let e=new ll.MultiMap,r=new ll.MultiMap;for(let a of t){for(let o of a.superTypes)e.add(a.name,o.name),r.add(o.name,a.name);for(let o of a.subTypes)e.add(o.name,a.name),r.add(a.name,o.name)}let n=new ll.MultiMap,i=new ll.MultiMap;for(let[a,o]of Array.from(e.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))n.addAll(a,Array.from(new Set(o)));for(let[a,o]of Array.from(r.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))i.addAll(a,Array.from(new Set(o)));return{superTypes:n,subTypes:i}}at.collectTypeHierarchy=XH;function Ky(t){let e=new Set;if((0,ki.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,ki.isInterface)(r.ref)){e.add(r.ref);let n=Ky(r.ref);for(let i of n)e.add(i)}});else if((0,ki.isType)(t)){let r=US(t.type);for(let n of r){let i=Ky(n);for(let a of i)e.add(a)}}return e}at.collectSuperTypes=Ky;function US(t){var e;if((0,ki.isUnionType)(t))return t.types.flatMap(r=>US(r));if((0,ki.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,ki.isType)(r)||(0,ki.isInterface)(r))return[r]}return[]}function JH(t,e){return t.interfaces.concat(e.interfaces)}at.mergeInterfaces=JH;function QH(t){return t.interfaces.concat(t.unions)}at.mergeTypesAndInterfaces=QH;function ZH(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.superTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}at.sortInterfacesTopologically=ZH;function HS(t){return(0,ua.isPropertyUnion)(t)?t.types.some(e=>HS(e)):!!(0,ua.isArrayType)(t)}at.hasArrayType=HS;function KS(t){return(0,ua.isPropertyUnion)(t)?t.types.some(e=>KS(e)):(0,ua.isPrimitiveType)(t)?t.primitive==="boolean":!1}at.hasBooleanType=KS;function Wy(t){if((0,ua.isPropertyUnion)(t))return t.types.flatMap(e=>Wy(e));if((0,ua.isReferenceType)(t)){let e=t.referenceType;if((0,ua.isValueType)(e))return[e.value.name]}else if((0,ua.isArrayType)(t))return Wy(t.elementType);return[]}at.findReferenceTypes=Wy});var os=d(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.DefaultNameProvider=as.isNamed=void 0;var eK=Tt();function WS(t){return typeof t.name=="string"}as.isNamed=WS;var By=class{getName(e){if(WS(e))return e.name}getNameNode(e){return(0,eK.findNodeForProperty)(e.$cstNode,"name")}};as.DefaultNameProvider=By});var cl=d((BS,Sf)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof Sf=="object"&&Sf.exports?Sf.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:BS,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var A=this.disjunction();this.consumeChar("/");for(var w={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(w,"global");break;case"i":o(w,"ignoreCase");break;case"m":o(w,"multiLine");break;case"u":o(w,"unicode");break;case"y":o(w,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:w,value:A,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],A=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(A)}},t.prototype.alternative=function(){for(var y=[],A=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(A)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var A;switch(this.popChar()){case"=":A="Lookahead";break;case"!":A="NegativeLookahead";break}s(A);var w=this.disjunction();return this.consumeChar(")"),{type:A,value:w,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var A,w=this.idx;switch(this.popChar()){case"*":A={atLeast:0,atMost:1/0};break;case"+":A={atLeast:1,atMost:1/0};break;case"?":A={atLeast:0,atMost:1};break;case"{":var C=this.integerIncludingZero();switch(this.popChar()){case"}":A={atLeast:C,atMost:C};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),A={atLeast:C,atMost:b}):A={atLeast:C,atMost:1/0},this.consumeChar("}");break}if(y===!0&&A===void 0)return;s(A);break}if(!(y===!0&&A===void 0))return s(A),this.peekChar(0)==="?"?(this.consumeChar("?"),A.greedy=!1):A.greedy=!0,A.type="Quantifier",A.loc=this.loc(w),A},t.prototype.atom=function(){var y,A=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(A),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,A=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,A=!0;break;case"s":y=h;break;case"S":y=h,A=!0;break;case"w":y=f;break;case"W":y=f,A=!0;break}return s(y),{type:"Set",value:y,complement:A}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var A=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:A}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],A=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),A=!0);this.isClassAtom();){var w=this.classAtom(),C=w.type==="Character";if(C&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<w.value)throw Error("Range out of order in character class");y.push({from:w.value,to:b.value})}else a(w.value,y),y.push(i("-")),a(b.value,y)}else a(w.value,y)}return this.consumeChar("]"),{type:"Set",complement:A,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var A=this.disjunction();this.consumeChar(")");var w={type:"Group",capturing:y,value:A};return y&&(w.idx=this.groupIdx),w},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var A="",w=0;w<y;w++){var C=this.popChar();if(e.test(C)===!1)throw Error("Expecting a HexDecimal digits");A+=C}var b=parseInt(A,16);return{type:"Character",value:b}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,A){y.length!==void 0?y.forEach(function(w){A.push(w)}):A.push(y)}function o(y,A){if(y[A]===!0)throw"duplicate flag "+A;y[A]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var h=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var A in y){var w=y[A];y.hasOwnProperty(A)&&(w.type!==void 0?this.visit(w):Array.isArray(w)&&w.forEach(function(C){this.visit(C)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var to=d(ir=>{"use strict";Object.defineProperty(ir,"__esModule",{value:!0});ir.partialRegex=ir.partialMatches=ir.getCaseInsensitivePattern=ir.escapeRegExp=ir.isWhitespaceRegExp=ir.isMultilineComment=ir.getTerminalParts=void 0;var VS=cl(),zS=new VS.RegExpParser,Vy=class extends VS.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=zy(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},eo=new Vy;function tK(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=zS.pattern(t),r=[];for(let n of e.value.value)eo.reset(t),eo.visit(n),r.push({start:eo.startRegex,end:eo.endRegex});return r}catch{return[]}}ir.getTerminalParts=tK;function rK(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,eo.reset(t),eo.visit(zS.pattern(t)),eo.multiline}catch{return!1}}ir.isMultilineComment=rK;function nK(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}ir.isWhitespaceRegExp=nK;function zy(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}ir.escapeRegExp=zy;function iK(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:zy(e)).join("")}ir.getCaseInsensitivePattern=iK;function aK(t,e){let r=YS(t),n=e.match(r);return!!n&&n[0].length>0}ir.partialMatches=aK;function YS(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}ir.partialRegex=YS});var Gt=d(ue=>{"use strict";var oK=ue&&ue.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),sK=ue&&ue.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),uK=ue&&ue.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&oK(e,t,r);return sK(e,t),e};Object.defineProperty(ue,"__esModule",{value:!0});ue.isPrimitiveType=ue.extractAssignments=ue.resolveTransitiveImports=ue.resolveImport=ue.resolveImportUri=ue.terminalRegex=ue.getRuleType=ue.getActionType=ue.getExplicitRuleType=ue.getTypeNameWithoutError=ue.getTypeName=ue.getActionAtElement=ue.isDataTypeRule=ue.isArrayOperator=ue.isArrayCardinality=ue.isOptionalCardinality=void 0;var be=uK(Ne()),XS=bn(),bf=Se(),lK=ns(),cK=to();function fK(t){return t==="?"||t==="*"}ue.isOptionalCardinality=fK;function dK(t){return t==="*"||t==="+"}ue.isArrayCardinality=dK;function pK(t){return t==="+="}ue.isArrayOperator=pK;function Jy(t){return JS(t,new Set)}ue.isDataTypeRule=Jy;function JS(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,bf.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!JS(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function QS(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,bf.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return QS(e)}ue.getActionAtElement=QS;function Qy(t){var e;if(be.isParserRule(t))return Jy(t)?t.name:(e=Zy(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=ZS(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new lK.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}ue.getTypeName=Qy;function mK(t){if(t)try{return Qy(t)}catch{return}}ue.getTypeNameWithoutError=mK;function Zy(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}ue.getExplicitRuleType=Zy;function ZS(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Qy(t.type.ref)}ue.getActionType=ZS;function hK(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Jy(t)?t.name:(n=Zy(t))!==null&&n!==void 0?n:t.name}ue.getRuleType=hK;function eb(t){return fl(t.definition)}ue.terminalRegex=eb;var eg=/[\s\S]/.source;function fl(t){if(be.isTerminalAlternatives(t))return yK(t);if(be.isTerminalGroup(t))return gK(t);if(be.isCharacterRange(t))return _K(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return wi(eb(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(be.isNegatedToken(t))return TK(t);if(be.isUntilToken(t))return vK(t);if(be.isRegexToken(t))return wi(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(be.isWildcard(t))return wi(eg,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}function yK(t){return wi(t.elements.map(fl).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function gK(t){return wi(t.elements.map(fl).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function vK(t){return wi(`${eg}*?${fl(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function TK(t){return wi(`(?!${fl(t.terminal)})${eg}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function _K(t){return t.right?wi(`[${Yy(t.left)}-${Yy(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):wi(Yy(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Yy(t){return(0,cK.escapeRegExp)(t.value)}function wi(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function tb(t){if(t.path===void 0||t.path.length===0)return;let e=XS.Utils.dirname((0,bf.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),XS.Utils.resolvePath(e,r)}ue.resolveImportUri=tb;function tg(t,e){let r=tb(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}ue.resolveImport=tg;function RK(t,e){if(be.isGrammarImport(e)){let r=tg(t,e);if(r){let n=Xy(t,r);return n.push(r),n}return[]}else return Xy(t,e)}ue.resolveTransitiveImports=RK;function Xy(t,e,r=e,n=new Set,i=new Set){let a=(0,bf.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=tg(t,o);s&&Xy(t,s,r,n,i)}}return Array.from(i)}function rb(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>rb(e)):[]}ue.extractAssignments=rb;var AK=["string","number","boolean","Date","bigint"];function SK(t){return AK.includes(t)}ue.isPrimitiveType=SK});var Ef=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.flattenPlainType=ot.mergePropertyTypes=ot.plainToTypes=ot.isPlainStringType=ot.isPlainPrimitiveType=ot.isPlainValueType=ot.isPlainPropertyUnion=ot.isPlainArrayType=ot.isPlainReferenceType=ot.isPlainUnion=ot.isPlainInterface=void 0;var nb=ns();function bK(t){return!ib(t)}ot.isPlainInterface=bK;function ib(t){return"type"in t}ot.isPlainUnion=ib;function Pf(t){return"referenceType"in t}ot.isPlainReferenceType=Pf;function Cf(t){return"elementType"in t}ot.isPlainArrayType=Cf;function ng(t){return"types"in t}ot.isPlainPropertyUnion=ng;function kf(t){return"value"in t}ot.isPlainValueType=kf;function ab(t){return"primitive"in t}ot.isPlainPrimitiveType=ab;function ob(t){return"string"in t}ot.isPlainStringType=ob;function PK(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new nb.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new nb.UnionType(n.name,{reflection:n.reflection,declared:n.declared});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let a of n.superTypes){let o=e.get(a)||r.get(a);o&&i.superTypes.add(o)}for(let a of n.subTypes){let o=e.get(a)||r.get(a);o&&i.subTypes.add(o)}for(let a of n.properties){let o=CK(a,e,r);i.properties.push(o)}}for(let n of t.unions){let i=r.get(n.name);i.type=dl(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}ot.plainToTypes=PK;function CK(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:dl(t.type,void 0,e,r)}}function dl(t,e,r,n){if(Cf(t))return{elementType:dl(t.elementType,e,r,n)};if(Pf(t))return{referenceType:dl(t.referenceType,void 0,r,n)};if(ng(t))return{types:t.types.map(i=>dl(i,e,r,n))};if(ob(t))return{string:t.string};if(ab(t))return{primitive:t.primitive};if(kf(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function kK(t,e){let r=wf(t),n=wf(e);for(let i of n)wK(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}ot.mergePropertyTypes=kK;function wK(t,e){return t.some(r=>rg(r,e))}function rg(t,e){return Cf(t)&&Cf(e)?rg(t.elementType,e.elementType):Pf(t)&&Pf(e)?rg(t.referenceType,e.referenceType):kf(t)&&kf(e)?t.value===e.value:!1}function wf(t){return ng(t)?t.types.flatMap(e=>wf(e)):[t]}ot.flattenPlainType=wf});var pb=d(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.collectInferredTypes=void 0;var EK=os(),sg=Pn(),mt=Ne(),Ei=Gt(),ub=Ef(),ig=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:sb(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return db(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(sb(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=ro();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function NK(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(lb)}}function sb(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>lb(e))}}function lb(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function $K(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...cb(i,u));let a=qK(n),o=MK(a),s=FK(a,o,r);for(let u of e){let l=OK(u);s.unions.push({name:u.name,reflection:!1,declared:!1,type:l,subTypes:new Set,superTypes:new Set})}return s}Nf.collectInferredTypes=$K;function OK(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=ag(t.definition,r);return e?{primitive:"string"}:n}function ag(t,e){var r,n,i;if(t.cardinality)return e();if((0,mt.isAlternatives)(t))return{types:t.elements.map(a=>ag(a,e))};if((0,mt.isGroup)(t)||(0,mt.isUnorderedGroup)(t))return t.elements.length!==1?e():ag(t.elements[0],e);if((0,mt.isRuleCall)(t)){let a=(r=t.rule)===null||r===void 0?void 0:r.ref;return a?(0,mt.isTerminalRule)(a)?{primitive:(i=(n=a.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string"}:{value:a.name}:e()}else if((0,mt.isKeyword)(t))return{string:t.value};return e()}function cb(t,e){let r=ro(e),n=new ig(t,r);return e.definition&&og(n,n.root,e.definition),n.getTypes()}function ro(t){return{name:(0,mt.isParserRule)(t)||(0,mt.isAction)(t)?(0,Ei.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function og(t,e,r){let n=(0,Ei.isOptionalCardinality)(r.cardinality);if((0,mt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,ro()));for(let a of r.elements){let o=t.connect(e,ro());i.push(og(t,o,a))}return t.merge(...i)}else if((0,mt.isGroup)(r)||(0,mt.isUnorderedGroup)(r)){let i=t.connect(e,ro()),a;n&&(a=t.connect(e,ro()));for(let o of r.elements)i=og(t,i,o);return a?t.merge(a,i):i}else{if((0,mt.isAction)(r))return IK(t,e,r);(0,mt.isAssignment)(r)?DK(e,r):(0,mt.isRuleCall)(r)&&xK(t,e,r)}return e}function IK(t,e,r){var n;if(!t.hasLeafNode(e)){let a=NK(e);t.connect(e,a)}let i=t.connect(e,ro(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,EK.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:no(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function DK(t,e){let r={types:new Set,reference:!1};fb(e.terminal,r);let n=no(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Ei.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function fb(t,e){if((0,mt.isAlternatives)(t)||(0,mt.isUnorderedGroup)(t)||(0,mt.isGroup)(t))for(let r of t.elements)fb(r,e);else if((0,mt.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,mt.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Ei.getRuleType)(t.rule.ref));else if((0,mt.isCrossReference)(t)&&t.type.ref){let r=(0,Ei.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function xK(t,e,r){let n=r.rule.ref;if((0,mt.isParserRule)(n)&&n.fragment){let i=LK(n,t.context);(0,Ei.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,mt.isParserRule)(n)&&e.ruleCalls.push((0,Ei.getRuleType)(n))}function LK(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Ei.getTypeNameWithoutError)(t),a=cb(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function qK(t){let e=new Map,r=[],n=db(t).map(i=>i.alt);for(let i of n){let a={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.superTypes.add(i.name)}return Array.from(e.values())}function db(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new sg.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let h=a.find(v=>v.name===f.name);h?(h.type=(0,ub.mergePropertyTypes)(h.type,f.type),f.astNodes.forEach(v=>h.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function MK(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new sg.MultiMap;for(let i of t)for(let a of i.superTypes)n.add(a,i.name);for(let[i,a]of n.entriesGroupedByKey())if(!e.has(i)){let o={declared:!1,name:i,reflection:!0,subTypes:new Set,superTypes:new Set,type:no(!1,!1,a)};r.push(o)}return r}function FK(t,e,r){let n=new sg.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),a={interfaces:[],unions:e},o=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,a.interfaces.push(s);else{let l=no(!1,!1,Array.from(u)),c=o.get(s.name);if(c)c.type=(0,ub.mergePropertyTypes)(c.type,l);else{let f={name:s.name,declared:!1,reflection:!0,subTypes:u,superTypes:s.superTypes,type:l};a.unions.push(f),o.set(s.name,f)}}else a.interfaces.push(s)}for(let s of a.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!o.has(u)));return a}function no(t,e,r){if(t)return{elementType:no(!1,e,r)};if(e)return{referenceType:no(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Ei.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>no(!1,!1,[n]))}}});var lg=d(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.typeDefinitionToPropertyType=us.collectDeclaredTypes=void 0;var $f=Ne(),ug=Gt();function jK(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:ss(s.type)});let a=new Set;for(let s of n.superTypes)s.ref&&a.add((0,ug.getTypeName)(s.ref));let o={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:a,subTypes:new Set};r.interfaces.push(o)}for(let n of e){let i={name:n.name,declared:!0,reflection:!0,type:ss(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}us.collectDeclaredTypes=jK;function ss(t){if((0,$f.isArrayType)(t))return{elementType:ss(t.elementType)};if((0,$f.isReferenceType)(t))return{referenceType:ss(t.referenceType)};if((0,$f.isUnionType)(t))return{types:t.types.map(ss)};if((0,$f.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,ug.getTypeNameWithoutError)(r);if(n)return(0,ug.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}us.typeDefinitionToPropertyType=ss});var hb=d(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.collectAllAstResources=ls.collectTypeResources=void 0;var GK=pb(),UK=lg(),HK=Se(),KK=Ne(),mb=Gt();function WK(t,e){let r=cg(t,e),n=(0,UK.collectDeclaredTypes)(r.interfaces,r.types),i=(0,GK.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}ls.collectTypeResources=WK;function cg(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,HK.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,KK.isParserRule)(o)&&!o.fragment&&((0,mb.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,mb.resolveImport)(e,s)).filter(s=>s!==void 0);cg(o,e,r,n)}}}return n}ls.collectAllAstResources=cg});var pg=d(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.specifyAstNodeProperties=Yn.createAstTypes=Yn.collectValidationAst=Yn.collectAst=void 0;var gb=is(),Ni=ns(),vb=hb(),BK=Ef();function VK(t,e){let{inferred:r,declared:n}=(0,vb.collectTypeResources)(t,e);return Of(r,n)}Yn.collectAst=VK;function zK(t,e){let{inferred:r,declared:n,astResources:i}=(0,vb.collectTypeResources)(t,e);return{astResources:i,inferred:Of(n,r),declared:Of(r,n)}}Yn.collectValidationAst=zK;function Of(t,e){var r,n;let i={interfaces:(0,gb.sortInterfacesTopologically)(yb(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:yb(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},a=(0,BK.plainToTypes)(i);return Tb(a),a}Yn.createAstTypes=Of;function yb(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function Tb(t){let e=XK(t),r=Array.from(e.values());JK(r),QK(r),YK(e)}Yn.specifyAstNodeProperties=Tb;function YK(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeNames.add(n.name);let i=Array.from(n.superTypes).map(a=>t.get(a.name)).filter(a=>a!==void 0);for(let a of i)n.typeNames.forEach(o=>a.typeNames.add(o));e.push(...i.filter(a=>!r.has(a)))}}function XK({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,a)=>(i.set(a.name,a),i),new Map),n=new Map;for(let i of e)n.set(i,fg(i.type,new Set));for(let[i,a]of n)a&&r.delete(i.name);return r}function fg(t,e){if(e.has(t))return!0;if(e.add(t),(0,Ni.isPropertyUnion)(t))return t.types.every(r=>fg(r,e));if((0,Ni.isValueType)(t)){let r=t.value;return(0,Ni.isUnionType)(r)?fg(r.type,e):!1}else return(0,Ni.isPrimitiveType)(t)||(0,Ni.isStringType)(t)}function JK(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function QK(t){let e=t.filter(Ni.isInterfaceType);for(let n of e){let i=n.properties.flatMap(a=>dg(a.type,new Set));for(let a of i)a.containerTypes.add(n)}let r=ZK(t);eW(r)}function dg(t,e){return(0,Ni.isPropertyUnion)(t)?t.types.flatMap(r=>dg(r,e)):(0,Ni.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Ni.isArrayType)(t)?dg(t.elementType,e):[]}function ZK(t){function e(o){let s=[o];a.add(o);let u=[...i.subTypes.get(o.name),...i.superTypes.get(o.name)];for(let l of u){let c=r.get(l);c&&!a.has(c)&&s.push(...e(c))}return s}let r=new Map(t.map(o=>[o.name,o])),n=[],i=(0,gb.collectTypeHierarchy)(t),a=new Set;for(let o of t)a.has(o)||n.push(e(o));return n}function eW(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var hg=d(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.interpretAstReflection=void 0;var tW=nr(),rW=Pn(),nW=Ne(),iW=pg(),cs=is();function aW(t,e){let r;(0,nW.isGrammar)(t)?r=(0,iW.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=oW(r),a=sW(r),o=(0,cs.collectTypeHierarchy)((0,cs.mergeTypesAndInterfaces)(r)).superTypes;return new mg({allTypes:n,references:i,metaData:a,superTypes:o})}If.interpretAstReflection=aW;var mg=class extends tW.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function oW(t){let e=new rW.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of(0,cs.findReferenceTypes)(i.type))e.add(n.name,[i.name,a]);for(let i of n.interfaceSuperTypes){let a=e.get(i.name);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function sW(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(o=>(0,cs.hasArrayType)(o.type)),a=n.filter(o=>!(0,cs.hasArrayType)(o.type)&&(0,cs.hasBooleanType)(o.type));(i.length>0||a.length>0)&&e.set(r.name,{name:r.name,mandatory:uW(i,a)})}return e}function uW(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}});var _b=d(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.LangiumGrammarGrammar=void 0;var lW=Tt(),Df,cW=()=>Df??(Df=(0,lW.loadGrammarFromJson)(`{
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
}`));xf.LangiumGrammarGrammar=cW});var Rb=d(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.LangiumGrammarGeneratedModule=zr.LangiumGrammarGeneratedSharedModule=zr.LangiumGrammarParserConfig=zr.LangiumGrammarLanguageMetaData=void 0;var fW=Ne(),dW=_b();zr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};zr.LangiumGrammarParserConfig={maxLookahead:3};zr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new fW.LangiumGrammarAstReflection};zr.LangiumGrammarGeneratedModule={Grammar:()=>(0,dW.LangiumGrammarGrammar)(),LanguageMetaData:()=>zr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>zr.LangiumGrammarParserConfig}}});var Pr=d(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.Deferred=kt.MutexLock=kt.interruptAndCheck=kt.isOperationCancelled=kt.OperationCancelled=kt.setInterruptionPeriod=kt.startCancelableOperation=kt.delayNextTick=void 0;var Lf=bi();function Ab(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}kt.delayNextTick=Ab;var yg=0,Sb=10;function pW(){return yg=Date.now(),new Lf.CancellationTokenSource}kt.startCancelableOperation=pW;function mW(t){Sb=t}kt.setInterruptionPeriod=mW;kt.OperationCancelled=Symbol("OperationCancelled");function bb(t){return t===kt.OperationCancelled}kt.isOperationCancelled=bb;async function hW(t){if(t===Lf.CancellationToken.None)return;let e=Date.now();if(e-yg>=Sb&&(yg=e,await Ab()),t.isCancellationRequested)throw kt.OperationCancelled}kt.interruptAndCheck=hW;var gg=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Lf.CancellationTokenSource}lock(e){this.cancel();let r=new Lf.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{bb(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};kt.MutexLock=gg;var vg=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};kt.Deferred=vg});var Mf=d(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.DefaultScopeComputation=void 0;var Tg=bi(),Pb=Se(),yW=Pn(),Cb=Pr(),_g=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=Tg.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Pb.streamContents,i=Tg.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,Cb.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=Tg.CancellationToken.None){let n=e.parseResult.value,i=new yW.MultiMap;for(let a of(0,Pb.streamAllContents)(n))await(0,Cb.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};qf.DefaultScopeComputation=_g});var jf=d(la=>{"use strict";Object.defineProperty(la,"__esModule",{value:!0});la.DefaultScopeProvider=la.EMPTY_SCOPE=la.StreamScope=void 0;var gW=Se(),Ff=jt(),fs=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};la.StreamScope=fs;la.EMPTY_SCOPE={getElement(){},getAllElements(){return Ff.EMPTY_STREAM}};var Rg=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,gW.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Ff.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new fs((0,Ff.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Ff.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new fs(i,r,n)}getGlobalScope(e,r){return new fs(this.indexManager.allElements(e))}};la.DefaultScopeProvider=Rg});var $i=d(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.relativeURI=ds.equalURI=void 0;function vW(t,e){return t?.toString()===e?.toString()}ds.equalURI=vW;function TW(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}ds.relativeURI=TW});var Eb=d(ms=>{"use strict";Object.defineProperty(ms,"__esModule",{value:!0});ms.LangiumGrammarScopeComputation=ms.LangiumGrammarScopeProvider=void 0;var _W=Mf(),Ag=jf(),ps=Se(),kb=qe(),wb=jt(),RW=$i(),Yr=Ne(),Sg=Gt(),bg=class extends Ag.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Yr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,ps.getDocument)(r.container).precomputedScopes,a=(0,ps.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,wb.stream)(s).filter(u=>u.type===Yr.Interface||u.type===Yr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,ps.getContainerOfType)(r.container,Yr.isGrammar);if(!n)return Ag.EMPTY_SCOPE;let i=(0,wb.stream)(n.imports).map(Sg.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,RW.equalURI)(o.documentUri,s)));return e===Yr.AbstractType&&(a=a.filter(o=>o.type===Yr.Interface||o.type===Yr.Type)),new Ag.StreamScope(a)}};ms.LangiumGrammarScopeProvider=bg;var Pg=class extends _W.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Yr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(a,a.name,n))}(0,ps.streamAllContents)(e).forEach(a=>{if((0,Yr.isAction)(a)&&a.inferredType){let o=(0,Sg.getActionType)(a);o&&r.push(this.createInterfaceDescription(a,o,n))}})}}processNode(e,r,n){(0,Yr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Yr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,this.createInterfaceDescription(o,o.name,r))}}processActionNode(e,r,n){let i=(0,ps.findRootNode)(e);if(i&&(0,Yr.isAction)(e)&&e.inferredType){let a=(0,Sg.getActionType)(e);a&&n.add(i,this.createInterfaceDescription(e,a,r))}}createInterfaceDescription(e,r,n=(0,ps.getDocument)(e)){var i;let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,kb.toDocumentSegment)(a),selectionSegment:(0,kb.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};ms.LangiumGrammarScopeComputation=Pg});var Og=d(hr=>{"use strict";var AW=hr&&hr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),SW=hr&&hr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),bW=hr&&hr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&AW(e,t,r);return SW(e,t),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.LangiumGrammarValidator=hr.IssueCodes=hr.registerValidationChecks=void 0;var Cg=Uo(),ca=Se(),fa=Pn(),kg=qe(),da=Tt(),wg=jt(),Xe=bW(Ne()),Eg=Ne(),Ut=Gt(),PW=lg(),Ng=Ef();function CW(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}hr.registerValidationChecks=CW;var mr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(mr=hr.IssueCodes||(hr.IssueCodes={}));var $g=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:mr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Xe.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Xe.isParserRule(a)&&!(0,Ut.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:mr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,Ut.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,wg.stream)(i.rules).filter(a=>!pl(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,wg.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new fa.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,Ut.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new fa.MultiMap;for(let i of e.imports){let a=(0,Ut.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[Cg.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,Ut.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new fa.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,wg.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,Ut.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Xe.isParserRule)){if(pl(u))continue;let l=(0,Ut.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,Ut.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:mr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let h=(0,da.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:mr.InvalidInfers,data:(0,kg.toDocumentSegment)(h)})}}else if(l&&c){let h=(0,da.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:mr.InvalidInfers,data:(0,kg.toDocumentSegment)(h)})}}for(let u of(0,ca.streamAllContents)(e).filter(Xe.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,Ut.getTypeNameWithoutError)(u);if(u.type&&f&&o.has(f)===c){let h=c?(0,da.findNodeForKeyword)(u.$cstNode,"infer"):(0,da.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?mr.SuperfluousInfer:mr.MissingInfer,data:(0,kg.toDocumentSegment)(h)})}else if(l&&f&&o.has(f)&&c&&u.$cstNode){let h=(0,da.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,da.findNodeForKeyword)(u.$cstNode,"{");h&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:mr.SuperfluousInfer,data:{start:v.range.end,end:h.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:mr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,Ut.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,ca.getContainerOfType)(e,i=>Xe.isTerminalRule(i)||Xe.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Xe.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Xe.isTerminalRule(n)&&n.fragment&&(0,ca.getContainerOfType)(e,Xe.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:mr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,Ut.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:mr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:mr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,da.getAllReachableRules)(e,!0);for(let i of e.rules)Xe.isTerminalRule(i)&&i.hidden||pl(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Cg.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new fa.MultiMap,i=new Set;for(let l of e.rules)Xe.isTerminalRule(l)&&l.name&&n.add(l.name,l),Xe.isParserRule(l)&&(0,ca.streamAllContents)(l).filter(Xe.isKeyword).forEach(f=>i.add(f.value));let a=new fa.MultiMap,o=new fa.MultiMap;for(let l of e.imports){let c=(0,Ut.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let h of f.rules)Xe.isTerminalRule(h)&&h.name?a.add(h.name,l):Xe.isParserRule(h)&&h.name&&(0,ca.streamAllContents)(h).filter(Xe.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new fa.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new fa.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(h=>!f.includes(h)).forEach(h=>u.add(h,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!pl(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:mr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&kW.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,ca.getContainerOfType)(e,Eg.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,Ut.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:mr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,ca.streamAllContents)(e).filter(Xe.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[Cg.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(pl(e))return;let n=e.dataType,i=(0,Ut.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,Eg.isRuleCall)(e.terminal)&&(0,Eg.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,ca.streamAllContents)(e.terminal).map(a=>Xe.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,PW.typeDefinitionToPropertyType)(n.type),a=(0,Ng.flattenPlainType)(i),o=!1,s=!1;for(let u of a)(0,Ng.isPlainReferenceType)(u)?o=!0:(0,Ng.isPlainReferenceType)(u)||(s=!0);o&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,Ut.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Xe.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Xe.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,da.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Xe.isRuleCall(e.terminal)&&Xe.isParserRule(e.terminal.rule.ref)&&!(0,Ut.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkFragmentsInTypes(e,r){var n,i;Xe.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){Xe.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&Xe.isParserRule(e.ref)&&!(0,Ut.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,Ut.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Xe.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};hr.LangiumGrammarValidator=$g;function pl(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var kW=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Hf=d(Cn=>{"use strict";Object.defineProperty(Cn,"__esModule",{value:!0});Cn.DocumentValidator=Cn.toDiagnosticSeverity=Cn.getDiagnosticRange=Cn.DefaultDocumentValidator=void 0;var Xr=xe(),Nb=Tt(),wW=Se(),EW=qe(),Gf=Pr(),Ig=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Xr.CancellationToken.None){let n=e.parseResult,i=[];await(0,Gf.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Xr.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Uf.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Xr.Range.create(0,0,0,0);else{let u=Xr.Position.create(s.endLine-1,s.endColumn);o=Xr.Range.create(u,u)}}}else o=(0,EW.tokenToRange)(a.token);if(o){let s={severity:Xr.DiagnosticSeverity.Error,range:o,message:a.message,code:Uf.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Uf.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Gf.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Gf.interruptAndCheck)(r),i}async validateAst(e,r,n=Xr.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,wW.streamAst)(e).map(async o=>{await(0,Gf.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:$b(n),severity:Ob(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};Cn.DefaultDocumentValidator=Ig;function $b(t){if(Xr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,Nb.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,Nb.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}Cn.getDiagnosticRange=$b;function Ob(t){switch(t){case"error":return Xr.DiagnosticSeverity.Error;case"warning":return Xr.DiagnosticSeverity.Warning;case"info":return Xr.DiagnosticSeverity.Information;case"hint":return Xr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}Cn.toDiagnosticSeverity=Ob;var Uf;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Uf=Cn.DocumentValidator||(Cn.DocumentValidator={}))});var qb=d(Xn=>{"use strict";var NW=Xn&&Xn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),$W=Xn&&Xn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),OW=Xn&&Xn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&NW(e,t,r);return $W(e,t),e};Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LangiumGrammarCodeActionProvider=void 0;var Jr=xe(),IW=bn(),Ib=Se(),Db=qe(),DW=Tt(),xb=to(),Lb=$i(),xW=Hf(),Dg=OW(Ne()),Qr=Og(),xg=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Qr.IssueCodes.GrammarNameUppercase:case Qr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Qr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Qr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Qr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Qr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Qr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Qr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Qr.IssueCodes.InvalidInfers:case Qr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Qr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Qr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case xW.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,Db.findLeafNodeAtOffset)(i,n),o=(0,Ib.getContainerOfType)(a?.element,Dg.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,xb.escapeRegExp)(s)}-${(0,xb.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,DW.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&Dg.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,Db.findLeafNodeAtOffset)(a,i),s=(0,Ib.getContainerOfType)(o?.element,Dg.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(h=>h.name===r.refText),l=[],c=-1,f=-1;for(let h of u){if((0,Lb.equalURI)(h.documentUri,n.uri))continue;let v=LW(n.uri,h.documentUri),y,A="",w=n.parseResult.value,C=w.imports.find(b=>b.path&&v<b.path);if(C)y=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(w.imports.length>0){let b=w.imports[w.imports.length-1].$cstNode.range.end;b&&(y={line:b.line+1,character:0})}else w.rules.length>0&&(y=(a=w.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,A=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Jr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Xn.LangiumGrammarCodeActionProvider=xg;function LW(t,e){let r=IW.Utils.dirname(t),n=(0,Lb.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Wf=d(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.DefaultFoldingRangeProvider=void 0;var Lg=xe(),qW=Se(),MW=qe(),qg=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,qW.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,MW.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,Lg.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),Lg.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===Lg.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Kf.DefaultFoldingRangeProvider=qg});var Mb=d(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.LangiumGrammarFoldingRangeProvider=void 0;var FW=Wf(),jW=Ne(),Mg=class extends FW.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,jW.isParserRule)(e)}};Bf.LangiumGrammarFoldingRangeProvider=Mg});var Gg=d(kn=>{"use strict";Object.defineProperty(kn,"__esModule",{value:!0});kn.Formatting=kn.FormattingRegion=kn.DefaultNodeFormatter=kn.AbstractFormatter=void 0;var Vf=Tt(),Fg=nr(),GW=Se(),Fb=qe(),ml=jt(),jg=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new zf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let h=this.nodeModeToKey(s,u),v=i.get(h),y=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||A<=y)&&i.set(h,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,GW.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,h=(0,Fg.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let C=this.createTextEdit(l,f,y,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let A=this.nodeModeToKey(f,"append"),w=r.get(A);if(r.delete(A),w){let C=(0,Fb.getNextNode)(f);if(C){let b=this.createTextEdit(f,C,w,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}h&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let A=r.text.split(`
`);A[0]=l+A[0];for(let w=0;w<A.length;w++){let C=o+w,b={character:0,line:C};if(v>0)s.push({newText:y,range:{start:b,end:b}});else{let S=A[w],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:C,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let h=[];return u!==void 0?h.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?h.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&h.push(this.createTabTextEdit(o,Boolean(e),i)),(0,Fg.isLeafCstNode)(r)&&(i.indentation=f),h}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new ml.TreeStreamImpl(i,a=>this.iterateCst(a,r)):ml.EMPTY_STREAM}iterateCst(e,r){if(!(0,Fg.isCompositeCstNode)(e))return ml.EMPTY_STREAM;let n=r.indentation;return new ml.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,ml.DONE_RESULT))}};kn.AbstractFormatter=jg;var zf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new Cr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new Cr(r,this.collector)}property(e,r){let n=(0,Vf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new Cr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Vf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new Cr(r,this.collector)}keyword(e,r){let n=(0,Vf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new Cr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Vf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new Cr(r,this.collector)}cst(e){return new Cr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new Cr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new Cr((0,Fb.getInteriorNodes)(a,o),this.collector)}};kn.DefaultNodeFormatter=zf;var Cr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new Cr(this.nodes.slice(e,r),this.collector)}};kn.FormattingRegion=Cr;var UW;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var h,v,y,A,w,C;let b=(h=c.lines)!==null&&h!==void 0?h:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(A=f.tabs)!==null&&A!==void 0?A:0,W=(w=c.characters)!==null&&w!==void 0?w:0,te=(C=f.characters)!==null&&C!==void 0?C:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<te?-1:W>te?1:0}})(UW=kn.Formatting||(kn.Formatting={}))});var jb=d(Jn=>{"use strict";var HW=Jn&&Jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),KW=Jn&&Jn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),WW=Jn&&Jn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&HW(e,t,r);return KW(e,t),e};Object.defineProperty(Jn,"__esModule",{value:!0});Jn.LangiumGrammarFormatter=void 0;var Ce=Gg(),pa=WW(Ne()),Ug=class extends Ce.AbstractFormatter{format(e){if(pa.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Ce.Formatting.noSpace());else if(pa.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Ce.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Ce.Formatting.oneSpace()):r.property("name").append(Ce.Formatting.noSpace()),r.properties("parameters").append(Ce.Formatting.noSpace()),r.keywords(",").append(Ce.Formatting.oneSpace()),r.keywords("<").append(Ce.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Ce.Formatting.noSpace()),r.interior(i,n).prepend(Ce.Formatting.indent()),n.prepend(Ce.Formatting.fit(Ce.Formatting.noSpace(),Ce.Formatting.newLine())),r.node(e).prepend(Ce.Formatting.noIndent())}else if(pa.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Ce.Formatting.oneSpace()),r.keyword("returns").append(Ce.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Ce.Formatting.oneSpace()),r.keyword(":").prepend(Ce.Formatting.noSpace()),r.keyword(";").prepend(Ce.Formatting.fit(Ce.Formatting.noSpace(),Ce.Formatting.newLine())),r.node(e).prepend(Ce.Formatting.noIndent())}else if(pa.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Ce.Formatting.noSpace()),r.keywords(".","+=","=").surround(Ce.Formatting.noSpace()),r.keyword("}").prepend(Ce.Formatting.noSpace())}else if(pa.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Ce.Formatting.oneSpace());else if(pa.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Ce.Formatting.noSpace());else if(pa.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Ce.Formatting.noSpace()),r.keyword(",").append(Ce.Formatting.oneSpace()),r.properties("arguments").append(Ce.Formatting.noSpace())}pa.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Ce.Formatting.noSpace())}};Jn.LangiumGrammarFormatter=Ug});var Jf=d(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.SemanticTokensDecoder=wt.AbstractSemanticTokenProvider=wt.SemanticTokensBuilder=wt.DefaultSemanticTokenOptions=wt.AllSemanticTokenModifiers=wt.AllSemanticTokenTypes=void 0;var pe=xe(),Yf=Tt(),BW=Se(),VW=Pr(),zW=qe();wt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};wt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};wt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(wt.AllSemanticTokenTypes),tokenModifiers:Object.keys(wt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Xf=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};wt.SemanticTokensBuilder=Xf;var Hg=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Xf;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,a=(0,BW.streamAst)(i,{range:this.currentRange}).iterator(),o;do if(o=a.next(),!o.done){await(0,VW.interruptAndCheck)(n);let s=o.value;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.currentRange&&!(0,zW.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let o=wt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=wt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),h=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,h-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let h=u+1;h<l;h++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:h+1,character:0}),this.currentTokensBuilder.push(h,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,Yf.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,Yf.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,Yf.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,Yf.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};wt.AbstractSemanticTokenProvider=Hg;var YW;(function(t){function e(n,i){let a=new Map;Object.entries(wt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(YW=wt.SemanticTokensDecoder||(wt.SemanticTokensDecoder={}))});var Gb=d(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.LangiumGrammarSemanticTokenProvider=void 0;var ma=xe(),XW=Jf(),ha=Ne(),Kg=class extends XW.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,ha.isAssignment)(e)?r({node:e,property:"feature",type:ma.SemanticTokenTypes.property}):(0,ha.isAction)(e)?e.feature&&r({node:e,property:"feature",type:ma.SemanticTokenTypes.property}):(0,ha.isReturnType)(e)?r({node:e,property:"name",type:ma.SemanticTokenTypes.type}):(0,ha.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ma.SemanticTokenTypes.type}):(0,ha.isParameter)(e)?r({node:e,property:"name",type:ma.SemanticTokenTypes.parameter}):(0,ha.isParameterReference)(e)?r({node:e,property:"parameter",type:ma.SemanticTokenTypes.parameter}):(0,ha.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ma.SemanticTokenTypes.type}):(0,ha.isTypeAttribute)(e)&&r({node:e,property:"name",type:ma.SemanticTokenTypes.property})}};Qf.LangiumGrammarSemanticTokenProvider=Kg});var Hb=d(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.LangiumGrammarNameProvider=void 0;var JW=os(),QW=Tt(),Ub=Ne(),Wg=class extends JW.DefaultNameProvider{getName(e){return(0,Ub.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,Ub.isAssignment)(e)?(0,QW.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};Zf.LangiumGrammarNameProvider=Wg});var td=d(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.DefaultReferences=void 0;var ZW=Tt(),Kb=nr(),ya=Se(),Bg=qe(),Wb=jt(),e5=$i(),Vg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,ZW.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,Kb.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,Kb.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Bg.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,Wb.stream)(n)}findLocalReferences(e,r=!1){let i=(0,ya.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,ya.streamAst)(i).forEach(o=>{(0,ya.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,ya.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,ya.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Bg.toDocumentSegment)(u),local:(0,e5.equalURI)((0,ya.getDocument)(u.element).uri,(0,ya.getDocument)(e).uri)})}})}),(0,Wb.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,ya.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Bg.toDocumentSegment)(r),local:!0}}}};ed.DefaultReferences=Vg});var Xb=d(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.LangiumGrammarReferences=void 0;var t5=td(),ar=Se(),Bb=qe(),Vb=Tt(),zb=jt(),zg=$i(),Jt=Ne(),Yb=Gt(),rd=is(),Yg=class extends t5.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,Vb.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Jt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Jt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Jt.isTypeAttribute)(e)){let i=(0,ar.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Jt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,ar.getContainerOfType)(e,Jt.isInterface);if(a){let o=(0,rd.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,zg.equalURI)((0,ar.getDocument)(e).uri,(0,ar.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,zb.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,ar.getContainerOfType)(e,Jt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,rd.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,zb.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Jt.isParserRule)(e)){let i=(0,Yb.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,ar.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,ar.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,Bb.toDocumentSegment)(a),local:(0,zg.equalURI)((0,ar.getDocument)(i).uri,(0,ar.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,Vb.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,ar.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,ar.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,Bb.toDocumentSegment)(a),local:(0,zg.equalURI)((0,ar.getDocument)(e).uri,(0,ar.getDocument)(r).uri)})}let i=(0,ar.getContainerOfType)(e,Jt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,ar.getContainerOfType)(e,Jt.isParserRule),i=(0,Yb.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Jt.isInterface)(n.returnType.ref)||(0,Jt.isType)(n.returnType.ref))){let a=(0,rd.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,rd.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Jt.isParserRule)(o)||(0,Jt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,ar.streamAst)(r).filter(a=>{var o,s;return(0,Jt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Jt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Jt.isParserRule)(a)||(0,Jt.isAction)(a))&&n.push(a)}),n}};nd.LangiumGrammarReferences=Yg});var Qg=d(Zr=>{"use strict";var r5=Zr&&Zr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),n5=Zr&&Zr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i5=Zr&&Zr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&r5(e,t,r);return n5(e,t),e};Object.defineProperty(Zr,"__esModule",{value:!0});Zr.findFirstFeatures=Zr.findNextFeatures=void 0;var or=i5(Ne()),Oi=Gt(),a5=nr(),o5=Se(),s5=Tt();function u5(t,e){let r={stacks:t,tokens:e};return l5(r),r.stacks.flat().forEach(i=>{i.property=void 0}),Zb(r.stacks).map(i=>i[i.length-1])}Zr.findNextFeatures=u5;function Xg(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(or.isGroup(u.$container)){s=u.$container;break}else if(or.isAbstractElement(u.$container))u=u.$container;else break;if((0,Oi.isArrayCardinality)(u.cardinality)){let l=hs({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...Qb({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,Oi.isOptionalCardinality)(c.feature.cardinality)||(0,Oi.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Xg({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function Jb(t){return(0,a5.isAstNode)(t)&&(t={feature:t}),hs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Zr.findFirstFeatures=Jb;function hs(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(or.isGroup(u)){if(o.has(u))return[];o.add(u)}if(or.isGroup(u))return Qb(i,0,a,o,s).map(c=>id(c,u.cardinality,a));if(or.isAlternatives(u)||or.isUnorderedGroup(u))return u.elements.flatMap(c=>hs({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>id(c,u.cardinality,a));if(or.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return hs({next:c,cardinalities:a,visited:o,plus:s}).map(f=>id(f,u.cardinality,a))}else{if(or.isAction(u))return Xg({next:{feature:u,new:!0,type:(0,Oi.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(or.isRuleCall(u)&&or.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,Oi.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return hs({next:f,cardinalities:a,visited:o,plus:s}).map(h=>id(h,u.cardinality,a))}else return[i]}}function id(t,e,r){return r.set(t.feature,e),t}function Qb(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...hs({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Oi.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function l5(t){for(let e of t.tokens){let r=Zb(t.stacks,e);t.stacks=r}}function Zb(t,e){let r=[];for(let n of t)r.push(...c5(n,e));return r}function c5(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(f5)),i=[];for(;t.length>0;){let a=t.pop(),o=Xg({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?Jg(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,Oi.isOptionalCardinality)(s.feature.cardinality)||(0,Oi.isOptionalCardinality)(r.get(s.feature))))break}return i}function f5(t){if(t.cardinality==="+")return!0;let e=(0,o5.getContainerOfType)(t,or.isAssignment);return!!(e&&e.cardinality==="+")}function Jg(t,e){if(or.isKeyword(t))return t.value===e.image;if(or.isRuleCall(t))return d5(t.rule.ref,e);if(or.isCrossReference(t)){let r=(0,s5.getCrossReferenceTerminal)(t);if(r)return Jg(r,e)}return!1}function d5(t,e){return or.isParserRule(t)?Jb(t.definition).some(n=>Jg(n.feature,e)):or.isTerminalRule(t)?new RegExp((0,Oi.terminalRegex)(t)).test(e.image):!1}});var od=d(en=>{"use strict";var p5=en&&en.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),m5=en&&en.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),h5=en&&en.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&p5(e,t,r);return m5(e,t),e};Object.defineProperty(en,"__esModule",{value:!0});en.DefaultCompletionProvider=en.mergeCompletionProviderOptions=void 0;var hl=xe(),yl=h5(Ne()),y5=Gt(),g5=Se(),v5=qe(),eP=Tt(),tP=jt(),ad=Qg();function T5(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}en.mergeCompletionProviderOptions=T5;var Zg=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=C=>{let b=this.fillCompletionItem(o,u,C);b&&a.push(b)},c=(0,v5.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let C=(0,eP.getEntryRule)(this.grammar);return await this.completionForRule(f,C,l),hl.CompletionList.create(a,!0)}let h=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,h),y=[],A=this.canReparse()&&u!==h;A&&(y=this.findFeaturesAt(o,u));let w=C=>yl.isKeyword(C.feature)?C.feature.value:C.feature;return await Promise.all((0,tP.stream)(v).distinct(w).map(C=>this.completionFor(f,C,l))),A&&await Promise.all((0,tP.stream)(y).exclude(v,w).distinct(w).map(C=>this.completionFor(f,C,l))),hl.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:hl.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,eP.getEntryRule)(this.grammar),l=(0,ad.findFirstFeatures)({feature:u.definition,new:!0,type:(0,y5.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,ad.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,ad.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(yl.isParserRule(r)){let i=(0,ad.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(yl.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(yl.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,g5.getContainerOfType)(r.feature,yl.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:hl.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:hl.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return rP<=e&&e<=nP&&_5<=r&&r<=R5||e===iP&&r!==iP}toUpperCharCode(e){return rP<=e&&e<=nP?e-32:e}};en.DefaultCompletionProvider=Zg;var rP="a".charCodeAt(0),nP="z".charCodeAt(0),_5="A".charCodeAt(0),R5="Z".charCodeAt(0),iP="_".charCodeAt(0)});var rv=d(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.AbstractCallHierarchyProvider=void 0;var A5=xe(),aP=bn(),ev=qe(),tv=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,ev.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:A5.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(aP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,ev.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(aP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,ev.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};sd.AbstractCallHierarchyProvider=tv});var sP=d(oP=>{"use strict";Object.defineProperty(oP,"__esModule",{value:!0})});var lP=d(uP=>{"use strict";Object.defineProperty(uP,"__esModule",{value:!0})});var fP=d(cP=>{"use strict";Object.defineProperty(cP,"__esModule",{value:!0})});var iv=d(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.DefaultDefinitionProvider=void 0;var S5=xe(),b5=Se(),P5=qe(),nv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,P5.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[S5.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,b5.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};ud.DefaultDefinitionProvider=nv});var ov=d(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.DefaultDocumentHighlightProvider=void 0;var C5=xe(),k5=Se(),w5=qe(),E5=$i(),av=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,w5.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,E5.equalURI)((0,k5.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return C5.DocumentHighlight.create(e.segment.range)}};ld.DefaultDocumentHighlightProvider=av});var pP=d(dP=>{"use strict";Object.defineProperty(dP,"__esModule",{value:!0})});var uv=d(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.DefaultDocumentSymbolProvider=void 0;var N5=xe(),$5=Se(),sv=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,$5.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return N5.SymbolKind.Field}};cd.DefaultDocumentSymbolProvider=sv});var mP=d(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.AbstractExecuteCommandHandler=void 0;var O5=xe(),lv=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=O5.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};fd.AbstractExecuteCommandHandler=lv});var fv=d(ys=>{"use strict";Object.defineProperty(ys,"__esModule",{value:!0});ys.MultilineCommentHoverProvider=ys.AstNodeHoverProvider=void 0;var I5=qe(),dd=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,I5.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};ys.AstNodeHoverProvider=dd;var cv=class extends dd{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};ys.MultilineCommentHoverProvider=cv});var hP=d(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.AbstractGoToImplementationProvider=void 0;var D5=xe(),x5=qe(),dv=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=D5.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,x5.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};pd.AbstractGoToImplementationProvider=dv});var yP=d(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.AbstractInlayHintProvider=void 0;var L5=xe(),q5=Se(),M5=Pr(),pv=class{async getInlayHints(e,r,n=L5.CancellationToken.None){let i=e.parseResult.value,a=[],o=s=>a.push(s);for(let s of(0,q5.streamAst)(i,{range:r.range}))await(0,M5.interruptAndCheck)(n),this.computeInlayHint(s,o);return a}};md.AbstractInlayHintProvider=pv});var ga=d(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.DefaultLangiumDocuments=Ii.DefaultLangiumDocumentFactory=Ii.DocumentState=void 0;var F5=Ay(),j5=bn(),G5=jt(),gs;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(gs=Ii.DocumentState||(Ii.DocumentState={}));var mv=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??j5.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:gs.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:gs.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=gs.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=F5.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ii.DefaultLangiumDocumentFactory=mv;var hv=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,G5.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=gs.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=gs.Changed,this.documentMap.delete(r)),n}};Ii.DefaultLangiumDocuments=hv});var gv=d(vs=>{"use strict";Object.defineProperty(vs,"__esModule",{value:!0});vs.mergeSignatureHelpOptions=vs.AbstractSignatureHelpProvider=void 0;var U5=xe(),H5=qe(),yv=class{provideSignatureHelp(e,r,n=U5.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,H5.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};vs.AbstractSignatureHelpProvider=yv;function K5(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}vs.mergeSignatureHelpOptions=K5});var _v=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addInlayHintHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var io=xe(),gl=bn(),gP=tl(),W5=Pr(),B5=ga(),V5=od(),z5=Jf(),Y5=gv(),vv=class{constructor(e){this.onInitializeEmitter=new io.Emitter,this.onInitializedEmitter=new io.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,gP.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,gP.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var fe;return(fe=V.lsp.Formatter)===null||fe===void 0?void 0:fe.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,Y5.mergeSignatureHelpOptions)(n.map(V=>{var fe;return(fe=V.lsp.SignatureHelp)===null||fe===void 0?void 0:fe.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),h=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=(0,V5.mergeCompletionProviderOptions)(n.map(V=>{var fe;return(fe=V.lsp.CompletionProvider)===null||fe===void 0?void 0:fe.completionOptions})),A=this.hasService(V=>V.lsp.ReferencesProvider),w=this.hasService(V=>V.lsp.DocumentSymbolProvider),C=this.hasService(V=>V.lsp.DefinitionProvider),b=this.hasService(V=>V.lsp.DocumentHighlightProvider),S=this.hasService(V=>V.lsp.FoldingRangeProvider),O=this.hasService(V=>V.lsp.HoverProvider),F=this.hasService(V=>V.lsp.RenameProvider),W=this.hasService(V=>V.lsp.CallHierarchyProvider),te=this.services.lsp.CodeLensProvider,we=this.hasService(V=>V.lsp.DeclarationProvider),Ee=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:io.TextDocumentSyncKind.Incremental,completionProvider:v?y:void 0,referencesProvider:A,documentSymbolProvider:w,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:b,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:S,hoverProvider:O,renameProvider:F?{prepareProvider:!0}:void 0,semanticTokensProvider:s?z5.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:h,callHierarchyProvider:W?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:te?{resolveProvider:Boolean(te.resolveCodeLens)}:void 0,declarationProvider:we,inlayHintProvider:Ee?{resolveProvider:Boolean(Ee.resolveInlayHint)}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=vv;function X5(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");vP(e,t),TP(e,t),_P(e,t),RP(e,t),SP(e,t),bP(e,t),PP(e,t),CP(e,t),wP(e,t),NP(e,t),$P(e,t),AP(e,t),OP(e,t),EP(e,t),IP(e,t),DP(e,t),LP(e,t),MP(e,t),jP(e,t),FP(e,t),qP(e,t),xP(e,t),kP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=X5;function vP(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([gl.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=[],u=[];for(let l of o.changes){let c=gl.URI.parse(l.uri);l.type===io.FileChangeType.Deleted?u.push(c):s.push(c)}i(s,u)})}Q.addDocumentsHandler=vP;function TP(t,e){e.workspace.DocumentBuilder.onBuildPhase(B5.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=TP;function _P(t,e){t.onCompletion(Qt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=_P;function RP(t,e){t.onReferences(Qt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=RP;function AP(t,e){t.onCodeAction(Qt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=AP;function SP(t,e){t.onDocumentSymbol(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=SP;function bP(t,e){t.onDefinition(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=bP;function PP(t,e){t.onTypeDefinition(Qt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=PP;function CP(t,e){t.onImplementation(Qt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=CP;function kP(t,e){t.onDeclaration(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=kP;function wP(t,e){t.onDocumentHighlight(Qt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=wP;function EP(t,e){t.onHover(Qt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=EP;function NP(t,e){t.onFoldingRanges(Qt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=NP;function $P(t,e){t.onDocumentFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Qt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=$P;function OP(t,e){t.onRenameRequest(Qt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Qt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=OP;function IP(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(Di((a,o,s,u)=>n.getInlayHints(o,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addInlayHintHandler=IP;function DP(t,e){let r={data:[]};t.languages.semanticTokens.on(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):r,e)),t.languages.semanticTokens.onDelta(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):r,e)),t.languages.semanticTokens.onRange(Di((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):r,e))}Q.addSemanticTokenHandler=DP;function xP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=xP;function LP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return ao(o)}})}Q.addExecuteCommandHandler=LP;function qP(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(Di((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addDocumentLinkHandler=qP;function MP(t,e){t.onSignatureHelp(Di((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=MP;function FP(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(Di((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return ao(s)}})}}Q.addCodeLensHandler=FP;function jP(t,e){t.languages.callHierarchy.onPrepare(Di((r,n,i,a)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,a))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onIncomingCalls(Tv((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onOutgoingCalls(Tv((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&a!==void 0?a:null},e))}Q.addCallHierarchyHandler=jP;function Tv(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=gl.URI.parse(n.item.uri),o=r.getServices(a);if(!o){let s=`Could not find service instance for uri: '${a.toString()}'`;throw console.error(s),new Error(s)}try{return await t(o,n,i)}catch(s){return ao(s)}}}Q.createCallHierarchyRequestHandler=Tv;function Di(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=gl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return ao(l)}}}Q.createServerRequestHandler=Di;function Qt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=gl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return ao(l)}}}Q.createRequestHandler=Qt;function ao(t){if((0,W5.isOperationCancelled)(t))return new io.ResponseError(io.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof io.ResponseError)return t;throw t}});var Av=d(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.DefaultReferencesProvider=void 0;var J5=xe(),Q5=qe(),Rv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,Q5.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(J5.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};hd.DefaultReferencesProvider=Rv});var bv=d(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.DefaultRenameProvider=void 0;var Z5=xe(),eB=os(),GP=qe(),Sv=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,GP.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=Z5.TextEdit.replace(c.segment.range,r.newName),h=c.sourceUri.toString();n[h]?n[h].push(f):n[h]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,GP.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,eB.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};yd.DefaultRenameProvider=Sv});var UP=d(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.AbstractTypeDefinitionProvider=void 0;var tB=xe(),rB=qe(),Pv=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=tB.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,rB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};gd.AbstractTypeDefinitionProvider=Pv});var Cv=d(Me=>{"use strict";var nB=Me&&Me.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ht=Me&&Me.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&nB(e,t,r)};Object.defineProperty(Me,"__esModule",{value:!0});ht(od(),Me);ht(Qg(),Me);ht(rv(),Me);ht(sP(),Me);ht(lP(),Me);ht(fP(),Me);ht(iv(),Me);ht(ov(),Me);ht(pP(),Me);ht(uv(),Me);ht(mP(),Me);ht(Wf(),Me);ht(Gg(),Me);ht(fv(),Me);ht(hP(),Me);ht(yP(),Me);ht(_v(),Me);ht(Av(),Me);ht(bv(),Me);ht(Jf(),Me);ht(gv(),Me);ht(UP(),Me)});var HP=d(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.LangiumGrammarDefinitionProvider=void 0;var kv=xe(),iB=Cv(),aB=Se(),oB=Tt(),sB=Ne(),uB=Gt(),wv=class extends iB.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,sB.isGrammarImport)(e.element)&&((n=(0,oB.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,uB.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,h=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:kv.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:kv.Range.create(0,0,0,0);return[kv.LocationLink.create(c.$document.uri.toString(),v,h,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,aB.streamContents)(e).head()}};vd.LangiumGrammarDefinitionProvider=wv});var WP=d(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.LangiumGrammarCallHierarchyProvider=void 0;var KP=xe(),lB=rv(),Ev=Se(),cB=qe(),Td=Ne(),Nv=class extends lB.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Td.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,cB.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,Ev.getContainerOfType)(s.element,Td.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:KP.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Td.isParserRule)(e))return;let r=(0,Ev.streamAllContents)(e).filter(Td.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,Ev.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:KP.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};_d.LangiumGrammarCallHierarchyProvider=Nv});var zP=d(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.LangiumGrammarValidationResourcesCollector=void 0;var fB=Pn(),VP=jt(),Rd=Ne(),BP=Gt(),Ad=is(),dB=pg(),$v=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,dB.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=pB(e);for(let s of(0,Ad.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,VP.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,Ad.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},l??{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,Ad.mergeInterfaces)(e,r),a=new Map(i.map(o=>[o.name,o]));for(let o of(0,Ad.mergeInterfaces)(e,r))n.set(o.name,this.addSuperProperties(o,a,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let a of e.superTypes){let o=r.get(a.name);o&&i.push(...this.addSuperProperties(o,r,n))}return i}};Sd.LangiumGrammarValidationResourcesCollector=$v;function pB({parserRules:t,datatypeRules:e}){let r=new fB.MultiMap;(0,VP.stream)(t).concat(e).forEach(i=>r.add((0,BP.getRuleType)(i),i));function n(i){if((0,Rd.isAction)(i)){let a=(0,BP.getActionType)(i);a&&r.add(a,i)}((0,Rd.isAlternatives)(i)||(0,Rd.isGroup)(i)||(0,Rd.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var YP=d(va=>{"use strict";Object.defineProperty(va,"__esModule",{value:!0});va.isInferredAndDeclared=va.isInferred=va.isDeclared=void 0;function mB(t){return t&&"declared"in t}va.isDeclared=mB;function hB(t){return t&&"inferred"in t}va.isInferred=hB;function yB(t){return t&&"inferred"in t&&"declared"in t}va.isInferredAndDeclared=yB});var XP=d(tn=>{"use strict";var gB=tn&&tn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),vB=tn&&tn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),TB=tn&&tn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&gB(e,t,r);return vB(e,t),e};Object.defineProperty(tn,"__esModule",{value:!0});tn.LangiumGrammarTypesValidator=tn.registerTypeValidationChecks=void 0;var Ts=TB(Ne()),_B=Pn(),RB=Gt(),Et=ns(),Ov=YP();function AB(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}tn.registerTypeValidationChecks=AB;var Iv=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,Ov.isDeclared)(a)&&(0,Et.isInterfaceType)(a.declared)&&Ts.isInterface(a.declaredNode)){let o=a;bB(o,r),PB(o,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,Ov.isInferred)(a)&&a.inferred instanceof Et.InterfaceType&&SB(a.inferred,r),(0,Ov.isInferredAndDeclared)(a)&&wB(a,r)}checkActionIsNotUnionType(e,r){Ts.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};tn.LangiumGrammarTypesValidator=Iv;function SB(t,e){t.properties.forEach(r=>{var n;let i=(0,Et.flattenPropertyUnion)(r.type);if(i.length>1){let a=s=>(0,Et.isReferenceType)(s)?"ref":"other",o=a(i[0]);if(i.slice(1).some(s=>a(s)!==o)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function bB({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,Et.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function PB({declared:t,declaredNode:e},r){let n=t.properties.reduce((o,s)=>o.add(s.name,s),new _B.MultiMap);for(let[o,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${o}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let o=0;o<i.length;o++)for(let s=o+1;s<i.length;s++){let u=i[o],l=i[s],c=(0,Et.isInterfaceType)(u)?u.superProperties:[],f=(0,Et.isInterfaceType)(l)?l.superProperties:[],h=CB(c,f);h.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${h.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let a=new Set;for(let o of i){let s=(0,Et.isInterfaceType)(o)?o.superProperties:[];for(let u of s)a.add(u.name)}for(let o of t.properties)if(a.has(o.name)){let s=e.attributes.find(u=>u.name===o.name);s&&r("error",`Cannot redeclare property '${o.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function CB(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!kB(n,i)&&r.push(n.name)}return r}function kB(t,e){return(0,Et.isTypeAssignable)(t.type,e.type)&&(0,Et.isTypeAssignable)(e.type,t.type)}function wB(t,e){let{inferred:r,declared:n,declaredNode:i,inferredNodes:a}=t,o=n.name,s=c=>f=>a.forEach(h=>e("error",`${f}${c?` ${c}`:""}.`,h?.inferredType?{node:h?.inferredType,property:"name"}:{node:h,property:Ts.isAction(h)?"type":"name"})),u=(c,f)=>c.forEach(h=>e("error",f,{node:h,property:Ts.isAssignment(h)||Ts.isAction(h)?"feature":"name"})),l=c=>{a.forEach(f=>{Ts.isParserRule(f)&&(0,RB.extractAssignments)(f.definition).find(v=>v.feature===c)===void 0&&e("error",`Property '${c}' is missing in a rule '${f.name}', but is required in type '${o}'.`,{node:f,property:"parameters"})})};if((0,Et.isUnionType)(r)&&(0,Et.isUnionType)(n))EB(r.type,n.type,s(`in a rule that returns type '${o}'`));else if((0,Et.isInterfaceType)(r)&&(0,Et.isInterfaceType)(n))NB(r,n,s(`in a rule that returns type '${o}'`),u,l);else{let c=`Inferred and declared versions of type '${o}' both have to be interfaces or unions.`;s()(c),e("error",c,{node:i,property:"name"})}}function EB(t,e,r){(0,Et.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,Et.propertyTypeToString)(t,"DeclaredType")}' to '${(0,Et.propertyTypeToString)(e,"DeclaredType")}'`)}function NB(t,e,r,n,i){let a=new Set(t.properties.map(l=>l.name)),o=new Map(t.allProperties.map(l=>[l.name,l])),s=new Map(e.superProperties.map(l=>[l.name,l]));for(let[l,c]of o.entries()){let f=s.get(l);if(f){let h=(0,Et.propertyTypeToString)(c.type,"DeclaredType"),v=(0,Et.propertyTypeToString)(f.type,"DeclaredType");if(!(0,Et.isTypeAssignable)(c.type,f.type)){let A=`The assigned type '${h}' is not compatible with the declared property '${l}' of type '${v}'.`;n(c.astNodes,A)}!f.optional&&c.optional&&i(l)}else a.has(l)&&n(c.astNodes,`A property '${l}' is not expected.`)}let u=new Set;for(let[l,c]of s.entries())!o.get(l)&&!c.optional&&u.add(l);if(u.size>0){let l=u.size>1?"Properties":"A property",c=u.size>1?"are expected":"is expected",f=Array.from(u).map(h=>`'${h}'`).sort().join(", ");r(`${l} ${f} ${c}.`)}}});var Dv=d(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.createLangiumGrammarServices=oo.LangiumGrammarModule=void 0;var JP=bd(),QP=tl(),ZP=Rb(),eC=Eb(),tC=Og(),$B=qb(),OB=Mb(),IB=jb(),DB=Gb(),xB=Hb(),LB=Xb(),qB=HP(),MB=WP(),FB=zP(),rC=XP(),jB=Pr(),GB=ga();oo.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new tC.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new FB.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new rC.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new OB.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new $B.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new DB.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new IB.LangiumGrammarFormatter,DefinitionProvider:t=>new qB.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new MB.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new eC.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new eC.LangiumGrammarScopeProvider(t),References:t=>new LB.LangiumGrammarReferences(t),NameProvider:()=>new xB.LangiumGrammarNameProvider}};function UB(t,e){let r=(0,QP.inject)((0,JP.createDefaultSharedModule)(t),ZP.LangiumGrammarGeneratedSharedModule,e),n=(0,QP.inject)((0,JP.createDefaultModule)({shared:r}),ZP.LangiumGrammarGeneratedModule,oo.LangiumGrammarModule);return HB(r,n),r.ServiceRegistry.register(n),(0,tC.registerValidationChecks)(n),(0,rC.registerTypeValidationChecks)(n),{shared:r,grammar:n}}oo.createLangiumGrammarServices=UB;function HB(t,e){t.workspace.DocumentBuilder.onBuildPhase(GB.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,jB.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var xv=d(_s=>{"use strict";Object.defineProperty(_s,"__esModule",{value:!0});_s.EmptyFileSystem=_s.EmptyFileSystemProvider=void 0;var Pd=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};_s.EmptyFileSystemProvider=Pd;_s.EmptyFileSystem={fileSystemProvider:()=>new Pd}});var Tt=d(me=>{"use strict";var KB=me&&me.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),WB=me&&me.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),BB=me&&me.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&KB(e,t,r);return WB(e,t),e};Object.defineProperty(me,"__esModule",{value:!0});me.createServicesForGrammar=me.loadGrammarFromJson=me.findNameAssignment=me.findAssignment=me.findNodesForKeywordInternal=me.findNodeForKeyword=me.findNodesForKeyword=me.findNodeForProperty=me.findNodesForProperty=me.isCommentTerminal=me.getCrossReferenceTerminal=me.getAllReachableRules=me.getHiddenRules=me.getEntryRule=void 0;var aC=bn(),nC=bd(),iC=tl(),VB=hg(),yr=BB(Ne()),zB=Gt(),oC=Dv(),YB=nr(),Rs=Se(),XB=qe(),Lv=xv();function sC(t){return t.rules.find(e=>yr.isParserRule(e)&&e.entry)}me.getEntryRule=sC;function uC(t){return t.rules.filter(e=>yr.isTerminalRule(e)&&e.hidden)}me.getHiddenRules=uC;function JB(t,e){let r=new Set,n=sC(t);if(!n)return new Set(t.rules);let i=[n].concat(uC(t));for(let o of i)lC(o,r,e);let a=new Set;for(let o of t.rules)(r.has(o.name)||yr.isTerminalRule(o)&&o.hidden)&&a.add(o);return a}me.getAllReachableRules=JB;function lC(t,e,r){e.add(t.name),(0,Rs.streamAllContents)(t).forEach(n=>{if(yr.isRuleCall(n)||r&&yr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&lC(i,e,r)}})}function QB(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=cC(t.type.ref);return e?.terminal}}me.getCrossReferenceTerminal=QB;function ZB(t){return t.hidden&&!" ".match((0,zB.terminalRegex)(t))}me.isCommentTerminal=ZB;function e3(t,e){return!t||!e?[]:qv(t,e,t.element,!0)}me.findNodesForProperty=e3;function t3(t,e,r){if(!t||!e)return;let n=qv(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}me.findNodeForProperty=t3;function qv(t,e,r,n){if(!n){let i=(0,Rs.getContainerOfType)(t.feature,yr.isAssignment);if(i&&i.feature===e)return[t]}return(0,YB.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>qv(i,e,r,!1)):[]}function r3(t,e){return t?Mv(t,e,t?.element):[]}me.findNodesForKeyword=r3;function n3(t,e,r){if(!t)return;let n=Mv(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}me.findNodeForKeyword=n3;function Mv(t,e,r){if(t.element!==r)return[];if(yr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,XB.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?yr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}me.findNodesForKeywordInternal=Mv;function i3(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,Rs.getContainerOfType)(t.feature,yr.isAssignment);if(n)return n;t=t.parent}}me.findAssignment=i3;function cC(t){return yr.isInferredType(t)&&(t=t.$container),fC(t,new Map)}me.findNameAssignment=cC;function fC(t,e){var r;function n(i,a){let o;return(0,Rs.getContainerOfType)(i,yr.isAssignment)||(o=fC(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,Rs.streamAllContents)(t)){if(yr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(yr.isRuleCall(i)&&yr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(yr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function a3(t){var e;let r=(0,oC.createLangiumGrammarServices)(Lv.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,aC.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}me.loadGrammarFromJson=a3;async function o3(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,oC.createLangiumGrammarServices)(Lv.EmptyFileSystem).grammar,u=aC.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,Rs.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},A={AstReflection:()=>(0,VB.interpretAstReflection)(f)},w={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},C=(0,iC.inject)((0,nC.createDefaultSharedModule)(Lv.EmptyFileSystem),A,t.sharedModule),b=(0,iC.inject)((0,nC.createDefaultModule)({shared:C}),w,t.module);return C.ServiceRegistry.register(b),b}me.createServicesForGrammar=o3});var Fv=d(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.createGrammarConfig=void 0;var s3=qe(),u3=Tt(),l3=to(),c3=Ne(),f3=Gt();function d3(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,c3.isTerminalRule)(n)&&(0,u3.isCommentTerminal)(n)&&(0,l3.isMultilineComment)((0,f3.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:s3.DefaultNameRegexp}}Cd.createGrammarConfig=d3});var jv=d(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.VERSION=void 0;kd.VERSION="10.4.2"});var As=d((Lye,dC)=>{var p3=Object.prototype;function m3(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||p3;return t===r}dC.exports=m3});var Gv=d((qye,pC)=>{function h3(t,e){return function(r){return t(e(r))}}pC.exports=h3});var hC=d((Mye,mC)=>{var y3=Gv(),g3=y3(Object.keys,Object);mC.exports=g3});var Uv=d((Fye,yC)=>{var v3=As(),T3=hC(),_3=Object.prototype,R3=_3.hasOwnProperty;function A3(t){if(!v3(t))return T3(t);var e=[];for(var r in Object(t))R3.call(t,r)&&r!="constructor"&&e.push(r);return e}yC.exports=A3});var Hv=d((jye,gC)=>{var S3=typeof global=="object"&&global&&global.Object===Object&&global;gC.exports=S3});var wn=d((Gye,vC)=>{var b3=Hv(),P3=typeof self=="object"&&self&&self.Object===Object&&self,C3=b3||P3||Function("return this")();vC.exports=C3});var so=d((Uye,TC)=>{var k3=wn(),w3=k3.Symbol;TC.exports=w3});var SC=d((Hye,AC)=>{var _C=so(),RC=Object.prototype,E3=RC.hasOwnProperty,N3=RC.toString,vl=_C?_C.toStringTag:void 0;function $3(t){var e=E3.call(t,vl),r=t[vl];try{t[vl]=void 0;var n=!0}catch{}var i=N3.call(t);return n&&(e?t[vl]=r:delete t[vl]),i}AC.exports=$3});var PC=d((Kye,bC)=>{var O3=Object.prototype,I3=O3.toString;function D3(t){return I3.call(t)}bC.exports=D3});var Ta=d((Wye,wC)=>{var CC=so(),x3=SC(),L3=PC(),q3="[object Null]",M3="[object Undefined]",kC=CC?CC.toStringTag:void 0;function F3(t){return t==null?t===void 0?M3:q3:kC&&kC in Object(t)?x3(t):L3(t)}wC.exports=F3});var En=d((Bye,EC)=>{function j3(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}EC.exports=j3});var Ss=d((Vye,NC)=>{var G3=Ta(),U3=En(),H3="[object AsyncFunction]",K3="[object Function]",W3="[object GeneratorFunction]",B3="[object Proxy]";function V3(t){if(!U3(t))return!1;var e=G3(t);return e==K3||e==W3||e==H3||e==B3}NC.exports=V3});var OC=d((zye,$C)=>{var z3=wn(),Y3=z3["__core-js_shared__"];$C.exports=Y3});var xC=d((Yye,DC)=>{var Kv=OC(),IC=function(){var t=/[^.]+$/.exec(Kv&&Kv.keys&&Kv.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function X3(t){return!!IC&&IC in t}DC.exports=X3});var Wv=d((Xye,LC)=>{var J3=Function.prototype,Q3=J3.toString;function Z3(t){if(t!=null){try{return Q3.call(t)}catch{}try{return t+""}catch{}}return""}LC.exports=Z3});var MC=d((Jye,qC)=>{var eV=Ss(),tV=xC(),rV=En(),nV=Wv(),iV=/[\\^$.*+?()[\]{}|]/g,aV=/^\[object .+?Constructor\]$/,oV=Function.prototype,sV=Object.prototype,uV=oV.toString,lV=sV.hasOwnProperty,cV=RegExp("^"+uV.call(lV).replace(iV,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function fV(t){if(!rV(t)||tV(t))return!1;var e=eV(t)?cV:aV;return e.test(nV(t))}qC.exports=fV});var jC=d((Qye,FC)=>{function dV(t,e){return t?.[e]}FC.exports=dV});var _a=d((Zye,GC)=>{var pV=MC(),mV=jC();function hV(t,e){var r=mV(t,e);return pV(r)?r:void 0}GC.exports=hV});var HC=d((ege,UC)=>{var yV=_a(),gV=wn(),vV=yV(gV,"DataView");UC.exports=vV});var wd=d((tge,KC)=>{var TV=_a(),_V=wn(),RV=TV(_V,"Map");KC.exports=RV});var BC=d((rge,WC)=>{var AV=_a(),SV=wn(),bV=AV(SV,"Promise");WC.exports=bV});var Bv=d((nge,VC)=>{var PV=_a(),CV=wn(),kV=PV(CV,"Set");VC.exports=kV});var YC=d((ige,zC)=>{var wV=_a(),EV=wn(),NV=wV(EV,"WeakMap");zC.exports=NV});var Ps=d((age,rk)=>{var Vv=HC(),zv=wd(),Yv=BC(),Xv=Bv(),Jv=YC(),tk=Ta(),bs=Wv(),XC="[object Map]",$V="[object Object]",JC="[object Promise]",QC="[object Set]",ZC="[object WeakMap]",ek="[object DataView]",OV=bs(Vv),IV=bs(zv),DV=bs(Yv),xV=bs(Xv),LV=bs(Jv),uo=tk;(Vv&&uo(new Vv(new ArrayBuffer(1)))!=ek||zv&&uo(new zv)!=XC||Yv&&uo(Yv.resolve())!=JC||Xv&&uo(new Xv)!=QC||Jv&&uo(new Jv)!=ZC)&&(uo=function(t){var e=tk(t),r=e==$V?t.constructor:void 0,n=r?bs(r):"";if(n)switch(n){case OV:return ek;case IV:return XC;case DV:return JC;case xV:return QC;case LV:return ZC}return e});rk.exports=uo});var Nn=d((oge,nk)=>{function qV(t){return t!=null&&typeof t=="object"}nk.exports=qV});var ak=d((sge,ik)=>{var MV=Ta(),FV=Nn(),jV="[object Arguments]";function GV(t){return FV(t)&&MV(t)==jV}ik.exports=GV});var Tl=d((uge,uk)=>{var ok=ak(),UV=Nn(),sk=Object.prototype,HV=sk.hasOwnProperty,KV=sk.propertyIsEnumerable,WV=ok(function(){return arguments}())?ok:function(t){return UV(t)&&HV.call(t,"callee")&&!KV.call(t,"callee")};uk.exports=WV});var Le=d((lge,lk)=>{var BV=Array.isArray;lk.exports=BV});var Ed=d((cge,ck)=>{var VV=9007199254740991;function zV(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=VV}ck.exports=zV});var $n=d((fge,fk)=>{var YV=Ss(),XV=Ed();function JV(t){return t!=null&&XV(t.length)&&!YV(t)}fk.exports=JV});var pk=d((dge,dk)=>{function QV(){return!1}dk.exports=QV});var Rl=d((_l,Cs)=>{var ZV=wn(),e4=pk(),yk=typeof _l=="object"&&_l&&!_l.nodeType&&_l,mk=yk&&typeof Cs=="object"&&Cs&&!Cs.nodeType&&Cs,t4=mk&&mk.exports===yk,hk=t4?ZV.Buffer:void 0,r4=hk?hk.isBuffer:void 0,n4=r4||e4;Cs.exports=n4});var vk=d((pge,gk)=>{var i4=Ta(),a4=Ed(),o4=Nn(),s4="[object Arguments]",u4="[object Array]",l4="[object Boolean]",c4="[object Date]",f4="[object Error]",d4="[object Function]",p4="[object Map]",m4="[object Number]",h4="[object Object]",y4="[object RegExp]",g4="[object Set]",v4="[object String]",T4="[object WeakMap]",_4="[object ArrayBuffer]",R4="[object DataView]",A4="[object Float32Array]",S4="[object Float64Array]",b4="[object Int8Array]",P4="[object Int16Array]",C4="[object Int32Array]",k4="[object Uint8Array]",w4="[object Uint8ClampedArray]",E4="[object Uint16Array]",N4="[object Uint32Array]",et={};et[A4]=et[S4]=et[b4]=et[P4]=et[C4]=et[k4]=et[w4]=et[E4]=et[N4]=!0;et[s4]=et[u4]=et[_4]=et[l4]=et[R4]=et[c4]=et[f4]=et[d4]=et[p4]=et[m4]=et[h4]=et[y4]=et[g4]=et[v4]=et[T4]=!1;function $4(t){return o4(t)&&a4(t.length)&&!!et[i4(t)]}gk.exports=$4});var ks=d((mge,Tk)=>{function O4(t){return function(e){return t(e)}}Tk.exports=O4});var bl=d((Al,ws)=>{var I4=Hv(),_k=typeof Al=="object"&&Al&&!Al.nodeType&&Al,Sl=_k&&typeof ws=="object"&&ws&&!ws.nodeType&&ws,D4=Sl&&Sl.exports===_k,Qv=D4&&I4.process,x4=function(){try{var t=Sl&&Sl.require&&Sl.require("util").types;return t||Qv&&Qv.binding&&Qv.binding("util")}catch{}}();ws.exports=x4});var Nd=d((hge,Sk)=>{var L4=vk(),q4=ks(),Rk=bl(),Ak=Rk&&Rk.isTypedArray,M4=Ak?q4(Ak):L4;Sk.exports=M4});var Lr=d((yge,bk)=>{var F4=Uv(),j4=Ps(),G4=Tl(),U4=Le(),H4=$n(),K4=Rl(),W4=As(),B4=Nd(),V4="[object Map]",z4="[object Set]",Y4=Object.prototype,X4=Y4.hasOwnProperty;function J4(t){if(t==null)return!0;if(H4(t)&&(U4(t)||typeof t=="string"||typeof t.splice=="function"||K4(t)||B4(t)||G4(t)))return!t.length;var e=j4(t);if(e==V4||e==z4)return!t.size;if(W4(t))return!F4(t).length;for(var r in t)if(X4.call(t,r))return!1;return!0}bk.exports=J4});var Es=d((gge,Pk)=>{function Q4(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}Pk.exports=Q4});var kk=d((vge,Ck)=>{function Z4(){this.__data__=[],this.size=0}Ck.exports=Z4});var Ns=d((Tge,wk)=>{function e6(t,e){return t===e||t!==t&&e!==e}wk.exports=e6});var Pl=d((_ge,Ek)=>{var t6=Ns();function r6(t,e){for(var r=t.length;r--;)if(t6(t[r][0],e))return r;return-1}Ek.exports=r6});var $k=d((Rge,Nk)=>{var n6=Pl(),i6=Array.prototype,a6=i6.splice;function o6(t){var e=this.__data__,r=n6(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():a6.call(e,r,1),--this.size,!0}Nk.exports=o6});var Ik=d((Age,Ok)=>{var s6=Pl();function u6(t){var e=this.__data__,r=s6(e,t);return r<0?void 0:e[r][1]}Ok.exports=u6});var xk=d((Sge,Dk)=>{var l6=Pl();function c6(t){return l6(this.__data__,t)>-1}Dk.exports=c6});var qk=d((bge,Lk)=>{var f6=Pl();function d6(t,e){var r=this.__data__,n=f6(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}Lk.exports=d6});var Cl=d((Pge,Mk)=>{var p6=kk(),m6=$k(),h6=Ik(),y6=xk(),g6=qk();function $s(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}$s.prototype.clear=p6;$s.prototype.delete=m6;$s.prototype.get=h6;$s.prototype.has=y6;$s.prototype.set=g6;Mk.exports=$s});var jk=d((Cge,Fk)=>{var v6=Cl();function T6(){this.__data__=new v6,this.size=0}Fk.exports=T6});var Uk=d((kge,Gk)=>{function _6(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}Gk.exports=_6});var Kk=d((wge,Hk)=>{function R6(t){return this.__data__.get(t)}Hk.exports=R6});var Bk=d((Ege,Wk)=>{function A6(t){return this.__data__.has(t)}Wk.exports=A6});var kl=d((Nge,Vk)=>{var S6=_a(),b6=S6(Object,"create");Vk.exports=b6});var Xk=d(($ge,Yk)=>{var zk=kl();function P6(){this.__data__=zk?zk(null):{},this.size=0}Yk.exports=P6});var Qk=d((Oge,Jk)=>{function C6(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}Jk.exports=C6});var ew=d((Ige,Zk)=>{var k6=kl(),w6="__lodash_hash_undefined__",E6=Object.prototype,N6=E6.hasOwnProperty;function $6(t){var e=this.__data__;if(k6){var r=e[t];return r===w6?void 0:r}return N6.call(e,t)?e[t]:void 0}Zk.exports=$6});var rw=d((Dge,tw)=>{var O6=kl(),I6=Object.prototype,D6=I6.hasOwnProperty;function x6(t){var e=this.__data__;return O6?e[t]!==void 0:D6.call(e,t)}tw.exports=x6});var iw=d((xge,nw)=>{var L6=kl(),q6="__lodash_hash_undefined__";function M6(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=L6&&e===void 0?q6:e,this}nw.exports=M6});var ow=d((Lge,aw)=>{var F6=Xk(),j6=Qk(),G6=ew(),U6=rw(),H6=iw();function Os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Os.prototype.clear=F6;Os.prototype.delete=j6;Os.prototype.get=G6;Os.prototype.has=U6;Os.prototype.set=H6;aw.exports=Os});var lw=d((qge,uw)=>{var sw=ow(),K6=Cl(),W6=wd();function B6(){this.size=0,this.__data__={hash:new sw,map:new(W6||K6),string:new sw}}uw.exports=B6});var fw=d((Mge,cw)=>{function V6(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}cw.exports=V6});var wl=d((Fge,dw)=>{var z6=fw();function Y6(t,e){var r=t.__data__;return z6(e)?r[typeof e=="string"?"string":"hash"]:r.map}dw.exports=Y6});var mw=d((jge,pw)=>{var X6=wl();function J6(t){var e=X6(this,t).delete(t);return this.size-=e?1:0,e}pw.exports=J6});var yw=d((Gge,hw)=>{var Q6=wl();function Z6(t){return Q6(this,t).get(t)}hw.exports=Z6});var vw=d((Uge,gw)=>{var ez=wl();function tz(t){return ez(this,t).has(t)}gw.exports=tz});var _w=d((Hge,Tw)=>{var rz=wl();function nz(t,e){var r=rz(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}Tw.exports=nz});var $d=d((Kge,Rw)=>{var iz=lw(),az=mw(),oz=yw(),sz=vw(),uz=_w();function Is(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Is.prototype.clear=iz;Is.prototype.delete=az;Is.prototype.get=oz;Is.prototype.has=sz;Is.prototype.set=uz;Rw.exports=Is});var Sw=d((Wge,Aw)=>{var lz=Cl(),cz=wd(),fz=$d(),dz=200;function pz(t,e){var r=this.__data__;if(r instanceof lz){var n=r.__data__;if(!cz||n.length<dz-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new fz(n)}return r.set(t,e),this.size=r.size,this}Aw.exports=pz});var Od=d((Bge,bw)=>{var mz=Cl(),hz=jk(),yz=Uk(),gz=Kk(),vz=Bk(),Tz=Sw();function Ds(t){var e=this.__data__=new mz(t);this.size=e.size}Ds.prototype.clear=hz;Ds.prototype.delete=yz;Ds.prototype.get=gz;Ds.prototype.has=vz;Ds.prototype.set=Tz;bw.exports=Ds});var Cw=d((Vge,Pw)=>{var _z="__lodash_hash_undefined__";function Rz(t){return this.__data__.set(t,_z),this}Pw.exports=Rz});var ww=d((zge,kw)=>{function Az(t){return this.__data__.has(t)}kw.exports=Az});var Dd=d((Yge,Ew)=>{var Sz=$d(),bz=Cw(),Pz=ww();function Id(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Sz;++e<r;)this.add(t[e])}Id.prototype.add=Id.prototype.push=bz;Id.prototype.has=Pz;Ew.exports=Id});var Zv=d((Xge,Nw)=>{function Cz(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}Nw.exports=Cz});var xd=d((Jge,$w)=>{function kz(t,e){return t.has(e)}$w.exports=kz});var eT=d((Qge,Ow)=>{var wz=Dd(),Ez=Zv(),Nz=xd(),$z=1,Oz=2;function Iz(t,e,r,n,i,a){var o=r&$z,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,h=!0,v=r&Oz?new wz:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],A=e[f];if(n)var w=o?n(A,y,f,e,t,a):n(y,A,f,t,e,a);if(w!==void 0){if(w)continue;h=!1;break}if(v){if(!Ez(e,function(C,b){if(!Nz(v,b)&&(y===C||i(y,C,r,n,a)))return v.push(b)})){h=!1;break}}else if(!(y===A||i(y,A,r,n,a))){h=!1;break}}return a.delete(t),a.delete(e),h}Ow.exports=Iz});var tT=d((Zge,Iw)=>{var Dz=wn(),xz=Dz.Uint8Array;Iw.exports=xz});var xw=d((eve,Dw)=>{function Lz(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}Dw.exports=Lz});var Ld=d((tve,Lw)=>{function qz(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}Lw.exports=qz});var Gw=d((rve,jw)=>{var qw=so(),Mw=tT(),Mz=Ns(),Fz=eT(),jz=xw(),Gz=Ld(),Uz=1,Hz=2,Kz="[object Boolean]",Wz="[object Date]",Bz="[object Error]",Vz="[object Map]",zz="[object Number]",Yz="[object RegExp]",Xz="[object Set]",Jz="[object String]",Qz="[object Symbol]",Zz="[object ArrayBuffer]",e8="[object DataView]",Fw=qw?qw.prototype:void 0,rT=Fw?Fw.valueOf:void 0;function t8(t,e,r,n,i,a,o){switch(r){case e8:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Zz:return!(t.byteLength!=e.byteLength||!a(new Mw(t),new Mw(e)));case Kz:case Wz:case zz:return Mz(+t,+e);case Bz:return t.name==e.name&&t.message==e.message;case Yz:case Jz:return t==e+"";case Vz:var s=jz;case Xz:var u=n&Uz;if(s||(s=Gz),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=Hz,o.set(t,e);var c=Fz(s(t),s(e),n,i,a,o);return o.delete(t),c;case Qz:if(rT)return rT.call(t)==rT.call(e)}return!1}jw.exports=t8});var qd=d((nve,Uw)=>{function r8(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}Uw.exports=r8});var nT=d((ive,Hw)=>{var n8=qd(),i8=Le();function a8(t,e,r){var n=e(t);return i8(t)?n:n8(n,r(t))}Hw.exports=a8});var Md=d((ave,Kw)=>{function o8(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}Kw.exports=o8});var iT=d((ove,Ww)=>{function s8(){return[]}Ww.exports=s8});var Fd=d((sve,Vw)=>{var u8=Md(),l8=iT(),c8=Object.prototype,f8=c8.propertyIsEnumerable,Bw=Object.getOwnPropertySymbols,d8=Bw?function(t){return t==null?[]:(t=Object(t),u8(Bw(t),function(e){return f8.call(t,e)}))}:l8;Vw.exports=d8});var Yw=d((uve,zw)=>{function p8(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}zw.exports=p8});var El=d((lve,Xw)=>{var m8=9007199254740991,h8=/^(?:0|[1-9]\d*)$/;function y8(t,e){var r=typeof t;return e=e??m8,!!e&&(r=="number"||r!="symbol"&&h8.test(t))&&t>-1&&t%1==0&&t<e}Xw.exports=y8});var aT=d((cve,Jw)=>{var g8=Yw(),v8=Tl(),T8=Le(),_8=Rl(),R8=El(),A8=Nd(),S8=Object.prototype,b8=S8.hasOwnProperty;function P8(t,e){var r=T8(t),n=!r&&v8(t),i=!r&&!n&&_8(t),a=!r&&!n&&!i&&A8(t),o=r||n||i||a,s=o?g8(t.length,String):[],u=s.length;for(var l in t)(e||b8.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||R8(l,u)))&&s.push(l);return s}Jw.exports=P8});var qr=d((fve,Qw)=>{var C8=aT(),k8=Uv(),w8=$n();function E8(t){return w8(t)?C8(t):k8(t)}Qw.exports=E8});var oT=d((dve,Zw)=>{var N8=nT(),$8=Fd(),O8=qr();function I8(t){return N8(t,O8,$8)}Zw.exports=I8});var rE=d((pve,tE)=>{var eE=oT(),D8=1,x8=Object.prototype,L8=x8.hasOwnProperty;function q8(t,e,r,n,i,a){var o=r&D8,s=eE(t),u=s.length,l=eE(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var h=s[f];if(!(o?h in e:L8.call(e,h)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var A=!0;a.set(t,e),a.set(e,t);for(var w=o;++f<u;){h=s[f];var C=t[h],b=e[h];if(n)var S=o?n(b,C,h,e,t,a):n(C,b,h,t,e,a);if(!(S===void 0?C===b||i(C,b,r,n,a):S)){A=!1;break}w||(w=h=="constructor")}if(A&&!w){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(A=!1)}return a.delete(t),a.delete(e),A}tE.exports=q8});var cE=d((mve,lE)=>{var sT=Od(),M8=eT(),F8=Gw(),j8=rE(),nE=Ps(),iE=Le(),aE=Rl(),G8=Nd(),U8=1,oE="[object Arguments]",sE="[object Array]",jd="[object Object]",H8=Object.prototype,uE=H8.hasOwnProperty;function K8(t,e,r,n,i,a){var o=iE(t),s=iE(e),u=o?sE:nE(t),l=s?sE:nE(e);u=u==oE?jd:u,l=l==oE?jd:l;var c=u==jd,f=l==jd,h=u==l;if(h&&aE(t)){if(!aE(e))return!1;o=!0,c=!1}if(h&&!c)return a||(a=new sT),o||G8(t)?M8(t,e,r,n,i,a):F8(t,e,u,r,n,i,a);if(!(r&U8)){var v=c&&uE.call(t,"__wrapped__"),y=f&&uE.call(e,"__wrapped__");if(v||y){var A=v?t.value():t,w=y?e.value():e;return a||(a=new sT),i(A,w,r,n,a)}}return h?(a||(a=new sT),j8(t,e,r,n,i,a)):!1}lE.exports=K8});var uT=d((hve,pE)=>{var W8=cE(),fE=Nn();function dE(t,e,r,n,i){return t===e?!0:t==null||e==null||!fE(t)&&!fE(e)?t!==t&&e!==e:W8(t,e,r,n,dE,i)}pE.exports=dE});var hE=d((yve,mE)=>{var B8=Od(),V8=uT(),z8=1,Y8=2;function X8(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new B8;if(n)var h=n(l,c,u,t,e,f);if(!(h===void 0?V8(c,l,z8|Y8,n,f):h))return!1}}return!0}mE.exports=X8});var lT=d((gve,yE)=>{var J8=En();function Q8(t){return t===t&&!J8(t)}yE.exports=Q8});var vE=d((vve,gE)=>{var Z8=lT(),e9=qr();function t9(t){for(var e=e9(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,Z8(i)]}return e}gE.exports=t9});var cT=d((Tve,TE)=>{function r9(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}TE.exports=r9});var RE=d((_ve,_E)=>{var n9=hE(),i9=vE(),a9=cT();function o9(t){var e=i9(t);return e.length==1&&e[0][2]?a9(e[0][0],e[0][1]):function(r){return r===t||n9(r,t,e)}}_E.exports=o9});var xs=d((Rve,AE)=>{var s9=Ta(),u9=Nn(),l9="[object Symbol]";function c9(t){return typeof t=="symbol"||u9(t)&&s9(t)==l9}AE.exports=c9});var Gd=d((Ave,SE)=>{var f9=Le(),d9=xs(),p9=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,m9=/^\w*$/;function h9(t,e){if(f9(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||d9(t)?!0:m9.test(t)||!p9.test(t)||e!=null&&t in Object(e)}SE.exports=h9});var CE=d((Sve,PE)=>{var bE=$d(),y9="Expected a function";function fT(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(y9);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(fT.Cache||bE),r}fT.Cache=bE;PE.exports=fT});var wE=d((bve,kE)=>{var g9=CE(),v9=500;function T9(t){var e=g9(t,function(n){return r.size===v9&&r.clear(),n}),r=e.cache;return e}kE.exports=T9});var NE=d((Pve,EE)=>{var _9=wE(),R9=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,A9=/\\(\\)?/g,S9=_9(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(R9,function(r,n,i,a){e.push(i?a.replace(A9,"$1"):n||r)}),e});EE.exports=S9});var LE=d((Cve,xE)=>{var $E=so(),b9=Es(),P9=Le(),C9=xs(),k9=1/0,OE=$E?$E.prototype:void 0,IE=OE?OE.toString:void 0;function DE(t){if(typeof t=="string")return t;if(P9(t))return b9(t,DE)+"";if(C9(t))return IE?IE.call(t):"";var e=t+"";return e=="0"&&1/t==-k9?"-0":e}xE.exports=DE});var dT=d((kve,qE)=>{var w9=LE();function E9(t){return t==null?"":w9(t)}qE.exports=E9});var Nl=d((wve,ME)=>{var N9=Le(),$9=Gd(),O9=NE(),I9=dT();function D9(t,e){return N9(t)?t:$9(t,e)?[t]:O9(I9(t))}ME.exports=D9});var Ls=d((Eve,FE)=>{var x9=xs(),L9=1/0;function q9(t){if(typeof t=="string"||x9(t))return t;var e=t+"";return e=="0"&&1/t==-L9?"-0":e}FE.exports=q9});var Ud=d((Nve,jE)=>{var M9=Nl(),F9=Ls();function j9(t,e){e=M9(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[F9(e[r++])];return r&&r==n?t:void 0}jE.exports=j9});var UE=d(($ve,GE)=>{var G9=Ud();function U9(t,e,r){var n=t==null?void 0:G9(t,e);return n===void 0?r:n}GE.exports=U9});var KE=d((Ove,HE)=>{function H9(t,e){return t!=null&&e in Object(t)}HE.exports=H9});var pT=d((Ive,WE)=>{var K9=Nl(),W9=Tl(),B9=Le(),V9=El(),z9=Ed(),Y9=Ls();function X9(t,e,r){e=K9(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=Y9(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&z9(i)&&V9(o,i)&&(B9(t)||W9(t)))}WE.exports=X9});var VE=d((Dve,BE)=>{var J9=KE(),Q9=pT();function Z9(t,e){return t!=null&&Q9(t,e,J9)}BE.exports=Z9});var YE=d((xve,zE)=>{var e7=uT(),t7=UE(),r7=VE(),n7=Gd(),i7=lT(),a7=cT(),o7=Ls(),s7=1,u7=2;function l7(t,e){return n7(t)&&i7(e)?a7(o7(t),e):function(r){var n=t7(r,t);return n===void 0&&n===e?r7(r,t):e7(e,n,s7|u7)}}zE.exports=l7});var lo=d((Lve,XE)=>{function c7(t){return t}XE.exports=c7});var QE=d((qve,JE)=>{function f7(t){return function(e){return e?.[t]}}JE.exports=f7});var eN=d((Mve,ZE)=>{var d7=Ud();function p7(t){return function(e){return d7(e,t)}}ZE.exports=p7});var rN=d((Fve,tN)=>{var m7=QE(),h7=eN(),y7=Gd(),g7=Ls();function v7(t){return y7(t)?m7(g7(t)):h7(t)}tN.exports=v7});var rn=d((jve,nN)=>{var T7=RE(),_7=YE(),R7=lo(),A7=Le(),S7=rN();function b7(t){return typeof t=="function"?t:t==null?R7:typeof t=="object"?A7(t)?_7(t[0],t[1]):T7(t):S7(t)}nN.exports=b7});var aN=d((Gve,iN)=>{function P7(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}iN.exports=P7});var sN=d((Uve,oN)=>{var C7=aN(),k7=C7();oN.exports=k7});var lN=d((Hve,uN)=>{var w7=sN(),E7=qr();function N7(t,e){return t&&w7(t,e,E7)}uN.exports=N7});var fN=d((Kve,cN)=>{var $7=$n();function O7(t,e){return function(r,n){if(r==null)return r;if(!$7(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}cN.exports=O7});var Ra=d((Wve,dN)=>{var I7=lN(),D7=fN(),x7=D7(I7);dN.exports=x7});var mN=d((Bve,pN)=>{var L7=Ra(),q7=$n();function M7(t,e){var r=-1,n=q7(t)?Array(t.length):[];return L7(t,function(i,a,o){n[++r]=e(i,a,o)}),n}pN.exports=M7});var Ht=d((Vve,hN)=>{var F7=Es(),j7=rn(),G7=mN(),U7=Le();function H7(t,e){var r=U7(t)?F7:G7;return r(t,j7(e,3))}hN.exports=H7});var mT=d((zve,yN)=>{function K7(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}yN.exports=K7});var vN=d((Yve,gN)=>{var W7=lo();function B7(t){return typeof t=="function"?t:W7}gN.exports=B7});var Kt=d((Xve,TN)=>{var V7=mT(),z7=Ra(),Y7=vN(),X7=Le();function J7(t,e){var r=X7(t)?V7:z7;return r(t,Y7(e))}TN.exports=J7});var RN=d((Jve,_N)=>{var Q7=Es();function Z7(t,e){return Q7(e,function(r){return t[r]})}_N.exports=Z7});var Qn=d((Qve,AN)=>{var eY=RN(),tY=qr();function rY(t){return t==null?[]:eY(t,tY(t))}AN.exports=rY});var bN=d((Zve,SN)=>{var nY=Object.prototype,iY=nY.hasOwnProperty;function aY(t,e){return t!=null&&iY.call(t,e)}SN.exports=aY});var Mr=d((eTe,PN)=>{var oY=bN(),sY=pT();function uY(t,e){return t!=null&&sY(t,e,oY)}PN.exports=uY});var hT=d((tTe,CN)=>{var lY=_a(),cY=function(){try{var t=lY(Object,"defineProperty");return t({},"",{}),t}catch{}}();CN.exports=cY});var Hd=d((rTe,wN)=>{var kN=hT();function fY(t,e,r){e=="__proto__"&&kN?kN(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}wN.exports=fY});var $l=d((nTe,EN)=>{var dY=Hd(),pY=Ns(),mY=Object.prototype,hY=mY.hasOwnProperty;function yY(t,e,r){var n=t[e];(!(hY.call(t,e)&&pY(n,r))||r===void 0&&!(e in t))&&dY(t,e,r)}EN.exports=yY});var qs=d((iTe,NN)=>{var gY=$l(),vY=Hd();function TY(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?vY(r,s,u):gY(r,s,u)}return r}NN.exports=TY});var ON=d((aTe,$N)=>{var _Y=qs(),RY=qr();function AY(t,e){return t&&_Y(e,RY(e),t)}$N.exports=AY});var DN=d((oTe,IN)=>{function SY(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}IN.exports=SY});var LN=d((sTe,xN)=>{var bY=En(),PY=As(),CY=DN(),kY=Object.prototype,wY=kY.hasOwnProperty;function EY(t){if(!bY(t))return CY(t);var e=PY(t),r=[];for(var n in t)n=="constructor"&&(e||!wY.call(t,n))||r.push(n);return r}xN.exports=EY});var Ol=d((uTe,qN)=>{var NY=aT(),$Y=LN(),OY=$n();function IY(t){return OY(t)?NY(t,!0):$Y(t)}qN.exports=IY});var FN=d((lTe,MN)=>{var DY=qs(),xY=Ol();function LY(t,e){return t&&DY(e,xY(e),t)}MN.exports=LY});var KN=d((Il,Ms)=>{var qY=wn(),HN=typeof Il=="object"&&Il&&!Il.nodeType&&Il,jN=HN&&typeof Ms=="object"&&Ms&&!Ms.nodeType&&Ms,MY=jN&&jN.exports===HN,GN=MY?qY.Buffer:void 0,UN=GN?GN.allocUnsafe:void 0;function FY(t,e){if(e)return t.slice();var r=t.length,n=UN?UN(r):new t.constructor(r);return t.copy(n),n}Ms.exports=FY});var BN=d((cTe,WN)=>{function jY(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}WN.exports=jY});var zN=d((fTe,VN)=>{var GY=qs(),UY=Fd();function HY(t,e){return GY(t,UY(t),e)}VN.exports=HY});var yT=d((dTe,YN)=>{var KY=Gv(),WY=KY(Object.getPrototypeOf,Object);YN.exports=WY});var gT=d((pTe,XN)=>{var BY=qd(),VY=yT(),zY=Fd(),YY=iT(),XY=Object.getOwnPropertySymbols,JY=XY?function(t){for(var e=[];t;)BY(e,zY(t)),t=VY(t);return e}:YY;XN.exports=JY});var QN=d((mTe,JN)=>{var QY=qs(),ZY=gT();function eX(t,e){return QY(t,ZY(t),e)}JN.exports=eX});var vT=d((hTe,ZN)=>{var tX=nT(),rX=gT(),nX=Ol();function iX(t){return tX(t,nX,rX)}ZN.exports=iX});var t$=d((yTe,e$)=>{var aX=Object.prototype,oX=aX.hasOwnProperty;function sX(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&oX.call(t,"index")&&(r.index=t.index,r.input=t.input),r}e$.exports=sX});var Kd=d((gTe,n$)=>{var r$=tT();function uX(t){var e=new t.constructor(t.byteLength);return new r$(e).set(new r$(t)),e}n$.exports=uX});var a$=d((vTe,i$)=>{var lX=Kd();function cX(t,e){var r=e?lX(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}i$.exports=cX});var s$=d((TTe,o$)=>{var fX=/\w*$/;function dX(t){var e=new t.constructor(t.source,fX.exec(t));return e.lastIndex=t.lastIndex,e}o$.exports=dX});var d$=d((_Te,f$)=>{var u$=so(),l$=u$?u$.prototype:void 0,c$=l$?l$.valueOf:void 0;function pX(t){return c$?Object(c$.call(t)):{}}f$.exports=pX});var m$=d((RTe,p$)=>{var mX=Kd();function hX(t,e){var r=e?mX(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}p$.exports=hX});var y$=d((ATe,h$)=>{var yX=Kd(),gX=a$(),vX=s$(),TX=d$(),_X=m$(),RX="[object Boolean]",AX="[object Date]",SX="[object Map]",bX="[object Number]",PX="[object RegExp]",CX="[object Set]",kX="[object String]",wX="[object Symbol]",EX="[object ArrayBuffer]",NX="[object DataView]",$X="[object Float32Array]",OX="[object Float64Array]",IX="[object Int8Array]",DX="[object Int16Array]",xX="[object Int32Array]",LX="[object Uint8Array]",qX="[object Uint8ClampedArray]",MX="[object Uint16Array]",FX="[object Uint32Array]";function jX(t,e,r){var n=t.constructor;switch(e){case EX:return yX(t);case RX:case AX:return new n(+t);case NX:return gX(t,r);case $X:case OX:case IX:case DX:case xX:case LX:case qX:case MX:case FX:return _X(t,r);case SX:return new n;case bX:case kX:return new n(t);case PX:return vX(t);case CX:return new n;case wX:return TX(t)}}h$.exports=jX});var T$=d((STe,v$)=>{var GX=En(),g$=Object.create,UX=function(){function t(){}return function(e){if(!GX(e))return{};if(g$)return g$(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();v$.exports=UX});var R$=d((bTe,_$)=>{var HX=T$(),KX=yT(),WX=As();function BX(t){return typeof t.constructor=="function"&&!WX(t)?HX(KX(t)):{}}_$.exports=BX});var S$=d((PTe,A$)=>{var VX=Ps(),zX=Nn(),YX="[object Map]";function XX(t){return zX(t)&&VX(t)==YX}A$.exports=XX});var k$=d((CTe,C$)=>{var JX=S$(),QX=ks(),b$=bl(),P$=b$&&b$.isMap,ZX=P$?QX(P$):JX;C$.exports=ZX});var E$=d((kTe,w$)=>{var eJ=Ps(),tJ=Nn(),rJ="[object Set]";function nJ(t){return tJ(t)&&eJ(t)==rJ}w$.exports=nJ});var I$=d((wTe,O$)=>{var iJ=E$(),aJ=ks(),N$=bl(),$$=N$&&N$.isSet,oJ=$$?aJ($$):iJ;O$.exports=oJ});var M$=d((ETe,q$)=>{var sJ=Od(),uJ=mT(),lJ=$l(),cJ=ON(),fJ=FN(),dJ=KN(),pJ=BN(),mJ=zN(),hJ=QN(),yJ=oT(),gJ=vT(),vJ=Ps(),TJ=t$(),_J=y$(),RJ=R$(),AJ=Le(),SJ=Rl(),bJ=k$(),PJ=En(),CJ=I$(),kJ=qr(),wJ=Ol(),EJ=1,NJ=2,$J=4,D$="[object Arguments]",OJ="[object Array]",IJ="[object Boolean]",DJ="[object Date]",xJ="[object Error]",x$="[object Function]",LJ="[object GeneratorFunction]",qJ="[object Map]",MJ="[object Number]",L$="[object Object]",FJ="[object RegExp]",jJ="[object Set]",GJ="[object String]",UJ="[object Symbol]",HJ="[object WeakMap]",KJ="[object ArrayBuffer]",WJ="[object DataView]",BJ="[object Float32Array]",VJ="[object Float64Array]",zJ="[object Int8Array]",YJ="[object Int16Array]",XJ="[object Int32Array]",JJ="[object Uint8Array]",QJ="[object Uint8ClampedArray]",ZJ="[object Uint16Array]",eQ="[object Uint32Array]",Je={};Je[D$]=Je[OJ]=Je[KJ]=Je[WJ]=Je[IJ]=Je[DJ]=Je[BJ]=Je[VJ]=Je[zJ]=Je[YJ]=Je[XJ]=Je[qJ]=Je[MJ]=Je[L$]=Je[FJ]=Je[jJ]=Je[GJ]=Je[UJ]=Je[JJ]=Je[QJ]=Je[ZJ]=Je[eQ]=!0;Je[xJ]=Je[x$]=Je[HJ]=!1;function Wd(t,e,r,n,i,a){var o,s=e&EJ,u=e&NJ,l=e&$J;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!PJ(t))return t;var c=AJ(t);if(c){if(o=TJ(t),!s)return pJ(t,o)}else{var f=vJ(t),h=f==x$||f==LJ;if(SJ(t))return dJ(t,s);if(f==L$||f==D$||h&&!i){if(o=u||h?{}:RJ(t),!s)return u?hJ(t,fJ(o,t)):mJ(t,cJ(o,t))}else{if(!Je[f])return i?t:{};o=_J(t,f,s)}}a||(a=new sJ);var v=a.get(t);if(v)return v;a.set(t,o),CJ(t)?t.forEach(function(w){o.add(Wd(w,e,r,w,t,a))}):bJ(t)&&t.forEach(function(w,C){o.set(C,Wd(w,e,r,C,t,a))});var y=l?u?gJ:yJ:u?wJ:kJ,A=c?void 0:y(t);return uJ(A||t,function(w,C){A&&(C=w,w=t[C]),lJ(o,C,Wd(w,e,r,C,t,a))}),o}q$.exports=Wd});var xi=d((NTe,F$)=>{var tQ=M$(),rQ=4;function nQ(t){return tQ(t,rQ)}F$.exports=nQ});var j$=d(Fs=>{"use strict";Object.defineProperty(Fs,"__esModule",{value:!0});Fs.PRINT_WARNING=Fs.PRINT_ERROR=void 0;function iQ(t){console&&console.error&&console.error("Error: ".concat(t))}Fs.PRINT_ERROR=iQ;function aQ(t){console&&console.warn&&console.warn("Warning: ".concat(t))}Fs.PRINT_WARNING=aQ});var G$=d(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.timer=void 0;function oQ(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Bd.timer=oQ});var U$=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var js=d(Zn=>{"use strict";Object.defineProperty(Zn,"__esModule",{value:!0});Zn.toFastProperties=Zn.timer=Zn.PRINT_ERROR=Zn.PRINT_WARNING=void 0;var H$=j$();Object.defineProperty(Zn,"PRINT_WARNING",{enumerable:!0,get:function(){return H$.PRINT_WARNING}});Object.defineProperty(Zn,"PRINT_ERROR",{enumerable:!0,get:function(){return H$.PRINT_ERROR}});var sQ=G$();Object.defineProperty(Zn,"timer",{enumerable:!0,get:function(){return sQ.timer}});var uQ=U$();Object.defineProperty(Zn,"toFastProperties",{enumerable:!0,get:function(){return uQ.toFastProperties}})});var Vd=d((DTe,K$)=>{function lQ(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}K$.exports=lQ});var B$=d((xTe,W$)=>{var cQ=/\s/;function fQ(t){for(var e=t.length;e--&&cQ.test(t.charAt(e)););return e}W$.exports=fQ});var z$=d((LTe,V$)=>{var dQ=B$(),pQ=/^\s+/;function mQ(t){return t&&t.slice(0,dQ(t)+1).replace(pQ,"")}V$.exports=mQ});var Q$=d((qTe,J$)=>{var hQ=z$(),Y$=En(),yQ=xs(),X$=0/0,gQ=/^[-+]0x[0-9a-f]+$/i,vQ=/^0b[01]+$/i,TQ=/^0o[0-7]+$/i,_Q=parseInt;function RQ(t){if(typeof t=="number")return t;if(yQ(t))return X$;if(Y$(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Y$(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=hQ(t);var r=vQ.test(t);return r||TQ.test(t)?_Q(t.slice(2),r?2:8):gQ.test(t)?X$:+t}J$.exports=RQ});var tO=d((MTe,eO)=>{var AQ=Q$(),Z$=1/0,SQ=17976931348623157e292;function bQ(t){if(!t)return t===0?t:0;if(t=AQ(t),t===Z$||t===-Z$){var e=t<0?-1:1;return e*SQ}return t===t?t:0}eO.exports=bQ});var Gs=d((FTe,rO)=>{var PQ=tO();function CQ(t){var e=PQ(t),r=e%1;return e===e?r?e-r:e:0}rO.exports=CQ});var zd=d((jTe,nO)=>{var kQ=Vd(),wQ=Gs();function EQ(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:wQ(e),kQ(t,e<0?0:e,n)):[]}nO.exports=EQ});var Dl=d((GTe,iO)=>{var NQ=Ta(),$Q=Le(),OQ=Nn(),IQ="[object String]";function DQ(t){return typeof t=="string"||!$Q(t)&&OQ(t)&&NQ(t)==IQ}iO.exports=DQ});var oO=d((UTe,aO)=>{var xQ=Ta(),LQ=Nn(),qQ="[object RegExp]";function MQ(t){return LQ(t)&&xQ(t)==qQ}aO.exports=MQ});var TT=d((HTe,lO)=>{var FQ=oO(),jQ=ks(),sO=bl(),uO=sO&&sO.isRegExp,GQ=uO?jQ(uO):FQ;lO.exports=GQ});var dO=d((KTe,fO)=>{var UQ=$l(),HQ=Nl(),KQ=El(),cO=En(),WQ=Ls();function BQ(t,e,r,n){if(!cO(t))return t;e=HQ(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=WQ(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=cO(c)?c:KQ(e[i+1])?[]:{})}UQ(s,u,l),s=s[u]}return t}fO.exports=BQ});var mO=d((WTe,pO)=>{var VQ=Ud(),zQ=dO(),YQ=Nl();function XQ(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=VQ(t,o);r(s,o)&&zQ(a,YQ(o,t),s)}return a}pO.exports=XQ});var _T=d((BTe,hO)=>{var JQ=Es(),QQ=rn(),ZQ=mO(),eZ=vT();function tZ(t,e){if(t==null)return{};var r=JQ(eZ(t),function(n){return[n]});return e=QQ(e),ZQ(t,r,function(n,i){return e(n,i[0])})}hO.exports=tZ});var gO=d((VTe,yO)=>{function rZ(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}yO.exports=rZ});var _O=d((zTe,TO)=>{var nZ=gO(),vO=Math.max;function iZ(t,e,r){return e=vO(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=vO(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),nZ(t,this,s)}}TO.exports=iZ});var AO=d((YTe,RO)=>{function aZ(t){return function(){return t}}RO.exports=aZ});var PO=d((XTe,bO)=>{var oZ=AO(),SO=hT(),sZ=lo(),uZ=SO?function(t,e){return SO(t,"toString",{configurable:!0,enumerable:!1,value:oZ(e),writable:!0})}:sZ;bO.exports=uZ});var kO=d((JTe,CO)=>{var lZ=800,cZ=16,fZ=Date.now;function dZ(t){var e=0,r=0;return function(){var n=fZ(),i=cZ-(n-r);if(r=n,i>0){if(++e>=lZ)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}CO.exports=dZ});var EO=d((QTe,wO)=>{var pZ=PO(),mZ=kO(),hZ=mZ(pZ);wO.exports=hZ});var Yd=d((ZTe,NO)=>{var yZ=lo(),gZ=_O(),vZ=EO();function TZ(t,e){return vZ(gZ(t,e,yZ),t+"")}NO.exports=TZ});var xl=d((e_e,$O)=>{var _Z=Ns(),RZ=$n(),AZ=El(),SZ=En();function bZ(t,e,r){if(!SZ(r))return!1;var n=typeof e;return(n=="number"?RZ(r)&&AZ(e,r.length):n=="string"&&e in r)?_Z(r[e],t):!1}$O.exports=bZ});var IO=d((t_e,OO)=>{var PZ=Yd(),CZ=xl();function kZ(t){return PZ(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&CZ(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}OO.exports=kZ});var Ll=d((r_e,DO)=>{var wZ=$l(),EZ=qs(),NZ=IO(),$Z=$n(),OZ=As(),IZ=qr(),DZ=Object.prototype,xZ=DZ.hasOwnProperty,LZ=NZ(function(t,e){if(OZ(e)||$Z(e)){EZ(e,IZ(e),t);return}for(var r in e)xZ.call(e,r)&&wZ(t,r,e[r])});DO.exports=LZ});var Jd=d(Pe=>{"use strict";var Li=Pe&&Pe.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Us=Pe&&Pe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.serializeProduction=Pe.serializeGrammar=Pe.Terminal=Pe.Alternation=Pe.RepetitionWithSeparator=Pe.Repetition=Pe.RepetitionMandatoryWithSeparator=Pe.RepetitionMandatory=Pe.Option=Pe.Alternative=Pe.Rule=Pe.NonTerminal=Pe.AbstractProduction=void 0;var xO=Us(Ht()),qZ=Us(Kt()),RT=Us(Dl()),MZ=Us(TT()),ei=Us(_T()),ti=Us(Ll());function FZ(t){return jZ(t)?t.LABEL:t.name}function jZ(t){return(0,RT.default)(t.LABEL)&&t.LABEL!==""}var ri=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,qZ.default)(this.definition,function(r){r.accept(e)})},t}();Pe.AbstractProduction=ri;var LO=function(t){Li(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(ri);Pe.NonTerminal=LO;var qO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.Rule=qO;var MO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.Alternative=MO;var FO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.Option=FO;var jO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.RepetitionMandatory=jO;var GO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.RepetitionMandatoryWithSeparator=GO;var UO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.Repetition=UO;var HO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return e}(ri);Pe.RepetitionWithSeparator=HO;var KO=function(t){Li(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,ti.default)(n,(0,ei.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(ri);Pe.Alternation=KO;var Xd=function(){function t(e){this.idx=1,(0,ti.default)(this,(0,ei.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Pe.Terminal=Xd;function GZ(t){return(0,xO.default)(t,ql)}Pe.serializeGrammar=GZ;function ql(t){function e(a){return(0,xO.default)(a,ql)}if(t instanceof LO){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,RT.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof MO)return{type:"Alternative",definition:e(t.definition)};if(t instanceof FO)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof jO)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof GO)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:ql(new Xd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof HO)return{type:"RepetitionWithSeparator",idx:t.idx,separator:ql(new Xd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof UO)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof KO)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Xd){var n={type:"Terminal",name:t.terminalType.name,label:FZ(t.terminalType),idx:t.idx};(0,RT.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,MZ.default)(i)?i.source:i),n}else{if(t instanceof qO)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Pe.serializeProduction=ql});var WO=d(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.GAstVisitor=void 0;var ni=Jd(),UZ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case ni.NonTerminal:return this.visitNonTerminal(r);case ni.Alternative:return this.visitAlternative(r);case ni.Option:return this.visitOption(r);case ni.RepetitionMandatory:return this.visitRepetitionMandatory(r);case ni.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case ni.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case ni.Repetition:return this.visitRepetition(r);case ni.Alternation:return this.visitAlternation(r);case ni.Terminal:return this.visitTerminal(r);case ni.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Qd.GAstVisitor=UZ});var VO=d((a_e,BO)=>{var HZ=Ra();function KZ(t,e){var r;return HZ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}BO.exports=KZ});var Zd=d((o_e,zO)=>{var WZ=Zv(),BZ=rn(),VZ=VO(),zZ=Le(),YZ=xl();function XZ(t,e,r){var n=zZ(t)?WZ:VZ;return r&&YZ(t,e,r)&&(e=void 0),n(t,BZ(e,3))}zO.exports=XZ});var XO=d((s_e,YO)=>{function JZ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}YO.exports=JZ});var QO=d((u_e,JO)=>{var QZ=Ra();function ZZ(t,e){var r=!0;return QZ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}JO.exports=ZZ});var Ml=d((l_e,ZO)=>{var eee=XO(),tee=QO(),ree=rn(),nee=Le(),iee=xl();function aee(t,e,r){var n=nee(t)?eee:tee;return r&&iee(t,e,r)&&(e=void 0),n(t,ree(e,3))}ZO.exports=aee});var AT=d((c_e,eI)=>{function oee(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}eI.exports=oee});var rI=d((f_e,tI)=>{function see(t){return t!==t}tI.exports=see});var iI=d((d_e,nI)=>{function uee(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}nI.exports=uee});var ep=d((p_e,aI)=>{var lee=AT(),cee=rI(),fee=iI();function dee(t,e,r){return e===e?fee(t,e,r):lee(t,cee,r)}aI.exports=dee});var qi=d((m_e,oI)=>{var pee=ep(),mee=$n(),hee=Dl(),yee=Gs(),gee=Qn(),vee=Math.max;function Tee(t,e,r,n){t=mee(t)?t:gee(t),r=r&&!n?yee(r):0;var i=t.length;return r<0&&(r=vee(i+r,0)),hee(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&pee(t,e,r)>-1}oI.exports=Tee});var sI=d(nn=>{"use strict";var bT=nn&&nn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(nn,"__esModule",{value:!0});nn.getProductionDslName=nn.isBranchingProd=nn.isOptionalProd=nn.isSequenceProd=void 0;var _ee=bT(Zd()),Ree=bT(Ml()),Aee=bT(qi()),st=Jd();function See(t){return t instanceof st.Alternative||t instanceof st.Option||t instanceof st.Repetition||t instanceof st.RepetitionMandatory||t instanceof st.RepetitionMandatoryWithSeparator||t instanceof st.RepetitionWithSeparator||t instanceof st.Terminal||t instanceof st.Rule}nn.isSequenceProd=See;function ST(t,e){e===void 0&&(e=[]);var r=t instanceof st.Option||t instanceof st.Repetition||t instanceof st.RepetitionWithSeparator;return r?!0:t instanceof st.Alternation?(0,_ee.default)(t.definition,function(n){return ST(n,e)}):t instanceof st.NonTerminal&&(0,Aee.default)(e,t)?!1:t instanceof st.AbstractProduction?(t instanceof st.NonTerminal&&e.push(t),(0,Ree.default)(t.definition,function(n){return ST(n,e)})):!1}nn.isOptionalProd=ST;function bee(t){return t instanceof st.Alternation}nn.isBranchingProd=bee;function Pee(t){if(t instanceof st.NonTerminal)return"SUBRULE";if(t instanceof st.Option)return"OPTION";if(t instanceof st.Alternation)return"OR";if(t instanceof st.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof st.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof st.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof st.Repetition)return"MANY";if(t instanceof st.Terminal)return"CONSUME";throw Error("non exhaustive match")}nn.getProductionDslName=Pee});var _t=d(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.isSequenceProd=he.isBranchingProd=he.isOptionalProd=he.getProductionDslName=he.GAstVisitor=he.serializeProduction=he.serializeGrammar=he.Alternative=he.Alternation=he.RepetitionWithSeparator=he.RepetitionMandatoryWithSeparator=he.RepetitionMandatory=he.Repetition=he.Option=he.NonTerminal=he.Terminal=he.Rule=void 0;var an=Jd();Object.defineProperty(he,"Rule",{enumerable:!0,get:function(){return an.Rule}});Object.defineProperty(he,"Terminal",{enumerable:!0,get:function(){return an.Terminal}});Object.defineProperty(he,"NonTerminal",{enumerable:!0,get:function(){return an.NonTerminal}});Object.defineProperty(he,"Option",{enumerable:!0,get:function(){return an.Option}});Object.defineProperty(he,"Repetition",{enumerable:!0,get:function(){return an.Repetition}});Object.defineProperty(he,"RepetitionMandatory",{enumerable:!0,get:function(){return an.RepetitionMandatory}});Object.defineProperty(he,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return an.RepetitionMandatoryWithSeparator}});Object.defineProperty(he,"RepetitionWithSeparator",{enumerable:!0,get:function(){return an.RepetitionWithSeparator}});Object.defineProperty(he,"Alternation",{enumerable:!0,get:function(){return an.Alternation}});Object.defineProperty(he,"Alternative",{enumerable:!0,get:function(){return an.Alternative}});Object.defineProperty(he,"serializeGrammar",{enumerable:!0,get:function(){return an.serializeGrammar}});Object.defineProperty(he,"serializeProduction",{enumerable:!0,get:function(){return an.serializeProduction}});var Cee=WO();Object.defineProperty(he,"GAstVisitor",{enumerable:!0,get:function(){return Cee.GAstVisitor}});var tp=sI();Object.defineProperty(he,"getProductionDslName",{enumerable:!0,get:function(){return tp.getProductionDslName}});Object.defineProperty(he,"isOptionalProd",{enumerable:!0,get:function(){return tp.isOptionalProd}});Object.defineProperty(he,"isBranchingProd",{enumerable:!0,get:function(){return tp.isBranchingProd}});Object.defineProperty(he,"isSequenceProd",{enumerable:!0,get:function(){return tp.isSequenceProd}})});var rp=d(Hs=>{"use strict";var cI=Hs&&Hs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.RestWalker=void 0;var kee=cI(zd()),uI=cI(Kt()),kr=_t(),wee=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,uI.default)(e.definition,function(i,a){var o=(0,kee.default)(e.definition,a+1);if(i instanceof kr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof kr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof kr.Alternative)n.walkFlat(i,o,r);else if(i instanceof kr.Option)n.walkOption(i,o,r);else if(i instanceof kr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof kr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof kr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof kr.Repetition)n.walkMany(i,o,r);else if(i instanceof kr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new kr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=lI(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new kr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=lI(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,uI.default)(e.definition,function(o){var s=new kr.Alternative({definition:[o]});i.walk(s,a)})},t}();Hs.RestWalker=wee;function lI(t,e,r){var n=[new kr.Option({definition:[new kr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var mI=d((v_e,pI)=>{var fI=so(),Eee=Tl(),Nee=Le(),dI=fI?fI.isConcatSpreadable:void 0;function $ee(t){return Nee(t)||Eee(t)||!!(dI&&t&&t[dI])}pI.exports=$ee});var np=d((T_e,yI)=>{var Oee=qd(),Iee=mI();function hI(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=Iee),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?hI(s,e-1,r,n,i):Oee(i,s):n||(i[i.length]=s)}return i}yI.exports=hI});var On=d((__e,gI)=>{var Dee=np();function xee(t){var e=t==null?0:t.length;return e?Dee(t,1):[]}gI.exports=xee});var PT=d((R_e,vI)=>{var Lee=ep();function qee(t,e){var r=t==null?0:t.length;return!!r&&Lee(t,e,0)>-1}vI.exports=qee});var CT=d((A_e,TI)=>{function Mee(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}TI.exports=Mee});var ip=d((S_e,_I)=>{function Fee(){}_I.exports=Fee});var AI=d((b_e,RI)=>{var kT=Bv(),jee=ip(),Gee=Ld(),Uee=1/0,Hee=kT&&1/Gee(new kT([,-0]))[1]==Uee?function(t){return new kT(t)}:jee;RI.exports=Hee});var wT=d((P_e,SI)=>{var Kee=Dd(),Wee=PT(),Bee=CT(),Vee=xd(),zee=AI(),Yee=Ld(),Xee=200;function Jee(t,e,r){var n=-1,i=Wee,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=Bee;else if(a>=Xee){var l=e?null:zee(t);if(l)return Yee(l);o=!1,i=Vee,u=new Kee}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var h=u.length;h--;)if(u[h]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}SI.exports=Jee});var ap=d((C_e,bI)=>{var Qee=wT();function Zee(t){return t&&t.length?Qee(t):[]}bI.exports=Zee});var $T=d(on=>{"use strict";var NT=on&&on.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(on,"__esModule",{value:!0});on.firstForTerminal=on.firstForBranching=on.firstForSequence=on.first=void 0;var ete=NT(On()),CI=NT(ap()),tte=NT(Ht()),PI=_t(),ET=_t();function op(t){if(t instanceof PI.NonTerminal)return op(t.referencedRule);if(t instanceof PI.Terminal)return EI(t);if((0,ET.isSequenceProd)(t))return kI(t);if((0,ET.isBranchingProd)(t))return wI(t);throw Error("non exhaustive match")}on.first=op;function kI(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,ET.isOptionalProd)(a),e=e.concat(op(a)),n=n+1,i=r.length>n;return(0,CI.default)(e)}on.firstForSequence=kI;function wI(t){var e=(0,tte.default)(t.definition,function(r){return op(r)});return(0,CI.default)((0,ete.default)(e))}on.firstForBranching=wI;function EI(t){return[t.terminalType]}on.firstForTerminal=EI});var OT=d(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});sp.IN=void 0;sp.IN="_~IN~_"});var DI=d(wr=>{"use strict";var rte=wr&&wr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),NI=wr&&wr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wr,"__esModule",{value:!0});wr.buildInProdFollowPrefix=wr.buildBetweenProdsFollowPrefix=wr.computeAllProdsFollows=wr.ResyncFollowsWalker=void 0;var nte=rp(),ite=$T(),ate=NI(Kt()),ote=NI(Ll()),$I=OT(),ste=_t(),OI=function(t){rte(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=II(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new ste.Alternative({definition:o}),u=(0,ite.first)(s);this.follows[a]=u},e}(nte.RestWalker);wr.ResyncFollowsWalker=OI;function ute(t){var e={};return(0,ate.default)(t,function(r){var n=new OI(r).startWalking();(0,ote.default)(e,n)}),e}wr.computeAllProdsFollows=ute;function II(t,e){return t.name+e+$I.IN}wr.buildBetweenProdsFollowPrefix=II;function lte(t){var e=t.terminalType.name;return e+t.idx+$I.IN}wr.buildInProdFollowPrefix=lte});var co=d((N_e,xI)=>{function cte(t){return t===void 0}xI.exports=cte});var qI=d(($_e,LI)=>{function fte(t){return t&&t.length?t[0]:void 0}LI.exports=fte});var Ks=d((O_e,MI)=>{MI.exports=qI()});var Fl=d((I_e,FI)=>{function dte(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}FI.exports=dte});var IT=d((D_e,jI)=>{var pte=Ra();function mte(t,e){var r=[];return pte(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}jI.exports=mte});var UI=d((x_e,GI)=>{var hte="Expected a function";function yte(t){if(typeof t!="function")throw new TypeError(hte);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}GI.exports=yte});var up=d((L_e,HI)=>{var gte=Md(),vte=IT(),Tte=rn(),_te=Le(),Rte=UI();function Ate(t,e){var r=_te(t)?gte:vte;return r(t,Rte(Tte(e,3)))}HI.exports=Ate});var WI=d((q_e,KI)=>{var Ste=Dd(),bte=PT(),Pte=CT(),Cte=Es(),kte=ks(),wte=xd(),Ete=200;function Nte(t,e,r,n){var i=-1,a=bte,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=Cte(e,kte(r))),n?(a=Pte,o=!1):e.length>=Ete&&(a=wte,o=!1,e=new Ste(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var h=l;h--;)if(e[h]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}KI.exports=Nte});var VI=d((M_e,BI)=>{var $te=$n(),Ote=Nn();function Ite(t){return Ote(t)&&$te(t)}BI.exports=Ite});var lp=d((F_e,YI)=>{var Dte=WI(),xte=np(),Lte=Yd(),zI=VI(),qte=Lte(function(t,e){return zI(t)?Dte(t,xte(e,1,zI,!0)):[]});YI.exports=qte});var JI=d((j_e,XI)=>{var Mte=ep(),Fte=Gs(),jte=Math.max;function Gte(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Fte(r);return i<0&&(i=jte(n+i,0)),Mte(t,e,i)}XI.exports=Gte});var ZI=d((G_e,QI)=>{var Ute=rn(),Hte=$n(),Kte=qr();function Wte(t){return function(e,r,n){var i=Object(e);if(!Hte(e)){var a=Ute(r,3);e=Kte(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}QI.exports=Wte});var t1=d((U_e,e1)=>{var Bte=AT(),Vte=rn(),zte=Gs(),Yte=Math.max;function Xte(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:zte(r);return i<0&&(i=Yte(n+i,0)),Bte(t,Vte(e,3),i)}e1.exports=Xte});var cp=d((H_e,r1)=>{var Jte=ZI(),Qte=t1(),Zte=Jte(Qte);r1.exports=Zte});var jl=d((K_e,n1)=>{var ere=Md(),tre=IT(),rre=rn(),nre=Le();function ire(t,e){var r=nre(t)?ere:tre;return r(t,rre(e,3))}n1.exports=ire});var DT=d((W_e,a1)=>{var are=Yd(),ore=Ns(),sre=xl(),ure=Ol(),i1=Object.prototype,lre=i1.hasOwnProperty,cre=are(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&sre(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=ure(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||ore(c,i1[l])&&!lre.call(t,l))&&(t[l]=a[l])}return t});a1.exports=cre});var s1=d((B_e,o1)=>{function fre(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}o1.exports=fre});var l1=d((V_e,u1)=>{function dre(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}u1.exports=dre});var Mi=d((z_e,c1)=>{var pre=s1(),mre=Ra(),hre=rn(),yre=l1(),gre=Le();function vre(t,e,r){var n=gre(t)?pre:yre,i=arguments.length<3;return n(t,hre(e,4),r,i,mre)}c1.exports=vre});var dp=d(Ws=>{"use strict";Object.defineProperty(Ws,"__esModule",{value:!0});Ws.clearRegExpParserCache=Ws.getRegExpAst=void 0;var Tre=cl(),fp={},_re=new Tre.RegExpParser;function Rre(t){var e=t.toString();if(fp.hasOwnProperty(e))return fp[e];var r=_re.pattern(e);return fp[e]=r,r}Ws.getRegExpAst=Rre;function Are(){fp={}}Ws.clearRegExpParserCache=Are});var y1=d(sr=>{"use strict";var Sre=sr&&sr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Bs=sr&&sr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(sr,"__esModule",{value:!0});sr.canMatchCharCode=sr.firstCharOptimizedIndices=sr.getOptimizedStartCodesIndices=sr.failedOptimizationPrefixMsg=void 0;var p1=cl(),bre=Bs(Le()),Pre=Bs(Ml()),Cre=Bs(Kt()),xT=Bs(cp()),kre=Bs(Qn()),qT=Bs(qi()),f1=js(),m1=dp(),Fi=MT(),h1="Complement Sets are not supported for first char optimization";sr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function wre(t,e){e===void 0&&(e=!1);try{var r=(0,m1.getRegExpAst)(t),n=mp(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===h1)e&&(0,f1.PRINT_WARNING)("".concat(sr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,f1.PRINT_ERROR)("".concat(sr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(p1.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}sr.getOptimizedStartCodesIndices=wre;function mp(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)mp(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":pp(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(h1);(0,Cre.default)(o.value,function(l){if(typeof l=="number")pp(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)pp(f,e,r);else{for(var f=c.from;f<=c.to&&f<Fi.minOptimizationVal;f++)pp(f,e,r);if(c.to>=Fi.minOptimizationVal)for(var h=c.from>=Fi.minOptimizationVal?c.from:Fi.minOptimizationVal,v=c.to,y=(0,Fi.charCodeToOptimizedIndex)(h),A=(0,Fi.charCodeToOptimizedIndex)(v),w=y;w<=A;w++)e[w]=w}}});break;case"Group":mp(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&LT(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,kre.default)(e)}sr.firstCharOptimizedIndices=mp;function pp(t,e,r){var n=(0,Fi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&Ere(t,e)}function Ere(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Fi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Fi.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function d1(t,e){return(0,xT.default)(t.value,function(r){if(typeof r=="number")return(0,qT.default)(e,r);var n=r;return(0,xT.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function LT(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,bre.default)(t.value)?(0,Pre.default)(t.value,LT):LT(t.value):!1}var Nre=function(t){Sre(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,qT.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?d1(r,this.targetCharCodes)===void 0&&(this.found=!0):d1(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(p1.BaseRegExpVisitor);function $re(t,e){if(e instanceof RegExp){var r=(0,m1.getRegExpAst)(e),n=new Nre(t);return n.visit(r),n.found}else return(0,xT.default)(e,function(i){return(0,qT.default)(t,i.charCodeAt(0))})!==void 0}sr.canMatchCharCode=$re});var MT=d(K=>{"use strict";var T1=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),yt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var _1=cl(),Fe=Gl(),Ore=yt(Ks()),R1=yt(Lr()),A1=yt(Fl()),yp=yt(Le()),Ire=yt(Qn()),Dre=yt(On()),S1=yt(up()),b1=yt(lp()),g1=yt(JI()),ut=yt(Ht()),ji=yt(Kt()),Gi=yt(Dl()),vp=yt(Ss()),jT=yt(co()),xre=yt(cp()),ur=yt(Mr()),Lre=yt(qr()),Aa=yt(TT()),ii=yt(jl()),qre=yt(DT()),gp=yt(Mi()),Tp=yt(qi()),v1=js(),Vs=y1(),P1=dp(),fo="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function Mre(){K.SUPPORT_STICKY=!1}K.disableSticky=Mre;function Fre(){K.SUPPORT_STICKY=!0}K.enableSticky=Fre;function jre(t,e){e=(0,qre.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){Xre()});var n;r("Reject Lexer.NA",function(){n=(0,S1.default)(t,function(b){return b[fo]===Fe.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,ut.default)(n,function(b){var S=b[fo];if((0,Aa.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,Tp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?UT(S):GT(S)}else{if((0,vp.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?UT(W):GT(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,ut.default)(n,function(b){return b.tokenTypeIdx}),s=(0,ut.default)(n,function(b){var S=b.GROUP;if(S!==Fe.Lexer.SKIPPED){if((0,Gi.default)(S))return S;if((0,jT.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,ut.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,yp.default)(S)?(0,ut.default)(S,function(F){return(0,g1.default)(n,F)}):[(0,g1.default)(n,S)];return O}}),l=(0,ut.default)(n,function(b){return b.PUSH_MODE}),c=(0,ut.default)(n,function(b){return(0,ur.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=F1(e.lineTerminatorCharacters);f=(0,ut.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,ut.default)(n,function(S){return(0,ur.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:q1(S,b)===!1&&(0,Vs.canMatchCharCode)(b,S.PATTERN)}))});var h,v,y,A;r("Misc Mapping #2",function(){h=(0,ut.default)(n,KT),v=(0,ut.default)(a,L1),y=(0,gp.default)(n,function(b,S){var O=S.GROUP;return(0,Gi.default)(O)&&O!==Fe.Lexer.SKIPPED&&(b[O]=[]),b},{}),A=(0,ut.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:h[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var w=!0,C=[];return e.safeMode||r("First Char Optimization",function(){C=(0,gp.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=HT(F);FT(b,W,A[O])}else if((0,yp.default)(S.START_CHARS_HINT)){var te;(0,ji.default)(S.START_CHARS_HINT,function(Ee){var Qe=typeof Ee=="string"?Ee.charCodeAt(0):Ee,V=HT(Qe);te!==V&&(te=V,FT(b,V,A[O]))})}else if((0,Aa.default)(S.PATTERN))if(S.PATTERN.unicode)w=!1,e.ensureOptimizations&&(0,v1.PRINT_ERROR)("".concat(Vs.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var we=(0,Vs.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,R1.default)(we)&&(w=!1),(0,ji.default)(we,function(Ee){FT(b,Ee,A[O])})}else e.ensureOptimizations&&(0,v1.PRINT_ERROR)("".concat(Vs.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),w=!1;return b},[])}),{emptyGroups:y,patternIdxToConfig:A,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:w}}K.analyzeTokenTypes=jre;function Gre(t,e){var r=[],n=C1(t);r=r.concat(n.errors);var i=k1(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(Ure(a)),r=r.concat(I1(a)),r=r.concat(D1(a,e)),r=r.concat(x1(a)),r}K.validatePatterns=Gre;function Ure(t){var e=[],r=(0,ii.default)(t,function(n){return(0,Aa.default)(n[fo])});return e=e.concat(w1(r)),e=e.concat(N1(r)),e=e.concat($1(r)),e=e.concat(O1(r)),e=e.concat(E1(r)),e}function C1(t){var e=(0,ii.default)(t,function(i){return!(0,ur.default)(i,fo)}),r=(0,ut.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:Fe.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,b1.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=C1;function k1(t){var e=(0,ii.default)(t,function(i){var a=i[fo];return!(0,Aa.default)(a)&&!(0,vp.default)(a)&&!(0,ur.default)(a,"exec")&&!(0,Gi.default)(a)}),r=(0,ut.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:Fe.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,b1.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=k1;var Hre=/[^\\][$]/;function w1(t){var e=function(i){T1(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(_1.BaseRegExpVisitor),r=(0,ii.default)(t,function(i){var a=i.PATTERN;try{var o=(0,P1.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Hre.test(a.source)}}),n=(0,ut.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Fe.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=w1;function E1(t){var e=(0,ii.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:Fe.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=E1;var Kre=/[^\\[][\^]|^\^/;function N1(t){var e=function(i){T1(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(_1.BaseRegExpVisitor),r=(0,ii.default)(t,function(i){var a=i.PATTERN;try{var o=(0,P1.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Kre.test(a.source)}}),n=(0,ut.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Fe.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=N1;function $1(t){var e=(0,ii.default)(t,function(n){var i=n[fo];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:Fe.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=$1;function O1(t){var e=[],r=(0,ut.default)(t,function(a){return(0,gp.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Tp.default)(e,s)&&s.PATTERN!==Fe.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,A1.default)(r);var n=(0,ii.default)(r,function(a){return a.length>1}),i=(0,ut.default)(n,function(a){var o=(0,ut.default)(a,function(u){return u.name}),s=(0,Ore.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:Fe.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=O1;function I1(t){var e=(0,ii.default)(t,function(n){if(!(0,ur.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==Fe.Lexer.SKIPPED&&i!==Fe.Lexer.NA&&!(0,Gi.default)(i)}),r=(0,ut.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:Fe.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=I1;function D1(t,e){var r=(0,ii.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Tp.default)(e,i.PUSH_MODE)}),n=(0,ut.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:Fe.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=D1;function x1(t){var e=[],r=(0,gp.default)(t,function(n,i,a){var o=i.PATTERN;return o===Fe.Lexer.NA||((0,Gi.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,Aa.default)(o)&&Bre(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,ji.default)(t,function(n,i){(0,ji.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Wre(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:Fe.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=x1;function Wre(t,e){if((0,Aa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,vp.default)(e))return e(t,0,[],{});if((0,ur.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Bre(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,xre.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function GT(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=GT;function UT(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=UT;function Vre(t,e,r){var n=[];return(0,ur.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,ur.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,ur.default)(t,K.MODES)&&(0,ur.default)(t,K.DEFAULT_MODE)&&!(0,ur.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,ur.default)(t,K.MODES)&&(0,ji.default)(t.modes,function(i,a){(0,ji.default)(i,function(o,s){if((0,jT.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:Fe.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,ur.default)(o,"LONGER_ALT")){var u=(0,yp.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,ji.default)(u,function(l){!(0,jT.default)(l)&&!(0,Tp.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=Vre;function zre(t,e,r){var n=[],i=!1,a=(0,A1.default)((0,Dre.default)((0,Ire.default)(t.modes))),o=(0,S1.default)(a,function(u){return u[fo]===Fe.Lexer.NA}),s=F1(r);return e&&(0,ji.default)(o,function(u){var l=q1(u,s);if(l!==!1){var c=M1(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,ur.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,Vs.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:Fe.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=zre;function Yre(t){var e={},r=(0,Lre.default)(t);return(0,ji.default)(r,function(n){var i=t[n];if((0,yp.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=Yre;function KT(t){var e=t.PATTERN;if((0,Aa.default)(e))return!1;if((0,vp.default)(e))return!0;if((0,ur.default)(e,"exec"))return!0;if((0,Gi.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=KT;function L1(t){return(0,Gi.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=L1;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function q1(t,e){if((0,ur.default)(t,"LINE_BREAKS"))return!1;if((0,Aa.default)(t.PATTERN)){try{(0,Vs.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Gi.default)(t.PATTERN))return!1;if(KT(t))return{issue:Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function M1(t,e){if(e.issue===Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=M1;function F1(t){var e=(0,ut.default)(t,function(r){return(0,Gi.default)(r)?r.charCodeAt(0):r});return e}function FT(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var hp=[];function HT(t){return t<K.minOptimizationVal?t:hp[t]}K.charCodeToOptimizedIndex=HT;function Xre(){if((0,R1.default)(hp)){hp=new Array(65536);for(var t=0;t<65536;t++)hp[t]=t>255?255+~~(t/255):t}}});var _p=d((Q_e,j1)=>{function Jre(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}j1.exports=Jre});var mo=d(ce=>{"use strict";var ai=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});ce.isTokenType=ce.hasExtendingTokensTypesMapProperty=ce.hasExtendingTokensTypesProperty=ce.hasCategoriesProperty=ce.hasShortKeyProperty=ce.singleAssignCategoriesToksMap=ce.assignCategoriesMapProp=ce.assignCategoriesTokensProp=ce.assignTokenDefaultProps=ce.expandCategories=ce.augmentTokenTypes=ce.tokenIdxToClass=ce.tokenShortNameIdx=ce.tokenStructuredMatcherNoCategories=ce.tokenStructuredMatcher=void 0;var Qre=ai(Lr()),Zre=ai(Fl()),ene=ai(Le()),tne=ai(On()),rne=ai(lp()),nne=ai(Ht()),po=ai(Kt()),Ul=ai(Mr()),ine=ai(qi()),ane=ai(xi());function one(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}ce.tokenStructuredMatcher=one;function sne(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}ce.tokenStructuredMatcherNoCategories=sne;ce.tokenShortNameIdx=1;ce.tokenIdxToClass={};function une(t){var e=G1(t);U1(e),K1(e),H1(e),(0,po.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}ce.augmentTokenTypes=une;function G1(t){for(var e=(0,ane.default)(t),r=t,n=!0;n;){r=(0,Zre.default)((0,tne.default)((0,nne.default)(r,function(a){return a.CATEGORIES})));var i=(0,rne.default)(r,e);e=e.concat(i),(0,Qre.default)(i)?n=!1:r=i}return e}ce.expandCategories=G1;function U1(t){(0,po.default)(t,function(e){W1(e)||(ce.tokenIdxToClass[ce.tokenShortNameIdx]=e,e.tokenTypeIdx=ce.tokenShortNameIdx++),WT(e)&&!(0,ene.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),WT(e)||(e.CATEGORIES=[]),B1(e)||(e.categoryMatches=[]),V1(e)||(e.categoryMatchesMap={})})}ce.assignTokenDefaultProps=U1;function H1(t){(0,po.default)(t,function(e){e.categoryMatches=[],(0,po.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(ce.tokenIdxToClass[n].tokenTypeIdx)})})}ce.assignCategoriesTokensProp=H1;function K1(t){(0,po.default)(t,function(e){BT([],e)})}ce.assignCategoriesMapProp=K1;function BT(t,e){(0,po.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,po.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,ine.default)(n,r)||BT(n,r)})}ce.singleAssignCategoriesToksMap=BT;function W1(t){return(0,Ul.default)(t,"tokenTypeIdx")}ce.hasShortKeyProperty=W1;function WT(t){return(0,Ul.default)(t,"CATEGORIES")}ce.hasCategoriesProperty=WT;function B1(t){return(0,Ul.default)(t,"categoryMatches")}ce.hasExtendingTokensTypesProperty=B1;function V1(t){return(0,Ul.default)(t,"categoryMatchesMap")}ce.hasExtendingTokensTypesMapProperty=V1;function lne(t){return(0,Ul.default)(t,"tokenTypeIdx")}ce.isTokenType=lne});var VT=d(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.defaultLexerErrorProvider=void 0;Rp.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var Gl=d(Hi=>{"use strict";var Fr=Hi&&Hi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Hi,"__esModule",{value:!0});Hi.Lexer=Hi.LexerDefinitionErrorType=void 0;var Ui=MT(),zT=Fr(ip()),Ap=Fr(Lr()),cne=Fr(Le()),fne=Fr(_p()),dne=Fr(up()),z1=Fr(Ht()),YT=Fr(Kt()),pne=Fr(qr()),mne=Fr(co()),Y1=Fr(lo()),X1=Fr(Ll()),hne=Fr(Mi()),J1=Fr(xi()),XT=js(),yne=mo(),gne=VT(),vne=dp(),Tne;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Tne=Hi.LexerDefinitionErrorType||(Hi.LexerDefinitionErrorType={}));var Hl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:gne.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Hl);var _ne=function(){function t(e,r){r===void 0&&(r=Hl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,XT.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,X1.default)({},Hl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===Hl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Ui.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===Hl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,cne.default)(e)?a={modes:{defaultMode:(0,J1.default)(e)},defaultMode:Ui.DEFAULT_MODE}:(o=!1,a=(0,J1.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ui.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Ui.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,YT.default)(a.modes,function(c,f){a.modes[f]=(0,dne.default)(c,function(h){return(0,mne.default)(h)})});var s=(0,pne.default)(a.modes);if((0,YT.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ui.validatePatterns)(c,s))}),(0,Ap.default)(n.lexerDefinitionErrors)){(0,yne.augmentTokenTypes)(c);var h;n.TRACE_INIT("analyzeTokenTypes",function(){h=(0,Ui.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=h.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=h.charCodeToPatternIdxToConfig,n.emptyGroups=(0,X1.default)({},n.emptyGroups,h.emptyGroups),n.hasCustom=h.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=h.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,Ap.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,z1.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,YT.default)(n.lexerDefinitionWarning,function(c){(0,XT.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Ui.SUPPORT_STICKY?(n.chopInput=Y1.default,n.match=n.matchWithTest):(n.updateLastIndex=zT.default,n.match=n.matchWithExec),o&&(n.handleModes=zT.default),n.trackStartLines===!1&&(n.computeNewColumn=Y1.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=zT.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,hne.default)(n.canModeBeOptimized,function(f,h,v){return h===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,Ap.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,vne.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,XT.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,Ap.default)(this.lexerDefinitionErrors)){var n=(0,z1.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,h,v,y,A,w,C,b,S,O=e,F=O.length,W=0,te=0,we=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(we),Qe=[],V=this.trackStartLines?1:void 0,fe=this.trackStartLines?1:void 0,q=(0,Ui.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,ae=[],oe=[],Z=[],dt=[];Object.freeze(dt);var tt;function Dt(){return ae}function cn(qt){var dn=(0,Ui.charCodeToOptimizedIndex)(qt),pn=oe[dn];return pn===void 0?dt:pn}var Ir=function(qt){if(Z.length===1&&qt.tokenType.PUSH_MODE===void 0){var dn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(qt);Qe.push({offset:qt.startOffset,line:qt.startLine,column:qt.startColumn,length:qt.image.length,message:dn})}else{Z.pop();var pn=(0,fne.default)(Z);ae=n.patternIdxToConfig[pn],oe=n.charCodeToPatternIdxToConfig[pn],B=ae.length;var Gn=n.canModeBeOptimized[pn]&&n.config.safeMode===!1;oe&&Gn?tt=cn:tt=Dt}};function Eo(qt){Z.push(qt),oe=this.charCodeToPatternIdxToConfig[qt],ae=this.patternIdxToConfig[qt],B=ae.length,B=ae.length;var dn=this.canModeBeOptimized[qt]&&this.config.safeMode===!1;oe&&dn?tt=cn:tt=Dt}Eo.call(this,r);for(var cr,No=this.config.recoveryEnabled;W<F;){l=null;var $o=O.charCodeAt(W),Oo=tt($o),$u=Oo.length;for(i=0;i<$u;i++){cr=Oo[i];var gt=cr.pattern;c=null;var gi=cr.short;if(gi!==!1?$o===gi&&(l=gt):cr.isCustom===!0?(S=gt.exec(O,W,Ee,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(gt,W),l=this.match(gt,e,W)),l!==null){if(u=cr.longerAlt,u!==void 0){var Ou=u.length;for(o=0;o<Ou;o++){var Mn=ae[u[o]],ja=Mn.pattern;if(f=null,Mn.isCustom===!0?(S=ja.exec(O,W,Ee,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(ja,W),s=this.match(ja,e,W)),s&&s.length>l.length){l=s,c=f,cr=Mn;break}}}break}}if(l!==null){if(h=l.length,v=cr.group,v!==void 0&&(y=cr.tokenTypeIdx,A=this.createTokenInstance(l,W,y,cr.tokenType,V,fe,h),this.handlePayload(A,c),v===!1?te=this.addToken(Ee,te,A):q[v].push(A)),e=this.chopInput(e,h),W=W+h,fe=this.computeNewColumn(fe,h),L===!0&&cr.canLineTerminator===!0){var Fn=0,Ga=void 0,Hr=void 0;j.lastIndex=0;do Ga=j.test(l),Ga===!0&&(Hr=j.lastIndex-1,Fn++);while(Ga===!0);Fn!==0&&(V=V+Fn,fe=h-Hr,this.updateTokenEndLineColumnLocation(A,v,Hr,Fn,V,fe,h))}this.handleModes(cr,Ir,Eo,A)}else{for(var fn=W,Io=V,Do=fe,Dr=No===!1;Dr===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var jn=ae[a],gt=jn.pattern,gi=jn.short;if(gi!==!1?O.charCodeAt(W)===gi&&(Dr=!0):jn.isCustom===!0?Dr=gt.exec(O,W,Ee,q)!==null:(this.updateLastIndex(gt,W),Dr=gt.exec(e)!==null),Dr===!0)break}if(w=W-fn,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,fn,w,Io,Do),Qe.push({offset:fn,line:Io,column:Do,length:w,message:b}),No===!1)break}}return this.hasCustom||(Ee.length=te),{tokens:Ee,groups:q,errors:Qe}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Hi.Lexer=_ne});var ho=d(Lt=>{"use strict";var JT=Lt&&Lt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Lt,"__esModule",{value:!0});Lt.tokenMatcher=Lt.createTokenInstance=Lt.EOF=Lt.createToken=Lt.hasTokenLabel=Lt.tokenName=Lt.tokenLabel=void 0;var Rne=JT(Dl()),Ki=JT(Mr()),Ane=JT(co()),Sne=Gl(),QT=mo();function bne(t){return oD(t)?t.LABEL:t.name}Lt.tokenLabel=bne;function Pne(t){return t.name}Lt.tokenName=Pne;function oD(t){return(0,Rne.default)(t.LABEL)&&t.LABEL!==""}Lt.hasTokenLabel=oD;var Cne="parent",Q1="categories",Z1="label",eD="group",tD="push_mode",rD="pop_mode",nD="longer_alt",iD="line_breaks",aD="start_chars_hint";function sD(t){return kne(t)}Lt.createToken=sD;function kne(t){var e=t.pattern,r={};if(r.name=t.name,(0,Ane.default)(e)||(r.PATTERN=e),(0,Ki.default)(t,Cne))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,Ki.default)(t,Q1)&&(r.CATEGORIES=t[Q1]),(0,QT.augmentTokenTypes)([r]),(0,Ki.default)(t,Z1)&&(r.LABEL=t[Z1]),(0,Ki.default)(t,eD)&&(r.GROUP=t[eD]),(0,Ki.default)(t,rD)&&(r.POP_MODE=t[rD]),(0,Ki.default)(t,tD)&&(r.PUSH_MODE=t[tD]),(0,Ki.default)(t,nD)&&(r.LONGER_ALT=t[nD]),(0,Ki.default)(t,iD)&&(r.LINE_BREAKS=t[iD]),(0,Ki.default)(t,aD)&&(r.START_CHARS_HINT=t[aD]),r}Lt.EOF=sD({name:"EOF",pattern:Sne.Lexer.NA});(0,QT.augmentTokenTypes)([Lt.EOF]);function wne(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}Lt.createTokenInstance=wne;function Ene(t,e){return(0,QT.tokenStructuredMatcher)(t,e)}Lt.tokenMatcher=Ene});var Ys=d(In=>{"use strict";var t_=In&&In.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(In,"__esModule",{value:!0});In.defaultGrammarValidatorErrorProvider=In.defaultGrammarResolverErrorProvider=In.defaultParserErrorProvider=void 0;var zs=ho(),e_=t_(Ks()),Sa=t_(Ht()),Nne=t_(Mi()),ZT=_t(),uD=_t();In.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,zs.hasTokenLabel)(e),o=a?"--> ".concat((0,zs.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,e_.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Nne.default)(e,function(v,y){return v.concat(y)},[]),c=(0,Sa.default)(l,function(v){return"[".concat((0,Sa.default)(v,function(y){return(0,zs.tokenLabel)(y)}).join(", "),"]")}),f=(0,Sa.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),h=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+h+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,e_.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,Sa.default)(e,function(c){return"[".concat((0,Sa.default)(c,function(f){return(0,zs.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(In.defaultParserErrorProvider);In.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};In.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof ZT.Terminal?c.terminalType.name:c instanceof ZT.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,e_.default)(e),a=i.idx,o=(0,uD.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,Sa.default)(t.prefixPath,function(i){return(0,zs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,Sa.default)(t.prefixPath,function(i){return(0,zs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,uD.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,Sa.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof ZT.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var fD=d(oi=>{"use strict";var $ne=oi&&oi.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lD=oi&&oi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(oi,"__esModule",{value:!0});oi.GastRefResolverVisitor=oi.resolveGrammar=void 0;var One=Er(),Ine=lD(Kt()),Dne=lD(Qn()),xne=_t();function Lne(t,e){var r=new cD(t,e);return r.resolveRefs(),r.errors}oi.resolveGrammar=Lne;var cD=function(t){$ne(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,Ine.default)((0,Dne.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:One.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(xne.GAstVisitor);oi.GastRefResolverVisitor=cD});var pD=d((aRe,dD)=>{function qne(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}dD.exports=qne});var hD=d((oRe,mD)=>{var Mne=Ra();function Fne(t,e,r,n){return Mne(t,function(i,a,o){e(n,i,r(i),o)}),n}mD.exports=Fne});var gD=d((sRe,yD)=>{var jne=pD(),Gne=hD(),Une=rn(),Hne=Le();function Kne(t,e){return function(r,n){var i=Hne(r)?jne:Gne,a=e?e():{};return i(r,t,Une(n,2),a)}}yD.exports=Kne});var r_=d((uRe,vD)=>{var Wne=Hd(),Bne=gD(),Vne=Object.prototype,zne=Vne.hasOwnProperty,Yne=Bne(function(t,e,r){zne.call(t,r)?t[r].push(e):Wne(t,r,[e])});vD.exports=Yne});var Sp=d((lRe,TD)=>{var Xne=np(),Jne=Ht();function Qne(t,e){return Xne(Jne(t,e),1)}TD.exports=Qne});var bp=d((cRe,_D)=>{var Zne=Vd(),eie=Gs();function tie(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:eie(e),e=n-e,Zne(t,0,e<0?0:e)):[]}_D.exports=tie});var Wl=d(lt=>{"use strict";var go=lt&&lt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),vo=lt&&lt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(lt,"__esModule",{value:!0});lt.nextPossibleTokensAfter=lt.possiblePathsFrom=lt.NextTerminalAfterAtLeastOneSepWalker=lt.NextTerminalAfterAtLeastOneWalker=lt.NextTerminalAfterManySepWalker=lt.NextTerminalAfterManyWalker=lt.AbstractNextTerminalAfterProductionWalker=lt.NextAfterTokenWalker=lt.AbstractNextPossibleTokensWalker=void 0;var AD=rp(),Cp=vo(Ks()),Pp=vo(Lr()),RD=vo(bp()),gr=vo(zd()),rie=vo(_p()),nie=vo(Kt()),yo=vo(xi()),iie=$T(),de=_t(),SD=function(t){go(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,yo.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,yo.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,Pp.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(AD.RestWalker);lt.AbstractNextPossibleTokensWalker=SD;var aie=function(t){go(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,iie.first)(o),this.found=!0}},e}(SD);lt.NextAfterTokenWalker=aie;var Kl=function(t){go(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(AD.RestWalker);lt.AbstractNextTerminalAfterProductionWalker=Kl;var oie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Cp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(Kl);lt.NextTerminalAfterManyWalker=oie;var sie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Cp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(Kl);lt.NextTerminalAfterManySepWalker=sie;var uie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Cp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(Kl);lt.NextTerminalAfterAtLeastOneWalker=uie;var lie=function(t){go(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Cp.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(Kl);lt.NextTerminalAfterAtLeastOneSepWalker=lie;function bD(t,e,r){r===void 0&&(r=[]),r=(0,yo.default)(r);var n=[],i=0;function a(l){return l.concat((0,gr.default)(t,i+1))}function o(l){var c=bD(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,nie.default)(s.definition,function(l){(0,Pp.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,gr.default)(t,i)}),n}lt.possiblePathsFrom=bD;function cie(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,Pp.default)(f);){var h=f.pop();if(h===o){s&&(0,rie.default)(f).idx<=l&&f.pop();continue}var v=h.def,y=h.idx,A=h.ruleStack,w=h.occurrenceStack;if(!(0,Pp.default)(v)){var C=v[0];if(C===i){var b={idx:y,def:(0,gr.default)(v),ruleStack:(0,RD.default)(A),occurrenceStack:(0,RD.default)(w)};f.push(b)}else if(C instanceof de.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,C.terminalType)){var b={idx:S,def:(0,gr.default)(v),ruleStack:A,occurrenceStack:w};f.push(b)}}else if(y===u-1)c.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:A,occurrenceStack:w}),s=!0;else throw Error("non exhaustive match");else if(C instanceof de.NonTerminal){var F=(0,yo.default)(A);F.push(C.nonTerminalName);var W=(0,yo.default)(w);W.push(C.idx);var b={idx:y,def:C.definition.concat(a,(0,gr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(C instanceof de.Option){var te={idx:y,def:(0,gr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var we={idx:y,def:C.definition.concat((0,gr.default)(v)),ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.RepetitionMandatory){var Ee=new de.Repetition({definition:C.definition,idx:C.idx}),Qe=C.definition.concat([Ee],(0,gr.default)(v)),b={idx:y,def:Qe,ruleStack:A,occurrenceStack:w};f.push(b)}else if(C instanceof de.RepetitionMandatoryWithSeparator){var V=new de.Terminal({terminalType:C.separator}),Ee=new de.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Qe=C.definition.concat([Ee],(0,gr.default)(v)),b={idx:y,def:Qe,ruleStack:A,occurrenceStack:w};f.push(b)}else if(C instanceof de.RepetitionWithSeparator){var te={idx:y,def:(0,gr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var V=new de.Terminal({terminalType:C.separator}),fe=new de.Repetition({definition:[V].concat(C.definition),idx:C.idx}),Qe=C.definition.concat([fe],(0,gr.default)(v)),we={idx:y,def:Qe,ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.Repetition){var te={idx:y,def:(0,gr.default)(v),ruleStack:A,occurrenceStack:w};f.push(te),f.push(o);var fe=new de.Repetition({definition:C.definition,idx:C.idx}),Qe=C.definition.concat([fe],(0,gr.default)(v)),we={idx:y,def:Qe,ruleStack:A,occurrenceStack:w};f.push(we)}else if(C instanceof de.Alternation)for(var q=C.definition.length-1;q>=0;q--){var L=C.definition[q],j={idx:y,def:L.definition.concat((0,gr.default)(v)),ruleStack:A,occurrenceStack:w};f.push(j),f.push(o)}else if(C instanceof de.Alternative)f.push({idx:y,def:C.definition.concat((0,gr.default)(v)),ruleStack:A,occurrenceStack:w});else if(C instanceof de.Rule)f.push(fie(C,y,A,w));else throw Error("non exhaustive match")}}return c}lt.nextPossibleTokensAfter=cie;function fie(t,e,r,n){var i=(0,yo.default)(r);i.push(t.name);var a=(0,yo.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Xs=d(Re=>{"use strict";var wD=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ro=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var i_=Ro(Lr()),ED=Ro(On()),_o=Ro(Ml()),kp=Ro(Ht()),To=Ro(Kt()),PD=Ro(Mr()),ND=Ro(Mi()),CD=Wl(),die=rp(),wp=mo(),ba=_t(),pie=_t(),Nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(Nt=Re.PROD_TYPE||(Re.PROD_TYPE={}));function $D(t){if(t instanceof ba.Option||t==="Option")return Nt.OPTION;if(t instanceof ba.Repetition||t==="Repetition")return Nt.REPETITION;if(t instanceof ba.RepetitionMandatory||t==="RepetitionMandatory")return Nt.REPETITION_MANDATORY;if(t instanceof ba.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return Nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof ba.RepetitionWithSeparator||t==="RepetitionWithSeparator")return Nt.REPETITION_WITH_SEPARATOR;if(t instanceof ba.Alternation||t==="Alternation")return Nt.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=$D;function mie(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=$D(n);return a===Nt.ALTERNATION?o_(e,r,i):s_(e,r,a,i)}Re.getLookaheadPaths=mie;function hie(t,e,r,n,i,a){var o=o_(t,e,r),s=u_(o)?wp.tokenStructuredMatcherNoCategories:wp.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=hie;function yie(t,e,r,n,i,a){var o=s_(t,e,i,r),s=u_(o)?wp.tokenStructuredMatcherNoCategories:wp.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=yie;function gie(t,e,r,n){var i=t.length,a=(0,_o.default)(t,function(u){return(0,_o.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,kp.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],h=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<h;y++){for(var A=f[y],w=A.length,C=0;C<w;C++){var b=this.LA(C+1);if(r(b,A[C])===!1)continue e}return c}}};if(a&&!n){var o=(0,kp.default)(t,function(u){return(0,ED.default)(u)}),s=(0,ND.default)(o,function(u,l,c){return(0,To.default)(l,function(f){(0,PD.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,To.default)(f.categoryMatches,function(h){(0,PD.default)(u,h)||(u[h]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var h=l[f],v=h.length,y=0;y<v;y++){var A=this.LA(y+1);if(r(A,h[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=gie;function vie(t,e,r){var n=(0,_o.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,ED.default)(t);if(a.length===1&&(0,i_.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,ND.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,To.default)(c.categoryMatches,function(h){l[h]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,h=0;h<f;h++){var v=this.LA(h+1);if(e(v,c[h])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=vie;var Tie=function(t){wD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,Nt.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(die.RestWalker),OD=function(t){wD(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,Nt.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,Nt.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,Nt.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,Nt.ALTERNATION)},e}(pie.GAstVisitor);function kD(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function n_(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function _ie(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function a_(t,e){for(var r=(0,kp.default)(t,function(c){return(0,CD.possiblePathsFrom)([c],1)}),n=kD(r.length),i=(0,kp.default)(r,function(c){var f={};return(0,To.default)(c,function(h){var v=n_(h.partialPath);(0,To.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=kD(s.length);for(var u=function(c){for(var f=s[c],h=0;h<f.length;h++){var v=f[h].partialPath,y=f[h].suffixDef,A=n_(v),w=_ie(i,A,c);if(w||(0,i_.default)(y)||v.length===e){var C=n[c];if(ID(C,v)===!1){C.push(v);for(var b=0;b<A.length;b++){var S=A[b];i[c][S]=!0}}}else{var O=(0,CD.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,To.default)(O,function(F){var W=n_(F.partialPath);(0,To.default)(W,function(te){i[c][te]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=a_;function o_(t,e,r,n){var i=new OD(t,Nt.ALTERNATION,n);return e.accept(i),a_(i.result,r)}Re.getLookaheadPathsForOr=o_;function s_(t,e,r,n){var i=new OD(t,r);e.accept(i);var a=i.result,o=new Tie(e,t,r),s=o.startWalking(),u=new ba.Alternative({definition:a}),l=new ba.Alternative({definition:s});return a_([u,l],n)}Re.getLookaheadPathsForOptionalProd=s_;function ID(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=ID;function Rie(t,e){return t.length<e.length&&(0,_o.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Rie;function u_(t){return(0,_o.default)(t,function(e){return(0,_o.default)(e,function(r){return(0,_o.default)(r,function(n){return(0,i_.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=u_});var zl=d(ye=>{"use strict";var c_=ye&&ye.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),l_=ye&&ye.__assign||function(){return l_=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},l_.apply(this,arguments)},Wt=ye&&ye.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ye,"__esModule",{value:!0});ye.checkPrefixAlternativesAmbiguities=ye.validateSomeNonEmptyLookaheadPath=ye.validateTooManyAlts=ye.RepetitionCollector=ye.validateAmbiguousAlternationAlternatives=ye.validateEmptyOrAlternative=ye.getFirstNoneTerminal=ye.validateNoLeftRecursion=ye.validateRuleIsOverridden=ye.validateRuleDoesNotAlreadyExist=ye.OccurrenceValidationCollector=ye.identifyProductionForDuplicates=ye.validateGrammar=ye.validateLookahead=void 0;var DD=Wt(Ks()),Ep=Wt(Lr()),Aie=Wt(zd()),xD=Wt(On()),Sie=Wt(jl()),bie=Wt(up()),Pie=Wt(lp()),Pa=Wt(Ht()),Vl=Wt(Kt()),Cie=Wt(r_()),f_=Wt(Mi()),kie=Wt(_T()),wie=Wt(Qn()),d_=Wt(qi()),Wi=Wt(Sp()),Eie=Wt(xi()),xn=Er(),p_=_t(),Js=Xs(),Nie=Wl(),Dn=_t(),m_=_t(),$ie=Wt(bp()),Oie=Wt(Fl()),Iie=mo();function Die(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,Pa.default)(e,function(r){return l_({type:xn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}ye.validateLookahead=Die;function xie(t,e,r,n){var i=(0,Wi.default)(t,function(u){return Lie(u,r)}),a=Uie(t,e,r),o=(0,Wi.default)(t,function(u){return UD(u,r)}),s=(0,Wi.default)(t,function(u){return FD(u,t,n,r)});return i.concat(a,o,s)}ye.validateGrammar=xie;function Lie(t,e){var r=new MD;t.accept(r);var n=r.allProductions,i=(0,Cie.default)(n,LD),a=(0,kie.default)(i,function(s){return s.length>1}),o=(0,Pa.default)((0,wie.default)(a),function(s){var u=(0,DD.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,p_.getProductionDslName)(u),f={message:l,type:xn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},h=qD(u);return h&&(f.parameter=h),f});return o}function LD(t){return"".concat((0,p_.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(qD(t))}ye.identifyProductionForDuplicates=LD;function qD(t){return t instanceof Dn.Terminal?t.terminalType.name:t instanceof Dn.NonTerminal?t.nonTerminalName:""}var MD=function(t){c_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(m_.GAstVisitor);ye.OccurrenceValidationCollector=MD;function FD(t,e,r,n){var i=[],a=(0,f_.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:xn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}ye.validateRuleDoesNotAlreadyExist=FD;function qie(t,e,r){var n=[],i;return(0,d_.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:xn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}ye.validateRuleIsOverridden=qie;function jD(t,e,r,n){n===void 0&&(n=[]);var i=[],a=Bl(e.definition);if((0,Ep.default)(a))return[];var o=t.name,s=(0,d_.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:xn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Pie.default)(a,n.concat([t])),l=(0,Wi.default)(u,function(c){var f=(0,Eie.default)(n);return f.push(c),jD(t,c,r,f)});return i.concat(l)}ye.validateNoLeftRecursion=jD;function Bl(t){var e=[];if((0,Ep.default)(t))return e;var r=(0,DD.default)(t);if(r instanceof Dn.NonTerminal)e.push(r.referencedRule);else if(r instanceof Dn.Alternative||r instanceof Dn.Option||r instanceof Dn.RepetitionMandatory||r instanceof Dn.RepetitionMandatoryWithSeparator||r instanceof Dn.RepetitionWithSeparator||r instanceof Dn.Repetition)e=e.concat(Bl(r.definition));else if(r instanceof Dn.Alternation)e=(0,xD.default)((0,Pa.default)(r.definition,function(o){return Bl(o.definition)}));else if(!(r instanceof Dn.Terminal))throw Error("non exhaustive match");var n=(0,p_.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Aie.default)(t);return e.concat(Bl(a))}else return e}ye.getFirstNoneTerminal=Bl;var h_=function(t){c_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(m_.GAstVisitor);function Mie(t,e){var r=new h_;t.accept(r);var n=r.alternations,i=(0,Wi.default)(n,function(a){var o=(0,$ie.default)(a.definition);return(0,Wi.default)(o,function(s,u){var l=(0,Nie.nextPossibleTokensAfter)([s],[],Iie.tokenStructuredMatcher,1);return(0,Ep.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:xn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}ye.validateEmptyOrAlternative=Mie;function Fie(t,e,r){var n=new h_;t.accept(n);var i=n.alternations;i=(0,bie.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Wi.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,Js.getLookaheadPathsForOr)(s,t,u,o),c=Gie(l,o,t,r),f=HD(l,o,t,r);return c.concat(f)});return a}ye.validateAmbiguousAlternationAlternatives=Fie;var GD=function(t){c_(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(m_.GAstVisitor);ye.RepetitionCollector=GD;function UD(t,e){var r=new h_;t.accept(r);var n=r.alternations,i=(0,Wi.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:xn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}ye.validateTooManyAlts=UD;function jie(t,e,r){var n=[];return(0,Vl.default)(t,function(i){var a=new GD;i.accept(a);var o=a.allProductions;(0,Vl.default)(o,function(s){var u=(0,Js.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,Js.getLookaheadPathsForOptionalProd)(c,i,u,l),h=f[0];if((0,Ep.default)((0,xD.default)(h))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:xn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}ye.validateSomeNonEmptyLookaheadPath=jie;function Gie(t,e,r,n){var i=[],a=(0,f_.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,Vl.default)(u,function(c){var f=[l];(0,Vl.default)(t,function(h,v){l!==v&&(0,Js.containsPath)(h,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,Js.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,Pa.default)(a,function(s){var u=(0,Pa.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:xn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function HD(t,e,r,n){var i=(0,f_.default)(t,function(o,s,u){var l=(0,Pa.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,Oie.default)((0,Wi.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,Sie.default)(i,function(h){return e.definition[h.idx].ignoreAmbiguities!==!0&&h.idx<u&&(0,Js.isStrictPrefixOfPath)(h.path,l)}),f=(0,Pa.default)(c,function(h){var v=[h.idx+1,u+1],y=e.idx===0?"":e.idx,A=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:h.path});return{message:A,type:xn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}ye.checkPrefixAlternativesAmbiguities=HD;function Uie(t,e,r){var n=[],i=(0,Pa.default)(e,function(a){return a.name});return(0,Vl.default)(t,function(a){var o=a.name;if((0,d_.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:xn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var VD=d(Ca=>{"use strict";var KD=Ca&&Ca.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ca,"__esModule",{value:!0});Ca.validateGrammar=Ca.resolveGrammar=void 0;var Hie=KD(Kt()),WD=KD(DT()),Kie=fD(),Wie=zl(),BD=Ys();function Bie(t){var e=(0,WD.default)(t,{errMsgProvider:BD.defaultGrammarResolverErrorProvider}),r={};return(0,Hie.default)(t.rules,function(n){r[n.name]=n}),(0,Kie.resolveGrammar)(r,e.errMsgProvider)}Ca.resolveGrammar=Bie;function Vie(t){return t=(0,WD.default)(t,{errMsgProvider:BD.defaultGrammarValidatorErrorProvider}),(0,Wie.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}Ca.validateGrammar=Vie});var Qs=d(lr=>{"use strict";var Yl=lr&&lr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),zie=lr&&lr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(lr,"__esModule",{value:!0});lr.EarlyExitException=lr.NotAllInputParsedException=lr.NoViableAltException=lr.MismatchedTokenException=lr.isRecognitionException=void 0;var Yie=zie(qi()),zD="MismatchedTokenException",YD="NoViableAltException",XD="EarlyExitException",JD="NotAllInputParsedException",QD=[zD,YD,XD,JD];Object.freeze(QD);function Xie(t){return(0,Yie.default)(QD,t.name)}lr.isRecognitionException=Xie;var Np=function(t){Yl(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),Jie=function(t){Yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=zD,a}return e}(Np);lr.MismatchedTokenException=Jie;var Qie=function(t){Yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=YD,a}return e}(Np);lr.NoViableAltException=Qie;var Zie=function(t){Yl(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=JD,i}return e}(Np);lr.NotAllInputParsedException=Zie;var eae=function(t){Yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=XD,a}return e}(Np);lr.EarlyExitException=eae});var g_=d($t=>{"use strict";var tae=$t&&$t.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ka=$t&&$t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($t,"__esModule",{value:!0});$t.attemptInRepetitionRecovery=$t.Recoverable=$t.InRuleRecoveryException=$t.IN_RULE_RECOVERY_EXCEPTION=$t.EOF_FOLLOW_KEY=void 0;var Xl=ho(),rae=ka(Lr()),ZD=ka(bp()),nae=ka(On()),y_=ka(Ht()),ex=ka(cp()),iae=ka(Mr()),aae=ka(qi()),oae=ka(xi()),sae=Qs(),uae=OT(),lae=Er();$t.EOF_FOLLOW_KEY={};$t.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var tx=function(t){tae(e,t);function e(r){var n=t.call(this,r)||this;return n.name=$t.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);$t.InRuleRecoveryException=tx;var cae=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,iae.default)(e,"recoveryEnabled")?e.recoveryEnabled:lae.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=rx)},t.prototype.getTokenToInsert=function(e){var r=(0,Xl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),h=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),A=new sae.MismatchedTokenException(y,c,a.LA(0));A.resyncedTokens=(0,ZD.default)(u),a.SAVE_ERROR(A)};!l;)if(this.tokenMatcher(f,i)){h();return}else if(n.call(this)){h(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new tx("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,rae.default)(r))return!1;var i=this.LA(1),a=(0,ex.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,aae.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,ex.default)(e,function(a){var o=(0,Xl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return $t.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,y_.default)(r,function(i,a){return a===0?$t.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,y_.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,nae.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===$t.EOF_FOLLOW_KEY)return[Xl.EOF];var r=e.ruleName+e.idxInCallingRule+uae.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,Xl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,ZD.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,oae.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,y_.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();$t.Recoverable=cae;function rx(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var h=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&h===void 0&&(h=Xl.EOF,v=1),!(h===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(h,v,o)&&this.tryInRepetitionRecovery(t,e,r,h)}$t.attemptInRepetitionRecovery=rx});var $p=d(ke=>{"use strict";Object.defineProperty(ke,"__esModule",{value:!0});ke.getKeyForAutomaticLookahead=ke.AT_LEAST_ONE_SEP_IDX=ke.MANY_SEP_IDX=ke.AT_LEAST_ONE_IDX=ke.MANY_IDX=ke.OPTION_IDX=ke.OR_IDX=ke.BITS_FOR_ALT_IDX=ke.BITS_FOR_RULE_IDX=ke.BITS_FOR_OCCURRENCE_IDX=ke.BITS_FOR_METHOD_TYPE=void 0;ke.BITS_FOR_METHOD_TYPE=4;ke.BITS_FOR_OCCURRENCE_IDX=8;ke.BITS_FOR_RULE_IDX=12;ke.BITS_FOR_ALT_IDX=8;ke.OR_IDX=1<<ke.BITS_FOR_OCCURRENCE_IDX;ke.OPTION_IDX=2<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_IDX=3<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_IDX=4<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_SEP_IDX=5<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_SEP_IDX=6<<ke.BITS_FOR_OCCURRENCE_IDX;function fae(t,e,r){return r|e|t}ke.getKeyForAutomaticLookahead=fae;var gRe=32-ke.BITS_FOR_ALT_IDX});var T_=d(wa=>{"use strict";var Op=wa&&wa.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},nx=wa&&wa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wa,"__esModule",{value:!0});wa.LLkLookaheadStrategy=void 0;var v_=nx(Sp()),dae=nx(Lr()),Ip=Ys(),pae=Er(),Dp=zl(),Jl=Xs(),mae=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:pae.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,dae.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=Op(Op(Op(Op([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,v_.default)(e,function(r){return(0,Dp.validateNoLeftRecursion)(r,r,Ip.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,v_.default)(e,function(r){return(0,Dp.validateEmptyOrAlternative)(r,Ip.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,v_.default)(e,function(n){return(0,Dp.validateAmbiguousAlternationAlternatives)(n,r,Ip.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,Dp.validateSomeNonEmptyLookaheadPath)(e,r,Ip.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,Jl.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Jl.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,Jl.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,Jl.getProdType)(e.prodType),Jl.buildSingleAlternativeLookaheadFunction)},t}();wa.LLkLookaheadStrategy=mae});var sx=d(si=>{"use strict";var hae=si&&si.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ax=si&&si.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(si,"__esModule",{value:!0});si.collectMethods=si.LooksAhead=void 0;var Ao=ax(Kt()),__=ax(Mr()),ix=Er(),Bi=$p(),yae=_t(),Zs=_t(),gae=T_(),vae=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,__.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:ix.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,__.default)(e,"maxLookahead")?e.maxLookahead:ix.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,__.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new gae.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Ao.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=ox(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Ao.default)(a,function(f){var h=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,Zs.getProductionDslName)(f)).concat(h),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Bi.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Bi.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,Ao.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Bi.MANY_IDX,"Repetition",f.maxLookahead,(0,Zs.getProductionDslName)(f))}),(0,Ao.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Bi.OPTION_IDX,"Option",f.maxLookahead,(0,Zs.getProductionDslName)(f))}),(0,Ao.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Bi.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,Zs.getProductionDslName)(f))}),(0,Ao.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Bi.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,Zs.getProductionDslName)(f))}),(0,Ao.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Bi.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,Zs.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Bi.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Bi.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();si.LooksAhead=vae;var Tae=function(t){hae(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(yae.GAstVisitor),xp=new Tae;function ox(t){xp.reset(),t.accept(xp);var e=xp.dslMethods;return xp.reset(),e}si.collectMethods=ox});var ux=d(ui=>{"use strict";Object.defineProperty(ui,"__esModule",{value:!0});ui.addNoneTerminalToCst=ui.addTerminalToCst=ui.setNodeLocationFull=ui.setNodeLocationOnlyOffset=void 0;function _ae(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}ui.setNodeLocationOnlyOffset=_ae;function Rae(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}ui.setNodeLocationFull=Rae;function Aae(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}ui.addTerminalToCst=Aae;function Sae(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}ui.addNoneTerminalToCst=Sae});var lx=d(Lp=>{"use strict";Object.defineProperty(Lp,"__esModule",{value:!0});Lp.defineNameProp=void 0;var bae="name";function Pae(t,e){Object.defineProperty(t,bae,{enumerable:!1,configurable:!0,writable:!1,value:e})}Lp.defineNameProp=Pae});var yx=d(Zt=>{"use strict";var Vi=Zt&&Zt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zt,"__esModule",{value:!0});Zt.validateMissingCstMethods=Zt.validateVisitor=Zt.CstVisitorDefinitionError=Zt.createBaseVisitorConstructorWithDefaults=Zt.createBaseSemanticVisitorConstructor=Zt.defaultVisit=void 0;var Cae=Vi(Lr()),kae=Vi(Fl()),wae=Vi(Le()),cx=Vi(Ht()),Eae=Vi(Kt()),Nae=Vi(jl()),$ae=Vi(qr()),Oae=Vi(Ss()),Iae=Vi(co()),fx=lx();function dx(t,e){for(var r=(0,$ae.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}Zt.defaultVisit=dx;function Dae(t,e){var r=function(){};(0,fx.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,wae.default)(i)&&(i=i[0]),!(0,Iae.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=mx(this,e);if(!(0,Cae.default)(i)){var a=(0,cx.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Zt.createBaseSemanticVisitorConstructor=Dae;function xae(t,e,r){var n=function(){};(0,fx.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,Eae.default)(e,function(a){i[a]=dx}),n.prototype=i,n.prototype.constructor=n,n}Zt.createBaseVisitorConstructorWithDefaults=xae;var px;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(px=Zt.CstVisitorDefinitionError||(Zt.CstVisitorDefinitionError={}));function mx(t,e){var r=hx(t,e);return r}Zt.validateVisitor=mx;function hx(t,e){var r=(0,Nae.default)(e,function(i){return(0,Oae.default)(t[i])===!1}),n=(0,cx.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:px.MISSING_METHOD,methodName:i}});return(0,kae.default)(n)}Zt.validateMissingCstMethods=hx});var _x=d(tu=>{"use strict";var qp=tu&&tu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(tu,"__esModule",{value:!0});tu.TreeBuilder=void 0;var eu=ux(),vr=qp(ip()),Lae=qp(Mr()),gx=qp(qr()),vx=qp(co()),Tx=yx(),qae=Er(),Mae=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Lae.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:qae.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=vr.default,this.cstFinallyStateUpdate=vr.default,this.cstPostTerminal=vr.default,this.cstPostNonTerminal=vr.default,this.cstPostRule=vr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=eu.setNodeLocationFull,this.setNodeLocationFromNode=eu.setNodeLocationFull,this.cstPostRule=vr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=vr.default,this.setNodeLocationFromNode=vr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=eu.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=eu.setNodeLocationOnlyOffset,this.cstPostRule=vr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=vr.default,this.setNodeLocationFromNode=vr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=vr.default,this.setNodeLocationFromNode=vr.default,this.cstPostRule=vr.default,this.setInitialNodeLocation=vr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,eu.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,eu.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,vx.default)(this.baseCstVisitorConstructor)){var e=(0,Tx.createBaseSemanticVisitorConstructor)(this.className,(0,gx.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,vx.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,Tx.createBaseVisitorConstructorWithDefaults)(this.className,(0,gx.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();tu.TreeBuilder=Mae});var Ax=d(Mp=>{"use strict";Object.defineProperty(Mp,"__esModule",{value:!0});Mp.LexerAdapter=void 0;var Rx=Er(),Fae=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Rx.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Rx.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Mp.LexerAdapter=Fae});var bx=d(ru=>{"use strict";var Sx=ru&&ru.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ru,"__esModule",{value:!0});ru.RecognizerApi=void 0;var jae=Sx(Qn()),Gae=Sx(qi()),Uae=Qs(),R_=Er(),Hae=Ys(),Kae=zl(),Wae=_t(),Bae=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=R_.DEFAULT_RULE_CONFIG),(0,Gae.default)(this.definedRulesNames,e)){var i=Hae.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:R_.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=R_.DEFAULT_RULE_CONFIG);var i=(0,Kae.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,Uae.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Wae.serializeGrammar)((0,jae.default)(this.gastProductionsCache))},t}();ru.RecognizerApi=Bae});var Ox=d(iu=>{"use strict";var li=iu&&iu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(iu,"__esModule",{value:!0});iu.RecognizerEngine=void 0;var Px=li(Lr()),A_=li(Le()),S_=li(On()),Cx=li(Ml()),Vae=li(ap()),zae=li(En()),Ql=li(Mr()),Zl=li(Qn()),kx=li(Mi()),wx=li(xi()),jr=$p(),Fp=Qs(),Ex=Xs(),nu=Wl(),Nx=Er(),Yae=g_(),$x=ho(),ec=mo(),Xae=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ec.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Ql.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,A_.default)(e)){if((0,Px.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,A_.default)(e))this.tokensMap=(0,kx.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Ql.default)(e,"modes")&&(0,Cx.default)((0,S_.default)((0,Zl.default)(e.modes)),ec.isTokenType)){var n=(0,S_.default)((0,Zl.default)(e.modes)),i=(0,Vae.default)(n);this.tokensMap=(0,kx.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,zae.default)(e))this.tokensMap=(0,wx.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=$x.EOF;var a=(0,Ql.default)(e,"modes")?(0,S_.default)((0,Zl.default)(e.modes)):(0,Zl.default)(e),o=(0,Cx.default)(a,function(s){return(0,Px.default)(s.categoryMatches)});this.tokenMatcher=o?ec.tokenStructuredMatcherNoCategories:ec.tokenStructuredMatcher,(0,ec.augmentTokenTypes)((0,Zl.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Ql.default)(n,"resyncEnabled")?n.resyncEnabled:Nx.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Ql.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:Nx.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<jr.BITS_FOR_METHOD_TYPE+jr.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var h=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(h),h}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(h){return this.invokeRuleCatch(h,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Fp.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,Ex.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,jr.AT_LEAST_ONE_IDX,e,nu.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,nu.NextTerminalAfterAtLeastOneSepWalker],u,jr.AT_LEAST_ONE_SEP_IDX,e,nu.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,Ex.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,jr.MANY_IDX,e,nu.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,nu.NextTerminalAfterManySepWalker],u,jr.MANY_SEP_IDX,e,nu.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,jr.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(jr.OR_IDX,r),i=(0,A_.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Fp.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Fp.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Fp.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===Yae.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,wx.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),$x.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();iu.RecognizerEngine=Xae});var Lx=d(au=>{"use strict";var xx=au&&au.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(au,"__esModule",{value:!0});au.ErrorHandler=void 0;var b_=Qs(),Jae=xx(Mr()),Ix=xx(xi()),Dx=Xs(),Qae=Er(),Zae=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,Jae.default)(e,"errorMessageProvider")?e.errorMessageProvider:Qae.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,b_.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,Ix.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,Ix.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,Dx.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new b_.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,Dx.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new b_.NoViableAltException(l,this.LA(1),u))},t}();au.ErrorHandler=Zae});var Fx=d(ou=>{"use strict";var Mx=ou&&ou.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ou,"__esModule",{value:!0});ou.ContentAssist=void 0;var qx=Wl(),eoe=Mx(Ks()),toe=Mx(co()),roe=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,toe.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,qx.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,eoe.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new qx.NextAfterTokenWalker(i,e).startWalking();return a},t}();ou.ContentAssist=roe});var zx=d(su=>{"use strict";var uu=su&&su.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(su,"__esModule",{value:!0});su.GastRecorder=void 0;var jp=uu(_p()),noe=uu(Le()),ioe=uu(Zd()),aoe=uu(Kt()),Hx=uu(Ss()),rc=uu(Mr()),ci=_t(),ooe=Gl(),Kx=mo(),Wx=ho(),soe=Er(),uoe=$p(),Up={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Up);var jx=!0,Gx=Math.pow(2,uoe.BITS_FOR_OCCURRENCE_IDX)-1,Bx=(0,Wx.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:ooe.Lexer.NA});(0,Kx.augmentTokenTypes)([Bx]);var Vx=(0,Wx.createTokenInstance)(Bx,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(Vx);var loe={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},coe=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return soe.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new ci.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return tc.call(this,ci.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){tc.call(this,ci.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){tc.call(this,ci.RepetitionMandatoryWithSeparator,r,e,jx)},t.prototype.manyInternalRecord=function(e,r){tc.call(this,ci.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){tc.call(this,ci.RepetitionWithSeparator,r,e,jx)},t.prototype.orInternalRecord=function(e,r){return foe.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Gp(r),!e||(0,rc.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(Ux(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,jp.default)(this.recordingProdStack),o=e.ruleName,s=new ci.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?loe:Up},t.prototype.consumeInternalRecord=function(e,r,n){if(Gp(r),!(0,Kx.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(Ux(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,jp.default)(this.recordingProdStack),o=new ci.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),Vx},t}();su.GastRecorder=coe;function tc(t,e,r,n){n===void 0&&(n=!1),Gp(r);var i=(0,jp.default)(this.recordingProdStack),a=(0,Hx.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,rc.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Up}function foe(t,e){var r=this;Gp(e);var n=(0,jp.default)(this.recordingProdStack),i=(0,noe.default)(t)===!1,a=i===!1?t:t.DEF,o=new ci.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,rc.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,ioe.default)(a,function(u){return(0,Hx.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,aoe.default)(a,function(u){var l=new ci.Alternative({definition:[]});o.definition.push(l),(0,rc.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,rc.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Up}function Ux(t){return t===0?"":"".concat(t)}function Gp(t){if(t<0||t>Gx){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(Gx+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var Yx=d(lu=>{"use strict";var doe=lu&&lu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(lu,"__esModule",{value:!0});lu.PerformanceTracer=void 0;var poe=doe(Mr()),moe=js(),hoe=Er(),yoe=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,poe.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=hoe.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,moe.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();lu.PerformanceTracer=yoe});var Xx=d(Hp=>{"use strict";Object.defineProperty(Hp,"__esModule",{value:!0});Hp.applyMixins=void 0;function goe(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Hp.applyMixins=goe});var Er=d(Ue=>{"use strict";var eL=Ue&&Ue.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),cu=Ue&&Ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ue,"__esModule",{value:!0});Ue.EmbeddedActionsParser=Ue.CstParser=Ue.Parser=Ue.EMPTY_ALT=Ue.ParserDefinitionErrorType=Ue.DEFAULT_RULE_CONFIG=Ue.DEFAULT_PARSER_CONFIG=Ue.END_OF_FILE=void 0;var P_=cu(Lr()),voe=cu(Ht()),Toe=cu(Kt()),Ea=cu(Qn()),Jx=cu(Mr()),tL=cu(xi()),_oe=js(),Roe=DI(),Qx=ho(),rL=Ys(),Zx=VD(),Aoe=g_(),Soe=sx(),boe=_x(),Poe=Ax(),Coe=bx(),koe=Ox(),woe=Lx(),Eoe=Fx(),Noe=zx(),$oe=Yx(),Ooe=Xx(),Ioe=zl();Ue.END_OF_FILE=(0,Qx.createTokenInstance)(Qx.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Ue.END_OF_FILE);Ue.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:rL.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Ue.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var Doe;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Doe=Ue.ParserDefinitionErrorType||(Ue.ParserDefinitionErrorType={}));function xoe(t){return t===void 0&&(t=void 0),function(){return t}}Ue.EMPTY_ALT=xoe;var Kp=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,Jx.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,Jx.default)(r,"skipValidations")?r.skipValidations:Ue.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,_oe.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Toe.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,Zx.resolveGrammar)({rules:(0,Ea.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,P_.default)(i)&&e.skipValidations===!1){var a=(0,Zx.validateGrammar)({rules:(0,Ea.default)(e.gastProductionsCache),tokenTypes:(0,Ea.default)(e.tokensMap),errMsgProvider:rL.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,Ioe.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,Ea.default)(e.gastProductionsCache),tokenTypes:(0,Ea.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,P_.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Roe.computeAllProdsFollows)((0,Ea.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,Ea.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,Ea.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,P_.default)(e.definitionErrors))throw r=(0,voe.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Ue.Parser=Kp;(0,Ooe.applyMixins)(Kp,[Aoe.Recoverable,Soe.LooksAhead,boe.TreeBuilder,Poe.LexerAdapter,koe.RecognizerEngine,Coe.RecognizerApi,woe.ErrorHandler,Eoe.ContentAssist,Noe.GastRecorder,$oe.PerformanceTracer]);var Loe=function(t){eL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,tL.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Kp);Ue.CstParser=Loe;var qoe=function(t){eL(e,t);function e(r,n){n===void 0&&(n=Ue.DEFAULT_PARSER_CONFIG);var i=(0,tL.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Kp);Ue.EmbeddedActionsParser=qoe});var iL=d(Na=>{"use strict";var Moe=Na&&Na.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),fu=Na&&Na.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Na,"__esModule",{value:!0});Na.buildModel=void 0;var nL=_t(),nc=fu(Ht()),Foe=fu(On()),joe=fu(Qn()),Goe=fu(Zd()),Uoe=fu(r_()),Hoe=fu(Ll());function Koe(t){var e=new Woe,r=(0,joe.default)(t);return(0,nc.default)(r,function(n){return e.visitRule(n)})}Na.buildModel=Koe;var Woe=function(t){Moe(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,Uoe.default)(n,function(o){return o.propertyName}),a=(0,nc.default)(i,function(o,s){var u=!(0,Goe.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,nc.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Wp(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Wp(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Wp(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Wp(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,nc.default)(this.visitEach(r),function(i){return(0,Hoe.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,Foe.default)((0,nc.default)(r,function(i){return n.visit(i)}))},e}(nL.GAstVisitor);function Wp(t){return t instanceof nL.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var oL=d((xRe,aL)=>{var Boe=Vd();function Voe(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:Boe(t,e,r)}aL.exports=Voe});var C_=d((LRe,sL)=>{var zoe="\\ud800-\\udfff",Yoe="\\u0300-\\u036f",Xoe="\\ufe20-\\ufe2f",Joe="\\u20d0-\\u20ff",Qoe=Yoe+Xoe+Joe,Zoe="\\ufe0e\\ufe0f",ese="\\u200d",tse=RegExp("["+ese+zoe+Qoe+Zoe+"]");function rse(t){return tse.test(t)}sL.exports=rse});var lL=d((qRe,uL)=>{function nse(t){return t.split("")}uL.exports=nse});var gL=d((MRe,yL)=>{var cL="\\ud800-\\udfff",ise="\\u0300-\\u036f",ase="\\ufe20-\\ufe2f",ose="\\u20d0-\\u20ff",sse=ise+ase+ose,use="\\ufe0e\\ufe0f",lse="["+cL+"]",k_="["+sse+"]",w_="\\ud83c[\\udffb-\\udfff]",cse="(?:"+k_+"|"+w_+")",fL="[^"+cL+"]",dL="(?:\\ud83c[\\udde6-\\uddff]){2}",pL="[\\ud800-\\udbff][\\udc00-\\udfff]",fse="\\u200d",mL=cse+"?",hL="["+use+"]?",dse="(?:"+fse+"(?:"+[fL,dL,pL].join("|")+")"+hL+mL+")*",pse=hL+mL+dse,mse="(?:"+[fL+k_+"?",k_,dL,pL,lse].join("|")+")",hse=RegExp(w_+"(?="+w_+")|"+mse+pse,"g");function yse(t){return t.match(hse)||[]}yL.exports=yse});var TL=d((FRe,vL)=>{var gse=lL(),vse=C_(),Tse=gL();function _se(t){return vse(t)?Tse(t):gse(t)}vL.exports=_se});var RL=d((jRe,_L)=>{var Rse=oL(),Ase=C_(),Sse=TL(),bse=dT();function Pse(t){return function(e){e=bse(e);var r=Ase(e)?Sse(e):void 0,n=r?r[0]:e.charAt(0),i=r?Rse(r,1).join(""):e.slice(1);return n[t]()+i}}_L.exports=Pse});var SL=d((GRe,AL)=>{var Cse=RL(),kse=Cse("toUpperCase");AL.exports=kse});var kL=d(du=>{"use strict";var pu=du&&du.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(du,"__esModule",{value:!0});du.genDts=void 0;var wse=pu(On()),Ese=pu(Le()),Bp=pu(Ht()),Nse=pu(Mi()),$se=pu(ap()),PL=pu(SL());function Ose(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,wse.default)((0,Bp.default)(t,function(n){return Ise(n)}))),e.includeVisitorInterface&&(r=r.concat(qse(e.visitorInterfaceName,t))),r.join(`

`)+`
`}du.genDts=Ose;function Ise(t){var e=Dse(t),r=xse(t);return[e,r]}function Dse(t){var e=CL(t.name),r=E_(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function xse(t){var e=E_(t.name);return"export type ".concat(e,` = {
  `).concat((0,Bp.default)(t.properties,function(r){return Lse(r)}).join(`
  `),`
};`)}function Lse(t){var e=Fse(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function qse(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Bp.default)(e,function(r){return Mse(r)}).join(`
  `),`
}`)}function Mse(t){var e=E_(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function Fse(t){if((0,Ese.default)(t)){var e=(0,$se.default)((0,Bp.default)(t,function(n){return bL(n)})),r=(0,Nse.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return bL(t)}function bL(t){return t.kind==="token"?"IToken":CL(t.name)}function CL(t){return(0,PL.default)(t)+"CstNode"}function E_(t){return(0,PL.default)(t)+"CstChildren"}});var wL=d(mu=>{"use strict";var Vp=mu&&mu.__assign||function(){return Vp=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Vp.apply(this,arguments)};Object.defineProperty(mu,"__esModule",{value:!0});mu.generateCstDts=void 0;var jse=iL(),Gse=kL(),Use={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function Hse(t,e){var r=Vp(Vp({},Use),e),n=(0,jse.buildModel)(t);return(0,Gse.genDts)(n,r)}mu.generateCstDts=Hse});var NL=d(zp=>{"use strict";Object.defineProperty(zp,"__esModule",{value:!0});zp.createSyntaxDiagramsCode=void 0;var EL=jv();function Kse(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(EL.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(EL.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`;return s+u+l+c+f+h}zp.createSyntaxDiagramsCode=Kse});var So=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var Wse=jv();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return Wse.VERSION}});var Yp=Er();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return Yp.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return Yp.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return Yp.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return Yp.EMPTY_ALT}});var $L=Gl();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return $L.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return $L.LexerDefinitionErrorType}});var hu=ho();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return hu.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return hu.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return hu.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return hu.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return hu.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return hu.tokenName}});var Bse=Xs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return Bse.getLookaheadPaths}});var Vse=T_();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Vse.LLkLookaheadStrategy}});var zse=Ys();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return zse.defaultParserErrorProvider}});var ic=Qs();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return ic.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return ic.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return ic.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return ic.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return ic.NoViableAltException}});var Yse=VT();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return Yse.defaultLexerErrorProvider}});var fi=_t();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return fi.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return fi.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return fi.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return fi.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return fi.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return fi.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return fi.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return fi.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return fi.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return fi.Terminal}});var N_=_t();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return N_.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return N_.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return N_.GAstVisitor}});var Xse=wL();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return Xse.generateCstDts}});function Jse(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=Jse;var Qse=NL();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Qse.createSyntaxDiagramsCode}});var Zse=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=Zse});var qL=d(X=>{"use strict";var OL=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var IL=OL(Ht()),eue=OL(jl()),Nr=So();function oc(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=oc;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var yu=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=yu;var Xp=class extends yu{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=Xp;var Jp=class extends yu{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=Jp;var ac=class extends yu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=ac;function tue(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};rue(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=bo(e,i,i);a!==void 0&&pue(e,i,a)}return e}X.createATN=tue;function rue(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=Bt(t,i,void 0,{type:X.ATN_RULE_START}),o=Bt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function DL(t,e,r){return r instanceof Nr.Terminal?$_(t,e,r.terminalType,r):r instanceof Nr.NonTerminal?due(t,e,r):r instanceof Nr.Alternation?sue(t,e,r):r instanceof Nr.Option?uue(t,e,r):r instanceof Nr.Repetition?nue(t,e,r):r instanceof Nr.RepetitionWithSeparator?iue(t,e,r):r instanceof Nr.RepetitionMandatory?aue(t,e,r):r instanceof Nr.RepetitionMandatoryWithSeparator?oue(t,e,r):bo(t,e,r)}function nue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_STAR_BLOCK_START});$a(t,n);let i=gu(t,e,n,r,bo(t,e,r));return LL(t,e,r,i)}function iue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_STAR_BLOCK_START});$a(t,n);let i=gu(t,e,n,r,bo(t,e,r)),a=$_(t,e,r.separator,r);return LL(t,e,r,i,a)}function aue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});$a(t,n);let i=gu(t,e,n,r,bo(t,e,r));return xL(t,e,r,i)}function oue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});$a(t,n);let i=gu(t,e,n,r,bo(t,e,r)),a=$_(t,e,r.separator,r);return xL(t,e,r,i,a)}function sue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_BASIC});$a(t,n);let i=(0,IL.default)(r.definition,o=>DL(t,e,o));return gu(t,e,n,r,...i)}function uue(t,e,r){let n=Bt(t,e,r,{type:X.ATN_BASIC});$a(t,n);let i=gu(t,e,n,r,bo(t,e,r));return lue(t,e,r,i)}function bo(t,e,r){let n=(0,eue.default)((0,IL.default)(r.definition,i=>DL(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:fue(t,n)}function xL(t,e,r,n,i){let a=n.left,o=n.right,s=Bt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});$a(t,s);let u=Bt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[oc(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,Ot(o,s),i===void 0?(Ot(s,a),Ot(s,u)):(Ot(s,u),Ot(s,i.left),Ot(i.right,a)),{left:a,right:u}}function LL(t,e,r,n,i){let a=n.left,o=n.right,s=Bt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});$a(t,s);let u=Bt(t,e,r,{type:X.ATN_LOOP_END}),l=Bt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,Ot(s,a),Ot(s,u),Ot(o,l),i!==void 0?(Ot(l,u),Ot(l,i.left),Ot(i.right,a)):Ot(l,s),t.decisionMap[oc(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function lue(t,e,r,n){let i=n.left,a=n.right;return Ot(i,a),t.decisionMap[oc(e,"Option",r.idx)]=i,n}function $a(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function gu(t,e,r,n,...i){let a=Bt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(Ot(r,s.left),Ot(s.right,a)):Ot(r,a);let o={left:r,right:a};return t.decisionMap[oc(e,cue(n),n.idx)]=r,o}function cue(t){if(t instanceof Nr.Alternation)return"Alternation";if(t instanceof Nr.Option)return"Option";if(t instanceof Nr.Repetition)return"Repetition";if(t instanceof Nr.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Nr.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Nr.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function fue(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof ac,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,mue(t,o.right)):Ot(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function $_(t,e,r,n){let i=Bt(t,e,n,{type:X.ATN_BASIC}),a=Bt(t,e,n,{type:X.ATN_BASIC});return O_(i,new Xp(a,r)),{left:i,right:a}}function due(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=Bt(t,e,r,{type:X.ATN_BASIC}),o=Bt(t,e,r,{type:X.ATN_BASIC}),s=new ac(i,n,o);return O_(a,s),{left:a,right:o}}function pue(t,e,r){let n=t.ruleToStartState.get(e);Ot(n,r.left);let i=t.ruleToStopState.get(e);return Ot(r.right,i),{left:n,right:i}}function Ot(t,e){let r=new Jp(e);O_(t,r)}function Bt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function O_(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function mue(t,e){t.states.splice(t.states.indexOf(e),1)}});var FL=d(di=>{"use strict";var hue=di&&di.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(di,"__esModule",{value:!0});di.getATNConfigKey=di.ATNConfigSet=di.DFA_ERROR=void 0;var yue=hue(Ht());di.DFA_ERROR={};var I_=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=ML(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,yue.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};di.ATNConfigSet=I_;function ML(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}di.getATNConfigKey=ML});var GL=d((zRe,jL)=>{var gue=xs();function vue(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!gue(o):r(o,s)))var s=o,u=a}return u}jL.exports=vue});var HL=d((YRe,UL)=>{function Tue(t,e){return t<e}UL.exports=Tue});var WL=d((XRe,KL)=>{var _ue=GL(),Rue=HL(),Aue=lo();function Sue(t){return t&&t.length?_ue(t,Aue,Rue):void 0}KL.exports=Sue});var VL=d((JRe,BL)=>{var bue=rn(),Pue=wT();function Cue(t,e){return t&&t.length?Pue(t,bue(e,2)):[]}BL.exports=Cue});var eq=d(vu=>{"use strict";var Ia=vu&&vu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(vu,"__esModule",{value:!0});vu.LLStarLookaheadStrategy=void 0;var Gr=So(),Ln=qL(),Oa=FL(),kue=Ia(WL()),wue=Ia(Sp()),Eue=Ia(VL()),sc=Ia(Ht()),Nue=Ia(On()),D_=Ia(Kt()),$ue=Ia(Lr()),zL=Ia(Mi());function Oue(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var Qp=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},YL=new Qp,L_=class extends Gr.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,Ln.createATN)(e.rules),this.dfas=Iue(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Ln.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,sc.default)((0,Gr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),h=>(0,sc.default)(h,v=>v[0]));if(XL(f,!1)&&!a){let h=(0,zL.default)(f,(v,y,A)=>((0,D_.default)(y,w=>{w&&(v[w.tokenTypeIdx]=A,(0,D_.default)(w.categoryMatches,C=>{v[C]=A}))}),v),{});return i?function(v){var y;let A=this.LA(1),w=h[A.tokenTypeIdx];if(v!==void 0&&w!==void 0){let C=(y=v[w])===null||y===void 0?void 0:y.GATE;if(C!==void 0&&C.call(this)===!1)return}return w}:function(){let v=this.LA(1);return h[v.tokenTypeIdx]}}else return i?function(h){let v=new Qp,y=h===void 0?0:h.length;for(let w=0;w<y;w++){let C=h?.[w].GATE;v.set(w,C===void 0||C.call(this))}let A=x_.call(this,o,c,v,s);return typeof A=="number"?A:void 0}:function(){let h=x_.call(this,o,c,YL,s);return typeof h=="number"?h:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Ln.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,sc.default)((0,Gr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),h=>(0,sc.default)(h,v=>v[0]));if(XL(f)&&f[0][0]&&!a){let h=f[0],v=(0,Nue.default)(h);if(v.length===1&&(0,$ue.default)(v[0].categoryMatches)){let A=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let y=(0,zL.default)(v,(A,w)=>(w!==void 0&&(A[w.tokenTypeIdx]=!0,(0,D_.default)(w.categoryMatches,C=>{A[C]=!0})),A),{});return function(){let A=this.LA(1);return y[A.tokenTypeIdx]===!0}}}return function(){let h=x_.call(this,o,c,YL,s);return typeof h=="object"?!1:h===0}}};vu.LLStarLookaheadStrategy=L_;function XL(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function Iue(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Oue(t.decisionStates[n],n);return r}function x_(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=Kue(i.atnStartState);a=ZL(i,QL(s)),i.start=a}return Due.apply(this,[i,a,r,n])}function Due(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=jue(i,s);if(u===void 0&&(u=xue.apply(this,[t,i,s,a,r,n])),u===Oa.DFA_ERROR)return Fue(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function xue(t,e,r,n,i,a){let o=Gue(e.configs,r,i);if(o.size===0)return JL(t,e,r,Oa.DFA_ERROR),Oa.DFA_ERROR;let s=QL(o),u=Hue(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(zue(o)){let l=(0,kue.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,Lue.apply(this,[t,n,o.alts,a])}return s=JL(t,e,r,s),s}function Lue(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=que({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function que(t){let e=(0,sc.default)(t.prefixPath,i=>(0,Gr.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${Mue(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function Mue(t){if(t instanceof Gr.NonTerminal)return"SUBRULE";if(t instanceof Gr.Option)return"OPTION";if(t instanceof Gr.Alternation)return"OR";if(t instanceof Gr.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof Gr.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof Gr.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof Gr.Repetition)return"MANY";if(t instanceof Gr.Terminal)return"CONSUME";throw Error("non exhaustive match")}function Fue(t,e,r){let n=(0,wue.default)(e.configs.elements,a=>a.state.transitions),i=(0,Eue.default)(n.filter(a=>a instanceof Ln.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function jue(t,e){return t.edges[e.tokenTypeIdx]}function Gue(t,e,r){let n=new Oa.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===Ln.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=Uue(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new Oa.ATNConfigSet;for(let o of n.elements)Zp(o,a)}if(i.length>0&&!Bue(a))for(let o of i)a.add(o);return a}function Uue(t,e){if(t instanceof Ln.AtomTransition&&(0,Gr.tokenMatcher)(e,t.tokenType))return t.target}function Hue(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function QL(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function JL(t,e,r,n){return n=ZL(t,n),e.edges[r.tokenTypeIdx]=n,n}function ZL(t,e){if(e===Oa.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function Kue(t){let e=new Oa.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};Zp(a,e)}return e}function Zp(t,e){let r=t.state;if(r.type===Ln.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};Zp(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Wue(t,a);o!==void 0&&Zp(o,e)}}function Wue(t,e){if(e instanceof Ln.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Ln.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Bue(t){for(let e of t.elements)if(e.state.type===Ln.ATN_RULE_STOP)return!0;return!1}function Vue(t){for(let e of t.elements)if(e.state.type!==Ln.ATN_RULE_STOP)return!1;return!0}function zue(t){if(Vue(t))return!0;let e=Yue(t.elements);return Xue(e)&&!Jue(e)}function Yue(t){let e=new Map;for(let r of t){let n=(0,Oa.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function Xue(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function Jue(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var tq=d(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.LLStarLookaheadStrategy=void 0;var Que=eq();Object.defineProperty(em,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Que.LLStarLookaheadStrategy}})});var M_=d(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.RootCstNodeImpl=sn.CompositeCstNodeImpl=sn.LeafCstNodeImpl=sn.AbstractCstNode=sn.CstNodeBuilder=void 0;var rq=Uo(),Zue=nr(),nq=qe(),q_=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new tm(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new cc;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new lc(e.startOffset,e.image.length,(0,nq.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new lc(r.startOffset,r.image.length,(0,nq.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,Zue.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};sn.CstNodeBuilder=q_;var uc=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};sn.AbstractCstNode=uc;var lc=class extends uc{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};sn.LeafCstNodeImpl=lc;var cc=class extends uc{constructor(){super(...arguments),this.children=new fc(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:rq.Position.create(0,0),end:rq.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};sn.CompositeCstNodeImpl=cc;var fc=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,fc.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},tm=class extends cc{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};sn.RootCstNodeImpl=tm});var am=d(Tr=>{"use strict";Object.defineProperty(Tr,"__esModule",{value:!0});Tr.LangiumCompletionParser=Tr.LangiumParserErrorMessageProvider=Tr.LangiumParser=Tr.AbstractLangiumParser=Tr.DatatypeSymbol=void 0;var nm=So(),ele=tq(),rm=Ne(),iq=Gt(),aq=Se(),tle=M_();Tr.DatatypeSymbol=Symbol("Datatype");function F_(t){return t.$type===Tr.DatatypeSymbol}var oq="\u200B",sq=t=>t.endsWith(oq)?t:t+oq,dc=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new U_(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};Tr.AbstractLangiumParser=dc;var j_=class extends dc{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new tle.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,iq.isDataTypeRule)(e)?Tr.DatatypeSymbol:(0,iq.getTypeName)(e),i=this.wrapper.DEFINE_RULE(sq(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===Tr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,rm.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(F_(u)){let l=i.image;(0,rm.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(F_(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,aq.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),F_(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,aq.getContainerOfType)(e,rm.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,rm.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let a=e[n];a===void 0?e[n]=i:Array.isArray(a)&&Array.isArray(i)&&(i.push(...a),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};Tr.LangiumParser=j_;var im=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return nm.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return nm.defaultParserErrorProvider.buildEarlyExitMessage(e)}};Tr.LangiumParserErrorMessageProvider=im;var G_=class extends dc{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(sq(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};Tr.LangiumCompletionParser=G_;var rle={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new im},U_=class extends nm.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},rle),{lookaheadStrategy:n?new nm.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new ele.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var K_=d(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.assertUnreachable=Tu.ErrorWithLocation=void 0;var H_=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};Tu.ErrorWithLocation=H_;function nle(t){throw new Error("Error! The input value was not handled.")}Tu.assertUnreachable=nle});var B_=d(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.createParser=void 0;var uq=So(),He=Ne(),pc=K_(),ile=jt(),lq=Gt(),cq=Tt();function ale(t,e,r){return ole({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}sm.createParser=ale;function ole(t,e){let r=(0,cq.getAllReachableRules)(e,!1),n=(0,ile.stream)(e.rules).filter(He.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,Po(a,i.definition)))}}function Po(t,e,r=!1){let n;if((0,He.isKeyword)(e))n=ple(t,e);else if((0,He.isAction)(e))n=sle(t,e);else if((0,He.isAssignment)(e))n=Po(t,e.terminal);else if((0,He.isCrossReference)(e))n=fq(t,e);else if((0,He.isRuleCall)(e))n=ule(t,e);else if((0,He.isAlternatives)(e))n=cle(t,e);else if((0,He.isUnorderedGroup)(e))n=fle(t,e);else if((0,He.isGroup)(e))n=dle(t,e);else throw new pc.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return dq(t,r?void 0:om(e),n,e.cardinality)}function sle(t,e){let r=(0,lq.getTypeName)(e);return()=>t.parser.action(r,e)}function ule(t,e){let r=e.rule.ref;if((0,He.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?lle(r,e.arguments):()=>({});return a=>t.parser.subrule(n,pq(t,r),e,i(a))}else if((0,He.isTerminalRule)(r)){let n=t.consume++,i=W_(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,pc.assertUnreachable)(r);else throw new pc.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function lle(t,e){let r=e.map(n=>zi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function zi(t){if((0,He.isDisjunction)(t)){let e=zi(t.left),r=zi(t.right);return n=>e(n)||r(n)}else if((0,He.isConjunction)(t)){let e=zi(t.left),r=zi(t.right);return n=>e(n)&&r(n)}else if((0,He.isNegation)(t)){let e=zi(t.value);return r=>!e(r)}else if((0,He.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,He.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,pc.assertUnreachable)(t)}function cle(t,e){if(e.elements.length===1)return Po(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:Po(t,i,!0)},o=om(i);o&&(a.GATE=zi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function fle(t,e){if(e.elements.length===1)return Po(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:Po(t,s,!0)},l=om(s);l&&(u.GATE=zi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let h=u.GATE;return h?c.GATE=()=>h(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=dq(t,om(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function dle(t,e){let r=e.elements.map(n=>Po(t,n));return n=>r.forEach(i=>i(n))}function om(t){if((0,He.isGroup)(t))return t.guardCondition}function fq(t,e,r=e.terminal){if(r)if((0,He.isRuleCall)(r)&&(0,He.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,pq(t,r.rule.ref),e,i)}else if((0,He.isRuleCall)(r)&&(0,He.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=W_(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,He.isKeyword)(r)){let n=t.consume++,i=W_(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,cq.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,lq.getTypeName)(e.type.ref));return fq(t,e,i)}}function ple(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function dq(t,e,r,n){let i=e&&zi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,uq.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,uq.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,pc.assertUnreachable)(n)}function pq(t,e){let r=mle(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function mle(t,e){if((0,He.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,He.isParserRule)(n);)((0,He.isGroup)(n)||(0,He.isAlternatives)(n)||(0,He.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function W_(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var V_=d(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.createCompletionParser=void 0;var hle=am(),yle=B_();function gle(t){let e=t.Grammar,r=t.parser.Lexer,n=new hle.LangiumCompletionParser(t);return(0,yle.createParser)(e,n,r.definition),n.finalize(),n}um.createCompletionParser=gle});var z_=d(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.prepareLangiumParser=_u.createLangiumParser=void 0;var vle=am(),Tle=B_();function _le(t){let e=mq(t);return e.finalize(),e}_u.createLangiumParser=_le;function mq(t){let e=t.Grammar,r=t.parser.Lexer,n=new vle.LangiumParser(t);return(0,Tle.createParser)(e,n,r.definition)}_u.prepareLangiumParser=mq});var J_=d(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.DefaultTokenBuilder=void 0;var Rle=So(),Y_=Ne(),Ale=Gt(),Sle=Se(),ble=Tt(),lm=to(),Ple=jt(),X_=class{buildTokens(e,r){let n=(0,Ple.stream)((0,ble.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,lm.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(Y_.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Ale.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,lm.isWhitespaceRegExp)(r)?Rle.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(Y_.isParserRule).flatMap(i=>(0,Sle.streamAllContents)(i).filter(Y_.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,lm.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,lm.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};cm.DefaultTokenBuilder=X_});var Z_=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.convertBoolean=It.convertNumber=It.convertDate=It.convertBigint=It.convertInt=It.convertID=It.convertRegexLiteral=It.convertString=It.DefaultValueConverter=void 0;var hq=Ne(),Cle=Gt(),kle=Tt(),Q_=class{convert(e,r){let n=r.feature;if((0,hq.isCrossReference)(n)&&(n=(0,kle.getCrossReferenceTerminal)(n)),(0,hq.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Tq(r);case"STRING":return yq(r);case"ID":return vq(r);case"REGEXLITERAL":return gq(r)}switch((i=(0,Cle.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Aq(r);case"boolean":return Sq(r);case"bigint":return _q(r);case"date":return Rq(r);default:return r}}};It.DefaultValueConverter=Q_;function yq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=wle(i)}else e+=n}return e}It.convertString=yq;function wle(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function gq(t){return t.substring(1,t.length-1)}It.convertRegexLiteral=gq;function vq(t){return t.charAt(0)==="^"?t.substring(1):t}It.convertID=vq;function Tq(t){return parseInt(t)}It.convertInt=Tq;function _q(t){return BigInt(t)}It.convertBigint=_q;function Rq(t){return new Date(t)}It.convertDate=Rq;function Aq(t){return Number(t)}It.convertNumber=Aq;function Sq(t){return t.toLowerCase()==="true"}It.convertBoolean=Sq});var rR=d(dm=>{"use strict";Object.defineProperty(dm,"__esModule",{value:!0});dm.DefaultLinker=void 0;var Ele=xe(),Ru=nr(),fm=Se(),Nle=Pr(),eR=ga(),tR=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Ele.CancellationToken.None){for(let n of(0,fm.streamAst)(e.parseResult.value))await(0,Nle.interruptAndCheck)(r),(0,fm.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=eR.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Ru.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Ru.isAstNode)(this._ref))return this._ref;if((0,Ru.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,fm.getDocument)(e).state<eR.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Ru.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Ru.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Ru.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,fm.getDocument)(e.container);n.state<eR.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};dm.DefaultLinker=tR});var iR=d(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.DefaultJsonSerializer=void 0;var mc=nr(),$le=Se(),Ole=Tt();function bq(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var nR=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r?.replacer,i=(o,s)=>this.replacer(o,s,r),a=n?(o,s)=>n(o,s,i):i;return JSON.stringify(e,a,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:a}={}){var o,s,u;if(!this.ignoreProperties.has(e))if((0,mc.isReference)(r)){let l=r.ref,c=n?r.$refText:void 0;return l?{$refText:c,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:c,$error:(s=(o=r.error)===null||o===void 0?void 0:o.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let l;if(a&&(0,mc.isAstNode)(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=(0,$le.getDocument)(r).uri.toString()}catch{}return i&&!e&&(0,mc.isAstNode)(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(a=>!a.startsWith("$")).forEach(a=>{let o=(0,Ole.findNodesForProperty)(e.$cstNode,a).map(r);o.length!==0&&(i[a]=o)}),e}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];bq(c)?u[l]=this.reviveReference(e,s,r,c):(0,mc.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else bq(u)?e[s]=this.reviveReference(e,s,r,u):(0,mc.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};pm.DefaultJsonSerializer=nR});var oR=d(mm=>{"use strict";Object.defineProperty(mm,"__esModule",{value:!0});mm.DefaultServiceRegistry=void 0;var Ile=bn(),aR=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Ile.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};mm.DefaultServiceRegistry=aR});var uR=d(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.ValidationRegistry=void 0;var Dle=Pn(),xle=Pr(),sR=class{constructor(e){this.validationChecks=new Dle.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,xle.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};hm.ValidationRegistry=sR});var dR=d(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.DefaultReferenceDescriptionProvider=Au.DefaultAstNodeDescriptionProvider=void 0;var Lle=xe(),qle=nr(),ym=Se(),lR=qe(),Mle=Pr(),Fle=$i(),cR=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,ym.getDocument)(e)){var i;r??(r=this.nameProvider.getName(e));let a=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${a} has no name.`);let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,lR.toDocumentSegment)(o),selectionSegment:(0,lR.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:a}}};Au.DefaultAstNodeDescriptionProvider=cR;var fR=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Lle.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,ym.streamAst)(i))await(0,Mle.interruptAndCheck)(r),(0,ym.streamReferences)(a).filter(o=>!(0,qle.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,ym.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,lR.toDocumentSegment)(n),local:(0,Fle.equalURI)(r.documentUri,i)}}};Au.DefaultReferenceDescriptionProvider=fR});var mR=d(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.DefaultAstNodeLocator=void 0;var pR=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};gm.DefaultAstNodeLocator=pR});var yR=d(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.DefaultConfigurationProvider=void 0;var jle=bt(),hR=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(jle.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};vm.DefaultConfigurationProvider=hR});var TR=d(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.DefaultDocumentBuilder=void 0;var Tm=xe(),Gle=Pn(),gR=Pr(),pi=ga(),vR=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Gle.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Tm.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Tm.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,gR.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Tm.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,pi.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<pi.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,pi.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,pi.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,pi.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,pi.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,pi.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,pi.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,gR.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Tm.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,gR.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=pi.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=pi.DocumentState.Validated}};_m.DefaultDocumentBuilder=vR});var SR=d(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.DefaultIndexManager=void 0;var Pq=xe(),Ule=Se(),_R=jt(),RR=$i(),Cq=ga(),AR=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,Ule.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,RR.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,_R.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,_R.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,_R.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Pq.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Cq.DocumentState.IndexedContent}async updateReferences(e,r=Pq.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Cq.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,RR.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,RR.equalURI)(o.targetUri,n)):!1}};Rm.DefaultIndexManager=AR});var CR=d(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.DefaultWorkspaceManager=void 0;var Hle=xe(),bR=bn(),Kle=Pr(),PR=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Hle.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,Kle.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return bR.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=bR.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=bR.Utils.extname(r.uri);return n.includes(a)}return!1}};Am.DefaultWorkspaceManager=PR});var NR=d(mi=>{"use strict";Object.defineProperty(mi,"__esModule",{value:!0});mi.isTokenTypeDictionary=mi.isIMultiModeLexerDefinition=mi.isTokenTypeArray=mi.DefaultLexer=void 0;var Wle=So(),kR=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=wR(r)?Object.values(r):r;this.chevrotainLexer=new Wle.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(wR(e))return e;let r=ER(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};mi.DefaultLexer=kR;function kq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}mi.isTokenTypeArray=kq;function ER(t){return t&&"modes"in t&&"defaultMode"in t}mi.isIMultiModeLexerDefinition=ER;function wR(t){return!kq(t)&&!ER(t)}mi.isTokenTypeDictionary=wR});var DR=d(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isJSDoc=Su.parseJSDoc=void 0;var Ie=xe(),Ble=bn(),Vle=Tf(),zle=to();function Yle(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Ie.Position.create(0,0));let a=Nq(t),o=IR(n),s=Qle({lines:a,position:i,options:o});return nce({index:0,tokens:s,position:i})}Su.parseJSDoc=Yle;function Xle(t,e){let r=IR(e),n=Nq(t);if(n.length===0)return!1;let i=n[0],a=n[n.length-1],o=r.start,s=r.end;return Boolean(o?.exec(i))&&Boolean(s?.exec(a))}Su.isJSDoc=Xle;function Nq(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Vle.NEWLINE_REGEXP)}var wq=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Jle=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Qle(t){var e,r,n;let i=[],a=t.position.line,o=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,l=s===t.lines.length-1,c=t.lines[s],f=0;if(u&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);v&&(f=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);v&&(f=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);v&&(c=c.substring(0,v.index))}if(c=c.substring(0,rce(c)),OR(c,0)>=c.length){if(i.length>0){let v=Ie.Position.create(a,o);i.push({type:"break",content:"",range:Ie.Range.create(v,v)})}}else{wq.lastIndex=f;let v=wq.exec(c);if(v){let y=v[0],A=v[1],w=Ie.Position.create(a,o+f),C=Ie.Position.create(a,o+f+y.length);i.push({type:"tag",content:A,range:Ie.Range.create(w,C)}),f+=y.length,f=OR(c,f)}if(f<c.length){let y=c.substring(f),A=Array.from(y.matchAll(Jle));i.push(...Zle(A,y,a,o+f))}}a++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Zle(t,e,r,n){let i=[];if(t.length===0){let a=Ie.Position.create(r,n),o=Ie.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Ie.Range.create(a,o)})}else{let a=0;for(let s of t){let u=s.index,l=e.substring(a,u);l.length>0&&i.push({type:"text",content:e.substring(a,u),range:Ie.Range.create(Ie.Position.create(r,a+n),Ie.Position.create(r,u+n))});let c=l.length+1,f=s[1];if(i.push({type:"inline-tag",content:f,range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+f.length+n))}),c+=f.length,s.length===4){c+=s[2].length;let h=s[3];i.push({type:"text",content:h,range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+h.length+n))})}else i.push({type:"text",content:"",range:Ie.Range.create(Ie.Position.create(r,a+c+n),Ie.Position.create(r,a+c+n))});a=u+s[0].length}let o=e.substring(a);o.length>0&&i.push({type:"text",content:o,range:Ie.Range.create(Ie.Position.create(r,a+n),Ie.Position.create(r,a+n+o.length))})}return i}var ece=/\S/,tce=/\s*$/;function OR(t,e){let r=t.substring(e).match(ece);return r?e+r.index:t.length}function rce(t){let e=t.match(tce);if(e&&typeof e.index=="number")return e.index}function nce(t){var e,r,n,i;let a=Ie.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Sm([],Ie.Range.create(a,a));let o=[];for(;t.index<t.tokens.length;){let l=ice(t,o[o.length-1]);l&&o.push(l)}let s=(r=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:a,u=(i=(n=o[o.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:a;return new Sm(o,Ie.Range.create(s,u))}function ice(t,e){let r=t.tokens[t.index];if(r.type==="tag")return Oq(t,!1);if(r.type==="text"||r.type==="inline-tag")return $q(t);ace(r,e),t.index++}function ace(t,e){if(e){let r=new bm("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function $q(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(oce(t)),n=e,e=t.tokens[t.index];return new yc(i,Ie.Range.create(r.range.start,n.range.end))}function oce(t){return t.tokens[t.index].type==="inline-tag"?Oq(t,!0):Iq(t)}function Oq(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let a=Iq(t);return new hc(n,new yc([a],a.range),e,Ie.Range.create(r.range.start,a.range.end))}else{let a=$q(t);return new hc(n,a,e,Ie.Range.create(r.range.start,a.range.end))}else{let a=r.range;return new hc(n,new yc([],a),e,a)}}function Iq(t){let e=t.tokens[t.index++];return new bm(e.content,e.range)}function IR(t){if(!t)return IR({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:$R(e,!0),end:$R(r,!1),line:$R(n,!0)}}function $R(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,zle.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Sm=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=Eq(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=Eq(r)+i}return r.trim()}},hc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let a=sce(this.name,r,e??{});if(typeof a=="string")return a}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function sce(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let a=e.indexOf(" "),o=e;if(a>0){let u=OR(e,a);o=e.substring(u),e=e.substring(0,a)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(o=`\`${o}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,o))!==null&&i!==void 0?i:uce(e,o)}}function uce(t,e){try{return Ble.URI.parse(t,!0),`[${e}](${t})`}catch{return t}}var yc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],a=this.inlines[n+1];r+=i.toMarkdown(e),a&&a.range.start.line>i.range.start.line&&(r+=`
`)}return r}},bm=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function Eq(t){return t.endsWith(`
`)?`
`:`

`}});var xq=d(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.JSDocDocumentationProvider=void 0;var lce=nr(),cce=Se(),fce=qe(),Dq=DR(),xR=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,fce.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,lce.isLeafCstNode)(r)&&(0,Dq.isJSDoc)(r))return(0,Dq.parseJSDoc)(r).toMarkdown({renderLink:(i,a)=>this.documentationLinkRenderer(e,i,a)})}documentationLinkRenderer(e,r,n){var i;let a=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(a&&a.nameSegment){let o=a.nameSegment.range.start.line+1,s=a.nameSegment.range.start.character+1,u=a.documentUri.with({fragment:`L${o},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,cce.getDocument)(e).precomputedScopes;if(!i)return;let a=e;do{let s=i.get(a).find(u=>u.name===r);if(s)return s;a=a.$container}while(a)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};Pm.JSDocDocumentationProvider=xR});var LR=d(Da=>{"use strict";var dce=Da&&Da.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Lq=Da&&Da.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&dce(e,t,r)};Object.defineProperty(Da,"__esModule",{value:!0});Lq(xq(),Da);Lq(DR(),Da)});var bd=d(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.createDefaultSharedModule=bu.createDefaultModule=void 0;var pce=xe(),mce=Ay(),hce=Fv(),yce=V_(),gce=od(),vce=ov(),Tce=uv(),_ce=Wf(),Rce=iv(),Ace=fv(),Sce=_v(),bce=Av(),Pce=bv(),Cce=z_(),kce=J_(),wce=Z_(),Ece=rR(),Nce=os(),$ce=td(),Oce=Mf(),Ice=jf(),Dce=iR(),xce=oR(),Lce=Pr(),qce=Hf(),Mce=uR(),qq=dR(),Fce=mR(),jce=yR(),Gce=TR(),Mq=ga(),Uce=SR(),Hce=CR(),Kce=NR(),Wce=LR();function Bce(t){return{documentation:{DocumentationProvider:e=>new Wce.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,hce.createGrammarConfig)(e),LangiumParser:e=>(0,Cce.createLangiumParser)(e),CompletionParser:e=>(0,yce.createCompletionParser)(e),ValueConverter:()=>new wce.DefaultValueConverter,TokenBuilder:()=>new kce.DefaultTokenBuilder,Lexer:e=>new Kce.DefaultLexer(e)},lsp:{CompletionProvider:e=>new gce.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new Tce.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Ace.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new _ce.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new bce.DefaultReferencesProvider(e),DefinitionProvider:e=>new Rce.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new vce.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new Pce.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Fce.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new qq.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new qq.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new Ece.DefaultLinker(e),NameProvider:()=>new Nce.DefaultNameProvider,ScopeProvider:e=>new Ice.DefaultScopeProvider(e),ScopeComputation:e=>new Oce.DefaultScopeComputation(e),References:e=>new $ce.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Dce.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new qce.DefaultDocumentValidator(e),ValidationRegistry:e=>new Mce.ValidationRegistry(e)},shared:()=>t.shared}}bu.createDefaultModule=Bce;function Vce(t){return{ServiceRegistry:()=>new xce.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Sce.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new Mq.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new Mq.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Gce.DefaultDocumentBuilder(e),TextDocuments:()=>new pce.TextDocuments(mce.TextDocument),IndexManager:e=>new Uce.DefaultIndexManager(e),WorkspaceManager:e=>new Hce.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Lce.MutexLock,ConfigurationProvider:e=>new jce.DefaultConfigurationProvider(e)}}}bu.createDefaultSharedModule=Vce});var jq=d(Fq=>{"use strict";Object.defineProperty(Fq,"__esModule",{value:!0})});var Hq=d(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.joinTracedToNodeIf=xa.joinTracedToNode=xa.joinToNode=void 0;var qR=Ya();function Gq(t,e=String,{filter:r,prefix:n,suffix:i,separator:a,appendNewLineIfNotEmpty:o}={}){return Yce(t,(s,u,l,c)=>{if(r&&!r(u,l,c))return s;let f=e(u,l,c);return(s??(s=new qR.CompositeGeneratorNode)).append(n&&n(u,l,c)).append(f).append(i&&i(u,l,c)).appendIf(!c&&f!==void 0,a).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!o)})}xa.joinToNode=Gq;function Uq(t,e){return(r,n=String,i)=>(0,qR.traceToNode)(t,e)(Gq(r,t&&e?(a,o,s)=>(0,qR.traceToNode)(t,e,o)(n(a,o,s)):n,i))}xa.joinTracedToNode=Uq;function zce(t,e,r){return t?Uq(typeof e=="function"?e():e,r):()=>{}}xa.joinTracedToNodeIf=zce;function Yce(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var Kq=d(_r=>{"use strict";var Xce=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),MR=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Xce(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.normalizeEOL=_r.expandToStringWithNL=_r.expandToString=void 0;MR(Ya(),_r);MR(Hq(),_r);MR(qy(),_r);var FR=Tf();Object.defineProperty(_r,"expandToString",{enumerable:!0,get:function(){return FR.expandToString}});Object.defineProperty(_r,"expandToStringWithNL",{enumerable:!0,get:function(){return FR.expandToStringWithNL}});Object.defineProperty(_r,"normalizeEOL",{enumerable:!0,get:function(){return FR.normalizeEOL}})});var Bq=d(Wq=>{"use strict";Object.defineProperty(Wq,"__esModule",{value:!0})});var Vq=d(hi=>{"use strict";var Jce=hi&&hi.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Cm=hi&&hi.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Jce(e,t,r)};Object.defineProperty(hi,"__esModule",{value:!0});Cm(hg(),hi);Cm(Fv(),hi);Cm(Dv(),hi);Cm(Bq(),hi)});var Yq=d(zq=>{"use strict";Object.defineProperty(zq,"__esModule",{value:!0})});var Xq=d($r=>{"use strict";var Qce=$r&&$r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),La=$r&&$r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Qce(e,t,r)};Object.defineProperty($r,"__esModule",{value:!0});La(V_(),$r);La(M_(),$r);La(z_(),$r);La(am(),$r);La(NR(),$r);La(Yq(),$r);La(J_(),$r);La(Z_(),$r)});var Jq=d(qn=>{"use strict";var Zce=qn&&qn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),gc=qn&&qn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Zce(e,t,r)};Object.defineProperty(qn,"__esModule",{value:!0});gc(rR(),qn);gc(os(),qn);gc(td(),qn);gc(Mf(),qn);gc(jf(),qn)});var Qq=d(Co=>{"use strict";var efe=Co&&Co.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tfe=Co&&Co.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&efe(e,t,r)};Object.defineProperty(Co,"__esModule",{value:!0});tfe(iR(),Co)});var Zq=d(Rr=>{"use strict";var rfe=Rr&&Rr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Yi=Rr&&Rr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&rfe(e,t,r)};Object.defineProperty(Rr,"__esModule",{value:!0});Yi(Se(),Rr);Yi(Pn(),Rr);Yi(qe(),Rr);Yi(K_(),Rr);Yi(Tt(),Rr);Yi(Pr(),Rr);Yi(to(),Rr);Yi(jt(),Rr);Yi($i(),Rr)});var tM=d(qa=>{"use strict";var nfe=qa&&qa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),eM=qa&&qa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&nfe(e,t,r)};Object.defineProperty(qa,"__esModule",{value:!0});eM(Hf(),qa);eM(uR(),qa)});var rM=d(Or=>{"use strict";var ife=Or&&Or.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ma=Or&&Or.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ife(e,t,r)};Object.defineProperty(Or,"__esModule",{value:!0});Ma(dR(),Or);Ma(mR(),Or);Ma(yR(),Or);Ma(TR(),Or);Ma(ga(),Or);Ma(xv(),Or);Ma(SR(),Or);Ma(CR(),Or)});var ko=d(Ke=>{"use strict";var nM=Ke&&Ke.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),afe=Ke&&Ke.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Ar=Ke&&Ke.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&nM(e,t,r)},ofe=Ke&&Ke.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&nM(e,t,r);return afe(e,t),e};Object.defineProperty(Ke,"__esModule",{value:!0});Ke.GrammarAST=void 0;Ar(bd(),Ke);Ar(tl(),Ke);Ar(oR(),Ke);Ar(jq(),Ke);Ar(nr(),Ke);Ar(LR(),Ke);Ar(Kq(),Ke);Ar(Vq(),Ke);Ar(Cv(),Ke);Ar(Xq(),Ke);Ar(Jq(),Ke);Ar(Qq(),Ke);Ar(Zq(),Ke);Ar(tM(),Ke);Ar(rM(),Ke);var sfe=ofe(Ne());Ke.GrammarAST=sfe});var aM=d((LAe,iM)=>{"use strict";iM.exports=xe()});var jR=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=p.isASTDeclaration=p.ASTDeclaration=p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlterAndTrajectory=p.ASTAlterAndTrajectory=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTInstruction=p.ASTInstruction=void 0;p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRange=p.ASTRange=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParameter=p.ASTParameter=p.isASTList=p.ASTList=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTDoubleRange=p.ASTDoubleRange=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTStringList=p.ASTStringList=p.isASTOffsetList=p.ASTOffsetList=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTTrajectory=p.ASTTrajectory=p.isASTAlter=p.ASTAlter=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTSpeedParameterType=p.ASTSpeedParameterType=void 0;var ufe=ko();p.ASTInstruction="ASTInstruction";function lfe(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=lfe;p.ASTNumber="ASTNumber";function cfe(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=cfe;p.ASTNumberOffset="ASTNumberOffset";function ffe(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=ffe;p.ASTReplayTarget="ASTReplayTarget";function dfe(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=dfe;p.ASTTarget="ASTTarget";function pfe(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=pfe;p.ASTTimeScope="ASTTimeScope";function mfe(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=mfe;p.ASTValue="ASTValue";function hfe(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=hfe;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function yfe(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=yfe;p.ASTAllPlanes="ASTAllPlanes";function gfe(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=gfe;p.ASTAlterAndTrajectory="ASTAlterAndTrajectory";function vfe(t){return p.reflection.isInstance(t,p.ASTAlterAndTrajectory)}p.isASTAlterAndTrajectory=vfe;p.ASTAlterSpeed="ASTAlterSpeed";function Tfe(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=Tfe;p.ASTAssertion="ASTAssertion";function _fe(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=_fe;p.ASTAssertions="ASTAssertions";function Rfe(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=Rfe;p.ASTAt="ASTAt";function Afe(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=Afe;p.ASTAtFor="ASTAtFor";function Sfe(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=Sfe;p.ASTConstantValue="ASTConstantValue";function bfe(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=bfe;p.ASTCreate="ASTCreate";function Pfe(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=Pfe;p.ASTCreationParameter="ASTCreationParameter";function Cfe(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=Cfe;p.ASTCreationParameters="ASTCreationParameters";function kfe(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=kfe;p.ASTCreationParameterType="ASTCreationParameterType";function wfe(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=wfe;p.ASTCut="ASTCut";function Efe(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=Efe;p.ASTDeclaration="ASTDeclaration";function Nfe(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=Nfe;p.ASTDelay="ASTDelay";function $fe(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=$fe;p.ASTDelayParameter="ASTDelayParameter";function Ofe(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=Ofe;p.ASTDoubleValue="ASTDoubleValue";function Ife(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=Ife;p.ASTFilters="ASTFilters";function Dfe(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=Dfe;p.ASTHide="ASTHide";function xfe(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=xfe;p.ASTHideParameter="ASTHideParameter";function Lfe(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Lfe;p.ASTIntegerValue="ASTIntegerValue";function qfe(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=qfe;p.ASTLeftShift="ASTLeftShift";function Mfe(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=Mfe;p.ASTList="ASTList";function Ffe(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=Ffe;p.ASTParameter="ASTParameter";function jfe(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=jfe;p.ASTParameters="ASTParameters";function Gfe(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=Gfe;p.ASTParameterType="ASTParameterType";function Ufe(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Ufe;p.ASTPlane="ASTPlane";function Hfe(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=Hfe;p.ASTPlaneFrom="ASTPlaneFrom";function Kfe(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=Kfe;p.ASTRange="ASTRange";function Wfe(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=Wfe;p.ASTRecordingParameterType="ASTRecordingParameterType";function Bfe(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=Bfe;p.ASTRecordingValue="ASTRecordingValue";function Vfe(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=Vfe;p.ASTReplay="ASTReplay";function zfe(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=zfe;p.ASTRightShift="ASTRightShift";function Yfe(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=Yfe;p.ASTRotate="ASTRotate";function Xfe(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=Xfe;p.ASTRotateParameter="ASTRotateParameter";function Jfe(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=Jfe;p.ASTSaturate="ASTSaturate";function Qfe(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=Qfe;p.ASTSaturationParameter="ASTSaturationParameter";function Zfe(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=Zfe;p.ASTSaturationParameters="ASTSaturationParameters";function ede(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=ede;p.ASTSaturationParameterType="ASTSaturationParameterType";function tde(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=tde;p.ASTScenario="ASTScenario";function rde(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=rde;p.ASTSpeedParameter="ASTSpeedParameter";function nde(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=nde;p.ASTSpeedParameters="ASTSpeedParameters";function ide(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=ide;p.ASTSpeedParameterType="ASTSpeedParameterType";function ade(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=ade;p.ASTStringValue="ASTStringValue";function ode(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=ode;p.ASTTime="ASTTime";function sde(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=sde;p.ASTTrigger="ASTTrigger";function ude(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=ude;p.ASTVariableValue="ASTVariableValue";function lde(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=lde;p.ASTWayPoint="ASTWayPoint";function cde(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=cde;p.ASTWayPoints="ASTWayPoints";function fde(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=fde;p.ASTWindow="ASTWindow";function dde(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=dde;p.ASTAlter="ASTAlter";function pde(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=pde;p.ASTTrajectory="ASTTrajectory";function mde(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=mde;p.ASTListDeclaration="ASTListDeclaration";function hde(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=hde;p.ASTRangeDeclaration="ASTRangeDeclaration";function yde(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=yde;p.ASTOffsetList="ASTOffsetList";function gde(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=gde;p.ASTStringList="ASTStringList";function vde(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=vde;p.ASTParamDrift="ASTParamDrift";function Tde(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Tde;p.ASTParamEdit="ASTParamEdit";function _de(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=_de;p.ASTParamNoise="ASTParamNoise";function Rde(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=Rde;p.ASTParamOffset="ASTParamOffset";function Ade(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=Ade;p.ASTDoubleRange="ASTDoubleRange";function Sde(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=Sde;p.ASTIntegerRange="ASTIntegerRange";function bde(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=bde;var km=class extends ufe.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterAndTrajectory","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlterAndTrajectory:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTStringValue:case p.ASTVariableValue:case p.ASTNumberOffset:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleValue:case p.ASTIntegerValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTRightShift:case p.ASTNumber:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTAlter:case p.ASTTrajectory:return this.isSubtype(p.ASTAlterAndTrajectory,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTOffsetList:case p.ASTStringList:return this.isSubtype(p.ASTList,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);case p.ASTDoubleRange:case p.ASTIntegerRange:return this.isSubtype(p.ASTRange,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=km;p.reflection=new km});var oM=d(Em=>{"use strict";Object.defineProperty(Em,"__esModule",{value:!0});Em.AttackScenarioGrammarGrammar=void 0;var Pde=ko(),wm,Cde=()=>wm!=null?wm:wm=(0,Pde.loadGrammarFromJson)(`{
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
        ]
      },
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
        ]
      },
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
                "$ref": "#/rules@141"
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
}`);Em.AttackScenarioGrammarGrammar=Cde});var sM=d(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.AttackScenarioGrammarGeneratedModule=un.FditscenarioGeneratedSharedModule=un.AttackScenarioGrammarParserConfig=un.AttackScenarioGrammarLanguageMetaData=void 0;var kde=jR(),wde=oM();un.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};un.AttackScenarioGrammarParserConfig={maxLookahead:1};un.FditscenarioGeneratedSharedModule={AstReflection:()=>new kde.FditscenarioAstReflection};un.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,wde.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>un.AttackScenarioGrammarLanguageMetaData,parser:{ParserConfig:()=>un.AttackScenarioGrammarParserConfig}}});var uM=d(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.FditscenarioValidator=Pu.registerValidationChecks=void 0;function Ede(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}Pu.registerValidationChecks=Ede;var GR=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};Pu.FditscenarioValidator=GR});var dM=d(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.generateCommands=void 0;var We=jR();function Nde(t,e,r){return $de(t,e,r)}Om.generateCommands=Nde;function $de(t,e,r){return{sensors:Ode(t,e,r)}}function Ode(t,e,r){return{sensor:[{sensorType:"SBS",sID:"",record:e,firstDate:fM(r),filter:"",action:Ide(t.instructions,r)}]}}var Sr;(function(t){t.deletion="DELETION",t.creation="CREATION",t.alteration="ALTERATION",t.saturation="SATURATION",t.duplication="DUPLICATION",t.rotation="ROTATION",t.custom="CUSTOM",t.replay="REPLAY",t.timestamp="ALTERATIONTIMESTAMP",t.cut="CUT",t.speedAltaration="ALTERATIONSPEED",t.trajectory="TRAJECTORY"})(Sr||(Sr={}));var ln;(function(t){t.altitude="altitude",t.latitude="latitude",t.icao="hexIdent",t.track="track",t.callsign="callsign",t.emergency="emergency",t.groundspeed="groundSpeed",t.longitude="longitude",t.spi="SPI",t.squawk="squawk"})(ln||(ln={}));var Fa;(function(t){t.icao="hexIdent",t.callsign="callsign",t.emergency="emergency",t.spi="SPI",t.squawk="squawk",t.alert="alert"})(Fa||(Fa={}));var Nm;(function(t){t.east_west_velocity="EAST_WEST_VELOCITY",t.north_south_velocity="NORTH_SOUTH_VELOCITY"})(Nm||(Nm={}));var $m;(function(t){t.icao="ICAO",t.aircraft_number="AIRCRAFT_NUMBER"})($m||($m={}));var vc;(function(t){t.rec_duration="REC_DURATION",t.alt_duration="ALT_DURATION",t.rec_nbr_aircraft="REC_NBR_AICRAFT"})(vc||(vc={}));function Ide(t,e){return t.flatMap(r=>Dde(r,e)).filter(r=>r!==void 0)}function Dde(t,e){return(0,We.isASTHide)(t)?(0,We.isASTHideParameter)(t.frequency)?{alterationType:Sr.deletion,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:[{mode:"simple",frequency:spe(t.frequency)}]}}:{alterationType:Sr.deletion,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target)}}:(0,We.isASTAlter)(t)?{alterationType:Sr.alteration,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:cM(t.parameters)}}:(0,We.isASTCreate)(t)?(0,We.isASTCreationParameters)(t.parameters)?{alterationType:Sr.creation,scope:Ur(t.timeScope,e),parameters:{target:{identifier:"hexIdent",value:"ALL"},trajectory:UR(t.trajectory),parameter:Bde(t.parameters)}}:{alterationType:Sr.creation,scope:Ur(t.timeScope,e),parameters:{target:{identifier:"hexIdent",value:"ALL"},trajectory:UR(t.trajectory)}}:(0,We.isASTTrajectory)(t)?{alterationType:Sr.trajectory,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),trajectory:UR(t.trajectory)}}:(0,We.isASTAlterSpeed)(t)?{alterationType:Sr.speedAltaration,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:Xde(t.parameters)}}:(0,We.isASTSaturate)(t)?{alterationType:Sr.saturation,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:epe(t.parameters)}}:(0,We.isASTReplay)(t)?(0,We.isASTParameters)(t.parameters)?{alterationType:Sr.replay,scope:Ur(t.timeScope,e),parameters:{target:lM(t.target),parameter:cM(t.parameters)}}:{alterationType:Sr.replay,scope:Ur(t.timeScope,e),parameters:{target:lM(t.target)}}:(0,We.isASTDelay)(t)?{alterationType:Sr.timestamp,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:npe(t.delay)}}:(0,We.isASTRotate)(t)?{alterationType:Sr.rotation,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target),parameter:ipe(t.angle)}}:{alterationType:Sr.cut,scope:Ur(t.timeScope,e),parameters:{target:Xi(t.target)}}}function Ur(t,e){return(0,We.isASTAt)(t)?(0,We.isASTAtFor)(t.for)?{type:"timeWindow",lowerBound:(parseInt(Ji(t.time))*1e3).toString(),upperBound:((parseInt(Ji(t.time))+parseInt(Ji(t.for.for)))*1e3).toString()}:{type:"timeWindow",lowerBound:(parseInt(Ji(t.time))*1e3).toString(),upperBound:upe(parseInt(Ji(t.time)),e).toString()}:{type:"timeWindow",lowerBound:(parseInt(Ji(t.start))*1e3).toString(),upperBound:(parseInt(Ji(t.end))*1e3).toString()}}function Ji(t){return br(t.realTime)}function br(t){return(0,We.isASTNumberOffset)(t)?xde(t).replace('"',"").replace('"',""):(0,We.isASTStringValue)(t)?Lde(t).replace('"',"").replace('"',""):(0,We.isASTVariableValue)(t)?qde(t).replace('"',"").replace('"',""):Mde(t).replace('"',"").replace('"',"")}function xde(t){return(0,We.isASTNumber)(t)?KR(t):(0,We.isASTLeftShift)(t)?Fde(t):jde(t)}function Lde(t){return t.content}function qde(t){return t.content}function Mde(t){return t.content}function KR(t){return(0,We.isASTIntegerValue)(t)?t.content.toString():(0,We.isASTRecordingValue)(t.record)?Gde(t.record.content):t.content.toString()}function Fde(t){return KR(t.content)}function jde(t){return KR(t.content)}function Gde(t){return t.REC_DURATION!=null?vc.rec_duration:t.ALT_DURATION!=null?vc.alt_duration:vc.rec_nbr_aircraft}function Xi(t){return(0,We.isASTAllPlanes)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"random"}}function lM(t){return(0,We.isASTAllPlaneFrom)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"random"}}function UR(t){return{waypoint:Ude(t.waypoints)}}function Ude(t){let e=[];for(let r=0;r<t.length;r++)e.push(Hde(t[r]));return e}function Hde(t){return{vertex:Kde(t.latitude,t.longitude),altitude:Wde(t.altitude),time:parseInt(Ji(t.time))*1e3}}function Kde(t,e){return{lat:{value:br(t),offset:!1},lon:{value:br(e),offset:!1}}}function Wde(t){return{value:t.content,offset:!1}}function Bde(t){return Vde(t.items)}function Vde(t){let e=[];for(let r=0;r<t.length;r++)e.push(zde(t[r]));return e}function zde(t){return{mode:"simple",key:Yde(t.name),value:br(t.value)}}function Yde(t){return t.ICAO!=null?Fa.icao:t.CALLSIGN!=null?Fa.callsign:t.EMERGENCY!=null?Fa.emergency:t.ALERT!=null?Fa.alert:t.SPI!=null?Fa.spi:Fa.squawk}function Xde(t){return Jde(t.items)}function Jde(t){let e=[];for(let r=0;r<t.length;r++)e.push(Qde(t[r]));return e}function Qde(t){return{mode:"simple",key:Zde(t.name),value:br(t.value)}}function Zde(t){if(t.EAST_WEST_VELOCITY!=null)return Nm.east_west_velocity;if(t.NORTH_SOUTH_VELOCITY!=null)return Nm.north_south_velocity}function epe(t){return tpe(t.items)}function tpe(t){let e=[];for(let r=0;r<t.length;r++)e.push(rpe(t[r]));return e}function rpe(t){return HR(t.name)=="ICAO"?{mode:"simple",key:HR(t.name),value:br(t.value)}:{mode:"simple",key:HR(t.name),number:br(t.value)}}function HR(t){if(t.ICAO!=null)return $m.icao;if(t.AIRCRAFT_NUMBER!=null)return $m.aircraft_number}function npe(t){return[{mode:"simple",key:"timestamp",value:(parseInt(Ji(t.value))*1e3).toString()}]}function ipe(t){return[{mode:"simple",key:"angle",angle:br(t.value)}]}function cM(t){return ape(t.items)}function ape(t){let e=[];for(let r=0;r<t.length;r++)e.push(ope(t[r]));return e}function ope(t){return(0,We.isASTParamEdit)(t)?{mode:"simple",key:Cu(t.name),value:br(t.value)}:(0,We.isASTParamOffset)(t)?t.offset_op=="+="?{mode:"offset",key:Cu(t.name),value:"+"+br(t.value)}:{mode:"offset",key:Cu(t.name),value:"-"+br(t.value)}:(0,We.isASTParamNoise)(t)?{mode:"noise",key:Cu(t.name),value:br(t.value)}:(0,We.isASTParamDrift)(t)&&t.drift_op=="++="?{mode:"drift",key:Cu(t.name),value:"+"+br(t.value)}:{mode:"drift",key:Cu(t.name),value:"-"+br(t.value)}}function Cu(t){return t.ALTITUDE!=null?ln.altitude:t.CALLSIGN!=null?ln.callsign:t.EMERGENCY!=null?ln.emergency:t.GROUND_SPEED!=null?ln.groundspeed:t.ICAO!=null?ln.icao:t.LATITUDE!=null?ln.latitude:t.LONGITUDE!=null?ln.longitude:t.SPI!=null?ln.spi:t.SQUAWK!=null?ln.squawk:ln.track}function spe(t){return br(t.value)}function fM(t){let n=t.split(`
`)[0].split(","),i=new Date(n[6].replaceAll("/","-")+"T"+n[7]);return Date.parse(n[6]+","+n[7]+" GMT")}function upe(t,e){let r=e.split(`
`),i=r[r.length-1].split(",");return Date.parse(i[6]+","+i[7]+" GMT")-fM(e)-t*1e3}});var mM=d((UAe,pM)=>{"use strict";pM.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var WR=d((HAe,yM)=>{var Tc=mM(),hM={};for(let t of Object.keys(Tc))hM[Tc[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};yM.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(h){return(l-h)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function lpe(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=hM[t];if(e)return e;let r=1/0,n;for(let i of Object.keys(Tc)){let a=Tc[i],o=lpe(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return Tc[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var vM=d((KAe,gM)=>{var Im=WR();function cpe(){let t={},e=Object.keys(Im);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function fpe(t){let e=cpe(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(Im[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function dpe(t,e){return function(r){return e(t(r))}}function ppe(t,e){let r=[e[t].parent,t],n=Im[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=dpe(Im[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}gM.exports=function(t){let e=fpe(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=ppe(o,e))}return r}});var _M=d((WAe,TM)=>{var BR=WR(),mpe=vM(),ku={},hpe=Object.keys(BR);function ype(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function gpe(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}hpe.forEach(t=>{ku[t]={},Object.defineProperty(ku[t],"channels",{value:BR[t].channels}),Object.defineProperty(ku[t],"labels",{value:BR[t].labels});let e=mpe(t);Object.keys(e).forEach(n=>{let i=e[n];ku[t][n]=gpe(i),ku[t][n].raw=ype(i)})});TM.exports=ku});var CM=d((BAe,PM)=>{"use strict";var RM=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,AM=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},SM=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},Dm=t=>t,bM=(t,e,r)=>[t,e,r],wu=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},VR,Eu=(t,e,r,n)=>{VR===void 0&&(VR=_M());let i=n?10:0,a={};for(let[o,s]of Object.entries(VR)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function vpe(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",wu(e.color,"ansi",()=>Eu(RM,"ansi16",Dm,!1)),wu(e.color,"ansi256",()=>Eu(AM,"ansi256",Dm,!1)),wu(e.color,"ansi16m",()=>Eu(SM,"rgb",bM,!1)),wu(e.bgColor,"ansi",()=>Eu(RM,"ansi16",Dm,!0)),wu(e.bgColor,"ansi256",()=>Eu(AM,"ansi256",Dm,!0)),wu(e.bgColor,"ansi16m",()=>Eu(SM,"rgb",bM,!0)),e}Object.defineProperty(PM,"exports",{enumerable:!0,get:vpe})});var wM=d((VAe,kM)=>{"use strict";kM.exports={stdout:!1,stderr:!1}});var NM=d((zAe,EM)=>{"use strict";var Tpe=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},_pe=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};EM.exports={stringReplaceAll:Tpe,stringEncaseCRLFWithFirstIndex:_pe}});var xM=d((YAe,DM)=>{"use strict";var Rpe=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,$M=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,Ape=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,Spe=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,bpe=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function IM(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):bpe.get(t)||t}function Ppe(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(Ape))r.push(i[2].replace(Spe,(s,u,l)=>u?IM(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function Cpe(t){$M.lastIndex=0;let e=[],r;for(;(r=$M.exec(t))!==null;){let n=r[1];if(r[2]){let i=Ppe(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function OM(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}DM.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(Rpe,(a,o,s,u,l,c)=>{if(o)i.push(IM(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:OM(t,r)(f)),r.push({inverse:s,styles:Cpe(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(OM(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var UM=d((XAe,GM)=>{"use strict";var _c=CM(),{stdout:YR,stderr:XR}=wM(),{stringReplaceAll:kpe,stringEncaseCRLFWithFirstIndex:wpe}=NM(),{isArray:xm}=Array,qM=["ansi","ansi","ansi256","ansi16m"],Nu=Object.create(null),Epe=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=YR?YR.level:0;t.level=e.level===void 0?r:e.level},JR=class{constructor(e){return MM(e)}},MM=t=>{let e={};return Epe(e,t),e.template=(...r)=>jM(e.template,...r),Object.setPrototypeOf(e,Lm.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=JR,e.template};function Lm(t){return MM(t)}for(let[t,e]of Object.entries(_c))Nu[t]={get(){let r=qm(this,QR(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};Nu.visible={get(){let t=qm(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var FM=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of FM)Nu[t]={get(){let{level:e}=this;return function(...r){let n=QR(_c.color[qM[e]][t](...r),_c.color.close,this._styler);return qm(this,n,this._isEmpty)}}};for(let t of FM){let e="bg"+t[0].toUpperCase()+t.slice(1);Nu[e]={get(){let{level:r}=this;return function(...n){let i=QR(_c.bgColor[qM[r]][t](...n),_c.bgColor.close,this._styler);return qm(this,i,this._isEmpty)}}}}var Npe=Object.defineProperties(()=>{},{...Nu,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),QR=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},qm=(t,e,r)=>{let n=(...i)=>xm(i[0])&&xm(i[0].raw)?LM(n,jM(n,...i)):LM(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,Npe),n._generator=t,n._styler=e,n._isEmpty=r,n},LM=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=kpe(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=wpe(e,i,n,a)),n+e+i},zR,jM=(t,...e)=>{let[r]=e;if(!xm(r)||!xm(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return zR===void 0&&(zR=xM()),zR(t,i.join(""))};Object.defineProperties(Lm.prototype,Nu);var Mm=Lm();Mm.supportsColor=YR;Mm.stderr=Lm({level:XR?XR.level:0});Mm.stderr.supportsColor=XR;GM.exports=Mm});var VM=d(yi=>{"use strict";var KM=yi&&yi.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},$pe=yi&&yi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(yi,"__esModule",{value:!0});yi.parseAndGenerate=yi.extractAstNodeFromString=void 0;var WM=bn(),Ope=ko(),Ipe=ZR(),Dpe=dM(),HM=$pe(UM());function BM(t,e){return KM(this,void 0,void 0,function*(){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,WM.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([r],{validationChecks:"all"}),r.parseResult.value})}yi.extractAstNodeFromString=BM;function xpe(t,e,r){return KM(this,void 0,void 0,function*(){let n=(0,Ipe.createFditscenarioServices)(Ope.EmptyFileSystem).Fditscenario,i=yield BM(t,n),o=n.shared.workspace.LangiumDocumentFactory.fromString(t,WM.URI.parse("memory://fditscenario.document")).parseResult;if(o.lexerErrors.length===0&&o.parserErrors.length===0)console.log(HM.default.green("Parsed and validated successfully!"));else{console.log(HM.default.red("Failed to parse and validate !"));return}return(0,Dpe.generateCommands)(i,e,r)})}yi.parseAndGenerate=xpe});var ZR=d(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.createFditscenarioServices=wo.FditscenarioModule=void 0;var Fm=ko(),zM=sM(),YM=uM(),Lpe=ko(),qpe=VM();wo.FditscenarioModule={validation:{FditscenarioValidator:()=>new YM.FditscenarioValidator}};function Mpe(t){let e=(0,Fm.inject)((0,Fm.createDefaultSharedModule)(t),zM.FditscenarioGeneratedSharedModule),r=(0,Fm.inject)((0,Fm.createDefaultModule)({shared:e}),zM.AttackScenarioGrammarGeneratedModule,wo.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new eA,e.ServiceRegistry.register(r),(0,YM.registerValidationChecks)(r),{shared:e,Fditscenario:r}}wo.createFditscenarioServices=Mpe;var eA=class extends Lpe.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,qpe.parseAndGenerate)(r[0],r[1],r[2]))}}});var Kpe=d(JM=>{Object.defineProperty(JM,"__esModule",{value:!0});var XM=ko(),tA=aM(),Fpe=ZR(),jpe=new tA.BrowserMessageReader(self),Gpe=new tA.BrowserMessageWriter(self),Upe=(0,tA.createConnection)(jpe,Gpe),{shared:Hpe}=(0,Fpe.createFditscenarioServices)(Object.assign({connection:Upe},XM.EmptyFileSystem));(0,XM.startLanguageServer)(Hpe)});Kpe();})();

import{P2PKH as t,LockingScript as n,Script as r,Utils as e,fromUtxo as o,SatoshisPerKilobyte as i,Transaction as s,OP as a,BigNumber as u,UnlockingScript as c,TransactionSignature as f}from"@bsv/sdk";import{Sigma as l}from"sigma-protocol";function d(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=Array(n);r<n;r++)e[r]=t[r];return e}function h(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return d(t,n);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(){return v=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)({}).hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},v.apply(null,arguments)}function p(t,n){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},p(t,n)}var m,y,g=function(t){return Buffer.from(t).toString("hex")},b=10,w="https://ordinals.gorillapool.io/api",S=/*#__PURE__*/function(r){function e(){return r.apply(this,arguments)||this}var o,i;return i=r,(o=e).prototype=Object.create(i.prototype),o.prototype.constructor=o,p(o,i),e.prototype.lock=function(r,e,o){var i="";if(void 0!==(null==e?void 0:e.dataB64)&&void 0!==(null==e?void 0:e.contentType)){var s=g("ord"),a=Buffer.from(e.dataB64,"base64").toString("hex").trim();if(!a)throw new Error("Invalid file data");var u=g(e.contentType);if(!u)throw new Error("Invalid media type");i="OP_0 OP_IF "+s+" OP_1 "+u+" OP_0 "+a+" OP_ENDIF"}var c=(i?i+" ":"")+(new t).lock(r).toASM();if(o&&(!o.app||!o.type))throw new Error("MAP.app and MAP.type are required fields");if(null!=o&&o.app&&null!=o&&o.type){c=c+" OP_RETURN "+g("1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5")+" "+g("SET");for(var f=0,l=Object.entries(o);f<l.length;f++){var d=l[f],h=d[0],v=d[1];"cmd"!==h&&(c=c+" "+g(h)+" "+g(v))}}return n.fromASM(c)},e}(t);!function(t){t.BSV20="bsv20",t.BSV21="bsv21"}(m||(m={})),function(t){t.Paymail="paymail",t.Address="address",t.Script="script"}(y||(y={}));var x=e.fromBase58Check,k=function(t,n){return o(v({},t,{script:Buffer.from(t.script,"base64").toString("hex")}),n)},P=function(n,r){void 0===r&&(r="base64");try{var e=w+"/txos/address/"+n+"/unspent?bsv20=false";return console.log({payUrl:e}),Promise.resolve(fetch(e)).then(function(e){if(!e.ok)throw new Error("Error fetching pay utxos");return Promise.resolve(e.json()).then(function(e){e=e.filter(function(t){return 1!==t.satoshis});var o=x(n),i=(new t).lock(o.data);return e.map(function(t){return{txid:t.txid,vout:t.vout,satoshis:t.satoshis,script:"hex"===r||"base64"===r?Buffer.from(i.toBinary()).toString(r):i.toASM()}})})})}catch(t){return Promise.reject(t)}},I=function(t,n,e,o,i){void 0===e&&(e=10),void 0===o&&(o=0),void 0===i&&(i="base64");try{var s=w+"/txos/address/"+t+"/unspent?limit="+e+"&offset="+o+"&";return n&&(s+="q="+Buffer.from(JSON.stringify({map:{subTypeData:{collectionId:n}}})).toString("base64")),Promise.resolve(fetch(s)).then(function(e){if(!e.ok)throw new Error("Error fetching NFT utxos for "+t);return Promise.resolve(e.json()).then(function(e){var o=(e=e.filter(function(t){var n;return 1===t.satoshis&&!(null!=(n=t.data)&&n.list)})).map(function(t){return t.txid+"_"+t.vout});return Promise.resolve(fetch(w+"/txos/outpoints?script=true",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify([].concat(o))})).then(function(o){if(!o.ok)throw new Error("Error fetching NFT scripts for "+t);return Promise.resolve(o.json()).then(function(t){return e=t.map(function(t){var e=t.script;"hex"===i?e=Buffer.from(e,"base64").toString("hex"):"asm"===i&&(e=r.fromHex(Buffer.from(e,"base64").toString("hex")).toASM());var o={origin:t.origin.outpoint,script:e,vout:t.vout,txid:t.txid,satoshis:1};return n&&(o.collectionId=n),o})})})})})}catch(t){return Promise.reject(t)}},O=function(t,n,r){try{return Promise.resolve(fetch(w+"/bsv20/"+r+"/"+(t===m.BSV20?"tick":"id")+"/"+n+"?bsv20=true&listing=false")).then(function(r){if(!r.ok)throw new Error("Error fetching "+t+" utxos");return Promise.resolve(r.json()).then(function(t){return t.map(function(t){return{amt:t.amt,script:t.script,vout:t.vout,txid:t.txid,id:n,satoshis:1}})})})}catch(t){return Promise.reject(t)}},B=function(t,n){try{var r,e=function(t){if(r)return t;throw new Error("Signer must be a LocalSigner or RemoteSigner")},o=null==n?void 0:n.idKey,i=null==n?void 0:n.keyHost;if(o){var s=new l(t).sign(o);return Promise.resolve(s.signedTx)}var a=function(){if(i){var e=null==n?void 0:n.authToken,o=new l(t);return function(t,n){try{var s=Promise.resolve(o.remoteSign(i,e)).then(function(t){return r=1,t.signedTx})}catch(t){return n(t)}return s&&s.then?s.then(void 0,n):s}(0,function(t){throw console.log(t),new Error("Remote signing to "+i+" failed")})}}();return Promise.resolve(a&&a.then?a.then(e):e(a))}catch(t){return Promise.reject(t)}},A=function(t){if(t){for(var n={app:t.app,type:t.type},r=0,e=Object.entries(t);r<e.length;r++){var o=e[r],i=o[1];void 0!==i&&(n[o[0]]="string"==typeof i?i:Array.isArray(i)||"object"==typeof i?JSON.stringify(i):String(i))}return n}},E=function(n){try{for(var o,a=n.utxos,u=n.destinations,c=n.paymentPk,f=n.changeAddress,l=n.satsPerKb,d=n.metaData,v=n.signer,p=n.additionalPayments,m=void 0===p?[]:p,y=new i(void 0===l?b:l),g=new s,w=h(a);!(o=w()).done;){var x=o.value,P=k(x,(new t).unlock(c,"all",!0,x.satoshis,r.fromBinary(e.toArray(x.script,"base64"))));g.addInput(P)}u.length>100&&console.warn("Creating many inscriptions at once can be slow. Consider using multiple transactions instead.");for(var I,O=h(u);!(I=O()).done;){var E=I.value;if(!E.inscription)throw new Error("Inscription is required for all destinations");if(d)for(var T=0,j=Object.keys(d);T<j.length;T++){var C=j[T];void 0===d[C]&&delete d[C]}g.addOutput({satoshis:1,lockingScript:(new S).lock(E.address,E.inscription,A(d))})}for(var _,N=h(m);!(_=N()).done;){var U=_.value;g.addOutput({satoshis:U.amount,lockingScript:(new t).lock(U.to)})}var D=a.reduce(function(t,n){return t+BigInt(n.satoshis)},0n),F=g.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n);return Promise.resolve(y.computeFee(g)).then(function(n){function r(){return Promise.resolve(g.fee(y)).then(function(){return Promise.resolve(g.sign()).then(function(){return e&&(e.satoshis=g.outputs[g.outputs.length-1].satoshis,e.txid=g.id("hex")),{tx:g,spentOutpoints:a.map(function(t){return t.txid+"_"+t.vout}),payChange:e}})})}var e;if(D>F+BigInt(n)){var o=(new t).lock(f||c.toAddress().toString()),i={lockingScript:o,change:!0};e={txid:"",vout:g.outputs.length,satoshis:0,script:Buffer.from(o.toHex(),"hex").toString("base64")},g.addOutput(i)}var s=function(){if(v)return Promise.resolve(B(g,v)).then(function(t){g=t})}();return s&&s.then?s.then(r):r()})}catch(t){return Promise.reject(t)}};const T="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function j(t,n,r){if(!t.s){if(r instanceof C){if(!r.s)return void(r.o=j.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(j.bind(null,t,n),j.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var C=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{j(e,1,i(this.v))}catch(t){j(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?j(e,1,n?n(o):o):r?j(e,1,r(o)):j(e,2,o)}catch(t){j(e,2,t)}},e},t}();function _(t){return t instanceof C&&1&t.s}var N=function(n){try{var o,a=function(){function r(){return Promise.resolve(f.fee(c)).then(function(){return Promise.resolve(f.sign()).then(function(){return e&&(e.satoshis=f.outputs[f.outputs.length-1].satoshis,e.txid=f.id("hex")),{tx:f,spentOutpoints:l,payChange:e}})})}if(N<U)throw new Error("Not enough ordinals to send");var e;if(N>U+BigInt(D)){var o=(new t).lock(n.changeAddress||n.paymentPk.toAddress().toString()),i={lockingScript:o,change:!0};e={txid:"",vout:f.outputs.length,satoshis:0,script:Buffer.from(o.toHex(),"hex").toString("base64")},f.addOutput(i)}var s=function(){if(n.signer)return Promise.resolve(B(f,n.signer)).then(function(t){f=t})}();return s&&s.then?s.then(r):r()};n.satsPerKb||(n.satsPerKb=b),n.additionalPayments||(n.additionalPayments=[]),void 0===n.enforceUniformSend&&(n.enforceUniformSend=!0);for(var u,c=new i(n.satsPerKb),f=new s,l=[],d=h(n.ordinals);!(u=d()).done;){var v=u.value;if(1!==v.satoshis)throw new Error("1Sat Ordinal utxos must have exactly 1 satoshi");var p=k(v,(new S).unlock(n.ordPk,"all",!0,v.satoshis,r.fromBinary(e.toArray(v.script,"base64"))));l.push(v.txid+"_"+v.vout),f.addInput(p)}if(n.enforceUniformSend&&n.destinations.length!==n.ordinals.length)throw new Error("Number of destinations must match number of ordinals being sent");for(var m,y=h(n.destinations);!(m=y()).done;){var g,w,x,P=m.value;x=null!=(g=P.inscription)&&g.dataB64&&null!=(w=P.inscription)&&w.contentType?(new S).lock(P.address,P.inscription,A(n.metaData)):(new t).lock(P.address),f.addOutput({satoshis:1,lockingScript:x})}for(var I,O=h(n.additionalPayments);!(I=O()).done;){var E=I.value;f.addOutput({satoshis:E.amount,lockingScript:(new t).lock(E.to)})}var N=0n,U=f.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n),D=0,F=function(t,n,r){if("function"==typeof t[T]){var e,o,i,s=t[T]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!_(a))return void a.then(t,i||(i=j.bind(null,o=new C,2)));a=a.v}o?j(o,1,a):o=a}catch(t){j(o||(o=new C),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!_(a))return void a.then(s,o||(o=j.bind(null,e=new C,2)));a=a.v}e?j(e,1,a):e=a}catch(t){j(e||(e=new C),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(n.paymentUtxos,function(i){var s=k(i,(new t).unlock(n.paymentPk,"all",!0,i.satoshis,r.fromBinary(e.toArray(i.script,"base64"))));return l.push(i.txid+"_"+i.vout),f.addInput(s),N+=BigInt(i.satoshis),Promise.resolve(c.computeFee(f)).then(function(t){D=t,N>=U+BigInt(D)&&(o=1)})},function(){return o});return Promise.resolve(F&&F.then?F.then(a):a())}catch(t){return Promise.reject(t)}};const U="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function D(t,n,r){if(!t.s){if(r instanceof F){if(!r.s)return void(r.o=D.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(D.bind(null,t,n),D.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var F=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{D(e,1,i(this.v))}catch(t){D(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?D(e,1,n?n(o):o):r?D(e,1,r(o)):D(e,2,o)}catch(t){D(e,2,t)}},e},t}();function L(t){return t instanceof F&&1&t.s}var q=function(n){try{for(var o,a,u=function(){if(P<I+O)throw new Error("Not enough funds to send. Total sats in: "+P+", Total sats out: "+I+", Fee: "+O);var n;if(P>I+O){var r=(new t).lock(m),e={lockingScript:r,change:!0};n={txid:"",vout:g.outputs.length,satoshis:0,script:Buffer.from(r.toHex(),"hex").toString("base64")},g.addOutput(e)}else P<I+O&&console.log("No change needed");return Promise.resolve(g.fee(y)).then(function(){return Promise.resolve(g.sign()).then(function(){return n&&(n.satoshis=g.outputs[g.outputs.length-1].satoshis,n.txid=g.id("hex")),{tx:g,spentOutpoints:c.map(function(t){return t.txid+"_"+t.vout}),payChange:n}})})},c=n.utxos,f=n.paymentPk,l=n.payments,d=n.satsPerKb,v=void 0===d?b:d,p=n.changeAddress,m=void 0===p?f.toAddress().toString():p,y=new i(v),g=new s,w=h(l);!(a=w()).done;){var S=a.value,x={satoshis:S.amount,lockingScript:(new t).lock(S.to)};g.addOutput(x)}var P=0n,I=g.outputs.reduce(function(t,n){return t+(n.satoshis||0)},0),O=0,B=function(t,n,r){if("function"==typeof t[U]){var e,o,i,s=t[U]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!L(a))return void a.then(t,i||(i=D.bind(null,o=new F,2)));a=a.v}o?D(o,1,a):o=a}catch(t){D(o||(o=new F),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!L(a))return void a.then(s,o||(o=D.bind(null,e=new F,2)));a=a.v}e?D(e,1,a):e=a}catch(t){D(e||(e=new F),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(c,function(n){var i=k(n,(new t).unlock(f,"all",!0,n.satoshis,r.fromBinary(e.toArray(n.script,"base64"))));return g.addInput(i),P+=BigInt(n.satoshis),Promise.resolve(y.computeFee(g)).then(function(t){P>=I+(O=t)&&(o=1)})},function(){return o});return Promise.resolve(B&&B.then?B.then(u):u())}catch(t){return Promise.reject(t)}};const H="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function K(t,n,r){if(!t.s){if(r instanceof M){if(!r.s)return void(r.o=K.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(K.bind(null,t,n),K.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var M=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{K(e,1,i(this.v))}catch(t){K(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?K(e,1,n?n(o):o):r?K(e,1,r(o)):K(e,2,o)}catch(t){K(e,2,t)}},e},t}();function V(t){return t instanceof M&&1&t.s}var X=function(n){try{var o,a=function(){if(it<st+BigInt(at))throw new Error("Not enough funds to purchase listing. Total sats in: "+it+", Total sats out: "+st+", Fee: "+at);return Promise.resolve(D.fee(U)).then(function(){return Promise.resolve(D.sign()).then(function(){var t=D.id("hex");_&&(_.txid=t);var n=D.outputs.findIndex(function(t){return t.change});if(-1!==n){var r=D.outputs[n];N={satoshis:r.satoshis,txid:t,vout:n,script:Buffer.from(r.lockingScript.toBinary()).toString("base64")}}return N&&(N.satoshis=D.outputs[D.outputs.length-1].satoshis,N.txid=D.id("hex")),{tx:D,spentOutpoints:D.inputs.map(function(t){return t.sourceTXID+"_"+t.sourceOutputIndex}),payChange:N,tokenChange:_}})})},u=n.protocol,c=n.tokenID,f=n.utxos,l=n.inputTokens,d=n.distributions,p=n.paymentPk,y=n.ordPk,g=n.changeAddress,w=n.tokenChangeAddress,x=n.satsPerKb,P=void 0===x?b:x,I=n.additionalPayments,O=void 0===I?[]:I,B=n.burn,A=void 0!==B&&B,E=0n,T=0n,j=0n;if(!l.every(function(t){return t.id===c}))throw new Error("Input tokens do not match the provided tokenID");for(var C,_,N,U=new i(P),D=new s,F=h(l);!(C=F()).done;){var L=C.value,q=e.toArray(L.script,"base64"),X=r.fromBinary(q);D.addInput({unlockingScriptTemplate:(new S).unlock(y,"all",!0,L.satoshis,X),sourceTXID:L.txid,sourceOutputIndex:L.vout,sequence:4294967295}),T+=BigInt(L.amt)}for(var R,J=h(d);!(R=J()).done;){var W=R.value,G={p:"bsv-20",op:A?"burn":"transfer",amt:W.amt},Y=void 0;if(u===m.BSV20)Y=v({},G,{tick:c});else{if(u!==m.BSV21)throw new Error("Invalid protocol");Y=v({},G,{id:c})}D.addOutput({satoshis:1,lockingScript:(new S).lock(W.address,{dataB64:Buffer.from(JSON.stringify(Y)).toString("base64"),contentType:"application/bsv20"})}),j+=BigInt(W.amt)}if((E=T-j)<0n)throw new Error("Not enough tokens to send");if(E>0n){var Q,$={p:"bsv-20",op:"transfer",amt:E.toString()};if(u===m.BSV20)Q=v({},$,{tick:c});else{if(u!==m.BSV21)throw new Error("Invalid protocol");Q=v({},$,{id:c})}var z=(new S).lock(w||y.toAddress().toString(),{dataB64:JSON.stringify(Q),contentType:"application/bsv-20"}),Z=D.outputs.length;D.addOutput({lockingScript:z,satoshis:1}),_={id:c,satoshis:1,script:Buffer.from(z.toBinary()).toString("base64"),txid:"",vout:Z,amt:E.toString()}}for(var tt,nt=h(O);!(tt=nt()).done;){var rt=tt.value;D.addOutput({satoshis:rt.amount,lockingScript:(new t).lock(rt.to)})}var et=g||p.toAddress().toString(),ot=(new t).lock(et);D.addOutput({lockingScript:ot,change:!0});var it=0n,st=D.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n),at=0,ut=function(t,n,r){if("function"==typeof t[H]){var e,o,i,s=t[H]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!V(a))return void a.then(t,i||(i=K.bind(null,o=new M,2)));a=a.v}o?K(o,1,a):o=a}catch(t){K(o||(o=new M),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!V(a))return void a.then(s,o||(o=K.bind(null,e=new M,2)));a=a.v}e?K(e,1,a):e=a}catch(t){K(e||(e=new M),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(f,function(n){var i=k(n,(new t).unlock(p,"all",!0,n.satoshis,r.fromBinary(e.toArray(n.script,"base64"))));return D.addInput(i),it+=BigInt(n.satoshis),Promise.resolve(U.computeFee(D)).then(function(t){at=t,it>=st+BigInt(at)&&(o=1)})},function(){return o});return Promise.resolve(ut&&ut.then?ut.then(a):a())}catch(t){return Promise.reject(t)}},R=function(t,n){try{if("collection"===t){var r=n;if(!r.description)return new Error("Collection description is required");if(!r.quantity)return new Error("Collection quantity is required");if(r.rarityLabels){if(!Array.isArray(r.rarityLabels))return new Error("Rarity labels must be an array");if(!r.rarityLabels.every(function(t){return Object.values(t).every(function(t){return"string"==typeof t})}))return new Error("Invalid rarity labels "+r.rarityLabels)}if(r.traits){if("object"!=typeof r.traits)return new Error("Collection traits must be an object");if(r.traits&&!Object.keys(r.traits).every(function(t){return"string"==typeof t&&"object"==typeof r.traits[t]}))return new Error("Collection traits must be a valid CollectionTraits object")}}if("collectionItem"===t){var e=n;if(!e.collectionId)return new Error("Collection id is required");if(!e.collectionId.includes("_"))return new Error("Collection id must be a valid outpoint");if(64!==e.collectionId.split("_")[0].length)return new Error("Collection id must contain a valid txid");if(Number.isNaN(Number.parseInt(e.collectionId.split("_")[1])))return new Error("Collection id must contain a valid vout");if(e.mintNumber&&"number"!=typeof e.mintNumber)return new Error("Mint number must be a number");if(e.rank&&"number"!=typeof e.rank)return new Error("Rank must be a number");if(e.rarityLabel&&"string"!=typeof e.rarityLabel)return new Error("Rarity label must be a string");if(e.traits&&"object"!=typeof e.traits)return new Error("Traits must be an object");if(e.attachments&&!Array.isArray(e.attachments))return new Error("Attachments must be an array")}return}catch(t){return new Error("Invalid JSON data")}},J=/*#__PURE__*/function(){function n(){}var o=n.prototype;return o.lock=function(o,i,s,a){var u=e.fromBase58Check(o).data,c=e.fromBase58Check(i).data,f=new r;if(void 0!==(null==a?void 0:a.dataB64)&&void 0!==(null==a?void 0:a.contentType)){var l=g("ord"),d=Buffer.from(a.dataB64,"base64").toString("hex").trim();if(!d)throw new Error("Invalid file data");var h=g(a.contentType);if(!h)throw new Error("Invalid media type");f=r.fromASM("OP_0 OP_IF "+l+" OP_1 "+h+" OP_0 "+d+" OP_ENDIF")}return f.writeScript(r.fromHex("2097dfd76851bf465e8f715593b217714858bbe9570ff3bd5e33840a34e20ff0262102ba79df5f8ae7604a9830f03c7933028186aede0675a16f025dc4f8be8eec0382201008ce7480da41702918d1ec8e6849ba32b4d65b1e40dc669c31a1e6306b266c0000")).writeBin(u).writeBin(n.buildOutput(s,(new t).lock(c).toBinary())).writeScript(r.fromHex("615179547a75537a537a537a0079537a75527a527a7575615579008763567901c161517957795779210ac407f0e4bd44bfc207355a778b046225a7068fc59ee7eda43ad905aadbffc800206c266b30e6a1319c66dc401e5bd6b432ba49688eecd118297041da8074ce081059795679615679aa0079610079517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01007e81517a75615779567956795679567961537956795479577995939521414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00517951796151795179970079009f63007952799367007968517a75517a75517a7561527a75517a517951795296a0630079527994527a75517a6853798277527982775379012080517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01205279947f7754537993527993013051797e527e54797e58797e527e53797e52797e57797e0079517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a756100795779ac517a75517a75517a75517a75517a75517a75517a75517a75517a7561517a75517a756169587951797e58797eaa577961007982775179517958947f7551790128947f77517a75517a75618777777777777777777767557951876351795779a9876957795779ac777777777777777767006868"))},o.cancelListing=function(n,r,e,o,i){void 0===r&&(r="all"),void 0===e&&(e=!1);var s=(new t).unlock(n,r,e,o,i);return{sign:function(t,n){try{return Promise.resolve(s.sign(t,n)).then(function(t){return t.writeOpCode(a.OP_1)})}catch(t){return Promise.reject(t)}},estimateLength:function(){return Promise.resolve(107)}}},o.purchaseListing=function(t,r){var o={sign:function(o,i){try{var s;if(o.outputs.length<2)throw new Error("Malformed transaction");var u=(new c).writeBin(n.buildOutput(o.outputs[0].satoshis||0,o.outputs[0].lockingScript.toBinary()));if(o.outputs.length>2){for(var l,d=new e.Writer,v=h(o.outputs.slice(2));!(l=v()).done;){var p=l.value;d.write(n.buildOutput(p.satoshis||0,p.lockingScript.toBinary()))}u.writeBin(d.toArray())}else u.writeOpCode(a.OP_0);var m,y=o.inputs[i];if(!t&&y.sourceTransaction)m=y.sourceTransaction.outputs[y.sourceOutputIndex].satoshis;else if(!t)throw new Error("sourceTransaction or sourceSatoshis is required");m=t;var g,b=y.sourceTXID||(null==(s=y.sourceTransaction)?void 0:s.id("hex")),w=r;r||(w=null==(g=y.sourceTransaction)?void 0:g.outputs[y.sourceOutputIndex].lockingScript);var S=f.format({sourceTXID:b,sourceOutputIndex:y.sourceOutputIndex,sourceSatoshis:m,transactionVersion:o.version,otherInputs:[],inputIndex:i,outputs:o.outputs,inputSequence:y.sequence,subscript:w,lockTime:o.lockTime,scope:f.SIGHASH_ALL|f.SIGHASH_ANYONECANPAY|f.SIGHASH_FORKID});return Promise.resolve(u.writeBin(S).writeOpCode(a.OP_0))}catch(t){return Promise.reject(t)}},estimateLength:function(t,n){try{return Promise.resolve(o.sign(t,n)).then(function(t){return t.toBinary().length})}catch(t){return Promise.reject(t)}}};return o},n.buildOutput=function(t,n){var r=new e.Writer;return r.writeUInt64LEBn(new u(t)),r.writeVarIntNum(n.length),r.write(n),r.toArray()},n}(),W="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function G(t,n,r){if(!t.s){if(r instanceof Y){if(!r.s)return void(r.o=G.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(G.bind(null,t,n),G.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var Y=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{G(e,1,i(this.v))}catch(t){G(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?G(e,1,n?n(o):o):r?G(e,1,r(o)):G(e,2,o)}catch(t){G(e,2,t)}},e},t}();function Q(t){return t instanceof Y&&1&t.s}var $=e.toArray,z=function(n){try{var o,a,u=function(){if(C<_+BigInt(N))throw new Error("Not enough funds to purchase listing. Total sats in: "+C+", Total sats out: "+_+", Fee: "+N);return Promise.resolve(w.fee(g)).then(function(){return Promise.resolve(w.sign()).then(function(){var t=w.outputs.findIndex(function(t){return t.change});if(-1!==t){var n=w.outputs[t];a={satoshis:n.satoshis,txid:w.id("hex"),vout:t,script:Buffer.from(n.lockingScript.toBinary()).toString("base64")}}return a&&(a.satoshis=w.outputs[w.outputs.length-1].satoshis,a.txid=w.id("hex")),{tx:w,spentOutpoints:w.inputs.map(function(t){return t.sourceTXID+"_"+t.sourceOutputIndex}),payChange:a}})})},c=n.utxos,f=n.listings,l=n.paymentPk,d=n.ordPk,v=n.changeAddress,p=n.satsPerKb,m=n.additionalPayments,y=void 0===m?[]:m,g=new i(void 0===p?b:p),w=new s;f.length>100&&console.warn("Creating many inscriptions at once can be slow. Consider using multiple transactions instead.");for(var x,P=h(f);!(x=P()).done;){var I=x.value;w.addOutput({satoshis:1,lockingScript:(new J).lock(I.payAddress,I.ordAddress,I.price)});var O=$(I.listingUtxo.script,"base64"),B=r.fromBinary(O);w.addInput({unlockingScriptTemplate:(new S).unlock(d,"all",!0,I.listingUtxo.satoshis,B),sourceTXID:I.listingUtxo.txid,sourceOutputIndex:I.listingUtxo.vout,sequence:4294967295})}for(var A,E=h(y);!(A=E()).done;){var T=A.value;w.addOutput({satoshis:T.amount,lockingScript:(new t).lock(T.to)})}var j=(new t).lock(v||l.toAddress().toString());w.addOutput({lockingScript:j,change:!0});var C=0n,_=w.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n),N=0,U=function(t,n,r){if("function"==typeof t[W]){var e,o,i,s=t[W]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!Q(a))return void a.then(t,i||(i=G.bind(null,o=new Y,2)));a=a.v}o?G(o,1,a):o=a}catch(t){G(o||(o=new Y),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!Q(a))return void a.then(s,o||(o=G.bind(null,e=new Y,2)));a=a.v}e?G(e,1,a):e=a}catch(t){G(e||(e=new Y),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(c,function(n){var i=k(n,(new t).unlock(l,"all",!0,n.satoshis,r.fromBinary(e.toArray(n.script,"base64"))));return w.addInput(i),C+=BigInt(n.satoshis),Promise.resolve(g.computeFee(w)).then(function(t){N=t,C>=_+BigInt(N)&&(o=1)})},function(){return o});return Promise.resolve(U&&U.then?U.then(u):u())}catch(t){return Promise.reject(t)}};const Z="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function tt(t,n,r){if(!t.s){if(r instanceof nt){if(!r.s)return void(r.o=tt.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(tt.bind(null,t,n),tt.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var nt=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{tt(e,1,i(this.v))}catch(t){tt(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?tt(e,1,n?n(o):o):r?tt(e,1,r(o)):tt(e,2,o)}catch(t){tt(e,2,t)}},e},t}();function rt(t){return t instanceof nt&&1&t.s}var et=function(n){try{var o,a=function(){if(T<j+BigInt(C))throw new Error("Not enough funds to purchase listing. Total sats in: "+T+", Total sats out: "+j+", Fee: "+C);return Promise.resolve(S.fee(w)).then(function(){return Promise.resolve(S.sign()).then(function(){var t=S.outputs.findIndex(function(t){return t.change});if(-1!==t){var n=S.outputs[t];g={satoshis:n.satoshis,txid:S.id("hex"),vout:t,script:Buffer.from(n.lockingScript.toBinary()).toString("base64")}}return g&&(g.satoshis=S.outputs[S.outputs.length-1].satoshis,g.txid=S.id("hex")),{tx:S,spentOutpoints:S.inputs.map(function(t){return t.sourceTXID+"_"+t.sourceOutputIndex}),payChange:g}})})},u=n.utxos,c=n.listingUtxos,f=n.ordPk,l=n.paymentPk,d=n.changeAddress,v=n.additionalPayments,p=n.satsPerKb,m=void 0===p?b:p;c.length>100&&console.warn("Creating many inscriptions at once can be slow. Consider using multiple transactions instead.");for(var y,g,w=new i(m),S=new s,x=h(c);!(y=x()).done;){var P=y.value;S.addInput({sourceTXID:P.txid,unlockingScriptTemplate:(new J).cancelListing(f,"all",!0,P.satoshis,r.fromBinary(e.toArray(P.script,"base64"))),sourceOutputIndex:P.vout,sequence:4294967295}),S.addOutput({satoshis:1,lockingScript:(new t).lock(f.toAddress().toString())})}for(var I,O=h(v);!(I=O()).done;){var B=I.value;S.addOutput({satoshis:B.amount,lockingScript:(new t).lock(B.to)})}var A=d||l.toAddress().toString(),E=(new t).lock(A);S.addOutput({lockingScript:E,change:!0});var T=0n,j=S.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n),C=0,_=function(t,n,r){if("function"==typeof t[Z]){var e,o,i,s=t[Z]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!rt(a))return void a.then(t,i||(i=tt.bind(null,o=new nt,2)));a=a.v}o?tt(o,1,a):o=a}catch(t){tt(o||(o=new nt),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!rt(a))return void a.then(s,o||(o=tt.bind(null,e=new nt,2)));a=a.v}e?tt(e,1,a):e=a}catch(t){tt(e||(e=new nt),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(u,function(n){var i=k(n,(new t).unlock(l,"all",!0,n.satoshis,r.fromBinary(e.toArray(n.script,"base64"))));return S.addInput(i),T+=BigInt(n.satoshis),Promise.resolve(w.computeFee(S)).then(function(t){C=t,T>=j+BigInt(C)&&(o=1)})},function(){return o});return Promise.resolve(_&&_.then?_.then(a):a())}catch(t){return Promise.reject(t)}};const ot="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function it(t,n,r){if(!t.s){if(r instanceof st){if(!r.s)return void(r.o=it.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(it.bind(null,t,n),it.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}var st=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){var e=new t,o=this.s;if(o){var i=1&o?n:r;if(i){try{it(e,1,i(this.v))}catch(t){it(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?it(e,1,n?n(o):o):r?it(e,1,r(o)):it(e,2,o)}catch(t){it(e,2,t)}},e},t}();function at(t){return t instanceof st&&1&t.s}var ut=function(n){try{var o,a=function(){if(N<U+BigInt(D))throw new Error("Not enough funds to purchase listing. Total sats in: "+N+", Total sats out: "+U+", Fee: "+D);return Promise.resolve(I.fee(P)).then(function(){return Promise.resolve(I.sign()).then(function(){var t=I.outputs.findIndex(function(t){return t.change});if(-1!==t){var n=I.outputs[t];B={satoshis:n.satoshis,txid:I.id("hex"),vout:t,script:Buffer.from(n.lockingScript.toBinary()).toString("base64")}}return B&&(B.satoshis=I.outputs[I.outputs.length-1].satoshis,B.txid=I.id("hex")),{tx:I,spentOutpoints:I.inputs.map(function(t){return t.sourceTXID+"_"+t.sourceOutputIndex}),payChange:B}})})},u=n.protocol,c=n.tokenID,f=n.utxos,l=n.paymentPk,d=n.listing,p=n.ordAddress,y=n.changeAddress,g=n.additionalPayments,w=void 0===g?[]:g,x=n.satsPerKb,P=new i(void 0===x?b:x),I=new s;I.addInput({unlockingScriptTemplate:(new J).purchaseListing(d.listingUtxo.satoshis,r.fromHex(Buffer.from(d.listingUtxo.script,"base64").toString("hex"))),sourceTXID:d.listingUtxo.txid,sourceOutputIndex:d.listingUtxo.vout,sequence:4294967295});var O,B,A={p:"bsv-20",op:"transfer",amt:d.listingUtxo.amt};if(u===m.BSV20)O=v({},A,{tick:c});else{if(u!==m.BSV21)throw new Error("Invalid protocol");O=v({},A,{id:c})}I.addOutput({satoshis:1,lockingScript:(new S).lock(p,{dataB64:JSON.stringify(O),contentType:"application/bsv-20"})});for(var E,T=h(w);!(E=T()).done;){var j=E.value;I.addOutput({satoshis:j.amount,lockingScript:(new t).lock(j.to)})}var C=y||l.toAddress().toString(),_=(new t).lock(C);I.addOutput({lockingScript:_,change:!0});var N=0n,U=I.outputs.reduce(function(t,n){return t+BigInt(n.satoshis||0)},0n),D=0,F=function(t,n,r){if("function"==typeof t[ot]){var e,o,i,s=t[ot]();if(function t(a){try{for(;!((e=s.next()).done||r&&r());)if((a=n(e.value))&&a.then){if(!at(a))return void a.then(t,i||(i=it.bind(null,o=new st,2)));a=a.v}o?it(o,1,a):o=a}catch(t){it(o||(o=new st),2,t)}}(),s.return){var a=function(t){try{e.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,function(t){throw a(t)});a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,n,r){var e,o,i=-1;return function s(a){try{for(;++i<t.length&&(!r||!r());)if((a=n(i))&&a.then){if(!at(a))return void a.then(s,o||(o=it.bind(null,e=new st,2)));a=a.v}e?it(e,1,a):e=a}catch(t){it(e||(e=new st),2,t)}}(),e}(u,function(t){return n(u[t])},r)}(f,function(n){var i=k(n,(new t).unlock(l,"all",!0,n.satoshis,r.fromBinary(e.toArray(n.script,"base64"))));return I.addInput(i),N+=BigInt(n.satoshis),Promise.resolve(P.computeFee(I)).then(function(t){D=t,N>=U+BigInt(D)&&(o=1)})},function(){return o});return Promise.resolve(F&&F.then?F.then(a):a())}catch(t){return Promise.reject(t)}};export{J as OrdLock,S as OrdP2PKH,y as RoytaltyType,m as TokenType,et as cancelOrdListings,z as createOrdListings,E as createOrdinals,I as fetchNftUtxos,P as fetchPayUtxos,O as fetchTokenUtxos,ut as purchaseOrdListings,N as sendOrdinals,q as sendUtxos,A as stringifyMetaData,X as transferOrdTokens,R as validateSubTypeData};
//# sourceMappingURL=index.module.js.map

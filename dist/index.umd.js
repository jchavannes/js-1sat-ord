!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("bsv-wasm"),require("buffer"),require("dotenv"),require("sigma-protocol")):"function"==typeof define&&define.amd?define(["exports","bsv-wasm","buffer","dotenv","sigma-protocol"],r):r((t||self).js1SatOrd={},t.bsvWasm,t.buffer,t.dotenv,t.sigmaProtocol)}(this,function(t,r,e,n,i){function o(t){if(t&&t.__esModule)return t;var r=Object.create(null);return t&&Object.keys(t).forEach(function(e){if("default"!==e){var n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(r,e,n.get?n:{enumerable:!0,get:function(){return t[e]}})}}),r.default=t,r}function s(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function a(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,r){if(t){if("string"==typeof t)return s(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u=function(t){for(var r=[],e=0,n=t.length;e<n;e++){var i=Number(t.charCodeAt(e)).toString(16);r.push(i)}return r.join("")};/*#__PURE__*/o(n).config();var c=function(t,n,i,o){var s=u("ord"),a=e.Buffer.from(n,"base64").toString("hex"),c=u(i),_=t.get_locking_script().to_asm_string()+" OP_0 OP_IF "+s+" OP_1 "+c+" OP_0 "+a+" OP_ENDIF";if(o&&null!=o&&o.app&&null!=o&&o.type){_=_+" OP_RETURN "+u("1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5")+" "+u("SET");for(var f=0,g=Object.entries(o);f<g.length;f++){var p=g[f],l=p[0],d=p[1];"cmd"!==l&&(_=_+" "+u(l)+" "+u(d))}}return r.Script.from_asm_string(_)};t.buildInscription=c,t.createOrdinal=function(t,n,o,s,a,u,_,f){try{var g=new r.Transaction(1,0),p=new r.TxIn(e.Buffer.from(t.txid,"hex"),t.vout,r.Script.from_asm_string(""));g.add_input(p);var l=c(r.P2PKHAddress.from_string(n),u.dataB64,u.contentType,_),d=new r.TxOut(BigInt(1),l);g.add_output(d);var m=r.P2PKHAddress.from_string(s).get_locking_script(),h=new r.TxOut(BigInt(1),m),v=Math.ceil(a*(g.get_size()+h.to_bytes().byteLength)),b=t.satoshis-1-v;if(b<0)throw new Error("Inadequate satoshis for fee");if(b>0){var y=new r.TxOut(BigInt(b),m);g.add_output(y)}var x=g.sign(o,r.SigHash.ALL|r.SigHash.FORKID,0,r.Script.from_asm_string(t.script),BigInt(t.satoshis));return p.set_unlocking_script(r.Script.from_asm_string(x.to_hex()+" "+o.to_public_key().to_hex())),g.set_input(0,p),f&&(g=new i.Sigma(g).sign(f).signedTx),Promise.resolve(g)}catch(t){return Promise.reject(t)}},t.sendOrdinal=function(t,n,i,o,s,a,u,_,f){try{var g=new r.Transaction(1,0),p=new r.TxIn(e.Buffer.from(n.txid,"hex"),n.vout,r.Script.from_asm_string(""));g.add_input(p);var l,d=new r.TxIn(e.Buffer.from(t.txid,"hex"),t.vout,r.Script.from_asm_string(""));g.add_input(d);var m=r.P2PKHAddress.from_string(u);l=null!=_&&_.dataB64&&null!=_&&_.contentType?c(m,_.dataB64,_.contentType,f):m.get_locking_script();var h=new r.TxOut(BigInt(1),l);g.add_output(h);var v=r.P2PKHAddress.from_string(o).get_locking_script(),b=new r.TxOut(BigInt(1),v),y=Math.ceil(s*(g.get_size()+b.to_bytes().byteLength)),x=new r.TxOut(BigInt(t.satoshis-y),v);g.add_output(x);var S=g.sign(a,r.SigHash.InputOutput,0,r.Script.from_asm_string(n.script),BigInt(n.satoshis));p.set_unlocking_script(r.Script.from_asm_string(S.to_hex()+" "+a.to_public_key().to_hex())),g.set_input(0,p);var O=g.sign(i,r.SigHash.InputOutput,1,r.Script.from_asm_string(t.script),BigInt(t.satoshis));return d.set_unlocking_script(r.Script.from_asm_string(O.to_hex()+" "+i.to_public_key().to_hex())),g.set_input(1,d),Promise.resolve(g)}catch(t){return Promise.reject(t)}},t.sendUtxos=function(t,n,i,o){try{for(var s,u=new r.Transaction(1,0),c=0,_=a(t||[]);!(s=_()).done;)c+=s.value.satoshis;var f=c-o;console.log({feeSats:o,satsIn:c,satsOut:f}),u.add_output(new r.TxOut(BigInt(f),i.get_locking_script()));for(var g,p=0,l=a(t||[]);!(g=l()).done;){var d=g.value;console.log({u:d});var m=new r.TxIn(e.Buffer.from(d.txid,"hex"),d.vout,r.Script.from_asm_string(""));console.log({inx:m}),m.set_satoshis(BigInt(d.satoshis)),u.add_input(m);var h=u.sign(n,r.SigHash.InputOutputs,p,r.Script.from_asm_string(d.script),BigInt(d.satoshis));m.set_unlocking_script(r.Script.from_asm_string(h.to_hex()+" "+n.to_public_key().to_hex())),u.set_input(p,m),p++}return Promise.resolve(u)}catch(t){return Promise.reject(t)}}});
//# sourceMappingURL=index.umd.js.map

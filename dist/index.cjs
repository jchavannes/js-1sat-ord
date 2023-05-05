var t=require("bsv-wasm"),r=require("buffer"),e=require("dotenv"),n=require("sigma-protocol");function i(t){if(t&&t.__esModule)return t;var r=Object.create(null);return t&&Object.keys(t).forEach(function(e){if("default"!==e){var n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(r,e,n.get?n:{enumerable:!0,get:function(){return t[e]}})}}),r.default=t,r}function o(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function s(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,r){if(t){if("string"==typeof t)return o(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a=function(t){for(var r=[],e=0,n=t.length;e<n;e++){var i=Number(t.charCodeAt(e)).toString(16);r.push(i)}return r.join("")};/*#__PURE__*/i(e).config();var u=function(e,n,i,o){var s=a("ord"),u=r.Buffer.from(n,"base64").toString("hex"),c=a(i),_=e.get_locking_script().to_asm_string()+" OP_0 OP_IF "+s+" OP_1 "+c+" OP_0 "+u+" OP_ENDIF";if(o&&null!=o&&o.app&&null!=o&&o.type){_=_+" OP_RETURN "+a("1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5")+" "+a("SET");for(var g=0,p=Object.entries(o);g<p.length;g++){var f=p[g],l=f[0],d=f[1];"cmd"!==l&&(_=_+" "+a(l)+" "+a(d))}}return t.Script.from_asm_string(_)};exports.buildInscription=u,exports.createOrdinal=function(e,i,o,s,a,c,_,g){try{var p=new t.Transaction(1,0),f=new t.TxIn(r.Buffer.from(e.txid,"hex"),e.vout,t.Script.from_asm_string(""));p.add_input(f);var l=u(t.P2PKHAddress.from_string(i),c.dataB64,c.contentType,_),d=new t.TxOut(BigInt(1),l);p.add_output(d);var m=t.P2PKHAddress.from_string(s).get_locking_script(),h=new t.TxOut(BigInt(1),m),v=Math.ceil(a*(p.get_size()+h.to_bytes().byteLength)),x=e.satoshis-1-v;if(x<0)throw new Error("Inadequate satoshis for fee");if(x>0){var y=new t.TxOut(BigInt(x),m);p.add_output(y)}var b=p.sign(o,t.SigHash.ALL|t.SigHash.FORKID,0,t.Script.from_asm_string(e.script),BigInt(e.satoshis));return f.set_unlocking_script(t.Script.from_asm_string(b.to_hex()+" "+o.to_public_key().to_hex())),p.set_input(0,f),g&&(p=new n.Sigma(p).sign(g).signedTx),Promise.resolve(p)}catch(t){return Promise.reject(t)}},exports.sendOrdinal=function(e,n,i,o,s,a,c,_,g){try{var p=new t.Transaction(1,0),f=new t.TxIn(r.Buffer.from(n.txid,"hex"),n.vout,t.Script.from_asm_string(""));p.add_input(f);var l,d=new t.TxIn(r.Buffer.from(e.txid,"hex"),e.vout,t.Script.from_asm_string(""));p.add_input(d);var m=t.P2PKHAddress.from_string(c);l=null!=_&&_.dataB64&&null!=_&&_.contentType?u(m,_.dataB64,_.contentType,g):m.get_locking_script();var h=new t.TxOut(BigInt(1),l);p.add_output(h);var v=t.P2PKHAddress.from_string(o).get_locking_script(),x=new t.TxOut(BigInt(1),v),y=Math.ceil(s*(p.get_size()+x.to_bytes().byteLength)),b=new t.TxOut(BigInt(e.satoshis-y),v);p.add_output(b);var S=p.sign(a,t.SigHash.InputOutput,0,t.Script.from_asm_string(n.script),BigInt(n.satoshis));f.set_unlocking_script(t.Script.from_asm_string(S.to_hex()+" "+a.to_public_key().to_hex())),p.set_input(0,f);var I=p.sign(i,t.SigHash.InputOutput,1,t.Script.from_asm_string(e.script),BigInt(e.satoshis));return d.set_unlocking_script(t.Script.from_asm_string(I.to_hex()+" "+i.to_public_key().to_hex())),p.set_input(1,d),Promise.resolve(p)}catch(t){return Promise.reject(t)}},exports.sendUtxos=function(e,n,i,o){try{for(var a,u=new t.Transaction(1,0),c=0,_=s(e||[]);!(a=_()).done;)c+=a.value.satoshis;var g=c-o;console.log({feeSats:o,satsIn:c,satsOut:g}),u.add_output(new t.TxOut(BigInt(g),i.get_locking_script()));for(var p,f=0,l=s(e||[]);!(p=l()).done;){var d=p.value;console.log({u:d});var m=new t.TxIn(r.Buffer.from(d.txid,"hex"),d.vout,t.Script.from_asm_string(""));console.log({inx:m}),m.set_satoshis(BigInt(d.satoshis)),u.add_input(m);var h=u.sign(n,t.SigHash.InputOutputs,f,t.Script.from_asm_string(d.script),BigInt(d.satoshis));m.set_unlocking_script(t.Script.from_asm_string(h.to_hex()+" "+n.to_public_key().to_hex())),u.set_input(f,m),f++}return Promise.resolve(u)}catch(t){return Promise.reject(t)}};
//# sourceMappingURL=index.cjs.map

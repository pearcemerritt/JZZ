!function(){function a(){this._orig=this,this._ready=!1,this._queue=[],this._err=[]}function b(a,b){setTimeout(function(){a._resume()},b)}function c(a){a instanceof Function?a.apply(this):console.log(a)}function d(a){a instanceof Function?a.apply(this):console.log(a)}function e(a){if(!a.length)return void this._break();var b=a.shift();if(a.length){var c=this;this._slip(d,[function(){e.apply(c,[a])}])}try{this._repair(),b.apply(this)}catch(f){this._break(f.toString())}}function f(a,b){for(var c in a)if(a[c]===b)return;a.push(b)}function g(a,b){for(var c in a)if(a[c]===b)return void a.splice(c,1)}function h(){a.apply(this)}function i(){h.prototype._time||(h.prototype._time=function(){return Date.now()}),h.prototype._startTime=h.prototype._time(),h.prototype.time=function(){return h.prototype._time()-h.prototype._startTime}}function j(a){if(a instanceof Object){var b=a instanceof Array?[]:{};for(var c in a)b[c]=j(a[c]);return b}return a}function k(){this._info.engine=V._type,this._info.inputs=[],this._info.outputs=[],S=[],T=[],V._allOuts={},V._allIns={};var a,b;for(a=0;a<V._outs.length;a++)b=V._outs[a],b.engine=V,V._allOuts[b.name]=b,this._info.outputs.push({name:b.name,manufacturer:b.manufacturer,version:b.version,engine:V._type}),S.push(b);for(a=0;a<W._outs.length;a++)b=W._outs[a],this._info.outputs.push({name:b.name,manufacturer:b.manufacturer,version:b.version,engine:b.type}),S.push(b);for(a=0;a<V._ins.length;a++)b=V._ins[a],b.engine=V,V._allIns[b.name]=b,this._info.inputs.push({name:b.name,manufacturer:b.manufacturer,version:b.version,engine:V._type}),T.push(b);for(a=0;a<W._ins.length;a++)b=W._ins[a],this._info.inputs.push({name:b.name,manufacturer:b.manufacturer,version:b.version,engine:b.type}),T.push(b)}function l(){this._slip(k,[]),V._refresh()}function m(a,b){if(void 0===a)return b.slice();var c,d,e=[];if(a instanceof RegExp){for(d=0;d<b.length;d++)a.test(b[d].name)&&e.push(b[d]);return e}for(a instanceof Function&&(a=a(b)),a instanceof Array||(a=[a]),c=0;c<a.length;c++)for(d=0;d<b.length;d++)(a[c]+""==d+""||a[c]===b[d].name||a[c]instanceof Object&&a[c].name===b[d].name)&&e.push(b[d]);return e}function n(a,b){var c;c=b instanceof RegExp?"Port matching "+b+" not found":b instanceof Object||void 0===b?"Port not found":'Port "'+b+'" not found',a._crash(c)}function o(a,b){function c(a){return function(){a.engine._openOut(this,a.name)}}var d=m(b,S);if(!d.length)return void n(a,b);for(var f=0;f<d.length;f++)d[f]=c(d[f]);a._slip(e,[d]),a._resume()}function p(a,b){function c(a){return function(){a.engine._openIn(this,a.name)}}var d=m(b,T);if(!d.length)return void n(a,b);for(var f=0;f<d.length;f++)d[f]=c(d[f]);a._slip(e,[d]),a._resume()}function q(a){V._close(),this._break(),a._resume()}function r(){a.apply(this)}function s(a){this._impl._close&&this._impl._close(this),this._break("closed"),a._resume()}function t(a){this._impl._send(a)}function u(){a.apply(this),this._handles=[],this._outs=[]}function v(a){a instanceof Function?f(this._orig._handles,a):f(this._orig._outs,a)}function w(a){a instanceof Function?g(this._orig._handles,a):g(this._orig._outs,a)}function x(a){this._impl._close&&this._impl._close(this),this._break(),a._resume()}function y(){return"undefined"!=typeof module&&module.exports?void F(require("jazz-midi")):void this._break()}function z(){var a=document.createElement("div");a.style.visibility="hidden",document.body.appendChild(a);var b=document.createElement("object");return b.style.visibility="hidden",b.style.width="0px",b.style.height="0px",b.classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90",b.isJazz?(document.body.appendChild(b),void G(b)):(b.type="audio/x-jazz",document.body.appendChild(b),b.isJazz?void H(b):void this._break())}function A(){function a(a){I(a),c._resume()}function b(a){c._break(a),c._resume()}if(navigator.requestMIDIAccess){var c=this,d={};return this._options&&this._options.sysex===!0&&(d.sysex=!0),navigator.requestMIDIAccess(d).then(a,b),void this._pause()}this._break()}function B(){this._pause();var a=this;setTimeout(function(){a._crash()},0)}function C(a){U=new h,U._options=a,U._push(e,[[y,B,z,A,D]]),U.refresh(),U._push(i,[]),U._push(function(){S.length||T.length||this._break()},[]),U._resume()}function D(){V._type="none",V._refresh=function(){V._outs=[],V._ins=[]}}function E(){V._pool=[],V._inArr=[],V._outArr=[],V._inMap={},V._outMap={},V._refresh=function(){V._outs=[],V._ins=[];var a,b;for(a=0;(b=V._main.MidiOutInfo(a)).length;a++)V._outs.push({type:V._type,name:b[0],manufacturer:b[1],version:b[2]});for(a=0;(b=V._main.MidiInInfo(a)).length;a++)V._ins.push({type:V._type,name:b[0],manufacturer:b[1],version:b[2]})},V._openOut=function(a,b){var c=V._outMap[b];if(!c){V._pool.length<=V._outArr.length&&V._pool.push(V._newPlugin()),c={name:b,clients:[],info:{name:b,manufacturer:V._allOuts[b].manufacturer,version:V._allOuts[b].version,type:"MIDI-out",engine:V._type},_close:function(a){V._closeOut(a)},_send:function(a){this.plugin.MidiOutRaw(a.slice())}};var d=V._pool[V._outArr.length];c.plugin=d,V._outArr.push(c),V._outMap[b]=c}if(!c.open){var e=c.plugin.MidiOutOpen(b);if(e!==b)return e&&c.plugin.MidiOutClose(),void a._break();c.open=!0}a._orig._impl=c,f(c.clients,a._orig)},V._openIn=function(a,b){function c(a){return function(b,c){a.handle(b,c)}}var d=V._inMap[b];if(!d){V._pool.length<=V._inArr.length&&V._pool.push(V._newPlugin()),d={name:b,clients:[],info:{name:b,manufacturer:V._allIns[b].manufacturer,version:V._allIns[b].version,type:"MIDI-in",engine:V._type},_close:function(a){V._closeIn(a)},handle:function(a,b){for(var c in this.clients){var d=J(b);this.clients[c]._event(d)}}};var e=V._pool[V._inArr.length];d.plugin=e,V._inArr.push(d),V._inMap[b]=d}if(!d.open){var g=e.MidiInOpen(b,c(d));if(g!==b)return g&&e.MidiInClose(),void a._break();d.open=!0}a._orig._impl=d,f(d.clients,a._orig)},V._closeOut=function(a){var b=a._impl;g(b.clients,a._orig),b.clients.length||(b.open=!1,b.plugin.MidiOutClose())},V._closeIn=function(a){var b=a._impl;g(b.clients,a._orig),b.clients.length||(b.open=!1,b.plugin.MidiInClose())},V._close=function(){for(var a in V._inArr)V._inArr[a].open&&V._inArr[a].plugin.MidiInClose()},h.prototype._time=function(){return V._main.Time()}}function F(a){V._type="node",V._main=a,V._pool=[],V._newPlugin=function(){return new a.MIDI},E()}function G(a){V._type="msie",V._main=a,V._pool=[a],V._newPlugin=function(){var b=document.createElement("object");return b.style.visibility="hidden",b.style.width="0px",a.style.height="0px",b.classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90",document.body.appendChild(b),b.isJazz?b:void 0},E()}function H(a){V._type="npapi",V._main=a,V._pool=[a],V._newPlugin=function(){var b=document.createElement("object");return b.style.visibility="hidden",b.style.width="0px",a.style.height="0px",b.type="audio/x-jazz",document.body.appendChild(b),b.isJazz?b:void 0},E()}function I(a){V._type="webmidi",V._access=a,V._inMap={},V._outMap={},V._refresh=function(){V._outs=[],V._ins=[],V._access.outputs.forEach(function(a,b){V._outs.push({type:V._type,name:a.name,manufacturer:a.manufacturer,version:a.version})}),V._access.inputs.forEach(function(a,b){V._ins.push({type:V._type,name:a.name,manufacturer:a.manufacturer,version:a.version})})},V._openOut=function(a,b){var c=V._outMap[b];if(!c){c={name:b,clients:[],info:{name:b,manufacturer:V._allOuts[b].manufacturer,version:V._allOuts[b].version,engine:V._type},_close:function(a){V._closeOut(a)},_send:function(a){this.dev.send(a.slice())}};V._access.outputs.forEach(function(a,d){a.name===b&&(c.dev=a)}),c.dev?V._outMap[b]=c:c=void 0}c?(a._orig._impl=c,f(c.clients,a._orig)):a._break()},V._openIn=function(a,b){function c(a){return function(b){a.handle(b)}}var d=V._inMap[b];if(!d){d={name:b,clients:[],info:{name:b,manufacturer:V._allIns[b].manufacturer,version:V._allIns[b].version,engine:V._type},_close:function(a){V._closeIn(a)},handle:function(a){for(var b in this.clients){var c=J([].slice.call(a.data));this.clients[b]._event(c)}}};V._access.inputs.forEach(function(a,c){a.name===b&&(d.dev=a)}),d.dev?(d.dev.onmidimessage=c(d),V._inMap[b]=d):d=void 0}d?(a._orig._impl=d,f(d.clients,a._orig)):a._break()},V._closeOut=function(a){var b=a._impl;g(b.clients,a._orig)},V._closeIn=function(a){var b=a._impl;g(b.clients,a._orig)},V._close=function(){}}function J(a){var b=this instanceof J?this:b=new J;if(!arguments.length)return b;for(var c=a instanceof Array?a:arguments,d=0;d<c.length;d++){var e=c[d];1==d&&b[0]>=128&&b[0]<=175&&(e=J.noteValue(e)),(e!=parseInt(e)||0>e||e>255)&&K(c[d]),b.push(e)}return b}function K(a){throw RangeError("Bad MIDI value: "+a)}function L(a){return(a!=parseInt(a)||0>a||a>15)&&K(a),a}function M(a){return(a!=parseInt(a)||0>a||a>127)&&K(a),a}function N(a){return(a!=parseInt(a)||0>a||a>16383)&&K(a),127&a}function O(a){return(a!=parseInt(a)||0>a||a>16383)&&K(a),a>>7}function P(a,b){J[a]=function(){return new J(b.apply(0,arguments))},r.prototype[a]=function(){return this.send(b.apply(0,arguments)),this}}function Q(a){for(var b=[],c=0;c<a.length;c++)b[c]=(a[c]<16?"0":"")+a[c].toString(16);return b.join(" ")}var R="0.2.1";a.prototype._exec=function(){for(;this._ready&&this._queue.length;){var a=this._queue.shift();this._orig._bad?this._orig._hope&&a[0]==d?(this._orig._hope=!1,a[0].apply(this,a[1])):(this._queue=[],this._orig._hope=!1):a[0]!=d&&a[0].apply(this,a[1])}},a.prototype._push=function(b,c){this._queue.push([b,c]),a.prototype._exec.apply(this)},a.prototype._slip=function(a,b){this._queue.unshift([a,b])},a.prototype._pause=function(){this._ready=!1},a.prototype._resume=function(){this._ready=!0,a.prototype._exec.apply(this)},a.prototype._break=function(a){this._orig._bad=!0,this._orig._hope=!0,a&&this._orig._err.push(a)},a.prototype._repair=function(){this._orig._bad=!1},a.prototype._crash=function(a){this._break(a),this._resume()},a.prototype.err=function(){return j(this._err)},a.prototype.wait=function(a){function c(){}if(!a)return this;c.prototype=this._orig;var d=new c;return d._ready=!1,d._queue=[],this._push(b,[d,a]),d},a.prototype.and=function(a){return this._push(c,[a]),this},a.prototype.or=function(a){return this._push(d,[a]),this},h.prototype=new a,h.prototype.time=function(){return 0},"undefined"!=typeof performance&&performance.now&&(h.prototype._time=function(){return performance.now()}),h.prototype._info={name:"JZZ.js",version:R},h.prototype.info=function(){return j(this._info)};var S=[],T=[];h.prototype.refresh=function(){return this._push(l,[]),this},h.prototype.openMidiOut=function(a){var b=new r;return this._push(l,[]),this._push(o,[b,a]),b},h.prototype.openMidiIn=function(a){var b=new u;return this._push(l,[]),this._push(p,[b,a]),b},h.prototype.close=function(){var b=new a;return this._push(q,[b]),b},r.prototype=new a,r.prototype.name=function(){return this._impl?this._impl.name:void 0},r.prototype.info=function(){return this._impl?j(this._impl.info):{}},r.prototype.close=function(){var b=new a;return this._push(s,[b]),b},r.prototype.send=function(){return this._push(t,[J.apply(null,arguments)]),this},r.prototype.note=function(a,b,c,d){return this.noteOn(a,b,c),d&&this.wait(d).noteOff(a,b),this},u.prototype=new a,u.prototype.name=r.prototype.name,u.prototype.info=r.prototype.info,u.prototype._event=function(a){for(var b in this._handles)this._handles[b].apply(this,[a]);for(var b in this._outs)this._outs[b]._send(a)},u.prototype.connect=function(a){return this._push(v,[a]),this},u.prototype.disconnect=function(a){return this._push(w,[a]),this},u.prototype.close=function(){var b=new a;return this._push(x,[b]),b};var U,V={},W={_outs:[],_ins:[]};JZZ=function(a){return U||C(a),U},JZZ._openMidiOut=function(a,b){var c=new r;return b._openOut(c,a),c},JZZ._openMidiIn=function(a,b){var c=new u;return b._openIn(c,a),c},JZZ._registerMidiOut=function(a,b){for(var c in W._outs)if(W._outs[c].name==a)return!1;var d=b._info(a);return d.engine=b,W._outs.push(d),U&&U._bad&&(U._repair(),U._resume()),!0},JZZ._registerMidiIn=function(a,b){for(var c in W._ins)if(W._ins[c].name==a)return!1;var d=b._info(a);return d.engine=b,W._ins.push(d),U&&U._bad&&(U._repair(),U._resume()),!0},J.prototype=[],J.prototype.constructor=J;var X={};J.noteValue=function(a){return X[a.toString().toLowerCase()]};var Y={c:0,d:2,e:4,f:5,g:7,a:9,b:11,h:11};for(var Z in Y)for(var $=0;12>$;$++){var _=Y[Z]+12*$;if(_>127)break;X[Z+$]=_,_>0&&(X[Z+"b"+$]=_-1,X[Z+"bb"+$]=_-2),127>_&&(X[Z+"#"+$]=_+1,X[Z+"##"+$]=_+2)}for(var $=0;128>$;$++)X[$]=$;var aa={noteOff:function(a,b){return[128+L(a),M(J.noteValue(b)),0]},noteOn:function(a,b,c){return[144+L(a),M(J.noteValue(b)),M(c)]},aftertouch:function(a,b,c){return[160+L(a),M(J.noteValue(b)),M(c)]},control:function(a,b,c){return[176+L(a),M(b),M(c)]},program:function(a,b){return[192+L(a),M(b)]},pressure:function(a,b){return[208+L(a),M(b)]},pitchBend:function(a,b){return[224+L(a),N(b),O(b)]},bankMSB:function(a,b){return[176+L(a),0,M(b)]},bankLSB:function(a,b){return[176+L(a),32,M(b)]},modMSB:function(a,b){return[176+L(a),1,M(b)]},modLSB:function(a,b){return[176+L(a),33,M(b)]},breathMSB:function(a,b){return[176+L(a),2,M(b)]},breathLSB:function(a,b){return[176+L(a),34,M(b)]},footMSB:function(a,b){return[176+L(a),4,M(b)]},footLSB:function(a,b){return[176+L(a),36,M(b)]},portamentoMSB:function(a,b){return[176+L(a),5,M(b)]},portamentoLSB:function(a,b){return[176+L(a),37,M(b)]},volumeMSB:function(a,b){return[176+L(a),7,M(b)]},volumeLSB:function(a,b){return[176+L(a),39,M(b)]},balanceMSB:function(a,b){return[176+L(a),8,M(b)]},balanceLSB:function(a,b){return[176+L(a),40,M(b)]},panMSB:function(a,b){return[176+L(a),10,M(b)]},panLSB:function(a,b){return[176+L(a),42,M(b)]},expressionMSB:function(a,b){return[176+L(a),11,M(b)]},expressionLSB:function(a,b){return[176+L(a),43,M(b)]},damper:function(a,b){return[176+L(a),64,b?127:0]},portamento:function(a,b){return[176+L(a),65,b?127:0]},sostenuto:function(a,b){return[176+L(a),66,b?127:0]},soft:function(a,b){return[176+L(a),67,b?127:0]},allSoundOff:function(a){return[176+L(a),120,0]},allNotesOff:function(a){return[176+L(a),123,0]}};for(var Z in aa)P(Z,aa[Z]);J.prototype.toString=function(){if(!this.length)return"empty";var a=Q(this);if(this[0]<128)return a;a+=" -- ";var b={241:"Time Code",242:"Song Position",243:"Song Select",244:"Undefined",245:"Undefined",246:"Tune request",248:"Timing clock",249:"Undefined",250:"Start",251:"Continue",252:"Stop",253:"Undefined",254:"Active Sensing",255:"Reset"}[this[0]];if(b)return a+b;var c=this[0]>>4;return(b={8:"Note Off",10:"Aftertouch",12:"Program Change",13:"Channel Aftertouch",14:"Pitch Wheel"}[c])?a+b:9==c?a+(this[2]?"Note On":"Note Off"):11!=c?a:(b={0:"Bank Select MSB",1:"Modulation Wheel MSB",2:"Breath Controller MSB",4:"Foot Controller MSB",5:"Portamento Time MSB",6:"Data Entry MSB",7:"Channel Volume MSB",8:"Balance MSB",10:"Pan MSB",11:"Expression Controller MSB",12:"Effect Control 1 MSB",13:"Effect Control 2 MSB",16:"General Purpose Controller 1 MSB",17:"General Purpose Controller 2 MSB",18:"General Purpose Controller 3 MSB",19:"General Purpose Controller 4 MSB",32:"Bank Select LSB",33:"Modulation Wheel LSB",34:"Breath Controller LSB",36:"Foot Controller LSB",37:"Portamento Time LSB",38:"Data Entry LSB",39:"Channel Volume LSB",40:"Balance LSB",42:"Pan LSB",43:"Expression Controller LSB",44:"Effect control 1 LSB",45:"Effect control 2 LSB",48:"General Purpose Controller 1 LSB",49:"General Purpose Controller 2 LSB",50:"General Purpose Controller 3 LSB",51:"General Purpose Controller 4 LSB",64:"Damper Pedal On/Off",65:"Portamento On/Off",66:"Sostenuto On/Off",67:"Soft Pedal On/Off",68:"Legato Footswitch",69:"Hold 2",70:"Sound Controller 1",71:"Sound Controller 2",72:"Sound Controller 3",73:"Sound Controller 4",74:"Sound Controller 5",75:"Sound Controller 6",76:"Sound Controller 7",77:"Sound Controller 8",78:"Sound Controller 9",79:"Sound Controller 10",80:"General Purpose Controller 5",81:"General Purpose Controller 6",82:"General Purpose Controller 7",83:"General Purpose Controller 8",84:"Portamento Control",88:"High Resolution Velocity Prefix",91:"Effects 1 Depth",92:"Effects 2 Depth",93:"Effects 3 Depth",94:"Effects 4 Depth",95:"Effects 5 Depth",96:"Data Increment",97:"Data Decrement",98:"Non-Registered Parameter Number LSB",99:"Non-Registered Parameter Number MSB",100:"Registered Parameter Number LSB",101:"Registered Parameter Number MSB",120:"All Sound Off",121:"Reset All Controllers",122:"Local Control On/Off",123:"All Notes Off",124:"Omni Mode Off",125:"Omni Mode On",126:"Mono Mode On",127:"Poly Mode On"}[this[1]],b||(b="Undefined"),a+b)},JZZ.MIDI=J,JZZ.util={},JZZ.util.iosSound=function(){if(JZZ.util.iosSound=function(){},window){var a=window.AudioContext||window.webkitAudioContext;if(a){var b=new a;b.createGain||(b.createGain=b.createGainNode);var c=b.createOscillator(),d=b.createGain();d.gain.value=0,c.connect(d),d.connect(b.destination),c.start||(c.start=c.noteOn),c.stop||(c.stop=c.noteOff),c.start(0),c.stop(1)}}}}();
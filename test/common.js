﻿var assert = require('assert');
var JZZ = require('..');
var test = require('./tests.js')(JZZ, { engine: ['webmidi', 'none'] });

describe('Info', function() {
  console.log('Node:', process.versions.node);
  console.log('process.platform:', process.platform);
  console.log('process.arch:', process.arch);
  console.log('JZZ:', JZZ.info().ver);
});

describe('MIDI messages', function() {
  it('empty', function() {
    var msg = JZZ.MIDI();
    var dummy = 'dummy';
    msg._stamp(dummy);
    msg._stamp(dummy);
    assert.equal(msg._stamped(dummy), true);
    msg._unstamp(dummy);
    msg._unstamp();
    assert.equal(msg.toString(), 'empty');
  });
  it('noteOn', function() {
    var msg = JZZ.MIDI.noteOn(1, 'C5', 20);
    assert.equal(msg.getChannel(), 1);
    assert.equal(msg.getNote(), 60);
    assert.equal(msg.getVelocity(), 20);
    assert.equal(msg.isNoteOn(), true);
    assert.equal(msg.isNoteOff(), false);
    msg.setChannel(0).setNote('c6').setVelocity(127);
    assert.equal(msg.toString(), '90 48 7f -- Note On');
    msg.setVelocity(0);
    assert.equal(msg.isNoteOn(), false);
    assert.equal(msg.isNoteOff(), true);
    assert.equal(msg.toString(), '90 48 00 -- Note Off');
    msg.setSysExChannel(20);
    assert.equal(msg.getSysExChannel(), undefined);
  });
  it('noteOff', function() {
    var msg = JZZ.MIDI.noteOff(0, 'C6');
    assert.equal(msg.isNoteOn(), false);
    assert.equal(msg.isNoteOff(), true);
    assert.equal(msg.toString(), '80 48 40 -- Note Off');
    assert.equal(JZZ.MIDI.noteOff('0', 'C6').toString(), '80 48 40 -- Note Off');
  });
  it('aftertouch', function() {
    assert.equal(JZZ.MIDI.aftertouch(0, 'C6', 127).toString(), 'a0 48 7f -- Aftertouch');
  });
  it('control', function() {
    assert.equal(JZZ.MIDI.control(0, 6, 15).toString(), 'b0 06 0f -- Data Entry MSB');
    assert.equal(JZZ.MIDI.control('0', '6', '15').toString(), 'b0 06 0f -- Data Entry MSB');
  });
  it('program', function() {
    assert.equal(JZZ.MIDI.program(0, 0).toString(), 'c0 00 -- Program Change');
  });
  it('pressure', function() {
    assert.equal(JZZ.MIDI.pressure(0, 127).toString(), 'd0 7f -- Channel Aftertouch');
  });
  it('pitchBend', function() {
    assert.equal(JZZ.MIDI.pitchBend(0, 300).toString(), 'e0 2c 02 -- Pitch Wheel');
    assert.equal(JZZ.MIDI.pitchBend('0', '300').toString(), 'e0 2c 02 -- Pitch Wheel');
  });
  it('bankMSB', function() {
    assert.equal(JZZ.MIDI.bankMSB(0, 15).toString(), 'b0 00 0f -- Bank Select MSB');
  });
  it('bankLSB', function() {
    assert.equal(JZZ.MIDI.bankLSB(0, 15).toString(), 'b0 20 0f -- Bank Select LSB');
  });
  it('modMSB', function() {
    assert.equal(JZZ.MIDI.modMSB(0, 15).toString(), 'b0 01 0f -- Modulation Wheel MSB');
  });
  it('modLSB', function() {
    assert.equal(JZZ.MIDI.modLSB(0, 15).toString(), 'b0 21 0f -- Modulation Wheel LSB');
  });
  it('breathMSB', function() {
    assert.equal(JZZ.MIDI.breathMSB(0, 15).toString(), 'b0 02 0f -- Breath Controller MSB');
  });
  it('breathLSB', function() {
    assert.equal(JZZ.MIDI.breathLSB(0, 15).toString(), 'b0 22 0f -- Breath Controller LSB');
  });
  it('footMSB', function() {
    assert.equal(JZZ.MIDI.footMSB(0, 15).toString(), 'b0 04 0f -- Foot Controller MSB');
    assert.equal(JZZ.MIDI.footMSB('0', '15').toString(), 'b0 04 0f -- Foot Controller MSB');
  });
  it('footLSB', function() {
    assert.equal(JZZ.MIDI.footLSB(0, 15).toString(), 'b0 24 0f -- Foot Controller LSB');
  });
  it('portamentoMSB', function() {
    assert.equal(JZZ.MIDI.portamentoMSB(0, 15).toString(), 'b0 05 0f -- Portamento Time MSB');
  });
  it('portamentoLSB', function() {
    assert.equal(JZZ.MIDI.portamentoLSB(0, 15).toString(), 'b0 25 0f -- Portamento Time LSB');
  });
  it('volumeMSB', function() {
    assert.equal(JZZ.MIDI.volumeMSB(0, 15).toString(), 'b0 07 0f -- Channel Volume MSB');
  });
  it('volumeLSB', function() {
    assert.equal(JZZ.MIDI.volumeLSB(0, 15).toString(), 'b0 27 0f -- Channel Volume LSB');
  });
  it('balanceMSB', function() {
    assert.equal(JZZ.MIDI.balanceMSB(0, 15).toString(), 'b0 08 0f -- Balance MSB');
  });
  it('balanceLSB', function() {
    assert.equal(JZZ.MIDI.balanceLSB(0, 15).toString(), 'b0 28 0f -- Balance LSB');
  });
  it('panMSB', function() {
    assert.equal(JZZ.MIDI.panMSB(0, 15).toString(), 'b0 0a 0f -- Pan MSB');
  });
  it('panLSB', function() {
    assert.equal(JZZ.MIDI.panLSB(0, 15).toString(), 'b0 2a 0f -- Pan LSB');
  });
  it('expressionMSB', function() {
    assert.equal(JZZ.MIDI.expressionMSB(0, 15).toString(), 'b0 0b 0f -- Expression Controller MSB');
  });
  it('expressionLSB', function() {
    assert.equal(JZZ.MIDI.expressionLSB(0, 15).toString(), 'b0 2b 0f -- Expression Controller LSB');
  });
  it('damper', function() {
    assert.equal(JZZ.MIDI.damper(0, true).toString(), 'b0 40 7f -- Damper Pedal On/Off');
    assert.equal(JZZ.MIDI.damper(0, false).toString(), 'b0 40 00 -- Damper Pedal On/Off');
  });
  it('portamento', function() {
    assert.equal(JZZ.MIDI.portamento(0, true).toString(), 'b0 41 7f -- Portamento On/Off');
    assert.equal(JZZ.MIDI.portamento(0, false).toString(), 'b0 41 00 -- Portamento On/Off');
  });
  it('sostenuto', function() {
    assert.equal(JZZ.MIDI.sostenuto(0, true).toString(), 'b0 42 7f -- Sostenuto On/Off');
    assert.equal(JZZ.MIDI.sostenuto(0, false).toString(), 'b0 42 00 -- Sostenuto On/Off');
  });
  it('soft', function() {
    assert.equal(JZZ.MIDI.soft(0, true).toString(), 'b0 43 7f -- Soft Pedal On/Off');
    assert.equal(JZZ.MIDI.soft(0, false).toString(), 'b0 43 00 -- Soft Pedal On/Off');
  });
  it('allSoundOff', function() {
    assert.equal(JZZ.MIDI.allSoundOff(0).toString(), 'b0 78 00 -- All Sound Off');
  });
  it('allNotesOff', function() {
    assert.equal(JZZ.MIDI.allNotesOff(0).toString(), 'b0 7b 00 -- All Notes Off');
  });
  it('mtc', function() {
    assert.equal(JZZ.MIDI.mtc(0).toString(), 'f1 00 -- MIDI Time Code');
  });
  it('songPosition', function() {
    assert.equal(JZZ.MIDI.songPosition(300).toString(), 'f2 2c 02 -- Song Position');
  });
  it('songSelect', function() {
    assert.equal(JZZ.MIDI.songSelect(15).toString(), 'f3 0f -- Song Select');
  });
  it('tune', function() {
    assert.equal(JZZ.MIDI.tune().toString(), 'f6 -- Tune request');
  });
  it('clock', function() {
    assert.equal(JZZ.MIDI.clock().toString(), 'f8 -- Timing clock');
  });
  it('start', function() {
    assert.equal(JZZ.MIDI.start().toString(), 'fa -- Start');
  });
  it('continue', function() {
    assert.equal(JZZ.MIDI.continue().toString(), 'fb -- Continue');
  });
  it('stop', function() {
    assert.equal(JZZ.MIDI.stop().toString(), 'fc -- Stop');
  });
  it('active', function() {
    assert.equal(JZZ.MIDI.active().toString(), 'fe -- Active Sensing');
  });
  it('sxIdRequest', function() {
    var msg = JZZ.MIDI.sxIdRequest();
    assert.equal(msg.isSysEx(), true);
    assert.equal(msg.isFullSysEx(), true);
    msg.setSysExChannel(20);
    assert.equal(msg.getSysExChannel(), 20);
    assert.equal(msg.toString(), 'f0 7e 14 06 01 f7');
    msg.setChannel(10);
    msg.setNote(60);
    msg.setVelocity(120);
    assert.equal(msg.getChannel(), undefined);
    assert.equal(msg.getNote(), undefined);
    assert.equal(msg.getVelocity(), undefined);
    assert.equal(msg.getData(), undefined);
    assert.equal(msg.isNoteOn(), false);
    assert.equal(msg.isNoteOff(), false);
  });
  it('sxFullFrame', function() {
    assert.equal(JZZ.MIDI.sxFullFrame(JZZ.SMPTE()).toString(), 'f0 7f 7f 01 01 00 00 00 00 f7');
  });
  it('reset', function() {
    assert.equal(JZZ.MIDI.reset().toString(), 'ff -- Reset');
  });
  it('freq', function() {
    assert.equal(JZZ.MIDI.freq('A6'), 880);
  });
  it('channel error handling for non-integer value', function() {
    try {
      JZZ.MIDI.noteOn(0.5, 'C4', 99);
      assert.fail('expected midi channel value to be invalid');
    } catch(error) {
      assert.equal(error.constructor, RangeError);
    }
  });
  it('channel error handling for low value', function() {
    try {
      JZZ.MIDI.noteOn(-1, 'C4', 99);
      assert.fail('expected midi channel value to be invalid');
    } catch(error) {
      assert.equal(error.constructor, RangeError);
    }
  });
  it('channel error handling for high value', function() {
    try {
      JZZ.MIDI.noteOn(16, 'C4', 99);
      assert.fail('expected midi channel value to be invalid');
    } catch(error) {
      assert.equal(error.constructor, RangeError);
    }
  });
});

describe('SMF events', function() {
  it('empty', function() {
    assert.equal(JZZ.MIDI.smf(1).toString(), 'ff01 -- Text');
    assert.equal(JZZ.MIDI.smf(0x70).toString(), 'ff70 -- SMF');
  });
  it('smf', function() {
    assert.equal(JZZ.MIDI.smf(JZZ.MIDI.smf(0x7f)).toString(), 'ff7f -- Sequencer Specific');
    assert.equal(JZZ.MIDI.smf([0x7f]).toString(), 'ff7f -- Sequencer Specific');
    assert.equal(JZZ.MIDI.smf(0x7f, [0, 1]).toString(), 'ff7f -- Sequencer Specific: 00 01');
    assert.equal(JZZ.MIDI.smf(0x7f, 0, 1).toString(), 'ff7f -- Sequencer Specific: 00 01');
    assert.equal(JZZ.MIDI.smf([0x7f, 0, 1]).toString(), 'ff7f -- Sequencer Specific: 00 01');
    assert.equal(JZZ.MIDI.smf(0x70, 'abc').toString(), 'ff70 -- SMF: 61 62 63');
  });
  it('smf/SeqNumber', function() {
    assert.equal(JZZ.MIDI.smf(0, [1]).toString(), 'ff00 -- Sequence Number: 1');
    assert.equal(JZZ.MIDI.smfSeqNumber(300).toString(), 'ff00 -- Sequence Number: 300');
    assert.equal(JZZ.MIDI.smfSeqNumber('').toString(), 'ff00 -- Sequence Number: 0');
    assert.equal(JZZ.MIDI.smfSeqNumber('\x01').toString(), 'ff00 -- Sequence Number: 1');
    assert.equal(JZZ.MIDI.smfSeqNumber('\x01\x01').toString(), 'ff00 -- Sequence Number: 257');
  });
  it('smf/Text', function() {
    var msg = JZZ.MIDI.smf(1, 'smf');
    assert.equal(msg.getData(), 'smf');
    msg.setData();
    assert.equal(msg.getData(), '');
    msg.setText('音樂');
    assert.equal(msg.getText(), '音樂');
    assert.equal(msg.getData(), '\xE9\x9F\xB3\xE6\xA8\x82');
    assert.equal(JZZ.MIDI.smf(1, 'smf').toString(), 'ff01 -- Text: smf');
    assert.equal(JZZ.MIDI.smfText('\ttwo\nlines\x00').toString(), 'ff01 -- Text: \\ttwo\\nlines\\x00');
  });
  it('smf/Copyright', function() {
    assert.equal(JZZ.MIDI.smfCopyright('© ...').toString(), 'ff02 -- Copyright: © ...');
  });
  it('smf/SeqName', function() {
    assert.equal(JZZ.MIDI.smfSeqName('sequence').toString(), 'ff03 -- Sequence Name: sequence');
  });
  it('smf/InstrName', function() {
    assert.equal(JZZ.MIDI.smfInstrName('instrument').toString(), 'ff04 -- Instrument Name: instrument');
  });
  it('smf/Lyric', function() {
    assert.equal(JZZ.MIDI.smfLyric('𝄋𝄋𝄋').toString(), 'ff05 -- Lyric: 𝄋𝄋𝄋');
  });
  it('smf/Marker', function() {
    assert.equal(JZZ.MIDI.smfMarker('marker').toString(), 'ff06 -- Marker: marker');
  });
  it('smf/CuePoint', function() {
    assert.equal(JZZ.MIDI.smfCuePoint('cue point').toString(), 'ff07 -- Cue Point: cue point');
  });
  it('smf/ProgName', function() {
    assert.equal(JZZ.MIDI.smfProgName('program').toString(), 'ff08 -- Program Name: program');
  });
  it('smf/DevName', function() {
    assert.equal(JZZ.MIDI.smfDevName('device').toString(), 'ff09 -- Device Name: device');
  });
  it('smf/ChannelPrefix', function() {
    var msg = JZZ.MIDI.smfChannelPrefix(10);
    assert.equal(msg.isSMF(), true);
    assert.equal(msg.getChannel(), 10);
    msg.setChannel(0);
    assert.equal(msg.getChannel(), 0);
    assert.equal(JZZ.MIDI.smf(0x20, '\x0a').toString(), 'ff20 -- Channel Prefix: 0a');
    assert.equal(JZZ.MIDI.smfChannelPrefix(10).toString(), 'ff20 -- Channel Prefix: 0a');
    assert.equal(JZZ.MIDI.smfChannelPrefix('').toString(), 'ff20 -- Channel Prefix: 00');
    assert.equal(JZZ.MIDI.smfChannelPrefix('\n').toString(), 'ff20 -- Channel Prefix: 0a');
  });
  it('smf/MidiPort', function() {
    assert.equal(JZZ.MIDI.smf(0x21, '\x0a').toString(), 'ff21 -- MIDI Port: 0a');
    assert.equal(JZZ.MIDI.smfMidiPort(10).toString(), 'ff21 -- MIDI Port: 0a');
    assert.equal(JZZ.MIDI.smfMidiPort('').toString(), 'ff21 -- MIDI Port: 00');
    assert.equal(JZZ.MIDI.smfMidiPort('\n').toString(), 'ff21 -- MIDI Port: 0a');
  });
  it('smf/EndOfTrack', function() {
    assert.equal(JZZ.MIDI.smf(0x2f).toString(), 'ff2f -- End of Track');
    assert.equal(JZZ.MIDI.smfEndOfTrack().toString(), 'ff2f -- End of Track');
  });
  it('smf/Tempo', function() {
    assert.equal(JZZ.MIDI.smf(0x51, '\x07\xa1\x20').toString(), 'ff51 -- Tempo: 120 bpm');
    assert.equal(JZZ.MIDI.smfTempo('\x07\xa1\x20').toString(), 'ff51 -- Tempo: 120 bpm');
    assert.equal(JZZ.MIDI.smfTempo(500000).toString(), 'ff51 -- Tempo: 120 bpm');
    assert.equal(JZZ.MIDI.smfBPM(120).toString(), 'ff51 -- Tempo: 120 bpm');
  });
  it('smf/SMPTE', function() {
    assert.equal(JZZ.MIDI.smf(0x54, '\x17\x3b\x3b\x17\x4b').toString(), 'ff54 -- SMPTE Offset: 23:59:59:23:75');
    assert.equal(JZZ.MIDI.smfSMPTE('\x17\x3b\x3b\x17\x4b').toString(), 'ff54 -- SMPTE Offset: 23:59:59:23:75');
    assert.equal(JZZ.MIDI.smfSMPTE(JZZ.SMPTE(30, 7, 40).incrQF().incrQF().incrQF().incrQF().incrQF()).toString(), 'ff54 -- SMPTE Offset: 07:40:00:01:25');
    assert.equal(JZZ.MIDI.smfSMPTE().toString(), 'ff54 -- SMPTE Offset: 00:00:00:00:00');
    assert.equal(JZZ.MIDI.smfSMPTE(7, 40).toString(), 'ff54 -- SMPTE Offset: 07:40:00:00:00');
    assert.equal(JZZ.MIDI.smfSMPTE([7, 40, 30]).toString(), 'ff54 -- SMPTE Offset: 07:40:30:00:00');
  });
  it('smf/TimeSignature', function() {
    assert.equal(JZZ.MIDI.smf(0x58, '\x03\x02\x18\x08').toString(), 'ff58 -- Time Signature: 3/4 24 8');
    assert.equal(JZZ.MIDI.smfTimeSignature('\x03\x02\x18\x08').toString(), 'ff58 -- Time Signature: 3/4 24 8');
    assert.equal(JZZ.MIDI.smfTimeSignature('7/8').toString(), 'ff58 -- Time Signature: 7/8 24 8');
    assert.equal(JZZ.MIDI.smfTimeSignature(7, 8).toString(), 'ff58 -- Time Signature: 7/8 24 8');
  });
  it('smf/KeySignature', function() {
    assert.equal(JZZ.MIDI.smf(0x59, '\xfb\x01').toString(), 'ff59 -- Key Signature: Bb min');
    assert.equal(JZZ.MIDI.smfKeySignature('\xfb\x01').toString(), 'ff59 -- Key Signature: Bb min');
    assert.equal(JZZ.MIDI.smfKeySignature('a# moll').toString(), 'ff59 -- Key Signature: A# min');
    assert.equal(JZZ.MIDI.smfKeySignature('Eb major').toString(), 'ff59 -- Key Signature: Eb');
    assert.equal(JZZ.MIDI.smfKeySignature('C').toString(), 'ff59 -- Key Signature: C');
  });
  it('smf/Sequencer', function() {
    assert.equal(JZZ.MIDI.smf(0x7f).toString(), 'ff7f -- Sequencer Specific');
    assert.equal(JZZ.MIDI.smf(0x7f, '\x0a\x0b\x0c').toString(), 'ff7f -- Sequencer Specific: 0a 0b 0c');
    assert.equal(JZZ.MIDI.smfSequencer('\x0a\x0b\x0c').toString(), 'ff7f -- Sequencer Specific: 0a 0b 0c');
    assert.equal(JZZ.MIDI.smfSequencer([0xa, 0xb, 0xc]).toString(), 'ff7f -- Sequencer Specific: 0a 0b 0c');
  });
});

describe('SMPTE', function() {
  it('00:00:00:00', function() {
    assert.equal(JZZ.SMPTE().toString(), '00:00:00:00');
  });
  it('23:59:59:23', function() {
    assert.equal(JZZ.SMPTE().decrQF().incrFrame().decrFrame().toString(), '23:59:59:23');
  });
  it('23:59:59:29', function() {
    assert.equal(JZZ.SMPTE(JZZ.SMPTE(30, 23, 59, 59, 29)).toString(), '23:59:59:29');
  });
  it('Full Frame SysEx', function() {
    var smpte = JZZ.SMPTE();
    smpte.read([0xf0, 0x7f, 0x7f, 1, 1, 1, 1, 1, 1, 0xf7]);
    assert.equal(smpte.toString(), '01:01:01:01');
    assert.equal(JZZ.MIDI.sxFullFrame(smpte).toString(), 'f0 7f 7f 01 01 01 01 01 01 f7');
  });
  it('master/slave', function() {
    var master = JZZ.SMPTE(24, 7, 39, 59);
    var slave = JZZ.SMPTE();
    for (var n = 0; n < 9; n++) {
      slave.read(JZZ.MIDI.mtc(master));
      master.incrQF();
    }
    assert.equal(slave.read([0x90, 0x40, 0x7f]), false);
    assert.equal(slave.toString(), '07:39:59:02');
  });
});

describe('JZZ.lib', function() {
  it('toBase64', function() {
    assert.equal(JZZ.lib.toBase64('MIDI'), 'TUlESQ==');
  });
  it('fromBase64', function() {
    assert.equal(JZZ.lib.fromBase64('TUlESQ=='), 'MIDI');
  });
  it('toUTF8', function() {
    assert.equal(JZZ.lib.toUTF8(), '');
    assert.equal(JZZ.lib.toUTF8('МИДИ'), '\xD0\x9C\xD0\x98\xD0\x94\xD0\x98');
    assert.equal(JZZ.lib.toUTF8('音樂'), '\xE9\x9F\xB3\xE6\xA8\x82');
    assert.equal(JZZ.lib.toUTF8('𝄞'), '\xED\xA0\xB4\xED\xB4\x9E'); // G-Clef
  });
  it('fromUTF8', function() {
    assert.equal(JZZ.lib.fromUTF8(), '');
    assert.equal(JZZ.lib.fromUTF8('\xD0\x9C\xD0\x98\xD0\x94\xD0\x98'), 'МИДИ');
    assert.equal(JZZ.lib.fromUTF8('МИДИ'), 'МИДИ');
    assert.equal(JZZ.lib.fromUTF8('\xE9\x9F\xB3\xE6\xA8\x82'), '音樂');
    assert.equal(JZZ.lib.fromUTF8('音樂'), '音樂');
    assert.equal(JZZ.lib.fromUTF8('\xF0\x9D\x84\x9E'), '𝄞'); // G-Clef 4-byte
    assert.equal(JZZ.lib.fromUTF8('\xED\xA0\xB4\xED\xB4\x9E'), '𝄞'); // G-Clef surrogate pair
  });
});

describe('JZZ.Widget', function() {
  it('connect', function(done) {
    var port1 = JZZ.Widget({ _receive: function(msg) { this._emit(msg); done(); }});
    var port2 = JZZ.Widget();
    var port3 = JZZ.Widget();
    port1.connect(port2);
    port2.connect(port3);
    port3.connect(port1);
    port2.noteOn(0, 'C5', 127);
  });
  it('ch', function(done) {
    var sample = new test.Sample(done, [
      [0x91, 0x3c, 0x7f], [0x82, 0x3c, 0x7f], [0xff],
      [0xf1, 0x04], [0xf1, 0x04],
      [0x90, 0x3c, 0x7f], [0x80, 0x3c, 0x40], [0x95, 0x3c, 0x7f], [0x85, 0x3c, 0x40]
    ]);
    var port = JZZ.Widget({ _receive: function(msg) { sample.compare(msg); }});
    port.ch(1).noteOn('C5').ch(2).noteOff('C5', 127).ch(3).reset();
    port.ch(4).mtc(JZZ.SMPTE(30, 1, 2, 3, 4)).ch().mtc(JZZ.SMPTE(30, 1, 2, 3, 4));
    port.note(0, 'B#4', 127, 1).ch(5).wait(10).note('Dbb5', 127, 1).wait(10).disconnect().close();
  });
  it('mpe', function(done) {
    var sample = new test.Sample(done, [
      [0xc0, 0x19], [0x91, 0x3c, 0x7f], [0x92, 0x3e, 0x7f], [0xa2, 0x3e, 0x7f], [0x81, 0x3c, 0x40],
      [0x91, 0x40, 0x7f], [0x81, 0x40, 0x40]
    ]);
    var port = JZZ.Widget();
    port.connect(function(msg) { sample.compare(msg); });
    port.mpe(0, 4).program(25).noteOn('C5').noteOn('D5').aftertouch('D5', 127).noteOff('C5').note('E5', 127, 1);
  });
});

describe('Engine: none', function() {
  it('and/or', function() { JZZ().and('').openMidiIn('Non-existing port').or(''); });
  test.engine_name('none', true);
  test.non_existent_midi_in();
  test.non_existent_midi_out();
  test.widget_midi_in();
  test.widget_midi_out();
  test.connect_watcher();
  test.web_midi_access();
  it('Close engine', function() {
    JZZ.close();
  });
});

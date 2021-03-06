/**
 * VexFlow - StaveNote Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

Vex.Flow.Test.StaveNote = {}

Vex.Flow.Test.StaveNote.Start = function() {
  module("StaveNote");
  test("Tick", Vex.Flow.Test.StaveNote.ticks);
  test("Tick - New API", Vex.Flow.Test.StaveNote.ticksNewApi);
  test("Stem", Vex.Flow.Test.StaveNote.stem);
  test("Automatic Stem Direction", Vex.Flow.Test.StaveNote.autoStem);
  test("StaveLine", Vex.Flow.Test.StaveNote.staveLine);
  test("Width", Vex.Flow.Test.StaveNote.width);
  test("TickContext", Vex.Flow.Test.StaveNote.tickContext);

  Vex.Flow.Test.runTest("StaveNote Draw - Treble", Vex.Flow.Test.StaveNote.draw,
      { clef: "treble", octaveShift: 0, restKey: "b/4" });
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Treble (Raphael)",
      Vex.Flow.Test.StaveNote.draw,
      { clef: "treble", octaveShift: 0, restKey: "b/4" });

  Vex.Flow.Test.runTest("StaveNote BoundingBoxes - Treble", Vex.Flow.Test.StaveNote.drawBoundingBoxes,
      { clef: "treble", octaveShift: 0, restKey: "b/4" });
  Vex.Flow.Test.runRaphaelTest("StaveNote BoundingBoxes - Treble (Raphael)",
      Vex.Flow.Test.StaveNote.drawBoundingBoxes,
      { clef: "treble", octaveShift: 0, restKey: "b/4" });


  Vex.Flow.Test.runTest("StaveNote Draw - Alto", Vex.Flow.Test.StaveNote.draw,
      { clef: "alto", octaveShift: -1, restKey: "c/4" });
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Alto (Raphael)",
      Vex.Flow.Test.StaveNote.draw,
      { clef: "alto", octaveShift: -1, restKey: "c/4" });

  Vex.Flow.Test.runTest("StaveNote Draw - Tenor", Vex.Flow.Test.StaveNote.draw,
      { clef: "tenor", octaveShift: -1, restKey: "a/3" });
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Tenor (Raphael)",
      Vex.Flow.Test.StaveNote.draw,
      { clef: "tenor", octaveShift: -1, restKey: "a/3" });

  Vex.Flow.Test.runTest("StaveNote Draw - Bass", Vex.Flow.Test.StaveNote.draw,
      { clef: "bass", octaveShift: -2, restKey: "d/3" });
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Bass (Raphael)",
      Vex.Flow.Test.StaveNote.draw,
      { clef: "bass", octaveShift: -2, restKey: "d/3" });

  Vex.Flow.Test.runTest("StaveNote Draw - Harmonic And Muted",
                        Vex.Flow.Test.StaveNote.drawHarmonicAndMuted);
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Harmonic And Muted (Raphael)",
      Vex.Flow.Test.StaveNote.drawHarmonicAndMuted);

  Vex.Flow.Test.runTest("StaveNote Draw - Slash",
                        Vex.Flow.Test.StaveNote.drawSlash);
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Slash (Raphael)",
      Vex.Flow.Test.StaveNote.drawSlash);

  Vex.Flow.Test.runTest("Displacements", Vex.Flow.Test.StaveNote.displacements);
  Vex.Flow.Test.runRaphaelTest("Displacements (Raphael)",
      Vex.Flow.Test.StaveNote.displacements);
  Vex.Flow.Test.runTest("StaveNote Draw - Bass", Vex.Flow.Test.StaveNote.drawBass);
  Vex.Flow.Test.runRaphaelTest("StaveNote Draw - Bass(Raphael)",
      Vex.Flow.Test.StaveNote.drawBass);
}

Vex.Flow.Test.StaveNote.ticks = function(options) {
  var BEAT = 1 * Vex.Flow.RESOLUTION / 4;

  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "w"});
  equal(note.getTicks().value(), BEAT * 4, "Whole note has 4 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "q"});
  equal(note.getTicks().value(), BEAT, "Quarter note has 1 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hd"});
  equal(note.getTicks().value(), BEAT * 3, "Dotted half note has 3 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hdd"});
  equal(note.getTicks().value(), BEAT * 3.5, "Double-dotted half note has 3.5 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hddd"});
  equal(note.getTicks().value(), BEAT * 3.75, "Triple-dotted half note has 3.75 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hdr"});
  equal(note.getTicks().value(), BEAT * 3, "Dotted half rest has 3 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hddr"});
  equal(note.getTicks().value(), BEAT * 3.5, "Double-dotted half rest has 3.5 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "hdddr"});
  equal(note.getTicks().value(), BEAT * 3.75, "Triple-dotted half rest has 3.75 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "qdh"});
  equal(note.getTicks().value(), BEAT * 1.5,
         "Dotted harmonic quarter note has 1.5 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "qddh"});
  equal(note.getTicks().value(), BEAT * 1.75,
         "Double-dotted harmonic quarter note has 1.75 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "qdddh"});
  equal(note.getTicks().value(), BEAT * 1.875,
         "Triple-dotted harmonic quarter note has 1.875 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8dm"});
  equal(note.getTicks().value(), BEAT * 0.75, "Dotted muted 8th note has 0.75 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8ddm"});
  equal(note.getTicks().value(), BEAT * 0.875,
         "Double-dotted muted 8th note has 0.875 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8dddm"});
  equal(note.getTicks().value(), BEAT * 0.9375,
         "Triple-dotted muted 8th note has 0.9375 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "8.7dddm"});
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments",
        "Invalid note duration '8.7' throws BadArguments exception");
  }

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "2Z"});
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments",
        "Invalid note type 'Z' throws BadArguments exception");
  }

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "2dddZ"});
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments",
        "Invalid note type 'Z' for dotted note throws BadArguments exception");
  }
}

Vex.Flow.Test.StaveNote.ticksNewApi = function() {
  var BEAT = 1 * Vex.Flow.RESOLUTION / 4;

  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "1"});
  equal(note.getTicks().value(), BEAT * 4, "Whole note has 4 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "4"});
  equal(note.getTicks().value(), BEAT, "Quarter note has 1 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 1});
  equal(note.getTicks().value(), BEAT * 3, "Dotted half note has 3 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 2});
  equal(note.getTicks().value(), BEAT * 3.5, "Double-dotted half note has 3.5 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 3});
  equal(note.getTicks().value(), BEAT * 3.75,
         "Triple-dotted half note has 3.75 beats");
  equal(note.getNoteType(), "n", "Note type is 'n' for normal note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 1, type: "r"});
  equal(note.getTicks().value(), BEAT * 3, "Dotted half rest has 3 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 2, type: "r"});
  equal(note.getTicks().value(), BEAT * 3.5, "Double-dotted half rest has 3.5 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "2", dots: 3, type: "r"});
  equal(note.getTicks().value(), BEAT * 3.75,
         "Triple-dotted half rest has 3.75 beats");
  equal(note.getNoteType(), "r", "Note type is 'r' for rest");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "4", dots: 1, type: "h"});
  equal(note.getTicks().value(), BEAT * 1.5,
         "Dotted harmonic quarter note has 1.5 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "4", dots: 2, type: "h"});
  equal(note.getTicks().value(), BEAT * 1.75,
         "Double-dotted harmonic quarter note has 1.75 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "4", dots: 3, type: "h"});
  equal(note.getTicks().value(), BEAT * 1.875,
         "Triple-dotted harmonic quarter note has 1.875 beats");
  equal(note.getNoteType(), "h", "Note type is 'h' for harmonic note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8", dots: 1, type: "m"});
  equal(note.getTicks().value(), BEAT * 0.75, "Dotted muted 8th note has 0.75 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8", dots: 2, type: "m"});
  equal(note.getTicks().value(), BEAT * 0.875,
         "Double-dotted muted 8th note has 0.875 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "8", dots: 3, type: "m"});
  equal(note.getTicks().value(), BEAT * 0.9375,
         "Triple-dotted muted 8th note has 0.9375 beats");
  equal(note.getNoteType(), "m", "Note type is 'm' for muted note");

  var note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "1s"});
  equal(note.getTicks().value(), BEAT * 4, "Whole note has 4 beats");
  equal(note.getNoteType(), "s", "Note type is 's' for slash note");

  var note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "4s"});
  equal(note.getTicks().value(), BEAT, "Quarter note has 1 beats");
  equal(note.getNoteType(), "s", "Note type is 's' for slash note");

  var note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "2s", dots: 1});
  equal(note.getTicks().value(), BEAT * 3, "Dotted half note has 3 beats");
  equal(note.getNoteType(), "s", "Note type is 's' for slash note");

  var note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "2s", dots: 2});
  equal(note.getTicks().value(), BEAT * 3.5, "Double-dotted half note has 3.5 beats");
  equal(note.getNoteType(), "s", "Note type is 's' for slash note");

  var note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "2s", dots: 3});
  equal(note.getTicks().value(), BEAT * 3.75,
         "Triple-dotted half note has 3.75 beats");
  equal(note.getNoteType(), "s", "Note type is 's' for slash note");

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "8.7"});
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments",
        "Invalid note duration '8.7' throws BadArguments exception");
  }

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "8", dots: "three" });
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments", "Invalid number of dots 'three' " +
           "(as string) throws BadArguments exception");
  }

  try {
    new Vex.Flow.StaveNote(
        { keys: ["c/4", "e/4", "g/4"], duration: "2", type: "Z"});
    throw new Error();
  } catch (e) {
    equal(e.code, "BadArguments",
        "Invalid note type 'Z' throws BadArguments exception");
  }
}


Vex.Flow.Test.StaveNote.stem = function() {
  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "g/4"], duration: "w"});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_UP,
      "Default note has UP stem");
}

Vex.Flow.Test.StaveNote.autoStem = function() {
  var note = new Vex.Flow.StaveNote(
      { keys: ["c/5", "e/5", "g/5"], duration: "8", auto_stem: true});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_DOWN,
      "Stem must be down");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/5", "e/4", "g/4"], duration: "8", auto_stem: true});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_UP,
      "Stem must be up");

  note = new Vex.Flow.StaveNote(
      { keys: ["c/5"], duration: "8", auto_stem: true});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_DOWN,
      "Stem must be up");

  note = new Vex.Flow.StaveNote(
      { keys: ["a/4", "e/5", "g/5"], duration: "8", auto_stem: true});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_UP,
      "Stem must be up");

  note = new Vex.Flow.StaveNote(
      { keys: ["b/4"], duration: "8", auto_stem: true});
  equal(note.getStemDirection(), Vex.Flow.StaveNote.STEM_DOWN,
      "Stem must be up");

}

Vex.Flow.Test.StaveNote.staveLine = function() {
  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "a/4"], duration: "w"});
  var props = note.getKeyProps();
  equal(props[0].line, 0, "C/4 on line 0");
  equal(props[1].line, 1, "E/4 on line 1");
  equal(props[2].line, 2.5, "A/4 on line 2.5");

  var stave = new Vex.Flow.Stave(10, 10, 300);
  note.setStave(stave);

  var ys = note.getYs();
  equal(ys.length, 3, "Chord should be rendered on three lines");
  equal(ys[0], 100, "Line for C/4");
  equal(ys[1], 90, "Line for E/4");
  equal(ys[2], 75, "Line for A/4");
}

Vex.Flow.Test.StaveNote.width = function() {
  expect(1);
  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "a/4"], duration: "w"});

  try {
    var width = note.getWidth();
  } catch (e) {
    equal(e.code, "UnformattedNote",
        "Unformatted note should have no width");
  }
}

Vex.Flow.Test.StaveNote.tickContext = function() {
  var note = new Vex.Flow.StaveNote(
      { keys: ["c/4", "e/4", "a/4"], duration: "w"});
  var tickContext = new Vex.Flow.TickContext();
  tickContext.addTickable(note);
  tickContext.preFormat();
  tickContext.setX(10);
  tickContext.setPadding(0);

  equal(tickContext.getWidth(), 16.5);
}

Vex.Flow.Test.StaveNote.showNote = function(note_struct, stave, ctx, x, drawBoundingBox) {
  var note = new Vex.Flow.StaveNote(note_struct);
  var tickContext = new Vex.Flow.TickContext();
  tickContext.addTickable(note).preFormat().setX(x).setPixelsUsed(20);
  note.setContext(ctx).setStave(stave);
  note.draw();

  if (drawBoundingBox) {
    note.getBoundingBox().draw(ctx);
  }
  return note;
}

Vex.Flow.Test.StaveNote.draw = function(options, contextBuilder) {
  var clef = options.params.clef;
  var octaveShift = options.params.octaveShift;
  var restKey = options.params.restKey;

  var ctx = new contextBuilder(options.canvas_sel, 700, 180);
  var stave = new Vex.Flow.Stave(10, 30, 650);

  stave.setContext(ctx);
  stave.addClef(clef);
  stave.draw();

  var lowerKeys = ["c/", "e/", "a/"];
  var higherKeys = ["c/", "e/", "a/"];
  for (var k = 0; k < lowerKeys.length; k++) {
    lowerKeys[k] = lowerKeys[k] + (4 + octaveShift);
    higherKeys[k] = higherKeys[k] + (5 + octaveShift);
  }

  var restKeys = [ restKey ];

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { clef: clef, keys: lowerKeys, duration: "w"},
    { clef: clef, keys: higherKeys, duration: "h"},
    { clef: clef, keys: lowerKeys, duration: "q"},
    { clef: clef, keys: higherKeys, duration: "8"},
    { clef: clef, keys: lowerKeys, duration: "16"},
    { clef: clef, keys: higherKeys, duration: "32"},
    { clef: clef, keys: higherKeys, duration: "64"},
    { clef: clef, keys: lowerKeys, duration: "w",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "h",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "q",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "8",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "16",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "32",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "64",
      stem_direction: -1},

    { clef: clef, keys: restKeys, duration: "wr"},
    { clef: clef, keys: restKeys, duration: "hr"},
    { clef: clef, keys: restKeys, duration: "qr"},
    { clef: clef, keys: restKeys, duration: "8r"},
    { clef: clef, keys: restKeys, duration: "16r"},
    { clef: clef, keys: restKeys, duration: "32r"},
    { clef: clef, keys: restKeys, duration: "64r"},
    { keys: ["x/4"], duration: "h"}
  ];
  expect(notes.length * 2);

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 25);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

Vex.Flow.Test.StaveNote.drawBoundingBoxes = function(options, contextBuilder) {
  var clef = options.params.clef;
  var octaveShift = options.params.octaveShift;
  var restKey = options.params.restKey;

  var ctx = new contextBuilder(options.canvas_sel, 700, 180);
  var stave = new Vex.Flow.Stave(10, 30, 650);

  stave.setContext(ctx);
  stave.addClef(clef);
  stave.draw();

  var lowerKeys = ["c/", "e/", "a/"];
  var higherKeys = ["c/", "e/", "a/"];
  for (var k = 0; k < lowerKeys.length; k++) {
    lowerKeys[k] = lowerKeys[k] + (4 + octaveShift);
    higherKeys[k] = higherKeys[k] + (5 + octaveShift);
  }

  var restKeys = [ restKey ];

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { clef: clef, keys: lowerKeys, duration: "w"},
    { clef: clef, keys: higherKeys, duration: "h"},
    { clef: clef, keys: lowerKeys, duration: "q"},
    { clef: clef, keys: higherKeys, duration: "8"},
    { clef: clef, keys: lowerKeys, duration: "16"},
    { clef: clef, keys: higherKeys, duration: "32"},
    { clef: clef, keys: higherKeys, duration: "64"},
    { clef: clef, keys: lowerKeys, duration: "w",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "h",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "q",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "8",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "16",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "32",
      stem_direction: -1},
    { clef: clef, keys: lowerKeys, duration: "64",
      stem_direction: -1},

    { clef: clef, keys: restKeys, duration: "wr"},
    { clef: clef, keys: restKeys, duration: "hr"},
    { clef: clef, keys: restKeys, duration: "qr"},
    { clef: clef, keys: restKeys, duration: "8r"},
    { clef: clef, keys: restKeys, duration: "16r"},
    { clef: clef, keys: restKeys, duration: "32r"},
    { clef: clef, keys: restKeys, duration: "64r"},
    { keys: ["x/4"], duration: "h"}
  ];
  expect(notes.length * 2);

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 25, true);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

Vex.Flow.Test.StaveNote.drawBass = function(options, contextBuilder) {
  expect(36);
  var ctx = new contextBuilder(options.canvas_sel, 600, 280);
  var stave = new Vex.Flow.Stave(10, 10, 550);
  var stave2 = new Vex.Flow.Stave(10, 150, 550);
  stave.setContext(ctx);
  stave.addClef('bass');
  stave.draw();

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "w"},
    { clef: 'bass', keys: ["c/3", "e/3", "a/3"], duration: "h"},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "q"},
    { clef: 'bass', keys: ["c/3", "e/3", "a/3"], duration: "8"},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "16"},
    { clef: 'bass', keys: ["c/3", "e/3", "a/3"], duration: "32"},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "h", stem_direction: -1},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "q", stem_direction: -1},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "8", stem_direction: -1},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "16", stem_direction: -1},
    { clef: 'bass', keys: ["c/2", "e/2", "a/2"], duration: "32", stem_direction: -1},

    { keys: ["b/4"], duration: "wr"},
    { keys: ["b/4"], duration: "hr"},
    { keys: ["b/4"], duration: "qr"},
    { keys: ["b/4"], duration: "8r"},
    { keys: ["b/4"], duration: "16r"},
    { keys: ["b/4"], duration: "32r"},
    { keys: ["x/4"], duration: "h"}
  ];

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 25);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

Vex.Flow.Test.StaveNote.displacements = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 700, 140);
  ctx.scale(0.9, 0.9); ctx.fillStyle = "#221"; ctx.strokeStyle = "#221";

  var stave = new Vex.Flow.Stave(10, 10, 650);
  stave.setContext(ctx);
  stave.draw();

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { keys: ["g/3", "a/3", "c/4", "d/4", "e/4"], duration: "w"},
    { keys: ["d/4", "e/4", "f/4"], duration: "h"},
    { keys: ["f/4", "g/4", "a/4", "b/4"], duration: "q"},
    { keys: ["e/3", "b/3", "c/4", "e/4", "f/4", "g/5", "a/5"], duration: "8"},
    { keys: ["a/3", "c/4", "e/4", "g/4", "a/4", "b/4"], duration: "16"},
    { keys: ["c/4", "e/4", "a/4"], duration: "32"},
    { keys: ["c/4", "e/4", "a/4", "a/4"], duration: "64"},
    { keys: ["g/3", "c/4", "d/4", "e/4"], duration: "h", stem_direction: -1},
    { keys: ["d/4", "e/4", "f/4"], duration: "q", stem_direction: -1},
    { keys: ["f/4", "g/4", "a/4", "b/4"], duration: "8", stem_direction: -1},
    { keys: ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4"], duration: "16",
      stem_direction: -1},
    { keys: ["b/3", "c/4", "e/4", "a/4", "b/5", "c/6", "e/6"], duration: "32",
      stem_direction: -1},
    { keys: ["b/3", "c/4", "e/4", "a/4", "b/5", "c/6", "e/6", "e/6"],
      duration: "64", stem_direction: -1}
  ];
  expect(notes.length * 2);

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 45);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

Vex.Flow.Test.StaveNote.drawHarmonicAndMuted = function(options,
                                                        contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 300, 180);
  var stave = new Vex.Flow.Stave(10, 10, 280);
  stave.setContext(ctx);
  stave.draw();

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { keys: ["c/4", "e/4", "a/4"], duration: "wh"},
    { keys: ["c/4", "e/4", "a/4"], duration: "hh"},
    { keys: ["c/4", "e/4", "a/4"], duration: "qh"},
    { keys: ["c/4", "e/4", "a/4"], duration: "8h"},
    { keys: ["c/4", "e/4", "a/4"], duration: "16h"},
    { keys: ["c/4", "e/4", "a/4"], duration: "32h"},
    { keys: ["c/4", "e/4", "a/4"], duration: "64h"},
    { keys: ["c/4", "e/4", "a/4"], duration: "wh", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "hh", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "qh", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "8h", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "16h", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "32h", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "64h", stem_direction: -1},

    { keys: ["c/4", "e/4", "a/4"], duration: "wm"},
    { keys: ["c/4", "e/4", "a/4"], duration: "hm"},
    { keys: ["c/4", "e/4", "a/4"], duration: "qm"},
    { keys: ["c/4", "e/4", "a/4"], duration: "8m"},
    { keys: ["c/4", "e/4", "a/4"], duration: "16m"},
    { keys: ["c/4", "e/4", "a/4"], duration: "32m"},
    { keys: ["c/4", "e/4", "a/4"], duration: "64m"},
    { keys: ["c/4", "e/4", "a/4"], duration: "wm", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "hm", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "qm", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "8m", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "16m", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "32m", stem_direction: -1},
    { keys: ["c/4", "e/4", "a/4"], duration: "64m", stem_direction: -1}
  ];
  expect(notes.length * 2);

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 25);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

Vex.Flow.Test.StaveNote.drawSlash = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 700, 180);
  var stave = new Vex.Flow.Stave(10, 10, 650);
  stave.setContext(ctx);
  stave.draw();

  var showNote = Vex.Flow.Test.StaveNote.showNote;
  var notes = [
    { keys: ["b/4"], duration: "ws", stem_direction: -1},
    { keys: ["b/4"], duration: "hs", stem_direction: -1},
    { keys: ["b/4"], duration: "qs", stem_direction: -1},
    { keys: ["b/4"], duration: "8s", stem_direction: -1},
    { keys: ["b/4"], duration: "16s", stem_direction: -1},
    { keys: ["b/4"], duration: "32s", stem_direction: -1},
    { keys: ["b/4"], duration: "64s", stem_direction: -1}
  ];
  expect(notes.length * 2);

  for (var i = 0; i < notes.length; ++i) {
    var note = notes[i];
    var staveNote = showNote(note, stave, ctx, (i + 1) * 25);

    ok(staveNote.getX() > 0, "Note " + i + " has X value");
    ok(staveNote.getYs().length > 0, "Note " + i + " has Y values");
  }
}

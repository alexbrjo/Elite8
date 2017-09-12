/**
 * Preprocess Intel 8080 assembly mnemonics for the assembler
 */
var preprocess = function (src) {

    /** Preprocessor FSM states */
    var state = new WaitState();

    /** Regex to validate label */
    var   LABEL_REGEX = /[\.]{0,1}[$_a-zA-Z]{1}[$_a-zA-Z0-9]{0,24}/;
    var COMMENT_REGEX = /;.*$(\n)/;

    var log = function () {};

    var out = "";

    var r = null;
    for (var i = 0; i < src.length; i++) {
        var char = src.charAt(i);
        log(char);

        if (char === ' ' || char === '\n' || char === '\t') {
            r = state.nextWhiteSpace(char);
        } else if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z') {
            r = state.nextLetter(char);
        } else if (char >= '0' && char <= '9') {
            r = state.nextNumber(char);
        } else {
            r = state.nextSymbol(char);
        }
        state = r.state;
        // if any machine codes were generated, add them to binary
        if (r.bin !== undefined) {
            out += r.bin;
        }
    }

    // file should end in newline
    r = state.nextWhiteSpace('\n');
    if (r.bin !== undefined) {
        out += r.bin;
    }

    // TODO reporting on code quality? warnings. Log compilable
    return {
        output: out,
        // metadata
        //lines:  log.numOfLines(),
        chars:  out.length
    };
};

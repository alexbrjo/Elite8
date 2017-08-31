/**
 * Preprocess Intel 8080 assembly mnemonics for the assembler
 */
var preprocess = function (src) {

    /** Preprocessor FSM states */
    var state = {
        WAIT     : new WaitState(),     // waiting for token or value
        TOKEN    : new TokenState(),    // label .label
        NUMBER   : new NumberState(),   // 4, 0x0, 0b0110
        LITERAL  : new LiteralState(),  // "word", 0,
        COMMENT  : new CommentState()   // in a comment line
    };

    var next = state.WAIT;

    /** Regex to validate label */
    var   LABEL_REGEX = /[\.]{0,1}[$_a-zA-Z]{1}[$_a-zA-Z0-9]{0,24}/;
    var COMMENT_REGEX = /;.*$(\n)/;

    var log = function () {};

    var out = "";

    for (var i = 0; i < src.length; i++) {
        var char = src.charAt(i);
        log(char);
        if (char === ' ' || char === '\n' || char === '\t') {
            next = state[next.nextWhiteSpace(char)];
        } else if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z') {
            next = state[next.nextLetter(char)];
        } else if (char >= '0' && char <= '9') {
            next = state[next.nextNumber(char)];
        } else {
            next = state[next.nextSymbol(char)];
        }
    }

    return {
        output: out,
        // metadata
        //lines:  log.numOfLines(),
        chars:  out.length
    };
};

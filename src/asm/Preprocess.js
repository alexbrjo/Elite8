/**
 * Preprocess Intel 8080 assembly mnemonics for the assembler
 */
var preprocess = function (src) {

    /** Preprocessor FSM states */
    var state = {
        WAIT     = new WaitState(),     // waiting for token or value
        TOKEN    = new TokenState(),    // label .label
        NUMBER   = new NumberState(),   // 4, 0x0, 0b0110
        LITERAL  = new LiteralState(),  // "word", 0,
        COMMENT  = new CommentState()   // in a comment line
    };

    var next;

    /** Regex to validate label */
    var   LABEL_REGEX = /[\.]{0,1}[$_a-zA-Z]{1}[$_a-zA-Z0-9]{0,24}/;
    var COMMENT_REGEX = /;.*$(\n)/;

    var log = function () {};

    var state = function () {
          this.nextNumber     = function (char) {};  // 0-9
          this.nextLetter     = function (char) {};  // a-zA-Z
          this.nextWhiteSpace = function (char) {};  // \ \n

          // Find a way to sort symbols
          this.nextSymbol           = /* or null */ function (char) {};  // null (which could delegate to the following)
          this.nextSymbolExpression = /* or null */ function (char) {};  // !^&*-=+\|;:'",./?
          this.nextSymbolEnclosing  = /* or null */ function (char) {};  // ()[]{}<>""''
          this.nextSymbolMath       = /* or null */ function (char) {};  // !^%&*()-+=/|<>.,
          this.nextSymbolOther      = /* or null */ function (char) {};  // `~@#$%_

          this.getStateName = function () { return ""; };
     }

    var out = "";

    for (var i = 0; i < src.length; i++) {
        var char = src.charAt(i);
        log(char);
        next = state[next(char)];
    }

    return {
        output: out,
        // metadata
        lines:  log.numOfLines(),
        chars:  out.length
    };
};

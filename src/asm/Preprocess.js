/**
 * Preprocessor Intel 8080 assembly mnemonics for the assembler
 */
var preprocess = function (src) {

    /** Preprocessor FSM states */
    var BEGIN_TOKEN;
    var BEGIN_NUMBER;
    var BEGIN_LITERAL;
    var ID_TOKEN;
    var CONVERT_TO_BYTES;
    var COMMENT;

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
        state.next(char);
    }

    return {
        output: out,
        // metadata
        lines:  log.numOfLines(),
        chars:  out.length,
    };
};

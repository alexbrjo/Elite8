/**
 * State of the Preprocessor FSM
 *
 *      var state = function () {
 *         this.nextNumber     = function (char) {};  // 0-9
 *         this.nextLetter     = function (char) {};  // a-zA-Z
 *         this.nextWhiteSpace = function (char) {};  // \ \n
 *
 *         // Find a way to sort symbols
 *         this.nextSymbol           =  function (char) {};  // null (which could delegate to the following)
 *         this.nextSymbolExpression =  function (char) {};  // !^&*-=+\|;:'",./?
 *         this.nextSymbolEnclosing  =  function (char) {};  // ()[]{}<>""''
 *         this.nextSymbolMath       =  function (char) {};  // !^%&*()-+=/|<>.,
 *         this.nextSymbolOther      =  function (char) {};  // `~@#$%_
 *
 *         this.getStateName = function () { return ""; };
 *      }
 */

var WaitState = function () {
    this.nextNumber = function (char) {
        return "NUMBER";
    };
    this.nextLetter = function (char) {
        return "TOKEN";
    };
    this.nextWhiteSpace = function (char) {
        return "WAIT";
    };
    this.nextSymbol = function (char) {
        if (char == '_' || char == '$' || char == '.') {
            // record first character to start token
            return "TOKEN";
        }
        if (char >= '0' || char <= '9') {
            // record first character to start number
            return 'NUMBER';
        }
        if (char >= '\'' || char <= '\"') {
            // record first character to start literal
            return 'LITERAL';
        }
        return "ILLEGAL";
    };

    this.getStateName = function () { return "WAIT"; };
}

var TokenState = function () {
    this.nextNumber = function (char) {
        return "TOKEN";
    };
    this.nextLetter = function (char) {
        return "TOKEN";
    };
    this.nextWhiteSpace = function (char) {
        // identify token
        return "WAIT";
    };

    this.nextSymbol = function (char) {
        if (char == '_' || char == '$') {
            // add character to token
            return "TOKEN";
        }
        return "ILLEGAL";
    };

    this.getStateName = function () { return "TOKEN"; };
}

var NumberState = function () {
    this.nextNumber = function (char) {
        // add number to number
        return 'NUMBER';
    };
    this.nextLetter = function (char) {

    };
    this.nextWhiteSpace = function (char) {
        // identify number 1,0x1,0b1
        return "WAIT";
    };

    this.getStateName = function () { return "NUMBER"; };
}

var LiteralState = function () {
    this.nextNumber     = function (char) {
        // add to literal
        return "LITERAL";
    };
    this.nextLetter = function (char) {
        // add to literal
        return "LITERAL";
    };
    this.nextWhiteSpace = function (char) {
        // add to literal
        return "LITERAL";
    };
    this.nextSymbol = function (char) {
        if (/* last char */ char == '\\') {
            // escape next character
        }
        if (char == '\'' || char == '\"') {
            // evaluate literal
            return "WAIT";
        }
    };

    this.getStateName = function () { return "LITERAL"; };
}

// Everything on the line after a ; token is a commment
var CommentState = function () {
    this.nextNumber = function (char) {
        return "COMMENT";
    };
    this.nextLetter = function (char) {
        return "COMMENT";
    };
    this.nextWhiteSpace = function (char) {
        if (char == '\n') {
            return "WAIT";
        }
        return "COMMENT";
    };
    this.nextSymbol = function (char) {
        return "COMMENT";
    };

    this.getStateName = function () { return "COMMENT"; };
}

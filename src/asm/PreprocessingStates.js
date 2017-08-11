/**
 * State of the Preprocessor FSM
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
        if (char == '_' || char == '$') {
            return "TOKEN";
        }
        return "ERROR";
    };

    this.getStateName = function () { return "WAIT"; };
}

var TokenState = function () {
    this.nextNumber     = function (char) {};  
    this.nextLetter     = function (char) {};  
    this.nextWhiteSpace = function (char) {
        
        return 'WAIT';
    };

    this.nextSymbol           = function (char) {};  
    this.nextSymbolExpression = function (char) {};  
    this.nextSymbolEnclosing  = function (char) {};  
    this.nextSymbolMath       = function (char) {};  
    this.nextSymbolOther      = function (char) {};  

    this.getStateName = function () { return "TOKEN"; };
}

var NumberState = function () {
    this.nextNumber     = function (char) {};  
    this.nextLetter     = function (char) {};  
    this.nextWhiteSpace = function (char) {};  

    this.nextSymbol           = function (char) {};  
    this.nextSymbolExpression = function (char) {};  
    this.nextSymbolEnclosing  = function (char) {};  
    this.nextSymbolMath       = function (char) {};  
    this.nextSymbolOther      = function (char) {};  

    this.getStateName = function () { return "NUMBER"; };
}

var LiteralState = function () {
    this.nextNumber     = function (char) {};  
    this.nextLetter     = function (char) {};  
    this.nextWhiteSpace = function (char) {};  

    this.nextSymbol           = function (char) {};  
    this.nextSymbolExpression = function (char) {};  
    this.nextSymbolEnclosing  = function (char) {};  
    this.nextSymbolMath       = function (char) {};  
    this.nextSymbolOther      = function (char) {};  

    this.getStateName = function () { return "LITERAL"; };
}


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

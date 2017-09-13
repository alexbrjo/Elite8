/**
 * The state of traversing whitespace
 *
 * @param {Char} char the first character of the segment
 */
var WaitState = function (char) {
    this.name = "WAIT";
    var content = char;
    this.nextNumber = function (char) {
        return { state: new NumberState(char), bin: content};
    };
    this.nextLetter = function (char) {
        return { state: new TokenState(char), bin: content};
    };
    this.nextWhiteSpace = function (char) {
        content += char;
        return { state: this};
    };
    this.nextSymbol = function (char) {
        if (char == '_' || char == '$' || char == '.') {
            // record first character to start token
            return { state: new TokenState(char), bin: content};
        } else if (char >= '\'' || char <= '\"') {
            // record first character to start literal
            return { state: new LiteralState(char), bin: content};
        } else if (char == ";") {
            return { state: new CommentState(char), bin: content};
        }
        throw new Error("Illegal symbol: " + char);
    };

    this.getStateName = function () { return "WAIT"; };
}

/**
 * The state of identifying a token
 *
 * @param {Char} char the first character of the token
 */
var TokenState = function (char) {
    this.name = "TOKEN";
    var content = char;
    this.nextNumber = function (char) {
        content += char;
        return { state: this };
    };
    this.nextLetter = function (char) {
        content += char;
        return { state: this };
    };
    this.nextWhiteSpace = function (char) {
        // identify token
        return { state: new WaitState(char), bin: content };
    };

    this.nextSymbol = function (char) {
        if (char == '_' || char == '$') {
            // add character to token
            content += char;
            return { state: this };
        }
        throw new Error("Illegal symbol in token: " + char);
    };

    this.getStateName = function () { return "TOKEN"; };
}

/**
 * The state of identifying a number (a literal starting with 0)
 *
 * @param {Char} char the first character of the number
 */
var NumberState = function (char) {
    this.name = "NUMBER";
    var content = char;
    this.nextNumber = function (char) {
        // add number to number
        content += char;
        return { state: this };
    };
    this.nextLetter = function (char) {
        if (content === "0" && (char === 'x' || char === 'o' || char === 'b')) {
            content += char;
            return { state: this };
        }
        throw new Error("Illegal symbol in number: " + char);
    };
    this.nextWhiteSpace = function (char) {
        var num;
        // convert all numbers to base 16
        if (content.indexOf("0x") === 0) {
            num = parseInt(content.substring(2), 16);
        } else if (content.indexOf("0o") === 0) {
            num = parseInt(content.substring(2), 8);
        } else if (content.indexOf("0b") === 0) {
            num = parseInt(content.substring(2), 2);
        } else {
            num = parseInt(content, 10);
        }
        return { state: new WaitState(char), bin: "0x" + num.toString(16) };
    };
    this.nextSymbol = function (char) {
        throw new Error("Illegal symbol in token: " + char);
    };

    this.getStateName = function () { return "NUMBER"; };
}

/**
 * The state of identifying a literal
 *
 * @param {Char} char the first character of the literal, likely \' or \"
 */
var LiteralState = function (char) {
    this.name = "LITERAL";
    var content = char;
    this.nextNumber = function (char) {
        // add to literal
        content += char;
        return { state: this };
    };
    this.nextLetter = function (char) {
        // add to literal
        content += char;
        return { state: this };
    };
    this.nextWhiteSpace = function (char) {
        // add to literal
        content += char;
        return { state: this };
    };
    // TODO support nextSymbol here
    this.nextSymbol = function (char) {
        if (/* last char */ char == '\\') {
            // escape next character
        }
        if (char == '\'' || char == '\"') {
            // evaluate literal
            return { state: new WaitState(char), bin: content };
        }
    };

    this.getStateName = function () { return "LITERAL"; };
}

/**
 * The state of identifying traversing a comment. Comments are not maintained
 *
 * @param {Char} char the first character of the literal, likely \' or \"
 */
var CommentState = function (char) {
    this.name = "COMMENT";
    var start = char;
    this.nextNumber = function (char) {
        return { state: this };
    };
    this.nextLetter = function (char) {
        return this.next(char);
    };
    this.nextWhiteSpace = function (char) {
        return this.next(char);
    };
    this.nextSymbol = function (char) {
        return this.next(char);
    };
    this.next = function (char) {
        if (char === "\n") {
            return { state: new WaitState(char) };
        } // else still in comment
        return { state: this };
    }
    this.getStateName = function () { return "COMMENT"; };
}

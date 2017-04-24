/**
 * Assembles text into machine code.
 * @param {String} src The input to assemble
 * @param {type} size The size of the memory to write to
 * @returns {Object} object with assembled memory and info.
 */
var assemble = function (src, size) {
    var constant = {}; // stores values of constants
    var label = {}; // stores memory locations of labels
    var machineCode = new Memory(size || 512); // assembled machine code
    var state = "init";
    
    var line = src.split("\n"); // the input split into lines
    for (var i = 0; i < line.length; i++) {
        // line split into tokens
        var token = line[i].split(" ").filter(function (a) {
            return a.length !== 0;
        });
        var t = token[0];
        if (typeof operation[t] !== "undefined") {
            machineCode.write(operation[t]);
            state = this.getState(t);
        } else {
            switch (t) {
                case "db":
                case "DB":
                    var def = t;
                    for (var j = 0; j < def.length; j++) {
                        machineCode.write(def.charAt(j));
                    }
                    state = "new_line";
                    break;
                case "CONST":
                    constant[token[1]] = token[2]; // create new constant
                    state = "wait_immed";
                    break;
                default:
                    label[t] = machineCode.pos() + 1; // create new address label
                    state = "new_line";
            }
        }

        /*
         Based on state will read an immediate value or 16-bit address
         */
        if (state === "wait_immed") {
            var immed;
            try {
                immed = parseInt(token[1]);
            } catch (e) {
                immed = constant[token[1]];
            }
            machineCode.write(immed); // write immediate value
        } else if (state === "wait_address") {
            var address;
            if (token[1] === "undefined") {
                throw new Error("No immed address label: line " + i);
            } else if (!isNaN(parseInt(token[1], 10))) {
                address = this.chewAddress(parseInt(token[1], 10));
            } else {
                if (typeof label[token[1]] === "undefined") {
                    throw new Error("Could not find label: line " + i);
                }
                address = this.chewAddress(label[token[1]]); // get address of label
            }
            machineCode.write(address.low); // write low order 
            machineCode.write(address.high); // write high order 
            state = "new_line";
        }

        // if assembler isn't ready for a new line throw error
        if (state !== "new_line") {
            throw new Error("Bad Syntax line: " + i);
        }
    }

    // returns assembled data and size
    return {
        data: machineCode,
        size: machineCode.size()
    };
};

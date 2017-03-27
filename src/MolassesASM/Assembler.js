/**
 * Assembles Intel 8080 assembly mnuemonics to machine code
 */
function MolassesAssembler() {
    
    /**
     * Seperates ("chews") a 16-bit number into 2 bytes 
     * @param {Number} addr a number 0 to 65536 
     * @returns {Object} address split into 2 bytes
     */
    var chewAddress = function(addr) {
        var h = Math.floor(addr / 256); // calculate high order address
        var l = addr - h * 256; // calculate low order address
        return {
            "0": l,
            "1": h,
            get low () {
                return this[0];
            },
            get high(){
                return this[1];
            }
        };
    };
    
    /**
     * The main feature of SyrupAssembler: the assembler. Assembles text into 
     * Sugar8080 machine code.
     * @param {String} src The input to assemble
     * @param {type} size The size of the memory to write to
     * @returns {Object} object with assembled memory and info.
     */
    this.assemble = function (src, size) {
        var line = src.split("\n"); // the input split into lines
        var constant = {}; // stores values of constants
        var label = {}; // stores memory locations of labels
        var machineCode = new Memory(size || 512); // assembled machine code
        
        var state = "init";
        for(var i = 0; i < line.length; i++) {
            // line split into tokens
            var token = line[i].split(" ").filter(function(a) { return a.length !== 0; });
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
                if (token[1] === "undefined") throw new Error("No immed address label: line" + i);
                if (typeof label[token[1]] === "undefined") throw new Error("Could not find label: line" + i);
                
                var address = chewAddress(label[token[1]]); // get address of label
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
    
    /**
     * Regex patterns for different states
     * 
     * @param {string} t The operation string
     * @returns {string} the state of the input
     */
    this.getState = function (t) {
        if ((/^(JMP|RET|CALL)$|^[JRC]{1}(NZ|NC|PO|P|Z|P|PE|M)$/).test(t)) return "wait_address";
        if ((/^(AD|AC|SU|SB|OR|XR|AN|CP)I$/).test(t)) return "wait_immed";
        return "new_line";
    };
}

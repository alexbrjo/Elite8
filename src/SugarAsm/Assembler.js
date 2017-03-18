/**
 * Assembles 1975 updated Intel 8008 assembly mnuemonics to machine code
 */
function SugarAssembler() {
    
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
     * The main feature of SugarAssembler: the assembler. Assembles text into 
     * Intel 8008 machine code.
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
            switch (token[0]) {
                case "HLT":
                    machineCode.write(operation.HLT); // write 1 byte halt operation
                    state = "new_line";
                    break;
                case "JMP":
                    machineCode.write(operation.JMP); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JNZ":
                    machineCode.write(operation.JNZ); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JNC":
                    machineCode.write(operation.JNC); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JPO":
                    machineCode.write(operation.JPO); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JZ":
                    machineCode.write(operation.JZ); // write operation code
                    state = "wait_address"; // wait for address 
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    state = "wait_address"; // wait for address 
                    break;
                case "JM":
                    machineCode.write(operation.JM); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JPE":
                    machineCode.write(operation.JPE); // write operation code
                    state = "wait_address";
                    break;
                case "CONST":
                    label[token[0]] = machineCode.pos() + 1; // create new constant
                    state = "wait_immed";
                default:
                    label[token[0]] = machineCode.pos() + 1; // create new address label
                    state = "new_line";
            }
            
            /*
               Based on state will read an immediate value or 16-bit address
             */
            if (state === "wait_immed") {
                // TODO if next token is a number, use that number. If its a 
                // constant use that constant
                machineCode.write(0); // write immediate value
            } else if (state === "wait_address") {
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
}

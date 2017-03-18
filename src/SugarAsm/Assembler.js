/**
 * Assembles 1975 updated Intel 8008 assembly mnuemonics to machine code
 */
function SugarAssembler() {
    this.assemble = function (src, size) {
        var line = src.split("\n"); // the input split into lines
        var constant = {}; // stores values of constants
        var label = {}; // stores memory locations of labels
        var machineCode = new Memory(size || 512); // assembled machine code
        
        for(var i = 0; i < line.length; i++) {
            // line split into tokens
            var token = line[i].split(" ").filter(function(a) { return a.length !== 0; });
            switch (token[0]) {
                case "HLT":
                    machineCode.write(operation.HLT); // write 1 byte halt operation
                    break;
                case "JMP":
                    machineCode.write(operation.JMP); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JNZ":
                    machineCode.write(operation.JNZ); // write operation code
                    var address = label[token[1]]; // get address of label                    
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JNC":
                    machineCode.write(operation.JNC); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JPO":
                    machineCode.write(operation.JPO); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JZ":
                    machineCode.write(operation.JZ); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JM":
                    machineCode.write(operation.JM); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                case "JPE":
                    machineCode.write(operation.JPE); // write operation code
                    var address = label[token[1]]; // get address of label
                    var high = Math.floor(address / 0xFF); // calculate high order address
                    machineCode.write(address - high); // write low order 
                    machineCode.write(high);           // write high order 
                    break;
                default:
                    label[token[0]] = machineCode.pos() + 1; // create new address label
            }
        }
        
        // returns assembled data and size
        return {
            data: machineCode,
            size: machineCode.size()
        };
    };
    
}

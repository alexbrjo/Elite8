/**
 * Assembles 1975 updated Intel 8008 assembly mnuemonics to machine code
 */
function SugarAssembler() {
    this.assemble = function (src, size) {
        var lines = src.split("\n"); // the input split by white space
        var constant = {}; // stores values of constants
        var label = {}; // stores memory locations of labels
        var machineCode = new Memory(size || 512);
        
        var csr = 0;
        while (csr < lines.length) {
            var line = lines.split (" ").filter(function(a) { return a.length !== 0; });
            switch (line[0]) {
                case "JMP":
                    machineCode.write(opcode.JMP); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JNZ":
                    machineCode.write(opcode.JNZ); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JNC":
                    machineCode.write(opcode.JNC); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JP":
                    machineCode.write(opcode.JP); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JPO":
                    machineCode.write(opcode.JPO); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JZ":
                    machineCode.write(opcode.JZ); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JP":
                    machineCode.write(opcode.JP); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JM":
                    machineCode.write(opcode.JM); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                case "JPE":
                    machineCode.write(opcode.JPE); // write operation code
                    var address = label[line[1]]; // get address of label
                    machineCode.write(address - address % 0xFF); // write low order 
                    machineCode.write(Math.floor(address / 0xFF)); // write high order 
                    break;
                default:
                    label[line[0]] = csr; // create new address label
            }
            csr++;
        }
        
    };
    
}

function SugarAssembler() {
    this.assemble = function (src, size) {
        var input = src.split(" "); // the input split by white space
        var constant = {}; // stores values of constants
        var labels = {}; // stores memory locations of labels
        var machineCode = new Memory(size || 512);
        
        for (var i = 0; i < input.length; i++) {
            switch (input[i]) {
                case "JMP":
                    machineCode.write(opcode.JMP);
                    // write low-order address
                    // write high-order address
                    break;
                case "JNZ":
                    machineCode.write(opcode.JNZ);
                    // write low-order address
                    // write high-order address
                    break;
                case "JNC":
                    machineCode.write(opcode.JNC);
                    // write low-order address
                    // write high-order address
                    break;
                case "JP":
                    machineCode.write(opcode.JP);
                    // write low-order address
                    // write high-order address
                    break;
                case "JPO":
                    machineCode.write(opcode.JPO);
                    // write low-order address
                    // write high-order address
                    break;
                case "JZ":
                    machineCode.write(opcode.JZ);
                    // write low-order address
                    // write high-order address
                    break;
                case "JP":
                    machineCode.write(opcode.JP);
                    // write low-order address
                    // write high-order address
                    break;
                case "JM":
                    machineCode.write(opcode.JM);
                    // write low-order address
                    // write high-order address
                    break;
                case "JPE":
                    machineCode.write(opcode.JPE);
                    // write low-order address
                    // write high-order address
                    break;
                case "newline":
                    break;
            }
        }
        
    };
    
}


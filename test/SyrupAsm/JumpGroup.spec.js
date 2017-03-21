/**
 * Tests the Assembly of Jump operations
 */
describe("JumpGroupAssembly", function() {
    
    var sasm = new SyrupAssembler();
    
    /**
     * Tests Assembly of JMP from Jump Group.
     */
    it("testAsmJMP", function() {
        // test address 0
        var src = ".line0 \n" +
                  "JMP .line0";
        var mach_code = sasm.assemble(src, 3).data;
        expect(mach_code.size()).toEqual(3);
        expect(mach_code.read(0)).toEqual(operation.JMP); // JMP opcode
        expect(mach_code.read(1)).toEqual(0);             // memory address 0
        expect(mach_code.read(2)).toEqual(0);             // memory address 0
        
        // test address 
        src =     "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n .line24 \n" +
                  "JMP .line24";
        var mach_code = sasm.assemble(src).data;
        expect(mach_code.size()).toEqual(512);
               /* ... 23 halts ... */
        expect(mach_code.read(22)).toEqual(operation.HLT); // last halt
        expect(mach_code.read(23)).toEqual(operation.JMP); // JMP opcode
        expect(mach_code.read(24)).toEqual(23);            // low order memory address 23
        expect(mach_code.read(25)).toEqual(0);             // high order memory address 0
    });
    
    /**
     * Tests Assembly of JMP with high order address from Jump Group.
     */
    it("testAsmJMPhighOrder", function() {
        
        var src = "";
        // fill up first 256 + 4 addresses 
        for (var i = 0; i < 260; i++) {
            src += " HLT \n";
        }
         
        src += ".high_order \n JMP .high_order \n"; 
          
        var mach_code = sasm.assemble(src).data;
        expect(mach_code.size()).toEqual(512);
               /* ... 260 halts ... */
        expect(mach_code.read(259)).toEqual(operation.HLT); // last halt
        expect(mach_code.read(260)).toEqual(operation.JMP); // JMP opcode
        expect(mach_code.read(261)).toEqual(4);             // low order memory address 4
        expect(mach_code.read(262)).toEqual(1);             // high order memory address 1
    });
});

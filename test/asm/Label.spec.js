/**
 * Tests Assembly of labels
 */
describe("LabelAssembly", function() {    
    
    var sasm = new MolassesASM();
    
    /**
     * Tests label stacking
     */
    it("LabelStacked", function() {
        
        // test stacked labels equal same memory location 
        var src =     "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n HLT \n" +
                  "HLT \n HLT \n HLT \n .line24 \n .line25 \n .line26 \n" +
                  "JMP .line26";
        var mach_code = sasm.compile(src).data;
        expect(mach_code.size()).toEqual(512);
        expect(mach_code.read(23)).toEqual(operation.JMP); // JMP opcode
        expect(mach_code.read(24)).toEqual(23);            // low order memory address 23
        expect(mach_code.read(25)).toEqual(0);             // high order memory address 0
    });
    
    
    /**
     * Tests Assembly of High order label
     */
    it("LabelHighOrder", function() {
        
        var src = "";
        // fill up first 512 + 14 addresses 
        for (var i = 0; i < 526; i++) {
            src += " HLT \n";
        }
         
        src += ".high_order \n JMP .high_order \n";
          
        var mach_code = sasm.compile(src, 1024).data;
        expect(mach_code.size()).toEqual(1024);
               /* ... 525 halts ... */
        expect(mach_code.read(525)).toEqual(operation.HLT); // last halt
        expect(mach_code.read(526)).toEqual(operation.JMP); // JMP opcode
        expect(mach_code.read(527)).toEqual(14);            // low order memory address 14
        expect(mach_code.read(528)).toEqual(2);             // high order memory address 2
    });
});



/**
 * Tests the Assembly Syntax errors
 */
describe("AssemblySyntax", function() {

    var sasm = new MolassesASM();
    
    /**
     * Tests Assembly of JMP from Jump Group.
     */
    it("testMissingToken", function() {
        // test address 0
        var src = "JMP \n \n HLT";
        expect(function() {
            sasm.assemble(src, 8);
        }).toThrow();
        
    });
    
    /**
     * Tests Assembly of immediate address
     */
    it("testIncludedImmed", function() {
        // test address 0
        var src = "JMP 0 \n HLT";
        var m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JMP);
        expect(m.read(1)).toEqual(0);
        expect(m.read(2)).toEqual(0);
        
        // test address 255
        src = "JMP 255 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JMP);
        expect(m.read(1)).toEqual(255);
        expect(m.read(2)).toEqual(0);
        
        // test address 1023
        src = "JMP 1023 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JMP);
        expect(m.read(1)).toEqual(255);
        expect(m.read(2)).toEqual(3);
        
        // test address 1024
        src = "JMP 1024 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JMP);
        expect(m.read(1)).toEqual(0);
        expect(m.read(2)).toEqual(4);
    });
});

/**
 * Tests the Assembly of Jump operations
 */
describe("AssemblySyntax", function() {

    var sasm = new MolassesAssembler();
    
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
});

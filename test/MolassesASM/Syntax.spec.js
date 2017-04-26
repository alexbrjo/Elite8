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
    it("testImmedAddress", function() {
        // test address 0
        var src = "JMP 0 \n HLT";
        var m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JMP);
        expect(m.read(1)).toEqual(0);
        expect(m.read(2)).toEqual(0);
        
        // test address 255
        src = "CALL 255 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.CALL);
        expect(m.read(1)).toEqual(255);
        expect(m.read(2)).toEqual(0);
        
        // test address 1023
        src = "JNZ 1023 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.JNZ);
        expect(m.read(1)).toEqual(255);
        expect(m.read(2)).toEqual(3);
        
        // test address 10
        src = "CP 1024 \n HLT";
        m = sasm.assemble(src, 8).data;
        
        expect(m.size()).toEqual(8);
        expect(m.read(0)).toEqual(operation.CP);
        expect(m.read(1)).toEqual(0);
        expect(m.read(2)).toEqual(4);
    });
    
    /**
     * Tests Assembly of 1-byte addtition Math instructions
     */
    it("testSyntaxMathAdd", function() {
        var src = "ADD A \n ADD B \n ADD C \n ADD D \n ADD E \n HLT";
        var m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.ADD_A);
        expect(m.read(1)).toEqual(operation.ADD_B);
        expect(m.read(2)).toEqual(operation.ADD_C);
        expect(m.read(3)).toEqual(operation.ADD_D);
        expect(m.read(4)).toEqual(operation.ADD_E);
        expect(m.read(5)).toEqual(operation.HLT); 
        
        src = "ADC A \n ADC B \n ADC C \n ADC D \n ADC E \n HLT";
        m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.ADC_A);
        expect(m.read(1)).toEqual(operation.ADC_B);
        expect(m.read(2)).toEqual(operation.ADC_C);
        expect(m.read(3)).toEqual(operation.ADC_D);
        expect(m.read(4)).toEqual(operation.ADC_E);
        expect(m.read(5)).toEqual(operation.HLT);
    });
    
    /**
     * Tests Assembly of 1-byte subtraction Math instructions
     */
    it("testSyntaxMathSub", function() {
        var src = "SUB A \n SUB B \n SUB C \n SUB D \n SUB E \n HLT";
        var m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.SUB_A);
        expect(m.read(1)).toEqual(operation.SUB_B);
        expect(m.read(2)).toEqual(operation.SUB_C);
        expect(m.read(3)).toEqual(operation.SUB_D);
        expect(m.read(4)).toEqual(operation.SUB_E);
        expect(m.read(5)).toEqual(operation.HLT);
        
        src = "SBB A \n SBB B \n SBB C \n SBB D \n SBB E \n HLT";
        m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.SBB_A);
        expect(m.read(1)).toEqual(operation.SBB_B);
        expect(m.read(2)).toEqual(operation.SBB_C);
        expect(m.read(3)).toEqual(operation.SBB_D);
        expect(m.read(4)).toEqual(operation.SBB_E);
        expect(m.read(5)).toEqual(operation.HLT);
    });
    
        /**
     * Tests Assembly of 1-byte boolean Math instructions
     */
    it("testSyntaxBoolean", function() {
        var src = "ANA A \n ANA B \n ANA C \n ANA D \n ANA E \n HLT";
        var m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.ANA_A);
        expect(m.read(1)).toEqual(operation.ANA_B);
        expect(m.read(2)).toEqual(operation.ANA_C);
        expect(m.read(3)).toEqual(operation.ANA_D);
        expect(m.read(4)).toEqual(operation.ANA_E);
        expect(m.read(5)).toEqual(operation.HLT);
        
        src = "XRA A \n XRA B \n XRA C \n XRA D \n XRA E \n HLT";
        m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.XRA_A);
        expect(m.read(1)).toEqual(operation.XRA_B);
        expect(m.read(2)).toEqual(operation.XRA_C);
        expect(m.read(3)).toEqual(operation.XRA_D);
        expect(m.read(4)).toEqual(operation.XRA_E);
        expect(m.read(5)).toEqual(operation.HLT);
        
        src = "ORA A \n ORA B \n ORA C \n ORA D \n ORA E \n HLT";
        m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.ORA_A);
        expect(m.read(1)).toEqual(operation.ORA_B);
        expect(m.read(2)).toEqual(operation.ORA_C);
        expect(m.read(3)).toEqual(operation.ORA_D);
        expect(m.read(4)).toEqual(operation.ORA_E);
        expect(m.read(5)).toEqual(operation.HLT);
        
        src = "CMP A \n CMP B \n CMP C \n CMP D \n CMP E \n HLT";
        m = sasm.assemble(src, 8).data;
        expect(m.read(0)).toEqual(operation.CMP_A);
        expect(m.read(1)).toEqual(operation.CMP_B);
        expect(m.read(2)).toEqual(operation.CMP_C);
        expect(m.read(3)).toEqual(operation.CMP_D);
        expect(m.read(4)).toEqual(operation.CMP_E);
        expect(m.read(5)).toEqual(operation.HLT);
    });
});

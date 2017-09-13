/**
 * Tests the Assembly and Excution of Math
 */
describe("MathAsmCpuIntegration", function() {

    var sasm = new MolassesASM();
    var cpu;
    
    /**
     * Tests assembly execution integration for add immed
     */
    it("testIntegrationAdd", function() {
        // test address 0
        var src = "ADI 10 \n " + 
                  ".line0 \n " +
                  "SUI 2 \n " +
                  "JNZ .line0 \n " + 
                  "ADI 1 \n " + 
                  "HLT";
        var mem = sasm.compile(src, 10).data;
        expect(mem.read(0)).toEqual(operation.ADI);
        expect(mem.read(1)).toEqual(10);
        expect(mem.read(2)).toEqual(operation.SUI);
        expect(mem.read(3)).toEqual(2);
        expect(mem.read(4)).toEqual(operation.JNZ);
        expect(mem.read(5)).toEqual(2);
        expect(mem.read(6)).toEqual(0);
        expect(mem.read(7)).toEqual(operation.ADI);
        expect(mem.read(8)).toEqual(1);
        expect(mem.read(9)).toEqual(operation.HLT);
        
        cpu = new Molasses8080(mem);
        
        var reg = cpu.run();
        expect(reg.A).toEqual(1);
        expect(reg.PC).toEqual(9);
    });
});

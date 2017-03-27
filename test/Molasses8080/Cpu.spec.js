/**
 * Tests the Cpu object.
 */
describe("testCpu", function() {
    
    var cpu = null;
    
    /**
     * Tests constructing Cpu.
     */
    it("testCostruction", function() {
        
        /* Should not throw error */
        var mem = new Memory(32); // 32 byte memory
        mem.write(0, 0x44); // JMP to address 00000000-00010000, which will HLT
        mem.write(1, 0x0F); // low-order address
        mem.write(2, 0x00); // high-order address
        
        cpu =  new Molasses8080(mem);
        expect(function() { cpu.cycle(); }).not.toThrow();
        
    });
    
    /**
     * Tests Running Cpu.
     */
    //it("testCpuRun", function() {
        
        /* JMP to blank mem should throw error 
        var mem = new Memory(32); 
        mem.write(0, 0x44); 
        mem.write(1, 0x0F);
        mem.write(2, 0x00); 
        
        cpu =  new Molasses8080(mem);
        expect(function() { cpu.run(); }).not.toThrow();
        
    });*/
});

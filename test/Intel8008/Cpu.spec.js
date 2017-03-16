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
        
        cpu =  new Cpu(mem);
        
    });
});


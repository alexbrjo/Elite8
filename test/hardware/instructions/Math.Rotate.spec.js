/**
 * Tests the Rotate operations.
 */
describe("testIntructionsRotate", function() {
    
    it("RLC", function() {
        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        
        // when A = 0
        operation[operation["RLC"]](reg);
        expect(reg.A).toEqual(0);
        
        reg.A = 1; // when A = 0b00000001
        operation[operation["RLC"]](reg);
        expect(reg.A).toEqual(2); // 0b00000010
        
        reg.A = 10; // when A = 0x00001010
        operation[operation["RLC"]](reg);
        expect(reg.A).toEqual(20); // 0b00010100
        
        reg.A = 192; // when A = 0x11000000
        operation[operation["RLC"]](reg);
        expect(reg.A).toEqual(129); // 0b10000001
        
        // no other registers altered
        expect(reg.B).toEqual(0);
        expect(reg.C).toEqual(0);
        expect(reg.D).toEqual(0);
        expect(reg.E).toEqual(0);
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.M).toEqual(0);
    });
    
    it("RAL", function() {
        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        
        // when A = 0
        operation[operation["RAL"]](reg);
        expect(reg.A).toEqual(0);
        
        reg.A = 1; // when A = 0b00000001
        operation[operation["RAL"]](reg);
        expect(reg.A).toEqual(2); // 0b00000010
        
        reg.A = 10; // when A = 0x00001010
        operation[operation["RAL"]](reg);
        expect(reg.A).toEqual(20); // 0b00010100
        
        reg.A = 192; // when A = 0x11000000
        operation[operation["RAL"]](reg);
        expect(reg.A).toEqual(128); // 0b10000000
        
        // no other registers altered
        expect(reg.B).toEqual(0);
        expect(reg.C).toEqual(0);
        expect(reg.D).toEqual(0);
        expect(reg.E).toEqual(0);
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.M).toEqual(0);
    });
    
    it("RRC", function() {
        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        
        // when A = 0
        operation[operation["RRC"]](reg);
        expect(reg.A).toEqual(0);
        
        reg.A = 2; // when A = 0b00000010
        operation[operation["RRC"]](reg);
        expect(reg.A).toEqual(1); // 0b00000001
        
        reg.A = 20; // when A = 0x00010100
        operation[operation["RRC"]](reg);
        expect(reg.A).toEqual(10); // 0b00001010
        
        reg.A = 3; // when A = 0x00000011
        operation[operation["RRC"]](reg);
        expect(reg.A).toEqual(129); // 0b10000001
        
        // no other registers altered
        expect(reg.B).toEqual(0);
        expect(reg.C).toEqual(0);
        expect(reg.D).toEqual(0);
        expect(reg.E).toEqual(0);
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.M).toEqual(0);
    });
    
    it("RAR", function() {
        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        
        // when A = 0
        operation[operation["RAR"]](reg);
        expect(reg.A).toEqual(0);
        
        reg.A = 2; // when A = 0b00000010
        operation[operation["RAR"]](reg);
        expect(reg.A).toEqual(1); // 0b00000001
        
        reg.A = 20; // when A = 0x00010100
        operation[operation["RAR"]](reg);
        expect(reg.A).toEqual(10); // 0b00001010
        
        reg.A = 3; // when A = 0x00000011
        operation[operation["RAR"]](reg);
        expect(reg.A).toEqual(1); // 0b00000001
        
        // no other registers altered
        expect(reg.B).toEqual(0);
        expect(reg.C).toEqual(0);
        expect(reg.D).toEqual(0);
        expect(reg.E).toEqual(0);
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.M).toEqual(0);
    });
    
});

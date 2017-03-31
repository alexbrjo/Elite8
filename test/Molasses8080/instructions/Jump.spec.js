/**
 * Tests the Jump operations.
 */
describe("testIntructionsJump", function() {
    // Test the JMP operation
    it('JMP', function(){
        var reg = MolassesRegisters();
        var op = operation["JMP"];
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        expect(reg.SP).toEqual(0); 
        expect(reg.PC).toEqual(0);
        operation[op](reg, 0, 8);  // mem location 0x0008
        expect(reg.SP).toEqual(0); // stack pointer unchanged
        expect(reg.PC).toEqual(8); // jumped to 8
        
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 250;
        operation[op](reg, 5, 100);  // mem location 0x0564
        expect(reg.SP).toEqual(0);   // stack pointer still unchanged
        expect(reg.PC).toEqual(1380);// jumped to 100
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 95);  // mem location 0x005F
        expect(reg.SP).toEqual(0);  // stack pointer still unchanged
        expect(reg.PC).toEqual(95); // jumped to 95
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);  // mem location 0x0037
        expect(reg.SP).toEqual(0);  // stack pointer still unchanged
        expect(reg.PC).toEqual(55); // jumped to 100
    });
    
    // Test jump
    it('JNZ', function(){});
    it('JNC', function(){});
    it('JPO', function(){});
    it('JP', function(){});
    it('JZ', function(){});
    it('JC', function(){});
    it('JPE', function(){});
    it('JM', function(){});
});

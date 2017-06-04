/**
 * Tests the Call operations.
 */
describe('testIntructionsCall', function() {
    // test calling
    it('CALL', function(){
        var reg = MolassesRegisters();
        var op = operation["CALL"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        expect(reg.PC).toEqual(0);
        operation[op](reg, 0, 8);  // mem location 0x0008
        expect(reg.PC).toEqual(8); // called to 8
        reg.POP();
        expect(reg.PC).toEqual(0); // called to 0
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 250;
        operation[op](reg, 5, 100);  // mem location 0x0564
        expect(reg.PC).toEqual(0x0564);// called to 0x0564
        reg.POP();
        expect(reg.PC).toEqual(250); // called to 250
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 95);  // mem location 0x005F
        expect(reg.PC).toEqual(95); // called to 95
        reg.POP();
        expect(reg.PC).toEqual(133); // called to 133
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);  // mem location 0x0037
        expect(reg.PC).toEqual(55); // called to 100
        reg.POP();
        expect(reg.PC).toEqual(2000); // called to 2000
    });
    
    // test call if not zero
    it('CNZ', function(){
        var reg = MolassesRegisters();
        var op = operation["CNZ"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(136); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
    });
    
    // test call if not carry 
    it('CNC', function(){
        var reg = MolassesRegisters();
        var op = operation["CNC"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(2003); // no call
    });
    
    // test call if parity = odd
    it('CPO', function(){
        var reg = MolassesRegisters();
        var op = operation["CPO"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(136); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
    });
    
    // test call if positive
    it('CP', function(){
        var reg = MolassesRegisters();
        var op = operation["CP"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(2003); // no call
    });
    
    // test call if zero
    it('CZ', function(){
        var reg = MolassesRegisters();
        var op = operation["CZ"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(2003); // no call
    });
    
    // test call if carry 
    it('CC', function(){
        var reg = MolassesRegisters();
        var op = operation["CC"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(136); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
    });
    
    // test call if parity = even
    it('CPE', function(){
        var reg = MolassesRegisters();
        var op = operation["CPE"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383); // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(2003); // no call
    });
    
    // test call if negative
    it('CM', function(){
        var reg = MolassesRegisters();
        var op = operation["CM"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(1383);  // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(136);  // no call
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 0, 55);
        expect(reg.PC).toEqual(55); // call
    });
});

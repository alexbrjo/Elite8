/**
 * Tests the Jump operations. The J** operations use JMP so they only 
 * have to be tested for WHEN they are called.
 */
describe("testIntructionsJump", function() {
    // Test the JMP operation
    it('JMP', function(){
        var reg = MolassesRegisters();
        var op = operation["JMP"];
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        expect(reg.PC).toEqual(0);
        operation[op](reg, 8, 0);  // mem location 0x0008
        expect(reg.PC).toEqual(8); // jumped to 8
        
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 250;
        operation[op](reg, 100, 5);  // mem location 0x0564
        expect(reg.PC).toEqual(1380);// jumped to 100
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        operation[op](reg, 95, 0);  // mem location 0x005F
        expect(reg.PC).toEqual(95); // jumped to 95
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        operation[op](reg, 55, 0);  // mem location 0x0037
        expect(reg.PC).toEqual(55); // jumped to 100
    });
    
    // Test jump if not 0
    it('JNZ', function(){
        var reg = MolassesRegisters();
        var op = operation["JNZ"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(400);// call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(403);// no call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(200);// call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(203);// no call
    });
    
    // test jump when carry = 0
    it('JNC', function(){
        var reg = MolassesRegisters();
        var op = operation["JNC"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(503);// no call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(300);// call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(303);// no call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(100);// call
    });
    
    // test jump when parity is odd
    it('JPO', function(){
        var reg = MolassesRegisters();
        var op = operation["JPO"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(503);// no call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(300);// call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(200);// call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(203);// no call
    });
    
    // test jump when positive
    it('JP', function(){
        var reg = MolassesRegisters();
        var op = operation["JP"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(400);// call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(403);// no call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(406);// no call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(100);// call
    });
    
    // test jump when zero
    it('JZ', function(){
        var reg = MolassesRegisters();
        var op = operation["JZ"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(503);// no call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(300);// call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(303);// no call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(100);// call
    });
    
    // test jump when carry is 1
    it('JC', function(){
        var reg = MolassesRegisters();
        var op = operation["JC"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(400);// call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(403);// no call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(200);// call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(203);// no call
    });
    
    // test jump when parity is even
    it('JPE', function(){
        var reg = MolassesRegisters();
        var op = operation["JPE"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(400);// call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(403);// no call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(406);// no call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(100);// call
    });
    
    // test jump when sign is negative
    it('JM', function(){
        var reg = MolassesRegisters();
        var op = operation["JM"];
        
        reg.PC = 500;
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        operation[op](reg, 400, 0);
        expect(reg.PC).toEqual(503);// no call
        
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        operation[op](reg, 300, 0);
        expect(reg.PC).toEqual(300);// call
        
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        operation[op](reg, 200, 0);
        expect(reg.PC).toEqual(200);// call
        
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        operation[op](reg, 100, 0);
        expect(reg.PC).toEqual(203);// no call
    });
});

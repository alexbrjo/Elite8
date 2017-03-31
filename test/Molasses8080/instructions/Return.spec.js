/**
 * Tests the Return operations.
 */
describe("testIntructionsReturn", function() {
    // test return 
    it('RET', function(){
        var reg = MolassesRegisters();
        var op = operation["RET"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        expect(reg.PC).toEqual(0);
        expect(function(){ operation[op](reg); }).toThrow();
        expect(reg.PC).toEqual(0);
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); // push location 0x00FF onto pc stack
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380);// jumped to 100
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95); // push location 95 onto pc stack
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(133); // returned to 95
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); // push location 95 onto pc stack
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2000); // jumped to 100
    });
    
    // test return if not zero
    it('RNZ', function(){
        var reg = MolassesRegisters();
        var op = operation["RNZ"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(98); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2000); // return
    });
    
    // test return if not carry 
    it('RNC', function(){
        var reg = MolassesRegisters();
        var op = operation["RNC"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(133); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2052); // no return
    });
    
    // test return if parity = odd
    it('RPO', function(){
        var reg = MolassesRegisters();
        var op = operation["RPO"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(98); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2000); // return
    });
    
    // test return if positive
    it('RP', function(){
        var reg = MolassesRegisters();
        var op = operation["RP"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(133); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2052); // no return
    });
    
    // test return if zero
    it('RZ', function(){
        var reg = MolassesRegisters();
        var op = operation["RZ"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(133); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2052); // no return
    });
    
    // test return if carry 
    it('RC', function(){
        var reg = MolassesRegisters();
        var op = operation["RNZ"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(98); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2000); // return
    });
    
    // test return if parity = even
    it('RPE', function(){
        var reg = MolassesRegisters();
        var op = operation["RPE"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(133); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2052); // no return
    });
    
    // test return if negative
    it('RM', function(){
        var reg = MolassesRegisters();
        var op = operation["RM"];
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 1;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(1380); // return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 0;
        reg.PC = 1380;
        reg.PUSH(255); 
        expect(reg.PC).toEqual(255);
        operation[op](reg);
        expect(reg.PC).toEqual(258); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 0; reg.PARITY = 1; reg.SIGN = 0; reg.ZERO = 1;
        reg.PC = 133;
        reg.PUSH(95);
        expect(reg.PC).toEqual(95);
        operation[op](reg); 
        expect(reg.PC).toEqual(98); // no return
        
        reg.CLEAR_STACK();
        reg.CARRY = 1; reg.PARITY = 0; reg.SIGN = 1; reg.ZERO = 0;
        reg.PC = 2000;
        reg.PUSH(2049); 
        expect(reg.PC).toEqual(2049);
        operation[op](reg);
        expect(reg.PC).toEqual(2000); // return
    });
});

/**
 * Tests the Registers object.
 */
describe("Registers test", function() {
    
    var reg = null;
    
    /**
     * Tests constructing register.
     */
    it("testCostruction", function() {
        
        /* Should not throw error */
        reg =  Intel8008Registers();
        expect(reg.A).toEqual(0); 
        expect(reg.B).toEqual(0); 
        expect(reg.C).toEqual(0); 
        expect(reg.D).toEqual(0); 
        expect(reg.E).toEqual(0); 
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.HL).toEqual(0);   
        
    });
    
    /**
     * Tests Accumulator register (A) function of register
     */
    it("testAccumulator", function() {
        
        reg =  Intel8008Registers();
        
        expect(reg.A).toEqual(0); // get should return 0, default value
        expect(reg.A).toEqual(0); // get should return same value, 0
        reg.A = 1;
        expect(reg.A).toEqual(1); // get should return set value, 1
        reg.A = 0;
        expect(reg.A).toEqual(0); // get should set value after changed again, 1
        
        // testing middle values
        reg.A = 0x34;
        expect(reg.A).toEqual(0x34);
        reg.A = 0xF0;
        expect(reg.A).toEqual(0xF0); 
        
        // 0 to 255 shouldn't throw errors
        for (var i = 0; i < 256; i++) {
            reg.A = i;
            expect(reg.A).toEqual(i); 
        }
        
        // Register should only be able to hold integers 0 to 255
        expect(function() { reg.A = -1; }).toThrow();
        expect(function() { reg.A = 256; }).toThrow();
        expect(function() { reg.A = 1.5; }).toThrow();
        expect(function() { reg.A = "1e4"; }).toThrow();
        
        // check that no other registers were changed
        expect(reg.A).toEqual(0xFF); 
        expect(reg.B).toEqual(0); 
        expect(reg.C).toEqual(0); 
        expect(reg.D).toEqual(0); 
        expect(reg.E).toEqual(0); 
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.HL).toEqual(0); 
        
    });
    
    /**
     * Tests general purpose register B function of register
     */
    it("testRegisterB", function() {
        
        reg =  Intel8008Registers();
        
        expect(reg.B).toEqual(0); // get should return 0, default value
        expect(reg.B).toEqual(0); // get should return same value, 0
        reg.B = 1;
        expect(reg.B).toEqual(1); // get should return set value, 1
        reg.B = 0;
        expect(reg.B).toEqual(0); // get should set value after changed again, 1
        
        // testing middle values
        reg.B = 0x34;
        expect(reg.B).toEqual(0x34);
        reg.B = 0xF0;
        expect(reg.B).toEqual(0xF0); 
        
        // 0 to 255 shouldn't throw errors
        for (var i = 0; i < 256; i++) {
            reg.B = i;
            expect(reg.B).toEqual(i); 
        }
        
        // Register should only be able to hold integers 0 to 255
        expect(function() { reg.B = -1; }).toThrow();
        expect(function() { reg.B = 256; }).toThrow();
        expect(function() { reg.B = 1.5; }).toThrow();
        expect(function() { reg.B = "1e4"; }).toThrow();
        
        // check that no other registers were changed
        expect(reg.A).toEqual(0); 
        expect(reg.B).toEqual(0xFF); 
        expect(reg.C).toEqual(0); 
        expect(reg.D).toEqual(0); 
        expect(reg.E).toEqual(0); 
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.HL).toEqual(0); 
        
    });
    
});


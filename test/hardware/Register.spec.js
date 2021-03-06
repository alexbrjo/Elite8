/**
 * Tests the Registers object.
 */
describe("testRegisters", function() {
    
    var reg = null;
    
    /**
     * Tests constructing register.
     */
    it("testCostruction", function() {
        
        /* Should not throw error */
        reg =  MolassesRegisters();
        expect(reg.A).toEqual(0); 
        expect(reg.B).toEqual(0); 
        expect(reg.C).toEqual(0); 
        expect(reg.D).toEqual(0); 
        expect(reg.E).toEqual(0); 
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(function () { reg.M }).toThrow();

        reg.memory = new Memory(8);
        expect(reg.M).toEqual(0);
        
    });
    
    /**
     * Tests 8-bit registers
     */
    var registers = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
    for (var i = 0; i < registers.length; i++) {
        var name = registers[i];
        
        var ii = 0; // hacky loop for parameterized tests
        it("testRegister" + name, function() {
            reg =  MolassesRegisters();
            var r = registers[ii];
            ii++;
            expect(reg[r]).toEqual(0); // get should return 0, default value
            expect(reg[r]).toEqual(0); // get should return same value, 0
            reg[r] = 1;
            expect(reg[r]).toEqual(1); // get should return set value, 1
            reg[r] = 0;
            expect(reg[r]).toEqual(0); // get should set value after changed again, 1

            // testing middle values
            reg[r] = 0x34;
            expect(reg[r]).toEqual(0x34);
            reg[r] = 0xF0;
            expect(reg[r]).toEqual(0xF0); 

            // 0 to 255 shouldn't throw errors
            for (var j = 0; j < 256; j++) {
                reg[r] = j;
                expect(reg[r]).toEqual(j); 
            }

            // Register should only be able to hold integers 0 to 255
            reg[r] = -1;
            expect(reg[r]).toEqual(255); 
            reg[r] = 256;
            expect(reg[r]).toEqual(0); 
            expect(function() { reg[r] = 1.5; }).toThrow(); 
            expect(function() { reg[r] = "1e4";}).toThrow();

            // check that no other registers were changed
            reg[r] = 0x00;
            expect(reg.A).toEqual(0); 
            expect(reg.B).toEqual(0); 
            expect(reg.C).toEqual(0); 
            expect(reg.D).toEqual(0); 
            expect(reg.E).toEqual(0); 
            expect(reg.H).toEqual(0);
            expect(reg.L).toEqual(0);

        });
    }
    
    /**
     * Tests the 16-bit M register.
     */
    it("testRegisterM", function() {
        
        reg =  MolassesRegisters();
        reg.memory = new Memory(8);
        
        expect(reg.M).toEqual(0); // default value of h is 0, and l is 0
        expect(reg.M).toEqual(0); // getting doesn't change value
        
        // address 0 = 13
        reg.M = 13;
        expect(reg.H).toEqual(0);
        expect(reg.L).toEqual(0);
        expect(reg.M).toEqual(13);

        // address 3 = 255
        reg.memory.write(3, 255);
        reg.L = 3;
        expect(reg.M).toEqual(255);
        
    });
});

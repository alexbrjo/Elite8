/**
 * Tests the Memory object.
 */
describe("testMemory", function() {
    
    var mem = null;
    
    /**
     * Tests constructing memory.
     */
    it("testCostruction", function() {
        
        // Memory cannot be -1 bytes
        expect(function(){ mem = new Memory(-1); }).toThrow();
        // Memory cannot be 0 bytes
        expect(function(){ mem = new Memory(0); }).toThrow();
        // Memory type must be valid 
        expect(function(){ mem = new Memory(256, "good"); }).toThrow();
        
        // default construction, should have 256 bytes
        mem = new Memory();
        expect(mem.size()).toEqual(512);
        
        // construction for given size, should have 512 bytes
        mem = new Memory(512);
        expect(mem.size()).toEqual(512);
        
        // construction for given size, should have 16 bytes. All equal to 0
        mem = new Memory(16, "RAM");
        expect(mem.size()).toEqual(16);
        
        // all memory should be 0
        for (var i = 0; i < 16; i++) {
            expect(mem.read(i)).toEqual(0);
        }
            
        mem = null;
        
    });
    
    /**
     * Tests the size() function of memory
     */
    it("testSize", function() {
        // default bytes
        mem = new Memory();
        expect(mem.size()).toEqual(512);
        // 8 bytes
        mem = new Memory(8);
        expect(mem.size()).toEqual(8);
        // 16 bytes
        mem = new Memory(16);
        expect(mem.size()).toEqual(16);
        // 32 bytes
        mem = new Memory(32);
        expect(mem.size()).toEqual(32);
        // 64 bytes
        mem = new Memory(64);
        expect(mem.size()).toEqual(64);
        // 128 bytes
        mem = new Memory(128);
        expect(mem.size()).toEqual(128);
        // 256 bytes
        mem = new Memory(256);
        expect(mem.size()).toEqual(256);
        // 512 bytes
        mem = new Memory(512);
        expect(mem.size()).toEqual(512);
        
        mem = null;
    });
    
    /**
     * Tests the peek() method of memery
     */
    it("testPeek", function() {
        
        mem = new Memory(10);
        mem.write(7, 0x30);
        mem.write(8, 0x31);
        mem.write(9, 0x32);
        
        expect(mem.read(7)).toEqual(0x30);
        expect(mem.peek() ).toEqual(0x31);
        expect(mem.peek(0)).toEqual(0x30);
        expect(mem.peek(1)).toEqual(0x31);
        expect(mem.peek(2)).toEqual(0x32);
        
        expect(function(){ mem.peek(3); }).toThrow();
        expect(function(){ mem.peek(-10); }).toThrow();
        
    });
    
    /**
     * Tests the hasHas() method of memory
     */
    it("testPeek", function() {
        
        mem = new Memory(4);
        mem.write(1, 0x00);
        mem.write(1, 0x30);
        mem.write(2, 0xFF);
        mem.write(3, 0x54);
        
        while (mem.hasNext()) {
            expect(function(){ mem.read(); }).not.toThrow();
        }
        
    });
    
    /**
     * Tests the write() and read() function of memory
     */
    it("testReadWrite", function() {
        
        mem = new Memory();
        
        // read value should equal written value
        mem.write(0, 0xFF);
        expect(mem.read(0)).toEqual(0xFF);
        
        // value should be able to be over written
        mem.write(0, 0x55);
        expect(mem.read(0)).toEqual(0x55);
        
        // some value over written shouldn't throw error
        mem.write(0, 0x55)
        expect(mem.read(0)).toEqual(0x55);
        
        // writing at other addresses works
        mem.write(10, 0x66);
        mem.write(11, 0x77);
        expect(mem.read(10)).toEqual(0x66);
        expect(mem.read(11)).toEqual(0x77);
        
        // but reading/writing out of scope doesn't
        expect(function() { mem.read(-1); }).toThrow();
        expect(function() { mem.read(mem.size()); }).toThrow();
        expect(function() { mem.write(-1, 0x55); }).toThrow();
        expect(function() { mem.write(mem.size(), 0x55); }).toThrow();
        
        // write ascii "HELLO WORLD!"
        var offset = 22;
        var test_string = "HELLO WORLD!";
        for (var i = 0; i < test_string.length; i++) {
            mem.write(offset + i, test_string.charCodeAt(i));
        }
        expect(mem.read(22)).toEqual(72); // H
        expect(mem.read(23)).toEqual(69); // E
        expect(mem.read(24)).toEqual(76); // L
        expect(mem.read(25)).toEqual(76); // L
        expect(mem.read(26)).toEqual(79); // O
        expect(mem.read(27)).toEqual(32); // Space
        expect(mem.read(28)).toEqual(87); // W
        expect(mem.read(29)).toEqual(79); // O
        expect(mem.read(30)).toEqual(82); // R
        expect(mem.read(31)).toEqual(76); // L
        expect(mem.read(32)).toEqual(68); // E
        
    });
    
    /**
     * Tests the clear() function of memory
     */
    it("testClear", function() {
        
        mem = new Memory();
        
        // write ascii "Im about to clear the memory. run."
        var offset = 64;
        var test_string = "Im about to clear the memory. run.";
        for (var i = 0; i < test_string.length; i++) {
            mem.write(offset + i, test_string.charCodeAt(i));
        }
        
        // clear memory
        mem.clear();
        
        // check that all memory addresses are 0
        for (var i = 0; i < 16; i++) {
            expect(mem.read(i)).toEqual(0);
        }
        
    });
    
    /**
     * Tests the ROM functionality of memory
     */
    it("testRom", function() {
        mem = new Memory(26, "ROM"); // test writing throws 
        expect(function () {mem.write(0xF8); }).toThrow();
        expect(function () {mem.write(9, 0x06); }).toThrow();
        expect(function () {mem.write(9, 0xAF); }).toThrow();
        
        // test reading doesn't throw
        for (var i = 0; i < 16; i++) {
            expect(mem.read(i)).toEqual(0);
        }
        
        // other functions work still
        expect(function() {
            mem.read(0);
            while (mem.hasNext()) {
                mem.read();
            }
        }).not.toThrow();
    });
});


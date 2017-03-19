/**
 * Constructing this function is buying a physical stick of RAM. The Intel 8008
 * only has a 14-bit wide address bus so only 16384 (not 65536) bytes can be 
 * accessed.
 * @param {Number} size the size of the memory
 * @param {String} mem_type the type of memory 
 *      "RAM" - Read and write are enabled(default) 
 *      "ROM" - Read only memory
 */
function Memory (size, mem_type) {
    
    // Validate size parameter
    if (size < 1) {
        throw new Error("Memory must have at least 1 byte.");
    }
    // Validate mem_type parameter
    if (typeof mem_type !== "undefined" &&
        mem_type !== "RAM" && mem_type !== "ROM") {
            throw new Error("Unsupported memory type: " + mem_type);
    }
    
    /** The size of the memory */
    var size = size || 512;
    /** The size of the  */
    var cursor = -1;
    /** If you can write to memory */
    var access = mem_type !== "ROM";
    /** The data in memory  */
    var data = new Uint8Array(size);
    
    /**
     * Read a value from a memory location
     * @param {Number} address the address of the memory
     * @returns {Number} the value in the memory location
     */
    this.read = function (address) {
        // Checks that location is a valid memory address
        if (address < 0 || address >= data.length) {
            throw new Error("Illegal memory access: " + address);
        }
        // sets cursor to memory address and returns stored value
        cursor = address;
        return data[cursor];
    };
    
    /**
     * Peeks ahead of the last value access via read()
     * @param {Number} d the change from the address
     * @returns {Number} the value in the memory location
     */
    this.peek = function (d) {
        var address = cursor + d;
        // Checks that location is a valid memory address
        if (address < 0 || address >= data.length) {
            throw new Error("Illegal memory access: " + address);
        }
        
        return data[address];
    };
    
    /**
     * Writes a value at a memory location. If no value is given, assumes 
     * address is value and writes to next memory location
     * @param {Number} address the address of the memory
     * @param {Number} value the byte value to store
     */
    this.write = function (address, value) {
        if (typeof address === "number" && typeof value === "undefined") {
            cursor++;
            this.write(cursor, address);
        } else {
            // Checks if can write to Memory
            if (!access) {
                throw new Error("Cannot write to ROM");
            }
            // Checks that location is a valid memory address
            if (address < 0 || address >= data.length) {
                throw new Error("Illegal memory access: " + address);
            }

            if (address >= 0 && value < 256) {
                cursor = address;
                data[cursor] = value;
            }
        }
    };
    
    /**
     * Determines if there is a byte to write after the cursor
     * @returns {Boolean} if there is a next byte to write
     */
    this.hasNext = function () {
        return cursor >= 0 && cursor < data.length;
    };
    
    /**
     * Returns position of the cursor in memory
     * @returns {Number} position of cursor
     */
    this.pos = function () {
        return cursor;
    };
    
    /**
     * Clears memory
     */
    this.clear = function () {
        for (cursor = 0; cursor < data.length; cursor++)
            data[cursor] = 0; 
        cursor = -1;
    };
    
    /**
     * Gets the number of bytes that memory can hold.
     * @returns {Number} the number of bytes of memory
     */
    this.size = function () {
        return size;
    };
    
    this.clear();
}

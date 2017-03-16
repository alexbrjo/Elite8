/**
 * The CPU 
 */
function Cpu () {
    /* Registers and flags */
    this.gre = [0, 0, 0, 0];
    this.sign = [];
    this.zero = false;
    this.parity = false;
    this.carry = false;
    this.instructions = operation;
    
    /**
     * 
     */
    this.cycle = function () {
        
    };
}


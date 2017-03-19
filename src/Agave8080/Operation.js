/**
 * All of the opcodes for the Intel 8008
 */
var operation = {
    
    HLT: 0xFF, // halts the cpu
    
    /** Jump */
    JMP: 0x44, // unconditional jump
    JNC: 0x40, // jump if carry = 0
    JNZ: 0x48, // jump if zero  = 0
    JP:  0x50, // jump if sign  = 0
    JPO: 0x58, // jump if parity= 0 
    JC:  0x60, // jump if carry = 1
    JZ:  0x68, // jump if zero  = 1
    JM:  0x70, // jump if sign  = 1
    JPE: 0x78, // jump if parity= 1
    
    /** Call (push address and jump) */
    CALL:0x46, // unconditional call 
    CNC: 0x42, // call if carry = 0
    CNZ: 0x4A, // call if zero  = 0
    CP:  0x52, // call if sign  = 0
    CPO: 0x5A, // call if parity= 0 
    CC:  0x62, // call if carry = 1
    CZ:  0x6A, // call if zero  = 1
    CM:  0x72, // call if sign  = 1
    CPE: 0x7A, // call if parity= 1
    
    /** Return (pop address and jump back) */
    RET: 0x44, // unconditional return 
    RNC: 0x40, // return if carry = 0
    RNZ: 0x46, // return if zero  = 0
    RP:  0x50, // return if sign  = 0
    RPO: 0x58, // return if parity= 0 
    RC:  0x60, // return if carry = 1
    RZ:  0x68, // return if zero  = 1
    RM:  0x70, // return if sign  = 1
    RPE: 0x78, // return if parity= 1
    
    /** Return to Subroutine at 'R' */
    RST_A: 0x05, // return to subroutine at A
    RST_B: 0x15, // return to subroutine at B
    RST_C: 0x25, // return to subroutine at C
    RST_D: 0x35, // return to subroutine at D
    RST_E: 0x0D, // return to subroutine at E
    RST_H: 0x1D, // return to subroutine at H
    RST_L: 0x2D, // return to subroutine at L
    RST_M: 0x3D, // return to subroutine at M
    
    /** Input */
    
    /** Output */
    
    /** Load */
    
    /** Rotate byte */
    RLC: 0x02, // rotate content of A left
    RRC: 0x0A, // rotate content of A right
    RAL: 0x12, // rotate content of A left through CY
    RAR: 0x1A, // rotate content of A right through CY
    
    /** Addition */
    ADD_A: 0x80, // ADD A to A
    ADD_B: 0x81, // ADD B to A
    ADD_C: 0x82, // ADD C to A
    ADD_D: 0x83, // ADD D to A
    ADD_E: 0x84, // ADD E to A
    ADD_H: 0x85, // ADD H to A
    ADD_L: 0x86, // ADD L to A
    ADD_M: 0x87, // ADD M to A
    ADD_I: 0x04, // ADD immed to A
    
    /** Addition with Carry */
    ADC_A: 0x80, // ADD A + Carry to A
    ADC_B: 0x81, // ADD B + Carry to A
    ADC_C: 0x82, // ADD C + Carry to A
    ADC_D: 0x83, // ADD D + Carry to A
    ADC_E: 0x84, // ADD E + Carry to A
    ADC_H: 0x85, // ADD H + Carry to A
    ADC_L: 0x86, // ADD L + Carry to A
    ADC_M: 0x87, // ADD M + Carry to A
    ADC_I: 0x0C, // ADD immed + Carry to A
    
};


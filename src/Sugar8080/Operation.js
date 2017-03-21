/**
 * The Agave 8080 Instruction Set
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
    ROL: 0x02, // rotate content of A left
    ROR: 0x0A, // rotate content of A right
    RCL: 0x12, // rotate content of A left through CY
    RCR: 0x1A, // rotate content of A right through CY
    
    /** Math operations: add, subtract, and, xor, or and compare */
    ADD_B: 0x80, ADC_B: 0x88, SUB_B: 0x90, SBB_B: 0x98,
    ADD_C: 0x81, ADC_C: 0x89, SUB_C: 0x91, SBB_C: 0x99,
    ADD_D: 0x82, ADC_D: 0x8A, SUB_D: 0x92, SBB_D: 0x9A,
    ADD_E: 0x83, ADC_E: 0x8B, SUB_E: 0x93, SBB_E: 0x9B,
    ADD_H: 0x84, ADC_H: 0x8C, SUB_H: 0x94, SBB_H: 0x9C,
    ADD_L: 0x85, ADC_L: 0x8D, SUB_L: 0x95, SBB_L: 0x9D,
    ADD_M: 0x86, ADC_M: 0x8E, SUB_M: 0x96, SBB_M: 0x9E,
    ADD_A: 0x87, ADC_A: 0x8F, SUB_A: 0x97, SBB_A: 0x9F,
    ADD_I: 0xC6, ADC_I: 0xEE, SUB_I: 0xE6, SBB_I: 0xEE,
    
    AND_B: 0xA0, XOR_B: 0xA8, OR_B: 0xB0, CMP_B: 0xB8,
    AND_C: 0xA1, XOR_C: 0xA9, OR_C: 0xB1, CMP_C: 0xB9,
    AND_D: 0xA2, XOR_D: 0xAA, OR_D: 0xB2, CMP_D: 0xBA,
    AND_E: 0xA3, XOR_E: 0xAB, OR_E: 0xB3, CMP_E: 0xBB,
    AND_H: 0xA4, XOR_H: 0xAC, OR_H: 0xB4, CMP_H: 0xBC,
    AND_L: 0xA5, XOR_L: 0xAD, OR_L: 0xB5, CMP_L: 0xBD,
    AND_M: 0xA6, XOR_M: 0xAE, OR_M: 0xB6, CMP_M: 0xBE,
    AND_A: 0xA7, XOR_A: 0xAF, OR_A: 0xB7, CMP_A: 0xBF,
    AND_I: 0xD6, XOR_I: 0xFE, OR_I: 0xD6, CMP_I: 0xFE,
    
    /* Move operations */
    MOV_B_B: 0x40, MOV_D_B: 0x50, MOV_H_B: 0x60, MOV_M_B: 0x70,
    MOV_B_C: 0x41, MOV_D_C: 0x51, MOV_H_C: 0x61, MOV_M_C: 0x71,
    MOV_B_D: 0x42, MOV_D_D: 0x52, MOV_H_D: 0x62, MOV_M_D: 0x72,
    MOV_B_E: 0x43, MOV_D_E: 0x53, MOV_H_E: 0x63, MOV_M_E: 0x73,
    MOV_B_H: 0x44, MOV_D_H: 0x54, MOV_H_H: 0x64, MOV_M_H: 0x74,
    MOV_B_L: 0x45, MOV_D_L: 0x55, MOV_H_L: 0x65, MOV_M_L: 0x75,
    MOV_B_M: 0x46, MOV_D_M: 0x56, MOV_H_M: 0x66, MOV_M_M: 0x76,
    MOV_B_A: 0x47, MOV_D_A: 0x57, MOV_H_A: 0x67, MOV_M_A: 0x77,
    
    MOV_C_B: 0x48, MOV_E_B: 0x58, MOV_L_B: 0x68, MOV_A_B: 0x78,
    MOV_C_C: 0x49, MOV_E_C: 0x59, MOV_L_C: 0x69, MOV_A_C: 0x79, 
    MOV_C_D: 0x4A, MOV_E_D: 0x5A, MOV_L_D: 0x6A, MOV_A_D: 0x7A,
    MOV_C_E: 0x4B, MOV_E_E: 0x5B, MOV_L_E: 0x6B, MOV_A_E: 0x7B,
    MOV_C_H: 0x4C, MOV_E_H: 0x5C, MOV_L_H: 0x6C, MOV_A_H: 0x7C,
    MOV_C_L: 0x4D, MOV_E_L: 0x5D, MOV_L_L: 0x6D, MOV_A_L: 0x7D,
    MOV_C_M: 0x4E, MOV_E_M: 0x5E, MOV_L_M: 0x6E, MOV_A_M: 0x7E,
    MOV_C_A: 0x4F, MOV_E_A: 0x5F, MOV_L_A: 0x6F, MOV_A_A: 0x7F
};


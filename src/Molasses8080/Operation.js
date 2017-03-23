/**
 * The Molasses8080 Instruction Set
 */
var operation = {
    
    /** Control group */
    NOP: 0x00,
    HLT: 0x76, // halts the cpu
    IN:  0xD3,
    OUT: 0xDB,
    DI:  0xF3,
    EI:  0xFB,
    
    /** Jump */
    JMP: 0xC3, // unconditional jump
    JNZ: 0xC2, // jump if zero  = 0
    JNC: 0xD2, // jump if carry = 0
    JPO: 0xE2, // jump if parity= 0 
    JP:  0xF2, // jump if sign  = 0
    JZ:  0xCA, // jump if zero  = 1
    JC:  0xDA, // jump if carry = 1
    JPE: 0xEA, // jump if parity= 1
    JM:  0xFA, // jump if sign  = 1
    
    /** Call (push address and jump) */
    CALL:0xCD, // unconditional call 
    CNZ: 0xC4, // call if zero  = 0
    CNC: 0xD4, // call if carry = 0
    CPO: 0xE4, // call if parity= 0 
    CP:  0xF4, // call if sign  = 0
    CZ:  0xCC, // call if zero  = 1
    CC:  0xDC, // call if carry = 1
    CPE: 0xEC, // call if parity= 1
    CM:  0xFC, // call if sign  = 1
    
    /** Return (pop address and jump back) */
    RET: 0xC8, // unconditional return 
    RNZ: 0xC0, // return if zero  = 0
    RNC: 0xD0, // return if carry = 0
    RPO: 0xE0, // return if parity= 0 
    RP:  0xF0, // return if sign  = 0
    RZ:  0xC8, // return if zero  = 1
    RC:  0xD8, // return if carry = 1
    RPE: 0xE8, // return if parity= 1
    RM:  0xF8, // return if sign  = 1
    
    /** Return to Subroutine at 'R' */
    RST_0: 0xC7, // return to subroutine at 0
    RST_1: 0xC8, // return to subroutine at 1
    RST_2: 0xD7, // return to subroutine at 2
    RST_3: 0xD8, // return to subroutine at 3
    RST_4: 0xE7, // return to subroutine at 4
    RST_5: 0xE8, // return to subroutine at 5
    RST_6: 0xF7, // return to subroutine at 6
    RST_7: 0xF8, // return to subroutine at 7
    
    /** Rotate byte */
    RCL: 0x07, // rotate content of A left through CY
    RAL: 0x17, // rotate content of A left
    RCR: 0x0F, // rotate content of A right through CY
    RAR: 0x1F, // rotate content of A right
    
    // LXI, STAX, SHLD, STA, INX, INR, DCR, MVI, 
    // DAA, STI, CMA, CMC, LDAX, LDA, LHLD, DAD,
    // PUSH, POP, XTHL, XCHG, PCHL, SPHL
    
    /** Math operations: add, subtract, and, xor, or and compare */
    ADD_B: 0x80, ADC_B: 0x88, SUB_B: 0x90, SBB_B: 0x98,
    ADD_C: 0x81, ADC_C: 0x89, SUB_C: 0x91, SBB_C: 0x99,
    ADD_D: 0x82, ADC_D: 0x8A, SUB_D: 0x92, SBB_D: 0x9A,
    ADD_E: 0x83, ADC_E: 0x8B, SUB_E: 0x93, SBB_E: 0x9B,
    ADD_H: 0x84, ADC_H: 0x8C, SUB_H: 0x94, SBB_H: 0x9C,
    ADD_L: 0x85, ADC_L: 0x8D, SUB_L: 0x95, SBB_L: 0x9D,
    ADD_M: 0x86, ADC_M: 0x8E, SUB_M: 0x96, SBB_M: 0x9E,
    ADD_A: 0x87, ADC_A: 0x8F, SUB_A: 0x97, SBB_A: 0x9F,
    ADI:   0xC6, ACI:   0xCE, SUI:   0xD6, SBI:   0xDE,
    
    ANA_B: 0xA0, XRA_B: 0xA8, ORA_B: 0xB0, CMP_B: 0xB8,
    ANA_C: 0xA1, XRA_C: 0xA9, ORA_C: 0xB1, CMP_C: 0xB9,
    ANA_D: 0xA2, XRA_D: 0xAA, ORA_D: 0xB2, CMP_D: 0xBA,
    ANA_E: 0xA3, XRA_E: 0xAB, ORA_E: 0xB3, CMP_E: 0xBB,
    ANA_H: 0xA4, XRA_H: 0xAC, ORA_H: 0xB4, CMP_H: 0xBC,
    ANA_L: 0xA5, XRA_L: 0xAD, ORA_L: 0xB5, CMP_L: 0xBD,
    ANA_M: 0xA6, XRA_M: 0xAE, ORA_M: 0xB6, CMP_M: 0xBE,
    ANA_A: 0xA7, XRA_A: 0xAF, ORA_A: 0xB7, CMP_A: 0xBF,
    ANI  : 0xE6, XRI:   0xEE, ORI:  0xF6, CPI:   0xFE,
    
    /* Move operations */
    MOV_B_B: 0x40, MOV_D_B: 0x50, MOV_H_B: 0x60, MOV_M_B: 0x70,
    MOV_B_C: 0x41, MOV_D_C: 0x51, MOV_H_C: 0x61, MOV_M_C: 0x71,
    MOV_B_D: 0x42, MOV_D_D: 0x52, MOV_H_D: 0x62, MOV_M_D: 0x72,
    MOV_B_E: 0x43, MOV_D_E: 0x53, MOV_H_E: 0x63, MOV_M_E: 0x73,
    MOV_B_H: 0x44, MOV_D_H: 0x54, MOV_H_H: 0x64, MOV_M_H: 0x74,
    MOV_B_L: 0x45, MOV_D_L: 0x55, MOV_H_L: 0x65, MOV_M_L: 0x75,
    MOV_B_M: 0x46, MOV_D_M: 0x56, MOV_H_M: 0x66, // HALT  0x76
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

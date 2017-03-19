/** Instruction:     ADD #                   Opcode:         0x80-0x80    *
 *  Bytes:            2                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the immediate value to register A                  **/
operation[operation.ADD_I] = function (reg, a) {
    var sum = reg.A + a; // sum A and immediate value
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 2;                // next instruction, skip over immediate value
};

/** Instruction:     ADD R                   Opcode:         0x80-0x87    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' to register A            **/

/* Add 'R' for A */
operation[0x80] = function (reg) {
    var sum = reg.A + reg.A; // sum A and A
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for B */
operation[0x81] = function (reg) {
    var sum = reg.A + reg.B; // sum A and B
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for C */
operation[0x82] = function (reg) {
    var sum = reg.A + reg.C; // sum A and C
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for D */
operation[0x83] = function (reg) {
    var sum = reg.A + reg.D; // sum A and D
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for E */
operation[0x84] = function (reg) {
    var sum = reg.A + reg.E; // sum A and E
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;      // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for H */
operation[0x85] = function (reg) {
    var sum = reg.A + reg.H; // sum A and H
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for L */
operation[0x86] = function (reg) {
    var sum = reg.A + reg.L; // sum A and L
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for M */
operation[0x88] = function (reg) {
    var sum = reg.A + reg.M; // sum A and M
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0;       // set zero flag
    reg.PARITY = sum % 2 === 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/** Instruction:     ADC R                   Opcode:         0x88-0x8F    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' and carry flag to A      **/
// TODO UNSURE ABOUT CARRY FLAG ADDITION

/* ADC 'R' for A */
operation[0x88] = operation[0x80];
/* ADC 'R' for B */
operation[0x89] = operation[0x81];
/* ADC 'R' for C */
operation[0x8A] = operation[0x82];
/* ADC 'R' for D */
operation[0x8B] = operation[0x83];
/* ADC 'R' for E */
operation[0x8C] = operation[0x84];
/* ADC 'R' for H */
operation[0x8D] = operation[0x85];
/* ADC 'R' for L */
operation[0x8E] = operation[0x86];
/* ADC 'R' for M */
operation[0x8F] = operation[0x87];

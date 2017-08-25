# User Guide

Directives other than mnemonics that the assembler adds for the user.

## Define bytes
```asm
"any text and $ymb@ls", 0
22, 70, 65, 68, 71, 0
0x0, 0xFF, 0b01001101, 0x0
```

# Comments
```asm
; this is a comment
; also a comment MOV B,A

    MOV B,A     ; inline comment
    ADD C

    ; comment
```


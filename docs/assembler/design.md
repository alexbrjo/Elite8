# Assembler Design

```asm
; input coming into the PreProcessor
global_label
    MOV A,B
    ADI 8
.local_label
    DCR B
    JNZ .local_label
```

## PreProcessor FSM

```
{FIRST_CHAR} <----------------------------------------------------------+
     |                                                                  |
     +-----[0-9]------> {BEGIN_NUMBER} ------+                          |
     |                                       |----> {CONVERT_TO_BYTES}--+
     +-----[\"\']-----> {BEGIN_LITERAL} -----+                          |
     |                                                                  |
     +--[$_a-zA-Z\.]--> {BEGIN_TOKEN} --[\ \"\,]--> {ID_TOKEN}----------+
                          [$_a-zA-Z0-9]
 
Valid token: [\.]{0,1}[$_a-zA-Z]{1}[$_a-zA-Z0-9]{0,24}
Valid string literal: ^(\").*?\"|^(\').*?\'
```

```asm
#export global_label 0x0
0x0000    MOV A,B
0x0001    ADI 8
0x0002    DCR B
0x0003    JNZ 0x00 0x02
```

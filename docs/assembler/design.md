# Assembler Design

Assembly is inputted as a `String` and outputted as bytecode. The assembler has
two parts:
 - Preprocessor
   - Comments are not retained
   - Calculate local labels
   - Convert all values to hex literals
 - Compiler
   - Global labels are ignored (future functionality?)
   - Instructions are converted to bytecode

```asm
; input coming into the PreProcessor
db "abc", 0
global_label
    MOV A,B
    ADI 8
.local_label
    DCR B
    JNZ .local_label
```

## PreProcessor FSM

```
{FIRST_CHAR} <----------------------------------------------------+
     |                                                            |
     +-----[0-9]------> {NUMBER} ------+                          |
     |                                 |----> {CONVERT_TO_BYTES}--+
     +-----[\"\']-----> {LITERAL} -----+                          |
     |                                                            |
     +--[$_a-zA-Z\.]--> {TOKEN} --[\ \"\,]--> {ID_TOKEN}----------+
                     [$_a-zA-Z0-9]
 
Valid token: [\.]{0,1}[$_a-zA-Z]{1}[$_a-zA-Z0-9]{0,24}
Valid string literal: ^(\").*?\"|^(\').*?\'
```

## Compiler

In

```asm
#export global_label 0x0
0x0000    db 65, 66, 67, 0
0x0001    MOV A,B
0x0002    ADI 8
0x0003    DCR B
0x0004    JNZ 0x00 0x02
```

Out

```
78 C6 08 05 C2 00 02
```

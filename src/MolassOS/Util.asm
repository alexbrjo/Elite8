; 
; Util functions provided by the OS
;

[8 BITS]

; Print String routine
; Prints the string at the current memory location M
print
    MOV M, A
    CMP M
    
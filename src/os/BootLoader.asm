; 
; MolassOS BootLoader : this is compiled and loaded into the BootSector of the 
;       Molasses8080 memory.
; POST > BIOS > Boot Sector
;
; author: Alex Johnson
;

[8 BITS]

times 510 - ($ - $$) db 0

dw 0xAA55

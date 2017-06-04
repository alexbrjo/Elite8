# MolassOS: the OS

## Lower Memory in Real 8-Bit Mode

The eight 8-byte long interrupt routines go in the first 64 bytes of memory. Memory is 32x10 UTF-8 encoded terminal output. All BIOS functions happen in the 1024 bytes after video memory but before the BootSector. The Boot Sector is 512 bytes, which is pretty standard.

| Address | Memory \(bytes\) |  |
| --- | --- | --- |
| 0x800 | - | Free for OS |
| 0x600 | 512 | Boot Sector |
| 0x200 | 1024 | BIOS |
| 0x40 | 448 | Video Memory |
| 0x0 | 64 | Interrupt Vector Table |




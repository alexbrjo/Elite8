# ![](logo.png)

MolassOS is an Intel 8080 microprocessor, assembler and bare-bones operating system that can run in your web browser.

```js
// Creates a new processor with os
var cpu = MolassOS.create(2048);
var canvas = document.getElementById('canvas');

// Give the simulator an output 
cpu.bindToCanvas(canvas);
canvas.onKeyEvent = cpu.input;

// starts the computer
cpu.boot();
```

## Hardware Simulator

Simulates the Intel 8080 microprocessor, it's registers and memory. Can be used with a loaded OS.

## Assembler

Highly coupled with the simulator, the assembler uses defined op-code mappings to assembly text from .asm files to Intel 8080 byte code.

## Operating System

Written in 8-bit Intel 8080 assembly this code is assembled to byte-code and stored in memory to run. The planned featured of the OS are a BootSector, BIOS and developer utils.


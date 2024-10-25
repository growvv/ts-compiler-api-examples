
let i: number;
for (i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    if (i == 5) {
        break;
    }
    
    console.log(i);
}

export class ControlFlowAndStructures {
    constructor() {
        console.log('ControlFlowAndStructures constructor');
    }
}

export namespace ControlFlowAndStructures {
    export function run() {
        console.log('ControlFlowAndStructures run');
    }
}

/**
 * Documentation for C
 */
class C {
    /**
     * constructor documentation
     * @param a my parameter documentation
     * @param b another parameter documentation
     */
    constructor(a: string, b: C) { }
}
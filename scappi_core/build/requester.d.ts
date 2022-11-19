/// <reference types="node" />
import { Validator } from './validator.js';
declare class Requester {
    id: string;
    number_of_validators: number;
    tiws: string[];
    constructor(tiws?: string[], number_of_validators?: number, id?: string);
    select_validators(available_validators: Validator[]): Validator[];
}
declare function shamir_share(n: number, scas_id: string): [Buffer];
declare function create_ScadId(size?: number): string;
export { Requester, shamir_share, create_ScadId };
//# sourceMappingURL=requester.d.ts.map
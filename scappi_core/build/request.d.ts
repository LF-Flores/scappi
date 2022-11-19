/// <reference types="node" />
import Requester from './requester.js';
import { Validator, ValidatorsPool } from './validator.js';
export default class Request {
    id: string;
    requester: Requester;
    shards: Buffer[];
    selected_validators: Validator[];
    constructor(requester: Requester, available_validators: ValidatorsPool);
    shamir_share(n: number, scas_id: string): [Buffer];
}
//# sourceMappingURL=request.d.ts.map
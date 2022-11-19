import { ValidatorsPool, Validator } from './validator.js';
import { Requester } from './requester';
export default class SCAS {
    available_validators_pool: ValidatorsPool;
    requester: Requester;
    constructor(available_validators: ValidatorsPool, requester: Requester);
    select_validators(): Validator[];
}
//# sourceMappingURL=scas.d.ts.map
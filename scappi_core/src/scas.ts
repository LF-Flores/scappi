import { ValidatorsPool, Validator } from './validator.js';
import { Requester } from './requester';

export default class SCAS {
    available_validators_pool: ValidatorsPool;
    requester: Requester;

    constructor(available_validators: ValidatorsPool, requester: Requester) {
        this.available_validators_pool = available_validators;
        this.requester = requester;
    }

    select_validators(): Validator[] {
        const shuffled = [...this.available_validators_pool.validators]
                         .sort(() => 0.5 - Math.random());
        return shuffled.slice(0, this.requester.number_of_validators);
    }
}
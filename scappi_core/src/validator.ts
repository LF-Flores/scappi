import { random_id } from "./utils.js"

class Validator {
    id: string;

    constructor(size_of_id: number = 20) {
        this.id = random_id(size_of_id)  
    }
}

class ValidatorsPool {
    validators: Validator[]
    consensus_table: Map<string, string>

    constructor(how_many: number = 10) {
        this.validators = random_validators(how_many)
        this.consensus_table = new Map()
    }
}

function random_validators(how_many = 10, size_of_id = 20): Validator[] {
    const validators = Array.from(
        Array(how_many).keys(), 
        (_) => {
            return new Validator(size_of_id)
        }
    )
    return validators
}

export {
    Validator,
    ValidatorsPool
}
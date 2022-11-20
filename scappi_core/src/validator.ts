import { random_id } from "./utils.js"
import { SignUpRequest, AuthRequest } from "./requests.js"
import { SHA256 } from 'crypto-ts';

class Validator {
    id: string
    secrets: string[]

    constructor(size_of_id: number = 20) {
        this.id = random_id(size_of_id)  
        this.secrets = []
    }

    accept_signup_request(scas_shard: string) {
        this.secrets.push(scas_shard)
    }

    applicable_auth_request(request: AuthRequest, consensus_table: Map<string, string>): boolean {
        let applicable = false

        for (let secret in this.secrets) {
            const key = SHA256(secret.concat(request.hash))
            if (consensus_table.get(key) == request.hash) {
                applicable = true
            }
        }

        return applicable
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
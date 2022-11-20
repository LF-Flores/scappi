import Requester from './requester.js'
import { Validator, ValidatorsPool } from './validator.js'
import SCAS from './scas.js'
import { random_id } from "./utils.js"
import { SHA256 } from 'crypto-ts';
import sss from 'shamirs-secret-sharing'

class Request {
    id: string
    requester: Requester

    constructor(requester: Requester) {
        this.id = random_id()
        this.requester = requester
    }

    send() {
        // Manage the validator-requester interaction logic with Filecoin
    }
}

class SignUpRequest extends Request {
    shards: Buffer[]
    selected_validators: Validator[]

    constructor(requester: Requester, available_validators: ValidatorsPool) {
        super(requester)
        const n = requester.number_of_validators
        this.shards = this.shamir_share(n, requester.scasid)
        const scas = new SCAS(available_validators, requester)
        this.selected_validators = scas.select_validators()
    }

    shamir_share(n: number, scas_id: string): [Buffer] {
        const secret = Buffer.from(scas_id)
        return sss.split(secret, { shares: n, threshold: n })
    }
}

class AuthRequest extends Request {
    hash: string

    constructor(requester: Requester, address: string) {
        super(requester)
        this.hash = SHA256(address)
    }
}

export {
    SignUpRequest,
    AuthRequest
}
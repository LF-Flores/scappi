import { random_id } from "./utils.js"
import { SignUpRequest, AuthRequest } from "./requests.js"
import { ValidatorsPool } from "./validator.js";

export default class Requester {
    id: string;
    number_of_validators: number;
    tiws: string[];
    scasid: string;

    constructor
    (
    tiws = generate_random_tiws(), 
    number_of_validators = 4, 
    id = random_id(20)
    ) 
    {
        this.tiws = tiws;
        this.number_of_validators = number_of_validators;
        this.id = id;
        this.scasid = this.create_ScadId(number_of_validators)
    }

    create_ScadId(size: number = 20): string {
        return random_id(size)
    }

    create_signup_request(available_validators: ValidatorsPool) {
        return new SignUpRequest(this, available_validators)
    }

    create_authentication_request(wallet_address: string) {
        return new AuthRequest(this, wallet_address)
    }
}

function generate_random_tiws(how_many = 3, id_length = 20) {
    return Array.from(Array(how_many).keys(), (_) => random_id(id_length))
}
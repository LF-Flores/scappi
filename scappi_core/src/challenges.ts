import { Validator } from "./validator.js";
import { Request } from "./requests.js";
import Requester from "./requester.js";

class IndividualChallenge {
    validator: Validator
    requester: Requester
    value: number
    // Add counter's logic

    constructor(validator: Validator, request: Request) {
        this.value = Math.floor((Math.random() * 100) + 1)
        this.validator = validator
        this.requester = request.requester
    }
}

class CollectiveChallenge {

}

export {
    IndividualChallenge,
    CollectiveChallenge
}
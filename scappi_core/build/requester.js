import sss from 'shamirs-secret-sharing';
import random_id from "./utils.js";
class Requester {
    id;
    number_of_validators;
    tiws;
    constructor(tiws = Array.from(Array(3).keys(), (_) => random_id(20)), number_of_validators = 4, id = random_id(20)) {
        this.tiws = tiws;
        this.number_of_validators = number_of_validators;
        this.id = id;
    }
    select_validators(available_validators) {
        const shuffled = [...available_validators].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, this.number_of_validators);
    }
}
function shamir_share(n, scas_id) {
    const secret = Buffer.from(scas_id);
    return sss.split(secret, { shares: n, threshold: n });
}
function create_ScadId(size = 20) {
    return random_id(size);
}
export { Requester, shamir_share, create_ScadId };

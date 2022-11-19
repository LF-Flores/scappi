import { random_id } from "./utils.js";
import Request from "./request.js";
export default class Requester {
    id;
    number_of_validators;
    tiws;
    scasid;
    constructor(tiws = generate_random_tiws(), number_of_validators = 4, id = random_id(20)) {
        this.tiws = tiws;
        this.number_of_validators = number_of_validators;
        this.id = id;
        this.scasid = this.create_ScadId(number_of_validators);
    }
    create_ScadId(size = 20) {
        return random_id(size);
    }
    create_request(available_validators) {
        return new Request(this, available_validators);
    }
}
function generate_random_tiws(how_many = 3, id_length = 20) {
    return Array.from(Array(how_many).keys(), (_) => random_id(id_length));
}

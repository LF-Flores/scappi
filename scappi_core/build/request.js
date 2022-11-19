import SCAS from './scas.js';
import { random_id } from "./utils.js";
import sss from 'shamirs-secret-sharing';
export default class Request {
    id;
    requester;
    shards;
    selected_validators;
    constructor(requester, available_validators) {
        this.id = random_id();
        this.requester = requester;
        const n = requester.number_of_validators;
        this.shards = this.shamir_share(n, requester.scasid);
        const scas = new SCAS(available_validators, requester);
        this.selected_validators = scas.select_validators();
    }
    shamir_share(n, scas_id) {
        const secret = Buffer.from(scas_id);
        return sss.split(secret, { shares: n, threshold: n });
    }
}

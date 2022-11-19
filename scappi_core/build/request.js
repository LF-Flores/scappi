import { random_id } from "./utils.js";
import sss from 'shamirs-secret-sharing';
export default class Request {
    id;
    requester;
    shards;
    constructor(requester) {
        this.id = random_id();
        this.requester = requester;
        const n = requester.number_of_validators;
        this.shards = this.shamir_share(n, requester.scasid);
    }
    shamir_share(n, scas_id) {
        const secret = Buffer.from(scas_id);
        return sss.split(secret, { shares: n, threshold: n });
    }
}

import Requester from './requester.js'
import { random_id } from "./utils.js"
import sss from 'shamirs-secret-sharing'

export default class Request {
    id: string
    requester: Requester
    shards: Buffer[]

    constructor(requester: Requester) {
        this.id = random_id()
        this.requester = requester
        const n = requester.number_of_validators
        this.shards = this.shamir_share(n, requester.scasid)
    }

    shamir_share(n: number, scas_id: string): [Buffer] {
        const secret = Buffer.from(scas_id)
        return sss.split(secret, { shares: n, threshold: n })
    }
}
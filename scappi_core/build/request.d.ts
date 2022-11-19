/// <reference types="node" />
import Requester from './requester.js';
export default class Request {
    id: string;
    requester: Requester;
    shards: Buffer[];
    constructor(requester: Requester);
    shamir_share(n: number, scas_id: string): [Buffer];
}
//# sourceMappingURL=request.d.ts.map
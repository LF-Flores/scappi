import Request from "./request.js";
export default class Requester {
    id: string;
    number_of_validators: number;
    tiws: string[];
    scasid: string;
    constructor(tiws?: string[], number_of_validators?: number, id?: string);
    create_ScadId(size?: number): string;
    create_request(): Request;
}
//# sourceMappingURL=requester.d.ts.map
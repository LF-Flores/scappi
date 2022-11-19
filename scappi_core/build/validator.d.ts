declare class Validator {
    id: string;
    constructor(size_of_id?: number);
}
declare class ValidatorsPool {
    validators: Validator[];
    consensus_table: Map<string, string>;
    constructor(how_many?: number);
}
export { Validator, ValidatorsPool };
//# sourceMappingURL=validator.d.ts.map
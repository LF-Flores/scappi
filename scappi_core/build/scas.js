export default class SCAS {
    available_validators_pool;
    requester;
    constructor(available_validators, requester) {
        this.available_validators_pool = available_validators;
        this.requester = requester;
    }
    select_validators() {
        const shuffled = [...this.available_validators_pool.validators]
            .sort(() => 0.5 - Math.random());
        return shuffled.slice(0, this.requester.number_of_validators);
    }
}

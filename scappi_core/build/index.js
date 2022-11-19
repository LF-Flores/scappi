import Requester from './requester.js';
import { ValidatorsPool } from './validator.js';
// Agents
const available_validators = new ValidatorsPool();
const user = new Requester();
// Creating request with the available validators.
const request = user.create_request(available_validators);
// Exploring 
const selected = request.selected_validators;
console.log(request, "\n");
console.log(available_validators, "\n");
console.log("Selected validators: ", selected, "\n");

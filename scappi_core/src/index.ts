import Requester from './requester.js'
import { ValidatorsPool } from './validator.js'

// Agents
const available_validators = new ValidatorsPool()
const user = new Requester()

// Creating request with the available validators.
const request = user.create_signup_request(available_validators)

// Requests
const signup = user.create_signup_request(available_validators)
const auth = user.create_authentication_request("0x850fC23aCC279352e7d7793a011742eC8743b2a7")

// Exploring 
const selected = request.selected_validators

console.log(request, "\n")
console.log(available_validators, "\n")
console.log(signup, "\n")
console.log(auth, "\n")
console.log("Selected validators: ", selected, "\n")
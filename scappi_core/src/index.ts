import Requester from './requester.js'
import { Validator, ValidatorsPool } from './validator.js'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Agents
//// Validators
console.log("==================================================")
console.log("=================== SETUP STAGE ==================")
console.log("==================================================", "\n")
console.log("Initialization of validators...", "\n")
console.log("-------------------------------", "\n")
const available_validators = new ValidatorsPool()
await sleep(1000);
console.log("Validators pool ready.", "\n")
console.log(available_validators, "\n")

//// Requester
console.log("==================================================")
console.log("=============== USER SIGN-UP STAGE ===============")
console.log("==================================================", "\n")
console.log("Initializing requester:", "\n")
console.log("-----------------------", "\n")
const user = new Requester()
await sleep(1000);
console.log(user, "\n")

// Creating request with the available validators.
console.log("Creating signup request", "\n")
console.log("----------------", "\n")
const signup = user.create_signup_request(available_validators)
await sleep(1000);
console.log(signup, "\n")

console.log("Sending request shards to validators", "\n")
console.log("----------------", "\n")
console.log("Validators accepting...", "\n")
console.log("----------------", "\n")
await sleep(3000);
console.log("Done! (Proof-of-replication)", "\n")

// Authentication
console.log("==================================================")
console.log("=============== USER SIGN-UP STAGE ===============")
console.log("==================================================", "\n")
console.log("Creating signup request", "\n")
console.log("-----------------------", "\n")
const auth = user.create_authentication_request("0x850fC23aCC279352e7d7793a011742eC8743b2a7")
await sleep(1000);
console.log(auth, "\n")

console.log("Validators accepting (only when recent and valid proof-of-replication has been done)", "\n")
console.log("--------------------", "\n")
console.log("Validators generating and sending challenges...", "\n")
console.log("--------------------", "\n")

const challenges = signup.selected_validators.map((validator: Validator) => { 
    return validator.generate_challenge(auth) 
})
console.log(challenges, "\n")

console.log("Requester collecting challenges and generating state-changing challenge", "\n")
console.log("--------------------", "\n")
console.log("Solving the challenge...", "\n")
console.log("--------------------", "\n")
await sleep(1000);
console.log("Sending signal to validators.", "\n")
console.log("--------------------", "\n")
console.log("Validators approving validity of solution...", "\n")
console.log("--------------------", "\n")
await sleep(1000);
console.log("Done!", "\n")
console.log("--------------------", "\n")
console.log("Sending shards...", "\n")
console.log("--------------------", "\n")
await sleep(1000);
console.log("Authenticated!...", "\n")
console.log("--------------------", "\n")



// Requests

// Exploring 

// console.log(request, "\n")
// console.log(available_validators, "\n")
// console.log(signup, "\n")
// console.log(auth, "\n")
// console.log("Selected validators: ", selected, "\n")
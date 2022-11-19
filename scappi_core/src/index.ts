import Requester from './requester.js'
import { ValidatorsPool } from './validator.js'
import SCAS from './scas.js'


const available_validators = new ValidatorsPool()
const user = new Requester()
const request = user.create_request()
const scas = new SCAS(available_validators, user)
const selected = scas.select_validators()

console.log(request, "\n")
console.log(available_validators, "\n")
console.log("Selected validators: ", selected, "\n")
import { Requester, shamir_share, create_ScadId } from './requester.js'
import { ValidatorsPool } from './validator.js'
import SCAS from './scas.js'

const secret = create_ScadId()
const shards = shamir_share(3, secret)

const available_validators = new ValidatorsPool()
const user = new Requester()
const scas = new SCAS(available_validators, user)
const selected = scas.select_validators()

console.log(shards)
console.log(available_validators)
console.log(selected)
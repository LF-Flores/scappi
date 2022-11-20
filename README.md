# Scappi
Decentralized, chain-agnostic, authentication protocol. An implementation of a State-changing authentication scheme (SCAS).

Authenticating yourself to a system should not rely on a centralized entity nor depend on complex specifics of each chain: Your identity is more yours than it is the system’s. Cross-chain identity means you will be able to authenticate to many blockchains with the same procedure, agnostic of each chain complexity and securely without a single point of failure.

# Motivation
What are your credentials on a blockchain? Your private key is your identity and ownership proof: That’s how you normally authenticate yourself to make operations.
    
This reflects the traits of two kinds of usual authentication schemes: 
    
- Knowledge-based (something the user knows), since private keys can be technically “known” (if memorized or managed by password manager)
- Ownership-based (something the user has), since they are more easily “owned” by some device representation (your mobile’s/pc’s storage, hardware wallet, etc.).
    
We propose a generalization for the third kind of authentication scheme: Inherence-based (something the user does), by leveraging the interactions the blockchain system enable external users to do to change its state. That is: an authentication scheme that assigns some unique state-changing capability to each user for them to authenticate themselves to the blockchain system. 

# How to run?
You need Typescript's compiler: `tsc` installed. Next, from the `scappi_core` directory, run `tsc && node build/index.js`.
    
# Scappi's Advantages    
Advantages with respect of traditional blockchain-authentication schemes:
    
1. **Parallel authentication:** You can authenticate to multiple chains with the same external action from the user, resulting in a parallel cross-chain authentication and a better user experience (no need for approval processes on multiple chains).
2. **Blockchain-two-factor authentication:** SCAS are more secure than private keys (single point of failure) when operations ask for the state of multiple chains to be changed: A blockchain-two-factor authentication process.
3. **Anti-theft mechanisms:** Anti-spoofing mechanisms are possible by systematically perturbing the state-changing operation that the spoofer is attempting, increasing overall security and robustness of the authentication process.
4. **Flexible:** SCAS can be based on many stimuli: 
   - Transaction capabilities of a combination of user-owned wallets (TIWs).
   - Function-calling capabilities on smart contract controlled by NFT ownership.
   - General on-chain data operations.
5. **Power in being General:** Popular systems and structures such as **social-recovery wallets**, **multi-signature schemes**, and **blockchain-events listeners** are generalized by SCAS in the sense that SCAS can simulate any of them and build on top of them:

| Scheme/system               | Simulated and generalized by |
|:----------------------------|:-----------------------------|
| Social recovery wallet      | TIW-based SCAS               |
| Multi-signature schemes     | NFT-based or TIW-based SCAS  |
| Blockchain-events listeners | On-chain data-based SCAS     |

# Cost
- **Issue:** Changing blockchain state usually requires more operations (and thus more resources) than just signing a transaction with a private key, resulting in some overall cost for each authentication request. 
- **Why is this not really an issue?:** This is only a problem if authentication is frequently needed. This makes SCA schemes more of a “upper layer protection” for crypto-assets and operations, as their use cases (recover a lost secret key, authenticate in front of a DAO, etc.) are not used as frequently as common transactions, but still need the robustness and flexibility of SCAS.

# Use cases
Additionaly to simulating any use case of the previously mentioned [schemes/systems](#Motivation), SCAS can be used specifically to:
- 100% decentralized protection and retrieval of some secret, such a private keys.
- Prove that the owner of two (or more) specific wallets on different chains belong to the same person. 
- Prove to a new chain that you have some presence history on some blockchain.
- Authenticate yourself to some service on the blockchain system in a trust-less way.

# Our implementation of a SCAS: Scappi
## Goal 
Authenticate a user uniquely using only decentralized resources and no intermediary secret. This means: 

- **Input**: Some action from the user, mapped into a set of states only they should be able to change from a given (but arbitrary) starting state. The state in a EVM-based chain can be described as a vector of accounts objects plus some EVM stack. For our purposes, our total state space will be the transaction history of each account and, for a given user, `u`, we define their unique associated state subspace, `S_u`, es the transaction history of some selected wallets. 
- **Output**: `Result<Bool>` that can take the following values: `Ok(True)`, `Ok(False)`, `Error`.

## Components
- Users = requesters: 
  - Initiate authentication requests to the smart contract. **Specifically**: Sends request (`hash(requester_address)`) to the request queue.
  - Performs state-changing action: Takes the initial state `s_0`, and changes it into some state from `S_u`, achievable from `s_0`. **Specifically:** sends transactions from the TIWs (dummy wallets we pretend the user can influence).
  - Can receive message from the validators (the SCAS shards).
  - Can reconstruct the SCAS shards into the original SCA token (SCAT). **Specifically**: `reconstruct_scat`
  
- Validators:
  - Listens to smart contract request queue. **Specifically**: Have a method called `subscribe_to_sca_contract(Address: String) -> Bool` (from JS) that returns confirmation of the subscription success.
  - Reacts to requests by accepting it (in case they have some SCAS shard for the respective user) or rejecting it otherwise. **Specifically**: Have a method called `applicable_request(request: String) -> { applicable: Bool, scas_shard: String }`
  - Checks changes of state on the blockchain after some time, T, post-acceptance of a request. **Specifically**: A method called `check_state(TIWs: Vec<Address>, request_id: String)`
  - Sends requester their SCAS shard. **Specifically**: `send_scas_shard`
  
- Mediator structure = Smart contract: 
  - Contains `request_queue: Vec<String>`
  - Contains `available_validators: Vec<String>`
  - Manages payment in filecoin to the validators.

# Stages of the protocol: An overview
## Setup stage:
1. Agents running validator nodes should exist in the network. 
2. All validator nodes subscribe to the smart contract by giving their given `id` to publicly announce on a `available_validators` array that they are subscribed.

## User sign-up stage
1. User wants to authenticate to the blockchain. They need to first “sign-up”. This requires to pay upfront for the time-window selected for the authentication to remain valid.
2. a `ScasId` is produced for the user by the `create_ScadId` function (random number). 
3. The `ScasID` is split by `shamir_sharing(n: Int, ScasID: String) -> Vec<String>` function into `n` pieces for `n` validators. We call these shards ******SCAS shards******.
4. User randomly selects `n` validators from the `available_validators` array.
5. User sends every selected validator one SCAS shard and each validator updates their secret-consensus table, `consensus_table`. The smart contract here records the validators that accepted and holds the payed for later payment of the validators (after they proof-of-spacetime).
6. Validator signals success on the receiving end (by proof-of-replication).

##  User authentication stage
1. User sends a request (`hash(requester_address)`) with the `send_request() -> String` function, to the `request_queue` on the smart contract with a `request_id`.
2. Every validator checks if the request corresponds to some SCAS shard they have by the `applicable_request(request: String) -> { applicable: Bool, scas_shard: String }` function.
3. Every validator that checks positively, sends a challenge of state change with their method `generate_challenge() -> Int`. this challenge is stored on each validator’s state, associated with the `request_id`. 
4. Each validator with a challenge sends them to the requester. A time counter begins to run for `T` time-units (either real-world time units or blockchain epochs).
5. The requester changes the state of the blockchain.
6. After `T` time-units, each validator checks the validity of the state-change.
7. If checked positively, each validator send the requester their SCAS shard.
8. The user reconstructs the SCAT from the SCAS shards. This concludes the authentication.

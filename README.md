# Decentralized-tube

This project is hugely inspired from the awesome [article](https://blog.suhailkakar.com/building-a-full-stack-web3-youtube-clone-with-next-ipfs-the-graph-solidity-and-livepeer)

## Tech stack

- TheGraph (GraphQL) as indexer
- Apollo client (to connect to theGraph)
- Mumbai (MATIC testnet)
- Next.js
- Tailwind
- plyr-react

## Before jumping into the code

Create an account on [theGraph](https://thegraph.com/).

Switch your Metamask network to mumbai :

- Network Name: Mumbai Testnet
- New RPC URL: https://rpc-mumbai.maticvigil.com/
- Chain ID: 80001
- Currency Symbol: MATIC
- Block Explorer URL: https://polygonscan.com/

and get some toket from the faucet : https://faucet.polygon.technology/

Your wallet private key will be needed to create the contract through hardhat - create a `.env` file that contains your private key:

```
# WARNING ::: EVER, NEVER USE YOUR REAL WALLET PRIVATE KEY !!!! AND NEVER PUSH THIS FILE TO GITHUB !!!!
touch .env
echo "PRIVATE_KEY='xxx'" > .env
```

And install all the needed package with `npm i`.

## Blockchain side

### Contract Deployment

Deploy the contract to the mumbai network:

```
npx hardhat run scripts/deploy.js --network mumbai
>> YouTube deployed to: 0x6fA85CFb3b8714D00Cc2f198826CFEa5003E0Fba
```

> Don't forget to store temporary the contract adress displayed in the console

### TheGraph creation

TODO need to run command , but it will delete the existing files. need to do some tests later, when application will be stable.
need to build thegraph too with `yarn build`, but already done ...

## FrontEnd side

# Other

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

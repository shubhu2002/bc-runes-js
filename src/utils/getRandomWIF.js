const bitcoin = require('bitcoinjs-lib')
const { ECPairFactory } = require('ecpair')
const ecc = require('@bitcoinerlab/secp256k1')
const {testnetNetwork} = require("../config")

// const network = bitcoin.networks.testnet
// const network = bitcoin.networks.bitcoin

const ECPair = ECPairFactory(ecc)

function getRandomWif() {
  const wif = ECPair.makeRandom({ testnetNetwork }).toWIF()
  
  return wif
}

if (process.argv[2] === '--log=wif') {
  console.log({ WIF: getRandomWif() })
}

module.exports = {
  getRandomWif
}
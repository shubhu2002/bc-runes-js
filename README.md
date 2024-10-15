<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# BC RUNES JS
A package that makes use of [runelib](https://www.npmjs.com/package/runelib) library to allow minting, etching or transferring [bitcoin runes](https://docs.taproot.com/runes/specification.html) very easily, by abstracting a bit more of what runelib does, creating the whole environment and scripts for transaction signing, submitting, and waiting.

# USAGE

## Preparing the address
  ```javascript
    const {
      generateAddress,
      getRandomWif
    } = require('bc-runes-js')

    async function main() {
      // If getting an address for the first time, a random wif should be used.
      // Otherwise, skip the line below and invoke generateAddress($yourWif)
      const randomWif = getRandomWif()
      const address = generateAddress(randomWif).taprootAddress
      console.log(address)
    }
  ```
  Will output the following
  ```bash
    {
      taprootAddress: 'tb1paygndrxzphwlgpn8utlcp592wf267jvk50wxnam6zuvszruhk3pqut4e6f',
      WIF: 'cMjdU3yAEif9P6eug1pa3MxYbpgPjd5vTnRP1cfzLPrWg85N5NAg'
    }
  ```
  
  Save `taprootAddress` and `WIF` in an .env file or anywhere for later use in the project. This only taproot address will hold the runes sent to it, minted or premined, in outputs with a value of 546. It will need bigger utxos to pay the fees for the transactions it may send.
 <br>
 <br>
 **Note:** the address is randomly generated and purely for this example, don't try to use it.


## Example for etching a rune

```javascript
const {
  etch,
  init
} = require('bc-runes-js')

const {
  TAPROOT_ADDRESS,
  WIF
} = process.env

async function main() {
  init({
    taprootAddress: TAPROOT_ADDRESS,
    wif: WIF,
    feePerVByte: 300
  })

  const res = await etch({
    amount: 1,
    cap: 100,
    divisibility: 0,
    name: 'YOUR•RUNE•NAME',
    symbol: '❤︎'
  })

  console.log({ res })
}

main()
```

## Example for minting a rune
```javascript
const {
  mint,
  init
} = require('bc-runes-js')

const {
  TAPROOT_ADDRESS,
  WIF
} = process.env

async function main() {
  init({
    taprootAddress: TAPROOT_ADDRESS,
    wif: WIF,
    feePerVByte: 300
  })

  // only one of these two arguments is mandatory
  const res = await mint({
    name: 'a rune name with or without spacers (•)',
    runeId: 'blockNumber:txIndex'
  })

  console.log({ res })
}

main()
```

## Example for transferring a rune
```javascript
const {
  transfer,
  init
} = require('bc-runes-js')

const {
  TAPROOT_ADDRESS,
  WIF
} = process.env

async function main() {
  init({
    taprootAddress: TAPROOT_ADDRESS,
    wif: WIF,
    feePerVByte: 300
  })

  // only the rune name or the id is needed in a transfer object
  const res = await transfer([
    { amount: 'how many runes to transfer',
      to: 'taproot address to send the runes to',
      runeId: 'the id of the rune',
      name: 'the full name of the rune, with or without spacers'
    },
    { 
      // other desired transfer objects
    }
  ])

  console.log({ res })
}
```

## Contributing

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.


# Disclaimer

The software provided in this GitHub repository is offered “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software’s output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.

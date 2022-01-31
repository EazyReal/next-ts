import { ethers } from "ethers"
import { config } from "dotenv"
config()

let msg =
  "nonce:\n\
0\n\
from:\n\
0xb1b6356ea9e2f3bf9867d6ac1c1bfd2cb1553abb\n\
functionSignature:\n\
0x26092b83\n\
"

const main = async () => {
  let privateKey = process.env.PK!
  let provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-rpc.com/"
  )
  let signer = new ethers.Wallet(privateKey, provider)
  console.log(signer.address)
  let contract = new ethers.Contract(
    "0xa3fffddc964c2122ffa3a43e3aa8125f4587dc21",
    [
      {
        inputs: [
          { internalType: "address", name: "userAddress", type: "address" },
          { internalType: "bytes", name: "functionSignature", type: "bytes" },
          { internalType: "bytes32", name: "sigR", type: "bytes32" },
          { internalType: "bytes32", name: "sigS", type: "bytes32" },
          { internalType: "uint8", name: "sigV", type: "uint8" },
        ],
        name: "executeMetaTransaction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer
  )

  let messageHash = ethers.utils.id(msg)
  // console.log("msg hash: ", messageHash, "\n")
  let messageHashBytes = ethers.utils.arrayify(messageHash)
  let flatSig = await signer.signMessage(messageHashBytes)
  // console.log(flatSig + "\n")
  let sig = ethers.utils.splitSignature(flatSig)

  let gasPrice = await provider.getGasPrice()

  contract.executeMetaTransaction(
    signer.address,
    ethers.utils.arrayify("0x26092b83"),
    sig.r,
    sig.s,
    sig.v,
    {
      gasLimit: 1000000,
      gasPrice: gasPrice,
    }
  )
}

main()

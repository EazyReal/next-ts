import React from "react"
import { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import { ethers, Signer } from "ethers"
import { Web3Provider } from "@ethersproject/providers"

type Props = {}

const contract_ids: String[] = [""]

export default function tracker({}: Props) {
  const [addr, setAddr] = useState<String>("")
  const [txs, setTxs] = useState<String[]>([])
  const [provider, setProvider] = useState<Web3Provider>()
  const [signer, setSigner] = useState<Signer>()
  const [contract, setContract] = useState()

  const ctx = useEffect(() => {
    if (!(window as any).ethereum) {
      alert("please install metmask.")
      return
    }
    setProvider(new ethers.providers.Web3Provider((window as any).ethereum))
    setSigner(provider?.getSigner())
    contract_ids.forEach((id) => {
      //contract = new ethers.Contract(id, abi, signer)
    })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAddr(addr)
  }

  return (
    <div>
      <h1> Track Address</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={(e) => setAddr(e.target.value)}
        />
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
      </form>
      <p>{addr}</p>
    </div>
  )
}

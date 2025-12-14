import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/text-input"
import { use, useState } from "react"
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"


export const SendP2PCard = () =>{
     const [recieverNo,setRecieverNo] = useState("");
     const [amount,setAmount] = useState("")
     return (
            <Card title="Send">
                <TextInput label="Number" onChange={(val)=>setRecieverNo(val)}placeholder="Enter Number" />
                <TextInput label = "Amount" onChange={(val)=>setAmount(val)}placeholder="Enter Amount" />
                <div className="pt-4 flex justify-center">
                    <Button onClick={async()=>{
                        await p2pTransfer(recieverNo,Number(amount)*100)
                    }}>Send Money</Button>
                </div>   
            </Card>  
     )
}
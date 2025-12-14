import express from "express"
import 'dotenv/config'
import { prisma } from "@repo/database"



const app = express()

app.use(express.json())

app.post("/hdfcWebhook",async(req,res)=>{
    const paymentInformation : {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //transaction
    try{
        await prisma.$transaction([
            prisma.balance.update({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data :{
                    amount : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where : {
                token : paymentInformation.token
                },
                data : {
                    status : "Success"
                }
            })
         ])
        res.status(200).json({
            message : "captured"
        })
    }catch(e){
        console.log(e)
        console.log("Erorr while OnRamping")
    }
})

app.listen(3003,()=>{
    console.log("Server Running")
}); 
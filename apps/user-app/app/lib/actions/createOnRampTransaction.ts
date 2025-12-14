"use server"

import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth"
import { prisma } from "@repo/database"


export async function createOnRampTransaction(provider:string,amount:number) {
    const session = await getServerSession(NEXT_AUTH)
    if((!session?.user || !session.user?.id)){
        return {
            message : "Unauthenticated request"
        }
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data : {
            provider,
            status : "Processing",
            startTime : new Date(),
            token : token,
            userId : Number(session.user.id),
            amount : amount*100
        }
    })
    return {
        message : "Done"
    }
    
}
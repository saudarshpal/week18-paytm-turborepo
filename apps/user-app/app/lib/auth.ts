import  CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { prisma } from "@repo/database"
import { JWT } from "next-auth/jwt"
import { NextAuthOptions, Session } from "next-auth"

declare module 'next-auth'{
    interface Session {
       user : {
            id : string 
            name? : string | null
            email? : string | null
        }
    }
}

export const NEXT_AUTH : NextAuthOptions= {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                phone : { label : "Phone Number", type : "text", placeholder:"+91"},
                password : {label : "Password", type : "password", placeholder:"123456"}
            },
            async authorize(credentials:any){
                if(!credentials || !credentials.phone || !credentials.password ){
                    return null
                }
                const existingUser = await prisma.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                })
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email: existingUser.number
                        }
                    } 
                    return null  
                }
                try{
                    const hashedPassword = await bcrypt.hash(credentials.password,10)
                    const user = await prisma.user.create({
                        data : {
                           number : credentials.phone,
                           password: hashedPassword
                        }
                    })
                    return {
                        id : user.id.toString(),
                        name : user.name,
                        email: user.number
                    }
                }catch(e){
                    console.log("error while creating user",e)
                    return null;
                }    
            }
        })
    ],
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {
        async session({ token, session }:{ token : JWT,session : Session}){
            if(session && session.user){
                session.user.id = token.sub as string
            }
            return session
        }
    }
}
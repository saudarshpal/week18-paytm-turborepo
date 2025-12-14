"use client"

import { SendP2PCard } from "../../../components/send-p2p-card"

export default function() {
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="flex justify-center pt-10">
                <SendP2PCard></SendP2PCard>
            </div>
            
        </div>
            
    )
}
import { useAtom } from "jotai"
import { balanceAtom } from "../atoms/balance"



export const useBalance  = ()=>{
    const [balance,setBalance] = useAtom(balanceAtom)
    return balance
}
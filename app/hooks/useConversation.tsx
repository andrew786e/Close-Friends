import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function useConversation(){
    const params = useParams() ;

    console.log(params.conversation) ;

    const conversationId = useMemo(
        () => params?.conversation || ("" as string) , [params.conversation]
    ) ;

    const isActive = useMemo(
        () => !!conversationId , [conversationId]
    ) ;

    return {
        isActive , 
        conversationId
    }
}
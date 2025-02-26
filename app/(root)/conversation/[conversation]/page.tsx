"use client"
import ConversationWrapper from "@/components/shared/conversation/ConversationWrapper";
import React from "react";

type Props = {
    children : React.PropsWithChildren ;
} 

export default function Conversation({children} : Props){
    return(
        <>
            <ConversationWrapper>Hello</ConversationWrapper>
        </>
    )
}
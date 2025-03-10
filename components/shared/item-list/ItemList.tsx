"use client"

import useConversation from "@/app/hooks/useConversation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props  = React.PropsWithChildren<{
    title: string ;
    action ?: React.ReactNode ;
}>

export default function ItemList({children , title , action : Action} : Props){
    const {isActive} = useConversation() ;

    return(
        <>
            <Card className= {cn("hidden h-full w-full lg:flex-none lg:w-80 p-2" , {
                "block" : !isActive,
                "lg:block" : isActive
            })

            }> 
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    {Action ? Action : null}
                </div>
                <div className="w-full h-full flex flex-col items-center justify-start">
                    {children}
                </div>
            </Card>
        </>
    )
}
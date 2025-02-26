"use client"

import React from "react"
import useNavigation from "@/app/hooks/useNavigation"
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import useConversation from "@/app/hooks/useConversation";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";

export default function MobileNav(){
    const paths = useNavigation() ;
    const {isActive} = useConversation() ;

    if(isActive){
        return null ;
    }

    return(
        <>
            <Card className = "fixed bottom-4 w-[calc(100%-32px)]  flex items-center h-16 p-2 lg:hidden">
                <nav className="w-full">
                    <ul className="flex justify-evenly items-center gap-4">
                        {paths.map((path , id)=>{
                            return (
                            <li key = {id} className="relative">
                                <Link href={path.href}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                            size = "icon"
                                            variant={
                                                path.active ? "default" :"outline"
                                            }
                                            >
                                                {path.icon}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {path.name}
                                        </TooltipContent>
                                        {
                                            path.count ? (<Badge className="absolute left-6 bottom-6 px-2">{path.count}</Badge>) : null
                                        }
                                    </Tooltip>
                                </Link>
                            </li>) ;
                        })}
                        <li>
                            <ThemeToggle/>
                        </li>
                        <li>
                            <UserButton/>
                        </li>
                    </ul>
                </nav>
            </Card>
        </>
    ) 
}
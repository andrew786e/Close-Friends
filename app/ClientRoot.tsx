"use client"

import LoadingLogo from "@/components/shared/LoadingLogo";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import React from "react";
import SignInComponent from "@/components/SignInComponent"
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

type Props = {
    children : React.ReactNode ;
}
export default function ClientRoot({children} : Props){
    return(<>

        <ConvexClientProvider>
          <AuthLoading><LoadingLogo size={100}/></AuthLoading>
          <Authenticated>
            <TooltipProvider>
                <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                >
                    {children}
                    <Toaster richColors/>
                </ThemeProvider>
            </TooltipProvider>
          </Authenticated> 
          <Unauthenticated><SignInComponent/></Unauthenticated>
        </ConvexClientProvider>
    </>)
}
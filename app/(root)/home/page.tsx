"use client"
import { SignIn, UserButton } from "@clerk/nextjs";
import { Authenticated } from "convex/react";

export default function HomePage(){
    return(
        <>
            <UserButton/>
        </>
    )
}
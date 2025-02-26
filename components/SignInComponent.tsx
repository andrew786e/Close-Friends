"use client"

import { SignIn } from "@clerk/nextjs";

// Home Page used for SignIn 
export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn routing="hash" />
    </div>
  );
} 
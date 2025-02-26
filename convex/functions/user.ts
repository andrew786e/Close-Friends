// This is used for user related queries

import { internalMutation , internalQuery } from "../_generated/server";
import {v} from "convex/values"


// Information is updated in the external databse
export const create = internalMutation({
    args : {
        username: v.string() ,
        imageUrl: v.string() ,
        clerkId :  v.string() ,
        email : v.string() ,
    } ,

    handler: async(ctx , args) =>{
        await ctx.db.insert("users" , args)
    }
})

// Information is gotten from external database
export const get = internalQuery({
    args : {clerkId: v.string()} ,
    handler: async(ctx , args) =>{
        return ctx.db.query("users").withIndex("by_clerkId" , q => q.eq("clerkId" , args.clerkId)).unique()
    }
})


import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create =  mutation({
    args : {
        email : v.string() 
    } ,
    handler : async (ctx , args) =>{
        const userIdentity = await ctx.auth.getUserIdentity() ;

        if(!userIdentity){
            throw new ConvexError("Unauthorized Error") ;
        }

        if(args.email === userIdentity.email){
            throw new ConvexError("Send a request to yourself") ;
        }

        const currentUser = await getUserByClerkId({ctx , clerkId : userIdentity.subject}) ;

        if(!currentUser){
            throw new ConvexError("User Id not found") ;
        }

        const receiverIdentity = await ctx.db
                                            .query("users")
                                            .withIndex("by_email" , (q) => q.eq("email" , args.email))
                                            .unique() ;


        console.log(receiverIdentity) ;
        if(!receiverIdentity){
            console.log("Yes") ;
            throw new ConvexError("User not found") ;
        }   

        const requestAlreadySent = await ctx.db.query("requests")
                                                .withIndex("by_receiver_sender" , q => 
                                                    q.eq("receiver" , receiverIdentity._id).eq("sender" , currentUser._id))
                                                    .unique()


        if(requestAlreadySent){
            throw new ConvexError("Request already sent")
        }

        const requestAlreadyReceived = await ctx.db.query("requests")
                                                .withIndex("by_receiver_sender" , q => 
                                                    q.eq("receiver" , currentUser._id).eq("sender" , receiverIdentity._id))
                                                    .unique()

        if(requestAlreadyReceived){
            throw new ConvexError("This user has already sent you a request")
        }

        const request = await ctx.db.insert("requests" , {
            sender : currentUser._id ,
            receiver : receiverIdentity._id
        }) ;

        return request ;
    }
})
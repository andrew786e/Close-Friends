import React from "react";
import {z} from "zod" ;
import {zodResolver} from "@hookform/resolvers/zod" ;
import {useForm} from "react-hook-form"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMutationState from "@/app/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";


const addFriendFormSchema = z.object({
    email: z.string().min(1 , {message : "This field cant be empty"}).email("Please enter a valid email")
})
export default function AddFriendDialog(){

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver : zodResolver(addFriendFormSchema),
        defaultValues : {
            email: ""
        }
    }) ;

    const {mutate : createRequest , pending} = useMutationState(api.request.create) ;

    const handleSubmit = async (values : z. infer<typeof addFriendFormSchema>) => {
        await createRequest({email : values.email})
                            .then(() => {
                                form.reset() ;
                                toast.success("Friend request sent")
                            }) 
                            .catch(error => {
                                toast.error(error instanceof ConvexError ? error.data : "Undefined Error")
                            })
    }

    return(
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                        <DialogTrigger asChild>
                            <UserPlus/>
                        </DialogTrigger>
                    {/* <Button size="icon" variant="outline">
                        <DialogTrigger asChild>
                            <UserPlus/>
                        </DialogTrigger>
                    </Button> */}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent> 
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>
                        Send a request to connect to your friend !
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField control={form.control} name="email" render={({field}) => 
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email..." {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }>
                        </FormField>

                        <DialogFooter className="pt-2">
                            <Button disabled={false} type="submit">
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
import { useMutation } from "convex/react";
import { useState } from "react";
import { boolean } from "zod";

export default function useMutationState(mutationToRun : any ){
    const [pending , setPending] = useState<boolean>(false) ; 

    const mutationFn = useMutation(mutationToRun) ;

    const mutate = (payload : any) => {
        setPending(true) ;

        return mutationFn(payload)
                    .then((res) => {
                        return res ;
                    })
                    .catch((error) => {
                        throw error ;
                    })
                    .finally(() => setPending(false)) ;
    } ;

    return {mutate , pending}
}
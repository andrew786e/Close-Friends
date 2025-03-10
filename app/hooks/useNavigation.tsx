import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useNavigation(){
    const pathname = usePathname() ;
    const requestsCount = useQuery(api.requests.count)

    const paths = useMemo(() => [
        {
            name:  "Conversation" ,
            href: "/conversation" ,
            icon: <MessageSquare/> ,
            active: pathname.startsWith("/conversation")
        } ,
        {
            name:  "Friends" ,
            href: "/friends" ,
            icon: <Users/>,
            active: pathname.startsWith("/friends") ,
            count: requestsCount ,
        } ,
    ] , [pathname , requestsCount])

    return paths ;
}
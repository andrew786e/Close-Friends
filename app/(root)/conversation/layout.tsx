import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";

type Props = React.PropsWithChildren<{}> ;

export default function ConversationLayout({children} :Props){
    return(
        <>
        <ItemList title="Conversations"> Conversations Page </ItemList>
        {children}
        </>
    )
}
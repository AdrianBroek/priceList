import React from "react";
// table
import MatchedTable from "./matchingProducts/MatchedTable";

const MatchedProductsTable = ({activeTableWithSemicolon, setActiveTableSemicolon}
    : {
        activeTableWithSemicolon: string | null,
        setActiveTableSemicolon: (value: string | null)=> void
    }) => {

    return (
        <MatchedTable activeTableWithSemicolon={activeTableWithSemicolon} 
        setActiveTableSemicolon={setActiveTableSemicolon} />
    )
}

export default MatchedProductsTable
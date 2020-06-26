import React, { useState } from "react"

const numRows = 50
const numCols = 50


const Grid = props => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            //Mapping columns as dead (dead:0, alive:1)
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows
    })

    // console.log("Array", Array(50))
    return (

        <div>
            tmp
        </div>
    )
}

export default Grid
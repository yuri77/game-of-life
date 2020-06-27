import React, { useState } from "react";
import produce from 'immer'

const numRows = 10
const numCols = 10


const Grid = props => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            //Mapping columns as dead (dead:0, alive:1)
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows
    })

    console.log(grid)
    return (

        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols},20px)`
        }}
        >
            {
                grid.map((rows, i) =>
                    rows.map((col, j) => <div
                        key={`${i}-${j}`}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = grid[i][j] ? 0 : 1;

                            });
                            setGrid(newGrid)
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][j] ? "blue" : undefined,
                            border: "solid 1px black"
                        }} />
                    )
                )
            }
        </div >
    )
}

export default Grid
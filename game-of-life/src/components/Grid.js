import React, { useState, useCallback, useRef } from "react";
import produce from 'immer'

const numRows = 20
const numCols = 20

//move around the 8 neighboring cells
const operations = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [-1, 0]

]

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        //Mapping columns as dead (dead:0, alive:1)
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
}

const Grid = props => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid()
    })

    const [running, setRunning] = useState(false)

    const runningRef = useRef(running);
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        //simulation
        //double loop to go through each element of the grid
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        //computer the number of alive neighbors
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                                neighbors += g[newI][newJ]
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        })


        setTimeout(runSimulation, 100);

    }, [])

    // console.log(grid)
    return (
        <>
            <button onClick={
                () => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true
                        runSimulation()
                    }
                }
            }>{running ? 'stop' : 'start'}
            </button>
            <button
                onClick={
                    () => {
                        const rows = [];
                        for (let i = 0; i < numRows; i++) {
                            //Mapping columns as dead (dead:0, alive:1)
                            rows.push(Array.from(Array(numCols), () => Math.random() > .65 ? 1 : 0))
                        }

                        setGrid(rows)
                    }
                }>
                random
            </button>
            <button onClick={
                () => {
                    setGrid(generateEmptyGrid())
                }

            }
            > clear </button>

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
        </>
    )
}

export default Grid
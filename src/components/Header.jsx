import React, { useContext } from 'react'
import Context from './../context/context';


export default function Header() {
    const color = useContext(Context)
    return (
        <div style={{ display: "flex", margin: "2%" }}>
            <h1>Api Rick and Morty</h1>
        </div>
    )
}

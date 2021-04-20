import { useState, useEffect, useReducer } from 'react'

const initialState = {
    sendByEmail: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAV':
            return {
                ...state,
                sendByEmail: [...state.sendByEmail, action.payload]
            }
        default:
            return state;
    }
}

export default function Characters() {
    const [characters, setCharacters] = useState([])
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [species, setSpecies] = useState('')
    const [type, setType] = useState('')
    const [gender, setGender] = useState('')
    const [page, setPage] = useState('&page=1')
    const [sendByEmail, dispatch] = useReducer(favoriteReducer, initialState)

    let apiURL = "https://rickandmortyapi.com/api/character/"
    let customQuery = null

    const filterAPI = (e) => {
        e.preventDefault()
        // console.log(name);
        if (name.trim()) {
            customQuery = "?name=" + name
        }
        if (status.trim()) {
            if (customQuery !== null) {
                customQuery = customQuery + "&status=" + status
            } else {
                customQuery = "?status=" + status
            }
        }
        if (species.trim()) {
            if (customQuery !== null) {
                customQuery = customQuery + "&species=" + species
            } else {
                customQuery = "?species=" + species
            }
        }
        if (type.trim()) {
            if (customQuery !== null) {
                customQuery = customQuery + "&type=" + type
            } else {
                customQuery = "?type=" + type
            }
        }
        if (gender.trim()) {
            if (customQuery !== null) {
                customQuery = customQuery + "&gender=" + gender
            } else {
                customQuery = "?gender=" + gender
            }
        }
        if (customQuery !== null) {
            apiURL = apiURL + customQuery 
        } 
        getCharacters()
        console.log(apiURL);
    }

    const getCharacters = async () => {
        try {
            await fetch(apiURL)
                .then(response => response.json())
                .then(data => setCharacters(data.results))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCharacters()
    }, [])

    // console.log(characters);

    const handleClick = array => {
        dispatch({ type: 'ADD_TO_FAV', payload: array })
    }

    const clear = (e) => {
        e.preventDefault()
        document.getElementById("filter").reset();
        getCharacters()
    }

    // console.log(sendByEmail);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <form id="filter" style={{ display: "inline-grid", paddingTop: "40%" }}>
                    <label htmlFor="">Name</label>
                    <input name="name" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" placeholder="ehh" onChange={(e) => setStatus(e.target.value)}>
                        <option value=''>Choose one</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                    <br />
                    <label htmlFor="species">Species</label>
                    <input name="species" type="text" placeholder="Species" onChange={(e) => setSpecies(e.target.value)} />
                    <br />
                    <label htmlFor="type">Type</label>
                    <input name="type" type="text" placeholder="Type" onChange={(e) => setType(e.target.value)} />
                    <br />
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" placeholder="Gender" onChange={(e) => setGender(e.target.value)}>
                        <option value=''>Choose one</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                    <br />
                    <button onClick={filterAPI} >Filter</button>
                    <br />
                    <button onClick={clear} >Clear</button>
                </form>
            </div>

            {
                characters != undefined ?
                    (
                        <div style={{ width: "100%" }}>
                            <table style={{ paddingLeft: "80%" }}>
                                {sendByEmail.sendByEmail.map(array => (

                                    <tbody>
                                        <tr key={array.id}>
                                            <li >{array.name}</li>
                                        </tr>
                                    </tbody>


                                ))
                                }
                            </table>
                            {
                                sendByEmail.sendByEmail.trim ?
                                    (
                                        <button>Send Email</button>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                            <table style={{ margin: "auto", width: "70%" }}>
                                <tbody>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>Origen</th>
                                        <th>Localización </th>
                                    </tr>

                                    {characters.map(character => (
                                        <tr key={character.id} style={{ verticalAlign: "middle" }}>
                                            <td><img src={character.image} alt="error" style={{ height: "10rem", borderRadius: "15%" }} /></td>
                                            <td >{character.name}</td>
                                            <td>{character.origin.name}</td>
                                            <td>{character.location.name}</td>
                                            <td><button type="button" onClick={() => handleClick(character)}>Add to list</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    :
                    (
                        <h1>No hay datos con los filtros ingresados</h1>
                    )
            }

        </div >
    )
}

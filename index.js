import express from "express"
import axios from "axios"

const app = express()
const port = 3000

app.use(express.static("public"))

app.get("/", async (req, res) => {
    res.render("index.ejs")
})

// Call to server from axios front end to get data about pokemon.
app.get("/nextPokemon", async (req, res) => {
    const data = await getPokemon()
    res.json({response: data})
})

app.listen(port, () => {
    console.log("App is running on port: " + port)
})

// Function called to call Pokemon API 
async function getPokemon() {
    const pokemonCount = (await axios.get("https://pokeapi.co/api/v2/pokemon-species/")).data.count
    const randomPokemonId = Math.floor(Math.random() * (pokemonCount - 1) + 1)
    
    try { 
        const data = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)).data
        return data
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
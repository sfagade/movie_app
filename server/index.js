const next = require('next');
const express = require('express');
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const filePath = "./data.json";
const fs = require('fs');
const path = require('path');
const moviesData = require(filePath);

app.prepare().then(() => {

    const server = express();
    server.use(bodyParser.json());

    server.get("/api/v1/movies", (req, res) => {
        return res.json(moviesData);
    })

    server.get("/api/v1/movies/:id", (req, res) => {
        const { id } = req.params;
        const movie = moviesData.find(m => m.id === id)
        return res.json(movie);
    })

    server.post("/api/v1/movies", (req, res) => {
        const movie = req.body;
        moviesData.push(movie);

        const pathToFile = path.join(__dirname, filePath);
        const stringifiedData = JSON.stringify(moviesData, null, 2);

        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err);
            }
            console.log("About to return: ");
            return res.json("Movies has been successfully added");
        });
    })

    server.patch("/api/v1/movies/:id", (req, res) => {
        const { id } = req.params;
        const movie = req.body;
        const movieIndex = moviesData.findIndex(m => m.id === movie.id);

        moviesData[movieIndex] = movie;

        const pathToFile = path.join(__dirname, filePath);
        const stringifiedData = JSON.stringify(moviesData, null, 2);

        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json({ message: "Movies has been updated successfully", movie });
        });
    })

    server.delete("/api/v1/movies/:id", (req, res) => {
        const { id } = req.params;
        const movieIndex = moviesData.findIndex(m => m.id === id);
        moviesData.splice(movieIndex, 1);

        const pathToFile = path.join(__dirname, filePath);
        const stringifiedData = JSON.stringify(moviesData, null, 2);

        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json("Movies has been successfully added");
        });
    })

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + PORT)
    })
})

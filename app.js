const express = require("express");

const app = express();
const port = 3000;

app.post("/cursos", (req, res) => {
    res.status(201).send({ message: "Curso criado com sucesso!" });
});

app.get("/cursos", (req, res) => {
    res.status(200).send({ message: "Lista de cursos retornada com sucesso!" });
});

app.get("/cursos/:id", (req, res) => {
    res.status(200).send({
        message: `Curso com id ${req.params.id} retornado com sucesso!`,
    });
});

app.put("/cursos/:id", (req, res) => {
    res.status(200).send({
        message: `Curso com id ${req.params.id} atualizado com sucesso!`,
    });
});

app.delete("/cursos/:id", (req, res) => {
    res.status(200).send({
        message: `Curso com id ${req.params.id} deletado com sucesso!`,
    });
});

app.post("/matriculas", (req, res) => {
    res.status(201).send({ message: "Matrícula criada com sucesso!" });
});

app.get("/matriculas/:idCurso", (req, res) => {
    res.status(200).send({
        message: `Matrículas do curso com id ${req.params.idCurso} retornadas com sucesso!`,
    });
});

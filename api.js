const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/cursos", (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const cargaHoraria = req.body.cargaHoraria;

    if (
        nome !== undefined &&
        descricao !== undefined &&
        cargaHoraria !== undefined
    ) {
        const curso = { nome, descricao, cargaHoraria };
        fs.readFile("./cursos.json", function (err, data) {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Erro ao carregar o arquivo de cursos." });
            }
            const json = JSON.parse(data);
            json.push(curso);

            fs.writeFile("./cursos.json", JSON.stringify(json), (err) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ message: "Erro ao salvar o curso." });
                }
                res.status(201).send({ message: "Curso criado com sucesso!" });
            });
        });
    } else {
        res.status(400).send({
            message: "Dados insuficientes para criar um curso.",
        });
    }
});

app.get("/cursos", (req, res) => {
    fs.readFile("./cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        const json = JSON.parse(data);
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(json));
    });
});

app.get("/cursos/:id", (req, res) => {
    fs.readFile("./cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        const json = JSON.parse(data);
        const curso = json[req.params.id];
        if (curso === undefined) {
            return res.status(404).send({ message: "Curso com o id: " + req.params.id + " não foi encontrado." })
        }
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(curso));
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

app.listen(port, () => {
    console.log(`app.js localhost:${port}`);
});

const express = require("express");
const ShortUniqueId = require("short-unique-id");
const fs = require("fs");
const app = express();
const port = 3000;

// Gerador de Ids únicos:
const uid = new ShortUniqueId({ length: 10 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/cursos", (req, res) => {
    //Carrega os parâmetros da body
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const cargaHoraria = req.body.cargaHoraria;

    //Se os parâmetros estão completos tentamos abrir o arquivo para adicionar o novo curso
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
            const novoId = uid.rnd();
            json[novoId] = curso;

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
    //Lê o arquivo e devolve ele inteiro no formato JSON
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
    //Lê o arquivo e tenta devolver apenas o curso com o id
    fs.readFile("./cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        const json = JSON.parse(data);
        const curso = json[req.params.id];
        //Se o curso não existe devolve 404
        if (curso === undefined) {
            return res.status(404).send({
                message:
                    "Curso com o id: " + req.params.id + " não foi encontrado.",
            });
        }
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(curso));
    });
});

app.put("/cursos/:id", (req, res) => {
    //Carrega os parâmetros da body
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const cargaHoraria = req.body.cargaHoraria;

    //Se nenhum deles estar definido, nenhuma mudança seria feita, então o pedido é inválido
    if (
        nome === undefined &&
        descricao == undefined &&
        cargaHoraria == undefined
    ) {
        return res.status(400).send({ message: `Pedido sem mudanças.` });
    }
    fs.readFile("./cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        const json = JSON.parse(data);
        const curso = json[req.params.id];
        if (curso === undefined) {
            return res.status(404).send({
                message:
                    "Curso com o id: " + req.params.id + " não foi encontrado.",
            });
        }
        // Modifica apenas as partes que o pedido possui:
        if (nome != undefined) curso.nome = nome;
        if (descricao != undefined) curso.descricao = descricao;
        if (cargaHoraria != undefined) curso.cargaHoraria = cargaHoraria;

        json[req.params.id] = curso;

        // Escreve de volta no arquivo no espaço do id especificado
        fs.writeFile("./cursos.json", JSON.stringify(json), (err) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Erro ao atualizar o curso." });
            }
            res.status(200).send({ message: "Curso atualizado com sucesso!" });
        });
    });
});

app.delete("/cursos/:id", (req, res) => {
    fs.readFile("./cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        const json = JSON.parse(data);
        const curso = json[req.params.id];
        if (curso === undefined) {
            return res.status(404).send({
                message:
                    "Curso com o id: " + req.params.id + " não foi encontrado.",
            });
        }
        json.splice(req.params.id, 1);
        fs.writeFile("./cursos.json", JSON.stringify(json), (err) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Erro ao deletar o curso." });
            }
            res.status(200).send({ message: "Curso deletado com sucesso!" });
        });
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

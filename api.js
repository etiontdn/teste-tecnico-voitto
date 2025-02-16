const express = require("express");
const cors = require("cors");
const ShortUniqueId = require("short-unique-id");
const fs = require("fs");
const app = express();
const port = 8080;

// Gerador de Ids únicos:
const uid = new ShortUniqueId({ length: 10 });

function novoId(obj) {
    //Cria ids randoms até achar um que não está no objeto
    let id = uid.rnd();
    while (obj.id !== undefined) {
        id = uid.rnd();
    }
    return id;
}

function carregaCursos(res, callback) {
    //Carrega os cursos ou exibe um erro se não conseguir
    fs.readFile("./public/cursos.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de cursos." });
        }
        return callback(data);
    });
}

function salvaCursos(res, val, msg, msgErro) {
    //Salva os cursos ou exibe um erro definido se não conseguir
    fs.writeFile("./public/cursos.json", val, (err) => {
        if (err) {
            return res.status(500).send({ message: msgErro });
        }
        res.status(200).send({ message: msg });
    });
}

function carregaMatriculas(res, callback) {
    //Carrega as matrículas ou exibe um erro se não conseguir
    fs.readFile("./public/matriculas.json", function (err, data) {
        if (err) {
            return res
                .status(500)
                .send({ message: "Erro ao carregar o arquivo de matrículas." });
        }
        return callback(data);
    });
}

function salvaMatriculas(res, val, msg, msgErro) {
    //Salva as matrículas ou exibe um erro se não conseguir
    fs.writeFile("./public/matriculas.json", val, (err) => {
        if (err) {
            return res.status(500).send({ message: msgErro });
        }
        res.status(200).send({ message: msg });
    });
}

app.use(cors())
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
        carregaCursos(res, (data) => {
            const json = JSON.parse(data);
            const id = novoId(json);
            json[id] = curso;
            salvaCursos(
                res,
                JSON.stringify(json),
                "Curso criado com sucesso!",
                "Erro ao salvar o curso."
            );
        });
    } else {
        res.status(400).send({
            message: "Dados insuficientes para criar um curso.",
        });
    }
});

app.get("/cursos", (req, res) => {
    //Lê o arquivo e devolve ele inteiro no formato JSON
    carregaCursos(res, (data) => {
        const json = JSON.parse(data);
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(json));
    });
});

app.get("/cursos/:id", (req, res) => {
    //Lê o arquivo e tenta devolver apenas o curso com o id
    carregaCursos(res, (data) => {
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
    carregaCursos(res, (data) => {
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

        // Escreve de volta no arquivo no espaço do id especificado
        json[req.params.id] = curso;
        salvaCursos(
            res,
            JSON.stringify(json),
            "Curso atualizado com sucesso!",
            "Erro ao atualizar o curso."
        );
    });
});

app.delete("/cursos/:id", (req, res) => {
    // Carrega o arquivo e deleta o id junto com seus dados
    carregaCursos(res, (data) => {
        const json = JSON.parse(data);
        const curso = json[req.params.id];
        if (curso === undefined) {
            return res.status(404).send({
                message:
                    "Curso com o id: " + req.params.id + " não foi encontrado.",
            });
        }

        // Deletar também todas as matrículas do curso:
        const idCurso = req.params.id;

        carregaMatriculas(res, (data) => {
            const matriculas = JSON.parse(data);
            // filtra matriculas para pegar só aquelas que não tem cursoId igual ao procurado
            // e retorna para o objeto {"id":dados}
            const matriculasRestantes = Object.fromEntries(
                Object.entries(matriculas).filter(
                    ([key, matricula]) => matricula.idCurso != idCurso
                )
            );

            fs.writeFile(
                "./public/matriculas.json",
                JSON.stringify(matriculasRestantes),
                (err) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Erro ao deletar matrículas do curso.",
                        });
                    }
                    delete json[req.params.id];
                    salvaCursos(
                        res,
                        JSON.stringify(json),
                        "Curso deletado com sucesso!",
                        "Erro ao deletar o curso."
                    );
                }
            );
        });
    });
});

app.post("/matriculas", (req, res) => {
    const idCurso = req.body.idCurso;
    console.log(idCurso)

    // Checar se o idCurso é válido:
    carregaCursos(res, (data) => {
        const json = JSON.parse(data);
        console.log(json)
        const curso = json[idCurso];
        if (curso === undefined) {
            return res.status(400).send({
                message: "Id de curso inválido.",
            });
        }

        const nomeAluno = req.body.nomeAluno;
        if (idCurso !== undefined && nomeAluno !== undefined) {
            carregaMatriculas(res, (data) => {
                const json = JSON.parse(data);
                const matricula = { idCurso, nomeAluno };
                const id = novoId(json);

                json[id] = matricula;
                salvaMatriculas(
                    res,
                    JSON.stringify(json),
                    "Matrícula criada com sucesso!",
                    "Erro ao criar a matrícula"
                );
            });
        } else {
            res.status(400).send({
                message: "Dados insuficientes para criar uma matrícula.",
            });
        }
    });
});

app.get("/matriculas/:idCurso", (req, res) => {
    const idCurso = req.params.idCurso;

    // Checar se o idCurso é válido:
    carregaCursos(res, (data) => {
        const json = JSON.parse(data);
        const curso = json[idCurso];
        if (curso == undefined) {
            return res.status(404).send({
                message: `Curso com id: ${idCurso} não encontrado.`,
            });
        }
        carregaMatriculas(res, (data) => {
            const json = JSON.parse(data);
            // filtra matriculas para pegar só aquelas que tem cursoId igual ao procurado
            // e adiciona o id do aluno para os dados retornados
            const matriculasDoCurso = Object.entries(json)
                .filter(([key, matricula]) => matricula.idCurso === idCurso)
                .map(([key, matricula]) => ({ id: key, ...matricula }));

            res.status(200).send(matriculasDoCurso);
        });
    });
});

app.listen(port, () => {
    console.log(`api.js localhost:${port}`);
});

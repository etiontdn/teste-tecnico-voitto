"use client";
import { useState, useEffect } from "react";
import { Select, TextInput, Button, Paper, Title, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";

function SelectMatricula({ cursos, setIdCurso }) {
    const options = Object.entries(cursos).map(([id, { nome }]) => ({
        value: id,
        label: nome,
    }));
    return (
        <Select
            label="Curso"
            placeholder="Escolha o curso"
            data={options}
            onChange={setIdCurso}
            searchable
            nothingfound="Nenhum curso encontrado"
        />
    );
}

function fetchCursos() {
    const [cursos, setCursos] = useState({});
    useEffect(() => {
        fetch("http://localhost:8080/cursos")
            .then((response) => response.json())
            .then((data) => setCursos(data));
    }, []);
    return cursos;
}

function matricularAluno(idCurso, nomeAluno) {
    return fetch("http://localhost:8080/matriculas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idCurso,
            nomeAluno,
        }),
    });
}

function Matricula() {
    const [idCurso, setIdCurso] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const cursos = fetchCursos();

    const submit = (event) => {
        event.preventDefault();
        matricularAluno(idCurso, nomeAluno).then((response) => {
            if (response.ok) {
                console.log("Sucesso ao matricular o aluno: ", nomeAluno);
                notifications.show({
                    color: "green",
                    title: "Sucesso!",
                    message: "Sucesso ao matricular o aluno: " + nomeAluno,
                    style: { width: "360px", top:0, right:0  },
                });
            } else {
                console.error(
                    "Erro ao matricular o aluno: ",
                    nomeAluno,
                    idCurso
                );
                notifications.show({
                    color: "red",
                    title: "Erro",
                    message:
                        "Ocorreu algum erro ao matrícular o aluno: " +
                        nomeAluno,
                    style: { width: "360px", top:0, right:0 },
                });
            }
        });
    };

    return (
        <Paper shadow="sm" p="md" withBorder>
            <Title order={3} mb="md">
                Matricular em um Curso
            </Title>
            <form onSubmit={submit}>
                <Stack>
                    <SelectMatricula cursos={cursos} setIdCurso={setIdCurso} />
                    <TextInput
                        label="Nome do Aluno"
                        placeholder="Digite o nome do aluno"
                        value={nomeAluno}
                        onChange={(event) =>
                            setNomeAluno(event.currentTarget.value)
                        }
                    />
                    <Button
                        type="submit"
                        disabled={idCurso === "" || nomeAluno === ""}
                    >
                        Matricular
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default Matricula;

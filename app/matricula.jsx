"use client";
import { useState, useEffect } from "react";

function SelectMatricula({ cursos, setIdCurso }) {
    cursos = Object.entries(cursos);
    const options = cursos.map(([id, { nome }], i) => (
        <option key={id} value={id}>
            {nome}
        </option>
    ));

    const atualizar = (event) => {
        setIdCurso(event.target.value);
    };

    return (
        <select name="curso" defaultValue="" onChange={atualizar}>
            <option value="" disabled hidden>Escolha o curso</option>
            {options}
        </select>
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
        matricularAluno(idCurso, nomeAluno).then((response) => {
            if (response.ok) {
                console.log("sucesso ao matricular o aluno: ", nomeAluno);
            } else {
                console.error(
                    "erro ao matricular o aluno: ",
                    nomeAluno,
                    idCurso
                );
            }
        });
        event.preventDefault();
    };
    const alterar = (event) => {
        setNomeAluno(event.target.value);
    };
    const form = (
        <form onSubmit={submit}>
            <SelectMatricula
                cursos={cursos}
                setIdCurso={setIdCurso}
            ></SelectMatricula>
            <input
                type="text"
                name="nome"
                id="nome"
                onChange={alterar}
                value={nomeAluno}
            />
            <input type="submit" disabled={idCurso === "" || nome === ""} name="submit" value="Submit" id="submit" />
        </form>
    );

    return <div className="matricula-container">{form}</div>;
}

export default Matricula;

"use client";
import { useState, useEffect } from "react";
function Curso({ nome, descricao, cargaHoraria }) {
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>{nome}</td>
            <td>{descricao}</td>
            <td>{cargaHoraria}</td>
        </tr>
    );
}

function Tabela({ cursos }) {
    cursos = Object.entries(cursos);
    const rows = cursos.map(([id, { nome, descricao, cargaHoraria }]) => (
        <Curso
            key={id}
            nome={nome}
            descricao={descricao}
            cargaHoraria={cargaHoraria}
        ></Curso>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Carga Horária (em horas)</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function fetchCursos() {
    const [cursos, setCursos] = useState({});
    useEffect(() => {
        fetch("http://localhost:8080/cursos")
            .then((response) => response.json())
            .then((data) => setCursos(data));
    });
    return cursos
}

export default function TabelaDeCursos() {
    const cursos = fetchCursos()
    return (
        <Tabela cursos={cursos}></Tabela>
    )
}

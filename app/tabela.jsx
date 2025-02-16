"use client";
import { useState, useEffect } from "react";
function Curso({ id, nome, descricao, cargaHoraria, setCursoSelecionado }) {
    return (
        <tr>
            <td
                onClick={(event) => setCursoSelecionado(id)}
                style={{ fontWeight: "bold" }}
            >
                {nome}
            </td>
            <td>{descricao}</td>
            <td>{cargaHoraria}</td>
        </tr>
    );
}

function Tabela({ cursos, setCursoSelecionado }) {
    cursos = Object.entries(cursos);
    const rows = cursos.map(([id, { nome, descricao, cargaHoraria }]) => (
        <Curso
            key={id}
            id={id}
            nome={nome}
            descricao={descricao}
            cargaHoraria={cargaHoraria}
            setCursoSelecionado={setCursoSelecionado}
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

function CampoDeBusca({ busca, setBusca }) {
    const atualizar = (event) => {
        setBusca(event.target.value);
    };

    return (
        <input
            placeholder="Nome do Curso"
            type="text"
            onChange={atualizar}
            value={busca}
        ></input>
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

export default function TabelaDeCursos({ setCursoSelecionado }) {
    const [busca, setBusca] = useState("");
    const cursos = fetchCursos();
    const cursosFiltrados = Object.fromEntries(
        Object.entries(cursos).filter(([id, curso]) => {
            return curso.nome.includes(busca);
        })
    );
    return (
        <div className="tabela-container">
            <CampoDeBusca busca={busca} setBusca={setBusca}></CampoDeBusca>
            <Tabela
                setCursoSelecionado={setCursoSelecionado}
                cursos={cursosFiltrados}
            ></Tabela>
        </div>
    );
}

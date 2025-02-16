"use client";
import { useState, useEffect } from "react";
function fetchCurso(cursoSelecionado) {
    const [curso, setCurso] = useState({});
    useEffect(() => {
        if (cursoSelecionado != "")
            fetch("http://localhost:8080/cursos/" + cursoSelecionado)
                .then((response) => response.json())
                .then((data) => setCurso(data));
    }, [cursoSelecionado]);
    return curso;
}
export default function Detalhes({ cursoSelecionado }) {
    let curso;
    curso = fetchCurso(cursoSelecionado);
    return (
        <div>
            <h2>{curso.nome}</h2>
            <p>
                {curso.descricao} <span>{curso.cargaHoraria}</span>
            </p>
        </div>
    );
}

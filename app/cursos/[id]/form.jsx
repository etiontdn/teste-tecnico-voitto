"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Form({ id, curso }) {
    const [nome, setNome] = useState(curso.nome);
    const [descricao, setDescricao] = useState(curso.descricao);
    const [cargaHoraria, setCargaHoraria] = useState(curso.cargaHoraria);
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleCargaHorariaChange = (event) => {
        setCargaHoraria(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/cursos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                descricao,
                cargaHoraria,
            }),
        }).then((res) => {
            if (res.ok) {
                window.location.reload()
            } else {
                console.error("Erro ao atualizar o curso")
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                id="nome"
                value={nome}
                onChange={handleNomeChange}
            />
            <textarea
                type="textarea"
                name="descricao"
                id="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
            />
            <input
                type="number"
                name="cargaHoraria"
                id="cargaHoraria"
                value={cargaHoraria}
                onChange={handleCargaHorariaChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

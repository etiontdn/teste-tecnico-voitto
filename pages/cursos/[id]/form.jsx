"use client";
import { useState } from "react";
export default function Form({ curso }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleCargaHorariaChange = (event) => {
        setCargaHoraria(event.target.value);
    };

    return (
        <form>
            <input
                type="text"
                name="nome"
                id="nome"
                value={nome}
                onChange={handleNomeChange}
            />
            <input
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
        </form>
    );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Textarea, Button, Box, NumberInput } from "@mantine/core";

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

    const handleCargaHorariaChange = (value) => {
        setCargaHoraria(value);
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
                window.location.reload();
            } else {
                console.error("Erro ao atualizar o curso");
            }
        });
    };

    return (
        <Box sx={{ maxWidth: 300 }}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Nome"
                    placeholder="Nome do curso"
                    value={nome}
                    onChange={handleNomeChange}
                    mt="md"
                />
                <Textarea
                    label="Descrição"
                    placeholder="Descrição do curso"
                    value={descricao}
                    onChange={handleDescricaoChange}
                    mt="md"
                />
                <NumberInput
                    label="Carga Horária"
                    placeholder="Carga horária do curso"
                    value={cargaHoraria}
                    onChange={handleCargaHorariaChange}
                    mt="md"
                />
                <Button type="submit" mt="md">
                    Salvar
                </Button>
            </form>
        </Box>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Table, TextInput, Paper, Title, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

function Curso({ id, nome, descricao, cargaHoraria, setCursoSelecionado }) {
    const clique = () => {
        setCursoSelecionado(id);
    };

    return (
        <Table.Tr onClick={clique} style={{ cursor: "pointer" }}>
            <Table.Td>
                <Text fw={700}>{nome}</Text>
            </Table.Td>
            <Table.Td>{descricao}</Table.Td>
            <Table.Td>{cargaHoraria}</Table.Td>
        </Table.Tr>
    );
}

function Tabela({ cursos, setCursoSelecionado }) {
    const rows = Object.entries(cursos).map(
        ([id, { nome, descricao, cargaHoraria }]) => (
            <Curso
                key={id}
                id={id}
                nome={nome}
                descricao={descricao}
                cargaHoraria={cargaHoraria}
                setCursoSelecionado={setCursoSelecionado}
            />
        )
    );

    return (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nome</Table.Th>
                    <Table.Th>Descrição</Table.Th>
                    <Table.Th>Carga Horária (em horas)</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

function CampoDeBusca({ busca, setBusca }) {
    return (
        <TextInput
            placeholder="Nome do Curso"
            value={busca}
            onChange={(event) => setBusca(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            mb="md"
        />
    );
}

function useCursos() {
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
    const cursos = useCursos();
    const cursosFiltrados = Object.fromEntries(
        Object.entries(cursos).filter(([_, curso]) => {
            return curso.nome.toLowerCase().includes(busca.toLowerCase());
        })
    );

    return (
        <Paper shadow="sm" p="md" withBorder>
            <Title order={2} mb="md">
                Lista de Cursos
            </Title>
            <CampoDeBusca busca={busca} setBusca={setBusca} />
            <Tabela
                setCursoSelecionado={setCursoSelecionado}
                cursos={cursosFiltrados}
            />
        </Paper>
    );
}

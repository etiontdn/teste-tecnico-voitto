"use client";
import { useState, useEffect } from "react";
import { Card, Text, Badge, Group, useMantineTheme, List } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

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

function fetchMatriculas(cursoSelecionado) {
    const [matriculas, setMatriculas] = useState([]);
    useEffect(() => {
        if (cursoSelecionado != "")
            fetch(`http://localhost:8080/matriculas/${cursoSelecionado}`)
                .then((response) => response.json())
                .then((data) => setMatriculas(data));
    }, [cursoSelecionado]);
    return matriculas;
}

export default function Detalhes({ cursoSelecionado }) {
    let curso = fetchCurso(cursoSelecionado);
    let matriculas = fetchMatriculas(cursoSelecionado);

    return cursoSelecionado != "" ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
                <Text size="xl" fw={500}>{curso.nome}</Text>
                <Badge color="blue" variant="light">
                    {curso.cargaHoraria} Horas
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {curso.descricao}
            </Text>

            <List
                mt="md"
                spacing="sm"
                size="sm"
                center
                listStyleType="none"
                icon={<IconUser size={16} color="blue" />}
            >
                {matriculas.map((matricula) => (
                    <List.Item key={matricula.id}>{matricula.nomeAluno}</List.Item>
                ))}
            </List>
        </Card>
    ) : null;
}

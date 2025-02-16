"use client";
import { useState, useEffect } from "react";
import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core';

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
    let curso = fetchCurso(cursoSelecionado);
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
        </Card>
    ) : null;
}

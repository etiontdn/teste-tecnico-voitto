"use client";
import { useState, useEffect } from "react";
import {
    Card,
    Text,
    Badge,
    Group,
    List,
    Title,
    Space,
    Button,
    SimpleGrid,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";

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
                <Title order={3}>{curso.nome}</Title>
                <Badge color="blue" variant="light">
                    {curso.cargaHoraria} Horas
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {curso.descricao}
            </Text>
            <Space h="md" />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {matriculas.map((matricula) => (
                    <List
                        key={matricula.id}
                        spacing="sm"
                        size="sm"
                        center
                        listStyleType="none"
                        icon={<IconUser size={16} color="blue" />}
                    >
                        <List.Item>{matricula.nomeAluno}</List.Item>
                    </List>
                ))}
            </SimpleGrid>
            <Space h="md" />
            <Link href={`/cursos/${cursoSelecionado}`} passHref legacyBehavior>
                <Button component="a">Ver detalhes</Button>
            </Link>
        </Card>
    ) : null;
}

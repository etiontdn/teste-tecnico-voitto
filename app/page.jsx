"use client";
import TabelaDeCursos from "./tabela.jsx";
import Matricula from "./matricula.jsx";
import Detalhes from "./detalhes.jsx";
import { Container, Grid, Space, Title } from "@mantine/core";
import { useState } from "react";

export default function Page() {
    const [cursoSelecionado, setCursoSelecionado] = useState("");

    return (
        <Container size="lg">
            <Space h="xl" />
            <Title align="center" order={1}>
                Lista de Cursos e Matrículas
            </Title>
            <Space h="xl" />
            <Grid gutter="md">
                <Grid.Col span={{base: 12, sm: 6}}>
                    <TabelaDeCursos setCursoSelecionado={setCursoSelecionado} />
                    <Space h="md" />
                    <Detalhes cursoSelecionado={cursoSelecionado} />
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 6}}>
                    <Matricula />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

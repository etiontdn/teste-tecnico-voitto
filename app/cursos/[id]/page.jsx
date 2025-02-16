import Form from "./form.jsx";
import Alunos from "./alunos.jsx";
import {
    Container,
    Space,
    Title,
    SimpleGrid,
    Paper,
    Text,
} from "@mantine/core";

/*
Isto é apenas imitação já que é impossível usar getServerSideProps
com page router no nextjs
*/

async function getServerSideProps(id) {
    let res = await fetch("http://localhost:8080/cursos/" + id);
    const curso = await res.json();
    res = await fetch("http://localhost:8080/matriculas/" + id);
    const matriculas = await res.json();
    return { curso, matriculas };
}

export default async function Page({ params }) {
    const id = (await params).id;
    const { curso, matriculas } = await getServerSideProps(id);
    return (
        <Container size="lg">
            <Space h="xl" />
            <Title align="center" order={2}>
                {curso.nome}
            </Title>
            <Space h="md" />

            <Text size="lg" weight={500}>
                {curso.descricao}
            </Text>
            <Space h="sm" />
            <Text size="md" c="dimmed">
                Carga Horária: {curso.cargaHoraria} horas
            </Text>
            <Space h="xl" />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Paper shadow="sm" p="md" withBorder>
                    <Alunos nome={curso.nome} matriculas={matriculas} />
                </Paper>
                <Paper shadow="sm" p="md" withBorder>
                    <Form curso={curso} id={id} />
                </Paper>
            </SimpleGrid>
        </Container>
    );
}

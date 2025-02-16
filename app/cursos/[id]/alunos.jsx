"use client";
import { List, ListItem, Button, Box, SimpleGrid } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

function makeCSV(nome, matriculas) {
    const arr = matriculas.map((v) =>
        Object.entries(v).map(([key, val]) => val)
    );
    const data = arr
        .map((row) =>
            row
                .map(String)
                .map((v) => v.replaceAll('"', '""'))
                .map((v) => `"${v}"`)
                .join(",")
        )
        .join("\r\n");
    const blob = new Blob([data], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    var download = document.createElement("a");
    download.href = url;
    download.setAttribute("download", "alunos" + nome + ".csv");
    download.click();

    return url;
}

export default function Alunos({ nome, matriculas }) {
    return (
        <Box sx={{ maxWidth: 300 }}>
            <SimpleGrid cols={2} spacing="sm">
                {matriculas.map(({ id, nomeAluno }) => (
                    <Box key={id}>
                        <List
                            spacing="sm"
                            size="sm"
                            center
                            icon={<IconUser size={16} color="blue" />}
                        >
                            <ListItem>{nomeAluno}</ListItem>
                        </List>
                    </Box>
                ))}
            </SimpleGrid>

            <Button onClick={(e) => makeCSV(nome, matriculas)} mt="md">
                Baixar em CSV
            </Button>
        </Box>
    );
}

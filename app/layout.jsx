import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
    ActionIcon,
} from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import Link from 'next/link';

export const metadata = {
    title: "Cursos e Matrículas",
    description: "Aplicação para gerenciamento de cursos e matrículas",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider style={{ minHeight: "100vh" }}>
                    <Notifications position="bottom-right" />
                    {children}
                    <Link href="/" passHref legacyBehavior>
                        <ActionIcon
                            component="a"
                            size="lg"
                            radius="xl"
                            variant="filled"
                            color="blue"
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                right: "20px",
                                zIndex: 1000,
                            }}
                        >
                            <IconHome size={24} />
                        </ActionIcon>
                    </Link>
                </MantineProvider>
            </body>
        </html>
    );
}

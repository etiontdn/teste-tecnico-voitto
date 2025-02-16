import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
} from "@mantine/core";

export const metadata = {
    title: "My Mantine app",
    description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider style={{minHeight: "100vh"}}>
                  <Notifications position="bottom-right"></Notifications>
                  {children}</MantineProvider>
            </body>
        </html>
    );
}

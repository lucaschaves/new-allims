import "./globals.css";

export const metadata = {
    title: "Allims Web",
    description: "Allims web system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className="h-screen w-screen">{children}</body>
        </html>
    );
}

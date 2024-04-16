import { syncopate } from "./ui/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syncopate.className} antialiased`}>{children}</body>
    </html>
  );
}

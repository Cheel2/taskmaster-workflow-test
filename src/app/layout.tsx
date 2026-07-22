import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Minimalist Task Manager MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import './globals.css'; // Pastikan ini ada untuk mengimpor Tailwind

export const metadata = {
  title: "Admin Dashboard",
  description: "Halaman login dan dashboard untuk admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

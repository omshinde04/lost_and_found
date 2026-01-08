import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Virtual Lost & Found",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

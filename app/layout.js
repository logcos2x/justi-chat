import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import { Sidebar } from "./components/SideBar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Justi-Chat - Law, Crime, and Insight in Time!",
  description: "Justi-Chat is an AI-powered legal encyclopedia...",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "128x128", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionWrapper>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <NavBar />
              <main className="flex-1 relative">
                <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
                <div className="relative z-10 h-full overflow-auto pt-5 px-5">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}

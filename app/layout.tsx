import type { Metadata } from "next";
import "./globals.css";
import ClientNavWrapper from "@components/ClientNavWrapper";
import Footer from "@components/Footer";
import SideBar from "@components/SideBar";
import Provider from "@components/Provider";

export const metadata: Metadata = {
  title: "Quizuis",
  description: "Raspunde la quiz-uri interesante pentru a-ti testa cunostintele!",
};

const  RootLayout = ({ children} : 
  Readonly<{ children: React.ReactNode;}>) =>
{
  return (
    <html lang="en">
      <body>
        <Provider>
          <ClientNavWrapper />
          <div className="main_and_sidebar">
            <main>{children}</main>
            <SideBar/>
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

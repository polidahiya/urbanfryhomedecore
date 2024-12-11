import "./globals.css";
import Footer from "./_globalcomps/Footer";
import { Appwrapper } from "./Context";
import Searchbarsection from "./_globalcomps/_navbarcomps/Searchbarsection";
import Message from "./_globalcomps/Message";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Appwrapper>
        <body className={`antialiased`}>
          <Message />
          <Searchbarsection />
          {children}
          <Footer />
        </body>
      </Appwrapper>
    </html>
  );
}

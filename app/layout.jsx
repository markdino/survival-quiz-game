import "@styles/globals.css";
import { Inter } from "next/font/google";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import { UserContextProvider } from "@store/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Are you smarter than a 5th grader",
  description:
    "An online Quiz game where an adult contestants try to answer questions drawn from elementary school textbooks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <UserContextProvider>
            <main className="app">
              <Nav />
              {children}
            </main>
          </UserContextProvider>
        </Provider>
      </body>
    </html>
  );
}

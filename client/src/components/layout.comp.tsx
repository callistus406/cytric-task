import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Vector } from "./vector";
// import Header from "./header.comp";

export type LayoutProps = {
  children: ReactNode;
  title: string;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col ">
      <Head>
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" /> */}

        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <Header /> */}
      <div className="min-h-screen bg-[#0a3545]">
        <main>{children}</main>
        {/* <Footer /> */}
        <Vector className="w-full" />
      </div>
    </section>
  );
};
export default Layout;

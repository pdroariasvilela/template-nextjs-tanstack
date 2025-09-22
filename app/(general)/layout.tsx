import { Navbar } from "@/components";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
      <main>
        {children}
      </main>
    </>
  );
}

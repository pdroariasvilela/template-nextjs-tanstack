import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex bg-blue-600 bg-opacity-30 p-2 m-2 rounded">

      <div className="flex flex-1"></div>

      <Link className="m-2" href="/about">
        About
      </Link>

      <Link className="m-2" href="/">
        Home
      </Link>
    </nav>
  );
};

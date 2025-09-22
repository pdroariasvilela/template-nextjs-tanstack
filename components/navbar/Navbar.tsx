export const Navbar = () => {
  return (
    <nav className="flex bg-blue-600 bg-opacity-30 p-2 m-2 rounded">

      <div className="flex flex-1"></div>

      <a className="m-2" href="/about">
        About
      </a>

      <a className="m-2" href="/">
        Home
      </a>
    </nav>
  );
};

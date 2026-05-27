import "../../src/styles.css";

function Navbar() {
  return (
    <>
      <div className="">
        <nav className="flex items-center p-5">
          <div className="text-2xl font-bold text-white">HobbyHub</div>
          <ul className="flex gap-5 ms-auto">
            <li className="text-white">Home</li>
            <li className="text-white">About</li>
            <li className="text-white">Contact</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

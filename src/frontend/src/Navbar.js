import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>NPG & co.</h1>
      <div className="links">
        <Link to="/">Home</Link >
        <Link to="/inputDisease">Input New Disease</Link>
        <Link to="/testDisease">DNA Prediction Test</Link>
        <Link to="/searchResult">Search Test Result</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;
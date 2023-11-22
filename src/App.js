import "./App.css";
import Player from "./component/Player";
import { FaGithub } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <h1 className="author">Music Player</h1>
      <Player />
      <a href="https://github.com/aamirindi" className="footer">
        aamirindi
        <FaGithub />
      </a>
      <br />
    </div>
  );
}

export default App;

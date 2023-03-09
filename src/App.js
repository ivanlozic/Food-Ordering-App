import "./App.css";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";
import Main from "./components/main/Main";
import Navbar from "./components/navigation/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <BackToTopButton />
    </div>
  );
}

export default App;

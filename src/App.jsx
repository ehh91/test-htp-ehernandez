import './App.css';
import Characters from './components/Characters'
import Header from './components/Header';


function App() {
  return (
    <div className="App" style={{ color: "#94ffff", backgroundColor: "black" }}>
      <Header />
      <Characters />
    </div>
  );
}

export default App;

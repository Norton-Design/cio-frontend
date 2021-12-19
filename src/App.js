import logo from './logo.svg';
import { Route } from "react-router-dom"
import './App.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"


function App() {
  return (
    <>
      <Header />
      <main>
        <h1>Testing</h1>
        {/* <Route path="/customers" component={}/>
        <Route path="/customer/:id" component={}/>
        <Route path="/edit/customer/:id" component={}/> */}
      </main>
      <Footer />
    </>
  );
}

export default App;

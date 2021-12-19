import logo from './logo.svg';
import { Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import CustomerList from './components/customers/CustomerList';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="customers" element={<CustomerList/>}/>
        {/* <Route path="customer/:id" element={}/> */}
        {/* <Route path="/edit/customer/:id" element={}/> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

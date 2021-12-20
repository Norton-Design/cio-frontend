import logo from './logo.svg';
import { Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import CustomerList from './components/customers/CustomerList';
import CustomerShow from './components/customers/CustomerShow';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="customers" element={ <CustomerList/> } />
          <Route path="customers/:id" element={ <CustomerShow /> }/>
        {/* <Route path="customers/:id/edit" element={}/> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

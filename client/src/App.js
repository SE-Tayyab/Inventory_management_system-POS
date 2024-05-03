import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import SalesOrders from './pages/SalesOrders';
import SingleItemPage from './pages/SingleItemPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Homepage/>}/>
           <Route path='/items' element={<ItemPage/>}/>
           <Route path='/salesorders' element={<SalesOrders/>}/>
           <Route path='/item/:itemId' element={<SingleItemPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


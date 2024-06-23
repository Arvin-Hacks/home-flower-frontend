import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard/Dashboard';
import SignupForm from './pages/auth/Signup';
import LoginForm from './pages/auth/Login';
import ManageProducts from './pages/manage-products/Manage-Product';
import { AddProduct } from './pages/manage-products/Add-Product';
import Product from './pages/home/HomePage';
import AddRequest from './pages/requests/AddRequest';
// import { Navbar } from './components/comman/Navbar';
import Layout from './components/layout/Layout';
import ManageRequest from './pages/requests/Request';
import { RequestDetails } from './pages/requests/RequestsDeatils';
import ProductDetails from './pages/home/ProductDetails';
import Orders from './pages/Orders/Orders';
import ShoppingCart from './pages/Cart/Cart';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* <Route element={<Layout />}>
            <Route path="/" element={<Product />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-product" element={<ManageProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-request" element={<AddRequest />} />

          </Route>

          <Route element={<PrivateRoute/>}>

            <R

          </Route> */}


          <Route element={<Layout />}>
            <Route path="/" element={<Product />} />
            {/* <Route element={<PrivateRoute />}> */}

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/manage-product" element={<ManageProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />


            <Route path="/requests" element={<ManageRequest />} />
            <Route path="/requests" element={<ManageRequest />} />
            <Route path="/add-request" element={<AddRequest />} />
            <Route path="/requests-details/:id" element={<RequestDetails />} />

            {/* </Route> */}

          </Route>


          {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        </Routes>
      </Router>

    </>
  )
}

export default App

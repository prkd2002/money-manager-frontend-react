import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Signup from "./pages/Signup.jsx";
import Filter from "./pages/Filter.jsx";
import {Toaster} from "react-hot-toast"


function App() {

  return (
      <>
          <Toaster />
          <BrowserRouter>
          <Routes>
              <Route path="/" element={<Root/>} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/category" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/filter" element={<Filter />} />

          </Routes>
              </BrowserRouter>

      </>
  )
}

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
        <Navigate to={"/dashboard"}/>
    ):
        (
            <Navigate to={"/login"}/>
        )

}

export default App

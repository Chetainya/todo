
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import {createBrowserRouter , RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {path : '/' , element : <NavBar /> , children : [
    {path : '/login' , element : <Login />},
    {path : '/home' , element : <Home />},
  ]}
])

function App() {
  return <RouterProvider router={router}>
    
  </RouterProvider>;
}

export default App;

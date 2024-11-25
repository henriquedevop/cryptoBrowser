import { router } from "./router" 
import { RouterProvider } from "react-router/dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
        <ToastContainer autoClose={2000}/>
        <RouterProvider router={router}/>
    </>
  )
}

export default App

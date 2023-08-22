import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"

function Router () {
    console.log('render Router')
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/' />

            <Route path='*' element={<div>Not found</div>}  />
        </Routes>
    </BrowserRouter>
}

export default Router
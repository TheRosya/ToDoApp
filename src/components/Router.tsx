import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/' />

            <Route path='*' element={<div>Not found</div>}  />
        </Routes>
    </BrowserRouter>
}

export default Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../shared/Navbar";
import Board from "../Board";

const BaseRouter = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Board />} />
                </Routes>
            </Router>
        </>
    )
}

export default BaseRouter;

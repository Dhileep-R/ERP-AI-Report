import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import AddName from "./pages/AddName";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/add"
                    element={<AddName />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;
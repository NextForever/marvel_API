import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComicsPage, MainPage, SingleComicPage } from "../pages";

const App = () => {
    return (
        <BrowserRouter>
            <div className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='single' element={<SingleComicPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;

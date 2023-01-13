import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/common/MainLayout";
import Main from "./pages/Main";
import "./assets/style.css";
import Login from "./pages/Login";
import Import from "./pages/Import";
import { Provider } from "react-redux";
import store from "./redux/store";
import DefaultLayout from "./layout/common/DefaultLayout";

function App() {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                light: "#b2dfdb",
                main: "#6B5FCE",
                // dark: "#004d40",
            },
        },
    });
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseLine />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Main />} />
                            <Route path="/import" element={<Import />} />
                        </Route>
                        <Route path="/" element={<DefaultLayout />}>
                            <Route path="/login" element={<Login />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;

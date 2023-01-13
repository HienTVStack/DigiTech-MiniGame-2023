import { LoadingButton } from "@mui/lab";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import assets from "../assets";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setUsernameErr("");
        setPasswordErr("");
        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");

        let err = false;
        if (username === "") {
            err = true;
            setUsernameErr("Vui lòng nhập tên đăng nhập!");
        }
        if (password === "") {
            err = true;
            setPasswordErr("Vui lòng nhập mật khẩu!");
        }
        setLoading(false);
        if (err) return;
        setLoading(true);
        if (username === "admin" && password === "admin") {
            console.log(`Login success`);
            localStorage.setItem("isLogin", "true");
            navigate("/");
        } else {
            err = true;
            setUsernameErr("Tên đăng nhập hoặc mật khẩu không chính xác");
            setPasswordErr("Tên đăng nhập hoặc mật khẩu không chính xác");
        }

        setLoading(false);
        if (err) return;
    };
    return (
        <>
            <Helmet>
                <title itemProp="name" lang="en">
                    Login Page
                </title>
                <meta name="title" content="My title" />
                <meta name="description" content="Helmet application" />
                <link
                    rel="canonical"
                    href="https://myphamnhanhon-ui.vercel.app/"
                />
            </Helmet>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems="center"
                flexDirection={"column"}
                height={"100vh"}
                width={"100%"}
                backgroundColor={assets.colors.primary}
            >
                <img
                    src={assets.images.logo}
                    alt=""
                    width={300}
                    style={{
                        color: "red",
                        objectFit: "contain",
                    }}
                />
                <Paper
                    elevation={3}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        width: "426px",
                        padding: "12px",
                    }}
                >
                    <Box
                        sx={{ padding: "20px 0" }}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                    >
                        <Box sx={{ margin: "0 20px" }}>
                            <TextField
                                fullWidth
                                required
                                label="Tên đăng nhập"
                                placeholder="Tên đăng nhập"
                                name="username"
                                id="username"
                                margin="normal"
                                helperText={usernameErr}
                                error={usernameErr !== ""}
                                disabled={loading}
                                onChange={() => setUsernameErr("")}
                            />
                            <TextField
                                fullWidth
                                required
                                label="Mật khẩu"
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                type="password"
                                margin="normal"
                                helperText={passwordErr}
                                error={passwordErr !== ""}
                                disabled={loading}
                                onChange={() => setPasswordErr("")}
                            />
                            <LoadingButton
                                variant="contained"
                                size="large"
                                loading={loading}
                                fullWidth
                                type="submit"
                                sx={{
                                    marginTop: "12px",
                                    paddingTop: "12px",
                                    paddingButton: "12px",
                                    backgroundColor: "#6B5FCE",
                                }}
                            >
                                Đăng nhập
                            </LoadingButton>
                        </Box>
                        <Typography variant="body2" mt={3}>
                            <i>Powered by Digitech Solutions</i>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default Login;

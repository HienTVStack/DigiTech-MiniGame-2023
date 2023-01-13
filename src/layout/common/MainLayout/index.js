import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

function MainLayout() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Header />

      <Outlet />
    </Box>
  );
}

export default MainLayout;

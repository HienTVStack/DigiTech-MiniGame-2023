import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import assets from "../../../assets";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        // backgroundColor: assets.colors.secondary,
        // backgroundColor: "#e9f3ff",
        background: "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(21, 185, 187, 0.3) 94.77%)",
        padding: "8px 20px",
      }}
    >
      <Box
        sx={{
          width: "130px",
          height: "74px",
          display: "block",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
        component={Link}
        to="/"
      >
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          // src={assets.images.logo}
          src="https://res.cloudinary.com/digitech-global-solutions/image/upload/v1665502031/g5x4zklaro3mdn1p3hlr.png"
          alt=""
        />
      </Box>
      <Typography
        flex={1}
        variant={"subtitle1"}
        textAlign={"center"}
        sx={{ fontSize: "26px", lineHeight: "41.99px", fontWeight: "700", color: assets.colors.primary }}
      >
        CÔNG TY DIGITECH SOLUTIONS
      </Typography>
    </Box>
  );
}

export default Header;

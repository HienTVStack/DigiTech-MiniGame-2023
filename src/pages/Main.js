import { Box, Modal, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import assets from "../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  minWidth: "500px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: "200px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function Main() {
  const navigate = useNavigate();
  const dataMS = useSelector((state) => state.data.dataList);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState("0000");
  const [openModalResult, setOpenModalResult] = useState(false);
  const [dataResultList, setDataResultList] = useState([]);

  useEffect(() => {
    if (dataMS.length === 0) {
      console.log(`Chưa có dữ liệu`);
      navigate("/import");
    } else {
      setDataList(dataMS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check login
  // useEffect(() => {
  //   const handleCheckLogin = async () => {
  //     const res = await localStorage.getItem("isLogin");

  //     if (!res) {
  //       navigate("/login");
  //     }
  //   };
  //   handleCheckLogin();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRandomNumber = async () => {
    if (dataList.length <= 0) {
      alert("Chưa có dữ liệu");
      return;
    }
    setLoading(true);

    try {
      let count = 0;
      const timerId = setInterval(() => {
        setLuckyNumber(handleRandom(1000, 9999));
        count++;
        if (count > 70) {
          clearInterval(timerId);
          const numberResult = handleRandom(0, dataList.length);
          setLuckyNumber(dataList[numberResult]?.phone.slice(dataList[numberResult]?.phone.length - 4, dataList[numberResult].phone.length));
          setDataResultList([...dataResultList, dataList[numberResult]]);
          if (numberResult) {
            setDataList(dataList.filter((item) => item.phone !== dataList[numberResult]?.phone) || dataList);
            setOpenModalResult(true);
          }
          setLoading(false);
        }
      }, 70);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCloseModalResult = () => {
    setOpenModalResult(false);
  };

  return (
    <>
      <div className="pyro" style={{ zIndex: 1 }}>
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "76px",
            backgroundColor: "#e9f3ff",
          }}
        >
          <Typography
            variant="body2"
            component="h2"
            sx={{
              fontSize: "48px",
              lineHeight: "77.52px",
              fontWeight: "700",
              color: assets.colors.primary,
            }}
          >
            CHƯƠNG TRÌNH QUAY SỐ TRÚNG THƯỞNG
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "calc(100% - 168px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(21, 185, 187, 0.3) 94.77%)",
            backgroundSize: "100% 100%",
          }}
        >
          <Box
            position={"absolute"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            top={"50%"}
            left={"50%"}
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"682px"}
              height={"100px"}
              p={2}
              sx={{
                background: "radial-gradient(50% 1568% at 50% 50%, #FF16A8 0%, #FF76E7 95.83%)",
                boxShadow: "4px 4px 10px rgba(98, 98, 98, 0.25)",
                borderRadius: "20px",
              }}
            >
              <Typography variant="body2" fontSize={"80px"} color={assets.colors.white} m={2} letterSpacing={"25px"}>
                {luckyNumber}
              </Typography>
            </Box>
            <LoadingButton
              variant="outlined"
              size="large"
              loading={loading}
              onClick={handleRandomNumber}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px 34px",
                marginTop: "30px",
                border: `3px solid ${assets.colors.white}`,
                borderRadius: "50px",
                // background: "linear-gradient(90deg, #D9D9D9 0%, #4D81E7 0.01%, #6F48F2 100%);",
                background: assets.colors.secondary,
                color: assets.colors.white,
                fontSize: "27px",
                fontWeight: "700",
                lineHeight: "43.605px",
                "&:hover": {
                  border: `3px solid ${assets.colors.white}`,
                  opacity: "0.9",
                },
              }}
            >
              Quay số
            </LoadingButton>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            marginBottom: "150px",
            marginRight: "50px",
            bottom: "0",
            right: 0,
            padding: "12px",
            border: "1px solid red",
            borderRadius: "12px",
            minHeight: "200px",
            minWidth: "320px",
          }}
        >
          <Typography variant={"subtitle1"} textAlign={"center"} color={assets.colors.secondary} gutterBottom>
            THÔNG TIN TRÚNG THƯỞNG
          </Typography>
          <Typography variant={"body2"} gutterBottom>
            Giải nhất: <span style={{ color: assets.colors.primary }}>{dataResultList[3]?.full_name || "loading..."}</span>
          </Typography>
          <Typography variant={"body2"} gutterBottom>
            Giải nhì: <span style={{ color: assets.colors.primary }}>{dataResultList[2]?.full_name || "loading..."}</span>
          </Typography>
          <Typography variant={"body2"} gutterBottom>
            Giải khuyến kích 1: <span style={{ color: assets.colors.primary }}>{dataResultList[0]?.full_name || "loading..."}</span>
          </Typography>
          <Typography variant={"body2"} gutterBottom>
            Giải khuyến kích 2: <span style={{ color: assets.colors.primary }}>{dataResultList[1]?.full_name || "loading..."}</span>
          </Typography>
        </Box>
      </Box>
      <Modal
        open={openModalResult}
        disableEnforceFocus
        disableAutoFocus
        onClose={handleCloseModalResult}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" fontSize={"23px"} fontWeight={"700"} color={"primary"}>
            Xin chúc mừng chủ nhân của giải thưởng có số điện thoại đuôi
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={"30px"} color={"red"} textAlign={"center"}>
            {luckyNumber}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Main;

import { Box, Modal, Typography, useMediaQuery, useTheme } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import assets from "../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  // minWidth: "500px",
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState("0000");
  // const [openModalResult, setOpenModalResult] = useState(false);
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

  const handleRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRandomNumber = async () => {
    if (dataList.length <= 0) {
      alert("Chưa có dữ liệu");
      return;
    }

    // setLoading(true);

    // try {
    //   let count = 0;
    //   const timerId = setInterval(() => {
    //     setLuckyNumber(handleRandom(1000, 9999));
    //     count++;
    //     if (count > 90) {
    //       clearInterval(timerId);
    //       const numberResult = handleRandom(0, dataList.length);
    //       setLuckyNumber(dataList[numberResult]?.phone.slice(dataList[numberResult]?.phone.length - 4, dataList[numberResult].phone.length));
    //       setDataResultList([...dataResultList, dataList[numberResult]]);
    //       if (numberResult) {
    //         setDataList(dataList.filter((item) => item.phone !== dataList[numberResult]?.phone) || dataList);
    //         setTimeout(() => {
    //           setOpenModalResult(true);
    //         }, 500);
    //       }
    //       setLoading(false);
    //     }
    //   }, 80);
    // } catch (error) {
    //   setLoading(false);
    // }
    try {
      setLoading(true);
      let count = 0;
      const timerId = setInterval(() => {
        setLuckyNumber(handleRandom(1000, 9999));
        count++;
        if (count > 90) {
          clearInterval(timerId);
          const numberResult = handleRandom(0, dataList.length);
          if (!dataList[numberResult]) {
            setLoading(false);
            return;
          }
          setLuckyNumber(dataList[numberResult].phone.slice(dataList[numberResult].phone.length - 4), dataList[numberResult].phone.length);
          setDataList(dataList.filter((item) => item.phone !== dataList[numberResult].phone));
          setDataResultList([...dataResultList, dataList[numberResult]]);
          setLoading(false);
        }
      }, [100]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    // setLoading(false);
  };

  // const handleCloseModalResult = () => {
  //   setOpenModalResult(false);
  // };

  return (
    <>
      {/* <div className="pyro" style={{ zIndex: 1 }}>
        <div className="before"></div>
        <div className="after"></div>
      </div> */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          marginTop: "40px",
        }}
      >
        {/* Logo left */}
        <Box sx={{ position: "absolute", left: 0, top: 0, marginLeft: "20px" }}>
          <img
            width={105}
            height={60}
            src={"https://res.cloudinary.com/digitech-global-solutions/image/upload/v1665502031/g5x4zklaro3mdn1p3hlr.png"}
            alt={"logo"}
          />
        </Box>

        {/* Logo right */}
        {/* <Box sx={{ position: "absolute", right: 0, top: 0, marginLeft: "20px" }}>
          <img width={200} height={120} src={assets.images.logo} alt={"logo"} />
        </Box> */}
        {!matches && (
          <Typography
            variant="body2"
            textAlign={"center"}
            component="h2"
            fontSize={25}
            lineHeight={"40.375px"}
            fontWeight={700}
            sx={{
              color: assets.colors.primary,
            }}
          >
            CÔNG TY DIGITECH SOLUTIONS
          </Typography>
        )}

        {/* <Typography
          variant="body2"
          textAlign={"center"}
          component="h2"
          sx={{
            fontSize: "26px",
            lineHeight: "41.99px",
            fontWeight: "700",
            color: assets.colors.primary,
          }}
        >
          CHÚC MỪNG NĂM MỚI
        </Typography> */}
        {/* <Typography
          variant="body2"
          textAlign={"center"}
          component="h2"
          sx={{
            fontSize: "26px",
            lineHeight: "41.99px",
            fontWeight: "700",
            color: assets.colors.primary,
          }}
        >
          AN KHANG - THỊNH VƯỢNG
        </Typography> */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
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
            top={"45%"}
            left={"50%"}
            width={"100%"}
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Typography
              variant="subtitle1"
              textAlign={"center"}
              component="h2"
              sx={{
                fontSize: matches ? "20px" : "26px",
                lineHeight: "41.99px",
                fontWeight: "700",
                color: assets.colors.primary,
              }}
            >
              CHƯƠNG TRÌNH QUAY SỐ MAY MẮN
            </Typography>
            <div id="main-number" style={{ margin: "40px 0" }}>
              <input disabled type="text" value={luckyNumber && luckyNumber.toString().slice(0, 1)} required id="n1" name="n1" />
              <input disabled type="text" value={luckyNumber && luckyNumber.toString().slice(1, 2)} required id="n2" name="n2" />
              <input disabled type="text" value={luckyNumber && luckyNumber.toString().slice(2, 3)} required id="n3" name="n3" />
              <input disabled type="text" value={luckyNumber && luckyNumber.toString().slice(3, 4)} required id="n4" name="n4" />
              {/* <input type="text" value="0" required id="n5" name="n5" />
              <input type="text" value="0" required id="n6" name="n6" /> */}
            </div>

            <LoadingButton
              variant="outlined"
              // size="large"
              loading={loading}
              onClick={handleRandomNumber}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 34px",
                margin: "40px 0",
                border: `3px solid ${assets.colors.white}`,
                borderRadius: "20px",
                // background: "linear-gradient(90deg, #D9D9D9 0%, #4D81E7 0.01%, #6F48F2 100%);",
                background: assets.colors.secondary,
                color: assets.colors.white,
                fontSize: "20px",
                fontWeight: "700",
                lineHeight: "32.3px",
                "&:hover": {
                  border: `3px solid ${assets.colors.white}`,
                  opacity: "0.9",
                  backgroundColor: assets.colors.primary,
                },
              }}
            >
              Quay số
            </LoadingButton>
          </Box>
        </Box>
        {!matches && (
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
        )}
      </Box>
      {/* <Modal open={openModalResult} disableEnforceFocus disableAutoFocus onClose={handleCloseModalResult}>
        <Box sx={style} style={{ maxWidth: "80%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" fontSize={matches ? "14px" : "23px"} fontWeight={"700"} color={"primary"}>
            Xin chúc mừng chủ nhân của giải thưởng có số điện thoại đuôi
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={"30px"} color={"red"} textAlign={"center"}>
            {luckyNumber}
          </Typography>
        </Box>
      </Modal> */}
    </>
  );
}

export default Main;

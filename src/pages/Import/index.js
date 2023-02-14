import { Alert, AlertTitle, Box, Button, Container, Grid, Icon, Snackbar, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { read, utils } from "xlsx";
import { setDataList } from "../../redux/actions";
// import PublishIcon from "@mui/icons-material/Publish";
import { DataGrid } from "@mui/x-data-grid";
import assets from "../../assets";
import axios from "axios";

const columns = [
  { field: "full_name", headerName: "Họ và tên", width: 300 },
  { field: "phone", headerName: "Số điện thoại", width: 300 },
];

function Import() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // const inputRef = useRef();
  // const [importFileName, setImportFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    open: false,
    title: "Default title",
    message: "Default message",
    severity: "success",
  });
  const [dataListXLSX, setDataListXLSX] = useState([]);

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

  const handleClose = () => {
    setShowToast({ open: false });
  };

  // const readExcel = async (file) => {
  //   setImportFileName(file?.name);
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);

  //     fileReader.onload = (e) => {
  //       const bufferArray = e.target.result;

  //       const wb = read(bufferArray, { type: "buffer" });

  //       const wsname = wb.SheetNames[0];

  //       const ws = wb.Sheets[wsname];

  //       const data = utils.sheet_to_json(ws);
  //       resolve(data);
  //     };
  //     fileReader.onerror = (err) => {
  //       reject(err);
  //     };
  //   });

  //   await promise
  //     .then((data) => {
  //       if (data) {
  //         setDataListXLSX(data.slice(1));
  //         setShowToast({
  //           open: true,
  //           title: "Thành công",
  //           message: "Tải thành công dữ liệu",
  //           severity: "success",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleImport = () => {
    if (dataListXLSX.length <= 0) {
      setShowToast({
        open: true,
        title: "Thất bại",
        message: "Chưa có dữ liệu đầu vào",
        severity: "error",
      });
      setDataListXLSX([]);
      return;
    }
    if (dataListXLSX.length < 3) {
      setShowToast({ open: true, message: "Số lượng người chơi phải lớn 3", severity: "warning" });
      return;
    }

    if (!dataListXLSX[0].full_name || !dataListXLSX[0].phone) {
      setShowToast({
        open: true,
        title: "Thất bại",
        message: "Dữ liệu đầu vào không đúng định dạng",
        severity: "error",
      });
      setDataListXLSX([]);
      return;
    }
    dispatch(setDataList(dataListXLSX));
    navigate("/");
  };
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://sheet.best/api/sheets/8ebdd946-31ac-4e20-a710-d56c25b07de5");
      // const res = await axios.get("https://sheet.best/api/sheets/fc4c0716-e521-4084-bbd6-65896af2a63c");
      if (res.status === 200) {
        setDataListXLSX(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <Box sx={{ margin: "20px 0" }}>
        <Typography textAlign={"center"} fontSize={"20px"} lineHeight={"32.8px"} color={assets.colors.primary}>
          TẢI LÊN DANH SÁCH THAM GIA CHƯƠNG TRÌNH
        </Typography>
        {/* <a href="./Digitech-DigiEdu-Employee-template.xlsx" download style={{ textAlign: "center", display: "block" }}>
          <i>Tải xuống bản mẫu</i>
        </a> */}
      </Box>

      <Box sx={{ margin: "20px 0" }}>
        {/* <Box aria-label="upload picture" component="label" sx={{ cursor: "pointer" }}>
          <input
            hidden
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            ref={inputRef}
            multiple
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
              e.target.value = "";
            }}
          />
          <Stack direction={"row"} alignItems={"center"}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              m={2}
              sx={{
                maxWidth: "140px",
                border: "1px solid #ccc",
                backgroundColor: "rgb(244, 246, 248)",
                borderRadius: "4px",
                padding: "4px 12px",
              }}
            >
              <Stack direction={"row"} alignItems={"center"} sx={{ maxWidth: "140px" }}>
                <Icon fontSize="small" sx={{ marginRight: "12px", color: assets.colors.secondary }}>
                  <PublishIcon />
                </Icon>
                <Typography variant="body2" color={assets.colors.secondary} fontSize="16px" lineHeight={"25.84px"} component={"h5"}>
                  Chọn tệp
                </Typography>
              </Stack>
            </Box>
            <Typography variant="body2">{importFileName}</Typography>
          </Stack>
        </Box> */}

        <Button size="large" variant="contained" onClick={handleImport}>
          Nạp dữ liệu
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <Box sx={{ margin: "20px 0", display: "flex", height: "500px" }}>
            <DataGrid loading={loading} rows={dataListXLSX} columns={columns} getRowId={(row) => row.full_name + row.phone} />
          </Box>
        </Grid>
        {!matches && (
          <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="subtitle1" fontSize={24} textAlign={"center"}>Quét mã để tham gia</Typography>
          <img src="/qr-code.png" alt="" width={'100%'} height={"400px"} style={{objectFit: 'contain'}} />
        </Grid>
        )}
        
      </Grid>
      

      {/* Toast message */}
      <Snackbar
        open={showToast.open}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <Alert severity={showToast.severity}>
          <AlertTitle>{showToast.title}</AlertTitle>
          {showToast.message} - <strong>Kiểm tra nó!</strong>
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Import;

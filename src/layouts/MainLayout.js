import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 8, sm: 9 },
          pb: 4,
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
    </Box>
  );
}

export default MainLayout;

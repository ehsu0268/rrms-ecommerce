import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import Main from "./templates/Main";
import CenterContainer from "./templates/CenterContainer";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
      </Box>
      <Main>
        <CenterContainer />
      </Main>
    </>
  );
};

export default Home;

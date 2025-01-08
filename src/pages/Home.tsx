import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import { useTheme } from "@mui/material/styles";
import Main from "./templates/Main";
import CenterContainer from "./templates/CenterContainer";

const Home = () => {
  const theme = useTheme();
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

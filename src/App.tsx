import { ThemeProvider } from '@mui/system';
import Box from '@mui/material/Box';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import Typography from '@mui/material/Typography'
import { Route, Routes } from 'react-router-dom';

const Home = () => (
  <Box>
    <Typography variant="h3" component="h1">
      Home
    </Typography>
  </Box>
);

const About = () => (
  <Box>
    <Typography variant="h3" component="h1">
      About
    </Typography>
  </Box>
);

function App() {
  return <ThemeProvider theme={appTheme}>
    <Box
      component="main"
        sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.grey[900]
      }}
    >
      <Header />
      <Layout>
        <h1>Welcome to React Router!</h1>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="about" element={<About/>} />
        </Routes>
      </Layout>
    </Box>
  </ThemeProvider>;
}

export default App;
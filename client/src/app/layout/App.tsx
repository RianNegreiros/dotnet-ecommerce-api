import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import AboutPage from '../../features/about/AboutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: paletteMode === 'light' ? '#eaeaea' : '#121212',
      }
    }
  });

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

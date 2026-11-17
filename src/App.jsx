import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { UserProvidder } from './context/UserContext';
import { mainTheme } from './themes/mainTheme';

function App() {

  return (
    <>
      <UserProvidder>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <NavBar />
          <AppRoutes />
        </ThemeProvider>
      </UserProvidder>
    </>
  )
}

export default App

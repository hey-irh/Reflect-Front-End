import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useAppContext } from './AppContext';
import './App.css';
import './global.css';
// App Component Pages
import Welcome from './Components/2.Welcome_Page';
import Emotions from './Components/3.Emotions_Page';
import JournalEntry from './Components/4.Journal_Entry_Page';
import JournalView from './Components/5.Journal_View_Page';
import Timeline from './Components/6.Timeline_Page';
import Trophy from './Components/7.Trophy_Page';
import Stats from './Components/8.Stats_Page';
import Profile from './Components/1b.Profile_Page';
import LogIn from './Components/1.Login_Page/index';
import Logout from './Components/9.Logout_Page/index';
// Material UI Imports
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ToggleButton } from '@material-ui/lab';
import BrightnessIcon4 from '@material-ui/icons/Brightness4';

// Need to figure out how to get the login page to work when the user isnt authenticated as at the moment they can only see it when they are authenticated which is a bug!!
const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
  },
});

const ThemeContext = createContext();

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, isLoading } = useAppContext();
  const [darkState, setDarkState] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkState ? 'dark' : 'light',
      primary: {
        light: '#f6685e',
        main: '#f44336',
        dark: '#aa2e25',
        contrastText: '#fff',
      },
      secondary: {
        light: '#52b202',
        main: '#76ff03',
        dark: '#91ff35',
        contrastText: '#000',
      },
    },
  });
  //Toggles the dark and light theme
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  //Handles the Expanded Navigation
  const navClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //Handles the Selected Expanded Navigation
  const navClose = () => {
    setAnchorEl(null);
  };
  // Wait While Authentication is loading
  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }
  // If Authenticated render the App
  // BUG - Login Page only loads if User is Logged in and Authenticated

  return (
    <div className='App' id={darkState ? 'darkTheme' : 'lightTheme'}>
      <ThemeContext.Provider value={darkState ? 'darkTheme' : 'lightTheme'}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className='nav-bar'>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels={false}
                className={classes.root}
              >
                <BottomNavigationAction
                  component={Link}
                  to='/profile'
                  label='Profile'
                  value='profile'
                  icon={<FaceRoundedIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to='/journalview'
                  label='Journal'
                  value='journal'
                  icon={<EditRoundedIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to='/timeline'
                  label='TimeLine'
                  value='timeline'
                  icon={<ScheduleRoundedIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to='/trophy'
                  label='Trophies'
                  value='trophies'
                  icon={<EmojiEventsRoundedIcon />}
                />
                <BottomNavigationAction
                  icon={<MenuRoundedIcon />}
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={navClick}
                />
                <Menu
                  id='app-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={navClose}
                >
                  <MenuItem className='menu-item' onClick={navClose}>
                    <ToggleButton
                      value='check'
                      selected={darkState}
                      onChange={handleThemeChange}
                    >
                      <BrightnessIcon4 />
                    </ToggleButton>
                  </MenuItem>
                  <MenuItem
                    className='menu-item'
                    component={Link}
                    to='/'
                    onClick={navClose}
                  >
                    Welcome
                  </MenuItem>
                  <MenuItem
                    className='menu-item'
                    component={Link}
                    to='/emotions'
                    onClick={navClose}
                  >
                    Emotions
                  </MenuItem>
                  <MenuItem
                    className='menu-item'
                    component={Link}
                    to='/journalentry'
                    onClick={navClose}
                  >
                    Journal Entry
                  </MenuItem>
                  <MenuItem
                    className='menu-item'
                    component={Link}
                    to='/stats'
                    onClick={navClose}
                  >
                    Stats
                  </MenuItem>
                  <MenuItem
                    className='menu-item'
                    component={Link}
                    to='/logout'
                    onClick={navClose}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </BottomNavigation>
              <Switch>
                <Route path='/profile'>
                  <Profile />
                </Route>
                <Route path='/emotions'>
                  <Emotions />
                </Route>
                <Route path='/journalentry'>
                  <JournalEntry />
                </Route>
                <Route path='/journalview'>
                  <JournalView />
                </Route>
                <Route path='/timeline'>
                  <Timeline />
                </Route>
                <Route path='/trophy'>
                  <Trophy />
                </Route>
                <Route path='/stats'>
                  <Stats />
                </Route>
                <Route path='/logout'>
                  <Logout />
                </Route>
                <Route path='/'>
                  <Welcome />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

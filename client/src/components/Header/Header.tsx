import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, useAppSelector } from '../../redux';
import { ColorMode } from './components/ColorMode';
import { ProfileIcon } from './components/ProfileIcon';
import { AuthButtons } from './components/AuthButtons';

export const Header = () => {
  const user = useAppSelector(getUser);
  const isAuth = Boolean(user);

  // const navigate = useNavigate();
  // const isMobileScreen = useMediaQuery('(max-width:1000px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Reviewly
          </Typography>
          <ColorMode />
          {isAuth ? <ProfileIcon /> : <AuthButtons />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

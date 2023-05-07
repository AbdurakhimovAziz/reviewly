import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUser, useAppSelector } from '../../redux';
import { routePaths } from '../../router';
import { AuthButtons } from './components/AuthButtons';
import { ColorMode } from './components/ColorMode';
import { ProfileIcon } from './components/ProfileIcon';

export const Header = () => {
  const user = useAppSelector(getUser);
  const isAuth = Boolean(user);

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
            marginRight="auto"
            to={routePaths.HOME}
            sx={{ textDecoration: 'none' }}
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

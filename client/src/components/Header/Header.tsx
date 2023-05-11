import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routePaths } from 'router';
import { useAppSelector, getUser } from 'store';
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
          {isAuth && (
            <Button
              component={Link}
              to={routePaths.CREATE_POST}
              variant="contained"
              color="info"
            >
              Create Post
            </Button>
          )}
          {isAuth ? <ProfileIcon /> : <AuthButtons />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

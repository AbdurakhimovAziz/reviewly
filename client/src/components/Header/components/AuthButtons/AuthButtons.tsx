import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { routePaths } from 'router';

export const AuthButtons = () => {
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to={routePaths.LOGIN}
      >
        Login
      </Button>
    </>
  );
};

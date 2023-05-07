import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const AuthButtons = () => {
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </>
  );
};

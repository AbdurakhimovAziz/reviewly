import { DarkMode, LightMode } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { getColorMode } from '../../redux';
import { changeColorMode } from '../../redux/slices/app';
import { theme } from '../../utils/constants';

export const ColorMode = () => {
  const themeMode = useSelector(getColorMode);
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(changeColorMode())}>
      {themeMode === theme.LIGHT ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

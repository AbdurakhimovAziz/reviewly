import { DarkMode, LightMode } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, getColorMode, useAppDispatch } from 'store';
import { changeColorMode } from 'store/slices/main';
import { theme } from 'utils';

export const ColorMode = () => {
  const themeMode = useAppSelector(getColorMode);
  const dispatch = useAppDispatch();

  return (
    <IconButton onClick={() => dispatch(changeColorMode())}>
      {themeMode === theme.LIGHT ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

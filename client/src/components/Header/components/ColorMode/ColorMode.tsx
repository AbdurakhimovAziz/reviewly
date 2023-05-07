import { DarkMode, LightMode } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {
  getColorMode,
  useAppDispatch,
  useAppSelector,
} from '../../../../redux';
import { changeColorMode } from '../../../../redux/slices/main';
import { theme } from '../../../../utils/constants';

export const ColorMode = () => {
  const themeMode = useAppSelector(getColorMode);
  const dispatch = useAppDispatch();

  return (
    <IconButton onClick={() => dispatch(changeColorMode())}>
      {themeMode === theme.LIGHT ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

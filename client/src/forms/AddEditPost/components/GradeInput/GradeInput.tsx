import { Rating, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GradeInputProps } from './types';

export const GradeInput = ({ control, defaultValue, max }: GradeInputProps) => {
  return (
    <Controller
      name="grade"
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...rest } }) => (
        <>
          <Typography>Grade: </Typography>
          <Rating
            max={max}
            onChange={(e, value) => onChange(value)}
            {...rest}
          />
        </>
      )}
    />
  );
};

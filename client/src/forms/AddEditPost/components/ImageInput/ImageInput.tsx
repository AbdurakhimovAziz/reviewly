import { Box, Icon, IconButton, Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { ImageInputProps } from './types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

export const ImageInput = ({ onDrop, imageUrl, onDelete }: ImageInputProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const text = isDragActive
    ? 'Drop your image files here'
    : 'Drag and drop some files here, or click to select files';

  return (
    <Box
      component="div"
      marginY={4}
      {...getRootProps()}
      sx={{
        padding: 4,
        border: 1,
        borderColor: 'grey.400',
        borderStyle: 'dotted',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <Box position="relative">
          <IconButton
            onClick={onDelete}
            sx={{ position: 'absolute', top: '-30px', right: '-20px' }}
          >
            <DeleteIcon />
          </IconButton>
          <Paper width="100%" component="img" src={imageUrl} />
        </Box>
      ) : (
        <Typography
          className="dropzone"
          display="flex"
          alignItems="center"
          gap={2}
          color="info.main"
        >
          <Icon color="inherit">
            <FileUploadIcon />
          </Icon>
          {text}
        </Typography>
      )}
    </Box>
  );
};

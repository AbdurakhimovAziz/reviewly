import { FileWithPreview } from 'forms/AddEditPost/types';

export type ImageInputProps = {
  onDrop: (acceptedFiles: File[]) => void;
  image: FileWithPreview | null;
  onDelete: () => void;
};

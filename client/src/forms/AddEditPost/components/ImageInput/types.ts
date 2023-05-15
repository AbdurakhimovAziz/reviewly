import { MouseEvent } from 'react';

export type ImageInputProps = {
  onDrop: (acceptedFiles: File[]) => void;
  imageUrl?: string;
  onDelete: (e: MouseEvent) => void;
};

import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  CantUploadFileType: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'cant_upload_file_type',
    message: 'No se puede subir el tipo de archivo',
  },
  SelectFile: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'select_file',
    message: 'Seleccione un archivo',
  },
  FileNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'file_not_found_dir',
    message: 'File not found in the directory',
  },
} as const;

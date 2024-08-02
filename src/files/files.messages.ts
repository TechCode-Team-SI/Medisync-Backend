import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  CantUploadFileType: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      file: `cantUploadFileType`,
    },
  },
  SelectFile: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      file: 'selectFile',
    },
  },
};

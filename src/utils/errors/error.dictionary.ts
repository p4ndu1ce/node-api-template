import { BadRequestError } from './customErrors/badRequestError';
import { NotFoundError } from './customErrors/notFoundError';
import { SystemError } from './customErrors/systemError';
import { ValidationError } from './customErrors/validationError';
import type { ErrorType } from './types/errorType';

export const errorDictionary = new Map<string, ErrorType>([
  [ValidationError.name, { status: 400, code: 'bad_request' }],
  [BadRequestError.name, { status: 400, code: 'bad_request' }],
  [SystemError.name, { status: 500, code: 'internal_server_error' }],
  [NotFoundError.name, { status: 404, code: 'not_found' }],
]);

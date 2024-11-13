import { errorDictionary } from './error.dictionary';
import type { ResponseType } from './types/responseType';
import { SystemError } from './customErrors/systemError';

/**
 * Transform errors into API Gateway responses
 * @param {Error} error an error to transform
 * @returns {ResponseType} an API Gateway error response (status code > 399)
 */
export function errorHandler(error: Error): ResponseType {
  const errorResponse =
    errorDictionary.get(error.constructor.name) ||
    errorDictionary.get(SystemError.name)!;

  return {
    statusCode: errorResponse.status,
    body: JSON.stringify({
      code: errorResponse.code,
      message: error.message,
    }),
  };
}

import { SystemError } from './systemError';

/**
 * Not found error class
 */
export class NotFoundError extends SystemError {
  /**
   * Creates an NotFoundError instance
   * @param {string} message the error message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

import { SystemError } from './systemError';

/**
 * Existing item error class
 */
export class BadRequestError extends SystemError {
  /**
   * Creates an ExistingItemError instance
   * @param {string} message the error message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

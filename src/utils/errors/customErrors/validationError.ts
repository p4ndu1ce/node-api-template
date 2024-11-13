import { SystemError } from './systemError';

/**
 * Validation error class
 */
export class ValidationError extends SystemError {
  /**
   * Creates a ValidationError instace
   * @param {string} message Error message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

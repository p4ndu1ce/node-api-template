/**
 * System error class
 * For modeling internal error of the application
 */
export class SystemError extends Error {
  /**
   * Creates an SystemError instance
   * @param {string} message the error message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, SystemError.prototype);
  }
}

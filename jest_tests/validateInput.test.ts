import { validateInput } from '../src/utils/validateInput';

describe('validateInput', () => {
  let setErrorMock: jest.Mock;

  beforeEach(() => {
    // Mock the setError function
    setErrorMock = jest.fn();
  });

  test('should not set an error for valid input', () => {
    const validValue = '12345';
    const validPattern = '^[0-9]{5}$'; // Exactly 5 digits

    validateInput(validValue, validPattern, 'Invalid input', setErrorMock);

    expect(setErrorMock).toHaveBeenCalledWith(null); // No error
  });

  test('should set an error for invalid input', () => {
    const invalidValue = 'abc';
    const validPattern = '^[0-9]{5}$'; // Exactly 5 digits

    validateInput(invalidValue, validPattern, 'Invalid input', setErrorMock);

    expect(setErrorMock).toHaveBeenCalledWith('Invalid input'); // Error message
  });

  test('should use custom error message if provided', () => {
    const invalidValue = 'abc';
    const validPattern = '^[0-9]{5}$'; // Exactly 5 digits
    const customErrorMessage = 'Custom error message';

    validateInput(invalidValue, validPattern, customErrorMessage, setErrorMock);

    expect(setErrorMock).toHaveBeenCalledWith(customErrorMessage); // Custom error message
  });

  test('should not call setError if pattern is not provided', () => {
    const value = 'abc';

    validateInput(value, undefined, 'Some error', setErrorMock);

    expect(setErrorMock).not.toHaveBeenCalled(); // No pattern, no validation
  });

  test('should not call setError if setError is not provided', () => {
    const validValue = '12345';
    const validPattern = '^[0-9]{5}$'; // Exactly 5 digits

    // No setError provided
    validateInput(validValue, validPattern);

    expect(true).toBeTruthy();
  });
});

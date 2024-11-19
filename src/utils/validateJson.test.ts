// utils/validateJson.test.ts
import { validateJson } from './validateJson';

describe('validateJson', () => {
  test('returns parsed data for valid JSON', () => {
    const validJson = '{"name": "John", "age": 30}';
    const result = validateJson(validJson);

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ name: 'John', age: 30 });
  });

  test('returns error message for invalid JSON', () => {
    const invalidJson = '{"name": "John", "age": 30'; // Missing closing brace
    const result = validateJson(invalidJson);

    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined(); // Error message should be defined
  });

  test('returns error for empty input', () => {
    const emptyInput = '';
    const result = validateJson(emptyInput);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Unexpected end of JSON input'); // Specific error message
  });

  test('returns error for non-JSON string', () => {
    const nonJsonInput = 'Hello, World!';
    const result = validateJson(nonJsonInput);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Unexpected token H in JSON at position 0'); // Specific error message
  });

  test('handles deeply nested valid JSON', () => {
    const nestedJson = '{"level1": {"level2": {"level3": {"key": "value"}}}}';
    const result = validateJson(nestedJson);

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ level1: { level2: { level3: { key: 'value' } } } });
  });
});

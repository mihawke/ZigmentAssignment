import { validateJson } from '../src/utils/validateJson';

describe('Test for JSON validation', () => {
  test('returns parsed data for valid JSON', () => {
    const validJson = '{"name": "John", "age": 30}';
    const result = validateJson(validJson);

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ name: 'John', age: 30 });
  });

  test('returns parsed data for valid JSON', () => {
    const nestedJson = '{"level1": {"level2": {"level3": {"key": "value"}}}}';
    const result = validateJson(nestedJson);

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ level1: { level2: { level3: { key: 'value' } } } });
  });

  test('returns error message for invalid JSON', () => {
    const invalidJson = '{"name": "John", "age": 30';
    const result = validateJson(invalidJson);

    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('returns error message for invalid JSON', () => {
    const invalidJson = '';
    const result = validateJson(invalidJson);

    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });
});

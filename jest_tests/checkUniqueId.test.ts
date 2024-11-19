import { checkUniqueId } from "../src/utils/checkUniqueId";

describe('areIdsUnique', () => {
  test('returns true for fields with unique ids', () => {
    const fields = [
      { id: 'name', type: 'text' },
      { id: 'email', type: 'email' },
      { id: 'password', type: 'password' },
    ];
    expect(checkUniqueId(fields)).toBe(true);
  });

  test('returns false for fields with duplicate ids', () => {
    const fields = [
      { id: 'name', type: 'text' },
      { id: 'email', type: 'email' },
      { id: 'email', type: 'password' }, // Duplicate id
    ];
    expect(checkUniqueId(fields)).toBe(false);
  });

  test('returns true for an empty fields array', () => {
    const fields: Array<{ id: string }> = [];
    expect(checkUniqueId(fields)).toBe(true);  // Empty list should be considered unique
  });

  test('returns true for a single field', () => {
    const fields = [{ id: 'name', type: 'text' }];
    expect(checkUniqueId(fields)).toBe(true);
  });
});

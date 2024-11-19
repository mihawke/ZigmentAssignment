export const checkUniqueId = (fields?: Array<{ id: string }>): boolean => {
  if (fields) {
    const ids = fields.map((field) => field.id);
    const uniqueIds = new Set(ids);
    return ids.length === uniqueIds.size;
  }
  return false;
};

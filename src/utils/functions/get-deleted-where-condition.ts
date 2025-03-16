export default function getDeletedWhereCondition(value?: boolean) {
  if (value === true) return { not: null };
  if (value === false) return null;
  return;
}

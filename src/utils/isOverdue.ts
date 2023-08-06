export default function isOverdue(due: string, today: string): boolean {
  return due < today;
}

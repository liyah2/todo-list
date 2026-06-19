export function isValidTodoTitle(title) {
  const trimmedTitle = title.trim();

  return trimmedTitle.length > 0 && trimmedTitle.length <= 100;
}

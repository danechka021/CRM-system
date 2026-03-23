export const validateTodoTitle = (title: string): string => {
  const titleTrim = title.trim();
  if (!titleTrim) {
    return "Это поле не может быть пустым";
  } else if (titleTrim.length < 2) {
    return "Минимальная длина текста 2 символа";
  } else if (titleTrim.length > 64) {
    return "Максимальная длина текста 64 символа.";
  }
  return "";
};

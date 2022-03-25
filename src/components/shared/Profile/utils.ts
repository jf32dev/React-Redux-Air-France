export const createInitials = (name: string) => {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
  return null;
};

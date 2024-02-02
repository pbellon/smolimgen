export const capitalize = (value: string): string => {
  const [firstLetter, ...rest] = value;
  return (firstLetter ?? '').toLocaleUpperCase().concat(rest.join(''));
};

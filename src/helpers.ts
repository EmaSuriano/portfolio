export const humanize = (text = '') => {
  return text
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1 - word.length))
    .join(' ');
};

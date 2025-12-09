export function generateRandomColor(min: any, max: any) {
  const minInt = parseInt(min, 16);
  const maxInt = parseInt(max, 16);
  const randomInt = Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  return `#${randomInt.toString(16).padStart(6, '0')}`;
}

export default generateRandomColor
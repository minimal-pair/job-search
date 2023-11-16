const nextElementInList = <T>(list: T[], value: T) => {
  const currentIndex = list.indexOf(value);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
};

export default nextElementInList;

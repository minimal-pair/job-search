const nextElementInList = (list, value) => {
  const currentIndex = list.indexOf(value);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
};

export default nextElementInList;

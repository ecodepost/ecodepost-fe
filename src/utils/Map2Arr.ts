function Map2Arr<T>(map: Map<string, T>): T[] {
  const arr: T[] = [];
  map.forEach((value) => {
    arr.push(value);
  });
  return arr;
}

export default Map2Arr;

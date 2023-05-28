const GetThemeColor = (name: string) => {
  const allStyle = getComputedStyle(document.documentElement);
  return String(allStyle.getPropertyValue(name)).trim();
};

export default GetThemeColor;

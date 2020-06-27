//Makes the first letter of each word uppercase, takes - out
export const titleUpperCase = (title) => {
  let splitTitle = title.split('-');
  for (let i = 0; i < splitTitle.length; i++) {
    splitTitle[i] =
      splitTitle[i].charAt(0).toUpperCase() + splitTitle[i].substring(1);
  }
  return splitTitle.join(' ');
};

//Makes all letters lowercase and trades spaces for "-"
export const titleDashLowerCase = (title) => {
  return title.toLowerCase().replace(/ /g, '-');
};

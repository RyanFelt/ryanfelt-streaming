//Makes the first letter of each word uppercase, takes - out
export const titleUpperCase = str => {
    let splitStr = str.split('-');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
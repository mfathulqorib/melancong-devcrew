export function capitalizeEachWord(mySentence) {
  const words = mySentence.split(" ");

  const CamelCaseSentence = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return CamelCaseSentence;
}

export function slugForUiApi(mySentence) {
  const words = mySentence.split(" ");
  const slug = words.join("+");
  return slug;
}

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

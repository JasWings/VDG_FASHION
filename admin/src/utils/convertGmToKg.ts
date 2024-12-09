const ConvertToKilograms = (grams:number) => {
    if (grams > 1000|| grams===1000) {
      return grams / 1000 + "kg";
    } else {
      return grams+"gm";
    }
}

export default ConvertToKilograms
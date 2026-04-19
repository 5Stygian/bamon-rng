import roll, { NumberAttributes, RandomNumber } from "./button";

// EP = 100_000_000/(amount of numbers with that property)
export function _calculateEP(
  startindex: number = 0,
  endbuffer: number = 0,
): void {
  if (startindex >= Object.keys(NumberAttributes).length) {
    console.log(Object.keys(NumberAttributes).length);
    return;
  }
  const number: RandomNumber = new RandomNumber();
  for (
    let j = startindex;
    j < Object.keys(NumberAttributes).length - endbuffer;
    j++
  ) {
    const jkey: string = Object.keys(NumberAttributes)[j];
    let quantity: number = 0;
    for (let i = 0; i <= 1_000_000; i++) {
      number.value = i;
      if (number.getAttrNames().includes(NumberAttributes[jkey][0])) {
        quantity += 1;
      }
    }
    console.log(NumberAttributes[jkey][0], Math.ceil(100_000_000 / quantity));
  }
}

export function _rollNumber(number: number): void {
  roll(number);
}

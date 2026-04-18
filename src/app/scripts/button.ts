"use client";

import { config } from "../config";

type Attribute = [string, number];
const NumberAttributes: Record<string, Attribute> = {
  CUBE: ["CUBE", 990_100],
  EVEN: ["EVEN", 200],
  ODD: ["ODD", 200],
  SQUARE: ["SQUARE", 99_901],
  SINGLE: ["SINGLE DIGIT", 10_000_000],
  DOUBLE: ["TWO DIGITS", 1_111_112],
  TRIPLE: ["THREE DIGITS", 111_112],
  QUAD: ["FOUR DIGITS", 11_112],
  QUINT: ["FIVE DIGITS", 1_112],
  HEXA: ["SIX DIGITS", 112],
  HEPT: ["SEVEN DIGITS", 100_000_000],
  BLACKJACK: ["BLACKJACK", 2_522],
  PAIR: ["PAIR", 249],
  THREEK: ["THREE OF A KIND", 2_784],
  FOURK: ["FOUR OF A KIND", 37_024],
  FIVEK: ["YAHTZEE", 552_487],
  SIXK: ["SIX OF A KIND", 10_000_000],
  SEVENK: ["SEVEN OF A KIND", 0], // impossible on 0-1_000_000
  ASC2: ["2 ASC", 272],
  ASC3: ["3 ASC", 3_467],
  ASC4: ["4 ASC", 531_92],
  ASC5: ["5 ASC", 952_381],
  ASC6: ["6 ASC", 25_000_000],
  ASC7: ["7 ASC", 0], // impossible on 0-1_000_000
  DSC2: ["2 DSC", 266],
  DSC3: ["3 DSC", 3_352],
  DSC4: ["4 DSC", 50_506],
  DSC5: ["5 DSC", 869_566],
  DSC6: ["6 DSC", 20_000_000],
  DSC7: ["7 DSC", 0], // impossible on 0-1_000_000
  REFERENCE: ["REFERENCE", 2_025],
  BRAINROT: ["BRAINROT", 2_025],
  FUNNYNUMBER: ["FUNNY NUMBER", 2_025],
  BAKED: ["BAKED", 25_007],
  DEVIL: ["DEVIL", 27_028],
  BOOB: ["BOOB", 333_334],
  BOOBS: ["BOOBS", 5_000_000],
};

// EP = 100_000_000/(amount of numbers with that property)
function _calculateEP(): void {
  const number: RandomNumber = new RandomNumber();
  for (let j = 0; j < Object.keys(NumberAttributes).length; j++) {
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

class RandomNumber {
  public attributes: Array<Attribute>;

  private _value: number;
  private _digits: number;
  private _strvalue: string;

  // i am cooking
  private attributeChecks: Array<() => void> = [
    // check if this.value is even or odd
    () => {
      if (this.value % 2) {
        this.addAttribute(NumberAttributes.ODD);
      } else {
        this.addAttribute(NumberAttributes.EVEN);
      }
    },

    // check if this.value is a square
    () => {
      if (
        Math.floor(Math.sqrt(this.value)) === Math.ceil(Math.sqrt(this.value))
      ) {
        this.addAttribute(NumberAttributes.SQUARE);
      }
    },

    // check if this.value is a cube
    () => {
      if (
        Math.floor(Math.cbrt(this.value)) === Math.ceil(Math.cbrt(this.value))
      ) {
        this.addAttribute(NumberAttributes.CUBE);
      }
    },

    // check the amount of digits
    () => {
      switch (this._digits) {
        case 1:
          this.addAttribute(NumberAttributes.SINGLE);
          break;
        case 2:
          this.addAttribute(NumberAttributes.DOUBLE);
          break;
        case 3:
          this.addAttribute(NumberAttributes.TRIPLE);
          break;
        case 4:
          this.addAttribute(NumberAttributes.QUAD);
          break;
        case 5:
          this.addAttribute(NumberAttributes.QUINT);
          break;
        case 6:
          this.addAttribute(NumberAttributes.HEXA);
          break;
        case 7:
          this.addAttribute(NumberAttributes.HEPT);
          break;
      }
    },

    // check for ascending and descending subnumbers
    () => {
      let ascCount: number = 0;
      let dscCount: number = 0;
      for (let i = 1; i < this._strvalue.length; i++) {
        if (
          parseInt(this._strvalue[i], 10) - 1 ===
          parseInt(this._strvalue[i - 1], 10)
        ) {
          ascCount++;
          // move this into the else block if you don't want to get multiple ASC from one sequence
          switch (ascCount) {
            case 1:
              this.addAttribute(NumberAttributes.ASC2);
              break;
            case 2:
              this.addAttribute(NumberAttributes.ASC3);
              break;
            case 3:
              this.addAttribute(NumberAttributes.ASC4);
              break;
            case 4:
              this.addAttribute(NumberAttributes.ASC5);
              break;
            case 5:
              this.addAttribute(NumberAttributes.ASC6);
              break;
            case 6:
              this.addAttribute(NumberAttributes.ASC7);
              break;
          }
        } else {
          ascCount = 0;
        }

        if (
          parseInt(this._strvalue[i], 10) + 1 ===
          parseInt(this._strvalue[i - 1], 10)
        ) {
          dscCount++;
          // move this into the else block if you don't want to get multiple ASC from one sequence
          switch (dscCount) {
            case 1:
              this.addAttribute(NumberAttributes.DSC2);
              break;
            case 2:
              this.addAttribute(NumberAttributes.DSC3);
              break;
            case 3:
              this.addAttribute(NumberAttributes.DSC4);
              break;
            case 4:
              this.addAttribute(NumberAttributes.DSC5);
              break;
            case 5:
              this.addAttribute(NumberAttributes.DSC6);
              break;
            case 6:
              this.addAttribute(NumberAttributes.DSC7);
              break;
          }
        } else {
          dscCount = 0;
        }
      }
    },

    // check if the sum of the numbers is equal to 21
    () => {
      let sum: number = 0;
      for (let i = 0; i < this._strvalue.length; i++) {
        sum += parseInt(this._strvalue[i], 10);
      }
      if (sum === 21) {
        this.addAttribute(NumberAttributes.BLACKJACK);
      }
    },

    // check for consecutive numbers
    () => {
      for (let i = 1; i < 7; i++) {
        //only consecutive
        if (this.testForMatch(`(.)(\\1{${i},})`)) {
          this.addAttribute(
            [
              NumberAttributes.PAIR,
              NumberAttributes.THREEK,
              NumberAttributes.FOURK,
              NumberAttributes.FIVEK,
              NumberAttributes.SIXK,
              NumberAttributes.SEVENK,
            ][i - 1],
          );
        }
      }
    },

    // check for funny numbers
    () => {
      if (this.testForMatch("43")) {
        this.addAttribute(NumberAttributes.REFERENCE);
      }
      if (this.testForMatch("67")) {
        this.addAttribute(NumberAttributes.BRAINROT);
      }
      if (this.testForMatch("69")) {
        this.addAttribute(NumberAttributes.FUNNYNUMBER);
      }
      if (this.testForMatch("420")) {
        this.addAttribute(NumberAttributes.BAKED);
      }
      if (this.testForMatch("666")) {
        this.addAttribute(NumberAttributes.DEVIL);
      }
      if (this.testForMatch("8008")) {
        this.addAttribute(NumberAttributes.BOOB);
      }
      if (this.testForMatch("80085")) {
        this.addAttribute(NumberAttributes.BOOBS);
      }
    },
  ];

  constructor() {
    this._value = Math.round(Math.random() * 1000000);
    this._strvalue = this._value.toString();
    this._digits = this._strvalue.length;

    this.attributes = [];

    this.checkForAttributes();
  }

  private checkForAttributes(): void {
    for (const attributeCheck of this.attributeChecks) attributeCheck();
  }

  private addAttribute(attr: Attribute): void {
    if (!this.attributes.includes(attr)) {
      this.attributes.push(attr);
    }
  }

  private testForMatch(pattern: string | RegExp): boolean {
    return new RegExp(pattern).test(this._strvalue);
  }

  public getEP(): number {
    let EP: number = 0;
    for (const attr of this.attributes) {
      EP += attr[1];
    }
    return EP;
  }

  public getAttrNames(): Array<string> {
    const attrNames: Array<string> = [];
    for (const attr of this.attributes) {
      attrNames.push(attr[0]);
    }
    return attrNames;
  }

  public getAttrNamesAsFormattedString(): string {
    let attrsAsString: string = "";
    for (const attr of this.attributes) {
      attrsAsString += `${attr[0]}, `;
    }

    // removes the trailing comma
    attrsAsString = attrsAsString.slice(0, -2);

    return attrsAsString;
  }

  get value(): number {
    return this._value;
  }

  set value(x: number) {
    this._value = x;
    this._strvalue = this._value.toString();
    this._digits = this._strvalue.length;

    this.attributes = [];

    this.checkForAttributes();
  }

  get length(): number {
    return this._digits;
  }

  get strvalue(): string {
    return this._strvalue;
  }
}

export default function roll() {
  const numberDisplay = document.getElementById("NumberDisplay") as HTMLElement;
  // biome-ignore format: Would make the code ugly if it was formatted
  const attributeDisplay = document.getElementById("AttributeDisplay") as HTMLElement;
  const epDisplay = document.getElementById("EPDisplay") as HTMLElement;
  const rollButton = document.getElementById("RollButton") as HTMLButtonElement;

  const number: RandomNumber = new RandomNumber();

  console.log(number.value, number.getAttrNames(), number.getEP());

  // code button roll button code roll and scale now though its also something else.
  // this just makes roll button roll
  rollButton.style.width = "6rem"; // squishes button
  numberDisplay.innerHTML = "?".repeat(number.length);
  (epDisplay.parentElement as HTMLElement).style.opacity = "0";
  rollButton.disabled = true;

  new Promise<void>((resolve) => {
    for (let i = 0; i < number.length; i++) {
      setTimeout(
        () => {
          numberDisplay.innerText =
            numberDisplay.innerText.substring(0, i) +
            number.strvalue[i] +
            numberDisplay.innerText.substring(i + 1);
          if (i === number.length - 1) {
            resolve();
          }
        },
        300 * (i + 1),
      );
    }
  });

  new Promise<void>((resolve) => {
    setTimeout(() => {
      // rotates button 4x
      rollButton.style.transitionDuration = "1600ms";
      rollButton.style.rotate = "1440deg";

      setTimeout(() => {
        // instantly changes rotation back to default
        rollButton.style.transitionDuration = "0ms";
        rollButton.style.rotate = "";

        setTimeout(() => {
          // sets transition duration baack to default after changing rotation
          rollButton.style.transitionDuration = "";
          resolve();
        }, 10);
      }, 1600);
    }, 400);
  }).then(() => {
    // makes button unsquished
    rollButton.style.width = "";

    numberDisplay.innerHTML = number.value as unknown as string;
    attributeDisplay.innerHTML = number.getAttrNamesAsFormattedString();
    epDisplay.innerHTML = number.getEP() as unknown as string;
    (epDisplay.parentElement as HTMLElement).style.opacity = "100%";

    rollButton.disabled = false;
  });

  if (config.development.enableCalculateEP) _calculateEP();
}

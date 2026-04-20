"use client";

type Attribute = [string, number];
export const NumberAttributes: Record<string, Attribute> = {
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
  BROTHER: ["BIG BROTHER", 333_334],
  YEAR: ["YEAR", 25_007],
  L33T: ["L33T", 333_334],
  SEMICLEAN: ["SEMI-CLEAN", 1_000],
  DECADE: ["DECADE", 1_000],
  CENTURY: ["CENTURY", 10_000],
  MILLENNIUM: ["MILLENNIUM", 100_000],
  SEMIEPOCH: ["SEMIEPOCH", 1_000_000],
  MOUNTAIN: ["MOUNTAIN", 3_922],
  ASCENDING: ["ASCENDING", 214_593],
  DESCENDING: ["DESCENDING", 118_064],
  NC2: ["PAIR (NC)", 139],
  NC3: ["THREE OF A KIND (NC)", 725],
  NC4: ["FOUR OF A KIND (NC)", 8_812],
  NC5: ["FIVE OF A KIND (NC)", 202_021],
  NC6: ["SIX OF A KIND (NC)", 10_000_000],
  NC7: ["SEVEN OF A KIND (NC)", 0], // impossible on 0-1_000_000
  V0: ["VOID 0", 168],
  V1: ["VOID 1", 249],
  V2: ["VOID 2", 1_278],
  V3: ["VOID 3", 12_427],
  V4: ["VOID 4", 235_850],
  V5: ["VOID 5", 10_000_000],
  V6: ["VOID 6", 100_000_000],
  HYDROGEN: ["HYDROGEN (1)", 283],
  HELIUM: ["HELIUM (2)", 283],
  LITHIUM: ["LITHIUM (3)", 283],
  BERYLLIUM: ["BERYLLIUM (4)", 283],
  BORON: ["BORON (5)", 283],
  CARBON: ["CARBON (6)", 283],
  NITROGEN: ["NITROGEN (7)", 283],
  OXYGEN: ["OXYGEN (8)", 283],
  FLOURINE: ["FLOURINE (9)", 283],
};

export class RandomNumber {
  public attributes: Array<Attribute>;

  private _value: number;
  private _digits: number;
  private _strvalue: string;

  // i am cooking
  private attributeChecks: (() => void)[] = [
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
        this.testForAttribute(
          `(.)(\\1{${i},})`,
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
    },

    // working with counts of digits
    () => {
      const digitCount: Record<string, number> = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
      };
      for (const letter of this._strvalue) {
        digitCount[letter] += 1;
      }

      // amounts of each number (NC is noncontinuous)
      for (const key of Object.keys(digitCount)) {
        switch (digitCount[key]) {
          case 2:
            this.addAttribute(NumberAttributes.NC2);
            break;
          case 3:
            this.addAttribute(NumberAttributes.NC3);
            break;
          case 4:
            this.addAttribute(NumberAttributes.NC4);
            break;
          case 5:
            this.addAttribute(NumberAttributes.NC5);
            break;
          case 6:
            this.addAttribute(NumberAttributes.NC6);
            break;
          case 7:
            this.addAttribute(NumberAttributes.NC7);
            break;
        }
      }

      // zero count (but better)
      this.addAttribute(NumberAttributes[`V${digitCount["0"]}`]);

      /*
      // zero count
      switch (digitCount["0"]) {
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: falls through
        case 6:
          this.addAttribute(NumberAttributes.V6);
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: falls through
        case 5:
          this.addAttribute(NumberAttributes.V5);
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: falls through
        case 4:
          this.addAttribute(NumberAttributes.V4);
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: falls through
        case 3:
          this.addAttribute(NumberAttributes.V3);
        // biome-ignore lint/suspicious/noFallthroughSwitchClause: falls through
        case 2:
          this.addAttribute(NumberAttributes.V2);
        case 1:
          this.addAttribute(NumberAttributes.V1);
          break;
        case 0:
          this.addAttribute(NumberAttributes.V0);
          break;
      }
      */

      if (digitCount["1"] === 1) this.addAttribute(NumberAttributes.HYDROGEN);
      if (digitCount["2"] === 1) this.addAttribute(NumberAttributes.HELIUM);
      if (digitCount["3"] === 1) this.addAttribute(NumberAttributes.LITHIUM);
      if (digitCount["4"] === 1) this.addAttribute(NumberAttributes.BERYLLIUM);
      if (digitCount["5"] === 1) this.addAttribute(NumberAttributes.BORON);
      if (digitCount["6"] === 1) this.addAttribute(NumberAttributes.CARBON);
      if (digitCount["7"] === 1) this.addAttribute(NumberAttributes.NITROGEN);
      if (digitCount["8"] === 1) this.addAttribute(NumberAttributes.OXYGEN);
      if (digitCount["9"] === 1) this.addAttribute(NumberAttributes.FLOURINE);
    },

    // check for funny numbers
    () => {
      this.testForAttribute("43", NumberAttributes.REFERENCE);
      this.testForAttribute("67", NumberAttributes.BRAINROT);
      this.testForAttribute("69", NumberAttributes.FUNNYNUMBER);
      this.testForAttribute("365", NumberAttributes.YEAR);
      this.testForAttribute("420", NumberAttributes.BAKED);
      this.testForAttribute("666", NumberAttributes.DEVIL);
      this.testForAttribute("1337", NumberAttributes.L33T);
      this.testForAttribute("1984", NumberAttributes.BROTHER);
      this.testForAttribute("8008", NumberAttributes.BOOB);
      this.testForAttribute("80085", NumberAttributes.BOOBS);
    },

    // check for number endings
    () => {
      this.testForAttribute("5$", NumberAttributes.SEMICLEAN);
      this.testForAttribute("0$", NumberAttributes.DECADE);
      this.testForAttribute("00$", NumberAttributes.CENTURY);
      this.testForAttribute("000$", NumberAttributes.MILLENNIUM);
      this.testForAttribute("5000$", NumberAttributes.SEMIEPOCH);
    },

    // check for digits being greater/less than the last
    () => {
      this.testForAttribute(
        "^0?1?2?3?4?5?6?7?8?9?9?8?7?6?5?4?3?2?1?0?$",
        NumberAttributes.MOUNTAIN,
      );
      this.testForAttribute(
        "^0?1?2?3?4?5?6?7?8?9?$",
        NumberAttributes.ASCENDING,
      );
      this.testForAttribute(
        "^9?8?7?6?5?4?3?2?1?0?$",
        NumberAttributes.DESCENDING,
      );
    },
  ];

  constructor(number: number = -1) {
    if (number === -1) {
      this._value = Math.round(Math.random() * 1000000);
    } else {
      this._value = number;
    }
    this._strvalue = this._value.toString();
    this._digits = this._strvalue.length;

    this.attributes = [];

    this.checkForAttributes();
  }

  private checkForAttributes(): void {
    for (const attributeCheck of this.attributeChecks) attributeCheck();
  }

  private addAttribute(attr: Attribute): void {
    if (!this.attributes.includes(attr)) this.attributes.push(attr);
  }

  /** Compares this._strvalue to a regex expression and adds an attribute if it returns true. */
  private testForAttribute(
    pattern: string | RegExp,
    attribute: Attribute,
  ): void {
    if (new RegExp(pattern).test(this._strvalue)) this.addAttribute(attribute);
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

export default function roll(devNumber: number = -1) {
  // biome-ignore format: Would make the code ugly if it was formatted
  const numberDisplay = document.getElementById("NumberDisplay") as HTMLDivElement;
  // biome-ignore format: Would make the code ugly if it was formatted
  const attributeDisplay = document.getElementById("AttributeDisplay") as HTMLDivElement;
  const epDisplay = document.getElementById("EPDisplay") as HTMLSpanElement;
  const epDisplayParent = epDisplay.parentElement as HTMLDivElement;
  const rollButton = document.getElementById("RollButton") as HTMLButtonElement;

  let number: RandomNumber;

  if (devNumber === -1) {
    number = new RandomNumber();
  } else {
    number = new RandomNumber(devNumber);
  }

  console.log(number.value, number.attributes, number.getEP());

  // code button roll button code roll and scale now though its also something else.
  // this just makes roll button roll
  rollButton.style.width = "6rem"; // squishes button
  numberDisplay.innerHTML = "?".repeat(number.length);
  epDisplayParent.style.opacity = "0";
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
        }, 40);
      }, 1600);
    }, 400);
  }).then(() => {
    // makes button unsquished
    rollButton.style.width = "";

    numberDisplay.innerHTML = number.value as unknown as string;
    attributeDisplay.innerHTML = number.getAttrNamesAsFormattedString();
    epDisplay.innerHTML = number.getEP() as unknown as string;
    epDisplayParent.style.opacity = "100%";

    rollButton.disabled = false;
  });
}

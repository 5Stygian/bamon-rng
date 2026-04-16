"use client";

type Attribute = [string, number];

// EP = 100_000_000/(amount of numbers with that property)
function _calculateEP(): void {
  const number: RandomNumber = new RandomNumber();
  for (let j = 0; j < Object.keys(NumberAttributes).length; j++) {
    let jkey: string = Object.keys(NumberAttributes)[j];
    let quantity: number = 0;
    for (let i = 0; i <= 1_000_000; i++) {
      number.value = i;
      if (number.getAttrNames().includes(NumberAttributes[jkey][0])) {
        quantity += 1;
      }
    }
    console.log(NumberAttributes[jkey][0], Math.ceil(100_000_000/quantity));
  }
}

const NumberAttributes: Record<string, Attribute> = {
  CUBE: ["CUBE", 990100],
  EVEN: ["EVEN", 200],
  ODD: ["ODD", 200],
  SQUARE: ["SQUARE", 99901],
  SINGLE: ['SINGLE DIGIT', 10_000_000],
  DOUBLE: ['two digit', 1_111_112],
  TRIPLE: ['three digit', 111_112],
  QUAD: ['four digit', 11_112],
  QUINT: ['five digit', 1_112],
  HEXA: ['six digit', 112],
  HEPT: ['seven digit', 100_000_000],
  BLACKJACK: ['blackjack', 2_522],
  PAIR: ['pair', 249],
  THREEK: ['three of a kind', 2_784],
  FOURK: ['four of a kind', 37_024],
  FIVEK: ['yahtzee', 552_487],
  SIXK: ['six of a kind', 10_000_000],
  SEVENK: ['seven of a kind', 0], // impossible on 0-1_000_000
  ASC2: ["2 ASCENDING", 300],
  ASC3: ["3 ASC", 500],
  ASC4: ["4 ASC", 700],
  ASC5: ["5 ASC", 1000],
  ASC6: ["6 ASC", 1500],
  ASC7: ["7 ASC", 2500],
};

class RandomNumber {
  public attributes: Array<Attribute>;
  private _value: number;
  private _digits: number;
  private _strvalue: string;

  constructor() {
    this._value = Math.round(Math.random() * 1000000);
    this._strvalue = this._value.toString();
    this._digits = this._strvalue.length;

    this.attributes = [];

    this.checkForAttributes();
  }

  private checkForAttributes(): void {
    // check if this.value is even or odd
    if (this.value % 2) {
      this.addAttribute(NumberAttributes.ODD);
    } else {
      this.addAttribute(NumberAttributes.EVEN);
    }

    // check if this.value is a square
    if (
      Math.floor(Math.sqrt(this.value)) === Math.ceil(Math.sqrt(this.value))
    ) {
      this.addAttribute(NumberAttributes.SQUARE);
    }

    // check if this.value is a cube
    if (
      Math.floor(Math.cbrt(this.value)) === Math.ceil(Math.cbrt(this.value))
    ) {
      this.addAttribute(NumberAttributes.CUBE);
    }

    // check the amount of digits
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

    let count = 0;
    let num = this._value.toString();
    for (let i = 1; i < num.length; i++) {
      if (parseInt(num[i], 10) - 1 === parseInt(num[i-1],10)) {
        count++;
        // move this into the else block if you don't want to get multiple ASC from one sequence
        switch (count) {
          case 0:
            break;
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
        count = 0;
      }
    }

    switch (count) {
      case 0:
        break;
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
    
    let sum: number = 0;
    for (let i = 0; i < this._value.toString().length; i++) {
      sum += parseInt(this._value.toString()[i], 10);
    }
    if (sum === 21) {
      this.addAttribute(NumberAttributes.BLACKJACK);
    }

    for (let i = 1; i < 7; i++) {
      //only consecutive
      if (new RegExp(`(.)(\\1{${i},})`).test(this._strvalue)) {
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

      // not working
      // if ((new RegExp('(?:(.).*?(\\1).*?){'+ i + ',}')).test(num.toString())) {
      //     badges.push(i.toString());
      // }
    }
  }

  private addAttribute(attr: Attribute): void {
    if (!this.attributes.includes(attr)) {
      this.attributes.push(attr);
    }
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
}

function roll() {

  const number: RandomNumber = new RandomNumber();
  number.value = 1234567;
  console.log(number.value, number.getAttrNames(), number.getEP());

  // for (let i of [1,10,100,1000,10000,100000,1000000]) {
  //   number.value = i;
  //   console.log(number.value, number.attributes);
  // }
}
roll();

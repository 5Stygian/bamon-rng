"use client";

type Attribute = [string, number];


const NumberAttributes: Record<string, Attribute> = {
  CUBE: ["CUBE", 500],
  EVEN: ["EVEN", 200],
  ODD: ["ODD", 200],
  SQUARE: ["SQUARE", 300],
  SINGLE: ["SINGLE DIGIT", 2000],
  DOUBLE: ["TWO DIGIT", 1000],
  TRIPLE: ["THREE DIGIT", 1000],
  QUAD: ["FOUR DIGIT", 1000],
  QUINT: ["FIVE DIGIT", 500],
  HEXA: ["SIX DIGIT", 300],
  HEPT: ["SEVEN DIGIT", 1000],
  BLACKJACK: ["BLACKJACK", 400],
  PAIR: ["PAIR", 300],
  THREEK: ["THREE OF A KIND", 300],
  FOURK: ["FOUR OF A KIND", 300],
  FIVEK: ["YAHTZEE", 300],
  SIXK: ["SIX OF A KIND", 300],
  SEVENK: ["SEVEN OF A KIND", 300],
  ASCP: ["2 ACENDING", 300],
  ASCT: ["3 ASC", 500],
  ASCFO: ["4 ASC", 700],
  ASCFI: ["5 ASC", 1000],
  ASCSI: ["6 ASC", 1500],
  ASCSE: ["7 ASC", 2500],
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
      if (num[i] - 1 == num[i-1]) {
        count++;
      }
    }

    switch (count) {
      case 0:
        break;
      case 1: 
        this.addAttribute(NumberAttributes.ASCP);
        break;
      case 2:
        this.addAttribute(NumberAttributes.ASCT);
        break;
      case 3:
        this.addAttribute(NumberAttributes.ASCFO);
        break;
      case 4:
        this.addAttribute(NumberAttributes.ASCFI);
        break;
      case 5:
        this.addAttribute(NumberAttributes.ASCSI);
        break;
      case 6:
        this.addAttribute(NumberAttributes.ASCSE);
        break;
    
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
    this.attributes.push(attr);
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

export default function roll() {
  const numberDisplay = document.getElementById("NumberDisplay");
  const attributeDisplay = document.getElementById("AttributeDisplay");
  const epDisplay = document.getElementById("EPDisplay");

  const number: RandomNumber = new RandomNumber();

  numberDisplay!.innerHTML = number.value as any;
  attributeDisplay!.innerHTML = number.getAttrNamesAsFormattedString();
  epDisplay!.innerHTML = number.getEP() as any;

  console.log(number.value, number.getAttrNames(), number.getEP());

  // for (let i of [1,10,100,1000,10000,100000,1000000]) {
  //   number.value = i;
  //   console.log(number.value, number.attributes);
  // }
}

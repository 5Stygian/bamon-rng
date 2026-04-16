"use client";

const NumberAttributes: Record<string, [string,number]> = {
  "CUBE": ["CUBE", 500],
  "EVEN": ["EVEN", 200],
  "ODD": ["ODD", 200],
  "SQUARE": ["SQUARE", 300],
  "SINGLE": ['SINGLE DIGIT', 2000],
  "DOUBLE": ['two digit', 1000],
  "TRIPLE": ['three digit', 1000],
  "QUAD": ['four digit', 1000],
  "QUINT": ['five digit', 500],
  "HEXA": ['six digit', 300],
  "HEPT": ['seven digit', 1000],
  "BLACKJACK": ['blackjack', 400],
  "PAIR": ['pair', 300],
  "THREEK": ['three of a kind', 300],
  "FOURK": ['four of a kind', 300],
  "FIVEK": ['yahtzee', 300],
  "SIXK": ['six of a kind', 300],
  "SEVENK": ['seven of a kind', 300]
}

class RandomNumber {
  public attributes: Array<[string, number]>;
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

  public checkForAttributes(): void {
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

    switch (this._digits) {
        case (1):
            this.addAttribute(NumberAttributes.SINGLE);
            break;
        case (2):
            this.addAttribute(NumberAttributes.DOUBLE);
            break;
        case (3):
            this.addAttribute(NumberAttributes.TRIPLE);
            break;
        case (4):
            this.addAttribute(NumberAttributes.QUAD);
            break;
        case (5):
            this.addAttribute(NumberAttributes.QUINT);
            break;
        case (6):
            this.addAttribute(NumberAttributes.HEXA);
            break;
        case (7):
            this.addAttribute(NumberAttributes.HEPT);
            break;
    }

    let sum: number = 0
    for (let i = 0; i < this._value.toString().length; i++) {
        sum += parseInt(this._value.toString()[i]);
    } 
    if (sum == 21) {
        this.addAttribute(NumberAttributes.BLACKJACK);
    }

    for (let i = 1; i < 7; i++) {
            //only consecutive
        if ((new RegExp('(.)(\\1{'+ i + ',})')).test(this._strvalue)) {
            this.addAttribute([NumberAttributes.PAIR,NumberAttributes.THREEK,NumberAttributes.FOURK, NumberAttributes.FIVEK, NumberAttributes.SIXK, NumberAttributes.SEVENK][i - 1]);
        }
        
        // not working
        // if ((new RegExp('(?:(.).*?(\\1).*?){'+ i + ',}')).test(num.toString())) {
        //     badges.push(i.toString());
        // }
    }

  }

  private addAttribute(attr: [string, number]): void {
    this.attributes.push(attr);
  }

  public getEP(): number {
    let EP: number = 0;
    for (let i of this.attributes) {
      EP += i[1];
    }
    return EP;
  }

  public getAttrNames(): Array<string> {
    let attrNames: Array<string> = [];
    for (let i of this.attributes) {
      attrNames.push(i[0]);
    }
    return attrNames;
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
    const number: RandomNumber = new RandomNumber();

    console.log(number.value, number.getAttrNames(), number.getEP());

    // for (let i of [1,10,100,1000,10000,100000,1000000]) {
    //   number.value = i;
    //   console.log(number.value, number.attributes);
    // }
}
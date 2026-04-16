"use client";

export default function roll() {
  const badges: string[] = [];
  const num: number = Math.floor(Math.random() * 1000000);
  console.log(num);

  if (num % 2) {
    badges.push("odd");
  } else {
    badges.push("even");
  }

  switch (num.toString().length) {
    case 1:
      badges.push("SINGLE DIGIT");
      break;
    case 2:
      badges.push("two digit");
      break;
    case 3:
      badges.push("three digit");
      break;
    case 4:
      badges.push("four digit");
      break;
    case 5:
      badges.push("five digit");
      break;
    case 6:
      badges.push("six digit");
      break;
    case 7:
      badges.push("seven digit");
      break;
  }
  let sum: number = 0;
  for (let i = 0; i < num.toString().length; i++) {
    sum += parseInt(num.toString()[i], 10);
  }
  if (sum === 21) {
    badges.push("blackjack");
  }

  for (let i = 1; i < 7; i++) {
    //only consecutive
    if (new RegExp(`(.)(\\1{${i},})`).test(num.toString())) {
      badges.push(
        [
          "pair",
          "three of a kind",
          "four of a kind",
          "yahtzee",
          "six of a kind",
          "seven of a kind",
        ][i - 1],
      );
    }

    // not working
    // if ((new RegExp('(?:(.).*?(\\1).*?){'+ i + ',}')).test(num.toString())) {
    //     badges.push(i.toString());
    // }
  }

  console.log(badges);
}

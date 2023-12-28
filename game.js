const { program } = require("commander");
const fs = require("fs");
require("colors");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
program.option(
  "-f",
  "--file <type>",
  "file for saving results",
  "game-result_default"
);
program.parse(process.argv);
rl.on("line", (txt) => {
  console.log(txt);

  process.exit();
});

let counter = 0;

let inputValue = Math.ceil(Math.random() * 10);

const resultFile = program.opts().file;

/** Main game process
 * @argument {number}
 * @returns {resultFile}
 * @category Methods
 */

const game = () => {
  rl.question("Enter number from 1 to 10\n", (value) => {
    const num = +value;
    counter += 1;

    if (num !== inputValue) {
      console.log("Try again".red);

      return game();
    // } else if (Number.isNaN === true) {
    //   console.log("Number required");
    //   return game();
    }
    const sucsess = `You guessed the number in ${counter} step(s)`;
    console.log(sucsess.green);

    rl.close();
  });
};
game();

// const isValid = (num) => {
//     if(!Number.isNaN(num) && num )
// }

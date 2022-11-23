const { Block, Blockchain } = require("./blockchain.js");
// const { BlockFork, BlockchainFork } = require("./fork.js");

const Token = new Blockchain();
Token.addBlock(
  new Block(Date.now().toString(), { from: "Alice", to: "Bob", amount: 100 })
);
Token.addBlock(
  new Block(Date.now().toString(), { from: "Bob", to: "Alice", amount: 200 })
);

console.log(Token.chain); // Prints out the updated chain

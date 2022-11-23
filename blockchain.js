const cryptoJS = require("crypto-js"); //cryptoJS library that allows us to create hashes

class Block {
  #difficuty = 3;
  constructor(timestamp = "", data = []) {
    this.index = 0; //number of blocks in the chain
    this.timestamp = timestamp; //time of creation
    this.nounce = 0; //number of times the hash has been recalculated
    this.previousHash = "0".repeat(64); //hash of the previous block
    this.data = data; //data stored in the block
    this.hash = this.mine(); //hash of the block
  }

  getHash() {
    return cryptoJS
      .SHA256(
        this.nounce +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data)
      )
      .toString(cryptoJS.enc.Hex); //ajouter enc.hex
  }

  mine() {
    while (
      this.getHash().substring(0, this.#difficuty) !==
      "0".repeat(this.#difficuty)
    ) {
      this.nounce++;
      // console.log(this.nounce);
    }
    console.log("Block mined ! 🎉", this.getHash());
    return this.getHash();
  }
}

class Blockchain {
  constructor() {
    //creation genesis block
    const genesisData = "This is the genesis block 💫";
    const genesisBlock = new Block(Date.now().toString(), genesisData);
    this.chain = [genesisBlock];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    // index
    block.index = this.getLastBlock().index + 1; // Since we are adding a new block, prevHash will be the hash of the old latest block
    block.previousHash = this.getLastBlock().hash; // Since now previousHash has a value, we must reset the block's hash
    this.chain.push(Object.freeze(block)); // Object.freeze ensures immutability in our code
    console.log("Block 🧱 successfully added to chain ⛓\n\n", block);
  }

  isValid(blockchain) {
    for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain[i];
      const previousBlock = blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.getHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Block, Blockchain };

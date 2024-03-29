//   Source: https://medium.com/coinmonks/understanding-and-building-your-own-tiny-blockchain-in-javascript-a16f2137cfec

sha256 = require('js-sha256')

class Block {
  constructor(index, timestamp, data, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.thisHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    );
  }
}

createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');

nextBlock = (lastBlock, data) =>
  new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);

createBlockchain = num => {
  blockchain = [createGenesisBlock()];
  let previousBlock = blockchain[0];

  for (let i = 1; i < num; i += 1) {
    blockToAdd = nextBlock(previousBlock, `This is block #${i}`);
    blockchain.push(blockToAdd);
    previousBlock = blockToAdd;
  }
  console.log(blockchain);
};

lengthToCreate = 20;
createBlockchain(lengthToCreate);
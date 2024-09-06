## Usage

1. Clone the hardhat-fund-me repository:

```sh
git clone https://github.com/Trigii/hardhat-fund-me.git
```

2. Install the dependencies:

```
yarn
```

3. Deploy the smart contract on a hardhat/localhost node:

```sh
yarn hardhat node
```

4. Modify the contract address on the `index.js` file:

```javascript
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // here we paste the address of the deployed contract
```

5. Run the frontend and connect to metamask to execute a contract function

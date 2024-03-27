
const {Web3} = require("web3");
//const { ethers } = require("ethers");

const web3 = new Web3('http://localhost:8545');

// ABI та адреса контракту
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "candidateNames",
                    "type": "string[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidateList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                }
            ],
            "name": "totalVotesFor",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                }
            ],
            "name": "validCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                }
            ],
            "name": "voteForCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "votesReceived",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Адреса вашого контракту

// Підключення контракту
const myContract = new web3.eth.Contract(contractABI, contractAddress);

// Функція для оновлення результатів
async function updateResults() {
  try {
    const candidate1Votes = await myContract.methods.totalVotesFor('candidate1').call();
    const candidate2Votes = await myContract.methods.totalVotesFor('candidate2').call();
    document.getElementById('candidate1-votes').innerText = candidate1Votes;
    document.getElementById('candidate2-votes').innerText = candidate2Votes;
  } catch (error) {
    console.error('Failed to update results:', error);
  }
}

// Додавання події для кнопки "Проголосувати"
document.getElementById('vote-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const candidate = document.getElementById('candidate').value;

  // Відправка транзакції
  await myContract.methods.voteForCandidate(candidate).send({
    from: '0xC03dCFcA1B0dA68f0cBFD4Fe2C2E8462FfAD47D1', // Адреса вашого гаманця
    gas: 1000000,
  });

  // Оновлення результатів
  updateResults();
});

// Оновлення результатів при завантаженні сторінки
updateResults();

import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import { ethers } from "ethers";

function App() {
  const [candidate1Votes, setCandidate1Votes] = useState(0);
  const [candidate2Votes, setCandidate2Votes] = useState(0);

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
  const web3 = new Web3('http://localhost:8545');
  const myContract = new web3.eth.Contract(contractABI, contractAddress);
  async function updateResults() {
    try {
      const candidate1Votes = await myContract.methods.totalVotesFor('candidate1').call();
      const candidate2Votes = await myContract.methods.totalVotesFor('candidate2').call();
      setCandidate1Votes(candidate1Votes);
      setCandidate2Votes(candidate2Votes);
    } catch (error) {
      console.error('Failed to update results:', error);
    }
  }
  useEffect(() => {
        updateResults();
  }, []);

  // Функція для відправки голосу
  async function handleVote(event) {
    event.preventDefault();
    const candidate = event.target.elements.candidate.value;

    // Відправка транзакції
    await myContract.methods.voteForCandidate(candidate).send({
      from: '0xC03dCFcA1B0dA68f0cBFD4Fe2C2E8462FfAD47D1', // Адреса вашого гаманця
      gas: 1000000,
    });

    // Оновлення результатів
    updateResults();
  }

  return (
    <div className="container">
      <h1>Система голосування</h1>
      <form onSubmit={handleVote}>
        <label htmlFor="candidate">Виберіть кандидата:</label>
        <select id="candidate" name="candidate">
          <option value="candidate1">Кандидат 1</option>
          <option value="candidate2">Кандидат 2</option>
        </select>
        <button type="submit">Проголосувати</button>
      </form>
      <div id="results">
        <h2>Результати голосування</h2>
        <ul>
          <li>Кандидат 1: <span className="candidate1-votes">{candidate1Votes}</span> голосів</li>
          <li>Кандидат 2: <span className="candidate2-votes">{candidate2Votes}</span> голосів</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

0x7d1Db24133dd83973Ecfe5959570eB45cBaddD6E



pragma solidity ^0.4.17;

contract ElectionFactory {
    address[] public deployedElection;
    
    function createElection(string constituencyName) public {
        address newElection = new Election(constituencyName);
        deployedElection.push(newElection);
    }
    
    function getDeployedElection() public view returns(address[]) {
        return deployedElection;
    }
}

contract Election {
    struct Candidate {
        string name;
        string partyName;
        string bio;
        uint votes;
        address id;
    }
    string public constituency;
    Candidate[] public candidates;
    mapping(address => bool) hasVoted;
    mapping(address => bool) hasContested;
    
    constructor(string constituencyName) public {
        constituency = constituencyName;
    }
    
    function contestElection(string name, string partyName, string bio) public {
        require(!hasContested[msg.sender]);
        Candidate memory newCandidate = Candidate({
            name: name,
            partyName: partyName,
            bio: bio,
            votes: 0,
            id: msg.sender
        });
        candidates.push(newCandidate);
        hasContested[msg.sender] = true;
    }
    
    function castVote(uint index) public {
        Candidate storage candidate = candidates[index];
        require(!hasVoted[msg.sender]);
        hasVoted[msg.sender] = true;
        candidate.votes++;
    }
    
    function declareResult() public view returns(address) {
        Candidate storage max = candidates[0];
        for(uint i=0; i<candidates.length; i++) {
            if(max.votes < candidates[i].votes) {
                max = candidates[i];
            }
        }
        return max.id;
    }
    
    function getName() public view returns(string) {
        address candidateAdd = declareResult();
        for(uint i=0; i<candidates.length; i++) {
            if(candidates[i].id == candidateAdd){
                return candidates[i].name;
            }
        }
    }
}
------------------
const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const electionPath = path.resolve(__dirname, 'contracts', 'Election.sol')
const source = fs.readFileSync(electionPath, 'utf-8')
const output = solc.compile(source, 1).contracts

console.log(output)


fs.ensureDirSync(buildPath)

for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    )
}
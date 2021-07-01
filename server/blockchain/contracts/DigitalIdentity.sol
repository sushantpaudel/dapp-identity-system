// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DigitalIdentity {
  string public name = 'Digital Identity Blockchain';
  address public owner = msg.sender;
  mapping(address => Identity) public identities;

  struct Identity {
    address did;
    string contentAddress;
  }

  modifier onlyOwner {
    require(msg.sender == owner, 'Only owner can perform this action');
    _;
  }

  function createIdentity(string memory _contentAddress) public {
    require(bytes(_contentAddress).length > 0, 'Invalid address');
    identities[msg.sender] = Identity(msg.sender, _contentAddress);
  }
}

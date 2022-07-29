//  SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract TheNVT{
    mapping(address => uint) public balances;

    address public miner;

    uint256 public totTokens;

    event Mine(address _sender, address _reciever, uint _amount);

    event Transferred(address _sender,  address _reciever, uint _amount);

    constructor(){
        miner = msg.sender;
    }

    function mineNewTokens(address _reciever, uint _amount) public {
        require(msg.sender==miner, "Invalid Operation");

        balances[_reciever] += _amount;

        totTokens+=_amount;

        emit Mine(msg.sender, _reciever, _amount);

    }

    function transferTokens(address _sender, address _reciever, uint _amount) public {
        require(balances[_sender] >= _amount, "Insufficient Balance");

        balances[_sender] -= _amount;
        balances[_reciever] += _amount;

        emit Transferred(_sender, _reciever, _amount);

    }

}













// Custom token

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IDID.sol';

contract DID is IDID {
    mapping(string => User) private user;
    mapping(string => bool) private registeredUser;

    constructor(string memory _publicKey){
        user[_publicKey] = User('ivy','yellow_w@gmail.com');
    }

    function registerUser (string memory _publicKey ,User memory _data) external{
        require(!registeredUser[_publicKey]);
        User memory userObj;

        userObj.id = _data.id;
        userObj.email = _data.email;

        user[_publicKey] = userObj;
        registeredUser[_publicKey] = true;

    }

    function updateUser (string memory _publicKey, User memory _data) external{
        require(registeredUser[_publicKey]);
        User memory userObj;

        userObj.id = _data.id;
        userObj.email = _data.email;

        user[_publicKey] = userObj;
    }

    function deleteUser (string memory _publicKey) external{
        require(registeredUser[_publicKey]);

        delete user[_publicKey];
        registeredUser[_publicKey] = false;
    }
    
    function getUser (string memory _publicKey) view external returns(User memory){
        return user[_publicKey];
    }

    function isRegistered(string memory _publicKey) view public returns(bool){
        return registeredUser[_publicKey];
    }
}
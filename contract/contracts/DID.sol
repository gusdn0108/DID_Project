// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IDID.sol';

contract DID is IDID {
    mapping(string => User) private user;
    mapping(string => bool) private registeredUser;

    constructor(string memory _hashedId){
        user[_hashedId] = User('yellow_w@gmail.com','1234',false,false,false,false);
    }

    function registerUser (string memory _hashedId ,User memory _data) external{
        require(!registeredUser[_hashedId]);
        
        User memory userObj;

        userObj.email = _data.email;
        userObj.password = _data.password;
        userObj.A = _data.A;
        userObj.B = _data.B;
        userObj.C = _data.C;
        userObj.D = _data.D;

        user[_hashedId] = userObj;
        registeredUser[_hashedId] = true;

    }

    function updateUser (string memory _hashedId, User memory _data) external{
        require(registeredUser[_hashedId]);
        User memory userObj;

        userObj.email = _data.email;
        userObj.password = _data.password;
        userObj.A = _data.A;
        userObj.B = _data.B;
        userObj.C = _data.C;
        userObj.D = _data.D;

        user[_hashedId] = userObj;
    }

    function deleteUser (string memory _hashedId) external{
        require(registeredUser[_hashedId]);

        delete user[_hashedId];
        registeredUser[_hashedId] = false;
    }
    
    function getUser (string memory _hashedId) view external returns(User memory){
        return user[_hashedId];
    }

    function isRegistered(string memory _hashedId) view public returns(bool){
        return registeredUser[_hashedId];
    }
}
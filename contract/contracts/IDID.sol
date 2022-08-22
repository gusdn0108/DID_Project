// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IDID {
    
    struct User{
        string id;
        string email;
    }

    function registerUser (string memory _publicKey ,User memory _data) external;
    function updateUser (string memory _publicKey, User memory _data) external;
    function deleteUser (string memory _publicKey) external;
    function getUser (string memory _publicKey) view external returns(User memory);
    function isRegistered(string memory _publicKey) view external returns(bool);
}
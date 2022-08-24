// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IDID {
    
    struct User{
        string email;
        string password;
        string uuid;
        bool A;
        bool B;
        bool C;
        bool D;
    }

    function registerUser (string memory _hashedId ,User memory _data) external;
    function updateUser (string memory _hashedId, User memory _data) external;
    function deleteUser (string memory _hashedId) external;
    function getUser (string memory _hashedId) view external returns(User memory);
    function isRegistered(string memory _hashedId) view external returns(bool);
}
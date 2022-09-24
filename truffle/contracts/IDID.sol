// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IDID {
    struct User{
        string gender;
        string name;
        string age;
        string addr;
        string mobile;
        string email;
    }

    struct NeededUser {
        bool gender;
        bool name;
        bool age;
        bool addr;
        bool mobile;
        bool email;
    }

    function registerUser (string memory _hashedId ,User memory _data) external;
    function updatePassword (string memory _hashedId,string memory _hashedId_new)external;
    function updateUser (string memory _hashedId, User memory _data) external;
    function deleteUser (string memory _hashedId) external;
    function getUser (string memory _hashedId) view external returns(User memory);
    function getVP(string memory _identifier, NeededUser memory _shouldSend) view external returns(User memory);
    function isRegistered(string memory _hashedId) view external returns(bool);
}
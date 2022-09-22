// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./IDID.sol";

contract DID is IDID {
    mapping(string => User) private user;
    mapping(string => bool) private registeredUser;

    string gender;
    string name;
    uint8 age;
    string addr;
    string mobile;
    string email;

    function registerUser(string memory _hashedId, User memory _data) external {
        require(!isRegistered(_hashedId));

        User memory userObj;

        userObj.gender = _data.gender;
        userObj.name = _data.name;
        userObj.age = _data.age;
        userObj.addr = _data.addr;
        userObj.mobile = _data.mobile;
        userObj.email = _data.email;

        registeredUser[_hashedId] = true;
        user[_hashedId] = _data;
    }

    function updatePassword(
        string memory _hashedId,
        string memory _hashedId_new
    ) external {
        require(isRegistered(_hashedId));
        user[_hashedId_new] = user[_hashedId];
        registeredUser[_hashedId_new] = true;
        deleteUser(_hashedId);
    }

    function updateUser(string memory _hashedId, User memory _data) external {
        require(isRegistered(_hashedId));
        User memory userObj;

        userObj.gender = _data.gender;
        userObj.name = _data.name;
        userObj.age = _data.age;
        userObj.addr = _data.addr;
        userObj.mobile = _data.mobile;
        userObj.email = _data.email;

        user[_hashedId] = userObj;
    }

    function deleteUser(string memory _hashedId) public {
        require(isRegistered(_hashedId));

        delete user[_hashedId];
        registeredUser[_hashedId] = false;
    }

    function getUser(string memory _hashedId)
        public
        view
        override
        returns (User memory)
    {
        return user[_hashedId];
    }

    function getVP(string memory _identifier, NeededUser memory _shouldSend)
        external
        view
        returns (User memory)
    {
        require(isRegistered(_identifier));
        User memory userObj;
        User memory VP;
        userObj = getUser(_identifier);

        if (_shouldSend.addr) {
            VP.addr = userObj.addr;
        }
        if (_shouldSend.gender) {
            VP.gender = userObj.gender;
        }
        if (_shouldSend.name) {
            VP.name = userObj.name;
        }
        if (_shouldSend.age) {
            VP.age = userObj.age;
        }
        if (_shouldSend.mobile) {
            VP.mobile = userObj.mobile;
        }
        if (_shouldSend.email) {
            VP.email = userObj.email;
        }
        return VP;
    }

    function isRegistered(string memory _hashedId) public view returns (bool) {
        return registeredUser[_hashedId];
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CRUD {

    struct employee {
        string name;
        string email;
        uint age;
        address walletAddress;
    }

    employee[] public employees;
    uint public totalEmployees;

    constructor() {
        totalEmployees = 0;
    }

    function createEmployee(string memory _name, string memory _email, uint _age, address _walletAddress) public returns (uint){
        employee memory newEmployee = employee(_name, _email, _age, _walletAddress);
        employees.push(newEmployee);
        totalEmployees++;
        return totalEmployees;
    }

    function updateEmployee(string memory _name, string memory _email) external returns (bool) {
        for(uint i=0; i < totalEmployees; i++)
        {
            if(compareStrings(employees[i].email, _email))
            {
                employees[i].name = _name;
                return true;
            }
        }
        return false;
    } 

    function compareStrings(string memory a, string memory b) internal pure returns(bool) {
        // converting string into bytes, and comparing them as compare function does not work on strings in Solidity.
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
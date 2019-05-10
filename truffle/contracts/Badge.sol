pragma solidity ^0.5.0;

contract Transaction {
    address badgeAddr;
    string public data;

    constructor(string memory _data) public {
        badgeAddr = msg.sender;
        data = _data;
    }
}

contract Badge {
    address private owner;
    int8 public id;
    address[] public EntryAddresses;
    event TransactionAdded(string data);
    event BadgeCreated(int8 id);

    constructor(int8 _id) public {
        id = _id;
        owner = msg.sender;
        emit BadgeCreated(id);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can call this."
        );
        _;
    }

    function addTransaction(string memory data) public onlyOwner returns (address) {
        address transactionAddr = address(new Transaction(data));
        EntryAddresses.push(transactionAddr);
        emit TransactionAdded(data);

        return transactionAddr;
    }
}

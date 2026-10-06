pragma solidity ^0.8.20;

contract ComplianceRegistry {
    mapping(address => bool) public approvedUsers;

    event UserApproved(address indexed user);

    function approveUser(address user) external {
        approvedUsers[user] = true;
        emit UserApproved(user);
    }
}

pragma solidity ^0.8.20;

contract BondVaultContract {
    struct Bond {
        string name;
        string symbol;
        uint256 principal;
        uint256 couponRate;
        uint256 maturityDate;
    }

    mapping(bytes32 => Bond) public bonds;

    event BondIssued(bytes32 indexed id, string name, string symbol, uint256 principal);

    function issueBond(
        bytes32 id,
        string memory name,
        string memory symbol,
        uint256 principal,
        uint256 couponRate,
        uint256 maturityDate
    ) external {
        bonds[id] = Bond(name, symbol, principal, couponRate, maturityDate);
        emit BondIssued(id, name, symbol, principal);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;



contract GoldRushuZar {

  address public owner;

  uint256 currentLottery;

  uint256 LOTTERY_OPEN_TIME = 1 minutes;
    
  struct Lottery {
    uint256 id;
    uint[] winningNumbers;
    uint256 openedOn;
    address winner;
    bool hasWinner;
    bool isOpen;
    uint256 closesAt;
  }

  struct Entry {
    uint[] numbers;
    address player;
  }


  mapping(uint256 => Lottery) lotteries;
  mapping(uint256 => Entry) entries;

  constructor(address _owner) {
    owner = _owner;
  }

  event EnteredLottery(address _player, uint256 _timestamp, uint256 _lotteryId);
  event LotteryClosed(uint256 _lotteryId, uint256 _timestamp);
  event LotteryWinner(uint256 _lotteryId, address _winner, uint256 _timestamp);

  function enter(uint[]  calldata _numbers) public isValidEntry(_numbers) {
    // TODO: create new entry
    entries[currentLottery] = new Entry({
      numbers: _numbers,
      player: msg.sender
    });
  }

  function close() onlyOwner {
    // TODO: generate random numbers


    // TODO: check entries for winning numbers

    // TODO: create new lottery
    _createNewLottery();  
  }


  _createNewLottery() private {
    currentLottery++;

    Lottery memory lottery;

    lottery.closesAt = block.timestamp + LOTTERY_OPEN_TIME;
    lottery.isOpen = true;
    lottery.hasWinner = false;
    lottery.winner = address(this);
    lottery.openedOn = block.timestamp;
    lottery.id = currentLottery + 1;
  }
  


  modifier onlyOwner() {
    require(msg.sender == owner, "Permission denied");
    _;
  }

  modifier isValidEntry(uint[] _numbers) {
    require(_numbers.length == 6, "Six numbers required");
    _;
  }

}

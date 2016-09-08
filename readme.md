# Rock/Paper/Scissor
rock paper scissor game written in js (node.js backend and React.js frontend, with websockets)

play at now at: http://rock-paper-scissor-battle.com/


## Rules
Each player has 5 types of tokens, which are:
* Rock
* Paper
* Scissor
* Bomb
* Flag

The purpose of the game is to capture the other player's flag, or make sure the other player has no more movable tokens.

You can only move tokens of type Rock, Paper or Scissor.

You can only move up, down, left or right, into either an empty space or a space occupied by the other player.

If you move to a space occupied by the other player, it is considered an attack.  The rules for an attack are as follows:
* If you attack the Flag, you win
* If you attack a Bomb, both tokens lose
* If you attack the same token type as yourself, both tokens lose (ex: Rock attacks Rock)
* Otherwise:
  * Rock beats Scissor
  * Scissor beats Paper
  * Paper beats Rock


const { TicTacToe } = require('discord-gamecord');

const Game = new TicTacToe({
    message: interaction,
    isSlashGame: true,
    opponent: interaction.options.getUser('user'),

    embed: {
        title: 'Tic Tac Toe',
        color: '#5865F2',
        statusTitle: 'Status',
        overTitle: 'Game Over'
    },
    emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖'
    },

    mentionUser: true,
    timeoutTime: 60000,
    xButtonStyle: 'DANGER',
    oButtonStyle: 'PRIMARY',
    turnMessage: '{emoji} | É a vez do jogador **{player}**.',
    winMessage: '{emoji} | **{player}** ganhou o jogo da velha',
    tieMessage: 'O Jogo empatou! Ninguém ganhou o jogo!',
    timeoutMessage: '',
    playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});
const { RockPaperScissors } = require("discord-gamecord")
const Discord = require("discord.js")

module.exports = {
    name: "ppt-game",
    description: "Jogue pedra, papel ou tesoura com alguém",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [

        {
            name: "oponente",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Mencione um usuário para jogar contra.",
            required: true
        }

    ],

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("oponente");

        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: user,
            embed: {
                title: 'Pedra Papel Tesoura',
                color: 'White',
                description: 'Pressione um botão abaixo para fazer uma escolha.'
            },

            buttons: {
                rock: 'Pedra',
                paper: 'Papel',
                scissors: 'Tesoura',
                accept: 'Aceitar',
                reject: 'Rejeitar'
            },
            
            emojis: {
                rock: '🌑',
                paper: '📰',
                scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'Você escolheu {emoji}.',
            winMessage: '**{player}** ganhou o jogo! Parabéns!',
            tieMessage: 'O Jogo empatou! Ninguém ganhou o jogo!',
            timeoutMessage: 'O jogo ficou inacabado! Ninguém ganhou o jogo!',
            playerOnlyMessage: 'Apenas {player} e {opponent} pode usar esses botões.'
        });

        Game.startGame();

    }
};
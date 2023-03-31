const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`emoji-info`)
    .setDescription(`Pega as informação de um emoji`)
    .addStringOption((option) =>
      option.setName(`emoji`).setDescription(`O Emoji`).setRequired(true)
    ),
  async execute(interaction, client) {
    // get the emoji
    const emoji = interaction.options.getString(`emoji`);
    

    // if the emoji is not a custom emoji
    if (!emoji.startsWith(`<`))
      return interaction.reply({
        content: `Forneça um emoji personalizado!`,
        ephemeral: true,
      });
    // get the emoji id
    const emojiid = emoji.split(`:`)[2].slice(0, -1);
    // get the emoji url
    const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;
    // send a reply
    interaction.reply({
      content: `**Emoji Info**\n\n**Nome:** ${emoji}\n**ID:** ${emojiid}\n**Baixar:** [Click Aqui](${emojiurl})`,
      ephemeral: true,
    });
  },
};
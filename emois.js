const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-emojis")
    .setDescription("Agrega un emoji al servidor")
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("El emoji que quieres agregar")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("El nombre del emoji a agregar")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content:
          "No tienes suficientes permisos.",
        ephemeral: true,
      });

    let emoji = interaction.options.getString("emoji")?.trim();
    const name = interaction.options.getString("name");

    if (emoji.startsWith("<") && emoji.endsWith(">")) {
      const id = emoji.match(/\d{15,}/g)[0];

      const type = await axios
        .get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .then((image) => {
          if (image) return "gif";
          else return "png";
        })
        .catch((err) => {
          return "png";
        });

      emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
    }

    if (!emoji.startsWith("http")) {
      return await interaction.reply({
        content: "No puedes robar emojis predeterminados!",
        ephemeral: true,
      });
    }

    if (!emoji.startsWith("https")) {
      return await interaction.reply({
        content: "No puedes robar emojis predeterminados!",
        ephemeral: true,
      });
    }

    interaction.guild.emojis
      .create({ attachment: `${emoji}`, name: `${name}` })
      .then((emoji) => {
        const embed = new EmbedBuilder()
          .setColor("#ff0022")
          .addFields([
            {name: `Nombre del emoji: `, value: `${name}`, inline: false},
            {name: `Vista del emoji: `, value: `${emoji}`, inline: false}
          ])

        return interaction.reply({ embeds: [embed] });
      })
      .catch((err) => {
        interaction.reply({
          content:
          "No puede agregar este emoji porque ha alcanzado el límite de emoji de su servidor",
          ephemeral: true,
        });
      });
  },
};

const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "loop",
  description: "Повторение трека",
  usage: "Вафля",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["l", "repeat"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Сейчас ничего не играет...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Вы должны быть в голосовом канале для использования этой команды!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Вы должны быть в голосовом канале, чтобы использовать эту команду!**"
      );

    if (player.trackRepeat) {
      player.setTrackRepeat(false);
      client.sendTime(message.channel, `🔂  \`Отключено\``);
    } else {
      player.setTrackRepeat(true);
      client.sendTime(message.channel, `🔂 \`Включено\``);
    }
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Nothing is playing right now...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Вы должны быть в голосовом канале, чтобы использовать эту команду."
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Вы должны быть со мной в одном голосовом канале, чтобы использовать эту команду!**"
        );

      if (player.trackRepeat) {
        player.setTrackRepeat(false);
        client.sendTime(interaction, `🔂 \`Отключено\``);
      } else {
        player.setTrackRepeat(true);
        client.sendTime(interaction, `🔂 \`Включено\``);
      }
      console.log(interaction.data);
    },
  },
};

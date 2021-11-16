const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "loopqueue",
  description: "Повторение очереди треков",
  usage: "круто1",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["lq", "repeatqueue", "rq"],
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
        "❌ | **Вы должны быть в голосовом канале, чтобы использовать эту команду!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Вы должны быть со мной в одном голосовом канале, чтобы использовать эту команду!**"
      );

    if (player.queueRepeat) {
      player.setQueueRepeat(false);
      client.sendTime(message.channel, `:repeat: Повторение Очереди \`Отключено\``);
    } else {
      player.setQueueRepeat(true);
      client.sendTime(message.channel, `:repeat: Повторение Очереди \`Включено\``);
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Сейчас ничего не играет...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Вы должны быть в голосовом канале, чтобы использовать эту команду.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(voiceChannel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Вы должны быть со мной в одном голосовом канале, чтобы использовать эту команду!**"
        );

      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        client.sendTime(interaction, `:repeat: **Повторение Очереди** \`Включено\``);
      } else {
        player.setQueueRepeat(true);
        client.sendTime(interaction, `:repeat: **Повторение Очереди** \`Отключено\``);
      }
      console.log(interaction.data);
    },
  },
};

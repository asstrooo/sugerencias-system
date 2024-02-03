const Discord = require("discord.js")
const { Client, MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');



client.on('messageCreate', (message) => {
  
  if (message.channel.id === '1197959259137253548' && !message.author.bot) {

    const embedMensaje = new MessageEmbed()
      .setTitle('> <a:876431780515823696:1200629998051151952>  Nueva Sugerencia')
      .setThumbnail(message.author.displayAvatarURL()) 
      .setDescription(`**${message.content}**`)
      .setColor('#00ff80')
      .setFooter(`Sugerencia de: ${message.author.tag}`, message.author.displayAvatarURL());
    
   
    message.channel.send({ embeds: [embedMensaje] })
      .then((mensajeEnviado) => {
     
        mensajeEnviado.react('✅');
        mensajeEnviado.react('❌');

        
        const resumenEmbed = new MessageEmbed()
          .setTitle('**Sugerencia Enviada**')
          .setDescription(`¡Gracias por tu sugerencia! Aquí está el resumen de lo que enviaste:`)
          .addFields(
            { name: 'Contenido de la sugerencia:', value: message.content },
            { name: 'Mensaje original:', value: `[Enlace al mensaje](${mensajeEnviado.url})` }
          )
          .setColor('#00ff80')
          .setThumbnail(message.author.displayAvatarURL()) 
          .setFooter(`Sugerencia de: ${message.author.tag}`, message.author.displayAvatarURL());

       
        message.author.send({ embeds: [resumenEmbed] })
          .catch(console.error);
      })
      .catch(console.error);
  }
});
console.log("El bot a sido encendido")
client.login("Token del bot")

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const bot = require("../../bot.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("enviar-embeds")
        .setDescription("Envie algumas embeds pré-definidas.")
        .addStringOption((option) => option
            .setName("opções")
            .setDescription("Escolha As Embeds")
            .setRequired(true)
            .addChoices(
                {
                    name: "Vips",
                    value: "vip_embed"
                },
                {
                    name: "Guilda",
                    value: "guilda_embed"
                },
                {
                    name: "Boosters",
                    value: "booster_embed"
                },
                {
                    name: "Cargo Personalizado",
                    value: "cargos_embed"
                },
                {
                    name: "Seja Staff",
                    value: "sejaStaff_embed"
                },
                {
                    name: "Patrocínios",
                    value: "patrocinio_embed"
                },
                {
                    name: "Cargos Leveis",
                    value: "cargosLeveis_embed"
                },
                {
                    name: "Seja Family",
                    value: "family_embed"
                },
                {
                    name: "Sumário",
                    value: "sumario_embed"
                },
                {
                    name: "Reqs Parceria",
                    value: "parceria_embed"
                },
                {
                    name: "Regras Staff",
                    value: "RegrasStaff_embed"
                },
                {
                    name: "Ausências Staff",
                    value: "ausencias_embed"
                },
                {
                    name: "Metas Staff",
                    value: "metas_embed"
                },
                {
                    name: "Regras Servidor",
                    value: "regras_embed"
                },
            )),

    async execute(interaction) {

        if (!interaction.member.permissions.has(bot.config.naomiAcess)) {
            interaction.reply({ content: `você não tem permissão pra usar esse comando.`, ephemeral: true })
        } else {

            const escolha = interaction.options.getString('opções');
            const canal = interaction.channel;

            if (escolha === "guilda_embed") {

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setEmoji("🛒").setLabel("Comprar").setStyle(ButtonStyle.Link).setURL("https://canary.discord.com/channels/988251099117006878/1078425112337981551")

                );

                const embed_guilda = new EmbedBuilder()
                    .setColor("#3FB622")
                    .setTitle("**__Benefícios Anime's Zero: Guilda__**")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103780040728133703/c35a80f6-a3d6-4066-9c71-bbed0329e95a.png")
                    .setImage("https://media.discordapp.net/attachments/1079908319231225936/1098745897246011493/GUILDA_AZ.png")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`Você e seus amigos desejam obter os benefícios Vip de uma forma mais acessível dentro do servidor?\nConfiram o sistema de Guildas, ele permite a você e seus amigos obterem alguns benefícios únicos do VIP em um cargo personalizado decidido por vocês.
                    
<:number1:1076556208128925706> Cargo personalizado dado a todos os membros da guilda.
<:number2:1076556272222093352> Xp multiplicado por 2.5x dentro do servidor.
<:number3:1076556331923804161> Permissão para enviar mídias no <#1076315570615631994>.
<:number4:1076556397283651714> Ícone personalizado decidido pelos membros da guilda.
<:number5:1076556430968107068> Até 6 membros dentro da guilda.
<:number6:1076556467320127518> Eventos exclusivos e disputas entre guildas.

<:pix:1097561994644705341> Valor: **35R$**
`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [embed_guilda], components: [buttons] })
            }

            if (escolha === "vip_embed") {

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setEmoji("🛒").setLabel("Comprar").setStyle(ButtonStyle.Link).setURL("https://canary.discord.com/channels/988251099117006878/1078425112337981551")

                );

                const embed_vip = new EmbedBuilder()
                    .setColor("#B61818")
                    .setTitle("**__Benefícios Anime's Zero: Vip's__**")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103798775207710840/11cea08b-4234-4bf4-b271-11cf04ce2b26.png")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1104052760388841565/VIP_AZ_Shatear.png?width=1025&height=373")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`Adquira um cargo vip, o cargo vip te possibilita receber diversos benefícios dentro do servidor,\ne ainda te torna um membro com destaque exclusivo.\nCaso tenha se interessado leia os benefícios abaixo:
                    
**<:vip_divine:1098943179409080332> __Vip Benção Divina__**
> <:number1:1076556208128925706> Cargo <@&988493075619917935> + Icon Benção Divina.
> <:number2:1076556272222093352> Permissão para enviar mídias no <#1076315570615631994>
> <:number3:1076556331923804161> Xp multiplicado em 1.5x no sistema de leveis do servidor.
> <:number4:1076556397283651714> Imunidade aos requisitos de **ALGUNS** sorteios.
> <:number5:1076556430968107068> Recebe 5.000 Kakeras no Bot Mudae.
<:pix:1097561994644705341> Mensal: **4R$**

**<:flamesphere:1076630239830081609> __Vip Esfera Flamejante__**
> <:number1:1076556208128925706> Cargo <@&1071968643937751101> + Destaque acima dos Booster's.
> <:number2:1076556272222093352> Permissão para enviar mídias no <#1076315570615631994>
> <:number3:1076556331923804161> Pode salvar um personagem rank 1+ no reset do Bot mudae.
> <:number4:1076556397283651714> Recebe 15.000 kakeras no Bot mudae.
> <:number5:1076556430968107068> Xp multiplicado em 3.5x no sistema de leveis do servidor.
> <:number6:1076556467320127518> Recebe em dobro em sorteios de sonhos.
> <:number7:1076556510269812786> Imunidade aos requisitos de sorteios.
<:pix:1097561994644705341> Mensal: **12R$**

**<:vip_eagle:1098943227144450129> __Vip Óculos da Águia__**
> <:number1:1076556208128925706> Cargo <@&1055070599195676715> + Icon Óculos de Águia.
> <:number2:1076556272222093352> Permissão para enviar mídias no <#1076315570615631994>
> <:number3:1076556331923804161> Pode salvar personagem rank 100+ no resetd o Bot Mudae.
> <:number4:1076556397283651714> Cargo <@&1028906272633917482>
> <:number5:1076556430968107068> Xp multiplicado em 1.5x no sistema de leveis do servidor.
> <:number6:1076556467320127518> Imunidade aos requisitos de **ALGUNS** sorteios.
<:pix:1097561994644705341> Mensal: **7R$**

Obs: Na compra de **6 meses ou mais**: 30% desconto`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [embed_vip], components: [buttons] })
            }

            ///

            if (escolha === "booster_embed") {

                const booster_embed = new EmbedBuilder()
                    .setColor("#FCA01B")
                    .setTitle("**__Benefícios Anime's Zero: Booster__**")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103808274727440455/animiconz.png")
                    .setImage("https://cdn.discordapp.com/attachments/1076242922971869214/1104052760866988196/BOOSTER_AZ.png")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`Quando você compra o **Discord Nitro Gaming** você recebe 2 impulsos para impulsionar um servidor que você goste.\nCaso queira apoiar e ajudar o servidor, impulsione-nos.\nVocê receberá alguns benefícios únicos dentro do servidor:
                    
**__1 impulso__**
> <:number1:1076556208128925706> Emblema <a:booster:1098757917206925312> em seu perfil que evolui com o tempo.
> <:number2:1076556272222093352> Permissão para enviar mídias no <#1076315570615631994>
> <:number3:1076556331923804161> Cargo <@&989282114862190692> + icon personalizado de 1 impulso.
> <:number4:1076556397283651714> Imunidade aos requisitos de sorteios.
> <:number5:1076556430968107068> Pode salvar um personagem rank 100+ no reset do bot Mudae
> <:number6:1076556467320127518> Xp multiplicado 1.5x no sistema de leveis do servidor.
> <:number7:1076556510269812786> Ganhe 2 sonhos por minuto no bot <@297153970613387264>

**__2 impulsos__**
> <:number1:1076556208128925706> Emblema <a:booster:1098757917206925312> em seu perfil que evolui com o tempo.
> <:number2:1076556272222093352> Cargo <@&1055064143754956800> + Icon personalizado de dois impulsos.
> <:number3:1076556331923804161> Pode salvar um personagem rank +10 no reset do bot Mudae.
> <:number4:1076556397283651714> Imunidade total aos requisitos de sorteios
> <:number5:1076556430968107068> Xp multiplicado 2.5x no sistema de leveis do servidor.
> <:number6:1076556467320127518> Ganha 25% de desconto em qualquer compra dentro do servidor.
> <:number7:1076556510269812786> Permissão pra enviar momentos no <#1076324750202253352>
`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [booster_embed] })
            }

            if (escolha === "cargos_embed") {

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setEmoji("🛒").setLabel("Comprar").setStyle(ButtonStyle.Link).setURL("https://canary.discord.com/channels/988251099117006878/1078425112337981551")

                );

                const cargos_embed = new EmbedBuilder()
                    .setColor("#6245AE")
                    .setTitle("**__Benefícios Anime's Zero: Cargos Personalizados__**")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103811538915172502/purple_haired_girl_aesthetic_pfp.png")
                    .setImage("https://cdn.discordapp.com/attachments/1076242922971869214/1104052759881326634/cargo_pers_AZ.png")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`Obtenha um cargo completamente personalizado para seu perfil no servidor!\nO sistema de cargo personalizado oferece aos membros a possibilidade de criar cargos a seu gosto com alguns benefícios adicionais.

> <:number1:1076556208128925706> Cargo com o nome que você desejar.
> <:number2:1076556272222093352> Cargo com o Icon que você desejar.
> <:number3:1076556331923804161> Cargo com a cor que você desejar.
> <:number4:1076556397283651714> Cargo compartilhado com 2 amigos (os benefícios não são compartilhados).
> <:number5:1076556430968107068> Permissão para enviar mídias no <#1076315570615631994>
> <:number6:1076556467320127518> Permissão para alterar apelido.
> <:number7:1076556510269812786> Permissão pra enviar momentos no <#1076324750202253352>

<:pix:1097561994644705341> Valor: **20R$**
`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [cargos_embed], components: [buttons] })
            }

            //// PRÉ DEFINIDAS !!!

            if (escolha === "sejaStaff_embed") {

                const sejaStaff_embed = new EmbedBuilder()
                    .setColor("#5FAFDD")
                    .setTitle("**<:regrasaz:1104006684994719744> Staff Anime's Zero: Requisitos da Staff**")
                    //.setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103815679871815780/anime_icon.png")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1103472843108393000/588_Sem_Titulo_20230503200953.png?width=1025&height=373")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Interessado em fazer parte da Staff do Anime's Zero? Leia as informações abaixo e fique ciente de tudo que você precisa saber antes de fazer o formulário.
                    
> <:ArrowForward:1102914046916833321> Ter maturidade e responsabilidade para lidar com diversas situações.
> <:ArrowForward:1102914046916833321> Ter no minimo 14 anos de idade.
> <:ArrowForward:1102914046916833321> Ter no minimo 200 mensagens no servidor.
> <:ArrowForward:1102914046916833321> Conhecer o básico da área que você desejar entrar.
> <:ArrowForward:1102914046916833321> Ter tempo disponível para dedicar ao servidor.         
> <:ArrowForward:1102914046916833321> Ter respeito e seguir todas as regras a risca.
                    
<:cheklist_p:1104007289482002502> Caso tenha lido tudo e esteja de acordo, faça o fórmulario [clicando aqui](https://forms.gle/KjQrFbMtzRLBmLnPA) e aguarde até 7 dias úteis para saber se foi aprovado(a). Vale lembrar que caso não seja bom, você pode ser recusado, mas não leve para o pessoal, buscamos pessoas com maturidade e responsabilidade para guiar o servidor ao sucesso.
`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [sejaStaff_embed] })
            }

            if (escolha === "patrocinio_embed") {

                const patrocinio_embed = new EmbedBuilder()
                    .setColor("#101F76")
                    .setTitle("**Anime's Zero: Patrocínio/Apoiador**")
                    //.setThumbnail("")
                    //.setImage("")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`TEXTO AQUI`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [patrocinio_embed] })
            }

            if (escolha === "cargosLeveis_embed") {

                const cargosLeveis_embed = new EmbedBuilder()
                    .setColor("#F0AB18")
                    .setTitle("**<:regrasaz:1104006684994719744> Anime's Zero: Level**")
                    //.setThumbnail("")
                    .setImage("https://cdn.discordapp.com/attachments/1076242922971869214/1104009029711306843/levelsaz.png")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`No nosso servidor temos cargos por nível, são cargos especiais que podem ser conquistados interagindo com os membros do nosso servidor no chat, eles também te dão benefícios especiais no servidor:
     
**<:awp_b_43:1065717032340967535> __Benefícios de Xp: Chat__**

> <@&988493104787107840> - Permissão de alterar seu apelido.
> <@&988493103965040650> - Tempo de claim nos sorteios aumentado em 30 minutos.
> <@&988493101758836836> - 5% desconto na compra de vip.
> <@&988493100785741864> - Permissão para enviar mídias no <#1076315570615631994>.
> <@&988493099422597141> - 10% desconto na compra de um vip
> <@&988493097858121759> - Imunidade aos requisitos de sorteios.
> <@&988493096780197979> - Permissão de enviar links (exceto de outros servidores ou de conteudos indevidos).
> <@&988493095786151956> - Ganha <@&1055070599195676715> por 1 mês.
> <@&988493094850818199> - 30% desconto na compra de um vip permanente.
> <@&988493093764464650> - Permissão para restaurar algum w/h +15 no reset do mudae.
> <@&999459314475474964> - Ganha <@&988493075619917935> por 1 mês.
> <@&1015953190275010600> - Recebe um cargo personalizado de graça (permanente).

<:awp_b_43:1065717032340967535> **__Benefícios de Xp: Call__**

> <:corretoaz:1076576186962026618> 2d: 48 Horas - <@&1062872389035241545>
> <:corretoaz:1076576186962026618> 5d: 120 Horas - Permissão de usar voz prioritária.
> <:corretoaz:1076576186962026618> 10d: 240 Horas - <@&1062872389974769694>
> <:corretoaz:1076576186962026618> 15d: 360 Horas - Call própria em uma categoria privada (Acesso para até 10 amigos).

`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [cargosLeveis_embed] })
            }

            if (escolha === "RegrasStaff_embed") {

                const RegrasStaff_embed = new EmbedBuilder()
                    .setColor("#8A96F6")
                    .setTitle("**Anime's Zero: Regras Staff**")
                    //.setThumbnail("https://cdn.discordapp.com/attachments/1097627876041445397/1103820749774520330/Elianna__.png")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1103472842839961670/589_Sem_Titulo_20230503203342.png?width=1025&height=373")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`TEXTO AQUI`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [RegrasStaff_embed] })
            }

            if (escolha === "parceria_embed") {

                const parceria_embed = new EmbedBuilder()
                    //.setColor("#8A96F6")
                    .setTitle("**Anime's Zero: Parcerias**")
                    //.setThumbnail("")
                    //.setImage("")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`TEXTO AQUI`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [parceria_embed] })
            }

            if (escolha === "family_embed") {

                const family_embed = new EmbedBuilder()
                    .setColor("#8A96F6")
                    .setTitle("**<:familyaz:1076956785539301496> Anime's Zero: Seja Family**")
                    //.setThumbnail("")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1105474843354337290/531_Sem_Titulo_20230405193438.png?width=1025&height=373")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`**Demonstre seu apoio ao servidor se tornando um membro Family, esse cargo também te dará alguns benefícios extras. para se tornar um membro Family você precisa somente cumprir um dos requisitos abaixo:**
                    
> <:ArrowForward:1102914046916833321> Ter o link do servidor na sua bio ou status do discord; Ex: discord.gg/animesbrasil
> <:ArrowForward:1102914046916833321> Ter em seu nickname a tag ᴬᶻ

> <:familyaz:1076956785539301496> **__Benefícios__**
> <:number1:1076556208128925706> Cargo <@&1076958684325875752>
> <:number2:1076556272222093352> Permissão de alterar apelido.
> <:number3:1076556331923804161> Xp multiplicado por 2 no sistema de leveis.
> <:number4:1076556397283651714> Acesso as novidades do servidor antecipadamente.
> <:number5:1076556430968107068> Aumenta + 1 warn no limite de 3 warns para ban.

> <:familyaz:1076956785539301496> **__Extra__**
> O cargo<@&1055618267030503557> está disponível para todos os membros que [votarem](https://disboard.org/pt-pt/server/988251099117006878?updateLanguage=true) no servidor pelo disboard. Os benefícios são os mesmos acima para todos os membros.
`)

                await interaction.reply({ content: `Embed Enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [family_embed] })
            }

            if (escolha === "sumario_embed") {

                const sumario_embed = new EmbedBuilder()
                    //.setColor("")
                    .setTitle("**Sumário**")
                    //.setThumbnail("")
                    //.setImage("")
                    .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` })
                    .setDescription(`Clique na informação que deseja para ser redirecionado:
[Cargos de Level]()
[Seja - Staff & Cargos Staff]()
[Fórmulario Staff]()
[Seja - Family]()
[Patrocinador & Apoiador]()
[Guilda]()
[Seja - Booster]()
[Seja - Vip]
[Cargos Personalizados]
[Suporte]()
[Informações Mudae]()
[Parcerias & Migrações]()
`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [sumario_embed] })
            }

            if (escolha === "ausencias_embed") {

                const ausencias_embed = new EmbedBuilder()
                    .setColor("#4E83DA")
                    .setTitle("** Staff Anime's Zero: Ausências**")
                    //.setThumbnail("")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1103477004944277574/ausencias_azsf.png?width=1025&height=342")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Vai precisar ficar ausente por mais de um dia no servidor?\nNos avise para que não haja situações desagradáveis. Ser staff é uma responsabilidade e precisamos sempre contar com você,\nmas caso esteja passando por um momento complicado ou precisar de um tempo basta nos avisar. Dessa forma entenderemos, afinal somos humanos e todos precisam de um tempo as vezes.

Siga o Modelo Abaixo.

Motivo:
Tempo:
Meu ID:

Obs: Só defina ausência caso for acima do período de **48 Horas** (2dias).`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [ausencias_embed] })
            }

            if (escolha === "metas_embed") {

                const metas_embed = new EmbedBuilder()
                    .setColor("#F5B11F")
                    .setTitle("** Staff Anime's Zero: Metas Staff**")
                    //.setThumbnail("")
                    .setImage("https://media.discordapp.net/attachments/1076242922971869214/1103472842516992061/590_Sem_Titulo_20230503210602.png?width=1025&height=373")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`As metas servem para que haja atividade entre nossos staffs, Todos sem exceção devem cumprir as metas até o final da semana (sábado), aqueles que não cumprirem estarão indo de demote, caso haja uma possível ausência notificar aos staffs superiores.

> <@&1045887626609176626> : 1400 mensagens semanais, manter o chat em ordem diariamente.
> <@&988493069731102760> : 1400 mensagens mensagens por semana ou 10 parcerias na semana + 1000 mensagens e 5 recepções semanais
> <@&998755887541927956> : 3 postagens semanais (2 jornais e recomendação de anime/mangá), 2 ideia de evento mensais
> <@&991660602286161940> : Treinar desenho da naomi mensalmente. Varia da função mas será sempre que solicitado.`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [metas_embed] })
            }

            if (escolha === "regras_embed") {

                const regras_embed = new EmbedBuilder()
                    .setColor("#D59712")
                    .setTitle("**<:regrasaz:1104006684994719744> Staff Anime's Zero: Regras do Servidor**")
                    //.setThumbnail("")
                    .setImage("https://cdn.discordapp.com/attachments/1076242922971869214/1104728266851487744/81_Sem_Titulo_20230507020732.png")
                    .setFooter({ text: `©Anime's Zero™ - Gestão.`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Nosso servidor age de acordo com a [ToS](https://discord.com/terms) do Discord, portanto existem regras que não estão incluídas aqui, porém você será punido caso descumpra. Lembre-se, você assume as consequências de suas ações.

<:regrasaz:1104006684994719744> **__Regras do servidor: Regras Gerais__**
> <:number1:1076556208128925706> Não fazer uso de Nick's ou avatares que contenham conteúdo: Explícito, Nsfw, Desrespeito, Apologias ou Preconceituoso.
> <:number2:1076556272222093352> Tenha respeito pelos usuários do servidor, principalmente pelos Staff's que estão sempre tirando do tempo deles pra manter o servidor seguro.
> <:number3:1076556331923804161> É estritamente proíbido qualquer tipo de divulgação ou autopromoção sem a permissão de algum dos donos.
> <:number4:1076556397283651714> Não compartilhe ou divulgue informações pessoais suas ou de outros usuários, tais como: CPF, Nome completo, Número etc...
> <:number5:1076556430968107068> É estritamente proíbido plagiar qualquer conteúdo de autoria do servidor sem autorização de um dos donos, isso incluí designer, canais, textos e etc.
> <:number6:1076556467320127518> Não cometa qualquer tipo de assédio/desconforto nos chats ou calls do servidor, isso é crime e você pode ser denunciado pra plataforma e ser banido do servidor.
> <:number7:1076556510269812786> Não cometa qualquer tipo de preconceito, racismo, xenofobia, homofobia, apologia, entre outros dentro do servidor.

<:regrasaz:1104006684994719744> **__Regras do servidor: Regras de Call__**
> <:number1:1076556208128925706> Nao transmita ou incentive qualquer conteúdo Indevido em Call.
> <:number2:1076556272222093352> Não coloque ou reproduza áudios estourados nas calls do servidor.
> <:number3:1076556331923804161> Não crie ou promova assuntos desconfortáveis nas calls do servidor.
> <:number4:1076556397283651714> Não utilize programas de voz nas calls do servidor.
> <:number5:1076556430968107068> Não utilize as calls para burlar as demais regras.
> <:number6:1076556467320127518>  Não adicione bots em calls com outros usuários sem a permissão de todos, isso pode ser desconfortável.`)

                await interaction.reply({ content: `Embed sendo enviada <a:loading:1100489724487020574>`, ephemeral: true })

                await canal.send({ embeds: [regras_embed] })
            }
        }
    },
};
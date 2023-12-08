module.exports = {
	name: 'guildMemberAdd',
    async execute(member) {
		const welcomeRole = await member.guild.roles.cache.find(role => role.name === 'Token');
        
        try {
			await member.roles.add(welcomeRole);
            console.log(`${member.name} has received the ${welcomeRole}`);
		} catch (error) {
			console.error(error);
		}
	}
}
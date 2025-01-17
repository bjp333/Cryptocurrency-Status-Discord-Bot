require('dotenv').config() // Load .env file
const axios = require('axios')
const Discord = require('discord.js')

const client = new Discord.Client()


function getPrices() {


	// API for price data.
	axios.get(`https://visordata-o9v9w.ondigitalocean.app/dashboard`).then(res => {
		// If we got a valid response
		if(res.data && res.data.gammaPrice && res.data.gammaPrice) {
			let currentPrice = res.data.gammaPrice || 0 // Default to zero
			let priceChange = res.data.gammaPrice || 0 // Default to zero
			let symbol = "GAMMA" 
			client.user.setPresence({
				game: {
					// Example: "Watching -5,52% | BTC"
					name: `${symbol.toUpperCase()}`,
					type: 3 // Use activity type 3 which is "Watching"
				}
			})

			client.guilds.find(guild => guild.id === '815421435900198962').me.setNickname(`$${(currentPrice).toLocaleString().replace(/,/g,',')}`)

			console.log('Updated price to', currentPrice)
		}
		else
			console.log('Could not load player count data for', 'gamma-strategies')

	}).catch(err => console.log('Error at api.coingecko.com data:', err))
}

// Runs when client connects to Discord.
client.on('ready', () => {
	console.log('Logged in as', client.user.tag)

	getPrices() // Ping server once on startup
	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
	setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
})

// Login to Discord
client.login(process.env.DISCORD_TOKEN)

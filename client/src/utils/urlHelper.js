import { APPS } from './constants'

export const getApp = () => {
	//console.log(window.location.hostname)
	const subdomain = getSubdomain(window.location.hostname)

	const main = APPS.find(app => app.main)

	if (!main) throw new Error('must have main app')

	if (subdomain === '') return main.app

	const app = APPS.find(app => subdomain === app.subdomain)

	if (!app) return main.app

	return app.app
}

const getSubdomain = location => {
	const locationParts = location.split('.')

	let sliceTill = -2

	//for localhost
	const isLocalHost = locationParts.slice(-1)[0] === 'localhost'

	if (isLocalHost) sliceTill = -1

	return locationParts.slice(0, sliceTill).join('')
}

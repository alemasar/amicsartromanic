/* import config */
export default class HTTP {
	/* method: get */
	static get(url) {
		return fetch(config.baseURL + '/' + url, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'GET'
		});
	}
	/* end method: get */
}

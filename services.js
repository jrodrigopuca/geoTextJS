/**
 * Servicios Geo de Here
 * API Docs: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1discover/get
 * 
 */
const API_KEY = data.credentials.key;
const API_URL = "https://revgeocode.search.hereapi.com/v1";

const reverseGeocoding = async (lat, lng) => {
	try {
		const url = `${API_URL}/revgeocode`;
		const response = await fetch(
			`${url}?at=${lat},${lng}&types=city&limit=1&lang=es-ES&apiKey=${API_KEY}`
		);
		if (response.ok) {
			const { items } = await response.json();
			return items.map(item=>item.title);
		} else {
			console.error(response.error);
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};

const autocomplete = async (text) => {
	try {
		const url = `${API_URL}/autocomplete`;
		const response = await fetch(
			`${url}?q=${text}&types=city&lang=es-ES&apiKey=${API_KEY}`
		);
		if (response.ok) {
			const { items } = await response.json();
			return items.length>0? items.map((item) => item.address.label) : null;
		} else {
			console.error(response.error);
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};

//docs: https://www.here.com/docs/bundle/map-image-developer-guide-v3/page/README.html
const createURLImage = (lat,lng)=>{
	const zoomLevel = "12";
	const url = "https://image.maps.hereapi.com/mia/v3/base/mc"
	const imageUrl = `${url}/center:${lat},${lng};zoom=${zoomLevel}/300x300/png8?apiKey=${API_KEY}`
	
	return imageUrl;
}

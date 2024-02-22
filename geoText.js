const placesDiv = document.getElementById("places");
const imageDiv = document.getElementById("place-img");
const getPosition = () => {
	// Verificamos si el navegador soporta la geolocalización
	if ("geolocation" in navigator) {
		// Obtener la ubicación del usuario
		navigator.geolocation.getCurrentPosition(async (position) => {
			// Acceder a la latitud y longitud desde el objeto position.coords
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const response = await reverseGeocoding(latitude, longitude);
      drawList(response);
			drawImage(latitude, longitude)
		});
	} else {
		// El navegador no soporta geolocalización
		console.log("Geolocalización no está soportada en este navegador.");
    drawList(null);
	}
};

const drawImage = (lat, lng) =>{
	const imageSrc = createURLImage(lat,lng);
	imageDiv.innerHTML = `<img src="${imageSrc}">`
}

const drawList = (posiblePositions)=>{
  if (posiblePositions){
    const listPositions = posiblePositions.map((position)=> `<li>${position}</li>`).join("")
    placesDiv.innerHTML = `<ul>${listPositions}</ul>`;
  }else{
    placesDiv.innerHTML = '<p>Lugar no encontrado</p>';
  }
}

const completePlace = async (text) => {
	const response = await autocomplete(text);
	drawList(response)
};

const getSuggestions = (value)=>{
  if (value.length > 3){
    completePlace(value);
  }else{
    placesDiv.innerHTML = "";
  }
}
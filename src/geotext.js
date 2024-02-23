import GeoService from "./services.js";
const placesDiv = document.getElementById("places");
const imageDiv = document.getElementById("place-img");
const getPositionBtn = document.getElementById("getPositionBtn");
const placeInput = document.getElementById("placeInput");

const getPosition = () => {
  // Verificamos si el navegador soporta la geolocalización
  if ("geolocation" in navigator) {
    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(async (position) => {
      // Acceder a la latitud y longitud desde el objeto position.coords
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await GeoService.reverseGeocoding(latitude, longitude);
      drawList(response);
      drawImage(latitude, longitude);
    });
  } else {
    // El navegador no soporta geolocalización
    console.log("Geolocalización no está soportada en este navegador.");
    drawList(null);
  }
};

const drawImage = (lat, lng) => {
  const imageSrc = GeoService.createURLImage(lat, lng);
  imageDiv.innerHTML = `<img src="${imageSrc}">`;
};

const drawList = (posiblePositions) => {
  if (posiblePositions && posiblePositions.length > 0) {
    const listPositions = posiblePositions
      .map((position) => `<option >${position.place}</option>`)
      .join("");
    placesDiv.innerHTML = `<datalist id='placesDL'>${listPositions}</datalist>`;
  } else {
    placesDiv.innerHTML = "<p>Lugar no encontrado</p>";
  }
};

const completePlace = async (text) => {
  const response = await GeoService.autocomplete(text);
  drawList(response);
};

const getSuggestions = (value) => {
  if (value.length > 3) {
    completePlace(value);
  } else {
    placesDiv.innerHTML = "";
  }
};

getPositionBtn.addEventListener("click", getPosition);
placeInput.addEventListener("input", (event) => {
  console.log("tipo", event.inputType);
  if (event.inputType == "insertText") {
    getSuggestions(event.target.value);
  }
});

window.addEventListener(
  "input",
  function (e) {
    //let event = e.inputType ? "input" : "option selected";
    if (e.inputType === "option selected") {
      drawImage(-25, -25);
    }
  },
  false,
);

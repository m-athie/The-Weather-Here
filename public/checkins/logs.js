const myMap = L.map('checkinMap').setView([0,0], 1);
const attribution = 
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution }); 
tiles.addTo(myMap);

getData();
 
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(myMap);

    const txt = `The weather here at ${item.lat}&deg;, ${item.lon}&deg; is ${item.weather.weather[0].description} with a temperature of 
    ${item.weather.main.temp}° Celsius. The concentration of partivulate matter 
    (${item.air.parameter}) is ${item.air.value} ${item.air.unit}
    last read on ${item.air.lastUpdated}.`;

    marker.bindPopup(txt);
  }

  // for (item of data) {
  //   const root = document.createElement('p');
  //   const vegetable = document.createElement('div');
  //   const geo = document.createElement('div');
  //   const date = document.createElement('div');

  //   vegetable.textContent = `vegetable: ${item.vegetable}`;
  //   geo.textContent = `${item.lat}°, ${item.lon}°`;
  //   const dateString = new Date(item.timestamp).toLocaleString();
  //   date.textContent = dateString;

  //   root.append(vegetable, geo, date);
  //   document.body.append(root);
  // };
  
  console.log(data);
};
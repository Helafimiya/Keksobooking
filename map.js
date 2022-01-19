const titleList = [
    "Большая уютная квартира", 
    "Маленькая неуютная квартира", 
    "Огромный прекрасный дворец", 
    "Маленький ужасный дворец", 
    "Красивый гостевой домик", 
    "Некрасивый негостеприимный домик", 
    "Уютное бунгало далеко от моря", 
    "Неуютное бунгало по колено в воде"
];

const typeList = [
    "palace",
    "flat",
    "house",
    "bungalo"
]

const checkinList = [
    "12:00",
    "13:00",
    "14:00",
]

const featuresList = [
    "wifi", 
    "dishwasher", 
    "parking", 
    "washer", 
    "elevator", 
    "conditioner"
]

const photoList = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
]

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function getItem (index, location) {
    return {
        author: {
            avatar: `img/avatars/user0${index + 1}.png`
        },
        offer: {
            title: titleList[index],
            address: `${location.x}, ${location.y}`,
            price: getRandomArbitrary(1000, 1000000),
            type: typeList[Math.floor(index / 2)],
            rooms: Math.floor(getRandomArbitrary(1, 5)),
            guests: Math.floor(getRandomArbitrary(1, 10)),
            checkin: checkinList[Math.floor(getRandomArbitrary(0, 2))],
            checkout: checkinList[Math.floor(getRandomArbitrary(0, 2))],
            features: featuresList.slice(0, Math.floor(getRandomArbitrary(0, 5))),
            description: "",
            photos: photoList.sort(() => {return Math.floor(getRandomArbitrary(-3, 3))})
        },
        location: location
    }
}

const template = document.querySelector("#template");
const mapPin = template.content.querySelector(".map__pin");
const mapPins = document.querySelector(".map__pins");

const map = []
for(let i=0; i<=7; i++) {
    const mapPinClone = mapPin.cloneNode(true);
    const imageClone = mapPinClone.querySelector("img");
    const location = {
        x:Math.floor(getRandomArbitrary(130, 630)), 
        y:Math.floor(getRandomArbitrary(130, 630))
    };

    const item = getItem(i, location);
    
    mapPinClone.style = `left: ${location.x}px; top: ${location.y}px;`;
    imageClone.src = item.author.avatar;
    imageClone.alt = item.offer.title;
    
    map.push(i, location);
    
    mapPins.appendChild(mapPinClone);                                                                         
}


const mapNode = document.querySelector(".map");
mapNode.classList.remove('map--faded');

const mapCardClone = template.content.querySelector(".map__card").cloneNode(true);
const mapFirst = map[0];

mapCardClone.querySelector(".popup__title").textContent = mapFirst.offer.title;
mapCardClone.querySelector(".popup__text--address").textContent = mapFirst.offer.address;
mapCardClone.querySelector(".popup__text--price").textContent = `${mapFirst.offer.price}Р/ночь`;
mapCardClone.querySelector(".popup__type").textContent = mapFirst.offer.type;
mapCardClone.querySelector(".popup__text--capacity").textContent = `${mapFirst.offer.rooms} комнаты для ${mapFirst.offer.quests} гостей`;
mapCardClone.querySelector(".popup__text--time").textContent = `Заезд после ${mapFirst.offer.checkin}, выезд до ${mapFirst.offer.checkout}`;
mapCardClone.querySelector(".popup__features").textContent = mapFirst.offer.features;
mapCardClone.querySelector(".popup__description").textContent = mapFirst.offer.description;
mapCardClone.querySelector(".popup__photos").textContent = mapFirst.offer.photos;
mapCardClone.querySelector(".popup__avatar").textContent = mapFirst.author.avatar;

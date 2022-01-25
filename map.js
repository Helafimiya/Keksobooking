const TITLE_AD = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде",
];

const TYPE_AD = ["palace", "flat", "house", "bungalo"];

const CHECKIN_TIME = ["12:00", "13:00", "14:00"];

const FEATURES_AD = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];

const PHOTO_AD = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];

function getItem(index, location) {
  return {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: TITLE_AD[index],
      address: `${location.x}, ${location.y}`,
      price: Math.random(getRandomNumberRange(1000, 1000000)),
      type: TYPE_AD[Math.floor(Math.random() * TYPE_AD.length)],
      rooms: Math.floor(Math.random(getRandomNumberRange(1, 5))),
      guests: Math.floor(Math.random(getRandomNumberRange(1, 10))),
      checkin: CHECKIN_TIME[Math.floor(Math.random() * TYPE_AD.length)],
      checkout: CHECKIN_TIME[Math.floor(Math.random() * TYPE_AD.length)],
      features: FEATURES_AD.slice(Math.random() * FEATURES_AD.length),
      description: "",
      photos: PHOTO_AD[Math.random() * PHOTO_AD.length],
    },
    location: location,
  };
}

let getRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const pinContainer = document.querySelector(".map__pins");
const mapPinTemplate = document
  .querySelector("#template")
  .content.querySelector(".map__pin");

const fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  let mapPinClone = mapPinTemplate.cloneNode(true);
  let imgClone = mapPinClone.querySelector("img");
  const location = {
    x: Math.floor(getRandomNumberRange(130, 630)),
    y: Math.floor(getRandomNumberRange(130, 630)),
  };

  const item = getItem(i, location);

  mapPinClone.style = `left: ${location.x}px; top: ${location.y}px;`;
  imgClone.src = item.author.avatar;
  imgClone.alt = item.offer.title;

  pinContainer.appendChild(mapPinClone);
}

document.querySelector(".map").classList.remove("map--faded");

let mapCardClone = template.content.querySelector(".map__card").cloneNode(true);

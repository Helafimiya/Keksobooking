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

let getRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

let i = 0;

const textAd = [
  {
    author: {
      avatar: `img/avatars/user0${i++}.png`,
    },
    offer: {
      title: TITLE_AD[i++],
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
    location: {
      x: Math.floor(Math.random(getRandomNumberRange(130, 630))),
      y: Math.floor(Math.random(getRandomNumberRange(130, 630))),
    },
  },
];

document.querySelector(".map").classList.remove("map--faded");

const map = document.querySelector(".map");
const template = document
  .querySelector("#template")
  .content.querySelector(".map__card");

for (let i = 0; i < textAd.length; i++) {
  let templateClone = template.cloneNode(true);

  map.appendChild(templateClone);
}

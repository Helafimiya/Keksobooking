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

const typeMap = {
  palace: "Дворец",
  flat: "Квартира",
  house: "Дом",
  bungalo: "Бунгало",
};

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

function getTypeLabel(type) {
  const typeLabel = typeMap[type];
  if (typeLabel) return typeLabel;
  else return type;
}

function getRandomNumberRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function testRandomazer() {
  for (let i = 0; i < 10; i++) {
    const result = getRandomNumberRange(0, 2);

    const isInteger = Number.isInteger(result);
    const isInRange = result >= 0 && result <= 2;
    if (!isInteger || !isInRange) throw new Error("randomize don't work");
  }
}

testRandomazer();

function getItem(index, location) {
  return {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: TITLE_AD[index],
      address: `${location.x}, ${location.y}`,
      price: getRandomNumberRange(1000, 1000000),
      type: TYPE_AD[getRandomNumberRange(0, TYPE_AD.length)],
      rooms: getRandomNumberRange(1, 5),
      guests: getRandomNumberRange(1, 10),
      checkin: CHECKIN_TIME[getRandomNumberRange(0, 2)],
      checkout: CHECKIN_TIME[getRandomNumberRange(0, 2)],
      features: FEATURES_AD.slice(0, getRandomNumberRange(0, 5)),
      description: "",
      photos: PHOTO_AD.sort(() => {
        return Math.floor(getRandomNumberRange(-3, 3));
      }),
    },
    location: location,
  };
}

const pinContainer = document.querySelector(".map__pins");
const mapPinTemplate = document
  .querySelector("#template")
  .content.querySelector(".map__pin");

const fragment = document.createDocumentFragment();
const map = [];

for (let i = 0; i < 8; i++) {
  const mapPinClone = mapPinTemplate.cloneNode(true);
  const imgClone = mapPinClone.querySelector("img");
  const location = {
    x: Math.floor(getRandomNumberRange(130, 630)),
    y: Math.floor(getRandomNumberRange(130, 630)),
  };

  const item = getItem(i, location);

  map.push(item);
  mapPinClone.style = `left: ${location.x}px; top: ${location.y}px;`;
  imgClone.src = item.author.avatar;
  imgClone.alt = item.offer.title;

  pinContainer.appendChild(mapPinClone);
}

const mapNode = document.querySelector(".map");
const mapFiltersContainer = document.querySelector(".map__filters-container");
mapNode.classList.remove("map--faded");

function getOfferPhotosNodeList(offerPhotos) {
  const picsUl = document.querySelector(".popup__pictures");
  const picLi = picsUl.querySelector("li");

  const photoNodes = [];
  for (let i = 0; i < offerPhotos.length; i++) {
    const targetNode = picLi.cloneNode(true);
    const imgNode = targetNode.querySelector("img");
    imgNode.src = offerPhotos[i];
    photoNodes.push(targetNode);
  }
  return photoNodes;
}

function renderAd(index) {
  const mapCardClone = template.content
    .querySelector(".map__card")
    .cloneNode(true);

  const mapItem = map[index];

  const offerPhotoNodeList = getOfferPhotosNodeList(mapItem.offer.photos);
  const picturesContainer = mapCardClone.querySelector(".popup__pictures");
  const picturesLi = picturesContainer.querySelector("li");

  picturesLi.remove();

  picturesContainer.appendChild(offerPhotoNodeList);

  mapCardClone.querySelector(".popup__title").textContent = mapItem.offer.title;
  mapCardClone.querySelector(".popup__text--address").textContent =
    mapItem.offer.address;
  mapCardClone.querySelector(
    ".popup__text--price"
  ).textContent = `${mapItem.offer.price}Р/ночь`;
  mapCardClone.querySelector(".popup__type").textContent = getTypeLabel(
    mapItem.offer.type
  );
  mapCardClone.querySelector(
    ".popup__text--capacity"
  ).textContent = `${mapItem.offer.rooms} комнаты для ${mapItem.offer.guests} гостей`;
  mapCardClone.querySelector(
    ".popup__text--time"
  ).textContent = `Заезд после ${mapItem.offer.checkin}, выезд до ${mapItem.offer.checkout}`;
  mapCardClone.querySelector(".popup__features").textContent =
    mapItem.offer.features.join(", ");
  mapCardClone.querySelector(".popup__description").textContent =
    mapItem.offer.description;
  mapCardClone.querySelector(".popup__photos").textContent =
    mapItem.offer.photos;
  mapCardClone.querySelector(".popup__avatar").textContent =
    mapItem.author.avatar;

  // найти контейнер для фоток еще раз
  // удалить из него пустой ли
  // добавить в него все ранее созданные ноды (offerPhotoNodeList)

  return mapCardClone;
}

mapNode.insertBefore(renderAd(0), mapFiltersContainer);

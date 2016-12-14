import foreach from 'lodash.foreach';
import classifier from '../../contentObjects/classifier';

const CO_ROOT_ID = 'content_listContainer';
const CO = document.getElementById(CO_ROOT_ID).children;
let contentObjects = [];

foreach(CO, (item) => {
  contentObjects.push(classifier(item));
});

console.log(contentObjects);
console.log(document.getElementById(contentObjects[1].domId));
import foreach from 'lodash.foreach';
import ContentObject from '../../contentObject';

const CO_ROOT_ID = 'content_listContainer';
const CO = document.getElementById(CO_ROOT_ID).children;
let contentObjects = [];

foreach(CO, (item) => {
  contentObjects.push(new ContentObject(item));
});

console.log(contentObjects);

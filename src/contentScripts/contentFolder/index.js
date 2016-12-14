import foreach from 'lodash.foreach';
import classifier from '../../contentObjects/classifier';

const CO_ROOT_ID = 'content_listContainer';
const CO = document.getElementById(CO_ROOT_ID).children;
let contentObjects = [];

const init = () => {
  foreach(CO, (item) => {
    contentObjects.push(classifier(item));
  });
};

init();

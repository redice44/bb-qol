import foreach from 'lodash.foreach';
import classifier from '../../contentObjects/classifier';
// import addPrimaryActions from './primaryBar';

const CO_ROOT_ID = 'content_listContainer';
const CO = document.getElementById(CO_ROOT_ID).children;
let contentObjects = [];
let denseAllState = false;

const toggleAll = () => {
  if (process.env.DEBUG) {
    console.log('Toggle Dense All');
  }
  denseAllState = !denseAllState;
  // TODO: Use constants for state
  document.getElementById('__bbqol__dense-toggle').innerText =
    denseAllState ? 'Expand' : 'Collapse';
  foreach(contentObjects, (item) => {
    item.setDense(denseAllState);
  });
};

const addActions = () => {
  if (process.env.DEBUG) {
    console.log('Adding Primary Nav Actions');
  }
  const PRIMARY_BAR_ID = 'nav';
  const primaryActionBar = document.getElementById(PRIMARY_BAR_ID);
  let denseAll = document.createElement('li');
  let title = document.createElement('h2');
  let link = document.createElement('a');
  let text = document.createTextNode('Collapse');
  // Blackboard class
  denseAll.classList.add('mainButton');
  // title.classList.add('');

  link.setAttribute('href', '#');
  link.setAttribute('id', '__bbqol__dense-toggle');

  link.appendChild(text);
  title.appendChild(link);
  denseAll.appendChild(title);

  denseAll.addEventListener('click', toggleAll);

  primaryActionBar.appendChild(denseAll);
};

const init = () => {
  foreach(CO, (item) => {
    contentObjects.push(classifier(item));
  });
  addActions();
};

init();

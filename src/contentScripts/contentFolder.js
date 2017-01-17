import foreach from 'lodash.foreach';
import classifier from '../contentObjects/classifier';
// import addPrimaryActions from './primaryBar';

let courseId;

const CO_ROOT_ID = 'content_listContainer';
let CO;
let contentObjects = [];
let denseAllState = false;

let editLinks = {};

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

const addEditIcons = () => {

};

const init = () => {
  addActions();
};

// init();

const getEditLink = (dom) => {
  console.log('dom', dom);
  let link = dom.querySelector('ul');
  link = link.children[1];
  link = link.querySelector('a').href;

  return link;
};

// document.addEventListener('DOMNodeRemoved', test);

/*
  Observe only the content object list.

  Initial document sent to browser contains important action links that
  are then parsed and removed. We check for that event and process that
  data before it is removed from the DOM. We also use this opportunity
  to build our data structures.
*/

let contentObjectObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
      /*
        Should only fire once when the action links are removed for each item

        Build our data structure.
      */
      // TODO: Add other action links, remove, move, delete, etc.
      if (mutation.removedNodes.length > 0 &&
          mutation.removedNodes[0].nodeName !== '#text' &&
          mutation.removedNodes[0].id.includes('cmdiv')) {
        let data = {
          courseId: courseId,
          editLink: getEditLink(mutation.removedNodes[0])
        };
        contentObjects.push(classifier(mutation.target.parentNode.parentNode, data));
      }
  });

  // Stop Observing once all Content Objects are created
  if (contentObjects.length >= CO.length) {
    contentObjectObserver.disconnect();
    console.log('Disconnecting', contentObjects);
    init();
  }
});

/*
  Observes as the DOM loads and checks to see when the Content Objects
  are loaded. Stop the observer once it detects the content item list
  object is loaded and start only observing that section.

  We also know the Course ID section of the DOM is loaded, so we also
  get that information.
*/
let loadObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.id === 'content_listContainer') {
      contentObjectObserver.observe(document.getElementById('content_listContainer'), observerConfig);
      courseId = document.getElementById('course_id').value;
      CO = document.getElementById(CO_ROOT_ID).children;
      loadObserver.disconnect();
    }
  });
});

const observerConfig = {
  childList: true,
  subtree: true
};



loadObserver.observe(document, observerConfig);

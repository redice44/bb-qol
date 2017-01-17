import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';
import { ACTIONS } from '../styles/classes';

import {
  AVAILABILITY as STYLE_AVAILABILITY,
  DENSE as STYLE_DENSE,
  DENSE_TOGGLE as STYLE_DENSE_TOGGLE
} from '../styles/classes';

// Indexes of each action in the action node
const actionLink = {
  edit: 1,
  copy: 2,
  move: 3,
  delete: 4
};

class ContentObject {
  constructor(config) {
    const temp = this.__build(config.rootNode);
    this.courseId = config.courseId;
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;
    this.editLink = this.getActionLink(config.actionNode, actionLink.edit);
    this.copyLink = this.getActionLink(config.actionNode, actionLink.copy);
    this.moveLink = this.getActionLink(config.actionNode, actionLink.move);
    this.deleteLink = this.getActionLink(config.actionNode, actionLink.delete);

    this.dense = false;
    this.toggleDense = this.toggleDense.bind(this);

    this.__updateStyles();
    this.__modDOM();
  }


  getActionLink(node, action) {
    let link = node.querySelector('ul');
    link = link.children[action];
    link = link.querySelector('a').href;

    return link;
  }

  addEditIcon() {
    // const baseLink = 'https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?';
    const iconSvg = 'PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMyAxNy4yNVYyMWgzLjc1TDE3LjgxIDkuOTRsLTMuNzUtMy43NUwzIDE3LjI1ek0yMC43MSA3LjA0Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzeiIvPg0KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4NCjwvc3ZnPg==';
    let parent = document.getElementById(this.domId);
    let q = `.${ACTIONS}`;
    parent = parent.querySelector(q);

    let link = document.createElement('a');
    let icon = document.createElement('img');

    link.setAttribute('href', this.editLink);
    link.setAttribute('target', '_blank');
    icon.setAttribute('src', `data:image/svg+xml;base64,${iconSvg}`);
    link.appendChild(icon);
    parent.appendChild(link);
  }

  /*
   * A setter for dense flag.
   * TODO: Make this an actual es6 setter and validate that it's a boolean.
   */

  setDense(dense) {
    // TODO: Validate it's a boolean
    this.dense = dense;
    this.__setDense(document.getElementById(this.domId));
  }

  /*
   * Toggles the dense flag.
   */
  toggleDense() {
    if (process.env.DEBUG) {
      console.log(`Toggle Dense for ${this.title}`, this.dense);
    }
    this.dense = !this.dense;
    this.__setDense(document.getElementById(this.domId));
  }

  /* Private Methods */

  __modDOM() {
    let co = document.getElementById(this.domId);
    this.__addActions(co);
    this.__addDenseToggle(co);
    this.addEditIcon();
  }

  __addActions(co) {
    const q = 'div.item';
    let parent = co.querySelector(q);
    let actions = document.createElement('div');
    actions.classList.add(ACTIONS);

    parent.insertBefore(actions, parent.firstChild);
  }

  __addDenseToggle(co) {
    const q = {
      toggleLink: 'div.item > a[title*="Hide"][href="#"]',
      toggleParent: 'div.item'
    };
    let toggleParent = co.querySelector(q.toggleParent);
    let toggle = co.querySelector(q.toggleLink);
    if (toggle) {
      toggle.remove();
    }
    toggle = document.createElement('span');
    toggle.addEventListener('click', this.toggleDense);
    // Add Blackboard class
    toggle.classList.add('u_floatThis-right', STYLE_DENSE_TOGGLE);
    toggleParent.appendChild(toggle);
  }

  __updateStyles() {
    let co = document.getElementById(this.domId);
    this.__setAvailability(co);
    this.__setDense(co);
  }

  __setAvailability(co) {
    if (this.availability) {
      co.classList.remove(STYLE_AVAILABILITY);
    } else {
      co.classList.add(STYLE_AVAILABILITY);
    }
  }

  __setDense(co) {
    if (this.dense) {
      co.classList.add(STYLE_DENSE);
    } else {
      co.classList.remove(STYLE_DENSE);
    }
  }

  __build(raw) {
    if (process.env.DEBUG) {
      console.log('Build', raw);
    }

    const q = {
      id: 'div.item',
      heading: 'div.item > h3',
      availability: 'div.details .detailsLabel',
    };
    let contentObject = {};

    contentObject.domId = raw.id;
    contentObject.id = raw.querySelector(q.id).id;
    contentObject.title = raw.querySelector(q.heading).innerText;
    let avail = raw.querySelector(q.availability);
    contentObject.availability = !(avail && avail.innerText.includes('Availability'));
    return contentObject;
  }
}

export default ContentObject;

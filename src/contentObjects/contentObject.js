import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';
import { ACTIONS } from '../styles/classes';

import {
  AVAILABILITY as STYLE_AVAILABILITY,
  DENSE as STYLE_DENSE,
  DENSE_TOGGLE as STYLE_DENSE_TOGGLE
} from '../styles/classes';

class ContentObject {
  constructor(raw, data) {
    const temp = this.__build(raw);
    this.courseId = data.courseId;
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;
    this.editLink = data.editLink;

    this.dense = false;
    this.toggleDense = this.toggleDense.bind(this);

    this.__updateStyles();
    this.__modDOM();
  }

  addEditIcon() {
    // const baseLink = 'https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?';
    const iconSvg = 'PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMyAxNy4yNVYyMWgzLjc1TDE3LjgxIDkuOTRsLTMuNzUtMy43NUwzIDE3LjI1ek0yMC43MSA3LjA0Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzeiIvPg0KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4NCjwvc3ZnPg==';
    let parent = document.getElementById(this.domId);
    let q = `.${ACTIONS}`;
    parent = parent.querySelector(q);

    let link = document.createElement('a');
    let icon = document.createElement('img');

    // link.setAttribute('href', `${baseLink}course_id=${this.courseId}&content_id=${this.id}&dispatch=edit`);
    link.setAttribute('href', this.editLink);
    link.setAttribute('target', '_blank');
    icon.setAttribute('src', `data:image/svg+xml;base64,${iconSvg}`);
    // icon.classList.add(EDIT_ICON);
    /* a link .savedDiv gives the menu div */
    // request
    //   .post('/webapps/blackboard/execute/courseInfoBasedContextMenuGenerator')
    //   .send(`course_id=${this.courseId}&content_id=${this.id}&bIsTabContent=false`)
    //   .end((err, res) => {
    //     console.log(JSON.parse(res.text));
    //   });

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
      // edit: 'span.contextMenuContainer'
    };
    let contentObject = {};
    // let editLink = raw.querySelector(q.edit).id;
    // editLink = editLink.substr(6);
    // console.log(`edit id ${editLink}`);

    contentObject.domId = raw.id;
    contentObject.id = raw.querySelector(q.id).id;
    contentObject.title = raw.querySelector(q.heading).innerText;
    // contentObject.editLink = raw.querySelector(q.edit);//.savedDiv;//.querySelector(`#${editLink} > a`).href;
    // contentObject.editLink.id = `edit_me_${contentObject.domId}`;
    // raw.appendChild(contentObject.editLink);
    // console.log(contentObject.editLink.children);
    let avail = raw.querySelector(q.availability);
    contentObject.availability = !(avail && avail.innerText.includes('Availability'));
    return contentObject;
  }
}

export default ContentObject;

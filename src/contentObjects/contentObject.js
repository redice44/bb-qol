import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';

import {
  AVAILABILITY as STYLE_AVAILABILITY,
  DENSE as STYLE_DENSE,
  DENSE_TOGGLE as STYLE_DENSE_TOGGLE
} from '../styles/classes';

class ContentObject {
  constructor(raw) {
    const temp = this.__build(raw);
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;
    this.dense = false;

    this.toggleDense = this.toggleDense.bind(this);

    this.__updateStyles();
    this.__modDOM();
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
    this.__addDenseToggle(co);
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
      availability: 'div.details .detailsLabel'
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

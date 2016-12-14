import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';

import {
  AVAILABILITY as STYLE_AVAILABILITY,
  DENSE as STYLE_DENSE
} from '../styles/classes';

class ContentObject {
  constructor(raw) {
    const temp = this.__build(raw);
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;
    this.dense = true;

    this.__updateStyles = this.__updateStyles.bind(this);

    this.__updateStyles();
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
    contentObject.availability = !raw.querySelector(q.availability);
    return contentObject;
  }
}

export default ContentObject;

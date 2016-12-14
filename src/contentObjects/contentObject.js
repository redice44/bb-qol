import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';

import { AVAILABILITY as STYLE_AVAILABILITY } from '../styles/classes';

class ContentObject {
  constructor(raw) {
    const temp = this.__build(raw);
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;

    this.updateStyles = this.updateStyles.bind(this);

    this.updateStyles();
  }

  updateStyles() {
    let co = document.getElementById(this.domId);

    if (this.availability) {
      co.classList.remove(STYLE_AVAILABILITY);
    } else {
      co.classList.add(STYLE_AVAILABILITY);
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

import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';

class ContentObject {
  constructor(raw) {
    const temp = this.__build(raw);
    this.domId = temp.domId;
    this.id = temp.id;
    this.title = temp.title;
    this.availability = temp.availability;
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

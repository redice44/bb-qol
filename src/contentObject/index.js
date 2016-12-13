import contentFolder from '../utility/contentFolder';
import contentItem from '../utility/contentItem';

class ContentObject {
  constructor(raw) {
    const foo = this.__build(raw);
    this.domId = foo.domId;
    this.id = foo.id;
    this.type = foo.type;
  }

  toString() {
    return `this.id ~ this.type`;
  }

  __build(raw) {
    if(process.env.DEBUG) {
      console.log('Build', raw);
    }

    const q = {
      id: 'div.item',
      heading: 'div.item > h3'
    };
    let contentObject = {};

    contentObject.domId = raw.id;
    contentObject.id = raw.querySelector(q.id).id;
    contentObject.type = this.__classify(raw.querySelector(q.heading));
    return contentObject;
  }

  __classify(raw) {
    if(process.env.DEBUG) {
      console.log('Classify', raw);
    }
    const q = 'a';
    const startTarget = 'webapps';
    const endTarget = '?';

    let link = raw.querySelector(q);
    if (link) {
      // validate it's a bb webapp before destroying url. Could be weblink.
      // Separates the controller url
      link = link.href.substring(link.href.indexOf(startTarget) + startTarget.length + 1, link.href.indexOf(endTarget));
      if (process.env.DEBUG) {
        console.log('href', link);
      }
      switch(link) {
        case contentFolder.controller:
          return contentFolder.type;
        default:
          if (process.env.DEBUG) {
            console.log('Unknown', link);
          }
          return 'Unknown';
      }
    } else {
      if (process.env.DEBUG) {
        console.log('No Link. Assuming Item');
      }

      return contentItem.type;
    }
  }
};

export default ContentObject;

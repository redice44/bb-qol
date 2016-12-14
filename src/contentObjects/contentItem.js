import ContentObject from './contentObject';
import ContentItemUtility from '../utility/contentItem';

class ContentItem extends ContentObject {
  constructor(raw) {
    super(raw);
    this.type = ContentItemUtility.type;
  }

  test() {
    console.log(this.type);
  }
}

export default ContentItem;

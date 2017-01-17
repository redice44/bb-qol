import request from 'superagent';

import ContentObject from './contentObject';
import ContentItemUtility from '../utility/contentItem';

class ContentItem extends ContentObject {
  constructor(raw, courseId) {
    super(raw, courseId);
    this.type = ContentItemUtility.type;
  }
}

export default ContentItem;

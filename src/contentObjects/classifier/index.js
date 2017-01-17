/*
 * Decided to separate the classification of content objects from the objects
 * themselves. This was done so that iterating through the raw DOM and
 * then classifying each object would only be done once.
 *
 * This also allows the usage of different classifiers for different
 * Blackboard versions if the need arises.
 */

 /*
  * Returns a properly classified content object.
  */

import ContentObject from '../contentObject';

import ContentItem from '../contentItem';

import ContentItemUtility from '../../utility/contentItem';
import ContentFolderUtility from '../../utility/contentFolder';

const classifier = (config) => {
  if (process.env.DEBUG) {
    console.log('Classify', config);
  }
  const q = 'div.item > h3 > a';
  const startTarget = 'webapps';
  const endTarget = '?';

  let link = config.rootNode.querySelector(q);
  if (link) {
    // validate it's a bb webapp before destroying url. Could be weblink.
    if (link.href.indexOf(startTarget) >= 0) {
      // Separates the controller url
      link = link.href.substring(link.href.indexOf(startTarget) +
        startTarget.length + 1, link.href.indexOf(endTarget));
      if (process.env.DEBUG) {
        console.log('href', link);
      }
      switch (link) {
        case ContentFolderUtility.controller:
          // TODO: Return a content folder
          return new ContentObject(config);
        default:
          if (process.env.DEBUG) {
            console.log('Unknown', link);
          }
          // TODO: Return an error or generic object
          return new ContentObject(config);
      }
    } else {
      // Weblink...or at least not a blackboard standard controller
      // TODO: Return a weblink
      if (process.env.DEBUG) {
        console.log('Weblink?', link);
      }
      return new ContentObject(config);
    }
  } else {
    if (process.env.DEBUG) {
      console.log('No Link. Assuming Item');
    }

    return new ContentItem(config);
  }
};

export default classifier;

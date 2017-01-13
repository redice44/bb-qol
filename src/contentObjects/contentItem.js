import request from 'superagent';

import ContentObject from './contentObject';
import ContentItemUtility from '../utility/contentItem';
import { EDIT_ICON, ACTIONS } from '../styles/classes';

class ContentItem extends ContentObject {
  constructor(raw, courseId) {
    super(raw, courseId);
    this.type = ContentItemUtility.type;
  }

  test() {
    console.log(this.type);
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
}

export default ContentItem;

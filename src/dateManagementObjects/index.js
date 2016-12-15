class DateManagementObject {
  constructor(raw) {
    const foo = this.__build(raw);
    this.id = foo.id;
    this.courseId = foo.courseId;
    this.title = foo.title;
  }

  /* Private Methods */

  __build(raw) {
    /* Google's Material Design Icon: Open in New */
    const iconSvg = 'PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPHBhdGggZD0iTTE5IDE5SDVWNWg3VjNINWMtMS4xMSAwLTIgLjktMiAydjE0YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0ydi03aC0ydjd6TTE0IDN2MmgzLjU5bC05LjgzIDkuODMgMS40MSAxLjQxTDE5IDYuNDFWMTBoMlYzaC03eiIvPg0KPC9zdmc+';
    const contentFolderUrl = 'https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?';
    const discussionUrl = 'https://fiu.blackboard.com/webapps/discussionboard/do/conference?action=list_forums&nav=discussion_board_entry';
    const blogUrl = 'https://fiu.blackboard.com/webapps/blogs-journals/execute/blogTopicList?type=blog';
    const journalUrl = 'https://fiu.blackboard.com/webapps/blogs-journals/execute/blogTopicList?type=journal';
    const wikiUrl = 'https://fiu.blackboard.com/webapps/Bb-wiki-BBLEARN/wikiList?';
    const titleIndex = 2;
    const actionIndex = 6;
    let foo = {};
    let tempId = raw.children[actionIndex].querySelector('a').id.split(':');
    foo.title = raw.children[titleIndex].innerText.split('\n')[0];
    foo.type = raw.children[titleIndex].innerText.split('\n')[1];
    foo.id = tempId[2];
    foo.courseId = tempId[1];

    /* Modding the DOM */
    /* Inserting link */
    let link = document.createElement('a');
    let icon = document.createElement('img');
    let url = '';

    switch (foo.type) {
      case 'Discussion Board':
        url = `${discussionUrl}&course_id=${foo.courseId}`;
        break;
      case 'Blog':
        url = `${blogUrl}&course_id=${foo.courseId}`;
        break;
      case 'Journal':
        url = `${journalUrl}&course_id=${foo.courseId}`;
        break;
      case 'Wiki':
        url = `${wikiUrl}&course_id=${foo.courseId}`;
        break;
      default:
        url = `${contentFolderUrl}course_id=${foo.courseId}&content_id=${foo.id}`;
    }
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    icon.setAttribute('src', `data:image/svg+xml;base64,${iconSvg}`);

    link.appendChild(icon);
    /* Inserts link after title but before secondary title */
    raw.children[titleIndex].querySelector('span').insertAdjacentElement('beforebegin', link);

    return foo;
  }
}

export default DateManagementObject;

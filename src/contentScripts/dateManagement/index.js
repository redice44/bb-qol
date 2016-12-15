import foreach from 'lodash.foreach';
import DateManagementObject from '../../dateManagementObjects';

const DMO_ID = 'dateRolloverSummaryTable_databody';
const DMO = document.getElementById(DMO_ID).children;
let dateManagementObjects = [];

const init = () => {
  foreach(DMO, (item) => {
    dateManagementObjects.push(new DateManagementObject(item));
  });
};

init();

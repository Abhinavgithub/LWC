import { LightningElement } from 'lwc';
import getFilesByNameAndYear from '@salesforce/apex/CaseFilesController.getFilesByNameAndYear';
const columns = [
  {
    fieldName: 'Title',
    initialWidth: 400,
    label: 'Title',
    type: 'text',
    wrapText: true,
  },
  {
    fieldName: 'FileExtension',
    initialWidth: 200,
    label: 'Type',
    type: 'text',
    wrapText: true,
  },
];
export default class SearchFiles extends LightningElement {
  files;
  columns = columns;
  error = null;
  yearOptions = [];
  filevalue = '';
  yearvalue = '';
  displaytable = false;
  monthvalue; // Initialize the reactive property
  monthOptions = [];
  get fileoptions() {
    return [
      { label: 'Service Report', value: 'Service_Report' },
      { label: 'Invoice Document', value: 'Invoice Document' },
      { label: 'download', value: 'download' },
    ];
  }
  generateMonthOptions() {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.monthOptions = month.map((element, index) => ({
      label: element,
      value: (index + 1).toString(), // Convert to string for consistency
    }));
  }
  handleYearChange(event) {
    this.yearvalue = event.detail.value;
  }
  handleFileChange(event) {
    this.filevalue = event.detail.value;
  }
  handleMonthChange(event) {
    this.monthvalue = event.detail.value;
    console.log('monthvalue = ' + this.monthvalue);
  }
  generateYearOptions() {
    const currentYear = new Date().getFullYear(),
      startYear = 1900,
      YEAR_DECREMENT = 1;
    let year = currentYear;
    while (year >= startYear) {
      this.yearOptions.push({ label: year.toString(), value: year.toString() });
      year -= YEAR_DECREMENT;
    }
  }

  connectedCallback() {
    this.generateYearOptions();
    this.generateMonthOptions();
  }

  handleClick() {
    getFilesByNameAndYear({ fileName: this.filevalue, year: this.yearvalue })
      .then((result) => {
        this.files = result;
        this.error = null;
        console.log('result = ' + result);
        const NO_RESULTS = 0;
        this.displaytable = result !== null && result.length > NO_RESULTS;
      })
      .catch((error) => {
        this.error = error;
        this.data = null;
      });
  }
}

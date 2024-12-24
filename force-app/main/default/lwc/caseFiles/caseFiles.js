import Id from '@salesforce/user/Id';
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCases from '@salesforce/apex/CaseFilesController.getCases';
import getFiles from '@salesforce/apex/CaseFilesController.getFiles';
import getUsers from '@salesforce/apex/CaseFilesController.getUsers';

const caseColumns = [
  { label: 'CaseNumber', fieldName: 'CaseNumber', type: 'text' },
  { label: 'Subject', fieldName: 'Subject', type: 'text' },
  { label: 'Status', fieldName: 'Status', type: 'text' },
  { label: 'Priority', fieldName: 'Priority', type: 'text' },
  { label: 'Type', fieldName: 'Type', type: 'text' },
  { label: 'Origin', fieldName: 'Origin', type: 'text' },
  { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date' },
];

const fileColumns = [
  { label: 'Title', fieldName: 'Title', type: 'text' },
  { label: 'FileType', fieldName: 'FileExtension', type: 'text' },
];

export default class CaseFiles extends NavigationMixin(LightningElement) {
  cases;
  files;
  error;
  caseColumns = caseColumns;
  fileColumns = fileColumns;
  selectedRows;
  selectedIds = [];
  selectedFileIds = [];
  userId = Id;

  connectedCallback() {
    this.loadCases();
    this.loadUsers();
  }

  loadCases() {
    getCases()
      .then((result) => {
        this.cases = result;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.cases = undefined;
      });
  }

  getSelectedId(event) {
    this.selectedIds = [];
    this.selectedRows = event.detail.selectedRows;
    event.detail.selectedRows.forEach((selectedRow) => {
      console.log('You selected: ' + selectedRow.Id);
      if (!this.selectedIds.some((id) => id === selectedRow.Id)) {
        this.selectedIds.push(selectedRow.Id);
      }
    });
    // Display that fieldName of the selected rows
  }
  handleClick() {
    if (this.selectedIds.length === 0) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select a case',
          variant: 'error',
        })
      );
      return;
    }
    getFiles({ caseId: this.selectedIds })
      .then((result) => {
        this.files = result;
        this.error = undefined;
        console.log(`files = ${this.files}`);
      })
      .catch((error) => {
        console.log(error);
        this.error = error;
        this.files = undefined;
      });
  }

  getSelectedFileIds(event) {
    this.selectedFileIds = [];
    event.detail.selectedRows.forEach((selectedRow) => {
      console.log('You selected: ' + selectedRow.Id);
      if (!this.selectedFileIds.some((id) => id === selectedRow.Id)) {
        this.selectedFileIds.push(selectedRow.Id);
      }
    });
  }
  downloadFiles() {
    let downloadURL = '/sfc/servlet.shepherd/document/download';
    if (this.selectedFileIds.length === 0) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select files to download',
          variant: 'error',
        })
      );
    } else {
      this.selectedFileIds.forEach((fileId) => {
        downloadURL += `/${fileId}`;
      });
      console.log(`downloadURL = ${downloadURL}`);
      this[NavigationMixin.Navigate](
        {
          type: 'standard__webPage',
          attributes: {
            url: downloadURL,
          },
        },
        false
      );

      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Success',
          message: 'Files are downloaded',
          variant: 'success',
        })
      );
    }
  }
  loadUsers() {
    getUsers({ searchKey: this.userId })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

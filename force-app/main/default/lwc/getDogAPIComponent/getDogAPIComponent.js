import { LightningElement } from 'lwc';
//import getDogPicture from '@salesforce/apex/DogPictureCallout.getDogPicture';

export default class GetDogAPIComponent extends LightningElement {
  imageReady = false;
  pictureUrl;
  loadingSpinner = false;
  //calling API using Apex
  /*handleClick() {
    this.loadingSpinner = true;
    this.imageReady = false;
    getDogPicture({}).then((resp) => {
      this.pictureUrl = JSON.parse(resp).message;
      this.imageReady = true;
      this.loadingSpinner = false;
    });
  }*/
  //calling API using JS Fetch API
  handleClick() {
    this.loadingSpinner = true;
    this.imageReady = false;
    fetch('https://dog.ceo/api/breeds/image/random', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        this.pictureUrl = data.message;
        this.imageReady = true;
        this.loadingSpinner = false;
      });
  }
}

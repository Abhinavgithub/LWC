import { LightningElement } from 'lwc';
import jsPDF from '@salesforce/resourceUrl/jspdf';
import { loadScript } from 'lightning/platformResourceLoader';

export default class GeneratePDFComponent extends LightningElement {
  jsPdfInitialized = false;
  qrcodeInitialized = false;
  qrText = 'Hello, Salesforce!'; // Example QR text, can be passed dynamically
  url = 'https://image-charts.com/chart?chs=150x150&cht=qr&chl=';

  renderedCallback() {
    if (this.jsPdfInitialized) {
      return;
    }
    this.jsPdfInitialized = true;
    this.qrCodeInitialized = true;
    // Promise.all([loadScript(this, qrCodeResource), loadScript(this, jsPDF)])
    //   .then(() => {
    //     console.log('JS libraries loaded');
    //   })
    //   .catch((error) => {
    //     console.error('Error loading JS libraries: ' + error);
    //   });

    loadScript(this, jsPDF)
      .then(() => {
        console.log('JS loaded');
        console.log(window.jspdf); // Check if the object exists
      })
      .catch((error) => {
        console.error('Error loading jsPDF: ' + error);
      });

    // loadScript(this, qrCodeResource + '/qrcode.min.js')
    //   .then(() => {
    //     console.log('QRCode library loaded successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error loading QRCode library:', error);
    //   });
  }

  // generateQRCode() {
  //   const qrCodeElement = this.template.querySelector('.qr');
  //   return new Promise((resolve) => {
  //     new QRCode(qrCodeElement, {
  //       text: 'https://www.salesforce.com',
  //       width: 128,
  //       height: 128,
  //       correctLevel: QRCode.CorrectLevel.H,
  //       useSVG: true,
  //     });

  //     setTimeout(() => {
  //       const qrCodeSVG = qrCodeElement.querySelector('img').src;
  //       resolve(qrCodeSVG);
  //     }, 500);
  //   });
  //}
  async generatePdf() {
    // eslint-disable-next-line no-shadow
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    //const qrCodeImage = await this.generateQRCode();
    doc.text('Here is your QR code:', 10, 10);
    //doc.addImage(qrCodeImage, 'PNG', 10, 20, 50, 50);
    doc.save('QRCode.pdf');
  }
  generateQR() {
    this.qrcodeInitialized = true;
    this.img_url = this.url + this.qrText;
  }
}

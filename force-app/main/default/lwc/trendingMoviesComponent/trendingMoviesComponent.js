import { LightningElement } from 'lwc';

export default class TrendingMoviesComponent extends LightningElement {
  value = '';
  trending;

  get options() {
    return [
      { label: 'choose any ...', value: '' },
      { label: 'This Week', value: 'week' },
      { label: 'Day', value: 'day' },
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
  }
}

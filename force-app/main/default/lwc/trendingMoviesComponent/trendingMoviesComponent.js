import { LightningElement } from 'lwc';
import getTrendingMovies from '@salesforce/apex/TMDBApi.getTrendingMovies';

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
  async handleClick() {
    if (this.value != null) {
      this.trending = await getTrendingMovies({ type: this.value });
      console.log(this.trending);
    }
  }
}

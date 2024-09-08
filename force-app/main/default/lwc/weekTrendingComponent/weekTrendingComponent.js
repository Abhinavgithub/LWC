import { LightningElement, api } from 'lwc';
import getTrendingMovies from '@salesforce/apex/TMDBApi.getTrendingMovies';
import tmdbUrl from '@salesforce/label/c.TMDBUrl';
const columns = [
  { label: 'Id', fieldName: 'id', type: 'text', initialWidth: 80 },
  {
    label: 'Title',
    fieldName: 'original_title',
    type: 'text',
    wrapText: true,
    initialWidth: 150,
  },
  {
    label: 'Description',
    fieldName: 'overview',
    wrapText: true,
    initialWidth: 750,
  },
  {
    label: 'Rating',
    fieldName: 'vote_average',
    type: 'number',
    initialWidth: 80,
  },
  {
    label: 'Release Date',
    fieldName: 'release_date',
    type: 'date',
    initialWidth: 120,
  },
];
export default class WeekTrendingComponent extends LightningElement {
  columns = columns;
  _type;
  error;
  movies;
  response;
  data;
  movieDetails;
  posterURL = tmdbUrl;
  @api
  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
    // Call the method to fetch updated result whenever the value changes
    this.getTrending();
  }
  async getTrending() {
    try {
      this.movies = await getTrendingMovies({ type: this.type });
      this.error = undefined;
      this.response = JSON.parse(this.movies);
      this.data = this.response.results;
      console.log('data =' + this.data);
      this.movieDetails = this.data.map((movie) => ({
        id: movie.id.toString(),
        original_title: movie.original_title,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average.toFixed(1),
        poster: this.posterURL + movie.poster_path,
      }));
    } catch (error) {
      this.error = error;
      this.movies = undefined;
    }
  }
}

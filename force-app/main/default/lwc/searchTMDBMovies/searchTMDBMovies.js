import { LightningElement } from 'lwc';
import searchMovies from '@salesforce/apex/TMDBApi.searchMovies';
import createTMDB from '@salesforce/apex/TMDBApi.createTMDBRecord';
import overview from '@salesforce/schema/TMDB__c.Overview__c';
import title from '@salesforce/schema/TMDB__c.Title__c';
import rating from '@salesforce/schema/TMDB__c.Rating__c';
import releasedate from '@salesforce/schema/TMDB__c.Release_Date__c';
import tmdbid from '@salesforce/schema/TMDB__c.TMDB_Id__c';

const actions = [{ label: 'Insert into SFDC', name: 'insert_movie' }];

const columns = [
  { label: 'Id', fieldName: 'id', type: 'text', initialWidth: 80 },
  {
    label: 'Title',
    fieldName: 'original_title',
    type: 'text',
    wrapText: true,
  },
  {
    label: 'Description',
    fieldName: 'overview',
    wrapText: true,
    initialWidth: 450,
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
  {
    type: 'action',
    typeAttributes: { rowActions: actions },
  },
];
export default class SearchTMDBMovies extends LightningElement {
  yearOptions = [];
  movies;
  error;
  response;
  data;
  movieDetails;
  columns = columns;
  tmdbRecord = {
    Overview__c: overview,
    Title__c: title,
    Rating__c: rating,
    Release_Date__c: releasedate,
    TMDB_Id__c: tmdbid,
  };

  get options() {
    return [
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' },
      { label: '2022', value: '2022' },
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
    console.log('Year change = ' + this.value);
  }
  connectedCallback() {
    this.generateYearOptions();
  }
  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.yearOptions.push({ label: i.toString(), value: i.toString() });
    }
  }

  async handleClick() {
    try {
      this.data = '';
      console.log('Year selected = ' + this.value);
      this.movies = await searchMovies({ primaryReleaseYear: this.value });
      console.log('movies = ' + this.movies);
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
      }));
      console.log(this.movieDetails);
    } catch (error) {
      this.error = error;
      this.movies = undefined;
    }
  }
  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case 'insert_movie':
        this.tmdbRecord.Overview__c = row.overview;
        this.tmdbRecord.Title__c = row.original_title;
        this.tmdbRecord.Rating__c = row.vote_average;
        this.tmdbRecord.Release_Date__c = row.release_date;
        this.tmdbRecord.TMDB_Id__c = row.id;
        console.log(this.tmdbRecord);
        createTMDB({ tmdbRecord: this.tmdbRecord });
        break;
      default:
    }
  }
}

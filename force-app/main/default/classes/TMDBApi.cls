/**
 * @description       : TMDB API callout
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 06-13-2024
 * @last modified by  : Abhinav Singh
 **/
public with sharing class TMDBApi {
  @AuraEnabled
  public static string getPopularMovies() {
    try {
      Http http = new Http();
      HttpRequest req = new HttpRequest();
      req.setEndpoint(
        'callout:TMDBApi/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200'
      );
      req.setMethod('GET');
      HttpResponse response = http.send(req);
      System.debug(response);
      if (response.getStatusCode() == 200) {
        return response.getBody();
      } else {
        return null;
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string getMovieDetails(String movieId) {
    try {
      Http http = new Http();
      HttpRequest req = new HttpRequest();
      req.setEndpoint('callout:TMDBApi/3/movie/' + movieId);
      req.setMethod('GET');
      HttpResponse response = http.send(req);
      System.debug(response);
      if (response.getStatusCode() == 200) {
        return response.getBody();
      } else {
        return null;
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string getTrendingMovies() {
    try {
      Http http = new Http();
      HttpRequest req = new HttpRequest();
      req.setEndpoint('callout:TMDBApi/3/trending/movie/week?language=en-US');
      req.setMethod('GET');
      HttpResponse response = http.send(req);
      System.debug(response);
      if (response.getStatusCode() == 200) {
        return response.getBody();
      } else {
        return null;
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

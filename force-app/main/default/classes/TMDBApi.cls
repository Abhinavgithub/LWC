/**
 * @description       : TMDB API callout
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 08-27-2024
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

  @AuraEnabled
  public static string searchMovies(String primaryReleaseYear) {
    try {
      Http http = new Http();
      HttpRequest req = new HttpRequest();
      String endpoint;
      req.setEndpoint(
        'callout:TMDBApi/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=' +
          primaryReleaseYear +
          '&sort_by=popularity.desc'
      );
      req.setMethod('GET');
      HttpResponse response = http.send(req);
      System.debug(req.getEndpoint());
      System.debug(response);
      if (response.getStatusCode() == 200) {
        System.debug(JSON.serializePretty(response.getBody()));
        return response.getBody();
      } else {
        return null;
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static void createTMDBRecord(TMDB__c tmdbRecord) {
    try {
      List<TMDB__c> listTMDB = new List<TMDB__c>();
      if (tmdbRecord != null) {
        if (
          [
            SELECT COUNT()
            FROM TMDB__c
            WHERE TMDB_Id__c = :tmdbRecord.TMDB_Id__c
            WITH USER_MODE
          ] > 0
        ) {
          tmdbRecord.Id = [
            SELECT Id
            FROM TMDB__c
            WHERE TMDB_Id__c = :tmdbRecord.TMDB_Id__c
            WITH USER_MODE
          ]
          .Id;
          listTMDB.add(tmdbRecord);
          SObjectAccessDecision decision = Security.stripInaccessible(
            AccessType.UPDATABLE,
            listTMDB
          );
          update decision.getRecords();
        } else {
          System.debug('Else block');
          listTMDB.add(tmdbRecord);
          SObjectAccessDecision decision = Security.stripInaccessible(
            AccessType.CREATABLE,
            listTMDB
          );
          insert decision.getRecords();
        }
      }
    } catch (Exception e) {
      System.debug(e.getMessage());
      throw new AuraHandledException(e.getMessage());
    }
  }
}

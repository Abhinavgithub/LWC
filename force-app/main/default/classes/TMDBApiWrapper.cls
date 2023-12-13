/**
 * @description       : Wrapper API from TMDB API
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 12-13-2023
 * @last modified by  : Abhinav Singh
 **/
public class TMDBApiWrapper {
  public class Production_companies {
    public Integer id { get; set; }
    public String logo_path { get; set; }
    public String name { get; set; }
    public String origin_country { get; set; }

    public Production_companies(JSONParser parser) {
      while (parser.nextToken() != System.JSONToken.END_OBJECT) {
        if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
          String text = parser.getText();
          if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
            if (text == 'id') {
              id = parser.getIntegerValue();
            } else if (text == 'logo_path') {
              logo_path = parser.getText();
            } else if (text == 'name') {
              name = parser.getText();
            } else if (text == 'origin_country') {
              origin_country = parser.getText();
            } else {
              System.debug(
                LoggingLevel.WARN,
                'Production_companies consuming unrecognized property: ' + text
              );
              consumeObject(parser);
            }
          }
        }
      }
    }
  }

  public class Production_countries {
    public String iso_3166_1 { get; set; }
    public String name { get; set; }

    public Production_countries(JSONParser parser) {
      while (parser.nextToken() != System.JSONToken.END_OBJECT) {
        if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
          String text = parser.getText();
          if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
            if (text == 'iso_3166_1') {
              iso_3166_1 = parser.getText();
            } else if (text == 'name') {
              name = parser.getText();
            } else {
              System.debug(
                LoggingLevel.WARN,
                'Production_countries consuming unrecognized property: ' + text
              );
              consumeObject(parser);
            }
          }
        }
      }
    }
  }

  public class Belongs_to_collection {
    public Integer id { get; set; }
    public String name { get; set; }
    public String poster_path { get; set; }
    public String backdrop_path { get; set; }

    public Belongs_to_collection(JSONParser parser) {
      while (parser.nextToken() != System.JSONToken.END_OBJECT) {
        if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
          String text = parser.getText();
          if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
            if (text == 'id') {
              id = parser.getIntegerValue();
            } else if (text == 'name') {
              name = parser.getText();
            } else if (text == 'poster_path') {
              poster_path = parser.getText();
            } else if (text == 'backdrop_path') {
              backdrop_path = parser.getText();
            } else {
              System.debug(
                LoggingLevel.WARN,
                'Belongs_to_collection consuming unrecognized property: ' + text
              );
              consumeObject(parser);
            }
          }
        }
      }
    }
  }

  public Boolean adult { get; set; }
  public String backdrop_path { get; set; }
  public Belongs_to_collection belongs_to_collection { get; set; }
  public Integer budget { get; set; }
  public List<Genres> genres { get; set; }
  public String homepage { get; set; }
  public Integer id { get; set; }
  public String imdb_id { get; set; }
  public String original_language { get; set; }
  public String original_title { get; set; }
  public String overview { get; set; }
  public Double popularity { get; set; }
  public String poster_path { get; set; }
  public List<Production_companies> production_companies { get; set; }
  public List<Production_countries> production_countries { get; set; }
  public String release_date { get; set; }
  public Integer revenue { get; set; }
  public Integer runtime { get; set; }
  public List<Spoken_languages> spoken_languages { get; set; }
  public String status { get; set; }
  public String tagline { get; set; }
  public String title { get; set; }
  public Boolean video { get; set; }
  public Double vote_average { get; set; }
  public Integer vote_count { get; set; }

  public TMDBApiWrapper(JSONParser parser) {
    while (parser.nextToken() != System.JSONToken.END_OBJECT) {
      if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
        String text = parser.getText();
        if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
          if (text == 'adult') {
            adult = parser.getBooleanValue();
          } else if (text == 'backdrop_path') {
            backdrop_path = parser.getText();
          } else if (text == 'belongs_to_collection') {
            belongs_to_collection = new Belongs_to_collection(parser);
          } else if (text == 'budget') {
            budget = parser.getIntegerValue();
          } else if (text == 'genres') {
            genres = arrayOfGenres(parser);
          } else if (text == 'homepage') {
            homepage = parser.getText();
          } else if (text == 'id') {
            id = parser.getIntegerValue();
          } else if (text == 'imdb_id') {
            imdb_id = parser.getText();
          } else if (text == 'original_language') {
            original_language = parser.getText();
          } else if (text == 'original_title') {
            original_title = parser.getText();
          } else if (text == 'overview') {
            overview = parser.getText();
          } else if (text == 'popularity') {
            popularity = parser.getDoubleValue();
          } else if (text == 'poster_path') {
            poster_path = parser.getText();
          } else if (text == 'production_companies') {
            production_companies = arrayOfProduction_companies(parser);
          } else if (text == 'production_countries') {
            production_countries = arrayOfProduction_countries(parser);
          } else if (text == 'release_date') {
            release_date = parser.getText();
          } else if (text == 'revenue') {
            revenue = parser.getIntegerValue();
          } else if (text == 'runtime') {
            runtime = parser.getIntegerValue();
          } else if (text == 'spoken_languages') {
            spoken_languages = arrayOfSpoken_languages(parser);
          } else if (text == 'status') {
            status = parser.getText();
          } else if (text == 'tagline') {
            tagline = parser.getText();
          } else if (text == 'title') {
            title = parser.getText();
          } else if (text == 'video') {
            video = parser.getBooleanValue();
          } else if (text == 'vote_average') {
            vote_average = parser.getDoubleValue();
          } else if (text == 'vote_count') {
            vote_count = parser.getIntegerValue();
          } else {
            System.debug(
              LoggingLevel.WARN,
              'TMDBApiWrapper consuming unrecognized property: ' + text
            );
            consumeObject(parser);
          }
        }
      }
    }
  }

  public class Genres {
    public Integer id { get; set; }
    public String name { get; set; }

    public Genres(JSONParser parser) {
      while (parser.nextToken() != System.JSONToken.END_OBJECT) {
        if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
          String text = parser.getText();
          if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
            if (text == 'id') {
              id = parser.getIntegerValue();
            } else if (text == 'name') {
              name = parser.getText();
            } else {
              System.debug(
                LoggingLevel.WARN,
                'Genres consuming unrecognized property: ' + text
              );
              consumeObject(parser);
            }
          }
        }
      }
    }
  }

  public class Spoken_languages {
    public String english_name { get; set; }
    public String iso_639_1 { get; set; }
    public String name { get; set; }

    public Spoken_languages(JSONParser parser) {
      while (parser.nextToken() != System.JSONToken.END_OBJECT) {
        if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
          String text = parser.getText();
          if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
            if (text == 'english_name') {
              english_name = parser.getText();
            } else if (text == 'iso_639_1') {
              iso_639_1 = parser.getText();
            } else if (text == 'name') {
              name = parser.getText();
            } else {
              System.debug(
                LoggingLevel.WARN,
                'Spoken_languages consuming unrecognized property: ' + text
              );
              consumeObject(parser);
            }
          }
        }
      }
    }
  }

  public static TMDBApiWrapper parse(String json) {
    System.JSONParser parser = System.JSON.createParser(json);
    return new TMDBApiWrapper(parser);
  }

  public static void consumeObject(System.JSONParser parser) {
    Integer depth = 0;
    do {
      System.JSONToken curr = parser.getCurrentToken();
      if (
        curr == System.JSONToken.START_OBJECT ||
        curr == System.JSONToken.START_ARRAY
      ) {
        depth++;
      } else if (
        curr == System.JSONToken.END_OBJECT ||
        curr == System.JSONToken.END_ARRAY
      ) {
        depth--;
      }
    } while (depth > 0 && parser.nextToken() != null);
  }

  private static List<Spoken_languages> arrayOfSpoken_languages(
    System.JSONParser p
  ) {
    List<Spoken_languages> res = new List<Spoken_languages>();
    if (p.getCurrentToken() == null)
      p.nextToken();
    while (p.nextToken() != System.JSONToken.END_ARRAY) {
      res.add(new Spoken_languages(p));
    }
    return res;
  }

  private static List<Production_companies> arrayOfProduction_companies(
    System.JSONParser p
  ) {
    List<Production_companies> res = new List<Production_companies>();
    if (p.getCurrentToken() == null)
      p.nextToken();
    while (p.nextToken() != System.JSONToken.END_ARRAY) {
      res.add(new Production_companies(p));
    }
    return res;
  }

  private static List<Production_countries> arrayOfProduction_countries(
    System.JSONParser p
  ) {
    List<Production_countries> res = new List<Production_countries>();
    if (p.getCurrentToken() == null)
      p.nextToken();
    while (p.nextToken() != System.JSONToken.END_ARRAY) {
      res.add(new Production_countries(p));
    }
    return res;
  }

  private static List<Genres> arrayOfGenres(System.JSONParser p) {
    List<Genres> res = new List<Genres>();
    if (p.getCurrentToken() == null)
      p.nextToken();
    while (p.nextToken() != System.JSONToken.END_ARRAY) {
      res.add(new Genres(p));
    }
    return res;
  }
}

/**
 * @description       : Class to get dog pictures from API
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 12-10-2023
 * @last modified by  : Abhinav Singh
 **/
public with sharing class DogPictureCallout {
  @AuraEnabled
  public static string getDogPicture() {
    try {
      Http http = new Http();
      HttpRequest httpReq = new HttpRequest();
      httpReq.setEndpoint('callout:DogPicturesAPI');
      httpReq.setMethod('GET');
      HttpResponse response = http.send(httpReq);
      System.debug('Response =' + response);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

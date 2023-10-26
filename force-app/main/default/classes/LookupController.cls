/**
 * @description       : Apex class to fetch object data
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 10-26-2023
 * @last modified by  : Abhinav Singh
 **/
public with sharing class LookupController {
  /*
   *    @descirption getRecords
   *    @param objectName Name of the object
   *    @param searchString searchterm to do lookup
   *    @param fieldName Name of the field to be searched upon
   */
  @AuraEnabled(Cacheable=true)
  public static List<Object> getRecords(
    String objectName,
    String searchString,
    String fieldName
  ) {
    try {
      List<Object> recordList = new List<Object>();
      String queryKey =
        ' like \'%' +
        String.escapeSingleQuotes(searchString) +
        '%\'';
      String soqlQuery =
        'Select Id,' +
        +fieldName +
        ' FROM ' +
        +objectName +
        ' where ' +
        +fieldName +
        queryKey;
      recordList = Database.Query(soqlQuery);
      return recordList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

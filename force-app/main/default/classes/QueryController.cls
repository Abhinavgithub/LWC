/**
 * @description       : getdata using SOQL and SOSL queries
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 01-05-2024
 * @last modified by  : Abhinav Singh
 **/
public with sharing class QueryController {
  @AuraEnabled(cacheable=true)
  public static List<List<SObject>> getQuery(String keyword) {
    try {
      List<List<SObject>> searchList = [
        FIND :keyword
        IN ALL FIELDS
        RETURNING Account(Name), Contact(FirstName, LastName), Lead(Name, Email)
      ];
      System.debug(searchList);
      return searchList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList(String keyword) {
    try {
      String key = '%' + keyword + '%';
      return [
        SELECT Id, Name
        FROM Account
        WHERE Name LIKE :key
        WITH USER_MODE
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

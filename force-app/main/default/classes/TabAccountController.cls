/**
 * @description       :
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 11-25-2023
 * @last modified by  : Abhinav Singh
 **/
public with sharing class TabAccountController {
  @AuraEnabled(Cacheable=true)
  public static List<Account> getAccountListByCountry(String country) {
    try {
      return [
        SELECT Id, Name, BillingCity, BillingCountry, BillingStreet
        FROM Account
        WHERE BillingCountry = :country
        WITH USER_MODE
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

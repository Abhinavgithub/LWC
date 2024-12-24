/**
 * @description       : CaseFilesController is a controller class to get all the cases and files from the org.
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 12-23-2024
 * @last modified by  : Abhinav Singh
 **/
public with sharing class CaseFilesController {
  @AuraEnabled
  public static List<Case> getCases() {
    try {
      List<Case> cases = [
        SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, Origin
        FROM Case
        WITH USER_MODE
        ORDER BY CreatedDate DESC
      ];
      return cases;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<ContentDocument> getFiles(List<Id> caseId) {
    Set<Id> cdlIds = new Set<Id>();
    try {
      for (ContentDocumentLink cdl : [
        SELECT Id, ContentDocumentId
        FROM ContentDocumentLink
        WHERE LinkedEntityId IN :caseId
      ]) {
        cdlIds.add(cdl.ContentDocumentId);
      }
      System.debug('cdlIds: ' + cdlIds);
      List<ContentDocument> files = [
        SELECT Id, Title, FileExtension
        FROM ContentDocument
        WHERE Id IN :cdlIds
      ];
      System.debug('files: ' + files);
      return files;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
  @AuraEnabled
  public static List<User> getUsers(String searchKey) {
    try {
      List<User> users = [
        SELECT Id, Name, Email, IsActive
        FROM User
        WHERE Id = :searchKey
        WITH USER_MODE
        ORDER BY Name
      ];
      return users;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

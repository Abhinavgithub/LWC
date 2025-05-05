/**
 * @description       : CaseFilesController is a controller class to get all the cases and files from the org.
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 01-14-2025
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

  /**
   * @description       : Retrieves files by name based on the search key.
   * @param fileName    : The search key to filter files by title.
   * @param year        : The year to filter files by creation date.
   * @return            : A JSON string of the list of ContentDocument records.
   **/
  @AuraEnabled
  public static List<ContentDocument> getFilesByNameAndYear(
    String fileName,
    String year
  ) {
    try {
      if (!Schema.sObjectType.ContentDocument.isAccessible()) {
        throw new AuraHandledException('Access to ContentDocument is denied.');
      }
      List<ContentDocument> files = [
        SELECT Id, Title, FileExtension
        FROM ContentDocument
        WHERE
          Title LIKE :fileName + '%'
          AND CALENDAR_YEAR(CreatedDate) = :Integer.valueOf(year)
        WITH USER_MODE
        ORDER BY CreatedDate DESC
      ];
      return files;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

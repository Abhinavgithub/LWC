/**
 * @description       : Account Trigger Helper
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 12-16-2023
 * @last modified by  : Abhinav Singh
 **/
public without sharing class AccountTriggerHelper {
  public AccountTriggerHelper() {
    System.debug('Inside AccountTriggerHelper Constructor');
  }
  public void isDead(List<Account> newAccounts) {
    Set<Id> accIds = new Set<Id>();
    for (Account acc : newAccounts) {
      accIds.add(acc.id);
    }
    Map<Id, List<Contact>> accntContactMap = new Map<Id, List<Contact>>();
    Map<Id, Account> accUpdateMap = new Map<Id, Account>();
    for (Contact con : [
      SELECT Id, AccountId, Dead__c
      FROM Contact
      WHERE Account.Id IN :accIds
      WITH SECURITY_ENFORCED
    ]) {
      List<Contact> conList;
      if (accntContactMap.containsKey(con.AccountId)) {
        conList = accntContactMap.get(con.AccountId);
      } else {
        conList = new List<Contact>();
      }
      conList.add(con);
      accntContactMap.put(con.AccountId, conList);
    }
    if (accntContactMap.size() > 0) {
      for (Id accId : accntContactMap.keySet()) {
        Integer dead = 0;
        Integer totalcontact = accntContactMap.get(accId).size();
        if (totalcontact >= 1) {
          for (Integer i = 0; i < totalcontact; i++) {
            if (accntContactMap.get(accId)[i].Dead__c == true) {
              dead += 1;
            }
          }
        }
        if ((dead * 100 / totalcontact) > 70) {
          accUpdateMap.put(
            accId,
            new Account(Id = accId, Need_Intel__c = true)
          );
        }
        for (Account acc : newAccounts) {
          if (accUpdateMap.containsKey(acc.Id)) {
            acc.Need_Intel__c = accUpdateMap.get(acc.id).Need_Intel__c;
          }
        }
      }
    }
  }

  public void isGold(List<Account> newAccounts) {
    Map<Id, Id> accntOpptyIdMap = new Map<Id, Id>();
    List<Opportunity> opptyList = [
      SELECT Id, Account.Id
      FROM Opportunity
      WHERE Account.Id IN :newAccounts AND Amount >= 20000
      WITH SECURITY_ENFORCED
    ];
    for (Opportunity opp : opptyList) {
      accntOpptyIdMap.put(opp.Account.Id, opp.Id);
    }
    for (Account acc : newAccounts) {
      if (accntOpptyIdMap.get(acc.Id) != null) {
        acc.Is_Gold__c = true;
      }
    }
  }
  public void updateProfile(
    List<Account> newAccounts,
    Map<ID, SObject> oldAccountMap
  ) {
    Set<Id> changedAccounts = new Set<Id>();
    for (Account acc : newAccounts) {
      if (acc.Website != oldAccountMap.get(acc.Id).get('Website')) {
        changedAccounts.add(acc.Id);
      }
    }
    List<Contact> contactList = [
      SELECT Id, Account.Website, Profile__c, FirstName, LastName
      FROM Contact
      WHERE AccountId IN :changedAccounts
      WITH SECURITY_ENFORCED
    ];
    List<Contact> updatedProfileList = new List<Contact>();
    for (Contact con : contactList) {
      con.Profile__c = con.Account.Website + '/' + con.FirstName + con.LastName;
      updatedProfileList.add(con);
    }
    if (updatedProfileList.size() > 0) {
      SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.UPDATABLE,
        updatedProfileList
      );
      update decision.getRecords();
    }
  }

  public void outOfZip(
    List<Account> oldAccounts,
    List<Account> newAccounts,
    Map<ID, SObject> oldAccountMap,
    Map<ID, SObject> newAccountMap
  ) {
    Set<Id> changedAccounts = new Set<Id>();
    for (Account acc : newAccounts) {
      if (
        oldAccountMap.get(acc.Id).get('BillingCity') !=
        newAccountMap.get(acc.Id).get('BillingCity') ||
        oldAccountMap.get(acc.Id).get('BillingStreet') !=
        newAccountMap.get(acc.Id).get('BillingStreet') ||
        oldAccountMap.get(acc.Id).get('BillingState') !=
        newAccountMap.get(acc.Id).get('BillingState') ||
        oldAccountMap.get(acc.Id).get('BillingPostalCode') !=
        newAccountMap.get(acc.Id).get('BillingPostalCode') ||
        oldAccountMap.get(acc.Id).get('BillingCountry') !=
        newAccountMap.get(acc.Id).get('BillingCountry')
      ) {
        changedAccounts.add(acc.Id);
      }
    }
    Map<Id, Integer> accountOutOfZip = new Map<Id, Integer>();
    for (Contact con : [
      SELECT Id, MailingPostalCode, Account.BillingPostalCode
      FROM Contact
      WHERE AccountId IN :changedAccounts
      WITH SECURITY_ENFORCED
    ]) {
      if (con.MailingPostalCode != con.Account.BillingPostalCode) {
        if (accountOutOfZip.get(con.AccountId) == null) {
          accountOutOfZip.put(con.AccountId, 1);
        } else {
          accountOutOfZip.put(
            con.AccountId,
            accountOutOfZip.get(con.AccountId) + 1
          );
        }
      }
    }
    for (Account acc : newAccounts) {
      if (accountOutOfZip.get(acc.Id) >= 1) {
        acc.Out_of_Zip__c = true;
      }
    }
  }

  public void defaultContact(List<Account> newAccounts) {
    List<Contact> newContacts = new List<Contact>();
    for (Account acc : newAccounts) {
      Contact con = new Contact();
      con.FirstName = 'Default';
      con.LastName = 'Contact';
      con.Email = 'email@website.com';
      con.AccountId = acc.Id;
      newContacts.add(con);
    }
    if (newContacts.size() > 0) {
      SObjectAccessDecision decision = Security.stripInaccessible(
        AccessType.CREATABLE,
        newContacts
      );
      insert decision.getRecords();
    }
  }

  public void getUserName(List<Account> newAccounts) {
    for (Account acc : newAccounts) {
      if (UserInfo.getName() == 'Abhinav Singh') {
        acc.Description = UserInfo.getName() + ' ' + UserInfo.getUserEmail();
      }
    }
  }

  public void convertDescription(List<Account> newAccounts) {
    for (Account acc : newAccounts) {
      String description = acc.Description;
      if (description != null) {
        description = description.replace('ž', 'z');
        description = description.replace('č', 'c');
        description = description.replace('š', 's');
        description = description.replace('ý', 'y');
        description = description.replace('ě', 'e');
        description = description.replace('á', 'a');
        acc.Convert_Description__c = description;
      }
    }
  }
}

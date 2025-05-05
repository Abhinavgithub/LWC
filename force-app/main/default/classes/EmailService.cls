/**
 * @description       : Email Service Class
 * @author            : Abhinav Singh
 * @group             :
 * @last modified on  : 02-21-2025
 * @last modified by  : Abhinav Singh
 **/
public with sharing class EmailService implements Messaging.InboundEmailHandler {
  public Messaging.InboundEmailResult handleInboundEmail(
    Messaging.InboundEmail email,
    Messaging.InboundEnvelope envelope
  ) {
    Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();
    return result;
  }
}

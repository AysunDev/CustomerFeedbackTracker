trigger UpdateAgentAverageRating on Feedback__c (after insert, after update) {
    UpdateAgentAverageRatingTriggerHandler.updateAverageRating(trigger.New, trigger.OldMap);
    
   /* Set<Id> agentIds = new Set<Id>();

    for (Feedback__c fb : Trigger.new) {
        if (fb.Support_Agent__c != null) {
            agentIds.add(fb.Support_Agent__c);
        }
    }

    Map<Id, List<Feedback__c>> feedbackMap = new Map<Id, List<Feedback__c>>();
    for (Feedback__c fb : [
        SELECT Score__c, Support_Agent__c
        FROM Feedback__c
        WHERE Support_Agent__c IN :agentIds
    ]) {
        if (!feedbackMap.containsKey(fb.Support_Agent__c)) {
            feedbackMap.put(fb.Support_Agent__c, new List<Feedback__c>());
        }
        feedbackMap.get(fb.Support_Agent__c).add(fb);
    }

    List<Support_Agent__c> agentsToUpdate = new List<Support_Agent__c>();

    for (Id agentId : feedbackMap.keySet()) {
        List<Feedback__c> feedbacks = feedbackMap.get(agentId);
        Decimal total = 0;
        for (Feedback__c f : feedbacks) {
            total += f.Score__c;
        }
        Decimal avg = total / feedbacks.size();
        agentsToUpdate.add(new Support_Agent__c(
            Id = agentId,
            Average_Score__c = avg.setScale(2)
        ));
    }

    if (!agentsToUpdate.isEmpty()) {
        update agentsToUpdate;
    }*/
}
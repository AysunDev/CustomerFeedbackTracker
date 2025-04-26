trigger UpdateAgentAverageRating on Feedback__c (after insert, after update) {
    UpdateAgentAverageRatingTriggerHandler.updateAverageRating(Trigger.new, Trigger.oldMap);
}

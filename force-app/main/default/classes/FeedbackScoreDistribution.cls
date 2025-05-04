public with sharing class FeedbackScoreDistribution {
    @AuraEnabled(cacheable=true)
    public static Map<Integer, Integer> getScoreDistribution() {
        Map<Integer, Integer> scoreMap = new Map<Integer, Integer>();
        for (Feedback__c fb : [SELECT Score__c FROM Feedback__c WHERE Score__c != null]) {
            Integer score = (Integer) fb.Score__c;
            if (scoreMap.containsKey(score)) {
                scoreMap.put(score, scoreMap.get(score) + 1);
            } else {
                scoreMap.put(score, 1);
            }
        }
        return scoreMap;
    }
}

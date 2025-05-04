public class AgentScoreData {
    @AuraEnabled public String agentName;
    @AuraEnabled public Decimal averageScore;

    @AuraEnabled(cacheable=true)
    public static List<AgentScoreData> getAverageScores() {
        List<AggregateResult> results = [
            SELECT Support_Agent__r.Name name, AVG(Score__c) avgScore
            FROM Feedback__c
            GROUP BY Support_Agent__r.Name
        ];

        List<AgentScoreData> response = new List<AgentScoreData>();
        for (AggregateResult ar : results) {
            AgentScoreData data = new AgentScoreData();
            data.agentName = (String) ar.get('name');
            data.averageScore = (Decimal) ar.get('avgScore');
            response.add(data);
        }
        return response;
    }
}

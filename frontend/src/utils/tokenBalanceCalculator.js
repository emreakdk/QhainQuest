
import { questDatabase } from '../data/questData';

export const calculateTotalTokenBalance = (userAddress) => {
  try {
    if (!userAddress || userAddress === '') return 0;
    
    const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
    const userCompletedQuests = completedQuests
      .filter(key => key.startsWith(`${userAddress}-`))
      .map(key => key.replace(`${userAddress}-`, ''));
    
    let totalBalance = 0;
    
    userCompletedQuests.forEach(questId => {
      const quest = questDatabase.find(q => q.id === questId);
      if (quest && quest.rewardAmount) {
        totalBalance += quest.rewardAmount;
      }
    });
    
    console.log(`Total token balance for ${userAddress}: ${totalBalance}`);
    return totalBalance;
  } catch (error) {
    console.error('Error calculating token balance:', error);
    return 0;
  }
};

export const getCompletedQuestsForUser = (userAddress) => {
  try {
    if (!userAddress || userAddress === '') return [];
    
    const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
    const userCompletedQuests = completedQuests
      .filter(key => key.startsWith(`${userAddress}-`))
      .map(key => key.replace(`${userAddress}-`, ''));
    
    const completedQuestObjects = userCompletedQuests
      .map(questId => questDatabase.find(q => q.id === questId))
      .filter(quest => quest !== undefined);
    
    console.log(`[getCompletedQuestsForUser] Found ${completedQuestObjects.length} completed quests for ${userAddress}`);
    return completedQuestObjects;
  } catch (error) {
    console.error('Error getting completed quests:', error);
    return [];
  }
};

export const getTokenBalanceBreakdown = (userAddress) => {
  try {
    if (!userAddress || userAddress === '') {
      return {
        totalBalance: 0,
        completedQuests: [],
        questCount: 0,
        claimableBalance: 0,
        claimedBalance: 0
      };
    }
    
    const completedQuests = getCompletedQuestsForUser(userAddress);
    console.log(`[getTokenBalanceBreakdown] ${userAddress}: completedQuests array:`, completedQuests);
    console.log(`[getTokenBalanceBreakdown] ${userAddress}: completedQuests.length:`, completedQuests.length);
    
    if (userAddress === 'demo') {
      const allCompletedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      console.log(`[getTokenBalanceBreakdown] Demo mode - all completedQuests in localStorage:`, allCompletedQuests);
      const demoQuests = allCompletedQuests.filter(key => key.startsWith('demo-'));
      console.log(`[getTokenBalanceBreakdown] Demo mode - demo quests:`, demoQuests);
    }
    
    const claimableBalance = parseFloat(localStorage.getItem(`claimableBalance_${userAddress}`) || '0');
    
    const claimedBalance = parseFloat(localStorage.getItem(`claimedBalance_${userAddress}`) || '0');
    
    const totalBalance = claimableBalance + claimedBalance;
    
    console.log(`[getTokenBalanceBreakdown] ${userAddress}: questCount=${completedQuests.length}, claimable=${claimableBalance}, claimed=${claimedBalance}, total=${totalBalance}`);
    
    return {
      totalBalance,
      completedQuests,
      questCount: completedQuests.length,
      claimableBalance,
      claimedBalance
    };
  } catch (error) {
    console.error('Error getting token balance breakdown:', error);
    return {
      totalBalance: 0,
      completedQuests: [],
      questCount: 0,
      claimableBalance: 0,
      claimedBalance: 0
    };
  }
};

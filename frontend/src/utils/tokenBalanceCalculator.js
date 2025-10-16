// Token Balance Calculator Utility
// This utility calculates the total token balance based on completed quests

import { questDatabase } from '../data/questData';

/**
 * Calculate total token balance for a user based on completed quests
 * @param {string} userAddress - User's Stellar wallet address
 * @returns {number} Total token balance
 */
export const calculateTotalTokenBalance = (userAddress) => {
  try {
    if (!userAddress) return 0;
    
    // Get completed quests from localStorage
    const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
    const userCompletedQuests = completedQuests
      .filter(key => key.startsWith(`${userAddress}-`))
      .map(key => key.replace(`${userAddress}-`, ''));
    
    // Calculate total balance
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

/**
 * Get completed quests for a user
 * @param {string} userAddress - User's Stellar wallet address
 * @returns {Array} Array of completed quest objects
 */
export const getCompletedQuestsForUser = (userAddress) => {
  try {
    if (!userAddress) return [];
    
    // Get completed quests from localStorage
    const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
    const userCompletedQuests = completedQuests
      .filter(key => key.startsWith(`${userAddress}-`))
      .map(key => key.replace(`${userAddress}-`, ''));
    
    // Get quest objects
    const completedQuestObjects = userCompletedQuests
      .map(questId => questDatabase.find(q => q.id === questId))
      .filter(quest => quest !== undefined);
    
    return completedQuestObjects;
  } catch (error) {
    console.error('Error getting completed quests:', error);
    return [];
  }
};

/**
 * Get token balance breakdown for a user (including claimable balance)
 * @param {string} userAddress - User's Stellar wallet address
 * @returns {Object} Token balance breakdown
 */
export const getTokenBalanceBreakdown = (userAddress) => {
  try {
    if (!userAddress) {
      return {
        totalBalance: 0,
        completedQuests: [],
        questCount: 0,
        claimableBalance: 0,
        claimedBalance: 0
      };
    }
    
    const completedQuests = getCompletedQuestsForUser(userAddress);
    const earnedFromQuests = completedQuests.reduce((sum, quest) => sum + (quest.rewardAmount || 0), 0);
    
    // Get claimable balance from localStorage
    const claimableBalance = parseFloat(localStorage.getItem(`claimableBalance_${userAddress}`) || '0');
    
    // Total balance = earned from quests + claimable balance
    const totalBalance = earnedFromQuests + claimableBalance;
    
    return {
      totalBalance,
      completedQuests,
      questCount: completedQuests.length,
      claimableBalance,
      claimedBalance: earnedFromQuests - claimableBalance // Already claimed amount
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

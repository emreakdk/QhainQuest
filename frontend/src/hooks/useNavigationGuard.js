import { useState, useCallback } from 'react';
import { useQuest } from '../context/QuestContext';
import { useLanguage } from '../context/LanguageContext';
import { questDatabase } from '../data/questData';

/**
 * Hook to guard navigation when a quiz is active
 * Returns a guarded navigation function that shows a confirmation dialog
 * if a quiz is in progress
 */
export const useNavigationGuard = (onPageChange) => {
  const { activeQuizId, clearActiveQuiz } = useQuest();
  const { t } = useLanguage();
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const guardedNavigate = useCallback((page) => {
    // If no quiz is active, navigate immediately
    if (!activeQuizId) {
      onPageChange(page);
      return;
    }

    // If quiz is active, show confirmation dialog
    setPendingNavigation(page);
    setShowConfirmDialog(true);
  }, [activeQuizId, onPageChange]);

  const handleConfirm = useCallback(() => {
    if (pendingNavigation) {
      clearActiveQuiz();
      setShowConfirmDialog(false);
      onPageChange(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [pendingNavigation, clearActiveQuiz, onPageChange]);

  const handleCancel = useCallback(() => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  }, []);

  // Get quest name for display
  const activeQuestName = activeQuizId 
    ? (() => {
        const quest = questDatabase.find(q => q.id === activeQuizId);
        return quest ? t(quest.nameKey || quest.name || 'Unknown Quest') : null;
      })()
    : null;

  return {
    guardedNavigate,
    showConfirmDialog,
    activeQuestName,
    handleConfirm,
    handleCancel
  };
};


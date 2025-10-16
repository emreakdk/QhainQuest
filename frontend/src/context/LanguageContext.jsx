import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  tr: {
    // Navigation
    'nav.connectWallet': 'Cüzdanı Bağla',
    'nav.profile': 'Profil',
    'nav.quests': 'Görevler',
    'nav.leaderboard': 'Başarılar',
    
    // Home Page
    'home.title': 'Bilgini Kanıtla, Geleceği Kazan.',
    'home.subtitle': 'ChainQuest ile Stellar blok zincirinde benzersiz görevleri tamamla, değerli token ödülleri kazan ve devredilemez Soulbound Token sertifikalarıyla yeteneklerini ölümsüzleştir.',
    'home.startAdventure': 'Macerana Başla!',
    'home.connected': 'Bağlandı',
    
    // Features Section
    'features.quests': 'Etkileşimli Görevler',
    'features.rewards': 'Token Ödülleri',
    'features.certificates': 'NFT Sertifikaları',
    'features.leaderboard': 'Liderlik Tablosu',
    'features.tokenRewards': 'Token Ödülleri',
    'features.tokenRewardsDesc': 'Her doğru cevapla değerli tokenlar kazanın',
    'features.competition': 'Rekabet',
    'features.competitionDesc': 'Diğer kullanıcılarla yarışın ve liderlik tablosunda üst sıralarda yer alın',

    // Profile
    'profile.title': 'Profil',
    'profile.totalTokens': 'Toplam Token',
    'profile.certificates': 'Sertifikalar',
    'profile.completedQuests': 'Tamamlanan Görevler',
    'profile.level': 'Seviye',
    'profile.overview': 'Genel Bakış',
    'profile.achievements': 'Başarılar',
    'profile.nftCertificates': 'NFT Sertifikalarınız',
    
    // Quests
    'quest.title': 'Görevler',
    'quest.description': 'Blockchain dünyasında bilginizi test edin, token kazanın ve benzersiz sertifikalar elde edin.',
    'quest.available': 'Mevcut Görevler',
    'quest.completed': 'Tamamlanan Görevler',
    'quest.reward': 'Ödül',
    'quest.certificate': 'Sertifika',
    'quest.start': 'Başla',
    'quest.continue': 'Devam Et',
    'quest.finished': 'Tamamlandı',
    'quest.progress': 'İlerleme',
    'quest.lessons': 'Ders',
    'quest.rewardAmount': 'Ödül Miktarı',
    'quest.certificateNftUrl': 'Sertifika NFT URL',
    'quest.timeEstimate': 'Tahmini Süre',
    'quest.minutes': 'dakika',
    
    // Quest Statistics
    'stats.totalQuests': 'Toplam Görev',
    'stats.completedQuests': 'Tamamlanan',
    'stats.inProgress': 'Devam Eden',
    'stats.earnedTokens': 'Kazanılan Token',
    
    // Quest Categories
    'category.all': 'Tümü',
    'category.beginner': 'Başlangıç',
    'category.intermediate': 'Orta',
    'category.advanced': 'İleri',
    'category.blockchain': 'Blockchain',
    'category.smartContracts': 'Smart Contracts',
    'category.defi': 'DeFi',
    'category.nft': 'NFT',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.confirm': 'Onayla',
    'common.cancel': 'İptal',
    'common.close': 'Kapat',
    'common.save': 'Kaydet',
    'common.edit': 'Düzenle',
    'common.delete': 'Sil',
    'common.back': 'Geri',
    'common.next': 'İleri',
    'common.tryAgain': 'Tekrar Dene',

    // Quiz
    'quiz.question': 'Soru',
    'quiz.answer': 'Cevap',
    'quiz.correct': 'Doğru Cevap!',
    'quiz.incorrect': 'Yanlış Cevap',
    'quiz.correctAnswer': 'Doğru cevap',
    'quiz.nextQuestion': 'Sonraki Soru',
    'quiz.nextLesson': 'Sonraki Ders',
    'quiz.completeQuest': 'Quest Tamamla',
    'quiz.continue': 'Devam Et',
    'quiz.wrongAnswers': 'Yanlış Yapılanlar - Tekrar',
    'quiz.lesson': 'Ders',
    'quiz.completed': 'Tamamlandı',
    'quiz.reward': 'Ödül',
    'quiz.totalLessons': 'Toplam Ders',
    'quiz.certificate': 'Sertifika',
    'quiz.submitting': 'Gönderiliyor...',
    'quiz.submitAnswer': 'Cevabı Gönder',
    'quiz.greatJob': 'Harika iş çıkardınız!',
    'quiz.tryAgain': 'Tekrar deneyin',
    'quiz.timeEstimate': 'Tahmini Süre',
    'quiz.minutes': 'dakika',
    
    // Celebration
    'celebration.title': 'Tebrikler! 🎉',
    'celebration.message': 'Quest\'i başarıyla tamamladınız!',
    'celebration.tokensEarned': 'Kazanılan Token',
    'celebration.questCompleted': 'Görev Tamamlandı!',
    'celebration.congratulations': 'Tebrikler! Başarıyla tamamladınız.',
    'celebration.certificateEarned': 'Sertifika kazandınız',
    'celebration.certificate': 'Sertifika',
    'celebration.completed': 'Tamamlandı',
    'celebration.close': 'Kapat',
    'celebration.continue': 'Devam Et',
  },
  en: {
    // Navigation
    'nav.connectWallet': 'Connect Wallet',
    'nav.profile': 'Profile',
    'nav.quests': 'Quests',
    'nav.leaderboard': 'Achievements',
    
    // Home Page
    'home.title': 'Prove Your Knowledge, Win the Future.',
    'home.subtitle': 'Complete unique quests on the Stellar blockchain with ChainQuest, earn valuable token rewards and immortalize your skills with non-transferable Soulbound Token certificates.',
    'home.startAdventure': 'Start Your Adventure!',
    'home.connected': 'Connected',
    
    // Features Section
    'features.quests': 'Interactive Quests',
    'features.rewards': 'Token Rewards',
    'features.certificates': 'NFT Certificates',
    'features.leaderboard': 'Leaderboard',
    'features.tokenRewards': 'Token Rewards',
    'features.tokenRewardsDesc': 'Earn valuable tokens with every correct answer',
    'features.competition': 'Competition',
    'features.competitionDesc': 'Compete with other users and climb the leaderboard',

    // Profile
    'profile.title': 'Profile',
    'profile.totalTokens': 'Total Tokens',
    'profile.certificates': 'Certificates',
    'profile.completedQuests': 'Completed Quests',
    'profile.level': 'Level',
    'profile.overview': 'Overview',
    'profile.achievements': 'Achievements',
    'profile.nftCertificates': 'Your NFT Certificates',
    
    // Quests
    'quest.title': 'Quests',
    'quest.description': 'Test your knowledge in the blockchain world, earn tokens and get unique certificates.',
    'quest.available': 'Available Quests',
    'quest.completed': 'Completed Quests',
    'quest.reward': 'Reward',
    'quest.certificate': 'Certificate',
    'quest.start': 'Start',
    'quest.continue': 'Continue',
    'quest.finished': 'Completed',
    'quest.progress': 'Progress',
    'quest.lessons': 'Lessons',
    'quest.rewardAmount': 'Reward Amount',
    'quest.certificateNftUrl': 'Certificate NFT URL',
    'quest.timeEstimate': 'Estimated Time',
    'quest.minutes': 'minutes',
    
    // Quest Statistics
    'stats.totalQuests': 'Total Quests',
    'stats.completedQuests': 'Completed',
    'stats.inProgress': 'In Progress',
    'stats.earnedTokens': 'Earned Tokens',
    
    // Quest Categories
    'category.all': 'All',
    'category.beginner': 'Beginner',
    'category.intermediate': 'Intermediate',
    'category.advanced': 'Advanced',
    'category.blockchain': 'Blockchain',
    'category.smartContracts': 'Smart Contracts',
    'category.defi': 'DeFi',
    'category.nft': 'NFT',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.tryAgain': 'Try Again',

    // Quiz
    'quiz.question': 'Question',
    'quiz.answer': 'Answer',
    'quiz.correct': 'Correct Answer!',
    'quiz.incorrect': 'Incorrect Answer',
    'quiz.correctAnswer': 'Correct answer',
    'quiz.nextQuestion': 'Next Question',
    'quiz.nextLesson': 'Next Lesson',
    'quiz.completeQuest': 'Complete Quest',
    'quiz.continue': 'Continue',
    'quiz.wrongAnswers': 'Wrong Answers - Retry',
    'quiz.lesson': 'Lesson',
    'quiz.completed': 'Completed',
    'quiz.reward': 'Reward',
    'quiz.totalLessons': 'Total Lessons',
    'quiz.certificate': 'Certificate',
    'quiz.submitting': 'Submitting...',
    'quiz.submitAnswer': 'Submit Answer',
    'quiz.greatJob': 'Great job!',
    'quiz.tryAgain': 'Try again',
    'quiz.timeEstimate': 'Estimated Time',
    'quiz.minutes': 'minutes',
    
    // Celebration
    'celebration.title': 'Congratulations! 🎉',
    'celebration.message': 'You have successfully completed the quest!',
    'celebration.tokensEarned': 'Tokens Earned',
    'celebration.questCompleted': 'Quest Completed!',
    'celebration.congratulations': 'Congratulations! You have successfully completed.',
    'celebration.certificateEarned': 'Certificate earned',
    'celebration.certificate': 'Certificate',
    'celebration.completed': 'Completed',
    'celebration.close': 'Close',
    'celebration.continue': 'Continue',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('chainquest-language');
    return savedLanguage || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('chainquest-language', language);
  }, [language]);

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'tr' ? 'en' : 'tr'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
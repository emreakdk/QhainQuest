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

    // Wallet
    'wallet.connect': 'Cüzdanı Bağla',
    'wallet.disconnect': 'Bağlantıyı Kes',
    'wallet.extensionNotInstalled': 'Freighter uzantısı kurulu değil veya çalışmıyor.',
    'wallet.connectionError': 'Bağlantı sırasında hata',
    'wallet.freighterFound': 'Freighter bulundu, bağlantı isteniyor...',
    'wallet.addressReceived': 'Adres geldi',

    // Search
    'search.placeholder': 'Görev ara...',

    // Achievements
    'achievements.firstStep': 'İlk Adım',
    'achievements.firstStepDesc': 'İlk görevinizi tamamladınız',
    'achievements.tokenCollector': 'Token Toplayıcı',
    'achievements.tokenCollectorDesc': '1000+ token kazandınız',
    'achievements.certificateHunter': 'Sertifika Avcısı',
    'achievements.certificateHunterDesc': '3+ sertifika aldınız',
    'achievements.expert': 'Uzman',
    'achievements.expertDesc': '10+ görev tamamladınız',
    'achievements.speedMachine': 'Hız Makinesi',
    'achievements.speedMachineDesc': '1 saatte 5 görev tamamlayın',
    'achievements.legend': 'Efsane',
    'achievements.legendDesc': 'Tüm görevleri tamamlayın',

    // Activity Feed
    'activity.stellarBasicsCompleted': 'Stellar Temelleri görevini tamamladı',
    'activity.tokenRewardEarned': '150 Token ödülü kazandı',
    'activity.newCertificateEarned': 'Yeni sertifika aldı',
    'activity.defiQuestStarted': 'DeFi Protokolleri görevine başladı',
    'activity.hoursAgo': 'saat önce',
    'activity.daysAgo': 'gün önce',

    // Quest List
    'questList.loading': 'Görevler yükleniyor...',
    'questList.error': 'Görevler yüklenemedi. Kontratta henüz görev olmayabilir.',
    'questList.availableQuests': 'Mevcut Görevler',
    'questList.fetchError': 'Görevleri çekerken hata',

    // Filters
    'filters.title': 'Filtreler',
    'filters.difficulty': 'Zorluk',
    'filters.clear': 'Filtreleri Temizle',

    // Testnet Info
    'testnet.environmentInfo': 'Ortam Bilgileri',
    'testnet.environment': 'Ortam',

    // Certificate
    'certificate.blockchainStored': 'Bu sertifika blockchain\'de kalıcı olarak saklanmaktadır',

    // Level System
    'level.beginner': 'Başlangıç',

    // Quest Titles and Descriptions
    'quests.stellar_fundamentals.title': 'Stellar Temelleri',
    'quests.stellar_fundamentals.description': 'Stellar blockchain\'in temel kavramlarını öğrenin ve ilk işlemlerinizi gerçekleştirin. Bu quest ile Stellar ekosisteminin temellerini keşfedin.',
    'quests.soroban_smart_contracts.title': 'Soroban Smart Contracts',
    'quests.soroban_smart_contracts.description': 'Soroban platformunda akıllı kontrat geliştirme temellerini öğrenin. Rust ile Stellar\'da smart contract yazma becerilerini geliştirin.',
    'quests.defi_protocols.title': 'DeFi Protokolleri',
    'quests.defi_protocols.description': 'Stellar ekosistemindeki DeFi protokollerini keşfedin ve kullanın. AMM, lending ve yield farming konularını öğrenin.',
    'quests.nft_ecosystem.title': 'NFT Ekosistemi',
    'quests.nft_ecosystem.description': 'Stellar üzerinde NFT\'lerin nasıl oluşturulduğunu, satıldığını ve kullanıldığını öğrenin. NFT marketplace\'lerini keşfedin.',
    'quests.advanced_stellar.title': 'İleri Seviye Stellar',
    'quests.advanced_stellar.description': 'Stellar\'ın gelişmiş özelliklerini öğrenin. Multi-sig, path payments ve complex transactions konularını keşfedin.',

    // Difficulty Descriptions
    'difficulty.beginner.description': 'Temel kavramlar ve basit uygulamalar',
    'difficulty.intermediate.description': 'Orta seviye teknik bilgi gerektirir',
    'difficulty.advanced.description': 'Gelişmiş teknik bilgi ve deneyim gerektirir',
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

    // Wallet
    'wallet.connect': 'Connect Wallet',
    'wallet.disconnect': 'Disconnect',
    'wallet.extensionNotInstalled': 'Freighter extension is not installed or not working.',
    'wallet.connectionError': 'Error during connection',
    'wallet.freighterFound': 'Freighter found, requesting connection...',
    'wallet.addressReceived': 'Address received',

    // Search
    'search.placeholder': 'Search quests...',

    // Achievements
    'achievements.firstStep': 'First Step',
    'achievements.firstStepDesc': 'You completed your first quest',
    'achievements.tokenCollector': 'Token Collector',
    'achievements.tokenCollectorDesc': 'You earned 1000+ tokens',
    'achievements.certificateHunter': 'Certificate Hunter',
    'achievements.certificateHunterDesc': 'You earned 3+ certificates',
    'achievements.expert': 'Expert',
    'achievements.expertDesc': 'You completed 10+ quests',
    'achievements.speedMachine': 'Speed Machine',
    'achievements.speedMachineDesc': 'Complete 5 quests in 1 hour',
    'achievements.legend': 'Legend',
    'achievements.legendDesc': 'Complete all quests',

    // Activity Feed
    'activity.stellarBasicsCompleted': 'Completed Stellar Basics quest',
    'activity.tokenRewardEarned': 'Earned 150 Token reward',
    'activity.newCertificateEarned': 'Earned new certificate',
    'activity.defiQuestStarted': 'Started DeFi Protocols quest',
    'activity.hoursAgo': 'hours ago',
    'activity.daysAgo': 'days ago',

    // Quest List
    'questList.loading': 'Loading quests...',
    'questList.error': 'Quests could not be loaded. There may be no quests in the contract yet.',
    'questList.availableQuests': 'Available Quests',
    'questList.fetchError': 'Error fetching quests',

    // Filters
    'filters.title': 'Filters',
    'filters.difficulty': 'Difficulty',
    'filters.clear': 'Clear Filters',

    // Testnet Info
    'testnet.environmentInfo': 'Environment Information',
    'testnet.environment': 'Environment',

    // Certificate
    'certificate.blockchainStored': 'This certificate is permanently stored on the blockchain',

    // Level System
    'level.beginner': 'Beginner',

    // Quest Titles and Descriptions
    'quests.stellar_fundamentals.title': 'Stellar Fundamentals',
    'quests.stellar_fundamentals.description': 'Learn the basic concepts of Stellar blockchain and perform your first transactions. Discover the fundamentals of the Stellar ecosystem with this quest.',
    'quests.soroban_smart_contracts.title': 'Soroban Smart Contracts',
    'quests.soroban_smart_contracts.description': 'Learn the basics of smart contract development on the Soroban platform. Develop your skills in writing smart contracts on Stellar with Rust.',
    'quests.defi_protocols.title': 'DeFi Protocols',
    'quests.defi_protocols.description': 'Explore and use DeFi protocols in the Stellar ecosystem. Learn about AMM, lending and yield farming topics.',
    'quests.nft_ecosystem.title': 'NFT Ecosystem',
    'quests.nft_ecosystem.description': 'Learn how NFTs are created, sold and used on Stellar. Explore NFT marketplaces.',
    'quests.advanced_stellar.title': 'Advanced Stellar',
    'quests.advanced_stellar.description': 'Learn advanced features of Stellar. Explore multi-sig, path payments and complex transactions topics.',

    // Difficulty Descriptions
    'difficulty.beginner.description': 'Basic concepts and simple applications',
    'difficulty.intermediate.description': 'Requires intermediate technical knowledge',
    'difficulty.advanced.description': 'Requires advanced technical knowledge and experience',
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
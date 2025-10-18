import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  tr: {
    // Navigation
    'nav.connectWallet': 'Cüzdanı Bağla',
    'nav.profile': 'Profil',
    'nav.quests': 'Görevler',
    'nav.leaderboard': 'Başarılar',
    
    // Theme
    'theme.switchToLight': 'Açık Temaya Geç',
    'theme.switchToDark': 'Koyu Temaya Geç',
    
    // Home Page
    'home.title': 'Bilgini Kanıtla, Geleceği Kazan.',
    'home.subtitle': 'ChainQuest ile Stellar blok zincirinde benzersiz görevleri tamamla, değerli token ödülleri kazan ve devredilemez Soulbound Token sertifikalarıyla yeteneklerini ölümsüzleştir.',
    'home.startAdventure': 'Macerana Başla!',
    'home.connected': 'Bağlandı',
    'home.useWithoutWallet': 'Cüzdansız Kullan',
    'home.demoMode': 'Demo Modu',
    
    // Features Section
    'features.quests': 'Etkileşimli Görevler',
    'features.rewards': 'Token Ödülleri',
    'features.certificates': 'NFT Sertifikaları',
    'features.leaderboard': 'Liderlik Tablosu',
    'features.tokenRewards': 'Token Ödülleri',
    'features.tokenRewardsDesc': 'Her doğru cevapla değerli tokenlar kazanın',
    'features.competition': 'Rekabet',
    'features.competitionDesc': 'Diğer kullanıcılarla yarışın ve liderlik tablosunda üst sıralarda yer alın',

    // Entry Page Process Section
    'entrypage.process.title': 'Nasıl Çalışır?',
    'entrypage.process.subtitle': 'Blockchain bilginizi geliştirin, token kazanın ve benzersiz sertifikalar elde edin',
    'entrypage.features.learn.title': 'Öğren',
    'entrypage.features.learn.desc': 'Blockchain teknolojileri hakkında kapsamlı bilgi edinin ve uzmanlaşın',
    'entrypage.features.earn.title': 'Kazan',
    'entrypage.features.earn.desc': 'Görevleri tamamlayarak değerli token ödülleri kazanın',
    'entrypage.features.certify.title': 'Sertifikala',
    'entrypage.features.certify.desc': 'Benzersiz NFT sertifikaları ile yeteneklerinizi ölümsüzleştirin',

    // Mobile Warnings
    'warnings.mobileTitle': 'Mobil Uyarı',
    'warnings.mobileClaim': 'Tokenlarınızı cüzdanınıza aktarmak için lütfen masaüstü tarayıcıdan giriş yapın.',

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

    // Profile Page
    'profile.totalEarned': 'Toplam Kazanılan',
    'profile.claimableBalance': 'Çekilebilir Bakiye',
    'profile.completedQuests': 'Tamamlanan Quest',
    'profile.certificates': 'Sertifikalar',
    'profile.claimButton': 'Hesaba Aktar',
    'profile.overview': 'Genel Bakış',
    'profile.achievements': 'Başarılar',
    'profile.progressChart': 'İlerleme Grafiği',
    'profile.chartPlaceholder': 'Grafik burada görünecek',
    'profile.yourCertificates': 'Sertifikalarınız',
    'profile.certificatePrefix': 'Sertifika:',
    'profile.yourAchievements': 'Başarılarınız',
    'profile.questCompleted': 'Quest Tamamlandı',
    'profile.recentAchievements': 'Son Başarılar',
    'profile.connectWalletForAchievements': 'Başarılarınızı görüntülemek için cüzdanınızı bağlayın.',

    // Token Messages
    'token.successfullyTransferred': 'Token\'lar Başarıyla Aktarıldı!',
    'token.transferError': 'Token Aktarım Hatası',
    'token.transferredToWallet': 'token Stellar cüzdanınıza aktarıldı. Transaction Hash:',
    'token.claimSuccess': 'Token\'lar Başarıyla Aktarıldı!',

    // Profile Tabs
    'profile.tabs.dashboard': 'Kontrol Paneli',
    'profile.tabs.activity': 'Aktivite',

    // Profile Dashboard
    'profile.dashboard.loadingError': 'Dashboard verileri yüklenemedi',
    'profile.dashboard.retry': 'Tekrar Dene',
    'profile.dashboard.recentActivities': 'Son Aktiviteler',
    'profile.dashboard.activity': 'Aktivite',

    // Profile Stats
    'profile.stats.claimSuccess': 'Token\'lar Başarıyla Aktarıldı!',

    // Quest Messages
    'quest.alreadyCompleted': 'Bu quest\'i zaten başarıyla tamamladınız. Yeni quest\'leri keşfetmek için ana sayfaya dönün.',
    'quest.dashboardDataError': 'Dashboard veri yükleme hatası:',

    // Profile Streak Information
    'profile.streak.title': 'Streak Bilgileri',
    'profile.streak.daily': 'Günlük Streak',
    'profile.streak.best': 'En İyi Streak',
    'profile.streak.lastActive': 'Son Aktiflik',
    'profile.streak.unknown': 'Bilinmiyor',
    'profile.streak.dayUnit': 'gün',

    // Profile Token Statistics
    'profile.tokenStats.title': 'Token İstatistikleri',
    'profile.tokenStats.withdrawn': 'Cüzdana Çekilen',

    // Common
    'common.unknown': 'Bilinmiyor',
    'common.dayUnit': 'gün',
    'common.or': 'veya',

      // Demo Mode
      'demo.claimError.title': 'Cüzdan Bağlantısı Gerekli',
      'demo.claimError.message': 'Tokenlarınızı cüzdanınıza aktarmak için lütfen bir cüzdan bağlayın.',
      'demo.statsLocked.title': 'İstatistikler Kilitli',
      'demo.statsLocked.message': 'Detaylı istatistiklerinizi görmek için lütfen cüzdanınızı bağlayın.',
      'demo.earnedInDemo': 'Demo modunda kazanıldı',

    // Wallet Connection Required
    'wallet.connectionRequired.title': 'Cüzdan Bağlantısı Gerekli',
    'wallet.connectionRequired.message': 'Token claim işlemi için cüzdan bağlantısı gereklidir.',

    // Profile Claim Section
    'profile.claim.title': 'Token\'larınızı Hesabınıza Aktarın',
    'profile.claim.description': 'token\'ı Stellar cüzdanınıza aktarabilirsiniz.',
    'profile.claim.transferring': 'Aktarılıyor...',
    'profile.claim.button': 'Çek',

    // Empty States
    'emptyState.certificates': 'Henüz sertifika kazanmadınız. Quest\'leri tamamlayarak sertifika kazanın!',
    'emptyState.activity': 'Henüz aktivite bulunmuyor.',
    'emptyState.noDescription': 'Açıklama yok',
    'emptyState.noDate': 'Tarih yok',
    'achievements.emptyState': 'Henüz başarı kazanmadınız. Quest\'leri tamamlayarak başarılar kazanın!',

    // Common
    'common.noData': 'Veri yok',

    // Profile Claim
    'profile.claim.readyToClaim': 'Çekilebilir tokenlar',

    // Profile Stats
    'profile.stats.perfectScore': 'Mükemmel skor',

    // Achievements
    'achievements.achievement': 'Başarı',
    'achievements.achievementEarned': 'Başarı kazanıldı!',
    'achievements.pageTitle': 'Başarı Panosu',
    'achievements.pageSubtitle': 'Kişisel başarılarınızı ve ilerlemenizi takip edin.',
    'achievements.walletRequired': 'Cüzdan Bağlantısı Gerekli',
    'achievements.filter.allTime': 'Tüm Zamanlar',
    'achievements.filter.thisMonth': 'Bu Ay',
    'achievements.filter.thisWeek': 'Bu Hafta',
    'achievements.you': 'Sen',
    'achievements.token': 'Token',
    'achievements.certificate': 'Sertifika',
    'achievements.successfulStudent': 'Başarılı Öğrenci',
    'achievements.detailedStats': 'Detaylı İstatistikler',
    'achievements.cta.title': 'Daha fazla görev tamamlayarak başarılarınızı artırın!',
    'achievements.cta.button': 'Görevleri Keşfet',

    // Quiz Questions - Stellar Fundamentals
    'quests.stellar_fundamentals.q1.question': 'Stellar ağında işlemler hangi konsensüs algoritması ile doğrulanır?',
    'quests.stellar_fundamentals.q1.option1': 'Proof of Work (PoW)',
    'quests.stellar_fundamentals.q1.option2': 'Stellar Consensus Protocol (SCP)',
    'quests.stellar_fundamentals.q1.option3': 'Proof of Stake (PoS)',
    'quests.stellar_fundamentals.q1.option4': 'Delegated Proof of Stake (DPoS)',
    'quests.stellar_fundamentals.q1.explanation': 'SCP, Stellar\'ın benzersiz federated Byzantine agreement algoritmasıdır.',

    'quests.stellar_fundamentals.q2.question': 'Stellar ağının yerel tokenı nedir?',
    'quests.stellar_fundamentals.q2.option1': 'Ether',
    'quests.stellar_fundamentals.q2.option2': 'Bitcoin',
    'quests.stellar_fundamentals.q2.option3': 'XLM (Stellar Lumens)',
    'quests.stellar_fundamentals.q2.option4': 'Ripple',
    'quests.stellar_fundamentals.q2.explanation': 'XLM, Stellar ağının yerel kripto para birimidir.',

    'quests.stellar_fundamentals.q3.question': 'Stellar\'da "Anchors" nedir?',
    'quests.stellar_fundamentals.q3.option1': 'Konsensüs düğümleri',
    'quests.stellar_fundamentals.q3.option2': 'Geleneksel finansal sistem ile köprü kuran kuruluşlar',
    'quests.stellar_fundamentals.q3.option3': 'Mining pool\'ları',
    'quests.stellar_fundamentals.q3.option4': 'Smart contract\'lar',
    'quests.stellar_fundamentals.q3.explanation': 'Anchors, geleneksel para birimlerini Stellar ağına bağlayan güvenilir kuruluşlardır.',

    'quests.stellar_fundamentals.q4.question': 'Stellar\'da minimum hesap bakiyesi nedir?',
    'quests.stellar_fundamentals.q4.option1': '0.5 XLM',
    'quests.stellar_fundamentals.q4.option2': '1 XLM',
    'quests.stellar_fundamentals.q4.option3': '2 XLM',
    'quests.stellar_fundamentals.q4.option4': '5 XLM',
    'quests.stellar_fundamentals.q4.explanation': 'Her Stellar hesabında en az 2 XLM bulunmalıdır (base reserve).',

    'quests.stellar_fundamentals.q5.question': 'Stellar geliştiricileri için ana SDK hangi dillerde mevcuttur?',
    'quests.stellar_fundamentals.q5.option1': 'Python, Java',
    'quests.stellar_fundamentals.q5.option2': 'Go, JavaScript',
    'quests.stellar_fundamentals.q5.option3': 'Rust, C++',
    'quests.stellar_fundamentals.q5.option4': 'Python, JavaScript, Go, Java, C++',
    'quests.stellar_fundamentals.q5.explanation': 'Stellar, çoklu dil desteği ile geniş geliştirici topluluğuna hizmet verir.',

    // Quiz Questions - Soroban Smart Contracts
    'quests.soroban_smart_contracts.q1.question': 'Soroban nedir?',
    'quests.soroban_smart_contracts.q1.option1': 'Bir Stellar cüzdanı',
    'quests.soroban_smart_contracts.q1.option2': 'Stellar üzerinde bir akıllı kontrat platformu',
    'quests.soroban_smart_contracts.q1.option3': 'Bir kripto para birimi',
    'quests.soroban_smart_contracts.q1.option4': 'Bir konsensüs algoritması',
    'quests.soroban_smart_contracts.q1.explanation': 'Soroban, Stellar ağı üzerinde çalışan Turing-complete smart contract platformudur.',

    'quests.soroban_smart_contracts.q2.question': 'Soroban akıllı kontratları hangi dilde yazılır?',
    'quests.soroban_smart_contracts.q2.option1': 'Solidity',
    'quests.soroban_smart_contracts.q2.option2': 'Vyper',
    'quests.soroban_smart_contracts.q2.option3': 'Rust',
    'quests.soroban_smart_contracts.q2.option4': 'JavaScript',
    'quests.soroban_smart_contracts.q2.explanation': 'Soroban smart contract\'ları Rust programlama dili ile yazılır.',

    'quests.soroban_smart_contracts.q3.question': 'Soroban\'da "host functions" nedir?',
    'quests.soroban_smart_contracts.q3.option1': 'Ana konsensüs fonksiyonları',
    'quests.soroban_smart_contracts.q3.option2': 'Smart contract\'ların Stellar ağı ile etkileşim kurmasını sağlayan fonksiyonlar',
    'quests.soroban_smart_contracts.q3.option3': 'Mining fonksiyonları',
    'quests.soroban_smart_contracts.q3.option4': 'Wallet bağlantı fonksiyonları',
    'quests.soroban_smart_contracts.q3.explanation': 'Host functions, smart contract\'ların Stellar ledger\'ı ile güvenli etkileşim kurmasını sağlar.',

    'quests.soroban_smart_contracts.q4.question': 'Soroban\'da "storage" nasıl çalışır?',
    'quests.soroban_smart_contracts.q4.option1': 'Global state olarak',
    'quests.soroban_smart_contracts.q4.option2': 'Contract bazlı izole storage',
    'quests.soroban_smart_contracts.q4.option3': 'Shared storage',
    'quests.soroban_smart_contracts.q4.option4': 'Memory-only storage',
    'quests.soroban_smart_contracts.q4.explanation': 'Her contract kendi storage alanına sahiptir ve diğer contract\'lardan izole edilmiştir.',

    'quests.soroban_smart_contracts.q5.question': 'Soroban\'da transaction fee olarak ne kullanılır?',
    'quests.soroban_smart_contracts.q5.option1': 'ETH',
    'quests.soroban_smart_contracts.q5.option2': 'BTC',
    'quests.soroban_smart_contracts.q5.option3': 'Gas fee olarak XLM kullanılır',
    'quests.soroban_smart_contracts.q5.option4': 'Sabit ücret',
    'quests.soroban_smart_contracts.q5.explanation': 'Soroban\'da smart contract işlemleri için XLM (Stellar Lumens) gas fee olarak kullanılır.',

    // Quiz Questions - DeFi Protocols
    'quests.defi_protocols.q1.question': 'Merkeziyetsiz finans (DeFi) ne anlama gelir?',
    'quests.defi_protocols.q1.option1': 'Geleneksel bankacılık',
    'quests.defi_protocols.q1.option2': 'Blockchain tabanlı finansal hizmetler',
    'quests.defi_protocols.q1.option3': 'Merkezi borsalar',
    'quests.defi_protocols.q1.option4': 'Devlet destekli para birimleri',
    'quests.defi_protocols.q1.explanation': 'DeFi, merkezi kurumlara ihtiyaç duymadan blockchain üzerinde çalışan finansal hizmetlerdir.',

    'quests.defi_protocols.q2.question': 'Stellar\'da en popüler AMM protokolü nedir?',
    'quests.defi_protocols.q2.option1': 'Uniswap',
    'quests.defi_protocols.q2.option2': 'StellarSwap',
    'quests.defi_protocols.q2.option3': 'PancakeSwap',
    'quests.defi_protocols.q2.option4': 'SushiSwap',
    'quests.defi_protocols.q2.explanation': 'StellarSwap, Stellar ekosisteminin ana AMM protokolüdür.',

    'quests.defi_protocols.q3.question': 'DeFi\'de "yield farming" nedir?',
    'quests.defi_protocols.q3.option1': 'Tarım arazisi yönetimi',
    'quests.defi_protocols.q3.option2': 'Likidite sağlayarak token ödülleri kazanma',
    'quests.defi_protocols.q3.option3': 'Kripto madenciliği',
    'quests.defi_protocols.q3.option4': 'Staking işlemi',
    'quests.defi_protocols.q3.explanation': 'Yield farming, likidite pool\'larına fon sağlayarak ödül token\'ları kazanma stratejisidir.',

    'quests.defi_protocols.q4.question': 'DeFi\'de "impermanent loss" nedir?',
    'quests.defi_protocols.q4.option1': 'Kalıcı fon kaybı',
    'quests.defi_protocols.q4.option2': 'Likidite sağlarken token fiyat değişimlerinden kaynaklanan kayıp',
    'quests.defi_protocols.q4.option3': 'Hack kaybı',
    'quests.defi_protocols.q4.option4': 'Gas fee kaybı',
    'quests.defi_protocols.q4.explanation': 'Impermanent loss, AMM pool\'larında likidite sağlarken token fiyat değişimlerinden kaynaklanan geçici kayıptır.',

    'quests.defi_protocols.q5.question': 'AMM protokolü ne anlama gelir?',
    'quests.defi_protocols.q5.option1': 'Automated Market Maker protokolü',
    'quests.defi_protocols.q5.option2': 'Asset Management Module',
    'quests.defi_protocols.q5.option3': 'Advanced Money Market',
    'quests.defi_protocols.q5.option4': 'Automated Mining Machine',
    'quests.defi_protocols.q5.explanation': 'AMM, merkeziyetsiz borsalarda likidite sağlayarak otomatik fiyat belirleme yapan protokoldür.',

    // Quiz Questions - NFT Ecosystem
    'quests.nft_ecosystem.q1.question': 'NFT\'nin açılımı nedir?',
    'quests.nft_ecosystem.q1.option1': 'Non-Fungible Token',
    'quests.nft_ecosystem.q1.option2': 'New Financial Technology',
    'quests.nft_ecosystem.q1.option3': 'Network File Transfer',
    'quests.nft_ecosystem.q1.option4': 'Next Future Technology',
    'quests.nft_ecosystem.q1.explanation': 'NFT, benzersiz ve değiştirilemez dijital varlıkları temsil eden token\'lardır.',

    'quests.nft_ecosystem.q2.question': 'Stellar\'da NFT\'ler hangi standarda göre oluşturulur?',
    'quests.nft_ecosystem.q2.option1': 'ERC-721',
    'quests.nft_ecosystem.q2.option2': 'ERC-1155',
    'quests.nft_ecosystem.q2.option3': 'SEP-005',
    'quests.nft_ecosystem.q2.option4': 'Stellar NFT Standard',
    'quests.nft_ecosystem.q2.explanation': 'SEP-005, Stellar\'ın NFT standardıdır.',

    'quests.nft_ecosystem.q3.question': 'NFT\'lerin "metadata"\'sı nerede saklanır?',
    'quests.nft_ecosystem.q3.option1': 'Blockchain\'de',
    'quests.nft_ecosystem.q3.option2': 'IPFS\'de',
    'quests.nft_ecosystem.q3.option3': 'Merkezi sunucularda',
    'quests.nft_ecosystem.q3.option4': 'Local storage\'da',
    'quests.nft_ecosystem.q3.explanation': 'NFT metadata\'ları genellikle merkeziyetsiz IPFS ağında saklanır.',

    'quests.nft_ecosystem.q4.question': 'NFT\'lerin benzersizliği nasıl sağlanır?',
    'quests.nft_ecosystem.q4.option1': 'Metadata hash ile',
    'quests.nft_ecosystem.q4.option2': 'Sıralı numara ile',
    'quests.nft_ecosystem.q4.option3': 'Renk kodu ile',
    'quests.nft_ecosystem.q4.option4': 'Boyut ile',
    'quests.nft_ecosystem.q4.explanation': 'NFT\'lerin benzersizliği metadata\'nın hash değeri ile sağlanır.',

    'quests.nft_ecosystem.q5.question': 'SEP-005 nedir?',
    'quests.nft_ecosystem.q5.option1': 'Stellar\'ın yerel NFT standardı',
    'quests.nft_ecosystem.q5.option2': 'Bir token standardı',
    'quests.nft_ecosystem.q5.option3': 'Bir consensus algoritması',
    'quests.nft_ecosystem.q5.option4': 'Bir cüzdan protokolü',
    'quests.nft_ecosystem.q5.explanation': 'SEP-005, Stellar ağında NFT\'lerin oluşturulması ve yönetimi için standart protokoldür.',

    // Quiz Questions - Advanced Stellar
    'quests.advanced_stellar.q1.question': 'Stellar\'da "multi-signature" nedir?',
    'quests.advanced_stellar.q1.option1': 'Çoklu imza gerektiren işlemler',
    'quests.advanced_stellar.q1.option2': 'Çoklu token transferi',
    'quests.advanced_stellar.q1.option3': 'Çoklu hesap yönetimi',
    'quests.advanced_stellar.q1.option4': 'Çoklu network bağlantısı',
    'quests.advanced_stellar.q1.explanation': 'Multi-sig, bir işlemin onaylanması için birden fazla imza gerektiren güvenlik mekanizmasıdır.',

    'quests.advanced_stellar.q2.question': 'Stellar\'da "path payment" nedir?',
    'quests.advanced_stellar.q2.option1': 'Direkt ödeme',
    'quests.advanced_stellar.q2.option2': 'Farklı asset\'ler arasında otomatik dönüşüm yapan ödeme',
    'quests.advanced_stellar.q2.option3': 'Batch ödeme',
    'quests.advanced_stellar.q2.option4': 'Scheduled ödeme',
    'quests.advanced_stellar.q2.explanation': 'Path payment, alıcının istediği asset\'i, göndericinin sahip olduğu asset\'ten otomatik olarak dönüştürerek gönderir.',

    'quests.advanced_stellar.q3.question': 'Stellar\'da "operation" ve "transaction" arasındaki fark nedir?',
    'quests.advanced_stellar.q3.option1': 'Aynı şeyler',
    'quests.advanced_stellar.q3.option2': 'Transaction birden fazla operation içerebilir',
    'quests.advanced_stellar.q3.option3': 'Operation birden fazla transaction içerebilir',
    'quests.advanced_stellar.q3.option4': 'Farklı network\'lerde çalışırlar',
    'quests.advanced_stellar.q3.explanation': 'Bir transaction içinde birden fazla operation bulunabilir ve hepsi atomik olarak işlenir.',

    'quests.advanced_stellar.q4.question': 'Path payment\'in avantajı nedir?',
    'quests.advanced_stellar.q4.option1': 'Path payment ile otomatik dönüşüm',
    'quests.advanced_stellar.q4.option2': 'Daha hızlı işlem',
    'quests.advanced_stellar.q4.option3': 'Daha az fee',
    'quests.advanced_stellar.q4.option4': 'Daha güvenli',
    'quests.advanced_stellar.q4.explanation': 'Path payment, farklı asset\'ler arasında otomatik dönüşüm yaparak kullanıcı deneyimini kolaylaştırır.',

    'quests.advanced_stellar.q5.question': 'Multi-signature hesabın güvenlik avantajı nedir?',
    'quests.advanced_stellar.q5.option1': 'Multi-signature hesap güvenliği',
    'quests.advanced_stellar.q5.option2': 'Daha hızlı işlem',
    'quests.advanced_stellar.q5.option3': 'Daha az fee',
    'quests.advanced_stellar.q5.option4': 'Daha fazla token',
    'quests.advanced_stellar.q5.explanation': 'Multi-sig hesaplar, tek bir private key\'in tehlikeye girmesi durumunda bile fonların güvende kalmasını sağlar.',
    
    // Blockchain Güvenliği
    'quests.blockchain_security.title': 'Blockchain Güvenliği',
    'quests.blockchain_security.description': 'Blockchain ağlarındaki yaygın güvenlik açıklarını ve korunma yöntemlerini öğrenin.',
    'quests.blockchain_security.q1.question': 'Bir blockchain ağında gerçekleşen ve ağın çoğunluğunun (%51) kötü niyetli aktörler tarafından kontrol edilmesiyle işlem geçmişini değiştirebilme saldırısına ne ad verilir?',
    'quests.blockchain_security.q1.option1': 'Phishing Saldırısı',
    'quests.blockchain_security.q1.option2': 'Sybil Saldırısı',
    'quests.blockchain_security.q1.option3': '%51 Saldırısı',
    'quests.blockchain_security.q1.option4': 'DDoS Saldırısı',
    'quests.blockchain_security.q1.option5': 'Replay Saldırısı',
    'quests.blockchain_security.q1.explanation': '%51 saldırısı, ağın hash gücünün yarısından fazlasını kontrol ederek işlem geçmişini manipüle etme girişimidir.',
    'quests.blockchain_security.q2.question': 'Kullanıcıların özel anahtarlarını (private keys) güvenli bir şekilde saklamak için kullanılan fiziksel cihazlara ne denir?',
    'quests.blockchain_security.q2.option1': 'Yazılım Cüzdanı (Software Wallet)',
    'quests.blockchain_security.q2.option2': 'Donanım Cüzdanı (Hardware Wallet)',
    'quests.blockchain_security.q2.option3': 'Kağıt Cüzdan (Paper Wallet)',
    'quests.blockchain_security.q2.option4': 'Web Cüzdanı (Web Wallet)',
    'quests.blockchain_security.q2.option5': 'Mobil Cüzdan (Mobile Wallet)',
    'quests.blockchain_security.q2.explanation': 'Donanım cüzdanları, private key\'leri güvenli bir fiziksel cihazda saklar ve en güvenli saklama yöntemidir.',
    'quests.blockchain_security.q3.question': 'Akıllı kontratlarda (smart contracts) en sık rastlanan güvenlik açıklarından biri olan ve bir fonksiyonun beklenmedik şekilde tekrar tekrar çağrılmasına yol açan zafiyet hangisidir?',
    'quests.blockchain_security.q3.option1': 'Timestamp Dependence',
    'quests.blockchain_security.q3.option2': 'Gas Limit Sorunları',
    'quests.blockchain_security.q3.option3': 'Reentrancy (Yeniden Giriş)',
    'quests.blockchain_security.q3.option4': 'Integer Overflow/Underflow',
    'quests.blockchain_security.q3.option5': 'Front-running',
    'quests.blockchain_security.q3.explanation': 'Reentrancy, bir kontratın fonksiyonu tamamlanmadan önce tekrar çağrılabilmesi durumudur ve ciddi güvenlik riski oluşturur.',
    'quests.blockchain_security.q4.question': 'Aşağıdakilerden hangisi blockchain güvenliğini artırmaya yönelik bir yöntemdir?',
    'quests.blockchain_security.q4.option1': 'Çoklu İmza (Multi-Signature)',
    'quests.blockchain_security.q4.option2': 'Özel Anahtarı Paylaşmak',
    'quests.blockchain_security.q4.option3': 'Güvenilmeyen Wi-Fi Ağlarını Kullanmak',
    'quests.blockchain_security.q4.option4': 'Yazılım Güncellemelerini Yapmamak',
    'quests.blockchain_security.q4.option5': 'Basit Şifreler Kullanmak',
    'quests.blockchain_security.q4.explanation': 'Multi-signature, birden fazla imza gerektirerek güvenliği artırır.',
    'quests.blockchain_security.q5.question': 'Bir işlemin blockchain\'e eklenmeden önce ağdaki diğer işlemlerle rekabet ederek öne geçmeye çalışmasına ne denir?',
    'quests.blockchain_security.q5.option1': 'Double Spending (Çifte Harcama)',
    'quests.blockchain_security.q5.option2': 'Sybil Attack',
    'quests.blockchain_security.q5.option3': 'Front-running',
    'quests.blockchain_security.q5.option4': 'Dusting Attack',
    'quests.blockchain_security.q5.option5': 'Man-in-the-middle Attack',
    'quests.blockchain_security.q5.explanation': 'Front-running, daha yüksek işlem ücreti ödeyerek başka bir işlemden önce bloğa girmeye çalışmaktır.',
    
    // Merkeziyetsiz Kimlik (DID)
    'quests.decentralized_identity.title': 'Merkeziyetsiz Kimlik (DID)',
    'quests.decentralized_identity.description': 'Kullanıcıların kendi kimlik verilerini kontrol etmelerini sağlayan teknolojileri keşfedin.',
    'quests.decentralized_identity.q1.question': 'Merkeziyetsiz Kimlik (DID) sistemlerinin temel amacı nedir?',
    'quests.decentralized_identity.q1.option1': 'Kimlik verilerini tek bir şirkette toplamak',
    'quests.decentralized_identity.q1.option2': 'Bireylere kendi kimlik verileri üzerinde kontrol vermek',
    'quests.decentralized_identity.q1.option3': 'Devletlerin kimlik yönetimini kolaylaştırmak',
    'quests.decentralized_identity.q1.option4': 'Kimlik doğrulama süreçlerini ortadan kaldırmak',
    'quests.decentralized_identity.q1.option5': 'Sosyal medya profillerini birleştirmek',
    'quests.decentralized_identity.q1.explanation': 'DID, bireylerin kendi kimlik verilerini kontrol etmelerini ve yönetmelerini sağlar.',
    'quests.decentralized_identity.q2.question': 'DID ile ilişkili, doğrulanabilir dijital iddiaları (örn: diploma, ehliyet) ifade eden standart hangisidir?',
    'quests.decentralized_identity.q2.option1': 'JSON-LD',
    'quests.decentralized_identity.q2.option2': 'JWT (JSON Web Token)',
    'quests.decentralized_identity.q2.option3': 'VC (Verifiable Credentials)',
    'quests.decentralized_identity.q2.option4': 'OAuth 2.0',
    'quests.decentralized_identity.q2.option5': 'SAML',
    'quests.decentralized_identity.q2.explanation': 'Verifiable Credentials (VC), doğrulanabilir dijital kimlik bilgilerini temsil eden standarttır.',
    'quests.decentralized_identity.q3.question': 'DID metodları neyi tanımlar?',
    'quests.decentralized_identity.q3.option1': 'Bir VC\'nin nasıl şifreleneceğini',
    'quests.decentralized_identity.q3.option2': 'Bir DID\'in nasıl saklanacağını',
    'quests.decentralized_identity.q3.option3': 'Bir DID belgesinin nerede bulunacağını',
    'quests.decentralized_identity.q3.option4': 'Belirli bir DID\'in nasıl oluşturulacağını, çözüleceğini, güncelleneceğini ve devre dışı bırakılacağını',
    'quests.decentralized_identity.q3.option5': 'Kimlik sağlayıcıların listesini',
    'quests.decentralized_identity.q3.explanation': 'DID metodları, bir DID\'in yaşam döngüsü boyunca nasıl yönetileceğini belirtir.',
    'quests.decentralized_identity.q4.question': 'Kendine Egemen Kimlik (Self-Sovereign Identity - SSI) kavramı en iyi nasıl açıklanır?',
    'quests.decentralized_identity.q4.option1': 'Kimliğinizin devlet tarafından yönetilmesi',
    'quests.decentralized_identity.q4.option2': 'Bireyin dijital kimliği üzerinde tam kontrol ve sahipliğe sahip olması',
    'quests.decentralized_identity.q4.option3': 'Tüm kimlik bilgilerinin halka açık olması',
    'quests.decentralized_identity.q4.option4': 'Şirketlerin kullanıcı kimliklerini paylaşması',
    'quests.decentralized_identity.q4.option5': 'Tek bir kullanıcı adı ve şifre ile her yere giriş yapabilme',
    'quests.decentralized_identity.q4.explanation': 'SSI, bireyin kendi dijital kimliğini tamamen kontrol etmesini sağlar.',
    'quests.decentralized_identity.q5.question': 'DID belgeleri genellikle nerede saklanır veya kaydedilir?',
    'quests.decentralized_identity.q5.option1': 'Merkezi bir veritabanında',
    'quests.decentralized_identity.q5.option2': 'Kullanıcının e-posta hesabında',
    'quests.decentralized_identity.q5.option3': 'Merkeziyetsiz bir defterde (blockchain gibi) veya P2P ağlarda',
    'quests.decentralized_identity.q5.option4': 'Sosyal medya platformlarında',
    'quests.decentralized_identity.q5.option5': 'Sadece donanım cüzdanlarında',
    'quests.decentralized_identity.q5.explanation': 'DID belgeleri, blockchain veya P2P ağlar gibi merkeziyetsiz sistemlerde saklanır.',
    
    // Layer 2 Ölçeklendirme Çözümleri
    'quests.layer2_scaling.title': 'Layer 2 Ölçeklendirme Çözümleri',
    'quests.layer2_scaling.description': 'Blockchain ağlarının hızını ve kapasitesini artıran Layer 2 teknolojilerini anlayın.',
    'quests.layer2_scaling.q1.question': 'Layer 2 ölçeklendirme çözümlerinin temel amacı nedir?',
    'quests.layer2_scaling.q1.option1': 'Blockchain\'in güvenliğini artırmak',
    'quests.layer2_scaling.q1.option2': 'İşlem hızını artırmak ve maliyetleri düşürmek',
    'quests.layer2_scaling.q1.option3': 'Merkeziyetsizliği azaltmak',
    'quests.layer2_scaling.q1.option4': 'Yeni kripto paralar yaratmak',
    'quests.layer2_scaling.q1.option5': 'Veri depolama kapasitesini artırmak',
    'quests.layer2_scaling.q1.explanation': 'Layer 2 çözümleri, işlem hızını artırarak ve maliyetleri düşürerek blockchain ölçeklenebilirliğini artırır.',
    'quests.layer2_scaling.q2.question': 'Aşağıdakilerden hangisi popüler bir Layer 2 ölçeklendirme tekniğidir?',
    'quests.layer2_scaling.q2.option1': 'Proof of Work',
    'quests.layer2_scaling.q2.option2': 'Sharding',
    'quests.layer2_scaling.q2.option3': 'Rollups (Optimistic & ZK)',
    'quests.layer2_scaling.q2.option4': 'Hard Fork',
    'quests.layer2_scaling.q2.option5': 'ASIC Madenciliği',
    'quests.layer2_scaling.q2.explanation': 'Rollups, işlemleri Layer 2\'de gruplar ve Layer 1\'e özet olarak gönderir.',
    'quests.layer2_scaling.q3.question': 'Optimistic Rollup\'lar güvenliklerini nasıl sağlar?',
    'quests.layer2_scaling.q3.option1': 'Sıfır bilgi ispatları kullanarak',
    'quests.layer2_scaling.q3.option2': 'Sahtekarlık ispatları (fraud proofs) ve bir itiraz süresi kullanarak',
    'quests.layer2_scaling.q3.option3': 'Her işlemi Layer 1\'de doğrulayarak',
    'quests.layer2_scaling.q3.option4': 'Merkezi bir sıralayıcı kullanarak',
    'quests.layer2_scaling.q3.option5': 'Plazma zincirleri kullanarak',
    'quests.layer2_scaling.q3.explanation': 'Optimistic Rollups, işlemlerin doğru olduğunu varsayar ve itiraz süresi içinde sahtekarlık ispatı bekler.',
    'quests.layer2_scaling.q4.question': 'ZK-Rollup (Zero-Knowledge Rollup) teknolojisinin temel avantajı nedir?',
    'quests.layer2_scaling.q4.option1': 'Daha basit uygulama',
    'quests.layer2_scaling.q4.option2': 'Daha düşük Layer 1 veri maliyeti',
    'quests.layer2_scaling.q4.option3': 'Sahtekarlık ispatlarına gerek duymadan kriptografik geçerlilik ispatları sunması',
    'quests.layer2_scaling.q4.option4': 'Daha uzun itiraz süresi',
    'quests.layer2_scaling.q4.option5': 'Merkeziyetsiz uygulamalarla uyumsuz olması',
    'quests.layer2_scaling.q4.explanation': 'ZK-Rollups, sıfır bilgi ispatları kullanarak işlemleri matematiksel olarak doğrular.',
    'quests.layer2_scaling.q5.question': 'State Channels (Durum Kanalları) hangi tür uygulamalar için daha uygundur?',
    'quests.layer2_scaling.q5.option1': 'Nadiren etkileşimde bulunan kullanıcılar için',
    'quests.layer2_scaling.q5.option2': 'Çok sayıda katılımcı arasında sık sık yapılan küçük işlemler için',
    'quests.layer2_scaling.q5.option3': 'Karmaşık akıllı kontrat etkileşimleri için',
    'quests.layer2_scaling.q5.option4': 'İki katılımcı arasında yüksek frekanslı işlemler için (örn: oyunlar, ödemeler)',
    'quests.layer2_scaling.q5.option5': 'Token takasları için',
    'quests.layer2_scaling.q5.explanation': 'State Channels, iki taraf arasında off-chain işlemler için idealdir.',
    
    // Web3 Geliştirme Temelleri
    'quests.web3_dev_basics.title': 'Web3 Geliştirme Temelleri',
    'quests.web3_dev_basics.description': 'Merkeziyetsiz uygulamalar (dApps) oluşturmak için kullanılan temel araçları ve kavramları öğrenin.',
    'quests.web3_dev_basics.q1.question': 'Bir dApp (Merkeziyetsiz Uygulama) ile geleneksel bir web uygulaması arasındaki temel fark nedir?',
    'quests.web3_dev_basics.q1.option1': 'dApp\'ler mobil cihazlarda çalışmaz',
    'quests.web3_dev_basics.q1.option2': 'dApp\'ler daha hızlıdır',
    'quests.web3_dev_basics.q1.option3': 'dApp\'lerin backend\'i merkezi olmayan bir ağ (blockchain) üzerinde çalışır',
    'quests.web3_dev_basics.q1.option4': 'dApp\'ler veritabanı kullanmaz',
    'quests.web3_dev_basics.q1.option5': 'dApp\'lerin kullanıcı arayüzü yoktur',
    'quests.web3_dev_basics.q1.explanation': 'dApp\'lerin backend\'i blockchain üzerinde çalışır ve merkeziyetsizdir.',
    'quests.web3_dev_basics.q2.question': 'Ethereum gibi EVM uyumlu blockchain\'lerle etkileşim kurmak için yaygın olarak kullanılan JavaScript kütüphanesi hangisidir?',
    'quests.web3_dev_basics.q2.option1': 'jQuery',
    'quests.web3_dev_basics.q2.option2': 'Ethers.js veya Web3.js',
    'quests.web3_dev_basics.q2.option3': 'React',
    'quests.web3_dev_basics.q2.option4': 'Node.js',
    'quests.web3_dev_basics.q2.option5': 'Axios',
    'quests.web3_dev_basics.q2.explanation': 'Ethers.js ve Web3.js, blockchain ile etkileşim için kullanılan popüler kütüphanelerdir.',
    'quests.web3_dev_basics.q3.question': 'Kullanıcıların tarayıcıları üzerinden dApp\'lerle etkileşim kurmasını sağlayan ve cüzdan görevi gören popüler tarayıcı eklentisi hangisidir?',
    'quests.web3_dev_basics.q3.option1': 'AdBlock',
    'quests.web3_dev_basics.q3.option2': 'Google Translate',
    'quests.web3_dev_basics.q3.option3': 'MetaMask',
    'quests.web3_dev_basics.q3.option4': 'LastPass',
    'quests.web3_dev_basics.q3.option5': 'Grammarly',
    'quests.web3_dev_basics.q3.explanation': 'MetaMask, en popüler browser wallet ve dApp bağlantı aracıdır.',
    'quests.web3_dev_basics.q4.question': 'Merkeziyetsiz dosya depolama için kullanılan, içeriğe dayalı adresleme yapan P2P protokolü hangisidir?',
    'quests.web3_dev_basics.q4.option1': 'HTTP',
    'quests.web3_dev_basics.q4.option2': 'FTP',
    'quests.web3_dev_basics.q4.option3': 'BitTorrent',
    'quests.web3_dev_basics.q4.option4': 'IPFS (InterPlanetary File System)',
    'quests.web3_dev_basics.q4.option5': 'SMTP',
    'quests.web3_dev_basics.q4.explanation': 'IPFS, merkeziyetsiz dosya depolama ve paylaşım için kullanılan protokoldür.',
    'quests.web3_dev_basics.q5.question': 'Akıllı kontratlar (smart contracts) genellikle hangi amaçla kullanılır?',
    'quests.web3_dev_basics.q5.option1': 'Web sitesi tasarlamak için',
    'quests.web3_dev_basics.q5.option2': 'Veritabanı yönetmek için',
    'quests.web3_dev_basics.q5.option3': 'Belirli koşullar sağlandığında otomatik olarak çalışan, değiştirilemez anlaşmalar oluşturmak için',
    'quests.web3_dev_basics.q5.option4': 'Kullanıcı arayüzleri oluşturmak için',
    'quests.web3_dev_basics.q5.option5': 'Sunucu yönetimi yapmak için',
    'quests.web3_dev_basics.q5.explanation': 'Smart contracts, koşullar sağlandığında otomatik çalışan self-executing agreements\'dır.',
  },
  en: {
    // Navigation
    'nav.connectWallet': 'Connect Wallet',
    'nav.profile': 'Profile',
    'nav.quests': 'Quests',
    'nav.leaderboard': 'Achievements',
    
    // Theme
    'theme.switchToLight': 'Switch to Light Theme',
    'theme.switchToDark': 'Switch to Dark Theme',
    
    // Home Page
    'home.title': 'Prove Your Knowledge, Win the Future.',
    'home.subtitle': 'Complete unique quests on the Stellar blockchain with ChainQuest, earn valuable token rewards and immortalize your skills with non-transferable Soulbound Token certificates.',
    'home.startAdventure': 'Start Your Adventure!',
    'home.connected': 'Connected',
    'home.useWithoutWallet': 'Use Without Wallet',
    'home.demoMode': 'Demo Mode',
    
    // Features Section
    'features.quests': 'Interactive Quests',
    'features.rewards': 'Token Rewards',
    'features.certificates': 'NFT Certificates',
    'features.leaderboard': 'Leaderboard',
    'features.tokenRewards': 'Token Rewards',
    'features.tokenRewardsDesc': 'Earn valuable tokens with every correct answer',
    'features.competition': 'Competition',
    'features.competitionDesc': 'Compete with other users and climb the leaderboard',

    // Entry Page Process Section
    'entrypage.process.title': 'How It Works?',
    'entrypage.process.subtitle': 'Develop your blockchain knowledge, earn tokens and get unique certificates',
    'entrypage.features.learn.title': 'Learn',
    'entrypage.features.learn.desc': 'Gain comprehensive knowledge about blockchain technologies and become an expert',
    'entrypage.features.earn.title': 'Earn',
    'entrypage.features.earn.desc': 'Complete quests and earn valuable token rewards',
    'entrypage.features.certify.title': 'Certify',
    'entrypage.features.certify.desc': 'Immortalize your skills with unique NFT certificates',

    // Mobile Warnings
    'warnings.mobileTitle': 'Mobile Notice',
    'warnings.mobileClaim': 'Please log in from a desktop browser to transfer your tokens to your wallet.',

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

    // Profile Page
    'profile.totalEarned': 'Total Earned',
    'profile.claimableBalance': 'Claimable Balance',
    'profile.completedQuests': 'Completed Quests',
    'profile.certificates': 'Certificates',
    'profile.claimButton': 'Transfer to Account',
    'profile.overview': 'Overview',
    'profile.achievements': 'Achievements',
    'profile.progressChart': 'Progress Chart',
    'profile.chartPlaceholder': 'Chart will appear here',
    'profile.yourCertificates': 'Your Certificates',
    'profile.certificatePrefix': 'Certificate:',
    'profile.yourAchievements': 'Your Achievements',
    'profile.questCompleted': 'Quest Completed',
    'profile.recentAchievements': 'Recent Achievements',
    'profile.connectWalletForAchievements': 'Connect your wallet to view your achievements.',

    // Token Messages
    'token.successfullyTransferred': 'Tokens Successfully Transferred!',
    'token.transferError': 'Token Transfer Error',
    'token.transferredToWallet': 'tokens transferred to your Stellar wallet. Transaction Hash:',
    'token.claimSuccess': 'Tokens Successfully Transferred!',

    // Profile Tabs
    'profile.tabs.dashboard': 'Dashboard',
    'profile.tabs.activity': 'Activity',

    // Profile Dashboard
    'profile.dashboard.loadingError': 'Dashboard data could not be loaded',
    'profile.dashboard.retry': 'Try Again',
    'profile.dashboard.recentActivities': 'Recent Activities',
    'profile.dashboard.activity': 'Activity',

    // Profile Stats
    'profile.stats.claimSuccess': 'Tokens Successfully Transferred!',

    // Quest Messages
    'quest.alreadyCompleted': 'You have already successfully completed this quest. Return to the main page to discover new quests.',
    'quest.dashboardDataError': 'Dashboard data loading error:',

    // Profile Streak Information
    'profile.streak.title': 'Streak Information',
    'profile.streak.daily': 'Daily Streak',
    'profile.streak.best': 'Best Streak',
    'profile.streak.lastActive': 'Last Active',
    'profile.streak.unknown': 'Unknown',
    'profile.streak.dayUnit': 'day',

    // Profile Token Statistics
    'profile.tokenStats.title': 'Token Statistics',
    'profile.tokenStats.withdrawn': 'Withdrawn to Wallet',

    // Common
    'common.unknown': 'Unknown',
    'common.dayUnit': 'day',
    'common.or': 'or',

      // Demo Mode
      'demo.claimError.title': 'Wallet Connection Required',
      'demo.claimError.message': 'Please connect a wallet to transfer your tokens.',
      'demo.statsLocked.title': 'Statistics Locked',
      'demo.statsLocked.message': 'Please connect your wallet to view detailed statistics.',
      'demo.earnedInDemo': 'earned in demo mode',

    // Wallet Connection Required
    'wallet.connectionRequired.title': 'Wallet Connection Required',
    'wallet.connectionRequired.message': 'Wallet connection is required for token claim operation.',

    // Profile Claim Section
    'profile.claim.title': 'Transfer Your Tokens to Your Account',
    'profile.claim.description': 'tokens can be transferred to your Stellar wallet.',
    'profile.claim.transferring': 'Transferring...',
    'profile.claim.button': 'Claim',

    // Empty States
    'emptyState.certificates': 'You haven\'t earned any certificates yet. Complete quests to earn certificates!',
    'emptyState.activity': 'No activity yet.',
    'emptyState.noDescription': 'No description',
    'emptyState.noDate': 'No date',
    'achievements.emptyState': 'You haven\'t earned any achievements yet. Complete quests to earn achievements!',

    // Common
    'common.noData': 'No data',

    // Profile Claim
    'profile.claim.readyToClaim': 'Tokens ready to claim',

    // Profile Stats
    'profile.stats.perfectScore': 'Perfect score',

    // Achievements
    'achievements.achievement': 'Achievement',
    'achievements.achievementEarned': 'Achievement earned!',
    'achievements.pageTitle': 'Achievements Dashboard',
    'achievements.pageSubtitle': 'Track your personal achievements and progress.',
    'achievements.walletRequired': 'Wallet Connection Required',
    'achievements.filter.allTime': 'All Time',
    'achievements.filter.thisMonth': 'This Month',
    'achievements.filter.thisWeek': 'This Week',
    'achievements.you': 'You',
    'achievements.token': 'Token',
    'achievements.certificate': 'Certificate',
    'achievements.successfulStudent': 'Successful Student',
    'achievements.detailedStats': 'Detailed Statistics',
    'achievements.cta.title': 'Increase your achievements by completing more quests!',
    'achievements.cta.button': 'Explore Quests',

    // Quiz Questions - Stellar Fundamentals
    'quests.stellar_fundamentals.q1.question': 'What consensus algorithm is used to validate transactions in the Stellar network?',
    'quests.stellar_fundamentals.q1.option1': 'Proof of Work (PoW)',
    'quests.stellar_fundamentals.q1.option2': 'Stellar Consensus Protocol (SCP)',
    'quests.stellar_fundamentals.q1.option3': 'Proof of Stake (PoS)',
    'quests.stellar_fundamentals.q1.option4': 'Delegated Proof of Stake (DPoS)',
    'quests.stellar_fundamentals.q1.explanation': 'SCP is Stellar\'s unique federated Byzantine agreement algorithm.',

    'quests.stellar_fundamentals.q2.question': 'What is the native token of the Stellar network?',
    'quests.stellar_fundamentals.q2.option1': 'Ether',
    'quests.stellar_fundamentals.q2.option2': 'Bitcoin',
    'quests.stellar_fundamentals.q2.option3': 'XLM (Stellar Lumens)',
    'quests.stellar_fundamentals.q2.option4': 'Ripple',
    'quests.stellar_fundamentals.q2.explanation': 'XLM is the native cryptocurrency of the Stellar network.',

    'quests.stellar_fundamentals.q3.question': 'What are "Anchors" in Stellar?',
    'quests.stellar_fundamentals.q3.option1': 'Consensus nodes',
    'quests.stellar_fundamentals.q3.option2': 'Organizations that bridge traditional financial systems',
    'quests.stellar_fundamentals.q3.option3': 'Mining pools',
    'quests.stellar_fundamentals.q3.option4': 'Smart contracts',
    'quests.stellar_fundamentals.q3.explanation': 'Anchors are trusted organizations that connect traditional currencies to the Stellar network.',

    'quests.stellar_fundamentals.q4.question': 'What is the minimum account balance in Stellar?',
    'quests.stellar_fundamentals.q4.option1': '0.5 XLM',
    'quests.stellar_fundamentals.q4.option2': '1 XLM',
    'quests.stellar_fundamentals.q4.option3': '2 XLM',
    'quests.stellar_fundamentals.q4.option4': '5 XLM',
    'quests.stellar_fundamentals.q4.explanation': 'Every Stellar account must have at least 2 XLM (base reserve).',

    'quests.stellar_fundamentals.q5.question': 'What programming languages are available for Stellar SDKs?',
    'quests.stellar_fundamentals.q5.option1': 'Python, Java',
    'quests.stellar_fundamentals.q5.option2': 'Go, JavaScript',
    'quests.stellar_fundamentals.q5.option3': 'Rust, C++',
    'quests.stellar_fundamentals.q5.option4': 'Python, JavaScript, Go, Java, C++',
    'quests.stellar_fundamentals.q5.explanation': 'Stellar serves a broad developer community with multi-language support.',

    // Quiz Questions - Soroban Smart Contracts
    'quests.soroban_smart_contracts.q1.question': 'What is Soroban?',
    'quests.soroban_smart_contracts.q1.option1': 'A Stellar wallet',
    'quests.soroban_smart_contracts.q1.option2': 'A smart contract platform on Stellar',
    'quests.soroban_smart_contracts.q1.option3': 'A cryptocurrency',
    'quests.soroban_smart_contracts.q1.option4': 'A consensus algorithm',
    'quests.soroban_smart_contracts.q1.explanation': 'Soroban is a Turing-complete smart contract platform running on the Stellar network.',

    'quests.soroban_smart_contracts.q2.question': 'What programming language are Soroban smart contracts written in?',
    'quests.soroban_smart_contracts.q2.option1': 'Solidity',
    'quests.soroban_smart_contracts.q2.option2': 'Vyper',
    'quests.soroban_smart_contracts.q2.option3': 'Rust',
    'quests.soroban_smart_contracts.q2.option4': 'JavaScript',
    'quests.soroban_smart_contracts.q2.explanation': 'Soroban smart contracts are written in the Rust programming language.',

    'quests.soroban_smart_contracts.q3.question': 'What are "host functions" in Soroban?',
    'quests.soroban_smart_contracts.q3.option1': 'Main consensus functions',
    'quests.soroban_smart_contracts.q3.option2': 'Functions that enable smart contracts to interact with the Stellar network',
    'quests.soroban_smart_contracts.q3.option3': 'Mining functions',
    'quests.soroban_smart_contracts.q3.option4': 'Wallet connection functions',
    'quests.soroban_smart_contracts.q3.explanation': 'Host functions enable smart contracts to securely interact with the Stellar ledger.',

    'quests.soroban_smart_contracts.q4.question': 'How does "storage" work in Soroban?',
    'quests.soroban_smart_contracts.q4.option1': 'As global state',
    'quests.soroban_smart_contracts.q4.option2': 'Contract-based isolated storage',
    'quests.soroban_smart_contracts.q4.option3': 'Shared storage',
    'quests.soroban_smart_contracts.q4.option4': 'Memory-only storage',
    'quests.soroban_smart_contracts.q4.explanation': 'Each contract has its own storage space and is isolated from other contracts.',

    'quests.soroban_smart_contracts.q5.question': 'What is used as transaction fee in Soroban?',
    'quests.soroban_smart_contracts.q5.option1': 'ETH',
    'quests.soroban_smart_contracts.q5.option2': 'BTC',
    'quests.soroban_smart_contracts.q5.option3': 'XLM is used as gas fee',
    'quests.soroban_smart_contracts.q5.option4': 'Fixed fee',
    'quests.soroban_smart_contracts.q5.explanation': 'XLM (Stellar Lumens) is used as gas fee for smart contract operations in Soroban.',

    // Quiz Questions - DeFi Protocols
    'quests.defi_protocols.q1.question': 'What does Decentralized Finance (DeFi) mean?',
    'quests.defi_protocols.q1.option1': 'Traditional banking',
    'quests.defi_protocols.q1.option2': 'Blockchain-based financial services',
    'quests.defi_protocols.q1.option3': 'Centralized exchanges',
    'quests.defi_protocols.q1.option4': 'Government-backed currencies',
    'quests.defi_protocols.q1.explanation': 'DeFi refers to financial services that operate on blockchain without requiring central institutions.',

    'quests.defi_protocols.q2.question': 'What is the most popular AMM protocol on Stellar?',
    'quests.defi_protocols.q2.option1': 'Uniswap',
    'quests.defi_protocols.q2.option2': 'StellarSwap',
    'quests.defi_protocols.q2.option3': 'PancakeSwap',
    'quests.defi_protocols.q2.option4': 'SushiSwap',
    'quests.defi_protocols.q2.explanation': 'StellarSwap is the main AMM protocol in the Stellar ecosystem.',

    'quests.defi_protocols.q3.question': 'What is "yield farming" in DeFi?',
    'quests.defi_protocols.q3.option1': 'Agricultural land management',
    'quests.defi_protocols.q3.option2': 'Earning token rewards by providing liquidity',
    'quests.defi_protocols.q3.option3': 'Cryptocurrency mining',
    'quests.defi_protocols.q3.option4': 'Staking operation',
    'quests.defi_protocols.q3.explanation': 'Yield farming is a strategy of earning reward tokens by providing funds to liquidity pools.',

    'quests.defi_protocols.q4.question': 'What is "impermanent loss" in DeFi?',
    'quests.defi_protocols.q4.option1': 'Permanent fund loss',
    'quests.defi_protocols.q4.option2': 'Loss arising from token price changes while providing liquidity',
    'quests.defi_protocols.q4.option3': 'Hack loss',
    'quests.defi_protocols.q4.option4': 'Gas fee loss',
    'quests.defi_protocols.q4.explanation': 'Impermanent loss is a temporary loss that occurs from token price changes when providing liquidity in AMM pools.',

    'quests.defi_protocols.q5.question': 'What does AMM protocol stand for?',
    'quests.defi_protocols.q5.option1': 'Automated Market Maker protocol',
    'quests.defi_protocols.q5.option2': 'Asset Management Module',
    'quests.defi_protocols.q5.option3': 'Advanced Money Market',
    'quests.defi_protocols.q5.option4': 'Automated Mining Machine',
    'quests.defi_protocols.q5.explanation': 'AMM is a protocol that provides liquidity in decentralized exchanges for automatic price determination.',

    // Quiz Questions - NFT Ecosystem
    'quests.nft_ecosystem.q1.question': 'What does NFT stand for?',
    'quests.nft_ecosystem.q1.option1': 'Non-Fungible Token',
    'quests.nft_ecosystem.q1.option2': 'New Financial Technology',
    'quests.nft_ecosystem.q1.option3': 'Network File Transfer',
    'quests.nft_ecosystem.q1.option4': 'Next Future Technology',
    'quests.nft_ecosystem.q1.explanation': 'NFTs are tokens that represent unique and non-interchangeable digital assets.',

    'quests.nft_ecosystem.q2.question': 'What standard are NFTs created according to on Stellar?',
    'quests.nft_ecosystem.q2.option1': 'ERC-721',
    'quests.nft_ecosystem.q2.option2': 'ERC-1155',
    'quests.nft_ecosystem.q2.option3': 'SEP-005',
    'quests.nft_ecosystem.q2.option4': 'Stellar NFT Standard',
    'quests.nft_ecosystem.q2.explanation': 'SEP-005 is Stellar\'s NFT standard.',

    'quests.nft_ecosystem.q3.question': 'Where is NFT "metadata" stored?',
    'quests.nft_ecosystem.q3.option1': 'On the blockchain',
    'quests.nft_ecosystem.q3.option2': 'On IPFS',
    'quests.nft_ecosystem.q3.option3': 'On centralized servers',
    'quests.nft_ecosystem.q3.option4': 'In local storage',
    'quests.nft_ecosystem.q3.explanation': 'NFT metadata is typically stored on the decentralized IPFS network.',

    'quests.nft_ecosystem.q4.question': 'How is the uniqueness of NFTs ensured?',
    'quests.nft_ecosystem.q4.option1': 'Through metadata hash',
    'quests.nft_ecosystem.q4.option2': 'Through sequential numbering',
    'quests.nft_ecosystem.q4.option3': 'Through color codes',
    'quests.nft_ecosystem.q4.option4': 'Through size',
    'quests.nft_ecosystem.q4.explanation': 'The uniqueness of NFTs is ensured through the hash value of the metadata.',

    'quests.nft_ecosystem.q5.question': 'What is SEP-005?',
    'quests.nft_ecosystem.q5.option1': 'Stellar\'s native NFT standard',
    'quests.nft_ecosystem.q5.option2': 'A token standard',
    'quests.nft_ecosystem.q5.option3': 'A consensus algorithm',
    'quests.nft_ecosystem.q5.option4': 'A wallet protocol',
    'quests.nft_ecosystem.q5.explanation': 'SEP-005 is the standard protocol for creating and managing NFTs on the Stellar network.',

    // Quiz Questions - Advanced Stellar
    'quests.advanced_stellar.q1.question': 'What is "multi-signature" in Stellar?',
    'quests.advanced_stellar.q1.option1': 'Transactions requiring multiple signatures',
    'quests.advanced_stellar.q1.option2': 'Multiple token transfers',
    'quests.advanced_stellar.q1.option3': 'Multiple account management',
    'quests.advanced_stellar.q1.option4': 'Multiple network connections',
    'quests.advanced_stellar.q1.explanation': 'Multi-sig is a security mechanism that requires multiple signatures to approve a transaction.',

    'quests.advanced_stellar.q2.question': 'What is "path payment" in Stellar?',
    'quests.advanced_stellar.q2.option1': 'Direct payment',
    'quests.advanced_stellar.q2.option2': 'Payment that automatically converts between different assets',
    'quests.advanced_stellar.q2.option3': 'Batch payment',
    'quests.advanced_stellar.q2.option4': 'Scheduled payment',
    'quests.advanced_stellar.q2.explanation': 'Path payment automatically converts the asset the sender has to the asset the recipient wants.',

    'quests.advanced_stellar.q3.question': 'What is the difference between "operation" and "transaction" in Stellar?',
    'quests.advanced_stellar.q3.option1': 'They are the same thing',
    'quests.advanced_stellar.q3.option2': 'A transaction can contain multiple operations',
    'quests.advanced_stellar.q3.option3': 'An operation can contain multiple transactions',
    'quests.advanced_stellar.q3.option4': 'They work on different networks',
    'quests.advanced_stellar.q3.explanation': 'A transaction can contain multiple operations and they are all processed atomically.',

    'quests.advanced_stellar.q4.question': 'What is the advantage of path payment?',
    'quests.advanced_stellar.q4.option1': 'Automatic conversion with path payment',
    'quests.advanced_stellar.q4.option2': 'Faster transaction',
    'quests.advanced_stellar.q4.option3': 'Lower fees',
    'quests.advanced_stellar.q4.option4': 'More secure',
    'quests.advanced_stellar.q4.explanation': 'Path payment improves user experience by automatically converting between different assets.',

    'quests.advanced_stellar.q5.question': 'What is the security advantage of multi-signature accounts?',
    'quests.advanced_stellar.q5.option1': 'Multi-signature account security',
    'quests.advanced_stellar.q5.option2': 'Faster transactions',
    'quests.advanced_stellar.q5.option3': 'Lower fees',
    'quests.advanced_stellar.q5.option4': 'More tokens',
    'quests.advanced_stellar.q5.explanation': 'Multi-sig accounts ensure funds remain secure even if a single private key is compromised.',
    
    // Blockchain Security
    'quests.blockchain_security.title': 'Blockchain Security',
    'quests.blockchain_security.description': 'Learn about common vulnerabilities in blockchain networks and methods for protection.',
    'quests.blockchain_security.q1.question': 'What is the name of the attack where malicious actors control the majority (51%) of a blockchain network\'s hashing power to alter transaction history?',
    'quests.blockchain_security.q1.option1': 'Phishing Attack',
    'quests.blockchain_security.q1.option2': 'Sybil Attack',
    'quests.blockchain_security.q1.option3': '51% Attack',
    'quests.blockchain_security.q1.option4': 'DDoS Attack',
    'quests.blockchain_security.q1.option5': 'Replay Attack',
    'quests.blockchain_security.q1.explanation': 'A 51% attack occurs when an entity controls more than half of the network\'s hashing power, potentially allowing them to manipulate transaction history.',
    'quests.blockchain_security.q2.question': 'What are the physical devices used to securely store users\' private keys called?',
    'quests.blockchain_security.q2.option1': 'Software Wallet',
    'quests.blockchain_security.q2.option2': 'Hardware Wallet',
    'quests.blockchain_security.q2.option3': 'Paper Wallet',
    'quests.blockchain_security.q2.option4': 'Web Wallet',
    'quests.blockchain_security.q2.option5': 'Mobile Wallet',
    'quests.blockchain_security.q2.explanation': 'Hardware wallets store private keys in a secure physical device and are the most secure storage method.',
    'quests.blockchain_security.q3.question': 'Which common smart contract vulnerability allows a function to be called repeatedly in an unexpected way?',
    'quests.blockchain_security.q3.option1': 'Timestamp Dependence',
    'quests.blockchain_security.q3.option2': 'Gas Limit Issues',
    'quests.blockchain_security.q3.option3': 'Reentrancy',
    'quests.blockchain_security.q3.option4': 'Integer Overflow/Underflow',
    'quests.blockchain_security.q3.option5': 'Front-running',
    'quests.blockchain_security.q3.explanation': 'Reentrancy occurs when a contract\'s function can be called again before the first call completes, creating a serious security risk.',
    'quests.blockchain_security.q4.question': 'Which of the following is a method to enhance blockchain security?',
    'quests.blockchain_security.q4.option1': 'Multi-Signature',
    'quests.blockchain_security.q4.option2': 'Sharing Private Keys',
    'quests.blockchain_security.q4.option3': 'Using Untrusted Wi-Fi Networks',
    'quests.blockchain_security.q4.option4': 'Skipping Software Updates',
    'quests.blockchain_security.q4.option5': 'Using Simple Passwords',
    'quests.blockchain_security.q4.explanation': 'Multi-signature requires multiple signatures, enhancing security.',
    'quests.blockchain_security.q5.question': 'What is the term for trying to get a transaction included in a block ahead of other pending transactions, often by paying a higher fee?',
    'quests.blockchain_security.q5.option1': 'Double Spending',
    'quests.blockchain_security.q5.option2': 'Sybil Attack',
    'quests.blockchain_security.q5.option3': 'Front-running',
    'quests.blockchain_security.q5.option4': 'Dusting Attack',
    'quests.blockchain_security.q5.option5': 'Man-in-the-middle Attack',
    'quests.blockchain_security.q5.explanation': 'Front-running is paying a higher transaction fee to get included in a block before another transaction.',
    
    // Decentralized Identity (DID)
    'quests.decentralized_identity.title': 'Decentralized Identity (DID)',
    'quests.decentralized_identity.description': 'Explore technologies that allow users to control their own identity data.',
    'quests.decentralized_identity.q1.question': 'What is the primary goal of Decentralized Identity (DID) systems?',
    'quests.decentralized_identity.q1.option1': 'To centralize identity data within a single company',
    'quests.decentralized_identity.q1.option2': 'To give individuals control over their own identity data',
    'quests.decentralized_identity.q1.option3': 'To simplify government identity management',
    'quests.decentralized_identity.q1.option4': 'To eliminate identity verification processes',
    'quests.decentralized_identity.q1.option5': 'To merge social media profiles',
    'quests.decentralized_identity.q1.explanation': 'DID allows individuals to control and manage their own identity data.',
    'quests.decentralized_identity.q2.question': 'Which standard, associated with DIDs, represents verifiable digital claims (e.g., diplomas, licenses)?',
    'quests.decentralized_identity.q2.option1': 'JSON-LD',
    'quests.decentralized_identity.q2.option2': 'JWT (JSON Web Token)',
    'quests.decentralized_identity.q2.option3': 'VC (Verifiable Credentials)',
    'quests.decentralized_identity.q2.option4': 'OAuth 2.0',
    'quests.decentralized_identity.q2.option5': 'SAML',
    'quests.decentralized_identity.q2.explanation': 'Verifiable Credentials (VC) is the standard for representing verifiable digital identity information.',
    'quests.decentralized_identity.q3.question': 'What do DID methods define?',
    'quests.decentralized_identity.q3.option1': 'How to encrypt a VC',
    'quests.decentralized_identity.q3.option2': 'How to store a DID',
    'quests.decentralized_identity.q3.option3': 'Where to find a DID document',
    'quests.decentralized_identity.q3.option4': 'How a specific DID is created, resolved, updated, and deactivated',
    'quests.decentralized_identity.q3.option5': 'A list of identity providers',
    'quests.decentralized_identity.q3.explanation': 'DID methods specify how a DID should be managed throughout its lifecycle.',
    'quests.decentralized_identity.q4.question': 'How is the concept of Self-Sovereign Identity (SSI) best described?',
    'quests.decentralized_identity.q4.option1': 'Your identity managed by the government',
    'quests.decentralized_identity.q4.option2': 'The individual having full control and ownership over their digital identity',
    'quests.decentralized_identity.q4.option3': 'All identity information being public',
    'quests.decentralized_identity.q4.option4': 'Companies sharing user identities',
    'quests.decentralized_identity.q4.option5': 'Logging into everything with a single username and password',
    'quests.decentralized_identity.q4.explanation': 'SSI allows individuals to have full control over their own digital identity.',
    'quests.decentralized_identity.q5.question': 'Where are DID documents typically stored or registered?',
    'quests.decentralized_identity.q5.option1': 'In a centralized database',
    'quests.decentralized_identity.q5.option2': 'In the user\'s email account',
    'quests.decentralized_identity.q5.option3': 'On a decentralized ledger (like a blockchain) or P2P networks',
    'quests.decentralized_identity.q5.option4': 'On social media platforms',
    'quests.decentralized_identity.q5.option5': 'Only on hardware wallets',
    'quests.decentralized_identity.q5.explanation': 'DID documents are stored in decentralized systems like blockchain or P2P networks.',
    
    // Layer 2 Scaling Solutions
    'quests.layer2_scaling.title': 'Layer 2 Scaling Solutions',
    'quests.layer2_scaling.description': 'Understand Layer 2 technologies that increase the speed and capacity of blockchain networks.',
    'quests.layer2_scaling.q1.question': 'What is the main purpose of Layer 2 scaling solutions?',
    'quests.layer2_scaling.q1.option1': 'To increase blockchain security',
    'quests.layer2_scaling.q1.option2': 'To increase transaction speed and reduce costs',
    'quests.layer2_scaling.q1.option3': 'To reduce decentralization',
    'quests.layer2_scaling.q1.option4': 'To create new cryptocurrencies',
    'quests.layer2_scaling.q1.option5': 'To increase data storage capacity',
    'quests.layer2_scaling.q1.explanation': 'Layer 2 solutions increase blockchain scalability by increasing transaction speed and reducing costs.',
    'quests.layer2_scaling.q2.question': 'Which of the following is a popular Layer 2 scaling technique?',
    'quests.layer2_scaling.q2.option1': 'Proof of Work',
    'quests.layer2_scaling.q2.option2': 'Sharding',
    'quests.layer2_scaling.q2.option3': 'Rollups (Optimistic & ZK)',
    'quests.layer2_scaling.q2.option4': 'Hard Fork',
    'quests.layer2_scaling.q2.option5': 'ASIC Mining',
    'quests.layer2_scaling.q2.explanation': 'Rollups batch transactions on Layer 2 and send summaries to Layer 1.',
    'quests.layer2_scaling.q3.question': 'How do Optimistic Rollups ensure security?',
    'quests.layer2_scaling.q3.option1': 'By using zero-knowledge proofs',
    'quests.layer2_scaling.q3.option2': 'By using fraud proofs and a challenge period',
    'quests.layer2_scaling.q3.option3': 'By validating every transaction on Layer 1',
    'quests.layer2_scaling.q3.option4': 'By using a centralized sequencer',
    'quests.layer2_scaling.q3.option5': 'By using Plasma chains',
    'quests.layer2_scaling.q3.explanation': 'Optimistic Rollups assume transactions are correct and wait for fraud proofs during a challenge period.',
    'quests.layer2_scaling.q4.question': 'What is the primary advantage of ZK-Rollup (Zero-Knowledge Rollup) technology?',
    'quests.layer2_scaling.q4.option1': 'Simpler implementation',
    'quests.layer2_scaling.q4.option2': 'Lower Layer 1 data cost',
    'quests.layer2_scaling.q4.option3': 'Providing cryptographic validity proofs without needing fraud proofs',
    'quests.layer2_scaling.q4.option4': 'Longer challenge period',
    'quests.layer2_scaling.q4.option5': 'Incompatibility with decentralized applications',
    'quests.layer2_scaling.q4.explanation': 'ZK-Rollups use zero-knowledge proofs to mathematically verify transactions.',
    'quests.layer2_scaling.q5.question': 'For which type of application are State Channels most suitable?',
    'quests.layer2_scaling.q5.option1': 'For users who interact infrequently',
    'quests.layer2_scaling.q5.option2': 'For frequent small transactions among a large number of participants',
    'quests.layer2_scaling.q5.option3': 'For complex smart contract interactions',
    'quests.layer2_scaling.q5.option4': 'For high-frequency interactions between two participants (e.g., games, payments)',
    'quests.layer2_scaling.q5.option5': 'For token swaps',
    'quests.layer2_scaling.q5.explanation': 'State Channels are ideal for off-chain transactions between two parties.',
    
    // Web3 Development Basics
    'quests.web3_dev_basics.title': 'Web3 Development Basics',
    'quests.web3_dev_basics.description': 'Learn the fundamental tools and concepts used to build decentralized applications (dApps).',
    'quests.web3_dev_basics.q1.question': 'What is the main difference between a dApp (Decentralized Application) and a traditional web application?',
    'quests.web3_dev_basics.q1.option1': 'dApps don\'t work on mobile devices',
    'quests.web3_dev_basics.q1.option2': 'dApps are faster',
    'quests.web3_dev_basics.q1.option3': 'A dApp\'s backend runs on a decentralized network (blockchain)',
    'quests.web3_dev_basics.q1.option4': 'dApps don\'t use databases',
    'quests.web3_dev_basics.q1.option5': 'dApps don\'t have user interfaces',
    'quests.web3_dev_basics.q1.explanation': 'The backend of dApps runs on a blockchain and is decentralized.',
    'quests.web3_dev_basics.q2.question': 'Which JavaScript library is commonly used to interact with EVM-compatible blockchains like Ethereum?',
    'quests.web3_dev_basics.q2.option1': 'jQuery',
    'quests.web3_dev_basics.q2.option2': 'Ethers.js or Web3.js',
    'quests.web3_dev_basics.q2.option3': 'React',
    'quests.web3_dev_basics.q2.option4': 'Node.js',
    'quests.web3_dev_basics.q2.option5': 'Axios',
    'quests.web3_dev_basics.q2.explanation': 'Ethers.js and Web3.js are popular libraries for blockchain interaction.',
    'quests.web3_dev_basics.q3.question': 'What popular browser extension acts as a wallet and allows users to interact with dApps?',
    'quests.web3_dev_basics.q3.option1': 'AdBlock',
    'quests.web3_dev_basics.q3.option2': 'Google Translate',
    'quests.web3_dev_basics.q3.option3': 'MetaMask',
    'quests.web3_dev_basics.q3.option4': 'LastPass',
    'quests.web3_dev_basics.q3.option5': 'Grammarly',
    'quests.web3_dev_basics.q3.explanation': 'MetaMask is the most popular browser wallet and dApp connection tool.',
    'quests.web3_dev_basics.q4.question': 'Which P2P protocol, using content-based addressing, is commonly used for decentralized file storage?',
    'quests.web3_dev_basics.q4.option1': 'HTTP',
    'quests.web3_dev_basics.q4.option2': 'FTP',
    'quests.web3_dev_basics.q4.option3': 'BitTorrent',
    'quests.web3_dev_basics.q4.option4': 'IPFS (InterPlanetary File System)',
    'quests.web3_dev_basics.q4.option5': 'SMTP',
    'quests.web3_dev_basics.q4.explanation': 'IPFS is the protocol used for decentralized file storage and sharing.',
    'quests.web3_dev_basics.q5.question': 'What are smart contracts generally used for?',
    'quests.web3_dev_basics.q5.option1': 'Designing websites',
    'quests.web3_dev_basics.q5.option2': 'Managing databases',
    'quests.web3_dev_basics.q5.option3': 'Creating self-executing, immutable agreements when certain conditions are met',
    'quests.web3_dev_basics.q5.option4': 'Building user interfaces',
    'quests.web3_dev_basics.q5.option5': 'Server administration',
    'quests.web3_dev_basics.q5.explanation': 'Smart contracts are self-executing agreements that run automatically when conditions are met.',
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
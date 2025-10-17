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
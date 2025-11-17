import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const LearnWeb3 = ({ onPageChange }) => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'what-is-web3',
      icon: '🌐',
      title: t('learn.web3.title'),
      content: [
        {
          heading: t('learn.web3.decentralized.title'),
          text: t('learn.web3.decentralized.text')
        },
        {
          heading: t('learn.web3.blockchain.title'),
          text: t('learn.web3.blockchain.text')
        },
        {
          heading: t('learn.web3.ownership.title'),
          text: t('learn.web3.ownership.text')
        }
      ]
    },
    {
      id: 'blockchain',
      icon: '⛓️',
      title: t('learn.blockchain.title'),
      content: [
        {
          heading: t('learn.blockchain.ledger.title'),
          text: t('learn.blockchain.ledger.text')
        },
        {
          heading: t('learn.blockchain.consensus.title'),
          text: t('learn.blockchain.consensus.text')
        },
        {
          heading: t('learn.blockchain.trustless.title'),
          text: t('learn.blockchain.trustless.text')
        },
        {
          heading: t('learn.blockchain.pow-pos.title'),
          text: t('learn.blockchain.pow-pos.text')
        }
      ]
    },
    {
      id: 'tokens',
      icon: '🪙',
      title: t('learn.tokens.title'),
      content: [
        {
          heading: t('learn.tokens.token-vs-coin.title'),
          text: t('learn.tokens.token-vs-coin.text')
        },
        {
          heading: t('learn.tokens.utility.title'),
          text: t('learn.tokens.utility.text')
        },
        {
          heading: t('learn.tokens.governance.title'),
          text: t('learn.tokens.governance.text')
        },
        {
          heading: t('learn.tokens.earning.title'),
          text: t('learn.tokens.earning.text')
        }
      ]
    },
    {
      id: 'wallets',
      icon: '👛',
      title: t('learn.wallets.title'),
      content: [
        {
          heading: t('learn.wallets.seed-phrase.title'),
          text: t('learn.wallets.seed-phrase.text')
        },
        {
          heading: t('learn.wallets.keys.title'),
          text: t('learn.wallets.keys.text')
        },
        {
          heading: t('learn.wallets.examples.title'),
          text: t('learn.wallets.examples.text')
        },
        {
          heading: t('learn.wallets.chainquest.title'),
          text: t('learn.wallets.chainquest.text')
        }
      ]
    },
    {
      id: 'chainquest-stack',
      icon: '🚀',
      title: t('learn.chainquest.title'),
      content: [
        {
          heading: t('learn.chainquest.stellar.title'),
          text: t('learn.chainquest.stellar.text')
        },
        {
          heading: t('learn.chainquest.cqt.title'),
          text: t('learn.chainquest.cqt.text')
        },
        {
          heading: t('learn.chainquest.wallet.title'),
          text: t('learn.chainquest.wallet.text')
        },
        {
          heading: t('learn.chainquest.earning.title'),
          text: t('learn.chainquest.earning.text')
        },
        {
          heading: t('learn.chainquest.ai.title'),
          text: t('learn.chainquest.ai.text')
        },
        {
          heading: t('learn.chainquest.future.title'),
          text: t('learn.chainquest.future.text')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6 text-sm sm:text-base px-4 py-2">
              {t('learn.hero.badge')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {t('learn.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('learn.hero.subtitle')}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {t('learn.hero.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {sections.map((section, index) => (
            <div key={section.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl sm:text-6xl">{section.icon}</div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-6 sm:space-y-8">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 sm:pl-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                          {item.heading}
                        </h3>
                        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t('learn.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              {t('learn.cta.subtitle')}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-white/90">
                <span className="text-2xl">→</span>
                <span className="text-base sm:text-lg">{t('learn.cta.action1')}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <span className="text-2xl">→</span>
                <span className="text-base sm:text-lg">{t('learn.cta.action2')}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <span className="text-2xl">→</span>
                <span className="text-base sm:text-lg">{t('learn.cta.action3')}</span>
              </div>
            </div>
            <Button
              onClick={() => onPageChange('quests')}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 dark:bg-white dark:text-indigo-600 dark:hover:bg-indigo-50 font-bold px-8 py-4 text-lg sm:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {t('learn.cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnWeb3;


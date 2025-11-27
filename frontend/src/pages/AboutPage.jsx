import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import Web3Particles from '../components/ui/Web3Particles';
import { 
  TbRocket,
  TbTelescope,
  TbBrain,
  TbCoins,
  TbUsers
} from 'react-icons/tb';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950">
      {/* Web3 Particle Network Effect */}
      <Web3Particles />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 dark:bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-20 dark:opacity-40 -z-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-white to-cyan-100/30 dark:from-purple-900/20 dark:via-slate-950 dark:to-cyan-900/20 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent animate-gradient-x pb-2">
              {language === 'tr' 
                ? 'Geleceğin Teknolojisini, Geleceğin Yöntemleriyle Öğretiyoruz.'
                : 'Teaching Future Technology with Future Methods.'
              }
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {language === 'tr'
                ? 'ChainQuest, Web3 ve Yapay Zeka gücüyle eğitimi merkeziyetsizleştiriyor.'
                : 'ChainQuest is decentralizing education with the power of Web3 and Artificial Intelligence.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="relative group">
              <div 
                className="relative p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-purple-300/50 dark:border-purple-500/30 hover:border-purple-400/80 dark:hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/40 dark:border-purple-500/30">
                    <TbRocket size={28} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                  </h2>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'tr'
                    ? 'Karmaşık blokzincir teknolojilerini, Huawei AI desteği ve oyunlaştırılmış (Gamified) yapılarla herkes için erişilebilir, anlaşılır ve kazançlı hale getirmek.'
                    : 'Making complex blockchain technologies accessible, understandable, and rewarding for everyone through Huawei AI support and gamified structures.'
                  }
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              <div 
                className="relative p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-cyan-300/50 dark:border-cyan-500/30 hover:border-cyan-400/80 dark:hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/20"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/40 dark:border-cyan-500/30">
                    <TbTelescope size={28} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                  </h2>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'tr'
                    ? 'Bilginin sadece öğrenildiği değil, aynı zamanda değer gördüğü; merkeziyetsiz, şeffaf ve sınırların olmadığı küresel bir eğitim ekosistemi oluşturmak.'
                    : 'Creating a global education ecosystem where knowledge is not only learned but also valued; decentralized, transparent, and without boundaries.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            {language === 'tr' ? 'Temel Değerlerimiz' : 'Our Core Values'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Value 1: AI-Powered Education */}
            <div className="relative group">
              <div 
                className="relative p-6 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-purple-300/40 dark:border-purple-500/20 hover:border-purple-400/60 dark:hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10 text-center"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/40 dark:border-purple-500/30 group-hover:scale-110 transition-transform">
                  <TbBrain size={32} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'tr' ? 'AI Destekli Eğitim' : 'AI-Powered Education'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'tr' ? 'Kişiselleştirilmiş öğrenme deneyimi.' : 'Personalized learning experience.'}
                </p>
              </div>
            </div>

            {/* Value 2: Learn & Earn */}
            <div className="relative group">
              <div 
                className="relative p-6 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-cyan-300/40 dark:border-cyan-500/20 hover:border-cyan-400/60 dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/10 text-center"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/40 dark:border-cyan-500/30 group-hover:scale-110 transition-transform">
                  <TbCoins size={32} className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'tr' ? 'Öğren & Kazan' : 'Learn & Earn'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'tr' ? 'Başarının token ile ödüllendirildiği yapı.' : 'Structure where success is rewarded with tokens.'}
                </p>
              </div>
            </div>

            {/* Value 3: Community-Focused */}
            <div className="relative group">
              <div 
                className="relative p-6 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-purple-300/40 dark:border-purple-500/20 hover:border-purple-400/60 dark:hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10 text-center"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/40 dark:border-purple-500/30 group-hover:scale-110 transition-transform">
                  <TbUsers size={32} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'tr' ? 'Topluluk Odaklı' : 'Community-Focused'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'tr' ? 'Birlikte gelişen ve üreten bir ekosistem.' : 'An ecosystem that grows and creates together.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              {language === 'tr' ? 'Desteklenen Teknolojiler:' : 'Powered by:'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="px-6 py-3 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-300/50 dark:border-slate-700/50">
                <span className="text-slate-900 dark:text-white font-semibold text-lg">React</span>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-300/50 dark:border-slate-700/50">
                <span className="text-slate-900 dark:text-white font-semibold text-lg">Stellar</span>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-300/50 dark:border-slate-700/50">
                <span className="text-slate-900 dark:text-white font-semibold text-lg">Huawei Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import Web3Particles from '../components/ui/Web3Particles';
import { 
  TbRocket,
  TbTelescope,
  TbBrain,
  TbCoins,
  TbUsers,
  TbCheck,
  TbClock,
  TbCode,
  TbCloud,
  TbBrandReact,
  TbArrowRight
} from 'react-icons/tb';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const roadmapPhases = [
    {
      quarter: 'Q1 2025',
      title: language === 'tr' ? 'Fikir & Prototip' : 'Idea & Prototype',
      status: 'completed',
      icon: TbRocket
    },
    {
      quarter: 'Q2 2025',
      title: language === 'tr' ? 'Huawei Cloud Entegrasyonu' : 'Huawei Cloud Integration',
      status: 'completed',
      icon: TbCloud
    },
    {
      quarter: 'Q3 2025',
      title: language === 'tr' ? 'Public Beta & Testnet' : 'Public Beta & Testnet',
      status: 'current',
      icon: TbClock
    },
    {
      quarter: 'Q4 2025',
      title: language === 'tr' ? 'Mainnet & Token Launch' : 'Mainnet & Token Launch',
      status: 'future',
      icon: TbRocket
    }
  ];

  const techStack = [
    {
      name: 'React + Vite',
      description: language === 'tr' ? 'Frontend Performance' : 'Frontend Performance',
      icon: TbBrandReact,
      color: 'blue',
      glowColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/40 dark:border-blue-500/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      shadowColor: 'hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20'
    },
    {
      name: 'Stellar Soroban',
      description: language === 'tr' ? 'Smart Contracts' : 'Smart Contracts',
      icon: TbCode,
      color: 'purple',
      glowColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/40 dark:border-purple-500/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      shadowColor: 'hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20'
    },
    {
      name: 'Huawei Cloud',
      description: language === 'tr' ? 'AI & Infrastructure' : 'AI & Infrastructure',
      icon: TbCloud,
      color: 'red',
      glowColor: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-400/40 dark:border-red-500/30',
      iconColor: 'text-red-600 dark:text-red-400',
      shadowColor: 'hover:shadow-red-500/20 dark:hover:shadow-red-500/20'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950">
      {/* Web3 Particle Network Effect */}
      <Web3Particles />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 dark:bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-600/20 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-30 dark:opacity-40 -z-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: isDarkMode 
            ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-white to-cyan-100/30 dark:from-purple-900/20 dark:via-slate-950 dark:to-cyan-900/20 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
        
        {/* Radial Gradient Glow behind title */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div 
            className="w-[800px] h-[400px] rounded-full blur-3xl"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, transparent 70%)'
                : 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 70%)'
            }}
          ></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent animate-gradient-x pb-2">
              {language === 'tr' 
                ? 'Geleceğin Teknolojisini, Geleceğin Yöntemleriyle Öğretiyoruz.'
                : 'Teaching Future Technology with Future Methods.'
              }
            </h1>
            <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {language === 'tr'
                ? 'ChainQuest, Web3 ve Yapay Zeka gücüyle eğitimi merkeziyetsizleştiriyor.'
                : 'ChainQuest is decentralizing education with the power of Web3 and Artificial Intelligence.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="relative group">
              <div 
                className="relative p-8 rounded-2xl bg-white shadow-xl border border-slate-200 dark:bg-white/5 dark:backdrop-blur-sm dark:border-purple-500/30 hover:border-purple-400/80 dark:hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                  backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                }}
              >
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/40 dark:border-purple-500/30">
                    <TbRocket size={28} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                  </h2>
                </div>
                <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
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
                className="relative p-8 rounded-2xl bg-white shadow-xl border border-slate-200 dark:bg-white/5 dark:backdrop-blur-sm dark:border-cyan-500/30 hover:border-cyan-400/80 dark:hover:border-cyan-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/20"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                  backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                }}
              >
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/40 dark:border-cyan-500/30">
                    <TbTelescope size={28} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                  </h2>
                </div>
                <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
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
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-10">
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
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'tr' ? 'Kişiselleştirilmiş öğrenme deneyimi.' : 'Personalized learning experience.'}
                </p>
              </div>
            </div>

            {/* Value 2: Learn & Earn */}
            <div className="relative group">
              <div 
                className="relative p-6 rounded-xl bg-white shadow-lg border border-slate-200 dark:bg-white/5 dark:backdrop-blur-sm dark:border-cyan-500/20 hover:border-cyan-400/60 dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/10 text-center"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                  backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/40 dark:border-cyan-500/30 group-hover:scale-110 transition-transform">
                  <TbCoins size={32} className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'tr' ? 'Öğren & Kazan' : 'Learn & Earn'}
                </h3>
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
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
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'tr' ? 'Birlikte gelişen ve üreten bir ekosistem.' : 'An ecosystem that grows and creates together.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            {language === 'tr' ? 'Yol Haritamız' : 'Our Roadmap'}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-purple-500/50 dark:from-purple-400/50 dark:via-cyan-400/50 dark:to-purple-400/50 transform md:-translate-x-1/2"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {roadmapPhases.map((phase, index) => {
                  const IconComponent = phase.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index}
                      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                        phase.status === 'completed' 
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 dark:border-green-500 shadow-lg shadow-green-500/30'
                          : phase.status === 'current'
                          ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 dark:border-cyan-500 shadow-lg shadow-cyan-500/30 animate-pulse'
                          : 'bg-gradient-to-br from-slate-300/20 to-slate-400/20 dark:from-slate-600/20 dark:to-slate-700/20 border-2 border-slate-300 dark:border-slate-600'
                      }`}>
                        {phase.status === 'completed' ? (
                          <TbCheck size={24} className="text-green-600 dark:text-green-400" />
                        ) : (
                          <IconComponent size={24} className={
                            phase.status === 'current' 
                              ? 'text-cyan-600 dark:text-cyan-400' 
                              : 'text-slate-400 dark:text-slate-500'
                          } />
                        )}
                      </div>
                      
                      {/* Content Card */}
                      <div className={`ml-24 md:ml-0 md:w-[45%] ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                        <div 
                          className="p-6 rounded-xl bg-white shadow-lg border border-slate-200 dark:bg-white/5 dark:backdrop-blur-sm dark:border-slate-700/50 hover:border-purple-400/60 dark:hover:border-purple-400/50 transition-all duration-300"
                          style={{
                            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                            backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-semibold ${
                              phase.status === 'completed'
                                ? 'text-green-600 dark:text-green-400'
                                : phase.status === 'current'
                                ? 'text-cyan-600 dark:text-cyan-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {phase.quarter}
                            </span>
                            {phase.status === 'current' && (
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-400/30 dark:border-cyan-500/30">
                                {language === 'tr' ? 'Şu An' : 'Current'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            {language === 'tr' ? 'Teknoloji Altyapımız' : 'Our Tech Stack'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              
              return (
                <div key={index} className="relative group">
                  <div 
                    className={`relative p-8 rounded-2xl bg-white shadow-xl border border-slate-200 dark:bg-white/5 dark:backdrop-blur-sm ${tech.borderColor} hover:border-opacity-80 dark:hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl ${tech.shadowColor} text-center`}
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
                      backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
                    }}
                  >
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br ${tech.glowColor} flex items-center justify-center border ${tech.borderColor} group-hover:scale-110 transition-transform`}>
                      <IconComponent size={40} className={tech.iconColor} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {tech.name}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-cyan-100/20 to-purple-100/20 dark:from-purple-900/10 dark:via-cyan-900/10 dark:to-purple-900/10 -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {language === 'tr' 
              ? 'Web3 Devriminin Bir Parçası Ol.'
              : 'Be Part of the Web3 Revolution.'
            }
          </h2>
          <p className="text-lg text-slate-800 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            {language === 'tr'
              ? 'Eğitimi merkeziyetsizleştiren bu yolculuğa katıl ve geleceği birlikte inşa edelim.'
              : 'Join this journey of decentralizing education and let\'s build the future together.'
            }
          </p>
          <button
            onClick={() => navigate('/learn-web3')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
          >
            {language === 'tr' ? 'Hemen Başla' : 'Get Started'}
            <TbArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

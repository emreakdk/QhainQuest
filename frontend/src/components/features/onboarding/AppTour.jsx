import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLanguage } from "../../../context/LanguageContext";

const AppTour = ({ currentPage, isAuthenticated }) => {
  const driverRef = useRef(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    // 1. RESTRICTION: Do not run on Landing Page (user not authenticated)
    if (!isAuthenticated) {
      return;
    }

    // 2. PERSISTENCE CHECK: Stop if already seen
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (hasSeenTour === "true") {
      return;
    }

    // 3. Guard: Only start tour on main app pages
    if (!currentPage || currentPage === '') {
      return;
    }

    // 4. CRITICAL: Mark as seen IMMEDIATELY before starting tour
    // This prevents the tour from restarting on page refresh
    localStorage.setItem("hasSeenTour", "true");

    // 5. Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');

    // 6. Create icon HTML strings with proper Tabler icon paths
    const iconStyle = `display: inline-flex; align-items: center; justify-content: center; padding: 6px; background: ${isDarkMode ? 'rgba(99, 102, 241, 0.2)' : '#eef2ff'}; color: ${isDarkMode ? '#818cf8' : '#4f46e5'}; border-radius: 8px; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);`;
    const svgBase = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
    
    // TbWallet icon
    const walletIconHtml = `<div style="${iconStyle}">${svgBase}<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg></div>`;
    
    // TbBrain icon (simplified brain icon)
    const brainIconHtml = `<div style="${iconStyle}">${svgBase}<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2.5 13.5a2.5 2.5 0 0 1 0-3.01l2.04-6.45A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L21.5 13.5a2.5 2.5 0 0 0 0-3.01l-2.04-6.45A2.5 2.5 0 0 0 14.5 2Z"></path></svg></div>`;
    
    // TbListCheck icon
    const listIconHtml = `<div style="${iconStyle}">${svgBase}<path d="M10 6h11"></path><path d="M10 12h11"></path><path d="M10 18h11"></path><path d="M4 6h.01"></path><path d="M4 12h.01"></path><path d="M4 18h.01"></path></svg></div>`;
    
    // TbUserCircle icon
    const userIconHtml = `<div style="${iconStyle}">${svgBase}<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`;

    // 7. Initialize Driver with localized content
    driverRef.current = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: t('tour.done'),
      nextBtnText: t('tour.next'),
      prevBtnText: t('tour.prev'),
      popoverClass: 'chainquest-tour-theme',
      steps: [
        {
          element: "#tour-wallet-connect",
          popover: {
            title: `${walletIconHtml}${t('tour.wallet.title')}`,
            description: t('tour.wallet.desc'),
            side: "bottom",
            align: "end"
          }
        },
        {
          element: "#tour-ai-generator",
          popover: {
            title: `${brainIconHtml}${t('tour.ai.title')}`,
            description: t('tour.ai.desc'),
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#tour-quest-list",
          popover: {
            title: `${listIconHtml}${t('tour.quests.title')}`,
            description: t('tour.quests.desc'),
            side: "top",
            align: "start"
          }
        },
        {
          element: "#tour-profile-link",
          popover: {
            title: `${userIconHtml}${t('tour.profile.title')}`,
            description: t('tour.profile.desc'),
            side: "bottom",
            align: "start"
          }
        }
      ],
      // 8. Additional safety: Mark as seen when tour is closed or finished
      onDestroy: () => {
        localStorage.setItem("hasSeenTour", "true");
      }
    });

    // 9. Start Tour (With slight delay to ensure rendering)
    const timer = setTimeout(() => {
      if (driverRef.current) {
        driverRef.current.drive();
      }
    }, 1500);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [currentPage, isAuthenticated, t, language]); // Re-run when page, auth, or language changes

  return null;
};

export default AppTour;

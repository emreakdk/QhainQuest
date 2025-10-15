import { useCallback, useRef } from 'react';

const useSound = () => {
  const audioContextRef = useRef(null);

  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency, duration = 200, type = 'sine') => {
    try {
      const audioContext = createAudioContext();
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, [createAudioContext]);

  const playSuccessSound = useCallback(() => {
    // Success chord: C-E-G
    playTone(523.25, 300); // C5
    setTimeout(() => playTone(659.25, 300), 100); // E5
    setTimeout(() => playTone(783.99, 400), 200); // G5
  }, [playTone]);

  const playErrorSound = useCallback(() => {
    // Error sound: descending tone
    playTone(400, 200);
    setTimeout(() => playTone(300, 200), 100);
    setTimeout(() => playTone(200, 300), 200);
  }, [playTone]);

  const playClickSound = useCallback(() => {
    playTone(800, 100);
  }, [playTone]);

  const playNotificationSound = useCallback(() => {
    // Notification: gentle bell
    playTone(880, 300, 'sine');
    setTimeout(() => playTone(1108.73, 300, 'sine'), 150);
  }, [playTone]);

  return {
    playTone,
    playSuccessSound,
    playErrorSound,
    playClickSound,
    playNotificationSound,
  };
};

export default useSound;

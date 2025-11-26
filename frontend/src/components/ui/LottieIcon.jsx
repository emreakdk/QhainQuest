import Lottie from 'lottie-react';

const LottieIcon = ({ animationData, loop = true, className = '', autoplay = true }) => {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieIcon;


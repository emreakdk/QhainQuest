# ChainQuest - Learn-to-Earn Platform

A full-stack "Learn-to-Earn" platform built for the PatikaDev challenge. ChainQuest allows users to complete blockchain-related quests, earn tokens, and receive NFT certificates upon successful completion.

## 🚀 Features

- **Interactive Quests**: Multiple-choice questions with different difficulty levels
- **Token Rewards**: Earn ChainQuest Tokens (CQT) for correct answers
- **NFT Certificates**: Receive Soulbound Token (SBT) certificates for quest completion
- **Gamification**: Level system, leaderboard, and achievement tracking
- **Wallet Integration**: Connect with Freighter wallet for Stellar blockchain
- **Multi-language Support**: Turkish and English language options
- **Dark/Light Theme**: Toggle between dark and light themes
- **Real-time Progress**: Track your learning journey with detailed statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS v4** for styling
- **Context API** for state management
- **React Router** for navigation
- **Web Audio API** for sound effects
- **Animated components** for enhanced UX

### Backend
- **Soroban Smart Contracts** (Rust)
- **Stellar Blockchain** integration
- **Mock services** for development

### Key Libraries
- `@stellar/freighter-api` for wallet integration
- `@stellar/soroban-client` for blockchain interaction
- Custom hooks for sound effects and animations

## 📁 Project Structure

```
ChainQuest/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Basic UI components
│   │   │   └── features/    # Feature-specific components
│   │   ├── context/         # React Context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API and blockchain services
│   │   ├── systems/         # Business logic systems
│   │   ├── utils/           # Utility functions
│   │   └── data/            # Mock data and constants
│   ├── public/              # Static assets
│   └── package.json
├── contracts/               # Soroban smart contracts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Freighter wallet extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ChainQuest.git
   cd ChainQuest
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Wallet Setup

1. Install [Freighter Wallet](https://freighter.app/) browser extension
2. Create or import a Stellar wallet
3. Connect your wallet in the ChainQuest application

## 🎮 How to Use

1. **Connect Wallet**: Click "Connect Wallet" in the top right
2. **Start Quest**: Click "Maceraya Başla" (Start Adventure) on the homepage
3. **Answer Questions**: Complete multiple-choice questions
4. **Earn Rewards**: Receive tokens and certificates for correct answers
5. **Track Progress**: View your profile and leaderboard position

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key Components

- **QuestGrid**: Displays available quests with statistics
- **QuestQuiz**: Interactive quiz interface
- **UserProfile**: User statistics and achievements
- **CelebrationModal**: Quest completion celebration
- **WalletContext**: Manages wallet connection state
- **QuestContext**: Handles quest data and progress

### State Management

The application uses React Context API for state management:

- **WalletContext**: Wallet connection and user address
- **ThemeContext**: Dark/light theme toggle
- **LanguageContext**: Multi-language support
- **QuestContext**: Quest data and user progress
- **NotificationContext**: Toast notifications

## 🔒 Security Features

- **No Private Keys**: All wallet operations use Freighter extension
- **Environment Variables**: Sensitive data stored in `.env` files
- **Input Validation**: All user inputs are validated
- **Secure API Calls**: Blockchain interactions through official SDKs

## 🌐 Blockchain Integration

### Smart Contracts
- **Quest Contract**: Manages quest creation and completion
- **Token Contract**: Handles CQT token operations
- **Certificate Contract**: Issues NFT certificates

### Network
- **Testnet**: Currently configured for Stellar testnet
- **Mainnet**: Ready for mainnet deployment

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Enhanced user experience
- **Sound Effects**: Audio feedback for interactions
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env.production` file:
```
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 PatikaDev Challenge

This project was created for the PatikaDev challenge, showcasing:
- Full-stack development skills
- Blockchain integration
- Modern React patterns
- Professional UI/UX design
- Comprehensive documentation

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- PatikaDev for the challenge opportunity
- Stellar Development Foundation for the blockchain infrastructure
- Freighter team for the wallet integration
- React and Vite communities for the excellent tools

---

**Built with ❤️ for the PatikaDev Challenge**

# QhainQuest — Full-Stack Challenge Submission

## Live App

**Live App:** https://chainquest-app.vercel.app

## Repository URL

https://github.com/emreakdk/QhainQuest

## Overview

QhainQuest is a full-stack web application that enables users to complete quizzes and tests on blockchain technologies to earn tokens. The platform integrates with the Freighter wallet for Stellar network transactions, displays token balances on Profile and Wallet pages, features a responsive user interface, and includes a light/dark mode toggle for enhanced user experience.

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Blockchain**: Stellar SDK, Soroban Smart Contracts
- **Wallet Integration**: Freighter Wallet API
- **Backend**: Vercel Serverless Functions (Node.js)
- **Deployment**: Vercel
- **State Management**: React Context API
- **Styling**: TailwindCSS with custom animations

## Features

- **Quiz System**: Interactive quizzes covering blockchain, DeFi, NFT, and smart contract topics
- **Token Awarding**: Users earn tokens (CQT) upon successfully completing quizzes
- **Wallet Connection**: Seamless integration with Freighter wallet for Stellar network
- **Balance Updates**: Real-time token balance display on Profile and Wallet pages
- **Theme Toggle**: Light and dark mode support with user preference persistence
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Demo Mode**: Test the platform without wallet connection
- **Quest Tracking**: Track completed quests and progress

## Project Structure

```
ChainQuest/
├── api/                    # Serverless API functions
│   ├── complete-quest.js   # Quest completion endpoint
│   ├── claim-tokens.js     # Token claiming endpoint
│   └── package.json
├── backend/                # Smart contract artifacts
│   └── contract/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API and blockchain services
│   │   ├── config/         # Configuration files
│   │   ├── context/        # React context providers
│   │   ├── data/           # Quest and static data
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── public/                 # Root public assets
├── vercel.json             # Vercel deployment configuration
└── package.json            # Root package configuration
```

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emreakdk/QhainQuest.git
   cd QhainQuest
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install API dependencies (optional, for local API testing):**
   ```bash
   cd ../api
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   ```
   http://localhost:5173
   ```

### Running the API Locally

The API is deployed as Vercel serverless functions. For local development:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run the API locally:
   ```bash
   vercel dev
   ```

The API will be available at `http://localhost:3000/api`

## Environment Variables

Create a `.env` file in the `frontend` directory based on `.env.example`:

### Frontend Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-url.vercel.app/api
VITE_API_URL=/api
VITE_API_TIMEOUT=30000

# Stellar Network Configuration
VITE_WALLET_NETWORK=testnet
VITE_APP_ENVIRONMENT=testnet

# Contract Addresses
VITE_CHAINQUEST_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
VITE_TOKEN_CONTRACT_ADDRESS=YOUR_TOKEN_ADDRESS

# Quest Configuration
VITE_DEFAULT_QUEST_REWARD=100
VITE_MAX_QUEST_ATTEMPTS=3
VITE_QUEST_TIMEOUT=300000

# Wallet Configuration
VITE_WALLET_TIMEOUT=30000

# UI Configuration
VITE_DEFAULT_THEME=dark
VITE_DEFAULT_LANGUAGE=en
VITE_ENABLE_SOUND=false
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_DEBUG=false

# Analytics
VITE_ENABLE_ANALYTICS=false
```

### Backend Environment Variables (Vercel)

Set these in your Vercel dashboard:

```env
# Token Configuration (REQUIRED)
TOKEN_CODE=CQT
TOKEN_ISSUER_PUBLIC_KEY=YOUR_TOKEN_ISSUER_PUBLIC_KEY
DISTRIBUTOR_SECRET_KEY=YOUR_DISTRIBUTOR_SECRET_KEY
```

**⚠️ Security Warning**: Never expose `DISTRIBUTOR_SECRET_KEY` in your frontend code or public repositories!

## Deployment Instructions

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the frontend:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure environment variables:**
   - Go to your Vercel project settings
   - Add all frontend environment variables (prefixed with `VITE_`)

### Backend API Deployment (Vercel)

1. **Deploy the API:**
   ```bash
   cd api
   vercel --prod
   ```

2. **Set backend environment variables:**
   - Go to your Vercel project settings
   - Add `TOKEN_CODE`, `TOKEN_ISSUER_PUBLIC_KEY`, and `DISTRIBUTOR_SECRET_KEY`

3. **Update frontend API URL:**
   - Update `VITE_API_BASE_URL` in frontend environment variables to point to your API URL

### Alternative Deployment (Render/Railway)

For backend deployment on Render or Railway:

1. **Create a new service** and connect your repository
2. **Set build command:** `cd api && npm install`
3. **Set start command:** Use Vercel serverless functions or deploy as a Node.js service
4. **Configure environment variables** as listed above
5. **Update frontend API URL** to point to your deployed backend

## API Endpoints

### POST /api/complete-quest

Completes a quest and validates answers.

**Request:**
```json
{
  "userAddress": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "questId": "stellar-fundamentals",
  "answers": ["answer1", "answer2", "answer3"],
  "isDemoMode": false
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Quest completed successfully!",
  "data": {
    "questId": "stellar-fundamentals",
    "rewardAmount": 100,
    "completedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Quest already completed by this user."
}
```

### POST /api/claim-tokens

Claims tokens for a user address.

**Request:**
```json
{
  "userAddress": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "amount": 100
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Tokens claimed successfully!",
  "data": {
    "transactionHash": "abc123...",
    "amount": 100,
    "tokenCode": "CQT",
    "claimedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Health Check

The API endpoints include CORS headers and OPTIONS method support for health checks. All endpoints return appropriate HTTP status codes and error messages.

## License

MIT

---

_This project was developed as part of a full-stack developer challenge submission._

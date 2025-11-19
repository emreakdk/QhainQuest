# ChainQuest — AI-Powered Learn-to-Earn Platform

**Submission for Huawei Developer Competition Europe 2025 (Spark Infinity) - Track A: AI-Powered Innovations**

## Live App

**Live App:** https://chainquest-app.vercel.app

## Repository URL

https://github.com/emreakdk/QhainQuest

## Overview

ChainQuest is a full-stack web application that enables users to complete quizzes and tests on blockchain technologies to earn tokens. The platform features **AI-powered learning assistance** powered by Huawei Cloud LLM, integrates with the Freighter wallet for Stellar network transactions, displays token balances on Profile and Wallet pages, features a responsive user interface, and includes a light/dark mode toggle for enhanced user experience.

**Key Innovation:** The platform integrates AI-powered features including an interactive learning assistant and personalized learning recommendations, making it suitable for the Huawei Developer Competition's AI-Powered Innovations track.

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Blockchain**: Stellar SDK, Soroban Smart Contracts
- **Wallet Integration**: Freighter Wallet API
- **Backend**: Vercel Serverless Functions (Node.js) / Huawei FunctionGraph (Cloud-ready)
- **AI Integration**: Huawei Cloud LLM (Pangu Model)
- **Deployment**: Vercel / Huawei Cloud (OBS + FunctionGraph + API Gateway)
- **State Management**: React Context API
- **Styling**: TailwindCSS with custom animations

## Features

### Core Features
- **Quiz System**: Interactive quizzes covering blockchain, DeFi, NFT, and smart contract topics
- **Token Awarding**: Users earn tokens (CQT) upon successfully completing quizzes
- **Wallet Connection**: Seamless integration with Freighter wallet for Stellar network
- **Balance Updates**: Real-time token balance display on Profile and Wallet pages
- **Theme Toggle**: Light and dark mode support with user preference persistence
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Demo Mode**: Test the platform without wallet connection
- **Quest Tracking**: Track completed quests and progress

### AI-Powered Features (Huawei Cloud Integration)
- **🤖 AI Learning Assistant**: Interactive chat interface that explains blockchain concepts, answers questions, and provides quiz help
  - Located on the Home/Quests page
  - Powered by Huawei Cloud LLM
  - Provides real-time explanations and guidance
- **🎯 AI Learning Recommendations**: Personalized learning path suggestions based on user progress
  - Located on the Profile page
  - Analyzes completed quests and suggests next steps
  - Adapts recommendations based on user performance

## Project Structure

```
ChainQuest/
├── api/                    # Serverless API functions
│   ├── complete-quest.js   # Quest completion endpoint
│   ├── claim-tokens.js     # Token claiming endpoint
│   ├── ai-assistant.js     # AI assistant endpoint (Huawei Cloud LLM)
│   └── package.json
├── backend/                # Smart contract artifacts
│   └── contract/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── features/
│   │   │       └── ai/      # AI components (AIAssistant, LearningRecommendations)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API and blockchain services
│   │   │   ├── aiService.js # AI service client
│   │   │   └── questApi.js  # Quest API client
│   │   ├── config/         # Configuration files
│   │   ├── context/        # React context providers
│   │   ├── data/           # Quest and static data
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── public/                 # Root public assets
├── vercel.json             # Vercel deployment configuration
├── ARCHITECTURE.md         # Architecture documentation
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

### Backend Environment Variables (Vercel/Huawei Cloud)

Set these in your Vercel dashboard or Huawei FunctionGraph configuration:

```env
# Token Configuration (REQUIRED)
TOKEN_CODE=CQT
TOKEN_ISSUER_PUBLIC_KEY=YOUR_TOKEN_ISSUER_PUBLIC_KEY
DISTRIBUTOR_SECRET_KEY=YOUR_DISTRIBUTOR_SECRET_KEY

# Huawei Cloud LLM Configuration (for AI features)
# Required for AI Assistant functionality
HUAWEI_LLM_ENDPOINT=https://api-ap-southeast-1.modelarts-maas.com/v1/chat/completions
HUAWEI_LLM_TOKEN=YOUR_HUAWEI_LLM_TOKEN
HUAWEI_LLM_MODEL=deepseek-v3.1  # Optional, defaults to 'deepseek-v3.1'
```

**⚠️ Security Warning**: Never expose `DISTRIBUTOR_SECRET_KEY` or `HUAWEI_LLM_TOKEN` in your frontend code or public repositories!

**📝 Note**: The AI Assistant automatically uses Huawei Cloud LLM when `HUAWEI_LLM_ENDPOINT` and `HUAWEI_LLM_TOKEN` are configured. If Huawei Cloud is unavailable, it falls back to the local fallback engine. See `api/ai-assistant.js` for integration details.

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

## AI Features Demo Guide

### Testing AI Features

1. **AI Learning Assistant (Home/Quests Page)**
   - Navigate to the Quests page
   - Scroll to the "AI Learning Assistant" section
   - Try asking questions like:
     - "What is blockchain?"
     - "Explain Stellar network"
     - "What are smart contracts?"
   - The assistant provides explanations powered by Huawei Cloud LLM

2. **AI Learning Recommendations (Profile Page)**
   - Navigate to the Profile page
   - View the "AI Learning Recommendations" section
   - Click refresh to get personalized recommendations based on your progress
   - Recommendations adapt based on completed quests and performance

### AI Integration Code Locations

- **Backend AI Endpoint**: `api/ai-assistant.js`
  - Handles AI requests and integrates with Huawei Cloud LLM
  - TODO comments indicate where to plug in actual Huawei Cloud API calls

- **Frontend AI Service**: `frontend/src/services/aiService.js`
  - Client service for making AI API calls

- **AI Components**:
  - `frontend/src/components/features/ai/AIAssistant.jsx` - Chat interface
  - `frontend/src/components/features/ai/LearningRecommendations.jsx` - Recommendations widget

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

### POST /api/ai-assistant

AI-powered assistant endpoint for explanations and recommendations.

**Request:**
```json
{
  "type": "explain",
  "prompt": "What is blockchain?",
  "context": {},
  "questId": "stellar-fundamentals"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "type": "explain",
    "response": "A blockchain is a distributed ledger technology...",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Request Types:**
- `explain` - Get explanations for concepts
- `recommend` - Get learning recommendations
- `help` - Get quiz help
- `analyze` - Analyze user progress

**Note**: This endpoint integrates with Huawei Cloud LLM. Configure `HUAWEI_LLM_ENDPOINT` and `HUAWEI_LLM_TOKEN` environment variables to enable. The API automatically uses Huawei Cloud LLM when credentials are present.

### Health Check

The API endpoints include CORS headers and OPTIONS method support for health checks. All endpoints return appropriate HTTP status codes and error messages.

## Smart Contract (Token Information)

**Network:** Stellar Testnet  

**Token Code:** CQT  

**Issuer Account ID (Contract Address):** `GAUJITLLEZWQ6WRKITZ5PMILUWA4B7XFIZPH7GXN53SC6DEBVSZ3LQHHXO`  

Users must add a **trustline** to this issuer in their Freighter wallet to receive CQT tokens.

## Huawei Cloud Deployment

This project is designed to be deployed on Huawei Cloud infrastructure:

### Recommended Architecture

1. **Frontend**: Deploy to OBS (Object Storage Service) + CDN
2. **Backend API**: Deploy to FunctionGraph (Serverless Functions)
3. **API Gateway**: Route `/api/*` endpoints to FunctionGraph functions
4. **AI Service**: Integrate with Huawei Cloud LLM (Pangu Model)

### Deployment Steps

1. **FunctionGraph Setup**:
   - Create functions for each API endpoint (`complete-quest`, `claim-tokens`, `ai-assistant`)
   - Configure environment variables
   - Set timeout to 30 seconds

2. **API Gateway Setup**:
   - Create API routes pointing to FunctionGraph functions
   - Configure CORS policies
   - Set up rate limiting

3. **OBS + CDN Setup**:
   - Upload frontend build to OBS bucket
   - Configure CDN for static assets
   - Update API base URL in frontend environment variables

4. **Huawei Cloud LLM Integration**:
   - Obtain LLM API credentials
   - Set `HUAWEI_LLM_BASE_URL` and `HUAWEI_LLM_API_KEY` in FunctionGraph
   - Update `api/ai-assistant.js` with actual API call implementation

See `ARCHITECTURE.md` for detailed architecture documentation.

## Competition Submission Notes

This project is submitted for **Huawei Developer Competition Europe 2025 (Spark Infinity) - Track A: AI-Powered Innovations**.

### Key Highlights

- ✅ **AI-Powered Features**: Interactive learning assistant and personalized recommendations
- ✅ **Huawei Cloud Ready**: Designed for FunctionGraph and API Gateway deployment
- ✅ **Cloud-Function Friendly**: All backend endpoints are stateless and serverless-ready
- ✅ **Production Ready**: Error handling, logging, and security best practices
- ✅ **Demo Ready**: 3-5 minute demo path with clear AI feature showcase

### Demo Path (3-5 minutes)

1. **Home Page** (30s): Show landing page and connect wallet/demo mode
2. **AI Assistant** (1-2 min): Demonstrate AI chat on Quests page
   - Ask "What is blockchain?"
   - Ask "Explain Stellar network"
3. **Complete a Quest** (1 min): Show quiz completion and token earning
4. **Profile + Recommendations** (1 min): Show AI recommendations on Profile page
5. **Summary** (30s): Highlight AI integration and Huawei Cloud readiness

## License

MIT

---

_This project was developed for Huawei Developer Competition Europe 2025 (Spark Infinity) - Track A: AI-Powered Innovations._

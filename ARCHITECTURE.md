# ChainQuest Architecture

## Overview

ChainQuest is a full-stack learn-to-earn platform that enables users to complete blockchain quizzes and earn tokens. The platform features AI-powered learning assistance and is designed for deployment on cloud platforms like Huawei Cloud.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Quest UI   │  │  AI Assistant│  │   Profile    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Services Layer (API, Blockchain, AI)         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Serverless)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Complete     │  │  Claim Tokens  │  │ AI Assistant │     │
│  │ Quest        │  │                │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │  Stellar Network │    │  Huawei Cloud LLM │
    │  (Blockchain)    │    │  (AI Service)     │
    └──────────────────┘    └──────────────────┘
```

## Component Architecture

### Frontend (React + Vite)

**Location:** `frontend/src/`

#### Key Components

1. **Pages**
   - `App.jsx` - Main application router
   - `pages/HowToClaimPage.jsx` - Token claiming instructions

2. **Features**
   - `components/features/quest/` - Quest display and quiz components
   - `components/features/profile/` - User profile and stats
   - `components/features/ai/` - AI assistant components
     - `AIAssistant.jsx` - Interactive AI chat interface
     - `LearningRecommendations.jsx` - Personalized learning suggestions

3. **Services**
   - `services/questApi.js` - Quest completion API client
   - `services/aiService.js` - AI service client (Huawei Cloud integration)
   - `services/sorobanClient.js` - Stellar/Soroban blockchain client

4. **Context Providers**
   - `context/WalletContext.jsx` - Wallet connection state
   - `context/TokenContext.jsx` - Token balance and quest completion state
   - `context/QuestContext.jsx` - Quest data and progress
   - `context/ThemeContext.jsx` - Dark/light mode
   - `context/LanguageContext.jsx` - Internationalization

### Backend (Vercel Serverless Functions)

**Location:** `api/`

#### API Endpoints

1. **POST /api/complete-quest**
   - Validates quest answers
   - Tracks quest completion
   - Returns reward amount
   - **Cloud Function Ready:** Stateless, suitable for Huawei FunctionGraph

2. **POST /api/claim-tokens**
   - Distributes tokens via Stellar network
   - Handles blockchain transactions
   - **Cloud Function Ready:** Stateless, suitable for Huawei FunctionGraph

3. **POST /api/ai-assistant**
   - AI-powered explanations and recommendations
   - Integrates with Huawei Cloud LLM
   - **Cloud Function Ready:** Stateless, suitable for Huawei FunctionGraph

## AI Integration Flow

### Huawei Cloud LLM Integration

```
User Input (Frontend)
    │
    ▼
AIService (Frontend)
    │
    ▼
POST /api/ai-assistant (Backend)
    │
    ▼
Huawei Cloud LLM API
    │
    ├─ HUAWEI_LLM_BASE_URL (env var)
    ├─ HUAWEI_LLM_API_KEY (env var)
    └─ HUAWEI_LLM_MODEL (env var, default: 'pangu-alpha')
    │
    ▼
AI Response
    │
    ▼
Frontend Display
```

### Configuration

The AI service reads from environment variables:

- `HUAWEI_LLM_BASE_URL` - Huawei Cloud LLM API endpoint
- `HUAWEI_LLM_API_KEY` - API authentication key
- `HUAWEI_LLM_MODEL` - Model name (default: 'pangu-alpha')

**TODO:** Replace mock implementation in `api/ai-assistant.js` with actual Huawei Cloud API calls.

## Data Flow

### Quest Completion Flow

```
1. User completes quiz (Frontend)
   │
   ▼
2. Frontend validates answers locally
   │
   ▼
3. POST /api/complete-quest
   │
   ├─ Validates answers server-side
   ├─ Checks for duplicate completion
   └─ Returns reward amount
   │
   ▼
4. Frontend updates local state
   │
   ├─ Updates token balance (localStorage)
   └─ Marks quest as completed
   │
   ▼
5. User can claim tokens
   │
   ▼
6. POST /api/claim-tokens
   │
   ├─ Creates Stellar transaction
   ├─ Sends tokens to user wallet
   └─ Returns transaction hash
```

## Blockchain Integration

### Stellar Network

- **Network:** Stellar Testnet
- **Token Code:** CQT
- **Issuer:** Configured via `TOKEN_ISSUER_PUBLIC_KEY`
- **Distributor:** Configured via `DISTRIBUTOR_SECRET_KEY`

### Wallet Integration

- **Wallet:** Freighter Wallet (Stellar)
- **Connection:** Via `@stellar/freighter-api`
- **Network:** Testnet (configurable)

## Deployment Architecture

### Current Deployment (Vercel)

- **Frontend:** Static site (Vite build)
- **Backend:** Serverless functions
- **Configuration:** `vercel.json`

### Huawei Cloud Deployment (Recommended for Competition)

#### Option 1: FunctionGraph + API Gateway

1. **Frontend:** Deploy to OBS (Object Storage Service) + CDN
2. **Backend Functions:** Deploy to FunctionGraph
   - `complete-quest.js` → FunctionGraph function
   - `claim-tokens.js` → FunctionGraph function
   - `ai-assistant.js` → FunctionGraph function
3. **API Gateway:** Route `/api/*` to FunctionGraph functions
4. **Environment Variables:** Configure in FunctionGraph console

#### Option 2: ECS (Elastic Cloud Server)

1. **Frontend + Backend:** Deploy as Node.js application
2. **Load Balancer:** For high availability
3. **RDS:** For persistent quest completion tracking (if needed)

## Security Considerations

1. **API Keys:** Never expose `DISTRIBUTOR_SECRET_KEY` in frontend
2. **CORS:** Configured for API endpoints
3. **Input Validation:** All user inputs validated server-side
4. **Rate Limiting:** Should be configured at API Gateway level
5. **Environment Variables:** Use secure storage (FunctionGraph env vars)

## Performance Optimizations

1. **Frontend:**
   - Code splitting with React.lazy()
   - Image optimization
   - Caching strategies

2. **Backend:**
   - Stateless functions (suitable for serverless)
   - Request ID tracking for debugging
   - Error logging with context

## Future Enhancements

1. **Database Integration:** For persistent quest tracking
2. **Real-time Updates:** WebSocket for balance updates
3. **Advanced AI Features:** 
   - Personalized learning paths
   - Adaptive difficulty
   - Progress analytics
4. **Multi-chain Support:** Beyond Stellar network

## Development Workflow

1. **Local Development:**
   ```bash
   cd frontend && npm run dev
   vercel dev  # For API testing
   ```

2. **Testing:**
   - Manual testing with demo mode
   - Stellar testnet for blockchain testing
   - Mock AI responses for development

3. **Deployment:**
   ```bash
   vercel --prod  # Current
   # Or deploy to Huawei Cloud
   ```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - API base URL
- `VITE_WALLET_NETWORK` - Stellar network (testnet/mainnet)
- `VITE_CHAINQUEST_CONTRACT_ADDRESS` - Contract address

### Backend (FunctionGraph/Vercel)
- `TOKEN_CODE` - Token code (CQT)
- `TOKEN_ISSUER_PUBLIC_KEY` - Token issuer public key
- `DISTRIBUTOR_SECRET_KEY` - Distributor secret key (⚠️ SECRET)
- `HUAWEI_LLM_BASE_URL` - Huawei Cloud LLM endpoint
- `HUAWEI_LLM_API_KEY` - Huawei Cloud LLM API key
- `HUAWEI_LLM_MODEL` - LLM model name

---

_This architecture document is part of the Huawei Developer Competition Europe 2025 submission._


# ChainQuest Secure Learn-to-Earn Deployment Guide

This guide will help you deploy the secure learn-to-earn functionality for ChainQuest.

## Prerequisites

Before deploying, you need the following information:

1. **Token Code**: Your custom token code (e.g., 'CQT', 'QTOKEN')
2. **Token Issuer Public Key**: The public key of the account that created your token
3. **Distributor Secret Key**: The secret key of the account that will distribute tokens (KEEP THIS SECRET!)

## Step 1: Deploy Backend API to Vercel

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Deploy the API
```bash
cd /home/emreakdk/ChainQuest
vercel --prod
```

### 1.3 Set Environment Variables
After deployment, set these environment variables in your Vercel dashboard:

```bash
# Required: Your token configuration
TOKEN_CODE=YOUR_TOKEN_CODE_HERE
TOKEN_ISSUER_PUBLIC_KEY=YOUR_TOKEN_ISSUER_PUBLIC_KEY_HERE
DISTRIBUTOR_SECRET_KEY=YOUR_DISTRIBUTOR_SECRET_KEY_HERE
```

**⚠️ SECURITY WARNING**: Never expose the `DISTRIBUTOR_SECRET_KEY` in your frontend code or public repositories!

## Step 2: Update Frontend Configuration

### 2.1 Update API URL
Update the API base URL in your frontend environment:

```bash
cd /home/emreakdk/ChainQuest/frontend
```

Edit `.env` file:
```env
VITE_API_BASE_URL=https://your-vercel-app.vercel.app/api
```

Replace `your-vercel-app` with your actual Vercel app URL.

### 2.2 Install Dependencies
```bash
cd /home/emreakdk/ChainQuest/frontend
npm install
```

## Step 3: Test the Integration

### 3.1 Start Development Server
```bash
npm run dev
```

### 3.2 Test Quest Completion
1. Connect your wallet
2. Start a quest
3. Answer all questions correctly
4. Verify that tokens are sent to your wallet
5. Check that the quest is marked as completed

## Step 4: Production Deployment

### 4.1 Build Frontend
```bash
cd /home/emreakdk/ChainQuest/frontend
npm run build
```

### 4.2 Deploy Frontend
Deploy your frontend to your preferred hosting service (Vercel, Netlify, etc.).

## Security Features

### ✅ Implemented Security Measures

1. **Secret Key Protection**: Distributor secret key is only stored in backend environment variables
2. **Quest Validation**: Answers are validated server-side before token distribution
3. **Duplicate Prevention**: Users cannot complete the same quest twice
4. **Address Validation**: Stellar addresses are validated before processing
5. **Error Handling**: Comprehensive error handling for all failure scenarios

### 🔒 Security Best Practices

1. **Environment Variables**: All sensitive data is stored in environment variables
2. **CORS Configuration**: API endpoints have proper CORS headers
3. **Input Validation**: All inputs are validated before processing
4. **Rate Limiting**: Consider implementing rate limiting for production use
5. **Monitoring**: Monitor API usage and failed attempts

## API Endpoints

### POST /api/complete-quest

**Request Body:**
```json
{
  "userAddress": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "questId": "stellar-fundamentals",
  "answers": [
    "Stellar Consensus Protocol (SCP)",
    "XLM (Stellar Lumens)",
    "Geleneksel finansal sistem ile köprü kuran kuruluşlar",
    "2 XLM",
    "Python, JavaScript, Go, Java, C++"
  ]
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
    "transactionHash": "abc123...",
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

## Quest Configuration

The quest data is configured in `/api/complete-quest.js`. Each quest includes:

- **Quest ID**: Unique identifier
- **Reward Amount**: Token amount to award
- **Lessons**: Array of questions with correct answers

### Adding New Quests

1. Add quest data to `QUEST_DATA` object in `/api/complete-quest.js`
2. Update frontend quest data in `/frontend/src/data/questData.js`
3. Ensure both have matching quest IDs and reward amounts

## Troubleshooting

### Common Issues

1. **"Token configuration missing"**
   - Ensure all environment variables are set in Vercel
   - Check that variable names match exactly

2. **"Quest already completed"**
   - This is expected behavior - users cannot complete the same quest twice
   - Check the in-memory database in the API (consider using a real database for production)

3. **"Token payment failed"**
   - Check that the distributor account has sufficient token balance
   - Verify the token issuer and code are correct
   - Ensure the distributor account is funded with XLM for transaction fees

4. **CORS errors**
   - Verify the API URL is correct in frontend configuration
   - Check that CORS headers are properly set in the API

### Testing Checklist

- [ ] API deploys successfully to Vercel
- [ ] Environment variables are set correctly
- [ ] Frontend can connect to API
- [ ] Quest completion works end-to-end
- [ ] Tokens are received in wallet
- [ ] Quest is marked as completed
- [ ] Cannot complete the same quest twice
- [ ] Error handling works for invalid answers
- [ ] Error handling works for already completed quests

## Production Considerations

1. **Database**: Replace in-memory storage with a proper database (Vercel KV, Supabase, etc.)
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Monitoring**: Set up monitoring and alerting for failed transactions
4. **Backup**: Implement backup strategies for quest completion data
5. **Scaling**: Consider horizontal scaling for high user volumes

## Support

If you encounter issues:

1. Check the browser console for frontend errors
2. Check Vercel function logs for backend errors
3. Verify all environment variables are set correctly
4. Test with a small amount first before full deployment

---

**Remember**: Always test thoroughly in a testnet environment before deploying to mainnet!

# ChainQuest API

Secure backend API for ChainQuest learn-to-earn functionality.

## Overview

This API provides secure quest completion and token distribution functionality. It ensures that:

- Users cannot complete the same quest twice
- Answers are validated server-side
- Token payments are processed securely
- Secret keys are never exposed to the frontend

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Set the following environment variables:

```bash
# Required: Token configuration
TOKEN_CODE=YOUR_TOKEN_CODE_HERE
TOKEN_ISSUER_PUBLIC_KEY=YOUR_TOKEN_ISSUER_PUBLIC_KEY_HERE
DISTRIBUTOR_SECRET_KEY=YOUR_DISTRIBUTOR_SECRET_KEY_HERE
```

### 3. Deploy to Vercel

```bash
vercel --prod
```

## API Endpoints

### POST /api/complete-quest

Completes a quest and distributes tokens if answers are correct.

**Request:**
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

## Testing

Run the test script to verify API functionality:

```bash
node test-api.js
```

Make sure to update the test script with:
- Your actual API URL
- A valid testnet Stellar address
- Correct test data

## Security Features

- ✅ Secret key protection (never exposed to frontend)
- ✅ Quest validation (server-side answer checking)
- ✅ Duplicate prevention (users cannot complete same quest twice)
- ✅ Address validation (Stellar address format checking)
- ✅ Comprehensive error handling
- ✅ CORS configuration

## Quest Configuration

Quests are configured in the `QUEST_DATA` object in `complete-quest.js`. Each quest includes:

- Quest ID
- Reward amount (in tokens)
- Array of lessons with correct answers

### Adding New Quests

1. Add quest data to `QUEST_DATA` object
2. Ensure quest ID matches frontend configuration
3. Set appropriate reward amount
4. Define all lessons with correct answers

## Production Considerations

1. **Database**: Replace in-memory storage with a proper database
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Monitoring**: Set up monitoring and alerting
4. **Backup**: Implement backup strategies
5. **Scaling**: Consider horizontal scaling for high volumes

## Error Codes

- `400`: Bad Request (missing fields, invalid format)
- `404`: Quest not found
- `409`: Quest already completed
- `500`: Internal server error (token payment failed, etc.)

## Support

For issues or questions:
1. Check the deployment guide
2. Verify environment variables
3. Test with the provided test script
4. Check Vercel function logs

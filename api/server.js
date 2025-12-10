/**
 * ChainQuest API Server
 * 
 * Express server for Huawei Cloud deployment.
 * Registers all API endpoints and handles routing.
 * 
 * Environment Variables:
 * - PORT: Server port (default: 3000)
 * - All other API-specific environment variables
 */

// ✅ Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import completeQuestHandler from './complete-quest.js';
import claimTokensHandler from './claim-tokens.js';
import aiAssistantHandler from './ai-assistant.js';
import summarizeHandler from './summarize.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

// Register routes (no try-catch - let errors surface so we can see them)
app.post('/api/complete-quest', completeQuestHandler);
app.post('/api/claim-tokens', claimTokensHandler);
app.post('/api/ai-assistant', aiAssistantHandler);
app.post('/api/summarize', summarizeHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ChainQuest API'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[Server] Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server] ChainQuest API server running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server] Available endpoints:`);
  console.log(`  - POST /api/complete-quest`);
  console.log(`  - POST /api/claim-tokens`);
  console.log(`  - POST /api/ai-assistant`);
  console.log(`  - POST /api/summarize`);
  console.log(`  - GET /health`);
});

export default app;


// Test script for ChainQuest API
// Run this to test the API functionality before deployment

const API_BASE_URL = 'http://localhost:3000/api'; // Change to your deployed URL

// Test data
const testUserAddress = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Replace with a real testnet address
const testQuestId = 'stellar-fundamentals';
const testAnswers = [
  'Stellar Consensus Protocol (SCP)',
  'XLM (Stellar Lumens)',
  'Geleneksel finansal sistem ile köprü kuran kuruluşlar',
  '2 XLM',
  'Python, JavaScript, Go, Java, C++'
];

const wrongAnswers = [
  'Proof of Work (PoW)',
  'Bitcoin',
  'Mining pool\'ları',
  '1 XLM',
  'Python, Java'
];

async function testQuestCompletion() {
  console.log('🧪 Testing ChainQuest API...\n');

  // Test 1: Valid quest completion
  console.log('Test 1: Valid quest completion');
  try {
    const response = await fetch(`${API_BASE_URL}/complete-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: testUserAddress,
        questId: testQuestId,
        answers: testAnswers
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Test 1 PASSED: Quest completed successfully');
    } else {
      console.log('❌ Test 1 FAILED:', data.error);
    }
  } catch (error) {
    console.log('❌ Test 1 ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Duplicate quest completion
  console.log('Test 2: Duplicate quest completion (should fail)');
  try {
    const response = await fetch(`${API_BASE_URL}/complete-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: testUserAddress,
        questId: testQuestId,
        answers: testAnswers
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (!data.success && data.error.includes('already completed')) {
      console.log('✅ Test 2 PASSED: Duplicate quest correctly rejected');
    } else {
      console.log('❌ Test 2 FAILED: Should have rejected duplicate quest');
    }
  } catch (error) {
    console.log('❌ Test 2 ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Invalid answers
  console.log('Test 3: Invalid answers (should fail)');
  try {
    const response = await fetch(`${API_BASE_URL}/complete-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: testUserAddress,
        questId: testQuestId,
        answers: wrongAnswers
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (!data.success && data.error.includes('Invalid answers')) {
      console.log('✅ Test 3 PASSED: Invalid answers correctly rejected');
    } else {
      console.log('❌ Test 3 FAILED: Should have rejected invalid answers');
    }
  } catch (error) {
    console.log('❌ Test 3 ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Invalid quest ID
  console.log('Test 4: Invalid quest ID (should fail)');
  try {
    const response = await fetch(`${API_BASE_URL}/complete-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: testUserAddress,
        questId: 'invalid-quest-id',
        answers: testAnswers
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (!data.success && data.error.includes('Quest not found')) {
      console.log('✅ Test 4 PASSED: Invalid quest ID correctly rejected');
    } else {
      console.log('❌ Test 4 FAILED: Should have rejected invalid quest ID');
    }
  } catch (error) {
    console.log('❌ Test 4 ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 5: Invalid user address
  console.log('Test 5: Invalid user address (should fail)');
  try {
    const response = await fetch(`${API_BASE_URL}/complete-quest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: 'invalid-address',
        questId: testQuestId,
        answers: testAnswers
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (!data.success && data.error.includes('Invalid Stellar address')) {
      console.log('✅ Test 5 PASSED: Invalid address correctly rejected');
    } else {
      console.log('❌ Test 5 FAILED: Should have rejected invalid address');
    }
  } catch (error) {
    console.log('❌ Test 5 ERROR:', error.message);
  }

  console.log('\n🎉 API testing completed!');
}

// Run the tests
testQuestCompletion().catch(console.error);

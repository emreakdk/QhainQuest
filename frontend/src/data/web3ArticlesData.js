/**
 * Shared article data for Web3 Learning Portal
 * Used by both the article list and detail views
 */
export const web3Articles = [
  {
    id: 1,
    titleKey: 'portal.article.1.title',
    descriptionKey: 'portal.article.1.description',
    duration: 15,
    tokenReward: 25,
    category: 'defi',
    difficulty: 'beginner',
    author: 'ChainQuest Team',
    publishDate: '2024-01-15',
    contentKey: 'portal.article.1.content'
  },
  {
    id: 2,
    titleKey: 'portal.article.2.title',
    descriptionKey: 'portal.article.2.description',
    duration: 25,
    tokenReward: 30,
    category: 'smartcontract',
    difficulty: 'intermediate',
    author: 'ChainQuest Team',
    publishDate: '2024-01-20',
    contentKey: 'portal.article.2.content'
  },
  {
    id: 3,
    titleKey: 'portal.article.3.title',
    descriptionKey: 'portal.article.3.description',
    duration: 20,
    tokenReward: 28,
    category: 'nft',
    difficulty: 'beginner',
    author: 'ChainQuest Team',
    publishDate: '2024-01-25',
    contentKey: 'portal.article.3.content'
  },
  {
    id: 4,
    titleKey: 'portal.article.4.title',
    descriptionKey: 'portal.article.4.description',
    duration: 30,
    tokenReward: 35,
    category: 'smartcontract',
    difficulty: 'advanced',
    author: 'ChainQuest Team',
    publishDate: '2024-02-01',
    contentKey: 'portal.article.4.content'
  },
  {
    id: 5,
    titleKey: 'portal.article.5.title',
    descriptionKey: 'portal.article.5.description',
    duration: 22,
    tokenReward: 30,
    category: 'defi',
    difficulty: 'intermediate',
    author: 'ChainQuest Team',
    publishDate: '2024-02-05',
    contentKey: 'portal.article.5.content'
  },
  {
    id: 6,
    titleKey: 'portal.article.6.title',
    descriptionKey: 'portal.article.6.description',
    duration: 18,
    tokenReward: 25,
    category: 'security',
    difficulty: 'beginner',
    author: 'ChainQuest Team',
    publishDate: '2024-02-10',
    contentKey: 'portal.article.6.content'
  },
  {
    id: 7,
    titleKey: 'portal.article.7.title',
    descriptionKey: 'portal.article.7.description',
    duration: 28,
    tokenReward: 32,
    category: 'defi',
    difficulty: 'advanced',
    author: 'ChainQuest Team',
    publishDate: '2024-02-15',
    contentKey: 'portal.article.7.content'
  },
  {
    id: 8,
    titleKey: 'portal.article.8.title',
    descriptionKey: 'portal.article.8.description',
    duration: 20,
    tokenReward: 27,
    category: 'nft',
    difficulty: 'intermediate',
    author: 'ChainQuest Team',
    publishDate: '2024-02-20',
    contentKey: 'portal.article.8.content'
  }
];

/**
 * Get article by ID
 */
export const getArticleById = (id) => {
  return web3Articles.find(article => article.id === parseInt(id));
};


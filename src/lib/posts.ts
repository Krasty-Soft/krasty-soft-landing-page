export interface Post {
  slug: string,
  title: string,
  tags: string[],
  content: string,
  preview: string,
}
export const posts: Post[] = [
  {
    slug: 'transforming-healthcare-software-development-with-retool',
    title: 'Transforming Healthcare Software Development with Retool',
    tags: ['qa', 'case study'],
    content: 'This is a test blog post content.',
    preview: '',
  },
  {
    slug: 'cost-care-pro-revolutionizing-healthcare-training-on-a-budget',
    title: 'CostCare Pro: Revolutionizing Healthcare Training on a Budget',
    tags: ['case study'],
    content: 'Another test post for mock testing.',
    preview: '',
  },
  {
    slug: 'end-inventory-headache-with-krasty-soft',
    title: 'End Inventory Headache with Krasty Soft',
    tags: ['qa', 'podcast'],
    content: 'Another test post for mock testing.',
    preview: '',
  },
  {
    slug: 'med-learn-pro-transforming-healthcare',
    title: 'MedLearn Pro: Transforming Healthcare Training with AI',
    tags: ['development'],
    content: 'Another test post for mock testing.',
    preview: '',
  },
  {
    slug: 'dark-mode-vs-light-mode-which-one-improves-user-experience',
    title: 'Dark Mode vs. Light Mode: Which One Improves User Experience?',
    tags: ['ux/ui', 'ux research'],
    content: 'Another test post for mock testing.',
    preview: '',
  },
  {
    slug: 'the-importance-of-multi-factor-authentication-in-cybersecurity',
    title: 'The Importance of Multi-Factor Authentication in Cybersecurity',
    tags: ['case study'],
    content: 'Another test post for mock testing.',
    preview: '',
  },
];

export async function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug) || null;
}

export async function getAllSlugs() {
  return posts.map((post) => ({ slug: post.slug }));
}

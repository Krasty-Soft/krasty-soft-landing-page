export const jobs = [
  {
    slug: 'senior-frontend-dev-552161726681',
    title: 'Senior Software Engineer',
    description: '3-4 years of experience',
    tags: 'Remote, full-time',
    link: '/careers',
  },
  {
    slug: 'fullstack-dev-887837762378',
    title: 'Full-Stack Developer',
    description: '1-4 years of experience',
    tags: 'Remote, full-time',
    link: '/careers',
  },
  {
    slug: 'frontend-dev-689831162555',
    title: 'Front-end Developer',
    description: '2-4 years of experience',
    tags: 'Remote, full-time',
    link: '/careers',
  },
]

export async function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug) || null;
}

export async function getAllSlugs() {
  return jobs.map((job) => ({ slug: job.slug }));
}

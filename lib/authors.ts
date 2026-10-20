// People who write playbooks. Photos live in public/authors.

export type Author = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
};

export const authors = {
  'abdullah-liaqat': {
    name: 'Abdullah Liaqat',
    role: 'Founder, Veleads',
    bio: 'Abdullah runs the 90-Day Pipeline Sprint, helping seed and Series A founders book more sales calls through LinkedIn and cold email.',
    image: '/authors/abdullah-liaqat.jpg',
    linkedin: 'https://www.linkedin.com/in/abdullah-liaqat-3623701a1',
  },
} satisfies Record<string, Author>;

export type AuthorId = keyof typeof authors;

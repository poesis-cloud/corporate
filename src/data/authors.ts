export interface Author {
  name: string;
  title: string;
  avatar: string;
  linkedin: string;
}

export const defaultAuthorId = 'clement-cazaud';

export const authors: Record<string, Author> = {
  'clement-cazaud': {
    name: 'Clément Cazaud',
    title: 'Chief Executive, Product & Architecture Officer',
    avatar: '/clement-cazaud.jpg',
    linkedin: 'https://www.linkedin.com/in/clement-cazaud',
  },
  'brahim-ben-helal': {
    name: 'Brahim Ben Helal',
    title: 'Chief Growth Officer',
    avatar: '/brahim-ben-helal.jpg',
    linkedin: 'https://www.linkedin.com/company/poesis-cloud',
  },
  'hamza-abidi': {
    name: 'Hamza Abidi',
    title: 'Chief Technology & Engineering Officer',
    avatar: '/hamza-abidi.jpg',
    linkedin: 'https://www.linkedin.com/in/abidihamza',
  },
};

export function getAuthor(authorId?: string): Author {
  return (authorId && authors[authorId]) || authors[defaultAuthorId];
}

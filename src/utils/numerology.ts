export const calculateLifePathNumber = (dob: string): number => {
  // dob format: YYYY-MM-DD
  const digits = dob.replace(/\D/g, '').split('').map(Number);
  
  let sum = digits.reduce((a, b) => a + b, 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  return sum;
};

export const calculateDestinyNumber = (name: string): number => {
  const alphabetMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  let sum = letters.reduce((acc, letter) => acc + (alphabetMap[letter] || 0), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }

  return sum;
};

export const careerMapping: Record<number, string[]> = {
  1: ['Leadership', 'Business', 'Entrepreneurship', 'Management'],
  2: ['HR', 'Counseling', 'Diplomacy', 'Mediation'],
  3: ['Creative Arts', 'Media', 'Writing', 'Entertainment'],
  4: ['Engineering', 'Data Analysis', 'Systems Architecture', 'Accounting'],
  5: ['Sales', 'Marketing', 'Travel', 'Public Relations'],
  6: ['Teaching', 'Healthcare', 'Social Work', 'Design'],
  7: ['Research', 'Analytics', 'Science', 'Philosophy'],
  8: ['Finance', 'Executive Management', 'Law', 'Real Estate'],
  9: ['Social Work', 'NGOs', 'Philanthropy', 'Human Resources'],
  11: ['Spiritual Leadership', 'Inspirational Speaking', 'Psychology'],
  22: ['Large-scale Project Management', 'Architecture', 'Global Business'],
  33: ['Master Teaching', 'Healing Arts', 'Global Philanthropy']
};

export const personalityTraits: Record<number, string> = {
  1: 'Independent, ambitious, and a natural leader.',
  2: 'Cooperative, sensitive, and a peacemaker.',
  3: 'Expressive, creative, and highly sociable.',
  4: 'Practical, disciplined, and detail-oriented.',
  5: 'Adventurous, adaptable, and freedom-loving.',
  6: 'Nurturing, responsible, and family-oriented.',
  7: 'Analytical, introspective, and a seeker of truth.',
  8: 'Ambitious, authoritative, and business-minded.',
  9: 'Compassionate, humanitarian, and generous.',
  11: 'Intuitive, inspiring, and visionary.',
  22: 'Master builder, practical idealist, and highly capable.',
  33: 'Master teacher, deeply compassionate, and self-sacrificing.'
};

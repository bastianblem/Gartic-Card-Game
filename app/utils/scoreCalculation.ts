export function calculatePoints(guessed: string[], correct: string[]): number {
  // 1. Player is afk | did not submit
  if (!guessed || guessed.length === 0) {
    return -50;
  }

  // 2. How many matches does one have
  const matches = guessed.filter((emoji) => correct.includes(emoji)).length;

  // 3. How many points to get
  switch (matches) {
    case 4:
      return 100;
    case 3:
      return 60;
    case 2:
      return 30;
    case 1:
      return 10;
    default:
      return 0;
  }
}

export const paramSamples = {
  isGenderKnown: {
    name: 'isGenderKnown',
    okValues: [true, false, undefined] as const,
    nokValues: [0, 'invalidInput'] as const,
  },
  isBirthdateKnown: {
    name: 'isBirthdateKnown',
    okValues: [true, false, undefined] as const,
    nokValues: [0, 'invalidInput'] as const,
  },
  date: {
    name: 'date',
    okValues: ['2000-11-15', '2020-11-15', '1915-01-30', ''] as const,
    nokValues: ['invalidInput', '1915-15-01', '1915-02-31'] as const,
  },
  amount: {
    name: 'amount',
    okValues: [1, 100] as const,
    nokValues: [0, -1, 101] as const,
  },
} as const;

export const paramSamples = {
  version: {
    name: 'version',
    okValues: [1, 3, 4, 5] as const,
    nokValues: [-1, 0, 6] as const,
  },
  amount: {
    name: 'amount',
    nokValues: [0, -1, 101] as const,
    okValues: [1, 5, 100] as const,
  },
} as const;

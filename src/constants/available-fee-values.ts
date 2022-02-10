export const availableFeeValues = [0.075] as const;

export type AvailableFeeValues = typeof availableFeeValues[number];

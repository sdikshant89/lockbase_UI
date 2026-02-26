type CharSet = {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
};
type Advanced = {
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  avoidRepeats: boolean;
  beginWithLetter: boolean;
};
type PresetKey = 'max' | 'balanced' | 'easy' | 'pin';
type HistoryItem = {
  id: string;
  value: string;
  createdAt: number;
  meta: string;
};

export type { Advanced, CharSet, HistoryItem, PresetKey };

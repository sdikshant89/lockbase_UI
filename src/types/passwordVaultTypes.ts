interface PrkPackage {
  encPrkPass: string;
  saltPass: string;
  ivPass: string;
}

interface VaultState {
  prkPackage: PrkPackage | null;
}

export type { PrkPackage, VaultState };

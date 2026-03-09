interface PrkPackage {
  encPrkPass: string;
  saltPass: string;
  ivPass: string;
}

interface VaultState {
  prkPackage: PrkPackage | null;
}

export type SecretType = 'password' | 'pin' | 'api_key' | 'note' | 'other';

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CredentialFormValues {
  title: string;
  username?: string;
  websiteName: string;
  url?: string;
  secretType: SecretType;
  secretValue: string;
  favorite: boolean;
  category?: Category;
  tags?: Tag[];
}

export interface Credential extends CredentialFormValues {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { PrkPackage, VaultState };

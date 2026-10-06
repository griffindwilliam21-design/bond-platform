export type ChainId = "arbitrum" | "base" | "ethereum";

export type Role =
  | "admin"
  | "issuer"
  | "investor"
  | "compliance"
  | "custodian"
  | "governance"
  | "operator";

export type BondStatus =
  | "draft"
  | "approved"
  | "active"
  | "paused"
  | "matured"
  | "redeemed"
  | "defaulted";

export type User = {
  id: string;
  address: string;
  role: Role;
  kycStatus: "pending" | "verified" | "rejected";
  country: string;
  createdAt: string;
};

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: ChainId;
  contractAddress?: string;
};

export type Collateral = {
  id: string;
  assetId: string;
  amount: string;
  chainId: ChainId;
  collateralizedBy: string;
  status: "locked" | "released" | "available";
};

export type Bond = {
  id: string;
  issuerId: string;
  name: string;
  symbol: string;
  principal: string;
  couponRate: string;
  maturityDate: string;
  status: BondStatus;
  chainId: ChainId;
  collateralId?: string;
  createdAt: string;
};

export type ComplianceDecision = {
  bondId: string;
  userId: string;
  approved: boolean;
  reason?: string;
  checkedAt: string;
};

export type SettlementInstruction = {
  id: string;
  bondId: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  chainId: ChainId;
  status: "pending" | "submitted" | "settled" | "failed";
};

export type GovernanceProposal = {
  id: string;
  title: string;
  summary: string;
  proposer: string;
  status: "draft" | "active" | "passed" | "rejected";
  createdAt: string;
};

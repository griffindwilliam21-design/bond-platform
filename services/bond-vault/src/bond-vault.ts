import type { Bond, SettlementInstruction } from "../../core/src/models.js";

export class BondVault {
  createBond(bond: Bond): Bond {
    return { ...bond, status: "draft" };
  }

  approveBond(bond: Bond): Bond {
    return { ...bond, status: "approved" };
  }

  activateBond(bond: Bond): Bond {
    return { ...bond, status: "active" };
  }

  matureBond(bond: Bond): Bond {
    return { ...bond, status: "matured" };
  }

  redeemBond(bond: Bond): Bond {
    return { ...bond, status: "redeemed" };
  }
}

export class BondIssuerService {
  issueBond(bond: Bond): SettlementInstruction {
    return {
      id: `settlement-${bond.id}`,
      bondId: bond.id,
      from: bond.issuerId,
      to: "bond-vault",
      amount: bond.principal,
      token: bond.symbol,
      chainId: bond.chainId,
      status: "pending",
    };
  }
}

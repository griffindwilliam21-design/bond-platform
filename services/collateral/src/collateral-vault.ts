import type { Bond, Collateral } from "../../core/src/models.js";

export class CollateralVault {
  lockCollateral(collateral: Collateral): Collateral {
    return { ...collateral, status: "locked" };
  }

  releaseCollateral(collateral: Collateral): Collateral {
    return { ...collateral, status: "released" };
  }

  ensureSufficientCollateral(collateral: Collateral, requiredAmount: string): boolean {
    return BigInt(collateral.amount) >= BigInt(requiredAmount);
  }

  getVaultBalance(collateral: Collateral): string {
    return collateral.amount;
  }
}

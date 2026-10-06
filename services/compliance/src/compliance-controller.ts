import type { Bond, Collateral, User } from "../../core/src/models.js";

export class ComplianceController {
  checkBondEligibility(user: User, bond: Bond, collateral?: Collateral): { approved: boolean; reason?: string } {
    if (!user || user.kycStatus !== "verified") {
      return { approved: false, reason: "User KYC not verified." };
    }

    if (!bond || !bond.principal || !bond.couponRate) {
      return { approved: false, reason: "Bond data incomplete." };
    }

    if (collateral && collateral.status !== "locked") {
      return { approved: false, reason: "Collateral is not locked." };
    }

    return { approved: true };
  }
}

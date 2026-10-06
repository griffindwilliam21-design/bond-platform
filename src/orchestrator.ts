import { Authenticator, PermissionService } from "../services/auth/src/authenticator.js";
import { ComplianceController } from "../services/compliance/src/compliance-controller.js";
import { CollateralVault } from "../services/collateral/src/collateral-vault.js";
import { BondVault, BondIssuerService } from "../services/bond-vault/src/bond-vault.js";
import { SettlementEngine } from "../services/settlement/src/settlement-engine.js";
import { GovernanceEngine } from "../services/governance/src/governance.js";
import { MonitoringEngine } from "../services/monitoring/src/monitoring-engine.js";
import { ArbitrumAdapter } from "../adapters/arbitrum/src/index.js";
import { BaseAdapter } from "../adapters/base/src/index.js";
import type { Bond, User, SettlementInstruction } from "../packages/core/src/models.js";

export class BondPlatformOrchestrator {
  private readonly auth = new Authenticator();
  private readonly compliance = new ComplianceController();
  private readonly collateralVault = new CollateralVault();
  private readonly bondVault = new BondVault();
  private readonly issuerService = new BondIssuerService();
  private readonly settlement = new SettlementEngine();
  private readonly governance = new GovernanceEngine();
  private readonly monitoring = new MonitoringEngine();
  private readonly arbitrum = new ArbitrumAdapter();
  private readonly base = new BaseAdapter();

  issueBond(input: { user: User; bond: Bond; collateral?: any }) {
    const isAuthorized = this.auth.ensureAccess(input.user, ["issuer", "admin"]);
    if (!isAuthorized) {
      return { ok: false, reason: "Unauthorized issuance attempt" };
    }

    const compliance = this.compliance.checkBondEligibility(input.user, input.bond, input.collateral);
    if (!compliance.approved) {
      return { ok: false, reason: compliance.reason ?? "Compliance check failed" };
    }

    const lockedCollateral = input.collateral ? this.collateralVault.lockCollateral(input.collateral) : undefined;
    const bond = this.bondVault.createBond(input.bond);
    const approvedBond = this.bondVault.approveBond({ ...bond, status: "approved" });
    const settlementInstruction = this.issuerService.issueBond(approvedBond);
    const submittedInstruction = this.settlement.submitInstruction(settlementInstruction);

    this.monitoring.logEvent("bond_issued", "bond-platform", {
      bondId: bond.id,
      userId: input.user.id,
      settlementStatus: submittedInstruction.status,
      collateralLocked: !!lockedCollateral,
    });

    return {
      ok: true,
      bond: approvedBond,
      settlementInstruction: submittedInstruction,
      collateral: lockedCollateral,
      chain: this.arbitrum.connect(),
    };
  }

  settleBond(input: { instruction: SettlementInstruction }) {
    const settled = this.settlement.settleInstruction(input.instruction);
    this.monitoring.logEvent("settlement_processed", "bond-platform", {
      instructionId: settled.id,
      status: settled.status,
    });

    return {
      ok: true,
      result: settled,
      chain: this.base.connect(),
    };
  }

  getStatus() {
    return {
      ok: true,
      monitoring: this.monitoring.healthCheck(),
      arbitrum: this.arbitrum.connect(),
      base: this.base.connect(),
      permissions: {
        issuer: PermissionService.canIssueBond,
        compliance: PermissionService.canApproveCompliance,
      },
    };
  }
}

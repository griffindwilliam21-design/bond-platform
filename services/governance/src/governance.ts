import type { GovernanceProposal } from "../../core/src/models.js";

export class GovernanceEngine {
  propose(proposal: GovernanceProposal): GovernanceProposal {
    return { ...proposal, status: "draft" };
  }

  activate(proposal: GovernanceProposal): GovernanceProposal {
    return { ...proposal, status: "active" };
  }

  approve(proposal: GovernanceProposal): GovernanceProposal {
    return { ...proposal, status: "passed" };
  }

  reject(proposal: GovernanceProposal): GovernanceProposal {
    return { ...proposal, status: "rejected" };
  }
}

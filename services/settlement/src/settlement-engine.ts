import type { SettlementInstruction } from "../../core/src/models.js";

export class SettlementEngine {
  createInstruction(instruction: SettlementInstruction): SettlementInstruction {
    return { ...instruction, status: "pending" };
  }

  submitInstruction(instruction: SettlementInstruction): SettlementInstruction {
    return { ...instruction, status: "submitted" };
  }

  settleInstruction(instruction: SettlementInstruction): SettlementInstruction {
    return { ...instruction, status: "settled" };
  }
}

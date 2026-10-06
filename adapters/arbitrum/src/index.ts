export class ArbitrumAdapter {
  network = "arbitrum";

  connect() {
    return { network: this.network, connected: true };
  }

  submitTransaction(payload: Record<string, unknown>) {
    return { network: this.network, payload, submitted: true };
  }
}

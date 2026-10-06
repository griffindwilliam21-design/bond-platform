export type EventRecord = {
  type: string;
  source: string;
  payload: Record<string, unknown>;
  timestamp: string;
};

export class MonitoringEngine {
  private events: EventRecord[] = [];

  logEvent(type: string, source: string, payload: Record<string, unknown>): EventRecord {
    const record: EventRecord = {
      type,
      source,
      payload,
      timestamp: new Date().toISOString(),
    };

    this.events.push(record);
    return record;
  }

  getEvents(): EventRecord[] {
    return this.events;
  }

  healthCheck(): { ok: boolean; events: number } {
    return {
      ok: true,
      events: this.events.length,
    };
  }
}

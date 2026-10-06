import express from "express";
import { appConfig } from "./config.js";
import { BondPlatformOrchestrator } from "./orchestrator.js";

const app = express();
const orchestrator = new BondPlatformOrchestrator();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "bond-platform", environment: appConfig.nodeEnv });
});

app.post("/bond/issue", (req, res) => {
  const result = orchestrator.issueBond(req.body);
  res.json(result);
});

app.post("/bond/settle", (req, res) => {
  const result = orchestrator.settleBond(req.body);
  res.json(result);
});

app.get("/status", (_req, res) => {
  res.json(orchestrator.getStatus());
});

app.listen(appConfig.port, () => {
  console.log(`Bond Platform API listening on port ${appConfig.port}`);
});

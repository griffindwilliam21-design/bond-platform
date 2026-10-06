import dotenv from "dotenv";

dotenv.config();

export type AppConfig = {
  port: number;
  nodeEnv: string;
  arbitrumRpcUrl?: string;
  baseRpcUrl?: string;
  complianceMode: "strict" | "moderate";
  secretKey?: string;
};

export const appConfig: AppConfig = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  arbitrumRpcUrl: process.env.ARBITRUM_RPC_URL,
  baseRpcUrl: process.env.BASE_RPC_URL,
  complianceMode: (process.env.COMPLIANCE_MODE as "strict" | "moderate") ?? "strict",
  secretKey: process.env.SECRET_KEY,
};

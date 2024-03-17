import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RodruxRocksModule", (m) => {
  const rodruxRocks = m.contract("RodruxRocks", ['50']);
  return { rodruxRocks };
});
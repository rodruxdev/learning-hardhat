import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RodruxRocksModule", (m) => {
  const rodruxRocks = m.contract("RodruxRocks", [10000]);
  return { rodruxRocks };
});

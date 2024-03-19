import { expect } from "chai";
import { RodruxRocks } from "../typechain-types";

describe("Testing RodruxRocks", () => {
  let deployed: RodruxRocks;
  let owner: Signer;
  beforeEach(async () => {
    const maxSupply = 2;
    [owner] = await ethers.getSigners();
    const RodruxRocks = await ethers.getContractFactory("RodruxRocks");
    deployed = await RodruxRocks.deploy(maxSupply);
  });

  describe("Deployment", () => {
    it("Sets max supply to passed param", async () => {
      const maxSupply = 2;

      const returnedMaxSupply = await deployed.maxSupply();
      expect(maxSupply).to.equal(returnedMaxSupply);
    });
  });

  describe("Minting", () => {
    it("Mints a new token and assigns it to owner", async () => {
      await deployed.mint();

      const ownerOfMinted = await deployed.ownerOf(0);

      expect(ownerOfMinted).to.equal(owner.address);
    });

    it("Has a minting limit", async () => {
      // Mint all
      await Promise.all([deployed.mint(), deployed.mint()]);

      // Assert the last minting
      await expect(deployed.mint()).to.be.revertedWith(
        "No more RodruxRocks available"
      );
    });
  });

  describe("tokenURI", () => {
    it("returns valid metadata", async () => {
      await deployed.mint();
      const tokenURI = await deployed.tokenURI(0);
      const stringifiedTokenURI = tokenURI.toString();
      const [, base64JSON] = stringifiedTokenURI.split(
        "data:application/json;base64,"
      );
      const stringifiedMetadata = Buffer.from(base64JSON, "base64").toString(
        "ascii"
      );

      const metadata = JSON.parse(stringifiedMetadata);
      console.log(metadata);

      expect(metadata).to.have.all.keys(
        "name",
        "description",
        "image",
        "attributes"
      );
    });
  });
});

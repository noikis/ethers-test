import TronWeb from "tronweb";

// const provider = new ethers.providers.JsonRpcProvider(
//   "https://rpc.ankr.com/http/tron"
// );

// DOC: https://developers.tron.network/reference
// Scan Explorer: https://test.tronscan.org/#/

const fullNode = "https://testhttpapi.tronex.io";
const solidityNode = "https://testhttpapi.tronex.io";
const eventServer = "https://testhttpapi.tronex.io";
const sideOptions = {
  fullNode: "https://suntest.tronex.io",
  solidityNode: "https://suntest.tronex.io",
  eventServer: "https://suntest.tronex.io",
  mainGatewayAddress: "TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU",
  sideGatewayAddress: "TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX",
  sideChainId: "413AF23F37DA0D48234FDD43D89931E98E1144481B",
};
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, {
  fullNode: sideOptions.fullNode,
  solidityNode: sideOptions.solidityNode,
  eventServer: sideOptions.eventServer,
  mainGatewayAddress: sideOptions.mainGatewayAddress,
  sideGatewayAddress: sideOptions.sideGatewayAddress,
  sideChainId: sideOptions.sideChainId,
});
tronWeb.trx.getBlock(100).then(console.log);

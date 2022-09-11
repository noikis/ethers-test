import { ethers, Contract } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/bsc_testnet_chapel"
);
const _abiCoder = ethers.utils.defaultAbiCoder;

const getBlock = async (number = 21240514) => {
  const block = await provider.getBlock(number);
  return block;
};

const getTxByHash = async (
  txHash = "0x21c5ffd31d95a040f4fb796007914ac8a10c348ac9d17b1ee45f8b44bb83194e"
) => {
  const tx = await provider.getTransaction(txHash);
  return tx;
};

const _decodeTransferData = (hexInput) => {
  //   const txContract =
  //   "0x9737989c470dc5ee2a833bb3a3c770a4fdb49f9a7201973e19bee87e32e82b1e";
  // const tx = await getTxByHash(txContract);
  try {
    const _contractTransferMethod = "0xa9059cbb";
    const hexPrefix = "0x";
    const isHexString = hexInput.slice(0, hexPrefix.length) === hexPrefix;
    if (
      !isHexString ||
      !(
        hexInput.slice(0, _contractTransferMethod.length) ===
        _contractTransferMethod
      )
    ) {
      return null;
    }

    const contractTypes = ["address", "uint256"];
    const hexString =
      `0x` + hexInput.slice(_contractTransferMethod.length, hexInput.length);
    const decodedData = _abiCoder.decode(contractTypes, hexString);

    const [address, amount] = decodedData;
    return {
      to: address.toLowerCase(),
      amount: amount.toString(),
    };
  } catch (error) {
    console.error(error.message);
  }
};

const estimateGasInput = {
  address: "0x8516fc284aeeaa0374e66037bd2309349ff728ea",
  abi: [
    "function transfer(address recipient, uint256 amount) external returns (bool)",
  ],
  method: "transfer",
  params: ["0x3c2870A9E8e69eDc3691393C0eB664C619015fC7", "10"],
};

const estimateGas = async (input) => {
  const { address, abi, method, params } = input;
  const contract = new Contract(address, abi, provider);
  const amount = await contract.estimateGas[method](params[0], params[1]);
  return amount.toString();
};

estimateGas(estimateGasInput).then((amount) =>
  console.log(`Gas Etimation = ${amount}`)
);

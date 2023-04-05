import Web3 from "web3";

import { SendTxParams } from "@src/utils/types";

import { appConfig } from "../utils/config";

const { TEST_NETWORK, TX_KEY } = appConfig;

const web3 = new Web3(TEST_NETWORK);

const privateKey = Buffer.from(TX_KEY as string, "hex");

/**
 * Get the balance of an Ethereum address in Ether
 * @param address The Ethereum address to get the balance of
 * @returns The balance of the address in Ether
 */
export async function getBalance(address: string): Promise<string> {
  // Call the `getBalance` function from the `web3.eth` object, passing in the address as an argument
  const result = await web3.eth.getBalance(address.toString());
  // Convert the result from wei to ether using the `fromWei` function from the `web3.utils` object
  const balance = web3.utils.fromWei(result, "ether");
  // Return the balance as a string
  return balance;
}

/**

Sign a transaction using the provided parameters
@param {object} SendTxParams - Object containing transaction parameters
@param {string} SendTxParams.from - Sender's Ethereum address
@param {string} SendTxParams.to - Recipient's Ethereum address
@param {number} SendTxParams.value - Amount to send in Ether (default is 0.0001)
@returns {Promise<string | undefined>} - Promise containing the transaction hash if successful, or undefined if failed
*/
export async function signTransaction({
  from,
  to,
  value = 0.0001,
}: SendTxParams): Promise<string | undefined> {
  // Estimate the gas limit needed for the transaction

  const gasLimit = await web3.eth.estimateGas({
    from,
    to,
    value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")),
  });
  // Get the current gas price
  const gasPrice = await web3.eth.getGasPrice();

  // Get the nonce for the sending account
  const nonce = await web3.eth.getTransactionCount(from);

  // Create the transaction object with the necessary parameters
  const tx = {
    from,
    to,
    nonce,
    gas: web3.utils.toHex(gasLimit),
    gasPrice: web3.utils.toHex(gasPrice),
    value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")),
  };

  // Sign the transaction using the sender's private key
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    privateKey.toString("hex")
  );

  // Send the signed transaction to the network and return the transaction hash
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction as string
  );

  return transactionReceipt.transactionHash;
}

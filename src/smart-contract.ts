/** ***********************
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/

import { generate_event, Storage, get_balance, transfer_coins } from "massa-sc-std";
import { JSON } from "json-as";

export function depositMoney(_args: string): void {
    const addr: string = ; // Identify the address of the wallet which is depositing money
    const amount: u64 = ; // Identify the amount of money the wallet is depositing
    let newOwnings: u64 = amount + getBalance(addr);

    // Change in the storage how much this address owns
    Storage.set_data(addr, newOwnings.toString());

    let response: string = "You have deposited " +  + " MASSA" + "\n You now own " +  + " MASSA in the smart contract";
    generate_event(response);
}

export function withdrawMoney(_args: string): void {
    const addr: string = ; // Identify the address of the wallet which is withdrawing money
    const amount: u64 = ; // Identify the amount of money the wallet is withdrawing
    let response: string;

    // Find in the storage how much this address already owns
    let ownings: u64 = getBalance(addr);

    if(amount <= ownings){
        transfer_coins(addr, amount);
        let newOwnings: u64 = ownings - amount;

        // Update in the storage how much this address owns
        Storage.set_data(addr, newOwnings.toString());

        response= "You have withdrawn " +  + " MASSA" + "\n You now own " +  + " MASSA in the smart contract";
    }else{
        response = "You can't withdraw more than what you have"
    }
    generate_event(response);
}

export function getBalance(addr: string): u64 {
    let amount: u64 = 0;

    // Find in the storage how much this address owns
    amount = JSON.parse<u64>(Storage.get_data(addr));

    let response: string = amount.toString();
    generate_event("User " + addr + " owns " + response + " MASSA in the smart contract");
    return amount;
}

export function getTotalBalance(): u64 {
    let scTotal: u64 = get_balance();
    generate_event("There is a total of " + scTotal.toString() + "in the smartcontract");
    return scTotal;
}
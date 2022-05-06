/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { create_sc, include_base64, print, call, Context, generate_event } from "massa-sc-std";
import { JSON } from 'json-as';

export function main(_args: string): void {
    const bytes = include_base64('./build/smart-contract.wasm');
    let addr = create_sc(bytes);
    print("Address = " + addr);
    generate_event("Smart contract deployed !");
}

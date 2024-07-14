//importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//definir a rede. Rede de teste(testnet) rede real(bitcoin)
const network = bitcoin.networks.testnet;

//derivação de carteiras HD(hierarchical deterministic)
//testnet(m/49'/1'/0'/0) bitcoin(m/49'/0'/0'/0)
const path = `m/49'/1'/0'/0`;

//criar seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criar raiz da carteira deterministica
let root = bip32.fromSeed(seed, network);

//criando uma conta = par privKey e pubKeys
let account = root.derivePath(path);
//cria conta nó apartir da raiz
let node = account.derive(0).derive(0);

//gera endereço
let btcAddress = bitcoin.payments.p2pkh(
    {
        pubkey: node.publicKey,
        network: network,
    }
).address

console.log(" Carteira gerada ");
console.log(" Endereço: ", btcAddress);
console.log(" Chave privada: ", node.toWIF());
console.log(" Seed ", mnemonic);
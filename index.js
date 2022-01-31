"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var msg = "nonce:\n\
0\n\
from:\n\
0xb1b6356ea9e2f3bf9867d6ac1c1bfd2cb1553abb\n\
functionSignature:\n\
0x26092b83\n\
";
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, provider, signer, contract, messageHash, messageHashBytes, flatSig, sig, gasPrice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                privateKey = process.env.PK;
                provider = new ethers_1.ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
                signer = new ethers_1.ethers.Wallet(privateKey, provider);
                console.log(signer.address);
                contract = new ethers_1.ethers.Contract("0xa3fffddc964c2122ffa3a43e3aa8125f4587dc21", [
                    {
                        inputs: [
                            { internalType: "address", name: "userAddress", type: "address" },
                            { internalType: "bytes", name: "functionSignature", type: "bytes" },
                            { internalType: "bytes32", name: "sigR", type: "bytes32" },
                            { internalType: "bytes32", name: "sigS", type: "bytes32" },
                            { internalType: "uint8", name: "sigV", type: "uint8" },
                        ],
                        name: "executeMetaTransaction",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function"
                    },
                ], signer);
                messageHash = ethers_1.ethers.utils.id(msg);
                messageHashBytes = ethers_1.ethers.utils.arrayify(messageHash);
                return [4 /*yield*/, signer.signMessage(messageHashBytes)
                    // console.log(flatSig + "\n")
                ];
            case 1:
                flatSig = _a.sent();
                sig = ethers_1.ethers.utils.splitSignature(flatSig);
                return [4 /*yield*/, provider.getGasPrice()];
            case 2:
                gasPrice = _a.sent();
                contract.executeMetaTransaction(signer.address, ethers_1.ethers.utils.arrayify("0x26092b83"), sig.r, sig.s, sig.v, {
                    gasLimit: 1000000,
                    gasPrice: gasPrice
                });
                return [2 /*return*/];
        }
    });
}); };
main();

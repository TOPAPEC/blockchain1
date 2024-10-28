# NOT Sample Hardhat Project


TOKEN 0x6f651b94322952716632De9b63c252a7dE4D9658
https://sepolia.etherscan.io/address/0x6f651b94322952716632De9b63c252a7dE4D9658#code

Оракул 0xf59E7555381cAcb7e94C5fbC711955bD958Bd100
https://sepolia.etherscan.io/address/0xf59E7555381cAcb7e94C5fbC711955bD958Bd100#code

Враппер 0x51351b5603f031A27BA941c4339FC61CD4b8cf6D
https://sepolia.etherscan.io/address/0x51351b5603f031A27BA941c4339FC61CD4b8cf6D#code

Тесты токена в test/Token.test.ts
Тесты оракла в test/Oracle.test.ts

Деплой и обмен eth на weth в scripts/deployAndInteract.ts
Деплой оракла в deployOracle.ts
Оракла верифицировал через npx hardhat verify --network sepolia 0x51351b5603f031A27BA941c4339FC61CD4b8cf6D "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
Токен через 
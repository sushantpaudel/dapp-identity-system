# README

## What is this repository for?

- Dapps Digital Identity Management System
- v 0.1.0

## Follow the instructions below to setup your project

### Setting up node js - DIGITAL IDENTITY MANAGEMENT SYSTEM

- Setup `.env` variable by referencing `.env.example` file.

- Run this command: `npm install` - Installs all the node dependencies

- `npm run db:create` - Creates the database specified in the .env variable

- `npm run db:migrate` - Migrates latest schema in the database

- `npm start` - Starts backend and frontend

- To seed the pending data - `backend_url/setup`

### Setting up truffle - BLOCKCHAIN DAPPS CONTRACTS

- Download `ganache` from [Ganache download link](https://www.trufflesuite.com/ganache)

- Open `ganache` then create a workspace with the respective settings, then update values in `.env`

- `truffle compile` - Builds the smart contracts within the project

- `truffle test` - Tests the test cases in the repo

- `truffle migrate --reset` - Creates the contracts in the ganache network, `--reset` flag will overwrite if you've already migrated the contract previously.

### Setting up IPFS - DISTRIBUTED FILE SYSTEM

- Download latest `go-ipfs_vX.X.X-X_linux-amd64.tar.gz` from [IPFS download link](https://github.com/ipfs/go-ipfs/releases)

- Extract the file in the system

- `cd go-go-ipfs_vX.X.X-X_linux-amd64/go-ipfs/` - Go into the IPFS directory file

- `sudo ./install.sh` - Installing the ipfs to your system

- `ipfs init` - Initialize IPFS in your system

- `ipfs daemon` - Start IPFS daemon in your system (_Make sure your system has 5001/8080 ports not listening to any other services_)

- Your IPFS has started and use the respective values in the `.env` then restart your nodejs application
### Setting up the settings in your VSCode for formatting your project files

- Copy this json to your VSCode workspace settings

- If you need this settings only on this project scope then put this json inside the root of your project as `.vscode/settings.json`

`{"editor.formatOnSave": true,"editor.tabSize": 2,"prettier.tabWidth": 2,"[javascript]": {"editor.defaultFormatter": "esbenp.prettier-vscode"},"diffEditor.ignoreTrimWhitespace": false, "editor.codeActionsOnSave": {"source.fixAll.eslint": true},"python.formatting.autopep8Args": ["--max-line-length","120","--experimental","--indent-size","2","--ignore","E402"]}`


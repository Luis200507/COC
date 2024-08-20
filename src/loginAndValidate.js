const fs = require('fs');
const inquirer = require('@inquirer/prompts');
const path = require('path');
const KeyAuth = require('keyauth')


// const execDirectory = path.dirname(process.execPath);
const filePath = path.join(__dirname, 'credentials.json');
const KeyAuthApp = new KeyAuth(
  "cocrobot", // Application Name
  "tcnM2LBvqg", // Owner ID
  "886643a171a91cd2ccae0a462448e225514045793db09a55830c453ee3011a03", // Application Secret
  "1.0", // Application Version
  "aaa",
);

async function requerirCredenciais() {
  if (fs.existsSync(filePath)) {
    console.log('Credenciais recuperadas do ultimo uso!')
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    const answers = {
      serialKey: await inquirer.input({ message: 'Registre seu aplicativo inserindo, a chave entregue, a seguir:'}),
      email: await inquirer.input({ message: 'Aplicativo registrado! Agora, insira seu email de login do Portal:'}),
      password: await inquirer.input({ message: 'Insira sua senha:'})
    }

    fs.writeFileSync(filePath, JSON.stringify(answers, null, 2), 'utf8');
    console.log('Credenciais salvas com sucesso!');

    return answers;
  }
}

async function validateSerial() {

  try {
    const license = await requerirCredenciais()
    await KeyAuthApp.initialize(); // Inicializa a instância da aplicação KeyAuth
    const auth = await KeyAuthApp.license(license.serialKey); // Verifica a licença

    if (auth.success) {
      console.log(auth); 
    } else {
      console.log('aae')
    }
  } catch (error) {
    console.error("Erro na verificação da licença:", error.message);
  }
}

module.exports = { requerirCredenciais, validateSerial };

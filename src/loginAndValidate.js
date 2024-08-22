const fs = require('fs');
const inquirer = require('@inquirer/prompts');
const path = require('path');
const KeyAuth = require('keyauth')


const execDirectory = path.dirname(process.execPath);
const filePath = path.join(execDirectory, 'credentials.json');

// const filePath = path.join(__dirname, 'credentials.json');

const KeyAuthApp = new KeyAuth(
  "cocrobot", // Application Name
  "5MY4fyNopA", // Owner ID
  "31dab00979e99a725952e93e0d5fa6a7a601181cdecf5bdafe232c7f62d17b37", // Application Secret
  "1.0", // Application Version
  "aaa",
);

async function requerirCredenciais(log) {
  if (fs.existsSync(filePath)) {
    if(log) console.log('Credenciais recuperadas do ultimo uso!')
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    const answers = {
      serialKey: await inquirer.input({ message: 'Registre seu aplicativo inserindo, a chave entregue, a seguir:'}),
      email: await inquirer.input({ message: 'Aplicativo registrado! Agora, insira seu email de login do Portal:'}),
      password: await inquirer.input({ message: 'Insira sua senha:'})
    }

    fs.writeFileSync(filePath, JSON.stringify(answers, null, 2), 'utf8');
    if(log) console.log('Credenciais salvas com sucesso!');

    return answers;
  }
}

async function validateSerial() {

  try {
    const license = await requerirCredenciais(false)
    await KeyAuthApp.initialize(); // Inicializa a instância da aplicação KeyAuth
    const auth = await KeyAuthApp.license(license.serialKey); // Verifica a licença

    if (auth.success) {
      return [true]
    } else {
      return [false, filePath]
    }
  } catch (error) {
    console.error("Erro na verificação da licença:", error.message);
  }
}

module.exports = { requerirCredenciais, validateSerial };

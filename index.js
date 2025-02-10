import inquirer from 'inquirer';
import os from 'os';
import { exec } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';



//esse codigo serve pra exibir no terminal tudo estilizado 
console.log(chalk.blue(figlet.textSync("System Monitor", { horizontalLayout: 'full'})))

async function showMenu() {
    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "Escolha uma opçao",
            choices: [
                '1-Data e Hora',
                '2-Uso do Disco',
                '3-Uso da Memoria',
                '4-Temperatura',
                '5-Uso da CPU',
                '6-Processos em Execuçao',
                '7-Saire'               
            ]
        }
    ])

    switch (option) {
        case '1-Data e Hora':
            console.log(chalk.green(`\nData e Hora: ${new Date().toLocaleDateString()}`))
            break
        case '2-Uso do Disco':
            exec('df -h', (err, stdout) => {
                if (err) console.log(chalk.red('Erro ao obter informações do disco.'))
                else console.log(chalk.yellow(`\n${stdout}`))
            })
            break
        case '3-Uso da Memoria':
            console.log(chalk.cyan(`\nMemória Total: ${(os.totalmem() / 1e9).toFixed(2)} GB`));
            console.log(chalk.cyan(`Memória Livre: ${(os.freemem() / 1e9).toFixed(2)} GB`));
            break;

        case '4-Temperatura':
            exec("sensors | grep 'Package id 0'", (err, stdout) => {
                if (err) {
                    console.log(chalk.red("Erro ao obter a temperatura. Verifique se o 'lm-sensors' está instalado."));
                } else {
                    console.log(chalk.yellow(`\nTemperatura:\n${stdout.trim()}`));
                }
            })

        case '5-Uso da CPU':
            console.log(chalk.magenta(`\nCPU: ${os.cpus()[0].model}`))
            console.log(chalk.magenta(`\Nucleos: ${os.cpus().length}`))
            break
        case '6-Processos em Execuçao':
            exec('ps aux --sort=-%mem | head -10', (err, stdout) => {
                if (err) console.error(chalk.red('Erro ao obter processos.'))
                else console.log(chalk.blue(`\n${stdout}`))
            })
            break
        case '7-Sair':
            console.log(chalk.red('\nSaindo...'))
            process.exit()
    }
    setTimeout(showMenu, 2000)
}

showMenu()
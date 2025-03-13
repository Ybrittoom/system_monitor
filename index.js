import inquirer from 'inquirer';
import os from 'os';
import { exec } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';



//esse codigo serve pra exibir no terminal tudo estilizado 
console.log(chalk.blue(figlet.textSync("System Monitor", { horizontalLayout: 'full'})))

async function escolherSistema() {
    console.log('Bem vindo ao SYSTEM MONITOR')
    console.log('Escolha o seu sistema operacional (windows/linux)')

    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "Escolha o seu sistema operacional (windows/linux)",
            choices: [
                'WINDOWS',
                'LINUX'
            ]
        }
    ])

    switch (option) {
        case 'WINDOWS':
            console.log('Adpatando programa para windows')
            break

            case 'LINUX':
    console.log('Adpatando programa para linux');
    let i = 0;
    let c = '.';
    function animate() {
        if (i < 6) {
            console.clear();
            console.log(c);
            i++;
            if (c === '...') {
                c = '.';
            } else {
                c = c + '.';
            }
            setTimeout(animate, 1000); // Atraso de 1000ms (1 segundo)
        } else {
            showMenu(); // Chama showMenu() após a animação terminar
        }
    }
    animate();
    break;
    }

}

async function showMenu() {
    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "Escolha uma opçao",
            choices: [
                'WINDOWS',
                'LINUX',
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

    console.log('Bem vindo ao SYSTEM MONITOR')
    console.log('Escolha o seu sistema operacional (windows/linux)')

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
            exec("sensors | grep 'Package id 0' | awk '{print $4}' | tr -d '+'", (err, stdout) => {
                if (err) console.log(chalk.red('Erro ao obter a temperatura.'));
                else console.log(chalk.magenta(`\nTemperatura: ${stdout.trim()}°C`));
            });
            break

            case '5-Uso da CPU':
                exec("top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'", (err, stdout) => {
                    if (err) {
                        console.log(chalk.red('Erro ao obter uso da CPU.'));
                    } else {
                        const usoCPU = parseFloat(stdout.trim());
    
                        console.log(chalk.blue(`\nCPU: ${os.cpus()[0].model}`));
                        console.log(chalk.blue(`Núcleos: ${os.cpus().length}`));
                        console.log(chalk.green(`Uso da CPU: ${usoCPU}%`));
    
                        // Verifica o nível de uso da CPU
                        if (usoCPU >= 70 && usoCPU <= 100) {
                            console.log(chalk.redBright('O uso da CPU está alto! 🚨'));
                        } else if (usoCPU >= 50 && usoCPU < 70) {
                            console.log(chalk.yellow('O uso da CPU está mediano. ⚠️'));
                        } else {
                            console.log(chalk.green('O uso da CPU está normal. ✅'));
                        }
                    }
                });
                break;
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

escolherSistema()

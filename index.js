import inquirer from 'inquirer';
import os from 'os';
import { exec } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';



//esse codigo serve pra exibir no terminal tudo estilizado 
console.log(chalk.blue(figlet.textSync("System Monitor", { horizontalLayout: 'full' })))

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
            let w = 0;
            let e = '.';
            function animateWindows() {
                if (w < 9) {
                    console.clear();
                    console.log(e);
                    w++;
                    if (e === '...') {
                        e = '.';
                    } else {
                        e = e + '.';
                    }
                    setTimeout(animateWindows, 300); // Atraso de 1000ms (1 segundo)
                } else {
                    sistemForWindows(); // Chama showMenu() após a animação terminar
                }
            }
            animateWindows()
            break

        case 'LINUX':
            console.log('Adpatando programa para linux');
            let i = 0;
            let c = '.';
            function animateLinux() {
                if (i < 9) {
                    console.clear();
                    console.log(c);
                    i++;
                    if (c === '...') {
                        c = '.';
                    } else {
                        c = c + '.';
                    }
                    setTimeout(animateLinux, 300); // Atraso de 1000ms (1 segundo)
                } else {
                    sistemForLinux(); // Chama showMenu() após a animação terminar
                }
            }
            animateLinux();
            break;
    }

}

//funçao para linux
async function sistemForLinux() {
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
                '7-Sair'
            ]
        }
    ])

    console.log('Bem vindo ao SYSTEM MONITOR')
    console.log('Escolha o seu sistema operacional (windows/linux)')

    switch (option) {
        case '1-Data e Hora':
            console.log(chalk.green(`\nData e Hora: ${new Date().toLocaleDateString()}`))
            setTimeout(sistemForLinux, 2000)

            break
        case '2-Uso do Disco':
            exec('df -h', (err, stdout) => {
                if (err) console.log(chalk.red('Erro ao obter informações do disco.'))
                else console.log(chalk.yellow(`\n${stdout}`))
            })
            setTimeout(sistemForLinux, 2000)

            break
        case '3-Uso da Memoria':
            const totalMemoryGB = os.totalmem() / 1e9;
            const freeMemoryGB = os.freemem() / 1e9;
            const usedMemoryGB = totalMemoryGB - freeMemoryGB;

            console.log(chalk.cyan(`\nMemória Total: ${(os.totalmem() / 1e9).toFixed(2)} GB`));
            console.log(chalk.cyan(`Memória Livre: ${(os.freemem() / 1e9).toFixed(2)} GB`));

            if (usedMemoryGB > 15) {
                console.log(chalk.red('A memoria esta sendo muito usada. ‼️'))
            } else if (usedMemoryGB >= 8) {
                console.log(chalk.yellow('Uso da memoria esta medio. ⚠️'))
            } else if (usedMemoryGB >= 1) {
                console.log(chalk.green('Uso de memória baixo. ✅'));
            } else {
                console.log(chalk.green('Uso de memória muito baixo. ✅')); // Adicionado para casos < 1GB
            }

            setTimeout(sistemForLinux, 2000)

            break;

        case '4-Temperatura':
            exec("sensors | grep 'Package id 0' | awk '{print $4}' | tr -d '+'", (err, stdout) => {
                if (err) console.log(chalk.red('Erro ao obter a temperatura.'));
                else console.log(chalk.magenta(`\nTemperatura: ${stdout.trim()}°C`));
            });
            setTimeout(sistemForLinux, 2000)

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
            setTimeout(sistemForLinux, 2000)

            break;
        case '6-Processos em Execuçao':
            exec('ps aux --sort=-%mem | head -10', (err, stdout) => {
                if (err) console.error(chalk.red('Erro ao obter processos.'))
                else console.log(chalk.blue(`\n${stdout}`))
            })
            setTimeout(sistemForLinux, 2000)

            break
        case '7-Sair':
            console.log(chalk.red('\nSaindo...'))
            process.exit()
    }
}


//funçao para WINDOWS

async function sistemForWindows() {
    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "Escolha uma opção",
            choices: [
                '1-Data e Hora',
                '2-Uso do Disco',
                '3-Uso da Memoria',
                '4-Uso da CPU',
                '5-Processos em Execução',
                '6-Sair'
            ]
        }
    ])

    switch (option) {
        case '1-Data e Hora':
            console.log(chalk.green(`\nData e Hora: ${new Date().toLocaleDateString()}`));
            setTimeout(sistemForWindows, 2000);
            break;
        
        case '2-Uso do Disco':
            exec('wmic logicaldisk get Caption,FreeSpace,Size', (err, stdout) => {
                if (err) console.log(chalk.red('Erro ao obter informações do disco.'));
                else {
                    const lines = stdout.trim().split('\n').slice(1); // Remove header
                    lines.forEach(line => {
                        const parts = line.trim().split(/\s+/);
                        if (parts.length === 3) {
                            const [caption, freeSpace, size] = parts;
                            const freeGB = (parseInt(freeSpace) / 1e9).toFixed(2);
                            const totalGB = (parseInt(size) / 1e9).toFixed(2);
                            console.log(chalk.yellow(`\nDisco ${caption}:`));
                            console.log(chalk.yellow(`  Espaço Livre: ${freeGB} GB`));
                            console.log(chalk.yellow(`  Espaço Total: ${totalGB} GB`));
                        }
                    });
                }
            });
            setTimeout(sistemForWindows, 2000);
            break;
            
            case '3-Uso da Memoria':
                console.log(chalk.cyan(`\nMemoria Total: ${(os.totalmem() / 1e9).toFixed(2)} GB`))
                console.log(chalk.cyan(`Memória Livre: ${(os.freemem() / 1e9).toFixed(2)} GB`));
                setTimeout(sistemForWindows, 2000);
                break

            case '4-Uso da CPU':
                exec('wmic cpu get LoadPercentage', (err, stdout) => {
                    if (err) {
                        console.log(chalk.red('Erro ao obter uso da CPU.'));
                    } else {
                        const lines = stdout.trim().split('\n').slice(1);
                        const usoCPU = parseFloat(lines[0]);
    
                        console.log(chalk.blue(`\nCPU: ${os.cpus()[0].model}`));
                        console.log(chalk.blue(`Núcleos: ${os.cpus().length}`));
                        console.log(chalk.green(`Uso da CPU: ${usoCPU}%`));
    
                        if (usoCPU >= 70 && usoCPU <= 100) {
                            console.log(chalk.redBright('O uso da CPU está alto! 🚨'));
                        } else if (usoCPU >= 50 && usoCPU < 70) {
                            console.log(chalk.yellow('O uso da CPU está mediano. ⚠️'));
                        } else {
                            console.log(chalk.green('O uso da CPU está normal. ✅'));
                        }
                    }
                    setTimeout(sistemForWindows, 2000);
                });
                break

            case '5-Processos em Execuçao':
                exec('tasklist', (err, stdout) => {
                    if (err) console.error(chalk.red('Erro ao obter processos.'));
                    else console.log(chalk.blue(`\n${stdout}`));
                    setTimeout(sistemForWindows, 2000);
                });
                break;

            case '6-Sair':
                console.log(chalk.red('n\Saindo...'))
                process.exit()
    }
    
}

escolherSistema()

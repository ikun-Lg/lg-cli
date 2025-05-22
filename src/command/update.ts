import ora from 'ora';
import chalk from 'chalk';
import process from 'child_process';
const spinner = ora({
    text: '正在更新中...',
    color: 'yellow',
    spinner: {
        interval: 80,
        frames: ['-', '\\', '|', '/'],
    },
})

export function update() {
    spinner.start();
    process.exec('npm i -g lggbond-cli@latest', (error) => {
        if (error) {
            console.error(chalk.red('更新失败'), error);
            spinner.stop();
            return;
        }
        console.log(chalk.green('更新成功'));
        spinner.stop();
    });
}
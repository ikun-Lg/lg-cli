import simpleGit, { SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import chalk from "chalk";
// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ["l", "g"].map(
      (item) => {
        return chalk.green(item);
      }
    ),
  },
});
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前工作目录
  binary: "git", //指定 git 二进制文件路径
  maxConcurrentProcesses: 6, // 最大并发进程数
};

export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options), "代码下载中...", {
      estimate: 7000, // 预计下载时间
    });
    console.log(chalk.green("代码下载成功"));
    console.log(chalk.blackBright("=============阿妈特拉丝==============="));
  } catch (error) {
    console.log(chalk.red("代码下载失败"));

    console.log(error);
  }
};

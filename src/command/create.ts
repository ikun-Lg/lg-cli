import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { name, version } from "../../package.json";
import axios, { AxiosResponse } from "axios";
import { gt } from "lodash";

export interface TemplateInfo {
  name: string; //模板名称
  downloadUrl: string; // 模板下载地址
  description: string; // 模板描述
  branch: string; // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-Typescript-template",
    {
      name: "Vite-Vue3-Typescript-template",
      downloadUrl: "https://github.com/ikun-Lg/link-sphere.git",
      description: "Vue3技术栈开发模板",
      branch: "main",
    },
  ],
  [
    "Vite-temp",
    {
      name: "Vite-Vue3-Typescript-template",
      downloadUrl: "git@gitee.com:sohucw/admin-pro.git",
      description: "Vue3技术栈开发模板1",
      branch: "dev10",
    },
  ],
]);

export function isOverwrite(fileName: string) {
  console.warn(chalk.green(fileName) + "文件夹存在");
  return select({
    message: "是否覆盖？",
    choices: [
      {
        name: "覆盖",
        value: true,
      },
      {
        name: "取消",
        value: false,
      },
    ],
  });
}

export const getNpmInfo = async (npmName: string) => {
  const npmUrl = `https://registry.npmjs.org/${name}`;
  let res = {};
  try {
    res = await axios.get(npmUrl);
  } catch (error) {
    console.error(error);
  }
  return res;
};

export const getNpmLatestVersion = async (name: string) => {
  const { data } = (await getNpmInfo(name)) as AxiosResponse;
  // console.log('data', data);
  return data["dist-tags"].latest;
};

export const checkVersion = async (name: string, version: string) => {
  const latestVersion = await getNpmLatestVersion(name);
  const need = gt(latestVersion, version);
  if (need) {
    console.log(
      chalk.yellow(
        `当前版本：${version}，最新版本：${latestVersion}，请及时更新`
      )
    );
    console.log(
      `可使用: npm i -g ${name}@latest` +
        ` 或 yarn global add ${name}@latest` +
        ` 或 pnpm add -g ${name}@latest` +
        ` 或 lg update` +
        ` 更新`
    );
  }
};

export async function create(projectName?: string) {
  if (!projectName) {
    projectName = await input({
      message: "请输入项目名称",
    });
  }

  // 如果文件夹已经存在
  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName);
    if (run) {
      await fs.remove(filePath);
    } else {
      return; // 不覆盖直接结束
    }
  }

  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item;
      return {
        name,
        value: name,
        description: info.description,
      };
    }
  );

  // 检测版本更新
  await checkVersion(name, version);

  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }
  // console.log(info);
}

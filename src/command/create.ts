import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
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
  console.warn(chalk.green(fileName)+"文件夹存在");
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
    }else{
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
  

  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch]);
  }
  console.log(info);
}

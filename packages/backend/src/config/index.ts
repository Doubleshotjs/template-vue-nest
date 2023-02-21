import { join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { app } from 'electron';
import { parse } from 'yaml';

export const IS_PROD = app.isPackaged;

export const BACKEND_PATH = IS_PROD ? join(app.getAppPath(), 'backend') : app.getAppPath();
export const FRONTEND_PATH = IS_PROD ? join(app.getAppPath(), 'frontend') : join(app.getAppPath(), '../frontend');

export const ROOT_PATH = IS_PROD ? join(app.getAppPath(), '../..') : join(BACKEND_PATH, '../..');

export const RESOURCES_PATH = IS_PROD ? join(ROOT_PATH, 'resources') : join(BACKEND_PATH, '../resources');

export const USERDATA_PATH = app.getPath('userData');

export const LOG_PATH = (() => {
  const logPath = join(USERDATA_PATH, 'logs');
  if (!existsSync(logPath)) {
    mkdirSync(logPath);
  }
  return logPath;
})();

export const getConfig = () => {
  const environment = IS_PROD ? 'prod' : 'dev';

  console.log('当前运行的环境: ', environment);

  // 优先读取对应环境的配置文件
  const configFiles = [
    join(ROOT_PATH, `config.${environment}.yaml`),
    join(ROOT_PATH, './config.yaml'),
    join(RESOURCES_PATH, `config.${environment}.yaml`),
    join(RESOURCES_PATH, './config.yaml'),
  ];

  const file = configFiles.find(file => existsSync(file));

  if (!file) {
    throw new Error(`没有找到 config.${environment}.yaml 或  config.yaml`);
  }

  const config = parse(readFileSync(file, 'utf8'));
  console.log('生效的配置文件：', file);
  return config;
};

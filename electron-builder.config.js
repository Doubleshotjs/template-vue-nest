const { renameSync, mkdirSync, existsSync } = require('fs');
const { basename, join } = require('path');

function resolve(path) {
  return join(__dirname, path);
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  // 应用名称，会出现在所有跟这个应用有关的地方，包括任务管理器，但不会出现在应用的安装目录，安装目录显示的名称是上面的name字段
  productName: 'Doubleshot App',
  // 应用的资源
  files: [
    resolve('packages/backend/package.json'),
    {
      from: resolve('packages/backend/dist'),
      to: 'backend',
    },
    {
      from: resolve('packages/frontend/dist'),
      to: 'frontend',
    },
  ],

  extraResources: [{ from: resolve('packages/backend/resources'), to: '.', filter: ['!.gitignore'] }],
  directories: {
    output: resolve('dist'),
  },
  // 将应用打包至win系统的配置
  win: {
    icon: resolve('packages/backend/resources/icons/icon.ico'),
    target: [
      {
        // 使用什么程序进行打包
        target: 'nsis',
        // 打包32位的还是64位的，可以俩个一起写进去
        arch: ['ia32', 'x64'],
      },
    ],
  },
  // 打包至mac系统的配置
  mac: {
    icon: resolve('packages/backend/resources/icons/icon.icns'),
    target: 'dmg',
  },
  // 打包至linux系统的配置
  linux: {
    icon: resolve('packages/backend/resources/icons'),
    target: ['AppImage'],
  },

  afterAllArtifactBuild: (res) => {
    res.artifactPaths.forEach((source) => {
      const target = join(__dirname, 'release');

      if (!existsSync(target)) {
        mkdirSync(target, { recursive: true });
      }

      renameSync(source, join(target, basename(source)));
    });
  },
};

module.exports = config;

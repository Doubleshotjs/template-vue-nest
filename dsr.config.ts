import { defineConfig } from '@doubleshot/runner';

export default defineConfig({
  run: [
    {
      cwd: 'packages/frontend',
      name: 'renderer',
      prefixColor: 'blue',
      commands: {
        dev: 'npm run dev',
        debug: 'npm run debug',
        build: 'npm run build',
        lint: 'npm run lint',
      },
    },
    {
      cwd: 'packages/backend',
      name: 'electron',
      prefixColor: 'green',
      commands: {
        dev: {
          command: 'npm run dev',
          killOthersWhenExit: true,
        },
        debug: {
          command: 'npm run debug',
          killOthersWhenExit: true,
        },
        build: 'npm run build',
        lint: 'npm run lint',
      },
    },
  ],
  electronBuild: {
    projectDir: 'packages/backend',
    commandName: 'build',
    config: 'electron-builder.config.js',
  },
});

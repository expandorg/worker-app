import { join } from 'path';

export const envs = {
  development: 'local',
};

const env = process.env.NODE_ENV;
export const envFilePath = join(__dirname, `${envs[env || 'development'] || env}.env`);

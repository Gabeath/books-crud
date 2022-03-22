import path from 'path';

export default {
  '@app': path.join(__dirname, '..', 'app', 'src'),
  '@mechanisms': path.join(__dirname, '..', 'core', 'mechanisms'),
  '@middlewares': path.join(__dirname, '..', 'core', 'middlewares'),
  '@models': path.join(__dirname, '..', 'core', 'models'),
  '@repositories': path.join(__dirname, '..', 'core', 'repositories'),
  '@utilities': path.join(__dirname, '..', 'core', 'utilities'),
};

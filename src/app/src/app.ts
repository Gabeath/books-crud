import '../../lib/moduleAlias';
import '@app/setup';

import server from '@app/server';

import Constants from '@utilities/constants';

server.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running - port: ${Constants.port}`);
});

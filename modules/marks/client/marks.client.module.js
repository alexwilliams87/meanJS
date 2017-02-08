(function (app) {
  'use strict';

  app.registerModule('marks', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('marks.admin', ['core.admin']);
  app.registerModule('marks.admin.routes', ['core.admin.routes']);
  app.registerModule('marks.services');
  app.registerModule('marks.routes', ['ui.router', 'core.routes', 'marks.services']);
}(ApplicationConfiguration));

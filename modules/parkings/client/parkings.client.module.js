(function (app) {
  'use strict';

  app.registerModule('parkings', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('parkings.admin', ['core.admin']);
  app.registerModule('parkings.admin.routes', ['core.admin.routes']);
  app.registerModule('parkings.services');
  app.registerModule('parkings.routes', ['ui.router', 'core.routes', 'parkings.services']);
}(ApplicationConfiguration));

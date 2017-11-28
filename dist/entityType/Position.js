'use strict';

var BaseSerializer = require('./Base.js');

module.exports = {
  getPromiseByPaths: function getPromiseByPaths(entityTypeTitle, document, requestedPaths, parents) {
    var allVariablesAreRequested = requestedPaths.length === 1 && requestedPaths[0].substring(0, 1) === '#';
    return BaseSerializer.getPromiseByPaths.apply(this, arguments).then(function (templateData) {
      if (allVariablesAreRequested || requestedPaths.indexOf('_active') !== -1) {
        templateData._active = !(document.startDate && new Date(document.startDate) > new Date() || document.endDate && new Date(document.endDate) < new Date());
      }
      return templateData;
    });
  }
};
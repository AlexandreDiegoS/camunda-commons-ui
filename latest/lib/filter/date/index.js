define([
  'angular',
  'moment',
  'angular-translate'
],
function(
  angular,
  moment
) {
  'use strict';

  var filtersModule = angular.module('cam.commons.filter.date', [
    'pascalprecht.translate'
  ]);



  filtersModule.provider('camDateFormat', function() {
    var variants = {
      normal: 'LLL',
      short: 'LL',
      long: 'LLLL'
    };

    this.setDateFormat = function(newFormat, variant) {
      variant = variant || 'normal';
      variants[variant] = newFormat;
    };

    this.$get = function() {
      return function(variant) {
        variant = variant || 'normal';
        return variants[variant];
      };
    };
  });



  filtersModule.config([
    '$filterProvider',
  function(
    $filterProvider
  ) {

    $filterProvider.register('camDate', [
      '$translate',
      'camDateFormat',
    function(
      $translate,
      camDateFormat
    ) {

      return function(date, variant) {
        if (!date) {
          return '';
        }
        return moment(date).format(camDateFormat(variant));
      };

    }]);
  }]);

  return filtersModule;
});

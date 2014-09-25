$(function() {
  'use strict';

  /*
   * hsnLoadingStart
   * Butonun loading efektini başlatır
   * @param obj  {object} $ Element
   */
  var hsnLoadingStart;
  hsnLoadingStart = function($obj) {
    return $obj.attr('disabled', 'disabled').addClass('btn-loading-active');
  };
});

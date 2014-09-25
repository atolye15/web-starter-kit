$ ->
  'use strict'

  ###
   * hsnLoadingStart
   * Butonun loading efektini başlatır
   * @param obj  {object} $ Element
  ###
  hsnLoadingStart = ( $obj ) ->
    $obj.attr('disabled', 'disabled').addClass 'btn-loading-active'
  return
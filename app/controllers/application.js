'use strict';

function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

var PhoneGap = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        PhoneGap.report('deviceready');
    },
    report: function(id) {
        console.log("PhoneGap Report:" + id);
        // hide the .pending <p> and show the .complete <p>
        // document.querySelector('#' + id + ' .pending').className += ' hide';
        // var completeElem = document.querySelector('#' + id + ' .complete');
        // completeElem.className = completeElem.className.split('hide').join('');
        showAlert('PhoneGap Boom....', 'Message');
    }
};

PhoneGap.initialize();

$(function() {
    FastClick.attach(document.body);
});

window.jQuery = window.$ = angular.element;
var app = angular.module('bcApp', []);

/* Directives */

// app.directives("ngTouchy", function() {
//     return function($scope, $element, $attributes) {
//         $element.bind('ontouchstart', function() {            
//             return true;
//         });
//     }
// });

app.directive("ngTap", function() {
  return function($scope, $element, $attributes) {
    var tapped;
    tapped = false;
    $element.bind("click", function() {
      if (!tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
    $element.bind("touchstart", function(event) {
      return tapped = true;
    });
    $element.bind("touchmove", function(event) {
      tapped = false;
      return event.stopImmediatePropagation();
    });
    return $element.bind("touchend", function() {
      if (tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
  };
});


app.directive('barchart', function(){
  return{
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attr, controller){

          var options = { 
                          bars : {
                              show: true, 
                              stacked: true, 
                              horizontal: true, 
                              barWidth: 0.6, 
                              lineWidth: 0,
                              shadowSize: 0,
                              fillOpacity: .8
                          },

                          grid: {
                            verticalLines: false, 
                            horizontalLines: false, 
                            backgroundColor: null,
                            outlineWidth: 0
                          },

                          legend: { show: false },

                          xaxis: {
                            showLabels: false
                          },

                          yaxis: {
                            ticks: scope.bar_ticks,
                            showMinorLabels: true,
                            tickFormatter: scope.defaultTickFormatter
                          }

                        };

          var getOptions = function() {
              return angular.extend({}, options, scope.$eval(attr.fltChartoptions));
          };

          var init = function(v) {
              if (controller) {
                  controller.$render = function() {
                      var temp_options = getOptions();
                      // need to add this due to it not being parsed from string correctly - probably due to angular security
                      Flotr.draw(element[0], v, temp_options);
                  };
              }

              if (controller) {
                  // Force a render to override
                  controller.$render();
              }
          };

          var data = scope[attr.ngModel];
          scope.$watch('data', init);
      }
  };
});

app.directive('piechart', function(){
  return{
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attr, controller){

          var options = { 
                          pie: {
                            show: true,
                            explode: 0, 
                            fillOpacity: 0.8,
                            shadowSize: 0,
                            labelFormatter: scope.defaultPieLabelFormatter
                          },

                          grid: {
                            verticalLines: false, 
                            horizontalLines: false, 
                            backgroundColor: null,
                            outlineWidth: 0
                          },

                          xaxis: {showLabels: false},
                          yaxis: {showLabels: false},

                          legend: { show: false }

                          // mouse: {
                          //   track: true,
                          //   relative: true,
                          //   sensibility: 4
                          // }

                        };

          var getOptions = function() {
              return angular.extend({ }, options, scope.$eval(attr.fltChartoptions));
          };

          var init = function(v) {
              if (controller) {
                  controller.$render = function() {
                      var temp_options = getOptions();
                      // need to add this due to it not being parsed from string correctly - probably due to angular security
                      Flotr.draw(element[0], v, temp_options);
                  };                  
              }

              if (controller) {
                  controller.$render();
              }
          };

          var data = scope[attr.ngModel];
          scope.$watch('pie', init);
      }
  };
});



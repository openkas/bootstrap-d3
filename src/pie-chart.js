//Placed this up here since the JSHint doesn't seem to pick up the one defined
//in the IIFE below.
var BootStrapD3;

(function (exports, $, d3) {

  //Utility functions common through all modules
  var utils = {};

  //Bootstrap base colors
  utils.baseColors = [
    '#049cdb',
    '#0064cd',
    '#46a546',
    '#9d261d',
    '#ffc40d',
    '#f89406',
    '#c3325f',
    '#7a43b6'
  ];

  exports.module = function (name, definition) {

    //Create an object which the module will attach exported stuff to
    var moduleExport = exports[name] = {};

    //Execute the definition to create module
    definition.call(null, moduleExport, $, d3, utils);
  };
}(this.BootStrapD3 = this.BootStrapD3 || {}, jQuery, d3));

/**
 * Pie chart module
 */
BootStrapD3.module('pieChart', function (exports, $, d3, utils) {

  //Default pie configuration
  var defaultConfig = {};

  defaultConfig.width = 960;
  defaultConfig.height = 500;
  defaultConfig.radius = Math.min(defaultConfig.width, defaultConfig.height) / 2;

  //Exposed functions
  exports.create = function (userConfig) {

    //Merge default and user config to final config
    var config = $.extend({}, defaultConfig, userConfig);

    //Create color auto-picker
    //TODO: Dynamically generate colors from Bootstrap base colors
    var color = d3.scale.ordinal()
      .range(utils.baseColors);

    //Create arc function for path to turn into an arc
    var arc = d3.svg.arc()
      .outerRadius(config.radius - 10)
      .innerRadius(0);

    //Create pie function to format data to a pie
    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
        return d.population;
      });

    //Create our svg stage and create a centered group for our pie
    var svg = d3.select('body')
      .append('svg')
      .attr('width', config.width)
      .attr('height', config.height)
      .append('g')
      .attr('transform', 'translate(' + config.width / 2 + ',' + config.height / 2 + ')');

    //Load data
    d3.json('data.json', function (error, data) {

      //Error traps
      //TODO: Make them more informative
      if(error) {
        throw new Error('Error in loaded data:' + error);
      }
      if(!data) {
        throw new Error('Data is undefined');
      }

      //Binding all arcs with data
      //Arcs are just groups by the way
      var g = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      //Arcs are just closed paths
      g.append('path')
        .attr('d', arc)
        .style('fill', function (d) {
          console.log(d);
          return color(d.data.age);
        });

      //Add text to the center of the arc
      //TODO: Bootstrap typography
      //      Move text outside the pie
      //      Highlight hover
      //      Tooltip
      g.append('text')
        .attr('transform', function (d) {
          return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('class', 'pieText')
        .attr('dy', '.35em')
        .text(function (d) {
          return d.data.age;
        });

    });
  };
});

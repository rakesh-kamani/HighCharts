import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'DemoApp';
  options = {
      xAxis: {
        categories: ['TOTAL ESG SCORE', 'ENV', 'SOC', 'GOV']
    },
    yAxis: {
        max: 100
    },
    chart: {
      type: 'column',
      events: {
        render: function() {
          let chart = this,
            series = chart.series[1],
            points = series.points,
            yAxis = chart.yAxis[0],
            customPoints = [
              [24.83233487, 40.13076578, 49.81437398],
              [42.60973246, 49.86839164, 49.86839164],
              [23.27215019, 41.79327828, 53.45621875],
              [24.0270928, 39.56547765, 53.26893206]
            ],
            path = [],
            height = 7,
            element,
            width,
            x,
            y,
            i,
            pos;

          if (chart.customElements) {
            chart.customElements.forEach(function(elem) {
              elem.destroy();
            });
          }

          chart.customElements = [];

          points.forEach(function(point, index) {
            if (point.series.visible && customPoints[index]) {
              x = point.plotX + chart.plotLeft;
              width = point.pointWidth * 0.2;

              for (i = 0; i < customPoints[index].length; i++) {
                y = yAxis.toPixels(customPoints[index][i]);

                if (i === 0) {
                  path.push('M');
                } else {
                  path.push('L');
                }

                path.push(x);
                path.push(y);

                element = chart.renderer.rect(x - (width / 2), y, width, height)
                  .attr({
                    strokeWidth: 1,
                    fill: '#000'
                  })
                  .add()
                  .toFront();

                  element.value = customPoints[index][i];

                chart.customElements.push(element);
              }

              element = chart.renderer.path(path)
                .attr({
                  'stroke-width': 1,
                  stroke: '#000',
                  fill: '#000'
                })
                .add()
                .toFront();

              chart.customElements.push(element);
            }
          });

          chart.customElements.forEach(function(elem) {
            if (elem.value) {
              elem.on('mouseover', function(e) {
                pos = elem.getBBox();

                chart.tooltip.destroy();

                chart.addAnnotation({
                  id: 'c-tooltip',
                  labels: [{
                    align: 'center',
                    backgroundColor: '#efefef',
                    borderColor: '#ccc',
                    distance: 10,
                    padding: 10,
                    point: {
                      x: pos.x - chart.plotLeft + pos.width / 2,
                      y: pos.y - chart.plotTop
                    },
                    text: 'Value: ' + elem.value
                  }]
                });

              }).on('mouseout', function(e) {
                chart.removeAnnotation('c-tooltip');
              });
            }
          });


        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        borderColor: '#000'
      }
    },
    tooltip: {
      pointFormat: '{series.name} {point.info} {point.value} {point.y}',
    },
    series: [{
              showInLegend: false,
              name: 'Series "100-company score"',
              data: [{ info: 'Point "TOTAL ESG SCORE"', value: "Value: ", y: 12.96511756, color: "white" },
                    { info: 'Point "ENV"', value: "Value: ", y: 9.122720022, color: "white" },
                    { info: 'Point "SOC"', value: "Value: ", y: 24.53324925, color: "white" },
                    { info: 'Point "GOV"', value: "Value: ", y: 6.1988329, color: "white" }]
            }, {
              showInLegend: false,
              name: 'Series "company score"',
              data: [{ info: 'Point "TOTAL ESG SCORE"', value: "Value: ", y: 87.03488244, color: "skyblue" },
                    { info: 'Point "ENV"', value: "Value: ", y: 90.87727998, color: "gray" },
                    { info: 'Point "SOC"', value: "Value: ", y: 75.46675075, color: "green" },
                    { info: 'Point "GOV"', value: "Value: ", y: 93.8011671, color: "lightgray" }]
          }]
  };

data = [33,33,19,14]
options2 = {
  chart: {
      type:'bar'
  },
  title:{
      text:'Horizontal Bar'
  },
  credits:{enabled:false},
  plotOptions: {
      series: {
          shadow:false,
          borderWidth:0,
          dataLabels:{
              enabled:true,
              formatter:function() {
                  var pcnt = (this.y / 100) * 100;
                  return pcnt.toFixed(2) + '%';
              }
          }
      }
  },
  xAxis:{
      lineColor:'#999',
      lineWidth:1,
      tickColor:'#666',
       categories: ['Climate Strategy', 'Environmental Policy and Management Systems', 'Environmental Reporting', 'Operational Eco Efficiency'],
      title:{
          text:'Environmental Factors'
      },
  },
  yAxis:{
      lineColor:'#999',
      lineWidth:1,
      tickColor:'#666',
      tickWidth:1,
      tickLength:3,
      gridLineColor:'#ddd',
      visible:false,
      title:{
          text:'Y Axis Title',
          rotation:0,
          margin:100,
      },
      labels: {
          formatter:function() {
              var pcnt = (this.value / 100) * 100;
              return pcnt.toFixed(2) + '%';
          }
      }
  },
  series: [{
      data: this.data,
      showInLegend: false,
  }]

}


}

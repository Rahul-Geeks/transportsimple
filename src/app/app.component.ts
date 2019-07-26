import { Component, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    this.draw();
  }

  arr = [['', 0]];

  startPointName: String = "";
  endPointName: String = "";

  @ViewChild('chart')
  chart: GoogleChartComponent;

  charts: any;

  public journeys = [];

  public level1 = 250;
  public level2 = 150;

  public add() {
    this.journeys.push({
      startPoint: this.startPointName,
      endPoint: this.endPointName
    });
    let x;
    if (this.journeys.length > 0) {
      x = `${this.startPointName.slice(0, 3).toUpperCase()}-${this.endPointName.slice(0, 3).toUpperCase()}`;
    }
    let y;
    if (this.journeys.length >= 2) {
      if (this.journeys[this.journeys.length - 1].startPoint === this.journeys[this.journeys.length - 2].startPoint &&
        this.journeys[this.journeys.length - 1].endPoint === this.journeys[this.journeys.length - 2].endPoint) {
        y = this.level2;
        this.arr[this.arr.length - 1][1] = this.level2;
      } else {
        y = this.level1;
      }
    } else {
      y = this.level1;
    }
    let dimensions = [x, y];
    this.arr.push(dimensions);
    this.draw();
    this.startPointName = "";
    this.endPointName = "";
  }

  public draw() {
    this.charts = {
      title: "Graph for journey",
      type: 'LineChart',
      columnNames: ['X', 'Level'],
      data: this.arr,
      options: {
        hAxis: {
          title: 'Trips'
        },
        vAxis: {
          title: 'Levels',
          direction: -1
        }
      },
      height: 400,
      width: 600
    };
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.page.html',
  styleUrls: ['./seat-selection.page.scss'],
})
export class SeatSelectionPage{

  selectedRoute: string;
  busNumber: string;
  boardingPoint: string;
  droppingPoint: string;
  boardingPoints: string[] = [];
  droppingPoints: string[] = [];

  noBuses: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busSrv: BusService,
    private notificationSrv: NotificationService,
    private modalCtrl: ModalController
  ) { 
    this.busNumber = route.snapshot.params['busNumber'];
    this.selectedRoute = route.snapshot.params['route'];
  }

  ionViewWillEnter() {
    this.getBoardingPoints();
    this.resetFields();
  }

  getBoardingPoints() {
    let postData = {
      route: this.selectedRoute,
      busNumber: this.busNumber
    };
    this.busSrv.getBoardingPointsList(postData)
    .subscribe((res) => {
      if(res.status){
        this.boardingPoints = res.data;
      }else{
        this.notificationSrv.showToastMessage(res.msg, 'top');
        this.noBuses = true;
      }
    },(err) => {
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
  }

  getDroppingPoints() {
    let postData = {
      route: this.selectedRoute,
      busNumber: this.busNumber,
      boardingPoint: this.boardingPoint
    }
    this.droppingPoints = [];
    this.droppingPoint = "-1";
    this.busSrv.getDroppingPointsList(postData)
    .subscribe((res) => {
      if(res.status){
        this.droppingPoints = res.data;
        // if(this.droppingPoints.indexOf(this.droppingPoint) == -1){
        //   this.droppingPoint = "-1";
        // }
      }else{
        this.notificationSrv.showToastMessage(res.msg, 'top');
      }
    },(err)=> {
      console.log(err);
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
  }

  getSeats() {
    if(this.boardingPoint !== "-1" && this.droppingPoint !== "-1"){
      this.router.navigate(['','seats', this.selectedRoute, this.busNumber, this.boardingPoint, this.droppingPoint])
    }else{
      this.notificationSrv.showToastMessage("Please select boarding point and dropping point", 'top');
    }
  }

  resetFields() {
    this.boardingPoint = "-1";
    this.droppingPoint = "-1";
  }
 
}

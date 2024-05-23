import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ToastrService } from 'ngx-toastr';
import { Calendar } from 'src/app/shared/models/calendar';
import { Specification } from 'src/app/shared/models/specification';
import { SpecificationsService } from 'src/app/shared/services/specifications.service';

@Component({
    selector: 'app-consumable',
    templateUrl: 'consumable.component.html',
    styleUrls: ['./consumable.component.scss']
  })
  export class ConsumableComponent implements OnInit {
    form: FormGroup;
    isTravelOn: boolean;
    selectedtype: any;
    locacoes: Calendar[] = [];
    specificationArray: Specification[];



    constructor(
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private calendarService: CalendarService,
      private specificationSerivce: SpecificationsService) {
    }

    ngOnInit(): void {
      this.calendarService.getCalendarAll('2024-04-02').subscribe((resp: Calendar[]) => {
        console.log(resp);
        
        this.locacoes = resp;
      })
      this.loadSpecifications();

    }

    async loadSpecifications(): Promise<void> {
      await this.specificationSerivce.loadSpecifications().toPromise().then((data) => {
        localStorage.setItem('specificationsList',JSON.stringify(data));
        this.specificationArray = data;
      }); 
    }

    showTime(item: Calendar){
      let start = ''
      let end = '';
      if (item.startTime)
      start = item.startTime.substring(11,16);
      if (item.endTime)
      end = item.endTime.substring(11,16)
      return start + ' - ' + end;
    }

    showSpecifications(item){
      let ret = [];
      if (item.calendarSpecifications.filter(x => x.active).length > 0){
        ret.push(this.descriptionSpecifications(item));
      }
      return ret.join(' - ');
    }

    descriptionSpecifications(item: Calendar){
      let retorno = new Array();
      item.calendarSpecifications.forEach(obj => {
        if (obj.active === true){
          let name = this.specificationArray?.find(x => x.id === obj.specificationId);
          if (name){
            retorno.push(name.name);
          }
        }   
      });
      return retorno.join(' - ')
    }
    
  }
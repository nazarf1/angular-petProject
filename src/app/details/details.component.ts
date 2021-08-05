import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private titleChange: Title
  ) {}

  private changeTitle(title: string) {
    this.titleChange.setTitle(title);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.apiService.getEmployeeByID(params.id).subscribe((res: any) => {
        this.changeTitle(
          res.data.user.lastName + ' ' + res.data.user.firstName
        );
        return (this.post = res.data.user);
      });
    });
  }
}

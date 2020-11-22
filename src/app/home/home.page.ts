import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  id: any;
  constructor(private router: Router,private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    console.log()
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
    });
    
  }
  routeToTab(tabRoute: string) {
    this.router.navigate(['home/' + tabRoute+'/',this.id]);
}
}

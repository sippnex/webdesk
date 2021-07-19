import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationNode} from "./navigation-node.interface";
import {NavigationService} from "./navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navigationTree: NavigationNode;

  constructor(private navigationService: NavigationService, private router: Router) { }

  ngOnInit(): void {
    this.navigationService.getNavigationTree().subscribe(navigationTree => {
      this.navigationTree = navigationTree;
    });
  }

  navigateTo(node: NavigationNode): void {
    this.router.navigateByUrl(`${node.target}`);
  }

  isSelected(node: NavigationNode) : boolean {
    return this.router.url.indexOf(node.target) === 0;
  }

}

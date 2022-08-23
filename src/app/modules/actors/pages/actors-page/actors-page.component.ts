import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Page } from 'src/app/shared/models/Page'
import { DataService } from 'src/app/shared/services/data/data.service'
import { Actor } from '../../models/Actor'
import { ActorCollection } from '../../models/ActorCollection'
import { ActorService } from '../../services/actor.service'

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.scss'],
})
export class ActorsPageComponent implements OnInit {
  public doneLoading: boolean = false
  public actors: Actor[] = []
  public page!: Page
  public prevUrl!: string
  public nextUrl!: string
  public search!: string

  constructor (
    private readonly actorService: ActorService,
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit (): void {
    this.route.queryParams.subscribe(query => {
      const params: {[key: string]: any} = {}

      const searchQuery = query['search']
      if (searchQuery !== undefined && searchQuery === this.search) return
      if (searchQuery !== undefined) {
        params['title'] = searchQuery
        this.search = searchQuery
      }

      const page = query['page'] as number - 1
      if (page === this.page?.number) return
      if (this.page !== undefined) {
        params['page'] = page
      }

      this.actorService
        .searchActors(params)
        .subscribe(actorCollection => this.updateActors(actorCollection))
    })
  }

  updateActors (actorCollection: ActorCollection): void {
    this.actors = actorCollection._embedded.actors
    this.page = actorCollection.page
    this.prevUrl = actorCollection._links.previous?.href
    this.nextUrl = actorCollection._links.next?.href

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page.number + 1,
        search: this.search,
      },
      queryParamsHandling: 'merge',
    })

    this.doneLoading = true
  }

  onSearch (searchQuery: any): void {
    this.search = searchQuery
    this.doneLoading = false
    this.actorService
      .searchActors({ name: searchQuery })
      .subscribe(actorCollection => this.updateActors(actorCollection))
  }

  fetchPrevious (): void {
    this.doneLoading = false
    this.dataService
      .get<ActorCollection>(this.prevUrl)
      .subscribe(actorCollection => this.updateActors(actorCollection))
  }

  fetchNext (): void {
    this.doneLoading = false
    this.dataService
      .get<ActorCollection>(this.nextUrl)
      .subscribe(actorCollection => this.updateActors(actorCollection))
  }
}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AlertComponent } from './components/alert/alert.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { PageComponent } from './components/page/page.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { SearchboxComponent } from './components/searchbox/searchbox.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { UserControlsComponent } from './components/user-controls/user-controls.component'

@NgModule({
  declarations: [
    AlertComponent,
    NavbarComponent,
    PageComponent,
    PaginatorComponent,
    SearchboxComponent,
    SpinnerComponent,
    UserControlsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [
    AlertComponent,
    PageComponent,
    PaginatorComponent,
    SearchboxComponent,
    SpinnerComponent,
    UserControlsComponent,
  ],
})
export class SharedModule { }

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}

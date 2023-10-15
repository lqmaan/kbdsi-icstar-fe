import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgIconsModule} from '@ng-icons/core';
import { heroEyeSlash, heroEye } from '@ng-icons/heroicons/outline';


//List Icon path (Hero Icon)
//node_modules/@ng-icons/heroicons/outline/index.d.ts


//Services
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {TransactionService} from './services/transaction.service';
import {ReminderService} from './services/reminder.service';
import {BudgetService} from './services/budget.service';
import {CategoryService} from './services/category.service';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReminderCreateComponent } from './components/reminder-create/reminder-create.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { EbudgetingComponent } from './components/ebudgeting/ebudgeting.component';
import { BookkeepingComponent } from './components/bookkeeping/bookkeeping.component';
import { EbudgetingCreateComponent } from './components/ebudgeting-create/ebudgeting-create.component';
import { TransactionUpdateComponent } from './components/transaction-update/transaction-update.component';
import { ReminderUpdateComponent } from './components/reminder-update/reminder-update.component';
import { ComponentsComponent } from './components/components.component';
// import {HeroIcons} from'.icon/hero-icons.component';


import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id'; 
registerLocaleData(localeId, 'id'); 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserComponent,
    DashboardComponent,
    ReminderComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ReminderCreateComponent,
    TransactionComponent,
    TransactionCreateComponent,
    EbudgetingComponent,
    BookkeepingComponent,
    EbudgetingCreateComponent,
    TransactionUpdateComponent,
    ReminderUpdateComponent,
    ComponentsComponent,
    
    




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    NgIconsModule.withIcons({heroEye, heroEyeSlash}),
    SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: "id-ID" }, LoginService, UserService, TransactionService, ReminderService, BudgetService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }


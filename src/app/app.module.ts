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
import { CommonModule } from '@angular/common';

import {CurrencyPipe} from '@angular/common';

import { heroEyeSlash, heroEye, heroChartPie, heroUsers, heroCalendarDays, heroArrowRightOnRectangle, heroChartBar, heroBanknotes, heroQuestionMarkCircle, heroPrinter, heroPlus, heroTrash, heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';



//List Icon path (Hero Icon)
//node_modules/@ng-icons/heroicons/outline/index.d.ts


//Services
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {TransactionService} from './services/transaction.service';
import {ReminderService} from './services/reminder.service';
import {BudgetService} from './services/budget.service';
import {CategoryService} from './services/category.service';
import {NavbarService} from './services/navbar.service';
import {AuthguardService} from './services/authguard.service';

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
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { BodyComponent } from './body/body.component'; 
import { EbudgetingUpdateComponent } from './components/ebudgeting-update/ebudgeting-update.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
// import {HeroIcons} from'.icon/hero-icons.component';


import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { PrintComponent } from './components/ebudgeting/print/print.component';



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
    SidebarComponent,
    HeaderComponent,
    BodyComponent,
    EbudgetingUpdateComponent,
    CategoryAddComponent,
    PrintComponent
    
    




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
    CommonModule,
    NgIconsModule.withIcons({heroEye, heroEyeSlash, heroChartPie, heroUsers, heroCalendarDays, heroArrowRightOnRectangle, heroBanknotes, heroChartBar, heroQuestionMarkCircle, heroPrinter, heroPlus, heroTrash, heroChevronLeft, heroChevronRight}),
    SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: "id-ID" }, LoginService, UserService, TransactionService, ReminderService, BudgetService, CategoryService, AuthguardService, CurrencyPipe],
  bootstrap: [AppComponent],
  // entryComponents: [CategoryAddComponent]
})
export class AppModule { }


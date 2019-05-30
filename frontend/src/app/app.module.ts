import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFileUploadModule } from 'angular-material-fileupload';


import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/create/create.component';
import { ExamesComponent } from './components/exames/exames.component';
import { VigilanciasComponent } from './components/vigilancias/vigilancias.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { LinkerService } from './services/linker.service';



const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'vigilancias', component: VigilanciasComponent },
  { path: 'exames', component: ExamesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ExamesComponent,
    VigilanciasComponent,
    EditComponent,
    LoginComponent,
    ProfessoresComponent,
   LoginComponent,
   IndexComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFileUploadModule,
    MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LinkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

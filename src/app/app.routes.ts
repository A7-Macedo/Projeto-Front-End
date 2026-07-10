import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio-component/inicio-component';
import { CadastroComponent } from './paginas/auth/cadastro-component/cadastro-component';
import { PaginaprodutoComponent } from './paginas/paginaproduto-component/paginaproduto-component';
import  { CarrinhoComponent } from './paginas/carrinho-component/carrinho-component';
import { LoginComponent } from './paginas/auth/login-component/login-component';
import { authGuard } from './core/guards/auth-guard';
import { DashboardComponent } from './paginas/admin/dashboard.component/dashboard.component';
import { RoupasFormComponent } from './roupas-component/roupas-form.component/roupas-form.component';
import { EsqueceuSenhaComponent } from './paginas/esqueceusenha.component/esqueceusenha.component';
import { SobreComponent } from './paginas/sobre.component/sobre.component';
import { CategoriaForm } from './paginas/admin/categoria-form/categoria-form';
import { KitsComponent } from './paginas/kits.component/kits.component';
import { EditarRoupaComponent } from './paginas/admin/editar.component/editar.component';


export const routes: Routes = [

    {path: "inicio", component: InicioComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "login", component: LoginComponent},
    {path: 'produto/:id', component: PaginaprodutoComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    {path: 'sobre', component: SobreComponent},
    {path: 'esqueceusenha', component: EsqueceuSenhaComponent},
    {path: 'kids', component: KitsComponent},
    {path: 'admin', canActivate: [authGuard], children:[
        {path: 'dashboard', component: DashboardComponent},
        {path: 'cadastrar', component: RoupasFormComponent},
        {path: "categories", component: CategoriaForm},
        {path: 'editar/:id', component: RoupasFormComponent},
        {path: "roupas/edit", component: EditarRoupaComponent }
     
    ]},
    
    {path: "", pathMatch: 'full', redirectTo: 'inicio'},
];
 





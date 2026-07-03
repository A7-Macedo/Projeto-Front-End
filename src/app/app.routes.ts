import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio-component/inicio-component';
import { CadastroComponent } from './paginas/auth/cadastro-component/cadastro-component';
import { CategoriasComponent } from './paginas/categorias-component/categorias-component';
import { PaginaprodutoComponent } from './paginas/paginaproduto-component/paginaproduto-component';
import { CarrinhoComponent } from './paginas/carrinho-component/carrinho-component';
import { LoginComponent } from './paginas/auth/login-component/login-component';
import { authGuard } from './core/guards/auth-guard';
import { DashboardComponent } from './paginas/admin/dashboard.component/dashboard.component';
import { PerfilComponent } from './paginas/perfil-component/perfil-component';
import { RoupasFormComponent } from './roupas-component/roupas-form.component/roupas-form.component';


export const routes: Routes = [

    {path: "inicio", component: InicioComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "login", component: LoginComponent},
    {path: 'categorias', component: CategoriasComponent},
    {path: 'produto/:id', component: PaginaprodutoComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'admin', canActivate: [authGuard], children:[
        {path: 'dashboard', component: DashboardComponent}, // corrigir
        {path: 'editar', component: RoupasFormComponent}
    ]},
    
    {path: "", pathMatch: 'full', redirectTo: 'inicio'},
];






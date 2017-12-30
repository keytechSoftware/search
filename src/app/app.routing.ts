import { Routes, RouterModule } from "@angular/router";

import { ServerInfoComponent } from "./server-info/server-info.component";
import { ElementInfoComponent } from "./element-info/element-info.component";
import { SearchComponent } from "./search/search.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginComponent } from "./login/login.component";
import { SearchResultComponent } from "./search/search-result/search-result.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/server-info', pathMatch: 'full' },
    { path: 'server-info', component: ServerInfoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'element-info', component: ElementInfoComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'search-result', component: SearchResultComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES, { useHash: true }); // Support for Browser Refresh

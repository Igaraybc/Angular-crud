import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fornecedor } from '../../models/fornecedor';
import { FornecedorService } from '../../services/fornecedor.service';

@Injectable({ providedIn: 'root' })
export class FornecedorResolver implements Resolve<Fornecedor> {

    constructor(private service: FornecedorService, private router: Router){    }

    resolve(route: ActivatedRouteSnapshot): Observable<Fornecedor> {
        const id = route.params.id; 
        return this.service.readById(id);
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {

    clients!: any;

  public registry!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.registry = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getLocalClients()
   // this.getTotal()
   console.log(this.clients,'clients');
   
  }
  
  getLocalClients(){
    const storedClients = localStorage.getItem('clientsOfRegistry');
    if (storedClients) {
      this.clients = JSON.parse(storedClients);
    //  console.log('clientsOfRegistry',this.clients);
    }
  }


  getTotal(servicios: any[]): number {
    // Calcula el total de los servicios de lavado para un cliente
    return servicios.reduce((acc, servicio) => acc + servicio.price, 0);
  }
}



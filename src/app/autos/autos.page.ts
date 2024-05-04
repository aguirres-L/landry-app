import { Component,OnInit,  } from '@angular/core';



@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  cars: { brand: string, model: string }[] = [];
  clients: any[] = [];
  servicesCars: any[] =[];
  constructor() { }

  async ngOnInit() {
    this.getLocalClients()
    this.getLocalServicesCars()
    
  }

  getLocalClients(){
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      this.clients = JSON.parse(storedClients);
      console.log('clients',this.clients);
    }
  }

   getLocalServicesCars(){
    const storeServiceCars = localStorage.getItem('services');
    if(storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars)
    console.log('services',this.servicesCars);
   }

  addCar() {
    // Aquí puedes implementar la lógica para agregar un auto
    // Por ejemplo, podrías abrir un modal para que el usuario ingrese los detalles del auto
    // Y luego agregarlo a la lista de autos.
    // Por ahora, solo agregaré autos ficticios para demostrar la funcionalidad.

    this.cars.push({ brand: 'Marca', model: 'Modelo' });
  }

 
  
}

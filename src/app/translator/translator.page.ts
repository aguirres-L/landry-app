import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { newCarEn } from 'src/utils/constants/languages/en/newCar';
import { newCarEs } from 'src/utils/constants/languages/es/newCar';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.page.html',
  styleUrls: ['./translator.page.scss'],
})
export class TranslatorPage implements OnInit {
  newClient: {
    id: string;
    name: string;
    phone: string;
    carPlate: string;
    servicioLavado: { name: string; price: number }[];  // Modificado para incluir el array de servicios
    [key: string]: any;
  } = {
    id: '',
    name: '',
    phone: '',
    carPlate: '',
    servicioLavado: [], // Inicializamos el array de servicios
    // Agrega más campos para otros servicios según sea necesario
  };
  servicesCars: any[] = [];
  
    languageStore!: string;
   stringNewCarHTML: any;
  constructor(private cdr: ChangeDetectorRef) { } 


  ngOnInit() {
    // Llamamos a la función para cargar los servicios al inicializar el componente
    this.getLocalServicesCars();
    this.getLanguage()
    
  }

  getLocalServicesCars() {
    // Aquí obtienes los servicios disponibles, por ejemplo, desde localStorage
    const storeServiceCars = localStorage.getItem('services');
    if (storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars);
    console.log('services', this.servicesCars);
  }

    toggleService(serviceName: string) {
    const service = this.servicesCars.find(s => s.name === serviceName);
    const index = this.newClient.servicioLavado.findIndex(s => s.name === serviceName);
    if (index !== -1) {
      // Si el servicio ya está en el array, lo eliminamos
      this.newClient.servicioLavado.splice(index, 1);
    } else if (service) {
      // Si el servicio no está en el array y existe en servicesCars, lo agregamos
      this.newClient.servicioLavado.push({
        name: service.name,
        price: service.price
      });
    }
  }
  isServiceSelected(serviceName: string): boolean {
    return this.newClient.servicioLavado.some(s => s.name === serviceName);
  }

  submitForm() {
    // Aquí puedes implementar la lógica para guardar el cliente en localStorage
    // Guardamos los datos del nuevo cliente como un objeto JSON en localStorage
    this.newClient['id'] = uuidv4();
    this.newClient['creationDate'] = new Date().toLocaleString();  // Asignamos la fecha de creación
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    clients.push(this.newClient);
    console.log(this.newClient);
    
    localStorage.setItem('clients', JSON.stringify(clients));
    localStorage.setItem('clientsOfRegistry', JSON.stringify(clients));
  
    // Reiniciamos el formulario después de guardar los datos
    this.resetForm();
  }
  
  resetForm() {
    // Reinicia el objeto del cliente para borrar los campos del formulario
    this.newClient = {
      'id': '',
      'name': '',
      'phone': '',
      'carPlate': '',
      'servicioLavado': [], // Reiniciamos el array de servicios
      // Agrega más campos para otros servicios según sea necesario
      'creationDate': ''
    };
  }
  
  
  
    getLanguage(){
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage) this.languageStore = storeLanguage
    this.updateLanguageContent();

    console.log(this.languageStore, 'languageStore');
    console.log(this.stringNewCarHTML.clientsList,'stringNewCarHTML');
    
  }
  updateLanguageContent() {
    this.stringNewCarHTML = (this.languageStore === 'es') ? newCarEs : newCarEn;
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    console.log(this.stringNewCarHTML, 'stringNewCarHTML');
  }
}

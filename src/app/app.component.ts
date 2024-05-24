import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importar Router y NavigationEnd
import { dasboardEn } from 'src/utils/constants/languages/en/dashboard';
import { dasboardEs } from 'src/utils/constants/languages/es/dashboard';
import { SegmentValue } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: '', url: '/autos', icon: 'car' },
    { title: '', url: '/registry', icon: 'receipt' },
    { title: '', url: '/price', icon: 'cash' },
    { title: '', url: '/data', icon: 'server' },
  ];
  
  selectedLanguage: string = 'en';
  
  urlImgLogo = "../assets/logo-blue.png";

  stringFolderHTML: any;
  showMenu = true; // Variable para controlar la visibilidad del menú
  
  constructor(private cdr: ChangeDetectorRef, private router: Router,private authService: AuthService) {
    this.loadLanguage();
    
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.toggleMenuVisibility(event.url);
      }
    });
  }

  updateLanguageContent() {
    this.stringFolderHTML = (this.selectedLanguage === 'es') ? dasboardEs : dasboardEn;
    console.log(this.stringFolderHTML, 'stringFolderHTML');
    
    // Actualizar los títulos de appPages
    this.appPages = [
      { title: this.stringFolderHTML.cars, url: '/autos', icon: 'car' },
      { title: this.stringFolderHTML.registry, url: '/registry', icon: 'receipt' },
      { title: this.stringFolderHTML.price, url: '/price', icon: 'cash' },
      { title: this.stringFolderHTML.dataUser, url: '/data', icon: 'server' },
    ];

    // Marcar el componente para detección de cambios
  }

  changeLanguage(lang: SegmentValue) {
    const language = String(lang);
    if (language) {
      console.log(language, 'language');
      localStorage.setItem('language', language);  // Guardar el idioma en localStorage
      this.selectedLanguage = language;
      window.location.reload();
    }
  }

  loadLanguage() {
    const language = localStorage.getItem('language') || 'en';  // Obtener el idioma de localStorage o default 'en'
    console.log('Loaded language:', language);
    this.selectedLanguage = language;
    this.updateLanguageContent(); // Actualizar el contenido del idioma después de cargar el idioma seleccionado
  }
  
  toggleMenuVisibility(url: string) {
    // Ocultar el menú si la URL es '/login'
    this.showMenu = url !== '/login';
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
  
  logoutFomApp(){
   this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}

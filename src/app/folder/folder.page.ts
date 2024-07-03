import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { folderEn } from 'src/utils/constants/languages/en/folder'; 
import { folderEs } from 'src/utils/constants/languages/es/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  
  languageStore!: string;
  stringFolderHTML: any;
  showNote: boolean = true;
  constructor(private cdr: ChangeDetectorRef) { } 


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getLanguage()
  }
  
  getLanguage(){
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage) this.languageStore = storeLanguage
    this.updateLanguageContent();

    console.log(this.languageStore, 'languageStore');
    console.log(this.stringFolderHTML.clientsList,'stringFolderHTML');
    
  }
  updateLanguageContent() {
    this.stringFolderHTML = (this.languageStore === 'en') ? folderEs : folderEn;
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    console.log(this.stringFolderHTML, 'stringFolderHTML');
  }
  
  toggleNoteVisibility() {
    this.showNote = !this.showNote; // Cambiar el estado de la visibilidad de la nota
  }
}

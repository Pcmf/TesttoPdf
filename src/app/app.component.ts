import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestToPdf';
  public docSelected: any = {};
  public erro = '';
  public loaded = false;
  private doc: any = [];
  private filename: string;
  private obj: any = {};
  private filetype: string;

  constructor(private dataService: DataService) {}

  handleInputChange(e, doc) {
    this.doc = doc;
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.filetype = (file.type).substr((file.type).indexOf('/') + 1);
    this.filename = file.name;
    const pattern = /pdf-*/;
    const pattern2 = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern) && !file.type.match(pattern2)) {
       this.erro = 'Formato inválido. O ficheiro tem de ser PDF ou JPG!';
      // return;
    } else if ( file.size > 4000000 ) {
      this.erro = 'Ficheiro demasiado grande. Tem que ser inferior a 4Mb';
      // return;
    } else {
      this.erro = '';
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    console.log(reader);
/*     this.obj = {'lead': this.docPedido.lead, 'doc': this.docPedido, 'nomeFx': this.filename, 'fxBase64': reader.result,
    'type': this.filetype }; */
    this.obj = { fx64: reader.result};
    this.loaded = true;
  }

  confirmaAnexar() {
    this.dataService.saveData('upfile', this.obj)
      .subscribe( resp => {
        console.log('Confirma anexar:' + resp);
      });
  }
}

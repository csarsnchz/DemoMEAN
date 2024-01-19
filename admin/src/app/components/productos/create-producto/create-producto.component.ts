import { Component, OnInit } from '@angular/core';

declare var iziToast: any; // Toast

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit{
  public producto: any = {};
  public file: File | undefined;
  public imgSelected: string | ArrayBuffer | null | undefined;
  constructor() { }

  ngOnInit(): void {
  } 

  registro(registroForm: any){
    alert("Producto registrado correctamente");
    if(registroForm.valid){
      console.log(registroForm.value);
    } else {
      console.log("Error");
      iziToast.error({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFFFFF',
        class: 'text-danger',
        message: 'Error al registrar el producto',
        position: 'topRight'
      });
    }
  }

  fileChangeEvent(event: any): void {
    let file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgSelected = reader.result;
      }
      
    } else {
      this.producto.imagen = '';
      iziToast.error({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFFFFF',
        class: 'text-danger',
        message: 'No se pudo cargar la imagen',
        position: 'topRight'
      });
    }

    if (file && file.size > 4000000) {
      if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/svg' || file.type == 'image/webp'){
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imgSelected = reader.result;
        }
        reader.readAsDataURL(file);
      } else {  
        this.file = undefined;
        iziToast.error({
          title: 'Error',
          titleColor: '#FF0000',
          color: '#FFFFFF',
          class: 'text-danger',
          message: 'El archivo debe ser una imagen',
          position: 'topRight'
        });
      }

    } else {
      this.file = undefined;
      iziToast.error({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFFFFF',
        class: 'text-danger',
        message: 'La imagen debe ser menor a 4MB',
        position: 'topRight'
      });
    }
  }

}

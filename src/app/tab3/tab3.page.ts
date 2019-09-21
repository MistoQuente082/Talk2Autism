import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Dados para os cards
  req: any[] = [
    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRXd1BSlYbnKZHScUDZUsddT6JmKs15ia46AA1-S5k3LnFZ1YpA',
      tipo: 'Fardamentos',
    },

    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: 'https://miro.medium.com/max/2350/1*HoT1qwwVIKjHI6Sjzcj7gg.jpeg',
      tipo: 'Módulos',
    },

    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTajfHq73hdOyCoX41To_7hJbbCUpr1tg-JqskVY_hkZGJFcsvZ',
      tipo: 'Reuniões',
    },
  ];
  constructor() { }

}

import { Injectable } from '@angular/core';

import { Item } from '../extra/item';

@Injectable()
export class Erros {
  items: Item[] = [];

  defaultItem: any = {
    "name": "FOR",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Laço de Repetição",
  };


  constructor() {
    let items = [
      {
        "name": "Erro 404",
        "profilePic": "assets/imgs/erros/java.jpg",
        "about": "Erro 404",
        "link": "Usado para mostrar uma mensagem ao usuário na interface",
        "more": "print('mensagem')"
      },
      {
        "name": "Erro 7",
        "profilepic": "assets/imgs/erros/Java.jpg",
        "about": "Erro 7",
        "how": "Usado para mostrar uma mensagem ao usuário na interface",
        "more": "print('mensagem')"
      },
      {
        "name": "Erro2",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Laço de Repetição",
        "how": "Realiza uma série de comandos para cada componente de uma lista",
        "more": "For variavel in lista {comandos}"
      },
      {
        "name": "Erro4",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Laço de Repetição"
      },
      {
        "name": "Só p eu n bugar",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant."
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

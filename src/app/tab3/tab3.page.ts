import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //Dados para os cards
  req: any[] = [
    {
      img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjslcnHkczkAhVzILkGHWOmDvoQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.guarulhoshoje.com.br%2F2019%2F04%2F11%2Fguti-promete-concluir-entrega-de-uniformes-escolares-ate-o-final-deste-mes%2F&psig=AOvVaw0fBp9tL4GP69Ngdu4x5ZmB&ust=1568406998636458',
      tipo: 'Fardamentos'
    },

    {
      img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjWgaqAk8zkAhVKGLkGHZLLDEsQjRx6BAgBEAQ&url=https%3A%2F%2Fmedium.com%2F%40startupdareal%2Findica%25C3%25A7%25C3%25B5es-de-livros-startup-da-real-42f5df423b59&psig=AOvVaw3yxmGVbkNjnL0wjRvCDHJG&ust=1568407391581914',
      tipo: 'Módulos'
    },

    {
      img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi42pm-k8zkAhUII7kGHYToCSsQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.homify.com.br%2Ffoto%2F490161%2Fescritorio-advocacia-str-sala-reunioes&psig=AOvVaw1x0olfzzRIHz7lOGW8DoYB&ust=1568407520826955',
      tipo: 'Reuniões'
    },
  ]
  constructor() { }

}

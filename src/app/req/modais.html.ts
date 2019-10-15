// Este ts serve para conter cada html das partes de requisições.
export let modais = {
  fardamentos: `


  <ion-list> 
    <ion-list-header>
      Prencha os dados abaixo para fazer seu pedido
    </ion-list-header>
  <ion-item>
  <ion-label position="floating">Tamanhos disponíveis</ion-label>
  <ion-select [(ngModel)]="tamanho" placeholder="Tamanho" >
    <ion-select-option value="pp">PP</ion-select-option>
    <ion-select-option value="p">P</ion-select-option>
    <ion-select-option value="m">M</ion-select-option>
    <ion-select-option value="g">G</ion-select-option>s 
    <ion-select-option value="gg">GG</ion-select-option>
  </ion-select>
</ion-item>


<ion-item>
  <ion-label position="floating">Quantas fardas deseja adquirir</ion-label>
  <ion-select [(ngModel)]="quantidade" placeholder="Quantidade" >
      <ion-select-option value="1">1</ion-select-option>
      <ion-select-option value="2">2</ion-select-option>
      <ion-select-option value="3">3</ion-select-option>
      <ion-select-option value="4">4</ion-select-option>
      <ion-select-option value="5">5</ion-select-option>
      <ion-select-option value="6">6</ion-select-option>
  </ion-select>
</ion-item>
<ion-button (click)="subUniform()" expand="block" color="medium">Fazer pedido</ion-button>
  </ion-list>


  `,


  modulos: `
  <ion-list>
    <ion-item>
      <ion-label  position="floating">Quantidade de atividades:</ion-label>
      <ion-input [(ngModel)]="aQnt" type="text" maxlenght="3" placeholder="Ex: 3"></ion-input>
    </ion-item>
    <ion-item>
        <ion-label  position="floating">Digite um tema (opcional):</ion-label>
        <ion-input [(ngModel)]="tema" required maxlenght="30" class="plac" type="text" placeholder="Ex: Animais"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label  position="floating">Elementos inclusos (comunicação):</ion-label>
        <ion-input [(ngModel)]="elementos"required maxlenght="20" type="text" placeholder="Ex: Sanduíche, celular..."></ion-input>
    </ion-item>

    <ion-item>
        <ion-label  position="floating">Informações adicionais:</ion-label>
        <ion-input [(ngModel)]="infoAd" required maxlenght="50" type="text" placeholder="Ex: Letras maíusculas, cores fortes "></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Selecione:</ion-label>
        <ion-select [(ngModel)]="modulos" placeholder="Tipo de módulo">
            <ion-select-option value="sobPos">Sobreposição</ion-select-option>
            <ion-select-option value="duasEn">Duas Entradas</ion-select-option>
            <ion-select-option value="parImg">Pareamento de Imagens</ion-select-option>
            <ion-select-option value="enig">Enigmas</ion-select-option>
        </ion-select>
    </ion-item>

    <ion-button (click)="sub()" expand="block" color="medium">Fazer pedido</ion-button>
    
</ion-list>`,
  reunioes: `
    <ion-list>
  <ion-item>
  <ion-label  position="floating">Motivo:</ion-label>
      <ion-input [(ngModel)]="motivo" maxlenght="100" placeholder="Ex: Mudança de turma"></ion-input>
    </ion-item>

  <ion-item>
      <ion-label  position="floating">Limitações de horário:</ion-label>
      <ion-input [(ngModel)]="limHorario"
       required maxlenght="30" class="plac" type="text" placeholder="Ex: Indisponível antes das 10h"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label  position="floating">Limitações de datas:</ion-label>
    <ion-input [(ngModel)]="limData" required type="text" placeholder="Ex: Indisponível quinta"></ion-input>
  </ion-item>

  <ion-item>
    <ion-textarea [(ngModel)]="detalhes" rows="8" cols="30" placeholder="Mais detalhes"></ion-textarea>
  </ion-item>

    </ion-list>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button (click)="subMeeting()">
            <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    `

};

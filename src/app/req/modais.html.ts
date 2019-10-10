// Este ts serve para conter cada html das partes de requisições.
export let modais = {
  fardamentos: `


  <ion-list> 
    <ion-list-header>
      Prencha os dados abaixo para fazer seu pedido
    </ion-list-header>
  <ion-item>
  <ion-label position="floating">Tamanhos disponíveis</ion-label>
  <ion-select placeholder="Tamanho" >
    <ion-select-option value="pp">PP</ion-select-option>
    <ion-select-option value="p">P</ion-select-option>
    <ion-select-option value="m">M</ion-select-option>
    <ion-select-option value="g">G</ion-select-option>s 
    <ion-select-option value="gg">GG</ion-select-option>
  </ion-select>
</ion-item>


<ion-item>
  <ion-label position="floating">Quantas fardas deseja adquirir</ion-label>
  <ion-select placeholder="Quantidade" >
      <ion-select-option value="1">1</ion-select-option>
      <ion-select-option value="2">2</ion-select-option>
      <ion-select-option value="3">3</ion-select-option>
      <ion-select-option value="4">4</ion-select-option>
      <ion-select-option value="5">5</ion-select-option>
      <ion-select-option value="6">6</ion-select-option>
  </ion-select>
</ion-item>
  </ion-list>
  
  <div>
  <ion-button (click)="subUniform()" expand="block" color="medium">Fazer pedido</ion-button>
</div>
</div>
  `,


  modulos: ` 
    <ion-list> 
    <ion-item>
    <ion-label position="floating">Disponível</ion-label>
    <ion-select placeholder="" >
      <ion-select-option value="pais">Pais</ion-select-option>
      <ion-select-option value="profissionais">Profissionais</ion-select-option>
      <ion-select-option value="coordenacao">Coordenação</ion-select-option>
    </ion-select>
  </ion-item>
  <ion-item>
    <ion-label position="floating">Destinatário</ion-label>
    <ion-select placeholder="Select One" >
      <ion-select-option value="1">1</ion-select-option>
      <ion-select-option value="2">2</ion-select-option>
      <ion-select-option value="3">3</ion-select-option>
      <ion-select-option value="4">4</ion-select-option>
      <ion-select-option value="5">5</ion-select-option>
      <ion-select-option value="6">6</ion-select-option>
    </ion-select>
  </ion-item>
    </ion-list>`,
  reunioes: `
  <div style="padding-right: 14px">
  <ion-list>
  <ion-item>
  <ion-label [(ngModel)]="email" position="floating">Motivo:</ion-label>
      <ion-input maxlenght="100" placeholder="Ex: Mudança de turma"></ion-input>
    </ion-item>

  <ion-item>
      <ion-label position="floating">Limitações de horário:</ion-label>
      <ion-input required maxlenght="30" class="plac" type="text" placeholder="Ex: Indisponível antes das 10h"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Limitações de datas:</ion-label>
    <ion-input required type="text" placeholder="Ex: Indisponível quinta"></ion-input>
  </ion-item>

  <ion-item>
    <ion-textarea rows="8" cols="30" placeholder="Mais detalhes"></ion-textarea>
  </ion-item>

    </ion-list>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button (click)="subMeeting()">
            <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    </div>
    `

};

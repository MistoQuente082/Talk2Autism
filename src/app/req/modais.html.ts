export let modais = {
  fardamentos: `
  <ion-list>
      <ion-item>
        <ion-label position="floating">Categorias</ion-label>
        <ion-select placeholder="Select One" multiple>
          <ion-select-option value="pais">Pais</ion-select-option>
          <ion-select-option value="profissionais">Profissionais</ion-select-option>
          <ion-select-option value="coordenacao">Coordenação</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Destinatário</ion-label>
        <ion-select placeholder="Select One" multiple>
          <ion-select-option value="f">Female</ion-select-option>
          <ion-select-option value="m">juaum</ion-select-option>
          <ion-select-option value="f">Female</ion-select-option>
          <ion-select-option value="m">Male</ion-select-option>
          <ion-select-option value="f">Female</ion-select-option>
          <ion-select-option value="m">Male</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Inputs with labels -->
      <ion-item>
        <ion-input placeholder="Assunto"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea rows="10" cols="30" placeholder="Mensagem"></ion-textarea>
      </ion-item>

    </ion-list>`,


  modulos: ` `,
  reunioes: `
    <ion-item>
        <ion-label position="floating">Informe o motivo:</ion-label>
        <ion-textarea  maxlength="100" placeholder="Ex: Mudança de horário"></ion-textarea>
    </ion-item>

  <ion-item>
      <ion-label position="floating">Limitações de horário:</ion-label>
      <ion-input required class="plac" type="text" placeholder="Ex: Indisponível das 14:00 às 16:00"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Limitações de datas:</ion-label>
    <ion-input required type="text" placeholder="Ex: Indisponível às terças e quintas"></ion-input>
  </ion-item>

  <ion-item>
  <ion-label position="floating">Mais detalhes:</ion-label>
  <ion-textarea ></ion-textarea>
</ion-item>


<ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button (click)="subMeeting()">
            <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
    </ion-fab>`

};

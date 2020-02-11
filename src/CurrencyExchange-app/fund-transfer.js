import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
* @customElement
* @polymer
*/
class FundTransfer extends PolymerElement {
    static get template() {
        return html`
<style>
  :host {
    display: block;
    min-height:100vh;
   background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);    

  }

  #form {
    border: 2px solid black;
    width: 500px;
    margin-left: 400px;
  }

  form {
    margin-left: 20px;
    margin-right: 20px;
  }
  h2{
    text-align: center;
  }
  paper-button {
    text-align: center;
    background-color:black;
    color:white;
  }
  h1{
      text-align:center;
      padding-bottom:20px;
      padding-top:20px;
  }

</style>
<h1> [[prop1]]</h1>
<app-location route={{route}}></app-location>
<paper-button raised class="custom indigo" on-click="signIn">Dashboard</paper-button>
<iron-form id="form">
  <form>
 
  </form>
</iron-form>
`;
    }
    static get properties() {
        return {
            sfv: {
                type: String,
                value: 'Forex Transfer'
            },
            respCheck: Array,
        };
    }

}

window.customElements.define('fund-transfer', FundTransfer);
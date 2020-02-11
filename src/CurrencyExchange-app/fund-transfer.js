import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

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
a{
  text-decoration:none;
  color:white;
}
</style>
<h1> [[prop1]]</h1>
<app-location route={{route}}></app-location>
<paper-button raised class="custom indigo" on-click="signIn">Dashboard</paper-button>
<paper-button raised class="custom indigo" on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
<iron-form id="form">
  <form>
  <paper-dropdown-menu label="Currency">
  <paper-listbox slot="dropdown-content" selected="0">
  <template is="dom-repeat" items={{currencies}}>
    <paper-item>{{item.currencyName}}</paper-item>
</template>
  </paper-listbox>
</paper-dropdown-menu>
  </form>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
    }
    static get properties() {
        return {
            sfv: {
                type: String,
                value: 'Forex Transfer'
            },
            currencies: Array,
        };
    }
    connectedCallback(){
      super.connectedCallback();
      this._makeAjax(`http://10.117.189.111:9090/forexpay/currencies`,'get',null)
    }
    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.currencies = event.detail.response;
        console.log(this.currencies)
    }
      // calling main ajax call method 
    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
    _handleLogout(){
      sessionStorage.clear();
    }

}

window.customElements.define('fund-transfer', FundTransfer);
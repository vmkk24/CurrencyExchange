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

  }
#buttons{
  position:absolute;
  top:50px;
  left:1100px;
}
  #form {
    border: 1px solid black;
    width: 500px;
    border-radius:20px;
    padding:8px;
    margin-top: 50px;
    margin-left: 400px;
    background-color:white;
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
      color:white;
      position:absolute;
      top:19px;
      left:300px;
  
  }
a{
  text-decoration:none;
  color:white;
}
</style>
<app-location route={{route}}></app-location>
<h1>Welcome, {{userName}}</h1>
<div id="buttons">
<paper-button raised class="custom indigo">Dashboard</paper-button>
<paper-button raised class="custom indigo" on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
</div>
<iron-form id="form">
  <form>
  <paper-input label="To Account" type="text" value={{toAccount}} name="toAccount" required error-message="Please Enter To account Number"></paper-input>
  <paper-dropdown-menu label="To Currency">
  <paper-listbox slot="dropdown-content" selected="0">
  <template is="dom-repeat" items={{currencies}}>
    <paper-item>{{item.currencyName}}</paper-item>
</template>
  </paper-listbox>
</paper-dropdown-menu>
<paper-input label="Amount in Selected Currency" type="number" value={{amount}} name="amount" required error-message="Please Enter Amount"></paper-input>
  </form>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
    }
    static get properties() {
        return {
            currencies: Array,
            userName:{
              type:String,
              value:sessionStorage.getItem('userName')
            }
        };
    }
    connectedCallback(){
      super.connectedCallback();
      this.userName = sessionStorage.getItem('userName');
      this._makeAjax(`http://10.117.189.111:9090/forexpay/currencies`,'get',null)
    }
    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.currencies = event.detail.response;
    }
    _handleError() {
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
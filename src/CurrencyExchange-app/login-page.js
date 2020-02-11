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
class UserLogin extends PolymerElement {
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
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 180px;
  }
  h1{
      text-align:center;
      padding-bottom:20px;
      padding-top:20px;
  }

</style>
<h1> [[prop1]]</h1>
<app-location route={{route}}></app-location>

<iron-form id="form">

  <form>
    <h2> Login Page </h2>
    <paper-input label="User Name" type="text" value={{userName}} name="userName" required error-message="enter user name"></paper-input>
    <paper-input label="Password" type="password" value={{password}} name="password" required error-message="enter user name" ></paper-input>

    <paper-button raised class="custom indigo" on-click="signIn">Login</paper-button>
  </form>
</iron-form>

<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
on-error="_handleError" content-type="application/json"></iron-ajax>


`;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'Forex Transfer'
            },
            respCheck: Array,
        };
    }

    // fetching the  user data from josn file 
    signIn() {
        this.set('route.path','./dashboard-page');
        if (this.$.form.validate()) {
            let userName = this.userName;
            let pass = this.password;
            this._makeAjax(`http://localhost:3000/users?name=${userName}&&password=${pass}`, "get", null);
        }
    }
      _handleResponse(event) {
        this.respCheck = event.detail.response
      }

    _handleError() {
        alert('Mobile Number or Password is incorrect');
      }

      _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
      }

}

window.customElements.define('login-page', UserLogin);
<template>
  <div class="setup-profile-tab dashboard-tab">
    <vuestic-wizard
      :steps="steps"
      wizard-layout="vertical"    
      :wizard-type="wizardType"
      v-bind:publickey="publickey"
      v-bind:privatekey="privatekey"
      >
      <div slot="page1" class="form-wizard-tab-content">
        <h4>1.Login in Amazon with your Root Accout</h4>
        <img class="pasos" src="../../../assets/pasos/Paso1.png" alt="paso1">
        <h4>2.Acces to your Billing Dashboard</h4>
        <img class="pasos" src="../../../assets/pasos/Paso2.png" alt="paso1">
        <h4>3.Click the CE button</h4>
        <img class="pasos" src="../../../assets/pasos/Paso3.png" alt="paso1">
        <h4>4.Click the unable CE button</h4>
        <img class="pasos" src="../../../assets/pasos/Paso4.png" alt="paso1">
        <img class="pasos" src="../../../assets/pasos/Paso5.png" alt="paso1">
        <h4>5.Acces to your Security Credentials</h4>
        <img class="pasos" src="../../../assets/pasos/Paso6.png" alt="paso1">
        <img class="pasos" src="../../../assets/pasos/Paso7.png" alt="paso1">
        <h4>6.Acces to Users</h4>
        <img class="pasos" src="../../../assets/pasos/Paso8.png" alt="paso1">
        <h4>7.Add User</h4>
        <img class="pasos" src="../../../assets/pasos/Paso9.png" alt="paso1">
        <h4>8.Set users details</h4>
        <img class="pasos" src="../../../assets/pasos/Paso10.png" alt="paso1">
        <h4>9.Acces to Attach existing policies and create one</h4>
        <img class="pasos" src="../../../assets/pasos/Paso11.png" alt="paso1">
        <h4>10. Create the same JSON</h4>
        <img class="pasos" src="../../../assets/pasos/Paso12.png" alt="paso1">
        <h4>11. Attach the policy</h4>
        <img class="pasos" src="../../../assets/pasos/Paso13.png" alt="paso1">
        <h4>12.Finish the user</h4>
        <img class="pasos" src="../../../assets/pasos/Paso14.png" alt="paso1">
        <h4>13. Save your Keys, you can't ask them again</h4>
        <img class="pasos" src="../../../assets/pasos/Paso15.png" alt="paso1">
        <div class="form-group with-icon-right"
             :class="{'has-error': errors.has('name'), 'valid': isFormFieldValid('name')}">
          <div class="input-group">
            <input
              type="text"
              name="name"
              v-model="billcost" 
              v-validate="'required'"
              required="required"/>
            <i
              class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
            <i class="fa fa-check valid-icon icon-right input-icon"></i>
            <label class="control-label">Did you follow the steps?</label><i class="bar"></i>
            <small v-show="errors.has('name')" class="help text-danger">{{
              errors.first('name') }}
            </small>
          </div>
          
          <div v-if="messageAlert != ''">
            {{messageAlert}}
          </div>          
        </div>
      </div>
      <div slot="page2" class="form-wizard-tab-content">
        <h4>Insert your public key</h4>
        
        <div class="form-group with-icon-right"
             :class="{'has-error': errors.has('name'), 'valid': isFormFieldValid('name')}">
          <div class="input-group">
            <input
              type="text"
              name="name"
              v-model="publickey" 
              v-validate="'required'"
              required="required"/>
            <i
              class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
            <i class="fa fa-check valid-icon icon-right input-icon"></i>
            <label class="control-label">Public Key</label><i class="bar"></i>
            <small v-show="errors.has('name')" class="help text-danger">{{
              errors.first('name') }}
            </small>
          </div>
          
          <div v-if="messageAlert != ''">
            {{messageAlert}}
          </div>          
        </div>
      </div>
      <div slot="page3" class="form-wizard-tab-content">
        <h4>Insert your private key</h4>
   
        <div class="form-group with-icon-right"
             :class="{'has-error': errors.has('name'), 'valid': isFormFieldValid('name')}">
          <div class="input-group">
            <input
              type="text"
              name="name"
              v-model="privatekey"
              v-validate="'required'"
              required="required"/>
            <i
              class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
            <i class="fa fa-check valid-icon icon-right input-icon"></i>
            <label class="control-label">Private Key</label><i class="bar"></i>
            <small v-show="errors.has('name')" class="help text-danger">{{
              errors.first('name') }}
            </small>
          </div>
        </div>

      </div>
      <div slot="page4" class="form-wizard-tab-content">
        <h4>Confirm selection</h4>
      </div>
      <div slot="wizardCompleted"
           class="form-wizard-tab-content wizard-completed-tab">
        <h4>Steps completed!</h4>
      </div>

    </vuestic-wizard>
  </div>
</template>

<script>
  import CountriesList from 'data/CountriesList'
  import axios from 'axios'
  export default {
    name: 'setup-profile-tab',
    props: {
      wizardType: {
        default: 'rich'
      },
    },
    data () {
      return {
        steps: [
          {
            label: 'Step 1. Amazon Bill',
            slot: 'page1',
            onNext: () => {
              this.validateFormField('name')
            },
            isValid: () => {
              return this.isFormFieldValid('name')
            }
          },
          {
            label: 'Step 2. Public Key',
            slot: 'page2',
            onNext: () => {
              this.validateFormField('name')
            },
            isValid: () => {
              return this.isFormFieldValid('name')
            }
          },
          {
            label: 'Step 3. Private Key',
            slot: 'page3',
            onNext: () => {
              this.validateFormField('name')
            },
            isValid: () => {
              return this.isFormFieldValid('name')
            }            
          },
          {
            label: 'Step 4. Confirm',
            slot: 'page4'
          }
        ],
        selectedCountry: '',
        name: '',
        name2:'',
        countriesList: CountriesList,
        
        publickey:'',
        privatekey:'',
        billcost: '',
        messageAlert:'',
        isActive:''        
      }
    },
  
    methods: {
      isFormFieldValid (field) {
        let isValid = false
        if (this.formFields[field]) {
          isValid = this.formFields[field].validated && this.formFields[field].valid
        }
        return isValid
      },
      validateFormField (fieldName) {
        this.$validator.validate(fieldName, this[fieldName])
      }
    },
  }
</script>

<style lang="scss" scoped>
  .form-group {
    min-width: 200px;
    max-width: 360px;
    width: 80%;
  }

  .wizard-completed-tab {
    @include media-breakpoint-up(md) {
      margin-top: -$tab-content-pt;
    }
  }
  .pasos {
    max-width: 100%;
    height: auto;
  }

</style>

<template>
  <div class="signup">
    <h2>{{'auth.createNewAccount' | translate}}</h2>
    <!-- <form name="signup"> -->
      <!-- input name -->
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="password" required="required" v-model="input.name"/>
          <label class="control-label" for="password">Username</label><i class="bar"></i>
        </div>
      </div>
      <!-- FIN input name -->
      <!-- input email -->
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" required="required" v-model="input.email"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <!-- FIN input email -->
      <!-- input password -->
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required" v-model="input.password"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <!-- FIN input password -->
      <!-- input password validate -->
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required" v-model="input.passwordv"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <!-- FIN input password validate-->
        <!-- <div v-if="input.message != ''">
          <label class="control-label" for="password">{{input.message}}</label><i class="bar"></i>
        </div> -->



      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" v-on:click="insertUser">
          {{'auth.signUp' | translate}}
        </button>
        <router-link class='link' :to="{name: 'login'}">{{'auth.alreadyJoined' | translate}}</router-link>
      </div>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signup',
  data () {
    return {
      checkboxOneModel: true,
      input: {
        name: '',
        email: '',
        password: '',
        passwordv: '',
        message: '',
      }
    }
  },
  methods: {
    insertUser () {
      this.verificarCorreoUnico();
      if(this.input.name.length<6) {
        alert("Username debe tener una longitud superior a 5 caracteres")
      }
      if (this.input.password === this.input.passwordv) {
        axios.post(process.env.ROOT_API+'/users', {'nombre': this.input.name, 'email': this.input.email, 'password': this.input.password})
          .then(res => {
            console.log(res)
            alert("Te has registrado satisfactoriamente. Por favor, verifica tu email para activar tu cuenta")
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        alert('Verifica que ambas contraseñas son idénticas')
        //this.input.message = 'Verifica que ambas contraseñas son idénticas'
      }
    },
    verificarCorreoUnico() {
        axios.get(process.env.ROOT_API+'/users/')
          .then(res => {
            console.log(res.data)
            for(let i = 0; i < res.data.length; i++) {
              if(res.data[i].email==this.input.email) {
                alert("Este correo ya se encuentra registrado")
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })      
    }
  }
}
</script>

<style lang="scss">
  .signup {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 2.6875rem;
    }
  }
</style>

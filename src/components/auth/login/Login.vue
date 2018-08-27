<template>
  <div class="login">
    <h2>Eres un puto</h2>
    <form name="login">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" required="required" v-model="input.email"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required" v-model="input.password"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" v-on:click="login()">
          {{'auth.login' | translate}}
        </button>
        <router-link class='link' :to="{name: 'signup'}">{{'auth.createAccount' | translate}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      input: {
        name: '',
        email: '',
        password: '',
        message: '',
      }
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:4000/users/login', { 'email': this.input.email, 'password': this.input.password })
        .then(res => {
          if (res.status === 200) {
            console.log('mierdaaaaaaaaaaaa')
            this.$router.replace({name: 'dashboard', params: { nombre: res.data.nombre, id: res.data.id, token: res.data.token }})
          }
        })
        .catch(function (error) {
          alert('Correo o contraseña invalidas')
          console.log(error)
        })
    },
  }
}
</script>

<style lang="scss">
  .login {
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
      margin-top: 3.125rem;
    }
  }
</style>

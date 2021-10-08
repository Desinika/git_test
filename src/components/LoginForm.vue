<template>
<div class="flex-container">
  <div class="flex-child">
    <form @submit.prevent="signup" class="formdiv">
        <h2>Signup</h2>
        <p>email<br><input  v-model="email" placeholder="Email address..." /></p>
        <p>password<br><input :type="inputType" v-model="password" placeholder="password..." /></p>
        <button>Signup</button>
    </form>
  </div>

  <div class="flex-child">
    <form @submit.prevent="confirm">
        <h2>Confirm</h2>
        <p>email<br><input  v-model="email" placeholder="Email address..." /></p>
        <p>code<br><input :type="inputType" v-model="code" placeholder="Confirmation code..." /></p>
        <button>Confirm</button>
    </form>
  </div>

  <div class="flex-child">

    <form @submit.prevent="login">
        <h2>Login</h2>
        <p>email<br><input  v-model="email" placeholder="Email address..." /></p>
        <p>password<br><input :type="inputType" v-model="password" placeholder="password..." /></p>
        <button>Login</button>
    </form>
  </div>

  <div class="flex-child">


    <form @submit.prevent="logout">
        <h2>Logout</h2>
        <button>Logout</button>
    </form>
  </div>
</div>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  name: 'Login',
  data() {
    return {
      email: 'jesper.hogstrom@aditrologistics.com',
      password: 'foobar1234',
      code: '',
      inputType: 'password'
    }
  },
  methods: {
    async login() {
      try {
        await Auth.signIn(this.email, this.password)
          .then(() => this.$emit('loggedin'))
          .then(() => { console.log(Auth.currentAuthenticatedUser().name) })
      } catch (error) {
        alert(error.message)
      }
      // Auth.currentSession().then(res => {
      //   const accessToken = res.getAccessToken()
      //   const jwt = accessToken.getJwtToken()
      //   // You can print them to see the full objects
      //   console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
      //   console.log(`myJwt: ${jwt}`)
      // })
    },
    async signup() {
      if (!this.email.includes("aditrologistics")) {
        alert("Not a valid domain")
        return
      }

      try {
        await Auth.signUp({
          username: this.email.replace('@', '_'),
          password: this.password,
          attributes: {
            email: this.email
            // phone_number,   // optional - E.164 number convention
            // other custom attributes
          }
        })
      } catch (error) {
        console.log('error signing up:', error)
      }
    },
    async confirm() {
      try {
        await Auth.confirmSignUp(this.email.replace('@', '_'), this.code)
      } catch (error) {
        console.log('error confirming sign up', error)
      }
    },
    async logout() {
      try {
        await Auth.signOut().then( (x) => console.log(x))

      } catch (error) {
        console.log('error logging out', error)
      }
    }

  }
}
</script>

<style>
p {
  text-align: left;
  font-size: 8px;
}

.formdiv {
  border: 2px green;
  /* border-radius: 10px; */
}

.flex-container {
    display: flex;
}

.flex-child {
    flex: 1;
    border: 4px outset gray;
    background-color: rgb(230, 233, 227);
    margin: 10px;
    padding: 10px;
}
</style>

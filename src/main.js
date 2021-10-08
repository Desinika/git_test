import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify, { Auth } from 'aws-amplify'
import { ROOTURL } from './globals'
// import awsconfig from './aws-exports'
// Amplify.configure(
//   awsconfig,
//   {
//     API: {
//       endpoints: [
//         {
//           name: 'api',
//           endpoint: ROOTURL
//         }
//       ]
//     }
//   }
// )

Amplify.configure({
  // OPTIONAL - if your API requires authentication
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-2:e2ea8315-b8c4-4394-a5e3-7b00faeb8bd9',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-2',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-2_6UvClj3a6',
    // // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '69p1u1hrufll5p9di1igjn5n07'
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: ROOTURL
      }
    ]
  }
})

Auth.configure()

createApp(App).use(store).use(router).mount('#app')

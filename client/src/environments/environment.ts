// Servidor local
const baseUrl = '';
export const environment = {
  production: false,
  baseUrl: baseUrl,
  url: 'http://localhost:4203/' + baseUrl,
  urlLogOut: 'http://localhost:4203/' + baseUrl,
  // urlApi: 'http://localhost:3000/api/v1',
  urlApiGeneral: 'http://192.168.1.129:3001',
  // urlApiGeneral: 'http://localhost:3001',
  urlApiIso45001: 'http://192.168.1.129:3003',
};

//Servidor Homero
// const baseUrl = '';
// export const environment = {
//   production: false,
//   baseUrl: baseUrl,
//   url: 'http://localhost:4200/' + baseUrl,
//   urlLogOut: 'http://localhost:4200/' + baseUrl,
//   urlApi: 'http://26.241.69.100:3000',
// };

// Servidor de desarrollo
// const baseUrl = '';
// export const environment = {
//   production: false,
//   baseUrl: baseUrl,
//   url: 'https://dev-obras.rubenvn.com/' + baseUrl,
//   urlLogOut: 'https://dev-obras.rubenvn.com/' + baseUrl,
//   urlApi: 'https://dev-api-obras.rubenvn.com',
// };

// Servidor de desarrollo
const baseUrl = '';
export const environment = {
  production: true,
  baseUrl: baseUrl,
  url: 'https://iso-45001.vercel.app/' + baseUrl,
  urlLogOut: 'https://iso-45001.vercel.app/' + baseUrl,
  urlApiGeneral:
    'https://iso-bridge-tools-server-general-production.up.railway.app',
  urlApiIso45001: 'https://iso45001-production.up.railway.app',
};

// Servidor de producción

// export const environment = {
//   production: true,
//   baseUrl: baseUrl,
//   url: 'https://obras.rubenvn.com/' + baseUrl,
//   urlLogOut: 'https://obras.rubenvn.com/' + baseUrl,
//   urlApi: 'https://api-obras.rubenvn.com',
// };

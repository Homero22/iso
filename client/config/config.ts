import { environment } from '../src/environments/environment';
import json from '../package.json';

export default {
  URL_BASE: environment.url,
  URL_BASE_PATH: environment.baseUrl,
  URL_API_BASE: environment.urlApiGeneral,
  URL_API_ISO45001: environment.urlApiIso45001,
  VERSION: json.version,
};

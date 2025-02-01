import { HttpInterceptorFn } from '@angular/common/http';

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  //clonar la petición para agregarle whithCredentials
  const cloned = req.clone({
    withCredentials: true,
  });

  //pasar la petición clonada al siguiente manejador
  return next(cloned); 
};

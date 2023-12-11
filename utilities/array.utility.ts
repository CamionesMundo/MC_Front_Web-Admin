export const idMonedaPeso = 1;
export const idEstadoReemplazo = 3;
export const idEstadoPagado = 4;
export const idPagoTotalLeasing = 7;
export const idPagoIntereses = 5;

export const sumArray = (arr: any[], property: any) => {
  let res = 0;
  // cache the length in case the browser can't do it automatically
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    res += arr[i][property];
  }
  return res;
};

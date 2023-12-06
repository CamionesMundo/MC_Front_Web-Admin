import axios from "axios";
import appConfiguration from "./AppConfiguration";

export const axiosInstance = axios.create({
  baseURL: appConfiguration.API.URL,
});

const api = {
  COMBOS: {
    bancos: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/Banco/combo`),
    bancosSolicitud: (idNegocio, nombreBanco, filtered): Promise<any> =>
      axiosInstance.get(
        `/api/v1/pasivos/CreditoBancario/${idNegocio}/banco/${nombreBanco}/${filtered}/combo`
      ),
    monedas: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/Moneda/moneda/combo`),
    tiposAval: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/TipoAval/avales/tipo/combo`),
    tiposCredito: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/TipoCredito/credito/tipo/combo`),
    divisiones: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/Division/division/tipo/combo`),
    estados: (): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/TipoEstado/estado/tipo/combo`),
    tiposPago: (idNegocio: number): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/TipoPago/pago/tipo/combo`, {
        params: { idnegocio: idNegocio },
      }),
    tiposGasto: (idNegocio: number): Promise<any> =>
      axiosInstance.get(`/api/v1/pasivos/Gasto/${idNegocio}/combo`),
  },
  CREDITO: {
    REPORTES: {
      cargarReportePorTipo: (idTipo, fecha): Promise<any> =>
        axiosInstance.get(`/api/v1/pasivos/Reportes/${idTipo}/listReport`, {
          params: {
            fechacorte: fecha,
          },
        }),
    },
    SOLICITUD: {
      obtenerBandeja: (filtros): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Solicitud/bandeja`, filtros),
      obtenerSolicitud: (idSolicitud): Promise<any> =>
        axiosInstance.get(`/api/v1/pasivos/Solicitud/${idSolicitud}/listar`),
      nuevaSolicitud: (data): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Solicitud/save`, data),
      editarSolicitud: (idSolicitud, idEstado): Promise<any> =>
        axiosInstance.put(
          `/api/v1/pasivos/Solicitud/${idSolicitud}/estado/${idEstado}/update`
        ),
      agregarGasto: (idSolicitud, idEjecutivo, idGasto, monto): Promise<any> =>
        axiosInstance.post(
          `/api/v1/pasivos/Gasto/solicitud/${idSolicitud}/ejecutivo/${idEjecutivo}/saveGasto`,
          [
            {
              psv_int_idsolicitudgastos: idSolicitud,
              psv_int_idconceptogastos: idGasto,
              psv_dec_monto: monto,
            },
          ]
        ),
      eliminarGasto: (idGasto): Promise<any> =>
        axiosInstance.delete(`/api/v1/pasivos/Gasto/${idGasto}/delete`),
      borrarSolicitud: (idSolicitud): Promise<any> =>
        axiosInstance.delete(`/api/v1/pasivos/Solicitud/${idSolicitud}/delete`),
      cambiarEstado: (idSolicitud, idEstado): Promise<any> =>
        axiosInstance.put(
          `/api/v1/pasivos/Solicitud/${idSolicitud}/estado/${idEstado}/update`
        ),
      reemplazar: (data): Promise<any> =>
        axiosInstance.post(
          `/api/v1/pasivos/Solicitud/reemplazarSolicitud`,
          data
        ),
      obtenerTablaVencimiento: (idTipo, fecha): Promise<any> =>
        axiosInstance.get(`/api/v1/pasivos/Reportes/${idTipo}/listReport`, {
          params: {
            fechacorte: fecha,
          },
        }),
      obtenerTablaDevengamiento: (idTipo, fecha): Promise<any> =>
        axiosInstance.get(`/api/v1/pasivos/Reportes/${idTipo}/listReport`, {
          params: {
            fechacorte: fecha,
          },
        }),
    },
    CREDITO: {
      obtenerCredito: (idSolicitud): Promise<any> =>
        axiosInstance.get(
          `/api/v1/pasivos/Credito/solicitud/${idSolicitud}/listar`
        ),
      nuevaCredito: (data): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Credito/save`, data),
      editarCredito: (idSolicitud, idCredito, idTipoNegocio): Promise<any> =>
        axiosInstance.put(
          `/api/v1/pasivos/Credito/solicitud/${idSolicitud}/credito/${idCredito}/pagar/${idTipoNegocio}`
        ),
      borrarCredito: (idSolicitud, idCredito): Promise<any> =>
        axiosInstance.delete(
          `/api/v1/pasivos/Credito/solicitud/${idSolicitud}/credito/${idCredito}/delete`
        ),
      PAGO: {
        nuevoPago: (data): Promise<any> =>
          axiosInstance.put(`/api/v1/pasivos/Credito/pagar`, data),
        bandejaPagos: (idSolicitud, idCredito): Promise<any> =>
          axiosInstance.get(
            `/api/v1/pasivos/Pago/${idSolicitud}/credito/${idCredito}/listar`
          ),
        obtenerUltimasCuotas: (idSolicitud): Promise<any> =>
          axiosInstance.get(
            `api/v1/pasivos/Amortizacion/${idSolicitud}/getcuotapago`
          ),
        obtenerTipoCambioPorFecha: (idMoneda, fecha): Promise<any> =>
          axiosInstance.get(
            `/api/v1/pasivos/Moneda/${idMoneda}/gettipocambio`,
            {
              params: {
                fecha: fecha,
              },
            }
          ),
      },
    },
    AMORTIZACION: {
      obtenerArchivo: (idSolicitud): Promise<any> =>
        axiosInstance.get(
          `/api/v1/pasivos/Amortizacion/${idSolicitud}/listfile`
        ),
      nuevoArchivo: (data): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Amortizacion/savefile`, data),
    },
    AVALES: {
      obtenerAvales: (idSolicitud): Promise<any> =>
        axiosInstance.get(`/api/v1/pasivos/Avales/${idSolicitud}/listar`),
      nuevoAval: (data): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Avales/save`, data),
      borrarAval: (idSolicitud, idAval): Promise<any> =>
        axiosInstance.delete(
          `/api/v1/pasivos/Avales/solicitud/${idSolicitud}/avales/${idAval}/delete`
        ),
    },
    VOUCHERS: {
      obtenerVoucher: (idSolicitud): Promise<any> =>
        axiosInstance.get(
          `/api/v1/pasivos/Vouchers/${idSolicitud}/vouchers/listar`
        ),
      nuevaVoucher: (data): Promise<any> =>
        axiosInstance.post(`/api/v1/pasivos/Vouchers/save`, data),
      borrarVoucher: (idSolicitud, idVoucher): Promise<any> =>
        axiosInstance.delete(
          `/api/v1/pasivos/Vouchers/solicitud/${idSolicitud}/voucher/${idVoucher}/delete`
        ),
      comboCreditosBancarios: (idSolicitud, idCredito): Promise<any> =>
        axiosInstance.get(
          `/api/v1/pasivos/Vouchers/${idSolicitud}/credito/${idCredito}/vouchers/listarcreditosbancarios`
        ),
    },
  },
};
export default api;

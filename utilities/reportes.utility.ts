// Calcular totales por moneda en Creditos Vigentes

import { TipoMoneda } from "@Models/TipoMoneda";
import { CreditosVigentesIFRSReporteProps } from "@Pages/creditos/bandeja/models/reportes/CreditosVigentesIFRSReporte.model";
import { CreditosVigentesReporteProps } from "@Pages/creditos/bandeja/models/reportes/CreditosVigentesReporte.model";

//Seccion donde la data que se obtiene se calcula los totales ya sea el monto original o pesos

// Total por moneda, total por moneda en pesos y total general en pesos creditos vigentes
export const calcularTotalesCV = (
  reporteData: CreditosVigentesReporteProps
) => {
  let reporteDataCopy = { ...reporteData };
  const totalGeneralPesos = {
    totalCreditos: 0,
    saldo: 0,
    saldo1: 0,
    saldo4: 0,
    saldo13: 0,
    saldo25: 0,
    saldo37: 0,
    interesesDevengados: 0,
    totalMO: 0,
  };
  reporteDataCopy.data.forEach((moneda) => {
    const total = {
      totalCreditos: 0,
      saldo: 0,
      saldo1: 0,
      saldo4: 0,
      saldo13: 0,
      saldo25: 0,
      saldo37: 0,
      interesesDevengados: 0,
      totalMO: 0,
      totalPesos: 0,
      tasa: 0,
    };
    const esPesos = moneda.idmoneda === TipoMoneda.PESOS;
    let tipoCambio = 1;
    switch (moneda.idmoneda) {
      case TipoMoneda.DOLAR:
        tipoCambio = reporteData.valorDolar;
        break;
      case TipoMoneda.EURO:
        tipoCambio = reporteData.valorEuro;
        break;
      case TipoMoneda.UF:
        tipoCambio = reporteData.valorUF;
        break;
      case TipoMoneda.PESOS:
      default:
        tipoCambio = 1;
        break;
    }

    moneda.bancos.forEach((banco) => {
      if (esPesos) {
        banco.totalCreditos = Math.round(banco.totalCreditos);
        banco.saldo = Math.round(banco.saldo);
        banco.saldo1 = Math.round(banco.saldo1);
        banco.saldo4 = Math.round(banco.saldo4);
        banco.saldo13 = Math.round(banco.saldo13);
        banco.saldo25 = Math.round(banco.saldo25);
        banco.saldo37 = Math.round(banco.saldo37);
        banco.interesesDevengados = Math.round(banco.interesesDevengados);
        banco.totalMO = Math.round(banco.totalMO);
        banco.totalPesos = Math.round(banco.totalPesos);
      }
      total.totalCreditos += banco.totalCreditos;
      total.saldo += banco.saldo;
      total.saldo1 += banco.saldo1;
      total.saldo4 += banco.saldo4;
      total.saldo13 += banco.saldo13;
      total.saldo25 += banco.saldo25;
      total.saldo37 += banco.saldo37;
      total.interesesDevengados += banco.interesesDevengados;
      total.totalMO += banco.totalMO;
      total.totalPesos += banco.totalPesos;
    });

    total.tasa = calcularPorcentajeTasaPonderada(
      moneda.bancos.map((banco) => ({
        saldoInsoluto: banco.totalMO,
        tasa: banco.tasa,
      }))
    );

    moneda.total = total;
    moneda.totalPesos = {
      saldo: total.saldo * tipoCambio,
      totalCreditos: total.totalCreditos * tipoCambio,
      interesesDevengados: total.interesesDevengados * tipoCambio,
      saldo1: total.saldo1 * tipoCambio,
      saldo4: total.saldo4 * tipoCambio,
      saldo13: total.saldo13 * tipoCambio,
      saldo25: total.saldo25 * tipoCambio,
      saldo37: total.saldo37 * tipoCambio,
    };
    totalGeneralPesos.totalCreditos += moneda.totalPesos.totalCreditos;
    totalGeneralPesos.interesesDevengados +=
      moneda.totalPesos.interesesDevengados;
    totalGeneralPesos.saldo += moneda.totalPesos.saldo;
    totalGeneralPesos.saldo1 += moneda.totalPesos.saldo1;
    totalGeneralPesos.saldo4 += moneda.totalPesos.saldo4;
    totalGeneralPesos.saldo13 += moneda.totalPesos.saldo13;
    totalGeneralPesos.saldo25 += moneda.totalPesos.saldo25;
    totalGeneralPesos.saldo37 += moneda.totalPesos.saldo37;
  });
  reporteDataCopy.totalPesos = totalGeneralPesos;
  return reporteDataCopy;
};

// Total por moneda, total por moneda en pesos y total general en pesos Reporte IFRS
export const calcularTotalesCVIFRS = (
  reporteData: CreditosVigentesIFRSReporteProps
) => {
  let reporteDataCopy = { ...reporteData };
  const totalGeneralPesos = {
    totalCreditos: 0,
    saldoCorriente: 0,
    saldoNoCorriente: 0,
    interesesDevengados: 0,
    totalMO: 0,
  };
  reporteDataCopy.data.forEach((moneda) => {
    const total = {
      totalCreditos: 0,
      saldoCorriente: 0,
      saldoNoCorriente: 0,
      interesesDevengados: 0,
      totalMO: 0,
      totalPesos: 0,
      tasa: 0,
    };
    const esPesos = moneda.idmoneda === TipoMoneda.PESOS;
    let tipoCambio = 1;
    switch (moneda.idmoneda) {
      case TipoMoneda.DOLAR:
        tipoCambio = reporteData.valorDolar;
        break;
      case TipoMoneda.EURO:
        tipoCambio = reporteData.valorEuro;
        break;
      case TipoMoneda.UF:
        tipoCambio = reporteData.valorUF;
        break;
      case TipoMoneda.PESOS:
      default:
        tipoCambio = 1;
        break;
    }

    moneda.bancos.forEach((banco) => {
      if (esPesos) {
        banco.totalCreditos = Math.round(banco.totalCreditos);
        banco.saldoCorriente = Math.round(banco.saldoCorriente);
        banco.saldoNoCorriente = Math.round(banco.saldoNoCorriente);
        banco.interesesDevengados = Math.round(banco.interesesDevengados);
        banco.totalMO = Math.round(banco.totalMO);
        banco.totalPesos = Math.round(banco.totalPesos);
      }
      total.totalCreditos += banco.totalCreditos;
      total.saldoCorriente += banco.saldoCorriente;
      total.saldoNoCorriente += banco.saldoNoCorriente;
      total.interesesDevengados += banco.interesesDevengados;
      total.totalMO += banco.totalMO;
      total.totalPesos += banco.totalPesos;
    });

    total.tasa = calcularPorcentajeTasaPonderada(
      moneda.bancos.map((banco) => ({
        saldoInsoluto: banco.totalMO,
        tasa: banco.tasa,
      }))
    );
    moneda.total = total;
    moneda.totalPesos = {
      totalCreditos: total.totalCreditos * tipoCambio,
      interesesDevengados: total.interesesDevengados * tipoCambio,
      saldoCorriente: total.saldoCorriente * tipoCambio,
      saldoNoCorriente: total.saldoNoCorriente * tipoCambio,
      totalMO: total.totalMO * tipoCambio,
    };
    totalGeneralPesos.totalCreditos += moneda.totalPesos.totalCreditos;
    totalGeneralPesos.interesesDevengados +=
      moneda.totalPesos.interesesDevengados;
    totalGeneralPesos.saldoCorriente += moneda.totalPesos.saldoCorriente;
    totalGeneralPesos.saldoNoCorriente += moneda.totalPesos.saldoNoCorriente;
    totalGeneralPesos.totalMO += moneda.totalPesos.totalMO;
  });
  reporteDataCopy.totalPesos = totalGeneralPesos;
  return reporteDataCopy;
};

export const calcularPorcentajeTasaPonderada = (
  items: { tasa: number; saldoInsoluto: number }[]
) => {
  const montoTotal = items.reduce((acc, item) => acc + item.saldoInsoluto, 0);
  const tasaPonderada = items.reduce((acc, item) => {
    const pesoRelativo = item.saldoInsoluto / montoTotal;
    const tasaRelativa = (pesoRelativo * item.tasa) / 100;
    return acc + tasaRelativa;
  }, 0);
  return Math.round(tasaPonderada * 100 * 100) / 100;
};

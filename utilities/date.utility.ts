import dayjs from "dayjs";

const twoDigits = (date:any) => {
  return date < 10 ? `0${date}` : date;
};

export const dateUtility = {
  formatDate: (date:any, actual = 0) => {
    let year =
      date.getMonth() + actual < 0
        ? date.getFullYear() - 1
        : date.getFullYear();
    date.setMonth(date.getMonth() + actual);
    let day = date.getDate();
    const format = `${twoDigits(day)}/${twoDigits(
      date.getMonth() + 1
    )}/${year}`;
    return format;
  },
  formatDateYMD: (date:any, actual = 0) => {
    let year =
      date.getMonth() + actual < 0
        ? date.getFullYear() - 1
        : date.getFullYear();
    date.setMonth(date.getMonth() + actual);
    let day = date.getDate();
    const format = `${year}-${twoDigits(date.getMonth() + 1)}-${twoDigits(
      day
    )}`;
    return format;
  },
  dateStringToApiFormat: (date: string) => {
    //For dates in format yyyy-mm-ddTmm:hh:ss
    return date.replace("T", " ").split(".")[0];
  },
  dateStringToYMD: (date: string) => {
    //For dates in format yyyy-mm-ddTmm:hh:ss
    return date.split(" ")[0].replace(/-/g, "/");
  },
  dateStringToDMY: (date: string) => {
    //From yyyy-mm-ddTmm:hh:ss to dd/mm/yyyy
    if (!date) return "--";
    if (date.length < 5) return "--";
    var fechaCompleta = date.split(" ")[0];
    var partesFecha = fechaCompleta.split("-");
    var dia = partesFecha[2];
    var mes = partesFecha[1];
    var anio = partesFecha[0];
    return dia + "/" + mes + "/" + anio;
  },
  dateToDMY: (date:any) => {
    const newDate = dayjs(date);
    if (newDate.isValid()) {
      return newDate.format("DD/MM/YYYY");
    } else {
      return "--";
    }
  },
  monthsBetween: (date1:any, date2:any) => {
    if (!date1 || !date2) return 0;
    let startDate = new Date(date1);
    let endDate = new Date(date2);
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  },
  daysBetween: (date1:any, date2:any) => {
    const dateFrom = dayjs(date1);
    const dateTo = dayjs(date2);
    return dateTo.diff(dateFrom, "day");
  },
};

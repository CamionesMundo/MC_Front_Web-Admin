export const toBase64 = (file:any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const fromBase64 = (base64: string, name: string) => {
  let file = "data:application/octet-stream;base64," + base64;
  let downloadLink = document.createElement("a");
  downloadLink.href = file;
  downloadLink.download = name;
  downloadLink.click();
};

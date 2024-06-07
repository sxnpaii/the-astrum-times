import mammoth from "mammoth";

const docxTOHtml = async (file) => {
  const reader = new FileReader();

  const readonLoad = async () => {
    const rawHtml = await mammoth
      .convertToHtml({
        arrayBuffer: await file,
      })
      .then((res) => {
        const html = res.value;
        return html;
      });
    return rawHtml;
  };

  reader.onload = readonLoad;
  reader.readAsArrayBuffer(file);
  return readonLoad();
};

const extractBase64Images = (htmlString) => {
  const base64Regex = /data:image\/(png|jpeg|jpg|gif);base64,([^"]+)/g;
  let match;
  const base64Images = [];

  while ((match = base64Regex.exec(htmlString)) !== null) {
    base64Images.push(match[0]);
  }

  return base64Images;
};

export { docxTOHtml, extractBase64Images };

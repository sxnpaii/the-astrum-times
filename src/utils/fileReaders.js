import mammoth from "mammoth";
const docxTOHtml = async (file) => {
  try {
    const formdata = new FormData();
    formdata.append("docx", await file);
    const rawHTML = await mammoth.convertToHtml({
      arrayBuffer: await file.arrayBuffer(),
    });
    const html = rawHTML.value;
    return html;
  } catch (err) {
    console.error("Error converting DOCX to HTML:", err);
  }
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

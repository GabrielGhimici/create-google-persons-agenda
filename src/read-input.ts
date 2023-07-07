import { createReadStream } from 'fs';
import { Interface, createInterface } from 'readline';
import { getDocument } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

function createReadInterface(path: string) {
  const basePath = `input`;
  const internalPath = path.startsWith('/') ? path : `/${path}`;

  return createInterface({
    input: createReadStream(`${basePath}${internalPath}`),
  });
}

function linesToList(readInterface: Interface): Promise<Array<string>> {
  return new Promise((resolve) => {
    const lineList: Array<string> = [];
    readInterface.on('line', (value) => {
      lineList.push(value);
    });
    readInterface.on('close', () => {
      resolve(lineList);
    });
  });
}

async function readPDF(path: string) {
  const basePath = `input`;
  const internalPath = path.startsWith('/') ? path : `/${path}`;
  const document = await getDocument(`${basePath}${internalPath}`).promise;
  const numPages = document.numPages;
  let list: Array<Array<string>> = [];

  for (var i = 1; i <= numPages; i++) {
    let pageList = await document
      .getPage(i)
      .then((pageData) => {
        return pageData.getTextContent().then((textContent) => {
          const curatedItems = textContent.items.filter((item) => {
            const {str} = item as TextItem;
            return str !== '' && str !== ' '
          })
          console.log(curatedItems)
          return [];
        });
      })
      .catch((err) => {
        return [];
      });

    list = [...list, ...pageList];
  }
  document.destroy();
  console.log(list);
  return list;
}

export { createReadInterface, linesToList, readPDF };

import { writeFile } from 'fs/promises';
import { HEADER } from './consts';
import { OutputPerson } from './output-person';

async function writeOutput(output: Array<OutputPerson>) {
  try {
    let content = `${HEADER}`;
    output.forEach((person) => {
      content = `${content}\n${person.serializeString()}`;
    });
    content = `${content}\n`;
    const fileName = `contacts_${Date.now()}.csv`;
    console.log(`Writing ${output.length} row${output.length === 1 ? '' : 's'} in file ${fileName}...`);
    await writeFile(`output/${fileName}`, content, { flag: 'w+' });
    console.log(`File ${fileName} available in output folder...`);
  } catch (err) {
    console.log(err);
  }
}

export { writeOutput };

import { OutputPerson } from './src/output-person';
import { InputPerson } from './src/input-person';
import { createReadInterface, linesToList, readPDF } from './src/read-input';
import { writeOutput } from './src/write-output';
import { GROUP_SIZE } from './src/consts';

async function main() {
  //const readInterface = createReadInterface('test.csv');
  //console.log('Reading from input/test.csv...');
  //const lines = await linesToList(readInterface);
  console.log('Reading from input/list.pdf...');
  const lines = await readPDF('list.pdf');
  console.log(`${lines.length} row${lines.length === 1 ? '' : 's'} extracted...`);
  let groupIndex = 1;
  const result = lines.map((data, index) => {
    if (index === groupIndex * GROUP_SIZE) {
      groupIndex++;
    }
    return new OutputPerson().applyInputPerson(new InputPerson(data, groupIndex));
  });
  console.log(`${result.length} row${result.length === 1 ? '' : 's'} processed...`);
  await writeOutput(result);
}

main();

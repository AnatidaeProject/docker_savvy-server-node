const { readBuffer, writeBuffer } = require('pdf-fill-form');
const fs = require('fs');

describe('Get Fields from PDF', () => {
  const testFilename = 'unlocked.pdf';
  const testWriteFilename = 'filled.pdf';
  const testValue = 'COUNTY_SET_VALUE_FROM_TEST';

  it('Returns fields', async () => {
    const pdfSource1 = fs.readFileSync(`${__dirname}/${testFilename}`);
    const result = await readBuffer(pdfSource1);
    console.log(result[1]);
    expect(result[1].page).toEqual(0);
    expect(result[1].id).toEqual(65537);
    expect(result[1].type).toEqual('text');
    expect(result[1].name).toEqual('PI_County');
    expect(result[1].value).toEqual('');
  });

  it('Can fill out a form', async () => {
    const pdfSource1 = fs.readFileSync(`${__dirname}/${testFilename}`);
    const filledPdf = await writeBuffer(
      pdfSource1,
      { PI_County: 'COUNTY_SET_VALUE_FROM_TEST' },
      { save: 'pdf', antialias: true }
    );

    expect(filledPdf).toBeDefined();

    fs.writeFileSync(`${__dirname}/${testWriteFilename}`, filledPdf);

    const pdfSource2 = fs.readFileSync(`${__dirname}/${testWriteFilename}`);
    expect(pdfSource2).toBeDefined();
    // const result = await readBuffer(pdfSource2);
    // console.log(result[1]);
    // expect(result[1].page).toEqual(0);
    // expect(result[1].id).toEqual(65537);
    // expect(result[1].type).toEqual('text');
    // expect(result[1].name).toEqual('PI_County');
    // expect(result[1].value).toEqual(testValue);
  });
});

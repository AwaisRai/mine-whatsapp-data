const extractQuestion = (txt) => {
    let sliceStart = txt.indexOf('*سـوال*');
    if (sliceStart < 0) {
        console.log({ sliceStart });
        txt = txt.split('*سوال*').join('*سـوال*');
        txt = txt.split('*سـوال').join('*سـوال*');
        txt = txt.split('سـوال*').join('*سـوال*');
        txt = txt.split('سـوال:( للبنات گروپ)').join('*سـوال*');

        sliceStart = txt.indexOf('*سـوال*');
    }
    if(!sliceStart) sliceStart = 0;
    const sliceEnd = txt.indexOf('▬▬▬▬▬🌹🌹▬▬▬▬▬');
    return txt.slice(sliceStart, sliceEnd);
}

module.exports = { extractQuestion }
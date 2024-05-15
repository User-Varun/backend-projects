const fs = require('fs');
const superAgent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file 😢');

      resolve(data);
    });
  });
};

writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write the file 😢');

      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    const imgs = all.map((img) => img.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: ready 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog pics ');
    const data = await getDogPic();
    console.log(data);
    console.log('3: Done getting the dog pics ');
  } catch (err) {
    console.log(err);
  }
})();

/*
console.log('1: Will get dog pics ');

getDogPic()
  .then((data) => {
    console.log(data);
    console.log('3: Done getting the dog pics ');
  })
  .catch((err) => {
    console.log('Error 💥');
  });

*/

//////////////////////////////////////////////////
// readFilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(data);
// });

// const data = fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superAgent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       console.log(res.body.message);

//       if (err) return console.log(err.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         5;
//         console.log('Random dog image saved to the file');
//       });
//     });
// });

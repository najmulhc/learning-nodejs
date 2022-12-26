const fs = require('fs');
const superAgent = require('superagent');

const readFileProMax = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8',(error, data)=> {
            if(error){
                reject({message:'there was an error reading the file'})
            } else if (data){
                resolve(data);
            }
        });
    });
};

const writeFIleProMax = (data, file) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (error) => {
            if(error){reject({message: "there was an error while writing on the file."})};
            resolve("the file has been written!");
        });
    });
};
 
// <-- using async await function -->
  
const doReadAndWrite = async () => { // async functions always return a promise
    try {
      const dogBreed =  await readFileProMax('./dog.txt');
      const result =  await superAgent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
      const result1=  await superAgent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
      const result2 =  await superAgent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
      const results = [result, result1, result2];
      const finalResults = [];
       results.map(res => {
        finalResults.push(res.body.message)
      });
      console.log(finalResults)
      await writeFIleProMax(finalResults, './resultAsyncFunc.txt');
    } catch (error) {
        console.log(error.message);
    }
};
doReadAndWrite();


// <-- using then method of consuming promises -->
readFileProMax('./dog.txt').then( res => {  
    return superAgent.get(`https://dog.ceo/api/breed/${res}/images/random`); 
}).then(data => {
   return writeFIleProMax(data.body.message, './resultThen.txt');
}).then(final => {
    console.log(final);
}).catch(error => { 
    console.log(error.message);
});

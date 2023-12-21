import {iso31661} from 'iso-3166';

const countryCodes = {};
iso31661.forEach((el) => {
  countryCodes[el.name] = el.alpha2;
});

console.log(console.log(countryCodes));

export {countryCodes};

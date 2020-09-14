import Service from '@ember/service';
import countryList from '../country';

export default Service.extend({
  init () {
    this._super(...arguments);
  },

  getCountryList () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(countryList.filter((item) => item.indexOf("A") !== -1));
        },2000)
    });
  }
});

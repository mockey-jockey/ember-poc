/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    api: service(),
    init(){
        this._super(...arguments);

        this.set('results',[]);
        this.set('isLoading', false); // ===> 1
    },

    actions: {
        updateResults() {
            if (this.isLoading) { return; } // ===> 2
            // eslint-disable-next-line no-console
            console.log("Clicked...........") 
            this.set('isLoading', true); // ===> 3
            this.api.getCountryList().then((data) => {
               if(!this.isDestroyed){ // ===> 4
                    this.set('results',data);
                    this.set('isLoading', false);
               }
            });
        }
    }
});
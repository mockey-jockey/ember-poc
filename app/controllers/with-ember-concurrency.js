import { set } from '@ember/object';
import Controller from '@ember/controller';
export default Controller.extend({
    init(){
        this._super(...arguments);
        this.showSearch = false;
    },
    actions: {
        toggleSearch(){
            set(this,'showSearch', !this.showSearch);
        }
    }
})
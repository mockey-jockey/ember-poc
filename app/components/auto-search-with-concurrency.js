/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import {task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
export default Component.extend({
    api: service(),
    init(){
        this._super(...arguments);

        this.set('results',[]);
    },
    queryResults: task(function * (){
        // eslint-disable-next-line no-console
        console.log("task clicked")
        // eslint-disable-next-line ember/new-module-imports
        let results =  yield this.api.getCountryList()

        this.set('results', results);
    }).drop()
});











































// ajaxTaskStarted: on('ajaxTask:started', function(taskInstance) {
//     const [id] = taskInstance.args;
//     this.log(COLORS[id], `Task ${id}: making AJAX request`);
// }),

// ajaxTaskSucceeded: on('ajaxTask:succeeded', function(taskInstance) {
//     const [id] = taskInstance.args;
//     this.log(COLORS[id], `Task ${id}: AJAX done`);
// }),

// ajaxTaskErrored: on('ajaxTask:errored', function(taskInstance, error) {
//     const [id] = taskInstance.args;
//     this.log(COLORS[id], `Task ${id}: AJAX failed because of '${error.message}'`);
// })
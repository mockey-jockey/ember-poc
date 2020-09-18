// import Component from '@glimmer/component';
// import { action } from '@ember/object';
// export default class AudioFragmentComponent extends Component {
//     recordAudio = () =>
//         new Promise(async resolve => {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             const mediaRecorder = new MediaRecorder(stream);
//             const audioChunks = [];

//             mediaRecorder.addEventListener("dataavailable", event => {
//             audioChunks.push(event.data);
//             });

//             const start = () => mediaRecorder.start();

//             const stop = () =>
//             new Promise(resolve => {
//                 mediaRecorder.addEventListener("stop", () => {
//                 const audioBlob = new Blob(audioChunks);
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = new Audio(audioUrl);
//                 const play = () => audio.play();
//                 resolve({ audioBlob, audioUrl, play });
//                 });

//                 mediaRecorder.stop();
//             });

//             resolve({ start, stop });
//         });

//     sleep = time => new Promise(resolve => setTimeout(resolve, time));

//     @action
//     handleAction = async () => {
//         const recorder = await this.recordAudio();
//         recorder.start();
//         await this.sleep(3000);
//         const audio = await recorder.stop();
//         audio.play();
//     };
// }

/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
export default Component.extend({
    init(){
        this._super(...arguments);
    },
    mediaRecorder: null,
    recordAudio () {
        return new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false});
            this.set('mediaRecorder', new MediaRecorder(stream));
            const audioChunks = [];

            this.get('mediaRecorder').addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
                console.log(event.data)
            });

            const start = () => this.get('mediaRecorder').start();

            const stop = () =>
                new Promise(resolve => {
                    this.get('mediaRecorder').addEventListener("stop", () => {
                        console.log(audioChunks)
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    console.log(audioBlob,audioUrl)
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                this.get('mediaRecorder').stop();
            });

            resolve({ start, stop });
        });
    },
    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    },
    recorder: null,
    actions: {
        async startRecord() {
            const recorder = await this.recordAudio();
            this.set('recorder',recorder);
            recorder.start();
        },
        async stopRecord() {
            const audio = await this.get('recorder').stop();
            //this.get('mediaRecorder').stream.getTracks().forEach( track => track.stop() );
            audio.play();
            this.set('recorder',null);
        },
    }
});
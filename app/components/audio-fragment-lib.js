/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import MediaStreamRecorder from 'msr';
export default Component.extend({
    init(){
        this._super(...arguments);
    },
    mediaRecorder: null,
    isRecording: false,
    blobURL : '',
    audioChunks:[],
    showAudio: computed('isRecording','blobURL', {
        get () {
            return !(get(this,'isRecording')) && get(this,'blobURL');
        }
    }),
    recordAudio () {
        return new Promise(async (resolve,reject) => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false});
            if(stream){
                resolve();
            }else{
                reject();
            }
        });
    },
    onMediaSuccess (stream)  {
        window.streamReference = stream;
        this.set('mediaRecorder', new MediaStreamRecorder(stream));
        this.set('mediaRecorder.mimeType','audio/wav');
        this.set('mediaRecorder.audioChannels',1);
        const audioChunks = [];
        this.set('mediaRecorder.ondataavailable',(blob) => {
            // POST/PUT "Blob" using FormData/XHR2
            audioChunks.push(blob);
            this.set('audioChunks',audioChunks)
           // $("#result").append('<audio controls src="' + blobURL + '"></audio><br><a href="' + blobURL + '" target="_blank">' + blobURL + '</a>');
        });
    },
    onMediaError(e) {
        console.error('media error', e);
    },
    actions: {
        startRecord() {
            var mediaConstraints = {
                audio: true,
                video: false
            };
            navigator.getUserMedia(mediaConstraints, this.onMediaSuccess.bind(this), this.onMediaError);
            this.set('isRecording',true);
            setTimeout(() => {
                this.get('mediaRecorder').start();
            },1000)
        },
        stopRecord() {
            this.get('mediaRecorder').stop();
            console.log(this.get('audioChunks'))
            const audioBlob = new Blob(this.get('audioChunks'));
            const audioUrl = URL.createObjectURL(audioBlob);
            //console.log(audioBlob,audioUrl,audioChunks);
            this.set('blobURL',audioUrl)
            this.set('isRecording',false)
            if (window.streamReference) {
                window.streamReference.getAudioTracks().forEach(function(track) {
                    track.stop();
                });
                window.streamReference = null;
            }
        },
    }
});
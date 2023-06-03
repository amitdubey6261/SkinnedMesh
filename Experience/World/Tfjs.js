import Experience from "../Experience";

import * as tf  from '@tensorflow/tfjs'
import * as posedetection from '@tensorflow-models/pose-detection';

export default class Tfjs{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene ; 


        this.button = document.querySelector('.btn')
        this.video = document.querySelector('#video')

        this.params = {} ; 

        this.params.width = 620 ;
        this.params.height = 440 ;
        this.params.frameRate = 60 ;

        this.initialiser();
    }
    
    async setCam(){


        if( navigator.mediaDevices || navigator.mediaDevices.getUserMediea ){

            const stream = await navigator.mediaDevices.getUserMedia({
                audio : false , 
                video : {
                    width : this.params.width , 
                    height : this.params.height , 
                    frameRate : {
                        ideal : this.params.frameRate
                    }
                }
            })

            this.video.srcObject = stream ; 

            await new Promise((resolve)=>{
                this.video.onloadedmetadata= () =>{
                    resolve(this.video);
                }
            })

            this.video.play();

            this.params.viewWidth = this.video.videoWidth ; 
            this.params.viewHeight = this.video.videoHeight ; 

            this.video.width = this.params.viewWidth ; 
            this.video.height = this.params.viewHeight ; 
            
        }
    }

    async setBackend(){
        tf.setBackend('webgl')

        await tf.ready();

        console.log(tf.getBackend())
    }

    async setdetetctor(){
        this.poseDetetctor = await posedetection.createDetector( posedetection.SupportedModels.BlazePose , {
            runtime : 'tfjs' , 
            modelType : 'full' , 
            upperBodyOnly : 'true' , 
            enableSmoothing : true , 
            scoreThreshold : 0.9
        });

        console.log('detector-ready' ,  this.poseDetetctor)
    }

    async estimatePose(){
        this.Pose = await this.poseDetetctor.estimatePoses( this.video ) ; 
    }

    async init(){

        await this.setCam();

        await this.setBackend();

        await this.setdetetctor();

        this.estimatePose();

    }

    initialiser(){
        this.button.addEventListener('click' , (e)=>{
            this.init();
        })
    }

    async update(){
        if( this.Pose ) await this.estimatePose() ; 
    }
}
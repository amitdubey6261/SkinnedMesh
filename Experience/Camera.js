import * as THREE from 'three'
import Experience from "./Experience";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas= this.experience.canvas;

        this.createPerspectiveCam();
        this.createOrthoGraphicCam();

        this.update();
    }

    createPerspectiveCam(){
        this.perspectiveCam = new THREE.PerspectiveCamera( 35 , this.sizes.aspect , 0.1 , 1000 );
        this.perspectiveCam.position.set( 0 , 2 , 5);
        this.scene.add(this.perspectiveCam);
    }

    createOrthoGraphicCam(){
        this.frustum = 5 ; 
        this.orthoGraphicCam = new THREE.OrthographicCamera(  
            (-this.sizes.aspect * this.sizes.frustum )/2 , 
            ( this.sizes.aspect * this.sizes.frustum )/2 , 
            this.sizes.frustum/2 ,
            -this.sizes.frustum/2,
            -100,
            100
        );
        this.scene.add(this.orthoGraphicCam);
    }

    resize(){
        this.perspectiveCam.updateProjectionMatrix();
        this.perspectiveCam.aspect = this.sizes.aspect;

        this.orthoGraphicCam.left = (-this.sizes.aspect * this.sizes.frustum )/2 ;
        this.orthoGraphicCam.right= ( this.sizes.aspect * this.sizes.frustum )/2 ; 
        this.orthoGraphicCam.top=   this.sizes.frustum/2 ;
        this.orthoGraphicCam.bottom=-this.sizes.frustum/2 ;
        this.orthoGraphicCam.updateProjectionMatrix();
    }

    update(){
        // console.log("hello")
    }
}
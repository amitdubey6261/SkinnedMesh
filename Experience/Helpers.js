import * as THREE from "three";
import Experience from "./Experience";

export default class Helpers{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        
        this.setAxesHelper();

        this.setGridHelper();

    }

    setAxesHelper(){
        const axesHelper = new THREE.AxesHelper( 100 );
        this.scene.add( axesHelper );
    }

    setGridHelper(){
        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );
    }
}
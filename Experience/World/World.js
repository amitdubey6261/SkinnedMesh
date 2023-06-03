import * as THREE from 'three'
import * as CANNON from 'cannon-es';
import CannonDebugger from "cannon-es-debugger";

import Experience from '../Experience';
import Tfjs from './Tfjs';
import Skeleton from './Skeleton';

export default class World {
    constructor() {
        this.timeStep = 1 / 60;
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources ; 
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createCannonWorld();
        this.intCode();
    }


    createCannonWorld() {
        this.CannonWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -10, 0),
        })

        this.CannonDebugger = new CannonDebugger(this.scene, this.CannonWorld, {
            color: 0xff0000,
            scale: 1.0
        })
    }

    intCode(){
        this.skeleton = new Skeleton();
    }

    update() {
        this.CannonWorld.step(this.timeStep);
        this.CannonDebugger.update();
        this.skeleton.update()
    }

}
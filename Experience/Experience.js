import * as THREE from 'three';

import Resources from './Utils/Resources.js';
import Assets from './Utils/assets.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';

import Helpers from './Helpers.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Controllers from './Controllers.js';

import World from './World/World.js';

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) { return Experience.instance }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.helpers = new Helpers();
        this.controllers = new Controllers();
        this.resources = new Resources(Assets);

        this.resources.on("ready", () => {
            this.world = new World();
        })

        this.sizes.on("resize", () => {
            this.resize();
        });

        this.time.on("update", () => {
            this.update();
        });
    }
    
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.controllers.update();
        if (this.world) this.world.update();
    }
}
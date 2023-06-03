import * as THREE from "three"

import { EventEmitter } from "events";
import Experience from "../Experience.js"

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default class extends EventEmitter {
    constructor(Assets){
        super() ;
        this.experience = new Experience();
        this.renderer = this.experience.renderer ; 

        this.assets = Assets ; 

        this.items = {} ; 
        this.queue = this.assets.length ;
        this.loaded = 0 ;

        this.setLoders();
        this.startLoding();
    }

    setLoders(){
        this.loaders = {
            gltfLoader : new GLTFLoader() ,
            dracoLoader : new DRACOLoader() ,
        } ; 

        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader( this.loaders.dracoLoader) ;
    }

    startLoding(){
        for(const asset of this.assets ){
            if(asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.path , (file)=>{
                    this.singleAssetLoaded(asset , file);
                } ,
                (xhr)=>{
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                } 
                ,
                (e)=>{
                    console.log("An Error")
                })
            }
            else if(asset.type == "videoTexture"){
                this.video = {} ;
                this.videoTexture = {} ;

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path ;
                this.video[asset.name].playsInline = true ;
                this.video[asset.name].autoplay = true ; 
                this.video[asset.name].loop = true ; 
                this.video[asset.name].muted = true ; 
                this.video[asset.name].play() ;


                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );

                this.videoTexture[asset.name].flipY = true ;

                this.videoTexture[asset.name].minFilter = THREE.NearestFilter ; 
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter ; 
                this.videoTexture[asset.name].generateMipmaps = false ; 
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding ;
                
                this.singleAssetLoaded(asset , this.videoTexture[asset.name]);

            }
        }
    }

    singleAssetLoaded( asset , file ){
        // console.log(asset,file);
        this.items[ asset.name ] = file ;
        this.loaded += 1 ;
        if( this.loaded == this.queue ){
            this.emit("ready");
        }
    }
}
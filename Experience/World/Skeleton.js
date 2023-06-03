import Experience from "../Experience";
import * as THREE from "three";
import Tfjs from "./Tfjs";

export default class Skeleton {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.items = this.experience.resources.items;

        this.tfjs = new Tfjs();

        this.params = {};

        this.params.radius = 0.02;
        this.params.widthSegments = 32;
        this.params.heightSegments = 32;

        this.getSkeletonCoordinates();
    }

    getSkeletonCoordinates() {
        this.SkeletonGeometry = [];

        for (let i = 0; i < 33; i++) {
            this.SkeletonGeometry[i] = new THREE.Mesh(
                new THREE.SphereGeometry(
                    this.params.radius,
                    this.params.widthSegments,
                    this.params.heightSegments
                ),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            );
            this.scene.add(this.SkeletonGeometry[i]);
        }

        this.SkeletonGeometry[0].material.color = new THREE.Color( 0xff0000 )
        this.SkeletonGeometry[14].material.color = new THREE.Color( 0x0000ff )
        this.SkeletonGeometry[12].material.color = new THREE.Color( 0xff00ff )

        this.createLine();
    }

    createLine() {
        this.point1 = new THREE.Vector3(
            this.SkeletonGeometry[11].x,
            this.SkeletonGeometry[11].y,
            this.SkeletonGeometry[11].z
        );
        this.point2 = new THREE.Vector3(
            this.SkeletonGeometry[12].x,
            this.SkeletonGeometry[12].y,
            this.SkeletonGeometry[12].z
        );

        var geometry = new THREE.BufferGeometry().setFromPoints([
            this.point1,
            this.point2,
        ]);
        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.line = new THREE.Line(geometry, material);

        this.scene.add(this.line);
    }

    update() {
        this.tfjs.update();
        if (this.tfjs.Pose) {
            if (this.tfjs.Pose.length > 0) {
                console.log(this.tfjs.Pose);
                this.tfjs.Pose[0].keypoints3D.map((val, idx) => {
                    if (val.score > 0.7) {
                        this.SkeletonGeometry[idx].position.set(val.x, -val.y, val.z);
                        this.line.geometry.setFromPoints([this.point1, this.point2]);
                        this.line.needsUpdate = true;
                    } else this.SkeletonGeometry[idx].position.set(0, 0, 0);
                });
            }
        }
    }
}

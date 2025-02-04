import * as THREE from "three";

import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader, Font } from "three/addons/loaders/FontLoader.js";

type Bubble = THREE.Mesh & {
  originalPosition: THREE.Vector3;
};

export default class BubbleTextEffect {
  private container: HTMLElement;
  private text: string;
  private fontUrl: string | null;
  private duration: number;
  private bubbles: Bubble[];
  private defaultFontUrl: string;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;

  constructor(container: HTMLElement, text: string, fontUrl: string | null = null, duration: number = 5000) {
    this.container = container;
    this.text = text;
    this.fontUrl = fontUrl;
    this.duration = duration;
    this.bubbles = [];
    this.defaultFontUrl = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
    this.init();
  }

  private async init(): Promise<void> {
    // Setup scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.createLight();
    await this.loadFontAndCreateText();

    this.animate();
  }

  private createLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(50, 50, 50);
    this.scene.add(directionalLight);
  }

  private async loadFontAndCreateText(): Promise<void> {
    const loader = new FontLoader();
    const fontUrlToLoad = this.fontUrl || this.defaultFontUrl;

    loader.load(fontUrlToLoad, (font: Font) => {
      const geometry = new TextGeometry(this.text, {
        font: font,
        size: 10,
        height: 2,
        curveSegments: 12,
      });

      geometry.center();
      this.createBubblesFromGeometry(geometry);
    });
  }

  private createBubblesFromGeometry(geometry: THREE.BufferGeometry): void {
    const vertices = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < vertices.length; i += 3) {
      const bubbleGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const bubbleMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        transparent: true,
        opacity: 0.7,
      });
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial) as Bubble;

      bubble.position.set(vertices[i], vertices[i + 1], vertices[i + 2]);
      bubble.originalPosition = bubble.position.clone();
      this.scene.add(bubble);
      this.bubbles.push(bubble);
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.updateBubbles();
    this.renderer.render(this.scene, this.camera);
  }

  private updateBubbles(): void {
    const time = this.clock.getElapsedTime();

    if (time >= this.duration) {
      this.disperseBubbles();
      this.clock.start(); // Reset the clock
    } else {
      this.bubbles.forEach((bubble) => {
        bubble.position.y = bubble.originalPosition.y + Math.sin(time * 2 + bubble.id) * 0.5;
      });
    }
  }

  private disperseBubbles(): void {
    this.bubbles.forEach((bubble) => {
      bubble.position.x += (Math.random() - 0.5) * 50;
      bubble.position.y += (Math.random() - 0.5) * 50;
      bubble.position.z += (Math.random() - 0.5) * 50;
    });

    // Reset positions after dispersal effect
    setTimeout(() => {
      this.bubbles.forEach((bubble) => {
        bubble.position.copy(bubble.originalPosition);
      });
    }, 1000);
  }
}

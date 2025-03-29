import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import vert from './vert.glsl';
import frag from './frag.glsl';
import { gsap, Expo, Power4, } from "gsap";

export const GalleryBack = (props: {
    state: {
        current: number,
        before: number,
        next: number
    }
    images: string[]
}) => {
    const { scene, camera, size, gl } = useThree()

    const waveTexture = useTexture('/wave.png', texture => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
    })

    const textures = useTexture(props.images.map(image => image), loadedTextures => {
        for(const texture of loadedTextures ){
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapT = THREE.RepeatWrapping;
            texture.wrapS = THREE.RepeatWrapping;
            texture.minFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
        }
    })

    useFrame(({ gl }) => {
        gl.render(scene, camera)
    })

    const tw = useRef<gsap.core.Tween | null>(null)

    const shader = useMemo(() => ({
        uniforms: {
            dispPower: { value: 0.0 },
            intensity: { value: 0.5 },
            res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            size: { value: new THREE.Vector2(1, 1) },
            texture1: { value: textures[0] },
            texture2: { value: textures[1] },
            disp: { value: waveTexture }
        },
        transparent: true,
        vertexShader: vert,
        fragmentShader: frag
    }), [])

    useEffect(() => {
        // transition forward
        tw?.current?.revert();
        shader.uniforms.dispPower.value = 0.0;

        shader.uniforms.texture1.value = textures[props.state.before];
        shader.uniforms.texture2.value = textures[props.state.current];

        tw.current = gsap.to(
            shader.uniforms.dispPower,
            {
                duration: 2.5,
                value: 1,
                ease: Expo.easeInOut,
                onUpdate: () => {
                },
                onComplete: () => {

                }
            });
    }, [props.state])

    return (
        <mesh>
            <shaderMaterial args={[shader]} />
            <planeGeometry args={[size.width, size.height, 1]} />
        </mesh>
    )
}
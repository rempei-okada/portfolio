import { useControls } from 'leva';
import React, { useEffect, useRef, FC } from 'react';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { DistortionPass } from './ripple-effect/DistortionPass';
import { RipplePass } from './ripple-effect/RipplePass';

extend({ EffectComposer, RenderPass, ShaderPass })

export const Effect: FC = ({
    enabled,
    progress = 0.02,
    scale = 2.0
}: {
    enabled?: boolean
    progress?: number
    scale?: number
}) => {
    const composerRef = useRef<EffectComposer>(null)
    const { gl, scene, camera, size } = useThree()

    useEffect(() => {
        if (composerRef.current) {
            composerRef.current.setSize(size.width, size.height)
        }
    }, [size])

    useFrame(() => {
        if (composerRef.current) {
            composerRef.current.render()
        }
    }, 1)


    return (
        <effectComposer ref={composerRef} args={[gl]}>
            <renderPass
                attach="passes-0"
                scene={scene}
                camera={camera}
                args={[scene, camera]}
            />
            <DistortionPass
                enabled={enabled}
                progress={progress}
                scale={scale}
            />
            <RipplePass enabled={enabled} />
        </effectComposer>
    )
}
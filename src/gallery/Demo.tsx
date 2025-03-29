import React, { Suspense, FC } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effect } from './Effect';
import { ImagePlane } from './ImagePlane';

export const Demo: FC = () => {
    // const dist_datas = useControls('Distortion', {
    //     enabled: true,
    //     progress: { value: 0.02, min: 0, max: 1, step: 0.01 },
    //     scale: { value: 2.0, min: 0, max: 10, step: 0.1 }
    // })
    // const ripple_datas = useControls('Ripple', {
    //     enabled: true
    // })

	return (
		<Canvas
			camera={{
				position: [0, 0, 2],
				fov: 50,
				aspect: typeof window !== "undefined" ? window.innerWidth / window.innerHeight : 1,
				near: 0.1,
				far: 2000
			}}
			dpr={typeof window !== "undefined" ? window.devicePixelRatio : 1}>
			{/* canvas color */}
			<color attach="background" args={['#000']} />
			{/* camera controller */}
			<OrbitControls attach="orbitControls" />
			{/* helper */}
			<Stats />
			{/* object */}
			<Suspense fallback={null}>
				<ImagePlane />
			</Suspense>
			{/* effect */}
			<Effect />
		</Canvas>
	)
}

import React, { Suspense, useEffect, useMemo, useRef, FC } from 'react';
import { ShaderPass } from 'three-stdlib';
import { useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { RippleRenderer } from './ripple';

extend({ ShaderPass })

type RipplePassType = {
	enabled?: boolean
}

export const RipplePass: FC<RipplePassType> = props => {
	const { enabled = true } = props

	return (
		<Suspense fallback={null}>
			<Ripple enabled={enabled} />
		</Suspense>
	)
}

type RippleType = {
	enabled?: boolean
}

const Ripple: FC<RippleType> = props => {
	const { enabled = true } = props

	const shaderRef = useRef<ShaderPass>(null)

	const rippleTexture = useTexture('/brush.png')
	const effect = useMemo(() => new RippleRenderer(rippleTexture), [rippleTexture])

	const shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_displacement: { value: null }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		return () => effect.dispose()
	}, [effect])

	useFrame(({ gl }) => {
		effect.update(gl, shaderRef.current!.uniforms.u_displacement)
	},0)

	return <shaderPass ref={shaderRef} attach="passes-2" args={[shader]} enabled={enabled} />
}

// --------------------------------------------------------
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D u_displacement;
varying vec2 v_uv;

float PI = 3.141592653589;

void main() {
  vec2 uv = v_uv;

  vec4 disp = texture2D(u_displacement, uv);
  float theta = disp.r * 2.0 * PI;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.1;

  vec4 color = texture2D(tDiffuse, uv);

  gl_FragColor = color;
  // gl_FragColor = texture2D(u_displacement, v_uv);
}
`

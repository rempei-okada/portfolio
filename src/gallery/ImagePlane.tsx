import React, { FC } from 'react';
import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';

const slidesData = [
    {
        title: "title",
        background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg1.jpg',
        leftImage: "https://shiro-kyoto.com/syst/wp-content/themes/shiro/img/about_photo01.jpg",
        rightImage: "https://shiro-kyoto.com/syst/wp-content/themes/shiro/img/menu_photo02.jpg",
        texts: [
            "Black is",
            "timeless. Black is",
            "the colour of",
            "Eternity."
        ]
    },
    {
        title: "title",
        background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg2.jpg',
        leftImage: "https://expo2025-hyogo-fieldpavilion.jp/travelogue/asset/img/top/story_ttl_visual03.webp",
        rightImage: "https://expo2025-hyogo-fieldpavilion.jp/travelogue/asset/img/top/story_contents_img02.webp",
        texts: [
            "Black is",
            "timeless. Black is",
            "the colour of",
            "Eternity."
        ]
    },
    {
        title: "title",
        background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg3.jpg',
        leftImage: "https://expo2025-hyogo-fieldpavilion.jp/travelogue/asset/img/top/food_ttl_visual04.webp",
        rightImage: "https://expo2025-hyogo-fieldpavilion.jp/travelogue/asset/img/top/story_ttl_visual02.webp",
        texts: []
    }
];
export const ImagePlane: FC = () => {
	const textures = useTexture(slidesData.map(x =>x.background))

	const material = (texture: THREE.Texture) =>
		new THREE.ShaderMaterial({
			uniforms: {
				u_texture: { value: texture }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})

	return (
		<>
			{textures.map((texture, i) => (
				<Plane key={i} args={[1, 1 * (315 / 600)]} material={material(texture)} scale={0.98} position={[i - 1, 0, 0]} />
			))}
		</>
	)
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
uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  gl_FragColor = color;
}
`

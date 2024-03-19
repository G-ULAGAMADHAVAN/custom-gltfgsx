/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";

export default function Model(props) {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <group {...props}>
      <Select enabled={true}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomBun.geometry}
          material={materials.BunMaterial}
        />
      </Select>
      <Select enabled={true}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.meat.geometry}
          material={materials.SteakMaterial}
          position={[0, 2.82, 0]}
        />
      </Select>
      <Select enabled={true}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cheese.geometry}
          material={materials.CheeseMaterial}
          position={[0, 3.04, 0]}
        />
      </Select>
      <Select enabled={true}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topBun.geometry}
          material={materials.BunMaterial}
          position={[0, 1.77, 0]}
        />
      </Select>
    </group>
  );
}

useGLTF.preload("./hamburger.glb");

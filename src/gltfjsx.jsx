import { Html } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"
import { useState } from "react"
import { isClassLike } from "typescript"
import { proxy } from "valtio"

const state = proxy({
  current: null,
})

function Marker({ children, ...props }) {
  const ref = useRef()
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState()
  const [isInRange, setInRange] = useState()
  const isVisible = isInRange && !isOccluded
  // Test distance
  const vec = new THREE.Vector3()
  useFrame((state) => {
    const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
    if (range !== isInRange) setInRange(range)
  })
  return (
    <group ref={ref}>
      <Html
        // 3D-transform contents
        transform
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{ transition: "all 0.2s", opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
        {...props}>
        {children}
      </Html>
    </group>
  )
}

const GLTFJSX = ({ nodesData, nodes, materials }) => {
  if (nodesData) {
    console.log({ nodesData, nodes, materials })
  }

  // const snap = useProxy(state);
  const [clicked, set] = useState(null)
  const [hovered, over] = useState()

  console.log(hovered, clicked, state.current, "snap.current")

  const getPosition = (name) => {
    for (const nodeName in nodes) {
      //   console.log(nodeName, "nodeName");
      if (Object.hasOwnProperty.call(nodes, nodeName) && nodeName === name) {
        const mesh = nodes[nodeName]
        const position = mesh.position
        const x = position.x
        const y = position.y
        const z = position.z
        // console.log(`${nodeName} Position: (${x}, ${y}, ${z})`);
        const value = [x, y, z]
        // console.log(value, "valuevalue");
        return value
      }
    }
  }
  const getScale = (name) => {
    for (const nodeName in nodes) {
      if (Object.hasOwnProperty.call(nodes, nodeName) && nodeName === name) {
        const mesh = nodes[nodeName]
        const scale = mesh.scale
        const scaleX = scale.x
        const scaleY = scale.y
        const scaleZ = scale.z
        return [scaleX, scaleY, scaleZ]
        // console.log(`${nodeName} Scale: (${scaleX}, ${scaleY}, ${scaleZ})`);
      }
    }
  }

  const getRotation = (name) => {
    for (const nodeName in nodes) {
      if (Object.hasOwnProperty.call(nodes, nodeName) && nodeName === name) {
        const mesh = nodes[nodeName]
        const rotation = mesh.rotation
        const rotationX = rotation.x
        const rotationY = rotation.y
        const rotationZ = rotation.z

        // console.log(
        //   `${nodeName} Rotation: (${rotationX}, ${rotationY}, ${rotationZ})`
        // );
        return [rotationX, rotationY, rotationZ]
      }
    }
  }
  return (
    <group dispose={null}>
      {/* {nodesData.map((data, i)=>( */}
      {nodesData.map((data, index) => (
        <>
          {data.type === "Group" && data.name === "Scene" && (
            <group
              position={getPosition(data.name)}
              scale={getScale(data.name)}
              onPointerOver={(e) => {
                e.stopPropagation(), set(e.object.parent.name)
              }}
              onPointerOut={(e) => {
                e.intersections.length === 0 && set(null)
              }}
              onPointerMissed={(e) => {
                state.current = null
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                state.current = e.object.parent.name
              }}>
              {data.children.map((child, i) => (
                <>
                  {child.type === "Mesh" && (
                    <Select
                      name={child.name}
                      // id={i}
                      enabled={child.name == clicked}
                      // onPointerOver={(e) => {
                      //   over(e.object.name);
                      // }}
                    >
                      <mesh
                        castShadow
                        geometry={nodes[child.name].geometry}
                        material={materials[child.material.name]}
                        position={getPosition(child.name)}
                        scale={getScale(child.name)}
                        rotation={getRotation(child.name)}>
                        {/* <Html distanceFactor={10}>
                          <div class="content">
                            hello <br />
                            world
                          </div>
                        </Html> */}
                      </mesh>
                    </Select>
                  )}
                  {child.type === "Group" && (
                    <group position={getPosition(child.name)} scale={getScale(child.name)} rotation={getRotation(child.name)}>
                      {child.children.map((childMesh, i) => (
                        <>
                          {childMesh.type === "Mesh" && (
                            <Select
                              name={childMesh.name}
                              // id={i}
                              enabled={childMesh.name == clicked}
                              // onPointerOver={(e) => {
                              //   over(e.object.name);
                              // }}
                            >
                              <mesh castShadow geometry={nodes[childMesh.name].geometry} material={materials[childMesh.material.name]}>
                                {/* <Html distanceFactor={10}>
                                  <div class="content">
                                    hello <br />
                                    world
                                  </div>
                                </Html> */}
                                {/* <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
                                  <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
                                    <div style={{ position: "absolute", fontSize: 10, letterSpacing: -0.5, left: 17.5 }}>north</div>
                                    <FaMapMarkerAlt style={{ color: "indianred" }} />
                                  </Marker>
                                </group> */}
                              </mesh>
                            </Select>
                          )}
                        </>
                      ))}
                    </group>
                  )}
                </>
              ))}
            </group>
          )}
        </>
      ))}
    </group>
  )
}

export default GLTFJSX

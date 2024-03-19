import { useGLTF } from "@react-three/drei"
import { useEffect, useState } from "react"

import GLTFJSX from "./gltfjsx.jsx"

export default function Experience() {
  const [nodesData, setNodesData] = useState()
  const file = "https://dwj1lq18oerag.cloudfront.net/v3/models/202402202155046897.glb"
  const { nodes, materials, scene, animations } = useGLTF(file)
  useEffect(() => {
    setNodesData(Object.values(nodes))
  }, [])
  return (
    <>
      {nodesData && <GLTFJSX nodesData={nodesData} nodes={nodes} materials={materials} />}

      {/* <Suspense fallback={ <Placeholder position-y={ 0.5 } scale={ [ 2, 3, 2 ] } /> }> */}
      {/* <Hamburger scale={0.35} /> */}
      {/* </Suspense> */}

      {/* <Fox /> */}
    </>
  )
}

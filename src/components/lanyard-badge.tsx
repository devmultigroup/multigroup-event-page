"use client";

import { useEffect, useRef, useState } from "react";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { BallCollider, CuboidCollider, Physics, RigidBody, RigidBodyProps, RigidBodyTypeString, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";





declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}

// Extend Three.js with MeshLine for the lanyard band
extend({ MeshLineGeometry, MeshLineMaterial })

// Preload assets
const DEFAULT_CARD_MODEL = "/card.glb"
const DEFAULT_BAND_TEXTURE = "/kroul.png"

// Types
export interface LanyardCardProps {
  /**
   * Maximum speed for physics simulation
   */
  maxSpeed?: number
  /**
   * Minimum speed for physics simulation
   */
  minSpeed?: number
  /**
   * Custom class name for the container
   */
  className?: string
  /**
   * Width of the container
   */
  width?: string | number
  /**
   * Height of the container
   */
  height?: string | number
}
// Preload assets
useGLTF.preload(DEFAULT_CARD_MODEL)
useTexture.preload(DEFAULT_BAND_TEXTURE)

export function LanyardCard({
  maxSpeed = 50,
  minSpeed = 10,
  className = "",
  width = "100%",
  height = "100vh",
}: LanyardCardProps) {
  
  return (
    <div className={`${className}`} style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band
            cardModel={DEFAULT_CARD_MODEL}
            bandTexture={DEFAULT_BAND_TEXTURE}
            maxSpeed={maxSpeed}
            minSpeed={minSpeed}
          />
        </Physics>
        <Environment background blur={0.75}>
          <color attach="background" args={["black"]} />
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  )
}

interface BandProps {
  cardModel: string
  bandTexture: string
  maxSpeed: number
  minSpeed: number
}

function Band({ cardModel, bandTexture, maxSpeed, minSpeed }: BandProps) {
  {/* @ts-ignore */}
  const band = useRef<any>()
  {/* @ts-ignore */}
  const fixed = useRef<any>()
  {/* @ts-ignore */}
  const j1 = useRef<any>()
  {/* @ts-ignore */}
  const j2 = useRef<any>()
  {/* @ts-ignore */}
  const j3 = useRef<any>()
  {/* @ts-ignore */}
  const card = useRef<any>()

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps: Omit<RigidBodyProps, "ref"> = {
    type: "dynamic" as RigidBodyTypeString, // ✅ 确保类型正确
    canSleep: true,
    colliders: undefined,
    angularDamping: 2,
    linearDamping: 2,
  }

  const { nodes, materials } = useGLTF(cardModel) as unknown as {
    nodes: {
      card: THREE.Mesh
      clip: THREE.Mesh
      clamp: THREE.Mesh
    }
    materials: {
      base: THREE.MeshStandardMaterial
      metal: THREE.MeshStandardMaterial
    }
  }
  const texture = useTexture(bandTexture)
  const { width, height } = useThree((state) => state.size)

  // Initialize curve with default points to avoid NaN values
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )

  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab"
      return () => void (document.body.style.cursor = "auto")
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    // Skip frame updates until all refs are initialized
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current ||
      !band.current
    ) {
      return
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))

      // Wake up physics bodies
      if (card.current?.wakeUp) card.current.wakeUp()
      if (j1.current?.wakeUp) j1.current.wakeUp()
      if (j2.current?.wakeUp) j2.current.wakeUp()
      if (j3.current?.wakeUp) j3.current.wakeUp()
      if (fixed.current?.wakeUp) fixed.current.wakeUp()

      // Set card position
      if (card.current?.setNextKinematicTranslation) {
        card.current.setNextKinematicTranslation({
          x: vec.x - dragged.x,
          y: vec.y - dragged.y,
          z: vec.z - dragged.z,
        })
      }
    }

    // Update physics and curve
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      // Fix most of the jitter when over pulling the card
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped && ref.current.translation) {
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          )
        }

        if (ref.current.lerped && ref.current.translation) {
          const translation = ref.current.translation()
          if (
            translation &&
            !isNaN(translation.x) &&
            !isNaN(translation.y) &&
            !isNaN(translation.z)
          ) {
            const clampedDistance = Math.max(
              0.1,
              Math.min(1, ref.current.lerped.distanceTo(translation))
            )
            ref.current.lerped.lerp(
              translation,
              delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
            )
          }
        }
      })

      // Calculate catmull curve if all points are valid
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      // Tilt it back towards the screen
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })
  curve.curveType = "chordal"
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              (e.target as HTMLElement).releasePointerCapture(e.pointerId),
              drag(false)
            )}
            onPointerDown={(e) => {
              ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
              if (card.current && card.current.translation) {
                const translation = card.current.translation()
                drag(
                  new THREE.Vector3().copy(e.point).sub(vec.copy(translation))
                )
              }
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}
export function Demo() {
  return (
    <div className="w-full relative rounded-lg">
      <LanyardCard className="rounded-lg shadow-xl" height="80vh" />
    </div>
  )
}
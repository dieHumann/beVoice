import React from "react"
import { Suspense } from "react"
import { OrbitControls, Sphere, Stars, Torus } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import ReactHtmlParser from "react-html-parser"
import {Provider, useDispatch, useSelector} from "react-redux"
import {
    setEarth,
    setJupiter,
    setMars,
    setMercury,
    setMoon,
    setNeptune,
    setSaturn,
    setSun,
    setUranus,
    setVenus
} from "./../../../../store/reducer/planetReducer";
import "./Planets.css";
import saturn_ring from './../../../../images/2k_saturn_ring.png';
import store from "../../../../store/reducer/store";
import planetAudio from './../../../Assets/sounds/planet.mp3'
import ReactAudioPlayer from "react-audio-player";

const Planet = () => {
    const planet = useSelector((state) => state.planet.value);
    const texture = useLoader(TextureLoader, planet.img);
    const ringTexture = useLoader(TextureLoader, saturn_ring);
    return (
        <>
            <div className="contaner">
                <PlanetOverlay />
                <Canvas className="canvas">
                    <Stars
                        radius={50}
                        depth={0}
                        count={2000}
                        factor={3}
                        saturation={0}
                        fade
                        speed={1}
                    />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    <ambientLight intensity={planet.name === "Sun" ? 1 : 0.1} />
                    <spotLight position={[5, 5, 10]} intensity={1} />
                    <mesh>
                        <Sphere args={[2, 100, 100]} scale={1.4}>
                            <meshLambertMaterial map={texture} />
                        </Sphere>
                    </mesh>
                    {planet.name === "Saturn" && (
                        <mesh>
                            <Torus args={[4, 0.5, 2, 10000]} rotation={[1.8, 0, 0]}>
                                <meshLambertMaterial
                                    opacity={2}
                                    transparent
                                    map={ringTexture}
                                />
                            </Torus>
                        </mesh>
                    )}
                </Canvas>
            </div>
        </>
    );
};

const PlanetOverlay = () => {
    const planet = useSelector((state) => state.planet.value);
    return (
        <>
            <div className="overlay">
                <h1 className="planet">{planet.name}</h1>
            </div>
        </>
    )
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const planet = useSelector((state) => state.planet.value);
    const changeToExponentForm = (string) => {
        let exp = string.slice(-2);
        let base = string.slice(0, -3);
        return base + exp.sup();
    };
    return (
        <>
            <div className="sidebar">
                <div className="btn-contaner">
                    <button className="button" onClick={() => dispatch(setSun())}>
                        ????????????
                    </button>
                    <button className="button" onClick={() => dispatch(setMoon())}>
                        ????????
                    </button>
                    <button className="button" onClick={() => dispatch(setMercury())}>
                        ????????????????
                    </button>
                    <button className="button" onClick={() => dispatch(setVenus())}>
                        ????????????
                    </button>
                    <button className="button" onClick={() => dispatch(setEarth())}>
                        ??????????
                    </button>
                    <button className="button" onClick={() => dispatch(setMars())}>
                        ????????
                    </button>
                    <button className="button" onClick={() => dispatch(setJupiter())}>
                        ????????????
                    </button>
                    <button className="button" onClick={() => dispatch(setSaturn())}>
                        ????????????
                    </button>
                    <button className="button" onClick={() => dispatch(setUranus())}>
                        ????????
                    </button>
                    <button className="button" onClick={() => dispatch(setNeptune())}>
                        ????????????
                    </button>
                </div>
                <div className="info-contaner">
                    <h1 className="planet-name">{planet.name}</h1>
                    <hr />
                    <ul>
                        <li className="planet-info">
                            ???????????????????????????? ??????????????: {planet.diameter} Km
                        </li>
                        <li className="planet-info">
                            ??????????: {ReactHtmlParser(changeToExponentForm(planet.mass))} Kg
                        </li>
                        <li className="planet-info">
                            ?????????????????????????? ????????????????????: {planet.gravity} m/s<sup>2</sup>
                        </li>
                        <li className="planet-info">
                            ?????????????? ?????????????????????? ??????????????????????: {planet.temprature} ??C
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

const Loading = () => {
    return (
        <div className="loading">
            <h1 className="text"> Please wait performing interplanetary travel. </h1>
        </div>
    );
};

export default function Planets() {
    return (
        <div className="planets">
            <Provider store={store}>
                <Sidebar />
                <Suspense fallback={<Loading />}>
                    <Planet />
                </Suspense>
            </Provider>
            <ReactAudioPlayer
                src={planetAudio}
                autoPlay
                controls
            />
        </div>
    );
}
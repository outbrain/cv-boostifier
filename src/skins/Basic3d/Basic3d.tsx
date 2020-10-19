import React, {PropsWithChildren} from 'react';
import {IProfileProps} from '../../models';
import "./Basic3d.scss"

import * as THREE from "three";
import {WebGLRenderer} from "three";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import Ammo from "ammojs-typed";
import {attachRenderers, iframeCV} from "./3dCV.helper";

export function Basic3d(props: PropsWithChildren<IProfileProps>) {
    const developerName = props.profile.basics?.name || '';
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function rotateCamera(ballPosition: { position:  THREE.Vector3; }) {
        // console.log("x: " + ballPosition.position.x, "y: " + ballPosition.position.y, "z: " + ballPosition.position.z)
        let camPosistion = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        let targetPos;
        if (ballPosition.position.z > 50 ) {
            targetPos = new THREE.Vector3(ballPosition.position.x, ballPosition.position.y, ballPosition.position.z + 60);
        } else
        if (ballPosition.position.x > 25 && ballPosition.position.x < 55 && ballPosition.position.z < -10 ) {
            targetPos = new THREE.Vector3(ballPosition.position.x, ballPosition.position.y + 25, ballPosition.position.z + 45);
        } else
        if (ballPosition.position.x > 25) {
            targetPos = new THREE.Vector3(ballPosition.position.x, ballPosition.position.y + 45, ballPosition.position.z + 40);
        } else {
            targetPos = new THREE.Vector3(ballPosition.position.x, ballPosition.position.y + 120, ballPosition.position.z + 20);
        }

        camPosistion.lerp(targetPos, 0.033);
        camera.position.copy(camPosistion);
        camera.lookAt(ballPosition.position);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererWebgl.setSize(window.innerWidth, window.innerHeight);
        rendererCss.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseDown( event: { preventDefault: () => void; clientX: number; clientY: number; } ) {
        mouse.x = ( event.clientX / rendererWebgl.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / rendererWebgl.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        let intersects = raycaster.intersectObjects( linkObjects );
        if ( intersects.length > 0 ) {
            window.open(intersects[0].object.userData.URL);
        }
    }

    function addLights(): void {
        let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
        hemisphereLight.color.setHSL(0.6, 0.6, 0.6);
        hemisphereLight.groundColor.setHSL(0.1, 1, 0.4);
        hemisphereLight.position.set(0, 50, 0);
        sceneWebgl.add(hemisphereLight);
        let directLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directLight.color.setHSL(0.1, 1, 0.95);
        directLight.position.set(-10, 100, 70);
        directLight.position.multiplyScalar(100);
        directLight.castShadow = true;
        directLight.shadow.mapSize.width = 4096;
        directLight.shadow.mapSize.height = 4096;
        directLight.shadow.camera.left = -200;
        directLight.shadow.camera.right = 200;
        directLight.shadow.camera.top = 200;
        directLight.shadow.camera.bottom = -200;
        directLight.shadow.camera.far = 15000;
        sceneWebgl.add(directLight);
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener("resize", onWindowResize, false);
    const sceneWebgl = new THREE.Scene();
    const sceneCss = new THREE.Scene();
    const rendererWebgl = new WebGLRenderer({ alpha: true, antialias: true });
    rendererWebgl.shadowMap.enabled = true;
    const rendererCss = new CSS3DRenderer();
    const loader = new THREE.TextureLoader();
    sceneWebgl.background = loader.load( require("./images/scene-background.jpg") );
    const group = new THREE.Group();
    // @ts-ignore
    let iframe = iframeCV(  -28, 0, -1.8, props.profile);
    iframe.scale.set(0.09, 0.120, 1);
    group.add( iframe );
    sceneCss.add( group );
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 20, 70);
    rendererWebgl.setSize( window.innerWidth, window.innerHeight);
    rendererCss.setSize( window.innerWidth, window.innerHeight );
    attachRenderers(rendererWebgl, rendererCss);
    addLights();
    let rigidBodies: any[] = []
    let ballObject = new THREE.Mesh(new THREE.SphereBufferGeometry(3), new THREE.MeshPhongMaterial()),
        moveDirection = { left: 0, right: 0, forward: 0, back: 0 }
    const STATE = { DISABLE_DEACTIVATION : 4 }
    let linkObjects: THREE.Object3D[] = [];

    // @ts-ignore
    Ammo().then((Ammo) => {
        let physicsWorld: Ammo.btDiscreteDynamicsWorld;
        let tmpTrans = new Ammo.btTransform();
        let clock = new THREE.Clock();

        //function to create physics world
        function createPhysicsWorld() {
            let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
            let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
            let overlappingPairCache = new Ammo.btDbvtBroadphase();
            let constraintSolver = new Ammo.btSequentialImpulseConstraintSolver();
            physicsWorld = new Ammo.btDiscreteDynamicsWorld(
                dispatcher,
                overlappingPairCache,
                constraintSolver,
                collisionConfiguration
            );
            physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0));
        }

        function animate () {
            let deltaTime = clock.getDelta();
            moveBall();
            updatePhysics( deltaTime );
            if (ballObject.position.y < -30) {
                sceneWebgl.remove(ballObject)
                createBall()
            }
            rotateCamera(ballObject);
            rendererCss.render( sceneCss, camera );
            rendererWebgl.render( sceneWebgl, camera );
            requestAnimationFrame( animate );
        }

        function setupEventHandlers(){
            window.addEventListener( 'keydown', handleKeyDown, false);
            window.addEventListener( 'keyup', handleKeyUp, false);
        }

        function handleKeyDown(event: { keyCode: any; }){
            if (ballObject.position.y > 5) { return}
            let keyCode = event.keyCode;
            switch(keyCode){

                case 87: //W: FORWARD
                    moveDirection.forward = 1
                    break;

                case 83: //S: BACK
                    moveDirection.back = 1
                    break;

                case 65: //A: LEFT
                    moveDirection.left = 1
                    break;

                case 68: //D: RIGHT
                    moveDirection.right = 1
                    break;
            }
        }

        function handleKeyUp(event: { keyCode: any; }){
            if (ballObject.position.y > 5) { return}
            let keyCode = event.keyCode;
            switch(keyCode){
                case 87: //FORWARD
                    moveDirection.forward = 0
                    break;

                case 83: //BACK
                    moveDirection.back = 0
                    break;

                case 65: //LEFT
                    moveDirection.left = 0
                    break;

                case 68: //RIGHT
                    moveDirection.right = 0
                    break;
            }
        }

        function createBlock(){
            let pos = { x: 0, y: -0.25, z: -0.5 };
            let scale = { x: 136, y: 0.5, z: 136.5 };
            let quat = { x: 0, y: 0, z: 0, w: 1 };
            let mass = 0; //mass of zero = infinite mass
            let grid = new THREE.GridHelper(136, 20, 0xffffff, 0xffffff);
            grid.position.y = 0.005;
            sceneWebgl.add(grid);
            let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0xa0afa4}));
            blockPlane.position.set(pos.x, pos.y, pos.z);
            blockPlane.scale.set(scale.x, scale.y, scale.z);
            blockPlane.castShadow = true;
            blockPlane.receiveShadow = true;
            blockPlane.material.opacity = 0.5;
            blockPlane.material.transparent = true;
            sceneWebgl.add(blockPlane);
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
            transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
            let motionState = new Ammo.btDefaultMotionState( transform );
            let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
            colShape.setMargin( 0.05 );
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            colShape.calculateLocalInertia( mass, localInertia );
            let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
            let body = new Ammo.btRigidBody( rbInfo );
            body.setFriction(10);
            body.setRollingFriction(10);
            body.setActivationState( STATE.DISABLE_DEACTIVATION );
            physicsWorld.addRigidBody( body );
        }

        function createMarble(texture:string, posX: number, posY: number, posZ: number) {
            let radius = 2;
            let quat = {x: 0, y: 0, z: 0, w: 1};
            let mass = 0.6 ;
            let marble  = new THREE.Mesh(new THREE.SphereBufferGeometry(radius,30 ,30), new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(require(`./images/${texture}.jpg`))}));
            marble.position.set(posX, posY, posZ);
            marble.castShadow = true;
            marble.receiveShadow = true;
            sceneWebgl.add(marble);
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( posX, posY, posZ ) );
            transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
            let motionState = new Ammo.btDefaultMotionState( transform );
            let colShape = new Ammo.btSphereShape( radius );
            colShape.setMargin( 0.05 );
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            colShape.calculateLocalInertia( mass, localInertia );
            let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
            let body = new Ammo.btRigidBody( rbInfo );
            physicsWorld.addRigidBody( body );
            body.setRollingFriction(6);
            marble.userData.physicsBody = body;
            body.setActivationState( STATE.DISABLE_DEACTIVATION );
            rigidBodies.push(marble);
        }

        function createWallXAxis(xPosition: number, yPosition: number, zPosition: number, xScale: number, yScale: number, zScale: number) {
            const wallScale = { x: xScale, y: yScale, z: zScale };
            const wall = new THREE.Mesh(new THREE.BoxBufferGeometry(wallScale.x, wallScale.y, wallScale.z),
                                        new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.5, transparent: true,}));
            wall.position.x = xPosition;
            wall.position.y = yPosition;
            wall.position.z = zPosition;
            wall.receiveShadow = true;
            sceneWebgl.add(wall);
            addRigidPhysicsToItem(wall, wallScale);
        }

        function createWallZAxis(x: number, y: number, z: number) {
            const wallScale = { x: 135, y: 5, z: 0.125 };
            const wall = new THREE.Mesh(new THREE.BoxBufferGeometry(wallScale.x, wallScale.y, wallScale.z),
                                        new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.75, transparent: true}));
            wall.position.x = x;
            wall.position.y = y;
            wall.position.z = z;
            wall.receiveShadow = true;
            sceneWebgl.add(wall);
            addRigidPhysicsToItem(wall, wallScale);
        }

        function createBall(){
            let pos = {x: 40, y: 20, z: 5};
            let radius = 2;
            let quat = {x: 0, y: 0, z: 0, w: 1};
            let mass = 10;
            let ball = ballObject = new THREE.Mesh(new THREE.SphereBufferGeometry(radius,30 ,30), new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(require("./images/marble.jpg"))}));
            ball.position.set(pos.x, pos.y, pos.z);
            ball.castShadow = true;
            ball.receiveShadow = true;
            sceneWebgl.add(ball);
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
            transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
            let motionState = new Ammo.btDefaultMotionState( transform );
            let colShape = new Ammo.btSphereShape( radius );
            colShape.setMargin( 0.05 );
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            colShape.calculateLocalInertia( mass, localInertia );
            let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
            let body = new Ammo.btRigidBody( rbInfo );
            physicsWorld.addRigidBody( body );
            body.setRollingFriction(8);
            ball.userData.physicsBody = body;
            body.setActivationState( STATE.DISABLE_DEACTIVATION );
            rigidBodies.push(ball);
        }

        function createLink(link: string,image: string, backgroundColor: string, posX: number, posY: number, posZ: number) {
            let cubeGeometry = new THREE.BoxGeometry( 6, 6, 2,  );
            let scale = {x: 6, y: 6, z: 2};
            let cubeSide = [
                new THREE.MeshStandardMaterial({
                    opacity: 1,
                    color: new THREE.Color(backgroundColor),
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    flatShading: true,
                    color: new THREE.Color(backgroundColor),
                }),
                new THREE.MeshStandardMaterial({
                    flatShading: true,
                    color: new THREE.Color(backgroundColor),
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 1,
                    color: new THREE.Color(backgroundColor),
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    flatShading: true,
                    color: new THREE.Color('white'),
                    map: new THREE.TextureLoader().load(require("./images/" + image))
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 1,
                    color: new THREE.Color(backgroundColor),
                    flatShading: true
                })]

            let cubeMesh = new THREE.Mesh(cubeGeometry, cubeSide);
            cubeMesh.userData = { URL: link};
            cubeMesh.position.set(posX, posY, posZ);
            cubeMesh.renderOrder = 1;
            cubeMesh.castShadow = true;
            cubeMesh.receiveShadow = true;
            sceneWebgl.add(cubeMesh);
            // @ts-ignore
            linkObjects.push(cubeMesh);
            addRigidPhysicsToItem(cubeMesh, scale);
        }

        function createWasd() {
            let cubeGeometry = new THREE.BoxGeometry( 30, 30, 30,  );
            let cubeSide = [
                new THREE.MeshStandardMaterial({
                    opacity: 0,
                    color: new THREE.Color('transparent'),
                    transparent: true,
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 0,
                    color: new THREE.Color('transparent'),
                    transparent: true,
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 0,
                    color: new THREE.Color('transparent'),
                    transparent: true,
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 0,
                    color: new THREE.Color('transparent'),
                    transparent: true,
                    flatShading: true
                }),
                new THREE.MeshStandardMaterial({
                    transparent: true,
                    flatShading: true,
                    map: new THREE.TextureLoader().load(require("./images/wasd.png"))
                }),
                new THREE.MeshStandardMaterial({
                    opacity: 0,
                    color: new THREE.Color('transparent'),
                    transparent: true,
                    flatShading: true
                })]

            let cubeMesh = new THREE.Mesh(cubeGeometry, cubeSide);
            cubeMesh.position.set(40, -15.5, -8.5);
            cubeMesh.rotation.x = -Math.PI / 2;
            sceneWebgl.add(cubeMesh);
        }

        function moveBall(){
            let scalingFactor = 20;
            let moveX =  moveDirection.right - moveDirection.left;
            let moveZ =  moveDirection.back - moveDirection.forward;
            let moveY =  0;
            if( moveX === 0 && moveY === 0 && moveZ === 0) return;
            let resultantImpulse = new Ammo.btVector3( moveX, moveY, moveZ )
            resultantImpulse.op_mul(scalingFactor);
            let physicsBody = ballObject.userData.physicsBody;
            physicsBody.setLinearVelocity( resultantImpulse );
        }

        function createName(letter: string, xShift: number, zShift: number){
            let pos = {x: 22 + xShift, y: 0, z: -50 + zShift};
            let scale = {x: 3, y: 3, z: 3  };
            let quat = {x: 0, y: 0, z: 0, w: 1};
            let mass = 0.3 ;
            const loader = new THREE.FontLoader();
            loader.load('helvetiker_regular.typeface.json', function (helvetiker) {
                const geometry = new THREE.TextGeometry(letter, {
                    font: helvetiker,
                    size: 0.8,
                    height: 0.5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.1,
                    bevelSize: 0.11,
                    bevelOffset: 0,
                    bevelSegments: 1

                });

                const textMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color( 'skyblue' ), specular: 0x555555, shininess: 30});
                const mesh = new THREE.Mesh(geometry, textMaterial);
                mesh.position.set(pos.x, pos.y, pos.z);
                mesh.scale.set(scale.x, scale.y, scale.z);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                sceneWebgl.add(mesh);
                let transform = new Ammo.btTransform();
                transform.setIdentity();
                transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
                transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
                let motionState = new Ammo.btDefaultMotionState( transform );
                let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
                let localInertia = new Ammo.btVector3( 0, 0, 0 );
                colShape.calculateLocalInertia( mass, localInertia );
                let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
                let body = new Ammo.btRigidBody( rbInfo );
                body.setFriction(20);
                body.setRollingFriction(30);
                body.setActivationState( STATE.DISABLE_DEACTIVATION );
                physicsWorld.addRigidBody( body );
                mesh.userData.physicsBody = body;
                rigidBodies.push(mesh);
            });
        }

        function create3dName(name: string) {
            let xShift= 0;
            let zShift = 0;
            for (let i = 0; i < name.length; i++) {
                if (name[i] !== ' ') {
                    createName(name[i], xShift, zShift);
                    xShift += 3.5;
                } else {
                    xShift += -12;
                    zShift += 10;
                }
            }
        }

        function updatePhysics( deltaTime: number ){
            physicsWorld.stepSimulation( deltaTime, 10 );
            for ( let i = 0; i < rigidBodies.length; i++ ) {
                let objThree = rigidBodies[ i ];
                let objAmmo = objThree.userData.physicsBody;
                let ms = objAmmo.getMotionState();
                if ( ms ) {
                    ms.getWorldTransform( tmpTrans );
                    let p = tmpTrans.getOrigin();
                    let q = tmpTrans.getRotation();
                    objThree.position.set( p.x(), p.y(), p.z() );
                    objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                }
            }
        }

        function addRigidPhysicsToItem(item: any, itemScale: { x: any; y: any; z: any; }) {
            let pos = { x: item.position.x, y: item.position.y, z: item.position.z };
            let scale = { x: itemScale.x, y: itemScale.y, z: itemScale.z };
            let quat = { x: 0, y: 0, z: 0, w: 1 };
            let mass = 0;
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let localInertia = new Ammo.btVector3(0, 0, 0);
            let motionState = new Ammo.btDefaultMotionState(transform);
            let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
            colShape.setMargin(0.05);
            colShape.calculateLocalInertia(mass, localInertia);
            let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);
            body.setActivationState(STATE.DISABLE_DEACTIVATION);
            body.setCollisionFlags(2);
            physicsWorld.addRigidBody(body);
        }

        function setupLinks(): void {
            const baseXpose = 27;
            const xDelta = 11;
            const emailLink = props.profile.basics?.email || '';
            const twitterLink = props.profile.basics?.profiles?.find(profile => profile.network?.toLowerCase() === "twitter")?.url || '';
            const linkedinLink = props.profile.basics?.profiles?.find(profile => profile.network?.toLowerCase() === "linkedin")?.url || '';
            const githubLink = props.profile.basics?.profiles?.find(profile => profile.network?.toLowerCase() === "github")?.url || '';
            if (emailLink) {
               createLink(`mailto:${emailLink}`,'mail.png','#D44638', baseXpose, 3, 40);
            }
            if (twitterLink) {
                createLink(twitterLink,'twitter.png','#1DA1F2', baseXpose + xDelta , 3, 40);
            }
            if (linkedinLink) {
                createLink(linkedinLink,'linkedin.png','#2867B2', baseXpose + (2*xDelta) , 3, 40);
            }
            if (githubLink) {
                createLink(githubLink,'github.png','black', baseXpose + (3*xDelta) , 3, 40);
            }
        }

        function setupMarbles(): void {
            createMarble('marble1', 57,2,10);
            createMarble('marble2', 30,2,26);
        }

        createPhysicsWorld();
        createBlock();
        createBall();
        createWallXAxis(67.5, 2.5, -58 , 0.125, 5, 20 );
        createWallXAxis(67.5, 2.5, 17.5, 0.125, 5, 100 );
        createWallXAxis(-67.5, 2.5, 0,  0.125, 5, 135 );
        createWallXAxis(15.5 , 2.5, 0,  0.125, 5, 135 );
        createWallZAxis(0, 2.5, 67.5);
        createWallZAxis(0, 2.5, -67.5);
        createWasd();
        setupEventHandlers();
        create3dName(developerName)
        setupLinks();
        setupMarbles();
        animate();
    });



    return (
        <div/>
    );
}

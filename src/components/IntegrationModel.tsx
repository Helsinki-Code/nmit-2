import { brandImageUrl } from './BrandLogo';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { IntegrationDiagram } from './IntegrationDiagram';
import { integrationSystems as nodes } from '../data/integrationSystems';

export default function IntegrationModel({ playing, reduced, onToggle }: { playing:boolean; reduced:boolean; onToggle:()=>void }) {
  const host=useRef<HTMLDivElement>(null);
  const labelRefs=useRef<(HTMLButtonElement|null)[]>([]);
  const boardRefs=useRef<(HTMLElement|null)[]>([]);
  const selectedRef=useRef(5);
  const openRef=useRef<number|null>(null);
  const motionRef=useRef(playing);
  const drawRef=useRef<()=>void>(()=>{});
  const resetRef=useRef<()=>void>(()=>{});
  const [selected,setSelected]=useState(5);
  const [open,setOpen]=useState<number|null>(null);
  const [status,setStatus]=useState<'loading'|'ready'|'fallback'>('loading');
  function select(index:number) {setSelected(index);setOpen(index);}
  useEffect(()=>{motionRef.current=playing;drawRef.current();},[playing]);
  useEffect(()=>{selectedRef.current=selected;openRef.current=open;drawRef.current();},[selected,open]);
  useEffect(()=>{
    const container=host.current!;
    let renderer:THREE.WebGLRenderer;
    try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}
    catch {setStatus('fallback');return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));
    renderer.setClearColor(0,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden','true');
    const boardRenderer=new CSS3DRenderer();
    boardRenderer.domElement.className='model-board-renderer';
    container.appendChild(boardRenderer.domElement);
    const scene=new THREE.Scene();
    const boardScene=new THREE.Scene();
    const architecture=new THREE.Group();
    scene.add(architecture);
    const camera=new THREE.OrthographicCamera(-5,5,4,-4,.1,60);
    camera.position.set(7,9,11);
    const controls=new OrbitControls(camera,renderer.domElement);
    controls.target.set(0,.2,0);
    controls.enablePan=false;
    controls.enableZoom=false;
    controls.minPolarAngle=Math.PI/5;
    controls.maxPolarAngle=Math.PI/2.6;
    controls.minAzimuthAngle=-Math.PI/4;
    controls.maxAzimuthAngle=Math.PI/2.5;
    controls.update();controls.saveState();
    const ambient=new THREE.HemisphereLight(0xf4f3e7,0x62675b,2.4);
    const light=new THREE.DirectionalLight(0xfff0d5,3);
    light.position.set(-3,9,5);
    scene.add(ambient,light);
    const floorMaterial=new THREE.MeshStandardMaterial({roughness:.95});
    const floor=new THREE.Mesh(new THREE.BoxGeometry(8.5,.12,6.8),floorMaterial);
    floor.position.y=-.16;
    architecture.add(floor);
    const edgeMaterial=new THREE.LineBasicMaterial();
    const floorEdges=new THREE.LineSegments(new THREE.EdgesGeometry(floor.geometry),edgeMaterial);
    floorEdges.position.copy(floor.position);
    architecture.add(floorEdges);
    const moduleMaterials:THREE.MeshStandardMaterial[]=[];
    const accentMaterials=[new THREE.MeshStandardMaterial({roughness:.55}),new THREE.MeshStandardMaterial({roughness:.55})];
    const hubPlateMaterial=new THREE.MeshBasicMaterial({color:0xeef0e9});
    const hubLogoMaterial=new THREE.MeshBasicMaterial({transparent:true,depthWrite:false});
    let logoDisposed=false;
    const logoTexture=new THREE.TextureLoader().load(brandImageUrl,()=>{
      if(!logoDisposed) drawRef.current();
    });
    logoTexture.colorSpace=THREE.SRGBColorSpace;
    logoTexture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
    hubLogoMaterial.map=logoTexture;
    const pickable:THREE.Mesh[]=[];
    const models=nodes.map((node,index)=>{
      const group=new THREE.Group();
      group.position.set(node.x,0,node.z);
      const material=new THREE.MeshStandardMaterial({roughness:.65,metalness:.15});
      moduleMaterials.push(material);
      const hub=node.kind==='hub';
      for(let i=0;i<(hub?3:1);i++) {
        const h=hub?.26:node.height;
        const box=new THREE.Mesh(new THREE.BoxGeometry(hub?1.5:1.1,h,hub?1.5:.75),material);
        box.position.y=h/2+i*.36;
        box.userData.node=index;
        pickable.push(box);
        group.add(box);
        const outline=new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry),edgeMaterial);
        outline.position.copy(box.position);
        group.add(outline);
        const stripe=new THREE.Mesh(new THREE.BoxGeometry(hub?1.1:.75,.035,.025),accentMaterials[node.kind==='input'?0:1]);
        stripe.position.set(0,box.position.y,hub?.755:.38);
        group.add(stripe);
      }
      if(hub) {
        const plate=new THREE.Mesh(new THREE.BoxGeometry(1.24,.025,1.24),hubPlateMaterial);
        plate.position.y=1.01;
        plate.userData.node=index;
        pickable.push(plate);
        group.add(plate);
        const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.24,1.24),hubLogoMaterial);
        logo.rotation.x=-Math.PI/2;
        logo.position.y=1.024;
        logo.userData.node=index;
        pickable.push(logo);
        group.add(logo);
      }
      architecture.add(group);
      return group;
    });
    const paths=nodes.flatMap((node,index)=>{
      if(node.kind==='hub') return [];
      const input=node.kind==='input';
      const from=new THREE.Vector3(input?node.x+.6:.85,.02,input?node.z:0);
      const to=new THREE.Vector3(input?-.85:node.x-.6,.02,input?0:node.z);
      const curve=new THREE.CubicBezierCurve3(from,new THREE.Vector3(input?-1.6:1.6,.02,from.z),new THREE.Vector3(input?-1.6:1.6,.02,to.z),to);
      const material=accentMaterials[input?0:1];
      architecture.add(new THREE.Mesh(new THREE.TubeGeometry(curve,32,.018,6,false),material));
      const packet=new THREE.Mesh(new THREE.BoxGeometry(.095,.065,.095),material);
      architecture.add(packet);
      return [{curve,packet,index,offset:index*.13}];
    });
    const boards=nodes.map((_,i)=>{
      const board=new CSS3DObject(boardRefs.current[i]!);
      board.visible=false;
      boardScene.add(board);
      return board;
    });
    const connectorGeometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);
    const connectorMaterial=new THREE.LineDashedMaterial({color:0xa5650f,dashSize:.12,gapSize:.08});
    const connector=new THREE.Line(connectorGeometry,connectorMaterial);
    connector.visible=false;
    scene.add(connector);
    const raycaster=new THREE.Raycaster();
    const pointer=new THREE.Vector2();
    let startX=0,startY=0,dragging=false;
    function pointerDown(event:PointerEvent) {startX=event.clientX;startY=event.clientY;dragging=true;}
    function pointerUp(event:PointerEvent) {
      dragging=false;
      if(Math.hypot(event.clientX-startX,event.clientY-startY)>6) return;
      const bounds=renderer.domElement.getBoundingClientRect();
      pointer.set((event.clientX-bounds.left)/bounds.width*2-1,-(event.clientY-bounds.top)/bounds.height*2+1);
      raycaster.setFromCamera(pointer,camera);
      const hit=raycaster.intersectObjects(pickable)[0];
      if(hit) select(hit.object.userData.node);
    }
    renderer.domElement.addEventListener('pointerdown',pointerDown);
    renderer.domElement.addEventListener('pointerup',pointerUp);
    const hover=(event:PointerEvent)=>{
      if(dragging) return;
      const bounds=renderer.domElement.getBoundingClientRect();
      pointer.set((event.clientX-bounds.left)/bounds.width*2-1,-(event.clientY-bounds.top)/bounds.height*2+1);
      raycaster.setFromCamera(pointer,camera);
      renderer.domElement.style.cursor=raycaster.intersectObjects(pickable).length?'pointer':'grab';
    };
    renderer.domElement.addEventListener('pointermove',hover);
    let visible=true,frame=0,disposed=false,unavailable=false,lastTime=0;
    let elapsed=0,phase=0,boardReveal=1;
    let previousOpen:number|null=null;
    const point=new THREE.Vector3();
    const anchor=new THREE.Vector3();
    const boardPoint=new THREE.Vector3();
    function render() {
      if(disposed||unavailable) return;
      architecture.rotation.y=Math.sin(elapsed*.22)*.2;
      architecture.position.y=Math.sin(elapsed*.5)*.065;
      architecture.updateMatrixWorld(true);
      models.forEach((model,i)=>{
        model.scale.setScalar(i===selectedRef.current?1.08:1);
        point.set(0,nodes[i].height/2,0);
        model.localToWorld(point);
        point.project(camera);
        const hitLabel=labelRefs.current[i];
        if(hitLabel) {hitLabel.dataset.meshX=String((point.x+1)/2);hitLabel.dataset.meshY=String((-point.y+1)/2);}
        point.set(0,nodes[i].height+.36,0);
        model.localToWorld(point);
        point.project(camera);
        const label=labelRefs.current[i];
        if(label) {label.style.left=`${(point.x+1)*50}%`;label.style.top=`${(-point.y+1)*50}%`;}
      });
      paths.forEach(({curve,packet,offset})=>packet.position.copy(curve.getPoint((phase+offset)%1)));
      if(previousOpen!==openRef.current) {boardReveal=motionRef.current?.05:1;previousOpen=openRef.current;}
      if(!motionRef.current) boardReveal=1;
      boards.forEach((board,i)=>{board.visible=i===openRef.current;});
      connector.visible=openRef.current!==null;
      if(openRef.current!==null) {
        const i=openRef.current;
        const board=boards[i];
        const width=container.clientWidth,height=container.clientHeight;
        anchor.set(0,nodes[i].height+.1,0);
        models[i].localToWorld(anchor);
        point.copy(anchor).project(camera);
        const boardWidth=Math.min(270,width-32);
        const boardHeight=boardRefs.current[i]!.offsetHeight||245;
        const margin=22;
        const x=Math.max(boardWidth/2+margin,Math.min(width-boardWidth/2-margin,(point.x+1)*width/2+(nodes[i].x<0?100:-100)));
        const y=Math.max(boardHeight/2+margin,Math.min(height-boardHeight/2-margin,(-point.y+1)*height/2-120));
        boardPoint.set(x/width*2-1,-(y/height*2-1),point.z).unproject(camera);
        board.position.copy(boardPoint);
        board.position.y+=(1-boardReveal)*.35;
        board.quaternion.copy(camera.quaternion);
        board.rotateY(-.12-(1-boardReveal)*.45);
        board.rotateX(.025);
        board.scale.setScalar((camera.top-camera.bottom)/height*(.92+.08*boardReveal));
        boardRefs.current[i]!.style.opacity=String(boardReveal);
        boardRefs.current[i]!.style.width=`${boardWidth}px`;
        const positions=connectorGeometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0,anchor.x,anchor.y,anchor.z);
        positions.setXYZ(1,boardPoint.x,boardPoint.y,boardPoint.z);
        positions.needsUpdate=true;
        connector.computeLineDistances();
      }
      renderer.render(scene,camera);
      boardRenderer.render(boardScene,camera);
    }
    function animate(time:number) {
      frame=0;
      if(disposed||unavailable||!visible||document.hidden||!motionRef.current) {lastTime=0;return;}
      const delta=lastTime?Math.min(time-lastTime,50)/1000:0;
      if(!dragging) elapsed+=delta;
      phase=(phase+delta*.15)%1;
      boardReveal=Math.min(1,boardReveal+delta*2.2);
      lastTime=time;
      render();
      frame=requestAnimationFrame(animate);
    }
    function wake() {
      if(disposed||unavailable) return;
      render();
      if(!frame&&visible&&!document.hidden&&motionRef.current) frame=requestAnimationFrame(animate);
    }
    drawRef.current=wake;
    resetRef.current=()=>{elapsed=0;controls.reset();wake();};
    function resize() {
      const w=container.clientWidth,h=container.clientHeight;
      const aspect=w/h;
      const extent=aspect<1.1?5:4.15;
      camera.left=-extent*aspect;camera.right=extent*aspect;camera.top=extent;camera.bottom=-extent;
      camera.updateProjectionMatrix();
      renderer.setSize(w,h);boardRenderer.setSize(w,h);wake();
    }
    function theme() {
      const dark=document.documentElement.dataset.theme==='dark';
      floorMaterial.color.set(dark?0x1b2325:0xe3e6da);
      edgeMaterial.color.set(dark?0x576260:0x8b9684);
      connectorMaterial.color.set(dark?0xe3a24c:0x92590d);
      moduleMaterials.forEach((material,i)=>material.color.set(nodes[i].kind==='hub'?(dark?0x748a80:0x344d45):(dark?0x3b4b4c:0xd1d8c8)));
      accentMaterials[0].color.set(dark?0x75b2a5:0x276057);
      accentMaterials[1].color.set(dark?0xdba760:0xa5650f);
      ambient.intensity=dark?1.7:2.4;light.intensity=dark?2:3;wake();
    }
    const observer=new ResizeObserver(resize);observer.observe(container);
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake();},{threshold:.05});intersection.observe(container);
    const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    controls.addEventListener('change',wake);
    document.addEventListener('visibilitychange',wake);
    const lost=(event:Event)=>{event.preventDefault();unavailable=true;visible=false;cancelAnimationFrame(frame);frame=0;setStatus('fallback');};
    renderer.domElement.addEventListener('webglcontextlost',lost);
    theme();resize();setStatus('ready');
    return ()=>{
      disposed=true;logoDisposed=true;cancelAnimationFrame(frame);
      observer.disconnect();intersection.disconnect();themeObserver.disconnect();controls.dispose();
      document.removeEventListener('visibilitychange',wake);
      renderer.domElement.removeEventListener('webglcontextlost',lost);
      renderer.domElement.removeEventListener('pointerdown',pointerDown);
      renderer.domElement.removeEventListener('pointerup',pointerUp);
      renderer.domElement.removeEventListener('pointermove',hover);
      // Return React-owned board elements before removing the imperative renderers.
      boards.forEach((board,i)=>{boardScene.remove(board);boardRefs.current[i]?.removeAttribute('style');container.appendChild(board.element);});
      scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line||object instanceof THREE.LineSegments) object.geometry.dispose();});
      [...moduleMaterials,...accentMaterials,floorMaterial,edgeMaterial,connectorMaterial,hubPlateMaterial,hubLogoMaterial].forEach(material=>material.dispose());
      logoTexture.dispose();
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();boardRenderer.domElement.remove();
      drawRef.current=()=>{};resetRef.current=()=>{};
    };
  },[]);
  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape') setOpen(null);};
    window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);
  },[]);
  return <figure className="integration-model" aria-label="Interactive model of NMIT's integration architecture">
    <div className="model-caption"><span>Systems, connected.</span><span className="model-dimension">{status==='fallback'?'Architecture view':'Explore / 3D'}</span></div>
    <div className="model-stage" data-status={status} data-open={open!==null}>
      <div className="model-canvas" ref={host}>{nodes.map((node,i)=><article className="explainer-board" key={node.name} ref={el=>{boardRefs.current[i]=el;}} data-system={i} aria-label={`${node.title} explainer`} aria-hidden={open!==i||status!=='ready'} inert={open!==i||status!=='ready'}>
        <div className="board-heading"><span>{String(i+1).padStart(2,'0')} / {node.kind==='input'?'Source system':node.kind==='hub'?'Integration layer':'Connected service'}</span><button type="button" aria-label={`Close ${node.title} explainer`} onClick={()=>setOpen(null)}>×</button></div>
        <h3>{node.title}</h3><p>{node.detail}</p><ol>{node.steps.map(step=><li key={step}>{step}</li>)}</ol><div className="board-flow">{node.flow}</div>
      </article>)}</div>
      {status==='fallback'?<div className="model-fallback"><IntegrationDiagram /></div>:<div className="model-labels">{nodes.map((node,i)=><button key={node.name} ref={el=>{labelRefs.current[i]=el;}} className={`model-label ${node.kind}`} aria-pressed={selected===i} onClick={()=>select(i)} style={{visibility:status==='ready'?'visible':'hidden'}}>{node.name}</button>)}</div>}
      {status==='loading'&&<span className="model-loading">Preparing architecture…</span>}
    </div>
    {status==='fallback'&&open!==null&&<div className="fallback-explainer"><h3>{nodes[open].title}</h3><p>{nodes[open].detail}</p><ol>{nodes[open].steps.map(step=><li key={step}>{step}</li>)}</ol></div>}
    <figcaption className="model-system-picker" aria-label="Explore individual systems">{nodes.map((node,i)=><button type="button" key={node.name} aria-pressed={open===i} onClick={()=>select(i)}>{node.name}</button>)}</figcaption>
    <div className="model-controls"><span>{status==='fallback'?'Select a system for its explanation':'Slow motion · drag to rotate · click to explore'}</span><div>{status!=='fallback'&&<button type="button" onClick={()=>resetRef.current()}>Reset view</button>}<button type="button" onClick={onToggle} aria-pressed={!playing} disabled={reduced}>{reduced?'Motion off':playing?'Pause motion':'Play motion'}</button></div></div>
  </figure>;
}

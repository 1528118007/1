//#utils ARRAY{
var list=(x,y,n)=>n>0?list(x,y,n-1).concat([x+y*(n-1)]):[]
var List=(x)=>list(0,1,x.length)
var L=(x)=>x.length
var reduce=(x,i,f)=>[i].concat(x).reduce(f)
var substr=(x,y)=>y.map((i)=>x[i])
var sort=(x,y)=>substr(x,List(y).sort((z,t)=>y[z]-y[t]))
var Min=(x)=>reduce(x,1/0,(y,z)=>y<z?y:z)
var Max=(x)=>reduce(x,-1/0,(y,z)=>y>z?y:z)
var total=(x)=>reduce(x,0,(y,z)=>y+z)
var In=(x,y)=>y.some((z)=>x==z)
function rdm(x){if(!x){return Math.random()}else{return list(0,1,x).map(Math.random)}}
var union=(x)=>reduce(x,[],(y,z)=>y.concat(z))
var modify=(x,i,n,r)=>x.slice(0,i-1).concat(r,x.slice(i+n))
var map2f=(x,y,f)=>List(x).map((i)=>f(x[i],y[i],i))
var un=(x,y)=>typeof(x)=='undefined'?y:x
var add=(x,y)=>map2f(x,y,(z,t)=>z+un(t,y))
var subt=(x,y)=>map2f(x,y,(z,t)=>z-un(t,y))
var mult=(x,y)=>map2f(x,y,(z,t)=>z*un(t,y))
var Add=(x,y)=>map2f(x,y,(z,t)=>add(z,t*0+1?y:t))
var Subt=(x,y)=>map2f(x,y,(z,t)=>subt(z,t*0+1?y:t))
var Mult=(x,y)=>map2f(x,y,(z,t)=>mult(z,un(t,y)))
var clone=(x,n)=>substr([x],list(0,0,n))
var Rep=(x,f)=>union(map2f(x,[0],(z,t,i)=>clone(z,f(i))))
var rep=(x,n)=>Rep(x,()=>n)
var exstr=(x,y)=>x.filter((z,t)=>!In(t,y))
var unique=(x)=>x.filter((y,z)=>!In(y,x.slice(0,z-1)))
var shuffle=(x)=>x.sort(()=>0.5-rdm())
var Total=(x)=>reduce(x,[0,0],add)
var expa=(x,y,f)=>union(x.map((z)=>y.map((t)=>f(z,t))))
var expp=(x,y,i)=>[x[Math.floor(i/L(y))],y[i%L(y)]]
var amount=(x,n)=>x.filter((y)=>y==n).length
var iter=(f,x,n)=>reduce(list(0,0,n),x,f)
function itef(f,x,y){list(x,1,y-x+1).forEach(f)}
var dot=(x,y)=>total(mult(x,y))
var lerp=(x,y,t)=>add(x,mult(subt(y,x),t))
var M=(x)=>Math.sqrt(dot(x,x))
var ref=(x,y)=>subt(x,mult(y,2*dot(x,y)/dot(y,y)))
var arg=(x,y)=>Math.acos(dot(x,y)/(M(x)*M(y)))
var cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-y[2]*x[0],x[0]*y[1]-y[0]*x[1]]
var mean=(x)=>total(x)/L(x)
var centroid=(x)=>mult(Total(x),1/L(x))
var isNum=(x)=>(+x)*0+1||x=='.'
//}
//#endutils
//utils WEBGL{
class Renderer{
constructor(){
this.e=document.createElement('canvas');this.gl=this.e.getContext('webgl')
this.V=this.gl.createShader(this.gl.VERTEX_SHADER)
this.F=this.gl.createShader(this.gl.FRAGMENT_SHADER)
this.defv='void main(){gl_Position=position;}'
this.v=this.defv;this.f='void main(){gl_FragColor=vec4(gl_FragCoord.xy/500.0,sin(gl_FragCoord.z),1.0);}'
this.gl.shaderSource(this.V,'attribute vec4 position;'+this.v);this.gl.shaderSource(this.F,'precision highp float;'+this.f)
this.color=[0,0,0]
this.p=this.gl.createProgram();this.b=this.gl.createBuffer();this.ab=()=>this.gl.ARRAY_BUFFER
this.gl.compileShader(this.V);this.gl.attachShader(this.p,this.V)
this.gl.compileShader(this.F);this.gl.attachShader(this.p,this.F)
this.gl.linkProgram(this.p);this.gl.useProgram(this.p)
this.bData=[1,1,-1,1,-1,-1,-1,-1,1,1,1,-1]
this.unif={};this.utype={}
this.gl.bindBuffer(this.ab(),this.b);this.gl.bufferData(this.ab(),new Float32Array(this.bData),this.gl.STATIC_DRAW)
this.a=()=>this.gl.getAttribLocation(this.p,'position')
this.gl.enableVertexAttribArray(this.a())
this.gl.vertexAttribPointer(this.a(),2,this.gl.FLOAT,false,0,0)
}
element(x){return document.getElementById(x)}
attachTo(x){this.element(x).appendChild(this.e)}
update(v,f){this.v=v;this.f=f
this.gl.shaderSource(this.V,'attribute vec4 position;'+this.v);this.gl.shaderSource(this.F,'precision highp float;'+this.f)
this.gl.compileShader(this.V);this.gl.compileShader(this.F)
this.gl.linkProgram(this.p)}
Update(){this.update(this.v,this.f)}
types(x){return ['float','vec2','vec3','vec4'][x-1]}
unifV(x,type){let xx=x;this.v='uniform '+this.types(type)+' '+x+';'+this.v;this.unif[x]=()=>this.gl.getUniformLocation(this.p,xx)}
unifF(x,type){let xx=x;this.f='uniform '+this.types(type)+' '+x+';'+this.f;this.unif[x]=()=>this.gl.getUniformLocation(this.p,xx)}
UnifV(){for(x in this.unif){this.unifV(x,this.utype[x])}}
UnifF(){for(x in this.unif){this.unifF(x,this.utype[x])}}
shape(x,type,y){this.drawType=!type?'STATIC_DRAW':type;this.gl.bufferData(this.ab(),new Float32Array(x),this.gl[this.drawType]);this.bData=x;this.gl.vertexAttribPointer(this.a(),un(y,2),this.gl.FLOAT,false,0,0)}
set(u,x){switch(un(L(x),1)){
case 1:this.gl.uniform1f(this.unif[u](),x);break
case 2:this.gl.uniform2fv(this.unif[u](),x);break
case 3:this.gl.uniform3fv(this.unif[u](),x);break
case 4:this.gl.uniform4fv(this.unif[u](),x);break
}
}
setSize(x,y){this.e.width=x;this.e.height=y;this.gl.viewport(0,0,x,y)}
size(){return [window.innerWidth,window.innerHeight]}
fullScreen(){this.setSize(...this.size())}
render(x){this.gl.drawArrays(this.gl[un(x,'triangles').toUpperCase()],0,L(this.bData))}
cursor(f,x){this.e.addEventListener('mousemove',function(e){f(e.offsetX,e.offsetY)});this.render(x)}
init(x){this.Update();this.attachTo(x);this.fullScreen()}
setUnifV(u,t,v){List(u).forEach((i)=>{this.unifV(u[i],t[i]);this.set(u[i],v[i])})}
setUnifF(u,t,v){List(u).forEach((i)=>{this.unifF(u[i],t[i]);this.set(u[i],v[i])})}
inputUnifV(u,t){List(u).forEach((i)=>{this.unifV(u[i],t[i])})}
inputUnifF(u,t){List(u).forEach((i)=>{this.unifF(u[i],t[i])})}
Set(u,v){List(v).forEach((i)=>{this.set(u[i],v[i])})}
source(x,type){this[type]=document.getElementById(x).innerText}
debug(){let v=this.gl.getShaderInfoLog(this.V);let f=this.gl.getShaderInfoLog(this.F);let p=this.gl.getProgramInfoLog(this.p);return (L(v)>0?'vertex shader:'+v:'')+(L(f)>0?'fragment shader:'+f:'')+(L(p)>0?'program:'+p:'')}
bg(x,y,z){this.gl.clearColor(x,y,z,1);this.gl.clear(this.gl.COLOR_BUFFER_BIT)}
save(){this.vs=this.v;this.fs=this.f;this.bs=this.bData}
load(){this.v=this.vs;this.f=this.fs;this.bData=this.bs}
floatVec3(x){return 'vec4('+x.map((y)=>!y%1?y+'.0':y+'').toString()+',1.0)'}
drawPoly(x,c,t){this.save();this.update(this.defv,'void main(){gl_FragColor='+this.floatVec3(un(c,this.color))+';}');this.shape(union(x));this.render(t);this.load()}
convexPoly(x,c){this.drawPoly(x,c,'triangle_fan')}
triangleArray(x,c){this.drawPoly(union(x),c)}
poly4Array(x,c){this.drawPoly(union(x.map((y)=>substr(y,[0,1,2,3,1,2]))),c)}
}
//}endutils
//utils FRACTAL{
var Fractal=class{
constructor(){this.r=new Renderer()
this.custom=''
this.complex=`vec2 mult(vec2 x,vec2 y){return vec2(x.x*y.x-x.y*y.y,x.x*y.y+x.y*y.x);}
vec2 sqr(vec2 x){return mult(x,x);}
float M(vec2 x){return sqrt(x.x*x.x+x.y*x.y);}
vec2 rec(vec2 x){float x1=x.x*x.x+x.y*x.y;return vec2(x.x/x1,-x.y/x1);}
vec2 div(vec2 x,vec2 y){return mult(x,rec(y));}
vec2 cbr(vec2 x){return vec2(x.x*x.x*x.x-3.0*x.x*x.y*x.y,3.0*x.x*x.x*x.y-x.y*x.y*x.y);}
float cosh(float x){return (exp(x)+exp(-x))/2.0;}
float sinh(float x){return (exp(x)-exp(-x))/2.0;}
vec2 Sin(vec2 x){return vec2(sin(x.x)*cosh(x.y),cos(x.x)*sinh(x.y));}
vec2 Cos(vec2 x){return vec2(cos(x.x)*cosh(x.y),-sin(x.x)*sinh(x.y));}
vec2 Tan(vec2 x){return div(Sin(x),Cos(x));}
vec2 Exp(vec2 x){return exp(x.x)*vec2(cos(x.y),sin(x.y));}
vec2 Ln(vec2 x){return vec2(log(M(x)),atan(x.y,x.x));}
vec2 Pow(vec2 x,vec2 y){if(x.x==0.0&&x.y==0.0){return vec2(0,0);}else{return Exp(mult(y,Ln(x)));}}
vec2 Sqrt(vec2 x){return vec2(sqrt(0.5*(M(x)+x.x)),sign(x.y)*sqrt(0.5*(M(x)-x.x)));}
vec2 conj(vec2 x){return vec2(x.x,-x.y);}
vec2 flip(vec2 x){return x.yx;}
vec2 rot(vec2 x,float t){return vec2(x.x*cos(t)-x.y*sin(t),x.x*sin(t)+x.y*cos(t));}`
this.ce=()=>mult(this.r.size(),0.5)
this.uv={}
this.default=function(){return {f:'z2+c',c:'x,x,x',v:{c:this.ce(),r:1},b:'M(z)<16',u:[],t:[],i:'z=Z;c=C;',tr:'I=sqrt(I)/10.0;'}}
this.v={c:this.ce(),r:1}
}
getstr(str,z){return str.charAt(0)+z+str.charAt(str.length-1)}
rep(x,y,z){let t=new RegExp('[^a-z]'+y+'[^a-z]','g');
return ('-'+x+'-').replace(t,(str)=>this.getstr(str,z)).replace(t,(str)=>this.getstr(str,z)).slice(1).slice(0,-1)}
Rep(x,y,z){let t=x;itef((i)=>{t=this.rep(t,y[i],z[i])},0,L(y)-1);return t}
split(x){let x1=this.Rep(x,['z2','z3','u','v','m','n','d','a','i','k'],['sqr(z)','cbr(z)','z.x','z.y','c.x','c.y','M(z-p)','atan(z.y,z.x)','vec2(0,1)','vec2(1,0)']);return reduce(x1.slice(1).split(''),x1.charAt(0),(y,z)=>y+(isNum(y.charAt(L(y)-1))^isNum(z)?'α':'')+z).split('α')}
modify(x,t){let y=x.slice(t).split('');hs=false;z=0;d=-1;
for(let i=0;i<y.length;i++){
if('{[('.indexOf(y[i])>=0){d++}
else if('}])'.indexOf(y[i])>=0){d--}
if(!d){
if(y[i]==','){hs=true;y[i]='α'}else if(y[i]==';'){hs=true;y[i]='β'}
}
if(d<0){z=i;break}
}
if(!hs){y=y.filter((x1,y1)=>y1<z+1);y[0]='rec(';y[z]=')';y=y.join('')}else{
y=y.filter((x1,y1)=>y1&&y1<z)
y=y.join('').replace(/α/g,'αγ').replace(/β/g,'βδ').replace(/β/g,'α').split('α')
y=y.reduce((x1,y1)=>y1[0]=='γ'?'mult('+x1+','+y1.slice(1)+')':(y1[0]=='δ'?'div('+x1+','+y1.slice(1)+')':x1+y1))}
return x.slice(0,Math.max(t,0)).concat(y,x.slice(z+1+t))}
Modify(x){return this.modify(x,x.indexOf('{'))}
Mod1(x,i){return i<1?x:this.Modify(this.Mod1(x,i-1))}
getN(x,str){return x.split('').filter((y)=>y==str).length}
Mod(x){return this.Mod1(x,this.getN(x,'{'))}
float(x){let t='';let y=this.split(x);y.forEach((z)=>{if(parseInt(z)==parseFloat(z)&&(parseInt(z)==0||parseInt(z))){t+=(z+'.0')}else{t+=z}});t=t.replace(/vec2.0/g,'vec2').replace(/\[/g,'vec2(').replace(/\]/g,')').replace(/fd1.0/g,'fd1').replace(/fd2.0/g,'fd2');return this.Mod(t)}
input(x){this.f=this.float(x.f);this.c=this.float(x.c);this.b=this.float(x.b);this.v=x.v;this.i=x.i;this.u=x.u;this.t=x.t;this.tr=x.tr;if(x.custom){this.custom=x.custom}}
unif(){this.r.save();this.r.f='';this.r.inputUnifF(this.u.concat(['ce','r','c','center']),this.t.concat([2,1,2,2]));this.r.set('center',this.ce());this.U=this.r.f;this.r.load();return this.U}
viewport(){this.r.set('ce',this.v.c);this.r.set('r',this.v.r);this.r.set('center',this.ce())}
seed(c){this.r.set('c',c)}
set(u,x){this.r.set(u,x);this.uv[u]=x}
Set(x){List(this.u).forEach((i)=>{this.set(this.u[i],x[i])})}
Update(){List(this.u).forEach((x)=>{this.set(this.u[x],this.uv[this.u[x]])})}
compute(){this.r.f=this.source;this.r.Update()}
init(x){this.r.init(x)}
render(){this.r.render()}
compile(){this.source='precision highp float;'+this.unif()+this.complex+this.custom+'float I=0.0;vec2 p=vec2(0);bool isConv(vec2 z){return '+this.b+';}vec2 f(vec2 z,vec2 c){return '+this.f+';}vec3 color(float x,vec2 z,vec2 p){return vec3('+this.c+');}void main(){float ratio=min(center.x,center.y)/2.0;vec2 C=(c-center)/ratio;vec2 Z1=(gl_FragCoord.xy-center)/ratio;vec2 zce=(ce-center)/ratio;vec2 Z=mix(zce,Z1,1.0/r);vec2 zb;vec2 z;vec2 c;'+this.i+'for(int i=0;i<100;i++){if(!isConv(z-p)){break;}I+=1.0;zb=z;z=f(z,c);p=zb;}'+this.tr+'gl_FragColor=vec4(I==1.0?vec3(0):color(I,z,p),1.0);}';return this.source}
check(f){let gl=this.r.gl,shader=gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(shader,f);return !gl.getShaderInfoLog(shader).length}
formula(key,x){this.history=this[key];this.ss=this.source;this[key]=this.float(x);if(!this.check(this.compile())){this[key]=this.history;this.source=this.ss}}
Formula(key,x,y,z){this.history=this[key];this.ss=this.source;this[key]=y+this.float(x)+z;if(!this.check(this.compile())){this[key]=this.history;this.source=this.ss}}
defv(){return {c:this.ce(),r:1}}
deftr(){return 'I=sqrt(I)/10.0;'}
dynamic(f){this.r.cursor((x,y)=>{f([x,y]);this.render()})}

zoom(c,r){let c1=this.v.c;let r1=this.v.r
this.v.r=r1*r
this.v.c=[0,1].map((i)=>((r-1)*c[i]+r*(r1-1)*c1[i])/(this.v.r-1))
this.viewport()
this.render()
}
dynamicViewport(){this.r.e.onmousewheel=(e)=>{e.preventDefault();this.zoom([e.offsetX,e.offsetY],1-e.deltaY/1000)}}
}
//}endutils

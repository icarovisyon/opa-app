import{r as i,a as fe}from"./react.c88dfd88.js";import{c as ue}from"./react-dom.52601296.js";import{B as me}from"./react-router-dom.b675633d.js";import{s as t}from"./styled-components.1121f56e.js";import{j as e,a as n,D as M,F}from"./@mui.b9089bb0.js";import{a as xe}from"./axios.57cd696e.js";import{C as A}from"./react-csv.3c2fff13.js";import{C as ge,a as ye,L as be,b as we,p as Ce,c as Se,d as ve}from"./chart.js.326bc164.js";import{B as ke}from"./react-chartjs-2.e4aa1815.js";import{a as $e,b as R}from"./react-router.7bfb4004.js";import{Q as Be,a as De}from"./react-query.a1250ea3.js";import"./form-data.8965bb56.js";import"./scheduler.9e4b9fab.js";import"./@remix-run.335c8a54.js";import"./react-is.1c24df61.js";import"./@emotion.34fff65d.js";import"./hoist-non-react-statics.7be3bd10.js";import"./@babel.3100b4cf.js";import"./stylis.1e89421e.js";import"./prop-types.8e4b35ab.js";import"./reselect.bd965e1c.js";import"./clsx.09c75e33.js";import"./react-transition-group.1dc4b390.js";import"./@popperjs.37f4ded5.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(r){if(r.ep)return;r.ep=!0;const c=o(r);fetch(r.href,c)}})();function ie({to:a,description:d}){return e(Ne,{href:a,children:e(Fe,{children:d})})}const Ne=t.a`
    color: inherit;
    cursor: inherit;
`,Fe=t.span`
`;function X({selected:a}){const d=[{to:"/",descrition:"Dashboard",icon:"fa-solid fa-chart-line"},{to:"/departamento",descrition:"Departamento",icon:"fa-regular fa-building"},{to:"/cliente",descrition:"Cliente",icon:"fa-solid fa-clipboard-user"},{to:"/atendente",descrition:"Atendente",icon:"fa-solid fa-user"}];return e(Ie,{children:e(Me,{children:d==null?void 0:d.map((o,l)=>o.descrition===a?n(re,{style:{background:"#9265e7",color:"#fff"},children:[e(de,{className:o.icon}),e(ie,{to:o.to,description:o.descrition})]},l):n(re,{children:[e(de,{className:o.icon}),e(ie,{to:o.to,description:o.descrition})]},l))})})}const Ie=t.div`
    width: 260px;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px 1px;
    border-radius: 10px;
    padding: 0 0 0 10px;
    @media (max-height: 800px){
        width: 250px;
    }
`,Me=t.ul`
    padding: 100px 0px 0px;
`,re=t.li`
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    color: rgb(136, 134, 134);
    padding: 10px 50px;
    border-radius: 5px;
    display: inline-flex;
    width: 150px;
    height: 24px;
    @media (max-height: 800px){
        width: 140px;
    }
`,de=t.i`
    padding: 0 6px 0 0;
    font-size: 20px;
`,v={start:"2022-10-01 00:00:01",final:"2022-10-31 23:59:59",startDate:"2022-10-01",finalDate:"2022-10-31"},q=[],S={Description:{fontSize:"16px",padding:"0 10px 0"},Button:{backgroundColor:"#8a58ff",margin:"0 10px 0"},Link:{borderRadius:"10px",backgroundColor:"#8a58ff",color:"#fff",padding:"10px"},ButtonCsv:{borderRadius:"10px",backgroundColor:"#8a58ff",color:"#fff",padding:"8px"},Title:{display:"inline-block",padding:"20px",color:"#701ec7"}},y=xe.create({baseURL:"http://10.230.0.90:8000",headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIERlYyAyMSAyMDIyIDE3OjI3OjQ1IEdNVC0wMzAwIChCcmFzaWxpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MTIsImlhdCI6MTY3MTY1NDQ2NX0.lJMMqlIAiSfguHPtt2IhiDNi_2fzquAXDDSGg7pEgGo"}});function te(a,d){const[o,l]=i.exports.useState(d),[r,c]=i.exports.useState(!0),[u,k]=i.exports.useState(!1);return i.exports.useEffect(()=>{y.get(a).then(b=>l(b.data)).catch(b=>k(b)).finally(()=>{c(!1)})},[]),{data:o,error:u,isFetching:r}}function ze(){const a=`/customer-review-media?dateStart=${v.start}&dateFinal=${v.final}`,d=[],o=[{field:"cliente",headerName:"Cliente",width:240},{field:"media",headerName:"media",width:80},{field:"quantidade",headerName:"quantidade",width:80}],{data:l,isFetching:r}=te(a,d);return n(Ge,{children:[r&&e(Te,{children:"Carregando..."}),(l==null?void 0:l.length)>0&&e(Re,{children:e(M,{rows:l,columns:o})})]})}const Ge=t.div`
    overflow: auto;
`,Te=t.span`
    font-size: 12px;
    color: #1105dc;
    padding: 0 0 16px;
    font-family: Montserrat, Arial, sans-serif;
    padding: 10px;
`,Re=t.div`
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    width: 500px;
    height: 700px;
    border-radius: 10px;
    background-color: #f1f1f1;
    color: gray;
    @media (max-width: 1400px){
        width: 450px;
        height: 400px;
    }
`;function Le(a){return e(Ee,{children:a.description})}const Ee=t.span`
    font-family: Google Sans,sans-serif;
    color: #4e4a4a;
    font-weight: bold;
    font-size: 13px;
    padding: 0 0 30px 10px;
    text-align: end;
`;function I({title:a,style:d}){return e(Ae,{style:d,children:a})}const Ae=t.div`
    font-family: Google Sans,sans-serif;
    color: #494949;
    font-weight: bold;
    font-size: 26px;
    padding: 0 0 30px;
`,qe={},Ve={};function je(){window.sessionStorage.getItem("token")||window.location.replace("/");const{data:a,isFetching:d}=te(`/call-time-all?dateStart=${v.start}&dateFinal=${v.final}`,qe),{data:o,isFetching:l}=te(`/attendance-statistics?dateStart=${v.start}&dateFinal=${v.final}`,Ve);return n(Qe,{children:[e(X,{selected:"Dashboard"}),n(Pe,{children:[e(I,{title:"Indicadores:"}),e(Le,{description:"Periodo: 10/2022"}),n(_e,{children:[n(V,{className:"animated",children:[e(j,{children:"Tempo M\xE9dio na fila:"}),n(Q,{children:[d&&e(P,{children:"Carregando..."}),a==null?void 0:a.tempo]})]}),n(V,{children:[e(j,{children:"Chamados abertos:"}),n(Q,{children:[l&&e(P,{children:"Carregando..."}),o==null?void 0:o.total]})]}),n(V,{children:[e(j,{children:"Chamados atendidos:"}),n(Q,{children:[l&&e(P,{children:"Carregando..."}),o==null?void 0:o.assumidos]})]}),n(V,{children:[e(j,{children:"Chamados sem intera\xE7\xE3o:"}),n(Q,{children:[l&&e(P,{children:"Carregando..."}),o==null?void 0:o.semInteracao]})]})]}),e(He,{children:e(ze,{})})]})]})}const Qe=t.div`
`,Pe=t.div`
    margin: 0 50px 0 310px;
    padding: 35px 30px 0 30px;
`;t.div`
    display: flex;
`;const _e=t.div`
    display: flex;
`,V=t.div`
    background-color: #fff;
    width: 30%;
    min-width: 170px;
    height: 100px;
    margin: 10px 6px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
    animation: animate 1s;
`,j=t.span`
    width: 100%;
    text-align: start;
    padding: 0 0 0 15px;
    font-size: 14px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #504f4f;
`,Q=t.span`
    font-size: 24px;
    color: #4e4e4e;
    padding: 0 0 16px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
`,P=t.span`
    font-size: 12px;
    color: #1105dc;
    padding: 0 0 16px;
    font-family: Arial, Helvetica, sans-serif;
`;t.div`
`;const He=t.div`
    width: 450px;
    padding: 25px 0 0 10px;
    background-color: transparent;
    border-radius: 10px;
    color: rgb(243 243 243);
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;

    @media (min-width: 1000px){
        width: 500px;
        height: 700px;
    }
`,L=t.button`
    background-color: #794ef4;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: inline;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    margin: 0 5px;
`,Oe=t.input`
    width: 240px;
    height: 40px;
    border-radius: 10px;
    padding: 0 0 0 1em;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    display: inline;
    margin: 0 0 0 1.5em;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    &:hover {
        box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
  }
`,se=t.span`
    font-family: Google Sans,sans-serif;
    color: #4e4a4a;
    font-weight: bold;
    font-size: 15px;
    padding: 0 0 30px 10px;
    text-align: end;
    padding: 10px 0;
`,K=t.input`
    width: 120px;
    height: 40px;
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
    padding: 0 0 0 6px;
`,U=t.div`
    display: flex;
    flex-wrap: nowrap;
    align-content: space-between;
    flex-direction: row;
    align-items: center;
`;ge.register(ye,be,we,Ce,Se,ve);const Je={responsive:!0,plugins:{legend:{position:"top"},title:{display:!1,text:"Atendimentos por atendentes"}}},Ke={data:[],description:"",label:[]};function ae({dataSets:a,description:d,labels:o}){return e(ke,{options:Je,data:{labels:o,datasets:[{label:d,data:a,backgroundColor:["#567ebb","#8a5df3","#095169","#3019c5","#2b4c7e","#71dbd2","#6943e3","#6f95ff"]}]}})}const _={reasons:[{label:"Motivo",key:"motivo"},{label:"Quantidade",key:"quantidade"}],numberCallsWaitingTime:[{label:"Setor",key:"setor"},{label:"Cinco",key:"cinco"},{label:"Dez",key:"dez"},{label:"Quinze",key:"quinze"},{label:"Vinte",key:"vinte"},{label:"Trinta",key:"trinta"},{label:"Trinta+",key:"maior"}],callTimeMediumByReason:[{label:"Motivo",key:"motivo"},{label:"Media",key:"media"},{label:"Departamento",key:"departamento"}],numberCallByHours:[{label:"Quantidade",key:"quantidade"},{label:"Hora",key:"hora"},{label:"Dia",key:"dia"},{label:"Mes",key:"mes"},{label:"Ano",key:"ano"}]},Ue=[{field:"motivo",headerName:"Motivo",width:400},{field:"quantidade",headerName:"Quantidade",width:150}],Xe=[{field:"setor",headerName:"Setor",width:230},{field:"cinco",headerName:"Cinco",width:91.666666667},{field:"dez",headerName:"Dez",width:91.666666667},{field:"quinze",headerName:"Quinze",width:91.666666667},{field:"vinte",headerName:"Vinte",width:91.666666667},{field:"trinta",headerName:"Trinta",width:91.666666667},{field:"maior",headerName:"Trinta +",width:91.666666667}],Ye=[{field:"departamento",headerName:"Departamento",width:260},{field:"motivo",headerName:"Motivo",width:260},{field:"media",headerName:"media de tempo em horas",width:210}],Ze=[{field:"quantidade",headerName:"Quantidade",width:146},{field:"hora",headerName:"Hora",width:146},{field:"dia",headerName:"Dia",width:146},{field:"mes",headerName:"M\xEAs",width:146},{field:"ano",headerName:"Ano",width:146}];function We(){const[a,d]=i.exports.useState(""),[o,l]=i.exports.useState(!1),[r,c]=i.exports.useState(v.start),[u,k]=i.exports.useState(v.final),[b,$]=i.exports.useState(!0),[m,Y]=i.exports.useState(q),[z,Z]=i.exports.useState([{motivo:"",quantidade:0}]),[B,G]=i.exports.useState(q),[x,E]=i.exports.useState([{motivo:"",quantidade:0}]),[h,W]=i.exports.useState(Ke),[T,f]=i.exports.useState(q),[p,D]=i.exports.useState([{motivo:"",quantidade:0}]),[g,w]=i.exports.useState(q);i.exports.useEffect(()=>{async function C(){l(!0),await y.get(`/call-time-by-department/${a}?dateStart=${r}&dateFinal=${u}`).then(s=>{if(s.data){let ne=[],oe=[];s.data.map(ee=>{ne.push(`${ee.departamentos}, quant: ${ee.chamados}`),oe.push(ee.tempo)}),W({data:oe,description:"Dados em minutos.",label:ne})}}).catch(s=>console.log(s)),y.get(`/attendance-number?gestor=${a}&dateStart=${r}&dateFinal=${u}`).then(s=>{s.data&&(G(s.data),E(s.data))}).catch(s=>console.log(s)),y.get(`/attendance-reasons?gestor=${a}&dateStart=${r}&dateFinal=${u}`).then(s=>{s.data&&(Y(s.data),Z(s.data))}).catch(s=>console.log(s)),y.get(`/call-time-medium-reasons?gestor=${a}&dateStart=${r}&dateFinal=${u}`).then(s=>{s.data&&(f(s.data),D(s.data))}).catch(s=>console.log(s)),y.get(`/attendance-number?gestor=${a}&dateStart=${r}&dateFinal=${u}`).then(s=>{s.data&&(G(s.data),E(s.data))}).catch(s=>console.log(s)),await y.get(`/number-call-by-hours?gestor=${a}&dateStart=${r}&dateFinal=${u}`).then(s=>{s.data&&w(s.data)}),l(!1)}a!==""&&C()},[b]);const N={width:"200px"};return n(et,{children:[n(tt,{children:[e(Oe,{type:"text",placeholder:"Gestor",onChange:C=>d(C.target.value)}),n(U,{children:[e(se,{style:S.Description,children:"Inicial:"}),e(K,{style:N,value:r,id:"dateStart",type:"datetime-local",onChange:C=>c(C.target.value)})]}),n(U,{children:[e(se,{style:S.Description,children:"Final:"}),e(K,{style:N,value:u,id:"dateFinal",type:"datetime-local",onChange:C=>k(C.target.value)})]}),e(L,{style:S.Button,onClick:C=>$(!b),children:"Pesquisar"})]}),n(at,{children:[o&&n(F,{children:[e(ot,{children:"Carregando..."})," ",e("br",{})]}),(h==null?void 0:h.data.length)>0&&n(F,{children:[e(I,{style:{display:"inline-block",padding:"20px",color:"#701ec7"},title:"Media de tempo por departamento:"}),e(nt,{children:e(ae,{dataSets:h==null?void 0:h.data,description:h==null?void 0:h.description,labels:h==null?void 0:h.label})})]}),(B==null?void 0:B.length)>0&&n(F,{children:[e(I,{style:S.Title,title:"Quantidade de chamados por tempo m\xE9dio:"}),n(A,{style:S.ButtonCsv,data:x,headers:_.numberCallsWaitingTime,children:["Baixar CSV",e(O,{className:"fa fa-download","aria-hidden":"true"})]}),e(H,{children:e(M,{rows:B,columns:Xe})})]}),(m==null?void 0:m.length)>0&&n(F,{children:[e(I,{style:S.Title,title:"Atendimentos por motivo:"}),n(A,{style:S.ButtonCsv,data:z,headers:_.reasons,children:["Baixar CSV",e(O,{className:"fa fa-download","aria-hidden":"true"})]}),e(H,{children:e(M,{initialState:{sorting:{sortModel:[{field:"quantidade",sort:"desc"}]}},rows:m,columns:Ue})})]}),(T==null?void 0:T.length)>0&&n(F,{children:[e(I,{style:S.Title,title:"Tempo medio de conclus\xE3o de atendimentos:"}),n(A,{style:S.ButtonCsv,data:p,headers:_.callTimeMediumByReason,children:["Baixar CSV",e(O,{className:"fa fa-download","aria-hidden":"true"})]}),e(H,{children:e(M,{initialState:{sorting:{sortModel:[{field:"media",sort:"desc"}]}},rows:T,columns:Ye})})]})]}),(g==null?void 0:g.length)&&e(I,{style:S.Title,title:"Chamados abertos por hora:"}),(g==null?void 0:g.length)>0&&g.map((C,s)=>n(F,{children:[e("br",{}),e(I,{style:S.Title,title:C.departamento+":"}),n(A,{style:S.ButtonCsv,data:C.data,headers:_.numberCallByHours,children:["Baixar CSV",e(O,{className:"fa fa-download","aria-hidden":"true"})]}),e(H,{children:e(M,{rows:C.data,columns:Ze})},s)]})),e("br",{}),e("br",{})]})}const et=t.div`
    display: inline;
    width: 100vw;
    height: 100vh;
    margin: 0 10px 40px 0;
`,tt=t.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;
`,at=t.div`
    margin: 20px 0;
`,H=t.div`
    width: 800px;
    height: 77vh;
    border-radius: 10px;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    background-color: #f1f1f1;
    color: gray;
    margin: 0 0 35px 0;
`,nt=t.div`
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    padding: 25px 2px 50px;
    width: 800px;
    margin: 0 0 20px 0;
`,ot=t.span`
    color: #5e005e;
    padding: 25px;
`,O=t.span`
    margin: 0 0 0 6px;
`;function it(){window.sessionStorage.getItem("token")||window.location.replace("/");const[a,d]=i.exports.useState(!1),[o,l]=i.exports.useState("block");return i.exports.useEffect(()=>{l(a?"none":"block")},[a]),n(rt,{children:[e(X,{selected:"Departamento"}),n(dt,{children:[a&&e(L,{onClick:()=>d(!a),children:"Fechar"}),a&&e(We,{}),e(L,{style:{display:o},onClick:()=>d(!a),children:"Estatisticas do departamento"})]})]})}const rt=t.div`
`,dt=t.div`
    margin: 0 50px 0 310px;
    padding: 35px 30px 0 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: flex-start;
`;function st(){const a=[],d=[{field:"nome",headerName:"Nome",width:400},{field:"status",headerName:"Status",width:150},{field:"tag",headerName:"Tag",width:150}],[o,l]=i.exports.useState(""),[r,c]=i.exports.useState(a),[u,k]=i.exports.useState(!1),b=$=>{if($.key=="Enter"){const m=$.target;l(m.value)}};return i.exports.useEffect(()=>{async function $(){k(!0),await y.get(`/clients-by-tags?tag=${o}`).then(m=>{if(m.data.type=="error"){k(!1);return}c(m.data),k(!1)}).catch(m=>console.log(m))}o!==""&&$()},[o]),n(lt,{children:[e(ct,{type:"text",placeholder:"Preencha o nome da tag",onKeyDown:b}),n(pt,{children:[u&&e(ft,{children:"Carregando..."}),(r==null?void 0:r.length)>0&&e(ht,{children:e(M,{rows:r,columns:d})})]})]})}const lt=t.div`
    display: inline;
    width: 100vw;
    height: 100vh;
    margin: 0 10px 0 0;
`,ct=t.input`
    width: 240px;
    height: 40px;
    border-radius: 10px;
    padding: 0 0 0 1em;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    display: inline;
    margin: 0 0 0 1.5em;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    &:hover {
        box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
  }
`,pt=t.div`
    margin: 20px 0;
`,ht=t.div`
    width: 800px;
    height: 77vh;
    border-radius: 10px;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    background-color: #f1f1f1;
    color: gray;
`,ft=t.span`
    color: #5e005e;
    padding: 25px;
`;function ut(){window.sessionStorage.getItem("token")||window.location.replace("/");const[a,d]=i.exports.useState(!1),[o,l]=i.exports.useState("block");return i.exports.useEffect(()=>{l(r=>a?"none":"block")},[a]),n(mt,{children:[e(X,{selected:"Cliente"}),n(xt,{children:[a==!0&&e(L,{onClick:()=>d(!a),children:"Fechar"}),a==!0&&e(st,{}),e(L,{style:{display:o},onClick:()=>d(!a),children:"Pesquisar pela Tag"})]})]})}const mt=t.div`
`,xt=t.div`
    margin: 0 50px 0 310px;
    padding: 35px 30px 0 30px;
`;function le(a,d,o){return new Date(o+"-"+d+"-"+a+" 00:00:00").toLocaleDateString("pt-BR")}function gt(){window.sessionStorage.getItem("token")||window.location.replace("/");const[a,d]=i.exports.useState(""),[o,l]=i.exports.useState(),[r,c]=i.exports.useState(),[u,k]=i.exports.useState(""),[b,$]=i.exports.useState(""),[m,Y]=i.exports.useState(v.startDate),[z,Z]=i.exports.useState(v.finalDate),[B,G]=i.exports.useState(!1),[x,E]=i.exports.useState(),[h,W]=i.exports.useState();return i.exports.useEffect(()=>{async function f(){await y.get(`/departments?department=${a}`).then(p=>{p.data!=!1&&l(p.data)}).catch(p=>console.log(p))}a!==""&&f()},[a]),i.exports.useEffect(()=>{async function f(){await y.get(`/user-department?department=${u}`).then(p=>{p.data!=!1&&c(p.data)}).catch(p=>console.log(p))}u!==""&&f()},[u]),i.exports.useEffect(()=>{async function f(){try{await y.get(`/atendente-assuming?attendant=${b}&dateStart=${m}&dateFinal=${z}`).then(p=>{if(p.data){let D=[],g=[];p.data.data.map(w=>{const N=le(w._id.day,w._id.month,w._id.year);D.push(N),g.push(w.count)}),E({data:g,description:p.data.description,label:D})}}),await y.get(`/atendente-finished?attendant=${b}&dateStart=${m}&dateFinal=${z}`).then(p=>{if(p.data){let D=[],g=[];p.data.data.map(w=>{const N=le(w._id.day,w._id.month,w._id.year);console.log(w._id.day),console.log(N),D.push(N),g.push(w.count)}),W({data:g,description:p.data.description,label:D})}})}catch(p){console.log(p)}}B===!0&&(f(),G(!1))},[B]),n(F,{children:[e(X,{selected:"Atendente"}),n(yt,{children:[n(bt,{children:[n(wt,{children:[e(Ct,{type:"text",placeholder:"Digite o departamento",onKeyDown:f=>{if(f.key=="Enter"){const p=f.target;d(p.value)}}}),e(vt,{className:"fa fa-search"})]}),n(U,{children:[e(ce,{children:"Inicial:"}),e(K,{value:m,id:"dateStart",type:"date",onChange:f=>Y(f.target.value)})]}),n(U,{children:[e(ce,{children:"Final:"}),e(K,{value:z,id:"dateFinal",type:"date",onChange:f=>Z(f.target.value)})]})]}),n(he,{value:u,onChange:f=>k(f.target.value),children:[e(J,{children:"Selecione um setor"}),o==null?void 0:o.map((f,p)=>e(J,{value:f.id,children:f.name},p))]}),n(St,{value:b,onChange:f=>$(f.target.value),children:[e(J,{children:"Selecione um atendente"}),r==null?void 0:r.map((f,p)=>e(J,{value:f.id,children:f.name},p))]}),e($t,{onClick:f=>G(!0),children:"Pesquisar"}),n(kt,{children:[(x==null?void 0:x.data)&&e(ae,{dataSets:x==null?void 0:x.data,description:x==null?void 0:x.description,labels:x==null?void 0:x.label}),(h==null?void 0:h.data)&&e(ae,{dataSets:h==null?void 0:h.data,description:h==null?void 0:h.description,labels:h==null?void 0:h.label})]})]})]})}const yt=t.div`
    margin: 0 45px 0 290px;
    padding: 35px 25px 0;
`,bt=t.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    animation: animateLeft 2s;
`,wt=t.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 5px 15px 5px 0;
`,Ct=t.input`
    border-radius: 10px;
    width: 220px;
    font-size: 16px;
    padding: 10px 0 10px 20px;
    color: #252525;
    background-color: transparent;
    display: inline;
`,he=t.select`
    width: 210px;
    height: 42px;
    border-radius: 15px;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    color: #252525;
    margin: 0 10px 0 0;
    animation: animateLeft 2s;
`,St=t(he)`
    width: 210px;
`,J=t.option`
    
`,ce=t.span`
    color: #252525;
    padding: 10px;
`,vt=t.i`
    cursor: pointer;
    color: #252525;
    font-size: 24px;
`,kt=t.div`
    padding: 25px 2px 50px;
    max-width: 2000px;
`,$t=t.button`
    width: 120px;
    height: 40px;
    color: #ffffff;
    font-size: 16px;
    background-color: #794ef4;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
`;function Bt(){const[a,d]=i.exports.useState(""),[o,l]=i.exports.useState("");function r(){y.post("/auth/login",{login:a,password:o}).then(c=>{if(c.data.token){window.sessionStorage.setItem("token",c.data.token),window.location.replace("/dashboard");return}}).catch(c=>{console.log(c)})}return e(Dt,{children:n(Nt,{children:[e(pe,{type:"text",placeholder:"Login",onChange:c=>d(c.target.value)}),e(pe,{type:"password",placeholder:"Senha",onChange:c=>l(c.target.value)}),e(Ft,{onClick:r,children:"Acessar"})]})})}const Dt=t.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7a4ef4;
`,Nt=t.div`
    width: 450px;
    height: 300px;
    background-color: #fffffff2;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0rem 1rem hsl(0deg 0% 0% / 20%);
`,pe=t.input`
    background: transparent;
    border: 0px;
    border-bottom: 1px solid #000;
    margin: 20px auto;
    width: 240px;
    padding: 0 5px 5px 5px;
    line-height: 24px;
    color: #000000dd;
    font-size: 17px;
    position: relative;
    &:focus {
        border-bottom: 1px solid #000;

    }
`,Ft=t.button`
    background-color: #794ef4;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: inline;
    box-shadow: 0 0rem 1rem hsl(0deg 0% 0% / 20%);
    margin: 0 5px
`;function It(){return e(me,{basename:"/",children:n($e,{children:[e(R,{path:"/",element:e(Bt,{})}),e(R,{path:"/dashboard",element:e(je,{})}),e(R,{path:"/departamento",element:e(it,{})}),e(R,{path:"/cliente",element:e(ut,{})}),e(R,{path:"/atendente",element:e(gt,{})})]})})}const Mt=new Be;ue.createRoot(document.getElementById("root")).render(e(fe.StrictMode,{children:e(De,{client:Mt,children:e(It,{})})}));

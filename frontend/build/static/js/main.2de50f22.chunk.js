(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{26:function(e,t,c){},59:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c.n(n),a=c(8),j=c.n(a),i=(c(26),c(3)),l=c.n(i),o=c(21),d=c.n(o),b=c(4),r=(c(57),c(1));var m=()=>{const[e,t]=Object(n.useState)([]),[c,s]=Object(n.useState)(null),[a,j]=Object(n.useState)(!1),[i,o]=Object(n.useState)("asc");Object(n.useEffect)((()=>{m()}),[]);const m=()=>{l.a.get("/api/emails").then((e=>{t(e.data)}))},h=e=>{const{name:t,value:c}=e.target;s((e=>e?{...e,[t]:"amount"===t?parseFloat(c):c}:e))};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Email Data"}),Object(r.jsxs)("table",{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"Name"}),Object(r.jsxs)("th",{onClick:()=>{const c="asc"===i?"desc":"asc";o(c);const n=[...e].sort(((e,t)=>e.amount<t.amount?"asc"===c?-1:1:e.amount>t.amount?"asc"===c?1:-1:0));t(n)},style:{cursor:"pointer"},children:["Amount ","asc"===i?"\u2191":"\u2193"]}),Object(r.jsx)("th",{children:"Comments"}),Object(r.jsx)("th",{children:"Actions"})]})}),Object(r.jsx)("tbody",{children:e.length>0?e.map((e=>Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:e.name}),Object(r.jsx)("td",{children:e.amount}),Object(r.jsx)("td",{children:e.comments}),Object(r.jsx)("td",{children:Object(r.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[Object(r.jsx)("button",{onClick:()=>(e=>{s(e),j(!0)})(e),children:"Edit"}),Object(r.jsx)("button",{onClick:()=>{return t=e.id,void l.a.delete("/api/emails/".concat(t)).then((()=>{b.b.success("Email msg deleted successfully"),m()}));var t},children:"Delete"})]})})]},e.id))):Object(r.jsx)("tr",{children:Object(r.jsx)("td",{colSpan:4,children:"No Emails Found"})})})]}),Object(r.jsx)(d.a,{isOpen:a,onRequestClose:()=>{j(!1),s(null)},contentLabel:"Edit Email",children:c&&Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Edit Email"}),Object(r.jsx)("input",{type:"text",name:"name",value:c.name,onChange:h}),Object(r.jsx)("input",{type:"number",name:"amount",value:c.amount,onChange:h}),Object(r.jsx)("input",{type:"text",name:"comments",value:c.comments,onChange:h}),Object(r.jsx)("button",{onClick:()=>{c&&l.a.put("/api/emails/".concat(c.id),c).then((()=>{b.b.success("Email msg updated successfully"),m(),j(!1)}))},children:"Update Email"})]})}),Object(r.jsx)(b.a,{}),Object(r.jsx)("div",{children:Object(r.jsxs)("h2",{children:["Example of an email to send to alfonsoayo7@gmail.com",Object(r.jsx)("br",{})," Put the content below in the body of the message"]})}),Object(r.jsxs)("div",{children:["name: John Doe ",Object(r.jsx)("br",{}),"Amount: 363.45 ",Object(r.jsx)("br",{}),"Comment: This is a test comment ",Object(r.jsx)("br",{})]})]})};j.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(m,{})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.2de50f22.chunk.js.map
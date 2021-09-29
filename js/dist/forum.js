module.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=18)}([function(t,e){t.exports=flarum.core.compat.extend},function(t,e,o){"use strict";function n(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}o.d(e,"a",(function(){return n}))},function(t,e){t.exports=flarum.core.compat.Model},function(t,e){t.exports=flarum.core.compat["tags/models/Tag"]},function(t,e){t.exports=flarum.core.compat["common/components/Button"]},,function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e){t.exports=flarum.core.compat["common/Model"]},function(t,e){t.exports=flarum.core.compat["common/models/Discussion"]},function(t,e){t.exports=flarum.core.compat["forum/components/ReplyComposer"]},function(t,e){t.exports=flarum.core.compat["forum/utils/DiscussionControls"]},function(t,e){t.exports=flarum.core.compat["common/components/Modal"]},function(t,e){t.exports=flarum.core.compat["common/utils/Stream"]},function(t,e){t.exports=flarum.core.compat["components/IndexPage"]},function(t,e){t.exports=flarum.core.compat["tags/components/TagDiscussionModal"]},,,,function(t,e,o){"use strict";o.r(e);var n=o(6),r=o(7),a=o.n(r),s=o(8),i=o.n(s),p=o(4),c=o.n(p),u=o(9),l=o.n(u),f=o(10),d=o.n(f),y=o(1),g=o(11),b=o.n(g),v=o(12),h=o.n(v),x=function(t){function e(){return t.apply(this,arguments)||this}Object(y.a)(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.discussion=this.attrs.discussion,this.replyTemplate=h()(this.discussion.replyTemplate())},o.className=function(){return"ReplyTemplateModal Modal"},o.title=function(){return app.translator.trans("askvortsov-discussion-templates.forum.reply_template.title")},o.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"Form-group"},m("textarea",{className:"FormControl",bidi:this.replyTemplate,rows:"6"})),m("div",{className:"Form-group"},c.a.component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading},app.translator.trans("askvortsov-discussion-templates.forum.reply_template.submit_button")))))},o.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var o=this.replyTemplate();if(o!==this.discussion.replyTemplate())return this.discussion.save({replyTemplate:o}).then((function(){m.redraw(),e.hide()})).catch((function(){e.loading=!1,m.redraw()}));this.hide()},e}(b.a);var T=o(0),_=o(13),O=o.n(_),j=o(2),M=o.n(j),C=o(3),k=o.n(C),N=o(14),w=o.n(N);function B(){if(app.composer.fields.tags){var t=app.composer.body.attrs.originalContent||"",e=app.composer.fields.content().trim();if(e===t||app.forum.attribute("appendTemplateOnTagChange")){var o={};app.composer.fields.tags.forEach((function(t){null!==t.position()&&t.template()&&(o[t.id()]=t.template())}));var n=Object.keys(o);if(2===n.length){var r=app.store.getById("tags",n[0]),a=app.store.getById("tags",n[1]);r.parent()===a&&delete o[n[1]],a.parent()===r&&delete o[n[0]]}if(1===Object.keys(o).length){var s=Object.values(o)[0];e===t?app.composer.body.attrs.originalContent=s:s="\n\n"+s,app.composer.editor.insertAtCursor(s,!1)}}}}app.initializers.add("askvortsov/flarum-discussion-templates",(function(){i.a.prototype.replyTemplate=a.a.attribute("replyTemplate"),i.a.prototype.canManageReplyTemplates=a.a.attribute("canManageReplyTemplates"),Object(n.extend)(l.a,"initAttrs",(function(t,e){e.originalContent||(e.originalContent=e.discussion.replyTemplate())})),Object(n.extend)(d.a,"userControls",(function(t,e){app.session.user&&e.canManageReplyTemplates()&&t.add("reply-template",m(c.a,{icon:"fas fa-reply",onclick:function(){return app.modal.show(x,{discussion:e})}},app.translator.trans("askvortsov-discussion-templates.forum.discussion_controls.reply_template_button")))})),k.a.prototype.template=M.a.attribute("template"),Object(T.extend)(O.a.prototype,"newDiscussionAction",(function(t){t.then((function(t){if(t.fields.tags.length>0)B();else{var e=app.forum.attribute("askvortsov-discussion-templates.no_tag_template");e&&t.editor.insertAtCursor(e,!1)}})).catch((function(){}))})),Object(T.extend)(w.a.prototype,"onremove",(function(){app.composer.fields.tags&&app.composer.fields.tags.length>0&&B()}))}))}]);
//# sourceMappingURL=forum.js.map
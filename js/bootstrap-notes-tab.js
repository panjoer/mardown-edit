/*! markdown-notepad v0.1.0 2016-05-20 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery","js-shortid"],a):"object"==typeof exports?a(require("jquery"),require("js-shortid")):window.jQuery&&a(window.jQuery,window.shortid||{gen:function(){for(var a=(new Date).getTime();a===(new Date).getTime(););return(new Date).getTime()}})}(function(a,b){var c=function(b,c){var d=this;d._el=b,d._opt=c,d._seq=1,d._msgbox=c.msgbox;var e=a(b).on("click","a",a.proxy(d._selectTab,d)),f=a(".notes-tab-menu",e.parent());f.length>0&&(d._ctxMenu=f[0],e.on("contextmenu","li[data-note-uid]",a.proxy(d._contextmenu,d)),f.on("click","a",a.proxy(d._ctxMenuClick,d)))};c.prototype={constructor:c,create:function(c,d){var e=this,f=a(e._el),g=c;a.isArray(c)||(g=[c]);for(var h=0;h<g.length;h++)g[h].uid||(g[h].uid=b.gen()),f.trigger("create.bs.tab",g[h]),e._create(g[h],d)},_create:function(b,c){var d=this,e=d.activeUid(),f=a(d._el),g=a('<li data-note-uid="'+b.uid+'"><a href="#" data-toggle="tab" title="'+(b.path||b.name)+'"><i class="glyphicon glyphicon-file '+(b.unsaved?"text-danger":"")+'"></i>&nbsp;<span>'+b.name+'</span><button class="btn btn-default btn-xs" aria-label="Close">&times;</button></a></li>').insertBefore(a("li",f).last());f.trigger("created.bs.tab",[b]),c&&a("a",g).tab("show"),d.lastuid=e},_close:function(b){var c=this,d=a(c._el),e=c.activeUid(),f=b.data("note-uid");b.remove(),d.trigger("closed.bs.tab",[f]),e===f&&(c.lastuid&&c.lastuid!==e?a("li[data-note-uid="+c.lastuid+"] a",d).tab("show"):a("li[data-note-uid]:first a",d).tab("show")),c.lastuid=null},closeAll:function(){var b=this,c=b._el,d=a("li[data-note-uid]",c),e=a(b._msgbox).data("msgbox");e.confirm("Are you sure to close all?",function(c){switch(c){case 1:d.each(function(){b._close(a(this))})}})},closeOthers:function(b){var c=this,d=c._el,e=null,f=a(c._msgbox).data("msgbox");e=b?a('li[data-note-uid]:not([data-note-uid="'+b+'"])',d):a("li[data-note-uid]:not(.active)",d),f.confirm("Are you sure to close others?",function(b){switch(b){case 1:e.each(function(){c._close(a(this))})}})},activeUid:function(){return a("li.active",this._el).data("note-uid")},_selectTab:function(b){var c=this,d=a(b.target),e=a(b.currentTarget),f=e.parent(),g=f.data("note-uid");return d.is(".btn")?(b.preventDefault(),void c._evalClose(g)):void(null!=g&&void 0!==g&&-1!==g?c.selectTab(g):c.createUntitled())},selectTab:function(b){var c=this,d=a(c._el),e=b.uid||b,f=a("li[data-note-uid="+e+"]",d),g=c.activeUid();e!==g&&(f.tab("show"),d.trigger("selected.bs.tab",[e]),c.lastuid=g)},open:function(b,c){var d=this,e=d._el,f=a("li[data-note-uid="+b.uid+"]",e);0===f.size()&&(f=d.createTag(b)),void 0!==c&&null!=c&&c!==!1||a("a",f).tab("show")},_evalClose:function(b){var c=this,d=a(c._el);d.trigger("close.bs.tab",[b]);var e=a._data(c._el,"events").close;void 0!==e&&0!==e.length||c.close(b)},close:function(b){var c=this,d=c._el,e=b?a("li[data-note-uid="+(b.uid||b)+"]",d):a("li.active",d);c._close(e)},doRename:function(b){var c=this,d=c._el,e=b?a("li[data-note-uid="+b.uid+"]",d):a("li.active",d);a("span",e).text(b.name)},rename:function(b){var c=this,d=b||a("li.active",c._el),e=d.data("note-uid"),f=a(c._msgbox).data("msgbox");"undefined"!=typeof chrome&&chrome.fileSystem?a(c._el).trigger("rename.bs.tab",[e]):f.prompt(a("span",d).text(),function(b,d){a(c._el).trigger("rename.bs.tab",[e,d,b])},"Rename","File Name")},createUntitled:function(){var a=this,b={name:"Untitled"+a._seq};return a.create(b,!0),a._seq++,b},markUnsaved:function(b,c){var d=this,e=d._el,f=null;if(c){var g=c.uid||c;f=a('li[data-note-uid="'+g+'"] i',e)}else f=a("li.active i",e);b?f.is(".text-danger")&&f.removeClass("text-danger"):f.is(".text-danger")||f.addClass("text-danger")},_contextmenu:function(b){var c=this,d=b.clientX||b.offsetX||b.layerX,e=b.clientY||b.offsetY||b.layerY;a(c._ctxMenu).css({display:"block",left:d,top:e}).show(),c._ctxItem=b.currentTarget,b.preventDefault(),b.stopPropagation()},_ctxMenuClick:function(b){a(b.delegateTarget).hide();var c=this,d=a(b.target),e=d.data("nts-cmd"),f=a(c._ctxItem),g=f.data("note-uid");switch(e){case"close":c._evalClose(g);break;case"closeOthers":c.closeOthers(g);break;case"closeAll":c.closeAll();break;case"rename":c.rename(f)}},hideCtxMenu:function(){var b=this;b._ctxMenu&&a(b._ctxMenu).hide()},count:function(){return a("li[data-note-uid]",this._el).size()}},a.fn.notestab=function(b){var d=arguments;return this.each(function(){var e=this,f=a(e),g=f.data("notestab"),h="object"==typeof b?b:{};g||"string"==typeof b?"string"==typeof b&&g[b].apply(g,Array.prototype.slice.call(d,1)):f.data("notestab",new c(e,a.extend(h,f.data())))})},a(document).on("click",function(){a(".notes-tab").notestab("hideCtxMenu")})});
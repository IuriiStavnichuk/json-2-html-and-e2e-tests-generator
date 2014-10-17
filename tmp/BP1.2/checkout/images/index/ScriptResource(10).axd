﻿Type.registerNamespace("AjaxControlToolkit");AjaxControlToolkit.ModalPopupRepositionMode=function(){throw Error.invalidOperation();};AjaxControlToolkit.ModalPopupRepositionMode.prototype={None:0,RepositionOnWindowResize:1,RepositionOnWindowScroll:2,RepositionOnWindowResizeAndScroll:3};AjaxControlToolkit.ModalPopupRepositionMode.registerEnum("AjaxControlToolkit.ModalPopupRepositionMode");AjaxControlToolkit.ModalPopupBehavior=function(d){var c=false,b=null,a=this;AjaxControlToolkit.ModalPopupBehavior.initializeBase(a,[d]);a._PopupControlID=b;a._PopupDragHandleControlID=b;a._BackgroundCssClass=b;a._DropShadow=c;a._Drag=c;a._OkControlID=b;a._CancelControlID=b;a._OnOkScript=b;a._OnCancelScript=b;a._xCoordinate=-1;a._yCoordinate=-1;a._repositionMode=AjaxControlToolkit.ModalPopupRepositionMode.RepositionOnWindowResizeAndScroll;a._backgroundElement=b;a._foregroundElement=b;a._relativeOrAbsoluteParentElement=b;a._popupElement=b;a._dragHandleElement=b;a._showHandler=b;a._okHandler=b;a._cancelHandler=b;a._scrollHandler=b;a._resizeHandler=b;a._windowHandlersAttached=c;a._dropShadowBehavior=b;a._dragBehavior=b;a._isIE6=c;a._saveTabIndexes=[];a._saveDesableSelect=[];a._tagWithTabIndex=["A","AREA","BUTTON","INPUT","OBJECT","SELECT","TEXTAREA","IFRAME"]};AjaxControlToolkit.ModalPopupBehavior.prototype={initialize:function(){var b="click",a=this;AjaxControlToolkit.ModalPopupBehavior.callBaseMethod(a,"initialize");a._isIE6=Sys.Browser.agent==Sys.Browser.InternetExplorer&&Sys.Browser.version<7;if(a._PopupDragHandleControlID)a._dragHandleElement=$get(a._PopupDragHandleControlID);a._popupElement=$get(a._PopupControlID);if(a._DropShadow){a._foregroundElement=document.createElement("div");a._foregroundElement.id=a.get_id()+"_foregroundElement";a._popupElement.parentNode.appendChild(a._foregroundElement);a._foregroundElement.appendChild(a._popupElement)}else a._foregroundElement=a._popupElement;a._backgroundElement=document.createElement("div");a._backgroundElement.id=a.get_id()+"_backgroundElement";a._backgroundElement.style.display="none";if(Sys.Browser.agent==Sys.Browser.InternetExplorer&&document.compatMode!="CSS1Compat")a._backgroundElement.style.position="absolute";else a._backgroundElement.style.position="fixed";a._backgroundElement.style.left="0px";a._backgroundElement.style.top="0px";a._backgroundElement.style.zIndex=1e4;if(a._BackgroundCssClass)a._backgroundElement.className=a._BackgroundCssClass;$common.appendElementToFormOrBody(a._foregroundElement);$common.appendElementToFormOrBody(a._backgroundElement);a._foregroundElement.style.display="none";a._foregroundElement.style.position="fixed";a._foregroundElement.style.zIndex=$common.getCurrentStyle(a._backgroundElement,"zIndex",a._backgroundElement.style.zIndex)+1;a._showHandler=Function.createDelegate(a,a._onShow);$addHandler(a.get_element(),b,a._showHandler);if(a._OkControlID){a._okHandler=Function.createDelegate(a,a._onOk);$addHandler($get(a._OkControlID),b,a._okHandler)}if(a._CancelControlID){a._cancelHandler=Function.createDelegate(a,a._onCancel);$addHandler($get(a._CancelControlID),b,a._cancelHandler)}a._scrollHandler=Function.createDelegate(a,a._onLayout);a._resizeHandler=Function.createDelegate(a,a._onLayout);a.registerPartialUpdateEvents()},dispose:function(){var c="click",b=null,a=this;a._hideImplementation();if(a._foregroundElement&&a._foregroundElement.parentNode){a._backgroundElement.parentNode.removeChild(a._backgroundElement);if(a._DropShadow){a._foregroundElement.parentNode.appendChild(a._popupElement);a._foregroundElement.parentNode.removeChild(a._foregroundElement)}}a._scrollHandler=b;a._resizeHandler=b;if(a._cancelHandler&&$get(a._CancelControlID)){$removeHandler($get(a._CancelControlID),c,a._cancelHandler);a._cancelHandler=b}if(a._okHandler&&$get(a._OkControlID)){$removeHandler($get(a._OkControlID),c,a._okHandler);a._okHandler=b}if(a._showHandler){$removeHandler(a.get_element(),c,a._showHandler);a._showHandler=b}AjaxControlToolkit.ModalPopupBehavior.callBaseMethod(a,"dispose")},_attachPopup:function(){var b=null,a=this;if(a._DropShadow&&!a._dropShadowBehavior)a._dropShadowBehavior=$create(AjaxControlToolkit.DropShadowBehavior,{},b,b,a._popupElement);if(a._dragHandleElement&&!a._dragBehavior)a._dragBehavior=$create(AjaxControlToolkit.FloatingBehavior,{handle:a._dragHandleElement},b,b,a._foregroundElement);$addHandler(window,"resize",a._resizeHandler);$addHandler(window,"scroll",a._scrollHandler);a._windowHandlersAttached=true},_detachPopup:function(){var a=this;if(a._windowHandlersAttached){a._scrollHandler&&$removeHandler(window,"scroll",a._scrollHandler);a._resizeHandler&&$removeHandler(window,"resize",a._resizeHandler);a._windowHandlersAttached=false}if(a._dragBehavior){a._dragBehavior.dispose();a._dragBehavior=null}if(a._dropShadowBehavior){a._dropShadowBehavior.dispose();a._dropShadowBehavior=null}},_onShow:function(a){if(!this.get_element().disabled){this.show();a.preventDefault();return false}},_onOk:function(c){var a=this,b=$get(a._OkControlID);if(b&&!b.disabled){a.hide()&&a._OnOkScript&&window.setTimeout(a._OnOkScript,0);c.preventDefault();return false}},_onCancel:function(c){var a=this,b=$get(a._CancelControlID);if(b&&!b.disabled){a.hide()&&a._OnCancelScript&&window.setTimeout(a._OnCancelScript,0);c.preventDefault();return false}},_onLayout:function(c){var b=this,a=b.get_repositionMode();if((a===AjaxControlToolkit.ModalPopupRepositionMode.RepositionOnWindowScroll||a===AjaxControlToolkit.ModalPopupRepositionMode.RepositionOnWindowResizeAndScroll)&&c.type==="scroll")b._layout();else if((a===AjaxControlToolkit.ModalPopupRepositionMode.RepositionOnWindowResize||a===AjaxControlToolkit.ModalPopupRepositionMode.RepositionOnWindowResizeAndScroll)&&c.type==="resize")b._layout();else b._layoutBackgroundElement()},show:function(){var c="absolute",a=this,d=new Sys.CancelEventArgs;a.raiseShowing(d);if(d.get_cancel())return;a.populate();a._attachPopup();a._backgroundElement.style.display="";a._foregroundElement.style.display="";a._popupElement.style.display="";if(a._isIE6){a._foregroundElement.style.position=c;a._backgroundElement.style.position=c;var b=a._foregroundElement.parentNode;while(b&&b!=document.documentElement)if(b.style.position!="relative"&&b.style.position!=c)b=b.parentNode;else{a._relativeOrAbsoluteParentElement=b;break}}a.disableTab();a._layout();a._layout();a.raiseShown(Sys.EventArgs.Empty)},disableTab:function(){var c=this,d=0,a,f=[];Array.clear(c._saveTabIndexes);for(var e=0;e<c._tagWithTabIndex.length;e++){a=c._foregroundElement.getElementsByTagName(c._tagWithTabIndex[e]);for(var b=0;b<a.length;b++){f[d]=a[b];d++}}d=0;for(var e=0;e<c._tagWithTabIndex.length;e++){a=document.getElementsByTagName(c._tagWithTabIndex[e]);for(var b=0;b<a.length;b++)if(Array.indexOf(f,a[b])==-1){c._saveTabIndexes[d]={tag:a[b],index:a[b].tabIndex};a[b].tabIndex="-1";d++}}d=0;if(Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.version<7){for(var g=[],e=0;e<c._tagWithTabIndex.length;e++){a=c._foregroundElement.getElementsByTagName("SELECT");for(var b=0;b<a.length;b++){g[d]=a[b];d++}}d=0;Array.clear(c._saveDesableSelect);a=document.getElementsByTagName("SELECT");for(var b=0;b<a.length;b++)if(Array.indexOf(g,a[b])==-1){c._saveDesableSelect[d]={tag:a[b],visib:$common.getCurrentStyle(a[b],"visibility")};a[b].style.visibility="hidden";d++}}},restoreTab:function(){var a=this;for(var b=0;b<a._saveTabIndexes.length;b++)a._saveTabIndexes[b].tag.tabIndex=a._saveTabIndexes[b].index;Array.clear(a._saveTabIndexes);if(Sys.Browser.agent===Sys.Browser.InternetExplorer&&Sys.Browser.version<7){for(var c=0;c<a._saveDesableSelect.length;c++)a._saveDesableSelect[c].tag.style.visibility=a._saveDesableSelect[c].visib;Array.clear(a._saveDesableSelect)}},hide:function(){var a=new Sys.CancelEventArgs;this.raiseHiding(a);if(a.get_cancel())return false;this._hideImplementation();this.raiseHidden(Sys.EventArgs.Empty);return true},_hideImplementation:function(){var a=this;a._backgroundElement.style.display="none";a._foregroundElement.style.display="none";a.restoreTab();a._detachPopup()},_layout:function(){var b="px",g="absolute",a=this,e=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,f=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,h=$common.getClientBounds(),l=h.width,k=h.height;a._layoutBackgroundElement();var c=0,d=0;if(a._xCoordinate<0){var j=a._foregroundElement.offsetWidth?a._foregroundElement.offsetWidth:a._foregroundElement.scrollWidth;c=(l-j)/2;if(a._foregroundElement.style.position==g)c+=e;a._foregroundElement.style.left=c+b}else if(a._isIE6){a._foregroundElement.style.left=a._xCoordinate+e+b;c=a._xCoordinate+e}else{a._foregroundElement.style.left=a._xCoordinate+b;c=a._xCoordinate}if(a._yCoordinate<0){var i=a._foregroundElement.offsetHeight?a._foregroundElement.offsetHeight:a._foregroundElement.scrollHeight;d=(k-i)/2;if(a._foregroundElement.style.position==g)d+=f;a._foregroundElement.style.top=d+b}else if(a._isIE6){a._foregroundElement.style.top=a._yCoordinate+f+b;d=a._yCoordinate+f}else{a._foregroundElement.style.top=a._yCoordinate+b;d=a._yCoordinate}a._layoutForegroundElement(c,d);if(a._dropShadowBehavior){a._dropShadowBehavior.setShadow();window.setTimeout(Function.createDelegate(a,a._fixupDropShadowBehavior),0)}a._layoutBackgroundElement()},_layoutForegroundElement:function(d,e){var a=this;if(a._isIE6&&a._relativeOrAbsoluteParentElement){var c=$common.getLocation(a._foregroundElement),b=$common.getLocation(a._relativeOrAbsoluteParentElement),f=c.x;if(f!=d)a._foregroundElement.style.left=d-b.x+"px";var g=c.y;if(g!=e)a._foregroundElement.style.top=e-b.y+"px"}},_layoutBackgroundElement:function(){var b="px",a=this;if(a._isIE6){var c=$common.getLocation(a._backgroundElement),d=c.x;if(d!=0)a._backgroundElement.style.left=-d+b;var e=c.y;if(e!=0)a._backgroundElement.style.top=-e+b}var f=$common.getClientBounds(),h=f.width,g=f.height;if(Sys.Browser.agent==Sys.Browser.InternetExplorer&&document.compatMode!="CSS1Compat"){a._backgroundElement.style.width=document.body.scrollWidth+b;a._backgroundElement.style.height=document.body.scrollHeight+b}else{a._backgroundElement.style.width=Math.max(Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),h)+b;a._backgroundElement.style.height=Math.max(Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),g)+b}},_fixupDropShadowBehavior:function(){this._dropShadowBehavior&&this._dropShadowBehavior.setShadow()},_partialUpdateEndRequest:function(d,b){var a=this;AjaxControlToolkit.ModalPopupBehavior.callBaseMethod(a,"_partialUpdateEndRequest",[d,b]);if(a.get_element()){var c=b.get_dataItems()[a.get_element().id];if("show"==c)a.show();else"hide"==c&&a.hide()}a._layout()},_onPopulated:function(b,a){AjaxControlToolkit.ModalPopupBehavior.callBaseMethod(this,"_onPopulated",[b,a]);this._layout()},get_PopupControlID:function(){return this._PopupControlID},set_PopupControlID:function(a){if(this._PopupControlID!=a){this._PopupControlID=a;this.raisePropertyChanged("PopupControlID")}},get_X:function(){return this._xCoordinate},set_X:function(a){if(this._xCoordinate!=a){this._xCoordinate=a;this.raisePropertyChanged("X")}},get_Y:function(){return this._yCoordinate},set_Y:function(a){if(this._yCoordinate!=a){this._yCoordinate=a;this.raisePropertyChanged("Y")}},get_PopupDragHandleControlID:function(){return this._PopupDragHandleControlID},set_PopupDragHandleControlID:function(a){if(this._PopupDragHandleControlID!=a){this._PopupDragHandleControlID=a;this.raisePropertyChanged("PopupDragHandleControlID")}},get_BackgroundCssClass:function(){return this._BackgroundCssClass},set_BackgroundCssClass:function(a){if(this._BackgroundCssClass!=a){this._BackgroundCssClass=a;this.raisePropertyChanged("BackgroundCssClass")}},get_DropShadow:function(){return this._DropShadow},set_DropShadow:function(a){if(this._DropShadow!=a){this._DropShadow=a;this.raisePropertyChanged("DropShadow")}},get_Drag:function(){return this._Drag},set_Drag:function(a){if(this._Drag!=a){this._Drag=a;this.raisePropertyChanged("Drag")}},get_OkControlID:function(){return this._OkControlID},set_OkControlID:function(a){if(this._OkControlID!=a){this._OkControlID=a;this.raisePropertyChanged("OkControlID")}},get_CancelControlID:function(){return this._CancelControlID},set_CancelControlID:function(a){if(this._CancelControlID!=a){this._CancelControlID=a;this.raisePropertyChanged("CancelControlID")}},get_OnOkScript:function(){return this._OnOkScript},set_OnOkScript:function(a){if(this._OnOkScript!=a){this._OnOkScript=a;this.raisePropertyChanged("OnOkScript")}},get_OnCancelScript:function(){return this._OnCancelScript},set_OnCancelScript:function(a){if(this._OnCancelScript!=a){this._OnCancelScript=a;this.raisePropertyChanged("OnCancelScript")}},get_repositionMode:function(){return this._repositionMode},set_repositionMode:function(a){if(this._repositionMode!==a){this._repositionMode=a;this.raisePropertyChanged("RepositionMode")}},add_showing:function(a){this.get_events().addHandler("showing",a)},remove_showing:function(a){this.get_events().removeHandler("showing",a)},raiseShowing:function(b){var a=this.get_events().getHandler("showing");a&&a(this,b)},add_shown:function(a){this.get_events().addHandler("shown",a)},remove_shown:function(a){this.get_events().removeHandler("shown",a)},raiseShown:function(b){var a=this.get_events().getHandler("shown");a&&a(this,b)},add_hiding:function(a){this.get_events().addHandler("hiding",a)},remove_hiding:function(a){this.get_events().removeHandler("hiding",a)},raiseHiding:function(b){var a=this.get_events().getHandler("hiding");a&&a(this,b)},add_hidden:function(a){this.get_events().addHandler("hidden",a)},remove_hidden:function(a){this.get_events().removeHandler("hidden",a)},raiseHidden:function(b){var a=this.get_events().getHandler("hidden");a&&a(this,b)}};AjaxControlToolkit.ModalPopupBehavior.registerClass("AjaxControlToolkit.ModalPopupBehavior",AjaxControlToolkit.DynamicPopulateBehaviorBase);AjaxControlToolkit.ModalPopupBehavior.invokeViaServer=function(b,c){var a=$find(b);if(a)if(c)a.show();else a.hide()};
/*!
	Machli - Simple Plain Creative Bootstrap Template
 	Copyright (c) 2013, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 1.0.0
	Release Date: November 2013
	
	Built using: jQuery 		version:1.6.2	http://jquery.com/
	jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	
 */


(function( $ ){	
	
	function mainFm(selector, params){
		
		var defaults = $.extend({}, {
				
				// default variables
				
				onePage : true,						// Set whether this template will work as one page or separate page 				
				
				currentPage : "!home",				// Set the current page

				animationSpeed : 1000,				// Default animation speed
				
				slideshowSpeed : 5000,				// Flexslider slideshow delaytime on porfolio detail page 
				
				menuAutoHide : undefined, 				// Menu auto hide enable/disable
				
				homeSliderThumbnail : false			// Home slider thumbnail 
				
			} , params);

			
// Initialize required variables and objects
			var self = this;
			self.pageHolderHeight_desktop = self.pgHigDesk = "100%";
			self.pageHolderHeight_ipad = self.pgHigIpad = "100%";
			self.winWidth =  self.oriWidth =  $(window).width();
			self.winHeight =   $(window).height();
			self.IE_old = $.browser.msie;
			self.mobile = self.oriWidth <= 959;
			self.midMobile = self.oriWidth <= 767 && self.oriWidth > 479;
			self.minMobile = self.oriWidth <= 480;
			self.mobileDevice = screen.width < 1024 && screen.height < 1024;
			ipad = (self.oriWidth === 768 || $(window).height() === 768) && (self.oriWidth === 1024 || $(window).height() === 1024) ;
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.navTop = self.oriWidth <= 959;	
			self.aniSpeed = defaults.animationSpeed;
			self.flxDelay =  flxDelay = defaults.slideshowSpeed;
						
			self.isoAniFin = false;
			
			self.onePage = onePageVersion = defaults.onePage;
			
			self.headerHeight = topMenuHeight;
			
			self.menuAutoHide = defaults.menuAutoHide !== undefined ? defaults.menuAutoHide : menuAutoHide;

			self.bdy = $("body");

			self.pageHeader = $(".header");
			self.foot = $(".footer");		
			self.navUl = $('.setNavType .nav');
			self.backPage  = $('#backArea');
			
			self.setting_tool = $(".setting_tools");
			
			self.bdy.data("width", Number(self.oriWidth));
			self.bdy.data("height", Number($(window).height()));

			self.pageLoaded = false;
			self.homePage = defaults.currentPage;
			self.pageLoadfinished = false;
			self.projFm = false;
			self.apis = [];
			self.ff = -1;
			
			self.singleBg = true;
			
			self.curPageview;
			
			self.superSlider = typeof superGalleryInit !== "undefined" && typeof superGalleryInit !== undefined;

			
			self.cM = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]').parent();
			self.cM_= $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');			
			
			leftMenu = $(".setNavType").hasClass("leftNav") && !$(".setNavType").hasClass("topNav");			
			
			if(leftMenu){				
				if(!$(".setNavType").hasClass("leftNav")){ $(".setNavType").addClass("leftNav"); }
				if($(".setNavType").hasClass("topNav")){ $(".setNavType").removeClass("topNav"); }				
				if($("body").hasClass("topMenu")){ $("body").removeClass("topMenu"); }			
			}
			
			if(!leftMenu){				
				if($(".setNavType").hasClass("leftNav")){ $(".setNavType").removeClass("leftNav"); }
				if(!$(".setNavType").hasClass("topNav")){ $(".setNavType").addClass("topNav"); }				
				if(!$("body").hasClass("topMenu")){ $("body").addClass("topMenu"); }
			}
			
			self.menuLeft = $(".setNavType").hasClass("leftNav");
			if(!$(".setNavType").hasClass("leftNav")){
				$(".setNavType").addClass("topNav");
				$("body").addClass("topMenu");
			}
			self.menuLeft = $(".setNavType").hasClass("leftNav");
			
			if(self.menuLeft ){ 
				$(".header_content").removeClass("container"); 
				$(".header_content").removeClass("container-fluid"); 
			}
			
			self.headerHeight = self.menuLeft ? 0 : topMenuHeight;
			
			if(!Modernizr_.csstransforms3d && !isTouch && !browserWebkit){
				if($(".container .overlay .middle_align").length > 0){
					$(".overlay .middle_align").css({"top":"20%", "left":"30%"});
				}else{
					$(".overlay .middle_align").css({"top":"30%", "left":"35%"});
				}
			}
			
			
			// Set retina support image
			self.bdy.find('img').each(function() {
				if($(this).attr('data-retina') === "yes" && retinaDevice){
					var img_Src = $(this).attr('src').split(".");
					$(this).attr('src', img_Src[0]+"@2x."+ img_Src[1] )
				}
			});
			
			self.templateSetting();			
			
				
			// create pade fadeout layer
			self.page_Fade = $(".pageFade");

			self.bdy.prepend('<div id="dumDiv" style="position:absolute"> </div>');	
			self.dumDiv = self.bdy.children(':first-child');
			
			self.navArry = [];
			$('.contentWrapper').each(function(){
				var n_spt = $(this);
				if(n_spt.attr("data-id") !== undefined){
					self.navArry.push($(this));
				}					
			});
			

			self.scrollbarLoad();
						
			// Initialize the site after the required time interval

			$("#supersized").css({"opacity":0});			
			self.bdy.css("display","block");
			
			var imgy = !isMobileChk ? 	$(".homeSlider").attr("data-src") : ($(".homeSlider").attr("data-src-small") 	? 
			$(".homeSlider").attr("data-src-small")  : $(".homeSlider").attr("data-src"));	
			
			if(imgy !== undefined && imgy !== ""){
				preLoadImgs.push(imgy);
			}else{
				imgy = undefined;
			}	
			
			
			var ik = 0;
			function intImgLoad (img){
				
				var $img;
				$img = $('<img />');
				$img.hide();

				$img.attr('src', img).load(function() {
					
					  if(ik < preLoadImgs.length-1){
						ik = ik+1;
						intImgLoad(preLoadImgs[ik]);
					  }else{
						siteStartOpen = true;
					  }
					  $(this).remove();
				}).error(function () {					
					  if(ik < preLoadImgs.length-1){
						ik = ik+1;
						intImgLoad(preLoadImgs[ik]);
					  }else{
						siteStartOpen = true;
					  }
					  $(this).remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
			}			
  
			if(preLoadImgs.length>0){
				intImgLoad(preLoadImgs[ik]);
			}else{
				siteStartOpen = true;
			}
			 
			var szz = false;
			if(self.superSlider){
				if(($(".homeSlider").hasClass("bannerHeight") || $(".homeSlider").hasClass("banner_miniHeight")) && $("#supersized").height() !== null ){
					$("#supersized").css( { "height":$(".homeSlider").height()+"px" });
				}	
			 }else{
				 superFirLoad = true;
			 }
			 
			var intV = setInterval(function() {	

				if(siteStartOpen){
					
					if(self.superSlider && !szz){
					   szz = true;
					   superGalleryInit();
				   }
				   
					if(superFirLoad){
						  clearInterval(intV);
						  setTimeout( function(){ 
						  
						  self.findDeviceType();
						  
						  self.initialize();
						  
						  if($("#supersized").height() !== null){
							  if(!self.mobile){
								  $("#supersized").animate({"opacity":1}, 1500, "easeInOutQuart" );
								  $("#superNav").fadeIn(1000, "easeInOutQuart" );								
								//  $(".supersized-nav").fadeIn(500, "easeInOutQuart" );
							  }else{
								  $("#supersized").show().css({"opacity":1});
								  $("#superNav").show();					
								//  $(".supersized-nav").show();
							  }							
							  if(self.superSlider && defaults.homeSliderThumbnail ){
								  api.min_thumb();
								  }
						  }				
					  
						  if(!self.mobile){
							  self.pageHeader.fadeIn(500, "easeInOutQuart" );
							  $(".homeSlider").fadeIn(500, "easeInOutQuart" );
						  }else{
							  self.pageHeader.show();
							  $(".homeSlider").show();
						  }						
						  
						  
						  if(!self.onePage){		
							  $("body").find('.addVideo').each(function(){
								  var vid = $(this);
								  var kk = false;
								  $(this).find('img').each(function(){
									  kk = true;
								  });
								  if(!kk ){
									  vid.data("added", true);
									  var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
									  var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
									  var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
									  if(H === "100%"){
										  vid.css({"height":"100%"});
									  }
									  vid.prepend('<div class="vid"></div>');
									  vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
								  }
							  });
							  
							  $("body").data("bgType",isMobileChk);	
							  
						  }	
						  
						  
						  $("body").find('.parallax').each(function(){
							  var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
							  var imgAtt = !isTouch ? "fixed" : "scroll";
							  if(img !== undefined){
								  $(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
							  }
						  });
		  
					  }, 200);
				  }
			  
			  }

			},200);

			

// Page buttons ==================================================================
			
			
			// Page scrollUp button
			self.pgScrUp =  $(".move_up, .goTop");
			
			$(".pgScrollUp, .move_up, .goTop, .logo a").click(function(){
				if(self.url !== self.homePg && self.onePage){
					window.location.href = "#"+self.homePg;
				}else{
					self.scrollObj.stop().animate({ scrollTop: "0px" }, 500, "easeInOutQuart" );
				}
				
				self.menuPosition();				
				
			});
			
			// Cache the Window object
			self.scrollObj = $("body, html");
			self.$html = $("html");
			self.$window = $("body");
			
			
			// Window scroll event
			
			$(window).scroll(function() {
				
				clearInterval(self.scrIntr);
				self.scrIntr = setInterval(function(){
					clearInterval(self.scrIntr);
					self.scrollPos = scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();
					if(self.scrollPos > 150){
						$(".previousPage, .nextPage").addClass("autoPosition");
						$(".pgScrollUp").fadeIn(200);
					}else{
						$(".previousPage").removeClass("autoPosition");
						$(".pgScrollUp").fadeOut(200);
					}
					
					if(self.superSlider){
						if(self.onePage){
							if(self.scrollPos > self.winHeight-5){
								$("#supersized .prevslide, #supersized .activeslide").css({"visibility":"hidden", "opacity":0});
								 if(!$.supersized.vars.is_paused){ api.playToggle(); }
							}else{
								$("#supersized .prevslide, #supersized .activeslide").css({"visibility":"visible"});
								$("#supersized .prevslide, #supersized .activeslide").animate({"opacity":1});
								 if($.supersized.vars.is_paused){ api.playToggle(); }
							}
						
						}else{
							try{	
								if(self.scrollPos > Math.abs($("#supersized").height()/2)+50){
									if(!$.supersized.vars.is_paused){ api.playToggle(); }
								}else{	
									if($.supersized.vars.is_paused){ api.playToggle(); }
									
								}
							} catch (e) { }	
						}
					}
				
				},200);
				
			});
			

			$('.palyPause_slideshow').hover(function(){
				try {
					if(self.superSlider){	
						if(!$.supersized.vars.is_paused){ api.playToggle(); }
					}
				} catch (e) { }
			},function(){ });
			
			
	}	
	
	
	mainFm.prototype = {

		// Initialize the require objects and variables 
		initialize : function(){
			
			var self = this;
			
			self.prePg = "";
			self.curPg = "";
			self.menuList = [];
			
			// Loading object added
			self.bdy.prepend('<div id="preloadImg" style="width:150px; height:150px; visibility:hidden; position:absolute; left:0; top:0; overflow:hidden"> </div>');
			self.dumDiv.addClass('email_loading');
			self.dumDiv.removeClass('email_loading');			
			
			self.nexButton_detailPg = $("a.next_button");
			self.preButton_detailPg = $("a.previous_button");
			
// Initialize the menu navigation action
			var kk = -1;
			var qq = -1;
			self.rez = false;
			
			if( parseInt($.browser.version, 10) === 7 && $.browser.msie){
				self.pageHeader.css({"background":"","filter":"none"});
				self.dumDiv.addClass("mobile_menuBg_ie");
				self.pageHeader.css({"background-color": self.dumDiv.css("background-color")});
			}
			
			try {
				document.createEvent('TouchEvent');
				$(".lightStyle, .darkStyle, .contentWrapper, .setting_tools").bind('click', function() {
				});
			} catch (e) {
				// nothing to do			
			}
			
			
			$(".header .nav li ul").removeClass("open");
			$(".header .nav li ul").addClass("close");
			
			if(!isTouch){
				 $(".header .nav li ul").addClass("enableTransition")
			}
			
			self.navUl.each(function() {
				
				$(this).children().each(function() {
					var slf = $(this).children();
					qq++;
					slf.bind('click', function() {
						
						var gg =  String($(this).attr("href")).split("#");
						if(gg[0] === self.url){
							self.page_position();
						}
						
						if(self.onePage){
							$(".header .nav li a").removeClass("active");
							$(this).addClass("active");
						}
						
						if($(this).attr("href") !== undefined && $(this).attr("href") !== "" && self.menuAutoHide ){
							setTimeout(function(){
								self.menuPosition();
							},1300)
						}
					});	
					
					$(this).find("ul li a").bind('click', function() {
						$(".header .nav li a").removeClass("active_sub");
						$(this).addClass("active_sub");	
						
						if($(this).attr("href") !== undefined && $(this).attr("href") !== "" && self.menuAutoHide){
							setTimeout(function(){
								self.menuPosition();
							},1300)
						}
										
					});					
					
					$(this).bind('click', function() {	
						
						if(self.onePage){
							$(".header .nav li ul").removeClass("open");
							$(".header .nav li ul").addClass("close");						
							$(this).find("ul").removeClass("close");
							$(this).find("ul").addClass("open");
						}else{
							if($(this).find("ul").hasClass("open")){
								$(".header .nav li ul").removeClass("open");
								$(".header .nav li ul").addClass("close");
							}else{
								$(".header .nav li ul").removeClass("open");
								$(this).find("ul").removeClass("close");
								$(this).find("ul").addClass("open");
							}
						}						
					});					
				
				});				
											
			});			
			
			$("body").find(".move_down, .move_down_white, .logo a").each(function(){
				$(this).bind('click', function() {
					var gg =  $(this).attr("href").split("#");
					if(gg[1] === self.url){
						self.page_position();						
					}
				});
			});	
			
			if(!isTouch){
				$("html").css({"overflow-y":"auto"})
				$("html").niceScroll({ zindex : 90000000, cursorborder : "0px", cursorcolor : self.scrollColor, cursorwidth:"7px", scrollspeed :70, horizrailenabled:false });
			}

			self.homePg = self.homePage === "" ? self.menuList[0].substr(1, self.menuList[0].length): self.homePage;
			self.cM = $('.contentWrapper [data-id="'+"#"+self.menuList[0]+'"]').parent();

			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').css("visibility","visible");			
			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').hide();
			
			
			// Initialize the mobile button action
			self.navUl.data('view',false);
			
			self.bdy.find('img').each(function() {
				$(this).data("src",$(this).attr('src'));
			});			
			
			
			// Show Hide Menu
			
			$(".showHideMenu").click(function(){				
				if( (!self.menuLeft || self.oriWidth > 1519) && self.pageHeader.position().left !== 0){
					self.pageHeader.css({"left":"0px"});
					self.pageHeader.removeClass("noborder");
				}else{
					self.pageHeader.css({"left":"0px"});
					self.pageHeader.removeClass("noborder");
				}

				$('.header').find(".header_content").each(
					function(){	
						if(self.menuLeft){
						  $(this).mCustomScrollbar("update");
						}else{
							if($(this).data('added')){	
								$(this).mCustomScrollbar("destroy");						
							}
							$(this).data('added', false);
						}
					}
				);
			});
			
			if(isTouch){
				$(".tab-pane").each(function() {
					$(this).removeClass("fade");
					$(this).removeClass("in");
				});
			}
			
			$(".closeMenu").click(function(){
				self.pageHeader.css({"left":"-250px"});	
				self.pageHeader.addClass("noborder");			
			});	
			
			// Initialize the video	
			self.intVideoObject(self.bdy);
			
			// Enable/disable the image scale animation
			if(isTouch){
				$(".fmSliderNode img").removeClass("enableTransition"); 
				$(".circle_large").removeClass("enableTransition");  
			}else{
				$(".fmSliderNode img").addClass("enableTransition"); 
				$(".circle_large").addClass("enableTransition"); 
			}
			
			// Initialize the window resize function
			clearInterval(self.intr);
			$(window).resize(function() {	
				clearInterval(self.intr);
				self.intr = setInterval(function(){clearInterval(self.intr); self.windowRez();},100);
			});
			
			//Initialize the mobile orientationchange function
			$(window).bind( 'orientationchange', function(){
				self.windowRez();
			});
			
			self.site_display();
			
			var chkInt = setInterval(function() {
				clearInterval(chkInt);
				self.history();
				self.page_setup();
				for(var ik=0; ik < self.navArry.length; ik++){
					if(self.navArry[ik].attr("data-id") === self.url){
						self.updatePage(self.navArry[ik]);
						}
					}
			}, 300);
				
			
			if(iPhoneDevice){
				$(".homeSlider.fullHeight").css({"min-height": self.winHeight+100});	
			}else{
				$(".homeSlider.fullHeight").css({"height": self.winHeight+10});	
			}
			
			/* Scroll Items */
			$(".previousPage span, .nextPage span").bind('click', function() {
				if($(this).data("url")){
					if($(this).data("url") !== self.url){
						window.location.href = "#"+$(this).data("url");
						}else{
							self.page_position();
					}
					if($('.nav a[href$="#'+$(this).data("url")+'"]').length > 0){
						$(".nav li a").removeClass("active");
						$('.nav a[href$="#'+$(this).data("url")+'"]').addClass("active");
					}
				}						
				
				if(self.oriWidth < 1520 && self.menuLeft){
					setTimeout(function(){
						self.menuPosition();									
					}, 1000);
				}
			});
	

			$(".fadeAfterLoad").delay(200).fadeIn(300, function(){
				self.page_position();
			});
			
			
			setTimeout(function(){
				if(self.onePage){
					$('.contentWrapper').each(function(i) {
						var position = $(this).position();
						
						$(this).scrollspy({
							min: position.top,
							max: position.top + $(this).height(),
							onEnter: function(element, position) {
								self.updatePage($(element));
								for(var ik=0; ik < self.navArry.length; ik++){
									if(self.navArry[ik].attr("data-id") === $(element).attr("data-id")){
										if(self.navArry[ik-1]){
											$(".previousPage span").data( "url" , self.navArry[ik-1].attr("data-id") );
										}
										if(self.navArry[ik+1]){
											$(".nextPage span").data( "url" , self.navArry[ik+1].attr("data-id") );
										}
									}
								}
							},
							
							onLeave: function(element, position) {
								
							}
						});
					});					
				}
			}, 1000);
				
				
			$('body').find(".m-Scrollbar").each(function(){	
				$(this).bind( "mouseover", function() {
					try{
						self.scrollbarLoad(true);
					} catch(e){ }	
					$(this).unbind('mouseenter').unbind('mouseover');
				});					
			});	
			
			
			if(self.page_Fade){					
				self.page_Fade.delay(100).fadeOut(1000, "easeInOutQuart", function(){ 
					$(".slogan_container").delay(750).fadeIn(700);									
					self.page_Fade.remove();					
				});
			}
			
		},
		
		
		// Initialize vertical and Horizontal scroll bar
		scrollbarLoad : function(e){
			
			var self = this;
			
			$('body').find(".darkStyle .m-Scrollbar").each(function(){	
				$(this).data("scrColor","light-thin");					
			});
			
			$('body').find(".lightStyle .m-Scrollbar").each( function(){	
				$(this).data("scrColor","dark-thin");					
			});
			
			
			$('body').find(".darkStyle .m-Scrollbar-hor").each( function(){	
				$(this).data("scrColor","mCS-light-thin");					
			});				
			
			
			$('body').find(".lightStyle .m-Scrollbar-hor").each( function(){	
				$(this).data("scrColor","dark-thin"); 
			});
			
			
			if(e){
				$('body').find(".scroll_holder_H").each(
					function(){
						 var selg = $(this);
						if(selg.hasClass("m-Scrollbar-hor")){
							if(self.winWidth <= 1024){				
								if(selg.data('added')){	
									selg.mCustomScrollbar("destroy");
								}
								selg.data('added', false);								
							}else{
								if(!selg.data('added')){
									var scrCol = selg.data("scrColor") !== undefined ? selg.data("scrColor") : "mCS-light-thin";
									selg.mCustomScrollbar({
										theme: scrCol,
										autoHideScrollbar:false,
										horizontalScroll:true,
										scrollInertia: 200,
										mouseWheelPixels: 320,
										scrollButtons:{
											enable:true
										  }
									});										
								}									
								selg.data('added', true);
							}							
						}
				});
			}
			
			
			$("body").find(".m-Scrollbar").each(
				  function(){
					  var selg = $(this);
					  if(!selg.data('added')){
						  var scrCol = selg.data("scrColor") !== undefined ? selg.data("scrColor") : "light-thin";
						  selg.mCustomScrollbar({
							  theme: scrCol,
							  autoHideScrollbar:true,
							  scrollInertia: 200,
							  mouseWheelPixels: 320
						  });
					  }else{
						 selg.mCustomScrollbar("update");	
					 }
				   selg.data('added', true);																
			  });	
			  
			  $('body').find(".m-Scrollbar-hor, .m-Scrollbar").each(
				  function(){	
					if($(this).data('added')){	
						$(this).mCustomScrollbar("update");							
					}
			   });
							
		},
		
		
		menuPosition : function(){
			var self = this;
			if(self.oriWidth > 1519 || !self.menuLeft){
				self.pageHeader.css({"left":"0px"});	
				self.pageHeader.removeClass("noborder");						
			}else{
				self.pageHeader.css({"left":"-250px"});
				self.pageHeader.addClass("noborder");							
			}
		},
		
		
		
		updatePage : function(ele){
			
			var self = this;			
			var menuDefined = false;			
			self.curPageview = ele;
			
			if($('.nav a[href$="#'+ ele.attr("data-id")+'"]').length > 0){
				menuDefined = true;
				$(".nav li a").removeClass("active");
				$('.nav a[href$="#'+ele.attr("data-id")+'"]').addClass("active");
			}
			
			if(!menuDefined){
				if($('.nav a[href$="#'+ele.attr("data-continue-page")+'"]').length > 0){
					$(".nav li a").removeClass("active");
					$('.nav a[href$="#'+ele.attr("data-continue-page")+'"]').addClass("active");
				}
			}
				
			$("body").find('.contentWrapper').each(function(){
				try{  $(this).find('.flexslider').data("slid").pause(); } catch (e) { }
			});
			
			$("body").find(".m-Scrollbar-hor, .m-Scrollbar").each(
				  function(){	
					  if($(this).data('added')){	
						  $(this).mCustomScrollbar("update");							
					  }
				  });
			
			
			self.videoRest(ele);

		},
		
		animateRequiedObj : function(ele){
			
			var self = this;
			
			if(!isTouch){
				$("body").find('.graph_container li').each(function() {
					$(this).each(function() {
						$(this).children(':first-child').css("width","0px");
						$(this).children(':last-child').css("left","0px");
						$(this).children(':last-child').stop();	
						$(this).children(':last-child').children(':first-child').text("0%");
					});
				});
				
				ele.find('.graph_container').each(function(){
					self.graph_display($(this));
				});			
			}	
		},
		
		
		
		// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;			
									
				$(this).find('.video_hover').each(function(){
									
					addCover = true;
					var vv =  $(this);				
									
					var vid = $(this).parent();
					vid.data("added", true);
									
					vv.click(function(){						
						$("body").find('.addVideo').each(function(){
							$(this).data("isPlaying", false);
							if($(this).parent().hasClass("tabVideo")){ return; }
							
							if(!$(this).data("added")){
								vid.children(':first-child').removeClass("enablHardwareAcc");
							}
							$(this).find('.vid').remove();
							if(!$(this).hasClass("backGroundVideo")){
								
								$(this).find('img').fadeIn();
								$(this).find('.video_hover').fadeIn();
								$(this).find('.video_hover').css({"z-index":"5"});
							}
						});
			
						vid.prepend('<div class="vid" ></div>');
						vid.data("added", true);
						vid.data("isPlaying", true);

						vid.find('.video_hover').css({"z-index":"-1"});
						vid.find('img').fadeOut(100,function(){
							var vid_ = $(this).parent();							
							vid_.children(':first-child').embedPlayer(vid_.attr('data-url'), vid_.width()+"px", vid_.height()+"px", vid_.width(), false); 
							}
						);
						$('.iframeVideo').attr('src', $('.iframeVideo').attr('src'));
			
					});
				});	
				
				
			});
			
		},
		
		// Video Reset function
		videoRest : function(obj){
			var self = this;
			
			try{
				$("body").find('.addVideo').each(function(){		
					if(!$(this).hasClass("backGroundVideo")  && !$(this).data("isPlaying")){
						$(this).find('.vid').each(function(){
							$(this).removeClass("enablHardwareAcc");
							$(this).remove();
						});
						$(this).find('img').show();
						$(this).find('.video_hover').show();
						$(this).find('.video_hover').css({"z-index":"15"});
					}
					if($(this).data("isPlaying") ){
						var vid = $(this);
						var www = Math.round(vid.width());
						var hhh = Math.round(vid.height());
						vid.find("iframe").css({"width": www+"px", "height": hhh+"px"});
					}
				});
			} catch (e) { }
 			
			try{
				$("body").find('.addVideo.backGroundVideo').each(function(){
					var vid_ = $(this);
					if(vid_.data("pgId") !== obj.attr("data-id") || vid_.data("pgId") === undeifned){						
						vid_.data("added", false);
						vid_.find('.vid').each(function(){
							$(this).removeClass("enablHardwareAcc")
							$(this).remove();
						});
						vid_.find('img').show();
						vid_.find('.video_hover').show();
						vid_.find('.video_hover').css({"z-index":"5"});
					}
					
				});

			} catch (e) { }
			
			try{								
				//if(!self.mobile){					
					obj.find('.addVideo.backGroundVideo').each(function(){
						
						var vid = $(this);
						var www = Math.round(vid.width());
						var hhh = Math.round(vid.height());
						var vidW = !isTouch ? www * 1.8 : www;
						var vidH = !isTouch ? hhh * 1.8 : hhh-100;
						var ww = vidW;	
						var hh = vidH;

						vid.data("pgId", obj.attr("data-id"));
						
						if(!vid.data("added")){											
							vid.prepend('<div class="vid" ></div>');
							vid.children(':first-child').addClass("enablHardwareAcc");
							vid.find('.video_hover').css({"z-index":"5"});							
							vid.find('img').show();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vidW+"px", vidH+"px", true);	
						}

						vid.data("added", true);
						vid.children(':first-child').css({ "top": -Math.round((hh-hhh)/2)});
						vid.find("iframe").css({"width": ww+"px", "height": hh+"px" });
					});					
				//}		
			} catch (e) { }
			
		},
		

/* Resize Image */
		
		resizeImg : function (obj){
						
			var self = this;
			
          	if(obj.width() === 0){ return; }
			var hold;

			if(obj.parent().parent().parent().parent().hasClass("projImgs") || obj.hasClass("resize_align")){				
				if(obj.hasClass("resize_align")){
					hold =obj.parent();
				}else{
					hold =obj.parent().parent().parent().parent();
				}
			}else{
				return;
			}

			obj.css({"width":"auto", "height":"auto"});

			if(obj.data("width_") === undefined){
				var image = new Image();				
				image.onload = function() {
				  appy_resizeImg(obj, this.width, this.height);
					obj.data("width_", this.width);
					obj.data("height_", this.height);
					try {	this.remove();	} catch (e) { }		
					};				
				image.src = obj.attr("src");
			}else{
				appy_resizeImg(obj,obj.data("width_"), obj.data("height_"));		
			}
			
			function appy_resizeImg(obj,wid, hig){				
				var	iw = wid,
					ih = hig,
					ww = hold.width(),
					wh = hold.height(),
					rw = wh / ww,
					ri = ih / iw,
					tp = 0,
					lp = 0,
					newWidth, newHeight,
					newLeft, newTop,
					properties;
					
					if(obj.hasClass("resize_align") && !obj.hasClass("fitInside") ){
						obj.css({ "margin-left": "0px" });
						var rezr = hold.width() < hold.height() ? rw < ri : rw > ri;
						newWidth = ww;
						newHeight = ww * ri;
						if ( rezr ) {
							lp = ( ww  -newWidth)/2;				
						} 
						obj.css({'margin-left': Math.round(lp) + "px"});
					}else{
						if (ww > wh) {	
							newWidth = ww;
							newHeight = ww * ri;
							if(ww < newWidth || wh < newHeight ){
								newWidth = wh / ri;
								newHeight = wh;
							}
						} else {							
							newWidth = ww;
							newHeight = ww * ri;
						}
						lp = ( ww  -newWidth)/2;
						obj.css({'margin-left': Math.round(lp) + "px"});
					}
					
					tp = (wh-newHeight)/2;	
			  
			  		properties = {
							'width': Math.round(newWidth) + 'px',
							'height': Math.round(newHeight) + 'px',
							'margin-top': Math.round(tp) + "px",
							"left":"auto",
							"right":"auto",
							'bottom': "auto"		
						};
						
					obj.css( properties);
				}
		},



// Page Background load function
		
		site_display : function(){
			
			var self = this;
			
			self.findDeviceType();
			
			$("body").data("bgType",isMobileChk);		
			
			
			$("body").find('.parallax').each(function(){
				var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
				var imgAtt = !isTouch ? "fixed" : "scroll";
				if(img !== undefined){
					$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
				}
			});
			
			$(".contentWrapper").find('#mapWrapper').each(function(){
				if(!self.IE_old){
					$(this).parent().prepend($(this).data('map'));
					$(this).parent().children(":first-child").addClass('mapStyle');
					$(this).remove();
				}
			});	
			

			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
				}
				
				var dataId = $(this).attr("data-id") !== undefined ? $(this).attr("data-id") : "!";
				
				$(this).find('.nav-tabs.plainTab a').each(function(){
					$(this).data("dataId", dataId);
				});		
				
			});			
			
			$("body").find('.flexslider').each(function(){				
				try{
					var aniTyp = $(this).hasClass('slideAnimation') ? "slide" : "fade";	
					var autPly = $(this).hasClass('autoPlay_stop') ? false : true;					
					$(this).data("autPly",autPly);				
					var ffx = $(this);
					ffx.removeClass('flexSlideshow');
					if($(this).find('#jstwitter').length === 0){
						ffx.append('<div class="slider_loading" ></div>');
					}
					$(this).find(" a.lazyload").each(function(){
						self.lazyLoadInt($(this));
					});
	
					var flexs = $(this);
					flexs.flexslider({
					slideshow: autPly,
					animation: aniTyp,
					slideshowSpeed: 5000,
					start: function(slider){
						flexs.data("slid",slider);
						flexs.find(".slider_loading").remove();
						slider.pause();
						}
					});
				} catch (e) { }				
			});				
			
			$("body").find('.lazyload_single').each(function(){	
				self.lazyLoadInt($(this));
			});
			

			$("body").find('.tab-pane').each(function(){
				$(this).find('.flexSlideshow').each(function(){
					$(this).removeClass('flexSlideshow');
					$(this).addClass('tabFlexslider')
				});					
			});
			
			$("body").find('.flexSlideshow').each(function(){				
				try{ tabFlexActive ($(this)); } catch (e) { }				
			});
			
			$("body").find('.tab-pane').each(function(){
				$(this).find('.elastic_slider').each(function(){
					$(this).removeClass('elastic_slider');
					$(this).addClass('tabElastic_slider');
				});					
			});
			
			$("body").find('.elastic_slider').each(function(){				
				try{ tabCarouselActive ($(this)); } catch (e) { }				
			});
			
			$('.tab-pane.active').each(function (e) {				
				$(this).find(".tabFlexslider").each(function(){	
					if(!$(this).data("added")){
						tabFlexActive($(this));
					 } 
					 $(this).data("added", true);
				});	
								
				$(this).find(".tabElastic_slider").each(function(){	
					if(!$(this).data("added")){
						tabCarouselActive($(this));
					 } 
					 $(this).data("added", true);
				});				
			});
			
			
			$('.nav-tabs.plainTab a').click(function (e) {
				e.preventDefault();	
				var objt = $($(this).attr("href"));
				if(self.onePage){
					window.location.href = "#"+$(this).data("dataId")+"?"+$(this).attr("href");
				}else{
					if($(this).data("dataId") !== undefined){
						window.location.href = "#"+$(this).data("dataId")+"?"+$(this).attr("href");
					}else{
						window.location.href = $(this).attr("href");
					}					
				}
				
				objt.find(".tabFlexslider").each(function(){
					if(!$(this).data("added")){
						tabFlexActive($(this));
					 }	  
					 $(this).data("added", true);
				});	
				
				objt.find(".tabElastic_slider").each(function(){	
					 if(!$(this).data("added")){
						tabCarouselActive($(this));
					 }
					 $(this).data("added", true); 				
				});	
				
				$("body").find('.addVideo').each(function(){
					$(this).data("isPlaying", false);
				});
				self.videoRest();
				
				if(objt.find(".graph_container").length > 0 ){
					self.animateRequiedObj(objt);
				}
										
				try{ 
					$($(this).attr("href")).find('.flexslider').each(function(){
						var fc = $(this);
						$(this).hide();
						if(fc.data("slid") !== undefined){												
							setTimeout( function(){ fc.fadeIn(); fc.data("slid").windowRez(); },600);
						}
					});
				} catch (e) { }
		
			});
			
				
			function tabCarouselActive (mc){
				mc.hide();
				setTimeout( function(){
					mc.show();					
					mc.addClass("elastic_slider");			
					mc.removeClass('tabCarousel');
					
					var ci = false;
					
					mc.find(".carousel_container a.lazyload, .elastislide-list a.lazyload").each(function(){
						self.lazyLoadInt($(this));
					});
			
					mc.find(".carousel_container li, .elastislide-list li").each(function(){
							$(this).find("img").appendTo($(this).find("a"));
						});
										
					mc.find('.carousel_container').each(function(){	
						ci	 = true;		
						carousel_gallery_int ($(this));
					});	
					
					/* Initialize carousel Elasticslider */	
					if(!ci){ mc.find(".carousel").elastislide(); }
					mc.data("added", true);	
													
				},600);
				
				
			
			}
			
			function tabFlexActive (mc){
				mc.hide();
				setTimeout( function(){
					mc.show();
					try{
						  var aniTyp = mc.hasClass('slideAnimation') ? "slide" : "fade";
						  var autPly = mc.hasClass('autoPlay_stop') ? false : true;	
						  $(this).data("autPly",autPly);		
						  mc.addClass("flexslider");			
						  var ffx = mc;
						  ffx.removeClass('tabFlexslider');
						  ffx.append('<div class="slider_loading" ></div>');
						  $(this).find(" a.lazyload").each(function(){
							  self.lazyLoadInt($(this));
						  });
		  
						  var flexs = mc;
						  flexs.flexslider({
						  slideshow: autPly,
						  animation: aniTyp,
						  slideshowSpeed: 5000,
						  start: function(slider){
							  flexs.data("slid",slider);
							  flexs.find(".slider_loading").remove();
							  slider.pause();
							  }
						  });
					  } catch (e) { }	
				 },600)
			}			
			

			$("body").find('.contentWrapper').each(function(){
				if($(this).hasClass("portfolioPage") && $(this).data("isImgLoaded") === undefined){				
					$(this).data("isImgLoaded", true);
					$(this).find(" a.lazyload_portfolioFluid").each(function(){
						if($(this).data("loaded") !== true){
							$(this).data("loaded", true);
							var cc = $(this).attr('class');
							var img_ = $(this).attr("href") ?  $(this).attr("href") : undefined;					
							var img = $('<img class="'+cc+'" src="'+img_+'"/>');
							img.removeClass('lazyload_portfolioFluid');
							$(this).replaceWith(img);
							img.load(function() {
									
							})
							.each(function() {
							 if(this.complete) $(this).trigger('load');
							});
						}
					});
				}
			});	
			
			self.portfolioFluid();			
						
			
			if(self.url !== self.curPgChk){			
				self.htmlBody.scrollTop(0);		
			}
			
			
			setTimeout(function(){
				try{				
					self.setting_tool.css({"right":"-201px"});
				} catch (e) {	}
			},4000);
			
			setTimeout(function(){
				try{
					map_initialize(); 
				} catch (e) {
					$("#map_canvas").html($(this).data("con"));			
				}	
				mapResizer();
								
			},1000);
			
			
		},
		
		
		page_position : function (e){
			var self = this;
			
			self.kko = self.kko === undefined ? 1 : self.kko+1;			

			self.openYes = true;
			self._curPag = self.url;

			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self._curPag){
					isInCont = $(this);
				}
			});
			
			self.videoRest();
					
			self.scrollObj.stop();
			
			var posT = 0;	
			var dum_val = self.onePage ? 1 : 0;	
				
			posT = isInCont !== undefined ? parseInt(isInCont.position().top, 10): 0;			
			posT  = e === undefined ? posT+dum_val : (posT + e.position().top )- self.headerHeight;
			self.scrollObj.stop().animate({ scrollTop: posT }, self.aniSpeed, "easeInOutQuart", function(){ });
			
			setTimeout(function(){  
				if(!isTouch){ $("html").getNiceScroll().resize(); }
			},20);
		},


		findDeviceType : function(){
			var self = this;
			self.oriWidth = $(window).width();
			self.winWidth =   self.menuLeft && self.oriWidth > 1519 ? self.oriWidth-250 : self.oriWidth;
			self.winHeight =   $(window).height();
			
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.mobile = self.winWidth <= 959 && !self.ipadPort;
			self.midMobile = self.winWidth <= 767 && self.winWidth > 479;
			self.minMobile = self.winWidth <= 480;
			isMobileChk = self.winWidth < 768;
			lowResDesktop = self.winWidth <= 979;
			},

// The entire page can be reposition, resize and modified by page_setup function
		page_setup : function (){
			
			var self = this;
			
			if($(window).width() < 768){
				$("body").removeClass("topMenu");
				$(".setNavType").removeClass("topNav");	
				$(".setNavType").addClass("leftNav");
			}else{
				if(!leftMenu){
					$(".setNavType").removeClass("leftNav");
					$(".setNavType").addClass("topNav");
					$("body").addClass("topMenu");
				}
			}
			
			self.menuLeft = $(".setNavType").hasClass("leftNav");

			self.findDeviceType();
			self.navTop = true;

			// Reset the required variable
			
			self.pgHeight = "100%";
			self.pgHeight =  "100%";
			
			$("#bodyContent").css({"width": "100%"});
			
			self.headerHeight = self.menuLeft ? 0 : topMenuHeight;
			
			
			// Change the default image in img tag, if mobile version the data-src-small image is assign to the img tag
						
			if(self.rez && $("body").data("bgType") !== isMobileChk && $("body").data("bgType") !== undefined){
				$("body").data("bgType",isMobileChk);
				$("body").find('.parallax').each(function(){
					var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
					var imgAtt = !isTouch ? "fixed" : "scroll";
					if(img !== undefined){
						$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
					}
				});
			}
	

			self.page_dimension();
			
			
			self.masonNum = self.winWidth < 1149? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : (self.winWidth > 1360 ? 4 : 3);
			self.masonPer = (100/self.masonNum)-0.1+"%";
			$("body").find(".portfolioFluid_items").each(function(){
				$(this).find(".item").css({"width":self.masonPer});
			});
			
		  
			
			if(!self.rez){
				self.page_position();
			}
			
			$('body').find('img.resize_align').each(function(){
				self.resizeImg($(this));
			});
			
			$('body').find('.portfolioFluid_items').css({"mini-width":self.winWidth});
			
			self.ContPgTopSpace = $(window).height() > 360 ? 360 : 150;
			$(".contactPage .contactPage_content").css({ "min-height": $(window).height() - self.ContPgTopSpace, "margin-top": self.ContPgTopSpace } );
			
			if(isTouch){	
				$(".overlayPattern").hide();
			}
			
			mapResizer();
			
			if(lowResDesktop){ $(".mobile_Only").show(); }else{ $(".mobile_Only").hide(); }
			
			self.menuPosition();
			
			self.scrollbarLoad(true);
			
			
			if(($(".homeSlider").hasClass("bannerHeight") || $(".homeSlider").hasClass("banner_miniHeight")) && $("#supersized").height() !== null ){
				$("#supersized").css( { "height": $(".homeSlider").height()+"px" });
				api.resizeNow();
			}
				
		
			setTimeout(function(){				
				$('body').find(".m-Scrollbar-hor, .m-Scrollbar").each(
					function(){	
						if($(this).data('added')){	
							$(this).mCustomScrollbar("update");							
						}
					}
				);	
				$('body').find(".header_content").each(
					function(){	
						if(self.menuLeft){
							if(!$(this).data('added')){
								$(this).mCustomScrollbar({
									theme: "light-thin",
									autoHideScrollbar:false,
									scrollInertia: 200,
									mouseWheelPixels: 320
								});
								$(this).data('added', true);
							}
							
							$(this).mCustomScrollbar("update");
						}else{
							if($(this).data('added')){	
								$(this).mCustomScrollbar("destroy");						
							}
							$(this).data('added', false);
						}
					}
				);
				
				self.videoRest(self.curPageview);
				
			},500);
			
			if(isMobileChk){				
				self.pageHeader.removeClass("enableTransition_header");
				self.setting_tool.removeClass("enableTransition");
				$(".switch_nav, .switch_page_align").hide();
			}else{
				self.pageHeader.addClass("enableTransition_header");
				self.setting_tool.addClass("enableTransition");
				$(".switch_nav, .switch_page_align").show();
			}
				
		},
		
		
		page_dimension : function(){
			var self = this;
			var conPos = 0;
			self.numCon = 0;	

			
			$("body").find(".contentWrapper").each(function(){
				$(this).css({"width": self.winWidth});
			});	
			
			$("body").find(".fullHeight").each(function(){
				var se2 = $(this);
				se2.css({"min-height": self.winHeight});
				
				if(!lowResDesktop){
					$(this).css({"min-height": self.winHeight});
					
				}else{
					if(isTouch){
						$(this).css({"min-height": self.winHeight, "height": "auto" });						
					}else{
						$(this).css({"height": "auto" });
					}
				}
				
				if(se2.hasClass("fullResponse")){
					if(!isTouch){
						se2.find(".video_content.fullscreenVideo").css({"min-height": self.winHeight, "min-width": "100%"});
					}else{
						se2.find(".video_content.fullscreenVideo").css({"min-height": self.winHeight-120, "min-width": "100%", "top":topMenuHeight});
					}
				}else{
					if(self.mobile){ 
						se2.css({"min-height": "50px"});
						se2.css({"min-height": "auto"});
					}
				}		
			});
			
			
			if(isMobileChk || iPhoneDevice){
				$(".homeSlider.fullHeight").css({"min-height": self.winHeight+65});	
			}else{
				$(".homeSlider.fullHeight").css({"height": self.winHeight});	
			}
		
		
			$("body").find(".video_content.backGroundVideo").each(function(){
				$(this).css({"min-height": self.winHeight, "min-width": "100%"});
			});			
			

			if(self.menuLeft){
				if(iPhoneDevice){
					self.pageHeader.css({ "height": self.winHeight+65 });	
				}else{
					self.pageHeader.css({ "height": self.winHeight });
				}
			}else{
				self.pageHeader.css({ "height": topMenuHeight });	
			}
			
		},
		
		
		
// The page_load function is used to position the page as per current menu 
		page_load : function (e){
				
			var self = this;
			self.url = e  ? e : self.homePg;
			self.cM = $('a[href$="#'+self.url+'"]').parent();
			self.cM_= !self.onePage ? $('a[href="'+self.url+'"]') : $('a[href$="#'+self.url+'"]');
			self.pgViewed = false;
			
			fmUrl = self.url;

			if(!self.onePage){
				currentPage_menu = self.homePg;
				if($('.nav a[href$="#'+ e+'"]').length > 0){
					menuDefined = true;
					$(".nav li a").removeClass("active");
					$('.nav a[href$="#'+e+'"]').addClass("active");
				}
			}
			
			
			$(".header .nav li ul").removeClass("open");
			$(".header .nav li ul").addClass("close");					
			
			$('.nav a[href$="#'+e+'"]').parent().find("ul").removeClass("close");
			$('.nav a[href$="#'+e+'"]').parent().find("ul").addClass("open");
			

			for(var ik=0; ik < self.navArry.length; ik++){
				if(self.navArry[ik].attr("data-id") === self.url){
					if(self.navArry[ik-1]){
						$(".previousPage span").data( "url" , self.navArry[ik-1].attr("data-id") );
						}
					if(self.navArry[ik+1]){
						$(".nextPage span").data( "url" , self.navArry[ik+1].attr("data-id") );
					}
				}
			}	
						
			if($("body").find('.mfp-wrap').length > 0){
					try{ $.magnificPopup.close(); } catch (e) { }
				} 
			
			$("body").find('.addVideo').each(function(){	
				$(this).data("isPlaying", false);
			});		 
						 			 
			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
					try{ 
						$(this).find('.flexslider').each(function(){
							var fc = $(this);
							if(fc.data("loadInPop") === undefined && fc.data("slid") !== undefined && fc.data("autPly") ){												
								fc.data("slid").resume();
							}
						});
					} catch (e) { }					
				}else{					
					try{ 
						$(this).find('.flexslider').each(function(){
							if($(this).data("slid") !== undefined){
								$(this).data("slid").pause();
							}
						}); 
					} catch (e) { }
				}
			});		
			
			$("body").find('.portfolioPage').each(function(){
				$(this).detailPage("closeBackCon", true);
			});
			
			
			self.page_position();
					
			if(isInCont !== undefined ){
				
				
				if(self.curPg === ""){
					
					self.curPg = self.prePg = self.url;	
					
					if(self.pgSub == undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
				}
				
				return;
			}
			
			
			
			self.firstScrol = true;
			
			// Check the previous and current page
			
			if(self.prePg === self.curPg){
				
				try { self.fflod.remove(); } catch (e) { }
												
				// Initialize to load the opening page as per history
				if(self.curPg === "" ){						
					self.curPg = self.prePg = self.url;	
					if(self.pgSub === undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
					self.scrollObj.stop().animate({ scrollTop: "0px" }, 0, "easeInOutQuart");	
				}else{	
					// Initialize to load current page, background and animate to left side			
					self.curPg = self.url;
					var pagScrl_Speed = window.pageYOffset !== 0 ? self.aniSpeed : 50;
					var con_Speed = 0;
					if(self.prePg !== self.url){
						self.scrollObj.stop().animate({ scrollTop: "0px" }, pagScrl_Speed, "easeInOutQuart" ,function(){ });
					}else{
						if(isInCont != undefined || self.openYes){
							self.page_position();
						}
						self.scrollObj.stop().animate({ scrollTop: 0 }, 500, "easeInOutQuart" );
					}
				}
			}

		},
		
		

		
		
		// Portfolio portfolioFluid gallery
		portfolioFluid : function(){
			var self = this;

			self.masonNum = self.winWidth < 1149? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : (self.winWidth > 1360 ? 5 : 4);
			self.masonPer = (100/self.masonNum)-0.21+"%";			
			
			$("body").find('.portfolioFluid_items').each(function(){	
				self.manso = $(this);
				$(this).find(".item").css({"width":self.masonPer});
				$(this).find(".item").css({"position":"relative"});
				$(this).find(".item").addClass("enablHardwareAcc");
				
				
				$(this).find(".item img").each(function(){
					var $img = $(this);
					$img.load(function() {
						if(!isTouch){ $("html").getNiceScroll().resize(); }								
					}).error(function () {
					}).each(function() {
                      if(this.complete) { $(this).trigger('load'); }
					});	
				});	
				
			});
			
		},
		
		
		// Lazy load function
		lazyLoadInt : function(obj){
			var self = this;
			
			var imSrc = !self.mobileDevice ? obj.attr("href") : (obj.attr("data-src-small")? obj.attr("data-src-small")  :obj.attr("href"));
			var lodr = obj.parent().hasClass('large_image');
			lodr = !lodr ? obj.parent().hasClass('medium_image') : lodr;
			lodr = !lodr ? obj.parent().hasClass('fixedHeight') : lodr;
			lodr = !lodr ? obj.hasClass('lazyload_single') : lodr;

			if(obj.parent().hasClass('imgBorder')){
				lodr = !lodr ? obj.parent().parent().hasClass('fixedHeight') : lodr;
			}			
			var cc = obj.attr('class');
			var st = obj.attr('style');
			var $img;
			if(st){
				$img = $('<img class="'+cc+' style="'+st+'" />');
			}else{
				$img = $('<img class="'+cc+'" />');
			}

			$img.removeClass('lazyload_single');
			$img.removeClass('lazyload');
			obj.replaceWith($img);
			$img.hide();
				
			if(lodr){
				$img.parent().append('<div class="slider_loading"></div>');
				if($img.parent().height() > 50){
					$img.parent().children(":last-child").css({"top":$img.parent().height()/2-15});
				}
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".slider_loading").remove();					
					if($(this).hasClass("resize_align")){	
						self.resizeImg($(this));						
					};
					$(this).fadeIn(300);
				}).error(function () { 
					$(this).parent().find(".slider_loading").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
            }else{ 
				
				if($img.parent().hasClass('projImgPop')){
					$img.parent().append('<div class="slider_loading"></div>');
					$img.parent().children(":last-child").css({"top":$img.parent().height()/2-15});
					$img.parent().children(":last-child").css({"left":$img.parent().width()/2-15});
				}
				
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".slider_loading").remove();
					if($(this).hasClass("resize_align")){
						self.resizeImg($(this));						
					};	
					$(this).fadeIn(300);
					
					var pim = $img.parent().parent().hasClass('projImgs');
					pim = pim ? pim : $img.parent().parent().parent().parent().hasClass('projImgs');
					if(pim){
						self.resizeImg($(this));
					}else{						
						var posY = $(this).hasClass("scale_fill");
						posY = !posY ? $(this).hasClass("scale_fit") : posY;
						posY = !posY ? $(this).hasClass("scale_cover") : posY;						
						if(posY){							
							if($(this).width() > $(this).parent().width()+5	){
								$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
							}
							$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
						}							
					}
				}).error(function () {
					$(this).parent().find(".slider_loading").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});	
			}
			
			return $img;
			
		},
		
		
		showDetailPage : function(e){
			var self = this;

			if(e === undefined){
				if($("body").find('.mfp-wrap').length > 0){
					try{ $.magnificPopup.close(); } catch (e) { }
				}
				if(self.onePage){
					return;
				}
			}
			
			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
				}
			});
			
			
			
			
			if(isInCont !== undefined){
				if($('.nav a[href$="#'+ isInCont.attr("data-id")+'"]').length > 0){
					menuDefined = true;
					var iid = isInCont.attr("data-id");
					$(".nav li a").removeClass("active");
					$(".topMenu .nav li a").removeClass("active");
					
					$('.nav a[href$="#'+iid+'"]').addClass("active");	
					$('.topMenu .nav a[href$="#'+iid+'"]').addClass("active");				
					
					$(".header .nav li ul").removeClass("open");
					$(".header .nav li ul").addClass("close");					
					
					$('.nav a[href$="#'+iid+'"]').parent().find("ul").removeClass("close");					
					$('.nav a[href$="#'+iid+'"]').parent().find("ul").addClass("open");
						
					if($("body").hasClass("topMenu")){
						$(".header .nav li ul").removeClass("open");
						$(".header .nav li ul").addClass("close");
					}
					
					$(".nav li ul li a").removeClass("active_sub");
					$(".topMenu .nav li ul li a").removeClass("active_sub");				
					
					var p5 = e.split("#");
					if(p5.length > 1){
						$('.nav a[href$="#'+iid+'"]').parent().find('ul li a[href$="'+p5[1]+'"]').addClass("active_sub");	
						$('.topMenu .nav a[href$="#'+iid+'"]').parent().find('ul li a[href$="'+p5[1]+'"]').addClass("active_sub");	
					}else{
						$('.nav a[href$="#'+iid+'"]').parent().find('ul li a[href$="'+e+'"]').addClass("active_sub");	
						$('.topMenu .nav a[href$="#'+iid+'"]').parent().find('ul li a[href$="'+e+'"]').addClass("active_sub");	
					}					
				}
				
				if(!menuDefined){
				  	if($('.nav a[href$="#'+isInCont.attr("data-continue-page")+'"]').length > 0){
					  	$(".nav li a").removeClass("active");
					  	$('.nav a[href$="#'+isInCont.attr("data-continue-page")+'"]').addClass("active");
					  }
				  }
				 
			}
			
			if(self.onePage){
				try{
					isInCont.find('.nav-tabs.plainTab li a[href$="'+ e+'"]').trigger('click');
				} catch (e) { }
				if(isInCont.hasClass("portfolioPage")){
					isInCont.detailPage("showProject", e);
				}
			}else{				
				try{
					$("body").find('.nav-tabs.plainTab li a[href$="'+ e+'"]').trigger('click');
				} catch (e) { }
				
				$("body").find('.portfolioPage').each(function(){
					$(this).detailPage("showProject", e);			
				});
				
				if(!self.onePage){	
					var crm = 	$('.setNavType .nav a[href="'+self.homePage+'"]');	
					$('.setNavType .nav li a').removeClass("active");	
					$('.setNavType .nav li ul li a').removeClass("active");
										
					crm.addClass("active");	
					$('.topMenu .nav a[href="'+self.homePage+'"]').addClass("active");						

					if( crm.parent().parent().parent().prop("tagName") == "LI"){	
						crm.parent().parent().addClass("open").removeClass("close");					
						crm.parent().parent().parent().children(":first-child").addClass("active");
					}
				}
				
				
			}
			
		},
		
		
		
		
// Initialize the History 
		history : function(){
			var self = this;

			(function($){
				var origContent = "";			
				function loadContent(hash2) {
					window.location.href.substr(0, window.location.href.indexOf('#'));
					var splt = hash2.split("?");
					var hash = !self.onePage ? self.homePg : splt[0];
					self.pgSub = self.onePage ? splt[1] : splt.length > 1 ?  splt[1] : splt[0];			
					
				
					if(hash !== "") {
							
						if(origContent === ""  && self.curPg === "") {
							origContent = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
						}
						if(self.hisPath !== hash ){
							self.hisPath = hash;
							self.page_load(hash);
						}							
						if(self.pgSub !== undefined){
							var p2 = self.pgSub.split("=");								
						}
						self.showDetailPage(self.pgSub);
						
					} else {

						if(origContent !== "" && self.curPg === "") {
							if(self.hisPath !== hash ){
								self.hisPath = hash;
								self.page_load(self.homePg);
							}
						}else{
							if(self.pgSub !== undefined ){
								p2 = self.pgSub.split("=");									
								self.showDetailPage(self.pgSub);
							}
						}
					}
					
					if(hash === "" && self.curPg === ""){
						self.page_load(self.homePg);
					}
					
					
				}

				$(document).ready(function() {
					$.history.init(loadContent);
					$('#navigation a').not('.external-link').click(function() {
						var url = $(this).attr('href');
						url = url.replace(/^.*#/, '');
						$.history.load(url);
						return false;
					});
				});
				
			})(jQuery);
			
		},

		
// Graph display function
		graph_display : function (e){
			e.find('li').each(function() {
				$(this).each(function() {
					$(this).children(':first-child').css("width","0px");
					$(this).children(':first-child').stop();
					$(this).children(':first-child').animate( { width: $(this).attr('data-level') },  1500, "easeInOutQuart");
					
					$(this).children(':last-child').css("left","0px");
					$(this).children(':last-child').stop();
					$(this).children(':last-child').children(':first-child').text("0%");
					
					$(this).children(':last-child').animate( { left: $(this).attr('data-level') },
								  {
									step: function(now, fx) {	
									  $(this).children(':first-child').text( Math.round(now) +"%");						 
									},
									duration: 1500, 
									easing: "easeInOutQuart"							 
								  });
				});
			});
		},
		
		
		templateSetting : function (){
			var self = this;
			
			// Settings Code //
			var  ccc = $(".contactPage");
			
			if($("body").hasClass("white_version")){
				$(".switch").text("Dark Version");	
			}
			
			$(".switch").click(function(){
				if($("body").hasClass("white_version")){
					$(this).text("Light Version");	
					$(".switch_nav_color").text("Dark Menu");
					$("body").removeClass("white_version");
					$(".bodyContainer").find(".lightStyle").addClass("darkStyle")
					$(".bodyContainer").find(".lightStyle").removeClass("lightStyle");
					self.pageHeader.removeClass("darkMenu");					
					$(".menu_footer").removeClass("darkStyle");
					$(".menu_footer").addClass("lightStyle");
					
					ccc.attr("data-src","images/background/image2.jpg");
					ccc.attr("data-src-small","images/background/image2_s.jpg");
				}else{
					$(this).text("Dark Version");		
					$(".switch_nav_color").text("Light Menu");
					$("body").addClass("white_version");
					$(".bodyContainer").find(".darkStyle").addClass("lightStyle")
					$(".bodyContainer").find(".darkStyle").removeClass("darkStyle");
					self.pageHeader.addClass("darkMenu");					
					$(".menu_footer").removeClass("lightStyle");
					$(".menu_footer").addClass("darkStyle");
					
					ccc.attr("data-src","images/background/image3.jpg");
					ccc.attr("data-src-small","images/background/image3_s.jpg");
				}	
				
				ccc.css({"background-image": "none"});			

				var img = !isMobileChk ? ccc.attr("data-src") : (ccc.attr("data-src-small")? ccc.attr("data-src-small")  : ccc.attr("data-src"));	
				var imgAtt = !isTouch ? "fixed" : "scroll";
				if(img !== undefined){
					ccc.css({"background-image":"url("+img+")", "background-attachment": imgAtt});
				}	
				
				$('body').find(".m-Scrollbar").each(function(){ 
					$(this).mCustomScrollbar("destroy");
					$(this).data('added', false);
				});
				
				$('body').find(".m-Scrollbar-hor").each(function(){ 
					$(this).mCustomScrollbar("destroy");
					$(this).data('added', false);
				});
				
				self.scrollbarLoad(true);
			});
			
			
			$(".switch_nav_color").click(function(){
				if(!self.pageHeader.hasClass("darkMenu")){	
					$(this).text("Light Menu");		
					self.pageHeader.addClass("darkMenu");					
					$(".menu_footer").removeClass("lightStyle");
					$(".menu_footer").addClass("darkStyle");
					
				}else{
					$(this).text("Dark Menu");
					self.pageHeader.removeClass("darkMenu");					
					$(".menu_footer").removeClass("darkStyle");
					$(".menu_footer").addClass("lightStyle");
				}				
			});				
			
			$(".switch_nav").click(function(){
				if(leftMenu){
					leftMenu = false;	
					$(this).text("Left Menu");				
					if($(".setNavType").hasClass("leftNav")){ $(".setNavType").removeClass("leftNav"); }
					if(!$(".setNavType").hasClass("topNav")){ $(".setNavType").addClass("topNav"); }				
					if(!$("body").hasClass("topMenu")){ $("body").addClass("topMenu"); }
					
					
					if(pageAlignCenter){
						$(".setNavType").addClass("container");
					}else{
						$(".setNavType").removeClass("container");
					}
					
				}else{	
					leftMenu = true;
					$(this).text("Top Menu");					
					if(!$(".setNavType").hasClass("leftNav")){ $(".setNavType").addClass("leftNav"); }
					if($(".setNavType").hasClass("topNav")){ $(".setNavType").removeClass("topNav"); }				
					if($("body").hasClass("topMenu")) { $("body").removeClass("topMenu"); }	
					$(".setNavType").removeClass("container");		
				}
				
				self.page_setup();
				
				setTimeout(function(){
					$(window).trigger("resize");
				//},750);
				}, 1000);
			});
			
			var pageAlign = $(".desktop_alignLeft");
			
			var fluidCon = $(".bodyContainer .container-fluid");
			
			if(pageAlignCenter){
				$(".switch_page_align").text("Page Align Left");
			}
			
			$(".switch_page_align").click(function(){
				if(!pageAlignCenter){
					pageAlignCenter = true;
					$(this).text("Page Align Left");	
					pageAlign = $(".desktop_alignLeft");				
					pageAlign.removeClass("desktop_alignLeft");
					if(leftMenu){
						$(".setNavType").removeClass("container");	
					}else{
						$(".setNavType").addClass("container");	
					}
					$(".portfolioFluid_items").children(":first-child").addClass("container");						
					$(".itemNav").addClass("container");
					$(".scroll_holder_H").parent().removeClass("container-fluid");	
					$(".scroll_holder_H").parent().addClass("container");	
									
					$('.contentWrapper[data-id$="!bottomArea"]').find(".container-fluid").addClass("container").removeClass("container-fluid");
					
					if(!self.onePage){
						$(".bodyContainer .container-fluid").addClass("container").removeClass("container-fluid");
					}
								
				}else{
					pageAlignCenter = false;
					$(this).text("Page Align Center");					
					pageAlign.addClass("desktop_alignLeft");
					$(".align_left_yes").addClass("desktop_alignLeft");
					pageAlign = $(".desktop_alignLeft");
					$(".portfolioFluid_items").children(":first-child").removeClass("container");
					$(".setNavType").removeClass("container");	
					$(".itemNav").removeClass("container");	
					$(".scroll_holder_H").parent().addClass("container-fluid");
					$(".scroll_holder_H").parent().removeClass("container");	
					$('.contentWrapper[data-id$="!bottomArea"]').find(".container").addClass("container-fluid").removeClass("container");
					
					if(!self.onePage){
						fluidCon.addClass("container-fluid").removeClass("container");
					}
					
					if(typeof setting_fullWid !== "undefined" && typeof setting_fullWid !== undefined){
						$(".bodyContainer .container").addClass("container-fluid").removeClass("container");
					}
									
				}
				
				$("body").find(".m-Scrollbar-hor, .m-Scrollbar").each(
				  function(){	
					  if($(this).data('added')){	
						  $(this).mCustomScrollbar("update");							
					  }
				});
				
				if(self.onePage ){				
					self.page_setup();
				}
				
				if(!Modernizr_.csstransforms3d && !isTouch && !browserWebkit){
					if($(".container .overlay .middle_align").length > 0){
				  		$(".overlay .middle_align").css({"top":"20%", "left":"30%"});
					}else{
						$(".overlay .middle_align").css({"top":"30%", "left":"35%"});
					}
			  	}
				
				setTimeout(function(){
					$(window).trigger("resize");
				},750);
				
			});
			
			
			if(!self.onePage ){
				$(".switch_page_color").hide();
			}
			
			$(".switch_page_color").click(function(){
				
				var ccpp = self.curPageview;
				var  cccr = ccpp.hasClass("contactPage");
				
				if(ccpp.hasClass("darkStyle")){
					ccpp.find(".darkStyle").addClass("lightStyle");
					ccpp.find(".lightStyle").removeClass("lightStyle");					
					ccpp.removeClass("darkStyle");
					ccpp.addClass("lightStyle");
					
					if(cccr){
						ccpp.attr("data-src","images/background/image3.jpg");
						ccpp.attr("data-src-small","images/background/image3_s.jpg")
					}
					
					
				}else{
					ccpp.find(".lightStyle").addClass("darkStyle")
					ccpp.find(".darkStyle").removeClass("darkStyle");
					ccpp.removeClass("lightStyle");
					ccpp.addClass("darkStyle");
					
					if(cccr){
						ccpp.attr("data-src","images/background/image2.jpg");
						ccpp.attr("data-src-small","images/background/image2_s.jpg");
					}
				}
				
				if(cccr){
					ccpp.css({"background-image": "none"});
					var img = !isMobileChk ? ccpp.attr("data-src") : (ccpp.attr("data-src-small")? ccpp.attr("data-src-small")  : ccpp.attr("data-src"));	
					var imgAtt = !isTouch ? "fixed" : "scroll";
					if(img !== undefined){
						ccpp.css({"background-image":"url("+img+")", "background-attachment": imgAtt});
					}
				}
				
				$('body').find(".m-Scrollbar").each(function(){ 
					$(this).mCustomScrollbar("destroy");
					$(this).data('added', false);
				});
				
				$('body').find(".m-Scrollbar-hor").each(function(){ 
					$(this).mCustomScrollbar("destroy");
					$(this).data('added', false);
				});
				
				self.scrollbarLoad(true);
								
			});
			
			
			$(".setting_tools .iButton").click(function(){
				if(self.setting_tool.css("right") === "-1px"){
					self.setting_tool.css({"right":"-201px"});
				}else{
					self.setting_tool.css({"right":"-1px"});
				}
			});
			
			
			
			// End Setting code
		},
		
// Window Resize function
		windowRez : function (){			
			var self = this;
			if(Number(self.bdy.data("width")) !== Number($(window).width()) || Number(self.bdy.data("height")) !== Number($(window).height())){
				self.bdy.data("width", Number($(window).width()));
				self.bdy.data("height", Number($(window).height()));
				self.rez = true;
				self.page_setup();
				self.rez = false;
			}
		}
	};
	

		
// Initizlize and create the main plug-in
	$.fn.mainFm = function(params) {
	var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new mainFm($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	
})( jQuery );
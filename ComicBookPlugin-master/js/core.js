		//Ample space for functions
		
		//The ready scope begins here
			$(document).ready(function(){

		/*Some notes :
			*Always the first thing to do is to introduce/insert elements into the DOM.
			*After that do the manipulation.*/			
			
			
			//Defining the boxes to be appended.
				var $div = "<div class='box'></div>";
				var $caption = "<div class='caption' style='color:white'>Hugo</div>"
				var original_height = 140;
				var original_width = 140;
							
			//Appending the boxes
				for(var i=0;i<16;i++){
						$(".frame").append($div);						
				}
			//Appending the captions. Note that this is done only after box exists in DOM.
				for(var i=0;i<16;i++){
						$(".box").eq(i).append($caption);						
				}
			//Attaching data to coloumns, precisely coloumn numbers
				for(var i=0;i<16;i++){
					var coll = $(".box").eq(i);
						if(i%4==0){
							coll.data("col",0);}
						else if(i%4==1){
							coll.data("col",1);}
						else if(i%4==2){
							coll.data("col",2);}
						else{
							coll.data("col",3);}
					}
			//Atttaching data to rows, the row numbers	
				for(var i=0;i<16;i++){
					var row = $(".box").eq(i);
					var cmp = Math.floor(i/4);
						if(cmp==0){
							row.data("row",0);}
						else if(cmp==1){
							row.data("row",1);}
						else if(cmp==2){
							row.data("row",2);}
						else{
							row.data("row",3);}
					}
				//Frame CSS depending upon box CSS
				setTimeout(function(){ 
					var frame_width = Math.ceil(140*4+45);
					var frame_height = Math.ceil(140*4+45);
					$(".frame").width(frame_width);
					$(".frame").height(frame_height);
					
						//While the DOM loads, it compiles sequentially so .box is present as it has been inserted above. So binding is possible
				$(".box").mouseover(function(){
						//Removing effects of the previous selection
						$(".box").removeClass("unselected");
						$(this).removeClass("colers");
						$(this).removeClass("rowers");
						var $unselected = $("div.box").not(this);
							$unselected.removeClass("selected");
						
						//To signify that this is the selected element
						$(this).addClass("selected");
						
						var cur_height = $(this).height();
						var cur_width = $(this).width();
						//Height and width for selected element
						var new_height_sel =0 ;
						var new_width_sel=0;
						//Height and width for corresponding rowers 
						var new_height_rowers=0;
						var new_width_rowers=0;
						//Height and width for corresponding colers 
						var new_height_colers=0;
						var new_width_colers=0;
						//Hieght and width for remaining 9 divisions
						var new_height_9=0;
						var new_width_9=0; 
						//Logic for setting the above variables if current div is either enlarged fully or of the original equivalent size
						var max_height = Math.round(original_height*2.5);
						var min_height = Math.round(original_height*0.5);
						var max_width = Math.round(original_width*2.5);
						var min_width = Math.round(original_width*0.5);
					//Variable setting for all 5 divisions types.
							new_height_sel = max_height;
							new_width_sel = max_width;
							//Height of rowers same as selected but width reduced
							new_height_rowers = new_height_sel;
							new_width_rowers = new_width_sel*0.2;
							//Width of colers same as selected but height reduced
							new_height_colers = new_height_sel*0.2;
							new_width_colers = new_width_sel;
							//Of the remaining 9 divs, height and width are both reduced
							new_height_9 = new_height_colers;
							new_width_9 = new_width_rowers;
						
						
						//Test space
						/*$("span").html("Current height : " + cur_height + "<br/>" + "Current-width" + cur_width + "<br/>" + "Original_height*2.5 : " + Math.round(original_height*2.5) + "<br/>" + "Original width*2.5 : " + original_width*2.5+ "<br/>"+"Original width*0.5 : " + original_width*0.5+ "<br/>"+"Original height*0.5 : " + original_height*0.5+ "<br/>");	
					*/
						
						
						//Some variable declaration for selections, depending on the data attaached.
						var row_no = $(this).data("row");
						var col_no = $(this).data("col");
						var siblings = $(this).siblings();
						//Adding specifics to selections.
						$.each(siblings,function(){
							
							//The row mates viz rowers
							var row = $(this).data("row");
							//The coloumn mates viz colers
							var col = $(this).data("col");
							//Adding classes to specific elements by data detection.
							//Data was added initially in a fr loop
							if(row==row_no){
								$(this).addClass("rowers");
								}
							else{
								$(this).removeClass("rowers");}
							
							if(col==col_no){
								$(this).addClass("colers");
								}
							else{
								$(this).removeClass("colers");}
							});
							
							//The other 9 divs in $another jQuery object.
							//Note that this has been done after the DOME has assigned .rowers and .colers etc.
							var $another = $("div.box").not(".rowers,.colers,.selected");
							
							//Some css style play with this element and remaining depending upon selection.
							var $this_caption = $(this).children('.caption');
								$this_caption.css("width",new_width_sel-2);
								
								
							$unselected.addClass("unselected");
							$.each($unselected,function(index,value){
								var $width = $(this).width();
								var $this_caption = $(this).children('.caption');
								$this_caption.css({
									"width":$width,
									"display":"none"				
									});	
								});
							
						//Stopping the other animations before animation actually begins
						$(".box").stop();
						//Finally Animating the divisions based on values assigned above.		
						
						$(this).animate({
								height:new_height_sel,
								width:new_width_sel
							},function(){							
								$(this).children('.caption').slideDown(300);
							});
						$(".colers").animate({
								height:new_height_colers,
								width:new_width_colers	
							});
						$(".rowers").animate({
								height:new_height_rowers,
								width:new_width_rowers	
							});
						$another.animate({
								height:new_height_9,
								width:new_width_9	
							});		
				
				
				
				
				});//END OF THE mouseover envent handler
				
				
				//Triggering our event on document being ready. Note that this cant be in the beginning since no chlren of .frame in DOM since not appended yet.
				$(".box:nth-child(6)").trigger("mouseover");
				
				}, 100);
					
				
			
							
					
			});	//END OF the ready scope		

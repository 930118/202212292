var positionListX =[]  //X軸位置，List串列，array陣列
var positionListY =[]
var sizeList =[]  //所有大小
var clr_r_List = []  //所有花圓心顏色
var clrList =[]
var sizeList =[]  //所有花的大小

var colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var colors_r = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var clr,clr_r



let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<10;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }
 
    video = createCapture(VIDEO);
    video.size(width, height);

    handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
    handpose.on("predict", (results) => {
        predictions = results;
    });

  // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

    
function draw() {
  background("#F8DAE2");
 
  translate(width, 0);
  scale(-1, 1);
	
  background(255); 
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距離

	
  for(var j=0;j<positionListX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
    r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
  
	drawKeypoints(); //取得手指位置
  

   
}



function drawFlower(clr,clr_r,size=1){  
  

  push()
    scale(size) //縮放
    
//紫色的百變怪
push()


noStroke()//map即是將此物體定為圓心，並在此範圍內移動(0~-10)
fill(clr)
ellipse(+30+map(0,0,width,-10,10),-15+map(0,0,height,-10,10),200)//身體
ellipse(-50+map(0,0,width,-10,10),-80+map(0,0,height,-10,10),55,70)//左手
ellipse(-50+map(0,0,width,-10,20),-80+map(0,0,height,-10,10),55,70)//左手(外伸)
ellipse(+5+map(0,0,width,-10,10),-100+map(0,0,height,-10,10),70)//左邊的頭
ellipse(+60+map(0,0,width,-10,10),-100+map(0,0,height,-10,10),50)//右邊的頭
ellipse(+100+map(0,0,width,-10,10),-80+map(0,0,height,-10,10),60,80)//右手
ellipse(+100+map(0,0,width,-20,20),-80+map(0,0,height,-10,10),60,80)//右手(外伸)
ellipse(+90+map(0,0,width,-20,20),+50+map(0,0,height,-10,10),90,70)
ellipse(-50+map(0,0,width,-10,10),+50+map(0,0,height,-10,10),70)
ellipse(-50+map(0,0,width,-10,20),+50+map(0,0,height,-10,10),70)
ellipse(+90+map(0,0,width,-10,10),+50+map(0,0,height,-10,10),90,70)
rect(-50+map(0,0,width,-10,10),55+map(0,0,height,-10,10),135,30)
rect(75+map(0,0,width,-10,10),-75+map(0,0,height,-10,10),55,135)
rect(-75+map(0,0,width,-10,10),-75+map(0,0,height,-10,10),55,135)
rect(-50+map(0,0,width,-10,10),-108+map(0,0,height,-10,10),100,30)



fill("#4D3900")
ellipse(+5+map(0,0,width,-10,10),-90+map(0,0,height,-10,10),5)
ellipse(+60+map(0,0,width,-10,10),-90+map(0,0,height,-10,10),5)

fill("#a52a2a")
arc(30+map(0,0,width,-10,10),-80+map(0,0,height,-10,10),120,-5,0,PI)
 
if(mouseIsPressed)
 {
  fill("#a52a2a")
  arc(30+map(0,0,width,-10,10),-80+map(0,0,height,-10,10),120,10,0,PI)
 }

pop()

 //藍色的百變怪
push()

noStroke()//map即是將此物體定為圓心，並在此範圍內移動(0~-10)
fill(clr_r)
ellipse(+30+map(0,0,width,-10,10),-15+map(0,0,height,-10,10),100)//身體
ellipse(-27+map(0,0,width,-10,10),-50+map(0,0,height,-10,10),45,60)//左手
ellipse(-27+map(0,0,width,-10,20),-50+map(0,0,height,-10,10),45,60)//左手(外伸)
ellipse(+10+map(0,0,width,-10,10),-60+map(0,0,height,-10,10),60)//左邊的頭
ellipse(+60+map(0,0,width,-10,10),-60+map(0,0,height,-10,10),45)//右邊的頭
ellipse(+100+map(0,0,width,-10,10),-50+map(0,0,height,-10,10),40,60)//右手
ellipse(+100+map(0,0,width,-20,20),-50+map(0,0,height,-10,10),40,60)//右手(外伸)
ellipse(+85+map(0,0,width,-20,20),+30+map(0,0,height,-10,10),75,60)//右邊的腳
ellipse(+85+map(0,0,width,-10,10),+30+map(0,0,height,-10,10),75,60)//右邊的腳(外伸)
ellipse(-30+map(0,0,width,-10,10),+30+map(0,0,height,-10,10),60)//左邊的腳
ellipse(-30+map(0,0,width,-10,20),+30+map(0,0,height,-10,10),60)//左邊的腳(外伸)
rect(-30+map(0,0,width,-10,10),25+map(0,0,height,-10,10),100,35)
rect(65+map(0,0,width,-10,10),-75+map(0,0,height,-10,10),45,125)
rect(-40+map(0,0,width,-10,10),-75+map(0,0,height,-10,10),55,135)
rect(-30+map(0,0,width,-10,10),-78+map(0,0,height,-10,10),100,30)



fill("#4D3900")
ellipse(+10+map(0,0,width,-10,10),-55+map(0,0,height,-10,10),5)
ellipse(+60+map(0,0,width,-10,10),-55+map(0,0,height,-10,10),5)

fill("#a52a2a")
arc(35+map(0,0,width,-10,10),-47+map(0,0,height,-10,10),100,-5,0,PI)
 
if(mouseIsPressed)//mouseIsPressed為true，代表有按下滑鼠
{

   fill("#a52a2a")
   arc(35+map(0,0,width,-10,10),-47+map(0,0,height,-10,10),100,10,0,PI)

}

pop()
    
  pop()    
    
}

function mousePressed(){
    
  //紀錄資料
  positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
  positionListY.push(mouseY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  //畫圖
  push() 
    translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
      
  }
  
  
  //+++++++++++複製貼上，確認代號+++++++++++++
  function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        fill(0, 255, 0);
        // noStroke();
        if (j == 8) {				
          pointerX8 = map(keypoint[0],0,640,0,width)
          pointerY8 = map(keypoint[1],0,480,0,height)
          pointerZ8 = keypoint[2]
          console.log(pointerZ8)
          if(pointerZ8<-40)
          {
            R_draw(pointerX8,pointerY8)
          }
          
          ellipse(pointerX8, pointerY8, 30, 30);
        } else
        if (j == 4) {   
      fill(255,0,0)
          pointerX4 = map(keypoint[0],0,640,0,width)
          pointerY4 = map(keypoint[1],0,480,0,height)
          // pointerZ = keypoint[2]
          // print(pointerZ)
          ellipse(pointerX4, pointerY4, 30, 30);
      
        } else
        if (j == 14) {
          pointerX14 = keypoint[0];
          pointerY14 =  keypoint[1];
        } else
        if (j == 16) {
          pointerX16 = keypoint[0];
          pointerY16 =  keypoint[1];
        }
        
      }
    
    }
  }

  
  function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
    push()
      translate(F_x,F_y);
    if(pointerY14<pointerY16){
      drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6))
    }else
    {
      //無名指沒有彎曲，張開無名指，花旋轉
      rotate(frameCount/20)
      drawFlower(F_clr,F_clr_r,F_size)
        
    }
    pop()
  }
  
  function R_draw(handX,handY)
  {
  positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
  positionListY.push(handY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  //畫圖
  push() 
    translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFlower(clr,clr_r,sizeList[data_length-1]) 
  pop()
  
  }
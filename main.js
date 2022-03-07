noseX=0;
noseY=0;
difference=0;
leftWristX=0;
rightWristX=0;

function setup(){
    canvas=createCanvas(550,550);
    canvas.position(560,150);

    video=createCapture(VIDEO);
    video.size(500,550);

    poseNet=ml5.poseNet(video,ModelLoaded);
    poseNet.on("pose",gotPoses);

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX=results[0].pose.rightEye.x;
        noseY=results[0].pose.rightEye.y;
        console.log("noseX = " +noseX+"noseY = "+noseY);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        difference=floor(leftWristX-rightWristX);
        console.log("leftWristX = "+leftWristX+", rightWristX = "+rightWristX+", difference = "+difference);
    }
}

function ModelLoaded(){
    console.log("poseNet is loaded");
}

function draw(){
    background('white');
    fill('black');
    stroke('black');
    square(noseX,noseY,difference);
    document.getElementById("SquareSides").innerHTML="width and height of the square will be"+difference;
}
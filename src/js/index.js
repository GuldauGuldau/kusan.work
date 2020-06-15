import "./import/cuberportfolio";
import $ from "jquery";
import { motionPath, shape, timeline, render, play } from 'wilderness';

jQuery('.grid').cubeportfolio({
  layoutMode: 'mosaic',
  filters: '#grid-filters',
  gapHorizontal: -1,
  gapVertical: -1,
  caption: 'zoom',
  animationType: 'skew',
  displayTypeSpeed: 100,
  gridAdjustment: 'responsive',
  displayType: 'fadeIn',
  displayTypeSpeed: 100,
  sortByDimension: true,
  mediaQueries: [{
      width: 1500,
      cols: 5
  },{
      width: 1050,
      cols: 5
  }, {
      width: 768,
      cols: 3
  }, {
      width: 480,
      cols: 2
  }, {
      width: 320,
      cols: 1
  }],
});

// SVG Morphing Animation ----------------------------
var one = "M22.8168 4C23.5866 2.66667 25.5111 2.66667 26.2809 4L45.8267 37.8544C46.5965 39.1877 45.6343 40.8544 44.0947 40.8544L5.00298 40.8544C3.46338 40.8544 2.50113 39.1877 3.27093 37.8544L22.8168 4Z",
    two = "M24.8743 1L32.1065 14.0457L46.7486 16.8926L36.5763 27.8022L38.3934 42.6074L24.8743 36.3042L11.3552 42.6074L13.1723 27.8022L3 16.8926L17.6421 14.0457L24.8743 1Z",
    three = "M19.7176 0.558016C19.9864 -0.186004 21.0136 -0.186006 21.2824 0.558013L26.3277 14.5253C26.4122 14.7592 26.5922 14.9436 26.8206 15.0302L40.4553 20.1985C41.1816 20.4738 41.1816 21.5262 40.4553 21.8015L26.8206 26.9698C26.5922 27.0564 26.4122 27.2408 26.3277 27.4747L21.2824 41.442C21.0136 42.186 19.9864 42.186 19.7176 41.442L14.6723 27.4747C14.5878 27.2408 14.4078 27.0564 14.1794 26.9698L0.544729 21.8015C-0.181575 21.5262 -0.181577 20.4738 0.544727 20.1985L14.1794 15.0302C14.4078 14.9436 14.5878 14.7592 14.6723 14.5253L19.7176 0.558016Z";
var dataMorphSet = [
  { path : one, color: '#FF7BB2'},
  { path : two, color: '#5BE269'},
  { path : three, color: '#FFBD12'}
];

let dataLength = dataMorphSet.length - 1;
function animateSvgMorphing(elem) {
  let startIndex = parseInt(elem.dataset.index);
  let endIndex   = (startIndex == parseInt(dataLength)) ? 0 : startIndex + 1;
  let keyframe1 = {
    type: 'path',
    d: dataMorphSet[startIndex]['path'],
    fill: dataMorphSet[startIndex]['color']
  }
  let keyframe2 = {
    type: 'path',
    d: dataMorphSet[endIndex]['path'],
    fill: dataMorphSet[endIndex]['color']
  }
  elem.dataset.index = endIndex;
  let morph = shape(keyframe1, keyframe2);
  let animation = timeline(morph, {
    duration: 2000,
    iterations: 1,
    alternate: true,
  });
  render(elem, animation);
  play(animation);
  animation.event.subscribe('timeline.finish', () => {
    setTimeout(() => {
      while (elem.firstChild) {
        elem.lastChild.remove();
      }
      animateSvgMorphing(elem);
    }, 2000)

  })
}
animateSvgMorphing(document.querySelector('#morphA'));
animateSvgMorphing(document.querySelector('#morphB'));

// SVG Motion path Animation ----------------------------
const plainShapeObject = {
  type: 'path',
  fill: "#5FD4D6",
  d: 'M11.0001 3.59186C11.9722 1.60813 14.3685 0.788101 16.3522 1.76027L35.2061 11.0001C37.1898 11.9722 38.0099 14.3685 37.0377 16.3522L27.7979 35.2061C26.8257 37.1898 24.4295 38.0098 22.4458 37.0377L3.59187 27.7979C1.60814 26.8257 0.788111 24.4295 1.76028 22.4458L11.0001 3.59186Z'
}
const motionPathPlainShapeObject = {
  type: 'path',
  stroke: "black",
  fill: "none",
  d: 'M29 97.4981C41.5673 106.751 105.8 147 157.931 147C246.904 147 205.393 74.2857 216.578 45.5856C226.353 20.5058 259.4 11.3506 285 23.0139'
}
const keyframe1 = plainShapeObject
const keyframe2 = {
  ...plainShapeObject,
  forces: [ motionPath(motionPathPlainShapeObject) ]
}
const circleOnMotionPath = shape(keyframe1, keyframe2);
const animation = timeline(circleOnMotionPath, {
  duration: 18000,
  iterations: Infinity,
  alternate: true
})
render(document.querySelector('#mp'), animation)
play(animation)

// SVG Circle Animation ----------------------------
const el = document.querySelector('#svg-circle');
const keyframea = { el }
const keyframeb = {
  el,
  r: 32
}
const shapeOptions = { replace: el }
const square = shape(keyframea, keyframeb, shapeOptions)
const playbackOptions = {
  alternate: true,
  duration: 5000,
  iterations: Infinity
}
const animation1 = timeline(square, playbackOptions)
render(document.querySelector('svg'), animation1)
play(animation1)

// SVG Wave Motion path Animation ----------------------------
const plainShapeObjectW = {
  type: 'path',
  fill: "#DE98AD",
  d: 'M48.2247 49.4975C48.4368 47.7297 48.5075 46.669 47.5176 45.6791C46.5276 44.6891 45.467 44.7599 43.6992 44.972C41.79 45.1841 39.4566 45.5377 37.3352 43.4164C35.2846 41.3657 35.5675 38.9616 35.7796 37.0524C35.9917 35.2846 36.0624 34.224 35.0725 33.234C34.0825 32.2441 33.0219 32.3148 31.2541 32.5269C29.3449 32.739 27.0115 33.0926 24.8902 30.9713C22.8395 28.9207 23.1224 26.5165 23.3345 24.6073C23.5467 22.8395 23.6174 21.7789 22.6274 20.7889C21.6375 19.799 20.5768 19.8697 18.809 20.0818C16.8998 20.294 14.5664 20.6475 12.4451 18.5262C10.3238 16.4049 10.6773 14.0714 10.8894 12.1622C11.1016 10.3945 11.1723 9.33381 10.1823 8.34386C9.19239 7.35391 8.13173 7.42462 6.36396 7.63675C4.45477 7.84888 2.12132 8.20244 0 6.08112L2.12132 3.9598C3.11127 4.94974 4.17193 4.87903 5.9397 4.6669C7.84888 4.45477 10.1823 4.10122 12.3037 6.22254C14.425 8.34386 14.0714 10.6773 13.8593 12.5865C13.6472 14.3543 13.5765 15.4149 14.5664 16.4049C15.5563 17.3948 16.617 17.3241 18.3848 17.112C20.294 16.8998 22.6274 16.5463 24.7487 18.6676C26.7993 20.7182 26.5165 23.1224 26.3044 25.0316C26.0922 26.7993 26.0215 27.86 27.0115 28.85C28.0014 29.8399 29.0621 29.7692 30.8299 29.5571C32.739 29.3449 35.0725 28.9914 37.1938 31.1127C39.2444 33.1633 38.9616 35.5675 38.7495 37.4767C38.5373 39.2444 38.4666 40.3051 39.4566 41.295C40.4465 42.285 41.5072 42.2143 43.2749 42.0021C45.1841 41.79 47.5176 41.4365 49.6389 43.5578C51.7602 45.6791 51.4067 48.0125 51.1945 49.9217C50.9824 51.6895 50.9117 52.7502 51.9016 53.7401L49.7803 55.8614C47.7297 53.8108 48.0126 51.4067 48.2247 49.4975Z',

}
const motionPathPlainShapeObjectW = {
  type: 'path',
  stroke: "black",
  fill: "none",
  d: 'M164 88L82 45L82.4644 44.1144L164.464 87.1144L164 88Z',
  easing: 'linear'
}
const keyframe1W = plainShapeObjectW
const keyframe2W = {
  ...plainShapeObjectW,
  forces: [ motionPath(motionPathPlainShapeObjectW) ]
}
const circleOnMotionPathW = shape(keyframe1W, keyframe2W);
const animationW = timeline(circleOnMotionPathW, {
  duration: 20000,
  iterations: Infinity,
  alternate: true
})
render(document.querySelector('#mpWave'), animationW)
play(animationW)

// Smooth Scroll ----------------------------
$('.anchor').click(function(event){
    event.preventDefault();
    let selector = event.target.getAttribute("href");
    let nodeObj = document.querySelector(selector);
    if(nodeObj) {
      nodeObj.scrollIntoView({
         behavior: "smooth",
         block:    "start"
      });
    } else {
      window.location.href = '/' + selector;
    }
  });
// Open Menu ----------------------------
$('.menu-open').click(function() {
  $('body').addClass('is-open');
})
$('.menu-close').click(function() {
  $('body').removeClass('is-open');
})
$('.menu-list a').click(function() {
  $('body').removeClass('is-open');
})

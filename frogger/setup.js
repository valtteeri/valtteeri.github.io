const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const grid = 80;
let keys = [];
let score = 0;
let collisionCount = 0;
let frame = 0;
let gameSpeed = 1;
let safe = false;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';

const collisions = new Image();
collisions.src = 'collisions.png';

const turtle = new Image();
turtle.src = 'turtles.png';

const log = new Image();
log.src = 'log.png';

const froggerSprite = new Image();
froggerSprite.src = 'frog_spritesheet.png';

const car = new Image();
car.src = 'cars.png';
let numberOfCars = 3;
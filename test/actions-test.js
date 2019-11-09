const score = require('../score');
const condition = require('../condition');
const world = require('../world');
const config = require('../config');
const logger = require('../common/logger');

const row = config.row;
const column = config.column;

const conditionArr = condition.genCondition();
let worldArr = world.genEmptyArr(row, column);
world.initWorld(worldArr);

let strategyArr = [6,6,2,1,3,5,2,3,2,5,4,0,0,6,1,6,6,1,4,5,0,3,0,1,3,6,5,5,1,4,6,1,5,2,1,5,3,2,5,5,1,5,6,1,3,2,2,5,2,2,5,5,1,3,5,5,6,6,6,6,1,1,1,5,1,5,1,1,5,6,2,3,1,2,5,4,1,5,4,3,3,2,4,1,1,0,5,3,4,3,4,2,5,5,0,5,0,3,5,1,5,2,3,0,5,1,2,5,2,5,4,2,3,5,2,2,3,3,2,5,6,6,5,0,3,5,5,2,5,6,2,5,6,3,3,4,6,5,3,1,5,6,3,3,6,1,5,4,1,5,0,1,3,3,1,5,1,2,5,6,3,3,2,1,0,5,3,4,4,5,3,6,0,5,1,2,5,2,3,0,2,3,3,1,0,3,6,6,0,2,5,0,4,0,5,0,1,5,3,0,5,4,0,5,3,3,5,0,1,0,2,0,0,2,0,3,1,0,0,4,0,5,1,2,5,1,1,0,1,1,0,1,6,3,6,0,0,5,6,0,0,6,0];
let actionArr = score.getActions(worldArr, conditionArr, strategyArr);
logger.info('actionArr=', actionArr.join(','));
# GeneticAlgorithm

## 一、演示地址

遗传算法实现的小黄机器人，演示地址：https://ga.hiqiuyi.cn/

## 二、clone代码，本地查看效果

``` bash
git clone https://github.com/hiqiuyi/GeneticAlgorithm.git
cd GeneticAlgorithm

浏览器打开文件index.html，查看效果
```



## 三、本地训练机器人小黄机器人

``` bash
node app.js
```

训练过程显示：

![train](https://pic.hiqiuyi.cn/blog/train.jpg)

## 四、机器人小黄介绍

机器人小黄，它的世界是二维的，到处是丢弃的易拉罐。我们将用遗传算法为小黄进化出一个"脑"(即控制策略)。

![word](https://pic.hiqiuyi.cn/blog/word.png)

备注：点击图中小苹果，重新开始游戏

小黄的工作是清理它的世界中的空易拉罐。由上图所示，小黄的世界由10x10的100个格子组成。小黄在位置(0, 0)。我们可以假设周围围绕着一堵墙。许多格子中散落着易拉罐（每个格子中的易拉罐不会多于一个）。 小黄貌似不是很聪明的样子，他只能看到东南西北相邻的4个格子以及本身所在格子中的情况。格子可以是空的(没有罐子)，或者有一个罐子，或者是墙。

每次清扫工作小黄可以执行200个动作。动作可以是以下7种：

* 往北移动
* 往南移动
* 往东移动
* 往西移动
* 随机移动
* 不动
* 收集罐子
  
每个动作都会受到奖赏或惩罚，如果小黄所在的格子中有罐子并且收集起来了，就会得到10分的奖赏。如果进行收集罐子的动作而格子中又没有罐子，就会被罚1分。如果撞到了墙，会被罚5分，并弹回原来的格子。

显然，小黄尽可能地多收集罐子，别撞墙，没罐子的时候别去捡，得到的分数就最高。

这是一个比较简单的问题，人工为小黄设计一个好策略可能也不是很难。不过，有了遗传算法我们就可以什么也不用干，我们只需要等着计算机替我们进化出来。

下面我们用遗传算法来为小黄进化出一个好策略。

要做的第一步，就是搞清楚我们想要进化的到底是啥？也就是说具体策略是啥？

一般来说，策略指的是一组规则，规则给出了在各种情形下你应当采取的行动。那么多少种可能的情形呢？小黄可以看到5个格子(当前格子、东、南、西、北)，每个格子可以标为空、罐和墙。这样就有243种可能情形(种可能)

比如说，下面这张策略表显示的就是一个策略：

![action](https://pic.hiqiuyi.cn/blog/action.png)
要知道下一步怎么做，小黄只需要查看策略表。

小黄在(0, 0)位置时，查到对应的行动是往西移动。因此它往西移动一格，结果一头撞到墙上。

我之前并没有说这是个好的策略，寻找好策略不关我的事，这事归遗传算法管。

我们写了一个遗传算法程序来进化小黄的策略。算法中，群体里每一个个体都是一个策略(与各种可能情形相对应的行动列表)。也就是说，对于上面策略表中的策略，GA用来演化的个体就是最右侧243个行动依次列出的列表。

现在，我们再次解释一下GA的工作原理：

第1步：生成初始群体，初始群体有200个随机个体，程序中用一个伪随机数发生器来进行各种随机选择。
从现在开始我们重复1000次​​步骤2~步骤4​​。

第2步：计算群体中每个个体的适应度。比如说，通过让小黄执行100次不同的清扫任务来确定策略的适应度。每次将小黄置于位置(0, 0)，随机撒一些易拉罐(每个格子至多1个易拉罐，格子有易拉罐的概率是50%)。然后让小黄根据策略在每次任务中执行200个动作。小黄的得分就是策略执行各任务的分数。策略的适应度是执行100次任务的平均得分，每次的罐子分布都不一样。
第3步：进化，让当前群体进化，产生出下一代群体，直到新群体有200个个体。进化的步骤如下：(a)根据适应度随机选择出一对个体A和B作为父母。策略的适应度越高，被选中的概率则越大。(b)父母交配产生两个子代个体。随机选择一个位置将两个数字串截断；将A的前段与B的后段合在一起形成一个子代个体，将A的后段与B的前段个体合在一起形成另一个子代个体。©让子代个体以很小的概率产生变异。以小概率选出1个或几个数，用0到6之间的随机数替换。
第4步：新群体产生200个个体后，回到第2步，对新一代群体进行处理。

## 五、项目目录介绍

``` bash
\GENETICALGORITHM
│  .gitignore
│  app.js               启动入口
│  condition.js         遗传训练                             
│  config.js            配置文件
│  index.html           前端页面显示
│  main.js              控制循环迭代
│  package-lock.json
│  package.json         依赖包
│  README.md
│  score.js             行为得分计算
│  world.js             世界数组
│
├─common
│      logger.js        日志文件
│      math.js          公用算法
│
├─images
│      action.png
│      apple.png
│      can.png
│      smile.png
│      word.png
│
├─libs
│      phaser-arcade-physics.min.js 绘图依赖的框架
│
└─test
        actions-test.js
        gene_mutation_test.js
        score-test.js
```

## 六、项目灵感来源

书籍：《复杂》的第9章：遗传算法  
作者: [英] 梅拉妮·米歇尔
![复杂](https://img1.doubanio.com/view/subject/l/public/s29715647.jpg)

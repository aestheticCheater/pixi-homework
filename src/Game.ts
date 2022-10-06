import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { BallBehavior } from './BallBehavior';
import { SquareBehavior} from './SquareBehavior';
import { Button1 } from './Button1';
import { Button2 } from './Button2';
import { GameApplication } from './GameApplication';


export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;   

    private changeBehaviorBtn: Button1;
    private initialBehaviorBtn: Button2;

    constructor() {
        super();
        this.init();
    }



    private init() {
        this.createTicker();
        this.createGameObjList();
        this.createGameObjContainer();
        this.createUIContainer();
        this.createButton();
        this.createGameObj();
    }

    private createGameObjList() {
        this.gameObjects = new Map<string, GameObject>();
    }

    private createGameObjContainer() {
    
        this.gameObjectContainer = new PIXI.Container();
        this.addChild(this.gameObjectContainer);
    }
    
    private createUIContainer() {
        this.uiContainer = new PIXI.Container();
        this.addChild(this.uiContainer);
    }

    private createButton() {
        this.changeBehaviorBtn = new Button1('Change behavior');
    
        this.changeBehaviorBtn.x = 400;
        this.changeBehaviorBtn.y = GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 50;
        this.changeBehaviorBtn.getDispatcher().addListener('changebtnup',this.onChangeBtnUp, this);
 
        this.uiContainer.addChild(this.changeBehaviorBtn);
 

        this.initialBehaviorBtn = new Button2('Initial behavior');

        this.initialBehaviorBtn.x = 100;
        this.initialBehaviorBtn.y = GameApplication.getApp().view.height - this.initialBehaviorBtn.height - 50;
        this.initialBehaviorBtn.getDispatcher().addListener('initbtnup',this.onInitBtnUp, this);

        this.uiContainer.addChild(this.initialBehaviorBtn);
    }

    private createTicker() {
        const ticker = new PIXI.Ticker();
        ticker.add(this.update,this);
        ticker.start();
    }

    private createGameObj() {
        this.createBallGameObj();
        this.createSquareGameObj();
    }
    
    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject('gameObj1'); 
        // const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        // ballGameObj.addBehavior(ballBehavior);

        ballGameObj.x = 100;
        ballGameObj.y = 100;
          
        this.addGameObject(ballGameObj);
        
        const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        ballBehavior.setSquareObjRef(this.getGameObjById('gameObj2'));
        ballGameObj.addBehavior('ballBehavior', ballBehavior);
    }

    private createSquareGameObj() {
        const squareGameObj: GameObject = new GameObject('gameObj2'); 
        squareGameObj.x = 500;
        squareGameObj.y = 75;

          
        this.addGameObject(squareGameObj);
        
        const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
        squareBehavior.setBallObjRef(this.getGameObjById('gameObj1'));
        squareGameObj.addBehavior('squareBehavior', squareBehavior);
        
    } 

    private addGameObject(gameObj: GameObject) {
       
        this.gameObjectContainer.addChild(gameObj);
        this.gameObjects.set(gameObj.getId(), gameObj);

    }

    // private createSquareGameObj() {
    //     const squareGameObj: GameObject = new GameObject('gameObj2');
    //     const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
    //     squareGameObj.addBehavior(squareBehavior);
    //     this.gameObjectContainer.addChild(squareGameObj);
    //     this.gameObjects.push(squareGameObj);
    // }

    private update(delta:number) {
        this.gameObjects.forEach(gameObj => {
            gameObj.update(delta);
        });
    }

    

    private getGameObjById(id: string) {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }

    private onInitBtnUp() {
        // const gameObj: GameObject = this.getGameObjById('gameObj1');
   
        // if(!gameObj) {
        //     return;
        // }
        // const squareBehavior: SquareBehavior = new SquareBehavior(gameObj);
        //     gameObj.addBehavior('squareBehavior',squareBehavior);

    }

    private onChangeBtnUp() {
        // const gameObj: GameObject = this.getGameObjById('gameObj1');
   
        // if(!gameObj) {
        //     return;
        // }

        // gameObj.removeBehavior('squareBehavior');
        // const ballBehavior: BallBehavior = new BallBehavior(gameObj);
        // gameObj.addBehavior('ballBehavior', ballBehavior);
    }
    
}
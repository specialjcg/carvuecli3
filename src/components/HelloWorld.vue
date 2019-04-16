<template>
  <div>
    <div class="parametre">
    
    <label for="posy">position en y</label>
    <b-form-input id="posy" v-model="choixy" type="range" min="-100" max="100" @change="changey" size="1"></b-form-input>
    <div class="mt-2">Value: {{ choixy }}</div>
   </div>
    <div
      class="maMission"
      v-for="(task, num) in tasks"
      :key="num"
      @mouseenter.prevent="rotationCarroussel()"
      
      :id="imginfo(num)"
    >
      <div class="maMission2">
        <div class="transition-maison">
          <h1>
            <span>{{ task }}</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

class positionCarrousselglobal {
  x: Array<number>;
  y: Array<number>;
  z: Array<number>;
  expand: Array<number>;
  opa: Array<number>;
  sc: Array<number>;
  zindex: Array<number>;
  constructor(
    x: Array<number>,
    y: Array<number>,
    z: Array<number>,
    expand: Array<number>,
    opa: Array<number>,
    sc: Array<number>,
    zindex: Array<number>
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.expand = expand;
    this.opa = opa;
    this.sc = sc;
    this.zindex = zindex;
  }
}
@Component({})
export default class HelloWorld extends Vue {
  index: number = 0;

  positionCarroussel: positionCarrousselglobal;

  choixy: number = 0;
  tasks: Array<string> = [
    "On a deux vies. La deuxième commence quand on réalise qu’on n’en a qu’une. Confucius",
    "« Si vous pouvez le rêver, vous pouvez le faire. » Walt Disney",
    "Si vous pensez que l’aventure est dangereuse, essayez la routine, elle est mortelle. » Paulo Coelho",
    "« Un voyage de mille lieues commence toujours par un premier pas. » Lao Tseu",
    "« J’ai des questions à toutes vos réponses »  Woody Allen -",
    "« Les autres parlent, moi je travaille »picasso"
  ];
  mounted() {
    this.choixy = 0;
    this.index = 0;
     this.rotationCarroussel()
  } 
   imginfo(index1:number) {
      var essai = "imginfo" + index1;

      return essai;
    }
  constructor() {
    super();
    this.choixy = 0;
   
    this.positionCarroussel = new positionCarrousselglobal(
      [0, 0, 0, 0, 0, 0],
      [300, 150, 25, 25, 150, 300],
      [0, 100, 50, 100, 50, 0],
      [20, 20, 20, 20, 20, 20],
      [0.9, 0.7, 0.7, 0.5, 0.5, 0.3],
      [1, 0.8, 0.7, 0.6, 0.5, 0.4],
      [6, 5, 4, 3, 2, 1]
    );
   
  }
styleclass(num1:number){
   var tran = "";
   
    tran =
      "translate3d(" +
      this.positionCarroussel.x[num1] +
      "px, " +
      this.positionCarroussel.y[num1] +
      "px," +
      (this.positionCarroussel.z[num1] +
        num1 * this.positionCarroussel.expand[num1]) +
      "px) scale(" +
      this.positionCarroussel.sc[num1] +
      ")";
    var essai:number = this.positionCarroussel.zindex[num1];
  var opa = this.positionCarroussel.opa[num1].toString();
  const myElement = document.getElementById("imginfo" + num1)!;
  if (myElement!=null){
     myElement.style.opacity = opa;
     myElement.style.transition="3s ease";
     myElement.style.transform=tran;
     myElement.style.zIndex=essai.toString();

     
     }


}
  

  rotationLignecarroussel(positionCarrousselinter: Array<number>) {
    var interCarroussel = 0;
    interCarroussel = positionCarrousselinter[0];
    for (var i = 0; i < positionCarrousselinter.length - 1; i++) {
      positionCarrousselinter[i] = positionCarrousselinter[i + 1];
    }
    positionCarrousselinter[
      positionCarrousselinter.length - 1
    ] = interCarroussel;
    return positionCarrousselinter;
  }
  rotationCarroussel() {
   
    this.positionCarroussel.x = this.rotationLignecarroussel(
      this.positionCarroussel.x
    );
    this.positionCarroussel.y = this.rotationLignecarroussel(
      this.positionCarroussel.y
    );
    this.positionCarroussel.z = this.rotationLignecarroussel(
      this.positionCarroussel.z
    );
    this.positionCarroussel.expand = this.rotationLignecarroussel(
      this.positionCarroussel.expand
    );
    this.positionCarroussel.sc = this.rotationLignecarroussel(
      this.positionCarroussel.sc
    );
    this.positionCarroussel.opa = this.rotationLignecarroussel(
      this.positionCarroussel.opa
    );
    this.positionCarroussel.zindex = this.rotationLignecarroussel(
      this.positionCarroussel.zindex
    );
    for (var i = 0; i < this.positionCarroussel.x.length ; i++) {
       this.styleclass(i)
    }
  }

  changey(): void {
    for (var i = 0; i < 6; i++) {
      this.positionCarroussel.y[i] = this.positionCarroussel.y[i] + Number(this.choixy);
    }
    for (i = 0; i < this.positionCarroussel.x.length ; i++) {
       this.styleclass(i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color1: rgba(5, 81, 148, 1);
$color2: rgba(87, 74, 226, 1);
$color3: rgba(101, 69, 151, 1);
$color4: rgba(171, 129, 205, 1);
$color5: rgba(226, 173, 242, 1);
.maMission {
  height: 10vw;
  position: absolute;
  top: 0;
  left: 20vw;
  bottom: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  /*perspective: 2px;*/
  transform-style: preserve-3d;
  /*top: 50%;

        bottom: 0;
        left: 50%;*/
  width: 50vw;
  background-color:$color1;
}

.maMission2 {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  width: 50vw;
  color:$color5;
  text-align: center;

  top: 50%;
  /* poussé de la moitié de hauteur du référent */
  transform: translateY(-50%);
  /* tiré de la moitié de sa propre hauteur */
}
.parametre{
  max-width: 250px;
}
h1 {
  letter-spacing: 0vw;
  font-family: Open Sans;
  font-size: 1.618em;
  font-weight: 800;
  line-height: 1.2;
  margin: 1.414em 0 0.5em;
}
</style>

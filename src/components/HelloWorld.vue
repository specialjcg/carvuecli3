<template>
  <div>
    <section class="styleParametre">
      <button @click="messagetext()">contenu recherche</button>

      <h1 class="titre">Réglage</h1>
      <div class="parametre">
        <!--<div class="titre">Réglage</div>-->
        <button type="button" class="btn btn-3">
          position en y
          <span class="badge">{{ choixy }}</span>
        </button>
        <br /><br />
        <b-form-input
          id="posy"
          v-model="choixy"
          type="range"
          min="-100"
          max="100"
          size="1"
          @input="changey"
        ></b-form-input>
      </div>
      <div class="parametre">
        <button type="button" class="btn btn-3">
          position en x
          <span class="badge">{{ choixx }}</span>
        </button>
        <br /><br />
        <b-form-input
          id="posx"
          v-model="choixx"
          type="range"
          min="-100"
          max="100"
          size="1"
          @input="changex"
        ></b-form-input>
      </div>
      <div class="parametre">
        <button type="button" class="btn btn-3">
          echelle
          <span class="badge">{{ choixsc }}</span>
        </button>
        <br /><br />
        <b-form-input
          id="posscale"
          v-model="choixsc"
          type="range"
          min="-100"
          max="100"
          size="1"
          @input="changesc"
        ></b-form-input>
      </div>
      <div class="parametre">
        <button type="button" class="btn btn-3">
          largeur panneau
          <span class="badge">{{ choixlargeur }}</span>
        </button>
        <br /><br />
        <b-form-input
          id="poslargeur"
          v-model="choixlargeur"
          type="range"
          min="10"
          max="60"
          size="1"
          @input="changeWidth"
        ></b-form-input>
      </div>
      <div class="parametre">
        <button type="button" class="btn btn-3">
          hauteur panneau
          <span class="badge">{{ choixhauteur }}</span>
        </button>
        <br /><br />
        <b-form-input
          id="poshauteur"
          v-model="choixhauteur"
          type="range"
          min="1"
          max="50"
          size="1"
          @input="changeHeight"
        ></b-form-input>
      </div>
    </section>
    <section class="styleParametre2">
      <h1 class="titre">Rendu</h1>
      <div
        v-for="(task, num) in tasks"
        :id="imginfo(num)"
        :key="num"
        class="maMission"
        @mouseenter.prevent="rotationCarroussel()"
      >
        <div class="maMission2">
          <h1>{{ task.title }}<br />{{ task.author }}</h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import io from "socket.io-client";
class citation {
  title: string;
  author: string;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}
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
  socket: any;
  positionCarroussel: positionCarrousselglobal;

  choixy: number = 0;
  tasks: citation[] = [
    new citation("", ""),
    new citation("", ""),
    new citation("", ""),
    new citation("", ""),
    new citation("", ""),
    new citation("", "")
  ];
  choixx: number = 0;
  choixsc: number = 0;

  choixyinter: number = 0;
  choixxinter: number = 0;
  choixscinter: number = 0;

  choixhauteur: number = 3;
  choixlargeur: number = 50;
  choixlargeurinter: number = 0;
  citationseul: string = "";

  mounted() {
    this.choixy = 0;
    this.choixx = 0;
    this.choixsc = 0;
    this.choixyinter = 0;
    this.choixxinter = 0;
    this.choixscinter = 0;
    this.choixhauteur = 3;
    this.choixlargeur = 50;
    this.choixlargeurinter = 0;
    this.index = 0;
    this.tasks = [
      new citation("", ""),
      new citation("", ""),
      new citation("", ""),
      new citation("", ""),
      new citation("", ""),
      new citation("", "")
    ];

    this.socket = io("http://localhost:3000");

    this.rotationCarroussel();
    this.messagetext();
  }

  imginfo(index1: number) {
    var essai = "imginfo" + index1;

    return essai;
  }
  constructor() {
    super();
    this.choixy = 0;
    this.choixx = 0;
    this.choixsc = 0;
    this.choixyinter = 0;
    this.choixxinter = 0;
    this.choixscinter = 0;
    this.choixhauteur = 0;
    this.choixlargeur = 50;
    this.choixlargeurinter = 0;
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
  messagetext() {
    this.socket.emit("lancerecherche2");
    this.socket.emit("resultat", function(data: any) {});
    var self = this;

    this.socket.on("messagetext", function(data: any) {
      for (let i = 0; i < data.length; i++) {
        self.tasks[i] = new citation(data[i].title, data[i].author);
      }
      var temp = (self.choixx = 0);
      self.choixx = 10;
      self.choixx = temp;
    });
  }
  styleclass(num1: number) {
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
    var essai: number = this.positionCarroussel.zindex[num1];
    var opa = this.positionCarroussel.opa[num1].toString();
    const myElement = document.getElementById("imginfo" + num1)!;
    if (myElement != null) {
      myElement.style.opacity = opa;
      myElement.style.filter = "blur(" + (0.9 - Number(opa)) * 10 + "px)";

      myElement.style.transition = "3s ease";
      myElement.style.transform = tran;
      myElement.style.zIndex = essai.toString();
    }
  }
  changeWidth() {
    for (var num1 = 0; num1 < 6; num1++) {
      const myElement = document.getElementById("imginfo" + num1)!;
      if (myElement != null) {
        myElement.style.width = this.choixlargeur + "vw";
      }
    }
  }
  changeHeight() {
    for (var num1 = 0; num1 < 6; num1++) {
      const myElement = document.getElementById("imginfo" + num1)!;
      if (myElement != null) {
        myElement.style.height = this.choixhauteur + "vh";
      }
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
    for (var i = 0; i < 6; i++) {
      this.styleclass(i);
    }
  }

  changey(): void {
    for (var i = 0; i < 6; i++) {
      this.positionCarroussel.y[i] =
        this.positionCarroussel.y[i] + Number(this.choixy - this.choixyinter);
    }
    for (i = 0; i < this.positionCarroussel.x.length; i++) {
      this.styleclass(i);
    }
    this.choixyinter = this.choixy;
  }
  changex(): void {
    for (var i = 0; i < 6; i++) {
      this.positionCarroussel.x[i] =
        this.positionCarroussel.x[i] + Number(this.choixx - this.choixxinter);
    }
    for (i = 0; i < this.positionCarroussel.x.length; i++) {
      this.styleclass(i);
    }
    this.choixxinter = this.choixx;
  }
  changesc(): void {
    for (var i = 0; i < 6; i++) {
      this.positionCarroussel.sc[i] =
        this.positionCarroussel.sc[i] +
        Number(this.choixsc - this.choixscinter) / 500;
    }
    for (i = 0; i < this.positionCarroussel.x.length; i++) {
      this.styleclass(i);
    }
    this.choixscinter = this.choixsc;
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
.btn-3 {
  background-image: linear-gradient(
    to right,
    #84fab0 0%,
    #8fd3f4 51%,
    #84fab0 100%
  );
}
.btn:hover {
  background-position: right center; /* change the direction of the change here */
}
.maMission {
  height: 10vw;
  position: absolute;

  top: 5vw;
  left: 10vw;
  bottom: 0;
  right: 0;

  overflow-x: hidden;
  overflow-y: hidden;
  /*perspective: 2px;*/
  transform-style: preserve-3d;
  /*top: 50%;

        bottom: 0;
        left: 50%;*/
  width: 50vw;
  background-color: $color1;
}

.maMission2 {
  position: absolute;
  margin: auto;
  width: 100%;
  height: auto;

  color: $color5;
  text-align: center;

  overflow-x: hidden;
  overflow-y: hidden;

  top: 50%;
  /* poussé de la moitié de hauteur du référent */
  transform: translateY(-50%);
  /* tiré de la moitié de sa propre hauteur */
}

.styleParametre {
  position: absolute;
  top: 1vh;
  background: $color5;
  left: 2vw;
  width: 20vw;
  height: 90vh;
  border-radius: 1vw;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
}
.styleParametre2 {
  position: absolute;
  top: 1vh;
  background: $color5;
  left: 25vw;
  width: 70vw;
  height: 90vh;
  border-radius: 1vw;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.titre {
  position: relative;
  border-top-left-radius: 1vw;
  border-top-right-radius: 1vw;
  background-color: $color4;
  width: auto;
  letter-spacing: 0vw;
  font-family: Open Sans;
  font-size: 1.618em;
  font-weight: 800;
  line-height: 1.2;
  margin: auto;
  text-align: center;
  height: auto;
}
.parametre,
button {
  font-family: Open Sans;
  color: $color1;
  margin: auto;
  margin-top: 1vh;
  max-width: 250px;
}
h1 {
  letter-spacing: 0vw;
  font-family: Open Sans;
  font-size: 1.618em;
  font-weight: 800;
  line-height: 1.2;
}
</style>

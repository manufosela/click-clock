import { LitElement, html, css, unsafeCSS } from 'lit-element';

/**
 * `click-clock`
 * ClickClock
 *
 * @customElement click-clock
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class ClickClock extends LitElement {
  static get is() {
    return 'click-clock';
  }

  static get properties() {
    return {
      numDigits: { type: Number, attribute: 'num-digits' },
      maxValue: { type: Number, attribute: 'max-value' },
      minValue: { type: Number, attribute: 'min-value' },
      dotSize: { type: String, attribyte: 'dot-size' }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: #e8635e;
        --dot-size: 16px;
      }
      .clock {
        font-size: 0;
        text-align: center;
        margin-top: 20px;
      }
      .clock .digit {
        display: inline-block;
        width: calc(var(--dot-size) * 4 + 16px);
        margin: 10px;
        transform: skewX(-2deg);
      }
      .clock .digit#digit-2 .cell {
        transition: opacity 50ms ease;
      }
      .clock .digit#digit-3 .cell, .clock .digit#digit-4 .cell, .clock .digit#digit-5 .cell, .clock .digit#digit-6 .cell, .clock .digit#digit-7 .cell, .clock .digit#digit-8 .cell, .clock .digit#digit-9 .cell, .clock .digit#digit-10 .cell, .clock .digit#digit-11 .cell {
        transition: opacity 100ms ease;
      }
      .clock .digit .cell {
        width: var(--dot-size);
        height: var(--dot-size);
        margin: 2px;
        background-color: white;
        border-radius: 2px;
        display: inline-block;
        opacity: 0.1;
      }
      .clock .digit .cell.on {
        opacity: 1;
      }
      .dot { position:relative; background:#FF0; z-index:10; width:var(--dot-size); height:var(--dot-size); }
    `;
  }

  constructor() {
    super();
    this.numDigits = 3;
    this.maxValue = 999;
    this.minValue = 0;
    this.dotSize = '16px';
    this.now = new Date();
    this.digit = new Array(this.numDigits);

    this.display = {
      0: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      1: [
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      2: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1
      ],
      3: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      4: [
        1, 0, 0, 0,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      5: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      6: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      7: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      8: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      9: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ]
    };
  }

  firstUpdated() {
    this.grad = new Date(this.now.getTime() + this.maxValue * 1000);
    for (let i = 0; i <= this.numDigits; i++) {
      this.digit[i + 2] = this.shadowRoot.querySelector('#digit-' + (i + 2));
    }
    requestAnimationFrame(this.start.bind(this));
  }

  _renderDigit(container, number) {
    let matrix = this.display[number];

    let children = container.children;
    let len = matrix.length;
    for (var i = 0; i < len; i++) {
      children[i].classList.remove('on');
      if (matrix[i]) {
        children[i].classList.add('on');
      }
    }
  }

  start() {
    this.now = new Date();
    let diff = String(this.grad.getTime() - this.now.getTime());
    let len = diff.length;

    this._renderDigit(this.digit[2], Number(diff.charAt(len - 3)));
    this._renderDigit(this.digit[3], Number(diff.charAt(len - 4)));
    this._renderDigit(this.digit[4], Number(diff.charAt(len - 5)));
    this._renderDigit(this.digit[5], Number(diff.charAt(len - 6)));

    requestAnimationFrame(this.start.bind(this));
  }

  render() {
    let dotDecTop = -(parseInt(this.dotSize) + 2);
    let dotDecLeft = (parseInt(this.dotSize) * 5) + 3;
    return html`
      <section class="clock">
      <div id="digit-5" class="digit second">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div id="digit-4" class="digit second">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div id="digit-3" class="digit second">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="dot" style="top:${dotDecTop}px; left:${dotDecLeft}px;">O</div>
        </div>
        <div id="digit-2" class="digit">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>

      </section>
      <!--<button>Start</button><button>Pause</button><button>Stop</button>-->
    `;
  }
}

window.customElements.define(ClickClock.is, ClickClock);
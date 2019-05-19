import { LitElement, html, css } from 'lit-element';

/**
 * `click-clock`
 * ClickClock
 *
 * @customElement
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
      minValue: { type: Number, attribute: 'min-value' }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: #e8635e;
      }
      .clock {
        font-size: 0;
        text-align: center;
        margin-top: 20px;
      }
      .clock .digit {
        display: inline-block;
        width: 88px;
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
        width: 18px;
        height: 18px;
        margin: 2px;
        background-color: white;
        border-radius: 2px;
        display: inline-block;
        opacity: 0.1;
      }
      .clock .digit .cell.on {
        opacity: 1;
      }
    `;
  }

  constructor() {
    super();
    this.numDigits = 3;
    this.maxValue = 999;
    this.minValue = 0;
    this.now = new Date();
    this.grad = new Date(this.now.getTime() + 120 * 1000); // 120 segundos
    this.digit = new Array(this.numDigits);

    this.display = {
      0: [
        true, true, true, true,
        true, false, false, true,
        true, false, false, true,
        true, false, false, true,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true
      ],
      1: [
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true
      ],
      2: [
        true, true, true, true,
        false, false, false, true,
        false, false, false, true,
        true, true, true, true,
        true, false, false, false,
        true, false, false, false,
        true, true, true, true
      ],
      3: [
        true, true, true, true,
        false, false, false, true,
        false, false, false, true,
        false, true, true, true,
        false, false, false, true,
        false, false, false, true,
        true, true, true, true
      ],
      4: [
        true, false, false, false,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true
      ],
      5: [
        true, true, true, true,
        true, false, false, false,
        true, false, false, false,
        true, true, true, true,
        false, false, false, true,
        false, false, false, true,
        true, true, true, true
      ],
      6: [
        true, true, true, true,
        true, false, false, false,
        true, false, false, false,
        true, true, true, true,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true
      ],
      7: [
        true, true, true, true,
        true, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true
      ],
      8: [
        true, true, true, true,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true
      ],
      9: [
        true, true, true, true,
        true, false, false, true,
        true, false, false, true,
        true, true, true, true,
        false, false, false, true,
        false, false, false, true,
        false, false, false, true
      ]
    };
  }

  connectedCallback() {
    //Array.apply(null, {length: this.numslides}).map(Number.call, Number);
    for (let i = 0; i < this.numDigits; i++) {
      this.digit[i] = this.shadowRoot.querySelector('#digit-' + i);
    }

    requestAnimationFrame(this.start);
  }

  _renderDigit(container, number) {
    let matrix = this.display[number];

    let children = container.children();
    let len = matrix.length;
    for (var i = 0; i < len; i++) {
      children.eq(i).toggleClass('on', matrix[i]);
    }
  }

  start() {
    this.now = new Date();
    let diff = String(this.grad.getTime() - this.now.getTime());
    let len = diff.length;

    this._renderDigit(digit2, Number(diff.charAt(len - 3)));
    this._renderDigit(digit3, Number(diff.charAt(len - 4)));
    this._renderDigit(digit4, Number(diff.charAt(len - 5)));
    this._renderDigit(digit5, Number(diff.charAt(len - 6)));

    requestAnimationFrame(start);
  }

  render() {
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
    `;
  }
}

window.customElements.define(ClickClock.is, ClickClock);